/* ============================================================
   Content generator — Section 1: Basics & Sentence Structure
   12 lessons · 50 exercises each (≈600 unique sentences).
   ============================================================ */

import * as C from './lib/conjugations.js';
import * as B from './lib/banks.js';
import { assembleLesson, writeLessonFile, expandPattern, expandAll, fillFrom, orderFrom, resetRegistry, registrySize } from './lib/builder.js';
import { validateLessonStructure } from '../../js/lesson-schema.js';

/* gendered adjectives: {m, f, p} Arabic forms */
const ADJ_G = {
  tall:       { m: 'طويل', f: 'طويلة', p: 'طويلون' },
  short:      { m: 'قصير', f: 'قصيرة', p: 'قصيرون' },
  big:        { m: 'كبير', f: 'كبيرة', p: 'كبار' },
  small:      { m: 'صغير', f: 'صغيرة', p: 'صغار' },
  fast:       { m: 'سريع', f: 'سريعة', p: 'سريعون' },
  clean:      { m: 'نظيف', f: 'نظيفة', p: 'نظيفون' },
  easy:       { m: 'سهل', f: 'سهلة', p: 'سهلة' },
  difficult:  { m: 'صعب', f: 'صعبة', p: 'صعبة' },
  expensive:  { m: 'غالي', f: 'غالية', p: 'غالون' },
  cheap:      { m: 'رخيص', f: 'رخيصة', p: 'رخيصون' },
  hot:        { m: 'حار', f: 'حارة', p: 'حارون' },
  cold:       { m: 'بارد', f: 'باردة', p: 'باردون' },
  happy:      { m: 'سعيد', f: 'سعيدة', p: 'سعداء' },
  sad:        { m: 'حزين', f: 'حزينة', p: 'حزينون' },
  tired:      { m: 'متعب', f: 'متعبة', p: 'متعبون' },
  strong:     { m: 'قوي', f: 'قوية', p: 'أقوياء' },
  quiet:      { m: 'هادئ', f: 'هادئة', p: 'هادئون' },
  beautiful:  { m: 'جميل', f: 'جميلة', p: 'جميلون' },
  busy:       { m: 'مشغول', f: 'مشغولة', p: 'مشغولون' },
  new:        { m: 'جديد', f: 'جديدة', p: 'جدد' },
  old:        { m: 'قديم', f: 'قديمة', p: 'قدماء' },
  long:       { m: 'طويل', f: 'طويلة', p: 'طويلون' },
  heavy:      { m: 'ثقيل', f: 'ثقيلة', p: 'ثقال' },
  light:      { m: 'خفيف', f: 'خفيفة', p: 'خفيفون' },
  delicious:  { m: 'لذيذ', f: 'لذيذة', p: 'لذيذون' },
  interesting:{ m: 'ممتع', f: 'ممتعة', p: 'ممتعون' },
  boring:     { m: 'ممل', f: 'مملة', p: 'مملون' },
  late:       { m: 'متأخر', f: 'متأخرة', p: 'متأخرون' },
  hungry:     { m: 'جائع', f: 'جائعة', p: 'جياع' },
  thirsty:    { m: 'عطشان', f: 'عطشى', p: 'عطاش' },
};

const BE = { I: 'am', you: 'are', he: 'is', she: 'is', we: 'are', they: 'are' };

/* possessive compounds: {en, ar, g} — Arabic already carries the suffix */
const POSS_NOUNS = [
  { en: 'My car', ar: 'سيارتي', g: 'f' }, { en: 'Your house', ar: 'بيتك', g: 'm' },
  { en: 'His phone', ar: 'هاتفه', g: 'm' }, { en: 'Her bag', ar: 'حقيبتها', g: 'f' },
  { en: 'Our school', ar: 'مدرستنا', g: 'f' }, { en: 'Their garden', ar: 'حديقتهم', g: 'f' },
  { en: 'My room', ar: 'غرفتي', g: 'f' }, { en: 'His job', ar: 'عمله', g: 'm' },
  { en: 'Her car', ar: 'سيارتها', g: 'f' }, { en: 'Our teacher', ar: 'معلمتنا', g: 'f' },
  { en: 'Their house', ar: 'بيتهم', g: 'm' }, { en: 'My desk', ar: 'مكتبي', g: 'm' },
  { en: 'Your phone', ar: 'هاتفك', g: 'm' }, { en: 'His bag', ar: 'حقيبته', g: 'f' },
  { en: 'Her book', ar: 'كتابها', g: 'm' }, { en: 'Our city', ar: 'مدينتنا', g: 'f' },
];

/* gendered noun phrases for "X is ADJ" sentences */
const NP_G = [
  { en: 'The weather', ar: 'الجو', g: 'm' }, { en: 'This book', ar: 'هذا الكتاب', g: 'm' },
  { en: 'That car', ar: 'تلك السيارة', g: 'f' }, { en: 'The test', ar: 'الاختبار', g: 'm' },
  { en: 'This soup', ar: 'هذا الحساء', g: 'm' }, { en: 'The city', ar: 'المدينة', g: 'f' },
  { en: 'The hotel', ar: 'الفندق', g: 'm' }, { en: 'This bag', ar: 'هذه الحقيبة', g: 'f' },
  { en: 'The lesson', ar: 'الدرس', g: 'm' }, { en: 'My room', ar: 'غرفتي', g: 'f' },
  { en: 'The tea', ar: 'الشاي', g: 'm' }, { en: 'The bus', ar: 'الحافلة', g: 'f' },
  { en: 'This phone', ar: 'هذا الهاتف', g: 'm' }, { en: 'The street', ar: 'الشارع', g: 'm' },
];

const DAILY_VERBS = ['eat', 'drink', 'read', 'write', 'watch', 'play', 'open', 'close', 'buy', 'cook', 'clean', 'call', 'visit', 'listen', 'wash', 'need', 'want', 'like', 'use', 'check'];
const DAILY_VERBS_PLACES = ['walk', 'work', 'study', 'sleep', 'sit', 'stand', 'wait', 'live', 'practice'];

/* foods split by semantics */
const EAT_LIST = [B.FOODS[0], B.FOODS[1], B.FOODS[2], B.FOODS[7], B.FOODS[8], B.FOODS[9], B.FOODS[13], B.FOODS[14], B.FOODS[15], B.FOODS[16]];
const DRINK_LIST = [B.FOODS[3], B.FOODS[4], B.FOODS[5], B.FOODS[10], B.FOODS[17]];

/* ---------- shared lesson-writing helper ---------- */

function build(cfg) {
  const lesson = assembleLesson(cfg);
  const errors = validateLessonStructure(lesson);
  if (errors.length) {
    throw new Error(`[${cfg.id}] schema errors: ${errors.slice(0, 6).join(' | ')}`);
  }
  writeLessonFile(lesson);
  return lesson.exercises.length;
}

function pat(tmpl, arTmpl, slots, meta = {}) {
  return { tmpl, arTmpl, slots, ...meta };
}

/* ============================================================
   Lesson 001 — Subject, Verb, Object
   ============================================================ */

/* semantic verb→object groups so every expanded sentence makes sense */
const VO_GROUPS_1 = [
  { v: 'eat', os: EAT_LIST },
  { v: 'drink', os: DRINK_LIST },
  { v: 'read', os: [{ en: 'a book', ar: 'كتابا' }, { en: 'the newspaper', ar: 'الصحيفة' }, { en: 'an email', ar: 'بريدا إلكترونيا' }, { en: 'a letter', ar: 'خطابا' }, { en: 'a story', ar: 'قصة' }] },
  { v: 'write', os: [{ en: 'an email', ar: 'بريدا إلكترونيا' }, { en: 'a letter', ar: 'خطابا' }, { en: 'a message', ar: 'رسالة' }, { en: 'a story', ar: 'قصة' }] },
  { v: 'watch', os: [{ en: 'a video', ar: 'فيديو' }, { en: 'a movie', ar: 'فيلما' }, { en: 'the news', ar: 'الأخبار' }, { en: 'a match', ar: 'مباراة' }] },
  { v: 'buy', os: [{ en: 'a new phone', ar: 'هاتفا جديدا' }, { en: 'a gift', ar: 'هدية' }, { en: 'a ticket', ar: 'تذكرة' }, { en: 'a map', ar: 'خريطة' }, { en: 'bread', ar: 'الخبز' }] },
  { v: 'cook', os: [{ en: 'rice', ar: 'الأرز' }, { en: 'fish', ar: 'السمك' }, { en: 'chicken', ar: 'الدجاج' }, { en: 'soup', ar: 'الحساء' }, { en: 'eggs', ar: 'البيض' }] },
  { v: 'clean', os: [{ en: 'the house', ar: 'البيت' }, { en: 'the kitchen', ar: 'المطبخ' }, { en: 'the car', ar: 'السيارة' }] },
  { v: 'open', os: [{ en: 'the door', ar: 'الباب' }, { en: 'the window', ar: 'النافذة' }, { en: 'a book', ar: 'كتابا' }] },
  { v: 'check', os: [{ en: 'my email', ar: 'بريدي الإلكتروني' }, { en: 'the messages', ar: 'الرسائل' }, { en: 'the report', ar: 'التقرير' }] },
];

const VO_GROUPS_2 = [
  { v: 'play', os: [{ en: 'football', ar: 'كرة القدم' }, { en: 'basketball', ar: 'كرة السلة' }, { en: 'tennis', ar: 'التنس' }, { en: 'video games', ar: 'ألعاب الفيديو' }] },
  { v: 'study', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'math', ar: 'الرياضيات' }, { en: 'history', ar: 'التاريخ' }, { en: 'science', ar: 'العلوم' }] },
  { v: 'learn', os: [{ en: 'new words', ar: 'كلمات جديدة' }, { en: 'English', ar: 'الإنجليزية' }, { en: 'new skills', ar: 'مهارات جديدة' }] },
  { v: 'teach', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'math', ar: 'الرياضيات' }, { en: 'science', ar: 'العلوم' }] },
  { v: 'sell', os: [{ en: 'a car', ar: 'سيارة' }, { en: 'a house', ar: 'بيتا' }, { en: 'a phone', ar: 'هاتفا' }] },
  { v: 'start', os: [{ en: 'a new job', ar: 'عملا جديدا' }, { en: 'a project', ar: 'مشروعا' }, { en: 'a course', ar: 'دورة' }] },
  { v: 'finish', os: [{ en: 'the report', ar: 'التقرير' }, { en: 'the homework', ar: 'الواجب المنزلي' }, { en: 'the project', ar: 'المشروع' }] },
  { v: 'wash', os: [{ en: 'the car', ar: 'السيارة' }, { en: 'the dishes', ar: 'الأطباق' }, { en: 'his clothes', ar: 'ملابسه' }] },
  { v: 'call', os: [{ en: 'a taxi', ar: 'سيارة أجرة' }, { en: 'the doctor', ar: 'الطبيب' }, { en: 'his friend', ar: 'صديقه' }] },
  { v: 'pay', os: [{ en: 'the bill', ar: 'الفاتورة' }, { en: 'the rent', ar: 'الإيجار' }] },
];

const SAME_PRONOUN = { I: 'me', you: 'you', he: 'him', she: 'her', we: 'us', they: 'them' };

const l1Lt = expandAll([
  pat('{S} {VOv} {VOo} {T}.', '{S_ar} {VOv_ar} {VOo_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: VO_GROUPS_1,
    VOv: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
    VOo: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(0, 5),
  }, { tags: ['svo', 'present-simple'], difficulty: 1, limit: 70 }),
  pat('{P} {VOv} {VOo} {T}.', '{P_ar} {VOv_ar} {VOo_ar} {T_ar}.', {
    P: B.PEOPLE_SING.slice(0, 10),
    VO: VO_GROUPS_2,
    VOv: (x) => [{ en: C.enPresent(x.VO.v, x.P.agr), ar: C.arPresent(x.VO.v, x.P.agr) }],
    VOo: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(3, 9),
  }, { tags: ['svo', 'present-simple'], difficulty: 1, limit: 70 }),
]);

const l1Fills = [
  fillFrom({ en: 'She drinks water every morning.', ar: 'هي تشرب الماء كل صباح.', tags: ['svo'] }, 'drinks', { hint: 'verb — she + s' }),
  fillFrom({ en: 'They watch TV in the evening.', ar: 'يشاهدون التلفاز في المساء.', tags: ['svo'] }, 'watch', { hint: 'فعل' }),
  fillFrom({ en: 'I read a book every night.', ar: 'أقرأ كتابا كل ليلة.', tags: ['svo'] }, 'read', { hint: 'فعل' }),
  fillFrom({ en: 'My father cooks rice on Fridays.', ar: 'أبي يطبخ الأرز أيام الجمعة.', tags: ['svo'] }, 'cooks', { hint: 'verb + s' }),
  fillFrom({ en: 'We clean the house every week.', ar: 'ننظف البيت كل أسبوع.', tags: ['svo'] }, 'clean', { hint: 'فعل' }),
  fillFrom({ en: 'He opens the window in the morning.', ar: 'يفتح النافذة في الصباح.', tags: ['svo'] }, 'opens', { hint: 'verb + s' }),
  fillFrom({ en: 'The students write the report today.', ar: 'يكتب الطلاب التقرير اليوم.', tags: ['svo'] }, 'write', { hint: 'فعل' }),
  fillFrom({ en: 'You need a new phone.', ar: 'أنت تحتاج هاتفا جديدا.', tags: ['svo'] }, 'need', { hint: 'فعل' }),
];

