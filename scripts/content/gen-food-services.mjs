/* ============================================================
   gen-food-services.mjs — restores the 25 missing food-services
   lessons (071–095) from per-topic data banks written under
   scripts/content/banks/food-services/*.json.

   The bank files carry ONLY hand-written content (sentences,
   translations, vocabulary). This generator assembles them into
   schema-perfect lesson modules with the EXACT composition frozen
   in scripts/inventory-baseline.json:

     lesson-071..094 → 55 exercises (42 listen-and-type, 6 fill-blank,
                       4 word-order, 3 multiple-choice)
     lesson-095      → 70 exercises (50 listen-and-type, 9 fill-blank,
                       6 word-order, 5 multiple-choice)

   Accepted-answer budget (must total 1,721 across the 25 lessons):
     - listen-and-type: 40×1 + 2×2 variants (review: 47×1 + 3×2)
     - fill-blank:      2 accepted answers each (case variants)
     - word-order:      3 accepted answers each (punctuation variants)
     - multiple-choice: 0
   Vocabulary budget: exactly 12 entries per lesson (300 total).

   Output: lessons/food-services/lesson-0NN.js written as
   `export default {…json…};` (strict JSON body — required by
   tests/content-parity-tests.js which JSON.parses the module body).

   Usage: node scripts/content/gen-food-services.mjs [--check]
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const BANK_DIR = path.join(ROOT, 'scripts', 'content', 'banks', 'food-services');
const OUT_DIR = path.join(ROOT, 'lessons', 'food-services');

/* ---------- manifest metadata (id → title/titleAr/level/section) ---------- */
const META = {
  'lesson-071': ['Ordering Food at a Restaurant', 'طلب الطعام في المطعم'],
  'lesson-072': ['Food Allergies and Dietary Needs', 'الحساسية الغذائية والاحتياجات الغذائية'],
  'lesson-073': ['Paying the Bill and Tipping', 'الحساب والإكرامية'],
  'lesson-074': ['Supermarket Shopping', 'التسوق في السوبر ماركت'],
  'lesson-075': ['Buying Clothes', 'شراء الملابس'],
  'lesson-076': ['Sizes and Colors', 'المقاسات والألوان'],
  'lesson-077': ['Returns and Exchanges', 'الاسترجاع والاستبدال'],
  'lesson-078': ['Negotiating Prices', 'التفاوض على السعر'],
  'lesson-079': ['Online Shopping', 'التسوق عبر الإنترنت'],
  'lesson-080': ['Deliveries and Orders', 'التوصيل والطلبات'],
  'lesson-081': ['At the Pharmacy', 'زيارة الصيدلية'],
  'lesson-082': ['At the Barber or Hair Salon', 'الحلاق ومصفف الشعر'],
  'lesson-083': ['Laundry and Dry Cleaning', 'المغسلة والتنظيف الجاف'],
  'lesson-084': ['Requesting a Repair', 'طلب إصلاح شيء'],
  'lesson-085': ['Customer Service', 'خدمة العملاء'],
  'lesson-086': ['Making a Simple Complaint', 'تقديم شكوى بسيطة'],
  'lesson-087': ['Booking a Service Appointment', 'حجز موعد لخدمة'],
  'lesson-088': ['Banks and ATMs', 'البنك والصراف الآلي'],
  'lesson-089': ['At the Post Office', 'مكتب البريد'],
  'lesson-090': ['At a Government Office', 'المكتب الحكومي'],
  'lesson-091': ['Gym Membership', 'الاشتراك في صالة رياضية'],
  'lesson-092': ['Buying Cinema Tickets', 'شراء تذاكر السينما'],
  'lesson-093': ['Restaurant Reservations', 'حجز مطعم'],
  'lesson-094': ['Street Food', 'شراء الطعام من عربات الشارع'],
  'lesson-095': ['Shopping and Services Review', 'مراجعة الطعام والتسوق والخدمات'],
};

const SECTION = 'food-services';
const LEVEL = 'A2';
const REVIEW_ID = 'lesson-095';

/* composition per lesson id */
function compositionFor(id) {
  return id === REVIEW_ID
    ? { total: 70, lt: 50, fb: 9, wo: 6, mc: 5, ltDoubles: 3 }
    : { total: 55, lt: 42, fb: 6, wo: 4, mc: 3, ltDoubles: 2 };
}

/* ---------- validation of one bank ---------- */
function fail(id, msg) { throw new Error(`[${id}] ${msg}`); }

