/* ============================================================
   daily-plan-tests.js — "خطتي اليوم" contract (js/daily-plan.js).
   Verifies:
     - tasks are built from real learner state
     - marks survive re-planning (same day)
     - skipping never removes progress or XP
     - summary counts are consistent
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  buildTodayTasks, ensureTodayPlan, setPlanMinutes, setTaskState, planSummary, loadTodayPlan,
} from '../js/daily-plan.js';
import { _setBackendForTests } from '../js/storage.js';
import { awardExercise, getTotalXp } from '../js/xp.js';

export async function run() {
  const name = 'daily-plan-tests';
  await _setBackendForTests('memory');

  /* 1 — tasks reflect real state */
  const tasks = buildTodayTasks({ due: 3, nextLessonId: 'lesson-005', hasVocab: true });
  assert.deepEqual(tasks.map((t) => t.id), ['review', 'lesson', 'vocab', 'dialogue']);
  assert.equal(tasks[0].due, 3);
  assert.equal(tasks[1].lessonId, 'lesson-005');
  const minimal = buildTodayTasks({});
  assert.deepEqual(minimal.map((t) => t.id), ['dialogue'], 'empty learner still gets the dialogue habit task');

  /* 2 — ensureTodayPlan is idempotent per day and keeps marks */
  const day = '2026-10-25';
  const row1 = await ensureTodayPlan({ due: 0, nextLessonId: 'lesson-001', hasVocab: false }, day);
  assert.ok(row1.tasks.some((t) => t.id === 'lesson'));
  await setTaskState('lesson', 'done', day);
  await setTaskState('review', 'skipped', day);
  const row2 = await ensureTodayPlan({ due: 5, nextLessonId: 'lesson-002', hasVocab: true }, day); // re-plan same day
  const lessonTask = row2.tasks.find((t) => t.id === 'lesson');
  assert.equal(lessonTask.done, true, 'done mark survives re-planning');
  assert.equal(lessonTask.lessonId, 'lesson-002', 'task refreshed to the new target while keeping the mark');

  /* 3 — skipping is penalty-free: XP untouched */
  const beforeXp = await getTotalXp();
  await awardExercise('lesson-009-ex-001', 'correct', { firstAttempt: true, usedHint: false });
  await setTaskState('vocab', 'skipped', day);
  const afterXp = await getTotalXp();
  assert.equal(afterXp, beforeXp + 10, 'skipping a task does not touch the XP ledger');

  /* 4 — minutes clamp to a sane range */
  assert.equal(await setPlanMinutes(10, day), 10);
  assert.equal(await setPlanMinutes(9999, day), 60);
  assert.equal(await setPlanMinutes('abc', day), 20);

  /* 5 — summary math */
  const today = await loadTodayPlan(day);
  const sum = planSummary(today);
  assert.equal(sum.total, today.tasks.length);
  assert.equal(sum.done + sum.skipped + sum.pending, sum.total);

  return { name, pass: true, info: 'plan builds from real state; marks survive re-plans; skipping is penalty-free' };
}
