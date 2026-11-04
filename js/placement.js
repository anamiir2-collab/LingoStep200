/* ============================================================
   LingoStep — placement.js
   Estimated level check (A1…C1) — pure, Node-testable logic.

   Honest design rules (spec, section 5):
   - Questions are REAL exercises sampled from the shipped lessons
     (multiple-choice preferred, fill-blank as fallback). Nothing is
     invented and nothing leaves the device.
   - Difficulty ascends A1 → C1; the session stops early once the
     estimate is stable enough (keeps the check short).
   - The same question can never be counted twice (id-based dedupe).
   - The result is an ESTIMATE. It never locks, hides or gates any
     lesson — recommendations only. Retaking is always allowed.
   - Weak grammar tags are derived from the user's actual wrong
     answers, so the plan reacts to real mistakes.
   ============================================================ */

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

/** Lesson level → ladder index (unknown levels clamp to A1). */
export function levelIndex(level) {
  const i = LEVELS.indexOf(String(level || 'A1').toUpperCase());
  return i >= 0 ? i : 0;
}

/**
 * Build the question plan from the manifest.
 * Pure + synchronous (loads happen later, per question).
 * Returns [{ level, lessonId }] with 3 lesson ids per level band,
 * ordered A1 → C1, deterministic (stable order — no RNG churn between
 * runs so a half-finished session stays comparable).
 */
export function buildPlacementPlan(manifest, { perLevel = 3 } = {}) {
  const byLevel = new Map();
  for (const entry of Array.isArray(manifest) ? manifest : []) {
    if (!entry || entry.available === false || !entry.id) continue;
    const li = levelIndex(entry.level);
    if (!byLevel.has(li)) byLevel.set(li, []);
    byLevel.get(li).push(entry);
  }
  const plan = [];
  for (let li = 0; li < LEVELS.length; li++) {
    const list = (byLevel.get(li) || []).slice()
      .sort((a, b) => String(a.id).localeCompare(String(b.id)));
    for (let k = 0; k < Math.min(perLevel, list.length); k++) {
      plan.push({ level: LEVELS[li], lessonId: list[k].id });
    }
  }
  return plan;
}

/** Pick the best exercise from a loaded lesson for one plan step. */
export function pickExerciseFromLesson(lesson, planStep) {
  if (!lesson || !Array.isArray(lesson.exercises) || !planStep) return null;
  const pool = lesson.exercises;
  // prefer multiple-choice (self-contained), then fill-blank, then word-order
  for (const type of ['multiple-choice', 'fill-blank', 'word-order']) {
    const candidates = pool.filter((ex) => ex && ex.type === type
      && (type !== 'multiple-choice' || (Array.isArray(ex.options) && Number.isInteger(ex.answerIndex))));
    if (candidates.length) {
      // prefer medium difficulty inside the band
      candidates.sort((a, b) => (a.difficulty || 1) - (b.difficulty || 1));
      return candidates[Math.floor(candidates.length / 2)] || null;
    }
  }
  return null;
}

/**
 * Grade one answer against the exercise with grading semantics
 * mirrored locally (pure — the engine imports checkAnswer itself;
 * this helper exists for tests and for the placement scorer).
 * acceptedAnswers/en arrays are compared case/punctuation-insensitively.
 */
