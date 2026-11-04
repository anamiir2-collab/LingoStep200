/* ============================================================
   Content generator — Section 4: Conversations (lessons 053–072)
   Twenty functional dialogue lessons: greetings, small talk,
   family, friends, clothes shopping, groceries, restaurants,
   cafés, home routines, chores, phone calls, online chat,
   favors, appointments, invitations, opinions, polite
   agreement/disagreement, weather and a review lesson.
   Dialogue-style lines are hand-authored {en, ar} pairs;
   small dialogue-frame patterns top up each pool for variety.
   ============================================================ */

import { assembleLesson, writeLessonFile, expandAll, fillFrom } from './lib/builder.js';
import { validateLessonStructure } from '../../js/lesson-schema.js';

function pat(t, at, slots, meta = {}) { return { tmpl: t, arTmpl: at, slots, ...meta }; }
/** rows: [en, ar, difficulty?] */
function T(tags, rows) { return rows.map((r) => ({ en: r[0], ar: r[1], tags, difficulty: r[2] || 2 })); }
function ff(tags, word, en, ar) { return fillFrom({ en, ar, tags }, word); }
function O(tags, rows) { return rows.map((r) => ({ en: r[0], ar: r[1], tags, difficulty: 2 })); }
/** rows: [question, options, answerIndex, ar, difficulty?] */
function M(tags, rows) { return rows.map((r) => ({ question: r[0], options: r[1], answerIndex: r[2], ar: r[3], tags, difficulty: r[4] || 2 })); }

function build(cfg) {
  const lesson = assembleLesson(cfg);
  const errors = validateLessonStructure(lesson);
  if (errors.length) throw new Error(`[${cfg.id}] schema: ${errors.slice(0, 6).join(' | ')}`);
  writeLessonFile(lesson);
  return lesson.exercises.length;
}

/* ============================================================
   053 Greetings & Introductions (A1)
   ============================================================ */
const NAMES53 = [{ en: 'Omar', ar: 'عمر' }, { en: 'Sara', ar: 'سارة' }, { en: 'Ahmed', ar: 'أحمد' }, { en: 'Lina', ar: 'لينا' }, { en: 'Khalid', ar: 'خالد' }, { en: 'Nora', ar: 'نورا' }, { en: 'Youssef', ar: 'يوسف' }, { en: 'Maya', ar: 'مايا' }];
const DAYS53 = [{ en: 'Monday', ar: 'يوم الاثنين' }, { en: 'Tuesday', ar: 'يوم الثلاثاء' }, { en: 'Wednesday', ar: 'يوم الأربعاء' }, { en: 'Thursday', ar: 'يوم الخميس' }, { en: 'Friday', ar: 'يوم الجمعة' }, { en: 'Saturday', ar: 'يوم السبت' }, { en: 'Sunday', ar: 'يوم الأحد' }];
const TG53 = ['conversation', 'greetings'];
const l53Lt = [
  ...T(TG53, [
    ['Hello! How are you?', 'مرحبا! كيف حالك؟', 1],
    ["I'm fine, thank you. And you?", 'أنا بخير، شكرا. وأنت؟', 1],
    ['Good morning!', 'صباح الخير!', 1],
    ['Good morning! How are you today?', 'صباح الخير! كيف حالك اليوم؟', 1],
    ['Good evening! Nice to see you.', 'مساء الخير! سعيد برؤيتك.', 1],
    ["Hi, I'm Sara.", 'مرحبا، أنا سارة.', 1],
    ["Hi Sara, I'm Ahmed. Nice to meet you.", 'مرحبا سارة، أنا أحمد. تشرفت بمعرفتك.', 1],
    ['Nice to meet you too.', 'تشرفت بمعرفتك أيضا.', 1],
    ["What's your name?", 'ما اسمك؟', 1],
    ['My name is Omar.', 'اسمي عمر.', 1],
    ['Where are you from?', 'من أين أنت؟', 1],
    ["I'm from Egypt.", 'أنا من مصر.', 1],
    ['Are you from here?', 'هل أنت من هنا؟', 1],
    ["No, I'm from Morocco.", 'لا، أنا من المغرب.', 1],
    ['How old are you?', 'كم عمرك؟', 1],
    ["I'm twenty years old.", 'عمري عشرون عاما.', 1],
    ['What do you do?', 'ما عملك؟', 1],
    ["I'm a student.", 'أنا طالب.', 1],
    ['I work as a nurse.', 'أعمل كممرضة.', 1],
    ['Do you speak English?', 'هل تتحدث الإنجليزية؟', 1],
    ['Yes, a little.', 'نعم، قليلا.', 1],
    ['This is my friend Khalid.', 'هذا صديقي خالد.', 1],
    ['Pleased to meet you, Khalid.', 'سعيد بمعرفتك يا خالد.', 1],
    ['Welcome! Please come in.', 'أهلا وسهلا! تفضل بالدخول.', 1],
    ['Thank you for having me.', 'شكرا لاستقبالي.', 2],
    ["It's nice to see you again.", 'من الجميل رؤيتك مجددا.', 1],
    ['Long time no see!', 'لم أرك منذ زمن طويل!', 1],
    ["Yes, it's been a long time.", 'نعم، مضى زمن طويل.', 1],
    ['How is your family?', 'كيف حال عائلتك؟', 1],
    ['They are all well, thank you.', 'هم جميعا بخير، شكرا.', 1],
    ['See you later!', 'أراك لاحقا!', 1],
    ['See you tomorrow. Goodbye!', 'أراك غدا. إلى اللقاء!', 1],
    ['Have a nice day!', 'أتمنى لك يوما سعيدا!', 1],
    ['You too. Goodbye!', 'وأنت كذلك. إلى اللقاء!', 1],
    ['Take care!', 'اعتنِ بنفسك!', 1],
    ['Excuse me, are you Mr. Ali?', 'عفوا، هل أنت السيد علي؟', 2],
    ['Yes, I am. And you?', 'نعم، أنا كذلك. وأنت؟', 1],
    ['My name is Lina. We met at the conference.', 'اسمي لينا. التقينا في المؤتمر.', 2],
    ['Ah yes, of course! How are you?', 'آه نعم، بالطبع! كيف حالك؟', 1],
    ["I'm very well, thanks.", 'أنا بخير جدا، شكرا.', 1],
    ['May I introduce my sister?', 'هل يمكنني تعريف أختي؟', 2],
    ['Welcome to our city!', 'أهلا بك في مدينتنا!', 1],
    ["Thank you! I'm happy to be here.", 'شكرا! أنا سعيد بالتواجد هنا.', 1],
    ['Where do you live now?', 'أين تسكن الآن؟', 1],
    ['I live downtown, near the park.', 'أسكن في وسط المدينة، قرب الحديقة.', 2],
    ['It was nice talking to you.', 'كان من الجميل التحدث معك.', 1],
    ["Same here. Let's keep in touch.", 'وأنا كذلك. لنبق على التواصل.', 2],
  ]),
  ...expandAll([
    pat('Nice to meet you, {N}.', 'تشرفت بمعرفتك يا {N_ar}.', { N: NAMES53 }, { tags: TG53, difficulty: 1 }),
    pat('Have you met {N}?', 'هل قابلت {N_ar}؟', { N: NAMES53 }, { tags: TG53, difficulty: 1 }),
    pat('See you {D}.', 'أراك {D_ar}.', { D: DAYS53 }, { tags: TG53, difficulty: 1 }),
  ]),
];
const l53Fills = [
  ff(TG53, 'Nice', 'Nice to meet you.', 'تشرفت بمعرفتك.'),
  ff(TG53, 'name', "What's your name?", 'ما اسمك؟'),
  ff(TG53, 'from', "I'm from Morocco.", 'أنا من المغرب.'),
  ff(TG53, 'are', 'How are you today?', 'كيف حالك اليوم؟'),
  ff(TG53, 'speak', 'Do you speak English?', 'هل تتحدث الإنجليزية؟'),
  ff(TG53, 'is', 'My name is Ahmed.', 'اسمي أحمد.'),
  ff(TG53, 'morning', 'Good morning! How are you?', 'صباح الخير! كيف حالك؟'),
  ff(TG53, 'tomorrow', 'See you tomorrow.', 'أراك غدا.'),
];
const l53Orders = O(TG53, [
  ['How are you today?', 'كيف حالك اليوم؟'],
  ['Nice to meet you too.', 'تشرفت بمعرفتك أيضا.'],
  ['Where are you from?', 'من أين أنت؟'],
  ['This is my friend Khalid.', 'هذا صديقي خالد.'],
  ['Have a nice day!', 'أتمنى لك يوما سعيدا!'],
  ['Excuse me, are you Mr. Ali?', 'عفوا، هل أنت السيد علي؟'],
]);
const l53Mc = M(TG53, [
  ['Someone says: "Thank you for having me." You reply:', ["You're welcome.", "I'm fine.", 'Good night!'], 0, 'يقول أحدهم: شكرا لاستقبالي، فترد: على الرحب والسعة.', 2],
  ['Which one is a greeting?', ['Good morning', 'See you later', 'Take care'], 0, 'أي مما يلي تحية؟', 1],
  ['"Nice to meet you" is used when…', ['you meet someone new', 'you leave the house', 'you order food'], 0, 'تُستخدم عبارة Nice to meet you عند مقابلة شخص جديد.', 1],
  ['Complete: "I ___ from Egypt."', ['am', 'is', 'are'], 0, 'أنا من مصر.', 1],
  ['Which reply fits "How are you?"', ["I'm fine, thank you.", 'My name is Ali.', 'See you later!'], 0, 'الرد المناسب على How are you؟ هو أنا بخير شكرا.', 1],
  ['Choose the polite introduction.', ['This is my friend Omar.', 'Move aside!', 'Who are you?'], 0, 'اختر التعريف المهذب: هذا صديقي عمر.', 2],
]);

/* ============================================================
   054 Small Talk (A1)
   ============================================================ */
const EV54 = [{ en: 'the trip', ar: 'الرحلة' }, { en: 'the party', ar: 'الحفلة' }, { en: 'the exam', ar: 'الاختبار' }, { en: 'the concert', ar: 'الحفلة الموسيقية' }, { en: 'the flight', ar: 'الرحلة الجوية' }, { en: 'the show', ar: 'العرض' }];
const ADJ54 = [{ en: 'hot', ar: 'حار' }, { en: 'cold', ar: 'بارد' }, { en: 'windy', ar: 'عاصف' }, { en: 'humid', ar: 'رطب' }, { en: 'sunny', ar: 'مشمس' }];
const TV54 = [{ en: 'the final', ar: 'المباراة النهائية' }, { en: 'the documentary', ar: 'الفيلم الوثائقي' }, { en: 'the news', ar: 'الأخبار' }, { en: 'the awards', ar: 'حفل توزيع الجوائز' }];
const TG54 = ['conversation', 'small-talk'];
const l54Lt = [
  ...T(TG54, [
    ["Lovely weather today, isn't it?", 'الجو جميل اليوم، أليس كذلك؟', 2],
    ["Yes, it's really warm.", 'نعم، الجو دافئ حقا.', 1],
    ['It looks like rain.', 'يبدو أن المطر قادم.', 1],
    ['Yes, take an umbrella.', 'نعم، خذ مظلة.', 1],
    ['Did you have a good weekend?', 'هل قضيت عطلة نهاية أسبوع جيدة؟', 2],
    ['Yes, thanks. I relaxed at home.', 'نعم، شكرا. استرحت في المنزل.', 1],
    ['What did you do at the weekend?', 'ماذا فعلت في عطلة نهاية الأسبوع؟', 2],
    ['I visited my grandparents.', 'زرت أجدادي.', 1],
    ['Anything interesting in the news?', 'هل هناك شيء مثير في الأخبار؟', 2],
    ['Not much, the same old stories.', 'ليس كثيرا، القصص المعتادة.', 2],
    ['Did you watch the match last night?', 'هل شاهدت المباراة الليلة الماضية؟', 2],
    ['Yes! What a game!', 'نعم! يا لها من مباراة!', 1],
    ['How was your day?', 'كيف كان يومك؟', 1],
    ['Quite busy, but good.', 'مشغول إلى حد ما، لكنه كان جيدا.', 2],
    ['The traffic was terrible this morning.', 'كان الازدحام مرعبا هذا الصباح.', 2],
    ['I know! It took me an hour.', 'أعرف! استغرق مني ساعة.', 1],
    ['This café is always busy at noon.', 'هذا المقهى مزدحم دائما عند الظهر.', 2],
    ['Yes, but the coffee is worth it.', 'نعم، لكن القهوة تستحق.', 2],
    ['Are you new here?', 'هل أنت جديد هنا؟', 1],
    ['Yes, I started last week.', 'نعم، بدأت الأسبوع الماضي.', 1],
    ['How do you like the city so far?', 'ما رأيك في المدينة حتى الآن؟', 2],
    ["It's beautiful, and the people are friendly.", 'إنها جميلة، وأهلها ودودون.', 2],
    ['Did you hear about the new restaurant?', 'هل سمعت عن المطعم الجديد؟', 2],
    ['Yes, shall we try it sometime?', 'نعم، هل نجربه يوما ما؟', 2],
    ["Sounds like a plan!", 'يبدو ذلك مخططا جيدا!', 2],
    ["It's really cold outside today.", 'الجو بارد جدا في الخارج اليوم.', 1],
    ['I hope the weather stays nice for the trip.', 'آمل أن يبقى الجو جميلا للرحلة.', 2],
    ["Me too. I'm tired of the rain.", 'وأنا أيضا. سئمت من المطر.', 2],
    ['Have you been waiting long?', 'هل انتظرت طويلا؟', 2],
    ['No, just a few minutes.', 'لا، بضع دقائق فقط.', 1],
    ['What a lovely home!', 'يا لها من بيت جميل!', 1],
    ['Thank you! Please sit down.', 'شكرا! تفضل بالجلوس.', 1],
    ['Would you like some tea?', 'هل تود بعض الشاي؟', 1],
    ['Yes, please. That would be lovely.', 'نعم، من فضلك. سيكون ذلك لطيفا.', 2],
    ["How's work going?", 'كيف تسير أعمالك؟', 2],
    ['Busy, but I can\u2019t complain.', 'مشغولة، لكن لا يمكنني الشكوى.', 2],
    ['The weekend went too fast.', 'مرت عطلة نهاية الأسبوع بسرعة كبيرة.', 2],
    ['It always does!', 'هو يمر بسرعة دائما!', 1],
    ['Do you come here often?', 'هل تأتي هنا كثيرا؟', 1],
    ["Yes, it's my favorite spot.", 'نعم، إنه مكاني المفضل.', 1],
    ["Beautiful day for a walk, isn't it?", 'يوم جميل لنزهة، أليس كذلك؟', 2],
    ["Let's enjoy it while it lasts.", 'دعنا نستمتع به ما دام مستمرا.', 3],
    ['I heard it might snow tonight.', 'سمعت أنه قد يثلج الليلة.', 2],
    ['Really? I hope the roads stay clear.', 'حقا؟ آمل أن تبقى الطرق صالحة.', 2],
    ['How was the wedding?', 'كيف كان حفل الزفاف؟', 1],
    ['Wonderful! The food was amazing.', 'رائع! كان الطعام مذهلا.', 1],
    ['I love this song.', 'أحب هذه الأغنية.', 1],
    ['Me too. It reminds me of summer.', 'وأنا أيضا. تذكرني بالصيف.', 2],
  ]),
  ...expandAll([
    pat('How was {E}?', 'كيف كانت {E_ar}؟', { E: EV54 }, { tags: TG54, difficulty: 1 }),
    pat("It's {A} today, isn't it?", 'الجو {A_ar} اليوم، أليس كذلك؟', { A: ADJ54 }, { tags: TG54, difficulty: 2 }),
    pat('Did you watch {X} last night?', 'هل شاهدت {X_ar} الليلة الماضية؟', { X: TV54 }, { tags: TG54, difficulty: 2 }),
  ]),
];
const l54Fills = [
  ff(TG54, 'rain', 'It looks like rain.', 'يبدو أن المطر قادم.'),
  ff(TG54, 'watch', 'Did you watch the match last night?', 'هل شاهدت المباراة الليلة الماضية؟'),
  ff(TG54, 'was', 'How was your day?', 'كيف كان يومك؟'),
  ff(TG54, 'grandparents', 'I visited my grandparents.', 'زرت أجدادي.'),
  ff(TG54, 'tea', 'Would you like some tea?', 'هل تود بعض الشاي؟'),
  ff(TG54, 'traffic', 'The traffic was terrible this morning.', 'كان الازدحام مرعبا هذا الصباح.'),
  ff(TG54, 'last', 'I started last week.', 'بدأت الأسبوع الماضي.'),
  ff(TG54, 'work', "How's work going?", 'كيف تسير أعمالك؟'),
];
const l54Orders = O(TG54, [
  ['Did you have a good weekend?', 'هل قضيت عطلة نهاية أسبوع جيدة؟'],
  ['The traffic was terrible this morning.', 'كان الازدحام مرعبا هذا الصباح.'],
  ['Would you like some tea?', 'هل تود بعض الشاي؟'],
  ['I heard it might snow tonight.', 'سمعت أنه قد يثلج الليلة.'],
  ["It's really cold outside today.", 'الجو بارد جدا في الخارج اليوم.'],
  ['How do you like the city so far?', 'ما رأيك في المدينة حتى الآن؟'],
]);
const l54Mc = M(TG54, [
  ['Someone says: "Have a good weekend!" You reply:', ['Thanks, you too!', 'Yes, please.', 'Not at all.'], 0, 'يقول أحدهم: عطلة سعيدة، فترد: شكرا وأنت أيضا.', 1],
  ['Which line starts a conversation about weather?', ["It's windy today, isn't it?", 'My name is Ali.', 'See you Monday.'], 0, 'أي عبارة تبدأ حديثا عن الطقس؟', 1],
  ['"How was your day?" asks about…', ['your experiences today', 'your name', 'your address'], 0, 'يسأل How was your day عن تجربتك اليوم.', 1],
  ['Complete: "The traffic ___ terrible this morning."', ['was', 'were', 'is being'], 0, 'كان الازدحام مرعبا هذا الصباح.', 2],
  ['Which is a small-talk reply to "Lovely day!"?', ["Yes, it's beautiful.", 'No, thank you.', 'You are welcome.'], 0, 'رد مناسب: نعم، إنه جميل.', 2],
  ['Complete: "Did you ___ the news last night?"', ['watch', 'watched', 'watching'], 1, 'هل شاهدت الأخبار الليلة الماضية؟', 2],
]);

/* ============================================================
   055 Family & Relatives (A1)
   ============================================================ */
const REL55 = [{ en: 'grandmother', ar: 'جدتي' }, { en: 'grandfather', ar: 'جدي' }, { en: 'uncle', ar: 'عمي' }, { en: 'aunt', ar: 'عمتي' }, { en: 'cousin', ar: 'ابن عمي' }, { en: 'nephew', ar: 'ابن أخي' }, { en: 'niece', ar: 'ابنة أخي' }];
const RELC55 = [{ en: 'uncle', ar: 'عمي' }, { en: 'aunt', ar: 'عمتي' }, { en: 'cousin', ar: 'ابن عمي' }, { en: 'grandfather', ar: 'جدي' }, { en: 'nephew', ar: 'ابن أخي' }, { en: 'niece', ar: 'ابنة أخي' }];
const CITY55 = [{ en: 'in Cairo', ar: 'في القاهرة' }, { en: 'in Dubai', ar: 'في دبي' }, { en: 'in Amman', ar: 'في عمان' }, { en: 'in Casablanca', ar: 'في الدار البيضاء' }, { en: 'in Alexandria', ar: 'في الإسكندرية' }, { en: 'in Beirut', ar: 'في بيروت' }];
const RELQ55 = [{ en: 'mother', ar: 'أمك' }, { en: 'father', ar: 'والدك' }, { en: 'brother', ar: 'أخوك' }, { en: 'sister', ar: 'أختك' }, { en: 'wife', ar: 'زوجتك' }, { en: 'husband', ar: 'زوجك' }];
const TG55 = ['conversation', 'family'];
const l55Lt = [
  ...T(TG55, [
    ['Do you have a big family?', 'هل لديك عائلة كبيرة؟', 1],
    ['Yes, I have two brothers and one sister.', 'نعم، لدي أخوان وأخت واحدة.', 2],
    ["I'm the only child in my family.", 'أنا الطفل الوحيد في عائلتي.', 2],
    ['My father is a teacher.', 'أبي معلم.', 1],
    ['My mother works at a hospital.', 'أمي تعمل في مستشفى.', 1],
    ['Tell me about your family.', 'حدثني عن عائلتك.', 1],
    ['We are a family of five.', 'نحن عائلة مكونة من خمسة أفراد.', 2],
    ['My older brother lives in Riyadh.', 'أخي الأكبر يسكن في الرياض.', 2],
    ['My younger sister is still at school.', 'أختي الصغيرة ما زالت في المدرسة.', 2],
    ['My grandmother lives with us.', 'جدتي تسكن معنا.', 1],
    ["She is my father's mother.", 'هي أم أبي.', 1],
    ['How is your grandfather?', 'كيف حال جدك؟', 1],
    ['He is fine, but he gets tired quickly.', 'هو بخير، لكنه يتعب سريعا.', 2],
    ['My uncle has a farm.', 'عمي لديه مزرعة.', 1],
    ['We visit them every Friday.', 'نزورهم كل جمعة.', 1],
    ['My aunt makes the best cake.', 'خالتي تصنع أفضل كيكة.', 2],
    ["Her son is my cousin.", 'ابنها هو ابن عمي.', 2],
    ['My cousin is the same age as me.', 'ابن عمي في نفس عمري.', 2],
    ['Are you close to your family?', 'هل أنت قريب من عائلتك؟', 2],
    ['Yes, we see each other every week.', 'نعم، نرى بعضنا كل أسبوع.', 2],
    ['My parents have been married for thirty years.', 'والداي متزوجان منذ ثلاثين عاما.', 3],
    ["That's lovely!", 'هذا أمر جميل!', 1],
    ['Do you look like your father?', 'هل تشبه والدك؟', 2],
    ['People say I look like my mother.', 'يقول الناس إنني أشبه أمي.', 2],
    ['My daughter is two years old.', 'ابنتي عمرها عامان.', 2],
    ['My son started school this year.', 'ابني بدأ المدرسة هذا العام.', 2],
    ['What does your husband do?', 'ماذا يعمل زوجك؟', 2],
    ['He is an engineer.', 'هو مهندس.', 1],
    ['My wife is a doctor.', 'زوجتي طبيبة.', 1],
    ['Your children are very polite.', 'أطفالك مؤدبون جدا.', 2],
    ['Thank you, we are proud of them.', 'شكرا، نحن فخورون بهم.', 2],
    ['Does your family live nearby?', 'هل تسكن عائلتك قريبا؟', 2],
    ['Yes, just five minutes away.', 'نعم، على بعد خمس دقائق فقط.', 2],
    ['My family is spread across three cities.', 'عائلتي موزعة على ثلاث مدن.', 3],
    ['We keep in touch by phone.', 'نتواصل عبر الهاتف.', 2],
    ['Who is the oldest in your family?', 'من هو الأكبر في عائلتك؟', 2],
    ['My grandfather, he is eighty.', 'جدي، عمره ثمانون عاما.', 2],
    ['What do you do together at the weekend?', 'ماذا تفعلون معا في عطلة نهاية الأسبوع؟', 2],
    ["We usually have lunch at my mother's house.", 'نأكل الغداء عادة في بيت أمي.', 2],
    ['My brother and I share a room.', 'أنا وأخي نتشارك غرفة واحدة.', 2],
    ['Family comes first for me.', 'العائلة أولا بالنسبة لي.', 2],
    ['I agree completely.', 'أوافق تماما.', 1],
    ['My niece is learning to walk.', 'ابنة أخي تتعلم المشي.', 2],
    ['How sweet!', 'كم هذا لطيف!', 1],
    ['Say hello to your family for me.', 'قل تحياتي لعائلتك.', 2],
    ['I will, thank you!', 'سأفعل، شكرا!', 1],
  ]),
  ...expandAll([
    pat('This is my {R}.', 'هذا {R_ar}.', { R: REL55 }, { tags: TG55, difficulty: 1 }),
    pat('My {R} lives {C}.', '{R_ar} يسكن {C_ar}.', { R: RELC55, C: CITY55 }, { tags: TG55, difficulty: 2 }),
    pat('How is your {R}?', 'كيف حال {R_ar}؟', { R: RELQ55 }, { tags: TG55, difficulty: 1 }),
  ]),
];
const l55Fills = [
  ff(TG55, 'family', 'Tell me about your family.', 'حدثني عن عائلتك.'),
  ff(TG55, 'is', 'My father is a teacher.', 'أبي معلم.'),
  ff(TG55, 'hospital', 'My mother works at a hospital.', 'أمي تعمل في مستشفى.'),
  ff(TG55, 'visit', 'We visit them every Friday.', 'نزورهم كل جمعة.'),
  ff(TG55, 'grandmother', 'My grandmother lives with us.', 'جدتي تسكن معنا.'),
  ff(TG55, 'look', 'Do you look like your father?', 'هل تشبه والدك؟'),
  ff(TG55, 'two', 'My daughter is two years old.', 'ابنتي عمرها عامان.'),
  ff(TG55, 'mother', "She is my father's mother.", 'هي أم أبي.'),
];
const l55Orders = O(TG55, [
  ['My younger sister is still at school.', 'أختي الصغيرة ما زالت في المدرسة.'],
  ['How is your grandfather?', 'كيف حال جدك؟'],
  ['My family is spread across three cities.', 'عائلتي موزعة على ثلاث مدن.'],
  ['Do you look like your father?', 'هل تشبه والدك؟'],
  ['We are a family of five.', 'نحن عائلة مكونة من خمسة أفراد.'],
  ['Your children are very polite.', 'أطفالك مؤدبون جدا.'],
]);
const l55Mc = M(TG55, [
  ['Which word means your father\u2019s brother?', ['uncle', 'cousin', 'nephew'], 0, 'كلمة uncle تعني عم والدك أو والدتك.', 1],
  ['Someone says "Tell me about your family." You reply:', ['We are a family of five.', 'You are welcome.', 'Good night.'], 0, 'ترد: نحن عائلة مكونة من خمسة أفراد.', 2],
  ['Complete: "My grandmother ___ with us."', ['lives', 'live', 'living'], 0, 'جدتي تسكن معنا.', 1],
  ['"My aunt makes the best cake." The aunt is…', ['the sister of a parent', 'a small cake', 'a school'], 0, 'العمّة هي أخت أحد الوالدين.', 2],
  ['Complete: "We ___ them every Friday."', ['visit', 'visits', 'visited'], 0, 'نزورهم كل جمعة.', 1],
  ['Which sentence talks about family?', ['My son started school this year.', 'The café opens at nine.', 'I paid in cash.'], 0, 'الجملة عن العائلة: ابني بدأ المدرسة هذا العام.', 1],
]);