const l1Orders = [
  orderFrom({ en: 'I drink tea.', ar: 'أنا أشرب الشاي.', tags: ['svo'] }),
  orderFrom({ en: 'She reads books.', ar: 'هي تقرأ الكتب.', tags: ['svo'] }),
  orderFrom({ en: 'We eat bread.', ar: 'نحن نأكل الخبز.', tags: ['svo'] }),
  orderFrom({ en: 'They play football.', ar: 'هم يلعبون كرة القدم.', tags: ['svo'] }),
  orderFrom({ en: 'He watches TV.', ar: 'هو يشاهد التلفاز.', tags: ['svo'] }),
  orderFrom({ en: 'I write emails.', ar: 'أنا أكتب رسائل إلكترونية.', tags: ['svo'] }),
];

const l1Mc = [
  { question: 'Which order is correct?', options: ['I tea drink.', 'I drink tea.', 'Drink I tea.'], answerIndex: 1, ar: 'أنا أشرب الشاي.', tags: ['svo'], explanation: 'English order is Subject + Verb + Object.' },
  { question: 'Choose the correct sentence.', options: ['She books reads.', 'She read books.', 'She reads books.'], answerIndex: 2, ar: 'هي تقرأ الكتب.', tags: ['svo', 'third-person-singular'], explanation: 'With he/she/it the verb takes -s: reads.' },
  { question: 'What comes right after the subject in a simple sentence?', options: ['an object', 'a verb', 'an adjective'], answerIndex: 1, ar: 'الفعل يأتي بعد الفاعل.', tags: ['svo'], explanation: 'S + V + O.' },
  { question: 'Choose the correct sentence.', options: ['They football play.', 'They play football.', 'Play they football.'], answerIndex: 1, ar: 'هم يلعبون كرة القدم.', tags: ['svo'] },
  { question: 'The verb in "My mother cooks dinner" is…', options: ['mother', 'cooks', 'dinner'], answerIndex: 1, ar: 'الفعل هو تطبخ.', tags: ['svo'] },
  { question: 'Which sentence has the object in the right place?', options: ['I every day work.', 'I work every day.', 'Work I every day.'], answerIndex: 1, ar: 'أنا أعمل كل يوم.', tags: ['svo', 'adverb-position'] },
];

/* ============================================================
   Lesson 002 — Subject Pronouns
   ============================================================ */

const l2Lt = expandAll([
  pat('{S} {be} {ADJ}.', '{S_ar} {ADJ_ar}.', {
    S: B.PRONOUNS,
    be: (x) => [{ en: C.AGR[x.S.agr].be, ar: '' }],
    ADJ: (x) => ['tired', 'happy', 'busy', 'hungry', 'thirsty'].map((a) => ({
      en: (x.S.agr === 'I' || x.S.agr === 'you') ? ADJ_G[a].m : (x.S.agr === 'she' ? ADJ_G[a].f : (x.S.agr === 'they' ? ADJ_G[a].p : ADJ_G[a].m)),
      ar: (x.S.agr === 'I' || x.S.agr === 'you') ? ADJ_G[a].m : (x.S.agr === 'she' ? ADJ_G[a].f : (x.S.agr === 'they' ? ADJ_G[a].p : ADJ_G[a].m)),
    })),
  }, { tags: ['subject-pronouns', 'verb-be'], difficulty: 1 }),
  pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    V: (x) => ['read', 'write', 'clean', 'wash', 'check', 'visit'].map((v) => ({ en: C.enPresent(v, x.S.agr), ar: C.arPresent(v, x.S.agr) })),
    O: B.THINGS.slice(0, 8),
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['subject-pronouns', 'present-simple'], difficulty: 1, limit: 60 }),
  pat('{N} {V} {O}.', '{N_ar} {V_ar} {O_ar}.', {
    N: B.NAMED_SING,
    V: (x) => ['work', 'study', 'play', 'live', 'speak'].map((v) => ({ en: C.enPresent(v, x.N.agr), ar: C.arPresent(v, x.N.agr) })),
    O: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'at home', ar: 'في المنزل' }, { en: 'in Cairo', ar: 'في القاهرة' }, { en: 'every day', ar: 'كل يوم' }, { en: 'at school', ar: 'في المدرسة' }],
  }, { tags: ['subject-pronouns', 'third-person-singular'], difficulty: 1, limit: 40 }),
]);

const l2Fills = [
  { display: '___ is my sister.', blankWord: 'She', en: 'She is my sister.', ar: 'هي أختي.', acceptedAnswers: ['She', 'she'], tags: ['subject-pronouns'], difficulty: 1, hint: 'فاعل مؤنث' },
  { display: 'My father is a doctor. ___ works in a big hospital.', blankWord: 'He', en: 'My father is a doctor. He works in a big hospital.', ar: 'أبي طبيب. هو يعمل في مستشفى كبير.', acceptedAnswers: ['He', 'he'], tags: ['subject-pronouns'], difficulty: 2, hint: 'فاعل مذكر' },
  { display: 'Omar and I are friends. ___ study together.', blankWord: 'We', en: 'Omar and I are friends. We study together.', ar: 'عمر وأنا أصدقاء. نحن ندرس معا.', acceptedAnswers: ['We', 'we'], tags: ['subject-pronouns'], difficulty: 2 },
  { display: 'The students are here. ___ want to start.', blankWord: 'They', en: 'The students are here. They want to start.', ar: 'الطلاب هنا. هم يريدون البدء.', acceptedAnswers: ['They', 'they'], tags: ['subject-pronouns'], difficulty: 2 },
  { display: '___ am learning English.', blankWord: 'I', en: 'I am learning English.', ar: 'أنا أتعلم الإنجليزية.', acceptedAnswers: ['I'], tags: ['subject-pronouns'], difficulty: 1 },
  { display: 'Sara and Nora are teachers. ___ work at a school.', blankWord: 'They', en: 'Sara and Nora are teachers. They work at a school.', ar: 'سارة ونورا معلمتان. هما تعملان في مدرسة.', acceptedAnswers: ['They', 'they'], tags: ['subject-pronouns'], difficulty: 2 },
  { display: '___ are my new neighbors.', blankWord: 'You', en: 'You are my new neighbors.', ar: 'أنتما جيراني الجدد.', acceptedAnswers: ['You', 'you'], tags: ['subject-pronouns'], difficulty: 1 },
  { display: 'The cat is hungry. ___ wants milk.', blankWord: 'It', en: 'The cat is hungry. It wants milk.', ar: 'القطة جائعة. هي تريد حليبا.', acceptedAnswers: ['It', 'it'], tags: ['subject-pronouns'], difficulty: 2 },
];

const l2Orders = [
  orderFrom({ en: 'I am tired.', ar: 'أنا متعب.', tags: ['subject-pronouns'] }),
  orderFrom({ en: 'She is happy.', ar: 'هي سعيدة.', tags: ['subject-pronouns'] }),
  orderFrom({ en: 'We are busy today.', ar: 'نحن مشغولون اليوم.', tags: ['subject-pronouns'] }),
  orderFrom({ en: 'He works here.', ar: 'هو يعمل هنا.', tags: ['subject-pronouns'] }),
  orderFrom({ en: 'They study English.', ar: 'هم يدرسون الإنجليزية.', tags: ['subject-pronouns'] }),
  orderFrom({ en: 'You speak Arabic.', ar: 'أنت تتحدث العربية.', tags: ['subject-pronouns'] }),
];

const l2Mc = [
  { question: 'My sister and I ___ students.', options: ['am', 'is', 'are'], answerIndex: 2, ar: 'أختي وأنا طلاب.', tags: ['subject-pronouns', 'verb-be'] },
  { question: '___ is my best friend, Nour.', options: ['He', 'She', 'They'], answerIndex: 1, ar: 'هي صديقي المفضل، نور.', tags: ['subject-pronouns'] },
  { question: 'Ali and Omar are engineers. ___ build bridges.', options: ['He', 'She', 'They'], answerIndex: 2, ar: 'علي وعمر مهندسان. هما يبنيان الجسور.', tags: ['subject-pronouns'] },
  { question: 'Which pronoun replaces "the teacher"?', options: ['She', 'He', 'We'], answerIndex: 1, ar: 'المعلم → هو.', tags: ['subject-pronouns'] },
  { question: 'Choose the correct pair.', options: ['I is / she are', 'I am / she is', 'I am / she are'], answerIndex: 1, ar: 'أنا أكون / هي تكون.', tags: ['subject-pronouns', 'verb-be'] },
  { question: '___ are late for class.', options: ['We', 'He', 'She'], answerIndex: 0, ar: 'نحن متأخرون عن الدرس.', tags: ['subject-pronouns'] },
];

/* ============================================================
   Lesson 003 — Object Pronouns
   ============================================================ */

const OBJ_SUFFIX = { me: 'ني', you: 'ك', him: 'ه', her: 'ها', us: 'نا', them: 'هم' };
const OBJ_PRONOUNS = [
  { en: 'me', ar: 'ني' }, { en: 'him', ar: 'ه' }, { en: 'her', ar: 'ها' }, { en: 'us', ar: 'نا' }, { en: 'them', ar: 'هم' },
];

/** Attach an object-pronoun suffix to an Arabic present verb.
 *  "call" takes the preposition ب in Arabic (يتصل به). */
function arAttach(vk, agr, objAr) {
  const base = vk === 'call' ? `${C.arPresent(vk, agr)} ب` : C.arPresent(vk, agr);
  return base + objAr;
}

const l3Lt = expandAll([
  pat('{S} {V} {T}.', '{S_ar} {V_ar} {T_ar}.', {
    S: B.PRONOUNS,
    O: OBJ_PRONOUNS,
    V: (x) => (SAME_PRONOUN[x.S.agr] === x.O.en ? [] : ['call', 'see', 'meet', 'help', 'visit', 'know'].map((v) => ({
      en: `${C.enPresent(v, x.S.agr)} ${x.O.en}`,
      ar: arAttach(v, x.S.agr, x.O.ar),
    }))),
    T: B.TIME_HABIT.slice(0, 6),
  }, { tags: ['object-pronouns', 'present-simple'], difficulty: 2, limit: 60, filter: (x) => SAME_PRONOUN[x.S.agr] !== x.O.en }),
  pat('{S} {V} now.', '{S_ar} {V_ar} الآن.', {
    S: B.PEOPLE_SING.slice(0, 8),
    O: OBJ_PRONOUNS.slice(0, 4),
    V: (x) => (SAME_PRONOUN[x.S.agr] === x.O.en ? [] : ['call', 'help', 'need', 'tell'].map((v) => ({
      en: `${C.enPresent(v, x.S.agr)} ${x.O.en}`,
      ar: arAttach(v, x.S.agr, x.O.ar),
    }))),
  }, { tags: ['object-pronouns'], difficulty: 2, limit: 40, filter: (x) => SAME_PRONOUN[x.S.agr] !== x.O.en }),
]);

const l3Fills = [
  { display: 'This is Omar. I see ___ every day.', blankWord: 'him', en: 'This is Omar. I see him every day.', ar: 'هذا عمر. أراه كل يوم.', acceptedAnswers: ['him'], tags: ['object-pronouns'], difficulty: 1 },
  { display: 'Sara is kind. We like ___ a lot.', blankWord: 'her', en: 'Sara is kind. We like her a lot.', ar: 'سارة لطيفة. نحبها كثيرا.', acceptedAnswers: ['her'], tags: ['object-pronouns'], difficulty: 1 },
  { display: 'They are new students. Please help ___.', blankWord: 'them', en: 'They are new students. Please help them.', ar: 'إنهم طلاب جدد. من فضلك ساعدهم.', acceptedAnswers: ['them'], tags: ['object-pronouns'], difficulty: 2 },
  { display: 'Can you call ___ tonight? I need to talk.', blankWord: 'me', en: 'Can you call me tonight? I need to talk.', ar: 'هل يمكنك الاتصال بي الليلة؟ أحتاج أن أتحدث.', acceptedAnswers: ['me'], tags: ['object-pronouns'], difficulty: 1 },
  { display: 'We are your friends. You can trust ___.', blankWord: 'us', en: 'We are your friends. You can trust us.', ar: 'نحن أصدقاؤك. يمكنك أن تثق بنا.', acceptedAnswers: ['us'], tags: ['object-pronouns'], difficulty: 2 },
  { display: 'I have your keys. I will give ___ back tomorrow.', blankWord: 'them', en: 'I have your keys. I will give them back tomorrow.', ar: 'لدي مفاتيحك. سأعيدها لك غدا.', acceptedAnswers: ['them'], tags: ['object-pronouns'], difficulty: 2 },
  { display: 'She loves her family. She visits ___ every week.', blankWord: 'them', en: 'She loves her family. She visits them every week.', ar: 'هي تحب عائلتها. تزورهم كل أسبوع.', acceptedAnswers: ['them'], tags: ['object-pronouns'], difficulty: 2 },
  { display: 'The teacher explains the lesson. Listen to ___.', blankWord: 'him', en: 'The teacher explains the lesson. Listen to him.', ar: 'يشرح المعلم الدرس. استمع إليه.', acceptedAnswers: ['him'], tags: ['object-pronouns'], difficulty: 2 },
];

