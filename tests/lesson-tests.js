/* ============================================================
   lesson-tests.js — imports every lesson module (Node) and
   asserts manifest validity, schema compliance, counts and
   section minimums. Mirrors scripts/validate-lessons.js.
   ============================================================ */

import assert from 'node:assert/strict';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { lessonManifest } from '../data/lesson-manifest.js';
import { validateLessonStructure, normalizeForDup, SECTIONS } from '../js/lesson-schema.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN = {
  foundations: [20, 1000],
  'daily-life': [25, 1250],
  'home-family': [25, 1250],
  'food-services': [25, 1250],
  travel: [25, 1250],
  'health-emergency': [25, 1250],
  'social-communication': [25, 1250],
  'work-money': [25, 1250],
  'education-digital': [25, 1250],
  'complex-rights': [20, 1000],
  specialized: [10, 500],
};

export async function run() {
  const name = 'lesson-tests';

  assert.ok(lessonManifest.length >= 250, `manifest lessons ${lessonManifest.length} >= 250`);
  assert.deepEqual(new Set(lessonManifest.map((l) => l.section)), new Set(SECTIONS), 'all eleven sections present');

  const ids = new Set();
  const exIds = new Set();
  const globalSeen = new Map();
  const sectionCarriers = {};
  for (const s of SECTIONS) sectionCarriers[s] = 0;

  for (const entry of lessonManifest) {
    assert.ok(!ids.has(entry.id), `unique lesson id ${entry.id}`);
    ids.add(entry.id);
    assert.ok(entry.available !== false, `${entry.id} available`);
    assert.ok(typeof entry.path === 'string' && entry.path.startsWith('lessons/'), `${entry.id} path shape`);

    const mod = await import(new URL(`file://${join(ROOT, entry.path)}`));
    const lesson = mod.default;
    const errs = validateLessonStructure(lesson, entry.id);
    assert.deepEqual(errs, [], `${entry.id} schema: ${errs.slice(0, 3).join('|')}`);
    assert.equal(lesson.section, entry.section, `${entry.id} section match`);
    assert.equal(lesson.exercises.length, entry.exercises, `${entry.id} exercise count matches manifest`);

    const localAny = new Set();
    for (const ex of lesson.exercises) {
      assert.ok(!exIds.has(ex.id), `unique exercise id ${ex.id}`);
      exIds.add(ex.id);
      if (['listen-and-type', 'fill-blank', 'word-order'].includes(ex.type)) {
        const key = normalizeForDup(ex.en);
        sectionCarriers[entry.section] += 1;
        const owner = globalSeen.get(key);
        if (owner === undefined) globalSeen.set(key, entry.id);
        else if (owner !== entry.id && !localAny.has(key)) {
          assert.fail(`cross-lesson duplicate sentence [${owner}→${entry.id}]: ${ex.en}`);
        }
        localAny.add(key);
      }
    }
  }

  for (const [section, [minLessons, minSentences]] of Object.entries(MIN)) {
    assert.ok(lessonManifest.filter((l) => l.section === section).length >= minLessons, `${section} lesson minimum`);
    assert.ok(sectionCarriers[section] >= minSentences, `${section} sentence minimum (${sectionCarriers[section]})`);
  }

  assert.ok(globalSeen.size >= 11000, `unique practice sentences ${globalSeen.size} >= 11000`);
  assert.ok(lessonManifest.length >= 250, 'at least 250 lessons');

  /* v2 numbering: manifest order must be lesson-001..lesson-250 with no gaps */
  for (let i = 0; i < lessonManifest.length; i += 1) {
    const expected = `lesson-${String(i + 1).padStart(3, '0')}`;
    assert.equal(lessonManifest[i].id, expected, `manifest order ${i + 1}: expected ${expected}, got ${lessonManifest[i].id}`);
  }

  return { name, pass: true, info: `${lessonManifest.length} lessons, ${globalSeen.size} unique sentences` };
}