/* ============================================================
   056 Friends & Activities (A1)
   ============================================================ */
const SP56 = [{ en: 'football', ar: 'كرة القدم' }, { en: 'basketball', ar: 'كرة السلة' }, { en: 'tennis', ar: 'التنس' }, { en: 'chess', ar: 'الشطرنج' }, { en: 'video games', ar: 'ألعاب الفيديو' }];
const ACT56 = [{ en: 'swimming', ar: 'للسباحة' }, { en: 'shopping', ar: 'للتسوق' }, { en: 'fishing', ar: 'للصيد' }, { en: 'for a walk', ar: 'في نزهة' }, { en: 'to the beach', ar: 'إلى الشاطئ' }];
const TG56 = ['conversation', 'friends'];
const l56Lt = [
  ...T(TG56, [
    ['What do you do with your friends?', 'ماذا تفعل مع أصدقائك؟', 1],
    ['We play football together.', 'نلعب كرة القدم معا.', 1],
    ['Who is your best friend?', 'من هو أفضل أصدقائك؟', 1],
    ['My best friend is called Adam.', 'صديقي المفضل اسمه آدم.', 2],
    ['We have known each other since school.', 'نعرف بعضنا منذ المدرسة.', 2],
    ['Do you see your friends often?', 'هل ترى أصدقاءك كثيرا؟', 2],
    ['Yes, almost every day.', 'نعم، تقريبا كل يوم.', 1],
    ["Let's meet at the park at five.", 'لنتقابل في الحديقة في الخامسة.', 2],
    ['Good idea! See you there.', 'فكرة جيدة! أراك هناك.', 1],
    ['Shall we watch a film tonight?', 'هل نشاهد فيلما الليلة؟', 2],
    ["Sorry, I'm busy tonight.", 'عفوا، أنا مشغول الليلة.', 1],
    ['How about tomorrow instead?', 'ما رأيك في الغد بدلا من ذلك؟', 2],
    ['Tomorrow works for me.', 'الغد يناسبني.', 1],
    ['My friends and I go to the gym together.', 'أصدقائي وأنا نذهب إلى النادي معا.', 2],
    ['Do you want to join us?', 'هل تريد الانضمام إلينا؟', 2],
    ["I'd love to!", 'أود ذلك!', 1],
    ['He always makes me laugh.', 'هو يجعلني أضحك دائما.', 2],
    ['A good friend is hard to find.', 'من الصعب إيجاد صديق جيد.', 2],
    ['True friends stay with you in hard times.', 'الأصدقاء الحقيقيون يبقون معك في الأوقات الصعبة.', 3],
    ["That's so true.", 'هذا صحيح تماما.', 1],
    ['We met at university.', 'التقينا في الجامعة.', 1],
    ['We became friends quickly.', 'أصبحنا أصدقاء بسرعة.', 2],
    ['She is more like a sister to me.', 'هي أشبه بأخت لي.', 2],
    ['What is your favorite hobby?', 'ما هي هوايتك المفضلة؟', 2],
    ['I love reading and swimming.', 'أحب القراءة والسباحة.', 1],
    ['I play chess with my neighbor.', 'ألعب الشطرنج مع جاري.', 2],
    ['We often study together at the library.', 'ندرس معا في المكتبة غالبا.', 2],
    ['Do your friends like the same music?', 'هل يحب أصدقاؤك نفس الموسيقى؟', 2],
    ['Yes, we all love this band.', 'نعم، نحن جميعا نحب هذه الفرقة.', 2],
    ['Are you free on Thursday?', 'هل أنت حر يوم الخميس؟', 1],
    ['Yes, Thursday is fine.', 'نعم، الخميس مناسب.', 1],
    ["Let's go for a coffee after work.", 'لنذهب لتناول قهوة بعد العمل.', 2],
    ["I can't today, maybe next week.", 'لا أستطيع اليوم، ربما الأسبوع القادم.', 2],
    ['No problem, another time.', 'لا مشكلة، في وقت آخر.', 1],
    ['Thanks for inviting me.', 'شكرا لدعوتي.', 1],
    ['Thanks for coming!', 'شكرا لمجيئك!', 1],
    ['It was great to see you.', 'كان من الرائع رؤيتك.', 1],
    ["Likewise!", 'وأنا كذلك!', 1],
    ['Say hi to Sara for me.', 'قل لسارة مرحبا مني.', 2],
    ["Sure, I'll tell her.", 'بالتأكيد، سأخبرها.', 1],
    ['We should meet up soon.', 'يجب أن نلتقي قريبا.', 2],
    ["Definitely! I'll call you.", 'بالتأكيد! سأتصل بك.', 1],
    ['My friends threw me a surprise party.', 'أقام أصدقائي حفلة مفاجئة لي.', 3],
    ['What a wonderful surprise!', 'يا لها من مفاجأة رائعة!', 1],
    ['Do you play any sports?', 'هل تمارس أي رياضة؟', 1],
    ['I play basketball on weekends.', 'ألعب كرة السلة في عطلات نهاية الأسبوع.', 2],
    ['She is on the school team.', 'هي في فريق المدرسة.', 2],
    ['They won the match yesterday.', 'فازوا بالمباراة أمس.', 2],
  ]),
  ...expandAll([
    pat("Let's play {S} after school.", 'لنلعب {S_ar} بعد المدرسة.', { S: SP56 }, { tags: TG56, difficulty: 1 }),
    pat('Shall we go {A} this weekend?', 'هل نذهب {A_ar} في عطلة نهاية هذا الأسبوع؟', { A: ACT56 }, { tags: TG56, difficulty: 2 }),
    pat('My friend {N} is coming too.', 'صديقي {N_ar} قادم أيضا.', { N: NAMES53 }, { tags: TG56, difficulty: 1 }),
  ]),
];
const l56Fills = [
  ff(TG56, 'best', 'Who is your best friend?', 'من هو أفضل أصدقائك؟'),
  ff(TG56, 'since', 'We have known each other since school.', 'نعرف بعضنا منذ المدرسة.'),
  ff(TG56, 'often', 'Do you see your friends often?', 'هل ترى أصدقاءك كثيرا؟'),
  ff(TG56, 'about', 'How about tomorrow instead?', 'ما رأيك في الغد بدلا من ذلك؟'),
  ff(TG56, 'love', "I'd love to!", 'أود ذلك!'),
  ff(TG56, 'university', 'We met at university.', 'التقينا في الجامعة.'),
  ff(TG56, 'sister', 'She is more like a sister to me.', 'هي أشبه بأخت لي.'),
  ff(TG56, 'inviting', 'Thanks for inviting me.', 'شكرا لدعوتي.'),
];
const l56Orders = O(TG56, [
  ['We have known each other since school.', 'نعرف بعضنا منذ المدرسة.'],
  ["Let's meet at the park at five.", 'لنتقابل في الحديقة في الخامسة.'],
  ['A good friend is hard to find.', 'من الصعب إيجاد صديق جيد.'],
  ['Do you play any sports?', 'هل تمارس أي رياضة؟'],
  ['Thanks for inviting me.', 'شكرا لدعوتي.'],
  ['We should meet up soon.', 'يجب أن نلتقي قريبا.'],
]);
const l56Mc = M(TG56, [
  ['A friend invites you and you accept. You say:', ["I'd love to!", "I'm busy, sorry.", 'No, thanks.'], 0, 'تقبل الدعوة فتقول: أود ذلك!', 1],
  ['"We have known each other since school" means…', ['our friendship started at school', 'we are relatives', 'we work together'], 0, 'تعني أن صداقتنا بدأت في المدرسة.', 2],
  ['Complete: "Let\u2019s ___ at the park at five."', ['meet', 'met', 'meeting'], 0, 'لنتقابل في الحديقة في الخامسة.', 1],
  ['Which is a polite refusal?', ["I can't today, maybe next week.", 'Never!', 'Why me?'], 0, 'الرفض المهذب: لا أستطيع اليوم، ربما الأسبوع القادم.', 2],
  ['Complete: "Do you want to ___ us?"', ['join', 'joined', 'joining'], 0, 'هل تريد الانضمام إلينا؟', 1],
  ['"Say hi to Sara for me" is a way to…', ['send greetings', 'end a friendship', 'order food'], 0, 'عبارة Say hi to Sara طريقة لإرسال التحيات.', 2],
]);

/* ============================================================
   057 Shopping for Clothes (A2)
   ============================================================ */
const COL57 = [{ en: 'red', ar: 'الأحمر' }, { en: 'green', ar: 'الأخضر' }, { en: 'white', ar: 'الأبيض' }, { en: 'yellow', ar: 'الأصفر' }, { en: 'gray', ar: 'الرمادي' }, { en: 'brown', ar: 'البني' }];
const ITEM57 = [{ en: 'a coat', ar: 'معطفا' }, { en: 'a skirt', ar: 'تنورة' }, { en: 'a pair of jeans', ar: 'بنطال جينز' }, { en: 'a T-shirt', ar: 'قميصا بلا أكمام' }, { en: 'a sweater', ar: 'سترة صوفية' }, { en: 'a belt', ar: 'حزاما' }];
const PL57 = [{ en: 'socks', ar: 'الجوارب' }, { en: 'gloves', ar: 'القفازات' }, { en: 'sandals', ar: 'الصنادل' }, { en: 'sunglasses', ar: 'النظارات الشمسية' }, { en: 'ties', ar: 'روابط العنق' }];
const TG57 = ['conversation', 'shopping-clothes'];
const l57Lt = [
  ...T(TG57, [
    ['Can I help you?', 'هل يمكنني مساعدتك؟', 1],
    ["Yes, I'm looking for a jacket.", 'نعم، أبحث عن سترة.', 1],
    ['What size do you wear?', 'ما مقاسك؟', 1],
    ['I wear size medium.', 'ألبس مقاس متوسط.', 2],
    ['Do you have this in blue?', 'هل لديك هذا باللون الأزرق؟', 2],
    ['Let me check the back.', 'دعني أتحقق في المخزن.', 2],
    ['Here you are.', 'تفضل.', 1],
    ['Can I try it on?', 'هل يمكنني تجربته؟', 2],
    ['Sure, the fitting room is over there.', 'بالتأكيد، غرفة القياس هناك.', 2],
    ['It fits perfectly.', 'يناسبني تماما.', 2],
    ["It's a bit too tight.", 'إنه ضيقا قليلا.', 2],
    ['Do you have a larger size?', 'هل لديك مقاس أكبر؟', 2],
    ['How does it look?', 'كيف يبدو علي؟', 1],
    ['It really suits you.', 'يناسبك حقا.', 2],
    ["I'll take it.", 'سآخذه.', 1],
    ['How much is this shirt?', 'كم ثمن هذا القميص؟', 1],
    ["It's twenty dollars.", 'ثمنه عشرون دولارا.', 1],
    ["That's a little expensive.", 'هذا غالٍ قليلا.', 2],
    ["It's on sale this week.", 'إنه معروض بتخفيض هذا الأسبوع.', 2],
    ['Do you accept credit cards?', 'هل تقبلون بطاقات الائتمان؟', 2],
    ['Yes, we take all cards.', 'نعم، نقبل جميع البطاقات.', 1],
    ["I'll pay in cash.", 'سأدفع نقدا.', 1],
    ['Would you like a bag?', 'هل تريد كيسا؟', 1],
    ["No, thanks. I have one.", 'لا، شكرا. لدي واحد.', 1],
    ['Can I get a receipt, please?', 'هل يمكنني الحصول على إيصال، من فضلك؟', 2],
    ['Of course, here it is.', 'بالطبع، ها هو.', 1],
    ['Can I return these shoes?', 'هل يمكنني إرجاع هذه الأحذية؟', 2],
    ['Do you have the receipt?', 'هل لديك الإيصال؟', 2],
    ['Yes, here it is.', 'نعم، ها هو.', 1],
    ['They are the wrong size.', 'إنها بالمقاس الخطأ.', 2],
    ['Would you like to exchange them?', 'هل تريد استبدالها؟', 2],
    ['Yes, please.', 'نعم، من فضلك.', 1],
    ['These trousers are too long.', 'هذا البنطال طويل جدا.', 2],
    ['Do you have them in black?', 'هل لديك إياها باللون الأسود؟', 2],
    ['This dress is beautiful.', 'هذا الفستان جميل.', 1],
    ["It's one of our best sellers.", 'إنه من الأكثر مبيعا لدينا.', 2],
    ["I'm just looking, thank you.", 'أتفرج فقط، شكرا.', 2],
    ['Take your time.', 'خذ وقتك.', 1],
    ['The store closes at ten.', 'يغلق المتجر في العاشرة.', 1],
    ['We still have plenty of time.', 'ما زال لدينا وقت كاف.', 2],
    ['What do you think of this hat?', 'ما رأيك في هذه القبعة؟', 2],
    ['Honestly, I prefer the gray one.', 'بصراحة، أفضّل الرمادية.', 2],
    ['Good choice!', 'اختيار جيد!', 1],
    ['Thank you, I like it too.', 'شكرا، أحبه أيضا.', 1],
    ['Where did you buy that scarf?', 'من أين اشتريت ذلك الوشاح؟', 2],
    ['From the new shop at the mall.', 'من المتجر الجديد في المول.', 2],
    ['These shoes are very comfortable.', 'هذه الأحذية مريحة جدا.', 2],
    ['Yes, I wear them every day.', 'نعم، ألبسها كل يوم.', 1],
  ]),
  ...expandAll([
    pat('Do you have this in {C}?', 'هل لديك هذا باللون {C_ar}؟', { C: COL57 }, { tags: TG57, difficulty: 2 }),
    pat("I'm looking for {I}.", 'أبحث عن {I_ar}.', { I: ITEM57 }, { tags: TG57, difficulty: 2 }),
    pat('How much are these {P}?', 'كم ثمن هذه {P_ar}؟', { P: PL57 }, { tags: TG57, difficulty: 2 }),
  ]),
];
const l57Fills = [
  ff(TG57, 'size', 'What size do you wear?', 'ما مقاسك؟'),
  ff(TG57, 'try', 'Can I try it on?', 'هل يمكنني تجربته؟'),
  ff(TG57, 'much', 'How much is this shirt?', 'كم ثمن هذا القميص؟'),
  ff(TG57, 'pay', "I'll pay in cash.", 'سأدفع نقدا.'),
  ff(TG57, 'sale', "It's on sale this week.", 'إنه معروض بتخفيض هذا الأسبوع.'),
  ff(TG57, 'accept', 'Do you accept credit cards?', 'هل تقبلون بطاقات الائتمان؟'),
  ff(TG57, 'bag', 'Would you like a bag?', 'هل تريد كيسا؟'),
  ff(TG57, 'looking', "I'm just looking, thank you.", 'أتفرج فقط، شكرا.'),
];
const l57Orders = O(TG57, [
  ['Can I try it on?', 'هل يمكنني تجربته؟'],
  ["It's a bit too tight.", 'إنه ضيقا قليلا.'],
  ['Do you accept credit cards?', 'هل تقبلون بطاقات الائتمان؟'],
  ['These shoes are very comfortable.', 'هذه الأحذية مريحة جدا.'],
  ['Where did you buy that scarf?', 'من أين اشتريت ذلك الوشاح؟'],
  ['Would you like to exchange them?', 'هل تريد استبدالها؟'],
]);
const l57Mc = M(TG57, [
  ['A shop assistant asks "Can I help you?" You want to browse alone. You say:', ["I'm just looking, thank you.", 'Give me two.', 'Close the shop.'], 0, 'ترد: أتفرج فقط، شكرا.', 2],
  ['Where do you try on clothes?', ['in the fitting room', 'in the street', 'in the kitchen'], 0, 'تقيس الملابس في غرفة القياس.', 1],
  ['Complete: "Do you have this ___ blue?"', ['in', 'on', 'at'], 0, 'هل لديك هذا باللون الأزرق؟', 1],
  ['"It fits perfectly" means…', ['it is exactly the right size', 'it is broken', 'it is expensive'], 0, 'تعني أنه بالمقاس الصحيح تماما.', 2],
  ['Complete: "I\u2019ll pay ___ cash."', ['in', 'by', 'with'], 0, 'سأدفع نقدا.', 2],
  ['Which line belongs in a clothes shop?', ['What size do you wear?', 'What time is my flight?', 'Is the soup ready?'], 0, 'الجملة المناسبة لمحل الملابس: ما مقاسك؟', 1],
]);

/* ============================================================
   058 Shopping & Prices (A2)
   ============================================================ */
const GM58 = [{ en: 'a bottle of milk', ar: 'زجاجة الحليب' }, { en: 'a loaf of bread', ar: 'رغيف الخبز' }, { en: 'a box of tea', ar: 'علبة الشاي' }, { en: 'a bag of sugar', ar: 'كيس السكر' }, { en: 'a bar of chocolate', ar: 'لوح من الشوكولاتة' }];
const NEED58 = [{ en: 'some olive oil', ar: 'بعض زيت الزيتون' }, { en: 'two lemons', ar: 'ليمونتين' }, { en: 'a jar of honey', ar: 'برطمانا من العسل' }, { en: 'a bag of oranges', ar: 'كيسا من البرتقال' }, { en: 'a packet of biscuits', ar: 'علبة من البسكويت' }];
const SEC58 = [{ en: 'bakery', ar: 'المخبز' }, { en: 'frozen foods', ar: 'الأطعمة المجمدة' }, { en: 'toiletries', ar: 'مستلزمات النظافة' }, { en: 'spices', ar: 'التوابل' }, { en: 'snacks', ar: 'الوجبات الخفيفة' }];
const TG58 = ['conversation', 'shopping'];
const l58Lt = [
  ...T(TG58, [
    ['Excuse me, where is the dairy section?', 'عفوا، أين قسم الألبان؟', 2],
    ["It's at the back of the store.", 'إنه في مؤخرة المتجر.', 2],
    ['Do you have fresh bread today?', 'هل لديكم خبز طازج اليوم؟', 2],
    ['Yes, it arrived this morning.', 'نعم، وصل هذا الصباح.', 1],
    ['How much are the eggs?', 'كم ثمن البيض؟', 1],
    ['They are three dollars a dozen.', 'ثمنها ثلاثة دولارات للطبق.', 2],
    ["That's cheaper than last week.", 'هذا أرخص من الأسبوع الماضي.', 2],
    ['Yes, prices went down.', 'نعم، انخفضت الأسعار.', 1],
    ['Is this rice on offer?', 'هل هذا الأرز معروض بسعر خاص؟', 2],
    ['Buy two and get one free.', 'اشترِ اثنين واحصل على واحد مجانا.', 2],
    ['What a bargain!', 'يا له من صفقة!', 1],
    ['I need a kilo of tomatoes.', 'أحتاج كيلو من الطماطم.', 2],
    ['Anything else?', 'هل من شيء آخر؟', 1],
    ["No, that's all, thank you.", 'لا، هذا كل شيء، شكرا.', 1],
    ['That comes to twelve dollars.', 'المجموع اثنا عشر دولارا.', 2],
    ['Can I pay by card?', 'هل يمكنني الدفع بالبطاقة؟', 1],
    ['Of course, please enter your PIN.', 'بالطبع، من فضلك أدخل رقمك السري.', 2],
    ['Do you want a receipt?', 'هل تريد إيصالا؟', 1],
    ["Yes, please. That's kind of you.", 'نعم، من فضلك. هذا لطف منك.', 2],
    ['Could you bag them separately, please?', 'هل يمكنك وضعها في أكياس منفصلة، من فضلك؟', 3],
    ['No problem at all.', 'لا مشكلة على الإطلاق.', 1],
    ['Where is the nearest supermarket?', 'أين أقرب متجر كبير؟', 2],
    ['Go straight and turn left.', 'امشِ مستقيما ثم انعطف يسارا.', 2],
    ['The prices here are reasonable.', 'الأسعار هنا معقولة.', 2],
    ["I agree, it's good value.", 'أوافق، إنها قيمة جيدة.', 2],
    ['This line is too long.', 'هذا الطابور طويل جدا.', 2],
    ["Let's use the self-checkout.", 'لنستخدم الدفع الذاتي.', 2],
    ['Do you have a loyalty card?', 'هل لديك بطاقة ولاء؟', 2],
    ['Yes, here is my card.', 'نعم، ها هي بطاقتي.', 1],
    ['You saved two dollars today.', 'لقد وفرت دولارين اليوم.', 2],
    ['Excellent!', 'ممتاز!', 1],
    ['We are out of stock on that item.', 'نفدت الكمية من ذلك المنتج.', 3],
    ['When will you restock it?', 'متى ستعيد توفيره؟', 2],
    ['Probably next week.', 'ربما الأسبوع القادم.', 1],
    ['Can you order it for me?', 'هل يمكنك طلبه لي؟', 2],
    ['Certainly, leave your number.', 'بالتأكيد، اترك رقمك.', 2],
    ['How much is the delivery fee?', 'كم رسوم التوصيل؟', 2],
    ['Delivery is free over twenty dollars.', 'التوصيل مجاني فوق عشرين دولارا.', 2],
    ["In that case, I'll buy more.", 'في هذه الحالة، سأشتري المزيد.', 2],
    ['Wise decision!', 'قرار حكيم!', 1],
    ['These apples look fresh.', 'تبدو هذه التفاحات طازجة.', 2],
    ['They came in yesterday.', 'وصلت أمس.', 1],
    ['Can I taste one?', 'هل يمكنني تذوق واحدة؟', 2],
    ['Help yourself.', 'تفضل.', 1],
    ['Mmm, they are delicious.', 'مم، إنها لذيذة.', 1],
    ["I'll take two kilos.", 'سآخذ كيلوين.', 1],
    ['Is there a discount for a big bag?', 'هل هناك خصم للكيس الكبير؟', 2],
    ['Yes, ten percent off.', 'نعم، خصم عشرة بالمائة.', 2],
  ]),
  ...expandAll([
    pat('How much is {G}?', 'كم ثمن {G_ar}؟', { G: GM58 }, { tags: TG58, difficulty: 2 }),
    pat('I need {N}.', 'أحتاج {N_ar}.', { N: NEED58 }, { tags: TG58, difficulty: 2 }),
    pat('Where can I find the {S}?', 'أين أجد {S_ar}؟', { S: SEC58 }, { tags: TG58, difficulty: 2 }),
  ]),
];
const l58Fills = [
  ff(TG58, 'section', 'Excuse me, where is the dairy section?', 'عفوا، أين قسم الألبان؟'),
  ff(TG58, 'much', 'How much are the eggs?', 'كم ثمن البيض؟'),
  ff(TG58, 'Buy', 'Buy two and get one free.', 'اشترِ اثنين واحصل على واحد مجانا.'),
  ff(TG58, 'comes', 'That comes to twelve dollars.', 'المجموع اثنا عشر دولارا.'),
  ff(TG58, 'loyalty', 'Do you have a loyalty card?', 'هل لديك بطاقة ولاء؟'),
  ff(TG58, 'free', 'Delivery is free over twenty dollars.', 'التوصيل مجاني فوق عشرين دولارا.'),
  ff(TG58, 'pay', 'Can I pay by card?', 'هل يمكنني الدفع بالبطاقة؟'),
  ff(TG58, 'percent', 'Yes, ten percent off.', 'نعم، خصم عشرة بالمائة.'),
];
const l58Orders = O(TG58, [
  ['The prices here are reasonable.', 'الأسعار هنا معقولة.'],
  ['Buy two and get one free.', 'اشترِ اثنين واحصل على واحد مجانا.'],
  ['How much is the delivery fee?', 'كم رسوم التوصيل؟'],
  ["Let's use the self-checkout.", 'لنستخدم الدفع الذاتي.'],
  ['These apples look fresh.', 'تبدو هذه التفاحات طازجة.'],
  ['When will you restock it?', 'متى ستعيد توفيره؟'],
]);
const l58Mc = M(TG58, [
  ['"Out of stock" means…', ['there is none left', 'it is very cheap', 'it is fresh'], 0, 'عبارة نفدت الكمية تعني أنه لم يتبق شيء منه.', 2],
  ['Complete: "That ___ to twelve dollars."', ['comes', 'goes', 'takes'], 0, 'المجموع اثنا عشر دولارا.', 2],
  ['Where do you pay in a supermarket?', ['at the checkout', 'at the fitting room', 'in the parking lot'], 0, 'تدفع في نقطة الدفع (الكاشير).', 1],
  ['Complete: "Do you have a ___ card?"', ['loyalty', 'library', 'boarding'], 0, 'هل لديك بطاقة ولاء؟', 2],
  ['Which question asks about price?', ['How much is the delivery fee?', 'Where is the bakery?', 'Do you have fresh bread?'], 0, 'السؤال عن السعر: كم رسوم التوصيل؟', 1],
  ['"Ten percent off" is…', ['a discount', 'a receipt', 'a size'], 0, 'خصم عشرة بالمائة يعني خصما.', 1],
]);

