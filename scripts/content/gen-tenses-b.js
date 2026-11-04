/* ============================================================
   Content generator — Section 2b: English Tenses (lessons 025–036)
   Future simple/continuous/perfect/perfect-continuous, be going to,
   present simple for schedules, present continuous for arrangements,
   future in the past, tense contrasts and mixed review.
   ============================================================ */

import * as C from './lib/conjugations.js';
import * as B from './lib/banks.js';
import { assembleLesson, writeLessonFile, expandAll, fillFrom, orderFrom } from './lib/builder.js';
import { validateLessonStructure } from '../../js/lesson-schema.js';

function pat(tmpl, arTmpl, slots, meta = {}) { return { tmpl, arTmpl, slots, ...meta }; }
function build(cfg) {
  const lesson = assembleLesson(cfg);
  const errors = validateLessonStructure(lesson);
  if (errors.length) throw new Error(`[${cfg.id}] schema: ${errors.slice(0, 6).join(' | ')}`);
  writeLessonFile(lesson);
  return lesson.exercises.length;
}

const BE = { I: 'am', you: 'are', he: 'is', she: 'is', we: 'are', they: 'are' };
const HAVE = { I: 'have', you: 'have', he: 'has', she: 'has', we: 'have', they: 'have' };
const FUT_KANA = { I: 'سأكون', you: 'ستكون', he: 'سيكون', she: 'ستكون', we: 'سنكون', they: 'سيكونون' };
const FUT_PLANS = [
  { v: 'travel', os: [{ en: 'to Dubai', ar: 'إلى دبي' }, { en: 'next month', ar: '' }] },
  { v: 'visit', os: [{ en: 'my grandmother', ar: 'جدتي' }, { en: 'the new museum', ar: 'المتحف الجديد' }] },
  { v: 'start', os: [{ en: 'a new job', ar: 'عملا جديدا' }, { en: 'an English course', ar: 'دورة إنجليزية' }] },
  { v: 'buy', os: [{ en: 'a new car', ar: 'سيارة جديدة' }, { en: 'a house', ar: 'بيتا' }] },
  { v: 'call', os: [{ en: 'the manager', ar: 'المدير' }, { en: 'them tomorrow', ar: '' }] },
  { v: 'finish', os: [{ en: 'the project', ar: 'المشروع' }, { en: 'the report', ar: 'التقرير' }] },
  { v: 'study', os: [{ en: 'engineering', ar: 'الهندسة' }, { en: 'medicine', ar: 'الطب' }] },
  { v: 'move', os: [{ en: 'to a bigger flat', ar: 'إلى شقة أكبر' }, { en: 'next year', ar: '' }] },
];
const FUT_T = [{ en: 'tomorrow', ar: 'غدا' }, { en: 'next week', ar: 'الأسبوع القادم' }, { en: 'next month', ar: 'الشهر القادم' }, { en: 'next year', ar: 'العام القادم' }, { en: 'soon', ar: 'قريبا' }, { en: 'tonight', ar: 'الليلة' }, { en: 'later', ar: 'لاحقا' }, { en: 'this weekend', ar: 'عطلة نهاية هذا الأسبوع' }];

/* ============================================================
   025 Future Simple (will) — affirmative
   ============================================================ */
const l25Lt = expandAll([
  pat('{S} will {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: FUT_PLANS.slice(0, 6),
    V: (x) => [{ en: x.VO.v, ar: C.arFuture(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: FUT_T.slice(0, 6),
  }, { tags: ['future-simple', 'will'], difficulty: 2, limit: 70 }),
  pat('{P} will {V} {O} {T}.', '{P_ar} {V_ar} {O_ar} {T_ar}.', {
    P: B.PEOPLE_SING.slice(0, 8),
    VO: FUT_PLANS.slice(2, 8),
    V: (x) => [{ en: x.VO.v, ar: C.arFuture(x.VO.v, x.P.agr) }],
    O: (x) => x.VO.os,
    T: FUT_T.slice(2, 8),
  }, { tags: ['future-simple', 'will'], difficulty: 2, limit: 60 }),
]);

const l25Fills = [
  fillFrom({ en: 'I will call you tomorrow.', ar: 'سأتصل بك غدا.', tags: ['future-simple'] }, 'will call', { hint: 'will + verb' }),
  fillFrom({ en: 'She will travel next month.', ar: 'ستسافر الشهر القادم.', tags: ['future-simple'] }, 'will travel', { hint: 'will + verb' }),
  fillFrom({ en: 'They will arrive tonight.', ar: 'سيصلون الليلة.', tags: ['future-simple'] }, 'will arrive', { hint: 'will + verb' }),
  fillFrom({ en: 'We will start the project on Sunday.', ar: 'سنبدأ المشروع يوم الأحد.', tags: ['future-simple'] }, 'will start', { hint: 'will + verb' }),
  fillFrom({ en: 'He will buy a new car next year.', ar: 'سيشتري سيارة جديدة العام القادم.', tags: ['future-simple'] }, 'will buy', { hint: 'will + verb' }),
  fillFrom({ en: 'I think it will rain tomorrow.', ar: 'أظن أنها ستمطر غدا.', tags: ['future-simple', 'predictions'] }, 'will rain', { hint: 'prediction' }),
  fillFrom({ en: 'The train will leave at nine.', ar: 'سيغادر القطار في التاسعة.', tags: ['future-simple'] }, 'will leave', { hint: 'will + verb' }),
  fillFrom({ en: 'You will love this movie.', ar: 'ستحب هذا الفيلم.', tags: ['future-simple', 'predictions'] }, 'will love', { hint: 'prediction' }),
];

const l25Orders = [
  orderFrom({ en: 'I will call you tomorrow.', ar: 'سأتصل بك غدا.', tags: ['future-simple'] }),
  orderFrom({ en: 'She will travel next week.', ar: 'ستسافر الأسبوع القادم.', tags: ['future-simple'] }),
  orderFrom({ en: 'They will come tonight.', ar: 'سيأتون الليلة.', tags: ['future-simple'] }),
  orderFrom({ en: 'We will finish it soon.', ar: 'سننهيه قريبا.', tags: ['future-simple'] }),
  orderFrom({ en: 'He will help us later.', ar: 'سيساعدنا لاحقا.', tags: ['future-simple'] }),
  orderFrom({ en: 'It will rain tomorrow.', ar: 'ستمطر غدا.', tags: ['future-simple'] }),
];

const l25Mc = [
  { question: 'I think she ___ pass the test.', options: ['wills', 'will', 'will to'], answerIndex: 1, ar: 'أعتقد أنها ستنجح.', tags: ['future-simple'] },
  { question: 'After "will" the verb is…', options: ['past form', 'base form', 'verb + s'], answerIndex: 1, ar: 'بعد will يأتي الفعل المجرد.', tags: ['future-simple'] },
  { question: 'They ___ here soon.', options: ['will arrive', 'will arrives', 'will arriving'], answerIndex: 0, ar: 'سيصلون قريبا.', tags: ['future-simple'] },
  { question: 'Which is a prediction?', options: ['I am 25.', 'It will snow tonight.', 'She works here.'], answerIndex: 1, ar: 'سيلج الليلة.', tags: ['future-simple', 'predictions'] },
  { question: 'We ___ the report by Friday.', options: ['will finish', 'will finished', 'will finishing'], answerIndex: 0, ar: 'سننهي التقرير بحلول الجمعة.', tags: ['future-simple'] },
  { question: 'In Arabic, "will + verb" usually becomes…', options: ['الماضي', 'س + المضارع', 'الأمر'], answerIndex: 1, ar: 'س + الفعل المضارع.', tags: ['future-simple'] },
];

/* ============================================================
   026 Future Continuous
   ============================================================ */
const l26Lt = expandAll([
  pat('{S} will be {V} {T}.', '{S_ar} {V_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'work', os: [] }, { v: 'travel', os: [] }, { v: 'sleep', os: [] }, { v: 'study', os: [] }, { v: 'fly', os: [] }, { v: 'wait', os: [] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    T: [{ en: 'at nine tonight', ar: 'في التاسعة الليلة' }, { en: 'tomorrow morning', ar: 'غدا صباحا' }, { en: 'at this time tomorrow', ar: 'في هذا الوقت غدا' }, { en: 'all day tomorrow', ar: 'طوال يوم غد' }, { en: 'at six in the morning', ar: 'في السادسة صباحا' }, { en: 'tonight', ar: 'الليلة' }],
  }, { tags: ['future-continuous'], difficulty: 3, limit: 70 }),
  pat('At {CLOCK}, {P} will be {V}.', 'في {CLOCK_ar}، {P_ar} {V_ar}.', {
    CLOCK: [{ en: 'ten', ar: 'العاشرة' }, { en: 'noon', ar: 'الظهر' }, { en: 'midnight', ar: 'منتصف الليل' }, { en: 'eight', ar: 'الثامنة' }],
    P: B.PEOPLE_SING.slice(0, 8),
    VO: [{ v: 'cook', os: [] }, { v: 'drive', os: [] }, { v: 'teach', os: [] }, { v: 'rest', os: [] }, { v: 'study', os: [] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.P.agr) }],
  }, { tags: ['future-continuous'], difficulty: 3, limit: 60 }),
]);

const l26Fills = [
  fillFrom({ en: 'At ten, I will be sleeping.', ar: 'في العاشرة سأنام.', tags: ['future-continuous'] }, 'will be sleeping', { hint: 'will be + -ing' }),
  fillFrom({ en: 'She will be travelling all day.', ar: 'ستكون مسافرة طوال اليوم.', tags: ['future-continuous'] }, 'will be travelling', { hint: 'will be + -ing' }),
  fillFrom({ en: 'They will be waiting at the gate.', ar: 'سيكونون ينتظرون عند البوابة.', tags: ['future-continuous'] }, 'will be waiting', { hint: 'will be + -ing' }),
  fillFrom({ en: 'We will be flying at midnight.', ar: 'سنكون في الطيران عند منتصف الليل.', tags: ['future-continuous'] }, 'will be flying', { hint: 'will be + -ing' }),
  fillFrom({ en: 'He will be working at this time tomorrow.', ar: 'سيعمل في هذا الوقت غدا.', tags: ['future-continuous'] }, 'will be working', { hint: 'will be + -ing' }),
  fillFrom({ en: 'At noon, she will be cooking lunch.', ar: 'ظهرا ستطبخ الغداء.', tags: ['future-continuous'] }, 'will be cooking', { hint: 'will be + -ing' }),
  fillFrom({ en: 'I will be studying all evening.', ar: 'سأدرس طوال المساء.', tags: ['future-continuous'] }, 'will be studying', { hint: 'will be + -ing' }),
  fillFrom({ en: 'You will be hearing from us soon.', ar: 'ستسمع منا قريبا.', tags: ['future-continuous'] }, 'will be hearing', { hint: 'will be + -ing' }),
];

const l26Orders = [
  orderFrom({ en: 'I will be working at nine.', ar: 'سأعمل في التاسعة.', tags: ['future-continuous'] }),
  orderFrom({ en: 'She will be sleeping by then.', ar: 'ستكون نائمة بحلول ذلك الوقت.', tags: ['future-continuous'] }),
  orderFrom({ en: 'They will be travelling tomorrow.', ar: 'سيكونون مسافرين غدا.', tags: ['future-continuous'] }),
  orderFrom({ en: 'We will be waiting outside.', ar: 'سنكون ننتظر في الخارج.', tags: ['future-continuous'] }),
  orderFrom({ en: 'He will be driving all night.', ar: 'سيقود طوال الليل.', tags: ['future-continuous'] }),
  orderFrom({ en: 'It will be raining tonight.', ar: 'ستمطر الليلة.', tags: ['future-continuous'] }),
];

const l26Mc = [
  { question: 'At nine tonight, I ___ dinner.', options: ['will cook', 'will be cooking', 'cook'], answerIndex: 1, ar: 'في التاسعة الليلة سأطبخ العشاء.', tags: ['future-continuous'] },
  { question: 'Future continuous = …', options: ['will + base', 'will be + -ing', 'will have + pp'], answerIndex: 1, ar: 'will be + فعل + ing.', tags: ['future-continuous'] },
  { question: 'She ___ at this time tomorrow.', options: ['will fly', 'will be flying', 'flies'], answerIndex: 1, ar: 'ستكون في الطيران في هذا الوقت غدا.', tags: ['future-continuous'] },
  { question: 'Which shows an action in progress at a FUTURE time?', options: ['I work at nine.', 'I will be working at nine.', 'I worked at nine.'], answerIndex: 1, ar: 'سأعمل في التاسعة (حدث جار مستقبلي).', tags: ['future-continuous'] },
  { question: 'They ___ for us at six.', options: ['will be waiting', 'will wait be', 'will been waiting'], answerIndex: 0, ar: 'سيكونون ينتظروننا في السادسة.', tags: ['future-continuous'] },
  { question: 'Don’t call at eight; I ___ the exam.', options: ['will sit', 'will be sitting', 'sit'], answerIndex: 1, ar: 'لا تتصل في الثامنة؛ سأخوض الاختبار.', tags: ['future-continuous'] },
];

