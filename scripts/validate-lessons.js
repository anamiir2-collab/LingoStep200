/* ============================================================
   validate-lessons.js — imports every lesson module and checks
   the manifest, structure, counts and per-section minimums.
   Practice sentence = the full English sentence carried by a
   listen-and-type, fill-blank or word-order exercise.
   Exit 1 on any failure. Run: node scripts/validate-lessons.js
   ============================================================ */

import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { lessonManifest } from '../data/lesson-manifest.js';
import { validateLessonStructure, normalizeForDup, SECTIONS } from '../js/lesson-schema.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN = {
  foundations: { lessons: 20, sentences: 1000 },
  'daily-life': { lessons: 25, sentences: 1250 },
  'home-family': { lessons: 25, sentences: 1250 },
  'food-services': { lessons: 25, sentences: 1250 },
  travel: { lessons: 25, sentences: 1250 },
  'health-emergency': { lessons: 25, sentences: 1250 },
  'social-communication': { lessons: 25, sentences: 1250 },
  'work-money': { lessons: 25, sentences: 1250 },
  'education-digital': { lessons: 25, sentences: 1250 },
  'complex-rights': { lessons: 20, sentences: 1000 },
  specialized: { lessons: 10, sentences: 500 },
};

const errors = [];

/* 1. manifest entries map to real files, and files map to the manifest */
const onDisk = new Map();
for (const section of SECTIONS) {
  const dir = join(ROOT, 'lessons', section);
  if (!existsSync(dir)) { errors.push(`missing section dir: lessons/${section}`); continue; }
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    onDisk.set(`lessons/${section}/${file}`, section);
  }
}
const manifestPaths = new Set();
for (const entry of lessonManifest) {
  manifestPaths.add(entry.path);
  if (!onDisk.has(entry.path)) errors.push(`manifest entry points to missing file: ${entry.path}`);
}
for (const p of onDisk.keys()) {
  if (!manifestPaths.has(p)) errors.push(`lesson file not registered in manifest: ${p}`);
}

/* 2. import every lesson, validate structure, count practice sentences */
const lessonIds = new Set();
const exerciseIds = new Set();
const globalSeen = new Map(); // normalized sentence -> first lessonId
const sectionCounts = {};
for (const s of SECTIONS) sectionCounts[s] = { lessons: 0, sentences: 0, exercises: 0 };

for (const entry of lessonManifest) {
  if (lessonIds.has(entry.id)) errors.push(`duplicate lesson id: ${entry.id}`);
  lessonIds.add(entry.id);

  const mod = await import(new URL(`file://${join(ROOT, entry.path)}`));
  const lesson = mod.default;
  const errs = validateLessonStructure(lesson, entry.id);
  if (errs.length) errors.push(`${entry.id}: ${errs.slice(0, 4).join(' | ')}`);

  if (lesson.section !== entry.section) errors.push(`${entry.id}: section mismatch (${lesson.section} vs ${entry.section})`);
  if (!SECTIONS.includes(entry.section)) errors.push(`${entry.id}: unknown section ${entry.section}`);

  sectionCounts[entry.section].lessons += 1;
  sectionCounts[entry.section].exercises += lesson.exercises.length;

  const localAny = new Set();
  for (const ex of lesson.exercises) {
    if (exerciseIds.has(ex.id)) errors.push(`duplicate exercise id: ${ex.id}`);
    exerciseIds.add(ex.id);

    if (ex.type === 'listen-and-type' || ex.type === 'fill-blank' || ex.type === 'word-order') {
      const key = normalizeForDup(ex.en);
      // per-section raw practice-sentence count (dictation + gap-fill + scramble)
      sectionCounts[entry.section].sentences += 1;
      // global uniqueness: the same sentence may be re-drilled inside its own
      // lesson in a different exercise type, but never across lessons
      const owner = globalSeen.get(key);
      if (owner === undefined) {
        globalSeen.set(key, entry.id);
      } else if (owner !== entry.id && !localAny.has(key)) {
        errors.push(`cross-lesson duplicate sentence [${owner} → ${entry.id}]: ${ex.en}`);
      }
      localAny.add(key);
    }
  }
}

/* 3. per-section minimums */
for (const [section, min] of Object.entries(MIN)) {
  const c = sectionCounts[section];
  if (c.lessons < min.lessons) errors.push(`section ${section}: ${c.lessons} lessons < required ${min.lessons}`);
  if (c.sentences < min.sentences) errors.push(`section ${section}: ${c.sentences} sentences < required ${min.sentences}`);
}

const totalLessons = lessonManifest.length;
const totalExercises = Object.values(sectionCounts).reduce((a, c) => a + c.exercises, 0);
const totalSentences = globalSeen.size;

/* report */
console.log('=== validate-lessons ===');
for (const s of SECTIONS) {
  const c = sectionCounts[s];
  const ok = c.lessons >= MIN[s].lessons && c.sentences >= MIN[s].sentences ? 'OK ' : 'LOW';
  console.log(`  [${ok}] ${s.padEnd(20)} ${String(c.lessons).padStart(3)} lessons  ${String(c.sentences).padStart(5)} practice sentences  ${c.exercises} exercises`);
}
console.log(`  total: ${totalLessons} lessons, ${totalExercises} exercises, ${totalSentences} unique practice sentences across the course`);
console.log(`  manifest: ${manifestPaths.size} entries ↔ ${onDisk.size} lesson files on disk`);

if (errors.length) {
  errors.slice(0, 30).forEach((e) => console.error('  ERROR:', e));
  console.error(`FAILED with ${errors.length} error(s)`);
  process.exit(1);
}
if (totalLessons < 250) {
  console.error(`FAILED: lessons ${totalLessons} < 250`);
  process.exit(1);
}
if (totalSentences < 11000) {
  console.error(`FAILED: unique practice sentences ${totalSentences} < 11000`);
  process.exit(1);
}
console.log('PASSED');