export function isAnswerCorrect(ex, answer) {
  if (!ex || typeof answer !== 'string' || !answer.trim()) return false;
  const norm = (s) => String(s).toLowerCase()
    .replace(/['\u2019\u02BC]/g, '')            // apostrophes are fixed-position punctuation
    .replace(/[.,!?;:"()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const typed = norm(answer);
  if (ex.type === 'multiple-choice') {
    const correct = Array.isArray(ex.options) ? ex.options[ex.answerIndex] : null;
    return typed === norm(correct ?? '');
  }
  if (ex.type === 'fill-blank') {
    const list = Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers : [];
    return list.some((a) => norm(a) === typed);
  }
  if (ex.type === 'word-order') {
    const accepted = Array.isArray(ex.acceptedAnswers) && ex.acceptedAnswers.length
      ? ex.acceptedAnswers
      : [ex.en];
    return (accepted || []).some((a) => norm(a) === norm(typed));
  }
  return false;
}

/**
 * Ability estimate from the per-question results, in answer order.
 * results: [{ planIndex, level, correct }]
 * Returns { level: 'A1'…'C1', confidence: 'low'|'medium'|'high',
 *           answered, correct, weakTags: string[] }.
 *
 * Method (predictable, no black box):
 *   walk the ladder from A1; the estimated level is the highest rung
 *   where at least half of that band's answers were correct, defaulting
 *   to A1 when nothing was answered.
 */
export function estimateLevel(results) {
  const rows = (Array.isArray(results) ? results : []).filter((r) => r && r.level);
  const bands = new Map();
  const seen = new Set();
  let counted = 0;
  let countedCorrect = 0;
  for (const r of rows) {
    const dedupeKey = r.exerciseId || `${r.planIndex ?? r.lessonId ?? ''}:${r.level}`;
    if (seen.has(dedupeKey)) continue; // a question is never counted twice
    seen.add(dedupeKey);
    const li = levelIndex(r.level);
    if (!bands.has(li)) bands.set(li, { total: 0, correct: 0, wrongTags: [] });
    const b = bands.get(li);
    b.total += 1;
    counted += 1;
    if (r.correct) {
      b.correct += 1;
      countedCorrect += 1;
    }
    else for (const tg of r.tags || []) if (!b.wrongTags.includes(tg)) b.wrongTags.push(tg);
  }

  let best = 0; // A1 default
  for (let li = 0; li < LEVELS.length; li++) {
    const b = bands.get(li);
    if (!b || b.total === 0) break; // untested rung — stop climbing
    if (b.correct / b.total >= 0.5) best = li;
    else break;
  }

  const total = counted;
  const correct = countedCorrect;
  const conf = total >= 12 ? 'high' : total >= 7 ? 'medium' : 'low';

  const weakTags = [];
  for (let li = 0; li < LEVELS.length; li++) {
    const b = bands.get(li);
    if (!b) continue;
    // wrong answers are real mistakes wherever they happened — collect
    // tags from every tested band, strongest signal first
    for (const tg of b.wrongTags) if (!weakTags.includes(tg)) weakTags.push(tg);
  }

  return { level: LEVELS[best], confidence: conf, answered: total, correct, weakTags: weakTags.slice(0, 6) };
}

/**
 * Lesson recommendations from a placement result.
 * Order: lessons that target weak tags first (same level or one below),
 * then the entry lessons of the estimated level. Never gates content.
 */
export function recommendedLessons(result, manifest, { limit = 6 } = {}) {
  if (!result || !Array.isArray(manifest)) return [];
  const li = levelIndex(result.level);
  const entries = manifest.filter((e) => e && e.id && e.available !== false);

  const byId = new Map(entries.map((e) => [e.id, e]));
  const weak = Array.isArray(result.weakTags) ? result.weakTags : [];
  const scored = [];
  for (const e of entries) {
    const eli = levelIndex(e.level);
    if (eli > li) continue; // do not push above the estimated level
    const overlap = weak.filter((tg) => (e.tags || []).includes(tg)).length;
    scored.push({ e, score: overlap * 10 - Math.abs(eli - li) });
  }
  scored.sort((a, b) => b.score - a.score || String(a.e.id).localeCompare(String(b.e.id)));

  const out = [];
  const seen = new Set();
  for (const { e } of scored) {
    if (out.length >= limit) break;
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    out.push(e);
  }
  return out.map((e) => ({ id: e.id, title: e.title, titleAr: e.titleAr, level: e.level, section: e.section }));
}

/** Persisted placement result shape validator. */
export function isValidPlacementResult(v) {
  return Boolean(v
    && typeof v === 'object'
    && typeof v.level === 'string'
    && LEVELS.includes(v.level)
    && typeof v.answered === 'number'
    && Array.isArray(v.weakTags)
    && typeof v.at === 'number');
}
