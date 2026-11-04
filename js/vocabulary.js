/* ============================================================
   LingoStep — vocabulary.js
   Vocabulary hub: browse & practice ONLY the words from lessons
   the user has actually practiced (real history — nothing fake).

   Mastery rule (documented, based on real practice):
     mastered = the last practice answer was correct
                AND the word was answered correctly >= 2 times.
     Seeing a word is never enough — only real answers count.

   Practice: multiple-choice (word → Arabic meaning) with
   distractors drawn from other encountered words. Every answer
   updates vocabStats (persisted via the shared storage backend).

   Node-importable logic + browser view function.
   ============================================================ */

import { el } from './utils.js';
import { icon, iconLabel } from './icons.js';
import { t } from './i18n.js';
import { kvGet, kvSet } from './storage.js';
import { getSettings } from './settings.js';
import { getAllLessonStates } from './progress.js';
import { getManifest, loadLesson } from './lesson-loader.js';
import { speak, stopSpeaking } from './speech.js';
import { POS_CATEGORIES, analyzeSentence } from './word-cards.js';

const K_VOCAB = 'vocabStats';
const PRACTICE_BATCH = 8;

/* ---------- lexicon POS lookup for the browse list ---------- */
function posArFor(word) {
  const toks = analyzeSentence(word);
  return toks.length ? (toks[0].posAr || null) : null;
}

/* ---------- stats store ---------- */

export async function loadVocabStats() {
  const v = await kvGet(K_VOCAB, {});
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

export async function saveVocabStats(stats) {
  return kvSet(K_VOCAB, stats);
}

/** Record one practice answer. wordKey is the lowercase word. */
export async function recordVocabAnswer(word, meaningAr, correct, lessonId) {
  const stats = await loadVocabStats();
  const key = String(word || '').toLowerCase();
  if (!key) return null;
  const prev = stats[key] || { word, meaningAr: meaningAr || '', lessonId: lessonId || null, correct: 0, wrong: 0, lastAt: 0, lastCorrect: false };
  if (correct) prev.correct += 1; else prev.wrong += 1;
  prev.lastAt = Date.now();
  prev.lastCorrect = Boolean(correct);
  if (meaningAr) prev.meaningAr = meaningAr;
  if (lessonId) prev.lessonId = lessonId;
  stats[key] = prev;
  await saveVocabStats(stats);
  return prev;
}

/** Documented mastery rule. */
export function isMastered(entry) {
  return Boolean(entry && entry.lastCorrect && entry.correct >= 2);
}

/** Harvest vocabulary from lessons the user has really practiced. */
export async function collectEncounteredVocabulary() {
  const states = await getAllLessonStates();
  const manifest = getManifest();
  const out = [];
  const seen = new Set();
  for (const entry of manifest) {
    const st = states[entry.id];
    if (!st || !Object.keys(st.attempted || {}).length) continue; // only really-practiced lessons
    let lesson = null;
    try { lesson = await loadLesson(entry.id); } catch { continue; }
    for (const v of lesson.vocabulary || []) {
      if (!v || !v.word) continue;
      const key = v.word.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ word: v.word, meaningAr: v.meaningAr || '', example: v.example || '', lessonId: entry.id, lessonTitle: entry.title });
    }
  }
  return out;
}

/* ---------- view ---------- */

