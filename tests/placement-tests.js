/* ============================================================
   placement-tests.js — level estimate contract (js/placement.js).
   Verifies:
     - plan covers the level ladder deterministically
     - a question is never counted twice in the estimate
     - the ladder stops at the first failing band
     - recommendations stay at/below the estimated level
     - persisted result validation
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  buildPlacementPlan, pickExerciseFromLesson, isAnswerCorrect,
  estimateLevel, recommendedLessons, isValidPlacementResult, levelIndex,
} from '../js/placement.js';

export function run() {
  const name = 'placement-tests';

  /* 1 — levelIndex */
  assert.equal(levelIndex('A1'), 0);
  assert.equal(levelIndex('C1'), 4);
  assert.equal(levelIndex('weird'), 0);
  assert.equal(levelIndex(undefined), 0);

  /* 2 — deterministic plan across the ladder */
  const manifest = [];
  for (let li = 0; li < 5; li++) {
    for (let k = 1; k <= 4; k++) {
      manifest.push({ id: `lesson-${li}${k}`, level: ['A1', 'A2', 'B1', 'B2', 'C1'][li], available: true, title: `L${li}${k}`, titleAr: `د${li}${k}`, section: 'foundations' });
    }
  }
  const plan = buildPlacementPlan(manifest, { perLevel: 3 });
  assert.equal(plan.length, 15);
  assert.equal(plan[0].level, 'A1');
  assert.equal(plan[plan.length - 1].level, 'C1');
  const plan2 = buildPlacementPlan(manifest, { perLevel: 3 });
  assert.deepEqual(plan, plan2, 'plan is deterministic (no RNG)');

  /* 3 — exercise picking prefers self-contained types */
  const lesson = {
    exercises: [
      { type: 'listen-and-type', en: 'a', id: 'x1' },
      { type: 'multiple-choice', question: 'q', options: ['a', 'b', 'c'], answerIndex: 0, id: 'x2', difficulty: 2 },
      { type: 'fill-blank', display: 'a ___', blankWord: 'b', acceptedAnswers: ['b'], id: 'x3' },
    ],
  };
  const picked = pickExerciseFromLesson(lesson, {});
  assert.equal(picked.type, 'multiple-choice');

  /* 4 — answer checking mirrors grading semantics (punctuation/case-free) */
  assert.equal(isAnswerCorrect({ type: 'fill-blank', acceptedAnswers: ["don't"] }, 'dont'), true);
  assert.equal(isAnswerCorrect({ type: 'multiple-choice', options: ['I am fine'], answerIndex: 0 }, 'i am fine'), true);
  assert.equal(isAnswerCorrect({ type: 'word-order', en: 'She drinks tea' }, 'she drinks tea'), true);
  assert.equal(isAnswerCorrect({ type: 'word-order', en: 'She drinks tea' }, 'drinks tea she'), false);
  assert.equal(isAnswerCorrect(null, 'x'), false);
  assert.equal(isAnswerCorrect({ type: 'fill-blank', acceptedAnswers: ['b'] }, ''), false);

  /* 5 — duplicate questions never inflate the estimate */
  const results = [
    { planIndex: 0, level: 'A1', exerciseId: 'a', correct: true, tags: ['t1'] },
    { planIndex: 1, level: 'A1', exerciseId: 'b', correct: true, tags: [] },
    { planIndex: 2, level: 'A2', exerciseId: 'c', correct: true, tags: [] },
    { planIndex: 3, level: 'A2', exerciseId: 'c', correct: true, tags: [] }, // duplicate — ignored
    { planIndex: 4, level: 'B1', exerciseId: 'd', correct: false, tags: ['weak-tag'] },
    { planIndex: 5, level: 'B1', exerciseId: 'e', correct: false, tags: ['weak-tag'] },
  ];
  const est = estimateLevel(results);
  assert.equal(est.answered, 5, 'duplicate question counted once');
  assert.equal(est.level, 'A2', 'ladder stops before the failing B1 band');
  assert.ok(est.weakTags.includes('weak-tag'), 'wrong answers surface weak tags');

  /* 6 — strong performance climbs to the top rung */
  const strong = [];
  for (let li = 0; li < 5; li++) {
    for (let k = 0; k < 3; k++) {
      strong.push({ planIndex: li * 3 + k, level: ['A1', 'A2', 'B1', 'B2', 'C1'][li], exerciseId: `s${li}-${k}`, correct: true, tags: [] });
    }
  }
  assert.equal(estimateLevel(strong).level, 'C1');

  /* 7 — empty results default to A1 */
  const empty = estimateLevel([]);
  assert.equal(empty.level, 'A1');
  assert.equal(empty.answered, 0);

  /* 8 — recommendations never exceed the estimated level */
  const recs = recommendedLessons({ level: 'A2', weakTags: [] }, manifest, { limit: 6 });
  assert.ok(recs.length <= 6);
  assert.ok(recs.every((r) => levelIndex(r.level) <= levelIndex('A2')), 'no lesson above the estimate');
  const withWeak = recommendedLessons({ level: 'B1', weakTags: [] }, manifest, { limit: 3 });
  assert.ok(withWeak.length === 3);

  /* 9 — result validator */
  assert.equal(isValidPlacementResult({ level: 'B2', answered: 10, correct: 7, weakTags: ['x'], at: Date.now() }), true);
  assert.equal(isValidPlacementResult({ level: 'Z9', answered: 1, correct: 1, weakTags: [], at: 1 }), false);
  assert.equal(isValidPlacementResult(null), false);

  return { name, pass: true, info: 'estimate dedupes questions; ladder stops at first failing band' };
}
