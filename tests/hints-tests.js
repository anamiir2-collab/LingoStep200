/* ============================================================
   hints-tests.js — graduated hints contract (js/hints.js).
   Verifies:
     - each hint belongs to ITS question (content linkage)
     - hints never leak the full answer
     - levels are graduated (≤3) and advance in order
     - questions without reliable hints get few/zero levels
     - simple re-explanations exist for every hint kind
     - answerOf() matches the exercise's real expected answer
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { buildHintLevels, simpleHintFor, answerOf, maskSentence, excludedOption, wordsPhrase } from '../js/hints.js';

export function run() {
  const name = 'hints-tests';

  /* 1 — listen-and-type: word count, meaning, masked pattern */
  const lt = {
    type: 'listen-and-type',
    id: 'lesson-001-ex-001',
    en: 'Hello! How are you?',
    ar: 'مرحبًا! كيف حالك؟',
  };
  const ltLevels = buildHintLevels(lt, { lang: 'ar', vocab: [] });
  assert.ok(ltLevels.length >= 2 && ltLevels.length <= 3, '1-2 honest levels minimum');
  assert.match(ltLevels[0].text, /4/, 'level 1 mentions the word count of ITS sentence');
  assert.ok(ltLevels.some((l) => l.text.includes('مرحبًا')), 'meaning hint comes from the same exercise');
  const patternLevel = ltLevels.find((l) => l.kind === 'pattern');
  assert.ok(patternLevel, 'letter pattern level exists');
  assert.ok(!patternLevel.text.includes('Hello'), 'pattern never reveals the full first word');

  /* 2 — no hint level ever contains the full answer */
  for (const l of ltLevels) {
    assert.ok(!l.text.includes('Hello! How are you?'), 'no level leaks the full sentence');
  }

  /* 3 — fill-blank: type → teacher hint → meaning → shape (max 3) */
  const fb = {
    type: 'fill-blank',
    display: 'Good ___, teacher.',
    blankWord: 'morning',
    ar: 'صباح الخير يا معلم.',
    hint: 'وقت اليوم',
  };
  const fbLevels = buildHintLevels(fb, { lang: 'ar', vocab: [{ word: 'morning', meaningAr: 'صباح' }] });
  assert.ok(fbLevels.length <= 3, 'fill-blank capped at 3 levels');
  assert.ok(fbLevels[0].kind === 'wordType', 'fill-blank starts with the word type');
  assert.ok(fbLevels.some((l) => l.text.includes('صباح')), 'meaning hint uses lesson vocabulary of the same lesson');
  const shape = fbLevels.find((l) => l.kind === 'blankShape');
  if (shape) assert.ok(!shape.text.includes('morning'), 'shape hint does not spell the whole word');

  /* 4 — multiple-choice: exclusion never names the correct option */
  const mc = { type: 'multiple-choice', question: '…', options: ['go', 'goes', 'going'], answerIndex: 1, ar: 'اختر' };
  const mcLevels = buildHintLevels(mc, { lang: 'en' });
  const excluded = excludedOption(mc);
  assert.ok(excluded !== mc.options[mc.answerIndex], 'excluded option is never the correct one');
  const exclLevel = mcLevels.find((l) => l.kind === 'exclude');
  assert.ok(exclLevel && exclLevel.text.includes(excluded), 'exclusion hint names a wrong option of THIS question');
  assert.ok(!exclLevel.text.includes(mc.options[mc.answerIndex]), 'exclusion hint does not reveal the correct option');

  /* 5 — exercises without usable content get few levels, never invented ones */
  const bare = { type: 'multiple-choice', question: 'Pick one', options: ['a', 'b', 'c'], answerIndex: 2 };
  const bareLevels = buildHintLevels(bare, { lang: 'ar' });
  assert.ok(bareLevels.length >= 1 && bareLevels.length <= 3, 'degenerate MC still offers honest levels');
  const empty = buildHintLevels(null, { lang: 'ar' });
  assert.deepEqual(empty, [], 'null exercise → no hints, no crash');

  /* 6 — simple re-explanations exist for every kind used above */
  const kinds = new Set([...ltLevels, ...fbLevels, ...mcLevels].map((l) => l.kind));
  for (const kind of kinds) {
    const simple = simpleHintFor(kind, 'ar');
    assert.equal(typeof simple, 'string', `simple explanation exists for kind "${kind}"`);
    assert.ok(simple.length > 5, 'simple explanation is a real sentence');
  }
  assert.equal(simpleHintFor('unknown-kind', 'ar'), null, 'unknown kinds return null safely');

  /* 7 — answerOf matches each type's expected answer */
  assert.equal(answerOf(lt), 'Hello! How are you?');
  assert.equal(answerOf(fb), 'Good morning, teacher.');
  assert.equal(answerOf(mc), 'goes');
  assert.equal(answerOf(null), null);

  /* 8 — mask keeps punctuation/first letters only */
  assert.equal(maskSentence('Hello! How are you?'), 'H____! H__ a__ y__?');
  assert.equal(maskSentence("I don't know"), "I d__'_ k___");

  /* 9 — Arabic pluralization helper */
  assert.equal(wordsPhrase(4, 'ar'), '4 كلمات');
  assert.equal(wordsPhrase(2, 'ar'), 'كلمتين');
  assert.equal(wordsPhrase(12, 'ar'), '12 كلمة');
  assert.equal(wordsPhrase(1, 'en'), '1 word');
  assert.equal(wordsPhrase(7, 'en'), '7 words');

  /* 10 — word-order hints build from the SAME sentence */
  const wo = { type: 'word-order', en: 'She drinks tea every morning.', ar: 'تشرب الشاي كل صباح.' };
  const woLevels = buildHintLevels(wo, { lang: 'ar' });
  const starts = woLevels.find((l) => l.kind === 'startsWith');
  assert.ok(starts && starts.text.includes('She'), 'word-order hint references its own first word');
  for (const l of woLevels) {
    assert.ok(!l.text.includes('She drinks tea every morning.'), 'word-order hints never leak the full order');
  }

  return { name, pass: true, info: 'graduated hints linked to their questions; answers never leaked early' };
}