export async function renderVocabularyView(view) {
  stopSpeaking();
  const L = getSettings().lang;
  view.replaceChildren(el('div', { class: 'state-box' }, [el('div', { class: 'spinner', role: 'status' })]));

  const [stats, vocab] = await Promise.all([loadVocabStats(), collectEncounteredVocabulary()]);

  const head = el('div', { class: 'page-head' }, [
    el('h2', { text: t(L, 'vocabTitle') }),
    el('p', { text: t(L, 'vocabIntro') }),
  ]);

  if (!vocab.length) {
    view.replaceChildren(head, el('div', { class: 'state-box' }, [
      el('div', { class: 'big' }, [icon('book')]),
      el('h3', { text: t(L, 'vocabEmpty') }),
      el('p', { class: 'muted', text: t(L, 'vocabEmptySub') }),
      el('a', { class: 'btn btn-primary mt', href: '#/sections', text: t(L, 'startLearning') }),
    ]));
    return;
  }

  const masteredCount = vocab.filter((v) => isMastered(stats[v.word.toLowerCase()])).length;

  // ---- summary chips ----
  const summary = el('div', { class: 'stat-grid mb' }, [
    el('div', { class: 'stat-card' }, [el('div', { class: 'stat-icon' }, [icon('book')]), el('div', { class: 'stat-value', text: String(vocab.length) }), el('div', { class: 'stat-label', text: t(L, 'vocabEncountered') })]),
    el('div', { class: 'stat-card' }, [el('div', { class: 'stat-icon' }, [icon('check')]), el('div', { class: 'stat-value', text: String(masteredCount) }), el('div', { class: 'stat-label', text: t(L, 'vocabMastered') })]),
  ]);

  // ---- practice area (built per round) ----
  const practiceBox = el('div', { class: 'card' });
  const listBox = el('div', { class: 'card' });

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startPracticeRound() {
    stopSpeaking();
    // prefer least-practiced, unmastered words first — real stats only
    const scored = vocab.map((v) => {
      const st = stats[v.word.toLowerCase()];
      const score = (st ? (isMastered(st) ? 2 : 1) : 0);
      return { v, score };
    });
    const pool = scored.filter((s) => s.score < 2);
    const chosen = shuffle(pool.length ? pool : scored).slice(0, PRACTICE_BATCH).map((s) => s.v);

    let roundIdx = 0;
    let roundCorrect = 0;
    const roundTotal = chosen.length;

    function renderQuestion() {
      practiceBox.replaceChildren();
      if (roundIdx >= roundTotal) {
        practiceBox.append(
          el('div', { class: 'row-between' }, [
            el('h3', { class: 'card-title' }, [iconLabel('check', t(L, 'vocabRoundDone'))]),
            el('button', { class: 'btn btn-sm', onclick: startPracticeRound }, [iconLabel('review', t(L, 'vocabAgain'))]),
          ]),
          el('p', { class: 'muted', text: t(L, 'vocabRoundResult', { c: String(roundCorrect), n: String(roundTotal) }) }),
        );
        return;
      }
      const current = chosen[roundIdx];
      const distractors = shuffle(vocab.filter((v) => v.word !== current.word && v.meaningAr))
        .slice(0, 3).map((v) => v.meaningAr);
      const options = shuffle([current.meaningAr, ...distractors].filter(Boolean));

      practiceBox.append(
        el('div', { class: 'row-between' }, [
          el('h3', { class: 'card-title' }, [iconLabel('pen', t(L, 'vocabPractice'))]),
          el('span', { class: 'chip', text: `${roundIdx + 1}/${roundTotal}` }),
        ]),
        el('p', { class: 'muted small', text: t(L, 'vocabPracticeHint') }),
        el('div', { class: 'vocab-practice-word' }, [
          el('span', { class: 'vp-word', dir: 'ltr', text: current.word }),
          el('button', {
            class: 'btn btn-round', 'aria-label': t(L, 'play'), onclick: () => speak(current.word, { rate: getSettings().rate }),
          }, [icon('audio')]),
        ]),
      );
      const optsBox = el('div', { class: 'mc-options', role: 'listbox' });
      let answered = false;
      options.forEach((meaning) => {
        const b = el('button', { class: 'mc-option', text: meaning, role: 'option', dir: 'rtl' });
        b.addEventListener('click', async () => {
          if (answered) return;
          answered = true;
          const correct = meaning === current.meaningAr;
          b.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            [...optsBox.children].forEach((n) => { if (n.textContent === current.meaningAr) n.classList.add('correct'); });
          }
          await recordVocabAnswer(current.word, current.meaningAr, correct, current.lessonId);
          // refresh local stats so the browse list stays honest
          const freshStats = await loadVocabStats();
          stats[current.word.toLowerCase()] = freshStats[current.word.toLowerCase()];
          if (correct) roundCorrect += 1;
          roundIdx += 1;
          setTimeout(renderQuestion, 750);
          renderBrowseList();
        });
        optsBox.append(b);
      });
      practiceBox.append(optsBox);
    }

    renderQuestion();
  }

  function renderBrowseList() {
    listBox.replaceChildren(el('h3', { class: 'card-title', text: t(L, 'vocabListTitle') }));
    const list = el('div', { class: 'lesson-list' });
    for (const v of vocab) {
      const st = stats[v.word.toLowerCase()];
      const mastered = isMastered(st);
      const pa = posArFor(v.word);
      const item = el('div', { class: 'lesson-item vocab-item' }, [
        el('div', { class: 'lesson-titles' }, [
          el('div', { class: 't', dir: 'ltr', text: v.word }),
          el('div', { class: 's', dir: 'rtl', text: `${pa ? pa + ' · ' : ''}${v.meaningAr || '—'}` }),
        ]),
        el('div', { class: 'vocab-meta' }, [
          el('span', { class: `chip ${mastered ? 'chip-done' : ''}`, text: mastered ? t(L, 'vocabMasteredTag') : t(L, 'vocabCounts', { c: String(st ? st.correct : 0), w: String(st ? st.wrong : 0) }) }),
          el('button', {
            class: 'btn btn-round', 'aria-label': t(L, 'play'), title: t(L, 'play'),
            onclick: () => speak(v.word, { rate: getSettings().rate }),
          }, [icon('audio')]),
        ]),
      ]);
      list.append(item);
    }
    listBox.append(list);
    listBox.append(el('p', { class: 'muted small', text: t(L, 'vocabMasteryNote') }));
  }

  startPracticeRound();
  renderBrowseList();

  view.replaceChildren(head, summary, practiceBox, listBox);
}
