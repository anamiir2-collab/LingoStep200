/* ============================================================
   LingoStep — motivation.js
   Picks an Arabic motivational message for a given context.

   - Data lives in data/motivational-messages.js (spec requirement:
     messages in a standalone data file).
   - "{name}" placeholder: replaced by the user's name when set;
     removed cleanly (with leftover Arabic vocative punctuation)
     when no name is configured.
   - Deterministic helpers are Node-testable; pick* functions
     randomize among the category's messages without repeating the
     immediately previous one.
   ============================================================ */

import { MOTIVATIONAL_MESSAGES, MOTIVATION_FALLBACK } from '../data/motivational-messages.js';

export const MOTIVATION_CATEGORIES = Object.keys(MOTIVATIONAL_MESSAGES);

/** Count of messages per category (used by tests / settings info). */
export function categoryCounts() {
  const out = {};
  for (const [cat, list] of Object.entries(MOTIVATIONAL_MESSAGES)) {
    out[cat] = Array.isArray(list) ? list.length : 0;
  }
  return out;
}

/** Total number of messages across all categories. */
export function totalMessageCount() {
  return Object.values(categoryCounts()).reduce((s, n) => s + n, 0);
}

/**
 * Apply the {name} placeholder.
 * - name set  → "… يا {name}، …" becomes "… يا أحمد، …"
 * - name absent → the placeholder AND a preceding vocative "يا "
 *   (or trailing "،") are removed without double spaces or dangling commas.
 */
export function applyName(template, name) {
  let out = String(template ?? '');
  const clean = String(name ?? '').trim();
  if (!out.includes('{name}')) return out.replace(/\s+/g, ' ').trim();
  if (clean) {
    out = out.replace(/\{name\}/g, clean);
  } else {
    // remove "يا {name}،" / "يا {name}," pairs first, then bare "{name}"
    out = out
      .replace(/(^|\s)يا\s*\{name\}\s*،?/g, '$1')
      .replace(/(^|\s)يا\s*\{name\}/g, '$1')
      .replace(/،?\s*\{name\}/g, '')
      .replace(/\{name\}/g, '');
  }
  return out
    .replace(/\s+،/g, '،') // no space before Arabic comma
    .replace(/\s+,/g, ',')
    .replace(/،\s*،/g, '،')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s*،\s*/, '')
    .trim();
}

/** Pick a random message from a category (never the same as `avoid`). */
export function pickForCategory(category, { name = '', avoid = '' } = {}) {
  const list = MOTIVATIONAL_MESSAGES[category];
  if (!Array.isArray(list) || list.length === 0) return applyName(MOTIVATION_FALLBACK, name);
  let pool = list;
  if (list.length > 1 && avoid) {
    const filtered = list.filter((m) => m !== avoid);
    if (filtered.length) pool = filtered;
  }
  const msg = pool[Math.floor(Math.random() * pool.length)];
  return applyName(msg, name);
}

/* ---------- context helpers (used by the lesson engine) ---------- */

export function messageForCorrect(name, avoid) {
  return pickForCategory('correct', { name, avoid });
}

export function messageForXp(name, avoid) {
  return pickForCategory('xp', { name, avoid });
}

export function messageForLessonComplete(name, avoid) {
  return pickForCategory('lessonComplete', { name, avoid });
}

export function messageForWrong(name, avoid) {
  return pickForCategory('wrongEncourage', { name, avoid });
}

export function messageForStreak(name, avoid) {
  return pickForCategory('streak', { name, avoid });
}

export function messageForFirstVisit(name, avoid) {
  return pickForCategory('firstVisit', { name, avoid });
}

export function messageForReview(name, avoid) {
  return pickForCategory('review', { name, avoid });
}