/* ============================================================
   027 Future Perfect
   ============================================================ */
const l27Lt = expandAll([
  pat('{S} will have {V} {O} by {E}.', '{FUTK_ar} قد {V_ar} {O_ar} بحلول {E_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'finish', os: [{ en: 'the report', ar: 'التقرير' }, { en: 'the project', ar: 'المشروع' }] }, { v: 'eat', os: [{ en: 'lunch', ar: 'الغداء' }] }, { v: 'leave', os: [{ en: 'the office', ar: 'المكتب' }] }, { v: 'read', os: [{ en: 'three chapters', ar: 'ثلاثة فصول' }] }, { v: 'save', os: [{ en: 'enough money', ar: 'مبلغا كافيا من المال' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    FUTK: (x) => [{ en: '', ar: FUT_KANA[x.S.agr] }],
    E: [{ en: 'Friday', ar: 'الجمعة' }, { en: 'noon', ar: 'الظهر' }, { en: 'next week', ar: 'الأسبوع القادم' }, { en: 'midnight', ar: 'منتصف الليل' }],
  }, { tags: ['future-perfect'], difficulty: 3, limit: 70, filter: (x) => !(x.VO.os[0].en.includes('next month') || x.VO.os[0].en.includes('tomorrow')) }),
]);

const l27Fills = [
  fillFrom({ en: 'She will have finished the report by Friday.', ar: 'ستكون قد أنهت التقرير بحلول الجمعة.', tags: ['future-perfect'] }, 'will have finished', { hint: 'will have + pp' }),
  fillFrom({ en: 'They will have arrived by noon.', ar: 'سيكونون قد وصلوا بحلول الظهر.', tags: ['future-perfect'] }, 'will have arrived', { hint: 'will have + pp' }),
  fillFrom({ en: 'I will have saved enough money by June.', ar: 'سأكون قد جمعت مبلغا كافيا بحلول يونيو.', tags: ['future-perfect'] }, 'will have saved', { hint: 'will have + pp' }),
  fillFrom({ en: 'We will have eaten by eight.', ar: 'سنكون قد أكلنا بحلول الثامنة.', tags: ['future-perfect'] }, 'will have eaten', { hint: 'will have + pp' }),
  fillFrom({ en: 'He will have left by midnight.', ar: 'سيكون قد غادر بحلول منتصف الليل.', tags: ['future-perfect'] }, 'will have left', { hint: 'will have + pp' }),
  fillFrom({ en: 'The film will have started by nine.', ar: 'سيكون الفيلم قد بدأ بحلول التاسعة.', tags: ['future-perfect'] }, 'will have started', { hint: 'will have + pp' }),
  fillFrom({ en: 'You will have received the email by then.', ar: 'ستكون قد استلمت البريد بحلول ذلك الوقت.', tags: ['future-perfect'] }, 'will have received', { hint: 'will have + pp' }),
  fillFrom({ en: 'By 2030, she will have taught for twenty years.', ar: 'بحلول 2030، ستكون قد علمت لمدة عشرين سنة.', tags: ['future-perfect'] }, 'will have taught', { hint: 'will have + pp' }),
];

const l27Orders = [
  orderFrom({ en: 'I will have finished by Friday.', ar: 'سأكون قد أنهيت بحلول الجمعة.', tags: ['future-perfect'] }),
  orderFrom({ en: 'She will have arrived by noon.', ar: 'ستكون قد وصلت بحلول الظهر.', tags: ['future-perfect'] }),
  orderFrom({ en: 'They will have left by then.', ar: 'سيكونون قد غادروا بحلول ذلك الوقت.', tags: ['future-perfect'] }),
  orderFrom({ en: 'We will have eaten by eight.', ar: 'سنكون قد أكلنا بحلول الثامنة.', tags: ['future-perfect'] }),
  orderFrom({ en: 'He will have saved enough.', ar: 'سيكون قد جمع ما يكفي.', tags: ['future-perfect'] }),
  orderFrom({ en: 'The bus will have gone by six.', ar: 'ستكون الحافلة قد ذهبت بحلول السادسة.', tags: ['future-perfect'] }),
];

const l27Mc = [
  { question: 'Future perfect = …', options: ['will + base', 'will be + -ing', 'will have + participle'], answerIndex: 2, ar: 'will have + التصريف الثالث.', tags: ['future-perfect'] },
  { question: 'By Friday, I ___ the whole book.', options: ['will read', 'will have read', 'will be reading'], answerIndex: 1, ar: 'بحلول الجمعة سأكون قد قرأت الكتاب كله.', tags: ['future-perfect'], explanation: 'Completed by a future point → future perfect.' },
  { question: 'She ___ by midnight.', options: ['will have left', 'will left', 'will leaving'], answerIndex: 0, ar: 'ستكون قد غادرت بحلول منتصف الليل.', tags: ['future-perfect'] },
  { question: '"By" in "by Friday" means…', options: ['at Friday exactly', 'not later than Friday', 'after Friday'], answerIndex: 1, ar: 'بحلول الجمعة (ليس بعدها).', tags: ['future-perfect'] },
  { question: 'They ___ the project by June.', options: ['will have completed', 'will complete had', 'will completing'], answerIndex: 0, ar: 'سيكونون قد أكملوا المشروع بحلول يونيو.', tags: ['future-perfect'] },
  { question: 'In Arabic, "will have + pp" is often…', options: ['سوف + مضارع', 'سيكون قد + ماض', 'كان قد + ماض'], answerIndex: 1, ar: 'سيكون قد + الفعل الماضي.', tags: ['future-perfect'] },
];

/* ============================================================
   028 Future Perfect Continuous
   ============================================================ */