/* ============================================================
   059 Food & Groceries (A2)
   ============================================================ */
const NEED59 = [{ en: 'the sugar', ar: 'السكر' }, { en: 'the butter', ar: 'الزبدة' }, { en: 'more tea', ar: 'المزيد من الشاي' }, { en: 'the onions', ar: 'البصل' }, { en: 'the potatoes', ar: 'البطاطس' }];
const BUY59 = [{ en: 'fresh bread', ar: 'خبزا طازجا' }, { en: 'some dates', ar: 'بعض التمر' }, { en: 'two cucumbers', ar: 'خيارين' }, { en: 'a roasted chicken', ar: 'دجاجة مشوية' }, { en: 'some cheese', ar: 'بعض الجبن' }];
const FAV59 = [{ en: 'Pasta', ar: 'المكرونة' }, { en: 'Grilled fish', ar: 'السمك المشوي' }, { en: 'Homemade soup', ar: 'الحساء المحلي' }, { en: 'Fresh salad', ar: 'السلطة الطازجة' }, { en: 'Warm bread', ar: 'الخبز الساخن' }];
const TG59 = ['conversation', 'food'];
const l59Lt = [
  ...T(TG59, [
    ['What do we need from the market?', 'ماذا نحتاج من السوق؟', 2],
    ['We need rice, oil and vegetables.', 'نحتاج الأرز والزيت والخضروات.', 2],
    ["Don't forget the bread.", 'لا تنسَ الخبز.', 1],
    ["I won't.", 'لن أنسى.', 1],
    ['Do we have any milk left?', 'هل بقي لدينا حليب؟', 2],
    ['Only a little.', 'القليل فقط.', 1],
    ["I'll add it to the list.", 'سأضيفه إلى القائمة.', 2],
    ['Are you cooking dinner tonight?', 'هل تطبخ العشاء الليلة؟', 2],
    ["Yes, I'm making chicken and rice.", 'نعم، أصنع الدجاج مع الأرز.', 2],
    ['Can I help you in the kitchen?', 'هل يمكنني مساعدتك في المطبخ؟', 2],
    ['Sure, you can chop the onions.', 'بالتأكيد، يمكنك تقطيع البصل.', 2],
    ['Where is the salt?', 'أين الملح؟', 1],
    ["It's next to the pepper.", 'إنه بجانب الفلفل.', 1],
    ['Could you pass me the olive oil?', 'هل يمكنك تمرير زيت الزيتون لي؟', 2],
    ['Here you go.', 'تفضل.', 1],
    ['How many people are coming?', 'كم شخصا سيأتي؟', 2],
    ['Four guests and us.', 'أربعة ضيوف ونحن.', 2],
    ['Is the soup ready?', 'هل الحساء جاهز؟', 1],
    ['Almost, five more minutes.', 'تقريبا، خمس دقائق أخرى.', 2],
    ['It smells wonderful!', 'رائحته رائعة!', 1],
    ["Thank you, it's my mother's recipe.", 'شكرا، إنها وصفة أمي.', 2],
    ['Do you eat meat?', 'هل تأكل اللحم؟', 1],
    ["No, I'm a vegetarian.", 'لا، أنا نباتي.', 2],
    ['Then you can try the vegetable dish.', 'إذن يمكنك تجربة طبق الخضار.', 2],
    ['Does it contain nuts?', 'هل يحتوي على مكسرات؟', 2],
    ["I'm allergic to nuts.", 'لدي حساسية من المكسرات.', 2],
    ["Don't worry, this dish is nut-free.", 'لا تقلق، هذا الطبق خال من المكسرات.', 3],
    ['Would you like rice or bread with it?', 'هل تريد أرزا أو خبزا معه؟', 2],
    ['Rice, please.', 'أرزا، من فضلك.', 1],
    ['The fridge is almost empty.', 'الثلاجة شبه فارغة.', 2],
    ["Let's go shopping this afternoon.", 'لنذهب للتسوق بعد الظهر اليوم.', 2],
    ["What's for breakfast?", 'ما هو فطور الصباح؟', 1],
    ['Eggs and cheese, as usual.', 'البيض والجبن كالعادة.', 1],
    ["I'll make coffee too.", 'سأصنع القهوة أيضا.', 1],
    ['Do you prefer tea or coffee in the morning?', 'هل تفضل الشاي أو القهوة في الصباح؟', 2],
    ['Coffee, always.', 'القهوة، دائما.', 1],
    ['Could you buy some fruit?', 'هل يمكنك شراء بعض الفاكهة؟', 2],
    ['What kind?', 'أي نوع؟', 1],
    ['Apples and oranges, please.', 'تفاحات وبرتقالات، من فضلك.', 1],
    ['Anything else, dear?', 'هل من شيء آخر يا عزيزي؟', 2],
    ["That's everything.", 'هذا كل شيء.', 1],
    ['We are having fish for lunch.', 'سنأكل السمك في الغداء.', 2],
    ['I bought it from the fish shop.', 'اشتريته من محل السمك.', 2],
    ['It looked very fresh.', 'بدا طازجا جدا.', 1],
    ['Wash your hands before eating.', 'اغسل يديك قبل الأكل.', 1],
    ['OK, Mom.', 'حسنا يا أمي.', 1],
    ['This yogurt is expired.', 'هذا الزبادي منتهي الصلاحية.', 2],
    ['Check the date before you buy.', 'تحقق من التاريخ قبل الشراء.', 2],
  ]),
  ...expandAll([
    pat('Do we need {N}?', 'هل نحتاج {N_ar}؟', { N: NEED59 }, { tags: TG59, difficulty: 1 }),
    pat("I'll buy {X} tomorrow.", 'سأشتري {X_ar} غدا.', { X: BUY59 }, { tags: TG59, difficulty: 2 }),
    pat('{F} is my favorite.', '{F_ar} هي مفضلتي.', { F: FAV59 }, { tags: TG59, difficulty: 1 }),
  ]),
];
const l59Fills = [
  ff(TG59, 'milk', 'Do we have any milk left?', 'هل بقي لدينا حليب؟'),
  ff(TG59, 'kitchen', 'Can I help you in the kitchen?', 'هل يمكنني مساعدتك في المطبخ؟'),
  ff(TG59, 'salt', 'Where is the salt?', 'أين الملح؟'),
  ff(TG59, 'smells', 'It smells wonderful!', 'رائحته رائعة!'),
  ff(TG59, 'vegetarian', "I'm a vegetarian.", 'أنا نباتي.'),
  ff(TG59, 'hands', 'Wash your hands before eating.', 'اغسل يديك قبل الأكل.'),
  ff(TG59, 'expired', 'This yogurt is expired.', 'هذا الزبادي منتهي الصلاحية.'),
  ff(TG59, 'date', 'Check the date before you buy.', 'تحقق من التاريخ قبل الشراء.'),
];
const l59Orders = O(TG59, [
  ["I'll add it to the list.", 'سأضيفه إلى القائمة.'],
  ['Can I help you in the kitchen?', 'هل يمكنني مساعدتك في المطبخ؟'],
  ['How many people are coming?', 'كم شخصا سيأتي؟'],
  ['The fridge is almost empty.', 'الثلاجة شبه فارغة.'],
  ['Do you prefer tea or coffee in the morning?', 'هل تفضل الشاي أو القهوة في الصباح؟'],
  ['Wash your hands before eating.', 'اغسل يديك قبل الأكل.'],
]);
const l59Mc = M(TG59, [
  ['A vegetarian does not eat…', ['meat', 'vegetables', 'bread'], 0, 'النباتي لا يأكل اللحم.', 1],
  ['Complete: "Do we have any milk ___?"', ['left', 'leave', 'leaving'], 0, 'هل بقي لدينا حليب؟', 2],
  ['Which line do you hear in a kitchen?', ['Chop the onions, please.', 'Hang the laundry.', 'Book a table.'], 0, 'في المطبخ: قطّع البصل من فضلك.', 1],
  ['"Expired" food is…', ['past its safe date', 'very fresh', 'on sale'], 0, 'الطعام المنتهي الصلاحية تجاوز تاريخ أمانه.', 2],
  ['Complete: "It ___ wonderful!"', ['smells', 'smell', 'smelling'], 0, 'رائحته رائعة!', 1],
  ['Someone is allergic to nuts. They should…', ['avoid dishes with nuts', 'eat more nuts', 'cook the nuts'], 0, 'من لديه حساسية من المكسرات ينبغي أن يتجنب الأطباق المحتوية عليها.', 2],
]);

/* ============================================================
   060 At a Restaurant (A2)
   ============================================================ */
const DISH60 = [{ en: 'lamb stew', ar: 'يخنة اللحم' }, { en: 'vegetable pasta', ar: 'مكرونة بالخضار' }, { en: 'fresh salad', ar: 'سلطة طازجة' }, { en: 'beef burger', ar: 'برجر لحم' }, { en: 'cheese pizza', ar: 'بيتزا بالجبن' }];
const DR60 = [{ en: 'a cup of tea', ar: 'كوبا من الشاي' }, { en: 'an orange juice', ar: 'عصير برتقال' }, { en: 'a sparkling water', ar: 'ماء فوّار' }, { en: 'a lemonade', ar: 'عصير ليمون' }, { en: 'a black coffee', ar: 'قهوة سادة' }];
const TASTY60 = [{ en: 'salad', ar: 'السلطة' }, { en: 'rice', ar: 'الأرز' }, { en: 'dessert', ar: 'الحلوى' }, { en: 'bread', ar: 'الخبز' }];
const TG60 = ['conversation', 'restaurant'];
const l60Lt = [
  ...T(TG60, [
    ['Good evening. A table for two, please.', 'مساء الخير. طاولة لشخصين، من فضلك.', 2],
    ['Do you have a reservation?', 'هل لديك حجز؟', 1],
    ["No, we don't. Is that a problem?", 'لا. هل هذه مشكلة؟', 2],
    ['Not at all, follow me, please.', 'ليس على الإطلاق، اتبعني من فضلك.', 2],
    ['Would you like to sit by the window?', 'هل تود الجلوس قرب النافذة؟', 2],
    ['That would be lovely.', 'سيكون ذلك لطيفا.', 1],
    ['Could we see the menu, please?', 'هل يمكننا رؤية القائمة، من فضلك؟', 2],
    ['Of course, here is the menu.', 'بالطبع، هذه هي القائمة.', 1],
    ['What do you recommend?', 'بماذا تنصح؟', 2],
    ['The grilled fish is excellent today.', 'السمك المشوي ممتاز اليوم.', 2],
    ['Are you ready to order?', 'هل أنتم مستعدون للطلب؟', 1],
    ["Yes, I'll have the chicken, please.", 'نعم، سآخذ الدجاج، من فضلك.', 2],
    ['And for you, sir?', 'وأنت يا سيدي؟', 1],
    ["I'll try the soup first.", 'سأجرب الحساء أولا.', 2],
    ['How would you like your steak?', 'كيف تريد ستيكك؟', 2],
    ['Medium, please.', 'متوسط الاستواء، من فضلك.', 2],
    ['Any drinks to start?', 'هل من مشروبات للبداية؟', 1],
    ['Just water for me, please.', 'ماء فقط لي، من فضلك.', 1],
    ['Could I have a glass of fresh juice?', 'هل يمكنني الحصول على كوب من العصير الطازج؟', 2],
    ['Enjoy your meal!', 'بالهناء والشفاء!', 1],
    ['Thank you, it looks delicious.', 'شكرا، يبدو لذيذا.', 1],
    ['Is everything all right?', 'هل كل شيء على ما يرام؟', 1],
    ['Everything is wonderful, thank you.', 'كل شيء رائع، شكرا.', 1],
    ['The food is a little cold.', 'الطعام بارد قليلا.', 2],
    ["I'm so sorry, I'll heat it up.", 'أنا آسف جدا، سأسخنه.', 2],
    ['Excuse me, could we have some more bread?', 'عفوا، هل يمكننا الحصول على المزيد من الخبز؟', 3],
    ['Right away.', 'في الحال.', 1],
    ['Could we get the bill, please?', 'هل يمكننا الحصول على الفاتورة، من فضلك؟', 2],
    ['Of course, one moment.', 'بالطبع، لحظة واحدة.', 1],
    ['Is service included?', 'هل الخدمة مشمولة؟', 2],
    ['Yes, a ten percent service charge.', 'نعم، رسوم خدمة عشرة بالمائة.', 2],
    ['Can we pay separately?', 'هل يمكننا الدفع بشكل منفصل؟', 2],
    ["No problem, I'll prepare two bills.", 'لا مشكلة، سأجهز فاتورتين.', 2],
    ['Keep the change.', 'احتفظ بالباقي.', 2],
    ['Thank you very much, sir.', 'شكرا جزيلا يا سيدي.', 1],
    ['The meal was excellent.', 'كانت الوجبة ممتازة.', 1],
    ['We are glad you enjoyed it.', 'نحن سعداء أنك استمتعت.', 2],
    ['Please come again.', 'تفضلوا بزيارتنا مجددا.', 1],
    ['We certainly will.', 'سنعود بالتأكيد.', 1],
    ["I'd like to book a table for Friday.", 'أود حجز طاولة ليوم الجمعة.', 2],
    ['For how many people?', 'لكم شخص؟', 1],
    ['For four, at eight o\u2019clock.', 'لأربعة، في الثامنة.', 1],
    ['May I have your name, please?', 'هل يمكنني أخذ اسمك، من فضلك؟', 2],
    ["Yes, it's Khalid.", 'نعم، خالد.', 1],
    ['Your table is booked.', 'تم حجز طاولتك.', 2],
    ['This restaurant is always full on weekends.', 'هذا المطعم ممتلئ دائما في عطلات نهاية الأسبوع.', 3],
    ["That's why I booked in advance.", 'لذلك حجزت مسبقا.', 2],
    ['Do you have a children\u2019s menu?', 'هل لديكم قائمة للأطفال؟', 2],
  ]),
  ...expandAll([
    pat("I'll have the {D}, please.", 'سآخذ {D_ar}، من فضلك.', { D: DISH60 }, { tags: TG60, difficulty: 2 }),
    pat('Could I have {R}, please?', 'هل يمكنني الحصول على {R_ar}، من فضلك؟', { R: DR60 }, { tags: TG60, difficulty: 2 }),
    pat('The {T} is really tasty.', '{T_ar} لذيذ حقا.', { T: TASTY60 }, { tags: TG60, difficulty: 1 }),
  ]),
];
const l60Fills = [
  ff(TG60, 'two', 'A table for two, please.', 'طاولة لشخصين، من فضلك.'),
  ff(TG60, 'reservation', 'Do you have a reservation?', 'هل لديك حجز؟'),
  ff(TG60, 'menu', 'Could we see the menu, please?', 'هل يمكننا رؤية القائمة، من فضلك؟'),
  ff(TG60, 'have', "I'll have the chicken, please.", 'نعم، سآخذ الدجاج، من فضلك.'),
  ff(TG60, 'meal', 'Enjoy your meal!', 'بالهناء والشفاء!'),
  ff(TG60, 'bill', 'Could we get the bill, please?', 'هل يمكننا الحصول على الفاتورة، من فضلك؟'),
  ff(TG60, 'change', 'Keep the change.', 'احتفظ بالباقي.'),
  ff(TG60, 'service', 'Is service included?', 'هل الخدمة مشمولة؟'),
];
const l60Orders = O(TG60, [
  ['Could we see the menu, please?', 'هل يمكننا رؤية القائمة، من فضلك؟'],
  ['Are you ready to order?', 'هل أنتم مستعدون للطلب؟'],
  ['The food is a little cold.', 'الطعام بارد قليلا.'],
  ['Can we pay separately?', 'هل يمكننا الدفع بشكل منفصل؟'],
  ["I'd like to book a table for Friday.", 'أود حجز طاولة ليوم الجمعة.'],
  ['This restaurant is always full on weekends.', 'هذا المطعم ممتلئ دائما في عطلات نهاية الأسبوع.'],
]);
const l60Mc = M(TG60, [
  ['A waiter asks "Are you ready to order?" You say:', ["Yes, I'll have the chicken, please.", 'The bill, please.', 'Table for two.'], 0, 'ترد: نعم، سآخذ الدجاج، من فضلك.', 1],
  ['At the end of a meal you ask for…', ['the bill', 'the menu', 'a reservation'], 0, 'في نهاية الوجبة تطلب الفاتورة.', 1],
  ['"Keep the change" means…', ['the waiter keeps the extra money', 'bring another bill', 'give a discount'], 0, 'تعني أن النادل يحتفظ بالمال الزائد.', 2],
  ['Complete: "Is service ___?"', ['included', 'including', 'include'], 0, 'هل الخدمة مشمولة؟', 2],
  ['Which line books a table?', ["I'd like to book a table for Friday.", "I'll have the soup.", 'Keep the change.'], 0, 'لحجز طاولة: أود حجز طاولة ليوم الجمعة.', 1],
  ['"Medium, please" answers a question about…', ['how cooked the steak should be', 'the bill', 'the weather'], 0, 'تجيب عن سؤال حول درجة استواء الستيك.', 2],
]);

/* ============================================================
   061 Ordering Drinks & Cafés (A2)
   ============================================================ */
