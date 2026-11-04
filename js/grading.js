/* ============================================================
   LingoStep — grading.js
   Predictable, testable answer checking.

   Statuses returned by checkAnswer():
     'empty'     — nothing typed
     'correct'   — matches an accepted answer after core normalization
                   (case-insensitive, collapsed spaces, curly quotes)
                   OR after stripping punctuation (see below)
     'minor'     — matches only after contraction expansion
                   (only when strict grading is off)
     'incorrect' — anything else (real grammar/spelling differences
                   are respected, never auto-forgiven)

   PUNCTUATION POLICY (spec: the learner is never required to type
   punctuation to pass a normal writing/dictation exercise):
     - . , ? ! : ; quotes and brackets are ignored when comparing
       the typed answer with the expected one — missing, extra or
       different punctuation is still 'correct'.
     - Apostrophes INSIDE a word (don't, I'm) are part of the word and
       stay required — dropping one is a real spelling difference
       (requirement 8). Quote-like apostrophes around words are
       optional and ignored.
     - Hyphens stay (compound words: twenty-one).
     - The stored / displayed sentence is never modified.

   Contractions: "don't" and "do not" are considered DIFFERENT by
   default (strict). With strict grading off they compare as 'minor'.
   ============================================================ */

/* ---------- normalization ---------- */

const CURLY_MAP = { '\u2018': "'", '\u2019': "'", '\u201A': "'", '\u201C': '"', '\u201D': '"', '\u2032': "'", '\u02BC': "'", '\u2013': '-', '\u2014': '-', '\u2026': '...' };

/** Core normalization: trim, collapse spaces, straighten quotes, lowercase. */
export function normalizeCore(s) {
  let out = String(s ?? '');
  out = out.replace(/[\u2018\u2019\u201A\u201C\u201D\u2032\u02BC\u2013\u2014\u2026]/g, (c) => CURLY_MAP[c] ?? c);
  out = out.trim().replace(/\s+/g, ' ').toLowerCase();
  return out;
}

/** Lenient pass 1: also drop trailing punctuation. */
export function normalizeLenient(s) {
  return normalizeCore(s).replace(/[.!?;,:\u2026]+$/, '').replace(/\s+/g, ' ').trim();
}

/** Characters treated as punctuation that never decides correctness. */
const PUNCT_RE = /[.,!?;:"()\[\]{}\u2026\u00A1\u00BF\u060C\u061B\u061F\u3001\u3002\uFF01\uFF0C\uFF1A\uFF1B\uFF1F]/;

function isWordChar(c) {
  return /[a-z0-9]/.test(c);
}

/**
 * Punctuation-free comparison form: normalizeCore + every punctuation
 * mark removed (including apostrophes; hyphens stay required).
 * Used for comparison only — never to change stored or shown text.
 */
export function stripPunct(s) {
  const src = normalizeCore(s);
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "'") {
      // Word-internal apostrophes (don't, I'm) are part of the word —
      // dropping one is a real spelling difference (requirement 8).
      // Quote-like apostrophes around words are optional punctuation.
      const prev = i > 0 ? src[i - 1] : '';
      const next = i + 1 < src.length ? src[i + 1] : '';
      if (isWordChar(prev) && isWordChar(next)) { out += c; continue; }
      continue;
    }
    if (PUNCT_RE.test(c)) { out += ' '; continue; }
    out += c;
  }
  return out.replace(/\s+/g, ' ').trim();
}