const l28Lt = expandAll([
  pat('By {E}, {S} will have been {V} {D}.', 'بحلول {E_ar}، {FUTK_ar} قد {V_ar} {D_ar}.', {
    E: [{ en: 'ten tonight', ar: 'العاشرة الليلة' }, { en: 'June', ar: 'يونيو' }, { en: 'next month', ar: 'الشهر القادم' }, { en: 'midnight', ar: 'منتصف الليل' }],
    S: B.PRONOUNS,
    VO: [{ v: 'work', os: [] }, { v: 'study', os: [] }, { v: 'wait', os: [] }, { v: 'drive', os: [] }, { v: 'live', os: [] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    D: [{ en: 'for eight hours', ar: 'لمدة ثماني ساعات' }, { en: 'for three hours', ar: 'لمدة ثلاث ساعات' }, { en: 'for ten years', ar: 'لمدة عشر سنوات' }, { en: 'for two hours', ar: 'لمدة ساعتين' }],
    FUTK: (x) => [{ en: '', ar: FUT_KANA[x.S.agr] }],
  }, { tags: ['future-perfect-continuous'], difficulty: 3, limit: 70 }),
]);

const l28Fills = [
  fillFrom({ en: 'By ten, I will have been working for eight hours.', ar: 'بحلول العاشرة، سأكون قد عملت لمدة ثماني ساعات.', tags: ['future-perfect-continuous'] }, 'will have been working', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By June, she will have been studying here for four years.', ar: 'بحلول يونيو، ستكون قد درست هنا لمدة أربع سنوات.', tags: ['future-perfect-continuous'] }, 'will have been studying', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By noon, they will have been driving for six hours.', ar: 'بحلول الظهر، سيكونون قد قادوا لمدة ست ساعات.', tags: ['future-perfect-continuous'] }, 'will have been driving', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By midnight, we will have been waiting for five hours.', ar: 'بحلول منتصف الليل، سنكون قد انتظرنا لمدة خمس ساعات.', tags: ['future-perfect-continuous'] }, 'will have been waiting', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'Next month, he will have been living here for a year.', ar: 'الشهر القادم، سيكون قد عاش هنا لمدة سنة.', tags: ['future-perfect-continuous'] }, 'will have been living', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By Sunday, I will have been learning English for a month.', ar: 'بحلول الأحد، سأكون قد تعلمت الإنجليزية لمدة شهر.', tags: ['future-perfect-continuous'] }, 'will have been learning', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By five, she will have been teaching all day.', ar: 'بحلول الخامسة، ستكون قد علمت طوال اليوم.', tags: ['future-perfect-continuous'] }, 'will have been teaching', { hint: 'will have been + -ing' }),
  fillFrom({ en: 'By then, you will have been practicing for weeks.', ar: 'بحلول ذلك الوقت، ستكون قد تدربت لمدة أسابيع.', tags: ['future-perfect-continuous'] }, 'will have been practicing', { hint: 'will have been + -ing' }),
];

const l28Orders = [
  orderFrom({ en: 'By ten, I will have been working for hours.', ar: 'بحلول العاشرة، سأكون قد عملت لمدة ساعات.', tags: ['future-perfect-continuous'] }),
  orderFrom({ en: 'She will have been teaching since morning.', ar: 'ستكون قد علمت منذ الصباح.', tags: ['future-perfect-continuous'] }),
  orderFrom({ en: 'They will have been waiting for hours.', ar: 'سيكونون قد انتظروا لمدة ساعات.', tags: ['future-perfect-continuous'] }),
  orderFrom({ en: 'He will have been living here for years.', ar: 'سيكون قد عاش هنا لمدة سنوات.', tags: ['future-perfect-continuous'] }),
  orderFrom({ en: 'We will have been driving all night.', ar: 'سنكون قد قُدنا طوال الليل.', tags: ['future-perfect-continuous'] }),
  orderFrom({ en: 'I will have been studying since March.', ar: 'سأكون قد درست منذ مارس.', tags: ['future-perfect-continuous'] }),
];

const l28Mc = [
  { question: 'By June, she ___ here for five years.', options: ['will work', 'will have been working', 'will be work'], answerIndex: 1, ar: 'بحلول يونيو ستكون قد عملت هنا لمدة خمس سنوات.', tags: ['future-perfect-continuous'] },
  { question: 'Future perfect continuous stresses…', options: ['the result', 'the duration up to a future point', 'the past time'], answerIndex: 1, ar: 'المدة حتى نقطة مستقبلية.', tags: ['future-perfect-continuous'] },
  { question: 'By midnight, we ___ for ten hours.', options: ['will have driven', 'will have been driving', 'both are possible'], answerIndex: 2, ar: 'كلاهما صحيح مع فارق بسيط في التركيز.', tags: ['future-perfect-continuous'], explanation: 'Continuous stresses duration.' },
  { question: 'Which is correct?', options: ['will have been working', 'will have been work', 'will been working'], answerIndex: 0, ar: 'الصيغة الصحيحة.', tags: ['future-perfect-continuous'] },
  { question: 'By May, he ___ English for two years.', options: ['will have been learning', 'will learn been', 'will be learning'], answerIndex: 0, ar: 'بحلول مايو سيكون قد تعلم الإنجليزية لمدة سنتين.', tags: ['future-perfect-continuous'] },
  { question: '"بحلول" in English time clauses is…', options: ['by', 'until after', 'since'], answerIndex: 0, ar: 'by.', tags: ['future-perfect-continuous'] },
];

/* ============================================================
   029 Be Going To Future
   ============================================================ */
const l29Lt = expandAll([
  pat('{S} {BE} going to {V} {O} {T}.', '{S_ar} سوف {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BE: (x) => [{ en: BE[x.S.agr], ar: '' }],
    VO: FUT_PLANS,
    V: (x) => [{ en: x.VO.v, ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: FUT_T.slice(0, 5),
  }, { tags: ['be-going-to'], difficulty: 2, limit: 70 }),
  pat('Look at those clouds! It {BE} going to rain.', 'انظر إلى تلك السحب! سوف تمطر.', {
    BE: [{ en: 'is', ar: '' }],
  }, { tags: ['be-going-to', 'evidence'], difficulty: 2 }),
]);

const l29Fills = [
  fillFrom({ en: 'I am going to start a new job.', ar: 'سوف أبدأ عملا جديدا.', tags: ['be-going-to'] }, 'am going to start', { hint: 'am/is/are going to + verb' }),
  fillFrom({ en: 'She is going to visit Dubai.', ar: 'سوف تزور دبي.', tags: ['be-going-to'] }, 'is going to visit', { hint: 'is going to + verb' }),
  fillFrom({ en: 'They are going to buy a house.', ar: 'سوف يشترون بيتا.', tags: ['be-going-to'] }, 'are going to buy', { hint: 'are going to + verb' }),
  fillFrom({ en: 'Look at the sky! It is going to rain.', ar: 'انظر إلى السماء! سوف تمطر.', tags: ['be-going-to', 'evidence'] }, 'is going to rain', { hint: 'دليل ظاهر' }),
  fillFrom({ en: 'We are going to travel next week.', ar: 'سوف نسافر الأسبوع القادم.', tags: ['be-going-to'] }, 'are going to travel', { hint: 'are going to + verb' }),
  fillFrom({ en: 'He is going to study medicine.', ar: 'سوف يدرس الطب.', tags: ['be-going-to'] }, 'is going to study', { hint: 'is going to + verb' }),
  fillFrom({ en: 'I am going to call the manager.', ar: 'سوف أتصل بالمدير.', tags: ['be-going-to'] }, 'am going to call', { hint: 'am going to + verb' }),
  fillFrom({ en: 'She is going to move next year.', ar: 'سوف تنتقل العام القادم.', tags: ['be-going-to'] }, 'is going to move', { hint: 'is going to + verb' }),
];

const l29Orders = [
  orderFrom({ en: 'I am going to sleep early.', ar: 'سوف أنام مبكرا.', tags: ['be-going-to'] }),
  orderFrom({ en: 'She is going to cook tonight.', ar: 'سوف تطبخ الليلة.', tags: ['be-going-to'] }),
  orderFrom({ en: 'They are going to play outside.', ar: 'سوف يلعبون في الخارج.', tags: ['be-going-to'] }),
  orderFrom({ en: 'We are going to watch a movie.', ar: 'سوف نشاهد فيلما.', tags: ['be-going-to'] }),
  orderFrom({ en: 'He is going to help us.', ar: 'سوف يساعدنا.', tags: ['be-going-to'] }),
  orderFrom({ en: 'It is going to snow.', ar: 'سوف يثلج.', tags: ['be-going-to'] }),
];

const l29Mc = [
  { question: 'She ___ going to start a course.', options: ['am', 'is', 'are'], answerIndex: 1, ar: 'سوف تبدأ دورة.', tags: ['be-going-to'] },
  { question: 'Use "going to" for…', options: ['random predictions', 'plans and clear evidence', 'past habits'], answerIndex: 1, ar: 'الخطط والدلائل الواضحة.', tags: ['be-going-to'] },
  { question: 'I ___ going to call him tonight.', options: ['is', 'are', 'am'], answerIndex: 2, ar: 'سوف أتصل به الليلة.', tags: ['be-going-to'] },
  { question: 'Look! The car ___ going to crash!', options: ['is', 'am', 'be'], answerIndex: 0, ar: 'انظر! السيارة ستصطدم!', tags: ['be-going-to', 'evidence'] },
  { question: 'Which is a plan (not evidence)?', options: ['It is going to rain (clouds).', 'We are going to travel in July.', 'Ouch! I am going to fall!'], answerIndex: 1, ar: 'سوف نسافر في يوليو (خطة).', tags: ['be-going-to'] },
  { question: 'They ___ going to sell the car.', options: ['is', 'are', 'am'], answerIndex: 1, ar: 'سوف يبيعون السيارة.', tags: ['be-going-to'] },
];

/* ============================================================
   030 Present Simple for scheduled future
   ============================================================ */
const SCHED_SUBJ = [
  { en: 'The train', ar: 'القطار' }, { en: 'The bus', ar: 'الحافلة' }, { en: 'The flight', ar: 'الرحلة' },
  { en: 'The class', ar: 'الحصة' }, { en: 'The meeting', ar: 'الاجتماع' }, { en: 'The movie', ar: 'الفيلم' },
  { en: 'The shop', ar: 'المتجر' }, { en: 'The museum', ar: 'المتحف' },
];
const SCHED_V = [
  { v: 'leave', ar3: 'يغادر' }, { v: 'arrive', ar3: 'يصل' }, { v: 'start', ar3: 'يبدأ' },
  { v: 'open', ar3: 'يفتح' }, { v: 'close', ar3: 'يغلق' }, { v: 'end', ar3: 'ينتهي' },
];
const l30Lt = expandAll([
  pat('{S} {V} {T} {D}.', '{V_ar} {S_ar} {T_ar} {D_ar}.', {
    S: SCHED_SUBJ.slice(0, 6),
    VO: SCHED_V.slice(0, 4),
    V: (x) => [{ en: C.enPresent(x.VO.v, 'he'), ar: x.VO.ar3 }],
    T: [{ en: 'tomorrow', ar: 'غدا' }, { en: 'tonight', ar: 'الليلة' }, { en: 'on Monday', ar: 'يوم الاثنين' }, { en: 'next week', ar: 'الأسبوع القادم' }],
    D: [{ en: 'at nine', ar: 'في التاسعة' }, { en: 'at six in the morning', ar: 'في السادسة صباحا' }, { en: 'at noon', ar: 'ظهرا' }, { en: 'at eight', ar: 'في الثامنة' }],
  }, { tags: ['scheduled-future', 'present-simple'], difficulty: 3, limit: 70 }),
  pat('The {PLACE} {V} at {C} every day.', '{V_ar} {PLACE_ar} في {C_ar} كل يوم.', {
    PLACE: [{ en: 'library', ar: 'المكتبة' }, { en: 'bank', ar: 'البنك' }, { en: 'market', ar: 'السوق' }, { en: 'office', ar: 'المكتب' }],
    V: [{ en: 'opens', ar: 'يفتح' }, { en: 'closes', ar: 'يغلق' }],
    C: [{ en: 'eight', ar: 'الثامنة' }, { en: 'nine', ar: 'التاسعة' }, { en: 'five', ar: 'الخامسة' }, { en: 'six', ar: 'السادسة' }],
  }, { tags: ['scheduled-future', 'present-simple'], difficulty: 2, limit: 40 }),
]);

const l30Fills = [
  fillFrom({ en: 'The train leaves at nine tomorrow.', ar: 'يغادر القطار في التاسعة غدا.', tags: ['scheduled-future'] }, 'leaves', { hint: 'جدول زمني → مضارع بسيط' }),
  fillFrom({ en: 'The class starts at eight on Monday.', ar: 'تبدأ الحصة في الثامنة يوم الاثنين.', tags: ['scheduled-future'] }, 'starts', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The museum opens at ten.', ar: 'يفتح المتحف في العاشرة.', tags: ['scheduled-future'] }, 'opens', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The flight arrives at noon.', ar: 'تصل الرحلة ظهرا.', tags: ['scheduled-future'] }, 'arrives', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The shop closes at six today.', ar: 'يغلق المتجر في السادسة اليوم.', tags: ['scheduled-future'] }, 'closes', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The movie begins at nine tonight.', ar: 'يبدأ الفيلم في التاسعة الليلة.', tags: ['scheduled-future'] }, 'begins', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The meeting ends at five.', ar: 'ينتهي الاجتماع في الخامسة.', tags: ['scheduled-future'] }, 'ends', { hint: 'مضارع بسيط' }),
  fillFrom({ en: 'The bus leaves in ten minutes.', ar: 'تغادر الحافلة بعد عشر دقائق.', tags: ['scheduled-future'] }, 'leaves', { hint: 'مضارع بسيط' }),
];

const l30Orders = [
  orderFrom({ en: 'The train leaves at nine.', ar: 'يغادر القطار في التاسعة.', tags: ['scheduled-future'] }),
  orderFrom({ en: 'The class starts tomorrow.', ar: 'تبدأ الحصة غدا.', tags: ['scheduled-future'] }),
  orderFrom({ en: 'The museum opens at ten.', ar: 'يفتح المتحف في العاشرة.', tags: ['scheduled-future'] }),
  orderFrom({ en: 'The flight arrives at noon.', ar: 'تصل الرحلة ظهرا.', tags: ['scheduled-future'] }),
  orderFrom({ en: 'The bank closes at five.', ar: 'يغلق البنك في الخامسة.', tags: ['scheduled-future'] }),
  orderFrom({ en: 'The movie starts tonight.', ar: 'يبدأ الفيلم الليلة.', tags: ['scheduled-future'] }),
];

const l30Mc = [
  { question: 'For timetables we use…', options: ['will', 'present simple', 'going to'], answerIndex: 1, ar: 'للجداول الزمنية نستخدم المضارع البسيط.', tags: ['scheduled-future'] },
  { question: 'The train ___ at seven tomorrow.', options: ['will leave', 'leaves', 'leaving'], answerIndex: 1, ar: 'يغادر القطار في السابعة غدا (جدول).', tags: ['scheduled-future'] },
  { question: 'This "present for future" is…', options: ['a different tense', 'a special USE of present simple', 'past tense'], answerIndex: 1, ar: 'استخدام خاص للمضارع البسيط، ليس زمنا جديدا.', tags: ['scheduled-future'] },
  { question: 'The flight ___ at noon tomorrow.', options: ['arrive', 'arrives', 'arriving'], answerIndex: 1, ar: 'تصل الرحلة ظهرا غدا.', tags: ['scheduled-future'] },
  { question: 'Which sentence is about a timetable?', options: ['I am leaving now.', 'The bus leaves at six.', 'We will buy tickets.'], answerIndex: 1, ar: 'تغادر الحافلة في السادسة (جدول).', tags: ['scheduled-future'] },
  { question: 'The meeting ___ at five.', options: ['end', 'ends', 'ending'], answerIndex: 1, ar: 'ينتهي الاجتماع في الخامسة.', tags: ['scheduled-future'] },
];

/* ============================================================
   031 Present Continuous for arranged future
   ============================================================ */
const ARRANGE = [
  { v: 'meet', os: [{ en: 'the manager', ar: 'المدير' }, { en: 'her tomorrow', ar: '' }], arMap: { meet: 'قابل' } },
  { v: 'visit', os: [{ en: 'my cousins', ar: 'أبناء عمي' }, { en: 'the new office', ar: 'المكتب الجديد' }] },
  { v: 'see', os: [{ en: 'the doctor', ar: 'الطبيب' }, { en: 'the dentist', ar: 'طبيب الأسنان' }] },
  { v: 'play', os: [{ en: 'football on Friday', ar: 'كرة القدم يوم الجمعة' }, { en: 'chess tonight', ar: 'الشطرنج الليلة' }] },
  { v: 'eat', os: [{ en: 'dinner with friends', ar: 'العشاء مع الأصدقاء' }] },
  { v: 'attend', os: [{ en: 'a meeting', ar: 'اجتماعا' }, { en: 'a workshop', ar: 'ورشة عمل' }] },
  { v: 'fly', os: [{ en: 'to Cairo', ar: 'إلى القاهرة' }, { en: 'to London', ar: 'إلى لندن' }] },
];
const l31Lt = expandAll([
  pat('{S} {BE} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BE: (x) => [{ en: BE[x.S.agr], ar: '' }],
    VO: ARRANGE.slice(0, 5),
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: [{ en: 'tomorrow', ar: 'غدا' }, { en: 'tonight', ar: 'الليلة' }, { en: 'this weekend', ar: 'عطلة نهاية هذا الأسبوع' }, { en: 'on Saturday', ar: 'يوم السبت' }, { en: 'next Monday', ar: 'الاثنين القادم' }],
  }, { tags: ['arranged-future', 'present-continuous'], difficulty: 3, limit: 70 }),
  pat('I {BE} leaving tomorrow morning.', 'سأغادر غدا صباحا.', {
    BE: [{ en: 'am', ar: '' }],
  }, { tags: ['arranged-future'], difficulty: 2 }),
]);

