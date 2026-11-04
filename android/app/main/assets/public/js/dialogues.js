/* ============================================================
   LingoStep — dialogues.js
   Book dialogue practice: listen & type, split-screen.

   Responsibilities (architecture spec):
   - Practice screen only: state, interaction, progression.
   - Audio comes from speech.js (speak / speakWordByWord /
     stopSpeaking) — no other audio source.
   - Answer evaluation comes from grading.js (checkAnswer /
     wordDiff) — no second grading engine.
   - All interface text comes from i18n.js (en + ar).
   - Attempts are persisted through progress.js recordAttempt
     (the app's existing storage backend — no new schema).

   Scoring rules (explicit, stable):
   - FIRST-TRY CORRECT: accepted by grading.js on the first
     submission of the sentence, with no answer reveal.
   - EVENTUALLY CORRECT: accepted at any point (first try,
     after retries, or after using "Show answer").
   - SKIPPED: marked and counted separately — never counted
     as correct.
   - Accuracy = eventually-correct / total sentences.
   ============================================================ */

import { el } from './utils.js';
import { icon } from './icons.js';
import { speak, stopSpeaking, speakWordByWord, isSupported as speechSupported } from './speech.js';
import { checkAnswer, wordDiff } from './grading.js';
import { getSettings } from './settings.js';
import { t } from './i18n.js';
import { createTouchTypingField } from './touch-typing.js';
import { recordAttempt } from './progress.js';

/** Alias filenames for the five book dialogues that ship under a suffixed file. */
export const ALIASES = { 23: '23a', 34: '34b', 35: '35a', 36: '36a', 39: '39a' };

/** Resolve a dialogue id to its module file name (Node-testable). */
export function dialogueFile(id) {
  const alias = ALIASES[id];
  return 'dialogue-' + (alias || String(id).padStart(2, '0')) + '.js';
}

/** Dynamically import a dialogue module and return its default export. */
export async function loadDialogue(id) {
  const mod = await import('../dialogues/' + dialogueFile(id));
  return mod.default;
}

