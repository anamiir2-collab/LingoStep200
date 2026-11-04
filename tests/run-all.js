/* ============================================================
   run-all.js — tiny zero-dependency test runner.
   Run: node tests/run-all.js   (npm test)
   Exits 1 if any test fails. Async tests supported.
   ============================================================ */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const suites = ['./grading-tests.js', './punctuation-tests.js', './storage-tests.js', './navigation-tests.js', './lesson-tests.js', './xp-tests.js', './motivation-tests.js', './wordcards-tests.js', './letter-track-tests.js', './dialogues-tests.js', './touch-typing-tests.js', './content-parity-tests.js', './hints-tests.js', './placement-tests.js', './daily-plan-tests.js', './backup-tests.js', './exercise-state-tests.js'];

const results = [];
let failed = false;

for (const suite of suites) {
  const mod = await import(new URL(suite, import.meta.url).href);
  try {
    const r = await mod.run();
    results.push(r);
    console.log(`✓ ${r.name}${r.info ? ` — ${r.info}` : ''}`);
  } catch (err) {
    failed = true;
    results.push({ name: suite, pass: false, error: err.message });
    console.error(`✗ ${suite}`);
    console.error('  ' + String(err.stack || err.message).split('\n').slice(0, 6).join('\n  '));
  }
}

console.log(`\n${results.filter((r) => r.pass).length}/${results.length} test suites passed`);
if (failed) process.exit(1);
console.log('ALL TESTS PASSED');