const DR61 = [{ en: 'a hot chocolate', ar: 'شوكولاتة ساخنة' }, { en: 'a green tea', ar: 'شاي أخضر' }, { en: 'an iced coffee', ar: 'قهوة مثلجة' }, { en: 'a fresh lemonade', ar: 'ليمونادة طازجة' }, { en: 'an apple juice', ar: 'عصير تفاح' }];
const COFF61 = [{ en: 'medium latte', ar: 'لاتي متوسطة' }, { en: 'small espresso', ar: 'إسبريسو صغير' }, { en: 'large mocha', ar: 'موكا كبيرة' }, { en: 'small cappuccino', ar: 'كابتشينو صغير' }];
const HAVE61 = [{ en: 'iced tea', ar: 'شاي مثلج' }, { en: 'fresh mango juice', ar: 'عصير مانجو طازج' }, { en: 'almond milk', ar: 'حليب اللوز' }, { en: 'coconut water', ar: 'ماء جوز الهند' }];
const TG61 = ['conversation', 'cafe'];
const l61Lt = [
  ...T(TG61, [
    ['What can I get you?', 'ماذا يمكنني أن أقدم لك؟', 1],
    ['A large coffee, please.', 'قهوة كبيرة، من فضلك.', 1],
    ['For here or to go?', 'هنا أم للأخذ؟', 2],
    ['To go, please.', 'للأخذ، من فضلك.', 1],
    ['Would you like sugar with that?', 'هل تريد سكرا معه؟', 2],
    ['One sugar, please.', 'سكر واحد، من فضلك.', 1],
    ['Do you have herbal tea?', 'هل لديكم شاي أعشاب؟', 2],
    ['Yes, mint or chamomile.', 'نعم، نعناع أو بابونج.', 1],
    ['Mint tea sounds perfect.', 'شاي النعناع يبدو مثاليا.', 2],
    ['Anything to eat with that?', 'هل من شيء لتأكله معه؟', 1],
    ['A croissant, please.', 'كرواسون، من فضلك.', 1],
    ['That will be four dollars.', 'المجموع أربعة دولارات.', 1],
    ['You can keep the change.', 'يمكنك الاحتفاظ بالباقي.', 2],
    ['Thank you! See you tomorrow.', 'شكرا! أراك غدا.', 1],
    ['This is my favorite café in town.', 'هذا مقهاي المفضل في المدينة.', 2],
    ['The atmosphere is so relaxing.', 'أجواؤه مريحة جدا.', 2],
    ['I love the smell of fresh coffee.', 'أحب رائحة القهوة الطازجة.', 2],
    ['Me too, it wakes me up.', 'وأنا أيضا، توقظني.', 1],
    ['Shall we sit outside?', 'هل نجلس في الخارج؟', 1],
    ['Good idea, the weather is nice.', 'فكرة جيدة، الجو جميل.', 1],
    ['Are you ready to order, or do you need a minute?', 'هل أنت مستعد للطلب، أم تحتاج دقيقة؟', 3],
    ['Give me a minute, please.', 'أمهلني دقيقة، من فضلك.', 2],
    ['Sure, take your time.', 'بالتأكيد، خذ وقتك.', 1],
    ['What do you recommend here?', 'بماذا تنصح هنا؟', 2],
    ['Our iced latte is very popular.', 'قهوة اللاته المثلجة شائعة جدا لدينا.', 2],
    ["I'll try that.", 'سأجربها.', 1],
    ['Would you like whipped cream on top?', 'هل تريد كريمة مخفوقة فوقها؟', 2],
    ['No, thank you, just plain.', 'لا، شكرا، بدون إضافات.', 2],
    ['Can I get a refill?', 'هل يمكنني الحصول على إعادة تعبئة؟', 2],
    ['Refills are free here.', 'إعادة التعبئة مجانية هنا.', 1],
    ["That's great value.", 'هذه قيمة رائعة.', 1],
    ['Is the Wi-Fi free?', 'هل الواي فاي مجاني؟', 1],
    ['Yes, the password is on the table.', 'نعم، كلمة السر على الطاولة.', 2],
    ['Do you have decaf?', 'هل لديكم قهوة منزوعة الكافيين؟', 2],
    ['Yes, regular or decaf.', 'نعم، عادية أو منزوعة الكافيين.', 1],
    ["Decaf for me, it's late.", 'منزوعة الكافيين لي، الوقت متأخر.', 2],
    ['Your order will be ready in five minutes.', 'سيكون طلبك جاهزا في خمس دقائق.', 2],
    ["No rush, I'm early.", 'على مهلك، أنا مبكر.', 2],
    ['Could we sit by the window?', 'هل يمكننا الجلوس قرب النافذة؟', 2],
    ['Sure, the corner table is free.', 'بالتأكيد، الطاولة في الزاوية فارغة.', 2],
    ['Two cappuccinos, please.', 'كابتشينو لشخصين، من فضلك.', 1],
    ['Coming right up.', 'قادم فورا.', 1],
    ['How is your coffee?', 'كيف قهوتك؟', 1],
    ['Strong and perfect, just how I like it.', 'قوية ومثالية، تماما كما أحب.', 2],
    ['We should come here more often.', 'يجب أن نأتي هنا كثيرا.', 2],
    ['Agreed! Same time next week?', 'اتفقنا! نفس الوقت الأسبوع القادم؟', 2],
    ["It's a date.", 'حسنا، اتفقنا.', 2],
    ['Waiter! Could we order, please?', 'نادل! هل يمكننا الطلب، من فضلك؟', 2],
  ]),
  ...expandAll([
    pat("I'll have a {D}, please.", 'سآخذ {D_ar}، من فضلك.', { D: DR61 }, { tags: TG61, difficulty: 2 }),
    pat('A {C}, please.', '{C_ar}، من فضلك.', { C: COFF61 }, { tags: TG61, difficulty: 2 }),
    pat('Do you have {X}?', 'هل لديكم {X_ar}؟', { X: HAVE61 }, { tags: TG61, difficulty: 1 }),
  ]),
];
const l61Fills = [
  ff(TG61, 'coffee', 'A large coffee, please.', 'قهوة كبيرة، من فضلك.'),
  ff(TG61, 'go', 'For here or to go?', 'هنا أم للأخذ؟'),
  ff(TG61, 'sugar', 'Would you like sugar with that?', 'هل تريد سكرا معه؟'),
  ff(TG61, 'password', 'Yes, the password is on the table.', 'نعم، كلمة السر على الطاولة.'),
  ff(TG61, 'free', 'Refills are free here.', 'إعادة التعبئة مجانية هنا.'),
  ff(TG61, 'ready', 'Your order will be ready in five minutes.', 'سيكون طلبك جاهزا في خمس دقائق.'),
  ff(TG61, 'get', 'What can I get you?', 'ماذا يمكنني أن أقدم لك؟'),
  ff(TG61, 'decaf', 'Do you have decaf?', 'هل لديكم قهوة منزوعة الكافيين؟'),
];
const l61Orders = O(TG61, [
  ['This is my favorite café in town.', 'هذا مقهاي المفضل في المدينة.'],
  ['Shall we sit outside?', 'هل نجلس في الخارج؟'],
  ['Your order will be ready in five minutes.', 'سيكون طلبك جاهزا في خمس دقائق.'],
  ['How is your coffee?', 'كيف قهوتك؟'],
  ['We should come here more often.', 'يجب أن نأتي هنا كثيرا.'],
  ['I love the smell of fresh coffee.', 'أحب رائحة القهوة الطازجة.'],
]);
const l61Mc = M(TG61, [
  ['"For here or to go?" asks about…', ['where you will drink it', 'the price', 'the weather'], 0, 'يسأل السؤال عن مكان شرب المشروب أم أخذه معك.', 2],
  ['A refill is…', ['another serving of the same drink', 'a snack', 'a bill'], 0, 'إعادة التعبئة تعني حصة أخرى من المشروب نفسه.', 2],
  ['Complete: "Refills are ___ here."', ['free', 'freedom', 'fresh'], 0, 'إعادة التعبئة مجانية هنا.', 1],
  ['Which drink has no caffeine?', ['decaf coffee', 'espresso', 'iced coffee'], 0, 'القهوة منزوعة الكافيين بلا كافيين.', 2],
  ['"Coming right up" means…', ['your order is being prepared now', 'please leave', 'the café is closed'], 0, 'تعني أن طلبك يُجهز الآن.', 2],
  ['Complete: "Do you have herbal ___?"', ['tea', 'teas', 'tearing'], 0, 'هل لديكم شاي أعشاب؟', 1],
]);

/* ============================================================
   062 Home & Daily Routines (A2)
   ============================================================ */
const MORN62 = [{ en: 'drink coffee', ar: 'تشرب القهوة' }, { en: 'check your phone', ar: 'تفحص هاتفك' }, { en: 'read the news', ar: 'تقرأ الأخبار' }, { en: 'take a walk', ar: 'تتنزه' }];
const EVE62 = [{ en: 'listen to music', ar: 'أستمع إلى الموسيقى' }, { en: 'call my mother', ar: 'أتصل بأمي' }, { en: 'prepare my clothes', ar: 'أجهز ملابسي' }, { en: 'tidy the kitchen', ar: 'أرتب المطبخ' }];
const QT62 = [{ en: 'do you have lunch', ar: 'تأكل الغداء' }, { en: 'do the shops close', ar: 'تغلق المتاجر' }, { en: 'does the film start', ar: 'يبدأ الفيلم' }, { en: 'do you finish work', ar: 'تنتهي من العمل' }];
const TG62 = ['conversation', 'daily-routines'];
const l62Lt = [
  ...T(TG62, [
    ['What time do you usually wake up?', 'في أي وقت تستيقظ عادة؟', 2],
    ['I wake up at six every day.', 'أستيقظ في السادسة كل يوم.', 1],
    ['Do you shower in the morning or at night?', 'هل تستحم في الصباح أم في الليل؟', 2],
    ['In the morning, it wakes me up.', 'في الصباح، يوقظني.', 1],
    ['What do you have for breakfast?', 'ماذا تأكل في الفطور؟', 2],
    ['Usually bread, cheese and tea.', 'عادة خبز وجبن وشاي.', 1],
    ['I leave home at half past seven.', 'أغادر المنزل في السابعة والنصف.', 2],
    ['The bus comes at quarter to eight.', 'تأتي الحافلة في الثامنة إلا ربعا.', 2],
    ['My commute takes thirty minutes.', 'يستغرق تنقلي ثلاثين دقيقة.', 2],
    ['What do you do after work?', 'ماذا تفعل بعد العمل؟', 1],
    ['I go for a walk in the park.', 'أذهب لنزهة في الحديقة.', 1],
    ['Then I cook dinner around seven.', 'ثم أطبخ العشاء حوالي السابعة.', 2],
    ['Do you watch TV in the evening?', 'هل تشاهد التلفاز في المساء؟', 1],
    ['Sometimes, I prefer reading.', 'أحيانا، أفضل القراءة.', 1],
    ['I read for an hour before bed.', 'أقرأ لمدة ساعة قبل النوم.', 2],
    ['What time do you go to sleep?', 'في أي وقت تنام؟', 1],
    ['Around eleven on weekdays.', 'حوالي الحادية عشرة في أيام الأسبوع.', 2],
    ['I set my alarm for five thirty.', 'أضبط منبهي على الخامسة والنصف.', 2],
    ['Do you make your bed every morning?', 'هل ترتب سريرك كل صباح؟', 2],
    ['Yes, it takes one minute.', 'نعم، يستغرق دقيقة واحدة.', 1],
    ['My morning routine never changes.', 'روتيني الصباحي لا يتغير أبدا.', 2],
    ['A good start makes a good day.', 'البداية الجيدة تصنع يوما جيدا.', 2],
    ['Are you an early bird or a night owl?', 'هل أنت من أصحاب الصباح أم من أصحاب الليل؟', 3],
    ['Definitely an early bird.', 'بالتأكيد من أصحاب الصباح.', 2],
    ['On Fridays we have a big family breakfast.', 'أيام الجمعة نتناول فطورا عائليا كبيرا.', 2],
    ['That sounds lovely.', 'يبدو ذلك لطيفا.', 1],
    ['I water the plants before leaving.', 'أسقي النباتات قبل المغادرة.', 2],
    ['Do you feed the cat first?', 'هل تطعم القطة أولا؟', 1],
    ['Of course, she cries otherwise.', 'بالطبع، وإلا كانت ستبكي.', 2],
    ['What is your favorite time of day?', 'ما هو وقتك المفضل في اليوم؟', 2],
    ['Early morning, before the city wakes up.', 'الصباح الباكر، قبل أن تستيقظ المدينة.', 3],
    ["I agree, it's so peaceful.", 'أوافق، إنه وقت هادئ جدا.', 2],
    ['My day starts with a cup of coffee.', 'يومي يبدأ بكوب من القهوة.', 2],
    ['Mine starts with exercise.', 'يومي يبدأ بالتمارين الرياضية.', 2],
    ['How long do you exercise?', 'كم من الوقت تمارس الرياضة؟', 1],
    ['Twenty minutes, three times a week.', 'عشرين دقيقة، ثلاث مرات في الأسبوع.', 2],
    ['I take the kids to school at seven thirty.', 'آخذ الأطفال إلى المدرسة في السابعة والنصف.', 2],
    ['Then I head to the office.', 'ثم أتجه إلى المكتب.', 1],
    ['Do you work from home some days?', 'هل تعمل من المنزل بعض الأيام؟', 2],
    ['Yes, Mondays and Thursdays.', 'نعم، أيام الاثنين والخميس.', 1],
    ['What do you do on your day off?', 'ماذا تفعل في يوم راحتك؟', 2],
    ['I clean the house and do laundry.', 'أنظف البيت وأغسل الملابس.', 2],
    ['Any fun plans for the weekend?', 'هل لديك خطط ممتعة لعطلة نهاية الأسبوع؟', 2],
    ['Nothing special, just resting.', 'لا شيء مميز، فقط الاستراحة.', 1],
    ['I always plan my day the night before.', 'أخطط يومي دائما في الليلة السابقة.', 3],
    ["That's a smart habit.", 'هذه عادة ذكية.', 1],
    ['I write in my journal every night.', 'أكتب في مفكرتي كل ليلة.', 2],
    ['What do you write about?', 'عمّ تكتب؟', 1],
  ]),
  ...expandAll([
    pat('Do you {V} every morning?', 'هل {V_ar} كل صباح؟', { V: MORN62 }, { tags: TG62, difficulty: 1 }),
    pat('Every evening, I {V}.', 'كل مساء، {V_ar}.', { V: EVE62 }, { tags: TG62, difficulty: 2 }),
    pat('What time {Q}?', 'في أي وقت {Q_ar}؟', { Q: QT62 }, { tags: TG62, difficulty: 2 }),
  ]),
];
const l62Fills = [
  ff(TG62, 'wake', 'What time do you usually wake up?', 'في أي وقت تستيقظ عادة؟'),
  ff(TG62, 'leave', 'I leave home at half past seven.', 'أغادر المنزل في السابعة والنصف.'),
  ff(TG62, 'TV', 'Do you watch TV in the evening?', 'هل تشاهد التلفاز في المساء؟'),
  ff(TG62, 'alarm', 'I set my alarm for five thirty.', 'أضبط منبهي على الخامسة والنصف.'),
  ff(TG62, 'water', 'I water the plants before leaving.', 'أسقي النباتات قبل المغادرة.'),
  ff(TG62, 'three', 'Twenty minutes, three times a week.', 'عشرين دقيقة، ثلاث مرات في الأسبوع.'),
  ff(TG62, 'home', 'I work from home on Mondays.', 'أعمل من المنزل أيام الاثنين.'),
  ff(TG62, 'plan', 'I always plan my day the night before.', 'أخطط يومي دائما في الليلة السابقة.'),
];
const l62Orders = O(TG62, [
  ['What time do you usually wake up?', 'في أي وقت تستيقظ عادة؟'],
  ['I leave home at half past seven.', 'أغادر المنزل في السابعة والنصف.'],
  ['Do you watch TV in the evening?', 'هل تشاهد التلفاز في المساء؟'],
  ['My morning routine never changes.', 'روتيني الصباحي لا يتغير أبدا.'],
  ['I always plan my day the night before.', 'أخطط يومي دائما في الليلة السابقة.'],
  ['What do you do on your day off?', 'ماذا تفعل في يوم راحتك؟'],
]);
const l62Mc = M(TG62, [
  ['"An early bird" is a person who…', ['wakes up early', 'sleeps late', 'eats birds'], 0, 'الشخص من أصحاب الصباح يستيقظ مبكرا.', 2],
  ['Complete: "I ___ my alarm for five thirty."', ['set', 'sit', 'sat'], 0, 'أضبط منبهي على الخامسة والنصف.', 2],
  ['Which question asks about a routine?', ['What time do you usually wake up?', 'Where is the bill?', 'How much are the eggs?'], 0, 'السؤال عن الروتين: في أي وقت تستيقظ عادة؟', 1],
  ['"A day off" is…', ['a day without work', 'a work meeting', 'a holiday flight'], 0, 'يوم الراحة هو يوم بلا عمل.', 1],
  ['Complete: "I read for an hour ___ bed."', ['before', 'after', 'during'], 0, 'أقرأ لمدة ساعة قبل النوم.', 2],
  ['Which reply fits "What do you do after work?"', ['I go for a walk in the park.', 'At half past seven.', 'Yes, I do.'], 0, 'الرد المناسب: أذهب لنزهة في الحديقة.', 2],
]);

/* ============================================================
   063 Housework & Chores (A2)
   ============================================================ */
const CH63 = [{ en: 'fold the clothes', ar: 'اطوِ الملابس' }, { en: 'feed the cat', ar: 'أطعم القطة' }, { en: 'empty the dishwasher', ar: 'أفرغ غسالة الأطباق' }, { en: 'clean the mirror', ar: 'نظف المرآة' }, { en: 'organize the shelf', ar: 'رتب الرف' }];
const CH263 = [{ en: 'tidy the living room', ar: 'ترتب غرفة الجلوس' }, { en: 'wipe the table', ar: 'تمسح الطاولة' }, { en: 'change the bedsheets', ar: 'بدّل ملاءات السرير' }, { en: 'sweep the balcony', ar: 'اكنس الشرفة' }];
const CH363 = [{ en: 'wash the car', ar: 'غسلت السيارة' }, { en: 'pay the bills', ar: 'دفعت الفواتير' }, { en: 'check the mailbox', ar: 'فحصت صندوق البريد' }, { en: 'clean the oven', ar: 'نظفت الفرن' }];
const TG63 = ['conversation', 'housework'];
const l63Lt = [
  ...T(TG63, [
    ['Whose turn is it to wash the dishes?', 'من هو دوره في غسل الأطباق؟', 2],
    ["It's my turn tonight.", 'إنه دوري الليلة.', 1],
    ['Please take out the trash.', 'من فضلك أخرج القمامة.', 1],
    ['I did it yesterday.', 'فعلت ذلك أمس.', 1],
    ['Can you hang the laundry?', 'هل يمكنك تعليق الغسيل؟', 2],
    ['Sure, after it finishes washing.', 'بالتأكيد، بعد انتهاء الغسيل.', 2],
    ['The floor needs sweeping.', 'الأرضية تحتاج إلى كنس.', 2],
    ["I'll sweep it after lunch.", 'سأكنسها بعد الغداء.', 1],
    ['Your room is a mess!', 'غرفتك فوضى!', 1],
    ["I'll tidy it up, promise.", 'سأرتبها، أعدك.', 2],
    ['Where is the vacuum cleaner?', 'أين المكنسة الكهربائية؟', 1],
    ["It's in the closet downstairs.", 'إنها في الخزانة في الطابق السفلي.', 2],
    ["Please don't leave your shoes there.", 'من فضلك لا تترك حذاءك هناك.', 2],
    ["Sorry, I'll move them.", 'عفوا، سأنقلها.', 1],
    ['Who cleans the bathroom this week?', 'من ينظف الحمام هذا الأسبوع؟', 2],
    ['We take turns every Saturday.', 'نتناوب الأدوار كل سبت.', 2],
    ['The kitchen is spotless!', 'المطبخ لامع النظافة!', 2],
    ['Thank you, I scrubbed it twice.', 'شكرا، فركته مرتين.', 2],
    ['Did you iron my shirt?', 'هل كويت قميصي؟', 1],
    ["Yes, it's on your bed.", 'نعم، إنه على سريرك.', 1],
    ['Could you water the plants?', 'هل يمكنك سقي النباتات؟', 1],
    ['Of course, I love that job.', 'بالطبع، أحب تلك المهمة.', 1],
    ['We need more dish soap.', 'نحتاج مزيدا من سائل الأطباق.', 2],
    ['Add it to the shopping list.', 'أضفه إلى قائمة التسوق.', 1],
    ['The washing machine is broken.', 'آلة الغسيل معطلة.', 2],
    ['Did you call the repairman?', 'هل اتصلت بعامل الإصلاح؟', 2],
    ['Yes, he is coming tomorrow.', 'نعم، سيأتي غدا.', 1],
    ['How often do you do laundry?', 'كم مرة تغسل الملابس؟', 1],
    ['Twice a week, usually.', 'مرتين في الأسبوع عادة.', 1],
    ["Don't forget to separate the colors.", 'لا تنسَ فصل الألوان.', 2],
    ['I learned that the hard way.', 'تعلمت ذلك بالطريقة الصعبة.', 3],
    ['What happened?', 'ماذا حدث؟', 1],
    ['My white shirts turned pink!', 'تحولت قمصاني البيضاء إلى اللون الوردي!', 3],
    ["Oh dear, that's a classic mistake.", 'يا إلهي، هذا خطأ شائع.', 2],
    ["Let's clean the house together.", 'لننظف البيت معا.', 1],
    ['Many hands make light work.', 'الأيدي الكثيرة تجعل العمل خفيفا.', 3],
    ["I'll dust the furniture.", 'سأنظف الأثاث من الغبار.', 2],
    ["And I'll mop the floor.", 'وسأمسح الأرضية.', 1],
    ['The windows need cleaning too.', 'النوافذ تحتاج إلى التنظيف أيضا.', 2],
    ["Let's do them tomorrow.", 'لنفعلها غدا.', 1],
    ['Do you hire a cleaner?', 'هل تستعين بعامل نظافة؟', 2],
    ['No, we do everything ourselves.', 'لا، نفعل كل شيء بأنفسنا.', 2],
    ['The trash needs to go out.', 'يجب إخراج القمامة.', 1],
    ["I'll take it on my way out.", 'سآخذها أثناء خروجي.', 2],
    ['Good teamwork!', 'عمل جماعي رائع!', 1],
    ['Now we can relax.', 'الآن يمكننا الاسترخاء.', 1],
    ['Where do these empty boxes go?', 'أين تذهب هذه الصناديق الفارغة؟', 2],
    ['In the recycling bin, please.', 'في سلة إعادة التدوير، من فضلك.', 2],
  ]),
  ...expandAll([
    pat('Please {C}.', 'من فضلك {C_ar}.', { C: CH63 }, { tags: TG63, difficulty: 1 }),
    pat('Can you {C}?', 'هل يمكنك أن {C_ar}؟', { C: CH263 }, { tags: TG63, difficulty: 2 }),
    pat('Did you {C} yet?', 'هل {C_ar} بعد؟', { C: CH363 }, { tags: TG63, difficulty: 2 }),
  ]),
];
const l63Fills = [
  ff(TG63, 'trash', 'Please take out the trash.', 'من فضلك أخرج القمامة.'),
  ff(TG63, 'tidy', "I'll tidy it up, promise.", 'سأرتبها، أعدك.'),
  ff(TG63, 'vacuum', 'Where is the vacuum cleaner?', 'أين المكنسة الكهربائية؟'),
  ff(TG63, 'turns', 'We take turns every Saturday.', 'نتناوب الأدوار كل سبت.'),
  ff(TG63, 'machine', 'The washing machine is broken.', 'آلة الغسيل معطلة.'),
  ff(TG63, 'separate', "Don't forget to separate the colors.", 'لا تنسَ فصل الألوان.'),
  ff(TG63, 'dust', "I'll dust the furniture.", 'سأنظف الأثاث من الغبار.'),
  ff(TG63, 'recycling', 'In the recycling bin, please.', 'في سلة إعادة التدوير، من فضلك.'),
];
const l63Orders = O(TG63, [
  ['Whose turn is it to wash the dishes?', 'من هو دوره في غسل الأطباق؟'],
  ['The kitchen is spotless!', 'المطبخ لامع النظافة!'],
  ['How often do you do laundry?', 'كم مرة تغسل الملابس؟'],
  ["Don't forget to separate the colors.", 'لا تنسَ فصل الألوان.'],
  ["Let's clean the house together.", 'لننظف البيت معا.'],
  ['The windows need cleaning too.', 'النوافذ تحتاج إلى التنظيف أيضا.'],
]);
const l63Mc = M(TG63, [
  ['"Spotless" means…', ['completely clean', 'slightly dirty', 'very small'], 0, 'كلمة لامع النظافة تعني نظيفا تماما.', 2],
  ['Complete: "We take ___ every Saturday."', ['turns', 'times', 'trips'], 0, 'نتناوب الأدوار كل سبت.', 2],
  ['Which chore uses a vacuum cleaner?', ['cleaning the carpet', 'ironing a shirt', 'watering plants'], 0, 'تنظيف السجادة يستخدم المكنسة الكهربائية.', 1],
  ['"I learned that the hard way" means…', ['I learned through a bad experience', 'I learned at school', 'it was easy'], 0, 'تعني أنني تعلمت من تجربة سيئة.', 3],
  ['Complete: "The washing ___ is broken."', ['machine', 'machinery', 'mall'], 0, 'آلة الغسيل معطلة.', 1],
  ['Which line divides housework fairly?', ["I'll dust the furniture and you mop the floor.", 'You do everything.', 'I never help.'], 0, 'توزيع عادل: سأنظف الأثاث وأنت تمسح الأرضية.', 2],
]);

/* ============================================================
   064 Phone Calls (A2)
   ============================================================ */
