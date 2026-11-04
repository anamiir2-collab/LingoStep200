/* ============================================================
   LingoStep — touch-typing.js  (v9 keyboard-free answer surfaces)
   100% keyboard-free answer surfaces for lessons, placement test
   and dialogue practice. NO real <input> element is ever created,
   so the Android/iOS system keyboard can NEVER appear during a
   learning activity.

   v9 BREAKING CHANGE — the built-in QWERTY touch pad is GONE.
   The old tt-keyboard (26-key layout + space + ⌫) was removed
   completely; there is no typing keyboard anywhere in the
   learning experience. Answers are built by TOUCH only:

   1) createTouchTypingField({ expected, ... })
      Dictation surface for listen-and-type / dialogue practice.
      - Letter slots grouped by word (same word-grouped track and
        punctuation policy as before — letter-track helpers).
      - The ACTIVE word is completed with letter TILES: the letters
        of the current word plus a few decoy letters, shuffled.
        Wrong letters are rejected (shake + buzz) — the same
        prefix policy as the original typing pipeline.
      - Words LOCK word-by-word: a completed word turns green and
        is frozen (cannot be deleted, edited or replaced). The
        space after it is inserted automatically.
      - Backspace (single ⌫ button) only ever removes the last
        letter of the ACTIVE word — locked words are untouchable.
        There is NO clear-all button anywhere.
      - Smart hints: revealHint() reveals the next hidden letter
        of the active word (capped at half the word, never the
        whole word) and styles it in the hint color.
      - Physical keyboards still work on desktop through a
        document-level keydown listener (no input to focus).

   2) createLetterTiles({ source, ... })
      Word/letter tile builder for fill-blank answers (original
      question + acceptedAnswers validation untouched): tiles of
      the blank word (or words for multi-word blanks), shuffled;
      tap to place, tap a placed tile to remove it, ⌫ removes the
      last one. The clear-all button was REMOVED. When the answer
      is validated correct, lockCorrect() freezes the placed tiles
      green; markIncorrect() shows the red state (never locks).

   Pure logic helpers (validateKeystroke / buildTiles) are DOM-free
   and Node-testable; the word state machine lives in
   exercise-state.js (pure, tested).
   ============================================================ */

import { splitSegments, alignTyped, isOptionalChar } from './letter-track.js';
import { createWordSession } from './exercise-state.js';
import { getSettings } from './settings.js';
import { el } from './utils.js';

/* ---------- shared feedback tones (same policy as before) ---------- */

let sharedCtx = null;

function audioCtx() {
  try {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx || sharedCtx.state === 'closed') sharedCtx = new Ctx();
    if (sharedCtx.state === 'suspended') sharedCtx.resume().catch(() => {});
    return sharedCtx;
  } catch {
    return null;
  }
}

function tone(freq, { dur = 0.09, delay = 0, gain = 0.06, type = 'sine' } = {}) {
  try {
    const ctx = audioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = () => {
      try { osc.disconnect(); g.disconnect(); } catch { /* ignore */ }
    };
  } catch { /* sound is optional; never block input */ }
}

function effectsEnabled() {
  try { return getSettings().soundEffects !== false; } catch { return true; }
}

function soundCorrect() { if (effectsEnabled()) tone(660, { dur: 0.07, gain: 0.045 }); }
function soundWrong() { if (effectsEnabled()) tone(180, { dur: 0.13, gain: 0.05, type: 'sawtooth' }); }
function soundComplete() {
  if (!effectsEnabled()) return;
  tone(523.25, { dur: 0.09, gain: 0.055, delay: 0 });
  tone(659.25, { dur: 0.09, gain: 0.055, delay: 0.09 });
  tone(783.99, { dur: 0.16, gain: 0.06, delay: 0.18 });
}
function soundErase() { if (effectsEnabled()) tone(440, { dur: 0.05, gain: 0.03 }); }
function soundLock() {
  if (!effectsEnabled()) return;
  tone(587.33, { dur: 0.07, gain: 0.05 });
  tone(880, { dur: 0.1, gain: 0.05, delay: 0.07 });
}

/* ============================================================
   Pure logic — Node-testable (kept for validation parity)
   ============================================================ */

