/* ============================================================
   letter-track-tests.js — YouType-style letter slot logic.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import { splitSegments, letterStates } from '../js/letter-track.js';

export function run() {
  const name = 'letter-track-tests';

  // ---------- splitSegments ----------
  const segs = splitSegments('Hi there.');
  assert.deepEqual(segs, [
    { type: 'word', start: 0, end: 2 },   // Hi
    { type: 'gap', start: 2, end: 3 },    // space
    { type: 'word', start: 3, end: 9 },   // there.
  ], 'words and gaps cover the sentence');

  // segments must tile the whole string with no holes/overlaps
  const sentence = 'The bus is late today.';
  let cursor = 0;
  for (const seg of splitSegments(sentence)) {
    assert.equal(seg.start, cursor, 'segments are contiguous');
    cursor = seg.end;
  }
  assert.equal(cursor, sentence.length, 'segments reach the end');

  // punctuation stays attached to its word; no gap at the ends
  const edge = splitSegments('Hello');
  assert.equal(edge.length, 1);
  assert.equal(edge[0].type, 'word');

  // multiple consecutive spaces still get one gap segment
  const multi = splitSegments('a  b');
  assert.deepEqual(multi.map((s) => s.type), ['word', 'gap', 'word']);
  assert.equal(multi[1].end - multi[1].start, 2, 'gap covers the space run');

  // empty / null input is safe
  assert.deepEqual(splitSegments(''), []);
  assert.deepEqual(splitSegments(null), []);

  // ---------- letterStates ----------
  const expected = 'The bus.';

  // nothing typed → first char is current, rest empty
  let states = letterStates(expected, '');
  assert.equal(states[0], 'current');
  assert.ok(states.slice(1).every((s) => s === 'empty'));

  // correct prefix → filled, next is current
  states = letterStates(expected, 'The b');
  assert.equal(states.slice(0, 5).every((s) => s === 'filled'), true);
  assert.equal(states[5], 'current');
  assert.equal(states[7], 'empty');

  // case-insensitive matching (grading.js normalizes case too)
  states = letterStates(expected, 'the B');
  assert.equal(states.slice(0, 5).every((s) => s === 'filled'), true);

  // a wrong letter beyond the prefix is transient 'wrong'
  states = letterStates(expected, 'The Xz');
  assert.equal(states[0], 'filled');
  assert.equal(states[4], 'wrong', 'X does not match b');
  assert.equal(states[5], 'wrong');

  // full completion → all filled
  states = letterStates(expected, 'The bus.');
  assert.ok(states.every((s) => s === 'filled'));

  // typed longer than expected cannot crash
  states = letterStates(expected, 'The bus.!!');
  assert.ok(states.every((s) => s === 'filled'));

  return { name, pass: true, info: 'segments tile the sentence; slot states (filled/current/wrong) match spec' };
}
