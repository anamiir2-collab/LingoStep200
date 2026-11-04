/* ============================================================
   LingoStep — daily-plan.js
   "خطتي اليوم" — a small daily plan built from REAL learner data.
   Pure logic here is Node-testable; the view lives in app.js.

   Rules (spec, section 15):
   - Tasks reflect real state: due revision items, the next lesson
     to continue, a vocabulary round, one dialogue practice.
   - The time budget (10/20/30 min) is a preference, stored in
     settings (dailyPlanMinutes) and adjustable any time.
   - Skipping or ignoring a task NEVER punishes: no XP loss, no
     streak damage, no locked content. Unfinished tasks simply
     roll over to the next day.
   - One storage key ('dailyPlan') holds per-day state:
     { [dayKey]: { minutes, tasks: [{id, done, skipped}], at } }
   ============================================================ */

import { kvGet, kvSet } from './storage.js';
import { dayKey } from './utils.js';

const K_PLAN = 'dailyPlan';

export const TASK_IDS = ['review', 'lesson', 'vocab', 'dialogue'];

/** Load the whole dailyPlan map (per-day). */
export async function loadPlanMap() {
  const v = await kvGet(K_PLAN, {});
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

/** Load today's plan row (or null). */
export async function loadTodayPlan(today = dayKey()) {
  const map = await loadPlanMap();
  return map[today] || null;
}

async function saveDay(day, row) {
  const map = await loadPlanMap();
  map[day] = row;
  // keep the map bounded (last 30 days) so storage never balloons
  const keys = Object.keys(map).sort();
  while (keys.length > 30) {
    const k = keys.shift();
    if (k !== day) delete map[k];
  }
  await kvSet(K_PLAN, map);
}

/**
 * Build the task list for today from real learner state.
 * due: number of due review items; nextLessonId: id or null;
 * hasVocab: whether any vocabulary was encountered yet.
 * Returns ordered [{ id, label-less }] — the view localizes labels.
 */
export function buildTodayTasks({ due = 0, nextLessonId = null, hasVocab = false, hasDialogues = true } = {}) {
  const tasks = [];
  if (due > 0) tasks.push({ id: 'review', due });
  if (nextLessonId) tasks.push({ id: 'lesson', lessonId: nextLessonId });
  if (hasVocab) tasks.push({ id: 'vocab' });
  if (hasDialogues) tasks.push({ id: 'dialogue' });
  return tasks;
}

/** Initialize (or re-plan) today's row without losing marks. */
export async function ensureTodayPlan(profile, today = dayKey()) {
  const existing = await loadTodayPlan(today);
  const tasks = buildTodayTasks(profile || {});
  const minutes = (existing && existing.minutes) || profile.minutes || 20;
  const prev = existing && Array.isArray(existing.tasks) ? existing.tasks : [];
  const row = {
    minutes,
    at: Date.now(),
    tasks: tasks.map((t) => {
      const before = prev.find((p) => p && p.id === t.id);
      return { ...t, done: Boolean(before?.done), skipped: Boolean(before?.skipped) };
    }),
  };
  await saveDay(today, row);
  return row;
}

/** Set the time budget for today (10 / 20 / 30 … minutes). */
export async function setPlanMinutes(minutes, today = dayKey()) {
  const row = (await loadTodayPlan(today)) || { tasks: [] };
  const m = Math.min(60, Math.max(5, parseInt(minutes, 10) || 20));
  await saveDay(today, { ...row, minutes: m, at: Date.now() });
  return m;
}

/** Mark one task done / skipped / pending. No other state changes. */
export async function setTaskState(taskId, state, today = dayKey()) {
  const row = await loadTodayPlan(today);
  if (!row || !Array.isArray(row.tasks)) return null;
  const t = row.tasks.find((x) => x.id === taskId);
  if (!t) return null;
  t.done = state === 'done';
  t.skipped = state === 'skipped';
  await saveDay(today, { ...row, at: Date.now() });
  return row;
}

/** Summary for the dashboard card. */
export function planSummary(row) {
  if (!row || !Array.isArray(row.tasks)) return { total: 0, done: 0, pending: 0, skipped: 0, allDone: false };
  const done = row.tasks.filter((t) => t.done).length;
  const skipped = row.tasks.filter((t) => t.skipped).length;
  return {
    total: row.tasks.length,
    done,
    skipped,
    pending: row.tasks.length - done - skipped,
    allDone: done + skipped >= row.tasks.length && row.tasks.length > 0,
  };
}