const T64 = [{ en: 'tomorrow morning', ar: 'صباح الغد' }, { en: 'after lunch', ar: 'بعد الغداء' }, { en: 'this evening', ar: 'هذا المساء' }, { en: 'on Sunday', ar: 'يوم الأحد' }];
const N64 = [{ en: 'Sara', ar: 'سارة' }, { en: 'Omar', ar: 'عمر' }, { en: 'the manager', ar: 'المدير' }, { en: 'your father', ar: 'والدك' }];
const BUSY64 = [{ en: 'driving', ar: 'أقود' }, { en: 'in class', ar: 'في الصف' }, { en: 'at work', ar: 'في العمل' }, { en: 'shopping', ar: 'أشتري' }];
const TG64 = ['conversation', 'phone'];
const l64Lt = [
  ...T(TG64, [
    ['Hello, this is Omar speaking.', 'مرحبا، عمر يتحدث.', 1],
    ['Hi Omar, how are you?', 'مرحبا عمر، كيف حالك؟', 1],
    ['May I speak to Sara, please?', 'هل يمكنني التحدث إلى سارة، من فضلك؟', 2],
    ["Hold on, please. I'll get her.", 'انتظر من فضلك. سأحضرها.', 2],
    ['Who is calling, please?', 'من يتصل، من فضلك؟', 2],
    ["It's Khalid from the office.", 'إنه خالد من المكتب.', 1],
    ['Can you hear me clearly?', 'هل تسمعني بوضوح؟', 1],
    ['Sorry, the line is bad.', 'عفوا، الخط سيئ.', 1],
    ['Let me call you back.', 'دعني أعيد الاتصال بك.', 2],
    ["I'm sorry, you have the wrong number.", 'آسف، لقد اتصلت برقم خاطئ.', 2],
    ['Oh, I apologize.', 'أوه، أعتذر.', 1],
    ['No problem, it happens.', 'لا مشكلة، هذا يحدث.', 1],
    ['Could you speak a little louder?', 'هل يمكنك التحدث بصوت أعلى قليلا؟', 2],
    ['Of course, is this better?', 'بالطبع، هل هذا أفضل؟', 1],
    ['Much better, thank you.', 'أفضل بكثير، شكرا.', 1],
    ['Sorry, I missed your call.', 'عفوا، فوّتت اتصالك.', 2],
    ['I was in a meeting all morning.', 'كنت في اجتماع طوال الصباح.', 2],
    ['No worries, I wanted to check something.', 'لا بأس، أردت التحقق من شيء.', 2],
    ["I'll call you back in ten minutes.", 'سأعاود الاتصال بك في عشر دقائق.', 2],
    ["I'll be waiting.", 'سأكون بانتظارك.', 1],
    ['My phone battery is about to die.', 'بطارية هاتفي على وشك النفاد.', 2],
    ["Then I'll text you instead.", 'إذن سأرسل لك رسالة بدلا من ذلك.', 2],
    ['Can you hear the background noise?', 'هل تسمع ضجيج الخلفية؟', 2],
    ['Yes, where are you?', 'نعم، أين أنت؟', 1],
    ["I'm at the station.", 'أنا في المحطة.', 1],
    ['You are breaking up.', 'صوتك متقطع.', 3],
    ["I'll move outside.", 'سأنتقل إلى الخارج.', 1],
    ['Can I take a message?', 'هل يمكنني أخذ رسالة؟', 1],
    ['Yes, please tell her I called.', 'نعم، من فضلك أخبرها أنني اتصلت.', 2],
    ['Should he call you back?', 'هل يجب أن يعيد الاتصال بك؟', 2],
    ['Yes, on this number.', 'نعم، على هذا الرقم.', 1],
    ['Thanks for calling.', 'شكرا لاتصالك.', 1],
    ['Anytime. Goodbye.', 'في أي وقت. إلى اللقاء.', 1],
    ['Hello? Is anyone there?', 'مرحبا؟ هل من أحد هناك؟', 1],
    ['Sorry, I dropped my phone.', 'عفوا، أسقطت هاتفي.', 2],
    ['Are you all right?', 'هل أنت بخير؟', 1],
    ['Everything is fine, luckily.', 'كل شيء بخير، لحسن الحظ.', 2],
    ['What time works for a quick call?', 'ما الوقت المناسب لمكالمة سريعة؟', 2],
    ['Any time after six.', 'أي وقت بعد السادسة.', 1],
    ["Perfect, I'll ring you then.", 'ممتاز، سأتصل بك حينها.', 2],
    ['I called you twice yesterday.', 'اتصلت بك مرتين أمس.', 1],
    ['My phone was on silent.', 'كان هاتفي على الوضع الصامت.', 2],
    ['That explains it.', 'هذا يفسر الأمر.', 2],
    ['Shall we talk tomorrow instead?', 'هل نتحدث غدا بدلا من ذلك؟', 2],
    ["Good evening, I'm calling about the apartment.", 'مساء الخير، أتصل بخصوص الشقة.', 3],
    ['Yes, it is. When would you like to visit?', 'نعم، إنها متاحة. متى تود الزيارة؟', 3],
    ['Is tomorrow at noon okay?', 'هل الغد عند الظهر مناسب؟', 2],
    ['Yes, see you then.', 'نعم، أراك حينها.', 1],
  ]),
  ...expandAll([
    pat("I'll call you {T}.", 'سأتصل بك {T_ar}.', { T: T64 }, { tags: TG64, difficulty: 1 }),
    pat('Can you ask {N} to call me?', 'هل يمكنك أن تطلب من {N_ar} أن يتصل بي؟', { N: N64 }, { tags: TG64, difficulty: 2 }),
    pat("Sorry, I can't talk now, I'm {X}.", 'عفوا، لا أستطيع التحدث الآن، أنا {X_ar}.', { X: BUSY64 }, { tags: TG64, difficulty: 2 }),
  ]),
];
const l64Fills = [
  ff(TG64, 'speak', 'May I speak to Sara, please?', 'هل يمكنني التحدث إلى سارة، من فضلك؟'),
  ff(TG64, 'missed', 'Sorry, I missed your call.', 'عفوا، فوّتت اتصالك.'),
  ff(TG64, 'hear', 'Can you hear me clearly?', 'هل تسمعني بوضوح؟'),
  ff(TG64, 'call', "I'll call you back in ten minutes.", 'سأعاود الاتصال بك في عشر دقائق.'),
  ff(TG64, 'message', 'Can I take a message?', 'هل يمكنني أخذ رسالة؟'),
  ff(TG64, 'calling', 'Thanks for calling.', 'شكرا لاتصالك.'),
  ff(TG64, 'silent', 'My phone was on silent.', 'كان هاتفي على الوضع الصامت.'),
  ff(TG64, 'wrong', "I'm sorry, you have the wrong number.", 'آسف، لقد اتصلت برقم خاطئ.'),
];
const l64Orders = O(TG64, [
  ['May I speak to Sara, please?', 'هل يمكنني التحدث إلى سارة، من فضلك؟'],
  ['Sorry, I missed your call.', 'عفوا، فوّتت اتصالك.'],
  ["I'll call you back in ten minutes.", 'سأعاود الاتصال بك في عشر دقائق.'],
  ['Can you hear me clearly?', 'هل تسمعني بوضوح؟'],
  ['You are breaking up.', 'صوتك متقطع.'],
  ['What time works for a quick call?', 'ما الوقت المناسب لمكالمة سريعة؟'],
]);
const l64Mc = M(TG64, [
  ['"Can I take a message?" is said by…', ['the person answering the phone', 'the caller', 'the operator only'], 0, 'يقال من قبل من يرد على الهاتف.', 1],
  ['"You are breaking up" means…', ['your voice is unclear', 'we are ending the call', 'you are angry'], 0, 'تعني أن صوتك غير واضح ومتقطع.', 3],
  ['Complete: "Sorry, I ___ your call."', ['missed', 'miss', 'missing'], 0, 'عفوا، فوّتت اتصالك.', 2],
  ['Which line starts a phone call?', ['Hello, this is Omar speaking.', 'See you Monday.', 'Keep the change.'], 0, 'تبدأ المكالمة بـ: مرحبا، عمر يتحدث.', 1],
  ['"You have the wrong number" means…', ['I am not the person you wanted', 'my phone is broken', 'call me later'], 0, 'تعني أنك لست الشخص المقصود.', 2],
  ['Complete: "I\u2019ll text you ___."', ['instead', 'insteaded', 'stead'], 0, 'سأرسل لك رسالة بدلا من ذلك.', 2],
]);

/* ============================================================
   065 Text Messages & Online Chat (A2)
   ============================================================ */
const TX65 = [{ en: 'arrive home', ar: 'تصل إلى المنزل' }, { en: 'wake up', ar: 'تستيقظ' }, { en: 'finish work', ar: 'تنتهي من العمل' }, { en: 'get the tickets', ar: 'تحصل على التذاكر' }, { en: 'are free', ar: 'تكون حرا' }];
const SENT65 = [{ en: 'the video', ar: 'الفيديو' }, { en: 'the article', ar: 'المقال' }, { en: 'the location', ar: 'الموقع' }, { en: 'the song', ar: 'الأغنية' }];
const SEND65 = [{ en: 'the receipt', ar: 'الإيصال' }, { en: 'the schedule', ar: 'الجدول' }, { en: 'the notes', ar: 'الملاحظات' }, { en: 'the recipe', ar: 'الوصفة' }];
const TG65 = ['conversation', 'texting'];
const l65Lt = [
  ...T(TG65, [
    ['Did you get my message?', 'هل وصلتك رسالتي؟', 1],
    ['Yes, I read it this morning.', 'نعم، قرأتها هذا الصباح.', 1],
    ['Sorry for the late reply.', 'عفوا على الرد المتأخر.', 2],
    ['No worries, I know you are busy.', 'لا بأس، أعرف أنك مشغول.', 2],
    ['I sent you the photos on WhatsApp.', 'أرسلت لك الصور على واتساب.', 2],
    ['Got them, they are amazing!', 'وصلتني، إنها مذهلة!', 1],
    ["What does 'BRB' mean?", 'ماذا تعني BRB؟', 2],
    ["It means 'be right back'.", 'تعني سأعود حالا.', 2],
    ['People use lots of abbreviations online.', 'يستخدم الناس الكثير من الاختصارات على الإنترنت.', 2],
    ["I can't keep up with them.", 'لا أستطيع مواكبتها.', 2],
    ['Are you on social media?', 'هل أنت على وسائل التواصل الاجتماعي؟', 2],
    ['Yes, but I rarely post.', 'نعم، لكنني نادرا ما أنشر.', 2],
    ['I prefer talking face to face.', 'أفضل التحدث وجها لوجه.', 2],
    ['Same here, honestly.', 'وأنا كذلك، بصراحة.', 1],
    ['Can you send me the address?', 'هل يمكنك إرسال العنوان لي؟', 2],
    ["Sure, I'll text it now.", 'بالتأكيد، سأرسله الآن.', 1],
    ['Did you see my email?', 'هل رأيت بريدي الإلكتروني؟', 1],
    ["I'll check my inbox.", 'سأفحص صندوق بريدي.', 2],
    ['Please reply when you can.', 'من فضلك رد عندما تستطيع.', 2],
    ["I'll answer you tonight.", 'سأجيبك الليلة.', 1],
    ['Typing... still typing...', 'يكتب... ما زال يكتب...', 1],
    ['Take all the time you need!', 'خذ كل الوقت الذي تحتاجه!', 1],
    ['My internet is so slow today.', 'الإنترنت بطيء جدا اليوم.', 1],
    ['Try restarting the router.', 'جرّب إعادة تشغيل الراوتر.', 2],
    ['It works now, thanks!', 'يعمل الآن، شكرا!', 1],
    ['What does this emoji mean?', 'ما معنى هذا الرمز التعبيري؟', 2],
    ['It usually means happiness.', 'تعني عادة السعادة.', 1],
    ['Emojis make messages friendlier.', 'الرموز التعبيرية تجعل الرسائل أكثر ودية.', 2],
    ['True, words can sound cold.', 'صحيح، الكلمات قد تبدو باردة.', 2],
    ['Did she reply to you?', 'هل ردت عليك؟', 1],
    ['Not yet, she left me on read.', 'ليس بعد، رأت رسالتي ولم ترد.', 3],
    ['Maybe she is just busy.', 'ربما هي مشغولة فقط.', 1],
    ['Can we chat later tonight?', 'هل نتحدث لاحقا الليلة؟', 1],
    ['Yes, after nine works for me.', 'نعم، بعد التاسعة يناسبني.', 2],
    ["I'll be online.", 'سأكون متصلا.', 1],
    ["Don't forget to charge your phone.", 'لا تنسَ شحن هاتفك.', 1],
    ["It's at fifty percent, we are fine.", 'عند خمسين بالمائة، نحن بخير.', 2],
    ['Who is this?', 'من هذا؟', 1],
    ["It's Maya, from the new number.", 'إنها مايا، من الرقم الجديد.', 2],
    ['Oh, saved it!', 'أوه، حفظته!', 1],
    ["My message won't send.", 'رسالتي لا تُرسل.', 2],
    ['Check your connection.', 'تحقق من اتصالك.', 1],
    ['It sent finally.', 'أُرسلت أخيرا.', 1],
    ['Great, I received it.', 'رائع، استلمته.', 1],
    ['Send me the link, please.', 'أرسل لي الرابط، من فضلك.', 1],
    ["One moment, I'll copy it.", 'لحظة واحدة، سأنسخه.', 2],
    ['Thanks, got it.', 'شكرا، وصلني.', 1],
    ["Let's continue this tomorrow.", 'لنكمل هذا غدا.', 1],
  ]),
  ...expandAll([
    pat('Text me when you {X}.', 'راسلني عندما {X_ar}.', { X: TX65 }, { tags: TG65, difficulty: 2 }),
    pat('I sent you {X}.', 'أرسلت لك {X_ar}.', { X: SENT65 }, { tags: TG65, difficulty: 1 }),
    pat('Can you send me {X}?', 'هل يمكنك إرسال {X_ar} لي؟', { X: SEND65 }, { tags: TG65, difficulty: 2 }),
  ]),
];
const l65Fills = [
  ff(TG65, 'get', 'Did you get my message?', 'هل وصلتك رسالتي؟'),
  ff(TG65, 'reply', 'Sorry for the late reply.', 'عفوا على الرد المتأخر.'),
  ff(TG65, 'address', 'Can you send me the address?', 'هل يمكنك إرسال العنوان لي؟'),
  ff(TG65, 'slow', 'My internet is so slow today.', 'الإنترنت بطيء جدا اليوم.'),
  ff(TG65, 'connection', 'Check your connection.', 'تحقق من اتصالك.'),
  ff(TG65, 'sent', 'It sent finally.', 'أُرسلت أخيرا.'),
  ff(TG65, 'charge', "Don't forget to charge your phone.", 'لا تنسَ شحن هاتفك.'),
  ff(TG65, 'online', "I'll be online.", 'سأكون متصلا.'),
];
const l65Orders = O(TG65, [
  ['Did you get my message?', 'هل وصلتك رسالتي؟'],
  ['Sorry for the late reply.', 'عفوا على الرد المتأخر.'],
  ['My internet is so slow today.', 'الإنترنت بطيء جدا اليوم.'],
  ['Emojis make messages friendlier.', 'الرموز التعبيرية تجعل الرسائل أكثر ودية.'],
  ['Can we chat later tonight?', 'هل نتحدث لاحقا الليلة؟'],
  ["Don't forget to charge your phone.", 'لا تنسَ شحن هاتفك.'],
]);
const l65Mc = M(TG65, [
  ['"BRB" in chat means…', ['be right back', 'best regards bro', 'bye right now'], 0, 'الاختصار BRB يعني سأعود حالا.', 1],
  ['"She left me on read" means…', ['she saw my message and did not reply', 'she blocked me', 'she deleted the chat'], 0, 'تعني أنها رأت الرسالة ولم ترد.', 3],
  ['Complete: "Check your ___."', ['connection', 'collection', 'correction'], 0, 'تحقق من اتصالك.', 2],
  ['Which line fixes slow internet?', ['Try restarting the router.', 'Try the menu.', 'Try the fitting room.'], 0, 'لإصلاح بطء الإنترنت: جرّب إعادة تشغيل الراوتر.', 1],
  ['"Typing..." in a chat app shows that someone is…', ['writing a reply now', 'calling you', 'offline'], 0, 'تظهر حالة يكتب عندما يكتب أحدهم ردا الآن.', 2],
  ['Complete: "My message won\u2019t ___."', ['send', 'sent', 'sending'], 0, 'رسالتي لا تُرسل.', 2],
]);

/* ============================================================
   066 Asking for Help & Favors (B1)
   ============================================================ */
const H66 = [{ en: 'fix this chair', ar: 'إصلاح هذا الكرسي' }, { en: 'carry these bags', ar: 'حمل هذه الحقائب' }, { en: 'fill in this form', ar: 'ملء هذا النموذج' }, { en: 'print this file', ar: 'طباعة هذا الملف' }];
const MIND66 = [{ en: 'closing the door', ar: 'إغلاق الباب' }, { en: 'turning down the music', ar: 'خفض الموسيقى' }, { en: 'passing the salt', ar: 'تمرير الملح' }, { en: 'waiting five minutes', ar: 'الانتظار خمس دقائق' }];
const Q66 = [{ en: 'the homework', ar: 'الواجب' }, { en: 'the directions', ar: 'الاتجاهات' }, { en: 'the schedule', ar: 'الجدول' }, { en: 'the recipe', ar: 'الوصفة' }];
const TG66 = ['conversation', 'favors'];
const l66Lt = [
  ...T(TG66, [
    ['Could you do me a favor?', 'هل يمكنك أن تفعل لي معروفا؟', 2],
    ['Of course, what do you need?', 'بالطبع، ماذا تحتاج؟', 1],
    ['Can you help me move this table?', 'هل يمكنك مساعدتي في تحريك هذه الطاولة؟', 2],
    ['Sure, where should we put it?', 'بالتأكيد، أين يجب أن نضعها؟', 2],
    ['Would you mind opening the window?', 'هل تمانع في فتح النافذة؟', 2],
    ['Not at all.', 'ليس على الإطلاق.', 1],
    ['I hate to ask, but could you babysit tonight?', 'أكره أن أطلب، لكن هل يمكنك مراقبة الأطفال الليلة؟', 3],
    ["Don't worry, I'd be happy to.", 'لا تقلق، سأفعل ذلك بكل سرور.', 2],
    ['Could you lend me your charger?', 'هل يمكنك إعارتي شاحنتك؟', 2],
    ['Here, use mine.', 'خذ، استخدم شاحنتي.', 1],
    ['I really appreciate your help.', 'أقدّر مساعدتك حقا.', 2],
    ["That's what friends are for.", 'لهذا الأصدقاء موجودون.', 2],
    ['Is there anything I can do?', 'هل هناك ما يمكنني فعله؟', 2],
    ['Actually, could you buy some medicine?', 'في الواقع، هل يمكنك شراء بعض الدواء؟', 2],
    ['Consider it done.', 'اعتبره منجزا.', 2],
    ['Thank you so much, you saved me.', 'شكرا جزيلا، لقد أنقذتني.', 2],
    ['Can I ask you for advice?', 'هل يمكنني أن أطلب نصيحتك؟', 2],
    ["Of course, tell me what's going on.", 'بالطبع، أخبرني بما يجري.', 2],
    ['I need a hand with these boxes.', 'أحتاج يدا مساعدة مع هذه الصناديق.', 3],
    ["No problem, I'm strong enough.", 'لا مشكلة، أنا قوي بما يكفي.', 2],
    ['Could you watch my bag for a minute?', 'هل يمكنك مراقبة حقيبتي لدقيقة؟', 2],
    ["Go ahead, I'll keep an eye on it.", 'تفضل، سأراقبها.', 2],
    ['Sorry to bother you, but...', 'عفوا على الإزعاج، لكن...', 1],
    ["It's no bother at all.", 'ليس إزعاجا على الإطلاق.', 2],
    ['Could you explain this word to me?', 'هل يمكنك شرح هذه الكلمة لي؟', 2],
    ["Sure, it means 'almost never'.", 'بالتأكيد، تعني نادرا جدا.', 2],
    ['That makes it clearer, thanks.', 'هذا يجعلها أوضح، شكرا.', 2],
    ['Would you mind if I sat here?', 'هل تمانع إن جلست هنا؟', 2],
    ['Please, have a seat.', 'تفضل، اجلس.', 1],
    ["I need a small favor, if you don't mind.", 'أحتاج معروفا صغيرا، إن لم يكن لديك مانع.', 3],
    ['Name it.', 'قلها.', 1],
    ['Could you pick up my prescription?', 'هل يمكنك أن تجلب وصفتي الطبية؟', 3],
    ['On my way back, no problem.', 'في طريقي للعودة، لا مشكلة.', 2],
    ['You are a lifesaver!', 'أنت منقذي!', 2],
    ["Don't mention it.", 'لا شكر على واجب.', 1],
    ['Could I borrow your umbrella for today?', 'هل يمكنني استعارة مظلتك اليوم؟', 2],
    ['Take it, and return it tomorrow.', 'خذها وأعدها غدا.', 1],
    ['Would it be possible to leave early today?', 'هل من الممكن المغادرة مبكرا اليوم؟', 3],
    ['Why, do you have somewhere to be?', 'لماذا، هل لديك موعد؟', 2],
    ["I have a doctor's appointment.", 'لدي موعد مع الطبيب.', 2],
    ["That's fine, just inform the team.", 'لا بأس، فقط أبلغ الفريق.', 2],
    ['Could you give me a lift to the airport?', 'هل يمكنك توصيلي إلى المطار؟', 2],
    ['What time is your flight?', 'متى رحلتك؟', 1],
    ['At nine in the morning.', 'في التاسعة صباحا.', 1],
    ["Of course, I'll drive you.", 'بالطبع، سأوصلك.', 1],
    ['Thanks a million!', 'مليون شكر!', 1],
    ['Do you need anything else?', 'هل تحتاج أي شيء آخر؟', 1],
    ["Not for now, you've done enough.", 'ليس الآن، لقد فعلت ما يكفي.', 2],
  ]),
  ...expandAll([
    pat('Could you help me {X}?', 'هل يمكنك مساعدتي في {X_ar}؟', { X: H66 }, { tags: TG66, difficulty: 2 }),
    pat('Would you mind {X}?', 'هل تمانع في {X_ar}؟', { X: MIND66 }, { tags: TG66, difficulty: 2 }),
    pat('Can I ask you about {X}?', 'هل يمكنني أن أسألك عن {X_ar}؟', { X: Q66 }, { tags: TG66, difficulty: 1 }),
  ]),
];
const l66Fills = [
  ff(TG66, 'favor', 'Could you do me a favor?', 'هل يمكنك أن تفعل لي معروفا؟'),
  ff(TG66, 'mind', 'Would you mind opening the window?', 'هل تمانع في فتح النافذة؟'),
  ff(TG66, 'appreciate', 'I really appreciate your help.', 'أقدّر مساعدتك حقا.'),
  ff(TG66, 'use', 'Here, use mine.', 'خذ، استخدم شاحنتي.'),
  ff(TG66, 'give', 'Could you give me a lift?', 'هل يمكنك توصيلي؟'),
  ff(TG66, 'appointment', "I have a doctor's appointment.", 'لدي موعد مع الطبيب.'),
  ff(TG66, 'lifesaver', 'You are a lifesaver!', 'أنت منقذي!'),
  ff(TG66, 'friends', "That's what friends are for.", 'لهذا الأصدقاء موجودون.'),
];
const l66Orders = O(TG66, [
  ['Could you do me a favor?', 'هل يمكنك أن تفعل لي معروفا؟'],
  ['I really appreciate your help.', 'أقدّر مساعدتك حقا.'],
  ['Would you mind opening the window?', 'هل تمانع في فتح النافذة؟'],
  ['Could you give me a lift to the airport?', 'هل يمكنك توصيلي إلى المطار؟'],
  ['You are a lifesaver!', 'أنت منقذي!'],
  ['Is there anything I can do?', 'هل هناك ما يمكنني فعله؟'],
]);
const l66Mc = M(TG66, [
  ['Someone asks "Would you mind opening the window?" You agree. You say:', ['Not at all.', 'Yes, I would.', 'Never again.'], 0, 'توافق فتقول: ليس على الإطلاق.', 2],
  ['"You are a lifesaver" is said when someone…', ['helps you at the right moment', 'saves money', 'drives fast'], 0, 'تقال عندما يساعدك أحدهم في اللحظة المناسبة.', 2],
  ['Complete: "Could you ___ me a lift?"', ['give', 'make', 'do'], 0, 'هل يمكنك توصيلي؟', 2],
  ['Which is the politest request?', ['Would you mind waiting five minutes?', 'Wait now!', 'Move it.'], 0, 'الأكثر تأدبا: هل تمانع في الانتظار خمس دقائق؟', 2],
  ['"Don\u2019t mention it" replies to…', ['thanks', 'goodbye', 'a question'], 0, 'ترد على الشكر: لا شكر على واجب.', 1],
  ['Complete: "Consider it ___."', ['done', 'do', 'doing'], 0, 'اعتبره منجزا.', 2],
]);

/* ============================================================
   067 Making Appointments (B1)
   ============================================================ */
