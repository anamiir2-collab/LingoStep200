/* ============================================================
   LingoStep — exercise-state.js  (v9 smart exercise engine)
   Pure, Node-testable state machines that power the three
   keyboard-free answer surfaces plus the mandatory-skip logic.

   Word state model (spec: "Use a reliable state model to
   distinguish: Empty word / Active word / Incorrect answer /
   Correct locked word / Completed exercise"):

     empty      — the word has not been started
     active     — the word currently being completed (one at a time)
     incorrect  — placed but wrong (word-order chips; never locked)
     locked     — validated correct → green, frozen, cannot be
                  deleted, edited, replaced or moved
     (session complete = every word locked)

   Locking rules enforced here (not just styled):
     - a locked word can never be edited or removed
     - backspace only ever touches the ACTIVE word
     - there is no clear-all operation at all
     - incorrect words never lock

   Hint policy enforced here:
     - revealFirstLetter() targets the CURRENT active word only
     - it reveals at most half of the word's letters (so repeated
       presses can never reveal the complete word)
     - already-completed (locked) words are never re-revealed
     - one-letter words can never be hinted (that would be the
       whole word)

   Skip policy (spec: never allow unanswered skipping):
     - pickAlternativeQuestion() selects a DIFFERENT exercise from
       the same lesson, preferring the same difficulty, excluding
       everything already used as an alternative or answered
     - returns null when no honest alternative exists — the UI
       must then require the learner to complete the question
   ============================================================ */

import { isOptionalChar } from './letter-track.js';

export const WORD_STATE = {
  EMPTY: 'empty',
  ACTIVE: 'active',
  INCORRECT: 'incorrect',
  LOCKED: 'locked',
};

/* ---------- shared helpers ---------- */

/** Split a sentence into display tokens (spaces separate words;
 *  punctuation stays attached for display). */
export function sentenceTokens(sentence) {
  return String(sentence ?? '').trim().split(/\s+/).filter(Boolean);
}

/** Required (typeable) characters of one display token. */
function requiredCharsOf(token) {
  const chars = Array.from(token);
  const out = [];
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    if (isOptionalChar(ch, chars[i - 1], chars[i + 1])) continue;
    out.push(ch);
  }
  return out;
}

/** Canonical tokens for grading/order comparison (punctuation-free,
 *  but word-internal apostrophes are preserved: don't stays one token). */
