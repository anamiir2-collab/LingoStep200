/* ============================================================
   apply-audio-upgrade.js — applies the Section 20 audio upgrade
   to the vanilla LingoStep app.

   The ZIP-extract workflow copies only NEW files (cp -an never
   overwrites). This script performs the three INTENTIONAL edits to
   existing files, surgically and idempotently:

     1. js/speech.js  ← replaced by js/audio-upgrade/speech.next.js
        (same public API, upgraded engine — every existing call
        site keeps working and gains accent/voice/speed/volume)
     2. js/app.js     ← wires the upgraded audio settings panel
        into the More screen (2 anchored edits)
     3. sw.js         ← cache version bump + precache the new files
        so offline users get the upgrade

   Usage:
     node scripts/apply-audio-upgrade.js --check   (default: report only)
     node scripts/apply-audio-upgrade.js --write   (apply changes)

   Fails loudly (exit 1) if an anchor is missing instead of guessing.
   Running it twice is safe: already-applied steps are skipped.
   ============================================================ */

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');

let errors = [];
let changes = [];

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) { errors.push(`missing file: ${rel}`); return null; }
  return readFileSync(p, 'utf-8');
}

function report(rel, what) { changes.push(`${rel}: ${what}`); }

/* ---------- 1. speech.js replacement ---------- */

const NEXT = 'js/audio-upgrade/speech.next.js';
const nextSrc = read(NEXT);
if (nextSrc) {
  const cur = read('js/speech.js');
  if (cur !== null) {
    const alreadyUpgraded = cur.includes('audio-upgrade/boot.js');
    if (alreadyUpgraded) {
      report('js/speech.js', 'already upgraded (skipped)');
    } else if (WRITE) {
      copyFileSync(join(ROOT, NEXT), join(ROOT, 'js/speech.js'));
      report('js/speech.js', 'replaced with upgraded engine (same public API)');
    } else {
      report('js/speech.js', 'WILL be replaced with upgraded engine');
    }
  }
}

/* ---------- 2. app.js wiring ---------- */

const appSrc = read('js/app.js');
if (appSrc !== null) {
  let out = appSrc;

  if (out.includes('renderAudioSettingsPanel')) {
    report('js/app.js', 'already wired (skipped)');
  } else {
    const IMPORT_ANCHOR = "import { isSupported as speechSupported, loadVoices, englishVoices, speak, stopSpeaking } from './speech.js';";
    const IMPORT_ADD = "\nimport { renderAudioSettingsPanel } from './audio-upgrade/ui.js';";
    if (!out.includes(IMPORT_ANCHOR)) {
      errors.push('js/app.js: speech import anchor not found (app.js changed upstream?)');
    } else {
      out = out.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + IMPORT_ADD);
      report('js/app.js', 'audio panel import added');
    }

    const BLOCK_ANCHOR = [
      "  const speechContent = el('div', { class: 'more-section-content more-list' }, [",
      "    settingRow(t(L, 'voice'), null, voiceSel),",
      "    settingRow(t(L, 'speechRate'), null, el('div', { class: 'row' }, [rateSel, testVoiceBtn])),",
      "    settingRow(t(L, 'slowWordByWord'), t(L, 'slowWordByWordNote'), toggle(s.slowWordByWord !== false, (on) => saveSettings({ slowWordByWord: on }))),",
      "    el('p', { class: 'small muted more-note', text: t(L, 'speechNote') }),",
      '  ]);',
    ].join('\n');
    const BLOCK_NEW = [
      '  // Upgraded speech settings (Section 20 audio system) — accent, voice,',
      '  // speed, volume, auto-repeat, playback controls and speaking practice.',
      '  const speechContent = await renderAudioSettingsPanel({',
      '    L, s, t, el, toast, icon, iconLabel, toggle, settingRow, saveSettings, rateSel,',
      '  });',
    ].join('\n');
    if (!out.includes(BLOCK_ANCHOR)) {
      errors.push('js/app.js: speechContent block anchor not found (app.js changed upstream?)');
    } else {
      out = out.replace(BLOCK_ANCHOR, BLOCK_NEW);
      report('js/app.js', 'More screen now renders the upgraded audio settings panel');
    }
  }

  if (WRITE && out !== appSrc) writeFileSync(join(ROOT, 'js/app.js'), out);
}

/* ---------- 3. sw.js cache bump + precache ---------- */

const swSrc = read('sw.js');
if (swSrc !== null) {
  let out = swSrc;

  const VERSION_RE = /const VERSION = '([^']+)';/;
  const m = out.match(VERSION_RE);
  if (!m) {
    errors.push('sw.js: VERSION line not found');
  } else if (m[1] !== 'v6.1.0-audio') {
    out = out.replace(VERSION_RE, "const VERSION = 'v6.1.0-audio';");
    report('sw.js', `cache version ${m[1]} → v6.1.0-audio`);
  } else {
    report('sw.js', 'cache version already v6.1.0-audio');
  }

  const SHELL_ANCHOR = "  './js/speech.js',";
  const SHELL_ADD = [
    "  './css/audio.css',",
    "  './js/audio-upgrade/core.js',",
    "  './js/audio-upgrade/ui.js',",
    "  './js/audio-upgrade/boot.js',",
  ].join('\n');
  if (out.includes("'./css/audio.css'")) {
    report('sw.js', 'new audio files already precached');
  } else if (!out.includes(SHELL_ANCHOR)) {
    errors.push('sw.js: shell asset anchor not found');
  } else {
    out = out.replace(SHELL_ANCHOR, SHELL_ANCHOR + '\n' + SHELL_ADD);
    report('sw.js', 'audio upgrade files added to precache');
  }

  if (WRITE && out !== swSrc) writeFileSync(join(ROOT, 'sw.js'), out);
}

/* ---------- report ---------- */

console.log('== LingoStep audio upgrade ==');
for (const c of changes) console.log('  •', c);
if (errors.length) {
  console.error('\nERRORS — nothing exotic attempted, anchors must match exactly:');
  for (const e of errors) console.error('  ✗', e);
  console.error('\nNo partial risk: run with --write only after the anchors above exist.');
  process.exit(1);
}
if (!WRITE) {
  console.log('\nDry run only. Re-run with --write to apply.');
} else {
  console.log('\nApplied. Reload the app twice (service worker update) to see it live.');
}
