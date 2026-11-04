/* ============================================================
   LingoStep — hints.js
   Graduated, type-aware hints (pure, Node-testable).

   Spec (priority 3):
   - Up to three escalating help levels per exercise, but ONLY as
     many as the exercise can honestly support (never forced to 3).
   - Hint content never reveals the final answer outright: letter
     patterns, word counts, word types, first word(s) or a letter —
     the full answer stays hidden until the explicit "show answer"
     action, which is clearly marked as direct help.
   - Every hint belongs to the exercise it was built from; the
     engine rebuilds hints per exercise, so no stale hints survive
     question transitions (verified by tests).
   - "مش فاهم التلميح" support: simpleHintFor() re-explains the
     CURRENT hint level in simpler words — no invented facts.
   - Works fully offline (no network, no external service).
   ============================================================ */

import { t } from './i18n.js';
import { analyzeSentence } from './word-cards.js';

/**
 * Mask a sentence into a letter pattern that preserves words,
 * punctuation and apostrophe positions without revealing letters:
 *   "Hello! How are you?" → "H____! H__ a__ y____?"
 * Digits are kept as-is (they carry meaning), every other letter
 * becomes "_" after its first occurrence in the word.
 */
export function maskSentence(sentence) {
  return String(sentence ?? '')
    .split(/(\s+)/)
    .map((chunk) => {
      if (!chunk.trim()) return chunk;
      let first = true;
      return chunk.split('').map((c) => {
        if (/[a-zA-Z]/.test(c)) {
          if (first) { first = false; return c; }
          return '_';
        }
        return c; // punctuation, apostrophes, digits stay visible
      }).join('');
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

/** First `n` words of the sentence (letters/apostrophes/hyphens only). */
function firstWords(sentence, n) {
  const words = String(sentence ?? '').trim().replace(/[.!?;:,]+$/, '').split(/\s+/).filter(Boolean);
  return words.slice(0, n).join(' ');
}

/** Deterministically pick one WRONG multiple-choice option to exclude. */
export function excludedOption(ex) {
  if (!ex || !Array.isArray(ex.options) || !Number.isInteger(ex.answerIndex)) return null;
  const wrongIdx = ex.options.map((_, i) => i).filter((i) => i !== ex.answerIndex);
  if (!wrongIdx.length) return null;
  // stable choice: middle wrong option (works for 3-4 options)
  return ex.options[wrongIdx[Math.floor(wrongIdx.length / 2)]];
}

/** Meaning of a single word: lesson vocabulary first, lexicon fallback. */
function wordMeaning(word, vocab) {
  const key = String(word ?? '').toLowerCase();
  for (const v of Array.isArray(vocab) ? vocab : []) {
    if (v && typeof v.word === 'string' && v.word.toLowerCase() === key && v.meaningAr) return v.meaningAr;
  }
  const toks = analyzeSentence(String(word ?? ''));
  return toks.length ? (toks[0].meaningAr || null) : null;
}

/** Arabic part-of-speech label for a word (or null). */
function wordPos(word) {
  const toks = analyzeSentence(String(word ?? ''));
  return toks.length ? (toks[0].posAr || null) : null;
}

/** First letters for a fill-blank shape hint ("mo" + length). */
function blankShape(blankWord) {
  const w = String(blankWord ?? '').trim();
  if (!w) return null;
  const reveal = w.length <= 4 ? 1 : 2;
  return { start: w.slice(0, reveal), length: w.length };
}

/** Arabic-aware pluralized "N words" phrase. */
export function wordsPhrase(n, L) {
  const nSafe = Number(n) || 0;
  if (L === 'ar') {
    if (nSafe === 1) return 'كلمة واحدة';
    if (nSafe === 2) return 'كلمتين';
    if (nSafe >= 3 && nSafe <= 10) return `${nSafe} كلمات`;
    return `${nSafe} كلمة`;
  }
  return `${nSafe} ${nSafe === 1 ? 'word' : 'words'}`;
}

/**
 * Build the graduated hint levels for one exercise.
 * Returns an ordered array (0–3 items) of { kind, text } — already
 * localized. An empty array means this exercise honestly has no
 * reliable hint and the UI must not invent one.
 *
 * opts: { lang: 'ar' | 'en', vocab: lesson.vocabulary }
 */
export function buildHintLevels(ex, opts = {}) {
  const L = opts.lang === 'ar' ? 'ar' : 'en';
  const vocab = Array.isArray(opts.vocab) ? opts.vocab : [];
  if (!ex || typeof ex !== 'object') return [];
  const levels = [];

  if (ex.type === 'listen-and-type' || ex.type === 'word-order') {
    const sentence = ex.type === 'word-order' ? ex.en : ex.en;
    const words = String(sentence ?? '').trim().split(/\s+/).filter(Boolean).length;
    if (words > 0) {
      levels.push({ kind: 'words', text: t(L, 'hintWordCount', { n: wordsPhrase(words, L) }) });
    }
    if (ex.ar) levels.push({ kind: 'meaning', text: `${t(L, 'meaning')}: ${ex.ar}` });
    if (ex.hint) levels.push({ kind: 'teacher', text: ex.hint });
    if (ex.type === 'word-order') {
      const first = firstWords(ex.en, 1);
      if (first) levels.push({ kind: 'startsWith', text: t(L, 'hintStartsWith', { w: first }) });
      const two = firstWords(ex.en, 2);
      if (two && two.includes(' ')) levels.push({ kind: 'firstWords', text: t(L, 'hintFirstWords', { w: two }) });
    } else {
      const pattern = maskSentence(ex.en);
      if (pattern) levels.push({ kind: 'pattern', text: `${t(L, 'hintLetterPattern')}: ${pattern}` });
    }
    return levels.slice(0, 3);
  }

  if (ex.type === 'fill-blank') {
    const pos = wordPos(ex.blankWord);
    if (pos) levels.push({ kind: 'wordType', text: t(L, 'hintNeededType', { pos }) });
    if (ex.hint) levels.push({ kind: 'teacher', text: ex.hint });
    const meaning = wordMeaning(ex.blankWord, vocab);
    if (meaning) levels.push({ kind: 'blankMeaning', text: t(L, 'hintBlankMeaning', { m: meaning }) });
    else if (ex.ar && !ex.hint) levels.push({ kind: 'meaning', text: `${t(L, 'meaning')}: ${ex.ar}` });
    const shape = blankShape(ex.blankWord);
    if (shape) {
      levels.push({ kind: 'blankShape', text: t(L, 'hintBlankShape', { s: shape.start, n: shape.length }) });
    }
    return levels.slice(0, 3);
  }

  if (ex.type === 'multiple-choice') {
    if (ex.hint) levels.push({ kind: 'teacher', text: ex.hint });
    if (ex.ar && !ex.hint) levels.push({ kind: 'meaning', text: `${t(L, 'meaning')}: ${ex.ar}` });
    const wrong = excludedOption(ex);
    if (wrong != null) levels.push({ kind: 'exclude', text: t(L, 'hintExcludeOption', { o: wrong }) });
    const correct = Array.isArray(ex.options) ? ex.options[ex.answerIndex] : null;
    if (correct && String(correct).trim()) {
      const letter = String(correct).trim()[0];
      if (letter) levels.push({ kind: 'firstLetter', text: t(L, 'hintFirstLetter', { c: letter }) });
    }
    return levels.slice(0, 3);
  }

  return levels.slice(0, 3);
}

/**
 * Simpler re-explanation ("مش فاهم التلميح") of a hint kind.
 * Re-explains the IDEA in plain words; never introduces new facts
 * and never contains the answer.
 */
export function simpleHintFor(kind, L = 'ar') {
  const lang = L === 'ar' ? 'ar' : 'en';
  const map = {
    words: 'hintSimpleWords',
    meaning: 'hintSimpleMeaning',
    teacher: 'hintSimpleTeacher',
    pattern: 'hintSimplePattern',
    startsWith: 'hintSimpleStartsWith',
    firstWords: 'hintSimpleFirstWords',
    wordType: 'hintSimpleWordType',
    blankMeaning: 'hintSimpleBlankMeaning',
    blankShape: 'hintSimpleBlankShape',
    exclude: 'hintSimpleExclude',
    firstLetter: 'hintSimpleFirstLetter',
  };
  const key = map[kind];
  return key ? t(lang, key) : null;
}

/**
 * Full answer text for the explicit "show answer" action.
 * Returns null when the exercise carries no answer to show.
 */
export function answerOf(ex) {
  if (!ex || typeof ex !== 'object') return null;
  if (ex.type === 'multiple-choice') {
    return Array.isArray(ex.options) && Number.isInteger(ex.answerIndex) ? ex.options[ex.answerIndex] : null;
  }
  if (ex.type === 'fill-blank') {
    return typeof ex.display === 'string' && ex.blankWord
      ? ex.display.replace('___', ex.blankWord)
      : (ex.en || null);
  }
  return ex.en || null;
}