const l3Orders = [
  orderFrom({ en: 'Call me tonight.', ar: 'اتصل بي الليلة.', tags: ['object-pronouns', 'imperative'] }),
  orderFrom({ en: 'I see him.', ar: 'أنا أراه.', tags: ['object-pronouns'] }),
  orderFrom({ en: 'She helps them.', ar: 'هي تساعدهم.', tags: ['object-pronouns'] }),
  orderFrom({ en: 'We visit her on Fridays.', ar: 'نحن نزورها أيام الجمعة.', tags: ['object-pronouns'] }),
  orderFrom({ en: 'Tell me the answer.', ar: 'أخبرني بالإجابة.', tags: ['object-pronouns', 'imperative'] }),
  orderFrom({ en: 'They know us well.', ar: 'إنهم يعرفوننا جيدا.', tags: ['object-pronouns'] }),
];

const l3Mc = [
  { question: 'I love this song. I listen to ___ every day.', options: ['it', 'them', 'he'], answerIndex: 0, ar: 'أحب هذه الأغنية. أستمع إليها كل يوم.', tags: ['object-pronouns'] },
  { question: 'Which is correct?', options: ['She helps I.', 'She helps me.', 'She helps my.'], answerIndex: 1, ar: 'هي تساعدني.', tags: ['object-pronouns'] },
  { question: 'The books are heavy. Carry ___ carefully.', options: ['they', 'their', 'them'], answerIndex: 2, ar: 'الكتب ثقيلة. احملها بحذر.', tags: ['object-pronouns'] },
  { question: 'After a preposition we use…', options: ['a subject pronoun', 'an object pronoun', 'a verb'], answerIndex: 1, ar: 'بعد حرف الجر نستخدم ضمير المفعول.', tags: ['object-pronouns'] },
  { question: 'Choose the correct sentence.', options: ['Us live here.', 'We live here.', 'Live we here.'], answerIndex: 1, ar: 'نحن نعيش هنا.', tags: ['object-pronouns', 'subject-pronouns'] },
  { question: 'My parents call ___ every weekend.', options: ['I', 'me', 'my'], answerIndex: 1, ar: 'والداي يتصلان بي كل عطلة نهاية أسبوع.', tags: ['object-pronouns'] },
];

/* ============================================================
   Lesson 004 — Possessive Adjectives & Pronouns
   ============================================================ */

const l4Lt = expandAll([
  pat('{PN} is {ADJ}.', '{PN_ar} {ADJ_ar}.', {
    PN: POSS_NOUNS,
    ADJ: (x) => ['new', 'old', 'clean', 'big', 'small', 'beautiful', 'expensive', 'cheap'].map((a) => ({
      en: a,
      ar: x.PN.g === 'f' ? ADJ_G[a].f : ADJ_G[a].m,
    })),
  }, { tags: ['possessives', 'adjectives'], difficulty: 1, limit: 70 }),
  pat('{P} {V}.', '{P_ar} {V_ar}.', {
    P: B.PEOPLE_SING.slice(0, 8),
    V: (x) => [
      { en: 'works a lot', ar: `${C.arPresent('work', x.P.agr)} كثيرا` },
      { en: 'helps us a lot', ar: `${C.arPresent('help', x.P.agr)}نا كثيرا` },
      { en: 'reads every night', ar: `${C.arPresent('read', x.P.agr)} كل ليلة` },
    ],
  }, { tags: ['possessives'], difficulty: 2 }),
]);

const l4Fills = [
  { display: 'I have a sister. ___ name is Lina.', blankWord: 'Her', en: 'I have a sister. Her name is Lina.', ar: 'لدي أخت. اسمها لينا.', acceptedAnswers: ['Her', 'her'], tags: ['possessives'], difficulty: 1 },
  { display: 'Ali has a car. ___ car is blue.', blankWord: 'His', en: 'Ali has a car. His car is blue.', ar: 'علي لديه سيارة. سيارته زرقاء.', acceptedAnswers: ['His', 'his'], tags: ['possessives'], difficulty: 1 },
  { display: 'We love ___ school.', blankWord: 'our', en: 'We love our school.', ar: 'نحن نحب مدرستنا.', acceptedAnswers: ['our'], tags: ['possessives'], difficulty: 1 },
  { display: 'The students finished ___ homework.', blankWord: 'their', en: 'The students finished their homework.', ar: 'أنهى الطلاب واجبهم المنزلي.', acceptedAnswers: ['their'], tags: ['possessives'], difficulty: 2 },
  { display: 'Is this ___ phone? You dropped it.', blankWord: 'your', en: 'Is this your phone? You dropped it.', ar: 'هل هذا هاتفك؟ لقد أسقطته.', acceptedAnswers: ['your'], tags: ['possessives'], difficulty: 1 },
  { display: 'This bag is not mine. It is ___ (she).', blankWord: 'hers', en: 'This bag is not mine. It is hers.', ar: 'هذه الحقيبة ليست لي. إنها لها.', acceptedAnswers: ['hers'], tags: ['possessive-pronouns'], difficulty: 2, hint: 'possessive pronoun' },
  { display: 'That book is ___ (I).', blankWord: 'mine', en: 'That book is mine.', ar: 'ذلك الكتاب لي.', acceptedAnswers: ['mine'], tags: ['possessive-pronouns'], difficulty: 2 },
  { display: 'Our house is big, but ___ (they) is small.', blankWord: 'theirs', en: 'Our house is big, but theirs is small.', ar: 'بيتنا كبير، لكن بيتهم صغير.', acceptedAnswers: ['theirs'], tags: ['possessive-pronouns'], difficulty: 3 },
];

const l4Orders = [
  orderFrom({ en: 'My car is fast.', ar: 'سيارتي سريعة.', tags: ['possessives'] }),
  orderFrom({ en: 'Her bag is heavy.', ar: 'حقيبتها ثقيلة.', tags: ['possessives'] }),
  orderFrom({ en: 'His phone is new.', ar: 'هاتفه جديد.', tags: ['possessives'] }),
  orderFrom({ en: 'Our school is big.', ar: 'مدرستنا كبيرة.', tags: ['possessives'] }),
  orderFrom({ en: 'This is my desk.', ar: 'هذا مكتبي.', tags: ['possessives'] }),
  orderFrom({ en: 'Their garden is beautiful.', ar: 'حديقتهم جميلة.', tags: ['possessives'] }),
];

const l4Mc = [
  { question: 'Omar forgot ___ keys at home.', options: ['his', 'her', 'their'], answerIndex: 0, ar: 'نسي عمر مفاتيحه في البيت.', tags: ['possessives'] },
  { question: 'This is not your umbrella, it is ___.', options: ['my', 'mine', 'me'], answerIndex: 1, ar: 'هذه ليست مظلتك، إنها لي.', tags: ['possessive-pronouns'] },
  { question: 'Which is correct?', options: ['Their going home.', 'They’re going home.', 'There going home.'], answerIndex: 1, ar: 'إنهم ذاهبون إلى البيت.', tags: ['possessives', 'common-mistakes'] },
  { question: 'We keep ___ books on this shelf.', options: ['us', 'our', 'ours'], answerIndex: 1, ar: 'نضع كتبنا على هذا الرف.', tags: ['possessives'] },
  { question: '___ car is the red one over there.', options: ['She', 'Hers', 'Her'], answerIndex: 2, ar: 'سيارتها هي الحمراء هناك.', tags: ['possessives'] },
  { question: 'The cat drinks ___ milk.', options: ['it’s', 'its', 'its’'], answerIndex: 1, ar: 'القط يشرب حليبه.', tags: ['possessives', 'common-mistakes'] },
];

/* ============================================================
   Lesson 005 — Articles: a / an / the
   ============================================================ */

const A_NOUNS = [
  { en: 'a car', ar: 'سيارة' }, { en: 'a book', ar: 'كتابا' }, { en: 'a pen', ar: 'قلمًا' },
  { en: 'a house', ar: 'بيتا' }, { en: 'a teacher', ar: 'معلمًا' }, { en: 'a doctor', ar: 'طبيبًا' },
  { en: 'a taxi', ar: 'سيارة أجرة' }, { en: 'a ticket', ar: 'تذكرة' },
];
const AN_NOUNS = [
  { en: 'an apple', ar: 'تفاحة' }, { en: 'an egg', ar: 'بيضة' }, { en: 'an email', ar: 'بريدًا إلكترونيًا' },
  { en: 'an idea', ar: 'فكرة' }, { en: 'an answer', ar: 'جوابًا' }, { en: 'an orange', ar: 'برتقالة' },
  { en: 'an umbrella', ar: 'مظلة' }, { en: 'an hour', ar: 'ساعة' },
];

const l5Lt = expandAll([
  pat('{S} has {N}.', 'لدى {S_ar} {N_ar}.', {
    S: B.PRONOUNS,
    N: [...A_NOUNS.slice(0, 5), ...AN_NOUNS.slice(0, 5)],
  }, { tags: ['articles', 'present-simple', 'have'], difficulty: 1 }),
  pat('{S} is {N}.', '{S_ar} {N_ar}.', {
    S: [...B.PEOPLE_SING.slice(0, 6), ...B.NAMED_SING.slice(0, 4)],
    N: [...A_NOUNS.slice(4, 8), ...AN_NOUNS.slice(0, 4)],
  }, { tags: ['articles', 'professions'], difficulty: 1 }),
  pat('I eat {N} {T}.', 'آكل {N_ar} {T_ar}.', {
    N: [...A_NOUNS.slice(0, 3), ...AN_NOUNS.slice(0, 3)],
    T: B.TIME_HABIT.slice(0, 6),
  }, { tags: ['articles'], difficulty: 1 }),
]);

const l5Fills = [
  { display: 'I need ___ umbrella. It is raining.', blankWord: 'an', en: 'I need an umbrella. It is raining.', ar: 'أحتاج مظلة. إنها تمطر.', acceptedAnswers: ['an'], tags: ['articles'], difficulty: 1, hint: 'حرف علة' },
  { display: 'She has ___ idea for the project.', blankWord: 'an', en: 'She has an idea for the project.', ar: 'لديها فكرة للمشروع.', acceptedAnswers: ['an'], tags: ['articles'], difficulty: 2 },
  { display: 'He is ___ honest man.', blankWord: 'an', en: 'He is an honest man.', ar: 'هو رجل صادق.', acceptedAnswers: ['an'], tags: ['articles'], difficulty: 3, hint: 'h is silent' },
  { display: 'We watched ___ movie last night. ___ movie was great.', blankWord: 'The', en: 'We watched a movie last night. The movie was great.', ar: 'شاهدنا فيلما الليلة الماضية. كان الفيلم رائعا.', acceptedAnswers: ['The', 'the'], tags: ['articles'], difficulty: 2 },
  { display: 'My sister is ___ engineer.', blankWord: 'an', en: 'My sister is an engineer.', ar: 'أختي مهندسة.', acceptedAnswers: ['an'], tags: ['articles'], difficulty: 1 },
  { display: 'I bought ___ new phone yesterday.', blankWord: 'a', en: 'I bought a new phone yesterday.', ar: 'اشتريت هاتفا جديدا أمس.', acceptedAnswers: ['a'], tags: ['articles'], difficulty: 1 },
  { display: 'Please open ___ window.', blankWord: 'the', en: 'Please open the window.', ar: 'من فضلك افتح النافذة.', acceptedAnswers: ['the'], tags: ['articles'], difficulty: 2, hint: 'نافذة محددة' },
  { display: 'They live in ___ old house near the river.', blankWord: 'an', en: 'They live in an old house near the river.', ar: 'إنهم يعيشون في بيت قديم قرب النهر.', acceptedAnswers: ['an'], tags: ['articles'], difficulty: 2 },
];

const l5Orders = [
  orderFrom({ en: 'I have a car.', ar: 'لدي سيارة.', tags: ['articles'] }),
  orderFrom({ en: 'She is a teacher.', ar: 'هي معلمة.', tags: ['articles'] }),
  orderFrom({ en: 'He eats an apple.', ar: 'هو يأكل تفاحة.', tags: ['articles'] }),
  orderFrom({ en: 'We need a taxi.', ar: 'نحتاج سيارة أجرة.', tags: ['articles'] }),
  orderFrom({ en: 'The book is interesting.', ar: 'الكتاب ممتع.', tags: ['articles'] }),
  orderFrom({ en: 'She sent an email.', ar: 'أرسلت بريدا إلكترونيا.', tags: ['articles'] }),
];

const l5Mc = [
  { question: '___ sun is very bright today.', options: ['A', 'An', 'The'], answerIndex: 2, ar: 'الشمس ساطعة اليوم.', tags: ['articles'], explanation: 'Unique things take "the": the sun, the moon.' },
  { question: 'She is ___ university student.', options: ['a', 'an', 'the'], answerIndex: 0, ar: 'هي طالبة جامعية.', tags: ['articles'], explanation: '"University" starts with a /y/ sound.' },
  { question: 'I saw ___ elephant at the zoo. ___ elephant was huge.', options: ['a / An', 'an / The', 'the / A'], answerIndex: 1, ar: 'رأيت فيلًا في حديقة الحيوان. كان الفيل ضخما.', tags: ['articles'] },
  { question: 'He wants to be ___ pilot.', options: ['a', 'an', 'the'], answerIndex: 0, ar: 'يريد أن يصبح طيارا.', tags: ['articles'] },
  { question: 'Choose the correct sentence.', options: ['I have the car.', 'I have a car. The car is red.', 'I have an car.'], answerIndex: 1, ar: 'لدي سيارة. السيارة حمراء.', tags: ['articles'] },
  { question: 'We waited for ___ hour.', options: ['a', 'an', 'the'], answerIndex: 1, ar: 'انتظرنا لمدة ساعة.', tags: ['articles'] },
];

