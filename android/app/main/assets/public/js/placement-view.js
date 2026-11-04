/* ============================================================
   LingoStep — placement-view.js
   UI for the estimated level check (#/placement).
   Uses only shipped lesson content (real exercises), renders an
   honest "estimate" result with lesson suggestions — never locks
   or hides anything. Works offline once lessons are cached.
   ============================================================ */

import { el, toast } from './utils.js';
import { icon, iconLabel } from './icons.js';
import { t } from './i18n.js';
import { kvGet, kvSet } from './storage.js';
import { getSettings } from './settings.js';
import { getManifest } from './lesson-loader.js';
import { loadLesson } from './lesson-loader.js';
import { buildPlacementPlan, pickExerciseFromLesson, isAnswerCorrect, estimateLevel, recommendedLessons, isValidPlacementResult } from './placement.js';
import { createLetterTiles } from './touch-typing.js';

const K_RESULT = 'placementResult';

/** Tiny word-order widget for the placement check. */
function buildWordOrderWidget(ex, onAnswer) {
  const answerRow = el('div', { class: 'place-answer-row', dir: 'ltr' });
  const bank = el('div', { class: 'word-order-bank' });
  const placed = [];
  const chips = [...ex.words].map((w, i) => {
    const chip = el('button', { class: 'wo-chip', text: w, 'data-i': String(i) });
    chip.addEventListener('click', () => {
      if (chip.classList.contains('used')) return;
      chip.classList.add('used');
      placed.push({ w, chip });
      const placedChip = el('button', { class: 'wo-chip placed', text: w });
      placedChip.addEventListener('click', () => {
        const at = placed.findIndex((p) => p.chip === chip);
        if (at >= 0) placed.splice(at, 1);
        chip.classList.remove('used');
        placedChip.remove();
      });
      answerRow.append(placedChip);
    });
    bank.append(chip);
    return chip;
  });
  const checkBtn = el('button', { class: 'btn btn-primary', text: t(getSettings().lang, 'checkAnswer') }, [String('')]);
  checkBtn.addEventListener('click', () => {
    const built = placed.map((p) => p.w).join(' ');
    if (placed.length !== ex.words.length) { toast(t(getSettings().lang, 'wordOrderPrompt')); return; }
    onAnswer(built);
  });
  const resetBtn = el('button', { class: 'btn btn-ghost btn-sm', text: t(getSettings().lang, 'resetWordOrder') });
  resetBtn.addEventListener('click', () => {
    placed.length = 0;
    answerRow.replaceChildren();
    chips.forEach((c) => c.classList.remove('used'));
  });
  return el('div', {}, [answerRow, bank, el('div', { class: 'card-actions', style: { marginTop: '.6rem' } }, [checkBtn, resetBtn])]);
}

