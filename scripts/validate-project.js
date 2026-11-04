/* ============================================================
   validate-project.js — full pre-deployment gate.
   1. project structure (required files exist)
   2. PWA sanity (manifest.json, sw.js, icons)
   3. no committed secrets (pattern scan)
   4. content validation (validate-lessons + detect-duplicates)
   Run: node scripts/validate-project.js
   ============================================================ */

import { existsSync, readFileSync, statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

/* 1. structure */
const required = [
  'index.html', 'manifest.json', 'sw.js', 'package.json', 'README.md', 'LICENSE', '.gitignore',
  'css/style.css', 'css/responsive.css', 'css/themes.css',
  'js/app.js', 'js/router.js', 'js/lesson-loader.js', 'js/lesson-engine.js', 'js/speech.js',
  'js/grading.js', 'js/progress.js', 'js/review.js', 'js/storage.js', 'js/settings.js', 'js/utils.js',
  'js/i18n.js', 'js/lesson-schema.js',
  'data/lesson-manifest.js',
  'scripts/validate-lessons.js', 'scripts/detect-duplicates.js', 'scripts/validate-project.js',
  'scripts/serve.js',
  'tests/lesson-tests.js', 'tests/grading-tests.js', 'tests/storage-tests.js', 'tests/navigation-tests.js', 'tests/run-all.js',
  '.github/workflows/validate.yml', '.github/workflows/deploy.yml',
];
for (const rel of required) {
  if (!existsSync(join(ROOT, rel))) errors.push(`missing required file: ${rel}`);
}

let lessonFileCount = 0;
const sectionsDir = join(ROOT, 'lessons');
if (existsSync(sectionsDir)) {
  for (const dir of readdirSync(sectionsDir)) {
    const p = join(sectionsDir, dir);
    if (statSync(p).isDirectory()) lessonFileCount += readdirSync(p).filter((f) => f.endsWith('.js')).length;
  }
}
if (lessonFileCount < 250) errors.push(`lesson .js files on disk: ${lessonFileCount} < 250`);

/* 2. PWA sanity */
try {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf-8'));
  if (!manifest.name || !manifest.start_url) errors.push('manifest.json missing name/start_url');
  for (const icon of manifest.icons || []) {
    if (!existsSync(join(ROOT, icon.src))) errors.push(`manifest icon missing: ${icon.src}`);
  }
  const sw = readFileSync(join(ROOT, 'sw.js'), 'utf-8');
  if (!sw.includes('install') || !sw.includes('fetch')) errors.push('sw.js missing install/fetch handlers');
} catch (err) {
  errors.push(`PWA check failed: ${err.message}`);
}

/* 3. secret scan */
const secretPatterns = [/ghp_[A-Za-z0-9]{20,}/, /github_pat_[A-Za-z0-9_]{20,}/, /AKIA[0-9A-Z]{16}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/];
for (const rel of ['package.json', 'sw.js', 'index.html', 'scripts/serve.js', 'scripts/content/lib/builder.js']) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) continue;
  const text = readFileSync(p, 'utf-8');
  for (const re of secretPatterns) {
    if (re.test(text)) errors.push(`possible secret in ${rel}`);
  }
}

console.log('=== validate-project ===');
console.log(`  lesson .js files on disk: ${lessonFileCount}`);

if (errors.length) {
  errors.forEach((e) => console.error('  ERROR:', e));
  console.error(`FAILED with ${errors.length} error(s)`);
  process.exit(1);
}

/* 4. content validation (heaviest, run last) */
console.log('  running content validation...');
for (const script of ['scripts/validate-lessons.js', 'scripts/detect-duplicates.js']) {
  const r = spawnSync('node', [join(ROOT, script)], { encoding: 'utf-8' });
  console.log((r.stdout || '').trim());
  if (r.status !== 0) {
    errors.push(`${script} failed:\n${r.stderr || r.stdout}`);
  }
}

if (errors.length) {
  errors.forEach((e) => console.error('  ERROR:', e));
  console.error(`FAILED with ${errors.length} error(s)`);
  process.exit(1);
}
console.log('PASSED');