/* ============================================================
   Lesson 006 — Demonstratives & Quantifiers (some / any)
   ============================================================ */

const SG_PL = [
  { sgEn: 'a book', sgAr: 'كتاب', plEn: 'books', plAr: 'كتب' },
  { sgEn: 'a chair', sgAr: 'كرسي', plAr: 'كراسي', plEn: 'chairs' },
  { sgEn: 'a key', sgAr: 'مفتاح', plAr: 'مفاتيح', plEn: 'keys' },
  { sgEn: 'a bag', sgAr: 'حقيبة', plAr: 'حقائب', plEn: 'bags' },
  { sgEn: 'a pen', sgAr: 'قلم', plAr: 'أقلام', plEn: 'pens' },
  { sgEn: 'a photo', sgAr: 'صورة', plAr: 'صور', plEn: 'photos' },
];

const SG_N = SG_PL.map((x) => ({ en: x.sgEn, ar: x.sgAr }));
const SG_PLURAL = SG_PL.map((x) => ({ en: x.plEn, ar: x.plAr }));

const l6Lt = expandAll([
  pat('This is {N} and these are {PL}.', 'هذا {N_ar} وهذه {PL_ar}.', {
    N: SG_N,
    PL: SG_PLURAL,
  }, { tags: ['demonstratives'], difficulty: 1, limit: 30 }),
  pat('That is {N} over there and those are {PL}.', 'تلك {N_ar} هناك وهذه {PL_ar}.', {
    N: SG_N,
    PL: SG_PLURAL,
  }, { tags: ['demonstratives'], difficulty: 1, limit: 30 }),
  pat('I have {Q} {N}.', 'لدي {Q_ar} {N_ar}.', {
    Q: [{ en: 'some', ar: 'بعض' }, { en: 'a few', ar: 'بعض' }],
    N: [{ en: 'money', ar: 'المال' }, { en: 'questions', ar: 'الأسئلة' }, { en: 'friends here', ar: 'الأصدقاء هنا' }, { en: 'water', ar: 'الماء' }, { en: 'new books', ar: 'كتب جديدة' }, { en: 'good ideas', ar: 'أفكار جيدة' }],
  }, { tags: ['quantifiers'], difficulty: 2 }),
]);

const l6Fills = [
  { display: '___ shoes over there are expensive.', blankWord: 'Those', en: 'Those shoes over there are expensive.', ar: 'تلك الأحذية هناك غالية.', acceptedAnswers: ['Those', 'those'], tags: ['demonstratives'], difficulty: 2 },
  { display: '___ pen in my hand is blue.', blankWord: 'This', en: 'This pen in my hand is blue.', ar: 'هذا القلم في يدي أزرق.', acceptedAnswers: ['This', 'this'], tags: ['demonstratives'], difficulty: 1 },
  { display: 'I don’t have ___ money with me.', blankWord: 'any', en: 'I don’t have any money with me.', ar: 'ليس لدي أي مال معي.', acceptedAnswers: ['any'], tags: ['quantifiers'], difficulty: 2, hint: 'نفي → any' },
  { display: 'Would you like ___ tea?', blankWord: 'some', en: 'Would you like some tea?', ar: 'هل تريد بعض الشاي؟', acceptedAnswers: ['some'], tags: ['quantifiers'], difficulty: 2, hint: 'عرض مهذب → some' },
  { display: 'Are there ___ questions?', blankWord: 'any', en: 'Are there any questions?', ar: 'هل هناك أي أسئلة؟', acceptedAnswers: ['any'], tags: ['quantifiers'], difficulty: 2 },
  { display: '___ children are playing in the street.', blankWord: 'Those', en: 'Those children are playing in the street.', ar: 'تلك الأطفال يلعبون في الشارع.', acceptedAnswers: ['Those', 'those'], tags: ['demonstratives'], difficulty: 2 },
  { display: 'I bought ___ new books yesterday.', blankWord: 'some', en: 'I bought some new books yesterday.', ar: 'اشتريت بعض الكتب الجديدة أمس.', acceptedAnswers: ['some'], tags: ['quantifiers'], difficulty: 1 },
  { display: '___ is my favorite chair here.', blankWord: 'This', en: 'This is my favorite chair here.', ar: 'هذا كرسياي المفضل هنا.', acceptedAnswers: ['This', 'this'], tags: ['demonstratives'], difficulty: 1 },
];

const l6Orders = [
  orderFrom({ en: 'This is my house.', ar: 'هذا بيتي.', tags: ['demonstratives'] }),
  orderFrom({ en: 'These are my keys.', ar: 'هذه مفاتيحي.', tags: ['demonstratives'] }),
  orderFrom({ en: 'I have some water.', ar: 'لدي قليل من الماء.', tags: ['quantifiers'] }),
  orderFrom({ en: 'Those are her bags.', ar: 'تلك حقائبها.', tags: ['demonstratives'] }),
  orderFrom({ en: 'Do you have any questions?', ar: 'هل لديك أي أسئلة؟', tags: ['quantifiers', 'questions'] }),
  orderFrom({ en: 'That chair is comfortable.', ar: 'ذلك الكرسي مريح.', tags: ['demonstratives'] }),
];

const l6Mc = [
  { question: 'Look at ___ stars! They are bright.', options: ['this', 'that', 'those'], answerIndex: 2, ar: 'انظر إلى تلك النجوم! إنها ساطعة.', tags: ['demonstratives'] },
  { question: '___ man across the street is my uncle.', options: ['This', 'That', 'These'], answerIndex: 1, ar: 'ذلك الرجل عبر الشارع هو عمي.', tags: ['demonstratives'] },
  { question: 'There isn’t ___ sugar left.', options: ['some', 'any', 'many'], answerIndex: 1, ar: 'لم يتبق أي سكر.', tags: ['quantifiers'] },
  { question: 'I need ___ help with this box.', options: ['some', 'any', 'a'], answerIndex: 0, ar: 'أحتاج بعض المساعدة مع هذا الصندوق.', tags: ['quantifiers'] },
  { question: '___ are my friends from school.', options: ['This', 'These', 'That'], answerIndex: 1, ar: 'هؤلاء أصدقائي من المدرسة.', tags: ['demonstratives'] },
  { question: 'Can I have ___ water, please?', options: ['any', 'some', 'many'], answerIndex: 1, ar: 'هل يمكنني الحصول على بعض الماء؟', tags: ['quantifiers'] },
];

/* ============================================================
   Lesson 007 — Singular & Plural Nouns
   ============================================================ */

const NUM_PL = [
  { num: 'three', numAr: 'ثلاثة', pl: 'books', plAr: 'كتب', sg: 'book', sgAr: 'كتاب' },
  { num: 'four', numAr: 'أربعة', pl: 'chairs', plAr: 'كراسي', sg: 'chair', sgAr: 'كرسي' },
  { num: 'five', numAr: 'خمسة', pl: 'keys', plAr: 'مفاتيح', sg: 'key', sgAr: 'مفتاح' },
  { num: 'two', numAr: 'اثنان', pl: 'pens', plAr: 'قلمين', sg: 'pen', sgAr: 'قلم' },
  { num: 'six', numAr: 'ستة', pl: 'photos', plAr: 'صور', sg: 'photo', sgAr: 'صورة' },
  { num: 'three', numAr: 'ثلاث', pl: 'bags', plAr: 'حقائب', sg: 'bag', sgAr: 'حقيبة' },
];

const l7Lt = expandAll([
  pat('There is {N} on the table.', 'هناك {N_ar} على الطاولة.', {
    N: NUM_PL.map((x) => ({ en: `a ${x.sg}`, ar: x.sgAr })),
  }, { tags: ['there-is', 'singular', 'articles'], difficulty: 1 }),
  pat('There are {NUM} {PL} in the room.', 'هناك {NUM_ar} {PL_ar} في الغرفة.', {
    NUM: NUM_PL.map((x) => ({ en: x.num, ar: x.numAr })),
    PL: NUM_PL.map((x) => ({ en: x.pl, ar: x.plAr })),
  }, { tags: ['there-are', 'plural'], difficulty: 1 }),
  pat('I see {NUM} {PL} every day.', 'أرى {NUM_ar} {PL_ar} كل يوم.', {
    NUM: NUM_PL.map((x) => ({ en: x.num, ar: x.numAr })),
    PL: NUM_PL.map((x) => ({ en: x.pl, ar: x.plAr })),
  }, { tags: ['plural', 'present-simple'], difficulty: 1 }),
]);

const l7Fills = [
  { display: 'I have two ___ (box) in my car.', blankWord: 'boxes', en: 'I have two boxes in my car.', ar: 'لدي صندوقان في سيارتي.', acceptedAnswers: ['boxes'], tags: ['plural'], difficulty: 2, hint: 'x → es' },
  { display: 'She studies with her two ___ (child).', blankWord: 'children', en: 'She studies with her two children.', ar: 'تدرس مع طفليها.', acceptedAnswers: ['children'], tags: ['plural', 'irregular-plural'], difficulty: 2 },
  { display: 'There are three ___ (man) in the office.', blankWord: 'men', en: 'There are three men in the office.', ar: 'هناك ثلاثة رجال في المكتب.', acceptedAnswers: ['men'], tags: ['irregular-plural'], difficulty: 2 },
  { display: 'The city has many ___ (bus).', blankWord: 'buses', en: 'The city has many buses.', ar: 'المدينة فيها حافلات كثيرة.', acceptedAnswers: ['buses'], tags: ['plural'], difficulty: 1 },
  { display: 'I brush my ___ (tooth) twice a day.', blankWord: 'teeth', en: 'I brush my teeth twice a day.', ar: 'أنظف أسناني مرتين يوميا.', acceptedAnswers: ['teeth'], tags: ['irregular-plural'], difficulty: 2 },
  { display: 'He read five ___ (story) last month.', blankWord: 'stories', en: 'He read five stories last month.', ar: 'قرأ خمس قصص الشهر الماضي.', acceptedAnswers: ['stories'], tags: ['plural'], difficulty: 2, hint: 'y → ies' },
  { display: 'We saw eight ___ (sheep) on the farm.', blankWord: 'sheep', en: 'We saw eight sheep on the farm.', ar: 'رأينا ثمانية خرفان في المزرعة.', acceptedAnswers: ['sheep'], tags: ['irregular-plural'], difficulty: 3 },
  { display: 'There is one ___ (key) on the desk.', blankWord: 'key', en: 'There is one key on the desk.', ar: 'هناك مفتاح واحد على المكتب.', acceptedAnswers: ['key'], tags: ['singular'], difficulty: 1 },
];

const l7Orders = [
  orderFrom({ en: 'There are three books.', ar: 'هناك ثلاثة كتب.', tags: ['plural'] }),
  orderFrom({ en: 'There is a chair here.', ar: 'هناك كرسي هنا.', tags: ['singular'] }),
  orderFrom({ en: 'I have two pens.', ar: 'لدي قلمين.', tags: ['plural'] }),
  orderFrom({ en: 'She bought four bags.', ar: 'اشترت أربع حقائب.', tags: ['plural'] }),
  orderFrom({ en: 'There are many buses.', ar: 'هناك حافلات كثيرة.', tags: ['plural'] }),
  orderFrom({ en: 'We need more chairs.', ar: 'نحتاج مزيدا من الكراسي.', tags: ['plural'] }),
];

const l7Mc = [
  { question: 'What is the plural of "city"?', options: ['citys', 'cities', 'cityes'], answerIndex: 1, ar: 'الجمع: مدن.', tags: ['plural'] },
  { question: 'What is the plural of "person"?', options: ['persons only', 'people', 'peoples'], answerIndex: 1, ar: 'الجمع: أشخاص.', tags: ['irregular-plural'] },
  { question: 'There ___ two windows in my room.', options: ['is', 'are', 'be'], answerIndex: 1, ar: 'هناك نافذتان في غرفتي.', tags: ['there-are'] },
  { question: 'What is the plural of "foot"?', options: ['foots', 'feet', 'footes'], answerIndex: 1, ar: 'الجمع: أقدام.', tags: ['irregular-plural'] },
  { question: 'I need ten ___ for the party.', options: ['dishs', 'dishes', 'dishies'], answerIndex: 1, ar: 'أحتاج عشرة أطباق للحفلة.', tags: ['plural'] },
  { question: 'How many ___ do you have?', options: ['wifes', 'wives', 'wife'], answerIndex: 1, ar: 'كم زوجة لديك؟ (الجمع: زوجات)', tags: ['plural'] },
];

/* ============================================================
   Lesson 008 — Adjectives
   ============================================================ */

const ADJ_NOUNS = [
  { en: 'a new phone', ar: 'هاتفا جديدا' }, { en: 'an old house', ar: 'بيتا قديما' },
  { en: 'a big bag', ar: 'حقيبة كبيرة' }, { en: 'a small car', ar: 'سيارة صغيرة' },
  { en: 'a long street', ar: 'شارعا طويلا' }, { en: 'a heavy box', ar: 'صندوقا ثقيلا' },
  { en: 'a light bag', ar: 'حقيبة خفيفة' }, { en: 'a quiet room', ar: 'غرفة هادئة' },
  { en: 'a beautiful garden', ar: 'حديقة جميلة' }, { en: 'a difficult test', ar: 'اختبارا صعبا' },
  { en: 'an easy question', ar: 'سؤالا سهلا' }, { en: 'a delicious meal', ar: 'وجبة لذيذة' },
];

