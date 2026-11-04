/* ============================================================
   LingoStep — xp.js
   Centralized experience-point system.

   Reward rules (single source of truth, fully configurable):
     - Correct on the FIRST attempt of an exercise, hint unused → FIRST_TRY
     - Correct on the first attempt but a hint was used        → WITH_HINT
     - "Almost there" (minor) result                            → MINOR
     - Wrong / skipped answer                                   → 0
     - Completing all exercises of a lesson                     → LESSON_COMPLETE (once per lesson)

   Anti-double-award guarantees (spec requirement):
     - Every exercise can earn XP at most ONCE, ever. The award
       ledger is persisted (same IndexedDB/localStorage backend as
       progress), keyed by the stable exercise id ("lesson-013-ex-004").
     - A wrong or skipped first answer records a zero-award marker,
       so a later retry can never claim the first-try bonus.
     - Reloading mid-lesson, re-checking an exercise, or repeating a
       completed lesson never re-awards anything.
     - The lesson-completion bonus is granted once per lesson id.

   Node-importable (uses the storage.js backend abstraction).
   ============================================================ */

import { kvGet, kvSet } from './storage.js';

const K_XP = 'xp';

/** Central reward configuration — adjust values here only. */
export const XP_CONFIG = Object.freeze({
  FIRST_TRY: 10,       // first attempt correct, no hint used
  WITH_HINT: 5,        // first attempt correct, hint was used
  MINOR: 5,            // "almost there" (formatting-level match)
  WRONG: 0,            // wrong answer
  SKIPPED: 0,          // skipped exercise
  LESSON_COMPLETE: 20, // finished all exercises of a lesson (once)
});

const HISTORY_LIMIT = 300;

/* ---------- state loading with corruption safety ---------- */

function emptyState() {
  return {
    total: 0,
    awarded: {},      // exerciseId -> { xp, reason, at }
    lessonBonus: {},  // lessonId  -> { xp, at }
    history: [],      // [{ kind:'exercise'|'lesson', id, xp, reason, at }] (xp>0 only)
  };
}

function validState(v) {
  return v
    && typeof v === 'object'
    && typeof v.total === 'number' && v.total >= 0
    && v.awarded && typeof v.awarded === 'object' && !Array.isArray(v.awarded)
    && v.lessonBonus && typeof v.lessonBonus === 'object' && !Array.isArray(v.lessonBonus)
    && Array.isArray(v.history);
}

async function loadXp() {
  const v = await kvGet(K_XP);
  if (validState(v)) return v;
  // Corrupted or partially-written data: start from a clean, valid state
  // instead of crashing. Total is re-derived below on the fly if possible.
  const fresh = emptyState();
  if (v && typeof v === 'object') {
    // best-effort salvage: recompute total from valid-looking ledger entries
    let total = 0;
    if (v.awarded && typeof v.awarded === 'object') {
      for (const it of Object.values(v.awarded)) {
        if (it && typeof it.xp === 'number' && it.xp > 0) total += it.xp;
      }
    }
    if (v.lessonBonus && typeof v.lessonBonus === 'object') {
      for (const it of Object.values(v.lessonBonus)) {
        if (it && typeof it.xp === 'number' && it.xp > 0) total += it.xp;
      }
      fresh.lessonBonus = v.lessonBonus;
    }
    fresh.total = total;
  }
  return fresh;
}

async function saveXp(state) {
  return kvSet(K_XP, state);
}

/* ---------- exercise awards ---------- */

/**
 * Award XP for one checked exercise.
 * status: 'correct' | 'minor' | 'incorrect' | 'skipped'
 * opts:   { firstAttempt: boolean, usedHint: boolean }
 * Returns { delta, total, reason, alreadyAwarded }.
 */
