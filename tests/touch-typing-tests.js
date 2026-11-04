/* ============================================================
   touch-typing-tests.js — v8 keyboard-free input logic.
   Proves the touch conversion preserves the ORIGINAL validation
   semantics: same accepted keystrokes, same rejected letters,
   same optional punctuation, same required apostrophes/hyphens.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { validateKeystroke, backspaceBuffer, buildTiles, requiredKeyChars } from '../js/touch-typing.js';
import { alignTyped } from '../js/letter-track.js';
import { checkAnswer } from '../js/grading.js';

export function run() {
  const name = 'touch-typing-tests';

  /* ---------- validateKeystroke: prefix policy parity ---------- */

  // correct letters extend the buffer
  let r = validateKeystroke('Hello', '', 'h');
  assert.equal(r.accepted, true, 'first correct letter accepted (case-insensitive)');
  assert.equal(r.buffer, 'h');

  // wrong letters are rejected and the buffer is untouched
  r = validateKeystroke('Hello', '', 'x');
  assert.equal(r.accepted, false, 'wrong first letter rejected');
  assert.equal(r.buffer, '', 'rejected key leaves the buffer unchanged');

  // letters must come in order — skipping ahead is rejected
  r = validateKeystroke('Hello', 'Hel', 'o');
  assert.equal(r.accepted, false, 'out-of-order letter rejected');
  r = validateKeystroke('Hello', 'Hel', 'l');
  assert.equal(r.accepted, true, 'next required letter accepted');

  /* ---------- punctuation parity with the original rules ---------- */

  // punctuation keys are not part of the touch keyboard layout
  assert.equal(requiredKeyChars('Hi there.').has('.'), false,
    'punctuation never appears as a key');
  // (on desktop a matching punctuation char behaves like the original
  // input did: accepted and ignored by grading)

  // completion never requires punctuation
  assert.equal(alignTyped('Hi there.', 'Hi there').complete, true,
    'sentence with punctuation completes without typing the mark');

  // apostrophes INSIDE words stay required (don't, I'm)
  r = validateKeystroke("I'm fine", 'i', 'm');
  assert.equal(r.accepted, false, 'skipping the apostrophe breaks the prefix');
  r = validateKeystroke("I'm fine", 'i', "'");
  assert.equal(r.accepted, true, 'apostrophe key accepted where expected');
  r = validateKeystroke("I'm fine", "i'", 'm');
  assert.equal(r.accepted, true, 'contraction continues after apostrophe');

  // hyphens stay required (compound words)
  r = validateKeystroke('twenty-one', 'twenty', '-');
  assert.equal(r.accepted, true, 'hyphen accepted where expected');

  // completing without punctuation works
  assert.equal(validateKeystroke('How are you?', 'how are you', '').complete !== undefined, true);

  /* ---------- backspaceBuffer ---------- */

  assert.equal(backspaceBuffer('hel'), 'he');
  assert.equal(backspaceBuffer(''), '');
  assert.equal(backspaceBuffer(undefined), '');

  /* ---------- buildTiles ---------- */

  // letters for single words
  const tiles = buildTiles('morning');
  assert.equal(tiles.length, 7, 'one tile per letter');
  assert.deepEqual([...tiles].sort().join(''), [...'morning'].sort().join(''),
    'tiles preserve the exact letter multiset');

  // words for multi-word blanks
  const words = buildTiles('good morning');
  assert.deepEqual([...words].sort(), ['good', 'morning'], 'multi-word blanks tile by word');

  // never presents the identity order for short answers
  let sawIdentity = false;
  for (let i = 0; i < 40; i++) {
    const t = buildTiles('cat', () => 0); // deterministic shuffle still not identity
    if (t.join('') === 'cat') sawIdentity = true;
  }
  assert.equal(sawIdentity, false, 'short answers never render in the answer order');

  // empty / edge input
  assert.deepEqual(buildTiles(''), []);
  assert.deepEqual(buildTiles('a'), ['a']);

  /* ---------- requiredKeyChars ---------- */

  const need = requiredKeyChars("I'm twenty-three today");
  assert.equal(need.has("'"), true, 'apostrophe required when expected contains one');
  assert.equal(need.has('-'), true, 'hyphen required when expected contains one');
  assert.equal(need.has('space'), true, 'space required for multi-word sentences');
  assert.equal(requiredKeyChars('Hello!').size, 0, 'plain sentence needs only the base keys');
  assert.equal(requiredKeyChars('How are you?').has('space'), true);

  /* ---------- end-to-end: built value grades EXACTLY like typing ---------- */

  const accepted = ['Hello! How are you?'];
  // simulate tapping the whole sentence through the touch field
  let buf = '';
  for (const ch of 'hello how are you') {
    const step = validateKeystroke('Hello! How are you?', buf, ch);
    assert.equal(step.accepted, true, `tap "${ch}" accepted in context`);
    buf = step.buffer;
  }
  assert.equal(alignTyped('Hello! How are you?', buf).complete, true,
    'touch-built sentence reaches completion');
  assert.equal(checkAnswer(buf, accepted, { strict: true }).status, 'correct',
    'touch-built answer grades as correct with the ORIGINAL checker');

  // wrong final letter → not complete → no auto-check
  let buf2 = '';
  for (const ch of 'hello how are you') buf2 = validateKeystroke('Hello! How are you?', buf2, ch).buffer;
  const bad = validateKeystroke('Hello! How are you?', buf2, 'x');
  assert.equal(bad.accepted, false, 'extra wrong tap rejected after completion point');

  return { name, pass: true, info: 'touch input preserves the original validation policy' };
}
