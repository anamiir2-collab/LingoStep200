/* ============================================================
   LingoStep — lesson-engine.js  (v9 smart exercise engine)
   Renders the lesson player: exercises (listen-and-type,
   fill-blank, word-order, multiple-choice), audio controls,
   feedback, progress, resume, completion summary.
   Also powers revision sessions (opts.reviewMode).

   v9 guarantees (spec):
   - NO internal keyboard anywhere: answers are touch-only
     (letter tiles, word chips, option cards).
   - SMART HINTS: the Hint button reveals only the next letter of
     the current incomplete word — never the Arabic translation,
     never the complete word, never the full answer. Repeated
     presses stop at half the word. MC gets a controlled clue
     (exclude one wrong option, then the answer's first letter).
   - WORD LOCKING: correctly completed words turn green and are
     locked for the whole attempt (cannot be deleted, edited,
     replaced or moved). Incorrect words never lock.
   - NO CLEAR-ALL: there is no way to erase the whole answer.
   - RESTART requires explicit confirmation (custom dialog).
   - SKIP is mandatory-answer: the skipped question earns no
     points and a DIFFERENT question from the same lesson must be
     answered before progression. With no alternative left, the
     question must be completed.
   ============================================================ */

import { el, toast } from './utils.js';
import { icon, iconLabel } from './icons.js';
import { t } from './i18n.js';
import { getSettings } from './settings.js';
import { checkAnswer, wordDiff } from './grading.js';
import { speak, stopSpeaking, speakWordByWord, pausePlayback, resumePlayback, getAudioState, isSupported as speechSupported } from './speech.js';
import { recordAttempt, updateLessonState, saveResume, getLessonState } from './progress.js';
import { upsertOnWrong, gradeReview } from './review.js';
import { navigate } from './router.js';
import { getManifestEntry, nextLessonInSection, loadLesson } from './lesson-loader.js';
import { createTouchTypingField, createLetterTiles } from './touch-typing.js';
import { createWordOrderSession, pickAlternativeQuestion } from './exercise-state.js';
import { excludedOption } from './hints.js';
import { awardExercise, awardLessonComplete, markFirstAttemptFailed, getTotalXp } from './xp.js';
import { messageForCorrect, messageForWrong, messageForXp, messageForLessonComplete } from './motivation.js';
import { analyzeSentence, renderWordCards } from './word-cards.js';
import { saveSettings } from './settings.js';
import { playCorrectFanfare, playWrongBuzz, playFinishFanfare, confettiBurst } from './feedback-fx.js';

const rank = { correct: 3, minor: 2, incorrect: 1, skipped: 0 };
const SPEEDS = [
  { key: 'spdSlow', rate: 0.65 },
  { key: 'spdNormal', rate: 1 },
  { key: 'spdFast', rate: 1.3 },
];

/* ---------- reusable confirmation dialog (no window.confirm) ---------- */

/**
 * Accessible in-app confirmation dialog. Resolves true only after
 * an explicit confirm tap; Cancel/backdrop/Escape resolve false.
 */
export function confirmDialog({ title, body, confirmText, cancelText, danger = false, lang = 'en' }) {
  return new Promise((resolve) => {
    const backdrop = el('div', { class: 'duo-backdrop ls-dialog-backdrop' });
    const box = el('div', { class: 'ls-dialog', role: 'alertdialog', 'aria-modal': 'true', 'aria-label': title }, [
      el('div', { class: 'ls-dialog-icon' }, [icon(danger ? 'alert' : 'helpCircle')]),
      el('h3', { class: 'ls-dialog-title', text: title }),
      body ? el('p', { class: 'ls-dialog-body', text: body }) : null,
      el('div', { class: 'ls-dialog-actions' }, [
        el('button', {
          class: 'btn btn-ghost', text: cancelText,
          onclick: () => done(false),
        }),
        el('button', {
          class: `btn ${danger ? 'btn-danger' : 'btn-primary'}`, text: confirmText,
          onclick: () => done(true),
        }),
      ].filter(Boolean)),
    ].filter(Boolean));
    function done(v) {
      document.removeEventListener('keydown', onKey);
      backdrop.remove();
      wrap.remove();
      resolve(v);
    }
    function onKey(e) {
      if (e.key === 'Escape') done(false);
      if (e.key === 'Enter') { e.preventDefault(); done(true); }
    }
    const wrap = el('div', { class: 'ls-dialog-wrap' }, [box]);
    backdrop.addEventListener('click', () => done(false));
    document.addEventListener('keydown', onKey);
    document.body.append(backdrop, wrap);
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      wrap.classList.add('is-open');
    });
    const btns = wrap.querySelectorAll('button');
    setTimeout(() => { try { btns[btns.length - 1].focus({ preventScroll: true }); } catch { /* ok */ } }, 60);
  });
}

/**
 * Render a lesson player into `container`.
 * opts.reviewMode: { items: [{exerciseId, lessonId, tags}] } → revision session.
 */
