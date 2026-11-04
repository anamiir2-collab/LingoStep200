/* ============================================================
   LingoStep — progress.js
   Learning progress: attempts, lesson state, daily goal, streak,
   time tracking, resume position, export/import backup.
   Data lives in the storage.js backend (IndexedDB preferred).
   Node-importable (uses memory backend when no IDB/localStorage).
   ============================================================ */

import { kvGet, kvSet, kvDel } from './storage.js';
import { dayKey, daysBetween } from './utils.js';

const K = {
  attempts: 'attempts',       // { [exerciseId]: Attempt[] } capped per exercise
  lessons: 'lessons',         // { [lessonId]: LessonState }
  daily: 'daily',             // { [YYYY-MM-DD]: { count, timeMs, correct } }
  meta: 'meta',               // { lastLessonId, lastExerciseIndex, streak, bestStreak, lastActiveDay }
};

const MAX_ATTEMPTS_PER_EXERCISE = 10;

/* ---------- low-level loaders ---------- */

async function loadMap(key) {
  const v = await kvGet(key, {});
  return v && typeof v === 'object' ? v : {};
}

/* ---------- attempts ---------- */

/**
 * Record one answered exercise.
 * status: 'correct' | 'minor' | 'incorrect' | 'skipped'
 */
export async function recordAttempt({ lessonId, exerciseId, type, status, timeMs = 0, tags = [] }) {
  const attempts = await loadMap(K.attempts);
  const list = attempts[exerciseId] || [];
  list.push({
    lessonId,
    type,
    status,
    tags,
    timeMs,
    at: Date.now(),
  });
  while (list.length > MAX_ATTEMPTS_PER_EXERCISE) list.shift();
  attempts[exerciseId] = list;
  await kvSet(K.attempts, attempts);

  // daily counters
  const today = dayKey();
  const daily = await loadMap(K.daily);
  const day = daily[today] || { count: 0, timeMs: 0, correct: 0 };
  if (status !== 'skipped') {
    day.count += 1;
    day.timeMs += Math.min(timeMs || 0, 5 * 60000);
    if (status === 'correct') day.correct += 1;
  }
  daily[today] = day;
  await kvSet(K.daily, daily);

  // meta / streak
  const meta = await loadMap(K.meta);
  const lastActive = meta.lastActiveDay;
  if (lastActive !== today) {
    const gap = lastActive ? daysBetween(lastActive, today) : null;
    if (gap === null || gap === 1) meta.streak = (meta.streak || 0) + (gap === 0 ? 0 : 1);
    else meta.streak = 1;
    meta.lastActiveDay = today;
    meta.bestStreak = Math.max(meta.bestStreak || 0, meta.streak || 0);
  } else if (!meta.streak) {
    meta.streak = 1;
  }
  meta.lastLessonId = lessonId;
  await kvSet(K.meta, meta);

  return true;
}

/** Save resume position for a lesson. */
export async function saveResume(lessonId, exerciseIndex) {
  const meta = await loadMap(K.meta);
  meta.lastLessonId = lessonId;
  meta.lastExerciseIndex = exerciseIndex;
  await kvSet(K.meta, meta);
}

/* ---------- lesson state ---------- */

/**
 * Update a lesson's aggregate state after answering.
 * completion: fraction of attempted exercises.
 */
export async function updateLessonState(lessonId, { totalExercises, index, status }) {
  const lessons = await loadMap(K.lessons);
  const st = lessons[lessonId] || {
    attempted: {},       // exerciseId -> best status
    bestAccuracy: 0,
    completed: false,
    completedAt: 0,
    lastIndex: 0,
    updatedAt: 0,
  };
  const prev = st.attempted[index];
  // keep the best result per exercise index
  const rank = { skipped: 0, incorrect: 1, minor: 2, correct: 3 };
  if (!prev || rank[status] > rank[prev]) st.attempted[index] = status;

  st.lastIndex = index;
  st.updatedAt = Date.now();

  const values = Object.values(st.attempted);
  const good = values.filter((s) => s === 'correct').length;
  const answered = values.filter((s) => s !== 'skipped').length;
  if (answered > 0) {
    st.bestAccuracy = Math.max(st.bestAccuracy, Math.round((good / values.length) * 100));
  }
  if (totalExercises && values.length >= totalExercises) {
    const wasCompleted = st.completed;
    st.completed = true;
    st.completedAt = wasCompleted ? st.completedAt : Date.now();
  }
  lessons[lessonId] = st;
  await kvSet(K.lessons, lessons);
  return st;
}

export async function getLessonState(lessonId) {
  const lessons = await loadMap(K.lessons);
  return lessons[lessonId] || null;
}

export async function getAllLessonStates() {
  return loadMap(K.lessons);
}

/* ---------- aggregates ---------- */

export async function getOverview() {
  const [attempts, lessons, daily, meta] = await Promise.all([
    loadMap(K.attempts), loadMap(K.lessons), loadMap(K.daily), loadMap(K.meta),
  ]);

  let total = 0, correct = 0, timeMs = 0;
  for (const list of Object.values(attempts)) {
    for (const a of list) {
      if (a.status === 'skipped') continue;
      total += 1;
      if (a.status === 'correct') correct += 1;
      timeMs += Math.min(a.timeMs || 0, 5 * 60000);
    }
  }

  const completed = Object.values(lessons).filter((l) => l.completed).length;

  return {
    totalAnswers: total,
    correctAnswers: correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    studyTimeMs: timeMs,
    completedLessons: completed,
    streak: meta.streak || 0,
    bestStreak: meta.bestStreak || 0,
    lastLessonId: meta.lastLessonId || null,
    lastExerciseIndex: typeof meta.lastExerciseIndex === 'number' ? meta.lastExerciseIndex : 0,
  };
}

