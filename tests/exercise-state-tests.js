/* ============================================================
   exercise-state-tests.js — v9 smart exercise engine guarantees.
   Verifies:
     - word states: empty / active / incorrect / locked / complete
     - locked words can never be edited, removed or re-revealed
     - backspace only touches the active word
     - no clear-all exists at the state level
     - hint reveals ≤ half the word, never the whole word, never
       touches locked words, and targets the next word after a lock
     - word-order: correct chips lock, wrong chips stay removable
     - pickAlternativeQuestion: same-lesson, different question,
       same difficulty preferred, no repeats, null when exhausted
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  WORD_STATE,
  createWordSession,
  createWordOrderSession,
  pickAlternativeQuestion,
  canonicalTokens,
} from '../js/exercise-state.js';

export function run() {
  const name = 'exercise-state-tests';

  /* ---------- dictation word session ---------- */
  {
    const s = createWordSession({ sentence: "I'm fine, thank you." });
    assert.ok(s, 'session builds');
    let v = s.wordsView();
    assert.deepEqual(v.map((w) => w.text), ["I'm", 'fine,', 'thank', 'you.']);
    assert.equal(v[0].state, WORD_STATE.ACTIVE, 'first word is active');
    assert.equal(v[1].state, WORD_STATE.EMPTY);
    assert.deepEqual(v[0].required ?? [], []);

    // type "I'm" letter by letter → word 1 locks
    for (const ch of ["I", "'", 'm']) {
      const r = s.placeLetter(ch);
      assert.equal(r.accepted, true, `accept ${ch}`);
    }
    v = s.wordsView();
    assert.equal(v[0].state, WORD_STATE.LOCKED, "I'm locked");
    assert.equal(v[1].state, WORD_STATE.ACTIVE, 'active moved to word 2');
    assert.equal(s.getValue(), "I'm", 'value carries typed words');

    // locked words reject backspace
    const before = s.getValue();
    // removeLastLetter only touches ACTIVE word; simulate by removing from "fine"
    const r1 = s.removeLastLetter();
    assert.equal(r1.removed, false, 'nothing typed in active word yet');
    assert.equal(s.getValue(), before, 'locked words preserved');

    // wrong letter rejected (prefix policy)
    const r2 = s.placeLetter('x');
    assert.equal(r2.accepted, false, 'wrong letter rejected');

    // complete "fine" → locked
    for (const ch of ['f', 'i', 'n', 'e']) s.placeLetter(ch);
    v = s.wordsView();
    assert.equal(v[1].state, WORD_STATE.LOCKED, 'fine locked');
    assert.equal(s.getValue(), "I'm fine", 'space-separated value');
  }

  /* ---------- hint policy ---------- */
  {
    const s = createWordSession({ sentence: "I'm fine, thank you." });
    for (const ch of ["I", "'", 'm']) s.placeLetter(ch);
    for (const ch of ['f', 'i', 'n', 'e']) s.placeLetter(ch);

    // hint targets "thank" (5 letters, cap = 2)
    const h1 = s.revealFirstLetter();
    assert.equal(h1.revealed, true, 'first hint reveals');
    assert.equal(h1.letter, 't', 'first letter of CURRENT word');
    const h2 = s.revealFirstLetter();
    assert.equal(h2.revealed, true, 'second press reveals next letter');
    assert.equal(h2.letter, 'h');
    const h3 = s.revealFirstLetter();
    assert.equal(h3.revealed, false, 'cap reached — never reveals the whole word');
    assert.equal(h3.reason, 'cap-reached');

    // revealed letters count toward the word
    assert.equal(s.getValue(), "I'm fine th", 'hint letters enter the buffer');

    // finish the word; hint then targets the NEXT word automatically
    for (const ch of ['a', 'n', 'k']) s.placeLetter(ch);
    assert.equal(s.wordsView()[2].state, WORD_STATE.LOCKED, 'thank locked');
    const h4 = s.revealFirstLetter();
    assert.equal(h4.revealed, true, 'next word hint');
    assert.equal(h4.letter, 'y', 'targets "you" now');
  }

  /* ---------- one-letter words are never hinted ---------- */
  {
    const s = createWordSession({ sentence: 'I am here.' });
    const h = s.revealFirstLetter();
    assert.equal(h.revealed, false, '1-letter word refuses hint (would be the whole word)');
    assert.equal(h.reason, 'word-too-short');
  }

  /* ---------- backspace removes only from active word ---------- */
  {
    const s = createWordSession({ sentence: 'Good morning' });
    for (const ch of ['g', 'o', 'o', 'd']) s.placeLetter(ch);
    assert.equal(s.wordsView()[0].state, WORD_STATE.LOCKED);
    const r = s.removeLastLetter();
    assert.equal(r.removed, false, 'active word empty — nothing removed');
    s.placeLetter('m');
    const r2 = s.removeLastLetter();
    assert.equal(r2.removed, true, 'active word letter removed');
    assert.equal(s.wordsView()[1].progress, 0, 'active word emptied');
    assert.equal(s.wordsView()[0].progress, 4, 'locked word untouched');
  }

  /* ---------- completion ---------- */
  {
    const s = createWordSession({ sentence: 'Hi there.' });
    for (const ch of 'hi') s.placeLetter(ch);
    for (const ch of 'there') s.placeLetter(ch);
    assert.equal(s.isComplete(), true, 'session completes');
    assert.equal(s.getValue(), 'Hi there', 'canonical letters are stored');
    const h = s.revealFirstLetter();
    assert.equal(h.revealed, false, 'no hints after completion');
    const p = s.placeLetter('x');
    assert.equal(p.accepted, false, 'no placement after completion');
  }

  /* ---------- reset (restart with confirmation) ---------- */
  {
    const s = createWordSession({ sentence: 'Open the door' });
    for (const ch of 'open') s.placeLetter(ch);
    s.reset();
    const v = s.wordsView();
    assert.ok(v.every((w) => w.progress === 0), 'reset clears all progress');
    assert.ok(v.slice(1).every((w) => w.state === WORD_STATE.EMPTY), 'other words back to empty');
    assert.equal(v[0].state, WORD_STATE.ACTIVE, 'first word active again');
    assert.equal(s.getValue(), '');
  }

  /* ---------- word-order session ---------- */
  {
    const s = createWordOrderSession({
      expectedSentence: 'How are you today?',
      chips: ['you', 'How', 'today', 'are'],
    });
    assert.deepEqual(s.expected, ['How', 'are', 'you', 'today'], 'canonical order from sentence');

    // wrong chip → placed, incorrect, removable
    let r = s.place(0); // "you"
    assert.equal(r.placed, true);
    assert.equal(r.locked, false, 'wrong chip does not lock');
    let slots = s.slotsView();
    assert.equal(slots[0].state, WORD_STATE.INCORRECT, 'incorrect state');
    const rm = s.removeAt(0);
    assert.equal(rm.removed, true, 'incorrect chip removable');

    // correct chip → locked, refuses removal
    r = s.place(1); // "How"
    assert.equal(r.locked, true, 'correct chip locks');
    const rm2 = s.removeAt(0);
    assert.equal(rm2.removed, false, 'locked word protected');

    r = s.place(3); // "are"
    r = s.place(0); // "you"
    r = s.place(2); // "today"
    assert.equal(s.isComplete(), true, 'session complete');
    assert.equal(s.getValue(), 'How are you today', 'built value');

    // regression: slotsView exposes position so the UI can remove
    // a WRONG chip at its slot (locked slots refuse)
    const s2 = createWordOrderSession({ expectedSentence: 'Good morning teacher', chips: ['teacher', 'morning', 'Good'] });
    s2.place(0); // teacher → wrong at position 0
    const v = s2.slotsView()[0];
    assert.equal(v.position, 0, 'slotsView exposes position');
    assert.equal(v.locked, false, 'wrong chip is not locked');
    assert.equal(s2.removeAt(v.position).removed, true, 'wrong chip removable via view position');
  }

  /* ---------- pickAlternativeQuestion ---------- */
  {
    const exercises = [
      { id: 'a', difficulty: 1 },
      { id: 'b', difficulty: 2 },
      { id: 'c', difficulty: 2 },
      { id: 'd', difficulty: 1 },
    ];
    let alt = pickAlternativeQuestion({ exercises, currentIndex: 0 });
    // cur = a (difficulty 1); same-difficulty candidate = d (index 3)
    assert.equal(alt.exercise.id, 'd', 'prefers same difficulty as the skipped one');

    alt = pickAlternativeQuestion({ exercises, currentIndex: 1 });
    assert.equal(alt.exercise.id, 'c', 'wrapped forward, same difficulty first');

    const used = new Set(['c', 'd']);
    alt = pickAlternativeQuestion({ exercises, currentIndex: 1, usedIds: used });
    assert.equal(alt.exercise.id, 'a', 'falls back to remaining candidates');

    // exhausted → null (UI must require completing the question)
    const allUsed = new Set(['a', 'c', 'd']);
    alt = pickAlternativeQuestion({ exercises, currentIndex: 1, usedIds: allUsed });
    assert.equal(alt, null, 'no alternative → must answer the question');

    // answered exercises are excluded too
    alt = pickAlternativeQuestion({ exercises, currentIndex: 0, answeredIds: new Set(['d']) });
    assert.equal(alt.exercise.id, 'b', 'answered exercises excluded');
  }

  /* ---------- canonical tokens ---------- */
  {
    assert.deepEqual(canonicalTokens('Hello, how are you?'), ['Hello', 'how', 'are', 'you']);
    assert.deepEqual(canonicalTokens("I don't know."), ["I", "don't", 'know'], 'word-internal apostrophes kept');
  }

  return { name, pass: true, info: 'word locking, hint cap, backspace protection, word-order locks, skip-alternatives verified' };
}