/**
 * Validate one keystroke against the expected sentence.
 * Mirrors the ORIGINAL character-check policy exactly:
 *   - unmatched letters before completion  → rejected
 *   - real letters typed beyond completion → rejected (original `extraBad`)
 *   - punctuation at/after completion      → accepted & kept (grading
 *     ignores punctuation, same as the original input pipeline)
 */
export function validateKeystroke(expected, buffer, ch) {
  const candidate = String(buffer ?? '') + String(ch ?? '');
  const a = alignTyped(expected, candidate);
  const before = alignTyped(expected, String(buffer ?? ''));
  const rejected = (a.typedUsed < candidate.length && !a.complete) || a.extraBad;
  if (rejected) return { accepted: false, buffer, complete: before.complete };
  return { accepted: true, buffer: candidate, complete: a.complete, progress: a.typedUsed - before.typedUsed };
}

/**
 * Backspace over the buffer. Returns the next buffer value.
 * Trailing optional punctuation is never in the buffer (never
 * typed), so a plain slice matches the original behavior.
 */
export function backspaceBuffer(buffer) {
  return String(buffer ?? '').slice(0, -1);
}

/**
 * Build the tile list for a fill-blank answer.
 * Single-word blanks → letters; multi-word blanks → words.
 * Shuffle is deterministic-safe: short answers never render in
 * the exact expected order (that would give the answer away).
 * Returns array of string tiles.
 */
export function buildTiles(source, random = Math.random) {
  const src = String(source ?? '').trim();
  if (!src) return [];
  const multiWord = /\s/.test(src);
  const tiles = multiWord ? src.split(/\s+/) : Array.from(src);
  // Fisher–Yates on a copy
  const arr = [...tiles];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // never present the identity order for short tile sets
  const same = arr.length === tiles.length && arr.every((t, i) => t === tiles[i]);
  if (same && arr.length > 1) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  }
  return arr;
}

/** The characters a word may additionally require (' or -). */
export function requiredKeyChars(expected) {
  const need = new Set();
  const chars = Array.from(String(expected ?? ''));
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (/[a-z0-9]/i.test(ch)) continue;
    if (isOptionalChar(ch, chars[i - 1], chars[i + 1])) continue;
    if (ch === "'") need.add("'");
    if (ch === '-') need.add('-');
    if (ch === ' ') need.add('space');
  }
  return need;
}

/* ---------- letter tiles for the active word ---------- */

const DECOY_POOL = 'aeeiiooustnrlhcdmupgbfkwvyzxj';

/**
 * Build the tile bank for the active word: every required letter
 * (one tile per letter) plus a handful of decoys, shuffled.
 */