const l8Lt = expandAll([
  pat('{NP} is {ADJ}.', '{NP_ar} {ADJ_ar}.', {
    NP: NP_G,
    ADJ: (x) => ['hot', 'cold', 'big', 'small', 'clean', 'difficult', 'easy', 'expensive', 'cheap', 'interesting', 'boring', 'quiet'].map((a) => ({
      en: a,
      ar: x.NP.g === 'f' ? ADJ_G[a].f : ADJ_G[a].m,
    })),
  }, { tags: ['adjectives', 'verb-be'], difficulty: 1, limit: 60 }),
  pat('{S} has {AN}.', 'لدى {S_ar} {AN_ar}.', {
    S: B.PRONOUNS.slice(0, 4),
    AN: ADJ_NOUNS,
  }, { tags: ['adjectives', 'have'], difficulty: 2 }),
]);

const l8Fills = [
  { display: 'The ice is very ___.', blankWord: 'cold', en: 'The ice is very cold.', ar: 'الثلج بارد جدا.', acceptedAnswers: ['cold'], tags: ['adjectives'], difficulty: 1 },
  { display: 'This bag is not heavy, it is ___.', blankWord: 'light', en: 'This bag is not heavy, it is light.', ar: 'هذه الحقيبة ليست ثقيلة، إنها خفيفة.', acceptedAnswers: ['light'], tags: ['adjectives'], difficulty: 2 },
  { display: 'The test was ___; everyone passed.', blankWord: 'easy', en: 'The test was easy; everyone passed.', ar: 'كان الاختبار سهلا؛ نجح الجميع.', acceptedAnswers: ['easy'], tags: ['adjectives'], difficulty: 2 },
  { display: 'I love this soup, it is ___ (very good to eat).', blankWord: 'delicious', en: 'I love this soup, it is delicious.', ar: 'أحب هذا الحساء، إنه لذيذ.', acceptedAnswers: ['delicious'], tags: ['adjectives'], difficulty: 2 },
  { display: 'The opposite of "new" is ___.', blankWord: 'old', en: 'The opposite of "new" is old.', ar: 'عكس جديد هو قديم.', acceptedAnswers: ['old'], tags: ['adjectives', 'antonyms'], difficulty: 1 },
  { display: 'A car is ___ than a bicycle.', blankWord: 'faster', en: 'A car is faster than a bicycle.', ar: 'السيارة أسرع من الدراجة.', acceptedAnswers: ['faster'], tags: ['comparatives'], difficulty: 2, hint: 'compare two things' },
  { display: 'This room is ___ and quiet. I can study here.', blankWord: 'clean', en: 'This room is clean and quiet. I can study here.', ar: 'هذه الغرفة نظيفة وهادئة. أستطيع الدراسة هنا.', acceptedAnswers: ['clean'], tags: ['adjectives'], difficulty: 1 },
  { display: 'The opposite of "cheap" is ___.', blankWord: 'expensive', en: 'The opposite of "cheap" is expensive.', ar: 'عكس رخيص هو غالي.', acceptedAnswers: ['expensive'], tags: ['adjectives', 'antonyms'], difficulty: 1 },
];

const l8Orders = [
  orderFrom({ en: 'The weather is hot.', ar: 'الجو حار.', tags: ['adjectives'] }),
  orderFrom({ en: 'This book is interesting.', ar: 'هذا الكتاب ممتع.', tags: ['adjectives'] }),
  orderFrom({ en: 'She has a big bag.', ar: 'لديها حقيبة كبيرة.', tags: ['adjectives'] }),
  orderFrom({ en: 'The soup is cold.', ar: 'الحساء بارد.', tags: ['adjectives'] }),
  orderFrom({ en: 'He bought a new phone.', ar: 'اشترى هاتفا جديدا.', tags: ['adjectives'] }),
  orderFrom({ en: 'My room is quiet.', ar: 'غرفتي هادئة.', tags: ['adjectives'] }),
];

const l8Mc = [
  { question: 'Which order is correct?', options: ['a red big bag', 'a big red bag', 'a bag red big'], answerIndex: 1, ar: 'حقيبة حمراء كبيرة.', tags: ['adjective-order'], explanation: 'Size comes before color: a big red bag.' },
  { question: 'Adjectives in English come…', options: ['after the noun', 'before the noun', 'after the verb only'], answerIndex: 1, ar: 'الصفات قبل الاسم عادة.', tags: ['adjectives'] },
  { question: 'The city is very ___ at night.', options: ['quietly', 'quiet', 'quietness'], answerIndex: 1, ar: 'المدينة هادئة جدا ليلا.', tags: ['adjectives'] },
  { question: 'She drives a ___ car.', options: ['fastly', 'fast', 'fasting'], answerIndex: 1, ar: 'هي تقود سيارة سريعة.', tags: ['adjectives'] },
  { question: 'Choose the correct sentence.', options: ['The tea is hotly.', 'The tea is hot.', 'The tea hot is.'], answerIndex: 1, ar: 'الشاي ساخن.', tags: ['adjectives'] },
  { question: 'An adjective describes…', options: ['an action', 'a noun', 'a question'], answerIndex: 1, ar: 'الصفة تصف الاسم.', tags: ['adjectives'] },
];

/* ============================================================
   Lesson 009 — Adverbs of Frequency
   ============================================================ */

const FREQ = [
  { en: 'always', ar: 'دائما' }, { en: 'usually', ar: 'عادة' },
  { en: 'often', ar: 'غالبا' }, { en: 'sometimes', ar: 'أحيانا' },
];

const l9Lt = expandAll([
  pat('{S} {F} {VOv} {VOo} {T}.', '{S_ar} {F_ar} {VOv_ar} {VOo_ar} {T_ar}.', {
    S: B.PRONOUNS,
    F: FREQ.slice(0, 4),
    VO: [{ v: 'drink', os: DRINK_LIST }, { v: 'read', os: VO_GROUPS_1[2].os }, { v: 'eat', os: EAT_LIST }, { v: 'watch', os: VO_GROUPS_1[4].os }],
    VOv: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
    VOo: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(0, 3),
  }, { tags: ['adverbs-of-frequency', 'present-simple'], difficulty: 2, limit: 60 }),
  pat('{S} {F} {V} {L}.', '{S_ar} {F_ar} {V_ar} {L_ar}.', {
    S: B.PEOPLE_SING.slice(0, 8),
    F: FREQ.slice(0, 3),
    V: (x) => DAILY_VERBS_PLACES.slice(0, 5).map((v) => ({ en: C.enPresent(v, x.S.agr), ar: C.arPresent(v, x.S.agr) })),
    L: [{ en: 'in the park', ar: 'في الحديقة' }, { en: 'at home', ar: 'في المنزل' }, { en: 'in the library', ar: 'في المكتبة' }, { en: 'at the office', ar: 'في المكتب' }],
  }, { tags: ['adverbs-of-frequency'], difficulty: 2, limit: 50 }),
  pat('I never {VOv} {VOo}.', 'أنا لا {VOv_ar} {VOo_ar} أبدا.', {
    VO: [{ v: 'drink', os: DRINK_LIST.slice(1, 5) }, { v: 'eat', os: EAT_LIST.slice(3, 8) }],
    VOv: (x) => [{ en: x.VO.v, ar: C.arPresent(x.VO.v, 'I') }],
    VOo: (x) => x.VO.os,
  }, { tags: ['adverbs-of-frequency', 'negation'], difficulty: 2 }),
  pat('He is {F} late.', 'هو {F_ar} متأخر.', {
    F: FREQ.slice(0, 4),
  }, { tags: ['adverbs-of-frequency', 'verb-be'], difficulty: 1 }),
]);

const l9Fills = [
  { display: 'I ___ drink coffee; I don’t like it at all.', blankWord: 'never', en: 'I never drink coffee; I don’t like it at all.', ar: 'لا أشرب القهوة أبدا؛ لا أحبها مطلقا.', acceptedAnswers: ['never'], tags: ['adverbs-of-frequency'], difficulty: 2, hint: '0% of the time' },
  { display: 'She ___ arrives at seven. Every single day!', blankWord: 'always', en: 'She always arrives at seven. Every single day!', ar: 'هي تصل دائما في السابعة. كل يوم!', acceptedAnswers: ['always'], tags: ['adverbs-of-frequency'], difficulty: 1 },
  { display: 'We ___ go to the beach; maybe twice a year.', blankWord: 'sometimes', en: 'We sometimes go to the beach; maybe twice a year.', ar: 'نذهب أحيانا إلى الشاطئ؛ ربما مرتين في العام.', acceptedAnswers: ['sometimes'], tags: ['adverbs-of-frequency'], difficulty: 2 },
  { display: 'He is ___ tired after work, almost every day.', blankWord: 'usually', en: 'He is usually tired after work, almost every day.', ar: 'هو عادة متعب بعد العمل، تقريبا كل يوم.', acceptedAnswers: ['usually'], tags: ['adverbs-of-frequency'], difficulty: 2 },
  { display: 'They ___ visit their grandmother on Sundays.', blankWord: 'often', en: 'They often visit their grandmother on Sundays.', ar: 'يزورون جدتهم غالبا أيام الأحد.', acceptedAnswers: ['often'], tags: ['adverbs-of-frequency'], difficulty: 1 },
  { display: 'I ___ wake up at six during the week.', blankWord: 'usually', en: 'I usually wake up at six during the week.', ar: 'أستيقظ عادة في السادسة أيام الأسبوع.', acceptedAnswers: ['usually'], tags: ['adverbs-of-frequency'], difficulty: 1 },
  { display: 'She never ___ breakfast before ten.', blankWord: 'eats', en: 'She never eats breakfast before ten.', ar: 'هي لا تأكل الفطور أبدا قبل العاشرة.', acceptedAnswers: ['eats'], tags: ['adverbs-of-frequency', 'third-person-singular'], difficulty: 2 },
  { display: 'We are ___ happy on Fridays.', blankWord: 'always', en: 'We are always happy on Fridays.', ar: 'نحن سعداء دائما أيام الجمعة.', acceptedAnswers: ['always'], tags: ['adverbs-of-frequency'], difficulty: 1 },
];

const l9Orders = [
  orderFrom({ en: 'I always drink tea.', ar: 'أشرب الشاي دائما.', tags: ['adverbs-of-frequency'] }),
  orderFrom({ en: 'She usually walks in the park.', ar: 'هي عادة تمشي في الحديقة.', tags: ['adverbs-of-frequency'] }),
  orderFrom({ en: 'He is never late.', ar: 'هو لا يتأخر أبدا.', tags: ['adverbs-of-frequency'] }),
  orderFrom({ en: 'We often eat fish.', ar: 'نأكل السمك غالبا.', tags: ['adverbs-of-frequency'] }),
  orderFrom({ en: 'They sometimes play chess.', ar: 'يلعبون الشطرنج أحيانا.', tags: ['adverbs-of-frequency'] }),
  orderFrom({ en: 'I never watch TV at night.', ar: 'لا أشاهد التلفاز ليلا أبدا.', tags: ['adverbs-of-frequency', 'negation'] }),
];

const l9Mc = [
  { question: 'Which sentence is correct?', options: ['I drink always tea.', 'I always drink tea.', 'Always I drink tea.'], answerIndex: 1, ar: 'أشرب الشاي دائما.', tags: ['adverbs-of-frequency', 'adverb-position'], explanation: 'Frequency adverbs go before the main verb.' },
  { question: 'Where does "usually" go? "She ___ works at home."', options: ['before "works"', 'after "at home"', 'at the very end'], answerIndex: 0, ar: 'عادة تعمل في المنزل.', tags: ['adverb-position'] },
  { question: 'With the verb "be", the adverb goes…', options: ['before "be"', 'after "be"', 'at the start'], answerIndex: 1, ar: 'مع كان: الظرف بعده.', tags: ['adverb-position'] },
  { question: 'Which adverb means 0%?', options: ['sometimes', 'never', 'often'], answerIndex: 1, ar: 'أبدا = صفر بالمئة.', tags: ['adverbs-of-frequency'] },
  { question: 'Choose the correct sentence.', options: ['Never I eat meat.', 'I never eat meat.', 'I eat never meat.'], answerIndex: 1, ar: 'لا آكل اللحم أبدا.', tags: ['adverbs-of-frequency'] },
  { question: 'They ___ agree with me; we argue a lot.', options: ['always', 'rarely', 'every day'], answerIndex: 1, ar: 'نادرا ما يوافقونني؛ نتجادل كثيرا.', tags: ['adverbs-of-frequency'] },
];

/* ============================================================
   Lesson 010 — Prepositions of Place
   ============================================================ */

const PLACE_SUBJ = [
  { en: 'The keys', ar: 'المفاتيح', be: 'are' }, { en: 'The book', ar: 'الكتاب', be: 'is' },
  { en: 'My bag', ar: 'حقيبتي', be: 'is' }, { en: 'The shoes', ar: 'الأحذية', be: 'are' },
  { en: 'The phone', ar: 'الهاتف', be: 'is' }, { en: 'The cat', ar: 'القطة', be: 'is' },
  { en: 'The chairs', ar: 'الكراسي', be: 'are' }, { en: 'The water', ar: 'الماء', be: 'is' },
];

