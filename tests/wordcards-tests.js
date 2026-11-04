/* ============================================================
   wordcards-tests.js — sentence analysis + word-level diff.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  POS_CATEGORIES, analyzeSentence,
} from '../js/word-cards.js';
import { wordDiff } from '../js/grading.js';

export function run() {
  const name = 'wordcards-tests';

  // the 10 POS categories required by the spec, with Arabic names
  assert.equal(POS_CATEGORIES.length, 10);
  const ids = POS_CATEGORIES.map((p) => p.id);
  for (const id of ['noun', 'verb', 'pronoun', 'adjective', 'adverb', 'preposition', 'conjunction', 'determiner', 'number', 'auxiliary']) {
    assert.ok(ids.includes(id), `missing POS ${id}`);
  }
  for (const p of POS_CATEGORIES) {
    assert.ok(p.ar && p.ar.length > 1, `${p.id} must carry an Arabic name`);
    assert.ok(p.en && p.en.length > 2, `${p.id} must carry an English name`);
  }

  // spec example sentence
  const vocab = [{ word: 'small', meaningAr: 'صغير' }];
  const toks = analyzeSentence('We have two small bags.', vocab);
  assert.equal(toks.length, 5);
  const byText = new Map(toks.map((t) => [t.text, t]));
  assert.equal(byText.get('we').posAr, 'ضمير');
  assert.equal(byText.get('have').posEn, 'Auxiliary verb');
  assert.equal(byText.get('two').posId, 'number');
  assert.equal(byText.get('small').posId, 'adjective');
  assert.equal(byText.get('small').meaningAr, 'صغير', 'lesson vocabulary meaning used');
  assert.equal(byText.get('bags').posId, 'noun', 'plural stem maps to noun');
  assert.equal(byText.get('bags').phonetic, null, 'inflected form carries no invented IPA');

  // phonetics only where the lexicon has verified entries
  assert.equal(byText.get('we').phonetic, '/wiː/');
  const unknown = analyzeSentence('The zaralek quorbledfq quickly.')[2];
  assert.equal(unknown.posId, null, 'unknown word: POS honestly undetermined');
  assert.equal(unknown.phonetic, null, 'unknown word: no fabricated phonetics');
  assert.equal(unknown.meaningAr, null, 'unknown word: no fabricated meaning');

  // morphology: -ly adverbs, digits as numbers
  const morph = analyzeSentence('She walked 3 miles yesterday.');
  assert.equal(morph[4].posId, 'adverb', 'yesterday → adverb');
  assert.equal(morph[2].posId, 'number', 'digit → number');

  // ---------- word-level diff ----------
  // spec example: user typed "We have two bag." vs "We have two small bags."
  const d = wordDiff('We have two bag.', 'We have two small bags.');
  assert.deepEqual(d.typed.map((t) => t.type), ['match', 'match', 'match', 'wrong']);
  assert.equal(d.typed[3].expected, 'bags', 'bag paired with bags as a wrong word');
  assert.deepEqual(d.missing.map((m) => m.text), ['small'], 'small flagged missing');

  // perfect answer → all match, no missing
  const ok = wordDiff('I drink tea every morning.', 'I drink tea every morning.');
  assert.ok(ok.typed.every((t) => t.type === 'match'));
  assert.equal(ok.missing.length, 0);

  // extra words are marked, not silently accepted
  const extra = wordDiff('I very like tea.', 'I like tea.');
  assert.ok(extra.typed.some((t) => t.type === 'extra'));

  // word order swap shows as wrong/missing pairs, grading stays strict elsewhere
  const swap = wordDiff('He can swim well.', 'He can swim.');
  assert.equal(swap.typed[3].type, 'extra');

  return { name, pass: true, info: '10 POS classes; no fabricated analysis; word-diff matches spec case' };
}
