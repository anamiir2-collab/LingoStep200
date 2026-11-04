/* ============================================================
   detect-duplicates.js — duplicate & similarity report.
   1. exact duplicates (normalized) across lessons → FAIL
   2. similar sentences (Jaccard ≥ 0.85) → report for human review
   Run: node scripts/detect-duplicates.js
   ============================================================ */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import { lessonManifest } from '../data/lesson-manifest.js';
import { normalizeForDup } from '../js/lesson-schema.js';
import { similarity } from '../js/grading.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const exact = [];
const seen = new Map();
const carriers = [];

for (const entry of lessonManifest) {
  const mod = await import(new URL(`file://${join(ROOT, entry.path)}`));
  for (const ex of mod.default.exercises) {
    if (ex.type !== 'listen-and-type' && ex.type !== 'fill-blank' && ex.type !== 'word-order') continue;
    const key = normalizeForDup(ex.en);
    if (seen.has(key) && seen.get(key).lessonId !== entry.id) {
      exact.push({ sentence: ex.en, first: seen.get(key).lessonId, second: entry.id });
    } else if (!seen.has(key)) {
      seen.set(key, { lessonId: entry.id, exId: ex.id });
    }
    if (ex.type === 'listen-and-type') carriers.push({ lessonId: entry.id, exId: ex.id, en: ex.en });
  }
}

/* similarity pass over listen-and-type sentences (human-review list) */
const similar = [];
for (let i = 0; i < carriers.length; i++) {
  for (let j = i + 1; j < carriers.length; j++) {
    if (carriers[i].lessonId === carriers[j].lessonId) continue;
    const sim = similarity(carriers[i].en, carriers[j].en);
    if (sim >= 0.85) {
      similar.push({ a: carriers[i], b: carriers[j], sim: Math.round(sim * 100) / 100 });
      if (similar.length >= 200) break;
    }
  }
  if (similar.length >= 200) break;
}

const report = {
  generatedAt: new Date().toISOString(),
  exactDuplicates: exact,
  similarForReview: similar,
  summary: { exactCount: exact.length, similarCount: similar.length, dictationSentences: carriers.length },
};
writeFileSync(join(ROOT, 'scripts/duplicates-report.json'), JSON.stringify(report, null, 2), 'utf-8');

console.log('=== detect-duplicates ===');
console.log(`  listen-and-type sentences scanned: ${carriers.length}`);
console.log(`  exact duplicates across lessons: ${exact.length}`);
exact.slice(0, 10).forEach((d) => console.log(`    DUP [${d.first} → ${d.second}]: ${d.sentence}`));
console.log(`  similar pairs (≥0.85 Jaccard, cross-lesson, for human review): ${similar.length}`);
similar.slice(0, 10).forEach((p) => console.log(`    ~${p.sim} [${p.a.lessonId}|${p.b.lessonId}]: "${p.a.en}" ↔ "${p.b.en}"`));
console.log('  full report: scripts/duplicates-report.json');

if (exact.length) {
  console.error('FAILED: exact duplicates found');
  process.exit(1);
}
console.log('PASSED (no exact duplicates; similar pairs listed for human review only)');