const l10Lt = expandAll([
  pat('{S} {BE} {LOC}.', '{S_ar} {LOC_ar}.', {
    S: PLACE_SUBJ,
    BE: (x) => [{ en: x.S.be, ar: '' }],
    LOC: B.LOCATIONS,
  }, { tags: ['prepositions-of-place'], difficulty: 1, limit: 60 }),
  pat('{S} {V} {LOC}.', '{S_ar} {V_ar} {LOC_ar}.', {
    S: B.PRONOUNS.slice(2, 6),
    V: (x) => ['sit', 'stand', 'wait', 'live'].map((v) => ({ en: C.enPresent(v, x.S.agr), ar: C.arPresent(v, x.S.agr) })),
    LOC: B.LOCATIONS.slice(0, 8),
  }, { tags: ['prepositions-of-place', 'present-simple'], difficulty: 2, limit: 60 }),
]);

const l10Fills = [
  { display: 'The book is ___ the table.', blankWord: 'on', en: 'The book is on the table.', ar: 'الكتاب على الطاولة.', acceptedAnswers: ['on'], tags: ['prepositions-of-place'], difficulty: 1 },
  { display: 'The cat is ___ the table, sleeping below it.', blankWord: 'under', en: 'The cat is under the table, sleeping below it.', ar: 'القطة تحت الطاولة نائمة.', acceptedAnswers: ['under'], tags: ['prepositions-of-place'], difficulty: 2 },
  { display: 'My house is ___ the bank and the school.', blankWord: 'between', en: 'My house is between the bank and the school.', ar: 'بيتي بين البنك والمدرسة.', acceptedAnswers: ['between'], tags: ['prepositions-of-place'], difficulty: 2 },
  { display: 'Cairo is ___ Egypt.', blankWord: 'in', en: 'Cairo is in Egypt.', ar: 'القاهرة في مصر.', acceptedAnswers: ['in'], tags: ['prepositions-of-place'], difficulty: 1 },
  { display: 'The picture hangs ___ the wall.', blankWord: 'on', en: 'The picture hangs on the wall.', ar: 'اللوحة معلقة على الحائط.', acceptedAnswers: ['on'], tags: ['prepositions-of-place'], difficulty: 1 },
  { display: 'The bus stop is ___ the hotel.', blankWord: 'in front of', en: 'The bus stop is in front of the hotel.', ar: 'موقف الحافلة أمام الفندق.', acceptedAnswers: ['in front of'], tags: ['prepositions-of-place'], difficulty: 2 },
  { display: 'The garden is ___ the house.', blankWord: 'behind', en: 'The garden is behind the house.', ar: 'الحديقة خلف البيت.', acceptedAnswers: ['behind'], tags: ['prepositions-of-place'], difficulty: 2 },
  { display: 'I sit ___ my friend in class.', blankWord: 'next to', en: 'I sit next to my friend in class.', ar: 'أجلس بجانب صديقي في الصف.', acceptedAnswers: ['next to', 'beside'], tags: ['prepositions-of-place'], difficulty: 2 },
];

const l10Orders = [
  orderFrom({ en: 'The keys are on the table.', ar: 'المفاتيح على الطاولة.', tags: ['prepositions-of-place'] }),
  orderFrom({ en: 'He sits near the window.', ar: 'هو يجلس قرب النافذة.', tags: ['prepositions-of-place'] }),
  orderFrom({ en: 'The car is in the garage.', ar: 'السيارة في الجراج.', tags: ['prepositions-of-place'] }),
  orderFrom({ en: 'She waits at the bus stop.', ar: 'هي تنتظر في موقف الحافلة.', tags: ['prepositions-of-place'] }),
  orderFrom({ en: 'The shoes are under the bed.', ar: 'الأحذية تحت السرير.', tags: ['prepositions-of-place'] }),
  orderFrom({ en: 'We live on the second floor.', ar: 'نحن نعيش في الطابق الثاني.', tags: ['prepositions-of-place'] }),
];

const l10Mc = [
  { question: 'The milk is ___ the fridge.', options: ['in', 'on', 'at'], answerIndex: 0, ar: 'الحليب في الثلاجة.', tags: ['prepositions-of-place'] },
  { question: 'The poster is ___ the wall.', options: ['in', 'on', 'under'], answerIndex: 1, ar: 'الملصق على الحائط.', tags: ['prepositions-of-place'] },
  { question: 'She is waiting ___ the entrance.', options: ['at', 'on', 'in'], answerIndex: 0, ar: 'هي تنتظر عند المدخل.', tags: ['prepositions-of-place'] },
  { question: 'The dog sleep ___ the chair.', options: ['above', 'under', 'between'], answerIndex: 1, ar: 'الكلب ينام تحت الكرسي.', tags: ['prepositions-of-place'] },
  { question: 'Choose the correct sentence.', options: ['The bank is next the shop.', 'The bank is next to the shop.', 'The bank is next of the shop.'], answerIndex: 1, ar: 'البنك بجانب المتجر.', tags: ['prepositions-of-place', 'common-mistakes'] },
  { question: 'My apartment is ___ the third floor.', options: ['in', 'at', 'on'], answerIndex: 2, ar: 'شقتي في الطابق الثالث.', tags: ['prepositions-of-place'] },
];

/* ============================================================
   Lesson 011 — Prepositions of Time
   ============================================================ */

const TIME_PREP = [
  { en: 'at night', ar: 'ليلا' }, { en: 'in the morning', ar: 'في الصباح' },
  { en: 'on Monday', ar: 'يوم الاثنين' }, { en: 'on Fridays', ar: 'أيام الجمعة' },
  { en: 'in summer', ar: 'في الصيف' }, { en: 'at seven', ar: 'في السابعة' },
  { en: 'in 2024', ar: 'في عام 2024' }, { en: 'at noon', ar: 'ظهرا' },
  { en: 'in March', ar: 'في مارس' }, { en: 'on my birthday', ar: 'في عيد ميلادي' },
  { en: 'at the weekend', ar: 'في عطلة نهاية الأسبوع' }, { en: 'in the evening', ar: 'في المساء' },
];

const TIME_SUBJ_EV = [
  { en: 'The meeting', ar: 'الاجتماع' }, { en: 'The class', ar: 'الحصة' },
  { en: 'The movie', ar: 'الفيلم' }, { en: 'The train', ar: 'القطار' },
  { en: 'The game', ar: 'المباراة' }, { en: 'My flight', ar: 'رحلتي' },
];

const l11Lt = expandAll([
  pat('{S} {V} {TP}.', '{S_ar} {V_ar} {TP_ar}.', {
    S: B.PRONOUNS,
    V: (x) => ['study', 'work', 'walk', 'rest', 'read'].map((v) => ({ en: C.enPresent(v, x.S.agr), ar: C.arPresent(v, x.S.agr) })),
    TP: TIME_PREP.slice(0, 8),
  }, { tags: ['prepositions-of-time', 'present-simple'], difficulty: 1, limit: 60 }),
  pat('{E} starts {TP}.', '{E_ar} يبدأ {TP_ar}.', {
    E: TIME_SUBJ_EV.slice(0, 4),
    TP: TIME_PREP.slice(0, 8),
  }, { tags: ['prepositions-of-time'], difficulty: 2 }),
]);

const l11Fills = [
  { display: 'I wake up ___ six o’clock.', blankWord: 'at', en: 'I wake up at six o’clock.', ar: 'أستيقظ في السادسة.', acceptedAnswers: ['at'], tags: ['prepositions-of-time'], difficulty: 1 },
  { display: 'We have English ___ Sundays.', blankWord: 'on', en: 'We have English on Sundays.', ar: 'لدينا الإنجليزية أيام الأحد.', acceptedAnswers: ['on'], tags: ['prepositions-of-time'], difficulty: 1 },
  { display: 'It is very hot ___ summer.', blankWord: 'in', en: 'It is very hot in summer.', ar: 'الجو حار جدا في الصيف.', acceptedAnswers: ['in'], tags: ['prepositions-of-time'], difficulty: 1 },
  { display: 'The bank closes ___ five o’clock.', blankWord: 'at', en: 'The bank closes at five o’clock.', ar: 'يغلق البنك في الخامسة.', acceptedAnswers: ['at'], tags: ['prepositions-of-time'], difficulty: 1 },
  { display: 'My birthday is ___ October.', blankWord: 'in', en: 'My birthday is in October.', ar: 'عيد ميلادي في أكتوبر.', acceptedAnswers: ['in'], tags: ['prepositions-of-time'], difficulty: 2 },
  { display: 'She was born ___ 2001.', blankWord: 'in', en: 'She was born in 2001.', ar: 'وُلدت في عام 2001.', acceptedAnswers: ['in'], tags: ['prepositions-of-time'], difficulty: 2 },
  { display: 'The show starts ___ Friday night.', blankWord: 'on', en: 'The show starts on Friday night.', ar: 'يبدأ العرض ليلة الجمعة.', acceptedAnswers: ['on'], tags: ['prepositions-of-time'], difficulty: 2 },
  { display: 'We rest ___ the weekend.', blankWord: 'at', en: 'We rest at the weekend.', ar: 'نستريح في عطلة نهاية الأسبوع.', acceptedAnswers: ['at', 'on', 'during'], tags: ['prepositions-of-time'], difficulty: 2, hint: 'British: at the weekend' },
];

const l11Orders = [
  orderFrom({ en: 'I study at night.', ar: 'أدرس ليلا.', tags: ['prepositions-of-time'] }),
  orderFrom({ en: 'We travel in July.', ar: 'نسافر في يوليو.', tags: ['prepositions-of-time'] }),
  orderFrom({ en: 'The class starts at eight.', ar: 'تبدأ الحصة في الثامنة.', tags: ['prepositions-of-time'] }),
  orderFrom({ en: 'She works on Saturdays.', ar: 'هي تعمل أيام السبت.', tags: ['prepositions-of-time'] }),
  orderFrom({ en: 'They rest in the evening.', ar: 'يستريحون في المساء.', tags: ['prepositions-of-time'] }),
  orderFrom({ en: 'My flight leaves at noon.', ar: 'رحلتي تقلع ظهرا.', tags: ['prepositions-of-time'] }),
];

const l11Mc = [
  { question: '___ the morning, I drink tea.', options: ['On', 'In', 'At'], answerIndex: 1, ar: 'في الصباح أشرب الشاي.', tags: ['prepositions-of-time'], explanation: 'in the morning / afternoon / evening' },
  { question: 'The party is ___ Saturday.', options: ['in', 'at', 'on'], answerIndex: 2, ar: 'الحفلة يوم السبت.', tags: ['prepositions-of-time'], explanation: 'Days take "on".' },
  { question: 'We eat lunch ___ noon.', options: ['at', 'in', 'on'], answerIndex: 0, ar: 'نتناول الغداء ظهرا.', tags: ['prepositions-of-time'] },
  { question: 'Which is correct?', options: ['in Monday', 'on Monday', 'at Monday'], answerIndex: 1, ar: 'يوم الاثنين.', tags: ['prepositions-of-time'] },
  { question: 'School starts ___ September.', options: ['on', 'in', 'at'], answerIndex: 1, ar: 'تبدأ المدرسة في سبتمبر.', tags: ['prepositions-of-time'] },
  { question: 'The film begins ___ 8:30.', options: ['in', 'on', 'at'], answerIndex: 2, ar: 'يبدأ الفيلم في الثامنة والنصف.', tags: ['prepositions-of-time'] },
];

/* ============================================================
   Lesson 012 — Basic Sentence Construction (Review)
   ============================================================ */

const l12Lt = expandAll([
  pat('{S} {VOv} {VOo} {T}.', '{S_ar} {VOv_ar} {VOo_ar} {T_ar}.', {
    S: [...B.PRONOUNS, ...B.PEOPLE_SING.slice(0, 6)],
    VO: [...VO_GROUPS_1, ...VO_GROUPS_2],
    VOv: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
    VOo: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['svo', 'review', 'present-simple'], difficulty: 2, limit: 80 }),
  pat('{NP} is {ADJ} and {ADJ2}.', '{NP_ar} {ADJ_ar} و{ADJ2_ar}.', {
    NP: NP_G.slice(0, 7),
    ADJ: (x) => ['clean', 'big', 'hot', 'quiet', 'interesting'].map((a) => ({ en: a, ar: x.NP.g === 'f' ? ADJ_G[a].f : ADJ_G[a].m })),
    ADJ2: (x) => ['new', 'small', 'cold', 'beautiful', 'easy'].map((a) => ({ en: a, ar: x.NP.g === 'f' ? ADJ_G[a].f : ADJ_G[a].m })),
  }, { tags: ['review', 'adjectives'], difficulty: 2, limit: 40 }),
]);

