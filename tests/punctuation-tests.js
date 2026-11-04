/* ============================================================
   punctuation-tests.js — the "punctuation is optional" spec.
   Covers:
     1. stripPunct / checkAnswer acceptance matrix (grading.js)
     2. alignTyped + letterStates prefix alignment (letter-track.js)
        — the learner can finish a sentence WITHOUT typing any
          punctuation, and a stray typed mark never shakes.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { checkAnswer, stripPunct } from '../js/grading.js';
import { alignTyped, letterStates, isOptionalChar } from '../js/letter-track.js';

export function run() {
  const name = 'punctuation-tests';

  /* ---------- 1. grading acceptance matrix ---------- */
  const cases = [
    // [expected sentence, learner answer, wanted status]
    ['Good morning.', 'Good morning', 'correct'],
    ['Good morning.', 'good morning', 'correct'],
    ['How are you?', 'How are you', 'correct'],
    ["I'm fine, thanks.", "I'm fine thanks", 'correct'],
    ['Hello, how are you?', 'Hello how are you', 'correct'],
    ['Nice to meet you!', 'Nice to meet you', 'correct'],
    ['Could you help me, please?', 'Could you help me please', 'correct'],
    ['I work in a warehouse.', 'I work in a warehouse', 'correct'],
    ['Where is the office?', 'Where is the office', 'correct'],
    ["I don't understand.", "I don't understand", 'correct'],
    ['Let me check.', 'Let me check', 'correct'],
    ["I'll get back to you.", "I'll get back to you", 'correct'],
    // punctuation typed that the expected lacks — still correct
    ['How are you', 'How are you?', 'correct'],
    ['Good morning', 'Good morning.', 'correct'],
    ['Good morning', 'Good morning!', 'correct'],
    // wrong words / order / omissions stay wrong
    ['Good morning.', 'Good evening', 'incorrect'],
    ['How are you?', 'How is you', 'incorrect'],
    ["I'm fine, thanks.", 'I fine thanks', 'incorrect'],
    ['I work in a warehouse.', 'I work at a warehouse', 'incorrect'],
    ["I don't understand.", 'I dont understand', 'incorrect'],
    ['Let me check.', 'Let me check it', 'incorrect'],
    // apostrophe inside a word is required, quotes around words are not
    ["It's time to go.", "It's time to go", 'correct'],
    ["It's time to go.", 'Its time to go', 'incorrect'],
    ["the word 'cat' is a noun", 'the word cat is a noun', 'correct'],
  ];
  for (const [expected, typed, want] of cases) {
    const got = checkAnswer(typed, [expected]).status;
    assert.equal(got, want, `checkAnswer(${JSON.stringify(typed)} vs ${JSON.stringify(expected)}) = ${got}, want ${want}`);
  }

  /* ---------- 2. letter-level alignment ---------- */

  // finishing WITHOUT the final period is complete
  let a = alignTyped('Good morning.', 'Good morning');
  assert.equal(a.complete, true, 'sentence completes without the final period');
  assert.equal(a.extraBad, false);

  // internal comma skipped → still complete
  a = alignTyped("I'm fine, thanks.", "I'm fine thanks");
  assert.equal(a.complete, true);

  // question mark skipped mid-way and at the end
  a = alignTyped('How are you?', 'How are you');
  assert.equal(a.complete, true);
  a = alignTyped('Hello! How are you?', 'Hello How are you');
  assert.equal(a.complete, true, 'both marks skipped');

  // typing a mark the expected lacks never blocks completion
  a = alignTyped('How are you', 'How are you?');
  assert.equal(a.complete, true, 'extra typed question mark tolerated');
  a = alignTyped('Good morning', 'Good morning!!');
  assert.equal(a.complete, true);

  // apostrophes stay required
  a = alignTyped("I don't understand.", 'I dont understand');
  assert.equal(a.complete, false, 'dropped apostrophe in a contraction blocks completion');
  a = alignTyped("I don't understand.", "I don't understand");
  assert.equal(a.complete, true);

  // real letters beyond the end are still rejected
  a = alignTyped('Good morning.', 'Good mornings');
  assert.equal(a.extraBad, true);
  assert.equal(a.complete, false);

  // wrong letter mid-sentence → not complete, prefix preserved
  a = alignTyped('Good morning.', 'Good morxning.');
  assert.equal(a.complete, false);
  assert.equal(a.typedUsed, 8);

  // letterStates marks skipped punctuation as filled (green)
  const st = letterStates('Good morning.', 'Good morning');
  assert.equal(st[st.length - 1], 'filled', 'final period slot auto-filled');
  assert.ok(st.every((s) => s === 'filled'));

  // letterStates wrong-run matches the old transient behavior
  const st2 = letterStates('The bus.', 'The Xz');
  assert.equal(st2[0], 'filled');
  assert.equal(st2[4], 'wrong');
  assert.equal(st2[5], 'wrong');
  assert.equal(st2[6], 'empty', 'positions beyond the typed run are untouched');

  // empty typing → first slot current
  const st3 = letterStates('Hello!', '');
  assert.equal(st3[0], 'current');
  assert.ok(st3.slice(1).every((s) => s === 'empty'));

  // isOptionalChar: word-internal apostrophes are required, quotes are not
  assert.equal(isOptionalChar("'", 'd', 'o'), false, "don't apostrophe required");
  assert.equal(isOptionalChar("'", 'o', ' '), true, 'closing quote optional');
  assert.equal(isOptionalChar('.', 'g', undefined), true);
  assert.equal(isOptionalChar('-', 'y', 'o'), false, 'hyphen stays required');

  /* ---------- 3. stripPunct invariants ---------- */
  assert.equal(stripPunct("don't"), "don't");
  assert.equal(stripPunct('.!,?;:'), '');
  assert.equal(stripPunct('a  ,  b'), 'a b');
  assert.equal(stripPunct('Hello! How are you?'), 'hello how are you');

  return { name, pass: true, info: 'punctuation never blocks completion; words/apostrophes still required' };
}