const TG67 = ['conversation', 'appointments'];
const l67Lt = T(TG67, [
  ['I would like to make an appointment.', 'أود تحديد موعد.', 2],
  ['Can I see the doctor tomorrow?', 'هل يمكنني رؤية الطبيب غدا؟', 2],
  ['Do you have any availability on Tuesday?', 'هل لديكم مواعيد متاحة الثلاثاء؟', 2],
  ['How about Wednesday at ten?', 'ما رأيك الأربعاء في العاشرة؟', 2],
  ['Ten works for me.', 'العاشرة تناسبني.', 2],
  ['Sorry, I am busy in the morning.', 'عفوا، أنا مشغول في الصباح.', 2],
  ['Could we move it to the afternoon?', 'هل يمكننا نقله إلى بعد الظهر؟', 2],
  ['I need to reschedule our meeting.', 'أحتاج إلى إعادة جدولة اجتماعنا.', 2],
  ['Something urgent came up.', 'طرأ أمر عاجل.', 2],
  ['Can we push it to next week?', 'هل يمكننا تأجيله إلى الأسبوع القادم؟', 2],
  ['The dentist can see you at four.', 'يمكن لطبيب الأسنان رؤيتك في الرابعة.', 2],
  ['Please arrive ten minutes early.', 'من فضلك احضر قبل عشر دقائق.', 2],
  ['I am confirming my appointment for Friday.', 'أؤكد موعدي يوم الجمعة.', 2],
  ['Should I bring anything with me?', 'هل أحضر شيئا معي؟', 2],
  ['Bring your ID and the report.', 'أحضر هويتك والتقرير.', 2],
  ['The clinic opens at nine.', 'تفتح العيادة في التاسعة.', 2],
  ['I booked a table for two at eight.', 'حجزت طاولة لشخصين في الثامنة.', 2],
  ['The appointment lasts about thirty minutes.', 'يستغرق الموعد نحو ثلاثين دقيقة.', 2],
  ['I have an appointment with the manager at noon.', 'لدي موعد مع المدير ظهرا.', 2],
  ['She is seeing the doctor this afternoon.', 'ستقابل الطبيب بعد الظهر.', 2],
  ['Is Dr. Sami available today?', 'هل الدكتور سامي متاح اليوم؟', 2],
  ['Unfortunately, he is fully booked.', 'للأسف، مواعيده ممتلئة.', 2],
  ['You can come at half past five.', 'يمكنك المجيء في الخامسة والنصف.', 2],
  ['I will wait in the reception area.', 'سأنتظر في منطقة الاستقبال.', 2],
  ['Please take a seat; the doctor will call you.', 'من فضلك اجلس؛ سيطلبك الطبيب.', 2],
  ['We had to cancel the meeting.', 'كان علينا إلغاء الاجتماع.', 2],
  ['The meeting is postponed until Monday.', 'تم تأجيل الاجتماع حتى الاثنين.', 2],
  ['See you at the appointment on Thursday.', 'أراك في الموعد يوم الخميس.', 2],
  ['I am calling to confirm the time.', 'أتصل لتأكيد الوقت.', 2],
  ['Your appointment is at eleven, not at ten.', 'موعدك في الحادية عشرة، وليس العاشرة.', 2],
  ['Could I change it to a later time?', 'هل يمكنني تغييره إلى وقت لاحق؟', 2],
  ['What time suits you best?', 'ما الوقت الأنسب لك؟', 2],
  ['Any time after six is fine.', 'أي وقت بعد السادسة مناسب.', 2],
  ['I am afraid the morning is full.', 'أخشى أن الصباح ممتلئ.', 2],
  ['We will send you a reminder.', 'سنرسل لك تذكيرا.', 2],
  ['Thank you, that is all confirmed.', 'شكرا، تم تأكيد كل شيء.', 2],
  ['I look forward to seeing you then.', 'أتطلع لرؤيتك حينها.', 2],
]);
const l67Fills = [
  ff(TG67, 'appointment', 'I would like to make an appointment.', 'أود تحديد موعد.'),
  ff(TG67, 'reschedule', 'I need to reschedule our meeting.', 'أحتاج إلى إعادة جدولة اجتماعنا.'),
  ff(TG67, 'available', 'Is Dr. Sami available today?', 'هل الدكتور سامي متاح اليوم؟'),
  ff(TG67, 'confirming', 'I am confirming my appointment for Friday.', 'أؤكد موعدي يوم الجمعة.'),
  ff(TG67, 'postponed', 'The meeting is postponed until Monday.', 'تم تأجيل الاجتماع حتى الاثنين.'),
  ff(TG67, 'reminder', 'We will send you a reminder.', 'سنرسل لك تذكيرا.'),
  ff(TG67, 'urgent', 'Something urgent came up.', 'طرأ أمر عاجل.'),
  ff(TG67, 'booked', 'Unfortunately, he is fully booked.', 'للأسف، مواعيده ممتلئة.'),
];
const l67Orders = O(TG67, [
  ['Can I see the doctor tomorrow?', 'هل يمكنني رؤية الطبيب غدا؟'],
  ['Ten works for me.', 'العاشرة تناسبني.'],
  ['Please arrive ten minutes early.', 'من فضلك احضر قبل عشر دقائق.'],
  ['What time suits you best?', 'ما الوقت الأنسب لك؟'],
  ['The clinic opens at nine.', 'تفتح العيادة في التاسعة.'],
  ['I need to reschedule our meeting.', 'أحتاج إلى إعادة جدولة اجتماعنا.'],
]);
const l67Mc = M(TG67, [
  ['You must miss your meeting. You say:', ['I need to reschedule.', 'See you there.', 'It starts now.'], 0, 'عذرتك: أحتاج إعادة الجدولة.', 2],
  ['"Fully booked" means…', ['no more times available', 'the books are heavy', 'it is cheap'], 0, 'لا توجد مواعيد متاحة.', 2],
  ['Complete: "Something ___ came up."', ['urgent', 'easy', 'empty'], 0, 'طرأ أمر عاجل.', 2],
  ['The receptionist says "Please take a seat." You…', ['sit and wait', 'leave', 'pay now'], 0, 'تجلس وتنتظر.', 1],
  ['Which asks about free times?', ['Do you have any availability?', 'What is your name?', 'Where is the door?'], 0, 'هل لديكم مواعيد متاحة؟', 1],
  ['"The appointment lasts thirty minutes" tells you the…', ['duration', 'price', 'address'], 0, 'المدة.', 1],
]);

/* ============================================================
   068 Invitations & Plans (A2)
   ============================================================ */
const TG68 = ['conversation', 'invitations'];
const l68Lt = T(TG68, [
  ['Would you like to come to my party?', 'هل تود المجيء إلى حفلي؟', 2],
  ['I would love to!', 'سأفعل ذلك بكل سرور!', 2],
  ['Are you free on Saturday?', 'هل أنت متاح السبت؟', 2],
  ['What are you doing tonight?', 'ماذا ستفعل الليلة؟', 2],
  ['Nothing special, why?', 'لا شيء مميز، لماذا؟', 2],
  ['We are having a barbecue. Join us!', 'سنقيم حفلة شواء. انضم إلينا!', 2],
  ['Sounds great! What time?', 'يبدو رائعا! في أي وقت؟', 2],
  ['Come around seven.', 'تعال نحو السابعة.', 2],
  ['Can I bring anything?', 'هل أحضر شيئا؟', 2],
  ['Just bring yourself!', 'أحضر نفسك فقط!', 2],
  ['I am afraid I cannot make it.', 'أخشى ألا أستطيع الحضور.', 2],
  ['Next time, maybe.', 'المرة القادمة، ربما.', 2],
  ['Let me check my calendar.', 'دعني أتحقق من جدولي.', 2],
  ['Saturday is perfect for me.', 'السبت مناسب تماما لي.', 2],
  ['Where should we meet?', 'أين نلتقي؟', 2],
  ['Let us meet in front of the cinema.', 'لنلتقِ أمام السينما.', 2],
  ['Do not be late!', 'لا تتأخر!', 2],
  ['I will be there on time.', 'سأكون هناك في الوقت المحدد.', 2],
  ['It is a surprise party for Noura.', 'إنها حفلة مفاجئة لنورة.', 2],
  ['Keep it a secret!', 'احفظ السر!', 2],
  ['How many people are coming?', 'كم شخصا سيأتون؟', 2],
  ['About twenty guests.', 'نحو عشرين ضيفا.', 2],
  ['The party starts at eight.', 'تبدأ الحفلة في الثامنة.', 2],
  ['Feel free to bring your family.', 'لا تتردد في إحضار عائلتك.', 2],
  ['Thanks for the invitation!', 'شكرا على الدعوة!', 2],
  ['Thanks for inviting me.', 'شكرا لدعوتي.', 2],
  ['We are planning a picnic on Friday.', 'نخطط لرحلة يوم الجمعة.', 2],
  ['Count me in!', 'احسبني من الحضور!', 2],
  ['I might be a little late.', 'قدأتأخر قليلا.', 2],
  ['The invitation says seven sharp.', 'الدعوة تقول السابعة تماما.', 2],
  ['What should I wear?', 'ماذا ألبس؟', 2],
  ['It is casual, jeans are fine.', 'اللبس عادي، الجينز مناسب.', 2],
  ['Can we make it Sunday instead?', 'هل نجعلها الأحد بدلا من ذلك؟', 2],
  ['Perfect, see you Sunday then.', 'ممتاز، أراك الأحد إذن.', 2],
  ['I would not miss it for the world.', 'لن أفوته لأي شيء.', 2],
  ['Sorry, I already have plans.', 'عفوا، لدي خطط بالفعل.', 2],
  ['Let us do it another day.', 'لنفعلها يوما آخر.', 2],
]);
const l68Fills = [
  ff(TG68, 'invitation', 'Thanks for the invitation!', 'شكرا على الدعوة!'),
  ff(TG68, 'barbecue', 'We are having a barbecue. Join us!', 'سنقيم حفلة شواء. انضم إلينا!'),
  ff(TG68, 'calendar', 'Let me check my calendar.', 'دعني أتحقق من جدولي.'),
  ff(TG68, 'surprise', 'It is a surprise party for Noura.', 'إنها حفلة مفاجئة لنورة.'),
  ff(TG68, 'picnic', 'We are planning a picnic on Friday.', 'نخطط لرحلة يوم الجمعة.'),
  ff(TG68, 'casual', 'It is casual, jeans are fine.', 'اللبس عادي، الجينز مناسب.'),
  ff(TG68, 'make it', 'Can we make it Sunday instead?', 'هل نجعلها الأحد بدلا من ذلك؟'),
  ff(TG68, 'plans', 'Sorry, I already have plans.', 'عفوا، لدي خطط بالفعل.'),
];
const l68Orders = O(TG68, [
  ['Are you free on Saturday?', 'هل أنت متاح السبت؟'],
  ['I would love to!', 'سأفعل ذلك بكل سرور!'],
  ['Where should we meet?', 'أين نلتقي؟'],
  ['Thanks for inviting me.', 'شكرا لدعوتي.'],
  ['Count me in!', 'احسبني من الحضور!'],
  ['Sorry, I already have plans.', 'عفوا، لدي خطط بالفعل.'],
]);
const l68Mc = M(TG68, [
  ['"I cannot make it" means…', ['I cannot come', 'I cannot build it', 'I am angry'], 0, 'لا أستطيع الحضور.', 1],
  ['"Count me in" means…', ['include me', 'count the money', 'count again'], 0, 'أدرجني ضمن الحضور.', 1],
  ['A polite refusal is…', ['I am afraid I cannot make it.', 'No way!', 'Never.'], 0, 'أخشى ألا أستطيع الحضور.', 2],
  ['"Come around seven" means…', ['arrive at about seven', 'go around the house', 'leave at seven'], 0, 'تعال نحو السابعة.', 1],
  ['"Seven sharp" means…', ['exactly seven', 'seven roughly', 'after seven'], 0, 'السابعة تماما.', 2],
  ['Complete: "Feel ___ to bring your family."', ['free', 'fine', 'full'], 0, 'لا تتردد في إحضار عائلتك.', 1],
]);

/* ============================================================
   069 Opinions & Preferences (B1)
   ============================================================ */
const TG69 = ['conversation', 'opinions'];
const l69Lt = T(TG69, [
  ['What do you think about this movie?', 'ما رأيك في هذا الفيلم؟', 2],
  ['In my opinion, it is excellent.', 'برأيي، إنه ممتاز.', 2],
  ['I think it is overrated.', 'أعتقد أنه مبالغ في تقديره.', 2],
  ['I really enjoyed it.', 'استمتعت به حقا.', 2],
  ['To be honest, I did not like it.', 'بصراحة، لم يعجبني.', 2],
  ['What is your favorite food?', 'ما طعامك المفضل؟', 2],
  ['I prefer tea to coffee.', 'أفضل الشاي على القهوة.', 2],
  ['I would rather stay home tonight.', 'أفضل البقاء في البيت الليلة.', 2],
  ['Which one do you like better?', 'أيهما تعجبك أكثر؟', 2],
  ['I like both, to be honest.', 'أحب كليهما بصراحة.', 2],
  ['For me, the blue one is nicer.', 'بالنسبة لي، الأزرق أجمل.', 2],
  ['I am not a big fan of horror movies.', 'لست من عشاق أفلام الرعب.', 2],
  ['It depends on my mood.', 'يتوقف على مزاجي.', 2],
  ['I would say it is worth watching.', 'أقول إنه يستحق المشاهدة.', 2],
  ['What about you?', 'وأنت ما رأيك؟', 2],
  ['I could not agree more.', 'أوافقك تماما.', 2],
  ['That is a good point.', 'هذه نقطة جيدة.', 2],
  ['I see it differently.', 'أرى الأمر بشكل مختلف.', 2],
  ['Honestly, I am not sure.', 'بصراحة، لست متأكدا.', 2],
  ['The ending was disappointing.', 'كانت النهاية مخيبة للآمال.', 2],
  ['The best thing about it is the music.', 'أفضل شيء فيه هو الموسيقى.', 2],
  ['I love reading before bed.', 'أحب القراءة قبل النوم.', 2],
  ['My favorite season is autumn.', 'موسمي المفضل هو الخريف.', 2],
  ['I cannot stand loud places.', 'لا أحتمل الأماكن الصاخبة.', 2],
  ['Coffee wakes me up in the morning.', 'القهوة توقظني في الصباح.', 2],
  ['Between us, this cafe is the best in town.', 'بيننا، هذا المقهى الأفضل في المدينة.', 2],
  ['I used to hate vegetables, but not now.', 'كنت أكره الخضار، لكن ليس الآن.', 2],
  ['If you ask me, the first option is better.', 'إن سألتني، الخيار الأول أفضل.', 2],
  ['It is not really my taste.', 'ليس من ذوقي حقا.', 2],
  ['That sounds interesting to me.', 'يبدو ذلك مثيرا للاهتمام بالنسبة لي.', 2],
  ['I am keen on old movies.', 'مولع بالأفلام القديمة.', 2],
  ['Honestly, either option works for me.', 'بصراحة، كلا الخيارين يناسبني.', 2],
  ['My preference is the window seat.', 'أفضلي هو مقعد النافذة.', 2],
  ['Nothing beats a home-cooked meal.', 'لا شيء يضاهى وجبة منزلية.', 2],
  ['I find this topic fascinating.', 'أجد هذا الموضوع رائعا.', 2],
  ['Some people love it; others hate it.', 'البعض يحبه؛ وآخرون يكرهونه.', 2],
  ['In my view, the price is too high.', 'من وجهة نظري، السعر مرتفع جدا.', 2],
]);
const l69Fills = [
  ff(TG69, 'opinion', 'In my opinion, it is excellent.', 'برأيي، إنه ممتاز.'),
  ff(TG69, 'prefer', 'I prefer tea to coffee.', 'أفضل الشاي على القهوة.'),
  ff(TG69, 'rather', 'I would rather stay home tonight.', 'أفضل البقاء في البيت الليلة.'),
  ff(TG69, 'fan', 'I am not a big fan of horror movies.', 'لست من عشاق أفلام الرعب.'),
  ff(TG69, 'mood', 'It depends on my mood.', 'يتوقف على مزاجي.'),
  ff(TG69, 'disappointing', 'The ending was disappointing.', 'كانت النهاية مخيبة للآمال.'),
  ff(TG69, 'keen', 'I am keen on old movies.', 'مولع بالأفلام القديمة.'),
  ff(TG69, 'stand', 'I cannot stand loud places.', 'لا أحتمل الأماكن الصاخبة.'),
];
const l69Orders = O(TG69, [
  ['What do you think about it?', 'ما رأيك فيه؟'],
  ['In my opinion, it is excellent.', 'برأيي، إنه ممتاز.'],
  ['I prefer tea to coffee.', 'أفضل الشاي على القهوة.'],
  ['I could not agree more.', 'أوافقك تماما.'],
  ['I see it differently.', 'أرى الأمر بشكل مختلف.'],
  ['What about you?', 'وأنت ما رأيك؟'],
]);
const l69Mc = M(TG69, [
  ['"I could not agree more" means…', ['I totally agree', 'I disagree', 'I am confused'], 0, 'أوافقك تماما.', 1],
  ['"It is overrated" means it is…', ['less good than people say', 'very bad', 'free'], 0, 'أقل جودة مما يقوله الناس.', 2],
  ['Which expresses preference?', ['I would rather stay home.', 'I stayed home.', 'Go home.'], 0, 'أفضل البقاء في البيت.', 1],
  ['"To be honest" introduces…', ['a frank opinion', 'a lie', 'a command'], 0, 'رأيا صريحا.', 1],
  ['"It depends on my mood" means…', ['my choice changes with my feelings', 'I have no mood', 'mood is a city'], 0, 'اختياري يتغير حسب شعوري.', 2],
  ['Complete: "I am not a big ___ of rap."', ['fan', 'fun', 'fine'], 0, 'لست من عشاق الراب.', 1],
]);

/* ============================================================
   070 Agreeing & Disagreeing Politely (B1)
   ============================================================ */
const TG70 = ['conversation', 'agreement'];
const l70Lt = T(TG70, [
  ['I agree with you completely.', 'أوافقك تماما.', 2],
  ['That is exactly what I think.', 'هذا بالضبط ما أعتقده.', 2],
  ['You have a point there.', 'كلامك وجيه.', 2],
  ['I feel the same way.', 'أشعر بالطريقة نفسها.', 2],
  ['That is true, actually.', 'هذا صحيح في الواقع.', 2],
  ['Good point, well made.', 'نقطة جيدة، مقالة جيدا.', 2],
  ['I see your point, but…', 'أفهم وجهة نظرك، لكن…', 2],
  ['I am not sure I agree.', 'لست متأكدا أنني أوافق.', 2],
  ['I am afraid I see it differently.', 'أخشى أنني أرى الأمر بشكل مختلف.', 2],
  ['That may be true, but…', 'قد يكون ذلك صحيحا، لكن…', 2],
  ['Let us agree to disagree.', 'لنتفق على الاختلاف.', 2],
  ['I respect your opinion.', 'أحترم رأيك.', 2],
  ['You could be right.', 'قد تكون محقا.', 2],
  ['On the other hand, it costs more.', 'من ناحية أخرى، كلفته أكبر.', 2],
  ['That is a fair point.', 'إنها نقطة عادلة.', 2],
  ['Absolutely!', 'بالتأكيد!', 2],
  ['Exactly my thoughts.', 'خواطري بالضبط.', 2],
  ['I could not disagree more.', 'لا أوافق أبدا.', 2],
  ['Let us look at both sides.', 'لننظر إلى الجانبين.', 2],
  ['There is some truth in that.', 'هناك شيء من الحقيقة في ذلك.', 2],
  ['I am with you on this one.', 'أنا معك في هذه النقطة.', 2],
  ['Honestly, I have doubts about that.', 'بصراحة، لدي شكوك حول ذلك.', 2],
  ['That does not convince me.', 'هذا لا يقنعني.', 2],
  ['Fair enough, you win this round.', 'حسنا، أنت من يفوز هذه الجولة.', 2],
  ['Can we find a middle ground?', 'هل يمكننا إيجاد حل وسط؟', 2],
  ['I partly agree with you.', 'أوافقك جزئيا.', 2],
  ['That is one way to look at it.', 'إنها إحدى طرق النظر إليها.', 2],
  ['I hear you, but consider the cost.', 'أسمعك، لكن فكر في التكلفة.', 2],
  ['No offense, but I disagree.', 'بلا إساءة، لكني أخالفك.', 2],
  ['We are on the same page.', 'نحن على الاتفاق نفسه.', 2],
  ['Let me play devil\u2019s advocate here.', 'دعني أطرح الرأي المعاكس هنا.', 2],
  ['That argument does not hold up.', 'هذه الحجة لا تصمد.', 2],
  ['You make a strong case.', 'تقدم حجة قوية.', 2],
  ['Interesting idea, but risky.', 'فكرة مثيرة، لكنها محفوفة بالمخاطر.', 2],
  ['I would not go that far.', 'لن أذهب إلى هذا الحد.', 2],
  ['In a way, you are right.', 'بطريقة ما، أنت محق.', 2],
  ['We will have to disagree on this.', 'سنتختلف في هذه المسألة.', 2],
]);
const l70Fills = [
  ff(TG70, 'point', 'You have a point there.', 'كلامك وجيه.'),
  ff(TG70, 'differently', 'I am afraid I see it differently.', 'أخشى أنني أرى الأمر بشكل مختلف.'),
  ff(TG70, 'disagree', 'Let us agree to disagree.', 'لنتفق على الاختلاف.'),
  ff(TG70, 'respect', 'I respect your opinion.', 'أحترم رأيك.'),
  ff(TG70, 'middle', 'Can we find a middle ground?', 'هل يمكننا إيجاد حل وسط؟'),
  ff(TG70, 'partly', 'I partly agree with you.', 'أوافقك جزئيا.'),
  ff(TG70, 'convince', 'That does not convince me.', 'هذا لا يقنعني.'),
  ff(TG70, 'page', 'We are on the same page.', 'نحن على الاتفاق نفسه.'),
];
const l70Orders = O(TG70, [
  ['I agree with you completely.', 'أوافقك تماما.'],
  ['You have a point there.', 'كلامك وجيه.'],
  ['I see your point, but…', 'أفهم وجهة نظرك، لكن…'],
  ['Let us agree to disagree.', 'لنتفق على الاختلاف.'],
  ['Can we find a middle ground?', 'هل يمكننا إيجاد حل وسط؟'],
  ['I respect your opinion.', 'أحترم رأيك.'],
]);
const l70Mc = M(TG70, [
  ['"We are on the same page" means…', ['we agree', 'we read books', 'we are lost'], 0, 'نتفق.', 2],
  ['A POLITE disagreement is…', ['I am afraid I see it differently.', 'You are wrong!', 'Nonsense.'], 0, 'أخشى أنني أرى الأمر بشكل مختلف.', 2],
  ['"Let us agree to disagree" ends an…', ['argument politely', 'email', 'order'], 0, 'ينهي جدالا بأدب.', 2],
  ['"On the other hand" introduces…', ['the opposite side', 'a hand', 'a bus'], 0, 'الجانب المقابل.', 1],
  ['"I could not disagree more" means…', ['total disagreement', 'total agreement', 'mild doubt'], 0, 'خلاف تام.', 2],
  ['Complete: "You ___ a point."', ['have', 'do', 'make a'], 0, 'كلامك وجيه.', 1],
]);

/* ============================================================
   071 Talking About the Weather (A1)
   ============================================================ */
