/* ============================================================
   LingoStep — lesson-schema.js
   Structural validation shared by:
   - js/lesson-loader.js (browser, before rendering)
   - scripts/validate-lessons.js (Node, CI)
   - tests/lesson-tests.js
   Pure module: no DOM, no browser APIs.
   ============================================================ */

export const SECTIONS = [
  'foundations', 'daily-life', 'home-family', 'food-services', 'travel',
  'health-emergency', 'social-communication', 'work-money',
  'education-digital', 'complex-rights', 'specialized',
];
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const EX_TYPES = ['listen-and-type', 'fill-blank', 'word-order', 'multiple-choice'];

/** Validate a lesson object. Returns array of error strings (empty = valid). */
export function validateLessonStructure(lesson, expectedId = null) {
  const errors = [];
  if (!lesson || typeof lesson !== 'object') return ['lesson is not an object'];

  // identity
  if (typeof lesson.id !== 'string' || !/^lesson-\d{3,4}$/.test(lesson.id)) {
    errors.push(`bad id: ${JSON.stringify(lesson.id)}`);
  }
  if (expectedId && lesson.id !== expectedId) {
    errors.push(`id mismatch: file expects ${expectedId}, found ${lesson.id}`);
  }
  if (typeof lesson.title !== 'string' || lesson.title.trim().length < 3) errors.push('missing/short title');
  if (typeof lesson.titleAr !== 'string' || lesson.titleAr.trim().length < 3) errors.push('missing/short titleAr');
  if (!SECTIONS.includes(lesson.section)) errors.push(`bad section: ${lesson.section}`);
  if (!LEVELS.includes(lesson.level)) errors.push(`bad level: ${lesson.level}`);
  if (!Number.isFinite(lesson.estimatedMinutes) || lesson.estimatedMinutes <= 0) errors.push('bad estimatedMinutes');

  if (!Array.isArray(lesson.objectives) || lesson.objectives.length < 2
    || lesson.objectives.some((o) => typeof o !== 'string' || !o.trim())) {
    errors.push('objectives must be an array of 2+ non-empty strings');
  }

  // grammar block
  const g = lesson.grammar;
  if (!g || typeof g !== 'object') {
    errors.push('missing grammar block');
  } else {
    if (typeof g.explanation !== 'string' || g.explanation.trim().length < 30) errors.push('grammar.explanation too short');
    if (typeof g.explanationAr !== 'string' || g.explanationAr.trim().length < 20) errors.push('grammar.explanationAr too short');
    if (!Array.isArray(g.examples) || g.examples.length < 2
      || g.examples.some((e) => !e || typeof e.en !== 'string' || typeof e.ar !== 'string' || !e.en.trim() || !e.ar.trim())) {
      errors.push('grammar.examples must list 2+ {en, ar} pairs');
    }
  }

  // vocabulary
  if (!Array.isArray(lesson.vocabulary) || lesson.vocabulary.length < 4) {
    errors.push('vocabulary must list at least 4 words');
  } else {
    lesson.vocabulary.forEach((v, i) => {
      if (!v || typeof v.word !== 'string' || !v.word.trim()) errors.push(`vocabulary[${i}].word missing`);
      if (!v || typeof v.meaningAr !== 'string' || !v.meaningAr.trim()) errors.push(`vocabulary[${i}].meaningAr missing`);
      if (!v || typeof v.example !== 'string' || !v.example.trim()) errors.push(`vocabulary[${i}].example missing`);
    });
  }

  // exercises
  if (!Array.isArray(lesson.exercises) || lesson.exercises.length < 10) {
    errors.push(`exercises too few (${Array.isArray(lesson.exercises) ? lesson.exercises.length : 0})`);
    return errors;
  }

  const exIds = new Set();
  const seenSentences = new Map();
  lesson.exercises.forEach((ex, i) => {
    const ctx = `ex[${i}]`;
    if (!ex || typeof ex !== 'object') { errors.push(`${ctx} not an object`); return; }
    const expectedExId = `${lesson.id}-ex-${String(i + 1).padStart(3, '0')}`;
    if (ex.id !== expectedExId) errors.push(`${ctx} id should be ${expectedExId}, got ${ex.id}`);
    if (exIds.has(ex.id)) errors.push(`${ctx} duplicate exercise id ${ex.id}`);
    exIds.add(ex.id);

    if (!EX_TYPES.includes(ex.type)) errors.push(`${ctx} bad type ${ex.type}`);
    if (!Number.isInteger(ex.difficulty) || ex.difficulty < 1 || ex.difficulty > 3) errors.push(`${ctx} bad difficulty`);
    if (!Array.isArray(ex.grammarTags) || !ex.grammarTags.length
      || ex.grammarTags.some((tg) => typeof tg !== 'string' || !/^[a-z0-9-]+$/.test(tg))) {
      errors.push(`${ctx} bad grammarTags`);
    }

    if (ex.type === 'listen-and-type') {
      if (typeof ex.en !== 'string' || ex.en.trim().length < 8) errors.push(`${ctx} en too short`);
      if (typeof ex.ar !== 'string' || !ex.ar.trim()) errors.push(`${ctx} ar missing`);
      const list = Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers : [];
      if (!list.length) errors.push(`${ctx} acceptedAnswers empty`);
      if (!list.some((a) => normalizeForDup(a) === normalizeForDup(ex.en))) {
        errors.push(`${ctx} acceptedAnswers must include the canonical sentence`);
      }
      const key = normalizeForDup(ex.en);
      if (seenSentences.has(key)) errors.push(`${ctx} duplicate sentence inside lesson: "${ex.en}"`);
      seenSentences.set(key, ex.id);
    } else if (ex.type === 'fill-blank') {
      if (typeof ex.display !== 'string' || !ex.display.includes('___')) errors.push(`${ctx} fill-blank display must contain ___`);
      if (typeof ex.blankWord !== 'string' || !ex.blankWord.trim()) errors.push(`${ctx} fill-blank blankWord missing`);
      if (!Array.isArray(ex.acceptedAnswers) || !ex.acceptedAnswers.length) errors.push(`${ctx} fill-blank acceptedAnswers empty`);
    } else if (ex.type === 'word-order') {
      if (!Array.isArray(ex.words) || ex.words.length < 3) errors.push(`${ctx} word-order words[] too short`);
      if (typeof ex.en !== 'string' || !ex.en.trim()) errors.push(`${ctx} word-order en missing`);
      if (typeof ex.ar !== 'string' || !ex.ar.trim()) errors.push(`${ctx} word-order ar missing`);
    } else if (ex.type === 'multiple-choice') {
      if (typeof ex.question !== 'string' || !ex.question.trim()) errors.push(`${ctx} mc question missing`);
      if (!Array.isArray(ex.options) || ex.options.length < 3 || ex.options.length > 4) errors.push(`${ctx} mc options must be 3-4`);
      if (!Number.isInteger(ex.answerIndex) || ex.answerIndex < 0 || ex.answerIndex >= (ex.options || []).length) {
        errors.push(`${ctx} mc answerIndex out of range`);
      }
      if (typeof ex.ar !== 'string' || !ex.ar.trim()) errors.push(`${ctx} mc ar missing`);
    }
  });

  return errors;
}

/** Normalized duplicate key: lowercase, collapsed whitespace. */
export function normalizeForDup(s) {
  return String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}
