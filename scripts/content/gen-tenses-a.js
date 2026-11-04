/* ============================================================
   Content generator — Section 2a: English Tenses (lessons 013–024)
   Covers: present simple (aff/neg/q), present continuous (aff/neg/q),
   present perfect, present perfect continuous, past simple
   (regular, irregular, neg/q), past continuous, past perfect.
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

const EAT = [B.FOODS[0], B.FOODS[1], B.FOODS[2], B.FOODS[7], B.FOODS[8], B.FOODS[13]];
const DRINK = [B.FOODS[3], B.FOODS[4], B.FOODS[5], B.FOODS[17]];
const READSET = [{ en: 'a book', ar: 'كتابا' }, { en: 'the newspaper', ar: 'الصحيفة' }, { en: 'an email', ar: 'بريدا إلكترونيا' }, { en: 'a story', ar: 'قصة' }];
const BE = { I: 'am', you: 'are', he: 'is', she: 'is', we: 'are', they: 'are' };
const BEPAST = { I: 'was', you: 'were', he: 'was', she: 'was', we: 'were', they: 'were' };
const HAVE = { I: 'have', you: 'have', he: 'has', she: 'has', we: 'have', they: 'have' };
const DONT = { I: "don't", you: "don't", he: "doesn't", she: "doesn't", we: "don't", they: "don't" };
const DO = { I: 'Do', you: 'Do', he: 'Does', she: 'Does', we: 'Do', they: 'Do' };
const REGULAR = ['watch', 'play', 'cook', 'clean', 'wash', 'call', 'visit', 'open', 'close', 'start', 'finish', 'study', 'work', 'walk', 'wait', 'ask', 'answer', 'help', 'learn', 'listen', 'practice', 'check', 'need', 'want'];
const IRREGULAR = ['go', 'eat', 'drink', 'see', 'take', 'make', 'buy', 'come', 'read', 'write', 'sleep', 'meet', 'leave', 'give', 'find', 'lose', 'wear', 'sit', 'run', 'speak', 'tell', 'say', 'think', 'know', 'feel', 'keep', 'bring', 'hear', 'forget', 'spend'];
const DURATIVE = ['live', 'work', 'study', 'teach', 'play', 'practice', 'wait', 'sleep'];

/* ============================================================
   013 Present Simple — affirmative
   ============================================================ */