export function buildWordTiles(word, { extra = 6, random = Math.random } = {}) {
  const req = Array.from(String(word ?? ''));
  const decoyCount = Math.min(10, Math.max(4, Math.round(req.length * 0.8))) + (extra ?? 0);
  const pool = DECOY_POOL.split('');
  const decoys = [];
  for (let i = 0; i < decoyCount; i += 1) {
    decoys.push(pool[Math.floor(random() * pool.length)]);
  }
  const all = [...req, ...decoys];
  for (let i = all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

/* ============================================================
   1) Touch typing field (dictation, tile-driven, word locking)
   ============================================================ */

/**
 * Create a keyboard-free dictation field.
 * opts: {
 *   expected:      String  — the full expected sentence (unchanged content)
 *   ariaLabel:     String
 *   onChanged:     (value) => void
 *   onWrong:       () => void          (rejected letter)
 *   onWordLocked:  (index) => void     (a word just locked green)
 *   onComplete:    () => void          (sentence fully entered; fires once)
 *   onEnter:       () => void          (desktop Enter convenience)
 *   labels:        { backspace }       (space is automatic between words)
 *   tilesAria:     String
 * }
 * Returns { root, surface, getValue, isComplete, shake, render,
 *           revealHint, removeLast, setValue, destroy }.
 */
export function createTouchTypingField(opts = {}) {
  const expected = String(opts.expected ?? '');
  const labels = opts.labels || {};
  const session = createWordSession({ sentence: expected });
  const segments = splitSegments(expected);
  const targetChars = Array.from(expected);

  let completed = false;
  let destroyed = false;
  // consumed tile elements for the current word (stack for ⌫)
  let consumedTiles = [];

  /* ----- letter slots surface (no input element) ----- */
  const surface = el('div', { class: 'lw-typing-surface is-touch', dir: 'ltr' });
  const track = el('div', { class: 'lw-letter-track', 'aria-hidden': 'true' });
  surface.append(track);

  function renderSlots() {
    const views = session.wordsView();
    track.replaceChildren();
    let wordIdx = 0;
    for (const seg of segments) {
      if (seg.type === 'gap') {
        const prevLocked = wordIdx > 0 && views[wordIdx - 1] && views[wordIdx - 1].state === 'locked';
        for (let i = seg.start; i < seg.end; i += 1) {
          track.append(el('span', { class: `lw-word-gap ${prevLocked ? 'is-filled' : 'is-empty'}` }));
        }
        continue;
      }
      const view = views[wordIdx] || { state: 'empty', progress: 0, revealed: [] };
      const word = el('span', { class: `lw-word is-${view.state}` });
      let reqIdx = 0;
      for (let i = seg.start; i < seg.end; i += 1) {
        const expectedChar = targetChars[i] ?? '';
        if (isOptionalChar(expectedChar, targetChars[i - 1], targetChars[i + 1])) {
          const slot = el('span', {
            class: `lw-letter-slot is-punctuation ${view.state === 'locked' ? 'is-locked' : ''}`,
            text: expectedChar, // printed in place, never typed
          });
          word.append(slot);
          continue;
        }
        const pos = reqIdx;
        reqIdx += 1;
        let cls = 'lw-letter-slot';
        if (view.state === 'locked') cls += ' is-locked is-filled';
        else if (pos < view.progress) cls += view.revealed[pos] ? ' is-filled is-hint' : ' is-filled';
        else if (view.state === 'active' && pos === view.progress) cls += ' is-current';
        else cls += ' is-empty';
        const slot = el('span', { class: cls });
        if (view.state === 'locked' || pos < view.progress) {
          // the canonical letter appears (session stores expected chars)
          slot.textContent = expectedChar;
        }
        word.append(slot);
      }
      track.append(word);
      wordIdx += 1;
    }
    surface.classList.toggle('is-complete', completed);
  }

  /* ----- tile bank for the active word ----- */
  const tilesWrap = el('div', { class: 'wt-tiles-wrap' });
  const tilesRow = el('div', { class: 'wt-tiles', role: 'group', 'aria-label': opts.tilesAria || labels.tilesAria || 'Letter tiles' });
  const backBtn = el('button', {
    class: 'wt-back', type: 'button',
    'aria-label': labels.backspace || 'Backspace', title: labels.backspace || 'Backspace',
    text: '⌫',
  });
  backBtn.addEventListener('pointerdown', (e) => e.preventDefault());
  backBtn.addEventListener('click', () => removeLast());
  tilesWrap.append(tilesRow, backBtn);

  function renderTiles() {
    tilesRow.replaceChildren();
    consumedTiles = [];
    const view = session.wordsView()[session.activeWordIndex()];
    if (!view || view.state === 'locked') { tilesWrap.classList.add('is-done'); return; }
    tilesWrap.classList.remove('is-done');
    const word = view.text.replace(/[.,!?;:]+$/, '');
    const tiles = buildWordTiles(word);
    for (const ch of tiles) {
      const b = el('button', { class: 'wt-tile', type: 'button', text: ch, 'aria-label': ch });
      b.addEventListener('pointerdown', (e) => e.preventDefault()); // never steal focus
      b.addEventListener('click', () => placeTile(ch, b));
      tilesRow.append(b);
    }
  }

  function consumeTile(ch, btn) {
    const target = btn && !btn.disabled ? btn : tilesRow.querySelector(`.wt-tile:not(.is-used)[data-ch="${ch}"]`);
    if (!target) return;
    target.classList.add('is-used');
    target.setAttribute('aria-hidden', 'true');
    consumedTiles.push(target);
  }

  function unconsumeLast() {
    const t = consumedTiles.pop();
    if (!t) return;
    t.classList.remove('is-used');
    t.removeAttribute('aria-hidden');
  }

  function placeTile(ch, btn) {
    if (destroyed || completed) return;
    const res = session.placeLetter(String(ch).toLowerCase());
    if (res.accepted) {
      soundCorrect();
      consumeTile(String(ch).toLowerCase(), btn);
      renderSlots();
      if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
      if (res.wordLocked) {
        soundLock();
        if (typeof opts.onWordLocked === 'function') opts.onWordLocked(session.activeWordIndex());
        if (res.sessionComplete) {
          completed = true;
          renderSlots();
          renderTiles();
          soundComplete();
          if (typeof opts.onComplete === 'function') opts.onComplete();
          return;
        }
        renderTiles();
      }
    } else {
      soundWrong();
      shake();
      if (typeof opts.onWrong === 'function') opts.onWrong();
    }
  }

  /** Backspace for the ACTIVE word only (locked words are protected). */
  function removeLast() {
    if (destroyed) return;
    const r = session.removeLastLetter();
    if (!r.removed) { shake(); return; }
    soundErase();
    unconsumeLast();
    renderSlots();
    if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
  }

  /**
   * Smart hint: reveal the next hidden letter of the active word.
   * Returns the exercise-state result ({revealed, letter...}).
   */
  function revealHint() {
    if (destroyed || completed) return { revealed: false, reason: 'complete' };
    const res = session.revealFirstLetter();
    if (res.revealed) {
      consumeTile(res.letter);
      renderSlots();
      if (res.wordLocked) {
        soundLock();
        if (typeof opts.onWordLocked === 'function') opts.onWordLocked(session.activeWordIndex());
        if (res.sessionComplete) {
          completed = true;
          renderSlots();
          renderTiles();
          soundComplete();
          if (typeof opts.onComplete === 'function') opts.onComplete();
        } else {
          renderTiles();
        }
      }
      if (typeof opts.onChanged === 'function') opts.onChanged(session.getValue());
    }
    return res;
  }

  function shake() {
    surface.classList.remove('lw-shake');
    void surface.offsetWidth; // restart animation
    surface.classList.add('lw-shake');
    window.setTimeout(() => surface.classList.remove('lw-shake'), 420);
  }

  /* ----- desktop physical keyboard (optional, never on mobile) ----- */
  function onPhysicalKey(e) {
    if (destroyed) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Enter') {
      if (typeof opts.onEnter === 'function') { e.preventDefault(); opts.onEnter(); }
      return;
    }
    if (e.key === 'Backspace') { e.preventDefault(); removeLast(); return; }
    if (/^[a-zA-Z]$/.test(e.key)) { placeTile(e.key.toLowerCase()); return; }
    if (e.key === "'" || e.key === '-' || e.key === '\u2019') {
      placeTile(e.key === '\u2019' ? "'" : e.key);
    }
  }
  document.addEventListener('keydown', onPhysicalKey);

  const root = el('div', { class: 'tt-field wt-field' }, [surface, tilesWrap]);

  renderSlots();
  renderTiles();

  return {
    root,
    surface,
    getValue: () => session.getValue(),
    setValue: (v) => {
      // rebuild the attempt from a string (restart/restore)
      session.reset();
      completed = false;
      surface.classList.remove('is-complete');
      for (const ch of Array.from(String(v ?? ''))) {
        if (ch === ' ') continue;
        session.placeLetter(ch.toLowerCase());
      }
      renderSlots();
      renderTiles();
    },
    isComplete: () => completed || session.isComplete(),
    shake,
    render: () => { renderSlots(); renderTiles(); },
    revealHint,
    removeLast,
    wordsView: () => session.wordsView(),
    activeWordIndex: () => session.activeWordIndex(),
    destroy() {
      destroyed = true;
      document.removeEventListener('keydown', onPhysicalKey);
    },
  };
}

/* ============================================================
   2) Letter/word tiles (fill-blank)
   ============================================================ */

/**
 * Create a tile-based answer builder for fill-blank exercises.
 * opts: {
 *   source:      String — the blank word (or multi-word phrase)
 *   ariaLabel:   String
 *   labels:      { backspace }        (clear-all button REMOVED in v9)
 *   onChanged:   (value) => void
 *   onComplete:  () => void          (all tiles placed)
 * }
 * Returns { root, getValue, isComplete, reset, lockCorrect,
 *           markIncorrect, shake, destroy }.
 * The value is built ONLY from taps; validation stays with the
 * original checkAnswer(acceptedAnswers) pipeline. Nothing locks
 * until the engine confirms the answer is correct.
 */
export function createLetterTiles(opts = {}) {
  const labels = opts.labels || {};
  const tiles = buildTiles(opts.source);
  const placed = []; // { tile, btn, bankBtn }

  const root = el('div', { class: 'tiles-field', dir: 'ltr' });
  const answerRow = el('div', { class: 'tiles-answer', 'aria-label': opts.ariaLabel || 'Answer' });
  const bankRow = el('div', { class: 'tiles-bank', role: 'group', 'aria-label': opts.ariaLabel || 'Tiles' });
  const actionsRow = el('div', { class: 'tiles-actions' });
  root.append(answerRow, bankRow, actionsRow);

  let locked = false;

  const backBtn = el('button', {
    class: 'tt-key tt-key-back tiles-action-btn', type: 'button',
    'aria-label': labels.backspace || 'Backspace', text: '⌫',
  });
  backBtn.addEventListener('pointerdown', (e) => e.preventDefault());
  backBtn.addEventListener('click', () => removeLast());
  actionsRow.append(backBtn); // v9: no clear-all button

  function emit() {
    if (typeof opts.onChanged === 'function') opts.onChanged(getValue());
    if (!locked && placed.length === tiles.length && typeof opts.onComplete === 'function') {
      opts.onComplete();
    }
  }

  function place(tileText, bankBtn) {
    if (locked) return;
    if (placed.length >= tiles.length) return;
    const placedBtn = el('button', { class: 'tile tile-placed', type: 'button', text: tileText });
    placedBtn.addEventListener('pointerdown', (e) => e.preventDefault());
    placedBtn.addEventListener('click', () => {
      if (locked) return; // locked words cannot be removed
      const at = placed.findIndex((p) => p.btn === placedBtn);
      if (at < 0) return;
      const [removed] = placed.splice(at, 1);
      removed.bankBtn.classList.remove('tile-used');
      removed.bankBtn.disabled = false;
      placedBtn.remove();
      soundErase();
      emit();
    });
    placed.push({ tile: tileText, btn: placedBtn, bankBtn });
    answerRow.append(placedBtn);
    if (bankBtn) {
      bankBtn.classList.add('tile-used');
      bankBtn.disabled = true;
    }
    soundCorrect();
    emit();
  }

  function removeLast() {
    if (locked) return;
    if (!placed.length) return;
    const removed = placed.pop();
    removed.btn.remove();
    if (removed.bankBtn) {
      removed.bankBtn.classList.remove('tile-used');
      removed.bankBtn.disabled = false;
    }
    soundErase();
    emit();
  }

  function reset() {
    if (locked) return;
    while (placed.length) removeLast();
    emit();
  }

  for (const t of tiles) {
    const b = el('button', { class: 'tile', type: 'button', text: t });
    b.addEventListener('pointerdown', (e) => e.preventDefault());
    b.addEventListener('click', () => { if (!b.disabled) place(t, b); });
    bankRow.append(b);
  }

  function getValue() {
    return placed.map((p) => p.tile).join('');
  }

  /** Engine confirmed the answer is correct → freeze green. */
  function lockCorrect() {
    locked = true;
    answerRow.classList.add('is-locked');
    for (const p of placed) {
      p.btn.classList.add('is-locked');
      p.btn.disabled = true;
    }
    for (const b of bankRow.querySelectorAll('.tile')) b.disabled = true;
    backBtn.disabled = true;
    soundLock();
  }

  /** Engine confirmed the answer is wrong → red state (editable). */
  function markIncorrect() {
    answerRow.classList.remove('is-wrong');
    void answerRow.offsetWidth;
    answerRow.classList.add('is-wrong');
    window.setTimeout(() => answerRow.classList.remove('is-wrong'), 600);
  }

  function shake() {
    root.classList.remove('lw-shake');
    void root.offsetWidth;
    root.classList.add('lw-shake');
    window.setTimeout(() => root.classList.remove('lw-shake'), 420);
  }

  return {
    root,
    getValue,
    isComplete: () => placed.length === tiles.length,
    reset,
    lockCorrect,
    markIncorrect,
    shake,
    destroy() { root.remove(); },
  };
}