function validateBank(bank, id) {
  const comp = compositionFor(id);
  const seen = new Set();
  const dup = (s, what) => {
    const key = String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) fail(id, `duplicate sentence in ${what}: "${s}"`);
    seen.add(key);
  };

  if (bank.id !== id) fail(id, `bank id mismatch: ${bank.id}`);
  if (!Array.isArray(bank.lt) || bank.lt.length !== comp.lt) fail(id, `lt must have exactly ${comp.lt} sentences, got ${bank.lt?.length}`);
  if (!Array.isArray(bank.fb) || bank.fb.length !== comp.fb) fail(id, `fb must have exactly ${comp.fb} entries, got ${bank.fb?.length}`);
  if (!Array.isArray(bank.wo) || bank.wo.length !== comp.wo) fail(id, `wo must have exactly ${comp.wo} entries, got ${bank.wo?.length}`);
  if (!Array.isArray(bank.mc) || bank.mc.length !== comp.mc) fail(id, `mc must have exactly ${comp.mc} entries, got ${bank.mc?.length}`);
  if (!Array.isArray(bank.vocabulary) || bank.vocabulary.length !== 12) fail(id, `vocabulary must have exactly 12 entries, got ${bank.vocabulary?.length}`);

  const doubles = bank.lt.filter((x) => typeof x.alt === 'string' && x.alt.trim());
  if (doubles.length !== comp.ltDoubles) fail(id, `lt entries with "alt" variant: expected ${comp.ltDoubles}, got ${doubles.length}`);

  bank.lt.forEach((x, i) => {
    if (typeof x.en !== 'string' || x.en.trim().length < 8) fail(id, `lt[${i}].en too short`);
    if (typeof x.ar !== 'string' || !x.ar.trim()) fail(id, `lt[${i}].ar missing`);
    if (x.alt != null && (typeof x.alt !== 'string' || !x.alt.trim())) fail(id, `lt[${i}].alt empty`);
    dup(x.en, `lt[${i}]`);
  });
  bank.fb.forEach((x, i) => {
    if (typeof x.display !== 'string' || !x.display.includes('___')) fail(id, `fb[${i}].display must contain ___`);
    if (typeof x.blank !== 'string' || !x.blank.trim() || /\s/.test(x.blank.trim())) fail(id, `fb[${i}].blank must be a single word`);
    if (typeof x.en !== 'string' || !x.en.trim()) fail(id, `fb[${i}].en missing`);
    if (typeof x.ar !== 'string' || !x.ar.trim()) fail(id, `fb[${i}].ar missing`);
    if (!x.en.includes(x.blank)) fail(id, `fb[${i}].en should contain the blank word`);
    dup(x.en, `fb[${i}]`);
  });
  bank.wo.forEach((x, i) => {
    if (typeof x.en !== 'string' || x.en.trim().split(/\s+/).length < 3) fail(id, `wo[${i}].en needs ≥3 words`);
    if (typeof x.ar !== 'string' || !x.ar.trim()) fail(id, `wo[${i}].ar missing`);
    dup(x.en, `wo[${i}]`);
  });
  bank.mc.forEach((x, i) => {
    if (typeof x.question !== 'string' || !x.question.trim()) fail(id, `mc[${i}].question missing`);
    if (!Array.isArray(x.options) || x.options.length < 3 || x.options.length > 4) fail(id, `mc[${i}].options must have 3–4`);
    if (!Number.isInteger(x.answerIndex) || x.answerIndex < 0 || x.answerIndex >= x.options.length) fail(id, `mc[${i}].answerIndex invalid`);
    if (typeof x.ar !== 'string' || !x.ar.trim()) fail(id, `mc[${i}].ar missing`);
    if (new Set(x.options.map((o) => String(o).trim().toLowerCase())).size !== x.options.length) fail(id, `mc[${i}] duplicate options`);
  });
  bank.vocabulary.forEach((v, i) => {
    if (typeof v.word !== 'string' || !v.word.trim()) fail(id, `vocabulary[${i}].word missing`);
    if (typeof v.meaningAr !== 'string' || !v.meaningAr.trim()) fail(id, `vocabulary[${i}].meaningAr missing`);
    if (typeof v.example !== 'string' || !v.example.trim()) fail(id, `vocabulary[${i}].example missing`);
  });
  if (typeof bank.grammar?.explanation !== 'string' || bank.grammar.explanation.trim().length < 30) fail(id, 'grammar.explanation too short (<30)');
  if (typeof bank.grammar?.explanationAr !== 'string' || bank.grammar.explanationAr.trim().length < 20) fail(id, 'grammar.explanationAr too short (<20)');
  if (!Array.isArray(bank.grammar?.examples) || bank.grammar.examples.length < 2
    || bank.grammar.examples.some((e) => !e?.en || !e?.ar)) fail(id, 'grammar.examples need 2+ {en, ar}');
  if (!Array.isArray(bank.objectives) || bank.objectives.length < 2) fail(id, 'objectives need 2+ strings');
}