export async function awardExercise(exerciseId, status, opts = {}) {
  if (!exerciseId || typeof exerciseId !== 'string') {
    return { delta: 0, total: (await loadXp()).total, reason: 'invalid-id', alreadyAwarded: false };
  }
  const state = await loadXp();

  // Already awarded (or zero-marked) once, ever → never again.
  const prior = state.awarded[exerciseId];
  if (prior) {
    return { delta: 0, total: state.total, reason: prior.reason, alreadyAwarded: true };
  }

  const firstAttempt = opts.firstAttempt !== false; // default: treat as first attempt
  const usedHint = Boolean(opts.usedHint);

  let xp = 0;
  let reason = 'wrong-zero';
  if (status === 'correct') {
    if (!firstAttempt) {
      xp = 0; reason = 'retry-zero';           // answered wrong earlier: no first-try bonus
    } else if (usedHint) {
      xp = XP_CONFIG.WITH_HINT; reason = 'with-hint';
    } else {
      xp = XP_CONFIG.FIRST_TRY; reason = 'first-try';
    }
  } else if (status === 'minor') {
    xp = XP_CONFIG.MINOR; reason = 'minor';
  } else if (status === 'incorrect') {
    xp = XP_CONFIG.WRONG; reason = 'wrong-zero';
  } else if (status === 'skipped') {
    xp = XP_CONFIG.SKIPPED; reason = 'skip-zero';
  }

  state.awarded[exerciseId] = { xp, reason, at: Date.now() };
  state.total += xp;
  if (xp > 0) {
    state.history.push({ kind: 'exercise', id: exerciseId, xp, reason, at: Date.now() });
    if (state.history.length > HISTORY_LIMIT) state.history.splice(0, state.history.length - HISTORY_LIMIT);
  }
  await saveXp(state);
  return { delta: xp, total: state.total, reason, alreadyAwarded: false };
}

/**
 * Mark that the first attempt of this exercise was wrong, WITHOUT
 * deciding the final award yet (used so a later correct retry cannot
 * claim the first-try bonus). Idempotent.
 */
export async function markFirstAttemptFailed(exerciseId) {
  if (!exerciseId || typeof exerciseId !== 'string') return false;
  const state = await loadXp();
  if (state.awarded[exerciseId]) return false; // already settled — keep it
  state.awarded[exerciseId] = { xp: 0, reason: 'first-attempt-failed', at: Date.now() };
  await saveXp(state);
  return true;
}

/* ---------- lesson completion bonus ---------- */

/**
 * Award the one-time lesson-completion bonus.
 * Returns { delta, total, alreadyAwarded }.
 */
export async function awardLessonComplete(lessonId) {
  if (!lessonId || typeof lessonId !== 'string') {
    return { delta: 0, total: (await loadXp()).total, alreadyAwarded: false };
  }
  const state = await loadXp();
  if (state.lessonBonus[lessonId]) {
    return { delta: 0, total: state.total, alreadyAwarded: true };
  }
  const xp = XP_CONFIG.LESSON_COMPLETE;
  state.lessonBonus[lessonId] = { xp, at: Date.now() };
  state.total += xp;
  state.history.push({ kind: 'lesson', id: lessonId, xp, reason: 'lesson-complete', at: Date.now() });
  if (state.history.length > HISTORY_LIMIT) state.history.splice(0, state.history.length - HISTORY_LIMIT);
  await saveXp(state);
  return { delta: xp, total: state.total, alreadyAwarded: false };
}

/** True if this exercise already settled its (possibly zero) award. */
export async function isExerciseAwarded(exerciseId) {
  const state = await loadXp();
  return Boolean(state.awarded[exerciseId]);
}

/* ---------- read helpers ---------- */

export async function getTotalXp() {
  return (await loadXp()).total;
}

export async function getXpSummary() {
  const state = await loadXp();
  const bonuses = Object.keys(state.lessonBonus).length;
  const positive = Object.values(state.awarded).filter((a) => a && a.xp > 0).length;
  return {
    total: state.total,
    exercisesRewarded: positive,
    lessonBonuses: bonuses,
    recentHistory: state.history.slice(-12).reverse(),
  };
}

/** Test hook: wipe XP state. */
export async function _resetXpForTests() {
  await kvSet(K_XP, emptyState());
}