export function canonicalTokens(sentence) {
  return String(sentence ?? '')
    .replace(/[.,!?;:"“”()[\]{}]+/g, ' ')
    .replace(/(?<![a-zA-Z])'|'(?![a-zA-Z])/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/* ============================================================
   1) Word-by-word dictation session (listen-and-type)
   ============================================================ */

/**
 * Build a dictation word session.
 * opts: { sentence, random }  (random is injectable for tests)
 * The session keeps a per-word buffer of typed REQUIRED characters.
 * Optional punctuation is printed in place by the surface and never
 * typed (same policy as the original app).
 */
export function createWordSession(opts = {}) {
  const sentence = String(opts.sentence ?? '').trim();
  const random = typeof opts.random === 'function' ? opts.random : Math.random;
  const displayTokens = sentenceTokens(sentence);
  if (!displayTokens.length) return null;

  const words = displayTokens.map((token) => ({
    text: token,                       // display token (with punctuation)
    required: requiredCharsOf(token),  // typeable characters
    typed: [],                         // typed chars (expected letters)
    revealed: [],                      // per required slot: hint-revealed?
    state: WORD_STATE.EMPTY,
  }));

  let activeIdx = 0;
  if (words[0]) words[0].state = WORD_STATE.ACTIVE;

  function isComplete() {
    return words.every((w) => w.state === WORD_STATE.LOCKED);
  }

  function activeWord() {
    return words[activeIdx] || null;
  }

  /** Refresh active pointer after a lock. */
  function advance() {
    while (activeIdx < words.length && words[activeIdx].state === WORD_STATE.LOCKED) {
      activeIdx += 1;
    }
    if (activeIdx < words.length) words[activeIdx].state = WORD_STATE.ACTIVE;
  }

  /**
   * Place one letter into the ACTIVE word (prefix-validated, so a
   * wrong letter is rejected exactly like the original typing policy).
   * Returns { accepted, wordLocked, sessionComplete, reason? }.
   */
  function placeLetter(ch) {
    const w = activeWord();
    if (!w || isComplete()) return { accepted: false, wordLocked: false, sessionComplete: isComplete(), reason: 'no-active-word' };
    const pos = w.typed.length;
    if (pos >= w.required.length) return { accepted: false, wordLocked: false, sessionComplete: false, reason: 'word-full' };
    const expected = w.required[pos];
    if (String(ch ?? '').toLowerCase() !== expected.toLowerCase()) {
      return { accepted: false, wordLocked: false, sessionComplete: false, reason: 'wrong-letter' };
    }
    w.typed.push(expected);
    w.revealed[pos] = Boolean(w.revealed[pos]);
    let wordLocked = false;
    if (w.typed.length === w.required.length) {
      w.state = WORD_STATE.LOCKED;   // validated correct → locked forever
      advance();
      wordLocked = true;
    }
    return { accepted: true, wordLocked, sessionComplete: isComplete() };
  }

  /**
   * Backspace: removes the LAST typed letter of the ACTIVE word only.
   * Locked words are untouchable (spec: prevent accidental deletion).
   * Returns { removed, letter } — removed=false when nothing to remove.
   */
  function removeLastLetter() {
    if (isComplete()) return { removed: false };
    const w = activeWord();
    if (!w || !w.typed.length) return { removed: false };
    const letter = w.typed.pop();
    const pos = w.typed.length;
    w.revealed[pos] = false;
    return { removed: true, letter };
  }

  /**
   * Smart hint: reveal the next hidden letter of the ACTIVE word,
   * capped at half the word (a repeated hint can never spell the
   * whole word). One-letter words are never hinted.
   * Returns:
     { revealed:true, letter, slot }            — success
     { revealed:false, reason:'cap-reached' }    — press again does nothing
     { revealed:false, reason:'word-too-short' } — 1-letter word
     { revealed:false, reason:'complete' }       — nothing left
   */
  function revealFirstLetter() {
    if (isComplete()) return { revealed: false, reason: 'complete' };
    const w = activeWord();
    if (!w) return { revealed: false, reason: 'complete' };
    if (w.required.length < 2) return { revealed: false, reason: 'word-too-short' };
    const cap = Math.floor(w.required.length / 2);
    const revealedCount = w.revealed.filter(Boolean).length;
    if (revealedCount >= Math.max(1, cap)) return { revealed: false, reason: 'cap-reached' };
    const slot = w.typed.length;
    if (slot >= w.required.length) return { revealed: false, reason: 'cap-reached' };
    const letter = w.required[slot];
    w.typed.push(letter);
    w.revealed[slot] = true;
    let wordLocked = false;
    if (w.typed.length === w.required.length) {
      w.state = WORD_STATE.LOCKED;
      advance();
      wordLocked = true;
    }
    return { revealed: true, letter, slot, wordLocked, sessionComplete: isComplete() };
  }

  /** First letter of the active word (for the hint button label). */
  function activeFirstLetter() {
    const w = activeWord();
    return w ? w.required[0] : null;
  }

  /** Full typed value (what checkAnswer grades) — spaces between words. */
  function getValue() {
    return words.filter((w) => w.typed.length).map((w) => w.typed.join('')).join(' ');
  }

  /** Snapshot for rendering/tests. */
  function wordsView() {
    return words.map((w) => ({
      text: w.text,
      state: w.state,
      progress: w.typed.length,
      length: w.required.length,
      revealed: [...w.revealed],
    }));
  }

  /** Restart the whole attempt (explicit confirmation lives in the UI). */
  function reset() {
    for (const w of words) {
      w.typed = [];
      w.revealed = [];
      w.state = WORD_STATE.EMPTY;
    }
    activeIdx = 0;
    if (words[0]) words[0].state = WORD_STATE.ACTIVE;
  }

  return {
    sentence,
    isComplete,
    activeIndex: () => activeIdx,
    activeWordIndex: () => activeIdx,
    placeLetter,
    removeLastLetter,
    revealFirstLetter,
    activeFirstLetter,
    getValue,
    wordsView,
    reset,
  };
}

/* ============================================================
   2) Word-order session (tap-to-build with positional locking)
   ============================================================ */

/**
 * expectedSentence — canonical sentence (acceptedAnswers[0] || ex.en)
 * chips            — ex.words (the shuffled chips offered to the learner)
 * The expected sequence is derived from the canonical sentence, so
 * grading stays with the original checkAnswer pipeline.
 */
export function createWordOrderSession({ expectedSentence, chips }) {
  const expected = canonicalTokens(expectedSentence);
  const bank = (Array.isArray(chips) ? chips : []).map((text, chipId) => ({
    text: String(text),
    chipId,
    used: false,
  }));
  const slots = expected.map((text, i) => ({
    expectedText: text,
    chip: null,        // { chipId, text }
    state: WORD_STATE.EMPTY,
    position: i,
  }));

  function lockedCount() {
    return slots.filter((s) => s.state === WORD_STATE.LOCKED).length;
  }
  function nextOpenSlot() {
    return slots.find((s) => !s.chip) || null;
  }
  function isComplete() {
    return slots.every((s) => s.state === WORD_STATE.LOCKED);
  }

  /**
   * Place a chip into the first open slot.
   * Correct  → locked immediately (green, frozen, cannot be removed)
   * Wrong    → placed with state 'incorrect' (red, removable)
   * Returns { placed, locked, sessionComplete }.
   */
  function place(chipId) {
    const chip = bank.find((c) => c.chipId === chipId && !c.used);
    if (!chip) return { placed: false, reason: 'chip-unavailable' };
    const slot = nextOpenSlot();
    if (!slot) return { placed: false, reason: 'all-slots-filled' };
    chip.used = true;
    slot.chip = { chipId: chip.chipId, text: chip.text };
    const correct = chip.text.toLowerCase() === slot.expectedText.toLowerCase();
    slot.state = correct ? WORD_STATE.LOCKED : WORD_STATE.INCORRECT; // incorrect never locks
    return { placed: true, locked: correct, sessionComplete: isComplete() };
  }

  /** Remove an UNLOCKED placed chip (locked words refuse). */
  function removeAt(position) {
    const slot = slots[position];
    if (!slot || !slot.chip) return { removed: false };
    if (slot.state === WORD_STATE.LOCKED) return { removed: false, reason: 'locked' }; // protected
    bank.find((c) => c.chipId === slot.chip.chipId).used = false;
    slot.chip = null;
    slot.state = WORD_STATE.EMPTY;
    return { removed: true };
  }

  /** The next expected word (for the first-letter hint clue). */
  function nextExpectedWord() {
    const slot = nextOpenSlot();
    return slot ? slot.expectedText : null;
  }

  /** Built value (graded by checkAnswer against acceptedAnswers). */
  function getValue() {
    return slots.filter((s) => s.chip).map((s) => s.chip.text).join(' ');
  }

  function slotsView() {
    return slots.map((s) => ({
      expectedText: s.expectedText,
      chip: s.chip ? { ...s.chip } : null,
      state: s.chip ? s.state : WORD_STATE.EMPTY,
      locked: s.state === WORD_STATE.LOCKED,
      position: s.position,
    }));
  }

  function bankView() {
    return bank.map((c) => ({ chipId: c.chipId, text: c.text, used: c.used }));
  }

  return {
    expected,
    isComplete,
    lockedCount,
    place,
    removeAt,
    nextExpectedWord,
    getValue,
    slotsView,
    bankView,
  };
}

/* ============================================================
   3) Mandatory skip — alternative question picker
   ============================================================ */

/**
 * Pick a different exercise from the SAME lesson to answer instead
 * of a skipped one. Prefers the same difficulty; never returns the
 * skipped exercise, an already-used alternative, or an answered one.
 * Order is deterministic (wraps forward from the skipped index).
 * Returns { exercise, index } or null (→ the UI must require the
 * learner to complete the current question).
 */
export function pickAlternativeQuestion({ exercises, currentIndex, usedIds = new Set(), answeredIds = new Set() }) {
  if (!Array.isArray(exercises) || exercises.length < 2) return null;
  const cur = exercises[currentIndex];
  if (!cur) return null;
  const n = exercises.length;
  const blocked = (ex, i) => i === currentIndex
    || usedIds.has(ex.id)
    || answeredIds.has(ex.id)
    || ex.id === cur.id;

  const wrapped = [];
  for (let k = 1; k < n; k += 1) wrapped.push((currentIndex + k) % n);
  const candidates = wrapped.filter((i) => !blocked(exercises[i], i));
  if (!candidates.length) return null;
  const sameDifficulty = candidates.filter((i) => exercises[i].difficulty === cur.difficulty);
  const pool = sameDifficulty.length ? sameDifficulty : candidates;
  const index = pool[0];
  return { exercise: exercises[index], index };
}