/* ---------- small helpers ---------- */

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/** Deterministic hue from a speaker name so avatars stay stable per speaker. */
function nameHue(name) {
  let h = 0;
  const s = String(name || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export async function renderDialoguePractice(view, params = [], lang = 'en') {
  const L = lang === 'ar' ? 'ar' : 'en';
  const T = (key, vars) => t(L, key, vars);
  const ar = L === 'ar';
  const id = Number(params[0]);
  const settings = getSettings();
  const speechOK = speechSupported();

  let dialogue;
  try {
    if (!Number.isInteger(id) || id < 1 || id > 44) throw new Error('Invalid dialogue');
    dialogue = await loadDialogue(id);
    if (!dialogue || !Array.isArray(dialogue.groups)) throw new Error('Malformed dialogue');
  } catch {
    view.replaceChildren(
      el('div', { class: 'card dlg-error', role: 'alert', text: T('dlgLoadError') }),
      el('a', { class: 'btn btn-ghost', href: '#/dialogues', text: T('dlgBackToList') })
    );
    return;
  }

  /* ---------- exercise data (original text + translations preserved) ---------- */

  const exercises = (dialogue.groups || []).flatMap((group) =>
    (group.lines || []).map(([speaker, en, translation]) => ({
      speaker: speaker || '',
      en: en || '',
      ar: translation || '',
      label: group.label || '',
    }))
  ).filter((x) => x.en);

  if (!exercises.length) {
    view.replaceChildren(
      el('div', { class: 'card dlg-error', role: 'alert', text: T('dlgLoadError') }),
      el('a', { class: 'btn btn-ghost', href: '#/dialogues', text: T('dlgBackToList') })
    );
    return;
  }
  const total = exercises.length;

  /* ---------- session state ---------- */

  let index = 0;
  let firstTryCorrect = 0;
  let eventuallyCorrect = 0;
  let skipped = 0;
  let attempts = 0;              // real submissions (empty input does not count)
  let locked = false;            // success shown, waiting to advance
  let finished = false;          // summary already rendered (guards duplicates)
  let revealedThis = false;      // learner revealed the current answer
  let wrongThis = false;         // current sentence has a wrong attempt
  let wordQueue = null;          // { stop() } active word-by-word playback
  const acceptedAnswers = new Map();
  const historyRows = new Map();
  const skippedSentences = new Set();
  let sentenceStartedAt = Date.now();
  const resolved = new Set();    // sentence indexes already counted (no double stats)

  /* ---------- top bar: title + progress + score chips ---------- */

  const counter = el('span', { class: 'chip dlg-counter', text: T('dlgSentenceOf', { i: 1, n: total }) });
  const typeChip = el('span', { class: 'chip chip-level', text: T('dlgListenType') });
  const progressBar = el('div', { class: 'progress dlg-progress', role: 'progressbar', 'aria-label': T('dlgProgressAria'), 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': 0 }, [
    el('span', { style: { width: '0%' } }),
  ]);
  const scoreCorrect = el('span', { class: 'chip dlg-chip-ok', text: T('dlgScoreCorrect') + ': 0' });
  const scoreSkipped = el('span', { class: 'chip dlg-chip-skip', text: T('dlgScoreSkipped') + ': 0' });
  const scoreAccuracy = el('span', { class: 'chip dlg-chip-acc', text: T('dlgScoreAccuracy') + ': 0%' });

  /* ---------- exercise panel ---------- */

  const hint = el('p', { class: 'dialogue-practice-hint', dir: 'rtl', lang: 'ar' });
  // v8: keyboard-free dictation field (same letter slots, touch keyboard,
  // no <input> element → the system keyboard can never appear).
  let typedField = createTouchTypingField({
    expected: exercises[0].en,
    ariaLabel: T('dlgTypeAria'),
    labels: { backspace: T('kbBackspace'), space: T('kbSpace') },
    onEnter: () => checkAnswerNow(),
    onWrong: () => {
      feedback.textContent = ar ? 'حرف غير صحيح، حاول مرة أخرى' : 'Incorrect letter — try again';
      feedback.classList.add('is-bad');
    },
  });
  const feedback = el('p', { class: 'dialogue-practice-feedback', id: 'dlg-feedback', role: 'status', 'aria-live': 'polite' });
  const diffRow = el('div', { class: 'dlg-word-diff', hidden: true, 'aria-label': T('dlgMissingWords') });
  const check = el('button', { class: 'btn btn-primary dlg-check', type: 'button', text: T('checkAnswer') });
  const skip = el('button', { class: 'btn btn-ghost', type: 'button', text: T('skip') });
  const reveal = el('button', { class: 'btn btn-ghost dlg-reveal', type: 'button', text: T('dlgShowAnswer'), hidden: true });

  const play = el('button', {
    class: 'btn btn-primary dlg-audio-main', type: 'button',
    'aria-label': T('play'), title: T('play'),
  }, [
    icon('play', 'dlg-audio-icon'),
    el('span', { class: 'dlg-audio-label', text: T('play') }),
  ]);
  const slow = el('button', {
    class: 'btn btn-ghost dlg-audio-slow', type: 'button',
    'aria-label': T('playSlow'), title: T('playSlow'),
  }, [
    icon('turtle', 'dlg-audio-icon'),
    el('span', { class: 'dlg-audio-label', text: T('playSlow') }),
  ]);
  const hintBtn = el('button', {
    class: 'btn btn-ghost dlg-hint-btn', type: 'button',
    text: T('dlgShowHint'), hidden: settings.showArabic !== false,
  });

  if (!speechOK) {
    feedback.textContent = T('dlgSpeechUnsupported');
    play.disabled = true;
    slow.disabled = true;
  }

  const exercisePanel = el('section', { class: 'card exercise-panel', 'aria-label': T('dlgPractice') }, [
    el('div', { class: 'dialogue-practice-top' }, [counter, typeChip]),
    progressBar,
    el('h2', { class: 'dialogue-practice-title', text: T('typeWhatYouHear') }),
    el('div', { class: 'dialogue-practice-audio' }, [play, slow, hintBtn]),
    hint,
    el('div', { class: 'dialogue-practice-typing' }, [typedField.root]),
    diffRow,
    feedback,
    el('div', { class: 'dialogue-practice-actions' }, [check, skip]),
  ]);

  /* ---------- conversation panel ---------- */

  const history = el('div', { class: 'chat-history', role: 'log', 'aria-live': 'polite' });
  const chatTitle = el('p', { class: 'chat-subtitle', dir: 'ltr', text: dialogue.title || '' });
  const chatPanel = el('section', { class: 'card chat-panel', 'aria-label': T('dlgConversation') }, [
    el('div', { class: 'chat-header' }, [
      el('h3', { text: T('dlgConversation') }),
      chatTitle,
    ]),
    history,
  ]);

  /* ---------- page shell ---------- */

  const title = el('h1', { text: T('dlgPractice') });
  const subtitle = el('p', { class: 'muted', text: ar ? (dialogue.titleAr || dialogue.title) : (dialogue.title || '') });
  const backToList = el('a', { class: 'btn btn-ghost btn-sm', href: '#/dialogues', text: T('dlgBackToList') });
  const backToDialogue = el('a', { class: 'btn btn-ghost btn-sm', href: '#/dialogues/' + id, text: T('dlgBackToDialogue') });
  const scoreRow = el('div', { class: 'dlg-score-row', role: 'group', 'aria-label': T('dlgPractice') }, [scoreCorrect, scoreSkipped, scoreAccuracy]);
  const layout = el('div', { class: 'dialogues-container' }, [exercisePanel, chatPanel]);
  view.replaceChildren(
    el('div', { class: 'page-head dlg-page-head' }, [
      el('div', { class: 'dlg-page-head-text' }, [title, subtitle]),
      el('div', { class: 'dlg-page-head-actions' }, [backToDialogue, backToList]),
    ]),
    scoreRow,
    layout
  );

  /* ---------- keyboard-free touch input (v8) ---------- */

  const typingHost = exercisePanel.querySelector('.dialogue-practice-typing');

  /* ---------- chat history helpers ---------- */

  function scrollHistory() {
    history.scrollTop = history.scrollHeight;
  }

  function addSpeakerMessage(speaker, text, groupLabel = '') {
    if (groupLabel) {
      history.appendChild(el('div', { class: 'chat-divider', text: groupLabel }));
    }
    const hue = nameHue(speaker);
    const row = el('div', { class: 'chat-message message-ai' }, [
      el('span', {
        class: 'chat-avatar',
        'aria-hidden': 'true',
        style: { background: `hsl(${hue} 55% 88%)`, color: `hsl(${hue} 45% 30%)` },
        text: initials(speaker),
      }),
      el('div', { class: 'chat-msg-body' }, [
        el('span', { class: 'chat-speaker', dir: 'ltr', text: speaker || '—' }),
        el('div', { class: 'bubble bubble-ai', dir: 'ltr', lang: 'en', text }),
      ]),
    ]);
    history.appendChild(row);
    scrollHistory();
  }

  function addLearnerMessage(text, { skipped: wasSkipped = false } = {}) {
    const body = el('div', { class: 'chat-msg-body' }, [
      el('span', { class: 'chat-speaker', text: T('dlgYou') }),
    ]);
    if (wasSkipped) {
      body.append(
        el('div', { class: 'bubble bubble-user is-skipped', dir: 'ltr', lang: 'en' }, [
          el('span', { class: 'dlg-skipped-tag', text: T('dlgSkippedTag') }),
          el('span', { class: 'dlg-skipped-text', dir: 'ltr', text }),
        ])
      );
    } else {
      body.append(el('div', { class: 'bubble bubble-user', dir: 'ltr', lang: 'en', text }));
    }
    const row = el('div', { class: 'chat-message message-user' + (wasSkipped ? ' skipped' : '') }, [body]);
    history.appendChild(row);
    scrollHistory();
  }

  function addSystemMessage(text) {
    history.appendChild(el('div', { class: 'chat-system', role: 'status', text }));
    scrollHistory();
  }

  // WhatsApp-like history: show Arabic translations first, then reveal English after success.
  function buildPracticeHistory() {
    history.replaceChildren();
    exercises.forEach((item, sentenceIndex) => {
      const prev = sentenceIndex > 0 ? exercises[sentenceIndex - 1] : null;
      const groupLabel = item.label && (!prev || prev.label !== item.label) ? item.label : '';
      if (groupLabel) history.appendChild(el('div', { class: 'chat-divider', text: groupLabel }));
      const hue = nameHue(item.speaker);
      const english = el('div', { class: 'bubble bubble-ai chat-english-reveal', dir: 'ltr', lang: 'en', text: '', hidden: true });
      const arabic = el('div', { class: 'bubble bubble-ai chat-arabic-text', dir: 'rtl', lang: 'ar', text: item.ar || 'استمع للجملة وحاول كتابتها بالإنجليزية' });
      const row = el('div', { class: 'chat-message message-ai whatsapp-message' }, [
        el('span', { class: 'chat-avatar', 'aria-hidden': 'true', style: { background: `hsl(${hue} 55% 88%)`, color: `hsl(${hue} 45% 30%)` }, text: initials(item.speaker) }),
        el('div', { class: 'chat-msg-body' }, [
          el('span', { class: 'chat-speaker', dir: 'ltr', text: item.speaker || '—' }),
          arabic, english, el('span', { class: 'chat-time', text: '' }),
        ]),
      ]);
      history.appendChild(row);
      historyRows.set(sentenceIndex, { row, english });
    });
    chatPanel.hidden = false;
  }

  function revealHistorySentence(sentenceIndex, typedAnswer) {
    const row = historyRows.get(sentenceIndex);
    if (!row) return;
    row.english.textContent = typedAnswer || exercises[sentenceIndex].en;
    row.english.hidden = false;
    row.row.classList.add('has-english');
    scrollHistory();
  }

  /* ---------- audio ---------- */

  function setPlaying(isPlaying, which) {
    play.classList.toggle('is-playing', isPlaying && which !== 'slow');
    slow.classList.toggle('is-playing', isPlaying && which === 'slow');
    play.setAttribute('aria-pressed', String(isPlaying && which !== 'slow'));
    slow.setAttribute('aria-pressed', String(isPlaying && which === 'slow'));
  }

  function stopWordQueue() {
    if (wordQueue) { try { wordQueue.stop(); } catch { /* ignore */ } wordQueue = null; }
  }

  function playSentence(isSlow) {
    const item = exercises[index];
    if (!item) return;
    if (!speechOK) {
      feedback.textContent = T('dlgSpeechUnsupported');
      return;
    }
    stopWordQueue();
    stopSpeaking();
    const base = settings.rate || 0.9;
    if (isSlow && settings.slowWordByWord !== false) {
      setPlaying(true, 'slow');
      wordQueue = speakWordByWord(item.en, {
        rate: Math.max(0.55, base * 0.8),
        gapMs: 320,
        voiceURI: settings.voiceURI || '',
        onend: () => setPlaying(false, 'slow'),
      });
    } else {
      setPlaying(true, isSlow ? 'slow' : 'normal');
      speak(item.en, {
        rate: isSlow ? Math.max(0.55, base * 0.65) : base,
        voiceURI: settings.voiceURI || '',
        onend: () => setPlaying(false, isSlow ? 'slow' : 'normal'),
        onerror: () => setPlaying(false, isSlow ? 'slow' : 'normal'),
      });
    }
  }

  /* ---------- stats / persistence ---------- */

  function updateStats() {
    scoreCorrect.textContent = T('dlgScoreCorrect') + ': ' + eventuallyCorrect;
    scoreSkipped.textContent = T('dlgScoreSkipped') + ': ' + skipped;
    const acc = total ? Math.round((eventuallyCorrect / total) * 100) : 0;
    scoreAccuracy.textContent = T('dlgScoreAccuracy') + ': ' + acc + '%';
  }

  function updateProgress() {
    const done = resolved.size;
    const pctNow = Math.round((done / total) * 100);
    progressBar.setAttribute('aria-valuenow', String(pctNow));
    progressBar.firstElementChild.style.width = pctNow + '%';
  }

  async function persist(status, sentenceIdx) {
    try {
      await recordAttempt({
        lessonId: 'dialogue-' + id,
        exerciseId: 'dialogue-' + id + '-s' + (sentenceIdx + 1),
        type: 'dictation',
        status,
        timeMs: Math.max(0, Date.now() - sentenceStartedAt),
      });
    } catch { /* progress storage is best-effort; practice must keep working */ }
  }

  /* ---------- feedback rendering ---------- */

  function clearFeedback() {
    feedback.textContent = '';
    feedback.classList.remove('is-ok', 'is-bad');
    typedField.surface.classList.remove('correct-border', 'wrong-border');
    diffRow.replaceChildren();
    diffRow.hidden = true;
  }

  function showWordDiff(typed, expected) {
    const d = wordDiff(typed, expected);
    const chips = [];
    for (const tok of d.typed) {
      chips.push(el('span', {
        class: 'dlg-word ' + (tok.type === 'match' ? 'dlg-word-ok' : tok.type === 'wrong' ? 'dlg-word-bad' : 'dlg-word-extra'),
        dir: 'ltr',
        text: tok.text,
      }));
    }
    if (d.missing.length) {
      chips.push(el('span', { class: 'dlg-word-gap', text: '·' }));
      for (const m of d.missing) {
        chips.push(el('span', { class: 'dlg-word dlg-word-missing', dir: 'ltr', text: m.text }));
      }
    }
    diffRow.replaceChildren(...chips);
    diffRow.hidden = chips.length === 0;
  }

  /* ---------- core flow ---------- */

  function renderSentence() {
    locked = false;
    revealedThis = false;
    wrongThis = false;
    reveal.hidden = true;
    clearFeedback();
    check.disabled = false;
    skip.disabled = false;

    if (index >= total) { finish(); return; }
    const item = exercises[index];
    try { typedField.destroy(); } catch { /* ignore */ }
    typedField = createTouchTypingField({
      expected: item.en,
      ariaLabel: T('dlgTypeAria'),
      labels: { backspace: T('kbBackspace'), space: T('kbSpace') },
      onEnter: () => checkAnswerNow(),
      onWrong: () => {
        feedback.textContent = ar ? 'حرف غير صحيح، حاول مرة أخرى' : 'Incorrect letter — try again';
        feedback.classList.add('is-bad');
      },
    });
    typingHost.replaceChildren(typedField.root);
    const prev = index > 0 ? exercises[index - 1] : null;
    const groupLabel = item.label && (!prev || prev.label !== item.label) ? item.label : '';
    sentenceStartedAt = Date.now();

    counter.textContent = T('dlgSentenceOf', { i: index + 1, n: total });
    // Dictation mode: no translation or text hint before the learner answers.
    hint.textContent = '';
    hint.hidden = true;
    hintBtn.hidden = true;
    updateProgress();

    playSentence(false);
  }

  function checkAnswerNow() {
    if (locked || finished || index >= total) return;
    const answer = typedField.getValue().trim();
    if (!answer) {
      feedback.textContent = T('emptyAnswer');
      feedback.classList.add('is-bad');
      return;
    }
    const item = exercises[index];
    attempts += 1;
    const result = checkAnswer(answer, [item.en], { strict: settings.strictGrading !== false });

    if (result.status === 'correct' || result.status === 'minor') {
      locked = true;
      check.disabled = true;
      skip.disabled = true;
      reveal.hidden = true;
      if (!resolved.has(index)) {
        resolved.add(index);
        if (!wrongThis && !revealedThis) firstTryCorrect += 1;
        eventuallyCorrect += 1;
        updateStats();
        updateProgress();
        persist(result.status === 'minor' ? 'minor' : 'correct', index);
      }
      acceptedAnswers.set(index, answer);
      revealHistorySentence(index, answer);
      // Reveal the English line in the visible conversation after a correct answer.
      typedField.surface.classList.add('correct-border');
      feedback.textContent = T('correct');
      feedback.classList.add('is-ok');
      feedback.classList.remove('is-bad');
      index += 1;
      window.setTimeout(() => { if (!finished) renderSentence(); }, 700);
    } else {
      wrongThis = true;
      typedField.surface.classList.add('wrong-border');
      typedField.shake();
      feedback.textContent = T('dlgAlmost');
      feedback.classList.add('is-bad');
      feedback.classList.remove('is-ok');
      // Do not expose the expected sentence or missing words after a wrong attempt.
      diffRow.replaceChildren();
      diffRow.hidden = true;
      reveal.hidden = true;
      persist('incorrect', index);
    }
  }

  function revealAnswer() {
    if (locked || finished || index >= total) return;
    revealedThis = true;
    reveal.hidden = true;
    const item = exercises[index];
    feedback.textContent = T('dlgRevealNote');
    feedback.classList.remove('is-bad');
    const answerRow = el('span', { class: 'dlg-reveal-answer', dir: 'ltr', lang: 'en', text: item.en });
    diffRow.replaceChildren(answerRow);
    diffRow.hidden = false;
  }

  function skipSentence() {
    if (locked || finished || index >= total) return;
    const item = exercises[index];
    stopWordQueue();
    setPlaying(false, 'slow');
    if (!resolved.has(index)) {
      resolved.add(index);
      skipped += 1;
      updateStats();
      updateProgress();
      persist('skipped', index);
    }
    skippedSentences.add(index);
    index += 1;
    renderSentence();
  }

  function finish() {
    if (finished) return;
    finished = true;
    stopWordQueue();
    stopSpeaking();
    setPlaying(false, 'normal');
    setPlaying(false, 'slow');
    check.disabled = true;
    skip.disabled = true;
    reveal.hidden = true;
    try { typedField.destroy(); } catch { /* ignore */ }
    typingHost.replaceChildren();
    hint.hidden = true;
    counter.textContent = T('dlgLessonComplete');
    progressBar.setAttribute('aria-valuenow', '100');
    progressBar.firstElementChild.style.width = '100%';

    // Keep the conversation visible; reveal remaining English only at completion.
    exercises.forEach((item, sentenceIndex) => {
      if (!acceptedAnswers.has(sentenceIndex) && !skippedSentences.has(sentenceIndex)) {
        revealHistorySentence(sentenceIndex, item.en);
      }
    });

    const acc = Math.round((eventuallyCorrect / total) * 100);
    const retry = el('button', {
      class: 'btn btn-primary', type: 'button', text: T('dlgRetryDialogue'),
      onclick: () => renderDialoguePractice(view, params, lang),
    });
    const summary = el('div', { class: 'dlg-summary', role: 'status' }, [
      el('h3', { class: 'dlg-summary-title', text: T('dlgSummaryTitle') }),
      el('p', { class: 'dlg-summary-acc', text: T('dlgScoreAccuracy') + ': ' + acc + '%' }),
      el('ul', { class: 'dlg-summary-list' }, [
        el('li', {}, [T('dlgFirstTry') + ': ' + firstTryCorrect]),
        el('li', {}, [T('dlgEventually') + ': ' + eventuallyCorrect]),
        el('li', {}, [T('dlgScoreSkipped') + ': ' + skipped]),
        el('li', {}, [T('dlgAttempts') + ': ' + attempts]),
      ]),
      el('p', { class: 'muted small', text: T('dlgSentencesCount', { n: total }) }),
    ]);
    exercisePanel.replaceChildren(
      el('div', { class: 'dialogue-practice-top' }, [counter, typeChip]),
      progressBar,
      summary,
      el('div', { class: 'dlg-summary-actions' }, [
        retry,
        el('a', { class: 'btn btn-ghost', href: '#/dialogues/' + id, text: T('dlgBackToDialogue') }),
        el('a', { class: 'btn btn-ghost', href: '#/dialogues', text: T('dlgBackToList') }),
      ])
    );
    addSystemMessage(T('dlgCompletedMsg'));
  }

  /* ---------- events (single registration per render) ---------- */

  play.addEventListener('click', () => playSentence(false));
  slow.addEventListener('click', () => playSentence(true));
  check.addEventListener('click', checkAnswerNow);
  skip.addEventListener('click', skipSentence);
  reveal.addEventListener('click', revealAnswer);
  hintBtn.addEventListener('click', () => { hint.hidden = false; });
  updateStats();
  buildPracticeHistory();
  renderSentence();
}
