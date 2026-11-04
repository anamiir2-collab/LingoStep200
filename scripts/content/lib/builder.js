/* ============================================================
   Content engine — builder.js
   Turns pattern + bank definitions into lesson JS files with
   guaranteed-unique sentences, sequential exercise ids and a
   deterministic interleave of exercise types.
   ============================================================ */

import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { normalizeForDup } from '../../../js/lesson-schema.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const LESSONS_DIR = join(ROOT, 'lessons');

/* ---------- global uniqueness registry ---------- */
const seenSentences = new Set();

export function resetRegistry() {
  seenSentences.clear();
}

export function isSeen(en) {
  return seenSentences.has(normalizeForDup(en));
}

export function markSeen(en) {
  seenSentences.add(normalizeForDup(en));
}

export function registrySize() {
  return seenSentences.size;
}

/* ---------- slot expansion ---------- */

function slotValues(spec, ctx) {
  if (typeof spec === 'function') return spec(ctx);
  return spec;
}

/**
 * expandPattern(p) → array of {en, ar}
 * p = { tmpl, arTmpl, slots: {Name: values | (ctx) => values}, filter?, limit? }
 * Slots are evaluated in definition order; a slot function receives
 * previously resolved slot values (ctx.S etc.).
 */
export function expandPattern(p) {
  const slotNames = Object.keys(p.slots || {});
  const ctx = {};
  const results = [];

  // Slots resolve lazily during the walk, in definition order.
  // A slot function receives ctx with all EARLIER slot values —
  // so define dependent slots after their dependencies.
  function walk(i) {
    if (i === slotNames.length) {
      if (p.filter && !p.filter(ctx)) return;
      let en = p.tmpl;
      let ar = p.arTmpl;
      for (const name of slotNames) {
        en = en.replaceAll(`{${name}}`, ctx[name].en);
        ar = ar.replaceAll(`{${name}_ar}`, ctx[name].ar);
      }
      results.push({ en, ar });
      return;
    }
    const name = slotNames[i];
    const spec = p.slots[name];
    let values;
    try {
      values = typeof spec === 'function' ? spec(ctx) : spec;
    } catch (err) {
      const dump = Object.fromEntries(Object.entries(ctx).map(([k, v]) => [k, typeof v === 'object' && v ? JSON.stringify(v).slice(0, 60) : String(v)]));
      throw new Error(`[expandPattern] slot "${name}" failed in tmpl "${p.tmpl}" (ctx: ${JSON.stringify(dump).slice(0, 300)}): ${err.message}`);
    }
    for (const v of values) {
      ctx[name] = typeof v === 'object' ? v : { en: v, ar: v };
      walk(i + 1);
    }
  }
  walk(0);

  if (p.limit && results.length > p.limit) {
    // deterministic thinning: stride evenly across the pool
    const stride = results.length / p.limit;
    const out = [];
    for (let k = 0; k < p.limit; k++) out.push(results[Math.floor(k * stride)]);
    return out;
  }
  return results;
}

/** Expand a list of patterns (each may carry tags/difficulty meta). */
export function expandAll(patterns) {
  const out = [];
  for (const p of patterns) {
    const { tags = [], difficulty = 1, ...pat } = p;
    for (const pair of expandPattern(pat)) {
      out.push({ ...pair, tags, difficulty });
    }
  }
  return out;
}

/* ---------- pools → exercises ---------- */

function ltEx(lessonId, n, pair, extra = {}) {
  return {
    id: `${lessonId}-ex-${String(n).padStart(3, '0')}`,
    type: 'listen-and-type',
    en: pair.en,
    ar: pair.ar,
    acceptedAnswers: extra.acceptedAnswers || [pair.en],
    grammarTags: pair.tags || [],
    difficulty: pair.difficulty || 1,
    ...(pair.hint ? { hint: pair.hint } : {}),
  };
}

