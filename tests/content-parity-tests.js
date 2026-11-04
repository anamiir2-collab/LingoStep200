/* ============================================================
   content-parity-tests.js — v8 transformation guarantee.
   Compares the LIVE curriculum against the frozen pre-transformation
   baseline (scripts/inventory-baseline.json). If a lesson, exercise,
   accepted answer, or vocabulary entry were ever lost during the
   mobile redesign, this test fails.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { lessonManifest } from '../data/lesson-manifest.js';
import { validateLessonStructure } from '../js/lesson-schema.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'scripts', 'inventory-baseline.json');

export function run() {
  const name = 'content-parity-tests';

  assert.equal(existsSync(BASELINE), true,
    'baseline inventory must exist (run scripts/inventory.mjs against the original repo first)');
  const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));

  /* ---------- lessons ---------- */
  assert.equal(lessonManifest.length, baseline.totalLessons,
    `lesson count changed: ${baseline.totalLessons} → ${lessonManifest.length}`);

  const bySection = {};
  for (const entry of lessonManifest) {
    bySection[entry.section] = (bySection[entry.section] || 0) + 1;
  }
  for (const [sec, n] of Object.entries(baseline.sections)) {
    assert.equal(bySection[sec] || 0, n, `section "${sec}" lost lessons`);
  }

  /* ---------- exercises, answers, vocabulary (live parse) ---------- */
  let totalEx = 0;
  const byType = {};
  let accepted = 0;
  let vocab = 0;
  for (const entry of lessonManifest) {
    const src = readFileSync(join(ROOT, entry.path), 'utf8')
      .replace(/^[\s\S]*?export default/, '').trim().replace(/;\s*$/, '');
    const lesson = JSON.parse(src);
    const errs = validateLessonStructure(lesson, entry.id);
    assert.equal(errs.length, 0, `lesson ${entry.id} no longer valid: ${errs.slice(0, 2).join(' | ')}`);
    for (const ex of lesson.exercises) {
      totalEx += 1;
      byType[ex.type] = (byType[ex.type] || 0) + 1;
      accepted += Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers.length : 0;
    }
    vocab += (lesson.vocabulary || []).length;
  }

  assert.equal(totalEx, baseline.totalExercises,
    `exercise count changed: ${baseline.totalExercises} → ${totalEx}`);
  for (const [type, n] of Object.entries(baseline.byType)) {
    assert.equal(byType[type] || 0, n, `exercise type "${type}" count changed`);
  }
  assert.equal(accepted, baseline.totalAcceptedAnswers,
    `accepted answers changed: ${baseline.totalAcceptedAnswers} → ${accepted}`);
  assert.equal(vocab, baseline.totalVocabulary,
    `vocabulary entries changed: ${baseline.totalVocabulary} → ${vocab}`);

  /* ---------- per-lesson exercise counts ---------- */
  for (const [lessonId, info] of Object.entries(baseline.perLesson)) {
    const src = readFileSync(join(ROOT, `${baseline && lessonInfoPath(lessonId)}`), 'utf8')
      .replace(/^[\s\S]*?export default/, '').trim().replace(/;\s*$/, '');
    const lesson = JSON.parse(src);
    assert.equal(lesson.exercises.length, info.exercises,
      `lesson ${lessonId} exercise count changed`);
  }

  /* ---------- i18n parity for the new v8 keys ---------- */
  const { I18N } = awaitImportI18n();
  const v8Keys = ['kbBackspace', 'kbSpace', 'kbClear', 'achTitle', 'achIntro',
    'achUnlocked', 'achSummaryTitle', 'achStripTitle', 'achSeeAll', 'placeShort'];
  for (const key of v8Keys) {
    assert.notEqual(I18N.en[key], undefined, `missing en i18n key: ${key}`);
    assert.notEqual(I18N.ar[key], undefined, `missing ar i18n key: ${key}`);
  }

  return {
    name,
    pass: true,
    info: `${baseline.totalLessons} lessons, ${totalEx} exercises, ${accepted} answers, ${vocab} vocab — identical to pre-transformation baseline`,
  };
}

/* helpers */

function lessonInfoPath(lessonId) {
  // baseline perLesson entries map to manifest paths; resolve via manifest
  const entry = lessonManifest.find((l) => l.id === lessonId);
  assert.ok(entry, `baseline lesson ${lessonId} missing from manifest`);
  return entry.path;
}

import { I18N } from '../js/i18n.js';
function awaitImportI18n() {
  return { I18N };
}