export async function getToday() {
  const daily = await loadMap(K.daily);
  const today = dayKey();
  return daily[today] || { count: 0, timeMs: 0, correct: 0 };
}

export async function getDailyHistory(nDays = 14) {
  const daily = await loadMap(K.daily);
  const out = [];
  const now = new Date();
  for (let i = nDays - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = dayKey(d);
    out.push({ day: key, ...(daily[key] || { count: 0, timeMs: 0, correct: 0 }) });
  }
  return out;
}

/** Attempt map for review system (exerciseId -> {lastStatus, count, lastAt}) */
export async function getAttemptSummary() {
  const attempts = await loadMap(K.attempts);
  const out = {};
  for (const [exId, list] of Object.entries(attempts)) {
    if (!list.length) continue;
    const last = list[list.length - 1];
    out[exId] = {
      lastStatus: last.status,
      attempts: list.length,
      incorrects: list.filter((a) => a.status === 'incorrect').length,
      lastAt: last.at,
      lessonId: last.lessonId,
      tags: last.tags || [],
    };
  }
  return out;
}

/* ---------- backup (v2) ---------- */

/* v2 carries the full learning profile: core progress + XP ledger,
   spaced-review queue, vocabulary stats, placement result and the
   daily plan. v1 files (core keys only) still import untouched. */
const BACKUP_VERSION = 2;

const EXTRA_BACKUP_KEYS = ['xp', 'review', 'vocabStats', 'placementResult', 'dailyPlan'];

function xpTotalOf(ledger) {
  if (!ledger || typeof ledger !== 'object') return 0;
  let total = 0;
  for (const a of Object.values(ledger.awarded || {})) total += Number(a?.xp) || 0;
  for (const b of Object.values(ledger.lessonBonus || {})) total += Number(b?.xp) || 0;
  return total;
}

export async function exportBackup() {
  const [attempts, lessons, daily, meta, xp, review, vocabStats, placementResult, dailyPlan] = await Promise.all([
    loadMap(K.attempts), loadMap(K.lessons), loadMap(K.daily), loadMap(K.meta),
    loadMap('xp'), loadMap('review'), loadMap('vocabStats'), loadMap('placementResult'), loadMap('dailyPlan'),
  ]);
  return {
    app: 'lingostep',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: { attempts, lessons, daily, meta, xp, review, vocabStats, placementResult, dailyPlan },
  };
}

/** Validate + apply a backup. replace=false merges (newer entries win). */
export async function importBackup(backup, { replace = true } = {}) {
  if (!backup || typeof backup !== 'object') throw new Error('invalid backup');
  if (backup.app !== 'lingostep') throw new Error('not a lingostep backup');
  if (!backup.data || typeof backup.data !== 'object') throw new Error('missing data');

  const d = backup.data;
  for (const key of ['attempts', 'lessons', 'daily', 'meta', ...EXTRA_BACKUP_KEYS]) {
    if (d[key] !== undefined && (typeof d[key] !== 'object' || d[key] === null || Array.isArray(d[key]))) {
      throw new Error(`invalid field: ${key}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}T/.test(String(backup.exportedAt ?? ''))) {
    throw new Error('invalid exportedAt');
  }

  if (replace) {
    await kvSet(K.attempts, d.attempts || {});
    await kvSet(K.lessons, d.lessons || {});
    await kvSet(K.daily, d.daily || {});
    await kvSet(K.meta, d.meta || {});
    for (const key of EXTRA_BACKUP_KEYS) await kvSet(key, d[key] || {});
  } else {
    // merge: keep whichever map has more entries / later dates (simple, predictable)
    for (const key of [K.attempts, K.lessons, K.daily]) {
      const cur = await loadMap(key);
      const inc = d[key] || {};
      const merged = { ...cur, ...inc };
      await kvSet(key, merged);
    }
    const curMeta = await loadMap(K.meta);
    await kvSet(K.meta, { ...curMeta, ...(d.meta || {}) });

    // review / vocab / plan: shallow key merge
    for (const key of ['review', 'vocabStats', 'dailyPlan']) {
      const cur = await loadMap(key);
      await kvSet(key, { ...cur, ...(d[key] || {}) });
    }
    // placement: keep the more recent result
    const curPlace = await loadMap('placementResult');
    const incPlace = d.placementResult || {};
    await kvSet('placementResult', (incPlace.at || 0) >= (curPlace.at || 0) ? incPlace : curPlace);

    // xp: per-exercise merge (newest entry wins), then rebuild the total
    const cur = await loadMap('xp');
    const inc = d.xp || {};
    const awarded = { ...(cur.awarded || {}) };
    for (const [exId, entry] of Object.entries(inc.awarded || {})) {
      const prev = awarded[exId];
      if (!prev || (entry?.at || 0) >= (prev.at || 0)) awarded[exId] = entry;
    }
    const lessonBonus = { ...(cur.lessonBonus || {}) };
    for (const [lesId, entry] of Object.entries(inc.lessonBonus || {})) {
      const prev = lessonBonus[lesId];
      if (!prev || (entry?.at || 0) >= (prev.at || 0)) lessonBonus[lesId] = entry;
    }
    const history = [...(cur.history || []), ...(inc.history || [])]
      .sort((a, b) => (b?.at || 0) - (a?.at || 0))
      .slice(0, 300);
    await kvSet('xp', { awarded, lessonBonus, history, total: xpTotalOf({ awarded, lessonBonus }) });
  }
  return true;
}

export async function clearAllProgress() {
  await kvDel(K.attempts);
  await kvDel(K.lessons);
  await kvDel(K.daily);
  await kvDel(K.meta);
  for (const key of EXTRA_BACKUP_KEYS) await kvDel(key);
  return true;
}