/* ---------- exercise assembly ---------- */
const esc = (s) => String(s);

function difficultyFor(sentence) {
  const n = String(sentence ?? '').trim().split(/\s+/).filter(Boolean).length;
  if (n <= 5) return 1;
  if (n <= 9) return 2;
  return 3;
}

/** Interleave the per-type queues into a pedagogically varied order.
 *  Deterministic: first 4 are listen-and-type warm-up, then the
 *  special types are distributed as evenly as possible across the
 *  remaining slots and everything else is listen-and-type. */
function interleave(comp) {
  const pattern = [];
  const bodyLen = comp.total - 4;          // slots after the warm-up
  const spread = (kind, count, start) => { // even distribution, collision-safe
    for (let k = 0; k < count; k += 1) {
      let at = Math.min(bodyLen - 1, Math.round(start + (k * (bodyLen - start)) / count));
      while (at < bodyLen && pattern[at]) at += 1;      // next free slot
      while (at >= 0 && pattern[at]) at -= 1;           // fall back backwards
      if (at >= 0 && at < bodyLen && !pattern[at]) pattern[at] = kind;
      else throw new Error(`interleave: no free slot for ${kind} #${k}`);
    }
  };
  spread('mc', comp.mc, 2);
  spread('wo', comp.wo, 1);
  spread('fb', comp.fb, 4);
  const slots = [];
  for (let i = 0; i < comp.total; i += 1) {
    if (i < 4) { slots.push('lt'); continue; } // warm-up: 4 dictation first
    slots.push(pattern[i - 4] || 'lt');
  }
  // the pattern must leave exactly the right number of 'lt' slots
  const ltSlots = slots.filter((s) => s === 'lt').length;
  if (ltSlots !== comp.lt) throw new Error(`interleave produced ${ltSlots} lt slots, expected ${comp.lt}`);
  const byKind = {};
  for (const s of slots) byKind[s] = (byKind[s] || 0) + 1;
  if (byKind.fb !== comp.fb || byKind.wo !== comp.wo || byKind.mc !== comp.mc) {
    throw new Error(`interleave mismatch: ${JSON.stringify(byKind)}`);
  }
  return slots;
}

function buildExercises(id, bank, topicTag) {
  const comp = compositionFor(id);
  const queues = {
    lt: bank.lt.map((x) => ({ ...x })),
    fb: bank.fb.map((x) => ({ ...x })),
    wo: bank.wo.map((x) => ({ ...x })),
    mc: bank.mc.map((x) => ({ ...x })),
  };
  // the 2 (3 in review) listen-and-type entries that carry an `alt`
  // become the exercises with two accepted answers (match by `en`,
  // because queue entries are copies of the bank objects)
  const withAlt = new Set(bank.lt.filter((x) => typeof x.alt === 'string' && x.alt.trim()).map((x) => x.en));

  const exercises = [];
  const order = interleave(comp);
  let n = 0;
  for (const kind of order) {
    n += 1;
    const exId = `${id}-ex-${String(n).padStart(3, '0')}`;
    if (kind === 'lt') {
      const x = queues.lt.shift();
      const accepted = [esc(x.en)];
      if (withAlt.has(x.en)) accepted.push(esc(x.alt));
      exercises.push({
        id: exId,
        type: 'listen-and-type',
        en: esc(x.en),
        ar: esc(x.ar),
        acceptedAnswers: accepted,
        grammarTags: ['food-services', topicTag],
        difficulty: difficultyFor(x.en),
      });
    } else if (kind === 'fb') {
      const x = queues.fb.shift();
      const blank = esc(x.blank.trim());
      exercises.push({
        id: exId,
        type: 'fill-blank',
        display: esc(x.display),
        blankWord: blank,
        en: esc(x.en),
        ar: esc(x.ar),
        acceptedAnswers: [blank, blank.charAt(0).toUpperCase() + blank.slice(1)],
        grammarTags: ['food-services', topicTag],
        difficulty: 2,
      });
    } else if (kind === 'wo') {
      const x = queues.wo.shift();
      const en = esc(x.en);
      const words = en.replace(/[.!?;:,]+$/g, '').split(/\s+/).filter(Boolean);
      const noFinal = en.replace(/[.!?]+$/g, '').trim();
      exercises.push({
        id: exId,
        type: 'word-order',
        en,
        ar: esc(x.ar),
        words,
        acceptedAnswers: [en, noFinal, noFinal.charAt(0).toUpperCase() + noFinal.slice(1)],
        grammarTags: ['food-services', topicTag],
        difficulty: difficultyFor(en) < 3 ? 2 : 3,
      });
    } else if (kind === 'mc') {
      const x = queues.mc.shift();
      exercises.push({
        id: exId,
        type: 'multiple-choice',
        question: esc(x.question),
        options: x.options.map(esc),
        answerIndex: x.answerIndex,
        ar: esc(x.ar),
        grammarTags: ['food-services', topicTag],
        difficulty: 2,
      });
    }
  }
  return exercises;
}

