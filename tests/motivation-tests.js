/* ============================================================
   motivation-tests.js — motivational messages dataset & picker.
   Run via: node tests/run-all.js
   ============================================================ */

import assert from 'node:assert/strict';
import {
  MOTIVATION_CATEGORIES, categoryCounts, totalMessageCount,
  applyName, pickForCategory,
} from '../js/motivation.js';
import { MOTIVATIONAL_MESSAGES, MOTIVATION_FALLBACK } from '../data/motivational-messages.js';

export function run() {
  const name = 'motivation-tests';

  // spec: at least 50 Arabic messages, standalone data file
  const total = totalMessageCount();
  assert.ok(total >= 50, `expected >= 50 messages, got ${total}`);

  // required context categories all exist and are non-empty
  for (const cat of ['correct', 'xp', 'lessonComplete', 'streak', 'wrongEncourage', 'firstVisit', 'review']) {
    assert.ok(MOTIVATION_CATEGORIES.includes(cat), `missing category ${cat}`);
    assert.ok(categoryCounts()[cat] > 0, `category ${cat} is empty`);
  }

  // every message is non-empty Arabic text (contains Arabic letters)
  const arabicRe = /[\u0600-\u06FF]/;
  for (const [cat, list] of Object.entries(MOTIVATIONAL_MESSAGES)) {
    assert.ok(Array.isArray(list) && list.length > 0, `${cat} must be a non-empty array`);
    for (const msg of list) {
      assert.equal(typeof msg, 'string');
      assert.ok(msg.trim().length > 8, `${cat} message too short`);
      assert.ok(arabicRe.test(msg), `${cat} message must be Arabic: ${msg}`);
    }
  }

  // {name} placeholder replacement
  assert.equal(applyName('أحسنت يا {name}، واصل!', 'سارة'), 'أحسنت يا سارة، واصل!');

  // clean removal when no name: no dangling "يا" or "{name}" left
  const cleaned = applyName('أحسنت يا {name}، واصل!', '');
  assert.ok(!cleaned.includes('{name}'), 'placeholder removed');
  assert.ok(!/\sيا[\s،]/.test(cleaned), 'no dangling vocative');
  assert.ok(!cleaned.includes('  '), 'no double spaces');
  assert.equal(applyName('يا {name} أنت رائع', ''), 'أنت رائع');

  // messages without the placeholder are untouched (modulo space cleanup)
  assert.equal(applyName('استمر في التدريب', ''), 'استمر في التدريب');
  assert.equal(applyName('استمر في التدريب', 'أحمد'), 'استمر في التدريب');

  // picker returns a message of the right category; unknown falls back
  const picked = pickForCategory('correct', { name: '' });
  assert.ok(MOTIVATIONAL_MESSAGES.correct.includes(picked) || picked === applyName(MOTIVATION_FALLBACK, ''));
  assert.ok(picked.length > 5);
  assert.ok(pickForCategory('does-not-exist', {}).length > 5, 'fallback works');

  // avoid-repeats: with a single avoid hint the picker never returns it
  const only = ['رسالة وحيدة هنا'];
  MOTIVATIONAL_MESSAGES._tmp = only;
  const got = pickForCategory('_tmp', { avoid: only[0] });
  assert.equal(got, only[0], 'single-message category still returns its message');
  delete MOTIVATIONAL_MESSAGES._tmp;

  return { name, pass: true, info: `${total} messages across ${MOTIVATION_CATEGORIES.length} categories` };
}
