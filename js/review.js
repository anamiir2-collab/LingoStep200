/* ============================================================
   LingoStep — review.js
   Spaced repetition (SM-2 inspired, simplified and predictable):
     - wrong / skipped answers return sooner
     - consecutive correct answers grow the interval
   Items are stored per exerciseId with scheduling fields.
   Node-importable.
   ============================================================ */

import { kvGet, kvSet } from './storage.js';

const K_REVIEW = 'review';
const DAY = 86400000;

// interval ladder (days) after each correct review answer
const LADDER = [1, 2, 4, 8, 16, 35];

function emptyItem(lessonId, tags = []) {
  return {
    lessonId,
    tags,
    ease: 2.5,
    intervalDays: 0,      // 0 = due immediately
    reps: 0,
    lapses: 0,
    dueAt: Date.now(),    // epoch ms
    lastResult: null,
    difficult: false,
    addedAt: Date.now(),
  };
}

async function loadReview() {
  const v = await kvGet(K_REVIEW, {});
  return v && typeof v === 'object' ? v : {};
}

/** Ensure an item exists (called on wrong answers / skips). */
export async function upsertOnWrong(exerciseId, lessonId, tags = []) {
  const review = await loadReview();
  const item = review[exerciseId] || emptyItem(lessonId, tags);
  item.dueAt = Date.now();          // come back very soon
  item.lastResult = 'wrong';
  item.lapses += 1;
  item.intervalDays = 0;
  item.difficult = item.lapses >= 3;
  if (!item.lessonId) item.lessonId = lessonId;
  if (tags.length) item.tags = tags;
  review[exerciseId] = item;
  await kvSet(K_REVIEW, review);
  return item;
}

/**
 * Grade a review answer (used inside revision sessions).
 * correct=true pushes to the next ladder step; false resets it.
 */
export async function gradeReview(exerciseId, correct) {
  const review = await loadReview();
  const item = review[exerciseId];
  if (!item) return null;
  if (correct) {
    const step = Math.min(item.reps, LADDER.length - 1);
    item.intervalDays = LADDER[step];
    item.reps = Math.min(item.reps + 1, LADDER.length);
    item.lastResult = 'correct';
    // 2 correct answers in a row clears the difficult flag
    if (item.reps >= 2) item.difficult = false;
  } else {
    item.reps = 0;
    item.intervalDays = 0;
    item.lapses += 1;
    item.difficult = item.lapses >= 3;
    item.lastResult = 'wrong';
  }
  item.dueAt = correct ? Date.now() + item.intervalDays * DAY : Date.now() + 10 * 60000;
  review[exerciseId] = item;
  await kvSet(K_REVIEW, review);
  return item;
}

/** All items due at (or before) a timestamp. Sorted by dueAt. */
export async function dueItems(now = Date.now()) {
  const review = await loadReview();
  return Object.entries(review)
    .filter(([, it]) => it.dueAt <= now)
    .map(([exerciseId, it]) => ({ exerciseId, ...it }))
    .sort((a, b) => a.dueAt - b.dueAt);
}

/** Count of due items. */
export async function dueCount(now = Date.now()) {
  const review = await loadReview();
  let n = 0;
  for (const it of Object.values(review)) if (it.dueAt <= now) n += 1;
  return n;
}

/** Total items tracked. */
export async function totalCount() {
  const review = await loadReview();
  return Object.keys(review).length;
}

/** Items filtered by lesson or grammar tag. */
export async function itemsByFilter({ lessonId = null, tag = null } = {}) {
  const review = await loadReview();
  return Object.entries(review)
    .filter(([, it]) => (!lessonId || it.lessonId === lessonId) && (!tag || (it.tags || []).includes(tag)))
    .map(([exerciseId, it]) => ({ exerciseId, ...it }));
}

/** Distinct grammar tags present in the review queue. */
export async function availableTags() {
  const review = await loadReview();
  const set = new Set();
  for (const it of Object.values(review)) (it.tags || []).forEach((tg) => set.add(tg));
  return [...set].sort();
}

export async function removeItem(exerciseId) {
  const review = await loadReview();
  delete review[exerciseId];
  await kvSet(K_REVIEW, review);
}

export async function clearReview() {
  await kvSet(K_REVIEW, {});
}