/* ---------- lesson emission ---------- */
function buildLesson(id, bank) {
  const [title, titleAr] = META[id];
  const topicTag = id; // stable kebab-ish per-lesson tag (e.g. lesson-071)
  const lesson = {
    id,
    title,
    titleAr,
    section: SECTION,
    level: LEVEL,
    estimatedMinutes: id === REVIEW_ID ? 25 : 20,
    objectives: bank.objectives.map(esc),
    grammar: {
      explanation: esc(bank.grammar.explanation),
      explanationAr: esc(bank.grammar.explanationAr),
      examples: bank.grammar.examples.map((e) => ({ en: esc(e.en), ar: esc(e.ar) })),
    },
    vocabulary: bank.vocabulary.map((v) => ({
      word: esc(v.word), meaningAr: esc(v.meaningAr), example: esc(v.example),
    })),
    exercises: buildExercises(id, bank, topicTag),
  };
  return lesson;
}

/* ---------- main ---------- */
const checkOnly = process.argv.includes('--check');
if (!fs.existsSync(BANK_DIR)) {
  console.error(`bank dir missing: ${BANK_DIR}`);
  process.exit(1);
}
const ids = Object.keys(META);
let acceptedTotal = 0;
let exercisesTotal = 0;
const byType = {};
let vocabTotal = 0;
const problems = [];

for (const id of ids) {
  const bankPath = path.join(BANK_DIR, `${id}.json`);
  if (!fs.existsSync(bankPath)) { problems.push(`missing bank: ${bankPath}`); continue; }
  let bank;
  try {
    bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  } catch (e) {
    problems.push(`${id}: bank JSON parse error: ${e.message}`);
    continue;
  }
  try {
    validateBank(bank, id);
  } catch (e) {
    problems.push(e.message);
    continue;
  }
  const lesson = buildLesson(id, bank);
  const { validateLessonStructure } = await import(path.join(ROOT, 'js', 'lesson-schema.js'));
  const errs = validateLessonStructure(lesson, id);
  if (errs.length) { problems.push(`${id}: schema errors: ${errs.join(' | ')}`); continue; }

  for (const ex of lesson.exercises) {
    exercisesTotal += 1;
    byType[ex.type] = (byType[ex.type] || 0) + 1;
    acceptedTotal += Array.isArray(ex.acceptedAnswers) ? ex.acceptedAnswers.length : 0;
  }
  vocabTotal += lesson.vocabulary.length;

  if (!checkOnly) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const body = JSON.stringify(lesson, null, 2);
    fs.writeFileSync(path.join(OUT_DIR, `${id}.js`), `// LingoStep lesson — registered in data/lesson-manifest.js\n// Section: ${SECTION} · Level: ${LEVEL}\nexport default ${body};\n`, 'utf8');
    console.log(`✓ wrote lessons/food-services/${id}.js (${lesson.exercises.length} exercises)`);
  }
}

console.log(`\ntotals: exercises=${exercisesTotal} accepted=${acceptedTotal} vocab=${vocabTotal} byType=${JSON.stringify(byType)}`);
const expected = { exercises: 1390, accepted: 1721, vocab: 300 };
if (exercisesTotal !== expected.exercises) problems.push(`total exercises ${exercisesTotal} ≠ ${expected.exercises}`);
if (acceptedTotal !== expected.accepted) problems.push(`total accepted ${acceptedTotal} ≠ ${expected.accepted}`);
if (vocabTotal !== expected.vocab) problems.push(`total vocab ${vocabTotal} ≠ ${expected.vocab}`);
const wantTypes = { 'listen-and-type': 1058, 'fill-blank': 153, 'word-order': 102, 'multiple-choice': 77 };
for (const [t, n] of Object.entries(wantTypes)) {
  if ((byType[t] || 0) !== n) problems.push(`type ${t}: ${byType[t] || 0} ≠ ${n}`);
}

if (problems.length) {
  console.error('\nPROBLEMS:');
  for (const p of problems) console.error(' -', p);
  process.exit(1);
}
console.log(checkOnly ? 'CHECK PASSED (banks complete and valid)' : 'GENERATION PASSED');