export async function renderPlacementView(view) {
  const L = getSettings().lang;
  const T = (key, vars) => t(L, key, vars);

  const saved = await kvGet(K_RESULT, null);
  const hasResult = isValidPlacementResult(saved);

  /* ---------------- result screen (also entry when a result exists) ---------------- */
  function renderResult(result, { fresh = false } = {}) {
    const recs = recommendedLessons(result, getManifest(), { limit: 6 });
    const acc = result.answered ? Math.round((result.correct / result.answered) * 100) : 0;
    const confLabel = { low: '±', medium: '±±', high: '±±±' }[result.confidence] || '±';

    const resultCard = el('div', { class: 'card center' }, [
      el('span', { class: 'chip', text: T('placeEstimated') }),
      el('div', { class: 'place-level-big', text: result.level }),
      el('p', { class: 'muted small', text: `${T('placeAccuracy')}: ${acc}% · ${result.answered} · ${confLabel}` }),
      el('p', { class: 'muted small', text: T('placeResultNote') }),
      ...(fresh ? [el('p', { class: 'small ok-text', text: T('placeSaved') })] : []),
    ]);

    const weakCard = (result.weakTags || []).length
      ? el('div', { class: 'card' }, [
          el('h3', { class: 'card-title' }, [iconLabel('bulb', T('placeWeakTopics'))]),
          el('div', { class: 'wd-chips' }, result.weakTags.map((tg) => el('span', { class: 'wd-token wd-missing', dir: 'ltr', text: tg }))),
        ])
      : null;

    const recCard = recs.length
      ? el('div', { class: 'card' }, [
          el('h3', { class: 'card-title' }, [iconLabel('books', T('placeRecommended'))]),
          el('div', { class: 'lesson-list' }, recs.map((r) => el('a', { class: 'lesson-item', href: `#/lesson/${r.id}` }, [
            el('span', { class: 'lesson-num', text: r.level }),
            el('div', { class: 'lesson-titles' }, [
              el('div', { class: 't', text: r.title }),
              el('div', { class: 's', text: r.titleAr }),
            ]),
            icon('arrowRight'),
          ]))),
        ])
      : null;

    view.replaceChildren(
      el('div', { class: 'page-head' }, [
        el('h2', { text: T('placeResultTitle') }),
        el('p', { text: T('placeTitle') }),
      ]),
      resultCard,
      ...(weakCard ? [weakCard] : []),
      ...(recCard ? [recCard] : []),
      el('div', { class: 'card-actions', style: { marginTop: '1rem' } }, [
        el('button', { class: 'btn', onclick: startSession }, [iconLabel('review', T('placeRetake'))]),
        el('a', { class: 'btn btn-primary', href: '#/' }, [iconLabel('home', T('placeBack'))]),
      ]),
    );
  }

  /* ---------------- intro screen ---------------- */
  function renderIntro() {
    const startBtn = el('button', { class: 'btn btn-primary', onclick: startSession }, [iconLabel('play', T('placeStart'))]);
    view.replaceChildren(
      el('div', { class: 'page-head' }, [
        el('h2', { text: T('placeTitle') }),
        el('p', { text: T('placeIntro') }),
      ]),
      el('div', { class: 'card center' }, [
        el('div', { class: 'place-intro-levels', dir: 'ltr' }, LEVELS_CHIPS()),
        startBtn,
        hasResult ? el('button', { class: 'btn mt', onclick: () => renderResult(saved) }, [iconLabel('chart', T('placeViewResult'))]) : null,
      ].filter(Boolean)),
      !hasResult ? el('p', { class: 'muted small center', text: T('placeNoResult') }) : null,
    );
  }

  function LEVELS_CHIPS() {
    return ['A1', 'A2', 'B1', 'B2', 'C1'].map((lv) => el('span', { class: 'chip', text: lv }));
  }

  /* ---------------- session ---------------- */
  async function startSession() {
    loading();
    const plan = buildPlacementPlan(getManifest(), { perLevel: 3 });
    if (!plan.length) { renderIntro(); return; }

    const results = []; // { planIndex, level, exerciseId, correct, tags }
    let step = 0;
    let bandFailed = false;

    function loading() {
      view.replaceChildren(el('div', { class: 'state-box' }, [el('div', { class: 'spinner', role: 'status' })]));
    }

    function finish() {
      const est = estimateLevel(results.map((r) => ({ ...r, planIndex: r.planIndex })));
      const record = {
        level: est.level,
        confidence: est.confidence,
        answered: est.answered,
        correct: est.correct,
        weakTags: est.weakTags,
        at: Date.now(),
      };
      kvSet(K_RESULT, record).catch(() => {});
      renderResult(record, { fresh: true });
    }

    async function next() {
      // adaptive early stop: once a band scores below half, later bands
      // would measure frustration, not ability — end the session there
      if (bandFailed || step >= plan.length) { finish(); return; }
      const planStep = plan[step];
      let exercise = null;
      try {
        const lesson = await loadLesson(planStep.lessonId);
        exercise = pickExerciseFromLesson(lesson, planStep);
      } catch { /* lesson unavailable offline → skip the step */ }
      if (!exercise) { step += 1; next(); return; }

      const answered = (correct) => {
        if (results.some((r) => r.exerciseId === exercise.id)) return; // never double-count a question
        results.push({
          planIndex: step,
          level: planStep.level,
          exerciseId: exercise.id,
          correct: Boolean(correct),
          tags: exercise.grammarTags || [],
        });
        step += 1;
        if (!correct && endOfBand(step)) bandFailed = true;
        next();
      };

      renderQuestion(planStep, exercise, answered);
    }

    function endOfBand(afterStep) {
      const perLevel = 3;
      const bandEnd = Math.floor((afterStep - 1) / perLevel) * perLevel + perLevel;
      return afterStep === bandEnd;
    }

    function renderQuestion(planStep, exercise, answered) {
      const bodyBox = el('div', { class: 'card' });
      const head = el('div', { class: 'row-between' }, [
        el('span', { class: 'chip', text: T('placeQuestion', { i: step + 1, n: plan.length }) }),
        el('span', { class: 'chip chip-level', text: planStep.level }),
      ]);
      bodyBox.append(head);

      const markAndContinue = (correct, noteEl) => {
        const verdict = el('div', { class: `feedback ${correct ? 'ok' : 'bad'}`, role: 'status' }, [
          el('div', { class: 'fb-title' }, [iconLabel(correct ? 'checkCircle' : 'xCircle', t(L, correct ? 'correct' : 'incorrect'))]),
          ...(noteEl ? [noteEl] : []),
        ]);
        bodyBox.append(verdict);
        bodyBox.querySelectorAll('button, input').forEach((n) => { if (n !== verdict) n.disabled = true; });
        setTimeout(answered, 900, correct);
      };

      if (exercise.type === 'multiple-choice') {
        bodyBox.append(el('div', { class: 'sentence-text', dir: 'ltr', text: exercise.question }));
        const optsBox = el('div', { class: 'mc-options', role: 'listbox' });
        let picked = false;
        exercise.options.forEach((opt, i) => {
          const b = el('button', { class: 'mc-option', text: opt, role: 'option' });
          b.addEventListener('click', () => {
            if (picked) return;
            picked = true;
            const correct = i === exercise.answerIndex;
            b.classList.add(correct ? 'correct' : 'wrong');
            if (!correct) optsBox.children[exercise.answerIndex].classList.add('correct');
            markAndContinue(correct);
          });
          optsBox.append(b);
        });
        bodyBox.append(optsBox);
      } else if (exercise.type === 'fill-blank') {
        bodyBox.append(el('div', { class: 'blank-display', dir: 'ltr', text: exercise.display }));
        // v8: keyboard-free letter tiles — same question, same validation
        const tiles = createLetterTiles({
          source: exercise.blankWord,
          ariaLabel: T('fillPrompt'),
        });
        const checkBtn = el('button', { class: 'btn btn-primary', text: T('checkAnswer') });
        const row = el('div', { class: 'answer-row' }, [tiles.root, checkBtn]);
        bodyBox.append(row);
        const submit = () => {
          if (!tiles.getValue().trim()) return;
          markAndContinue(isAnswerCorrect(exercise, tiles.getValue()));
        };
        checkBtn.addEventListener('click', submit);
      } else if (exercise.type === 'word-order') {
        bodyBox.append(el('div', { class: 'prompt-label', text: T('wordOrderPrompt') }));
        bodyBox.append(buildWordOrderWidget(exercise, (built) => markAndContinue(isAnswerCorrect(exercise, built))));
      }

      view.replaceChildren(
        el('div', { class: 'page-head' }, [
          el('h2', { text: T('placeTitle') }),
          el('p', { class: 'muted small', text: T('placeIntro') }),
        ]),
        el('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': step, 'aria-valuemin': 0, 'aria-valuemax': plan.length }, [el('span', { style: { width: `${Math.round((step / plan.length) * 100)}%` } })]),
        bodyBox,
      );
    }

    next();
  }

  if (hasResult) renderIntro();
  else renderIntro();
}
