/* ============================================================
   build-www.js — v9 web build for Capacitor.
   Copies the web app (no build step needed — vanilla ES modules)
   into www/, which Capacitor bundles into the Android APK.
   Explicit file list: nothing accidental ships in the app.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WWW = path.join(ROOT, 'www');

const COPY_DIRS = [
  'css',
  'js',
  'lessons',
  'dialogues',
  'data',
  'icons',
  'assets',
];
const COPY_FILES = [
  'index.html',
  'manifest.json',
  'sw.js',
];

/* never ship these inside the APK */
const JS_SKIP = new Set([]);

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else {
      if (JS_SKIP.has(entry.name)) continue;
      fs.copyFileSync(s, d);
    }
  }
}

let files = 0;
for (const dir of COPY_DIRS) {
  const src = path.join(ROOT, dir);
  if (fs.existsSync(src)) {
    copyDir(src, path.join(WWW, dir));
    files += fs.readdirSync(src).length;
  }
}
for (const file of COPY_FILES) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(WWW, file));
    files += 1;
  }
}

// sanity: the shell must exist and the keyboard module must be gone
for (const must of ['index.html', 'manifest.json', 'sw.js', 'js/app.js', 'js/exercise-state.js', 'css/premium.css']) {
  if (!fs.existsSync(path.join(WWW, must))) {
    console.error(`BUILD FAILED: www/${must} missing`);
    process.exit(1);
  }
}
if (fs.existsSync(path.join(WWW, 'js/keyboard.js'))) {
  console.error('BUILD FAILED: js/keyboard.js must not ship (QWERTY keyboard removed)');
  process.exit(1);
}
if (!fs.existsSync(path.join(WWW, 'lessons/food-services/lesson-071.js'))) {
  console.error('BUILD FAILED: restored food-services lessons missing');
  process.exit(1);
}

console.log(`BUILD OK → www/ (${files} top-level entries copied)`);