const l31Fills = [
  fillFrom({ en: 'We are meeting the manager tomorrow.', ar: 'نتقابل مع المدير غدا.', tags: ['arranged-future'] }, 'are meeting', { hint: 'ترتيب مؤكد → مستمر' }),
  fillFrom({ en: 'I am seeing the doctor on Sunday.', ar: 'سأزور الطبيب يوم الأحد.', tags: ['arranged-future'] }, 'am seeing', { hint: 'موعد مؤكد' }),
  fillFrom({ en: 'She is flying to Cairo tonight.', ar: 'تسافر إلى القاهرة الليلة.', tags: ['arranged-future'] }, 'is flying', { hint: 'ترتيب مؤكد' }),
  fillFrom({ en: 'They are playing on Saturday.', ar: 'سيلعبون يوم السبت.', tags: ['arranged-future'] }, 'are playing', { hint: 'ترتيب مؤكد' }),
  fillFrom({ en: 'He is attending a meeting tonight.', ar: 'يحضر اجتماعا الليلة.', tags: ['arranged-future'] }, 'is attending', { hint: 'ترتيب مؤكد' }),
  fillFrom({ en: 'We are visiting my cousins this weekend.', ar: 'نزور أبناء عمي عطلة نهاية هذا الأسبوع.', tags: ['arranged-future'] }, 'are visiting', { hint: 'ترتيب مؤكد' }),
  fillFrom({ en: 'I am leaving next Monday.', ar: 'أغادر الاثنين القادم.', tags: ['arranged-future'] }, 'am leaving', { hint: 'ترتيب مؤكد' }),
  fillFrom({ en: 'She is coming with us tomorrow.', ar: 'تأتي معنا غدا.', tags: ['arranged-future'] }, 'is coming', { hint: 'ترتيب مؤكد' }),
];

const l31Orders = [
  orderFrom({ en: 'We are meeting tomorrow.', ar: 'نتقابل غدا.', tags: ['arranged-future'] }),
  orderFrom({ en: 'I am seeing her on Friday.', ar: 'سأراها يوم الجمعة.', tags: ['arranged-future'] }),
  orderFrom({ en: 'They are flying tonight.', ar: 'يسافرون الليلة.', tags: ['arranged-future'] }),
  orderFrom({ en: 'She is coming with us.', ar: 'هي تأتي معنا.', tags: ['arranged-future'] }),
  orderFrom({ en: 'He is leaving next week.', ar: 'يغادر الأسبوع القادم.', tags: ['arranged-future'] }),
  orderFrom({ en: 'We are having a meeting.', ar: 'سنعقد اجتماعا.', tags: ['arranged-future'] }),
];

const l31Mc = [
  { question: 'For fixed personal arrangements we use…', options: ['present continuous', 'past simple', 'present simple'], answerIndex: 0, ar: 'للترتيبات الشخصية المؤكدة نستخدم المضارع المستمر.', tags: ['arranged-future'] },
  { question: 'I ___ my friend tomorrow (arranged).', options: ['meet', 'am meeting', 'met'], answerIndex: 1, ar: 'سأقابل صديقي غدا (مرتب).', tags: ['arranged-future'] },
  { question: 'She ___ to Dubai tonight (ticket booked).', options: ['flies', 'is flying', 'flew'], answerIndex: 1, ar: 'تسافر إلى دبي الليلة (تذكرة محجوزة).', tags: ['arranged-future'] },
  { question: 'The train ___ at six (timetable).', options: ['is leaving', 'leaves', 'left'], answerIndex: 1, ar: 'يغادر القطار في السادسة (جدول).', tags: ['scheduled-future', 'arranged-future'], explanation: 'Timetables → present simple; personal arrangements → continuous.' },
  { question: 'We ___ dinner with them tonight.', options: ['are having', 'has', 'had'], answerIndex: 0, ar: 'نتناول العشاء معهم الليلة.', tags: ['arranged-future'] },
  { question: 'This use of the continuous is about…', options: ['now', 'the future', 'the past'], answerIndex: 1, ar: 'المستقبل.', tags: ['arranged-future'] },
];

/* ============================================================
   032 Future in the Past
   ============================================================ */
const l32Pairs = [
  { en: 'I thought you would come.', ar: 'ظننت أنك ستأتي.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She said she would call me.', ar: 'قالت إنها ستتصل بي.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I knew he would help us.', ar: 'عرفت أنه سيساعدنا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We were going to travel, but we changed our minds.', ar: 'كنا نعتزم السفر، لكننا غيرنا رأينا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'They told me the meeting would start at nine.', ar: 'أخبروني أن الاجتماع سيبدأ في التاسعة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I promised I would finish the report.', ar: 'وعدت أنني سأنهي التقرير.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She hoped it would not rain.', ar: 'أملت ألا تمطر.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He said he was going to buy a car.', ar: 'قال إنه سيشتري سيارة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I was sure they would win.', ar: 'كنت متأكدا أنهم سيفوزون.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We thought the bus would be full.', ar: 'ظننا أن الحافلة ستكون ممتلئة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She knew I would wait for her.', ar: 'عرفت أنني سأنتظرها.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I felt that something bad would happen.', ar: 'شعرت أن شيئا سيئا سيحدث.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'They believed the plan would work.', ar: 'اعتقدوا أن الخطة ستنجح.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He hoped she would agree.', ar: 'أمل أن توافق.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I was going to call you, but I forgot.', ar: 'كنت سأتصل بك، لكنني نسيت.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She was going to join us, but she was busy.', ar: 'كانت ستنضم إلينا، لكنها كانت مشغولة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We knew the film would be long.', ar: 'عرفنا أن الفيلم سيكون طويلا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I wondered when they would arrive.', ar: 'تساءلت متى سيصلون.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He told us he would be late.', ar: 'أخبرنا أنه سيتأخر.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She said the shop would open at ten.', ar: 'قالت إن المتجر سيفتح في العاشرة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I expected the test would be easy.', ar: 'توقعت أن يكون الاختبار سهلا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We were going to eat out, but the restaurant was closed.', ar: 'كنا سنأكل في الخارج، لكن المطعم كان مغلقا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'They thought the price would go down.', ar: 'ظنوا أن السعر سينخفض.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I hoped the weather would be nice.', ar: 'أملت أن يكون الجو جميلا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He promised he would send the file.', ar: 'وعد أنه سيرسل الملف.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She was sure we would like the gift.', ar: 'كانت متأكدة أننا سنحب الهدية.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I asked if he would come with us.', ar: 'سألته إن كان سيأتي معنا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We thought she would refuse.', ar: 'ظننا أنها سترفض.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'They said the train would be delayed.', ar: 'قالوا إن القطار سيتأخر.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I knew she would pass the exam.', ar: 'عرفت أنها ستنجح في الامتحان.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She wondered if it would snow.', ar: 'تساءلت إن كان سيثلج.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He believed the project would succeed.', ar: 'اعتقد أن المشروع سينجح.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I was going to write to you last week.', ar: 'كنت سأكتب لك الأسبوع الماضي.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We knew the road would be busy.', ar: 'عرفنا أن الطريق سيكون مزدحما.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She said she would bring dessert.', ar: 'قالت إنها ستجلب الحلوى.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I thought the shop would be closed.', ar: 'ظننت أن المتجر سيكون مغلقا.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He was going to sell his bike, but he kept it.', ar: 'كان سيبيع دراجته، لكنه احتفظ بها.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We expected the trip would be short.', ar: 'توقعنا أن تكون الرحلة قصيرة.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I knew you would understand.', ar: 'عرفت أنك ستفهم.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She told me she would meet us there.', ar: 'أخبرتني أنها ستقابلنا هناك.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I believed the team would play better.', ar: 'اعتقدت أن الفريق سيلعب بشكل أفضل.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'We thought the hotel would be cheaper.', ar: 'ظننا أن الفندق سيكون أرخص.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'She said the medicine would help.', ar: 'قالت إن الدواء سيساعد.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'I was going to bake a cake for you.', ar: 'كنت سأخبز كيكة من أجلك.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'He knew the teacher would praise him.', ar: 'عرف أن المعلم سيمدحه.', tags: ['future-in-the-past'], difficulty: 3 },
  { en: 'They promised the road would be safe.', ar: 'وعدوا أن الطريق سيكون آمنا.', tags: ['future-in-the-past'], difficulty: 3 },
];

const l32Lt = l32Pairs.map((p) => ({ ...p }));

