/* ============================================================
   grading-tests.js — answer checking and normalization.
   Run via: node tests/run-all.js  (or directly)
   ============================================================ */

import assert from 'node:assert/strict';
import { checkAnswer, normalizeCore, normalizeLenient, expandContractions, isAcceptable, similarity, firstDiffWord, stripPunct } from '../js/grading.js';

export function run() {
  const name = 'grading-tests';

  // normalization
  assert.equal(normalizeCore('  Hello   World '), 'hello world');
  assert.equal(normalizeCore('I\u2019m fine'), "i'm fine");
  assert.equal(normalizeLenient('I go home.'), 'i go home');
  assert.equal(normalizeLenient('Really?!'), 'really');
  assert.equal(expandContractions("don't be late"), 'do not be late');
  assert.equal(expandContractions("I'm sure she'll come"), 'i am sure she will come');

  // punctuation stripping (comparison only — stored text is never changed)
  assert.equal(stripPunct('Good morning.'), 'good morning');
  assert.equal(stripPunct('How are you?'), 'how are you');
  assert.equal(stripPunct("I'm fine, thanks."), "i'm fine thanks");
  assert.equal(stripPunct('Hello, how are you?'), 'hello how are you');
  assert.equal(stripPunct("I don't understand."), "i don't understand", 'word-internal apostrophe kept');
  assert.equal(stripPunct('twenty-one days'), 'twenty-one days', 'hyphen kept (part of the word)');
  assert.equal(stripPunct('he said "hello" to me'), 'he said hello to me', 'quotes dropped');

  // statuses
  assert.equal(checkAnswer('', ['I go home.']).status, 'empty');
  assert.equal(checkAnswer('   ', ['I go home.']).status, 'empty');
  assert.equal(checkAnswer('i  go home ', ['I go home.']).status, 'correct', 'case+spaces+punct are all forgiven');
  assert.equal(checkAnswer('i  go home. ', ['I go home.']).status, 'correct', 'same words + period → correct');
  assert.equal(checkAnswer('I go home', ['I go home.']).status, 'correct', 'missing trailing period → still correct (spec: punctuation optional)');
  assert.equal(checkAnswer('I go home.', ['I go home.', 'I go to home.']).status, 'correct');
  assert.equal(checkAnswer('She goes to school', ['She goes to school.']).status, 'correct');
  assert.equal(checkAnswer('He dont like tea.', ["He doesn't like tea."]).status, 'incorrect', 'contraction respected');
  assert.equal(checkAnswer("He doesn't like tea.", ["He doesn't like tea."]).status, 'correct');
  assert.equal(checkAnswer('He does not like tea.', ["He doesn't like tea."]).status, 'incorrect', 'strict: do not ≠ doesn’t');
  assert.equal(checkAnswer('He does not like tea.', ["He doesn't like tea."], { strict: false }).status, 'minor', 'lenient: contraction expansion → minor');

  // accepted answers
  const r = checkAnswer('color', ['colour', 'color']);
  assert.equal(r.status, 'correct');
  assert.equal(r.matchedAnswer, 'color');

  // empty / garbage
  assert.equal(checkAnswer('???', ['I go home.']).status, 'incorrect');
  assert.equal(isAcceptable('i GO  home ', ['I go home.']), true);
  assert.equal(isAcceptable('I went home.', ['I go home.']), false);

  // meaningful grammar differences are never forgiven
  assert.equal(checkAnswer('She go to school.', ['She goes to school.']).status, 'incorrect');
  assert.equal(checkAnswer('They is happy.', ['They are happy.']).status, 'incorrect');
  assert.equal(checkAnswer('I have saw it.', ['I have seen it.']).status, 'incorrect');

  // diff info
  const d = checkAnswer('I drink teea every morning.', ['I drink tea every morning.']);
  assert.equal(d.diff.word, 3);
  assert.equal(d.diff.typed, 'teea');
  assert.equal(d.diff.expected, 'tea');
  assert.ok(firstDiffWord('a b c', 'a b d').word === 3);

  // similarity helper
  assert.ok(similarity('I like tea', 'I like tea') === 1);
  assert.ok(similarity('I like tea', 'You hate coffee') < 0.5);

  // ---------- spec-mandated punctuation examples (requirement 9) ----------
  // wrong words are never forgiven just because punctuation is ignored
  assert.equal(checkAnswer('Good morning', ['Good morning.']).status, 'correct');
  assert.equal(checkAnswer('How are you', ['How are you?']).status, 'correct');
  assert.equal(checkAnswer("I'm fine thanks", ["I'm fine, thanks."]).status, 'correct', 'internal comma optional');
  assert.equal(checkAnswer('Hello how are you', ['Hello, how are you?']).status, 'correct');
  assert.equal(checkAnswer('Nice to meet you', ['Nice to meet you!']).status, 'correct');
  assert.equal(checkAnswer('Could you help me please', ['Could you help me, please?']).status, 'correct');
  assert.equal(checkAnswer('I work in a warehouse', ['I work in a warehouse.']).status, 'correct');
  assert.equal(checkAnswer('Where is the office', ['Where is the office?']).status, 'correct');
  assert.equal(checkAnswer("I don't understand", ["I don't understand."]).status, 'correct');
  assert.equal(checkAnswer('Let me check', ['Let me check.']).status, 'correct');
  // typed punctuation that the expected sentence lacks is also fine
  assert.equal(checkAnswer('How are you?', ['How are you']).status, 'correct');
  assert.equal(checkAnswer('I am fine, thank you.', ['I am fine thank you']).status, 'correct');
  // but real spelling / word errors stay rejected
  assert.equal(checkAnswer('I work in a werehouse', ['I work in a warehouse.']).status, 'incorrect');
  assert.equal(checkAnswer('Good morning teacher', ['Good morning.']).status, 'incorrect', 'extra word → rejected');
  assert.equal(checkAnswer('Good morning my teacher', ['Good morning, teacher.']).status, 'incorrect', 'extra word → rejected');
  assert.equal(checkAnswer('i fine', ["I'm fine, thanks."]).status, 'incorrect', 'dropped words → rejected');
  assert.equal(checkAnswer('How is you', ['How are you?']).status, 'incorrect', 'grammar error → rejected');
  // apostrophes are part of the word (requirement 8) — dropping one is a real difference
  assert.equal(checkAnswer('dont', ["don't"]).status, 'incorrect');
  assert.equal(checkAnswer('lets go', ["Let's go."]).status, 'incorrect');
  assert.equal(checkAnswer('Lets go', ["Let's go."], { strict: false }).status, 'minor');
  assert.equal(checkAnswer("Let's go", ["Let's go."]).status, 'correct');
  // accepted-answers fallback still works
  assert.equal(isAcceptable('good night', ['Good night.']), true);

  return { name, pass: true };
}
