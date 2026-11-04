/* ============================================================
   navigation-tests.js — router parsing/building and the
   GitHub-Pages-safe URL resolution of the lesson loader.
   ============================================================ */

import assert from 'node:assert/strict';
import { parseHash, buildHash, ROUTES } from '../js/router.js';
import { resolveAssetUrl, getManifest, getManifestEntry, getManifestBySection, nextLessonInSection } from '../js/lesson-loader.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export function run() {
  const name = 'navigation-tests';

  // hash parsing
  assert.deepEqual(parseHash(''), { name: 'home', params: [], query: {} });
  assert.deepEqual(parseHash('#/'), { name: 'home', params: [], query: {} });
  assert.deepEqual(parseHash('#/section/tenses'), { name: 'section', params: ['tenses'], query: {} });
  assert.deepEqual(parseHash('#/lesson/lesson-013'), { name: 'lesson', params: ['lesson-013'], query: {} });
  assert.deepEqual(parseHash('#/review'), { name: 'review', params: [], query: {} });
  assert.deepEqual(parseHash('lesson/lesson-007'), { name: 'lesson', params: ['lesson-007'], query: {} });
  assert.equal(buildHash('lesson', ['lesson-013']), '#/lesson/lesson-013');
  assert.equal(buildHash('home'), '#/home');
  assert.ok(ROUTES.includes('review'));

  // manifest integrity for navigation
  const manifest = getManifest();
  assert.ok(manifest.length >= 250);
  for (const entry of manifest) {
    assert.ok(existsSync(join(ROOT, entry.path)), `file exists for ${entry.id}`);
  }
  assert.equal(getManifestEntry('lesson-001').section, 'foundations');
  assert.equal(getManifestBySection('daily-life').length, 25);
  assert.equal(nextLessonInSection('lesson-001'), 'lesson-002');
  assert.equal(nextLessonInSection('lesson-020'), null, 'last lesson of foundations has no next in its section');
  assert.equal(nextLessonInSection('lesson-021'), 'lesson-022');
  assert.equal(nextLessonInSection(getManifest()[getManifest().length - 1].id), null, 'last lesson has no next');

  // GitHub Pages path resolution: relative to js/ module location
  const url = resolveAssetUrl('lessons/foundations/lesson-001.js');
  assert.ok(url.includes('/lessons/foundations/lesson-001.js'), 'resolves under repo root');
  assert.ok(!url.startsWith('file:///lessons'), 'not rooted at filesystem root');
  // works under a sub-path simulation: js/ is inside ROOT, so resolved URL is ROOT + path
  assert.ok(url.startsWith('file://' + ROOT), 'stays inside project root regardless of host base');

  return { name, pass: true };
}