const l12Fills = [
  { display: 'My mother ___ dinner every evening.', blankWord: 'cooks', en: 'My mother cooks dinner every evening.', ar: 'أمي تطبخ العشاء كل مساء.', acceptedAnswers: ['cooks'], tags: ['review', 'svo'], difficulty: 1 },
  { display: '___ is my brother, and this is his wife.', blankWord: 'This', en: 'This is my brother, and this is his wife.', ar: 'هذا أخي، وهذه زوجته.', acceptedAnswers: ['This', 'this'], tags: ['review', 'demonstratives'], difficulty: 2 },
  { display: 'The office opens ___ eight ___ the morning.', blankWord: 'at', en: 'The office opens at eight in the morning.', ar: 'يفتح المكتب في الثامنة صباحا.', acceptedAnswers: ['at'], tags: ['review', 'prepositions-of-time'], difficulty: 2 },
  { display: 'We live ___ a small house ___ the city center.', blankWord: 'in', en: 'We live in a small house in the city center.', ar: 'نعيش في بيت صغير في وسط المدينة.', acceptedAnswers: ['in'], tags: ['review', 'prepositions-of-place'], difficulty: 2 },
  { display: 'She has ___ old car, but the car is very clean.', blankWord: 'an', en: 'She has an old car, but the car is very clean.', ar: 'لديها سيارة قديمة، لكن السيارة نظيفة جدا.', acceptedAnswers: ['an'], tags: ['review', 'articles'], difficulty: 2 },
  { display: 'I ___ see my cousins; only once a year.', blankWord: 'rarely', en: 'I rarely see my cousins; only once a year.', ar: 'نادرا ما أرى أبناء عمي؛ مرة واحدة في العام فقط.', acceptedAnswers: ['rarely'], tags: ['review', 'adverbs-of-frequency'], difficulty: 3 },
  { display: 'There ___ four chairs in the kitchen.', blankWord: 'are', en: 'There are four chairs in the kitchen.', ar: 'هناك أربعة كراسي في المطبخ.', acceptedAnswers: ['are'], tags: ['review', 'plural'], difficulty: 1 },
  { display: 'Ali and Sara are here. ___ are ready to start.', blankWord: 'They', en: 'Ali and Sara are here. They are ready to start.', ar: 'علي وسارة هنا. إنهما مستعدان للبدء.', acceptedAnswers: ['They', 'they'], tags: ['review', 'subject-pronouns'], difficulty: 2 },
];

const l12Orders = [
  orderFrom({ en: 'I drink tea every morning.', ar: 'أشرب الشاي كل صباح.', tags: ['review', 'svo'] }),
  orderFrom({ en: 'My sister reads a book.', ar: 'أختي تقرأ كتابا.', tags: ['review', 'svo'] }),
  orderFrom({ en: 'We walk in the park.', ar: 'نمشي في الحديقة.', tags: ['review'] }),
  orderFrom({ en: 'The lesson is easy.', ar: 'الدرس سهل.', tags: ['review', 'adjectives'] }),
  orderFrom({ en: 'They call me every week.', ar: 'يتصلون بي كل أسبوع.', tags: ['review', 'object-pronouns'] }),
  orderFrom({ en: 'She always helps her mother.', ar: 'هي تساعد أمها دائما.', tags: ['review', 'adverbs-of-frequency'] }),
];

const l12Mc = [
  { question: 'Put in order: (tea / every morning / I / drink).', options: ['I drink tea every morning.', 'I every morning drink tea.', 'Tea I drink every morning.'], answerIndex: 0, ar: 'أشرب الشاي كل صباح.', tags: ['review', 'svo', 'adverb-position'] },
  { question: 'Choose the correct sentence.', options: ['He go to school.', 'He goes to school.', 'He going school.'], answerIndex: 1, ar: 'هو يذهب إلى المدرسة.', tags: ['review', 'third-person-singular'] },
  { question: '___ is the weather today? — It is hot.', options: ['What', 'How', 'Where'], answerIndex: 1, ar: 'كيف الجو اليوم؟ — إنه حار.', tags: ['review', 'questions'] },
  { question: 'The bank is ___ the hotel, on the other side of it.', options: ['in front of', 'behind', 'on'], answerIndex: 1, ar: 'البنك خلف الفندق.', tags: ['review', 'prepositions-of-place'] },
  { question: 'She has two ___.', options: ['babys', 'babies', 'baby'], answerIndex: 1, ar: 'لديها طفلتان.', tags: ['review', 'plural'] },
  { question: 'My friends ___ very kind.', options: ['is', 'am', 'are'], answerIndex: 2, ar: 'أصدقائي لطفاء جدا.', tags: ['review', 'verb-be'] },
];

/* ============================================================
   Lesson configs and build
   ============================================================ */

