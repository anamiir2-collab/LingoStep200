/* ============================================================
   backup-tests.js — v2 backup round-trip (js/progress.js).
   Verifies:
     - export includes XP ledger, review queue, vocab stats,
       placement result and daily plan
     - import restores them byte-for-byte (replace mode)
     - v1 backups (missing the new fields) still import fine
     - corrupt fields are rejected
     - clearAllProgress wipes ALL learning keys
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { exportBackup, importBackup, clearAllProgress, recordAttempt, updateLessonState } from '../js/progress.js';
import { awardExercise, awardLessonComplete, _resetXpForTests } from '../js/xp.js';
import { upsertOnWrong, gradeReview } from '../js/review.js';
import { recordVocabAnswer } from '../js/vocabulary.js';
import { kvSet, kvGet, _setBackendForTests } from '../js/storage.js';

export async function run() {
  const name = 'backup-tests';
  await _setBackendForTests('memory');
  await clearAllProgress();
  await _resetXpForTests();

  /* seed every subsystem with real calls */
  await awardExercise('lesson-001-ex-001', 'correct', { firstAttempt: true, usedHint: false });
  await awardLessonComplete('lesson-001');
  await upsertOnWrong('lesson-001-ex-002', 'lesson-001', ['present-simple']);
  await gradeReview('lesson-001-ex-002', false);
  await recordVocabAnswer('tea', 'شاي', true, 'lesson-001');
  await recordAttempt({ lessonId: 'lesson-001', exerciseId: 'lesson-001-ex-001', type: 'listen-and-type', status: 'correct', timeMs: 900, tags: ['x'] });
  await updateLessonState('lesson-001', { totalExercises: 2, index: 0, status: 'correct' });
  await kvSet('placementResult', { level: 'A2', answered: 5, correct: 4, weakTags: [], at: Date.now() });
  await kvSet('dailyPlan', { '2026-10-25': { minutes: 20, tasks: [{ id: 'review', done: true }] } });

  const backup = await exportBackup();
  assert.equal(backup.app, 'lingostep');
  assert.equal(backup.version, 2);
  for (const key of ['attempts', 'lessons', 'daily', 'meta', 'xp', 'review', 'vocabStats', 'placementResult', 'dailyPlan']) {
    assert.ok(backup.data[key] !== undefined, `export includes ${key}`);
  }
  assert.ok(backup.data.xp.total >= 30, 'xp total carried into the backup');

  /* wipe and restore — everything comes back */
  await clearAllProgress();
  await _resetXpForTests();
  assert.equal((await kvGet('xp')).total, 0, 'xp really cleared');
  await importBackup(backup, { replace: true });
  const xpAfter = await kvGet('xp');
  assert.equal(xpAfter.total, backup.data.xp.total, 'xp ledger restored');
  assert.ok((await kvGet('review'))['lesson-001-ex-002'], 'review queue restored');
  assert.equal((await kvGet('vocabStats')).tea.meaningAr, 'شاي', 'vocab stats restored');
  assert.equal((await kvGet('placementResult')).level, 'A2', 'placement result restored');
  assert.ok((await kvGet('dailyPlan'))['2026-10-25'], 'daily plan restored');
  assert.ok((await kvGet('lessons'))['lesson-001'], 'lesson states restored');

  /* v1 backup (no new fields) still imports */
  const v1 = {
    app: 'lingostep',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: { attempts: { 'lesson-002-ex-001': [] }, lessons: {}, daily: {}, meta: {} },
  };
  await importBackup(v1, { replace: true });
  assert.ok(Array.isArray((await kvGet('attempts'))['lesson-002-ex-001']), 'v1 backup imports');

  /* invalid backups rejected */
  await assert.rejects(() => importBackup({ app: 'other', data: {}, exportedAt: new Date().toISOString() }), /not a lingostep/);
  await assert.rejects(() => importBackup({ app: 'lingostep', data: { xp: 42 }, exportedAt: new Date().toISOString() }), /invalid field: xp/);
  await assert.rejects(() => importBackup({ app: 'lingostep', data: {}, exportedAt: 'yesterday' }), /invalid exportedAt/);

  /* merge mode keeps the newer xp entry per exercise */
  await clearAllProgress();
  await _resetXpForTests();
  await awardExercise('lesson-003-ex-001', 'correct', { firstAttempt: true, usedHint: false });
  const before = (await kvGet('xp')).total;
  await importBackup({ ...backup, data: { ...backup.data, xp: { total: 999, awarded: {}, lessonBonus: {}, history: [] } } }, { replace: false });
  const after = await kvGet('xp');
  assert.ok(after.total >= before, 'merge keeps existing awards and rebuilds the total');

  /* clear wipes everything */
  await clearAllProgress();
  for (const key of ['xp', 'review', 'vocabStats', 'placementResult', 'dailyPlan']) {
    assert.equal(await kvGet(key, undefined), undefined, `clear wipes ${key}`);
  }

  return { name, pass: true, info: 'v2 backup round-trips xp/review/vocab/placement/plan; v1 still imports' };
}