const l32Fills = [
  { display: 'I thought you ___ come.', blankWord: 'would', en: 'I thought you would come.', ar: 'ظننت أنك ستأتي.', acceptedAnswers: ['would'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'She said she ___ call me.', blankWord: 'would', en: 'She said she would call me.', ar: 'قالت إنها ستتصل بي.', acceptedAnswers: ['would'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'I was ___ to call you, but I forgot.', blankWord: 'going', en: 'I was going to call you, but I forgot.', ar: 'كنت سأتصل بك، لكنني نسيت.', acceptedAnswers: ['going'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'They believed the plan ___ work.', blankWord: 'would', en: 'They believed the plan would work.', ar: 'اعتقدوا أن الخطة ستنجح.', acceptedAnswers: ['would'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'He ___ he would be late.', blankWord: 'said', en: 'He said he would be late.', ar: 'قال إنه سيتأخر.', acceptedAnswers: ['said'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'I knew she ___ pass the exam.', blankWord: 'would', en: 'I knew she would pass the exam.', ar: 'عرفت أنها ستنجح.', acceptedAnswers: ['would'], tags: ['future-in-the-past'], difficulty: 2 },
  { display: 'We were going ___ eat out.', blankWord: 'to', en: 'We were going to eat out.', ar: 'كنا سنأكل في الخارج.', acceptedAnswers: ['to'], tags: ['future-in-the-past'], difficulty: 1 },
  { display: 'She was sure we ___ like the gift.', blankWord: 'would', en: 'She was sure we would like the gift.', ar: 'كانت متأكدة أننا سنحب الهدية.', acceptedAnswers: ['would'], tags: ['future-in-the-past'], difficulty: 2 },
];

const l32Orders = [
  orderFrom({ en: 'I thought you would come.', ar: 'ظننت أنك ستأتي.', tags: ['future-in-the-past'] }),
  orderFrom({ en: 'She said she would call.', ar: 'قالت إنها ستتصل.', tags: ['future-in-the-past'] }),
  orderFrom({ en: 'I was going to write to you.', ar: 'كنت سأكتب لك.', tags: ['future-in-the-past'] }),
  orderFrom({ en: 'He promised he would help.', ar: 'وعد أنه سيساعد.', tags: ['future-in-the-past'] }),
  orderFrom({ en: 'We knew the film would be long.', ar: 'عرفنا أن الفيلم سيكون طويلا.', tags: ['future-in-the-past'] }),
  orderFrom({ en: 'They said the train would be late.', ar: 'قالوا إن القطار سيتأخر.', tags: ['future-in-the-past'] }),
];

const l32Mc = [
  { question: '"Would" after a past verb describes…', options: ['a habit only', 'the future seen from the past', 'a command'], answerIndex: 1, ar: 'المستقبل من وجهة نظر ماضية.', tags: ['future-in-the-past'] },
  { question: 'I thought it ___ rain.', options: ['will', 'would', 'willed'], answerIndex: 1, ar: 'ظننت أنها ستمطر.', tags: ['future-in-the-past'] },
  { question: '"Was going to" describes a plan that…', options: ['happened for sure', 'was intended (maybe not done)', 'happens daily'], answerIndex: 1, ar: 'خطة كانت مقررة (ربما لم تحدث).', tags: ['future-in-the-past'] },
  { question: 'This is a separate tense, right?', options: ['Yes, the 17th tense', 'No — it is would/was going to from a past viewpoint', 'It is the past perfect'], answerIndex: 1, ar: 'ليس زمنا جديدا — إنه would / was going to من زاوية الماضي.', tags: ['future-in-the-past'] },
  { question: 'She said she ___ bring dessert.', options: ['will', 'would', 'is bringing'], answerIndex: 1, ar: 'قالت إنها ستجلب الحلوى.', tags: ['future-in-the-past'] },
  { question: 'I was going to travel, but I ___.', options: ["didn't", 'will not', 'am not'], answerIndex: 0, ar: 'كنت سأسافر، لكنني لم أفعل.', tags: ['future-in-the-past'] },
];

/* ============================================================
   033 Tense Contrast 1 — present vs past
   ============================================================ */
const l33Lt = expandAll([
  pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS.slice(0, 4),
    VO: [{ v: 'eat', os: [{ en: 'rice', ar: 'الأرز' }] }, { v: 'read', os: [{ en: 'the newspaper', ar: 'الصحيفة' }] }, { v: 'watch', os: [{ en: 'TV', ar: 'التلفاز' }] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(0, 4),
  }, { tags: ['past-simple', 'contrast'], difficulty: 2, limit: 40 }),
  pat('{S} {PRES} {O} every day.', '{S_ar} {V_ar} {O_ar} كل يوم.', {
    S: B.PRONOUNS.slice(0, 4),
    VO: [{ v: 'eat', os: [{ en: 'rice', ar: 'الأرز' }] }, { v: 'read', os: [{ en: 'the newspaper', ar: 'الصحيفة' }] }, { v: 'watch', os: [{ en: 'TV', ar: 'التلفاز' }] }],
    PRES: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
  }, { tags: ['present-simple', 'contrast'], difficulty: 2, limit: 30 }),
  pat('{S} {V}, but today {S2} {V2}.', 'أمس {S_ar} {V_ar}، واليوم {S2_ar} {V2_ar}.', {
    S: B.NAMED_SING.slice(0, 4),
    VO: [{ v: 'walk', os: [] }, { v: 'work', os: [] }, { v: 'study', os: [] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    S2: B.NAMED_SING.slice(4, 8),
    VO2: [{ v: 'walk', os: [] }, { v: 'work', os: [] }, { v: 'study', os: [] }],
    V2: (x) => [{ en: C.enPresent(x.VO2.v, x.S2.agr), ar: C.arPresent(x.VO2.v, x.S2.agr) }],
  }, { tags: ['contrast', 'time-markers'], difficulty: 3, limit: 40 }),
]);

const l33Fills = [
  { display: 'I ___ tea every morning. (habit)', blankWord: 'drink', en: 'I drink tea every morning.', ar: 'أشرب الشاي كل صباح (عادة).', acceptedAnswers: ['drink'], tags: ['present-simple', 'contrast'], difficulty: 2, hint: 'every day → ؟' },
  { display: 'I ___ tea yesterday. (finished)', blankWord: 'drank', en: 'I drank tea yesterday.', ar: 'شربت الشاي أمس.', acceptedAnswers: ['drank'], tags: ['past-simple', 'contrast'], difficulty: 2, hint: 'yesterday → ؟' },
  { display: 'She ___ to school last Monday. (go)', blankWord: 'went', en: 'She went to school last Monday.', ar: 'ذهبت إلى المدرسة الاثنين الماضي.', acceptedAnswers: ['went'], tags: ['past-simple'], difficulty: 2 },
  { display: 'She usually ___ to school by bus.', blankWord: 'goes', en: 'She usually goes to school by bus.', ar: 'عادة تذهب إلى المدرسة بالحافلة.', acceptedAnswers: ['goes'], tags: ['present-simple'], difficulty: 2 },
  { display: 'They ___ football now.', blankWord: 'are playing', en: 'They are playing football now.', ar: 'يلعبون كرة القدم الآن.', acceptedAnswers: ['are playing', "'re playing", 'are playing'], tags: ['present-continuous'], difficulty: 2 },
  { display: 'They ___ football an hour ago.', blankWord: 'played', en: 'They played football an hour ago.', ar: 'لعبوا كرة القدم قبل ساعة.', acceptedAnswers: ['played'], tags: ['past-simple'], difficulty: 2 },
  { display: 'Look! It ___ (start) to rain.', blankWord: 'is starting', en: 'Look! It is starting to rain.', ar: 'انظر! إنها بدأت تمطر.', acceptedAnswers: ['is starting', "'s starting"], tags: ['present-continuous'], difficulty: 2 },
  { display: 'Last night it ___ (start) to rain at ten.', blankWord: 'started', en: 'Last night it started to rain at ten.', ar: 'الليلة الماضية بدأ المطر في العاشرة.', acceptedAnswers: ['started'], tags: ['past-simple'], difficulty: 2 },
];

const l33Orders = [
  orderFrom({ en: 'I drink tea every day.', ar: 'أشرب الشاي كل يوم.', tags: ['present-simple', 'contrast'] }),
  orderFrom({ en: 'I drank tea yesterday.', ar: 'شربت الشاي أمس.', tags: ['past-simple', 'contrast'] }),
  orderFrom({ en: 'She works here now.', ar: 'هي تعمل هنا الآن.', tags: ['present-simple', 'contrast'] }),
  orderFrom({ en: 'She worked here last year.', ar: 'هي عملت هنا العام الماضي.', tags: ['past-simple', 'contrast'] }),
  orderFrom({ en: 'They play tennis on Fridays.', ar: 'يلعبون التنس أيام الجمعة.', tags: ['present-simple', 'contrast'] }),
  orderFrom({ en: 'They played tennis last Friday.', ar: 'لعبوا التنس الجمعة الماضية.', tags: ['past-simple', 'contrast'] }),
];

const l33Mc = [
  { question: '"Yesterday" pairs with…', options: ['present simple', 'past simple', 'future'], answerIndex: 1, ar: 'أمس ← الماضي البسيط.', tags: ['contrast', 'time-markers'] },
  { question: '"Every day" pairs with…', options: ['present simple', 'past simple', 'past continuous'], answerIndex: 0, ar: 'كل يوم ← المضارع البسيط.', tags: ['contrast', 'time-markers'] },
  { question: 'Choose: Last week I ___ a new phone.', options: ['buy', 'bought', 'buying'], answerIndex: 1, ar: 'الأسبوع الماضي اشتريت هاتفا جديدا.', tags: ['past-simple'] },
  { question: 'Choose: On Sundays we ___ fish.', options: ['ate', 'eat', 'eaten'], answerIndex: 1, ar: 'أيام الأحد نأكل السمك.', tags: ['present-simple'] },
  { question: 'He ___ here now; he ___ here in 2020 only.', options: ['works / worked', 'worked / works', 'work / worked'], answerIndex: 0, ar: 'يعمل هنا الآن؛ عمل هنا في 2020 فقط.', tags: ['contrast'] },
  { question: 'Which time word does NOT fit the past simple?', options: ['ago', 'last night', 'tomorrow'], answerIndex: 2, ar: 'tomorrow لا تناسب الماضي.', tags: ['contrast', 'time-markers'] },
];

const PRON_LOW = B.PRONOUNS.map((p) => ({ en: p.en.toLowerCase(), ar: p.ar, agr: p.agr }));

/* ============================================================
   034 Perfect forms contrast
   ============================================================ */
const l34Lt = expandAll([
  pat('{S} {HAVE} {V} {O} {A}.', '{S_ar} قد {V_ar} {O_ar} {A_ar}.', {
    S: B.PRONOUNS,
    HAVE: (x) => [{ en: HAVE[x.S.agr], ar: '' }],
    VO: [{ v: 'finish', os: [{ en: 'the work', ar: 'العمل' }] }, { v: 'eat', os: [{ en: 'lunch', ar: 'الغداء' }] }, { v: 'send', os: [{ en: 'the email', ar: 'البريد الإلكتروني' }] }, { v: 'clean', os: [{ en: 'the kitchen', ar: 'المطبخ' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    A: [{ en: 'already', ar: 'بالفعل' }],
  }, { tags: ['present-perfect', 'contrast'], difficulty: 2, limit: 40 }),
  pat('Before {E}, {S} had {V} {O}.', 'قبل {E_ar}، {K_ar} {V_ar} {O_ar}.', {
    E: [{ en: 'the meeting', ar: 'الاجتماع' }, { en: 'noon', ar: 'الظهر' }, { en: 'the phone call', ar: 'المكالمة' }],
    S: PRON_LOW,
    VO: [{ v: 'finish', os: [{ en: 'the work', ar: 'العمل' }] }, { v: 'send', os: [{ en: 'the email', ar: 'البريد الإلكتروني' }] }, { v: 'eat', os: [{ en: 'lunch', ar: 'الغداء' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    K: (x) => [{ en: '', ar: { I: 'كنت قد', you: 'كنت قد', he: 'كان قد', she: 'كانت قد', we: 'كنا قد', they: 'كانوا قد' }[x.S.agr] }],
  }, { tags: ['past-perfect', 'contrast'], difficulty: 3, limit: 45 }),
  pat('By tomorrow, {S} will have {V} {O}.', 'بحلول الغد، {FUTK_ar} قد {V_ar} {O_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'finish', os: [{ en: 'the work', ar: 'العمل' }] }, { v: 'send', os: [{ en: 'the email', ar: 'البريد الإلكتروني' }] }, { v: 'read', os: [{ en: 'the book', ar: 'الكتاب' }] }, { v: 'clean', os: [{ en: 'the house', ar: 'البيت' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    FUTK: (x) => [{ en: '', ar: FUT_KANA[x.S.agr] }],
  }, { tags: ['future-perfect', 'contrast'], difficulty: 3, limit: 45 }),
]);

const l34Fills = [
  { display: 'I ___ (just / eat). — present perfect', blankWord: 'have just eaten', en: 'I have just eaten.', ar: 'أكلت للتو.', acceptedAnswers: ['have just eaten', "'ve just eaten"], tags: ['present-perfect'], difficulty: 2 },
  { display: 'Before lunch, she ___ (already / finish) the report. — past perfect', blankWord: 'had already finished', en: 'Before lunch, she had already finished the report.', ar: 'قبل الغداء، كانت قد أنهت التقرير بالفعل.', acceptedAnswers: ['had already finished'], tags: ['past-perfect'], difficulty: 3 },
  { display: 'By tomorrow, they ___ (send) the files. — future perfect', blankWord: 'will have sent', en: 'By tomorrow, they will have sent the files.', ar: 'بحلول الغد سيكونون قد أرسلوا الملفات.', acceptedAnswers: ['will have sent'], tags: ['future-perfect'], difficulty: 3 },
  { display: 'I ___ this movie twice. (life experience)', blankWord: 'have seen', en: 'I have seen this movie twice.', ar: 'شاهدت هذا الفيلم مرتين.', acceptedAnswers: ['have seen', "'ve seen"], tags: ['present-perfect'], difficulty: 2 },
  { display: 'When I arrived, the train ___ (already / leave).', blankWord: 'had already left', en: 'When I arrived, the train had already left.', ar: 'عندما وصلت، كان القطار قد غادر بالفعل.', acceptedAnswers: ['had already left'], tags: ['past-perfect'], difficulty: 3 },
  { display: 'By 2030, she ___ (teach) for 20 years.', blankWord: 'will have taught', en: 'By 2030, she will have taught for 20 years.', ar: 'بحلول 2030 ستكون قد علمت لمدة 20 سنة.', acceptedAnswers: ['will have taught'], tags: ['future-perfect'], difficulty: 3 },
  { display: 'He ___ his keys — he can’t open the door now.', blankWord: 'has lost', en: 'He has lost his keys — he can’t open the door now.', ar: 'لقد فقد مفاتيحه — لا يستطيع فتح الباب الآن.', acceptedAnswers: ['has lost', "'s lost"], tags: ['present-perfect'], difficulty: 2 },
  { display: 'The film ___ before we sat down.', blankWord: 'had started', en: 'The film had started before we sat down.', ar: 'كان الفيلم قد بدأ قبل أن نجلس.', acceptedAnswers: ['had started'], tags: ['past-perfect'], difficulty: 3 },
];

const l34Orders = [
  orderFrom({ en: 'I have finished the work.', ar: 'أنهيت العمل.', tags: ['present-perfect', 'contrast'] }),
  orderFrom({ en: 'She had finished before the meeting.', ar: 'كانت قد أنهت قبل الاجتماع.', tags: ['past-perfect', 'contrast'] }),
  orderFrom({ en: 'They will have finished by Friday.', ar: 'سيكونون قد أنهوا بحلول الجمعة.', tags: ['future-perfect', 'contrast'] }),
  orderFrom({ en: 'We have sent the email.', ar: 'أرسلنا البريد الإلكتروني.', tags: ['present-perfect', 'contrast'] }),
  orderFrom({ en: 'He had left before noon.', ar: 'كان قد غادر قبل الظهر.', tags: ['past-perfect', 'contrast'] }),
  orderFrom({ en: 'You will have read it by then.', ar: 'ستكون قد قرأته بحلول ذلك الوقت.', tags: ['future-perfect', 'contrast'] }),
];

const l34Mc = [
  { question: 'have/has + pp = …', options: ['present perfect', 'past perfect', 'future perfect'], answerIndex: 0, ar: 'المضارع التام.', tags: ['present-perfect', 'contrast'] },
  { question: 'had + pp = …', options: ['present perfect', 'past perfect', 'future perfect'], answerIndex: 1, ar: 'الماضي التام.', tags: ['past-perfect', 'contrast'] },
  { question: 'will have + pp = …', options: ['present perfect', 'past perfect', 'future perfect'], answerIndex: 2, ar: 'المستقبل التام.', tags: ['future-perfect', 'contrast'] },
  { question: 'I ___ it before you asked (earlier past).', options: ['have done', 'had done', 'will have done'], answerIndex: 1, ar: 'فعلته قبل أن تسأل (أسبق).', tags: ['past-perfect', 'contrast'] },
  { question: 'She ___ here since 2020 (still here).', options: ['has worked', 'had worked', 'will have worked'], answerIndex: 0, ar: 'تعمل هنا منذ 2020 (لا تزال).', tags: ['present-perfect', 'contrast'] },
  { question: 'By 2030 they ___ the desert green.', options: ['will have made', 'had made', 'have made'], answerIndex: 0, ar: 'بحلول 2030 سيكونون قد جعلوا الصحراء خضراء.', tags: ['future-perfect', 'contrast'] },
];

/* ============================================================
   035 Will vs Going To contrast
   ============================================================ */
const l35Lt = expandAll([
  pat('{S} will {V} {O}.', '{S_ar} {V_ar} {O_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'carry', os: [{ en: 'that bag', ar: 'تلك الحقيبة' }] }, { v: 'open', os: [{ en: 'the window', ar: 'النافذة' }] }, { v: 'answer', os: [{ en: 'the phone', ar: 'الهاتف' }] }, { v: 'close', os: [{ en: 'the door', ar: 'الباب' }] }],
    V: (x) => [{ en: x.VO.v, ar: C.arFuture(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
  }, { tags: ['future-simple', 'spontaneous'], difficulty: 2, limit: 40 }),
  pat('{S} {BE} going to {V} {O} {T}.', '{S_ar} سوف {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BE: (x) => [{ en: BE[x.S.agr], ar: '' }],
    VO: [{ v: 'start', os: [{ en: 'a course', ar: 'دورة' }] }, { v: 'buy', os: [{ en: 'a car', ar: 'سيارة' }] }, { v: 'visit', os: [{ en: 'my aunt', ar: 'عمتي' }] }, { v: 'learn', os: [{ en: 'Spanish', ar: 'الإسبانية' }] }, { v: 'sell', os: [{ en: 'the old TV', ar: 'التلفاز القديم' }] }],
    V: (x) => [{ en: x.VO.v, ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: [{ en: 'next month', ar: 'الشهر القادم' }],
  }, { tags: ['be-going-to', 'plans'], difficulty: 2, limit: 40 }),
  { en: 'I will help you with that.', ar: 'سأساعدك في ذلك.', tags: ['future-simple', 'offers'], difficulty: 2 },
  { en: 'I will answer the phone.', ar: 'سأرد على الهاتف.', tags: ['future-simple', 'spontaneous'], difficulty: 2 },
  { en: 'I will carry that bag for you.', ar: 'سأحمل تلك الحقيبة من أجلك.', tags: ['future-simple', 'offers'], difficulty: 2 },
]);

const l35Fills = [
  { display: 'These bags are heavy. I ___ help you. (spontaneous offer)', blankWord: 'will', en: 'These bags are heavy. I will help you.', ar: 'هذه الحقائب ثقيلة. سأساعدك.', acceptedAnswers: ['will', "'ll"], tags: ['future-simple', 'spontaneous'], difficulty: 2, hint: 'قرار لحظي' },
  { display: 'I ___ visit my aunt next month. (plan)', blankWord: 'am going to', en: 'I am going to visit my aunt next month.', ar: 'سأزور عمتي الشهر القادم.', acceptedAnswers: ['am going to', "'m going to"], tags: ['be-going-to', 'plans'], difficulty: 2, hint: 'خطة مسبقة' },
  { display: 'The phone is ringing. I ___ answer it.', blankWord: 'will', en: 'The phone is ringing. I will answer it.', ar: 'الهاتف يرن. سأرد عليه.', acceptedAnswers: ['will', "'ll"], tags: ['future-simple', 'spontaneous'], difficulty: 2 },
  { display: 'Look at the clouds! It ___ rain.', blankWord: 'is going to', en: 'Look at the clouds! It is going to rain.', ar: 'انظر إلى السحب! ستمطر.', acceptedAnswers: ['is going to', "'s going to"], tags: ['be-going-to', 'evidence'], difficulty: 2 },
  { display: 'She ___ study medicine (her decision years ago).', blankWord: 'is going to', en: 'She is going to study medicine.', ar: 'ستدرس الطب (قرارها منذ مدة).', acceptedAnswers: ['is going to', "'s going to"], tags: ['be-going-to', 'plans'], difficulty: 3 },
  { display: 'I think our team ___ win.', blankWord: 'will', en: 'I think our team will win.', ar: 'أظن أن فريقنا سيفوز.', acceptedAnswers: ['will', "'ll"], tags: ['future-simple', 'predictions'], difficulty: 2 },
  { display: 'We ___ move to a bigger flat (already decided).', blankWord: 'are going to', en: 'We are going to move to a bigger flat.', ar: 'سنتقل إلى شقة أكبر (قررنا بالفعل).', acceptedAnswers: ['are going to', "'re going to"], tags: ['be-going-to', 'plans'], difficulty: 2 },
  { display: 'OK, I ___ talk to him about it.', blankWord: 'will', en: 'OK, I will talk to him about it.', ar: 'حسنا، سأتحدث معه عن ذلك.', acceptedAnswers: ['will', "'ll"], tags: ['future-simple', 'spontaneous'], difficulty: 2 },
];

const l35Orders = [
  orderFrom({ en: 'I will help you.', ar: 'سأساعدك.', tags: ['future-simple', 'offers'] }),
  orderFrom({ en: 'We are going to travel in July.', ar: 'سنسافر في يوليو.', tags: ['be-going-to', 'plans'] }),
  orderFrom({ en: 'I will answer the phone.', ar: 'سأرد على الهاتف.', tags: ['future-simple'] }),
  orderFrom({ en: 'She is going to buy a car.', ar: 'ستشتري سيارة.', tags: ['be-going-to'] }),
  orderFrom({ en: 'It is going to rain.', ar: 'ستمطر.', tags: ['be-going-to', 'evidence'] }),
  orderFrom({ en: 'They will arrive soon.', ar: 'سيصلون قريبا.', tags: ['future-simple'] }),
];

const l35Mc = [
  { question: 'Spontaneous decision at the moment of speaking →', options: ['will', 'going to', 'present simple'], answerIndex: 0, ar: 'قرار لحظي ← will.', tags: ['future-simple', 'be-going-to'] },
  { question: 'Earlier plan or visible evidence →', options: ['will', 'going to', 'past simple'], answerIndex: 1, ar: 'خطة سابقة أو دليل ظاهر ← going to.', tags: ['be-going-to'] },
  { question: 'The doorbell rings. "I ___ open it."', options: ['am going to', 'will', 'open'], answerIndex: 1, ar: 'الجرس يرن. سأفتح.', tags: ['future-simple'] },
  { question: '"We ___ get married in September" (announced).', options: ['will', 'are going to', 'married'], answerIndex: 1, ar: 'سنتزوج في سبتمبر (إعلان سابق).', tags: ['be-going-to'] },
  { question: 'Opinion prediction without evidence →', options: ['I think it will rain', 'it is going to rain', 'it rained'], answerIndex: 0, ar: 'رأي بلا دليل ← will.', tags: ['future-simple', 'predictions'] },
  { question: 'Dark clouds in the sky →', options: ['it will rain (opinion)', 'it is going to rain (evidence)', 'it rained'], answerIndex: 1, ar: 'سحب داكنة ← دليل ← going to.', tags: ['be-going-to', 'evidence'] },
];

/* ============================================================
   036 Mixed Tense Review
   ============================================================ */
const l36Lt = [
  ...expandAll([
    pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
      S: B.PEOPLE_SING.slice(2, 12),
      VO: [{ v: 'work', os: [{ en: 'at a bank', ar: 'في بنك' }] }, { v: 'study', os: [{ en: 'at university', ar: 'في الجامعة' }] }, { v: 'teach', os: [{ en: 'young children', ar: 'الأطفال الصغار' }] }, { v: 'drive', os: [{ en: 'a taxi', ar: 'سيارة أجرة' }] }, { v: 'cook', os: [{ en: 'in a restaurant', ar: 'في مطعم' }] }],
      V: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
      O: (x) => x.VO.os,
      T: [{ en: 'every day', ar: 'كل يوم' }, { en: 'now', ar: 'الآن' }],
    }, { tags: ['review', 'present-simple'], difficulty: 2, limit: 40 }),
    pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
      S: B.PEOPLE_SING.slice(0, 10),
      VO: [{ v: 'visit', os: [{ en: 'the new museum', ar: 'المتحف الجديد' }] }, { v: 'buy', os: [{ en: 'a warm jacket', ar: 'سترة دافئة' }] }, { v: 'find', os: [{ en: 'a cheap hotel', ar: 'فندقا رخيصا' }] }, { v: 'take', os: [{ en: 'great photos', ar: 'صورا رائعة' }] }, { v: 'write', os: [{ en: 'a long email', ar: 'بريدا إلكترونيا طويلا' }] }],
      V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
      O: (x) => x.VO.os,
      T: [{ en: 'last week', ar: 'الأسبوع الماضي' }, { en: 'last month', ar: 'الشهر الماضي' }, { en: 'yesterday', ar: 'أمس' }],
    }, { tags: ['review', 'past-simple'], difficulty: 2, limit: 40 }),
    pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
      S: B.PEOPLE_SING.slice(1, 11),
      VO: [{ v: 'book', os: [{ en: 'a room', ar: 'غرفة' }] }, { v: 'order', os: [{ en: 'a pizza', ar: 'بيتزا' }] }, { v: 'plan', os: [{ en: 'a trip', ar: 'رحلة' }] }, { v: 'choose', os: [{ en: 'a gift', ar: 'هدية' }] }, { v: 'bring', os: [{ en: 'the tickets', ar: 'التذاكر' }] }],
      V: (x) => [{ en: `will ${x.VO.v}`, ar: C.arFuture(x.VO.v, x.S.agr) }],
      O: (x) => x.VO.os,
      T: [{ en: 'tomorrow', ar: 'غدا' }, { en: 'next week', ar: 'الأسبوع القادم' }, { en: 'tonight', ar: 'الليلة' }],
    }, { tags: ['review', 'future-simple'], difficulty: 2, limit: 40 }),
  ]),
];

const l36Fills = [
  { display: 'Water ___ (boil) at 100 degrees.', blankWord: 'boils', en: 'Water boils at 100 degrees.', ar: 'يغلي الماء عند 100 درجة.', acceptedAnswers: ['boils'], tags: ['review', 'present-simple'], difficulty: 2 },
  { display: 'Look out! The ladder ___ (fall)!', blankWord: 'is falling', en: 'Look out! The ladder is falling!', ar: 'احذر! السلم يسقط!', acceptedAnswers: ['is falling', "'s falling"], tags: ['review', 'present-continuous'], difficulty: 2 },
  { display: 'I ___ (see) that movie last weekend.', blankWord: 'saw', en: 'I saw that movie last weekend.', ar: 'شاهدت ذلك الفيلم العطلة الماضية.', acceptedAnswers: ['saw'], tags: ['review', 'past-simple'], difficulty: 2 },
  { display: 'She ___ (live) here since 2020.', blankWord: 'has lived', en: 'She has lived here since 2020.', ar: 'تعيش هنا منذ عام 2020.', acceptedAnswers: ['has lived', "'s lived"], tags: ['review', 'present-perfect'], difficulty: 3 },
  { display: 'The bus ___ (leave) at six every morning.', blankWord: 'leaves', en: 'The bus leaves at six every morning.', ar: 'تغادر الحافلة في السادسة كل صباح.', acceptedAnswers: ['leaves'], tags: ['review', 'scheduled-future'], difficulty: 2 },
  { display: 'We ___ (fly) to Rome tonight (tickets booked).', blankWord: 'are flying', en: 'We are flying to Rome tonight.', ar: 'نسافر إلى روما الليلة.', acceptedAnswers: ['are flying', "'re flying"], tags: ['review', 'arranged-future'], difficulty: 3 },
  { display: 'She said she ___ (call) later. — future in the past', blankWord: 'would call', en: 'She said she would call later.', ar: 'قالت إنها ستتصل لاحقا.', acceptedAnswers: ['would call'], tags: ['review', 'future-in-the-past'], difficulty: 3 },
  { display: 'By next month, I ___ (finish) this course.', blankWord: 'will have finished', en: 'By next month, I will have finished this course.', ar: 'بحلول الشهر القادم سأكون قد أنهيت هذه الدورة.', acceptedAnswers: ['will have finished', "'ll have finished"], tags: ['review', 'future-perfect'], difficulty: 3 },
];

const l36Orders = [
  orderFrom({ en: 'She works at a bank.', ar: 'هي تعمل في بنك.', tags: ['review'] }),
  orderFrom({ en: 'They visited the museum last week.', ar: 'زاروا المتحف الأسبوع الماضي.', tags: ['review'] }),
  orderFrom({ en: 'I have lived here for years.', ar: 'أعيش هنا لمدة سنوات.', tags: ['review'] }),
  orderFrom({ en: 'We will book a room tomorrow.', ar: 'سنحجز غرفة غدا.', tags: ['review'] }),
  orderFrom({ en: 'He was reading at eight.', ar: 'كان يقرأ في الثامنة.', tags: ['review'] }),
  orderFrom({ en: 'She said she would come.', ar: 'قالت إنها ستأتي.', tags: ['review'] }),
];

const l36Mc = [
  { question: 'Which sentence uses the present continuous for a FUTURE arrangement?', options: ['I am reading now.', 'We are meeting Ali tomorrow.', 'She is reading a book.'], answerIndex: 1, ar: 'نتقابل مع علي غدا (ترتيب مستقبلي).', tags: ['review', 'arranged-future'] },
  { question: 'Which is a timetable use of present simple?', options: ['The bus leaves at six.', 'I leave now.', 'We left at six.'], answerIndex: 0, ar: 'تغادر الحافلة في السادسة (جدول).', tags: ['review', 'scheduled-future'] },
  { question: '"Would" after "said" expresses…', options: ['politeness only', 'future in the past', 'a habit'], answerIndex: 1, ar: 'المستقبل من الماضي.', tags: ['review', 'future-in-the-past'] },
  { question: 'I ___ here since March.', options: ['live', 'lived', 'have lived'], answerIndex: 2, ar: 'أعيش هنا منذ مارس.', tags: ['review', 'present-perfect'] },
  { question: 'At this time tomorrow, we ___ over the sea.', options: ['fly', 'will be flying', 'flew'], answerIndex: 1, ar: 'في هذا الوقت غدا سنكون فوق البحر.', tags: ['review', 'future-continuous'] },
  { question: 'Before the teacher came, we ___ our books.', options: ['open', 'had opened', 'have opened'], answerIndex: 1, ar: 'قبل مجيء المعلم، كنا قد فتحنا كتبنا.', tags: ['review', 'past-perfect'] },
];

/* ============================================================
   Lesson configs (025–036)
   ============================================================ */

const GRAM = {
  l25: {
    explanation: 'Will + base verb makes the future simple: predictions ("It will rain"), spontaneous decisions ("I will help you"), offers and promises. The verb after will never takes -s or -to. Arabic uses س / سوف + the present tense.',
    explanationAr: 'will + الفعل المجرد يكوّن المستقبل البسيط: التنبؤات ("It will rain")، والقرارات اللحظية ("I will help you")، والعروض والوعود. الفعل بعد will لا يأخذ s ولا to. وفي العربية: س / سوف + المضارع.',
    examples: [
      { en: 'I will call you tomorrow.', ar: 'سأتصل بك غدا.' },
      { en: 'She will travel next month.', ar: 'ستسافر الشهر القادم.' },
      { en: 'I will help you with that.', ar: 'سأساعدك في ذلك.' },
    ],
  },
  l26: {
    explanation: 'The future continuous (will be + verb-ing) describes an action that will be in progress at a future moment: "At nine tonight, I will be studying." It often appears with time phrases like at this time tomorrow, all day, at midnight.',
    explanationAr: 'المستقبل المستمر (will be + فعل + ing) يصف حدثا سيكون جاريا في لحظة مستقبلية: "At nine tonight, I will be studying". ويأتي غالبا مع عبارات زمنية مثل at this time tomorrow وall day وat midnight.',
    examples: [
      { en: 'At ten, I will be sleeping.', ar: 'في العاشرة سأنام.' },
      { en: 'She will be travelling all day.', ar: 'ستكون مسافرة طوال اليوم.' },
      { en: 'They will be waiting at the gate.', ar: 'سيكونون ينتظرون عند البوابة.' },
    ],
  },
  l27: {
    explanation: 'The future perfect (will have + past participle) says that something will be complete before a future point: "By Friday, I will have finished the report." The marker "by" means "not later than".',
    explanationAr: 'المستقبل التام (will have + التصريف الثالث) يبيّن أن شيئا سيكون منتهيا قبل نقطة مستقبلية: "By Friday, I will have finished the report". وأداة by تعني "بحلول / ليس بعد".',
    examples: [
      { en: 'She will have finished by Friday.', ar: 'ستكون قد أنهت بحلول الجمعة.' },
      { en: 'They will have arrived by noon.', ar: 'سيكونون قد وصلوا بحلول الظهر.' },
      { en: 'I will have saved enough money by June.', ar: 'سأكون قد جمعت مبلغا كافيا بحلول يونيو.' },
    ],
  },
  l28: {
    explanation: 'The future perfect continuous (will have been + verb-ing) measures how long an activity will have continued by a future point: "By ten, I will have been working for eight hours." It stresses duration, usually with for + time.',
    explanationAr: 'المستقبل التام المستمر (will have been + فعل + ing) يقيس مدة استمرار نشاط حتى نقطة مستقبلية: "By ten, I will have been working for eight hours". ويؤكد المدة عادة مع for + زمن.',
    examples: [
      { en: 'By June, she will have been studying here for four years.', ar: 'بحلول يونيو، ستكون قد درست هنا لمدة أربع سنوات.' },
      { en: 'By midnight, we will have been waiting for five hours.', ar: 'بحلول منتصف الليل، سنكون قد انتظرنا خمس ساعات.' },
      { en: 'By then, you will have been practicing for weeks.', ar: 'بحلول ذلك الوقت، ستكون قد تدربت لأسابيع.' },
    ],
  },
  l29: {
    explanation: 'Be going to (am/is/are going to + verb) expresses plans decided before now ("We are going to move next year") and predictions based on visible evidence ("Look at those clouds! It is going to rain").',
    explanationAr: 'التعبير be going to (am/is/are going to + فعل) يعبّر عن خطط اتُّخذت سابقا ("We are going to move next year") وتنبؤات مبنية على دليل ظاهر ("Look at those clouds! It is going to rain").',
    examples: [
      { en: 'I am going to start a new job.', ar: 'سوف أبدأ عملا جديدا.' },
      { en: 'They are going to buy a house.', ar: 'سوف يشترون بيتا.' },
      { en: 'It is going to rain.', ar: 'سوف تمطر.' },
    ],
  },
  l30: {
    explanation: 'IMPORTANT: the present simple can describe the future for timetables and fixed schedules — trains, buses, flights, classes, opening hours: "The train leaves at nine tomorrow." This is NOT a new tense; it is a scheduled-future USE of the present simple.',
    explanationAr: 'مهم: يمكن للمضارع البسيط أن يصف المستقبل في الجداول الزمنية الثابتة — القطارات والحافلات والرحلات والحصص وأوقات العمل: "The train leaves at nine tomorrow". وهذا ليس زمنا جديدا بل استخدام خاص للمضارع البسيط للمستقبل المجدول.',
    examples: [
      { en: 'The train leaves at nine tomorrow.', ar: 'يغادر القطار في التاسعة غدا.' },
      { en: 'The museum opens at ten.', ar: 'يفتح المتحف في العاشرة.' },
      { en: 'The class starts at eight on Monday.', ar: 'تبدأ الحصة في الثامنة يوم الاثنين.' },
    ],
  },
  l31: {
    explanation: 'IMPORTANT: the present continuous can describe future personal arrangements that are already fixed — meetings, tickets, appointments: "We are meeting the manager tomorrow." This is an arranged-future USE of the present continuous, not a new tense. Timetables take the present simple; personal plans take the continuous.',
    explanationAr: 'مهم: يمكن للمضارع المستمر أن يصف ترتيبات شخصية مستقبلية محسومة مسبقا — اجتماعات وتذاكر ومواعيد: "We are meeting the manager tomorrow". وهذا استخدام للمستقبل المرتب، ليس زمنا جديدا. الجداول تأخذ المضارع البسيط، والخطط الشخصية تأخذ المستمر.',
    examples: [
      { en: 'We are meeting the manager tomorrow.', ar: 'نتقابل مع المدير غدا.' },
      { en: 'She is flying to Cairo tonight.', ar: 'تسافر إلى القاهرة الليلة.' },
      { en: 'I am leaving next Monday.', ar: 'أغادر الاثنين القادم.' },
    ],
  },
  l32: {
    explanation: 'IMPORTANT: English does not have a separate "future in the past" tense. From a past viewpoint, the future is expressed with would ("I thought you would come") or was/were going to ("I was going to call you"). These are uses of would and be going to, not an extra tense.',
    explanationAr: 'مهم: لا يملك الإنجليزية زمنا مستقلا يسمى "المستقبل في الماضي". من زاوية ماضية يُعبَّر عن المستقبل بـ would ("I thought you would come") أو was/were going to ("I was going to call you"). وهذه استخدامات لـ would وbe going_to وليست زمنا إضافيا.',
    examples: [
      { en: 'I thought you would come.', ar: 'ظننت أنك ستأتي.' },
      { en: 'She said she would call me.', ar: 'قالت إنها ستتصل بي.' },
      { en: 'I was going to call you, but I forgot.', ar: 'كنت سأتصل بك، لكنني نسيت.' },
    ],
  },
  l33: {
    explanation: 'Time markers decide the tense: yesterday, last week, ago → past simple; every day, usually, on Fridays → present simple; now, at the moment → present continuous. Train your eye to find the time word first, then choose the form.',
    explanationAr: 'كلمات الزمن تحدد الزمن: yesterday وlast week وago ← الماضي البسيط؛ وevery day وusually وon Fridays ← المضارع البسيط؛ وnow وat the moment ← المضارع المستمر. درّب عينك على إيجاد كلمة الزمن أولًا ثم اختر الصيغة.',
    examples: [
      { en: 'I drink tea every day. / I drank tea yesterday.', ar: 'أشرب الشاي كل يوم / شربت الشاي أمس.' },
      { en: 'She works here now. / She worked here last year.', ar: 'تعمل هنا الآن / عملت هنا العام الماضي.' },
      { en: 'They play on Fridays. / They played last Friday.', ar: 'يلعبون أيام الجمعة / لعبوا الجمعة الماضية.' },
    ],
  },
  l34: {
    explanation: 'The three perfect forms answer three questions: have/has + pp — is it relevant now? ("I have finished.") had + pp — was it earlier than another past event? ("I had finished before lunch.") will have + pp — will it be done by a future point? ("I will have finished by Friday.")',
    explanationAr: 'صيغ التام الثلاث تجيب عن ثلاثة أسئلة: have/has + التصريف الثالث — هل له علاقة بالآن؟ ("I have finished"). had + التصريف الثالث — هل سبق حدثا ماضيا آخر؟ ("I had finished before lunch"). will have + التصريف الثالث — هل سيكتمل قبل نقطة مستقبلية؟ ("I will have finished by Friday").',
    examples: [
      { en: 'I have finished the work.', ar: 'أنهيت العمل.' },
      { en: 'She had finished before the meeting.', ar: 'كانت قد أنهت قبل الاجتماع.' },
      { en: 'They will have finished by Friday.', ar: 'سيكونون قد أنهوا بحلول الجمعة.' },
    ],
  },
  l35: {
    explanation: 'will vs be going to: use will for decisions made while speaking ("The phone is ringing — I will answer it") and opinions ("I think it will rain"). Use be going to for plans made earlier ("We are going to travel in July") and evidence-based predictions ("Look! It is going to rain").',
    explanationAr: 'will مقابل be going to: نستخدم will للقرارات اللحظية أثناء الكلام ("I will answer it") وللآراء ("I think it will rain"). ونستخدم be going to للخطط السابقة ("We are going to travel in July") وللتنبؤ المدعوم بدليل ("Look! It is going to rain").',
    examples: [
      { en: 'I will help you. (now)', ar: 'سأساعدك (الآن).' },
      { en: 'We are going to travel in July. (plan)', ar: 'سنسافر في يوليو (خطة).' },
      { en: 'Look! It is going to rain. (evidence)', ar: 'انظر! ستمطر (دليل).' },
    ],
  },
  l36: {
    explanation: 'Mixed review: read the time clue first. every day → present simple; now → present continuous; yesterday → past simple; since 2020 → present perfect; at six every morning (timetable) → present simple; tonight with booked tickets → present continuous; said + would → future in the past; by next month → future perfect.',
    explanationAr: 'مراجعة شاملة: اقرأ قرينة الزمن أولًا. every day ← مضارع بسيط؛ now ← مضارع مستمر؛ yesterday ← ماض بسيط؛ since 2020 ← مضارع تام؛ تذكرة محجوزة لليلة ← مضارع مستمر؛ said + would ← مستقبل في الماضي؛ by next month ← مستقبل تام.',
    examples: [
      { en: 'She works at a bank. / She worked there last year.', ar: 'تعمل في بنك / عملت فيه العام الماضي.' },
      { en: 'I have lived here since 2020.', ar: 'أعيش هنا منذ 2020.' },
      { en: 'She said she would come.', ar: 'قالت إنها ستأتي.' },
    ],
  },
};

const VOC = {
  l25: [
    { word: 'promise', meaningAr: 'يعد', example: 'I will help you — I promise.' },
    { word: 'offer', meaningAr: 'يعرض / يقدم', example: 'I will carry that bag.' },
    { word: 'prediction', meaningAr: 'تنبؤ', example: 'It will rain — a prediction.' },
    { word: 'arrive', meaningAr: 'يصل', example: 'They will arrive tonight.' },
    { word: 'leave', meaningAr: 'يغادر', example: 'The train will leave at nine.' },
    { word: 'soon', meaningAr: 'قريبا', example: 'We will finish it soon.' },
  ],
  l26: [
    { word: 'in progress', meaningAr: 'جار الحدوث', example: 'I will be working at nine.' },
    { word: 'gate', meaningAr: 'بوابة', example: 'They will be waiting at the gate.' },
    { word: 'all day', meaningAr: 'طوال اليوم', example: 'She will be travelling all day.' },
    { word: 'midnight', meaningAr: 'منتصف الليل', example: 'We will be flying at midnight.' },
    { word: 'ladder', meaningAr: 'سلم', example: 'Look out! The ladder is falling.' },
    { word: 'hearing', meaningAr: 'تسمع / تسمع من', example: 'You will be hearing from us soon.' },
  ],
  l27: [
    { word: 'complete', meaningAr: 'يكمل', example: 'It will be complete by Friday.' },
    { word: 'save', meaningAr: 'يدخر', example: 'I will have saved enough money.' },
    { word: 'enough', meaningAr: 'كافٍ', example: 'Enough money for the trip.' },
    { word: 'receive', meaningAr: 'يستلم', example: 'You will have received the email.' },
    { word: 'chapter', meaningAr: 'فصل (كتاب)', example: 'I will have read three chapters.' },
    { word: 'twenty years', meaningAr: 'عشرون سنة', example: 'She will have taught for twenty years.' },
  ],
  l28: [
    { word: 'measure', meaningAr: 'يقيس', example: 'This tense measures duration.' },
    { word: 'eight hours', meaningAr: 'ثماني ساعات', example: 'Working for eight hours.' },
    { word: 'by then', meaningAr: 'بحلول ذلك الوقت', example: 'You will have been practicing by then.' },
    { word: 'weeks', meaningAr: 'أسابيع', example: 'For weeks now.' },
    { word: 'since March', meaningAr: 'منذ مارس', example: 'I will have been studying since March.' },
    { word: 'stresses', meaningAr: 'يؤكد', example: 'The continuous stresses duration.' },
  ],
  l29: [
    { word: 'plan', meaningAr: 'خطة', example: 'A plan decided before now.' },
    { word: 'evidence', meaningAr: 'دليل', example: 'Dark clouds are evidence.' },
    { word: 'clouds', meaningAr: 'سحب', example: 'Look at those clouds!' },
    { word: 'crash', meaningAr: 'يصطدم', example: 'The car is going to crash!' },
    { word: 'medicine', meaningAr: 'طب', example: 'He is going to study medicine.' },
    { word: 'move', meaningAr: 'ينتقل', example: 'We are going to move.' },
  ],
  l30: [
    { word: 'timetable', meaningAr: 'جدول زمني', example: 'Timetables use the present simple.' },
    { word: 'schedule', meaningAr: 'برنامج / مواعيد', example: 'A fixed schedule.' },
    { word: 'flight', meaningAr: 'رحلة جوية', example: 'The flight arrives at noon.' },
    { word: 'museum', meaningAr: 'متحف', example: 'The museum opens at ten.' },
    { word: 'minutes', meaningAr: 'دقائق', example: 'The bus leaves in ten minutes.' },
    { word: 'use', meaningAr: 'استخدام', example: 'A special use of the present simple.' },
  ],
  l31: [
    { word: 'arrangement', meaningAr: 'ترتيب', example: 'A fixed personal arrangement.' },
    { word: 'appointment', meaningAr: 'موعد', example: 'I am seeing the doctor — an appointment.' },
    { word: 'dentist', meaningAr: 'طبيب أسنان', example: 'She is seeing the dentist.' },
    { word: 'booked', meaningAr: 'محجوز', example: 'The ticket is booked.' },
    { word: 'tonight', meaningAr: 'الليلة', example: 'She is flying tonight.' },
    { word: 'weekend', meaningAr: 'عطلة نهاية الأسبوع', example: 'We are visiting them this weekend.' },
  ],
  l32: [
    { word: 'viewpoint', meaningAr: 'زاوية نظر', example: 'The future from a past viewpoint.' },
    { word: 'promise', meaningAr: 'يعد', example: 'I promised I would finish.' },
    { word: 'minds', meaningAr: 'عقول / رأي', example: 'We changed our minds.' },
    { word: 'refuse', meaningAr: 'يرفض', example: 'We thought she would refuse.' },
    { word: 'delayed', meaningAr: 'متأخر', example: 'The train would be delayed.' },
    { word: 'dessert', meaningAr: 'حلوى', example: 'She would bring dessert.' },
  ],
  l33: [
    { word: 'marker', meaningAr: 'علامة / قرينة', example: 'Time markers decide the tense.' },
    { word: 'habit', meaningAr: 'عادة', example: 'Every day shows a habit.' },
    { word: 'finished', meaningAr: 'منته', example: 'Yesterday shows a finished action.' },
    { word: 'usually', meaningAr: 'عادة', example: 'She usually goes by bus.' },
    { word: 'look', meaningAr: 'انظر', example: 'Look! It is starting to rain.' },
    { word: 'pair', meaningAr: 'يقترن بـ', example: 'Yesterday pairs with past simple.' },
  ],
  l34: [
    { word: 'relevant', meaningAr: 'له علاقة بالآن', example: 'Present perfect: relevant now.' },
    { word: 'earlier', meaningAr: 'أسبق', example: 'Past perfect: the earlier past event.' },
    { word: 'by a point', meaningAr: 'قبل نقطة زمنية', example: 'Future perfect: by a future point.' },
    { word: 'before lunch', meaningAr: 'قبل الغداء', example: 'She had finished before lunch.' },
    { word: 'by Friday', meaningAr: 'بحلول الجمعة', example: 'They will have finished by Friday.' },
    { word: 'twice', meaningAr: 'مرتين', example: 'I have seen it twice.' },
  ],
  l35: [
    { word: 'spontaneous', meaningAr: 'لقظي / ارتجالي', example: 'A spontaneous decision: will.' },
    { word: 'decision', meaningAr: 'قرار', example: 'I will answer it — decision now.' },
    { word: 'ringing', meaningAr: 'يرن', example: 'The phone is ringing.' },
    { word: 'announced', meaningAr: 'معلن', example: 'An announced plan: going to.' },
    { word: 'opinion', meaningAr: 'رأي', example: 'I think it will rain — opinion.' },
    { word: 'dark clouds', meaningAr: 'سحب داكنة', example: 'Dark clouds: going to rain.' },
  ],
  l36: [
    { word: 'clue', meaningAr: 'قرينة', example: 'Find the time clue first.' },
    { word: 'university', meaningAr: 'جامعة', example: 'He studies at university.' },
    { word: 'restaurant', meaningAr: 'مطعم', example: 'She cooks in a restaurant.' },
    { word: 'jacket', meaningAr: 'سترة', example: 'He bought a warm jacket.' },
    { word: 'desert', meaningAr: 'صحراء', example: 'They will have made the desert green.' },
    { word: 'ladder', meaningAr: 'سلم', example: 'The ladder is falling!' },
  ],
};

const CONFIGS_B = [
  { id: 'lesson-025', title: 'Future Simple (Will)', titleAr: 'المستقبل البسيط (Will)', pools: { lt: l25Lt, fill: l25Fills, order: l25Orders, mc: l25Mc }, level: 'A1', key: 'l25' },
  { id: 'lesson-026', title: 'Future Continuous', titleAr: 'المستقبل المستمر', pools: { lt: l26Lt, fill: l26Fills, order: l26Orders, mc: l26Mc }, level: 'B1', key: 'l26' },
  { id: 'lesson-027', title: 'Future Perfect', titleAr: 'المستقبل التام', pools: { lt: l27Lt, fill: l27Fills, order: l27Orders, mc: l27Mc }, level: 'B2', key: 'l27' },
  { id: 'lesson-028', title: 'Future Perfect Continuous', titleAr: 'المستقبل التام المستمر', pools: { lt: l28Lt, fill: l28Fills, order: l28Orders, mc: l28Mc }, level: 'B2', key: 'l28' },
  { id: 'lesson-029', title: 'Be Going To Future', titleAr: 'المستقبل بـ Be Going To', pools: { lt: l29Lt, fill: l29Fills, order: l29Orders, mc: l29Mc }, level: 'A2', key: 'l29' },
  { id: 'lesson-030', title: 'Present Simple for Scheduled Future', titleAr: 'المضارع البسيط للمستقبل المجدول', pools: { lt: l30Lt, fill: l30Fills, order: l30Orders, mc: l30Mc }, level: 'A2', key: 'l30' },
  { id: 'lesson-031', title: 'Present Continuous for Arranged Future', titleAr: 'المضارع المستمر للمستقبل المرتب', pools: { lt: l31Lt, fill: l31Fills, order: l31Orders, mc: l31Mc }, level: 'A2', key: 'l31' },
  { id: 'lesson-032', title: 'Future in the Past', titleAr: 'المستقبل في الماضي', pools: { lt: l32Lt, fill: l32Fills, order: l32Orders, mc: l32Mc }, level: 'B1', key: 'l32' },
  { id: 'lesson-033', title: 'Tense Contrast: Present vs Past', titleAr: 'المقارنة: المضارع مقابل الماضي', pools: { lt: l33Lt, fill: l33Fills, order: l33Orders, mc: l33Mc }, level: 'A2', key: 'l33' },
  { id: 'lesson-034', title: 'The Three Perfect Forms', titleAr: 'صيغ التام الثلاث', pools: { lt: l34Lt, fill: l34Fills, order: l34Orders, mc: l34Mc }, level: 'B1', key: 'l34' },
  { id: 'lesson-035', title: 'Will vs Be Going To', titleAr: 'Will مقابل Be Going To', pools: { lt: l35Lt, fill: l35Fills, order: l35Orders, mc: l35Mc }, level: 'A2', key: 'l35' },
  { id: 'lesson-036', title: 'Mixed Tense Review', titleAr: 'مراجعة شاملة للأزمنة', pools: { lt: l36Lt, fill: l36Fills, order: l36Orders, mc: l36Mc }, level: 'B1', key: 'l36' },
];

const MINUTES = { A1: 12, A2: 14, B1: 16, B2: 18, C1: 20 };

export function buildAll() {
  let total = 0;
  for (const c of CONFIGS_B) {
    total += build({
      id: c.id, section: 'tenses', level: c.level, minutes: MINUTES[c.level],
      title: c.title, titleAr: c.titleAr,
      objectives: [
        `Use the ${c.title.toLowerCase()} confidently`,
        'Distinguish it from neighboring forms',
        'Listen and type natural examples',
      ],
      grammar: GRAM[c.key],
      vocabulary: VOC[c.key],
      pools: c.pools,
    });
  }
  return { section: 'tenses (part 2)', lessons: CONFIGS_B.length, exercises: total };
}