const l13Lt = expandAll([
  pat('{S} {V} {O} {L} {T}.', '{S_ar} {V_ar} {O_ar} {L_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'eat', os: EAT }, { v: 'drink', os: DRINK }, { v: 'read', os: READSET }],
    V: (x) => [{ en: C.enPresent(x.VO.v, x.S.agr), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    L: B.LOCATIONS.slice(0, 6),
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['present-simple'], difficulty: 1, limit: 70 }),
  pat('{P} {V} {L} {T}.', '{P_ar} {V_ar} {L_ar} {T_ar}.', {
    P: B.PEOPLE_SING.slice(0, 10),
    V: (x) => DURATIVE.slice(0, 5).map((v) => ({ en: C.enPresent(v, x.P.agr), ar: C.arPresent(v, x.P.agr) })),
    L: [{ en: 'in Cairo', ar: 'في القاهرة' }, { en: 'in Dubai', ar: 'في دبي' }, { en: 'near the school', ar: 'قرب المدرسة' }, { en: 'in a big city', ar: 'في مدينة كبيرة' }, { en: 'in a small town', ar: 'في بلدة صغيرة' }],
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['present-simple'], difficulty: 1, limit: 60 }),
]);

const l13Fills = [
  fillFrom({ en: 'My sister works in a hospital.', ar: 'أختي تعمل في مستشفى.', tags: ['present-simple', 'third-person-singular'] }, 'works', { hint: 'he/she + verb-s' }),
  fillFrom({ en: 'They live near the school.', ar: 'إنهم يعيشون قرب المدرسة.', tags: ['present-simple'] }, 'live', { hint: 'فعل' }),
  fillFrom({ en: 'She drinks tea in the morning.', ar: 'هي تشرب الشاي في الصباح.', tags: ['present-simple'] }, 'drinks', { hint: 'verb + s' }),
  fillFrom({ en: 'I read the newspaper every day.', ar: 'أقرأ الصحيفة كل يوم.', tags: ['present-simple'] }, 'read', { hint: 'فعل' }),
  fillFrom({ en: 'The shops open at nine.', ar: 'تفتح المتاجر في التاسعة.', tags: ['present-simple'] }, 'open', { hint: 'فعل' }),
  fillFrom({ en: 'We study English on Mondays.', ar: 'ندرس الإنجليزية أيام الاثنين.', tags: ['present-simple'] }, 'study', { hint: 'فعل' }),
  fillFrom({ en: 'He teaches math at a school.', ar: 'هو يعلّم الرياضيات في مدرسة.', tags: ['present-simple'] }, 'teaches', { hint: 'ch → es' }),
  fillFrom({ en: 'My father watches the news at night.', ar: 'أبي يشاهد الأخبار ليلا.', tags: ['present-simple'] }, 'watches', { hint: 'sh → es' }),
];

const l13Orders = [
  orderFrom({ en: 'She works in a hospital.', ar: 'هي تعمل في مستشفى.', tags: ['present-simple'] }),
  orderFrom({ en: 'I drink coffee every morning.', ar: 'أشرب القهوة كل صباح.', tags: ['present-simple'] }),
  orderFrom({ en: 'They live in Dubai.', ar: 'إنهم يعيشون في دبي.', tags: ['present-simple'] }),
  orderFrom({ en: 'We eat fish on Fridays.', ar: 'نأكل السمك أيام الجمعة.', tags: ['present-simple'] }),
  orderFrom({ en: 'The shops open at nine.', ar: 'تفتح المتاجر في التاسعة.', tags: ['present-simple'] }),
  orderFrom({ en: 'He teaches math.', ar: 'هو يعلّم الرياضيات.', tags: ['present-simple'] }),
];

const l13Mc = [
  { question: 'She ___ in a bank.', options: ['work', 'works', 'working'], answerIndex: 1, ar: 'هي تعمل في بنك.', tags: ['present-simple', 'third-person-singular'] },
  { question: 'They ___ tea every evening.', options: ['drinks', 'drink', 'drinking'], answerIndex: 1, ar: 'يشربون الشاي كل مساء.', tags: ['present-simple'] },
  { question: 'Which spelling is correct? (he / watch)', options: ['he watchs', 'he watches', 'he watchies'], answerIndex: 1, ar: 'هو يشاهد.', tags: ['present-simple', 'spelling'] },
  { question: 'My parents ___ in a small town.', options: ['lives', 'live', 'living'], answerIndex: 1, ar: 'والداي يعيشان في بلدة صغيرة.', tags: ['present-simple'] },
  { question: 'The museum ___ at eight.', options: ['open', 'opens', 'opening'], answerIndex: 1, ar: 'يفتح المتحف في الثامنة.', tags: ['present-simple'] },
  { question: 'Water ___ at 100 degrees.', options: ['boil', 'boils', 'boiling'], answerIndex: 1, ar: 'يغلي الماء عند 100 درجة.', tags: ['present-simple', 'facts'], explanation: 'Use present simple for facts.' },
];

/* ============================================================
   014 Present Simple — negative & questions
   ============================================================ */
const l14Lt = expandAll([
  pat("{S} {NEG} {V} {O} {T}.", '{S_ar} لا {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    NEG: (x) => [{ en: DONT[x.S.agr], ar: '' }],
    VO: [{ v: 'drink', os: DRINK }, { v: 'eat', os: EAT }, { v: 'watch', os: [{ en: 'TV', ar: 'التلفاز' }, { en: 'the news', ar: 'الأخبار' }] }, { v: 'play', os: [{ en: 'tennis', ar: 'التنس' }, { en: 'video games', ar: 'ألعاب الفيديو' }] }],
    V: (x) => [{ en: x.VO.v, ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['present-simple', 'negation'], difficulty: 2, limit: 70 }),
  pat('{DO} {S} {V} {O} {T}?', 'هل {S_ar} {V_ar} {O_ar} {T_ar}؟', {
    S: B.PRONOUNS,
    DO: (x) => [{ en: DO[x.S.agr], ar: '' }],
    VO: [{ v: 'drink', os: DRINK }, { v: 'eat', os: EAT }, { v: 'read', os: READSET }],
    V: (x) => [{ en: x.VO.v, ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_HABIT.slice(0, 4),
  }, { tags: ['present-simple', 'questions'], difficulty: 2, limit: 70 }),
]);

const l14Fills = [
  { display: 'He ___ (not / like) spicy food.', blankWord: "doesn't like", en: "He doesn't like spicy food.", ar: 'هو لا يحب الطعام الحار.', acceptedAnswers: ["doesn't like", 'does not like'], tags: ['present-simple', 'negation'], difficulty: 2 },
  { display: '___ she speak French?', blankWord: 'Does', en: 'Does she speak French?', ar: 'هل تتحدث الفرنسية؟', acceptedAnswers: ['Does', 'does'], tags: ['present-simple', 'questions'], difficulty: 1 },
  { display: 'I ___ (not / work) on Fridays.', blankWord: "don't work", en: "I don't work on Fridays.", ar: 'لا أعمل أيام الجمعة.', acceptedAnswers: ["don't work", 'do not work'], tags: ['present-simple', 'negation'], difficulty: 2 },
  { display: '___ they live in Dubai?', blankWord: 'Do', en: 'Do they live in Dubai?', ar: 'هل يعيشون في دبي؟', acceptedAnswers: ['Do', 'do'], tags: ['present-simple', 'questions'], difficulty: 1 },
  { display: 'The shop ___ (not / open) on Fridays.', blankWord: "doesn't open", en: "The shop doesn't open on Fridays.", ar: 'لا يفتح المتجر أيام الجمعة.', acceptedAnswers: ["doesn't open", 'does not open'], tags: ['present-simple', 'negation'], difficulty: 2 },
  { display: '___ your brother play football?', blankWord: 'Does', en: 'Does your brother play football?', ar: 'هل يلعب أخوك كرة القدم؟', acceptedAnswers: ['Does', 'does'], tags: ['present-simple', 'questions'], difficulty: 2 },
  { display: 'We ___ (not / watch) TV in the morning.', blankWord: "don't watch", en: "We don't watch TV in the morning.", ar: 'لا نشاهد التلفاز في الصباح.', acceptedAnswers: ["don't watch", 'do not watch'], tags: ['present-simple', 'negation'], difficulty: 2 },
  { display: '___ it rain here in summer?', blankWord: 'Does', en: 'Does it rain here in summer?', ar: 'هل تمطر هنا في الصيف؟', acceptedAnswers: ['Does', 'does'], tags: ['present-simple', 'questions'], difficulty: 2 },
];

const l14Orders = [
  orderFrom({ en: "She doesn't drink coffee.", ar: 'هي لا تشرب القهوة.', tags: ['present-simple', 'negation'] }),
  orderFrom({ en: 'Do you speak English?', ar: 'هل تتحدث الإنجليزية؟', tags: ['present-simple', 'questions'] }),
  orderFrom({ en: "I don't eat fish.", ar: 'لا آكل السمك.', tags: ['present-simple', 'negation'] }),
  orderFrom({ en: 'Does he work here?', ar: 'هل يعمل هنا؟', tags: ['present-simple', 'questions'] }),
  orderFrom({ en: "We don't play tennis.", ar: 'نحن لا نلعب التنس.', tags: ['present-simple', 'negation'] }),
  orderFrom({ en: 'Do they live in Cairo?', ar: 'هل يعيشون في القاهرة؟', tags: ['present-simple', 'questions'] }),
];

const l14Mc = [
  { question: 'He ___ eat meat.', options: ["doesn't", "don't", 'not'], answerIndex: 0, ar: 'هو لا يأكل اللحم.', tags: ['present-simple', 'negation'] },
  { question: '___ you like tea?', options: ['Does', 'Do', 'Are'], answerIndex: 1, ar: 'هل تحب الشاي؟', tags: ['present-simple', 'questions'] },
  { question: '___ she work on Saturdays?', options: ['Do', 'Is', 'Does'], answerIndex: 2, ar: 'هل تعمل أيام السبت؟', tags: ['present-simple', 'questions'] },
  { question: 'After "doesn’t" the verb is…', options: ['verb + s', 'base form', 'past form'], answerIndex: 1, ar: 'بعد doesn\u2019t يأتي الفعل مجردا.', tags: ['present-simple', 'negation'] },
  { question: 'Choose the correct question.', options: ['Does she likes tea?', 'Does she like tea?', 'Do she like tea?'], answerIndex: 1, ar: 'هل تحب الشاي؟', tags: ['present-simple', 'questions'] },
  { question: 'They ___ have a car.', options: ["doesn't", "don't", 'aren’t'], answerIndex: 1, ar: 'ليس لديهم سيارة.', tags: ['present-simple', 'negation'] },
];

/* ============================================================
   015 Present Continuous — affirmative
   ============================================================ */
const l15Lt = expandAll([
  pat('{S} {BE} {V} {O} {L} now.', '{S_ar} {V_ar} {O_ar} {L_ar} الآن.', {
    S: B.PRONOUNS,
    BE: (x) => [{ en: BE[x.S.agr], ar: '' }],
    VO: [{ v: 'read', os: READSET }, { v: 'write', os: [{ en: 'a letter', ar: 'خطابا' }, { en: 'a message', ar: 'رسالة' }] }, { v: 'watch', os: [{ en: 'a movie', ar: 'فيلما' }, { en: 'a match', ar: 'مباراة' }] }, { v: 'cook', os: [{ en: 'rice', ar: 'الأرز' }, { en: 'soup', ar: 'الحساء' }] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    L: B.LOCATIONS.slice(0, 8),
  }, { tags: ['present-continuous'], difficulty: 2, limit: 70 }),
  pat('{P} {BE} {V} {O} today.', '{P_ar} {V_ar} {O_ar} اليوم.', {
    P: B.PEOPLE_SING.slice(0, 8),
    BE: (x) => [{ en: BE[x.P.agr], ar: '' }],
    VO: [{ v: 'clean', os: [{ en: 'the house', ar: 'البيت' }] }, { v: 'wash', os: [{ en: 'the dishes', ar: 'الأطباق' }] }, { v: 'study', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'math', ar: 'الرياضيات' }] }, { v: 'practice', os: [{ en: 'the piano', ar: 'البيانو' }, { en: 'English', ar: 'الإنجليزية' }] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.P.agr) }],
    O: (x) => x.VO.os,
  }, { tags: ['present-continuous'], difficulty: 2, limit: 60 }),
]);

const l15Fills = [
  fillFrom({ en: 'She is reading a book now.', ar: 'هي تقرأ كتابا الآن.', tags: ['present-continuous'] }, 'is reading', { hint: 'be + verb-ing' }),
  fillFrom({ en: 'They are playing football in the park.', ar: 'يلعبون كرة القدم في الحديقة.', tags: ['present-continuous'] }, 'are playing', { hint: 'be + -ing' }),
  fillFrom({ en: 'I am writing an email.', ar: 'أكتب بريدا إلكترونيا.', tags: ['present-continuous'] }, 'am writing', { hint: 'I + am' }),
  fillFrom({ en: 'He is cooking dinner.', ar: 'هو يطبخ العشاء.', tags: ['present-continuous'] }, 'is cooking', { hint: 'be + -ing' }),
  fillFrom({ en: 'We are studying for the test.', ar: 'ندرس للاختبار.', tags: ['present-continuous'] }, 'are studying', { hint: 'be + -ing' }),
  fillFrom({ en: 'The baby is sleeping.', ar: 'الطفل نائم.', tags: ['present-continuous'] }, 'is sleeping', { hint: 'be + -ing' }),
  fillFrom({ en: 'She is running in the garden.', ar: 'هي تجري في الحديقة.', tags: ['present-continuous', 'spelling'] }, 'running', { hint: 'double n' }),
  fillFrom({ en: 'I am making tea.', ar: 'أصنع الشاي.', tags: ['present-continuous', 'spelling'] }, 'making', { hint: 'e disappears' }),
];

const l15Orders = [
  orderFrom({ en: 'She is reading now.', ar: 'هي تقرأ الآن.', tags: ['present-continuous'] }),
  orderFrom({ en: 'I am cooking rice.', ar: 'أنا أطبخ الأرز.', tags: ['present-continuous'] }),
  orderFrom({ en: 'They are watching a match.', ar: 'يشاهدون مباراة.', tags: ['present-continuous'] }),
  orderFrom({ en: 'He is sleeping.', ar: 'هو نائم.', tags: ['present-continuous'] }),
  orderFrom({ en: 'We are cleaning the house.', ar: 'نحن ننظف البيت.', tags: ['present-continuous'] }),
  orderFrom({ en: 'You are learning fast.', ar: 'أنت تتعلم بسرعة.', tags: ['present-continuous'] }),
];

const l15Mc = [
  { question: 'Listen! Someone ___ the door.', options: ['knock', 'is knocking', 'knocks'], answerIndex: 1, ar: 'اسمع! شخص ما يطرق الباب.', tags: ['present-continuous'] },
  { question: 'She ___ TV at the moment.', options: ['watches', 'is watching', 'watch'], answerIndex: 1, ar: 'هي تشاهد التلفاز حاليا.', tags: ['present-continuous'] },
  { question: 'Which spelling is correct?', options: ['runing', 'running', 'runnig'], answerIndex: 1, ar: 'يجري.', tags: ['present-continuous', 'spelling'] },
  { question: 'Which spelling is correct?', options: ['makeing', 'makeing', 'making'], answerIndex: 2, ar: 'يصنع.', tags: ['present-continuous', 'spelling'] },
  { question: 'The children ___ in the garden now.', options: ['plays', 'are playing', 'is playing'], answerIndex: 1, ar: 'الأطفال يلعبون في الحديقة الآن.', tags: ['present-continuous'] },
  { question: 'I ___ right now, please call later.', options: ['drive', 'am driving', 'drives'], answerIndex: 1, ar: 'أنا أقود الآن، اتصل لاحقا.', tags: ['present-continuous'] },
];

/* ============================================================
   016 Present Continuous — negative & questions
   ============================================================ */
const l16Lt = expandAll([
  pat('{S} {BEN} {V} {O} {T}.', '{S_ar} لا {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BEN: (x) => [{ en: `${BE[x.S.agr]} not`, ar: '' }],
    VO: [{ v: 'watch', os: [{ en: 'TV', ar: 'التلفاز' }, { en: 'the news', ar: 'الأخبار' }] }, { v: 'play', os: [{ en: 'tennis', ar: 'التنس' }, { en: 'video games', ar: 'ألعاب الفيديو' }] }, { v: 'read', os: READSET }, { v: 'drink', os: DRINK }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: [{ en: 'now', ar: 'الآن' }, { en: 'today', ar: 'اليوم' }, { en: 'at the moment', ar: 'حاليا' }, { en: 'right now', ar: 'في هذه اللحظة' }],
  }, { tags: ['present-continuous', 'negation'], difficulty: 2, limit: 60 }),
  pat('{S} {BEN} {Ving} {T}.', '{S_ar} لا {V_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BEN: (x) => [{ en: `${BE[x.S.agr]} not`, ar: '' }],
    V: (x) => ['work', 'sleep', 'come', 'stay', 'drive', 'run'].map((v) => ({ en: C.enIng(v), ar: C.arPresent(v, x.S.agr) })),
    T: [{ en: 'today', ar: 'اليوم' }, { en: 'this week', ar: 'هذا الأسبوع' }, { en: 'tonight', ar: 'الليلة' }, { en: 'right now', ar: 'في هذه اللحظة' }],
  }, { tags: ['present-continuous', 'negation'], difficulty: 2, limit: 50 }),
  pat('{BE} {S} {Ving} {T}?', 'هل {S_ar} {V_ar} {T_ar}؟', {
    S: B.PRONOUNS,
    BE: (x) => [{ en: BE[x.S.agr].charAt(0).toUpperCase() + BE[x.S.agr].slice(1), ar: '' }],
    V: (x) => ['work', 'study', 'come', 'listen', 'sleep', 'drive'].map((v) => ({ en: C.enIng(v), ar: C.arPresent(v, x.S.agr) })),
    T: [{ en: 'today', ar: 'اليوم' }, { en: 'now', ar: 'الآن' }, { en: 'this week', ar: 'هذا الأسبوع' }, { en: 'tonight', ar: 'الليلة' }],
  }, { tags: ['present-continuous', 'questions'], difficulty: 2, limit: 60 }),
]);

const l16Fills = [
  { display: 'He ___ (not / work) today.', blankWord: "isn't working", en: "He isn't working today.", ar: 'هو لا يعمل اليوم.', acceptedAnswers: ["isn't working", 'is not working'], tags: ['present-continuous', 'negation'], difficulty: 2 },
  { display: '___ you listening to me?', blankWord: 'Are', en: 'Are you listening to me?', ar: 'هل تستمع إليّ؟', acceptedAnswers: ['Are', 'are'], tags: ['present-continuous', 'questions'], difficulty: 1 },
  { display: 'They ___ (not / come) to the party.', blankWord: "aren't coming", en: "They aren't coming to the party.", ar: 'إنهم لا يأتون إلى الحفلة.', acceptedAnswers: ["aren't coming", 'are not coming'], tags: ['present-continuous', 'negation'], difficulty: 2 },
  { display: '___ she sleeping?', blankWord: 'Is', en: 'Is she sleeping?', ar: 'هل هي نائمة؟', acceptedAnswers: ['Is', 'is'], tags: ['present-continuous', 'questions'], difficulty: 1 },
  { display: 'I ___ (not / watch) TV right now.', blankWord: "am not watching", en: "I am not watching TV right now.", ar: 'لا أشاهد التلفاز في هذه اللحظة.', acceptedAnswers: ["am not watching", "'m not watching"], tags: ['present-continuous', 'negation'], difficulty: 2 },
  { display: '___ they playing outside?', blankWord: 'Are', en: 'Are they playing outside?', ar: 'هل يلعبون في الخارج؟', acceptedAnswers: ['Are', 'are'], tags: ['present-continuous', 'questions'], difficulty: 1 },
  { display: 'We ___ (not / stay) at a hotel.', blankWord: "aren't staying", en: "We aren't staying at a hotel.", ar: 'نحن لا نقيم في فندق.', acceptedAnswers: ["aren't staying", 'are not staying'], tags: ['present-continuous', 'negation'], difficulty: 3 },
  { display: '___ he coming with us?', blankWord: 'Is', en: 'Is he coming with us?', ar: 'هل يأتي معنا؟', acceptedAnswers: ['Is', 'is'], tags: ['present-continuous', 'questions'], difficulty: 2 },
];

const l16Orders = [
  orderFrom({ en: "He isn't working today.", ar: 'هو لا يعمل اليوم.', tags: ['present-continuous', 'negation'] }),
  orderFrom({ en: 'Are you listening?', ar: 'هل تستمع؟', tags: ['present-continuous', 'questions'] }),
  orderFrom({ en: "She isn't sleeping now.", ar: 'هي لا نائمة الآن.', tags: ['present-continuous', 'negation'] }),
  orderFrom({ en: 'Is it raining?', ar: 'هل تمطر؟', tags: ['present-continuous', 'questions'] }),
  orderFrom({ en: "We aren't watching TV.", ar: 'نحن لا نشاهد التلفاز.', tags: ['present-continuous', 'negation'] }),
  orderFrom({ en: 'Are they coming tonight?', ar: 'هل يأتون الليلة؟', tags: ['present-continuous', 'questions'] }),
];

const l16Mc = [
  { question: 'He ___ to me right now!', options: ["isn't listening", "doesn't listen", 'not listening'], answerIndex: 0, ar: 'هو لا يستمع إليّ الآن!', tags: ['present-continuous', 'negation'] },
  { question: '___ they working today?', options: ['Is', 'Do', 'Are'], answerIndex: 2, ar: 'هل يعملون اليوم؟', tags: ['present-continuous', 'questions'] },
  { question: 'I ___ a book at the moment.', options: ["don't read", "'m not reading", 'not read'], answerIndex: 1, ar: 'لا أقرأ كتابا حاليا.', tags: ['present-continuous', 'negation'] },
  { question: '___ she driving now?', options: ['Is', 'Does', 'Are'], answerIndex: 0, ar: 'هل هي تقود الآن؟', tags: ['present-continuous', 'questions'] },
  { question: 'Choose the correct question.', options: ['Is you working?', 'Are you working?', 'Do you working?'], answerIndex: 1, ar: 'هل تعمل؟', tags: ['present-continuous', 'questions'] },
  { question: 'The kids ___ outside now.', options: ["aren't playing", "don't play", 'not are playing'], answerIndex: 0, ar: 'الأطفال لا يلعبون في الخارج الآن.', tags: ['present-continuous', 'negation'] },
];

/* ============================================================
   017 Present Perfect — forms & uses (already / just / never / ever)
   ============================================================ */
const l17Lt = expandAll([
  pat('{S} {HAVE} {V} {O} {A}.', '{S_ar} قد {V_ar} {O_ar} {A_ar}.', {
    S: B.PRONOUNS,
    HAVE: (x) => [{ en: HAVE[x.S.agr], ar: '' }],
    VO: [{ v: 'eat', os: EAT.slice(0, 4) }, { v: 'drink', os: DRINK.slice(0, 3) }, { v: 'read', os: READSET.slice(0, 3) }, { v: 'finish', os: [{ en: 'the report', ar: 'التقرير' }, { en: 'the homework', ar: 'الواجب المنزلي' }] }, { v: 'see', os: [{ en: 'this movie', ar: 'هذا الفيلم' }, { en: 'that photo', ar: 'تلك الصورة' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    A: [{ en: 'already', ar: 'بالفعل' }, { en: 'just', ar: 'للتو' }],
  }, { tags: ['present-perfect'], difficulty: 2, limit: 70 }),
  pat('Have you {V} {O}?', 'هل {V_ar} {O_ar} من قبل؟', {
    VO: [{ v: 'visit', os: [{ en: 'Dubai', ar: 'دبي' }, { en: 'this museum', ar: 'هذا المتحف' }] }, { v: 'see', os: [{ en: 'this movie', ar: 'هذا الفيلم' }] }, { v: 'try', os: [{ en: 'this dish', ar: 'هذا الطبق' }, { en: 'this drink', ar: 'هذا المشروب' }] }, { v: 'read', os: [{ en: 'this book', ar: 'هذا الكتاب' }] }, { v: 'meet', os: [{ en: 'our new neighbor', ar: 'جارنا الجديد' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, 'you') }],
    O: (x) => x.VO.os,
  }, { tags: ['present-perfect', 'questions', 'experience'], difficulty: 2, limit: 40 }),
]);

const l17Fills = [
  fillFrom({ en: 'I have just finished the report.', ar: 'أنهيت التقرير للتو.', tags: ['present-perfect'] }, 'have just finished', { hint: 'have + just + pp' }),
  fillFrom({ en: 'She has already eaten.', ar: 'لقد أكلت بالفعل.', tags: ['present-perfect'] }, 'has already eaten', { hint: 'has + already + pp' }),
  fillFrom({ en: 'They have never visited Dubai.', ar: 'لم يزوروا دبي قط.', tags: ['present-perfect'] }, 'have never visited', { hint: 'have + never + pp' }),
  fillFrom({ en: 'Have you ever tried this dish?', ar: 'هل جربت هذا الطبق من قبل؟', tags: ['present-perfect'] }, 'Have you ever tried', { hint: 'خبرة الحياة' }),
  fillFrom({ en: 'He has lost his keys.', ar: 'لقد فقد مفاتيحه.', tags: ['present-perfect'] }, 'has lost', { hint: 'has + pp' }),
  fillFrom({ en: 'We have seen this movie twice.', ar: 'شاهدنا هذا الفيلم مرتين.', tags: ['present-perfect'] }, 'have seen', { hint: 'have + pp' }),
  fillFrom({ en: 'The bus has already left.', ar: 'غادرت الحافلة بالفعل.', tags: ['present-perfect'] }, 'has already left', { hint: 'has + already + pp' }),
  fillFrom({ en: 'She has just called me.', ar: 'اتصلت بي للتو.', tags: ['present-perfect'] }, 'has just called', { hint: 'has + just + pp' }),
];

const l17Orders = [
  orderFrom({ en: 'I have just eaten.', ar: 'أكلت للتو.', tags: ['present-perfect'] }),
  orderFrom({ en: 'She has finished her homework.', ar: 'أنهت واجبها المنزلي.', tags: ['present-perfect'] }),
  orderFrom({ en: 'Have you ever seen snow?', ar: 'هل رأيت الثلج من قبل؟', tags: ['present-perfect'] }),
  orderFrom({ en: 'They have never met him.', ar: 'لم يلتقوه قط.', tags: ['present-perfect'] }),
  orderFrom({ en: 'He has already left.', ar: 'غادر بالفعل.', tags: ['present-perfect'] }),
  orderFrom({ en: 'We have read this book.', ar: 'قرأنا هذا الكتاب.', tags: ['present-perfect'] }),
];

const l17Mc = [
  { question: 'I ___ my homework already.', options: ['finish', 'have finished', 'finished'], answerIndex: 1, ar: 'أنهيت واجبي بالفعل.', tags: ['present-perfect'] },
  { question: 'She ___ never been to Rome.', options: ['has', 'have', 'is'], answerIndex: 0, ar: 'لم تكن في روما قط.', tags: ['present-perfect'] },
  { question: '___ you ever eaten sushi?', options: ['Did', 'Have', 'Do'], answerIndex: 1, ar: 'هل أكلت السوشي من قبل؟', tags: ['present-perfect'] },
  { question: 'The past participle of "go" is…', options: ['goed', 'went', 'gone'], answerIndex: 2, ar: 'التصريف الثالث ل go هو gone.', tags: ['present-perfect', 'irregular-verbs'] },
  { question: 'The past participle of "write" is…', options: ['wrote', 'written', 'writed'], answerIndex: 1, ar: 'التصريف الثالث ل write هو written.', tags: ['present-perfect', 'irregular-verbs'] },
  { question: 'Choose the correct sentence.', options: ['She has just ate.', 'She has just eaten.', 'She have just eaten.'], answerIndex: 1, ar: 'أكلت للتو.', tags: ['present-perfect'] },
];

/* ============================================================
   018 Present Perfect — for / since (ongoing situations)
   ============================================================ */
const l18Lt = expandAll([
  pat('{S} {HAVE} {V} {L} {D}.', '{S_ar} {V_ar} {L_ar} {D_ar}.', {
    S: B.PRONOUNS,
    HAVE: (x) => [{ en: HAVE[x.S.agr], ar: '' }],
    V: (x) => DURATIVE.slice(0, 4).map((v) => ({ en: C.enPP(v), ar: C.arPresent(v, x.S.agr) })),
    L: [{ en: 'in this city', ar: 'في هذه المدينة' }, { en: 'here', ar: 'هنا' }, { en: 'at this school', ar: 'في هذه المدرسة' }, { en: 'in this company', ar: 'في هذه الشركة' }, { en: 'in this house', ar: 'في هذا البيت' }],
    D: [{ en: 'for five years', ar: 'لمدة خمس سنوات' }, { en: 'since 2019', ar: 'منذ عام 2019' }, { en: 'for two years', ar: 'لمدة سنتين' }, { en: 'since childhood', ar: 'منذ الطفولة' }, { en: 'for ten years', ar: 'لمدة عشر سنوات' }],
  }, { tags: ['present-perfect', 'for-since'], difficulty: 2, limit: 70 }),
  pat('{S} {HAVE} {V} {O} {D}.', '{S_ar} {V_ar} {O_ar} {D_ar}.', {
    S: B.PRONOUNS,
    HAVE: (x) => [{ en: HAVE[x.S.agr], ar: '' }],
    VO: [{ v: 'study', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'math', ar: 'الرياضيات' }] }, { v: 'practice', os: [{ en: 'the piano', ar: 'البيانو' }, { en: 'English', ar: 'الإنجليزية' }] }, { v: 'teach', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'science', ar: 'العلوم' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    D: [{ en: 'for three years', ar: 'لمدة ثلاث سنوات' }, { en: 'since September', ar: 'منذ سبتمبر' }, { en: 'for a long time', ar: 'لمدة طويلة' }, { en: 'since last year', ar: 'منذ العام الماضي' }],
  }, { tags: ['present-perfect', 'for-since'], difficulty: 3, limit: 60 }),
]);

const l18Fills = [
  { display: 'I have lived here ___ 2019.', blankWord: 'since', en: 'I have lived here since 2019.', ar: 'أعيش هنا منذ عام 2019.', acceptedAnswers: ['since'], tags: ['present-perfect', 'for-since'], difficulty: 2, hint: 'نقطة بداية' },
  { display: 'She has worked there ___ ten years.', blankWord: 'for', en: 'She has worked there for ten years.', ar: 'تعمل هناك لمدة عشر سنوات.', acceptedAnswers: ['for'], tags: ['present-perfect', 'for-since'], difficulty: 2, hint: 'مدة' },
  { display: 'We have known each other ___ childhood.', blankWord: 'since', en: 'We have known each other since childhood.', ar: 'نعرف بعضنا منذ الطفولة.', acceptedAnswers: ['since'], tags: ['present-perfect', 'for-since'], difficulty: 2 },
  { display: 'He has studied English ___ three years.', blankWord: 'for', en: 'He has studied English for three years.', ar: 'يدرس الإنجليزية لمدة ثلاث سنوات.', acceptedAnswers: ['for'], tags: ['present-perfect', 'for-since'], difficulty: 2 },
  { display: 'They have been married ___ 2015.', blankWord: 'since', en: 'They have been married since 2015.', ar: 'متزوجان منذ عام 2015.', acceptedAnswers: ['since'], tags: ['present-perfect', 'for-since'], difficulty: 2 },
  { display: 'I have practiced the piano ___ two months.', blankWord: 'for', en: 'I have practiced the piano for two months.', ar: 'أتدرب على البيانو لمدة شهرين.', acceptedAnswers: ['for'], tags: ['present-perfect', 'for-since'], difficulty: 2 },
  { display: 'She has taught at this school ___ last year.', blankWord: 'since', en: 'She has taught at this school since last year.', ar: 'تدرس في هذه المدرسة منذ العام الماضي.', acceptedAnswers: ['since'], tags: ['present-perfect', 'for-since'], difficulty: 3 },
  { display: 'We have waited ___ an hour!', blankWord: 'for', en: 'We have waited for an hour!', ar: 'انتظرنا لمدة ساعة!', acceptedAnswers: ['for'], tags: ['present-perfect', 'for-since'], difficulty: 1 },
];

const l18Orders = [
  orderFrom({ en: 'I have lived here since 2019.', ar: 'أعيش هنا منذ عام 2019.', tags: ['present-perfect', 'for-since'] }),
  orderFrom({ en: 'She has worked here for five years.', ar: 'تعمل هنا لمدة خمس سنوات.', tags: ['present-perfect', 'for-since'] }),
  orderFrom({ en: 'We have known him for years.', ar: 'نعرفه منذ سنوات.', tags: ['present-perfect', 'for-since'] }),
  orderFrom({ en: 'They have studied English since September.', ar: 'يدرسون الإنجليزية منذ سبتمبر.', tags: ['present-perfect', 'for-since'] }),
  orderFrom({ en: 'He has played tennis since childhood.', ar: 'يلعب التنس منذ الطفولة.', tags: ['present-perfect', 'for-since'] }),
  orderFrom({ en: 'I have waited for an hour.', ar: 'انتظرت لمدة ساعة.', tags: ['present-perfect', 'for-since'] }),
];

const l18Mc = [
  { question: '___ points to a starting point: ___ 2020.', options: ['For / for', 'Since / since', 'Since / for'], answerIndex: 1, ar: 'since لنقطة البداية.', tags: ['present-perfect', 'for-since'] },
  { question: 'I have lived in Cairo ___ ten years.', options: ['since', 'for', 'from'], answerIndex: 1, ar: 'أعيش في القاهرة لمدة عشر سنوات.', tags: ['present-perfect', 'for-since'] },
  { question: 'She has worked here ___ March.', options: ['for', 'since', 'during'], answerIndex: 1, ar: 'تعمل هنا منذ مارس.', tags: ['present-perfect', 'for-since'] },
  { question: 'Which sentence is correct?', options: ['I know him since 2010.', 'I have known him since 2010.', 'I am knowing him since 2010.'], answerIndex: 1, ar: 'أعرفه منذ عام 2010.', tags: ['present-perfect', 'for-since'] },
  { question: 'We have been friends ___ a long time.', options: ['since', 'for', 'at'], answerIndex: 1, ar: 'نحن أصدقاء لمدة طويلة.', tags: ['present-perfect', 'for-since'] },
  { question: 'He has taught math ___ 2018.', options: ['for', 'since', 'in'], answerIndex: 1, ar: 'يعلّم الرياضيات منذ عام 2018.', tags: ['present-perfect', 'for-since'] },
];

/* ============================================================
   019 Present Perfect Continuous
   ============================================================ */
const l19Lt = expandAll([
  pat('{S} {HAVE} {V} {D}.', '{S_ar} {V_ar} {D_ar}.', {
    S: B.PRONOUNS,
    HAVE: (x) => [{ en: HAVE[x.S.agr], ar: '' }],
    VO: [{ v: 'wait', os: [{ en: 'for the bus', ar: 'للحافلة' }] }, { v: 'study', os: [{ en: 'for the exam', ar: 'للاختبار' }] }, { v: 'work', os: [{ en: 'on this project', ar: 'على هذا المشروع' }] }, { v: 'practice', os: [{ en: 'the guitar', ar: 'على الجيتار' }] }, { v: 'learn', os: [{ en: 'English', ar: 'الإنجليزية' }] }, { v: 'sleep', os: [{ en: '', ar: '' }] }, { v: 'sit', os: [{ en: 'here', ar: 'هنا' }] }],
    V: (x) => [{ en: `been ${C.enIng(x.VO.v)}` + (x.VO.os[0].en ? ` ${x.VO.os[0].en}` : ''), ar: C.arPresent(x.VO.v, x.S.agr) }],
    D: B.TIME_DURATION.slice(0, 6),
  }, { tags: ['present-perfect-continuous'], difficulty: 3, limit: 70 }),
]);

const l19Fills = [
  fillFrom({ en: 'I have been waiting for two hours.', ar: 'أنا أنتظر لمدة ساعتين.', tags: ['present-perfect-continuous'] }, 'have been waiting', { hint: 'have been + -ing' }),
  fillFrom({ en: 'She has been studying since morning.', ar: 'تدرس منذ الصباح.', tags: ['present-perfect-continuous'] }, 'has been studying', { hint: 'has been + -ing' }),
  fillFrom({ en: 'They have been playing since noon.', ar: 'يلعبون منذ الظهر.', tags: ['present-perfect-continuous'] }, 'have been playing', { hint: 'have been + -ing' }),
  fillFrom({ en: 'He has been working here for five years.', ar: 'يعمل هنا لمدة خمس سنوات.', tags: ['present-perfect-continuous'] }, 'has been working', { hint: 'has been + -ing' }),
  fillFrom({ en: 'We have been learning English for months.', ar: 'نتعلم الإنجليزية لمدة أشهر.', tags: ['present-perfect-continuous'] }, 'have been learning', { hint: 'have been + -ing' }),
  fillFrom({ en: 'It has been raining all day.', ar: 'إنها تمطر طوال اليوم.', tags: ['present-perfect-continuous'] }, 'has been raining', { hint: 'has been + -ing' }),
  fillFrom({ en: 'I have been sitting here for an hour.', ar: 'أجلس هنا لمدة ساعة.', tags: ['present-perfect-continuous'] }, 'have been sitting', { hint: 'have been + -ing' }),
  fillFrom({ en: 'She has been practicing since Monday.', ar: 'تتدرب منذ الاثنين.', tags: ['present-perfect-continuous'] }, 'has been practicing', { hint: 'has been + -ing' }),
];

const l19Orders = [
  orderFrom({ en: 'I have been waiting for hours.', ar: 'أنتظر لمدة ساعات.', tags: ['present-perfect-continuous'] }),
  orderFrom({ en: 'She has been studying all day.', ar: 'تدرس طوال اليوم.', tags: ['present-perfect-continuous'] }),
  orderFrom({ en: 'They have been working since morning.', ar: 'يعملون منذ الصباح.', tags: ['present-perfect-continuous'] }),
  orderFrom({ en: 'He has been sleeping for two hours.', ar: 'ينام لمدة ساعتين.', tags: ['present-perfect-continuous'] }),
  orderFrom({ en: 'We have been practicing for weeks.', ar: 'نتدرب لمدة أسابيع.', tags: ['present-perfect-continuous'] }),
  orderFrom({ en: 'It has been raining since noon.', ar: 'تمطر منذ الظهر.', tags: ['present-perfect-continuous'] }),
];

const l19Mc = [
  { question: 'I ___ for the bus since eight.', options: ['wait', 'am waiting', 'have been waiting'], answerIndex: 2, ar: 'أنتظر الحافلة منذ الثامنة.', tags: ['present-perfect-continuous'], explanation: 'Ongoing action + duration → have been + -ing.' },
  { question: 'She has ___ English for three years.', options: ['been studying', 'studying', 'study'], answerIndex: 0, ar: 'تدرس الإنجليزية لمدة ثلاث سنوات.', tags: ['present-perfect-continuous'] },
  { question: 'Which is correct?', options: ['He has been work here.', 'He has been working here.', 'He have been working here.'], answerIndex: 1, ar: 'هو يعمل هنا.', tags: ['present-perfect-continuous'] },
  { question: 'It ___ raining since Friday.', options: ['has been', 'have been', 'is been'], answerIndex: 0, ar: 'تمطر منذ الجمعة.', tags: ['present-perfect-continuous'] },
  { question: 'They have been ___ for an hour.', options: ['talk', 'talked', 'talking'], answerIndex: 2, ar: 'يتحدثون لمدة ساعة.', tags: ['present-perfect-continuous'] },
  { question: 'How long ___ you been waiting?', options: ['did', 'have', 'are'], answerIndex: 1, ar: 'منذ متى وأنت تنتظر؟', tags: ['present-perfect-continuous', 'questions'] },
];

/* ============================================================
   020 Past Simple — regular verbs
   ============================================================ */
const PAST_OBJS = [{ en: 'the door', ar: 'الباب' }, { en: 'the window', ar: 'النافذة' }, { en: 'dinner', ar: 'العشاء' }, { en: 'the car', ar: 'السيارة' }, { en: 'the dishes', ar: 'الأطباق' }, { en: 'the report', ar: 'التقرير' }, { en: 'a letter', ar: 'خطابا' }, { en: 'her bag', ar: 'حقيبتها' }];
const l20Lt = expandAll([
  pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'watch', os: [{ en: 'TV', ar: 'التلفاز' }, { en: 'a movie', ar: 'فيلما' }] }, { v: 'play', os: [{ en: 'football', ar: 'كرة القدم' }, { en: 'tennis', ar: 'التنس' }] }, { v: 'cook', os: [{ en: 'dinner', ar: 'العشاء' }, { en: 'rice', ar: 'الأرز' }] }, { v: 'clean', os: [{ en: 'the house', ar: 'البيت' }, { en: 'the kitchen', ar: 'المطبخ' }] }, { v: 'wash', os: [{ en: 'the car', ar: 'السيارة' }, { en: 'the dishes', ar: 'الأطباق' }] }, { v: 'visit', os: [{ en: 'the museum', ar: 'المتحف' }, { en: 'her grandmother', ar: 'جدتها' }] }, { v: 'open', os: [{ en: 'the shop', ar: 'المتجر' }, { en: 'the window', ar: 'النافذة' }] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(0, 5),
  }, { tags: ['past-simple', 'regular-verbs'], difficulty: 1, limit: 70 }),
  pat('{P} {V} {O} {T}.', '{P_ar} {V_ar} {O_ar} {T_ar}.', {
    P: B.PEOPLE_SING.slice(0, 10),
    VO: [{ v: 'study', os: [{ en: 'English', ar: 'الإنجليزية' }, { en: 'math', ar: 'الرياضيات' }] }, { v: 'finish', os: [{ en: 'the report', ar: 'التقرير' }, { en: 'the homework', ar: 'الواجب المنزلي' }] }, { v: 'check', os: [{ en: 'the email', ar: 'البريد الإلكتروني' }, { en: 'the answers', ar: 'الإجابات' }] }, { v: 'answer', os: [{ en: 'the question', ar: 'السؤال' }, { en: 'the email', ar: 'البريد الإلكتروني' }] }, { v: 'start', os: [{ en: 'a new job', ar: 'عملا جديدا' }, { en: 'a course', ar: 'دورة' }] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.P.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(2, 9),
  }, { tags: ['past-simple', 'regular-verbs'], difficulty: 1, limit: 70 }),
]);

const l20Fills = [
  fillFrom({ en: 'She watched TV last night.', ar: 'شاهدت التلفاز الليلة الماضية.', tags: ['past-simple', 'regular-verbs'] }, 'watched', { hint: 'past form' }),
  fillFrom({ en: 'They played football two days ago.', ar: 'لعبوا كرة القدم قبل يومين.', tags: ['past-simple'] }, 'played', { hint: 'past form' }),
  fillFrom({ en: 'I cooked dinner yesterday.', ar: 'طبخت العشاء أمس.', tags: ['past-simple'] }, 'cooked', { hint: 'past form' }),
  fillFrom({ en: 'He studied all night.', ar: 'درس طوال الليل.', tags: ['past-simple', 'spelling'] }, 'studied', { hint: 'y → ied' }),
  fillFrom({ en: 'We cleaned the house on Friday.', ar: 'نظفنا البيت يوم الجمعة.', tags: ['past-simple'] }, 'cleaned', { hint: 'past form' }),
  fillFrom({ en: 'She visited her grandmother last week.', ar: 'زارت جدتها الأسبوع الماضي.', tags: ['past-simple'] }, 'visited', { hint: 'past form' }),
  fillFrom({ en: 'The film started at nine.', ar: 'بدأ الفيلم في التاسعة.', tags: ['past-simple'] }, 'started', { hint: 'past form' }),
  fillFrom({ en: 'I listened to the news this morning.', ar: 'استمعت إلى الأخبار هذا الصباح.', tags: ['past-simple'] }, 'listened', { hint: 'past form' }),
];

const l20Orders = [
  orderFrom({ en: 'She watched TV last night.', ar: 'شاهدت التلفاز الليلة الماضية.', tags: ['past-simple'] }),
  orderFrom({ en: 'I cooked dinner yesterday.', ar: 'طبخت العشاء أمس.', tags: ['past-simple'] }),
  orderFrom({ en: 'They played tennis.', ar: 'لعبوا التنس.', tags: ['past-simple'] }),
  orderFrom({ en: 'We visited the museum.', ar: 'زرنا المتحف.', tags: ['past-simple'] }),
  orderFrom({ en: 'He finished the report.', ar: 'أنهى التقرير.', tags: ['past-simple'] }),
  orderFrom({ en: 'She called me yesterday.', ar: 'اتصلت بي أمس.', tags: ['past-simple'] }),
];

const l20Mc = [
  { question: 'She ___ the window an hour ago.', options: ['closes', 'closed', 'close'], answerIndex: 1, ar: 'أغلقت النافذة قبل ساعة.', tags: ['past-simple'] },
  { question: 'Which spelling is correct? (study / past)', options: ['studyed', 'studied', 'studed'], answerIndex: 1, ar: 'درس.', tags: ['past-simple', 'spelling'] },
  { question: 'We ___ the museum last week.', options: ['visit', 'visited', 'visiting'], answerIndex: 1, ar: 'زرنا المتحف الأسبوع الماضي.', tags: ['past-simple'] },
  { question: 'Which spelling is correct? (stop / past)', options: ['stoped', 'stopped', 'stoppied'], answerIndex: 1, ar: 'توقف.', tags: ['past-simple', 'spelling'], explanation: 'Short vowel + consonant → double the consonant.' },
  { question: 'They ___ dinner at eight yesterday.', options: ['cook', 'cooked', 'cooking'], answerIndex: 1, ar: 'طبخوا العشاء في الثامنة أمس.', tags: ['past-simple'] },
  { question: 'Time words like "yesterday" and "last week" signal…', options: ['present simple', 'past simple', 'future'], answerIndex: 1, ar: 'تلميحات الزمن الماضي.', tags: ['past-simple'] },
];

/* ============================================================
   021 Past Simple — irregular verbs
   ============================================================ */
const IRREG_OBJS = [{ en: 'to the market', ar: 'إلى السوق' }, { en: 'an apple', ar: 'تفاحة' }, { en: 'a cup of tea', ar: 'كوب شاي' }, { en: 'a good movie', ar: 'فيلما جيدا' }, { en: 'his keys', ar: 'مفاتيحه' }, { en: 'a new phone', ar: 'هاتفا جديدا' }, { en: 'a letter', ar: 'خطابا' }, { en: 'her friend', ar: 'صديقتها' }, { en: 'the answer', ar: 'الجواب' }, { en: 'the news', ar: 'الخبر' }];
const l21Lt = expandAll([
  pat('{S} {V} {O} {T}.', '{S_ar} {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'go', os: [IRREG_OBJS[0]] }, { v: 'eat', os: [IRREG_OBJS[1]] }, { v: 'drink', os: [IRREG_OBJS[2]] }, { v: 'see', os: [IRREG_OBJS[3]] }, { v: 'lose', os: [IRREG_OBJS[4]] }, { v: 'buy', os: [IRREG_OBJS[5]] }, { v: 'write', os: [IRREG_OBJS[6]] }, { v: 'meet', os: [IRREG_OBJS[7]] }, { v: 'find', os: [IRREG_OBJS[8]] }, { v: 'hear', os: [IRREG_OBJS[9]] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(0, 6),
  }, { tags: ['past-simple', 'irregular-verbs'], difficulty: 2, limit: 80 }),
  pat('{P} {V} {O} {T}.', '{P_ar} {V_ar} {O_ar} {T_ar}.', {
    P: B.PEOPLE_SING.slice(0, 10),
    VO: [{ v: 'take', os: [{ en: 'a taxi', ar: 'سيارة أجرة' }] }, { v: 'make', os: [{ en: 'a cake', ar: 'كيكة' }] }, { v: 'come', os: [{ en: 'home late', ar: 'إلى البيت متأخرا' }] }, { v: 'give', os: [{ en: 'a gift', ar: 'هدية' }] }, { v: 'speak', os: [{ en: 'to the manager', ar: 'إلى المدير' }] }, { v: 'forget', os: [{ en: 'the meeting', ar: 'الاجتماع' }] }, { v: 'wear', os: [{ en: 'a new jacket', ar: 'سترة جديدة' }] }, { v: 'tell', os: [{ en: 'a story', ar: 'قصة' }] }],
    V: (x) => [{ en: C.enPast(x.VO.v), ar: C.arPast(x.VO.v, x.P.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(2, 9),
  }, { tags: ['past-simple', 'irregular-verbs'], difficulty: 2, limit: 70 }),
]);

const l21Fills = [
  fillFrom({ en: 'I went to the market yesterday.', ar: 'ذهبت إلى السوق أمس.', tags: ['past-simple', 'irregular-verbs'] }, 'went', { hint: 'go → ؟' }),
  fillFrom({ en: 'She ate an apple this morning.', ar: 'أكلت تفاحة هذا الصباح.', tags: ['past-simple', 'irregular-verbs'] }, 'ate', { hint: 'eat → ؟' }),
  fillFrom({ en: 'He bought a new phone last week.', ar: 'اشترى هاتفا جديدا الأسبوع الماضي.', tags: ['past-simple', 'irregular-verbs'] }, 'bought', { hint: 'buy → ؟' }),
  fillFrom({ en: 'We saw a good movie on Friday.', ar: 'رأينا فيلما جيدا يوم الجمعة.', tags: ['past-simple', 'irregular-verbs'] }, 'saw', { hint: 'see → ؟' }),
  fillFrom({ en: 'They came home late.', ar: 'جاءوا إلى البيت متأخرين.', tags: ['past-simple', 'irregular-verbs'] }, 'came', { hint: 'come → ؟' }),
  fillFrom({ en: 'I lost my keys two days ago.', ar: 'فقدت مفاتيحي قبل يومين.', tags: ['past-simple', 'irregular-verbs'] }, 'lost', { hint: 'lose → ؟' }),
  fillFrom({ en: 'She wrote a letter to her friend.', ar: 'كتبت خطابا إلى صديقتها.', tags: ['past-simple', 'irregular-verbs'] }, 'wrote', { hint: 'write → ؟' }),
  fillFrom({ en: 'He took a taxi to the airport.', ar: 'أخذ سيارة أجرة إلى المطار.', tags: ['past-simple', 'irregular-verbs'] }, 'took', { hint: 'take → ؟' }),
];

const l21Orders = [
  orderFrom({ en: 'I went home early.', ar: 'ذهبت إلى البيت مبكرا.', tags: ['past-simple', 'irregular-verbs'] }),
  orderFrom({ en: 'She ate rice for lunch.', ar: 'أكلت الأرز للغداء.', tags: ['past-simple', 'irregular-verbs'] }),
  orderFrom({ en: 'He drank all the juice.', ar: 'شرب كل العصير.', tags: ['past-simple', 'irregular-verbs'] }),
  orderFrom({ en: 'We saw him at the station.', ar: 'رأيناه في المحطة.', tags: ['past-simple', 'irregular-verbs'] }),
  orderFrom({ en: 'They made a big cake.', ar: 'صنعوا كيكة كبيرة.', tags: ['past-simple', 'irregular-verbs'] }),
  orderFrom({ en: 'She gave me a gift.', ar: 'أعطتني هدية.', tags: ['past-simple', 'irregular-verbs'] }),
];

const l21Mc = [
  { question: 'Past of "go"?', options: ['goed', 'went', 'gone'], answerIndex: 1, ar: 'ذهب.', tags: ['past-simple', 'irregular-verbs'] },
  { question: 'Past of "buy"?', options: ['buyed', 'bought', 'brought'], answerIndex: 1, ar: 'اشترى.', tags: ['past-simple', 'irregular-verbs'] },
  { question: 'Past of "write"?', options: ['wrote', 'writed', 'written'], answerIndex: 0, ar: 'كتب.', tags: ['past-simple', 'irregular-verbs'] },
  { question: 'Past of "see"?', options: ['seed', 'saw', 'seen'], answerIndex: 1, ar: 'رأى.', tags: ['past-simple', 'irregular-verbs'] },
  { question: 'Past of "take"?', options: ['taked', 'took', 'taken'], answerIndex: 1, ar: 'أخذ.', tags: ['past-simple', 'irregular-verbs'] },
  { question: 'Past of "eat"?', options: ['eated', 'ate', 'eaten'], answerIndex: 1, ar: 'أكل.', tags: ['past-simple', 'irregular-verbs'] },
];

/* ============================================================
   022 Past Simple — negative & questions
   ============================================================ */
const l22Lt = expandAll([
  pat("{S} {DIDN} {V} {O} {T}.", '{S_ar} لم {V_ar} {O_ar} {T_ar}.', {
    S: B.PRONOUNS,
    DIDN: (x) => [{ en: "didn't", ar: '' }],
    VO: [{ v: 'go', os: [IRREG_OBJS[0]] }, { v: 'eat', os: [IRREG_OBJS[1]] }, { v: 'drink', os: [IRREG_OBJS[2]] }, { v: 'see', os: [IRREG_OBJS[3]] }, { v: 'buy', os: [IRREG_OBJS[5]] }, { v: 'watch', os: [{ en: 'the match', ar: 'المباراة' }] }, { v: 'call', os: [{ en: 'me', ar: '' }] }],
    V: (x) => [{ en: x.VO.v + (x.VO.os[0].ar ? '' : ' ' + x.VO.os[0].en), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => [{ en: x.VO.os[0].en.includes(' ') && !x.VO.os[0].ar ? '' : x.VO.os[0].en, ar: x.VO.os[0].ar }],
    T: B.TIME_POINT.slice(0, 5),
  }, { tags: ['past-simple', 'negation'], difficulty: 2, limit: 70 }),
  pat('Did {S} {V} {O} {T}?', 'هل {V_ar} {S_ar} {O_ar} {T_ar}؟', {
    S: B.PRONOUNS,
    VO: [{ v: 'go', os: [IRREG_OBJS[0]] }, { v: 'eat', os: [IRREG_OBJS[1]] }, { v: 'see', os: [IRREG_OBJS[3]] }, { v: 'buy', os: [IRREG_OBJS[5]] }, { v: 'meet', os: [IRREG_OBJS[7]] }],
    V: (x) => [{ en: x.VO.v, ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    T: B.TIME_POINT.slice(0, 6),
  }, { tags: ['past-simple', 'questions'], difficulty: 2, limit: 70 }),
]);

const l22Fills = [
  { display: 'She ___ (not / go) to school yesterday.', blankWord: "didn't go", en: "She didn't go to school yesterday.", ar: 'لم تذهب إلى المدرسة أمس.', acceptedAnswers: ["didn't go", 'did not go'], tags: ['past-simple', 'negation'], difficulty: 2 },
  { display: '___ you see the match last night?', blankWord: 'Did', en: 'Did you see the match last night?', ar: 'هل رأيت المباراة الليلة الماضية؟', acceptedAnswers: ['Did', 'did'], tags: ['past-simple', 'questions'], difficulty: 1 },
  { display: 'They ___ (not / buy) anything at the market.', blankWord: "didn't buy", en: "They didn't buy anything at the market.", ar: 'لم يشتروا شيئا في السوق.', acceptedAnswers: ["didn't buy", 'did not buy'], tags: ['past-simple', 'negation'], difficulty: 2 },
  { display: '___ he call you yesterday?', blankWord: 'Did', en: 'Did he call you yesterday?', ar: 'هل اتصل بك أمس؟', acceptedAnswers: ['Did', 'did'], tags: ['past-simple', 'questions'], difficulty: 1 },
  { display: 'I ___ (not / eat) breakfast this morning.', blankWord: "didn't eat", en: "I didn't eat breakfast this morning.", ar: 'لم آكل الفطور هذا الصباح.', acceptedAnswers: ["didn't eat", 'did not eat'], tags: ['past-simple', 'negation'], difficulty: 2 },
  { display: '___ she pass the test?', blankWord: 'Did', en: 'Did she pass the test?', ar: 'هل نجحت في الاختبار؟', acceptedAnswers: ['Did', 'did'], tags: ['past-simple', 'questions'], difficulty: 2 },
  { display: 'We ___ (not / watch) the film.', blankWord: "didn't watch", en: "We didn't watch the film.", ar: 'لم نشاهد الفيلم.', acceptedAnswers: ["didn't watch", 'did not watch'], tags: ['past-simple', 'negation'], difficulty: 2 },
  { display: '___ they arrive on time?', blankWord: 'Did', en: 'Did they arrive on time?', ar: 'هل وصلوا في الوقت المحدد؟', acceptedAnswers: ['Did', 'did'], tags: ['past-simple', 'questions'], difficulty: 2 },
];

const l22Orders = [
  orderFrom({ en: "She didn't go to school.", ar: 'لم تذهب إلى المدرسة.', tags: ['past-simple', 'negation'] }),
  orderFrom({ en: 'Did you see him?', ar: 'هل رأيته؟', tags: ['past-simple', 'questions'] }),
  orderFrom({ en: "I didn't eat anything.", ar: 'لم آكل شيئا.', tags: ['past-simple', 'negation'] }),
  orderFrom({ en: 'Did they buy a car?', ar: 'هل اشتروا سيارة؟', tags: ['past-simple', 'questions'] }),
  orderFrom({ en: "He didn't call me back.", ar: 'لم يرد على اتصالي.', tags: ['past-simple', 'negation'] }),
  orderFrom({ en: 'Did it rain yesterday?', ar: 'هل أمطرت أمس؟', tags: ['past-simple', 'questions'] }),
];

const l22Mc = [
  { question: 'He ___ come to the party.', options: ["didn't", "doesn't", 'not'], answerIndex: 0, ar: 'لم يأتِ إلى الحفلة.', tags: ['past-simple', 'negation'] },
  { question: '___ she go to work yesterday?', options: ['Did', 'Does', 'Was'], answerIndex: 0, ar: 'هل ذهبت إلى العمل أمس؟', tags: ['past-simple', 'questions'] },
  { question: 'After "didn’t" we use…', options: ['past form', 'base form', 'verb + s'], answerIndex: 1, ar: 'بعد didn\u2019t يأتي الفعل المجرد.', tags: ['past-simple', 'negation'] },
  { question: 'Choose the correct question.', options: ['Did you went?', 'Did you go?', 'Do you went?'], answerIndex: 1, ar: 'هل ذهبت؟', tags: ['past-simple', 'questions'] },
  { question: 'They ___ answer my email.', options: ["didn't", "don't", "wasn't"], answerIndex: 0, ar: 'لم يردوا على بريدي.', tags: ['past-simple', 'negation'] },
  { question: '___ it rain last week?', options: ['Did', 'Does', 'Is'], answerIndex: 0, ar: 'هل أمطرت الأسبوع الماضي؟', tags: ['past-simple', 'questions'] },
];

/* ============================================================
   023 Past Continuous
   ============================================================ */
const l23Lt = expandAll([
  pat('{S} {BEP} {V} {O} {L} {T}.', '{S_ar} {KANA_ar} {V_ar} {O_ar} {L_ar} {T_ar}.', {
    S: B.PRONOUNS,
    BEP: (x) => [{ en: BEPAST[x.S.agr], ar: '' }],
    KANA: (x) => [{ en: '', ar: { I: 'كنت', you: 'كنت', he: 'كان', she: 'كانت', we: 'كنا', they: 'كانوا' }[x.S.agr] }],
    VO: [{ v: 'read', os: READSET.slice(0, 3) }, { v: 'watch', os: [{ en: 'a movie', ar: 'فيلما' }, { en: 'the match', ar: 'المباراة' }] }, { v: 'cook', os: [{ en: 'dinner', ar: 'العشاء' }] }, { v: 'wait', os: [{ en: 'for the bus', ar: 'للحافلة' }] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    L: B.LOCATIONS.slice(0, 5),
    T: [{ en: 'at eight', ar: 'في الثامنة' }, { en: 'at seven in the morning', ar: 'في السابعة صباحا' }, { en: 'at noon', ar: 'ظهرا' }, { en: 'last night', ar: 'الليلة الماضية' }, { en: 'yesterday evening', ar: 'أمس في المساء' }],
  }, { tags: ['past-continuous'], difficulty: 2, limit: 70 }),
  pat('When you called, {P} {BEP} {V}.', 'عندما اتصلت، {P_ar} {KANA_ar} {V_ar}.', {
    P: B.PEOPLE_SING.slice(0, 8),
    BEP: (x) => [{ en: BEPAST[x.P.agr], ar: '' }],
    KANA: (x) => [{ en: '', ar: { I: 'كنت', you: 'كنت', he: 'كان', she: 'كانت', we: 'كنا', they: 'كانوا' }[x.P.agr] }],
    VO: [{ v: 'work', os: [] }, { v: 'sleep', os: [] }, { v: 'study', os: [] }, { v: 'drive', os: [] }],
    V: (x) => [{ en: C.enIng(x.VO.v), ar: C.arPresent(x.VO.v, x.P.agr) }],
  }, { tags: ['past-continuous', 'interrupted-action'], difficulty: 3, limit: 40 }),
]);

const l23Fills = [
  fillFrom({ en: 'I was reading when the phone rang.', ar: 'كنت أقرأ عندما رن الهاتف.', tags: ['past-continuous'] }, 'was reading', { hint: 'was + -ing' }),
  fillFrom({ en: 'They were playing football at five.', ar: 'كانوا يلعبون كرة القدم في الخامسة.', tags: ['past-continuous'] }, 'were playing', { hint: 'were + -ing' }),
  fillFrom({ en: 'She was cooking dinner at six.', ar: 'كانت تطبخ العشاء في السادسة.', tags: ['past-continuous'] }, 'was cooking', { hint: 'was + -ing' }),
  fillFrom({ en: 'We were waiting for the bus.', ar: 'كنا ننتظر الحافلة.', tags: ['past-continuous'] }, 'were waiting', { hint: 'were + -ing' }),
  fillFrom({ en: 'He was sleeping at midnight.', ar: 'كان نائما في منتصف الليل.', tags: ['past-continuous'] }, 'was sleeping', { hint: 'was + -ing' }),
  fillFrom({ en: 'It was raining all morning.', ar: 'كانت تمطر طوال الصباح.', tags: ['past-continuous'] }, 'was raining', { hint: 'was + -ing' }),
  fillFrom({ en: 'You were studying very hard.', ar: 'كنت تدرس بجد كبير.', tags: ['past-continuous'] }, 'were studying', { hint: 'were + -ing' }),
  fillFrom({ en: 'The sun was shining.', ar: 'كانت الشمس مشرقة.', tags: ['past-continuous'] }, 'was shining', { hint: 'was + -ing' }),
];

const l23Orders = [
  orderFrom({ en: 'I was reading at eight.', ar: 'كنت أقرأ في الثامنة.', tags: ['past-continuous'] }),
  orderFrom({ en: 'She was cooking dinner.', ar: 'كانت تطبخ العشاء.', tags: ['past-continuous'] }),
  orderFrom({ en: 'They were playing outside.', ar: 'كانوا يلعبون في الخارج.', tags: ['past-continuous'] }),
  orderFrom({ en: 'We were waiting for you.', ar: 'كنا ننتظرك.', tags: ['past-continuous'] }),
  orderFrom({ en: 'He was sleeping then.', ar: 'كان نائما حينها.', tags: ['past-continuous'] }),
  orderFrom({ en: 'It was raining hard.', ar: 'كانت تمطر بشدة.', tags: ['past-continuous'] }),
];

const l23Mc = [
  { question: 'At eight, I ___ breakfast.', options: ['have', 'was having', 'had'], answerIndex: 1, ar: 'في الثامنة كنت أتناول الفطور.', tags: ['past-continuous'] },
  { question: 'They ___ football all afternoon.', options: ['was playing', 'were playing', 'played'], answerIndex: 1, ar: 'كانوا يلعبون كرة القدم طوال العصر.', tags: ['past-continuous'] },
  { question: 'She ___ when I arrived.', options: ['cooked', 'was cooking', 'cooks'], answerIndex: 1, ar: 'كانت تطبخ عندما وصلت.', tags: ['past-continuous'], explanation: 'Long background action → past continuous.' },
  { question: '___ you sleeping at midnight?', options: ['Was', 'Were', 'Did'], answerIndex: 1, ar: 'هل كنت نائما في منتصف الليل؟', tags: ['past-continuous', 'questions'] },
  { question: 'Which is correct?', options: ['He were reading.', 'He was reading.', 'He was read.'], answerIndex: 1, ar: 'كان يقرأ.', tags: ['past-continuous'] },
  { question: 'The past continuous describes…', options: ['finished actions', 'actions in progress at a past time', 'future plans'], answerIndex: 1, ar: 'حدث مستمر في زمن ماض.', tags: ['past-continuous'] },
];

/* ============================================================
   024 Past Perfect
   ============================================================ */
const KANA_QAD = { I: 'كنت قد', you: 'كنت قد', he: 'كان قد', she: 'كانت قد', we: 'كنا قد', they: 'كانوا قد' };
const l24Lt = expandAll([
  pat('{S} had {V} {O} before {E}.', '{KANA_ar} {V_ar} {O_ar} قبل {E_ar}.', {
    S: B.PRONOUNS,
    VO: [{ v: 'finish', os: [{ en: 'the report', ar: 'التقرير' }, { en: 'the homework', ar: 'الواجب المنزلي' }] }, { v: 'eat', os: [{ en: 'lunch', ar: 'الغداء' }] }, { v: 'leave', os: [{ en: 'the office', ar: 'المكتب' }] }, { v: 'read', os: [{ en: 'the message', ar: 'الرسالة' }] }, { v: 'see', os: [{ en: 'the doctor', ar: 'الطبيب' }] }, { v: 'buy', os: [{ en: 'the ticket', ar: 'التذكرة' }] }],
    V: (x) => [{ en: C.enPP(x.VO.v), ar: C.arPast(x.VO.v, x.S.agr) }],
    O: (x) => x.VO.os,
    KANA: (x) => [{ en: '', ar: KANA_QAD[x.S.agr] }],
    E: [{ en: 'lunch', ar: 'الغداء' }, { en: 'the meeting', ar: 'الاجتماع' }, { en: 'nine o\u2019clock', ar: 'التاسعة' }, { en: 'the phone call', ar: 'المكالمة الهاتفية' }],
  }, { tags: ['past-perfect'], difficulty: 3, limit: 70, filter: (x) => x.O.en !== x.E.en }),
  pat('By the time we arrived, {P} {V}.', 'بحلول وصولنا، {KANA_ar} {V_ar}.', {
    P: B.PEOPLE_SING.slice(0, 8),
    VO: [{ v: 'leave', os: [] }, { v: 'go', os: [] }, { v: 'finish', os: [] }, { v: 'sleep', os: [] }, { v: 'start', os: [] }],
    V: (x) => [{ en: `had ${C.enPP(x.VO.v)}`, ar: C.arPast(x.VO.v, x.P.agr) }],
    KANA: (x) => [{ en: '', ar: KANA_QAD[x.P.agr] }],
  }, { tags: ['past-perfect'], difficulty: 3, limit: 40 }),
]);

const l24Fills = [
  fillFrom({ en: 'The train had left before I arrived.', ar: 'كان القطار قد غادر قبل وصولي.', tags: ['past-perfect'] }, 'had left', { hint: 'had + pp' }),
  fillFrom({ en: 'She had finished the report before the meeting.', ar: 'كانت قد أنهت التقرير قبل الاجتماع.', tags: ['past-perfect'] }, 'had finished', { hint: 'had + pp' }),
  fillFrom({ en: 'They had eaten everything by noon.', ar: 'كانوا قد أكلوا كل شيء بحلول الظهر.', tags: ['past-perfect'] }, 'had eaten', { hint: 'had + pp' }),
  fillFrom({ en: 'I had never seen snow before that trip.', ar: 'لم أرَ الثلج من قبل قبل تلك الرحلة.', tags: ['past-perfect'] }, 'had never seen', { hint: 'had + never + pp' }),
  fillFrom({ en: 'He had lost his keys, so he called me.', ar: 'كان قد فقد مفاتيحه، لذلك اتصل بي.', tags: ['past-perfect'] }, 'had lost', { hint: 'had + pp' }),
  fillFrom({ en: 'We had already bought the tickets.', ar: 'كان قد اشترينا التذاكر بالفعل.', tags: ['past-perfect'] }, 'had already bought', { hint: 'had + already + pp' }),
  fillFrom({ en: 'When she came, the film had started.', ar: 'عندما جاءت، كان الفيلم قد بدأ.', tags: ['past-perfect'] }, 'had started', { hint: 'had + pp' }),
  fillFrom({ en: 'By ten, everyone had gone home.', ar: 'بحلول العاشرة، كان الجميع قد ذهبوا إلى البيت.', tags: ['past-perfect'] }, 'had gone', { hint: 'had + pp' }),
];

const l24Orders = [
  orderFrom({ en: 'The bus had left before noon.', ar: 'كانت الحافلة قد غادرت قبل الظهر.', tags: ['past-perfect'] }),
  orderFrom({ en: 'She had finished before nine.', ar: 'كانت قد أنهت قبل التاسعة.', tags: ['past-perfect'] }),
  orderFrom({ en: 'I had never heard that song.', ar: 'لم أكن قد سمعت تلك الأغنية.', tags: ['past-perfect'] }),
  orderFrom({ en: 'They had eaten before we came.', ar: 'كانوا قد أكلوا قبل أن نأتي.', tags: ['past-perfect'] }),
  orderFrom({ en: 'He had lost the key.', ar: 'كان قد فقد المفتاح.', tags: ['past-perfect'] }),
  orderFrom({ en: 'We had bought everything.', ar: 'كان قد اشترينا كل شيء.', tags: ['past-perfect'] }),
];

const l24Mc = [
  { question: 'The film ___ before we sat down.', options: ['started', 'had started', 'has started'], answerIndex: 1, ar: 'كان الفيلم قد بدأ قبل أن نجلس.', tags: ['past-perfect'], explanation: 'The earlier of two past actions → past perfect.' },
  { question: 'She ___ the email before lunch.', options: ['had sent', 'has sent', 'sends'], answerIndex: 0, ar: 'كانت قد أرسلت البريد قبل الغداء.', tags: ['past-perfect'] },
  { question: 'Past perfect = …', options: ['had + past', 'had + participle', 'have + participle'], answerIndex: 1, ar: 'had + التصريف الثالث.', tags: ['past-perfect'] },
  { question: 'When I arrived, they ___ already left.', options: ['have', 'had', 'has'], answerIndex: 1, ar: 'عندما وصلت، كانوا قد غادروا.', tags: ['past-perfect'] },
  { question: 'Which action happened FIRST? "I ate after I had cooked."', options: ['I ate', 'I had cooked', 'both together'], answerIndex: 1, ar: 'الطبخ حدث أولًا.', tags: ['past-perfect'] },
  { question: 'By midnight, everyone ___ home.', options: ['went', 'had gone', 'goes'], answerIndex: 1, ar: 'بحلول منتصف الليل، كان الجميع قد ذهبوا.', tags: ['past-perfect'] },
];

/* ============================================================
   Lesson configs (013–024)
   ============================================================ */

const GRAM = {
  l13: {
    explanation: 'Use the present simple for habits, routines and facts. With he, she and it, add -s to the verb (she works); verbs ending in -ch, -sh, -o add -es (watches, goes); consonant + y becomes -ies (studies). Time words like every day, on Fridays and at night often appear with this tense.',
    explanationAr: 'نستخدم المضارع البسيط للعادات والروتين والحقائق. مع he وshe وit نضيف s للفعل (she works)، والأفعال المنتهية بـ ch أو sh أو o تاخذ es (watches, goes)، والساكن + y يقلب إلى ies (studies). وتأتي معه كلمات زمن مثل every day وon Fridays وat night.',
    examples: [
      { en: 'She works in a hospital.', ar: 'هي تعمل في مستشفى.' },
      { en: 'I drink coffee every morning.', ar: 'أشرب القهوة كل صباح.' },
      { en: 'Water boils at 100 degrees.', ar: 'يغلي الماء عند 100 درجة.' },
    ],
  },
  l14: {
    explanation: 'To make a negative in the present simple, use do not / does not + base verb: "I don’t work", "She doesn’t work" (never "doesn’t works"). For questions, put Do or Does before the subject: "Does she work here?" Short answers: "Yes, she does. / No, she doesn’t."',
    explanationAr: 'للنفي في المضارع البسيط نستخدم do not / does not + الفعل المجرد: "I don’t work"، "She doesn’t work" (وليس doesn’t works). وللسؤال نضع Do أو Does قبل الفاعل: "Does she work here?" والجواب القصير: "Yes, she does / No, she doesn’t."',
    examples: [
      { en: "She doesn't drink coffee.", ar: 'هي لا تشرب القهوة.' },
      { en: 'Do you speak English?', ar: 'هل تتحدث الإنجليزية؟' },
      { en: "They don't live here.", ar: 'إنهم لا يعيشون هنا.' },
    ],
  },
  l15: {
    explanation: 'Use the present continuous (am/is/are + verb-ing) for actions happening now or around now: "I am reading", "They are playing". Spelling: make → making (drop e), run → running (double the consonant), study → studying (keep y). Time words: now, at the moment, today, right now.',
    explanationAr: 'نستخدم المضارع المستمر (am/is/are + فعل + ing) للحدث الجاري الآن أو حول الآن: "I am reading"، "They are playing". الإملاء: make → making (تحذف e)، run → running (تضاعف الساكن)، study → studying (تبقى y). كلمات الزمن: now، at the moment، today.',
    examples: [
      { en: 'She is reading a book now.', ar: 'هي تقرأ كتابا الآن.' },
      { en: 'They are playing outside.', ar: 'يلعبون في الخارج.' },
      { en: 'I am making tea.', ar: 'أصنع الشاي.' },
    ],
  },
  l16: {
    explanation: 'Negative present continuous: am/is/are + not + verb-ing — "He isn’t working today", "We aren’t coming". Questions put the be-verb first: "Are you listening?", "Is she sleeping?" Remember: actions with am/is/are take the -ing form, not the -s form.',
    explanationAr: 'نفي المضارع المستمر: am/is/are + not + فعل + ing — "He isn’t working today"، "We aren’t coming". وفي السؤال يتقدم فعل الكينونة: "Are you listening?"، "Is she sleeping?" وتذكر: بعد am/is/are يأتي الفعل بصيغة ing لا بصيغة s.',
    examples: [
      { en: "He isn't working today.", ar: 'هو لا يعمل اليوم.' },
      { en: 'Are you listening to me?', ar: 'هل تستمع إليّ؟' },
      { en: "They aren't coming tonight.", ar: 'إنهم لا يأتون الليلة.' },
    ],
  },
  l17: {
    explanation: 'The present perfect (have/has + past participle) connects the past to now. Use it for finished actions with present results ("I have lost my keys" — I still don’t have them), life experiences ("Have you ever tried sushi?"), and recent actions with just/already: "She has just eaten".',
    explanationAr: 'المضارع التام (have/has + التصريف الثالث) يربط الماضي بالحاضر. نستخدمه لأفعال منتهية بنتيجة في الحاضر ("I have lost my keys" — ما زلت بلا مفاتيح)، ولخبرات الحياة ("Have you ever tried sushi?")، وللأحداث الحديثة مع just/already: "She has just eaten".',
    examples: [
      { en: 'I have just finished the report.', ar: 'أنهيت التقرير للتو.' },
      { en: 'Have you ever seen snow?', ar: 'هل رأيت الثلج من قبل؟' },
      { en: 'He has lost his keys.', ar: 'لقد فقد مفاتيحه.' },
    ],
  },
  l18: {
    explanation: 'Use the present perfect with for (a duration: for five years) and since (a starting point: since 2019) for situations that started in the past and continue now: "I have lived here since 2019." This is the natural way to say ما زلت: Arabic often uses the present tense + منذ for the same meaning.',
    explanationAr: 'نستخدم المضارع التام مع for (لمدة) وsince (منذ نقطة بداية) للمواقف التي بدأت في الماضي وتستمر الآن: "I have lived here since 2019". وهذا يعادل في العربية غالبا المضارع + منذ: أعيش هنا منذ 2019.',
    examples: [
      { en: 'I have lived here since 2019.', ar: 'أعيش هنا منذ عام 2019.' },
      { en: 'She has worked here for five years.', ar: 'تعمل هنا لمدة خمس سنوات.' },
      { en: 'We have known him for years.', ar: 'نعرفه منذ سنوات.' },
    ],
  },
  l19: {
    explanation: 'The present perfect continuous (have/has been + verb-ing) stresses the duration of an activity that continues until now: "I have been waiting for two hours." Use it with how long, for and since. It answers the question: how long has this been happening?',
    explanationAr: 'المضارع التام المستمر (have/has been + فعل + ing) يركز على مدة النشاط الذي يستمر حتى الآن: "I have been waiting for two hours". نستخدمه مع how long وfor وsince، وهو يجيب عن سؤال: منذ كم يستمر هذا الحدث؟',
    examples: [
      { en: 'I have been waiting for two hours.', ar: 'أنا أنتظر لمدة ساعتين.' },
      { en: 'She has been studying since morning.', ar: 'تدرس منذ الصباح.' },
      { en: 'It has been raining all day.', ar: 'إنها تمطر طوال اليوم.' },
    ],
  },
  l20: {
    explanation: 'The past simple describes finished actions at a known past time. Regular verbs add -ed: watched, played. Spelling rules: study → studied (y → ied), stop → stopped (double the consonant). Time markers: yesterday, last night, last week, two days ago, in 2010.',
    explanationAr: 'الماضي البسيط يصف أحداثا منتهية في زمن ماض معلوم. الأفعال المنتظمة تاخذ ed: watched, played. قواعد الإملاء: study → studied، stop → stopped (تضعيف الساكن). كلمات الزمن: yesterday، last night، last week، two days ago.',
    examples: [
      { en: 'She watched TV last night.', ar: 'شاهدت التلفاز الليلة الماضية.' },
      { en: 'I cooked dinner yesterday.', ar: 'طبخت العشاء أمس.' },
      { en: 'They played tennis two days ago.', ar: 'لعبوا التنس قبل يومين.' },
    ],
  },
  l21: {
    explanation: 'Irregular verbs change form in the past and must be memorized: go → went, eat → ate, buy → bought, see → saw, write → wrote, take → took, come → came, lose → lost. Their past forms do not take -ed. Learn five irregular verbs per day and test yourself with dictation.',
    explanationAr: 'الأفعال الشاذة تتغير في الماضي وتحفظ كما هي: go → went، eat → ate، buy → bought، see → saw، write → wrote، take → took، come → came، lose → lost. ولا تأخذ ed. احفظ خمسة أفعال شاذة يوميا واختبر نفسك بالإملاء.',
    examples: [
      { en: 'I went to the market yesterday.', ar: 'ذهبت إلى السوق أمس.' },
      { en: 'She ate an apple this morning.', ar: 'أكلت تفاحة هذا الصباح.' },
      { en: 'He bought a new phone last week.', ar: 'اشترى هاتفا جديدا الأسبوع الماضي.' },
    ],
  },
  l22: {
    explanation: 'Past simple negatives use did not / didn’t + base verb: "She didn’t go" (never "didn’t went"). Questions use Did + subject + base verb: "Did you see the match?" Short answers: "Yes, I did. / No, I didn’t." The main verb never carries the past mark when did is present.',
    explanationAr: 'نفي الماضي البسيط: did not / didn’t + الفعل المجرد: "She didn’t go" (وليس didn’t went). والسؤال: Did + الفاعل + الفعل المجرد: "Did you see the match?" والجواب القصير: "Yes, I did / No, I didn’t". ولا يحمل الفعل علامة الماضي عند وجود did.',
    examples: [
      { en: "She didn't go to school.", ar: 'لم تذهب إلى المدرسة.' },
      { en: 'Did you see the match?', ar: 'هل رأيت المباراة؟' },
      { en: "I didn't eat anything.", ar: 'لم آكل شيئا.' },
    ],
  },
  l23: {
    explanation: 'The past continuous (was/were + verb-ing) describes an action in progress at a past moment: "At eight, I was having breakfast." It often pairs with the past simple for an interruption: "I was reading when the phone rang." In Arabic this is كان + المضارع: كنت أقرأ، كانت تطبخ.',
    explanationAr: 'الماضي المستمر (was/were + فعل + ing) يصف حدا ثا في لحظة ماضية: "At eight, I was having breakfast". ويرافق عادة الماضي البسيط عند المقاطعة: "I was reading when the phone rang". وفي العربية: كان + المضارع: كنت أقرأ، كانت تطبخ.',
    examples: [
      { en: 'I was reading when the phone rang.', ar: 'كنت أقرأ عندما رن الهاتف.' },
      { en: 'They were playing at five.', ar: 'كانوا يلعبون في الخامسة.' },
      { en: 'It was raining all morning.', ar: 'كانت تمطر طوال الصباح.' },
    ],
  },
  l24: {
    explanation: 'The past perfect (had + past participle) shows which of two past actions happened first: "The train had left before I arrived." Use it for the earlier action; the later action stays in the past simple. Arabic uses كان قد + الماضي: كان قد غادر.',
    explanationAr: 'الماضي التام (had + التصريف الثالث) يوضح أي حدثين ماضيين وقع أولًا: "The train had left before I arrived". نستخدمه للحدث الأسبق، ويبقى الحدث اللاحق في الماضي البسيط. وفي العربية: كان قد + الماضي: كان قد غادر.',
    examples: [
      { en: 'The train had left before I arrived.', ar: 'كان القطار قد غادر قبل وصولي.' },
      { en: 'She had finished the report before the meeting.', ar: 'كانت قد أنهت التقرير قبل الاجتماع.' },
      { en: 'They had eaten everything by noon.', ar: 'كانوا قد أكلوا كل شيء بحلول الظهر.' },
    ],
  },
};

const VOC = {
  l13: [
    { word: 'hospital', meaningAr: 'مستشفى', example: 'She works in a hospital.' },
    { word: 'habit', meaningAr: 'عادة', example: 'The present simple shows habits.' },
    { word: 'routine', meaningAr: 'روتين', example: 'Describe your daily routine.' },
    { word: 'fact', meaningAr: 'حقيقة', example: 'Water boils — that is a fact.' },
    { word: 'spelling', meaningAr: 'إملاء', example: 'Watch the spelling: watches.' },
    { word: 'degree', meaningAr: 'درجة', example: 'Water boils at 100 degrees.' },
  ],
  l14: [
    { word: 'negative', meaningAr: 'منفي', example: 'A negative sentence uses not.' },
    { word: 'question', meaningAr: 'سؤال', example: 'Do you like tea?' },
    { word: 'short answer', meaningAr: 'جواب قصير', example: 'Yes, she does.' },
    { word: 'spicy', meaningAr: 'حار', example: 'He doesn’t like spicy food.' },
    { word: 'rain', meaningAr: 'تمطر', example: 'Does it rain in summer?' },
    { word: 'party', meaningAr: 'حفلة', example: 'They don’t come to the party.' },
  ],
  l15: [
    { word: 'moment', meaningAr: 'لحظة', example: 'At the moment, she is busy.' },
    { word: 'right now', meaningAr: 'الآن بالضبط', example: 'I am driving right now.' },
    { word: 'outside', meaningAr: 'في الخارج', example: 'They are playing outside.' },
    { word: 'garden', meaningAr: 'حديقة', example: 'She is running in the garden.' },
    { word: 'baby', meaningAr: 'طفل صغير', example: 'The baby is sleeping.' },
    { word: 'progress', meaningAr: 'مستمر / جار', example: 'Continuous tenses show progress.' },
  ],
  l16: [
    { word: 'listen', meaningAr: 'يستمع', example: 'Are you listening to me?' },
    { word: 'stay', meaningAr: 'يقيم', example: 'We aren’t staying at a hotel.' },
    { word: 'outside', meaningAr: 'خارج', example: 'Are they playing outside?' },
    { word: 'tonight', meaningAr: 'الليلة', example: 'Are they coming tonight?' },
    { word: 'together', meaningAr: 'معا', example: 'Is he coming with us?' },
    { word: 'raining', meaningAr: 'تمطر', example: 'Is it raining?' },
  ],
  l17: [
    { word: 'experience', meaningAr: 'خبرة', example: 'Have you ever tried sushi?' },
    { word: 'already', meaningAr: 'بالفعل', example: 'She has already eaten.' },
    { word: 'just', meaningAr: 'للتو', example: 'I have just finished.' },
    { word: 'never', meaningAr: 'أبدا / قط', example: 'They have never visited Dubai.' },
    { word: 'ever', meaningAr: 'من قبل', example: 'Have you ever seen snow?' },
    { word: 'twice', meaningAr: 'مرتين', example: 'We have seen it twice.' },
  ],
  l18: [
    { word: 'since', meaningAr: 'منذ (نقطة)', example: 'Since 2019, I have lived here.' },
    { word: 'for', meaningAr: 'لمدة', example: 'For five years, she has worked here.' },
    { word: 'married', meaningAr: 'متزوج', example: 'They have been married since 2015.' },
    { word: 'each other', meaningAr: 'بعضهم البعض', example: 'We have known each other since childhood.' },
    { word: 'childhood', meaningAr: 'الطفولة', example: 'Since childhood, we have been friends.' },
    { word: 'company', meaningAr: 'شركة', example: 'He has worked in this company for years.' },
  ],
  l19: [
    { word: 'duration', meaningAr: 'مدة', example: 'Have been + -ing shows duration.' },
    { word: 'exam', meaningAr: 'امتحان', example: 'She has been studying for the exam.' },
    { word: 'project', meaningAr: 'مشروع', example: 'I have been working on this project.' },
    { word: 'guitar', meaningAr: 'جيتار', example: 'He has been practicing the guitar.' },
    { word: 'all day', meaningAr: 'طوال اليوم', example: 'It has been raining all day.' },
    { word: 'how long', meaningAr: 'منذ متى / كم مدة', example: 'How long have you been waiting?' },
  ],
  l20: [
    { word: 'finished action', meaningAr: 'حدث منته', example: 'Past simple shows finished actions.' },
    { word: 'yesterday', meaningAr: 'أمس', example: 'I cooked dinner yesterday.' },
    { word: 'grandmother', meaningAr: 'جدة', example: 'She visited her grandmother.' },
    { word: 'midnight', meaningAr: 'منتصف الليل', example: 'He studied until midnight.' },
    { word: 'film', meaningAr: 'فيلم', example: 'The film started at nine.' },
    { word: 'ago', meaningAr: 'مضى / قبل', example: 'Two days ago, we traveled.' },
  ],
  l21: [
    { word: 'irregular', meaningAr: 'شاذ', example: 'Go is an irregular verb.' },
    { word: 'market', meaningAr: 'سوق', example: 'I went to the market.' },
    { word: 'cake', meaningAr: 'كيكة', example: 'She made a cake.' },
    { word: 'jacket', meaningAr: 'سترة', example: 'He wore a new jacket.' },
    { word: 'memorize', meaningAr: 'يحفظ', example: 'Memorize irregular verbs.' },
    { word: 'airport', meaningAr: 'مطار', example: 'He took a taxi to the airport.' },
  ],
  l22: [
    { word: 'anything', meaningAr: 'أي شيء', example: 'I didn’t eat anything.' },
    { word: 'pass', meaningAr: 'ينجح', example: 'Did she pass the test?' },
    { word: 'arrive', meaningAr: 'يصل', example: 'Did they arrive on time?' },
    { word: 'on time', meaningAr: 'في الوقت المحدد', example: 'The bus didn’t come on time.' },
    { word: 'back', meaningAr: 'مجددًا / ردًّا', example: 'He didn’t call me back.' },
    { word: 'email', meaningAr: 'بريد إلكتروني', example: 'They didn’t answer my email.' },
  ],
  l23: [
    { word: 'in progress', meaningAr: 'قائم / جار', example: 'An action in progress at eight.' },
    { word: 'interrupt', meaningAr: 'يقاطع', example: 'The phone rang and interrupted me.' },
    { word: 'ring', meaningAr: 'يُرن', example: 'The phone rang twice.' },
    { word: 'shine', meaningAr: 'يسطع', example: 'The sun was shining.' },
    { word: 'hard', meaningAr: 'بشدّة', example: 'It was raining hard.' },
    { word: 'afternoon', meaningAr: 'بعد الظهر', example: 'They were playing all afternoon.' },
  ],
  l24: [
    { word: 'earlier', meaningAr: 'أسبق', example: 'Past perfect shows the earlier action.' },
    { word: 'by the time', meaningAr: 'بحلول / لحظة أن', example: 'By the time we arrived, they had left.' },
    { word: 'trip', meaningAr: 'رحلة', example: 'I had never seen snow before that trip.' },
    { word: 'everything', meaningAr: 'كل شيء', example: 'They had eaten everything.' },
    { word: 'everyone', meaningAr: 'الجميع', example: 'Everyone had gone home.' },
    { word: 'so', meaningAr: 'لذلك', example: 'He had lost his keys, so he called me.' },
  ],
};

const CONFIGS_A = [
  { id: 'lesson-013', title: 'Present Simple — Affirmative', titleAr: 'المضارع البسيط — الإثبات', pools: { lt: l13Lt, fill: l13Fills, order: l13Orders, mc: l13Mc }, level: 'A1', key: 'l13' },
  { id: 'lesson-014', title: 'Present Simple — Negatives & Questions', titleAr: 'المضارع البسيط — النفي والأسئلة', pools: { lt: l14Lt, fill: l14Fills, order: l14Orders, mc: l14Mc }, level: 'A1', key: 'l14' },
  { id: 'lesson-015', title: 'Present Continuous — Affirmative', titleAr: 'المضارع المستمر — الإثبات', pools: { lt: l15Lt, fill: l15Fills, order: l15Orders, mc: l15Mc }, level: 'A1', key: 'l15' },
  { id: 'lesson-016', title: 'Present Continuous — Negatives & Questions', titleAr: 'المضارع المستمر — النفي والأسئلة', pools: { lt: l16Lt, fill: l16Fills, order: l16Orders, mc: l16Mc }, level: 'A1', key: 'l16' },
  { id: 'lesson-017', title: 'Present Perfect — Just, Already, Ever', titleAr: 'المضارع التام — للتو وبالفعل ومن قبل', pools: { lt: l17Lt, fill: l17Fills, order: l17Orders, mc: l17Mc }, level: 'A2', key: 'l17' },
  { id: 'lesson-018', title: 'Present Perfect — For & Since', titleAr: 'المضارع التام — for وsince', pools: { lt: l18Lt, fill: l18Fills, order: l18Orders, mc: l18Mc }, level: 'A2', key: 'l18' },
  { id: 'lesson-019', title: 'Present Perfect Continuous', titleAr: 'المضارع التام المستمر', pools: { lt: l19Lt, fill: l19Fills, order: l19Orders, mc: l19Mc }, level: 'B1', key: 'l19' },
  { id: 'lesson-020', title: 'Past Simple — Regular Verbs', titleAr: 'الماضي البسيط — الأفعال المنتظمة', pools: { lt: l20Lt, fill: l20Fills, order: l20Orders, mc: l20Mc }, level: 'A1', key: 'l20' },
  { id: 'lesson-021', title: 'Past Simple — Irregular Verbs', titleAr: 'الماضي البسيط — الأفعال الشاذة', pools: { lt: l21Lt, fill: l21Fills, order: l21Orders, mc: l21Mc }, level: 'A1', key: 'l21' },
  { id: 'lesson-022', title: 'Past Simple — Negatives & Questions', titleAr: 'الماضي البسيط — النفي والأسئلة', pools: { lt: l22Lt, fill: l22Fills, order: l22Orders, mc: l22Mc }, level: 'A2', key: 'l22' },
  { id: 'lesson-023', title: 'Past Continuous', titleAr: 'الماضي المستمر', pools: { lt: l23Lt, fill: l23Fills, order: l23Orders, mc: l23Mc }, level: 'A2', key: 'l23' },
  { id: 'lesson-024', title: 'Past Perfect', titleAr: 'الماضي التام', pools: { lt: l24Lt, fill: l24Fills, order: l24Orders, mc: l24Mc }, level: 'B1', key: 'l24' },
];

const MINUTES = { A1: 12, A2: 14, B1: 16, B2: 18, C1: 20 };

export function buildAll() {
  let total = 0;
  for (const c of CONFIGS_A) {
    total += build({
      id: c.id, section: 'tenses', level: c.level, minutes: MINUTES[c.level],
      title: c.title, titleAr: c.titleAr,
      objectives: [
        `Use the ${c.title.split('—')[0].trim().toLowerCase()} correctly`,
        'Build correct English sentences',
        'Listen and type natural examples',
      ],
      grammar: GRAM[c.key],
      vocabulary: VOC[c.key],
      pools: c.pools,
    });
  }
  return { section: 'tenses (part 1)', lessons: CONFIGS_A.length, exercises: total };
}
