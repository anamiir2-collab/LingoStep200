/* ============================================================
   storage-tests.js — key/value persistence + progress +
   revision scheduling using the in-memory backend.
   ============================================================ */

import assert from 'node:assert/strict';
import { kvSet, kvGet, kvDel, kvKeys, _setBackendForTests, getBackend } from '../js/storage.js';
import { recordAttempt, updateLessonState, getLessonState, getOverview, getToday, getDailyHistory, exportBackup, importBackup, clearAllProgress, saveResume } from '../js/progress.js';
import { upsertOnWrong, gradeReview, dueItems, dueCount, totalCount, itemsByFilter, availableTags } from '../js/review.js';

export async function run() {
  const name = 'storage-tests';
  await _setBackendForTests('memory');
  const backend = await getBackend();
  assert.equal(backend.name, 'memory');

  // kv basics
  assert.equal(await kvGet('missing', 'fallback'), 'fallback');
  await kvSet('k1', { a: 1, list: [1, 2, 3] });
  assert.deepEqual(await kvGet('k1'), { a: 1, list: [1, 2, 3] });
  await kvSet('k2', 'v2');
  assert.ok((await kvKeys()).includes('k1'));
  await kvDel('k1');
  assert.equal(await kvGet('k1'), undefined);

  // progress: attempts + daily
  await recordAttempt({ lessonId: 'lesson-001', exerciseId: 'lesson-001-ex-001', type: 'listen-and-type', status: 'correct', timeMs: 4000, tags: ['svo'] });
  await recordAttempt({ lessonId: 'lesson-001', exerciseId: 'lesson-001-ex-001', type: 'listen-and-type', status: 'incorrect', timeMs: 6000, tags: ['svo'] });
  await recordAttempt({ lessonId: 'lesson-001', exerciseId: 'lesson-001-ex-002', type: 'fill-blank', status: 'skipped', timeMs: 1000, tags: [] });
  const today = await getToday();
  assert.equal(today.count, 2, 'skipped not counted in daily');
  assert.equal(today.correct, 1);

  // lesson state: best status kept, completion
  await updateLessonState('lesson-001', { totalExercises: 2, index: 0, status: 'correct' });
  const st1 = await getLessonState('lesson-001');
  assert.equal(st1.attempted[0], 'correct');
  const st2 = await updateLessonState('lesson-001', { totalExercises: 2, index: 1, status: 'incorrect' });
  assert.equal(st2.completed, true, 'all attempted → completed');
  assert.ok(st2.bestAccuracy >= 50);

  // overview
  const ov = await getOverview();
  assert.equal(ov.totalAnswers, 2);
  assert.equal(ov.correctAnswers, 1);
  assert.equal(ov.completedLessons, 1);
  assert.ok(ov.streak >= 1);
  assert.equal(ov.lastLessonId, 'lesson-001');

  await saveResume('lesson-002', 7);
  const ov2 = await getOverview();
  assert.equal(ov2.lastLessonId, 'lesson-002');

  const hist = await getDailyHistory(14);
  assert.equal(hist.length, 14);
  assert.ok(hist[hist.length - 1].count >= 2);

  // review scheduling
  await upsertOnWrong('lesson-013-ex-005', 'lesson-013', ['present-perfect']);
  await upsertOnWrong('lesson-013-ex-006', 'lesson-013', ['present-perfect']);
  assert.equal(await totalCount(), 2);
  assert.equal(await dueCount(), 2, 'new mistakes due immediately');
  const due = await dueItems();
  assert.equal(due.length, 2);

  // correct review answers push interval up the ladder
  await gradeReview('lesson-013-ex-005', true);
  await gradeReview('lesson-013-ex-005', true);
  const items = await itemsByFilter({ tag: 'present-perfect' });
  const grown = items.find((i) => i.exerciseId === 'lesson-013-ex-005');
  assert.equal(grown.intervalDays, 2, 'ladder 1 → 2 after two correct');
  assert.ok(grown.dueAt > Date.now());
  assert.equal(await dueCount(), 1, 'grown item no longer due');

  // wrong answer resets and flags difficult after 3 lapses
  await gradeReview('lesson-013-ex-006', false);
  await upsertOnWrong('lesson-013-ex-006', 'lesson-013', ['present-perfect']);
  await gradeReview('lesson-013-ex-006', false);
  await upsertOnWrong('lesson-013-ex-006', 'lesson-013', ['present-perfect']);
  await gradeReview('lesson-013-ex-006', false);
  const again = (await itemsByFilter({ lessonId: 'lesson-013' })).find((i) => i.exerciseId === 'lesson-013-ex-006');
  assert.equal(again.difficult, true, '3 lapses → difficult');

  const tags = await availableTags();
  assert.ok(tags.includes('present-perfect'));

  // backup export/import with validation
  const backup = await exportBackup();
  assert.equal(backup.app, 'lingostep');
  assert.ok(backup.data.attempts);
  await assert.rejects(() => importBackup({ app: 'other' }), /not a lingostep/);
  await assert.rejects(() => importBackup({ app: 'lingostep', exportedAt: 'nope', data: 5 }), /invalid|missing/);

  await clearAllProgress();
  const empty = await getOverview();
  assert.equal(empty.totalAnswers, 0);
  assert.equal(empty.completedLessons, 0);
  await importBackup(backup, { replace: true });
  const restored = await getOverview();
  assert.equal(restored.totalAnswers, 2, 'backup restores attempts');
  assert.equal(restored.completedLessons, 1);

  return { name, pass: true };
}