const TG71 = ['conversation', 'weather'];
const l71Lt = T(TG71, [
  ['It is a beautiful day today.', 'إنه يوم جميل اليوم.', 1],
  ['The weather is lovely.', 'الجو رائع.', 1],
  ['It is very hot today.', 'الجو حار جدا اليوم.', 1],
  ['It is cold outside.', 'الجو بارد في الخارج.', 1],
  ['It is raining again.', 'إنها تمطر مرة أخرى.', 1],
  ['Take an umbrella with you.', 'خذ مظلة معك.', 1],
  ['It is snowing heavily.', 'إنها تثلج بكثافة.', 1],
  ['The wind is strong today.', 'الريح قوية اليوم.', 1],
  ['What is the weather like?', 'كيف الجو؟', 1],
  ['It is sunny and warm.', 'الجو مشمس ودافئ.', 1],
  ['It looks like rain.', 'يبدو أن المطر قادم.', 1],
  ['The sky is cloudy.', 'السماء غائمة.', 1],
  ['It is freezing this morning.', 'الجو متجمد هذا الصباح.', 1],
  ['I love rainy days.', 'أحب الأيام الممطرة.', 1],
  ['Summer here is very humid.', 'الصيف هنا رطب جدا.', 1],
  ['Winter is mild in this city.', 'الشتاء معتدل في هذه المدينة.', 1],
  ['What a nice breeze!', 'يا له من نسمة جميلة!', 1],
  ['The sun is very strong at noon.', 'الشمس قوية جدا ظهرا.', 1],
  ['It is getting dark; a storm is coming.', 'الجو يظلم؛ عاصفة قادمة.', 1],
  ['I hope it does not rain tomorrow.', 'آمل ألا تمطر غدا.', 1],
  ['The forecast says it will be sunny.', 'يتنبأ الطقس بأنها ستكون مشمسة.', 1],
  ['It rained all night.', 'أمطرت طوال الليل.', 1],
  ['The roads are wet.', 'الطرق مبتلة.', 1],
  ['Let us stay inside; it is too hot.', 'لنابقى في الداخل؛ الجو حار جدا.', 1],
  ['Autumn is my favorite season.', 'الخريف موسمي المفضل.', 1],
  ['It is warmer than yesterday.', 'الجو أدفأ من الأمس.', 1],
  ['There is a light rain outside.', 'هناك مطر خفيف في الخارج.', 1],
  ['The temperature is thirty degrees.', 'درجة الحرارة ثلاثون درجة.', 1],
  ['It rarely snows here.', 'نادرا ما تثلج هنا.', 1],
  ['What a terrible storm last night!', 'يا لعاصفة مروعة الليلة الماضية!', 1],
  ['The fog is thick this morning.', 'الضباب كثيف هذا الصباح.', 1],
  ['Spring is mild and green here.', 'الربيع معتدل وأخضر هنا.', 1],
  ['Do not forget your jacket.', 'لا تنس سترتك.', 1],
  ['It cleared up in the afternoon.', 'صفا الجو بعد الظهر.', 1],
  ['The heat is unbearable today.', 'الحرارة لا تحتمل اليوم.', 1],
  ['A cool wind is blowing from the sea.', 'تهب ريح باردة من البحر.', 1],
  ['Perfect weather for a walk.', 'جو مثالي للمشي.', 1],
]);
const l71Fills = [
  ff(TG71, 'umbrella', 'Take an umbrella with you.', 'خذ مظلة معك.'),
  ff(TG71, 'forecast', 'The forecast says it will be sunny.', 'يتنبأ الطقس بأنها ستكون مشمسة.'),
  ff(TG71, 'freezing', 'It is freezing this morning.', 'الجو متجمد هذا الصباح.'),
  ff(TG71, 'humid', 'Summer here is very humid.', 'الصيف هنا رطب جدا.'),
  ff(TG71, 'fog', 'The fog is thick this morning.', 'الضباب كثيف هذا الصباح.'),
  ff(TG71, 'storm', 'A storm is coming.', 'عاصفة قادمة.'),
  ff(TG71, 'breeze', 'What a nice breeze!', 'يا له من نسمة جميلة!'),
  ff(TG71, 'temperature', 'The temperature is thirty degrees.', 'درجة الحرارة ثلاثون درجة.'),
];
const l71Orders = O(TG71, [
  ['What is the weather like?', 'كيف الجو؟'],
  ['It is sunny and warm.', 'الجو مشمس ودافئ.'],
  ['It is raining again.', 'إنها تمطر مرة أخرى.'],
  ['Take an umbrella with you.', 'خذ مظلة معك.'],
  ['The sky is cloudy.', 'السماء غائمة.'],
  ['It is colder today.', 'الجو أبرد اليوم.'],
]);
const l71Mc = M(TG71, [
  ['"It is freezing" means it is…', ['very cold', 'very hot', 'funny'], 0, 'بارد جدا.', 1],
  ['You need an umbrella when it…', ['rains', 'snows lightly', 'is sunny'], 0, 'تمطر.', 1],
  ['"Humid" air feels…', ['wet and heavy', 'dry and cool', 'frozen'], 0, 'مبتلا وثقيلا.', 2],
  ['Which asks about weather?', ['What is the weather like?', 'What time is it?', 'Who is that?'], 0, 'كيف الجو؟', 1],
  ['"The forecast says…" reports…', ['expected weather', 'old news', 'prices'], 0, 'حالة الطقس المتوقعة.', 1],
  ['Complete: "It looks ___ rain."', ['like', 'love', 'at'], 0, 'يبدو أن المطر قادم.', 1],
]);

/* ============================================================
   072 Everyday Conversation Review (A2)
   ============================================================ */
const TG72 = ['conversation', 'review'];
const l72Lt = T(TG72, [
  ['Long time no see! How have you been?', 'لم أرك منذ زمن! كيف حالك؟', 2],
  ['I have been great, thanks. And you?', 'كنت بخير، شكرا. وأنت؟', 2],
  ['What have you been up to lately?', 'ماذا كنت تفعل مؤخرا؟', 2],
  ['Just working and studying.', 'فقط العمل والدراسة.', 2],
  ['Are you doing anything this weekend?', 'هل ستفعل شيئا عطلة نهاية هذا الأسبوع؟', 2],
  ['Not much. Do you have an idea?', 'لا شيء كثير. هل لديك فكرة؟', 2],
  ['How about a movie on Friday?', 'ما رأيك بفيلم يوم الجمعة؟', 2],
  ['That sounds like a plan!', 'تبدو خطة جيدة!', 2],
  ['Let me know the time and place.', 'أخبرني بالوقت والمكان.', 2],
  ['I will text you the details.', 'سأرسل لك التفاصيل.', 2],
  ['By the way, how is your family?', 'بالمناسبة، كيف حال عائلتك؟', 2],
  ['They are all doing well, thank you.', 'كلهم بخير، شكرا.', 2],
  ['Send them my regards.', 'ابلغهم تحياتي.', 2],
  ['I will, for sure.', 'سأفعل بالتأكيد.', 2],
  ['It was great catching up with you.', 'كان رائعا أن أتحدث معك.', 2],
  ['Likewise! Let us not wait so long next time.', 'وكذلك! فليكن اللقاء أقرب المرة القادمة.', 2],
  ['Take care of yourself.', 'اعتن بنفسك.', 2],
  ['You too. Safe travels!', 'وأنت أيضا. رحلة آمنة!', 2],
  ['Could you say that again, please?', 'هل يمكن أن تقولها مرة أخرى؟', 2],
  ['Sorry, I did not catch that.', 'عفوا، لم أفهم ما قلته.', 2],
  ['What do you mean?', 'ماذا تقصد؟', 2],
  ['I mean the meeting moved to Monday.', 'أعني أن الاجتماع نُقل إلى الاثنين.', 2],
  ['Got it, thanks for explaining.', 'فهمت، شكرا على التوضيح.', 2],
  ['Is everything okay?', 'هل كل شيء بخير؟', 2],
  ['Yes, everything is fine.', 'نعم، كل شيء على ما يرام.', 2],
  ['Do you need a hand with that?', 'هل تحتاج مساعدة في ذلك؟', 2],
  ['That would be great, thanks.', 'سيكون ذلك رائعا، شكرا.', 2],
  ['No worries, it is my pleasure.', 'لا بأس، هذا من دواعي سروري.', 2],
  ['Anyway, I should get going.', 'على أي حال، عليّ الذهاب.', 2],
  ['It is getting late.', 'الوقت يتأخر.', 2],
  ['Let us catch up again soon.', 'لنلتقِ مرة أخرى قريبا.', 2],
  ['Definitely. Same time next week?', 'بالتأكيد. الوقت نفسه الأسبوع القادم؟', 2],
  ['Works for me. See you then!', 'يناسبني. أراك حينها!', 2],
  ['Have a wonderful day!', 'أتمنى لك يوما رائعا!', 2],
  ['You made my day.', 'أسعدت يومي.', 2],
  ['It is always a pleasure talking to you.', 'من دواعي سروري دائما التحدث معك.', 2],
  ['Good luck with the new job!', 'حظا موفقا في العمل الجديد!', 2],
]);
const l72Fills = [
  ff(TG72, 'catching up', 'It was great catching up with you.', 'كان رائعا أن أتحدث معك.'),
  ff(TG72, 'regards', 'Send them my regards.', 'ابلغهم تحياتي.'),
  ff(TG72, 'details', 'I will text you the details.', 'سأرسل لك التفاصيل.'),
  ff(TG72, 'catch', 'Sorry, I did not catch that.', 'عفوا، لم أفهم ما قلته.'),
  ff(TG72, 'hand', 'Do you need a hand with that?', 'هل تحتاج مساعدة في ذلك؟'),
  ff(TG72, 'going', 'Anyway, I should get going.', 'على أي حال، عليّ الذهاب.'),
  ff(TG72, 'pleasure', 'It is my pleasure.', 'هذا من دواعي سروري.'),
  ff(TG72, 'luck', 'Good luck with the new job!', 'حظا موفقا في العمل الجديد!'),
];
const l72Orders = O(TG72, [
  ['Long time no see!', 'لم أرك منذ زمن!'],
  ['It was great catching up with you.', 'كان رائعا أن أتحدث معك.'],
  ['Sorry, I did not catch that.', 'عفوا، لم أفهم ما قلته.'],
  ['Do you need a hand with that?', 'هل تحتاج مساعدة في ذلك؟'],
  ['Let us catch up again soon.', 'لنلتقِ مرة أخرى قريبا.'],
  ['Take care of yourself.', 'اعتن بنفسك.'],
]);
const l72Mc = M(TG72, [
  ['"Long time no see" is said when…', ['you meet someone after a while', 'you are lost', 'you are late'], 0, 'تقال عند لقاء شخص بعد مدة.', 1],
  ['"I did not catch that" asks for…', ['repetition', 'money', 'a ticket'], 0, 'إعادة الكلام.', 1],
  ['"I should get going" means…', ['I have to leave', 'I will buy shoes', 'I am angry'], 0, 'عليّ المغادرة.', 1],
  ['"Send them my regards" means…', ['say hello for me', 'post a letter', 'pay them'], 0, 'ابلغهم تحياتي.', 2],
  ['"Need a hand?" offers…', ['help', 'a hand shake', 'money'], 0, 'المساعدة.', 1],
  ['"You made my day" expresses…', ['gratitude and joy', 'anger', 'hunger'], 0, 'الامتنان والفرح.', 2],
]);

/* ============================================================
   Lesson metadata + configs (053–072)
   ============================================================ */

/* top-up pools so every lesson has 40+ fresh pairs after cross-lesson dedup */
const X67 = T(TG67, [
  ['I am afraid I must cancel.', 'أخشى أنني مضطر للإلغاء.', 2],
  ['The doctor is running late today.', 'الطبيب متأخر اليوم.', 2],
  ['How long is the waiting list?', 'كم طول قائمة الانتظار؟', 2],
  ['I prefer an early slot.', 'أفضل موعدا مبكرا.', 2],
  ['We moved your visit to Wednesday.', 'نقلنا زيارتك إلى الأربعاء.', 2],
]);
const X68 = T(TG68, [
  ['Are you coming to the wedding?', 'هل ستأتي إلى الزفاف؟', 2],
  ['Would Friday evening suit you?', 'هل مساء الجمعة يناسبك؟', 2],
  ['It is going to be so much fun.', 'ستكون ممتعة جدا.', 2],
  ['Bring your sister along!', 'أحضر أختك معك!', 2],
  ['Let me know if anything changes.', 'أخبرني إذا تغير أي شيء.', 2],
]);
const X69 = T(TG69, [
  ['My favorite place is the old library.', 'مكاناي المفضل هو المكتبة القديمة.', 2],
  ['I would choose the window seat.', 'سأختار مقعد النافذة.', 2],
  ['Honestly, the second option feels better.', 'بصراحة، الخيار الثاني يبدو أفضل.', 2],
  ['I am crazy about football.', 'مجنون بكرة القدم.', 2],
  ['What matters most is the story.', 'الأهم هو القصة.', 2],
]);
const X70 = T(TG70, [
  ['I think you are absolutely right.', 'أعتقد أنك محق تماما.', 2],
  ['Let us hear another opinion.', 'لنسمع رأيا آخر.', 2],
  ['That is not how I see it.', 'هذه ليست طريقة رؤيتي للأمر.', 2],
  ['Your idea has real value.', 'فكرتك لها قيمة حقيقية.', 2],
  ['Let us park this for now.', 'لنؤجل هذه النقطة الآن.', 2],
]);
const X71 = T(TG71, [
  ['The rain stopped an hour ago.', 'توقفت الأمطار قبل ساعة.', 1],
  ['It is warmer inside.', 'الجو أدفأ في الداخل.', 1],
  ['Winter nights are very cold here.', 'ليالي الشتاء باردة جدا هنا.', 1],
  ['The clouds look heavy.', 'السحب تبدو ثقيلة.', 1],
  ['A hot drink sounds perfect now.', 'مشروب ساخن يبدو مثاليا الآن.', 1],
]);
const X72 = T(TG72, [
  ['How was your trip?', 'كيف كانت رحلتك؟', 2],
  ['Everything went smoothly, thanks.', 'سار كل شيء بسلاسة، شكرا.', 2],
  ['Tell me all about it later.', 'أخبرني بكل شيء لاحقا.', 2],
  ['I really enjoyed our talk.', 'استمتعت بحديثنا حقا.', 2],
  ['Mind the step!', 'انتبه للدرجة!', 1],
]);

/* safety pool: distinct top-ups for whichever lesson falls short */
const CONV_SAFETY = T(['conversation', 'review'], [["Sorry, could you say that again?","عفوا، هل تعيد الكلام؟",2],["What do you usually do in the evening?","ماذا تفعل عادة في المساء؟",2],["That sounds like fun.","يبدو ذلك ممتعا.",2],["I completely forgot about it.","نسيت الأمر تماما.",2],["Let us talk about it tomorrow.","لنتحدث عن ذلك غدا.",2],["How was your day at work?","كيف كان يومك في العمل؟",2],["I am glad you could come.","يسعدني أنك استطعت المجيء.",2],["Please give my best to your family.","من فضلك بلغ عائلتك أطيب التحيات.",2],["It was nice talking with you.","كان لطيفا التحدث معك.",2],["See you at the usual place.","أراك في المكان المعتاد.",2],["I need to think it over.","أحتاج أن أفكر في الأمر جيدا.",2],["That works perfectly for me.","هذا يناسبني تماما.",2],["Are you doing anything special today?","هل تفعل شيئا مميزا اليوم؟",2],["Let me grab my coat.","دعني آخذ معطفي.",1],["We should do this more often.","ينبغي أن نفعل هذا كثيرا.",2],["It is getting dark outside.","الجو يظلم في الخارج.",1],["Thanks a lot for your help.","شكرا جزيلا على مساعدتك.",1],["No rush, take your time.","لا استعجال، خذ وقتك.",2],["I totally understand you.","أتفهمك تماما.",2],["Have a good one!","أتمنى لك يوما سعيدا!",1]]);

const GRAM = {
  l53: { explanation: 'Greetings change with the time of day: Good morning, Good afternoon, Good evening. When you meet someone new, say "Nice to meet you" and reply "Nice to meet you too". Common openers are What is your name?, Where are you from? and What do you do? Keep answers short and friendly.', explanationAr: 'تتغير التحيات حسب وقت اليوم: صباح الخير، مساء الخير. عند مقابلة شخص جديد قل "Nice to meet you" وردّ بـ "Nice to meet you too". ومن المقدمات الشائعة: ما اسمك؟ من أين أنت؟ ما عملك؟ اجعل إجاباتك قصيرة وودية.', examples: [{ en: 'Hi, I am Sara.', ar: 'مرحبا، أنا سارة.' }, { en: 'Nice to meet you too.', ar: 'تشرفت بمعرفتك أيضا.' }, { en: 'Where are you from?', ar: 'من أين أنت؟' }] },
  l54: { explanation: 'Small talk keeps conversations friendly without deep topics. Safe subjects: the weather, the weekend, hobbies and light news. Use open questions (How was your weekend?) and short reactions (Really? Nice!). Smile, and mirror the other person\u2019s energy.', explanationAr: 'الدردشة القصيرة تحافظ على ودية الحوار دون مواضيع عميقة. المواضيع الآمنة: الطقس وعطلة نهاية الأسبوع والهوايات والأخبار الخفيفة. استخدم أسئلة مفتوحة (How was your weekend?) وتعليقات قصيرة (Really? Nice!). وابتسم ورافق مزاج خصمك.', examples: [{ en: 'How was your weekend?', ar: 'كيف كانت عطلتك؟' }, { en: 'It was relaxing, thanks.', ar: 'كانت مريحة، شكرا.' }, { en: 'Any plans for today?', ar: 'أي خطط لليوم؟' }] },
  l55: { explanation: 'Family words: father, mother, brother, sister, son, daughter, uncle, aunt, cousin, grandparents. Use my/our before them: my older brother. Ask How many brothers and sisters do you have? and answer with I have… or There are… in my family.', explanationAr: 'مفردات العائلة: أب، أم، أخ، أخت، ابن، ابنة، عم، عمة، ابن عم، الجدان. نستخدم my/our قبلها: أخي الأكبر. واسأل: كم أخا وأختا لديك؟ وأجب بـ I have… أو There are… في عائلتي.', examples: [{ en: 'I have two sisters.', ar: 'لدي أختان.' }, { en: 'My grandmother lives with us.', ar: 'جدتي تعيش معنا.' }, { en: 'We are a big family.', ar: 'نحن عائلة كبيرة.' }] },
  l56: { explanation: 'Talk about friends with like + noun or verb-ing: I like watching movies with my friends. Use together for shared activities: We play football together. Describe people: He is funny and kind. Arrange plans: Are you free tomorrow?', explanationAr: 'تحدث عن الأصدقاء بـ like + اسم أو فعل + ing: أحب مشاهدة الأفلام مع أصدقائي. واستخدم together للأنشطة المشتركة: نلعب كرة القدم معا. وصف الأشخاص: هو مضحك ولطيف. وترتيب الخطط: هل أنت متاح غدا؟', examples: [{ en: 'We play chess together.', ar: 'نلعب الشطرنج معا.' }, { en: 'My best friend is very funny.', ar: 'أفضل أصدقائي مضحك جدا.' }, { en: 'Are you free tomorrow?', ar: 'هل أنت متاح غدا؟' }] },
  l57: { explanation: 'Clothes shopping language: Can I try this on?, It does not fit, Do you have a bigger size? Sizes: small, medium, large. Say what you want politely with Could I…? and describe with adjectives: a long blue skirt, tight shoes.', explanationAr: 'لغة التسوق للملابس: هل يمكنني تجربة هذا؟، هذا لا يناسب مقاسي، هل لديك مقاس أكبر؟ المقاسات: صغير، وسط، كبير. اطلب بأدب بـ Could I…؟ وصِف بالصفات: تنورة زرقاء طويلة، حذاء ضيق.', examples: [{ en: 'Can I try this on?', ar: 'هل يمكنني تجربة هذا؟' }, { en: 'Do you have a bigger size?', ar: 'هل لديك مقاس أكبر؟' }, { en: 'It fits perfectly.', ar: 'يناسبني تماما.' }] },
  l58: { explanation: 'Prices use How much is/are…? Answer with It is/They are + amount: It is ten pounds. Numbers before nouns stay singular: a five-pound note, two ten-pound books. Bargaining phrases: Is there any discount?, Can you make it cheaper?', explanationAr: 'الأسعار تُسأل بـ How much is/are…؟ وتجاب بـ It is/They are + المبلغ: إنه بعشرة جنيهات. تبقى الأعداد قبل الاسم مفردة: ورقة خمسة جنيهات. وعبارات المساومة: هل من خصم؟ هل يمكن أن تخفض السعر؟', examples: [{ en: 'How much is this bag?', ar: 'بكم هذه الحقيبة؟' }, { en: 'It is on sale.', ar: 'إنها بتخفيض.' }, { en: 'Can you make it cheaper?', ar: 'هل يمكنك تخفيض السعر؟' }] },
  l59: { explanation: 'Groceries: buy at the market or supermarket. Quantities matter for uncountables: a kilo of rice, a bottle of oil, a loaf of bread, a box of eggs. Ask Do you have fresh…? and Is this ripe?', explanationAr: 'البقالة: نشتري من السوق أو المتجر. الكميات مهمة مع غير المعدود: كيلو أرز، زجاجة زيت، رغيف خبز، علبة بيض. واسأل: هل لديكم طازج؟ هل هذا ناضج؟', examples: [{ en: 'A kilo of rice, please.', ar: 'كيلو أرز، من فضلك.' }, { en: 'Is this bread fresh?', ar: 'هل هذا الخبز طازج؟' }, { en: 'That will be twelve pounds.', ar: 'المجموع اثنا عشر جنيها.' }] },
  l60: { explanation: 'Restaurant flow: a table for two, please → Could I see the menu? → I will have the chicken → Anything to drink? → The bill, please. Politely flag problems: Excuse me, this is not what I ordered.', explanationAr: 'تسلسل المطعم: طاولة لشخصين من فضلك ← هل أرى القائمة؟ ← سآخذ الدجاج ← أي مشروب؟ ← الحساب من فضلك. ولفت الانتباه بأدب: عفوا، هذا ليس ما طلبته.', examples: [{ en: 'A table for two, please.', ar: 'طاولة لشخصين، من فضلك.' }, { en: 'I will have the soup.', ar: 'سآخذ الحساء.' }, { en: 'The bill, please.', ar: 'الحساب، من فضلك.' }] },
  l61: { explanation: 'Café language: order sizes (small, medium, large) and types (black coffee, tea with milk, fresh juice). Polite forms: Could I get…? For here or to go? decides where you drink.', explanationAr: 'لغة المقهى: المقاسات (صغير، وسط، كبير) والأنواع (قهوة سادة، شاي بالحليب، عصير طازج). والصيغ المهذبة: Could I get…؟ وتحدد For here or to go? مكان الشرب.', examples: [{ en: 'A small black coffee, please.', ar: 'قهوة سادة صغيرة، من فضلك.' }, { en: 'For here or to go?', ar: 'هنا أم خارجيا؟' }, { en: 'To go, please.', ar: 'خارجيا، من فضلك.' }] },
  l62: { explanation: 'Daily routines use the present simple with time markers: I wake up at six, have breakfast, go to work. Sequence with first, then, after that, finally. Ask about routines with When do you…? and What time do you…?', explanationAr: 'الروتين اليومي يستخدم المضارع البسيط مع كلمات الزمن: أستيقظ في السادسة، أتناول الفطور، أذهب إلى العمل. والترتيب بـ أولًا، ثم، بعد ذلك، أخيرًا. واسأل عنه بـ متى تفعل…؟ في أي وقت تفعل…؟', examples: [{ en: 'I wake up at six every day.', ar: 'أستيقظ في السادسة كل يوم.' }, { en: 'Then I have breakfast.', ar: 'ثم أتناول الفطور.' }, { en: 'What time do you sleep?', ar: 'في أي وقت تنام؟' }] },
  l63: { explanation: 'Chores: wash the dishes, do the laundry, vacuum the floor, take out the trash, water the plants. Divide work with Could you…? and I will… if you…: Could you wash the dishes? I will dry them.', explanationAr: 'الأعمال المنزلية: أغسل الأطباق، أغسل الملابس، أمسح الأرضية، أخرج القمامة، أسقي النباتات. وقسّم العمل بـ Could you…? و I will… إذا…: هل تغسل الأطباق؟ أنا أنشفها.', examples: [{ en: 'I do the laundry on Saturdays.', ar: 'أغسل الملابس أيام السبت.' }, { en: 'Could you take out the trash?', ar: 'هل تخرج القمامة؟' }, { en: 'I will water the plants.', ar: 'سأسقي النباتات.' }] },
  l64: { explanation: 'Phone language: answer with Hello, this is Omar. Ask Who is calling, please? and Can I take a message? Bad lines: You are breaking up. Could you call me back? End with Talk soon or Goodbye.', explanationAr: 'لغة الهاتف: أجب بـ مرحبا، أنا عمر. واسأل: من المتصل من فضلك؟ هل أوصل رسالة؟ وعند ضعف الشبكة: الصوت متقطع، هل تعيد الاتصال؟ وأنهِ بـ أتكلم قريبا أو مع السلامة.', examples: [{ en: 'Hello, this is Omar speaking.', ar: 'مرحبا، أنا عمر أتحدث.' }, { en: 'Can I take a message?', ar: 'هل أوصل رسالة؟' }, { en: 'Could you call me back?', ar: 'هل تعيد الاتصال بي؟' }] },
  l65: { explanation: 'Texting is short and informal: BRB (be right back), LOL (laughing), Thx (thanks). Short replies: On my way!, Running late, 5 min. Emojis replace tone; punctuation is lighter, but keep meaning clear.', explanationAr: 'الرسائل النصية قصيرة وغير رسمية: BRB (سأعود)، LOL (ضحك)، Thx (شكرا). وردود قصيرة: في الطريق!، سأتأخر 5 دقائق. والإيموجي تعوض النبرة، والترقيم أخف، لكن أبقِ المعنى واضحا.', examples: [{ en: 'On my way!', ar: 'في الطريق!' }, { en: 'Running late, 5 min.', ar: 'سأتأخر 5 دقائق.' }, { en: 'Call me when you arrive.', ar: 'اتصل بي عند وصولك.' }] },
  l66: { explanation: 'Favors: start politely with Could you…? or Would you mind + verb-ing? Accept with Sure, no problem. Refuse softly: Sorry, I cannot right now. Thank with I really appreciate it.', explanationAr: 'طلب المعروف: ابدأ بأدب بـ Could you…? أو Would you mind + الفعل + ing؟ واقبل بـ بالتأكيد، لا مشكلة. وارفض بلطف: عفوا، لا أستطيع الآن. واشكر بـ أقدّر ذلك حقا.', examples: [{ en: 'Would you mind helping me?', ar: 'هل تمانع في مساعدتي؟' }, { en: 'Sure, no problem.', ar: 'بالتأكيد، لا مشكلة.' }, { en: 'I really appreciate it.', ar: 'أقدّر ذلك حقا.' }] },
  l67: { explanation: 'Appointments: book with I would like to make an appointment. Negotiate time: Does Tuesday work for you? Reschedule with I need to reschedule; something urgent came up. Confirmations often come by reminder.', explanationAr: 'المواعيد: احجز بـ أود تحديد موعد. وتفاوض على الوقت: هل الثلاثاء يناسبك؟ وأعد الجدولة بـ أحتاج إعادة الجدولة؛ طرأ أمر عاجل. وتأتي التأكيدات غالبا بتذكير.', examples: [{ en: 'I would like to make an appointment.', ar: 'أود تحديد موعد.' }, { en: 'Does Tuesday work for you?', ar: 'هل الثلاثاء يناسبك؟' }, { en: 'I need to reschedule.', ar: 'أحتاج إلى إعادة الجدولة.' }] },
  l68: { explanation: 'Invitations: invite with Would you like to…? or Are you free…? Accept warmly: I would love to! Count me in! Decline politely: I am afraid I cannot make it. Details: What time? Where should we meet?', explanationAr: 'الدعوات: ادعُ بـ هل تود…؟ أو هل أنت متاح…؟ واقبل بحرارة: سأفعل بكل سرور! واحسبني من الحضور! وارفض بأدب: أخشى ألا أستطيع الحضور. والتفاصيل: في أي وقت؟ أين نلتقي؟', examples: [{ en: 'Would you like to come?', ar: 'هل تود المجيء؟' }, { en: 'I would love to!', ar: 'سأفعل بكل سرور!' }, { en: 'I am afraid I cannot make it.', ar: 'أخشى ألا أستطيع الحضور.' }] },
  l69: { explanation: 'Opinions: introduce with In my opinion…, I think…, If you ask me…. Preferences: I prefer X to Y and I would rather + verb. Soften disagreement: To be honest…, It is not really my taste.', explanationAr: 'الآراء: ابدأ بـ برأيي…، أعتقد أن…، إن سألتني…. والتفضيلات: أفضل كذا على كذا وأفضل أن + فعل. ولطّف الخلاف: بصراحة…، ليس من ذوقي حقا.', examples: [{ en: 'In my opinion, it is excellent.', ar: 'برأيي، إنه ممتاز.' }, { en: 'I prefer tea to coffee.', ar: 'أفضل الشاي على القهوة.' }, { en: 'To be honest, I did not like it.', ar: 'بصراحة، لم يعجبني.' }] },
  l70: { explanation: 'Agree strongly: I could not agree more. Agree partly: You have a point, but…. Disagree politely: I am afraid I see it differently — never You are wrong. Close deadlocks with Let us agree to disagree.', explanationAr: 'الموافقة القوية: أوافقك تماما. والموافقة الجزئية: كلامك وجيه، لكن…. والخلاف المهذب: أخشى أنني أرى الأمر بشكل مختلف — وليس "أنت مخطئ". وأنهِ الجدل المفتول بـ لنتفق على الاختلاف.', examples: [{ en: 'I could not agree more.', ar: 'أوافقك تماما.' }, { en: 'I see your point, but…', ar: 'أفهم وجهة نظرك، لكن…' }, { en: 'Let us agree to disagree.', ar: 'لنتفق على الاختلاف.' }] },
  l71: { explanation: 'Weather talk: It is + adjective (hot, cold, sunny, cloudy) and It is raining/snowing. Ask What is the weather like? Follow the forecast: The forecast says… Advice: Take an umbrella.', explanationAr: 'الحديث عن الطقس: It is + صفة (حار، بارد، مشمس، غائم) وIt is raining/snowing. واسأل: كيف الجو؟ وتابع النشرة: تتنبأ بأن… ونصح: خذ مظلة.', examples: [{ en: 'What is the weather like?', ar: 'كيف الجو؟' }, { en: 'It is raining again.', ar: 'إنها تمطر مرة أخرى.' }, { en: 'The forecast says sunny.', ar: 'النشرة تقول مشمس.' }] },
  l72: { explanation: 'Review the conversation toolkit: open with Long time no see!, catch up, ask for repetition politely (Sorry, I did not catch that), offer help (Do you need a hand?), and close warmly (Take care!, Let us catch up soon).', explanationAr: 'مراجعة أدوات المحادثة: افتتح بـ لم أرك منذ زمن!، وتبادل الأخبار، واطلب التكرار بأدب (عفوا، لم أفهم ما قلته)، واعرض المساعدة (هل تحتاج يدًا؟)، وأنهِ بدفء (اعتن بنفسك!، لنلتقِ قريبا).', examples: [{ en: 'Long time no see!', ar: 'لم أرك منذ زمن!' }, { en: 'Do you need a hand?', ar: 'هل تحتاج مساعدة؟' }, { en: 'Let us catch up soon.', ar: 'لنلتقِ قريبا.' }] },
};