function fillEx(lessonId, n, f) {
  return {
    id: `${lessonId}-ex-${String(n).padStart(3, '0')}`,
    type: 'fill-blank',
    display: f.display,
    blankWord: f.blankWord,
    en: f.en || f.display.replace('___', f.blankWord),
    ar: f.ar,
    acceptedAnswers: f.acceptedAnswers || [f.blankWord],
    grammarTags: f.tags || [],
    difficulty: f.difficulty || 2,
    ...(f.hint ? { hint: f.hint } : {}),
    ...(f.explanation ? { explanation: f.explanation } : {}),
  };
}

function orderEx(lessonId, n, o) {
  const clean = o.en.replace(/[.!?]+$/, '');
  const words = clean.split(' ').filter(Boolean);
  // deterministic rotation so the scramble never equals the answer
  const rotated = words.length > 2 ? [...words.slice(1), words[0]] : [...words].reverse();
  return {
    id: `${lessonId}-ex-${String(n).padStart(3, '0')}`,
    type: 'word-order',
    en: o.en,
    ar: o.ar,
    words: rotated,
    acceptedAnswers: [o.en, clean],
    grammarTags: o.tags || [],
    difficulty: o.difficulty || 2,
  };
}

function mcEx(lessonId, n, m) {
  return {
    id: `${lessonId}-ex-${String(n).padStart(3, '0')}`,
    type: 'multiple-choice',
    question: m.question,
    options: m.options,
    answerIndex: m.answerIndex,
    ar: m.ar,
    grammarTags: m.tags || [],
    difficulty: m.difficulty || 2,
    ...(m.hint ? { hint: m.hint } : {}),
    ...(m.explanation ? { explanation: m.explanation } : {}),
  };
}

/**
 * assembleLesson(config) → lesson object
 * config: {
 *   id, section, title, titleAr, level, minutes,
 *   objectives: [...],
 *   grammar: {explanation, explanationAr, examples:[{en,ar}]},
 *   vocabulary: [{word, meaningAr, example}],
 *   pools: { lt: pairs[], fill: [], order: [], mc: [] },
 *   count: 55 (default),
 * }
 * Slot plan per lesson (fixed, collision-free positions for N=55):
 *   fills at 4,13,22,31,40,49 · orders at 8,20,34,48 · mc at 6,26,46
 * → 41 listen-and-type + 13 others = 55 exercises,
 *    of which 51 carry a full English practice sentence.
 * Only unseen sentences are used; every used sentence is marked seen.
 * Throws if the lt pool cannot cover the required listen-and-type slots.
 */
