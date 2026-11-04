/* ============================================================
   dialogues-tests.js — dialogue library & practice integration.

   Covers (all Node-runnable, no browser):
   1. All 44 dialogue modules load through the practice loader
      (including the 5 alias files) with well-formed data.
   2. Alias mapping resolves to the actual files on disk.
   3. Original book text is preserved byte-for-byte for spot
      sentences (no silent content replacement).
   4. grading.js contract used by the practice screen:
      punctuation never blocks, contractions respect strict mode,
      wordDiff exposes typed/missing tokens for feedback.
   5. i18n parity: every dlg* key exists in BOTH en and ar;
      {i}/{n} interpolation works.
   ============================================================ */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALIASES, dialogueFile, loadDialogue } from '../js/dialogues.js';
import { checkAnswer, wordDiff, isAcceptable } from '../js/grading.js';
import { I18N, t } from '../js/i18n.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function run() {
  /* 1 + 2 — loader + alias files on disk */
  for (const [num, alias] of Object.entries(ALIASES)) {
    const f = dialogueFile(Number(num));
    if (f !== `dialogue-${alias}.js`) throw new Error(`alias ${num} → ${f}`);
    if (!fs.existsSync(path.join(ROOT, 'dialogues', f))) throw new Error(`missing alias file ${f}`);
  }
  if (dialogueFile(1) !== 'dialogue-01.js') throw new Error('padding broken');
  if (dialogueFile(44) !== 'dialogue-44.js') throw new Error('padding broken (44)');

  const seen = new Set();
  let sentenceTotal = 0;
  for (let id = 1; id <= 44; id++) {
    const d = await loadDialogue(id);
    if (!d || d.dialogueId !== id || d.id !== `lesson-${String(id).padStart(3, '0')}`) throw new Error(`dialogue ${id}: bad lesson/dialogue id mapping`);
    if (!Array.isArray(d.groups) || d.groups.length === 0) throw new Error(`dialogue ${id}: no groups`);
    if (typeof d.title !== 'string' || typeof d.titleAr !== 'string' || !d.title || !d.titleAr) {
      throw new Error(`dialogue ${id}: missing title/titleAr`);
    }
    for (const g of d.groups) {
      if (!Array.isArray(g.lines) || g.lines.length === 0) throw new Error(`dialogue ${id}: empty group`);
      for (const line of g.lines) {
        if (!Array.isArray(line) || line.length !== 3
          || typeof line[0] !== 'string' || typeof line[1] !== 'string' || typeof line[2] !== 'string') {
          throw new Error(`dialogue ${id}: malformed line ${JSON.stringify(line).slice(0, 40)}`);
        }
        if (!line[1].trim() || !line[2].trim()) throw new Error(`dialogue ${id}: empty sentence/translation`);
        sentenceTotal++;
      }
    }
    if (seen.has(d.dialogueId)) throw new Error(`duplicate dialogue id ${d.dialogueId}`);
    seen.add(d.dialogueId);
  }
  if (seen.size !== 44) throw new Error(`expected 44 dialogues, got ${seen.size}`);

  /* 3 — original text preserved */
  const d1 = await loadDialogue(1);
  if (d1.groups[0].lines[0][1] !== "Hello, I'm Khaled, what is your name?") {
    throw new Error('dialogue-01 first line was modified');
  }
  if (d1.groups[0].lines[0][2] !== 'مرحبا اسمي خالد، ما اسمك؟') {
    throw new Error('dialogue-01 Arabic translation was modified');
  }
  const d23 = await loadDialogue(23);
  if (d23.title !== "What's the date today?") throw new Error('dialogue-23 alias title mismatch');

  /* 4 — grading contract used by the practice screen */
  const r1 = checkAnswer("Hello I'm Khaled what is your name", ["Hello, I'm Khaled, what is your name?"], { strict: true });
  if (r1.status !== 'correct') throw new Error('punctuation should never block');
  const r1b = checkAnswer('hello im khaled', ["Hello, I'm Khaled"], { strict: true });
  if (r1b.status !== 'incorrect') throw new Error('dropping an apostrophe is a real spelling difference');
  const r2 = checkAnswer("hello, i'm khaled", ["Hello, I'm Khaled"], { strict: true });
  if (r2.status !== 'correct') throw new Error('case + punctuation must be forgiven');
  const r3 = checkAnswer('I do not know', ["I don't know"], { strict: true });
  if (r3.status !== 'incorrect') throw new Error('strict mode must keep contractions distinct');
  const r4 = checkAnswer('I do not know', ["I don't know"], { strict: false });
  if (r4.status !== 'minor') throw new Error('lenient mode should mark contraction match as minor');
  if (!isAcceptable('Would you like some tea', ['Would you like some tea?'], { strict: true })) {
    throw new Error('punctuation-free accept failed');
  }
  if (!isAcceptable('“hello”', ['hello'], { strict: true })) throw new Error('curly quotes must normalize');
  const r5 = checkAnswer('   ', ['hello'], { strict: true });
  if (r5.status !== 'empty') throw new Error('whitespace must be empty');
  const diff = wordDiff('i lik garden', 'I like gardening');
  if (!Array.isArray(diff.typed) || !Array.isArray(diff.missing)) throw new Error('wordDiff shape broken');
  const wrongPairs = diff.typed.filter((w) => w.type === 'wrong').map((w) => w.text + '→' + w.expected);
  if (diff.typed.length !== 3 || wrongPairs.join('|') !== 'lik→like|garden→gardening') {
    throw new Error('wordDiff pairing wrong: ' + JSON.stringify(diff.typed));
  }
  const diff2 = wordDiff('i like', 'I like gardening');
  if (diff2.missing.length !== 1 || diff2.missing[0].text !== 'gardening') {
    throw new Error('wordDiff missing tokens wrong: ' + JSON.stringify(diff2.missing));
  }

  /* 5 — i18n parity for dialogue keys */
  const en = I18N.en, ar = I18N.ar;
  const dlgKeys = Object.keys(en).filter((k) => k.startsWith('dlg'));
  if (!dlgKeys.length) throw new Error('no dlg* keys found in en');
  for (const k of dlgKeys) {
    if (!(k in ar)) throw new Error(`dlg key missing in ar: ${k}`);
  }
  const arKeys = Object.keys(ar).filter((k) => k.startsWith('dlg'));
  for (const k of arKeys) {
    if (!(k in en)) throw new Error(`dlg key missing in en: ${k}`);
  }
  const s = t('en', 'dlgSentenceOf', { i: 3, n: 9 });
  if (s !== 'Sentence 3 of 9') throw new Error('dlgSentenceOf interpolation broken: ' + s);
  const sAr = t('ar', 'dlgSentenceOf', { i: 3, n: 9 });
  if (sAr !== 'الجملة 3 من 9') throw new Error('dlgSentenceOf ar interpolation broken: ' + sAr);

  return {
    name: 'dialogues-tests',
    pass: true,
    info: `44 modules (incl. ${Object.keys(ALIASES).length} aliases), ${sentenceTotal} sentences, ${dlgKeys.length} i18n keys parity en/ar`,
  };
}