const VOC = {
  l53: [
    { word: 'greeting', meaningAr: 'تحية', example: 'Good morning is a greeting.' },
    { word: 'introduce', meaningAr: 'يقدّم (شخصا)', example: 'Let me introduce my friend.' },
    { word: 'meet', meaningAr: 'يقابل / يتعرف على', example: 'Nice to meet you.' },
    { word: 'from', meaningAr: 'من', example: 'I am from Egypt.' },
    { word: 'job', meaningAr: 'عمل', example: 'What do you do? — my job.' },
    { word: 'nurse', meaningAr: 'ممرضة', example: 'I work as a nurse.' },
  ],
  l54: [
    { word: 'small talk', meaningAr: 'دردشة قصيرة', example: 'Weather is classic small talk.' },
    { word: 'weekend', meaningAr: 'عطلة نهاية الأسبوع', example: 'How was your weekend?' },
    { word: 'hobby', meaningAr: 'هواية', example: 'My hobby is drawing.' },
    { word: 'plans', meaningAr: 'خطط', example: 'Any plans for today?' },
    { word: 'relaxing', meaningAr: 'مريح', example: 'It was a relaxing day.' },
    { word: 'movie', meaningAr: 'فيلم', example: 'We watched a movie.' },
  ],
  l55: [
    { word: 'parents', meaningAr: 'الوالدان', example: 'My parents live in Cairo.' },
    { word: 'grandmother', meaningAr: 'جدة', example: 'My grandmother makes great food.' },
    { word: 'cousin', meaningAr: 'ابن/بنت العم أو الخالة', example: 'My cousin visits us often.' },
    { word: 'relatives', meaningAr: 'أقارب', example: 'We invited all the relatives.' },
    { word: 'only child', meaningAr: 'طفل وحيد', example: 'I am an only child.' },
    { word: 'twins', meaningAr: 'توأم', example: 'My cousins are twins.' },
  ],
  l56: [
    { word: 'best friend', meaningAr: 'أفضل صديق', example: 'He is my best friend.' },
    { word: 'together', meaningAr: 'معا', example: 'We study together.' },
    { word: 'funny', meaningAr: 'مضحك', example: 'She is really funny.' },
    { word: 'kind', meaningAr: 'لطيف', example: 'Be kind to new students.' },
    { word: 'chess', meaningAr: 'شطرنج', example: 'We play chess together.' },
    { word: 'hang out', meaningAr: 'يتسكع / يقضي وقتا', example: 'We hang out on Fridays.' },
  ],
  l57: [
    { word: 'try on', meaningAr: 'يقيس (ملابس)', example: 'Can I try it on?' },
    { word: 'fit', meaningAr: 'يناسب المقاس', example: 'It does not fit.' },
    { word: 'size', meaningAr: 'مقاس', example: 'What size are you?' },
    { word: 'tight', meaningAr: 'ضيق', example: 'These shoes are tight.' },
    { word: ' fitting room', meaningAr: 'غرفة القياس', example: 'The fitting room is there.' },
    { word: 'cashier', meaningAr: 'أمين الصندوق', example: 'Pay at the cashier.' },
  ],
  l58: [
    { word: 'price', meaningAr: 'سعر', example: 'What is the price?' },
    { word: 'discount', meaningAr: 'خصم', example: 'Is there any discount?' },
    { word: 'on sale', meaningAr: 'بتخفيض', example: 'These shoes are on sale.' },
    { word: 'cheap', meaningAr: 'رخيص', example: 'It is too cheap to be true.' },
    { word: 'expensive', meaningAr: 'غالٍ', example: 'That phone is expensive.' },
    { word: 'change', meaningAr: 'الباقي (نقدا)', example: 'Here is your change.' },
  ],
  l59: [
    { word: 'groceries', meaningAr: 'مواد بقالة', example: 'I buy groceries on Fridays.' },
    { word: 'kilo', meaningAr: 'كيلوغرام', example: 'A kilo of tomatoes, please.' },
    { word: 'loaf', meaningAr: 'رغيف كبير', example: 'A loaf of bread.' },
    { word: 'ripe', meaningAr: 'ناضج', example: 'Are these bananas ripe?' },
    { word: 'fresh', meaningAr: 'طازج', example: 'Fresh fish today.' },
    { word: 'receipt', meaningAr: 'إيصال', example: 'Keep the receipt.' },
  ],
  l60: [
    { word: 'menu', meaningAr: 'قائمة الطعام', example: 'Could I see the menu?' },
    { word: 'order', meaningAr: 'يطلب (طعاما)', example: 'Are you ready to order?' },
    { word: 'waiter', meaningAr: 'نادل', example: 'The waiter is very kind.' },
    { word: 'bill', meaningAr: 'الحساب', example: 'The bill, please.' },
    { word: 'tip', meaningAr: 'بقشيش', example: 'Leave a small tip.' },
    { word: 'dessert', meaningAr: 'حلوى', example: 'Any dessert today?' },
  ],
  l61: [
    { word: 'café', meaningAr: 'مقهى', example: 'Let us meet at the café.' },
    { word: 'black coffee', meaningAr: 'قهوة سادة', example: 'A black coffee, please.' },
    { word: 'to go', meaningAr: 'خارجيا', example: 'Two teas to go.' },
    { word: 'for here', meaningAr: 'للشرب هنا', example: 'For here, please.' },
    { word: 'medium', meaningAr: 'وسط (حجم)', example: 'A medium juice.' },
    { word: 'straw', meaningAr: 'شفاطة', example: 'No straw, please.' },
  ],
  l62: [
    { word: 'wake up', meaningAr: 'يستيقظ', example: 'I wake up at six.' },
    { word: 'routine', meaningAr: 'روتين', example: 'Describe your daily routine.' },
    { word: 'commute', meaningAr: 'يواصل إلى العمل', example: 'My commute takes 30 minutes.' },
    { word: 'get dressed', meaningAr: 'يلبس ملابسه', example: 'I get dressed quickly.' },
    { word: 'bedtime', meaningAr: 'وقت النوم', example: 'My bedtime is eleven.' },
    { word: 'nap', meaningAr: 'قيلولة', example: 'I take a nap after work.' },
  ],
  l63: [
    { word: 'chore', meaningAr: 'عمل منزلي', example: 'Chores keep the house clean.' },
    { word: 'laundry', meaningAr: 'غسيل', example: 'I do the laundry on Fridays.' },
    { word: 'trash', meaningAr: 'قمامة', example: 'Take out the trash.' },
    { word: 'vacuum', meaningAr: 'يكنس بالمكنسة', example: 'Vacuum the living room.' },
    { word: 'tidy', meaningAr: 'يرتب', example: 'Let us tidy the kitchen.' },
    { word: 'water the plants', meaningAr: 'يسقي النباتات', example: 'Water the plants daily.' },
  ],
  l64: [
    { word: 'calling', meaningAr: 'متصل', example: 'Who is calling, please?' },
    { word: 'message', meaningAr: 'رسالة', example: 'Can I take a message?' },
    { word: 'hold on', meaningAr: 'انتظر لحظة', example: 'Hold on a second.' },
    { word: 'breaking up', meaningAr: 'الصوت متقطع', example: 'You are breaking up.' },
    { word: 'busy line', meaningAr: 'الخط مشغول', example: 'The line is busy.' },
    { word: 'voicemail', meaningAr: 'بريد صوتي', example: 'Leave a voicemail.' },
  ],
  l65: [
    { word: 'text', meaningAr: 'رسالة نصية', example: 'I will text you.' },
    { word: 'emoji', meaningAr: 'إيموجي', example: 'Add a smiling emoji.' },
    { word: 'BRB', meaningAr: 'سأعود حالا', example: 'BRB, doorbell.' },
    { word: 'reply', meaningAr: 'يرد', example: 'Reply when you can.' },
    { word: 'group chat', meaningAr: 'مجموعة محادثة', example: 'Check the group chat.' },
    { word: 'voice note', meaningAr: 'رسالة صوتية', example: 'Send a voice note.' },
  ],
  l66: [
    { word: 'favor', meaningAr: 'معروف', example: 'Can you do me a favor?' },
    { word: 'mind', meaningAr: 'يمانع', example: 'Would you mind waiting?' },
    { word: 'appreciate', meaningAr: 'يقدّر', example: 'I appreciate your help.' },
    { word: 'lifesaver', meaningAr: 'منقذ', example: 'You are a lifesaver!' },
    { word: 'no problem', meaningAr: 'لا مشكلة', example: 'Sure, no problem.' },
    { word: 'mention', meaningAr: 'يذكر', example: 'Don\u2019t mention it.' },
  ],
  l67: [
    { word: 'appointment', meaningAr: 'موعد', example: 'I made an appointment.' },
    { word: 'available', meaningAr: 'متاح', example: 'Is the doctor available?' },
    { word: 'reschedule', meaningAr: 'يعيد الجدولة', example: 'I need to reschedule.' },
    { word: 'confirm', meaningAr: 'يؤكد', example: 'Please confirm the time.' },
    { word: 'reminder', meaningAr: 'تذكير', example: 'You will get a reminder.' },
    { word: 'clinic', meaningAr: 'عيادة', example: 'The clinic opens at nine.' },
  ],
  l68: [
    { word: 'invitation', meaningAr: 'دعوة', example: 'Thanks for the invitation.' },
    { word: 'free', meaningAr: 'متفرغ', example: 'Are you free on Saturday?' },
    { word: 'make it', meaningAr: 'يتمكن من الحضور', example: 'I cannot make it.' },
    { word: 'count me in', meaningAr: 'أعدّني من الحضور', example: 'A picnic? Count me in!' },
    { word: 'guest', meaningAr: 'ضيف', example: 'About twenty guests.' },
    { word: 'casual', meaningAr: 'عادي (اللبس)', example: 'It is a casual party.' },
  ],
  l69: [
    { word: 'opinion', meaningAr: 'رأي', example: 'In my opinion, it works.' },
    { word: 'prefer', meaningAr: 'يفضل', example: 'I prefer tea to coffee.' },
    { word: 'rather', meaningAr: 'يفضّل (فعل)', example: 'I would rather walk.' },
    { word: 'favorite', meaningAr: 'مفضل', example: 'What is your favorite color?' },
    { word: 'overrated', meaningAr: 'مبالغ في تقديره', example: 'That show is overrated.' },
    { word: 'taste', meaningAr: 'ذوق', example: 'It is not my taste.' },
  ],
  l70: [
    { word: 'agree', meaningAr: 'يوافق', example: 'I agree with you.' },
    { word: 'point', meaningAr: 'وجهة نظر', example: 'You have a point.' },
    { word: 'differently', meaningAr: 'بشكل مختلف', example: 'I see it differently.' },
    { word: 'middle ground', meaningAr: 'حل وسط', example: 'Let us find a middle ground.' },
    { word: 'partly', meaningAr: 'جزئيا', example: 'I partly agree.' },
    { word: 'same page', meaningAr: 'اتفاق واحد', example: 'We are on the same page.' },
  ],
  l71: [
    { word: 'weather', meaningAr: 'طقس', example: 'The weather is lovely.' },
    { word: 'forecast', meaningAr: 'نشرة الطقس', example: 'The forecast says rain.' },
    { word: 'cloudy', meaningAr: 'غائم', example: 'It is cloudy today.' },
    { word: 'freezing', meaningAr: 'بارد جدا', example: 'It is freezing outside.' },
    { word: 'humid', meaningAr: 'رطب', example: 'Summer is humid here.' },
    { word: 'breeze', meaningAr: 'نسمة', example: 'A cool breeze is blowing.' },
  ],
  l72: [
    { word: 'catch up', meaningAr: 'تبادل الأخبار', example: 'Let us catch up soon.' },
    { word: 'regards', meaningAr: 'تحيات', example: 'Send them my regards.' },
    { word: 'details', meaningAr: 'تفاصيل', example: 'I will text the details.' },
    { word: 'a hand', meaningAr: 'مساعدة', example: 'Do you need a hand?' },
    { word: 'get going', meaningAr: 'ينصرف', example: 'I should get going.' },
    { word: 'pleasure', meaningAr: 'سرور', example: 'It is my pleasure.' },
  ],
};

const CFG = [
  { id: 'lesson-053', key: 'l53', title: 'Greetings & Introductions', titleAr: 'التحيات والتعارف', level: 'A1', minutes: 12, pools: { lt: [...l53Lt, ...CONV_SAFETY], fill: l53Fills, order: l53Orders, mc: l53Mc } },
  { id: 'lesson-054', key: 'l54', title: 'Small Talk', titleAr: 'الدردشة القصيرة', level: 'A1', minutes: 12, pools: { lt: [...l54Lt, ...CONV_SAFETY], fill: l54Fills, order: l54Orders, mc: l54Mc } },
  { id: 'lesson-055', key: 'l55', title: 'Family & Relatives', titleAr: 'العائلة والأقارب', level: 'A1', minutes: 12, pools: { lt: [...l55Lt, ...CONV_SAFETY], fill: l55Fills, order: l55Orders, mc: l55Mc } },
  { id: 'lesson-056', key: 'l56', title: 'Friends & Activities', titleAr: 'الأصدقاء والأنشطة', level: 'A1', minutes: 12, pools: { lt: [...l56Lt, ...CONV_SAFETY], fill: l56Fills, order: l56Orders, mc: l56Mc } },
  { id: 'lesson-057', key: 'l57', title: 'Shopping for Clothes', titleAr: 'التسوق للملابس', level: 'A2', minutes: 13, pools: { lt: [...l57Lt, ...CONV_SAFETY], fill: l57Fills, order: l57Orders, mc: l57Mc } },
  { id: 'lesson-058', key: 'l58', title: 'Shopping & Prices', titleAr: 'التسوق والأسعار', level: 'A2', minutes: 13, pools: { lt: [...l58Lt, ...CONV_SAFETY], fill: l58Fills, order: l58Orders, mc: l58Mc } },
  { id: 'lesson-059', key: 'l59', title: 'Food & Groceries', titleAr: 'الطعام والبقالة', level: 'A2', minutes: 13, pools: { lt: [...l59Lt, ...CONV_SAFETY], fill: l59Fills, order: l59Orders, mc: l59Mc } },
  { id: 'lesson-060', key: 'l60', title: 'At a Restaurant', titleAr: 'في المطعم', level: 'A2', minutes: 13, pools: { lt: [...l60Lt, ...CONV_SAFETY], fill: l60Fills, order: l60Orders, mc: l60Mc } },
  { id: 'lesson-061', key: 'l61', title: 'Ordering Drinks & Cafés', titleAr: 'طلب المشروبات والمقاهي', level: 'A2', minutes: 13, pools: { lt: [...l61Lt, ...CONV_SAFETY], fill: l61Fills, order: l61Orders, mc: l61Mc } },
  { id: 'lesson-062', key: 'l62', title: 'Home & Daily Routines', titleAr: 'البيت والروتين اليومي', level: 'A2', minutes: 13, pools: { lt: [...l62Lt, ...CONV_SAFETY], fill: l62Fills, order: l62Orders, mc: l62Mc } },
  { id: 'lesson-063', key: 'l63', title: 'Housework & Chores', titleAr: 'الأعمال المنزلية', level: 'A2', minutes: 13, pools: { lt: [...l63Lt, ...CONV_SAFETY], fill: l63Fills, order: l63Orders, mc: l63Mc } },
  { id: 'lesson-064', key: 'l64', title: 'Phone Calls', titleAr: 'المكالمات الهاتفية', level: 'A2', minutes: 13, pools: { lt: [...l64Lt, ...CONV_SAFETY], fill: l64Fills, order: l64Orders, mc: l64Mc } },
  { id: 'lesson-065', key: 'l65', title: 'Text Messages & Online Chat', titleAr: 'الرسائل والمحادثة النصية', level: 'A2', minutes: 13, pools: { lt: [...l65Lt, ...CONV_SAFETY], fill: l65Fills, order: l65Orders, mc: l65Mc } },
  { id: 'lesson-066', key: 'l66', title: 'Asking for Help & Favors', titleAr: 'طلب المساعدة والمعروف', level: 'B1', minutes: 14, pools: { lt: [...l66Lt, ...CONV_SAFETY], fill: l66Fills, order: l66Orders, mc: l66Mc } },
  { id: 'lesson-067', key: 'l67', title: 'Making Appointments', titleAr: 'تحديد المواعيد', level: 'B1', minutes: 14, pools: { lt: [...l67Lt, ...X67, ...CONV_SAFETY], fill: l67Fills, order: l67Orders, mc: l67Mc } },
  { id: 'lesson-068', key: 'l68', title: 'Invitations & Plans', titleAr: 'الدعوات والخطط', level: 'A2', minutes: 13, pools: { lt: [...l68Lt, ...X68, ...CONV_SAFETY], fill: l68Fills, order: l68Orders, mc: l68Mc } },
  { id: 'lesson-069', key: 'l69', title: 'Opinions & Preferences', titleAr: 'الآراء والتفضيلات', level: 'B1', minutes: 14, pools: { lt: [...l69Lt, ...X69, ...CONV_SAFETY], fill: l69Fills, order: l69Orders, mc: l69Mc } },
  { id: 'lesson-070', key: 'l70', title: 'Agreeing & Disagreeing Politely', titleAr: 'الموافقة والاختلاف بأدب', level: 'B1', minutes: 14, pools: { lt: [...l70Lt, ...X70, ...CONV_SAFETY], fill: l70Fills, order: l70Orders, mc: l70Mc } },
  { id: 'lesson-071', key: 'l71', title: 'Talking About the Weather', titleAr: 'الحديث عن الطقس', level: 'A1', minutes: 12, pools: { lt: [...l71Lt, ...X71, ...CONV_SAFETY], fill: l71Fills, order: l71Orders, mc: l71Mc } },
  { id: 'lesson-072', key: 'l72', title: 'Everyday Conversation Review', titleAr: 'مراجعة المحادثة اليومية', level: 'A2', minutes: 14, pools: { lt: [...l72Lt, ...X72, ...CONV_SAFETY], fill: l72Fills, order: l72Orders, mc: l72Mc } },
];

export function buildAll() {
  let total = 0;
  for (const c of CFG) {
    const g = GRAM[c.key];
    total += build({
      id: c.id, section: 'conversations', level: c.level, minutes: c.minutes,
      title: c.title, titleAr: c.titleAr,
      objectives: [`Handle real conversations: ${c.title.toLowerCase()}`, 'Listen and type natural spoken lines', 'Build confidence in daily situations'],
      grammar: g,
      vocabulary: VOC[c.key],
      pools: c.pools,
    });
  }
  return { section: 'conversations', lessons: CFG.length, exercises: total };
}