export function buildAll() {
  const lessons = [
    {
      cfg: {
        id: 'lesson-001', section: 'basics', level: 'A1', minutes: 12,
        title: 'Subject, Verb, Object', titleAr: 'الفاعل والفعل والمفعول',
        objectives: ['Build simple SVO sentences', 'Recognize subjects and objects', 'Practice everyday actions'],
        grammar: {
          explanation: 'A simple English sentence usually follows the order Subject + Verb + Object (SVO). The subject does the action, the verb is the action, and the object receives it. Example: "I (subject) drink (verb) tea (object)." Unlike Arabic, English keeps this order fixed — you cannot move the verb before the subject in a statement.',
          explanationAr: 'الجملة الإنجليزية البسيطة تتبع عادة الترتيب: فاعل + فعل + مفعول. الفاعل يقوم بالفعل، والفعل هو الحدث، والمفعول يتأثر به. مثال: "I drink tea" أنا أشرب الشاي. على عكس العربية، هذا الترتيب ثابت في الإنجليزية ولا يُقلب الفعل قبل الفاعل في الجملة الخبرية.',
          examples: [
            { en: 'I drink tea every morning.', ar: 'أشرب الشاي كل صباح.' },
            { en: 'She reads a book.', ar: 'هي تقرأ كتابا.' },
            { en: 'They watch TV in the evening.', ar: 'يشاهدون التلفاز في المساء.' },
          ],
        },
        vocabulary: [
          { word: 'subject', meaningAr: 'فاعل', example: 'The subject comes first.' },
          { word: 'object', meaningAr: 'مفعول به', example: 'The object receives the action.' },
          { word: 'verb', meaningAr: 'فعل', example: 'A verb shows an action.' },
          { word: 'order', meaningAr: 'ترتيب', example: 'English word order is fixed.' },
          { word: 'sentence', meaningAr: 'جملة', example: 'Write a complete sentence.' },
          { word: 'action', meaningAr: 'حدث أو فعل', example: 'Run is an action verb.' },
        ],
        pools: { lt: l1Lt, fill: l1Fills, order: l1Orders, mc: l1Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-002', section: 'basics', level: 'A1', minutes: 12,
        title: 'Subject Pronouns', titleAr: 'ضمائر الفاعل',
        objectives: ['Use I, you, he, she, it, we, they', 'Match pronouns with the verb be', 'Replace names with pronouns'],
        grammar: {
          explanation: 'Subject pronouns replace people or things: I, you, he, she, it, we, they. Use "he" for one male, "she" for one female, "it" for things and animals, "we" for a group including you, and "they" for other groups. The verb "be" changes with the subject: I am, you are, he/she/it is, we are, they are.',
          explanationAr: 'ضمائر الفاعل تحل محل الأشخاص أو الأشياء: I أنا، you أنت، he هو، she هي، it للجماد والحيوان، we نحن، they هم. استخدام he لمذكر واحد وshe لمؤنثة واحدة. يتغير الفعل was/be حسب الفاعل: I am، you are، he is، we are، they are.',
          examples: [
            { en: 'I am a student.', ar: 'أنا طالب.' },
            { en: 'She is my sister.', ar: 'هي أختي.' },
            { en: 'They are teachers.', ar: 'هم معلمون.' },
          ],
        },
        vocabulary: [
          { word: 'pronoun', meaningAr: 'ضمير', example: 'He is a subject pronoun.' },
          { word: 'replace', meaningAr: 'يستبدل', example: 'Pronouns replace names.' },
          { word: 'friend', meaningAr: 'صديق', example: 'We are friends.' },
          { word: 'together', meaningAr: 'معا', example: 'They study together.' },
          { word: 'neighbor', meaningAr: 'جار', example: 'You are my new neighbors.' },
          { word: 'here', meaningAr: 'هنا', example: 'The students are here.' },
        ],
        pools: { lt: l2Lt, fill: l2Fills, order: l2Orders, mc: l2Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-003', section: 'basics', level: 'A1', minutes: 12,
        title: 'Object Pronouns', titleAr: 'ضمائر المفعول',
        objectives: ['Use me, him, her, us, them', 'Place object pronouns after verbs', 'Tell subject and object pronouns apart'],
        grammar: {
          explanation: 'Object pronouns receive the action: me, you, him, her, it, us, them. They come after the verb or after a preposition: "I see him", "Listen to her", "Call me tonight". Do not use subject pronouns in these places — "She helps I" is wrong; say "She helps me".',
          explanationAr: 'ضمائر المفعول تتلقى الفعل: me ني، you ك، him ه، her ها، it ه/ها، us نا، them هم. تأتي بعد الفعل أو بعد حرف الجر: "I see him" أراه، "Listen to her" استمع إليها، "Call me tonight" اتصل بي الليلة. لا تستخدم ضمائر الفاعل في هذه المواضع.',
          examples: [
            { en: 'I see him every day.', ar: 'أراه كل يوم.' },
            { en: 'She helps us a lot.', ar: 'هي تساعدنا كثيرا.' },
            { en: 'Call me tonight.', ar: 'اتصل بي الليلة.' },
          ],
        },
        vocabulary: [
          { word: 'trust', meaningAr: 'يثق', example: 'You can trust us.' },
          { word: 'explain', meaningAr: 'يشرح', example: 'The teacher explains the lesson.' },
          { word: 'carefully', meaningAr: 'بحذر', example: 'Carry them carefully.' },
          { word: 'kind', meaningAr: 'لطيف', example: 'Sara is kind.' },
          { word: 'tonight', meaningAr: 'الليلة', example: 'Call me tonight.' },
          { word: 'answer', meaningAr: 'إجابة', example: 'Tell me the answer.' },
        ],
        pools: { lt: l3Lt, fill: l3Fills, order: l3Orders, mc: l3Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-004', section: 'basics', level: 'A1', minutes: 12,
        title: 'Possessive Adjectives & Pronouns', titleAr: 'صفات وضمائر الملكية',
        objectives: ['Use my, your, his, her, our, their', 'Use mine, yours, his, hers, ours, theirs', 'Talk about belongings'],
        grammar: {
          explanation: 'Possessive adjectives come before a noun: my car, your house, his phone, her bag, our school, their garden. Possessive pronouns stand alone (no noun after): this bag is mine, that car is hers. Compare: "her book" (adjective + noun) vs "the book is hers" (pronoun).',
          explanationAr: 'صفات الملكية تأتي قبل الاسم: my car سيارتي، your house بيتك، his phone هاتفه، her bag حقيبتها، our school مدرستنا، their garden حديقتهم. أما ضمائر الملكية فتأتي وحدها دون اسم بعدها: this bag is mine هذه الحقيبة لي. قارن: "her book" كتابها مقابل "the book is hers" الكتاب لها.',
          examples: [
            { en: 'My car is fast.', ar: 'سيارتي سريعة.' },
            { en: 'Her bag is heavy.', ar: 'حقيبتها ثقيلة.' },
            { en: 'That book is mine.', ar: 'ذلك الكتاب لي.' },
          ],
        },
        vocabulary: [
          { word: 'belongings', meaningAr: 'ممتلكات', example: 'Check your belongings.' },
          { word: 'forget', meaningAr: 'ينسى', example: 'Omar forgot his keys.' },
          { word: 'drop', meaningAr: 'يُسقط', example: 'You dropped your phone.' },
          { word: 'shelf', meaningAr: 'رف', example: 'We keep our books on this shelf.' },
          { word: 'umbrella', meaningAr: 'مظلة', example: 'That is not your umbrella.' },
          { word: 'homework', meaningAr: 'واجب منزلي', example: 'The students finished their homework.' },
        ],
        pools: { lt: l4Lt, fill: l4Fills, order: l4Orders, mc: l4Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-005', section: 'basics', level: 'A1', minutes: 12,
        title: 'Articles: a, an, the', titleAr: 'أدوات التعريف والتنكير',
        objectives: ['Choose a or an by sound', 'Use the for known things', 'Use a/an for first mentions'],
        grammar: {
          explanation: 'Use "a" before consonant sounds (a car, a university) and "an" before vowel sounds (an apple, an hour — the h is silent). Use "the" when both speakers know the exact thing: "I bought a phone. The phone is new." First mention takes a/an, later mentions take the.',
          explanationAr: 'نستخدم a قبل الصوت الساكن (a car، a university) وan قبل الصوت العلة (an apple، an hour حيث الـ h صامتة). ونستخدم the عندما يكون الشيء معروفا للطرفين: "I bought a phone. The phone is new." أول ذكر يأخذ a/an والذكر التالي يأخذ the.',
          examples: [
            { en: 'I have a car.', ar: 'لدي سيارة.' },
            { en: 'She is an engineer.', ar: 'هي مهندسة.' },
            { en: 'The book is interesting.', ar: 'الكتاب ممتع.' },
          ],
        },
        vocabulary: [
          { word: 'article', meaningAr: 'أداة تعريف أو تنكير', example: 'A, an and the are articles.' },
          { word: 'honest', meaningAr: 'صادق', example: 'He is an honest man.' },
          { word: 'engineer', meaningAr: 'مهندس', example: 'My sister is an engineer.' },
          { word: 'movie', meaningAr: 'فيلم', example: 'We watched a movie.' },
          { word: 'huge', meaningAr: 'ضخم', example: 'The elephant was huge.' },
          { word: 'bright', meaningAr: 'ساطع', example: 'The sun is bright.' },
        ],
        pools: { lt: l5Lt, fill: l5Fills, order: l5Orders, mc: l5Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-006', section: 'basics', level: 'A1', minutes: 12,
        title: 'This / That / These / Those and some / any', titleAr: 'أسماء الإشارة و some و any',
        objectives: ['Point to near and far things', 'Match demonstratives with number', 'Use some in offers and any in negatives'],
        grammar: {
          explanation: 'Use "this" (near, singular) and "these" (near, plural) for close things; "that" (far, singular) and "those" (far, plural) for distant things. "Some" is common in positive sentences and polite offers: "I have some money", "Would you like some tea?" "Any" appears in negatives and questions: "I don’t have any money", "Are there any questions?"',
          explanationAr: 'نستخدم this للمفرد القريب وthese للجمع القريب، وthat للمفرد البعيد وthose للجمع البعيد. some تأتي في الجمل المثبتة والعروض المهذبة: "I have some money" لدي بعض المال، "Would you like some tea?" أتريد بعض الشاي؟ وany في النفي والاستفهام: "I don’t have any money"، "Are there any questions?"',
          examples: [
            { en: 'This is my house.', ar: 'هذا بيتي.' },
            { en: 'Those are her bags.', ar: 'تلك حقائبها.' },
            { en: 'Do you have any questions?', ar: 'هل لديك أي أسئلة؟' },
          ],
        },
        vocabulary: [
          { word: 'demonstrative', meaningAr: 'اسم إشارة', example: 'This and that are demonstratives.' },
          { word: 'near', meaningAr: 'قريب', example: 'Use this for near things.' },
          { word: 'far', meaningAr: 'بعيد', example: 'Use that for far things.' },
          { word: 'offer', meaningAr: 'عرض', example: 'Would you like some tea?' },
          { word: 'sugar', meaningAr: 'سكر', example: 'There isn’t any sugar.' },
          { word: 'stars', meaningAr: 'نجوم', example: 'Look at those stars!' },
        ],
        pools: { lt: l6Lt, fill: l6Fills, order: l6Orders, mc: l6Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-007', section: 'basics', level: 'A1', minutes: 12,
        title: 'Singular & Plural Nouns', titleAr: 'المفرد والجمع',
        objectives: ['Form regular plurals with -s and -es', 'Learn key irregular plurals', 'Use there is / there are correctly'],
        grammar: {
          explanation: 'Most nouns add -s (books, keys). Nouns ending in -s, -sh, -ch, -x add -es (buses, boxes). Nouns ending in consonant + y change to -ies (city → cities, story → stories). Important irregulars: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, sheep → sheep. Use "there is" + singular and "there are" + plural.',
          explanationAr: 'معظم الأسماء تأخذ s في الجمع (books، keys). وما ينتهي بـ s أو sh أو ch أو x يأخذ es (buses، boxes). وما ينتهي بصوت ساكن + y تقلب إلى ies (city → cities). ومن المفردات الشاذة: man → men، child → children، person → people، foot → feet، tooth → teeth. نستخدم there is مع المفرد وthere are مع الجمع.',
          examples: [
            { en: 'There is a book on the table.', ar: 'هناك كتاب على الطاولة.' },
            { en: 'There are three books.', ar: 'هناك ثلاثة كتب.' },
            { en: 'I have two boxes.', ar: 'لدي صندوقان.' },
          ],
        },
        vocabulary: [
          { word: 'singular', meaningAr: 'مفرد', example: 'One book is singular.' },
          { word: 'plural', meaningAr: 'جمع', example: 'Two books is plural.' },
          { word: 'farm', meaningAr: 'مزرعة', example: 'We saw sheep on the farm.' },
          { word: 'brush', meaningAr: 'ينظف بالفرشاة', example: 'I brush my teeth.' },
          { word: 'twice', meaningAr: 'مرتين', example: 'Twice a day.' },
          { word: 'month', meaningAr: 'شهر', example: 'He read five stories last month.' },
        ],
        pools: { lt: l7Lt, fill: l7Fills, order: l7Orders, mc: l7Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-008', section: 'basics', level: 'A1', minutes: 12,
        title: 'Adjectives', titleAr: 'الصفات',
        objectives: ['Describe people, things and places', 'Place adjectives before nouns', 'Learn simple adjective pairs and opposites'],
        grammar: {
          explanation: 'Adjectives describe nouns. After "be" they follow the verb: "The weather is hot." Before a noun they come first: "a big bag", "an old house". Size comes before color: "a big red bag". Adjectives never take a plural -s: "two big bags" (not bigs).',
          explanationAr: 'الصفات تصف الأسماء. بعد فعل الكينونة تأتي بعده: "The weather is hot" الجو حار. وقبل الاسم تأتي قبله: "a big bag" حقيبة كبيرة، "an old house" بيت قديم. الحجم يسبق اللون: "a big red bag". والصفة لا تأخذ s للجمع أبدا: "two big bags" وليس bigs.',
          examples: [
            { en: 'The weather is hot.', ar: 'الجو حار.' },
            { en: 'She has a big bag.', ar: 'لديها حقيبة كبيرة.' },
            { en: 'This book is interesting.', ar: 'هذا الكتاب ممتع.' },
          ],
        },
        vocabulary: [
          { word: 'opposite', meaningAr: 'عكس', example: 'Old is the opposite of new.' },
          { word: 'describe', meaningAr: 'يصف', example: 'Adjectives describe nouns.' },
          { word: 'ice', meaningAr: 'ثلج', example: 'The ice is cold.' },
          { word: 'size', meaningAr: 'حجم', example: 'Size comes before color.' },
          { word: 'hungry', meaningAr: 'جائع', example: 'The cat is hungry.' },
          { word: 'comfortable', meaningAr: 'مريح', example: 'That chair is comfortable.' },
        ],
        pools: { lt: l8Lt, fill: l8Fills, order: l8Orders, mc: l8Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-009', section: 'basics', level: 'A1', minutes: 12,
        title: 'Adverbs of Frequency', titleAr: 'ظروف التكرار',
        objectives: ['Rank always, usually, often, sometimes, never', 'Place frequency adverbs correctly', 'Use never with a positive verb'],
        grammar: {
          explanation: 'Frequency adverbs go before the main verb: "I always drink tea." With the verb be, they go after it: "He is always late." "Never" already makes the sentence negative, so the verb stays positive: "I never drink coffee" — not "I never don’t drink". Scale: always (100%) → usually → often → sometimes → never (0%).',
          explanationAr: 'ظروف التكرار تأتي قبل الفعل الأصلي: "I always drink tea" أشرب الشاي دائما. ومع فعل الكينونة تأتي بعده: "He is always late" هو دائما متأخر. وكلمة never تجعل الجملة منفية بذاتها فيبقى الفعل مثبتا: "I never drink coffee" لا أشرب القهوة أبدا. التدرج: دائما ثم عادة ثم غالبا ثم أحيانا ثم أبدا.',
          examples: [
            { en: 'I always drink tea.', ar: 'أشرب الشاي دائما.' },
            { en: 'He is never late.', ar: 'هو لا يتأخر أبدا.' },
            { en: 'We sometimes play chess.', ar: 'نلعب الشطرنج أحيانا.' },
          ],
        },
        vocabulary: [
          { word: 'frequency', meaningAr: 'تكرار', example: 'Frequency adverbs show how often.' },
          { word: 'argue', meaningAr: 'يتجادل', example: 'We argue a lot.' },
          { word: 'arrive', meaningAr: 'يصل', example: 'She always arrives at seven.' },
          { word: 'wake up', meaningAr: 'يستيقظ', example: 'I usually wake up at six.' },
          { word: 'beach', meaningAr: 'شاطئ', example: 'We sometimes go to the beach.' },
          { word: 'single', meaningAr: 'واحد فقط', example: 'Every single day!' },
        ],
        pools: { lt: l9Lt, fill: l9Fills, order: l9Orders, mc: l9Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-010', section: 'basics', level: 'A1', minutes: 12,
        title: 'Prepositions of Place', titleAr: 'حروف الجر المكانية',
        objectives: ['Use in, on, at for locations', 'Describe where things are', 'Use under, behind, between, next to'],
        grammar: {
          explanation: 'Use "in" for inside spaces (in the kitchen, in Egypt), "on" for surfaces (on the table, on the wall), and "at" for points (at the bus stop, at the door). Other useful prepositions: under, behind, in front of, between, next to, near. "Next to" always needs "to": "next to the bank".',
          explanationAr: 'نستخدم in للمكان الداخلي (in the kitchen في المطبخ، in Egypt في مصر)، وon للسطح (on the table على الطاولة)، وat للنقطة (at the bus stop في الموقف). وحروف أخرى مفيدة: تحت، خلف، أمام، بين، بجانب، قرب. ولاحظ أن next to تحتاج دائما إلى to: "next to the bank".',
          examples: [
            { en: 'The keys are on the table.', ar: 'المفاتيح على الطاولة.' },
            { en: 'He sits near the window.', ar: 'هو يجلس قرب النافذة.' },
            { en: 'The garden is behind the house.', ar: 'الحديقة خلف البيت.' },
          ],
        },
        vocabulary: [
          { word: 'surface', meaningAr: 'سطح', example: 'On is for surfaces.' },
          { word: 'garage', meaningAr: 'جراج', example: 'The car is in the garage.' },
          { word: 'entrance', meaningAr: 'مدخل', example: 'She waits at the entrance.' },
          { word: 'wall', meaningAr: 'حائط', example: 'The picture is on the wall.' },
          { word: 'floor', meaningAr: 'طابق', example: 'We live on the second floor.' },
          { word: 'sleep', meaningAr: 'ينام', example: 'The dog sleeps under the chair.' },
        ],
        pools: { lt: l10Lt, fill: l10Fills, order: l10Orders, mc: l10Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-011', section: 'basics', level: 'A1', minutes: 12,
        title: 'Prepositions of Time', titleAr: 'حروف الجر الزمنية',
        objectives: ['Use at for clock times', 'Use on for days and dates', 'Use in for months, seasons, years'],
        grammar: {
          explanation: 'Use "at" for exact times: at six, at noon, at night. Use "on" for days and dates: on Monday, on Fridays, on my birthday. Use "in" for months, seasons, years and long periods: in March, in summer, in 2024, in the morning. Memory line: at a time, on a day, in a month.',
          explanationAr: 'نستخدم at للأوقات المحددة: at six في السادسة، at noon ظهرا، at night ليلا. وon للأيام والتواريخ: on Monday يوم الاثنين، on Fridays أيام الجمعة. وin للشهور والفصول والسنوات والفترات الطويلة: in March في مارس، in summer في الصيف، in 2024 في عام 2024. قاعدة للحفظ: at للوقت، on لليوم، in للشهر.',
          examples: [
            { en: 'I study at night.', ar: 'أدرس ليلا.' },
            { en: 'We travel in July.', ar: 'نسافر في يوليو.' },
            { en: 'The class starts at eight.', ar: 'تبدأ الحصة في الثامنة.' },
          ],
        },
        vocabulary: [
          { word: 'exactly', meaningAr: 'بالضبط', example: 'At is for exact times.' },
          { word: 'birthday', meaningAr: 'عيد ميلاد', example: 'My birthday is in October.' },
          { word: 'born', meaningAr: 'مولود', example: 'She was born in 2001.' },
          { word: 'season', meaningAr: 'فصل', example: 'Summer is a season.' },
          { word: 'close', meaningAr: 'يغلق', example: 'The bank closes at five.' },
          { word: 'rest', meaningAr: 'يستريح', example: 'We rest at the weekend.' },
        ],
        pools: { lt: l11Lt, fill: l11Fills, order: l11Orders, mc: l11Mc },
      },
    },
    {
      cfg: {
        id: 'lesson-012', section: 'basics', level: 'A1', minutes: 15,
        title: 'Basic Sentence Construction (Review)', titleAr: 'بناء الجملة الأساسية (مراجعة)',
        objectives: ['Combine SVO with time and place', 'Mix pronouns, articles and adjectives', 'Fix common beginner mistakes'],
        grammar: {
          explanation: 'A full basic sentence can carry time and place: Subject + Verb + Object + Place + Time — "I drink tea at home every morning." Keep the SVO skeleton first, then add place, then time. Pronouns replace repeated nouns, articles mark new things (a/an) and known things (the), and adjectives describe before nouns.',
          explanationAr: 'الجملة الأساسية الكاملة يمكن أن تحمل الزمان والمكان: فاعل + فعل + مفعول + مكان + زمان — "I drink tea at home every morning" أشرب الشاي في البيت كل صباح. احتفظ بهيكل الجملة أولًا ثم أضف المكان ثم الزمان. والضمائر تحل محل الأسماء المكررة، وأدوات التنكير للجديد وthe للمعروف، والصفات تصف قبل الاسم.',
          examples: [
            { en: 'I drink tea at home every morning.', ar: 'أشرب الشاي في البيت كل صباح.' },
            { en: 'She reads a book in the library on Fridays.', ar: 'تقرأ كتابا في المكتبة أيام الجمعة.' },
            { en: 'They play football in the park after school.', ar: 'يلعبون كرة القدم في الحديقة بعد المدرسة.' },
          ],
        },
        vocabulary: [
          { word: 'skeleton', meaningAr: 'هيكل', example: 'Keep the SVO skeleton.' },
          { word: 'combine', meaningAr: 'يدمج', example: 'Combine place and time.' },
          { word: 'ready', meaningAr: 'مستعد', example: 'They are ready to start.' },
          { word: 'kitchen', meaningAr: 'مطبخ', example: 'Four chairs in the kitchen.' },
          { word: 'cousin', meaningAr: 'ابن عم', example: 'I rarely see my cousins.' },
          { word: 'mistake', meaningAr: 'خطأ', example: 'Fix common mistakes.' },
        ],
        pools: { lt: l12Lt, fill: l12Fills, order: l12Orders, mc: l12Mc },
      },
    },
  ];

  let total = 0;
  for (const { cfg } of lessons) total += build(cfg);
  return { section: 'basics', lessons: lessons.length, exercises: total };
}