/** Lenient pass 2 (only when strict grading is off): expand contractions. */
const CONTRACTIONS = [
  [/\bdon[' ]?t\b/g, 'do not'], [/\bdoesn[' ]?t\b/g, 'does not'], [/\bdidn[' ]?t\b/g, 'did not'],
  [/\bisn[' ]?t\b/g, 'is not'], [/\baren[' ]?t\b/g, 'are not'], [/\bwasn[' ]?t\b/g, 'was not'],
  [/\bweren[' ]?t\b/g, 'were not'], [/\bhasn[' ]?t\b/g, 'has not'], [/\bhaven[' ]?t\b/g, 'have not'],
  [/\bhadn[' ]?t\b/g, 'had not'], [/\bcan[' ]?t\b/g, 'cannot'], [/\bcouldn[' ]?t\b/g, 'could not'],
  [/\bshouldn[' ]?t\b/g, 'should not'], [/\bwouldn[' ]?t\b/g, 'would not'], [/\bwilln[' ]?t\b/g, 'will not'],
  [/\bwon[' ]?t\b/g, 'will not'], [/\bmustn[' ]?t\b/g, 'must not'], [/\bain[' ]?t\b/g, 'is not'],
  [/\blet[' ]?s\b/g, 'let us'], [/\bi[' ]?m\b/g, 'i am'], [/\bit[' ]?s\b/g, 'it is'],
  [/\bthat[' ]?s\b/g, 'that is'], [/\bthere[' ]?s\b/g, 'there is'], [/\bwhat[' ]?s\b/g, 'what is'],
  [/\bwho[' ]?s\b/g, 'who is'], [/\bshe[' ]?s\b/g, 'she is'], [/\bhe[' ]?s\b/g, 'he is'],
  [/\bwe[' ]?re\b/g, 'we are'], [/\bthey[' ]?re\b/g, 'they are'], [/\byou[' ]?re\b/g, 'you are'],
  [/\bi[' ]?ve\b/g, 'i have'], [/\bwe[' ]?ve\b/g, 'we have'], [/\bthey[' ]?ve\b/g, 'they have'],
  [/\byou[' ]?ve\b/g, 'you have'], [/\bi[' ]?ll\b/g, 'i will'], [/\bwe[' ]?ll\b/g, 'we will'],
  [/\bthey[' ]?ll\b/g, 'they will'], [/\byou[' ]?ll\b/g, 'you will'], [/\bshe[' ]?ll\b/g, 'she will'],
  [/\bhe[' ]?ll\b/g, 'he will'], [/\bit[' ]?ll\b/g, 'it will'], [/\bi[' ]?d\b/g, 'i would'],
  [/\bwe[' ]?d\b/g, 'we would'], [/\bthey[' ]?d\b/g, 'they would'], [/\byou[' ]?d\b/g, 'you would'],
  [/\bshe[' ]?d\b/g, 'she would'], [/\bhe[' ]?d\b/g, 'he would'],
];

export function expandContractions(s) {
  let out = String(s ?? '').toLowerCase();
  for (const [re, rep] of CONTRACTIONS) out = out.replace(re, rep);
  return out.replace(/\s+/g, ' ').trim();
}

/* ---------- word diff for feedback ---------- */

/** Returns 1-based index of first differing word, or 0 if identical. */
export function firstDiffWord(userCore, expectedCore) {
  const a = userCore.split(' ');
  const b = expectedCore.split(' ');
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) return { word: i + 1, typed: a[i] || '—', expected: b[i] || '—' };
  }
  return { word: 0, typed: '', expected: '' };
}

/* ---------- main API ---------- */

/**
 * checkAnswer(userInput, acceptedAnswers, options)
 * options: { strict: true } — strict=true keeps contractions distinct.
 * acceptedAnswers: array of strings (must be non-empty).
 * Returns { status, matchedAnswer, diff } where diff = {word, typed, expected}.
 */
export function checkAnswer(userInput, acceptedAnswers, options = {}) {
  const strict = options.strict !== false;
  const accepted = (Array.isArray(acceptedAnswers) ? acceptedAnswers : [acceptedAnswers])
    .filter((a) => typeof a === 'string' && a.trim().length > 0);

  if (typeof userInput !== 'string' || userInput.trim().length === 0) {
    return { status: 'empty', matchedAnswer: null, diff: { word: 0, typed: '', expected: '' } };
  }
  if (accepted.length === 0) {
    // Degenerate exercise data: treat whitespace-only equivalence as correct.
    return normalizeCore(userInput).length > 0
      ? { status: 'incorrect', matchedAnswer: null, diff: { word: 0, typed: '', expected: '' } }
      : { status: 'empty', matchedAnswer: null, diff: { word: 0, typed: '', expected: '' } };
  }

  const userCore = normalizeCore(userInput);
  const userNoPunct = stripPunct(userInput);
  let best = null;

  for (const ans of accepted) {
    const expCore = normalizeCore(ans);

    if (userCore === expCore) {
      const r = { status: 'correct', matchedAnswer: ans, diff: { word: 0, typed: '', expected: '' } };
      return r; // cannot do better
    }

    let status = null;
    let usedAnswer = ans;

    // punctuation pass: missing / extra / different punctuation marks
    // never change the result (trailing, internal or both) → 'correct'
    if (userNoPunct === stripPunct(ans)) {
      status = 'correct';
    }

    // lenient pass: contraction expansion (only when strict is off)
    if (!strict && status === null) {
      if (expandContractions(userNoPunct) === expandContractions(stripPunct(ans))) {
        status = 'minor';
      }
    }

    const cand = {
      status: status ?? 'incorrect',
      matchedAnswer: usedAnswer,
      diff: firstDiffWord(userCore, expCore),
    };
    if (!best || rank(cand.status) > rank(best.status)) best = cand;
  }

  return best;
}

function rank(status) {
  return { correct: 3, minor: 2, incorrect: 1, empty: 0 }[status] ?? 0;
}

/** Boolean convenience: is the answer acceptable (correct or minor)? */
export function isAcceptable(userInput, acceptedAnswers, options = {}) {
  const r = checkAnswer(userInput, acceptedAnswers, options);
  return r.status === 'correct' || r.status === 'minor';
}

/* ---------- word-level diff for rich feedback ---------- */

/** Crude stem for pairing only (never used to forgive answers). */
function pairStem(s) {
  return s.replace(/(ies)$/, 'y').replace(/(es|s)$/, '').replace(/(ing|ed)$/, '');
}

function pairScore(typed, expected) {
  if (typed === expected) return 3;
  if (pairStem(typed) === pairStem(expected) && typed.length > 1 && expected.length > 1) return 2;
  if (typed.length >= 3 && expected.length >= 3
    && (typed.startsWith(expected.slice(0, 3)) || expected.startsWith(typed.slice(0, 3)))) return 1;
  return 0;
}

/** Normalize words for feedback alignment while preserving original display text. */
function wordKey(word) {
  return String(word ?? '').replace(/[\u0027\u2018\u2019\u02BC]/g, '');
}

/**
 * Word-level alignment between what the user typed and one expected
 * answer. Used ONLY for feedback visualization — the accept/reject
 * decision still comes from checkAnswer().
 *
 * Returns:
 *   typed:   [{ text, type: 'match' | 'wrong' | 'extra' }]   (user words, in order)
 *   missing: [{ text }]   expected words with no counterpart
 *   expectedTokens: [{ text, type: 'match' | 'wrong' | 'missing' }] (expected order)
 *   correctCount / expectedCount
 */
export function wordDiff(userInput, expected) {
  const u = words(userInput);
  const e = words(expected);
  const n = u.length, m = e.length;

  // LCS table over exact matches
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = wordKey(u[i]) === wordKey(e[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const typedMatch = new Array(n).fill(false);
  const expectedMatch = new Array(m).fill(false);
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (wordKey(u[i]) === wordKey(e[j])) { typedMatch[i] = true; expectedMatch[j] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }

  // greedy pairing of unmatched user words with unmatched expected words
  const unmatchedU = [];
  for (let a = 0; a < n; a++) if (!typedMatch[a]) unmatchedU.push(a);
  const unmatchedE = [];
  for (let b = 0; b < m; b++) if (!expectedMatch[b]) unmatchedE.push(b);

  const pairOf = new Map(); // userIndex -> expectedIndex
  const usedE = new Set();
  for (const a of unmatchedU) {
    let best = -1, bestScore = 0;
    for (const b of unmatchedE) {
      if (usedE.has(b)) continue;
      const s = pairScore(wordKey(u[a]), wordKey(e[b]));
      if (s > bestScore) { bestScore = s; best = b; }
    }
    if (best >= 0) { pairOf.set(a, best); usedE.add(best); }
  }

  const typed = u.map((text, a) => ({
    text,
    type: typedMatch[a] ? 'match' : (pairOf.has(a) ? 'wrong' : 'extra'),
    expected: pairOf.has(a) ? e[pairOf.get(a)] : undefined,
  }));

  const missing = [];
  const expectedTokens = e.map((text, b) => {
    if (expectedMatch[b]) return { text, type: 'match' };
    const paired = unmatchedU.find((a) => pairOf.get(a) === b);
    if (paired !== undefined) return { text, type: 'wrong' };
    missing.push({ text });
    return { text, type: 'missing' };
  });

  return {
    typed,
    missing,
    expectedTokens,
    correctCount: typedMatch.filter(Boolean).length,
    expectedCount: m,
  };
}

/* ---------- sentence helpers used by other modules ---------- */

/** Tokenize into words (letters/digits/apostrophes/hyphens kept). */
export function words(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9'\-\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** Jaccard similarity of word sets (used by duplicate detector). */
export function similarity(a, b) {
  const A = new Set(words(a));
  const B = new Set(words(b));
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter += 1;
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}