export function assembleLesson(config) {
  const count = config.count ?? 55;
  const { pools } = config;
  const ltPool = pools.lt || [];
  const fillPool = pools.fill || [];
  const orderPool = pools.order || [];
  const mcPool = pools.mc || [];

  const FILL_IDX = [4, 13, 22, 31, 40, 49];
  const ORDER_IDX = [8, 20, 34, 48];
  const MC_IDX = [6, 26, 46];

  // filter + mark unique lt pairs (global + intra-pool)
  const usedLocal = new Set();
  const ltFresh = [];
  for (const p of ltPool) {
    const key = normalizeForDup(p.en);
    if (isSeen(p.en) || usedLocal.has(key)) continue;
    usedLocal.add(key);
    ltFresh.push(p);
  }

  // fresh (globally unique) fill/order pools, capped to slot counts.
  // NOTE: a fill/order may repeat a sentence that appears as listen-and-type
  // in the SAME lesson (dictation → gap-fill → scramble of one sentence is
  // standard practice); global cross-lesson uniqueness is still enforced.
  const seenFill = new Set();
  const freshFills = [];
  for (const f of fillPool) {
    const key = normalizeForDup(f.en || f.display);
    if (isSeen(f.en || f.display) || seenFill.has(key)) continue;
    seenFill.add(key);
    freshFills.push(f);
    if (freshFills.length >= FILL_IDX.length) break;
  }
  const seenOrder = new Set();
  const freshOrders = [];
  for (const o of orderPool) {
    const key = normalizeForDup(o.en);
    if (isSeen(o.en) || seenOrder.has(key)) continue;
    seenOrder.add(key);
    freshOrders.push(o);
    if (freshOrders.length >= ORDER_IDX.length) break;
  }
  const freshMcs = mcPool.slice(0, MC_IDX.length);

  const plan = new Array(count).fill('lt');
  FILL_IDX.slice(0, freshFills.length).forEach((i) => { if (i < count) plan[i] = 'fill'; });
  ORDER_IDX.slice(0, freshOrders.length).forEach((i) => { if (i < count) plan[i] = 'order'; });
  MC_IDX.slice(0, freshMcs.length).forEach((i) => { if (i < count) plan[i] = 'mc'; });

  const ltSlots = plan.filter((k) => k === 'lt').length;
  if (ltFresh.length < ltSlots) {
    throw new Error(
      `[${config.id}] not enough unique sentences: need ${ltSlots}, have ${ltFresh.length} fresh listen-and-type pairs. Add more patterns.`,
    );
  }

  // interleave deterministically
  const exercises = [];
  let ltIdx = 0, fillIdx = 0, orderIdx = 0, mcIdx = 0;
  let n = 1;
  for (let i = 0; i < count; i++) {
    const kind = plan[i];
    if (kind === 'fill' && fillIdx < freshFills.length) {
      const f = freshFills[fillIdx++];
      usedLocal.add(normalizeForDup(f.en || f.display));
      markSeen(f.en || f.display);
      exercises.push(fillEx(config.id, n++, f));
      continue;
    }
    if (kind === 'order' && orderIdx < freshOrders.length) {
      const o = freshOrders[orderIdx++];
      usedLocal.add(normalizeForDup(o.en));
      markSeen(o.en);
      exercises.push(orderEx(config.id, n++, o));
      continue;
    }
    if (kind === 'mc' && mcIdx < freshMcs.length) {
      exercises.push(mcEx(config.id, n++, freshMcs[mcIdx++]));
      continue;
    }
    const pair = ltFresh[ltIdx++];
    markSeen(pair.en);
    exercises.push(ltEx(config.id, n++, pair));
  }

  return {
    id: config.id,
    title: config.title,
    titleAr: config.titleAr,
    section: config.section,
    level: config.level,
    estimatedMinutes: config.minutes || 15,
    objectives: config.objectives,
    grammar: config.grammar,
    vocabulary: config.vocabulary,
    exercises,
  };
}

/* ---------- file output ---------- */

export function writeLessonFile(lesson) {
  const dir = join(LESSONS_DIR, lesson.section);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${lesson.id}.js`);
  const body = JSON.stringify(lesson, (k, v) => v, 2);
  writeFileSync(file, `// LingoStep lesson — auto-registered in data/lesson-manifest.js\n// Grammar topic: ${lesson.title}\nexport default ${body};\n`, 'utf-8');
  return file;
}

/** Build objectives convenience */
export function objs(...list) {
  return list.filter(Boolean);
}

/* ---------- exercise-from-pair helpers (used by all generators) ---------- */

/** Turn a sentence pair into a fill-blank exercise around `word`. */
export function fillFrom(pair, word, opts = {}) {
  const idx = pair.en.indexOf(word);
  if (idx < 0) throw new Error(`fillFrom: "${word}" not in "${pair.en}"`);
  const display = pair.en.slice(0, idx) + '___' + pair.en.slice(idx + word.length);
  const cap = word[0].toUpperCase() + word.slice(1);
  return {
    display,
    blankWord: word,
    en: pair.en,
    ar: pair.ar,
    acceptedAnswers: [word, cap, word.toLowerCase()],
    tags: pair.tags || [],
    difficulty: opts.difficulty ?? 2,
    ...(opts.hint ? { hint: opts.hint } : {}),
  };
}

/** Turn a sentence pair into a word-order exercise. */
export function orderFrom(pair, opts = {}) {
  return { en: pair.en, ar: pair.ar, tags: pair.tags || [], difficulty: opts.difficulty ?? 2 };
}

/** Turn a pattern-expansion function output into mc distractor questions. */
export function capFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