export async function renderLessonPlayer(container, lessonId, opts = {}) {
  const settings = getSettings();
  const L = settings.lang;
  const reviewMode = Boolean(opts.reviewMode);

  stopSpeaking();

  // ---------- resolve exercises ----------
  let exercises = [];
  let lesson = null;
  try {
    if (reviewMode) {
      const byLesson = new Map();
      for (const item of opts.reviewMode.items) {
        if (!byLesson.has(item.lessonId)) byLesson.set(item.lessonId, await loadLesson(item.lessonId));
      }
      exercises = opts.reviewMode.items.map((item) => {
        const les = byLesson.get(item.lessonId);
        const ex = les.exercises.find((x) => x.id === item.exerciseId);
        return ex ? { ...ex, lessonId: item.lessonId } : null;
      }).filter(Boolean);
    } else {
      lesson = await loadLesson(lessonId);
      exercises = lesson.exercises.map((ex) => ({ ...ex, lessonId }));
    }
  } catch (err) {
    renderErrorState(container, L, err);
    return;
  }

  if (!exercises.length) {
    container.replaceChildren(el('div', { class: 'state-box' }, [
      el('div', { class: 'big' }, [icon('mail')]),
      el('h3', { text: reviewMode ? t(L, 'reviewEmpty') : t(L, 'lessonError') }),
    ]));
    return;
  }

  // ---------- state ----------
  let idx = 0;
  let checked = false;        // current exercise already checked?
  let lastResult = null;      // {status, ...}
  let exStart = Date.now();
  let sessionStart = Date.now();
  let results = new Array(exercises.length).fill(null);
  let retryMode = false;      // session re-runs previously wrong exercises
  const originalExercises = exercises; // for retry index mapping
  let originalCount = exercises.length;
  let sessionXp = 0;          // XP earned in this session (real deltas)
  let lastMotivation = '';    // avoid repeating the same message
  const firstAttemptMap = new Map(); // exerciseId -> false once answered wrong/skipped
  const hintUsedSet = new Set();     // exerciseIds where a hint was opened
  const altUsedIds = new Set();      // exercise ids already used as alternatives
  let fieldHandle = null;            // { destroy } for the answer surface
  let exerciseTimerId = null;
  let swwUi = null;                  // active word-by-word playback handle

  // resume (normal lessons only)
  if (!reviewMode) {
    const st = await getLessonState(lessonId);
    if (st && typeof st.lastIndex === 'number' && st.lastIndex > 0 && st.lastIndex < exercises.length) {
      const attempted = Object.keys(st.attempted || {}).length;
      if (attempted < exercises.length) {
        idx = st.lastIndex;
        toast(t(L, 'resume'), 1800);
      }
    }
  }

  const entry = getManifestEntry(lessonId);

  // ---------- shell ----------
  container.replaceChildren();

  const head = el('div', { class: 'player-head' });
  const body = el('div');
  container.append(head, body);

  function renderHead() {
    head.replaceChildren();
    const backTarget = reviewMode ? '#/review' : `#/section/${lesson.section}`;
    const kicker = reviewMode ? t(L, 'reviewMode') : sectionLabel(lesson.section, L);
    const title = reviewMode ? t(L, 'reviewTitle') : lesson.title;
    const doneSoFar = results.filter((r) => r && rank[r.status] >= rank.minor).length;
    const ringPct = Math.round((doneSoFar / exercises.length) * 100);

    head.append(
      el('div', { class: 'lesson-top' }, [
        el('a', {
          class: 'lesson-back',
          href: backTarget,
          'aria-label': t(L, reviewMode ? 'exitReview' : 'exitLesson'),
          onclick: (e) => { e.preventDefault(); confirmExit(); },
        }, [icon(reviewMode ? 'close' : 'arrowLeft')]),
        el('div', { class: 'lesson-top-titles' }, [
          el('div', { class: 'lesson-top-kicker', text: `${t(L, 'sectionLabel')} · ${kicker}` }),
          el('h2', { text: title }),
        ]),
        el('div', { class: 'ring-sm', style: { '--pct': String(ringPct) }, role: 'img', 'aria-label': `${ringPct}%`, text: `${ringPct}%` }),
      ]),
    );
  }

  function sectionLabel(sec, lang) {
    const names = {
      en: {
        foundations: 'Foundations & Core Communication', 'daily-life': 'Simple Daily Life',
        'home-family': 'Home & Family', 'food-services': 'Food, Shopping & Services',
        travel: 'Mobility & Travel', 'health-emergency': 'Health & Emergencies',
        'social-communication': 'Relationships & Social Communication', 'work-money': 'Work & Money',
        'education-digital': 'Education & Digital Skills', 'complex-rights': 'Complex Situations & Rights',
        specialized: 'Specialized English & Leadership',
      },
      ar: {
        foundations: 'التأسيس والتواصل الأساسي', 'daily-life': 'الحياة اليومية البسيطة',
        'home-family': 'المنزل والأسرة', 'food-services': 'الطعام والتسوق والخدمات',
        travel: 'التنقل والسفر', 'health-emergency': 'الصحة والطوارئ',
        'social-communication': 'العلاقات والتواصل الاجتماعي', 'work-money': 'العمل والمال',
        'education-digital': 'التعليم والمهارات الرقمية', 'complex-rights': 'المواقف المعقدة والحقوق',
        specialized: 'التخصصات والقيادة',
      },
    };
    return names[lang][sec] || sec;
  }

  async function confirmExit() {
    stopSpeaking();
    stopWordByWordUi();
    dismissDuoSheet();
    if (reviewMode) { navigate('review'); return; }
    const ok = await confirmDialog({
      title: t(L, 'exitTitle'),
      body: t(L, 'exitBody'),
      confirmText: t(L, 'confirmExitShort'),
      cancelText: t(L, 'cancelBtn'),
      danger: true,
      lang: L,
    });
    if (!ok) return;
    navigate('section', [lesson.section]);
  }

  /** Restart the CURRENT exercise attempt — explicit confirmation only. */
  async function restartExercise() {
    const ok = await confirmDialog({
      title: t(L, 'restartTitle'),
      body: t(L, 'restartBody'),
      confirmText: t(L, 'confirmRestart'),
      cancelText: t(L, 'cancelBtn'),
      danger: false,
      lang: L,
    });
    if (!ok) return; // Cancel → nothing changes
    results[idx] = null;
    checked = false;
    lastResult = null;
    renderExercise(); // fresh attempt of the same question
  }

  // ---------- main exercise render ----------
  function renderExercise() {
    if (exerciseTimerId) { clearInterval(exerciseTimerId); exerciseTimerId = null; }
    checked = false;
    lastResult = null;
    exStart = Date.now();
    stopWordByWordUi();
    if (fieldHandle) { try { fieldHandle.destroy(); } catch { /* ignore */ } fieldHandle = null; }
    renderHead();
    body.replaceChildren();

    const ex = exercises[idx];
    const doneCount = results.filter((r) => r && rank[r.status] >= rank.minor).length;

    // progress strip: counter + linear bar (position-based)
    const progressPct = Math.round(((idx) / exercises.length) * 100);
    body.append(
      el('div', { class: 'ex-progress' }, [
        el('span', { class: 'ex-counter', text: reviewMode ? t(L, 'exerciseCounter', { i: idx + 1, n: exercises.length }) : t(L, 'sentenceCounter', { i: idx + 1, n: exercises.length }) }),
        el('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': progressPct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, [
          el('span', { style: { width: `${progressPct}%` } }),
        ]),
      ]),
    );

    if (ex.type === 'listen-and-type') {
      const streak = (() => {
        let n = 0;
        for (let i = idx - 1; i >= 0 && results[i]?.status === 'correct'; i--) n++;
        return n;
      })();
      const hud = el('div', { class: 'lw-session-hud', 'aria-label': L === 'ar' ? 'إحصائيات التمرين' : 'Exercise stats' });
      const timerValue = el('strong', { text: '01:00' });
      const timerLabel = L === 'ar' ? 'الوقت' : 'Time';
      const pointsLabel = L === 'ar' ? 'النقاط' : 'Points';
      const streakLabel = L === 'ar' ? 'السلسلة' : 'Streak';
      const pointsValue = el('strong', { text: String(sessionXp) });
      const streakValue = el('strong', { text: String(streak) });
      hud.append(
        el('div', { class: 'lw-hud-item' }, [el('span', { text: timerLabel }), timerValue]),
        el('div', { class: 'lw-hud-item' }, [el('span', { text: pointsLabel }), pointsValue]),
        el('div', { class: 'lw-hud-item' }, [el('span', { text: streakLabel }), streakValue]),
      );
      body.append(hud);
      let seconds = 60;
      exerciseTimerId = window.setInterval(() => {
        seconds = Math.max(0, seconds - 1);
        timerValue.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
        if (seconds === 0 && exerciseTimerId) {
          clearInterval(exerciseTimerId);
          exerciseTimerId = null;
          timerValue.classList.add('lw-time-up');
        }
      }, 1000);
    }

    // every sentence lives in its own self-contained card:
    // number chip, media/prompt, answer surface, check action, hint and feedback
    const card = el('div', { class: 'sentence-card' });
    const cardHead = el('div', { class: 'sentence-head' }, [
      el('span', { class: 'sc-num', text: reviewMode ? t(L, 'exerciseCounter', { i: idx + 1, n: exercises.length }) : t(L, 'sentenceCounter', { i: idx + 1, n: exercises.length }) }),
      el('span', { class: 'chip sc-type', text: typeLabel(ex.type, L) }),
      ...(ex.isAlternative ? [el('span', { class: 'chip chip-alt', text: t(L, 'altQuestionTag') })] : []),
      ...(doneCount ? [el('span', { class: 'chip chip-done' }, [iconLabel('check', String(doneCount))])] : []),
    ]);
    card.append(cardHead);

    const inputRow = el('div', { class: 'answer-row' });
    const feedbackBox = el('div');
    const hintChip = el('div', { class: 'hint-chip-slot', 'aria-live': 'polite' });
    const actions = el('div', { class: 'card-actions' });
    state.feedbackBox = feedbackBox;
    state.card = card;
    state.hintChip = hintChip;

    const checkBtn = el('button', {
      class: 'btn btn-primary',
      onclick: () => onCheck(),
    }, [iconLabel('check', t(L, 'checkAnswer'))]);
    const hintBtn = el('button', { class: 'btn btn-round', 'aria-label': t(L, 'hint'), title: t(L, 'hint'), onclick: () => showHint(ex) }, [icon('bulb')]);
    const skipBtn = el('button', { class: 'btn btn-ghost btn-sm', text: t(L, 'skip'), onclick: onSkip });
    state.checkBtn = checkBtn;
    state.hintBtn = hintBtn;
    state.skipBtn = skipBtn;

    if (ex.type === 'listen-and-type') {
      card.append(el('div', { class: 'prompt-label', text: t(L, 'typeWhatYouHear') }));
      const audioRow = el('div', { class: 'audio-row' });
      const listenBtn = el('button', { class: 'audio-main', 'aria-label': t(L, 'play'), title: t(L, 'play'), onclick: () => playAudio(ex.en) }, [icon('audio')]);
      // Pause / resume toggle (web: speechSynthesis.pause; native: stop-at-word)
      const pauseBtn = el('button', { class: 'audio-slow', 'aria-label': t(L, 'pause'), title: t(L, 'pause'), onclick: () => togglePause(pauseBtn) }, [icon('pause')]);
      const slowBtn = el('button', { class: 'audio-slow', 'aria-label': t(L, 'playSlow'), title: t(L, 'playSlow'), onclick: () => playSlowWordByWord(ex.en, slowBtn) }, [icon('turtle')]);
      // quick playback-speed cycle (slow → normal → fast)
      const speedBtn = el('button', {
        class: 'audio-slow audio-speed', 'aria-label': t(L, 'speedTitle'), title: t(L, 'speedTitle'),
        onclick: () => cycleSpeed(speedBtn),
      }, [icon('gauge'), el('span', { class: 'audio-speed-label', text: speedLabel() })]);
      audioRow.append(listenBtn, pauseBtn, slowBtn, speedBtn);
      // mute toggle for the typing sound effects (correct / wrong tones)
      const fxLabel = (on) => t(L, on ? 'soundFxOn' : 'soundFxOff');
      const fxOn = getSettings().soundEffects !== false;
      const fxBtn = el('button', {
        class: 'audio-slow lw-fx-toggle',
        'aria-label': fxLabel(fxOn),
        title: fxLabel(fxOn),
        onclick: () => {
          const next = getSettings().soundEffects === false; // muted → enable
          saveSettings({ soundEffects: next });
          fxBtn.replaceChildren(icon(next ? 'audio' : 'volumeX'));
          fxBtn.setAttribute('aria-label', fxLabel(next));
          fxBtn.title = fxLabel(next);
          toast(fxLabel(next), 1400);
        },
      }, [icon(fxOn ? 'audio' : 'volumeX')]);
      audioRow.append(fxBtn);
      if (!speechSupported()) {
        audioRow.append(el('p', { class: 'muted small', text: t(L, 'speechUnavailable') }));
        // If speech is unavailable, show the sentence so the exercise stays usable.
        card.append(el('div', { class: 'sentence-text', dir: 'ltr', text: ex.en }));
      } else {
        audioRow.append(el('span', { class: 'audio-caption', text: `${t(L, 'play')} · ${t(L, 'pause')} · ${t(L, 'playSlow')}` }));
        card.append(audioRow);
        // word-by-word progress dots light up while the turtle button reads
        card.append(el('div', { class: 'sww-dots', 'aria-hidden': 'true' }));
        setTimeout(() => playAudio(ex.en), 250); // auto-play once per exercise
      }
      if (settings.showArabic && ex.ar) {
        card.append(el('div', { class: 'sentence-ar', dir: 'rtl', text: ex.ar }));
      }
      // v9 KEYBOARD-FREE dictation: word-grouped letter slots driven by
      // LETTER TILES (no QWERTY pad, no <input> anywhere). Words lock
      // green as they are completed; the space is automatic. Same
      // slot rendering, same validation policy, same answers, same
      // grading (checkAnswer on the built value).
      const typedField = createTouchTypingField({
        expected: ex.en,
        ariaLabel: t(L, 'typeWhatYouHear'),
        tilesAria: t(L, 'lettersAria'),
        labels: { backspace: t(L, 'kbBackspace') },
        onWrong: () => {},
        onEnter: () => { checked ? onNext() : onCheck(); },
        onWordLocked: () => {
          // gentle celebration per locked word (no layout shift)
          if (navigator.vibrate) { try { navigator.vibrate(12); } catch { /* ignore */ } }
        },
        onComplete: () => {
          // sentence fully entered → success state, then hand over to
          // the normal check pipeline (grading, XP, feedback, word cards)
          typedField.surface.classList.add('is-complete');
          const at = idx;
          window.setTimeout(() => {
            if (!checked && idx === at) onCheck();
          }, 620);
        },
      });
      inputRow.classList.add('lw-answer-row');
      inputRow.append(typedField.root);
      card.append(inputRow);
      fieldHandle = { destroy() { try { typedField.destroy(); } catch { /* ignore */ } } };
      actions.append(checkBtn, hintBtn, skipBtn);
      card.append(actions);
      state.typedField = typedField;
      state.hintTarget = 'dictation';
      const footerControls = el('div', { class: 'lw-footer-controls' });
      const restartBtn = el('button', {
        class: 'btn btn-ghost btn-sm',
        text: t(L, 'restartExercise'),
        onclick: restartExercise, // confirmation dialog inside
      });
      const replayBtn = el('button', {
        class: 'btn btn-ghost btn-sm',
        text: t(L, 'listenAgain'),
        onclick: () => playAudio(ex.en),
      });
      const footerNext = el('button', {
        class: 'btn btn-primary btn-sm',
        text: L === 'ar' ? 'التمرين التالي' : 'Next exercise',
        disabled: true,
        onclick: onNext,
      });
      footerControls.append(restartBtn, replayBtn, footerNext);
      card.append(footerControls);
      state.footerNext = footerNext;
    }

    if (ex.type === 'fill-blank') {
      card.append(el('div', { class: 'prompt-label', text: t(L, 'fillPrompt') }));
      card.append(el('div', { class: 'blank-display', dir: 'ltr', html: trustedBlankHtml(ex.display) }));
      if (settings.showArabic && ex.ar) card.append(el('div', { class: 'sentence-ar', dir: 'rtl', text: ex.ar }));
      // v9 KEYBOARD-FREE fill-blank: letter tiles of the blank word
      // (words for multi-word blanks). Same question, same accepted
      // answers, same checkAnswer validation — zero typing. No
      // clear-all button; the answer locks only when correct.
      const tiles = createLetterTiles({
        source: ex.blankWord,
        ariaLabel: t(L, 'fillPrompt'),
        labels: { backspace: t(L, 'kbBackspace') },
        onComplete: () => {
          // all tiles placed → validate immediately (word-level)
          const at = idx;
          window.setTimeout(() => {
            if (!checked && idx === at) onCheck();
          }, 480);
        },
      });
      inputRow.append(tiles.root);
      card.append(inputRow);
      actions.append(checkBtn, hintBtn, skipBtn);
      card.append(actions);
      state.tiles = tiles;
      state.hintTarget = 'blank';
      state.blankHint = { revealed: 0 }; // letters revealed for THIS attempt
    }

    if (ex.type === 'word-order') {
      card.append(el('div', { class: 'prompt-label', text: t(L, 'wordOrderPrompt') }));
      const tray = el('div', { class: 'word-order-tray', 'aria-label': t(L, 'wordOrderPrompt') });
      const bank = el('div', { class: 'word-order-bank' });
      card.append(tray, bank);
      if (settings.showArabic && ex.ar) card.append(el('div', { class: 'sentence-ar', dir: 'rtl', text: ex.ar }));

      // v9 word-order: positional slots with word-by-word locking.
      // A chip placed in the correct position locks green instantly;
      // a wrong chip stays red and removable. Locked chips can never
      // be moved or deleted. No clear-all button.
      const woSession = createWordOrderSession({
        expectedSentence: (ex.acceptedAnswers && ex.acceptedAnswers[0]) || ex.en,
        chips: ex.words,
      });
      state.woSession = woSession;

      function renderWordOrder() {
        tray.replaceChildren();
        bank.replaceChildren();
        for (const slot of woSession.slotsView()) {
          if (!slot.chip) {
            tray.append(el('span', { class: 'wo-slot is-empty', 'data-pos': String(slot.position), 'aria-label': `slot ${slot.position + 1}` }));
            continue;
          }
          const chipEl = el('button', {
            class: `wo-chip placed ${slot.locked ? 'is-locked' : 'is-wrong'}`,
            text: slot.chip.text,
            'aria-label': slot.locked ? t(L, 'wordLocked') : t(L, 'incorrect'),
          });
          if (!slot.locked) {
            chipEl.addEventListener('click', () => {
              woSession.removeAt(slot.position);
              renderWordOrder();
            });
          } else {
            chipEl.disabled = true; // locked: cannot be edited or moved
          }
          tray.append(chipEl);
        }
        for (const c of woSession.bankView()) {
          if (c.used) continue;
          const chip = el('button', { class: 'wo-chip', text: c.text, 'data-i': String(c.chipId) });
          chip.addEventListener('click', () => {
            if (checked) return;
            const res = woSession.place(c.chipId);
            if (res.placed) {
              renderWordOrder();
              if (res.sessionComplete && !checked) {
                // every word locked in place → validate the sentence
                window.setTimeout(() => { if (!checked && idx === exercises[idx] && exercises[idx].id === ex.id) onCheck(); }, 520);
              }
            }
          });
          bank.append(chip);
        }
        if (!woSession.bankView().some((c) => !c.used)) bank.classList.add('is-empty');
        else bank.classList.remove('is-empty');
      }
      renderWordOrder();

      card.append(inputRow);
      actions.append(checkBtn, hintBtn, skipBtn);
      card.append(actions);
      state.getWordOrder = () => woSession.getValue();
      state.wordOrderComplete = () => woSession.slotsView().every((s) => s.chip);
      state.hintTarget = 'word-order';
      state.woHintPosition = -1; // last position the hint clued
    }

    if (ex.type === 'multiple-choice') {
      card.append(el('div', { class: 'prompt-label', text: t(L, 'mcPrompt') }));
      card.append(el('div', { class: 'sentence-text', dir: 'ltr', text: ex.question }));
      if (settings.showArabic && ex.ar) card.append(el('div', { class: 'sentence-ar', dir: 'rtl', text: ex.ar }));
      const optsBox = el('div', { class: 'mc-options', role: 'listbox' });
      let selected = -1;
      ex.options.forEach((optText, i) => {
        const b = el('button', { class: 'mc-option', text: optText, role: 'option' });
        b.addEventListener('click', () => {
          if (checked || b.disabled) return;
          selected = i;
          optsBox.querySelectorAll('.mc-option').forEach((n) => n.classList.remove('selected'));
          b.classList.add('selected');
        });
        optsBox.append(b);
      });
      card.append(optsBox);
      card.append(inputRow);
      actions.append(checkBtn, hintBtn, skipBtn);
      card.append(actions);
      state.getSelected = () => selected;
      state.mcOptionsBox = optsBox;
      state.hintTarget = 'mc';
      state.mcHintStep = 0; // 0 none → 1 excluded → 2 first letter
    }

    // hint chip slot + feedback live inside the same card, after the actions
    card.append(hintChip);
    card.append(feedbackBox);
    body.append(card);

    if (!reviewMode && entry && !retryMode) {
      // keep resume position fresh (retry subsets must not corrupt it)
      saveResume(lessonId, idx);
    }
  }

  const state = {};

  function trustedBlankHtml(display) {
    // display is trusted lesson content; still escape all but our ___ marker
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return esc(display).replace(/___/g, '<span class="blank">…</span>');
  }

  function typeLabel(type, lang) {
    const names = {
      en: { 'listen-and-type': 'Listen & build', 'fill-blank': 'Fill the blank', 'word-order': 'Word order', 'multiple-choice': 'Choose' },
      ar: { 'listen-and-type': 'استمع وابنِ', 'fill-blank': 'أكمل الفراغ', 'word-order': 'رتّب الكلمات', 'multiple-choice': 'اختر' },
    };
    return names[lang][type] || type;
  }

  /* ---------- audio controls ---------- */

  function speedIndex() {
    const r = Number(getSettings().rate) || 1;
    if (r < 0.8) return 0;
    if (r > 1.15) return 2;
    return 1;
  }
  function speedLabel() {
    return t(L, SPEEDS[speedIndex()].key);
  }
  function cycleSpeed(btn) {
    const next = (speedIndex() + 1) % SPEEDS.length;
    saveSettings({ rate: SPEEDS[next].rate });
    const labelEl = btn.querySelector('.audio-speed-label');
    if (labelEl) labelEl.textContent = t(L, SPEEDS[next].key);
    toast(`${t(L, 'speedTitle')}: ${t(L, SPEEDS[next].key)}`, 1400);
    // replay the sentence at the new speed for instant feedback
    playAudio(exercises[idx].en);
  }

  function togglePause(btn) {
    const st = getAudioState() || {};
    if (st.playing && !st.paused) {
      pausePlayback();
      btn.replaceChildren(icon('play'));
      btn.setAttribute('aria-label', t(L, 'resume'));
      btn.title = t(L, 'resume');
    } else if (st.paused) {
      resumePlayback();
      btn.replaceChildren(icon('pause'));
      btn.setAttribute('aria-label', t(L, 'pause'));
      btn.title = t(L, 'pause');
    } else {
      playAudio(exercises[idx].en); // nothing playing → start
    }
  }

  function playAudio(text, rateOverride) {
    stopWordByWordUi();
    resetPauseBtn();
    const ok = speak(text, {
      voiceURI: settings.voiceURI || '',
      rate: rateOverride ?? settings.rate,
      onerror: () => toast(t(L, 'speechUnavailable')),
    });
    if (!ok) toast(t(L, 'speechUnavailable'));
  }

  function resetPauseBtn() {
    body.querySelectorAll('.audio-row .audio-slow').forEach((b) => {
      if (!b.querySelector('.audio-speed-label') && b.getAttribute('aria-label') === t(L, 'resume')) {
        b.replaceChildren(icon('pause'));
        b.setAttribute('aria-label', t(L, 'pause'));
        b.title = t(L, 'pause');
      }
    });
  }

  /** Clear any word-by-word playback + its dots/pulse UI. */
  function stopWordByWordUi() {
    if (swwUi) { try { swwUi.stop(); } catch { /* ignore */ } swwUi = null; }
    if (!body || !body.querySelectorAll) return;
    body.querySelectorAll('.sww-dots.is-active').forEach((d) => {
      d.classList.remove('is-active');
      d.replaceChildren();
    });
    body.querySelectorAll('.audio-slow.is-speaking').forEach((b) => b.classList.remove('is-speaking'));
  }

  /** Turtle button: word-by-word slow audio (falls back to slow sentence). */
  function playSlowWordByWord(text, btn) {
    stopWordByWordUi();
    if (getSettings().slowWordByWord === false || !speechSupported()) {
      playAudio(text, 0.65);
      return;
    }
    const dotsWrap = body.querySelector('.sww-dots');
    const words = String(text).trim().split(/\s+/).filter(Boolean);
    const dots = dotsWrap
      ? words.map(() => { const d = el('span', { class: 'sww-dot' }); dotsWrap.append(d); return d; })
      : [];
    if (dotsWrap) dotsWrap.classList.add('is-active');
    if (btn) btn.classList.add('is-speaking');
    swwUi = speakWordByWord(text, {
      voiceURI: settings.voiceURI || '',
      rate: 0.6,
      gapMs: 300,
      onword: (i) => { dots[i]?.classList.add('lit'); },
      onend: () => stopWordByWordUi(),
    });
  }

  /* ---------- smart hint system ---------- */

  /** Show a hint chip (localized, never the answer). */
  function hintChipMsg(text) {
    state.hintChip.replaceChildren(el('div', { class: 'hint-box hint-box-sm', dir: 'auto' }, [iconLabel('bulb', text)]));
  }

  /**
   * v9 Hint: FIRST LETTER of the current incomplete word only.
   * Never the Arabic translation, never the complete word, never
   * the full answer. Repeated presses stop at the cap.
   */
  function showHint(ex) {
    hintUsedSet.add(ex.id); // any hint lowers the XP tier (see xp.js)
    const target = state.hintTarget;

    if (target === 'dictation' && state.typedField) {
      const res = state.typedField.revealHint();
      if (res.revealed) hintChipMsg(t(L, 'hintRevealed'));
      else if (res.reason === 'cap-reached') hintChipMsg(t(L, 'hintNoMore'));
      else if (res.reason === 'word-too-short') hintChipMsg(t(L, 'hintTooShort'));
      else hintChipMsg(t(L, 'hintNoneLeft'));
      return;
    }

    if (target === 'blank' && ex.type === 'fill-blank') {
      const blank = String(ex.blankWord ?? '').trim();
      const letters = Array.from(blank);
      const cap = Math.max(1, Math.floor(letters.length / 2));
      const revealed = state.blankHint?.revealed || 0;
      if (letters.length < 2) { hintChipMsg(t(L, 'hintTooShort')); return; }
      if (revealed >= cap) { hintChipMsg(t(L, 'hintNoMore')); return; }
      state.blankHint.revealed = revealed + 1;
      // reveal the NEXT letter (first press → first letter), styled
      // in the hint color inside the clue chip: e.g. d _ _ _ _
      const shown = letters.slice(0, state.blankHint.revealed)
        .map((c, i) => (i === 0 ? c : c)).join('');
      const rest = '_'.repeat(Math.max(0, letters.length - state.blankHint.revealed));
      const chip = el('div', { class: 'hint-box hint-box-sm hint-letters', dir: 'ltr' }, [
        icon('bulb'),
        el('span', { class: 'hint-revealed-letter', text: shown }),
        el('span', { class: 'hint-hidden-rest', text: rest }),
      ]);
      state.hintChip.replaceChildren(chip);
      return;
    }

    if (target === 'word-order' && state.woSession) {
      const pos = state.woSession.slotsView().findIndex((s) => !s.chip);
      const word = state.woSession.nextExpectedWord();
      if (!word) { hintChipMsg(t(L, 'hintNoneLeft')); return; }
      if (pos === state.woHintPosition && pos >= 0) {
        hintChipMsg(t(L, 'hintNoMore'));
        return;
      }
      state.woHintPosition = pos;
      const first = Array.from(word)[0] || '';
      hintChipMsg(t(L, 'hintNextStarts', { c: first }));
      return;
    }

    if (target === 'mc' && ex.type === 'multiple-choice') {
      // step 1: exclude ONE wrong option (never selects the answer)
      if (state.mcHintStep === 0) {
        const wrong = excludedOption(ex);
        if (wrong != null && state.mcOptionsBox) {
          const btns = [...state.mcOptionsBox.querySelectorAll('.mc-option')];
          const at = ex.options.indexOf(wrong);
          if (at >= 0 && btns[at]) {
            btns[at].classList.add('is-excluded');
            btns[at].disabled = true;
          }
        }
        state.mcHintStep = 1;
        hintChipMsg(t(L, 'hintExcluded'));
        return;
      }
      // step 2: first letter of the correct answer (still no selection)
      if (state.mcHintStep === 1) {
        const correct = Array.isArray(ex.options) ? ex.options[ex.answerIndex] : null;
        const letter = correct ? (Array.from(String(correct).trim())[0] || '') : '';
        if (letter) {
          state.mcHintStep = 2;
          hintChipMsg(t(L, 'hintAnswerStarts', { c: letter }));
        } else {
          hintChipMsg(t(L, 'hintNoneLeft'));
        }
        return;
      }
      hintChipMsg(t(L, 'hintNoneLeft'));
      return;
    }

    hintChipMsg(t(L, 'hintNoneLeft'));
  }

  // ---------- checking ----------
  async function onCheck() {
    if (checked) { onNext(); return; }
    const ex = exercises[idx];
    let result;
    let typedVal = '';

    if (ex.type === 'listen-and-type') {
      const val = state.typedField ? state.typedField.getValue() : '';
      typedVal = val;
      result = checkAnswer(val, ex.acceptedAnswers, { strict: settings.strictGrading });
      if (result.status === 'empty') {
        toast(t(L, 'emptyAnswer'));
        if (state.typedField) state.typedField.shake();
        return;
      }
    } else if (ex.type === 'fill-blank') {
      const val = state.tiles ? state.tiles.getValue() : '';
      typedVal = val;
      const base = checkAnswer(val, ex.acceptedAnswers, { strict: settings.strictGrading });
      result = { ...base, expectedDisplay: ex.blankWord };
      if (result.status === 'empty') { toast(t(L, 'emptyAnswer')); return; }
      if (result.status === 'correct' && state.tiles) {
        state.tiles.lockCorrect(); // validated → green + frozen
      } else if (result.status !== 'correct' && state.tiles) {
        state.tiles.markIncorrect(); // red — never locks, stays editable
      }
    } else if (ex.type === 'word-order') {
      const built = state.getWordOrder ? state.getWordOrder() : '';
      if (!state.wordOrderComplete || !state.wordOrderComplete()) {
        toast(t(L, 'wordOrderPrompt'));
        return;
      }
      result = checkAnswer(built, ex.acceptedAnswers || [ex.en], { strict: true });
    } else if (ex.type === 'multiple-choice') {
      const sel = state.getSelected ? state.getSelected() : -1;
      if (sel < 0) { toast(t(L, 'mcPrompt')); return; }
      const ok = sel === ex.answerIndex;
      result = { status: ok ? 'correct' : 'incorrect', diff: { word: 0, typed: '', expected: ex.options[ex.answerIndex] } };
      body.querySelectorAll('.mc-option').forEach((n, i) => {
        if (i === ex.answerIndex) n.classList.add('correct');
        else if (i === sel) n.classList.add('wrong');
      });
    }

    checked = true;
    if (state.footerNext) state.footerNext.disabled = false;
    lastResult = result;
    results[idx] = { status: result.status, ex, typedValue: typedVal };
    if (result.status === 'incorrect' || result.status === 'skipped') {
      firstAttemptMap.set(ex.id, false); // no first-try bonus after a failed attempt
    }

    // feedback UI (rendered inside the sentence card)
    const fb = el('div', { class: `feedback ${fbClass(result.status)}`, role: 'status' });
    const titles = {
      correct: t(L, 'correct'),
      minor: t(L, 'minorIssue'),
      incorrect: t(L, 'incorrect'),
      skipped: t(L, 'incorrect'),
    };
    fb.append(el('div', { class: 'fb-title' }, [iconLabel(result.status === 'correct' ? 'checkCircle' : result.status === 'minor' ? 'alert' : 'xCircle', titles[result.status])]));

    if (result.status !== 'correct') {
      const expected = ex.type === 'fill-blank' && result.expectedDisplay ? ex.display.replace('___', ex.blankWord) : ex.en;
      if (expected) fb.append(el('div', {}, [`${t(L, 'expectedAnswer')}: `, el('span', { class: 'expected', text: expected })]));
      if (ex.ar) fb.append(el('div', { class: 'ar-meaning', dir: 'rtl', text: `${t(L, 'meaning')}: ${ex.ar}` }));
      if (ex.type === 'listen-and-type' && typedVal && expected) {
        // word-level colored feedback: green = correct word, red = wrong, orange = missing
        fb.append(buildWordDiff(typedVal, expected));
      } else if (result.diff && result.diff.word > 0 && ex.type !== 'multiple-choice') {
        fb.append(el('div', { class: 'explain', text: `#${result.diff.word}: "${result.diff.typed}" → "${result.diff.expected}"` }));
      }
      if (ex.explanation) fb.append(el('div', { class: 'explain', text: ex.explanation }));
    } else if (ex.explanation) {
      fb.append(el('div', { class: 'explain', text: ex.explanation }));
    }
    // contextual motivational line (Arabic, {name}-aware, standalone dataset)
    const mMsg = result.status === 'correct'
      ? messageForCorrect(settings.userName, lastMotivation)
      : messageForWrong(settings.userName, lastMotivation);
    lastMotivation = mMsg;
    fb.append(el('div', { class: 'motivation-line', dir: 'rtl', text: mMsg }));

    // XP awarding (normal lessons only — revision sessions never award XP)
    let xpDelta = 0;
    if (!reviewMode) {
      try {
        const firstAttempt = firstAttemptMap.get(ex.id) !== false;
        if (result.status === 'incorrect') {
          if (firstAttempt) await markFirstAttemptFailed(ex.id); // zero-marker: retries can't claim the first-try bonus
        } else if (result.status === 'correct' || result.status === 'minor') {
          const award = await awardExercise(ex.id, result.status, { firstAttempt, usedHint: hintUsedSet.has(ex.id) });
          if (award.delta > 0) {
            sessionXp += award.delta;
            xpDelta = award.delta;
            fb.append(el('span', { class: 'xp-gain', text: t(L, 'plusXp', { n: award.delta }) }));
            const xpMsg = messageForXp(settings.userName, lastMotivation);
            lastMotivation = xpMsg;
            toast(xpMsg, 2400);
          }
          // already-awarded exercises silently earn 0 again (ledger in xp.js)
        }
      } catch (err) { console.warn('xp award failed', err); }
    }

    state.feedbackBox.replaceChildren(fb);
    state.hintChip.replaceChildren(); // hint never survives the answer
    const hudValues = body.querySelectorAll('.lw-hud-item strong');
    if (hudValues.length >= 3) {
      hudValues[1].textContent = String(sessionXp);
      let liveStreak = 0;
      for (let i = idx; i >= 0 && results[i]?.status === 'correct'; i--) liveStreak++;
      hudValues[2].textContent = String(liveStreak);
    }

    // sentence analysis word cards (listen & type / word order reveal the sentence)
    if (ex.type === 'listen-and-type' || ex.type === 'word-order') {
      try {
        const vocab = lesson && lesson.vocabulary ? lesson.vocabulary : [];
        const tokens = analyzeSentence(ex.en, vocab);
        if (tokens.some((tk) => tk.posAr || tk.meaningAr)) {
          state.card.append(el('div', { class: 'analysis-section' }, [
            el('div', { class: 'analysis-title', text: t(L, 'sentenceAnalysis') }),
            renderWordCards(tokens, {
              speak: (w) => playAudio(w, 0.8),
              labels: {
                meaning: t(L, 'meaning'), partOfSpeech: t(L, 'partOfSpeech'),
                unknown: t(L, 'notDetermined'), listen: t(L, 'play'), noAnalysis: t(L, 'noAnalysis'),
              },
            }),
          ]));
        }
      } catch { /* analysis is an extra; never block the lesson */ }
    }

    // persistence
    persistAnswer(ex, result.status);

    // flip buttons (lock actions that must not run twice)
    if (state.resetBtn) state.resetBtn.disabled = true;
    if (state.hintBtn) state.hintBtn.disabled = true;
    if (state.skipBtn) state.skipBtn.disabled = true;
    const nextBtn = el('button', { class: 'btn btn-primary', onclick: onNext }, [iconLabel(idx === exercises.length - 1 ? 'trophy' : 'arrowRight', idx === exercises.length - 1 ? t(L, 'finishLesson') : t(L, 'nextExercise'))]);
    state.checkBtn.replaceWith(nextBtn);
    nextBtn.focus(); // safe: buttons never open a system keyboard

    // Duolingo-style instant celebration (sound + confetti + bottom sheet)
    celebrate(result, ex, xpDelta);
  }

  /* ---------- celebration + interactive feedback sheet ---------- */

  function celebrate(result, ex, xpDelta) {
    if (result.status === 'correct') { playCorrectFanfare(); confettiBurst(26); }
    else if (result.status === 'minor') { playCorrectFanfare(); }
    else { playWrongBuzz(); }

    // combo badge for 3+ correct answers in a row (all exercise types)
    let combo = 0;
    for (let i = idx; i >= 0 && results[i]?.status === 'correct'; i--) combo++;
    if (combo >= 3) showComboBadge(combo);

    showDuoSheet(result, ex, xpDelta);
  }

  function showComboBadge(n) {
    document.querySelectorAll('.combo-badge').forEach((b) => b.remove());
    const badge = el('div', { class: 'combo-badge', role: 'status', 'aria-label': `${t(L, 'comboAria')} ×${n}` }, [
      icon('flame'),
      el('span', { text: `×${n}` }),
    ]);
    document.body.append(badge);
    setTimeout(() => badge.remove(), 2200);
  }

  function showDuoSheet(result, ex, xpDelta) {
    dismissDuoSheet();
    const ok = result.status === 'correct';
    const good = ok || result.status === 'minor';
    const backdrop = el('div', { class: 'duo-backdrop' });
    backdrop.addEventListener('click', dismissDuoSheet);

    const title = ok ? t(L, 'duoExcellent') : (result.status === 'minor' ? t(L, 'duoGoodJob') : t(L, 'duoKeepGoing'));
    const sheet = el('div', { class: 'duo-sheet', role: 'status' }, [
      el('div', { class: 'duo-sheet-icon' }, [icon(good ? 'checkCircle' : 'xCircle')]),
      el('div', { class: 'duo-sheet-title', text: title }),
    ]);

    if (!ok) {
      // expected answer per exercise type (multiple-choice has no `en` field)
      let expected = null;
      if (ex.type === 'fill-blank' && result.expectedDisplay) expected = ex.display.replace('___', ex.blankWord);
      else if (ex.type === 'multiple-choice') expected = Array.isArray(ex.options) ? ex.options[ex.answerIndex] : null;
      else expected = ex.en || null;
      if (expected || ex.ar) {
        const answerBox = el('div', { class: 'duo-sheet-answer' });
        if (expected) {
          answerBox.append(
            el('div', { class: 'duo-answer-label', text: t(L, 'duoCorrectAnswer') }),
            el('div', { class: 'duo-answer-en', dir: 'ltr', text: expected }),
          );
        }
        if (ex.ar) answerBox.append(el('div', { class: 'ar-meaning', dir: 'rtl', text: ex.ar }));
        sheet.append(answerBox);
      }
    }

    if (xpDelta > 0) sheet.append(el('span', { class: 'xp-float', text: t(L, 'plusXp', { n: xpDelta }) }));

    const last = idx === exercises.length - 1;
    const contBtn = el('button', {
      class: 'btn btn-primary duo-continue',
      onclick: () => { dismissDuoSheet(); onNext(); },
    }, [iconLabel(last ? 'trophy' : 'arrowRight', last ? t(L, 'finishLesson') : t(L, 'continueBtn'))]);
    sheet.append(contBtn);

    const wrap = el('div', { class: `duo-sheet-wrap ${good ? 'is-ok' : 'is-bad'}` }, [sheet]);
    document.body.append(backdrop, wrap);
    requestAnimationFrame(() => {
      backdrop.classList.add('is-open');
      wrap.classList.add('is-open');
    });
    setTimeout(() => { try { contBtn.focus({ preventScroll: true }); } catch { contBtn.focus(); } }, 420);
  }

  function dismissDuoSheet() {
    document.querySelectorAll('.duo-sheet-wrap, .duo-backdrop').forEach((n) => n.remove());
  }

  /** Word-level colored diff chips for dictation feedback. */
  function buildWordDiff(typedVal, expected) {
    const wrap = el('div', { class: 'word-diff', dir: 'ltr' });
    try {
      const d = wordDiff(typedVal, expected);
      for (const tk of d.typed) wrap.append(el('span', { class: `wd-token wd-${tk.type}`, title: tk.expected || '', text: tk.text }));
      if (d.missing.length) {
        wrap.append(el('span', { class: 'wd-missing-label', text: t(L, 'missingWords') }));
        for (const m of d.missing) wrap.append(el('span', { class: 'wd-token wd-missing', text: m.text }));
      }
    } catch {
      wrap.append(el('span', { class: 'wd-token', text: expected }));
    }
    return wrap;
  }

  function fbClass(status) {
    return { correct: 'ok', minor: 'minor', incorrect: 'bad', skipped: 'bad' }[status] || 'bad';
  }

  async function persistAnswer(ex, status) {
    const timeMs = Date.now() - exStart;
    try {
      await recordAttempt({
        lessonId: ex.lessonId,
        exerciseId: ex.id,
        type: ex.type,
        status,
        timeMs,
        tags: ex.grammarTags || [],
      });
      if (reviewMode) {
        await gradeReview(ex.id, status === 'correct' || status === 'minor');
      } else {
        if (status === 'incorrect' || status === 'skipped') {
          await upsertOnWrong(ex.id, ex.lessonId, ex.grammarTags || []);
        }
        // Every exercise records under its ORIGINAL index so lesson
        // state keeps one consistent key space (alternatives carry
        // origIdx; retry sessions already do).
        await updateLessonState(ex.lessonId, {
          totalExercises: retryMode ? originalCount : exercises.length,
          index: ex.origIdx ?? idx,
          status,
        });
      }
    } catch (err) {
      console.warn('progress save failed', err);
    }
  }

  /* ---------- mandatory skip: alternative question required ---------- */

  async function onSkip() {
    if (checked) { onNext(); return; }
    const ex = exercises[idx];

    // 1) record the skip: no points, no success (history + review queue)
    results[idx] = { status: 'skipped', ex, typedValue: '' };
    firstAttemptMap.set(ex.id, false);
    persistAnswer(ex, 'skipped');

    // 2) pick a DIFFERENT question from the same lesson
    const answeredIds = new Set(results.filter(Boolean).map((r) => r.ex.id));
    const alt = pickAlternativeQuestion({ exercises, currentIndex: idx, usedIds: altUsedIds, answeredIds });

    if (!alt) {
      // No alternative exists → the question must be completed.
      results[idx] = null;      // the skip is not kept: nothing was answered
      checked = false;
      toast(t(L, 'skipAltNone'), 3200);
      hintChipMsgLong(t(L, 'skipAltNone'));
      return;
    }

    altUsedIds.add(alt.exercise.id);
    checked = true;
    if (state.footerNext) state.footerNext.disabled = false;
    if (state.hintBtn) state.hintBtn.disabled = true;
    if (state.skipBtn) state.skipBtn.disabled = true;

    // feedback: the skip itself earns nothing
    const fb = el('div', { class: 'feedback bad' }, [
      el('div', { class: 'fb-title' }, [iconLabel('arrowRight', t(L, 'skipAltTitle'))]),
      el('p', { class: 'small', text: t(L, 'skipAltBody') }),
      ex.ar ? el('div', { class: 'ar-meaning', dir: 'rtl', text: ex.ar }) : null,
    ].filter(Boolean));
    state.feedbackBox.replaceChildren(fb);

    // 3) splice the alternative in right after the skipped position and
    //    remove it from its natural slot (it must appear exactly once).
    let removeAt = alt.index;
    const altExercise = { ...alt.exercise, isAlternative: true, origIdx: alt.index };
    exercises.splice(removeAt, 1);
    if (removeAt < idx) idx -= 1;          // removal shifted our position
    results.splice(removeAt, 1);
    results.splice(idx + 1, 0, null);
    exercises.splice(idx + 1, 0, altExercise);
    originalCount = originalCount; // lesson-state accounting uses origIdx

    const skipNext = el('button', { class: 'btn btn-primary', onclick: onNext }, [iconLabel('arrowRight', t(L, 'nextExercise'))]);
    state.checkBtn.replaceWith(skipNext);
    skipNext.focus();
    showDuoSheet({ status: 'skipped' }, ex, 0);
  }

  /** Persistent inline message (used when skipping is blocked). */
  function hintChipMsgLong(text) {
    state.hintChip.replaceChildren(el('div', { class: 'hint-box hint-box-warn', dir: 'auto', role: 'alert' }, [iconLabel('alert', text)]));
  }

  function onNext() {
    dismissDuoSheet();
    stopSpeaking();
    stopWordByWordUi();
    if (idx < exercises.length - 1) {
      idx += 1;
      renderExercise();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      renderSummary();
    }
  }

  // ---------- summary ----------
  async function renderSummary() {
    if (exerciseTimerId) { clearInterval(exerciseTimerId); exerciseTimerId = null; }
    dismissDuoSheet();
    const attempted = results.filter(Boolean);
    const good = attempted.filter((r) => r.status === 'correct').length;
    const minor = attempted.filter((r) => r.status === 'minor').length;
    const bad = attempted.filter((r) => r.status === 'incorrect').length;
    const skipped = attempted.filter((r) => r.status === 'skipped').length;
    const acc = attempted.length ? Math.round(((good + minor) / attempted.length) * 100) : 0;
    const mins = Math.max(1, Math.round((Date.now() - sessionStart) / 60000));
    const wrongs = attempted.filter((r) => r.status === 'incorrect' || r.status === 'skipped');

    // one-time lesson-completion bonus (ledger in xp.js makes this safe to call)
    if (!reviewMode && !retryMode) {
      try {
        const bonus = await awardLessonComplete(lessonId);
        sessionXp += bonus.delta;
      } catch { /* XP is never on the critical path */ }
    }
    let totalXp = 0;
    try { totalXp = await getTotalXp(); } catch { /* stays 0 */ }

    renderHead();
    body.replaceChildren();

    // difficult words, taken only from the user's real wrong answers
    const wordFreq = new Map();
    const bump = (w) => {
      const k = String(w || '').toLowerCase().replace(/[^a-z0-9'-]/g, '');
      if (k) wordFreq.set(k, (wordFreq.get(k) || 0) + 1);
    };
    for (const r of wrongs) {
      if (r.ex.type === 'listen-and-type' && r.typedValue) {
        try {
          const d = wordDiff(r.typedValue, r.ex.en);
          for (const tk of d.typed) if (tk.type === 'wrong' && tk.expected) bump(tk.expected);
          for (const m of d.missing) bump(m.text);
        } catch { /* ignore */ }
      } else if (r.ex.type === 'fill-blank') {
        bump(r.ex.blankWord);
      }
    }
    const difficultWords = [...wordFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);

    const completeMsg = messageForLessonComplete(settings.userName, lastMotivation);
    lastMotivation = completeMsg;
    const doneTitle = reviewMode ? t(L, 'reviewSessionDone') : (retryMode ? t(L, 'retryDoneTitle') : t(L, 'lessonComplete'));

    body.append(el('div', { class: 'done-card center' }, [
      el('div', { class: 'done-medal duo-medal-bounce' }, [icon(acc >= 80 ? 'trophy' : 'flame')]),
      el('h3', { text: doneTitle }),
      el('div', { class: 'motivation-line', dir: 'rtl', text: completeMsg }),
      el('div', { class: 'summary-score', text: `${acc}%` }),
      el('div', { class: 'muted', text: t(L, 'yourScore') }),
      el('div', { class: 'summary-rows' }, [
        rowStat(t(L, 'resultsQuestions'), String(attempted.length)),
        rowStat(t(L, 'correctAnswers'), `${good + minor}`),
        rowStat(t(L, 'resultsWrong'), `${bad + skipped}`),
        rowStat(t(L, 'skippedTag'), String(skipped)),
        rowStat(t(L, 'timeSpent'), `${mins} ${t(L, 'minutes')}`),
        rowStat(t(L, 'xpThisSession'), `+${formatXp(sessionXp)}`),
        rowStat(t(L, 'xpTotal'), formatXp(totalXp)),
      ]),
      difficultWords.length ? el('div', { class: 'difficult-words' }, [
        el('div', { class: 'small muted', style: { marginBottom: '.35rem' }, text: t(L, 'difficultWords') }),
        el('div', { class: 'wd-chips', dir: 'ltr' }, difficultWords.map((w) => el('span', { class: 'wd-token wd-missing', text: w }))),
      ]) : null,
      (!reviewMode && !retryMode && wrongs.length) ? el('p', { class: 'muted small', style: { marginTop: '.6rem' }, text: t(L, 'addedToReview') }) : null,
      el('div', { class: 'card-actions', style: { marginTop: '1.1rem' } }, buildSummaryButtons(wrongs)),
    ].filter(Boolean)));

    // end-of-lesson celebration: fanfare + confetti (bigger for high scores)
    playFinishFanfare();
    confettiBurst(acc >= 80 ? 46 : 26);

    function formatXp(n) {
      return new Intl.NumberFormat(L === 'ar' ? 'ar-EG' : 'en-US').format(n);
    }

    function rowStat(k, v) {
      return el('div', { class: 'row-between' }, [el('span', { class: 'muted', text: k }), el('b', { text: v })]);
    }

    function buildSummaryButtons(wrongList) {
      const btns = [];
      if (!reviewMode) {
        if (wrongList.length && !retryMode) {
          btns.push(el('button', { class: 'btn', onclick: startRetrySession }, [iconLabel('review', `${t(L, 'retryMistakes')} (${wrongList.length})`)]));
        }
        const nextId = nextLessonInSection(lessonId);
        btns.push(el('button', {
          class: 'btn btn-primary',
          onclick: () => nextId ? navigate('lesson', [nextId]) : navigate('section', [lesson.section]),
        }, [iconLabel(nextId ? 'arrowRight' : 'books', nextId ? t(L, 'nextLesson') : t(L, 'backToSection'))]));
        btns.push(el('a', { class: 'btn', href: `#/section/${lesson.section}` }, [iconLabel('grid', t(L, 'backToSection'))]));
      } else {
        btns.push(el('button', { class: 'btn btn-primary', onclick: () => navigate('review') }, [iconLabel('review', t(L, 'navReview'))]));
      }
      return btns;
    }
  }

  /** Re-run only the exercises answered wrong/skipped in this session. */
  function startRetrySession() {
    const wrongItems = results
      .filter((r) => r && (r.status === 'incorrect' || r.status === 'skipped'))
      .map((r) => r.ex);
    if (!wrongItems.length) return;
    originalCount = exercises.length;
    exercises = wrongItems.map((w) => ({
      ...w,
      origIdx: w.origIdx ?? originalExercises.findIndex((o) => o.id === w.id),
    }));
    idx = 0;
    retryMode = true;
    results = new Array(exercises.length).fill(null);
    sessionStart = Date.now();
    sessionXp = 0; // retries earn nothing new — the XP ledger forbids double awards
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderExercise();
  }

  renderExercise();
}

/** Error state with friendly message + home button. */
export function renderErrorState(container, lang, err) {
  const L = lang || 'en';
  console.error('lesson error:', err);
  container.replaceChildren(el('div', { class: 'state-box' }, [
    el('div', { class: 'big' }, [icon('alert')]),
    el('h3', { text: t(L, 'errorTitle') }),
    el('p', { text: err && err.message ? err.message : t(L, 'lessonError') }),
    el('a', { class: 'btn btn-primary mt', href: '#/', text: t(L, 'errorBack') }),
  ]));
}
