/* ============================================================
   xp-tests.js — XP ledger: anti-double-award guarantees.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  XP_CONFIG, awardExercise, awardLessonComplete, markFirstAttemptFailed,
  isExerciseAwarded, getTotalXp, getXpSummary, _resetXpForTests,
} from '../js/xp.js';

export async function run() {
  const name = 'xp-tests';
  await _resetXpForTests();

  // 1) first try correct, no hint → FIRST_TRY
  let r = await awardExercise('lesson-001-ex-001', 'correct', { firstAttempt: true, usedHint: false });
  assert.equal(r.delta, XP_CONFIG.FIRST_TRY);
  assert.equal(r.reason, 'first-try');

  // 2) same exercise again (refresh / re-check / repeat lesson) → 0
  r = await awardExercise('lesson-001-ex-001', 'correct', { firstAttempt: true, usedHint: false });
  assert.equal(r.delta, 0, 'no double award ever');
  assert.equal(r.alreadyAwarded, true);

  // 3) correct with hint → WITH_HINT
  r = await awardExercise('lesson-001-ex-002', 'correct', { firstAttempt: true, usedHint: true });
  assert.equal(r.delta, XP_CONFIG.WITH_HINT);

  // 4) wrong first → zero marker blocks the later first-try bonus
  await awardExercise('lesson-001-ex-003', 'incorrect', { firstAttempt: true });
  r = await awardExercise('lesson-001-ex-003', 'correct', { firstAttempt: false, usedHint: false });
  assert.equal(r.delta, 0, 'retry after wrong earns nothing');
  assert.equal(await isExerciseAwarded('lesson-001-ex-003'), true);

  // 5) markFirstAttemptFailed alone also blocks the bonus
  await markFirstAttemptFailed('lesson-001-ex-004');
  r = await awardExercise('lesson-001-ex-004', 'correct', { firstAttempt: false });
  assert.equal(r.delta, 0);
  // ... and it also cannot be claimed as a "first attempt"
  r = await awardExercise('lesson-001-ex-005', 'correct', { firstAttempt: true });
  assert.equal(r.delta, XP_CONFIG.FIRST_TRY, 'unmarked exercises still get the bonus');

  // 6) minor tier
  r = await awardExercise('lesson-001-ex-006', 'minor', { firstAttempt: true });
  assert.equal(r.delta, XP_CONFIG.MINOR);

  // 7) skipped → zero
  r = await awardExercise('lesson-001-ex-007', 'skipped', {});
  assert.equal(r.delta, 0);

  // 8) lesson bonus once
  let b = await awardLessonComplete('lesson-001');
  assert.equal(b.delta, XP_CONFIG.LESSON_COMPLETE);
  b = await awardLessonComplete('lesson-001');
  assert.equal(b.delta, 0, 'lesson bonus never repeats');
  b = await awardLessonComplete('lesson-002');
  assert.equal(b.delta, XP_CONFIG.LESSON_COMPLETE, 'different lesson gets its own bonus');

  // 9) totals match ledger contents (10 + 5 + 0 + 0 + 10 + 5 + 0 + 20 + 20)
  const total = await getTotalXp();
  const summary = await getXpSummary();
  const expected = XP_CONFIG.FIRST_TRY * 2 + XP_CONFIG.WITH_HINT + XP_CONFIG.MINOR + XP_CONFIG.LESSON_COMPLETE * 2;
  assert.equal(total, expected, `total should be ${expected}, got ${total}`);
  assert.equal(summary.lessonBonuses, 2);

  // 10) invalid ids are safe no-ops
  r = await awardExercise('', 'correct', {});
  assert.equal(r.delta, 0);

  return { name, pass: true, info: 'ledger prevents duplicate XP across refreshes & repeats' };
}
