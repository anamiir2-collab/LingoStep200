/* ============================================================
   Content generator — Section 7: Listening & Writing (lessons 105–120)
   Sixteen drills for listening/writing accuracy: dictation of
   numbers, times, names and addresses, mini-paragraphs,
   punctuation, capitalization, apostrophes, sentence correction,
   word-order drills, dates/appointments, short notes and emails,
   and a mixed review. Hand-authored {en, ar} pairs throughout.
   ============================================================ */

import { assembleLesson, writeLessonFile, fillFrom } from './lib/builder.js';
import { validateLessonStructure } from '../../js/lesson-schema.js';

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
   105 Listening: Short Everyday Sentences (A1)
   ============================================================ */
const TG105 = ['listening-writing', 'short-everyday-sentences'];
const l105Lt = T(TG105, [
  ['The bus is late today.', 'الحافلة متأخرة اليوم.', 1],
  ['Where is my phone?', 'أين هاتفي؟', 1],
  ['I need a glass of water.', 'أحتاج كوب ماء.', 1],
  ['The shop opens at nine.', 'يفتح المتجر في التاسعة.', 1],
  ['Please close the window.', 'أغلق النافذة من فضلك.', 1],
  ['Dinner is ready now.', 'العشاء جاهز الآن.', 1],
  ['I am tired after work.', 'أنا متعب بعد العمل.', 1],
  ['The weather is nice today.', 'الطقس جميل اليوم.', 1],

  ['My keys are on the table.', 'مفاتيحي على الطاولة.', 1],
  ['Call me in the evening.', 'اتصل بي في المساء.', 1],
  ['The children are at school.', 'الأطفال في المدرسة.', 1],
  ['This bag is very heavy.', 'هذه الحقيبة ثقيلة جدا.', 1],
  ['I usually walk to work.', 'أمشي إلى العمل عادة.', 2],
  ['The movie starts at eight.', 'يبدأ الفيلم في الثامنة.', 1],
  ['Put the milk in the fridge.', 'ضع الحليب في الثلاجة.', 1],
  ['My brother works in a bank.', 'يعمل أخي في مصرف.', 2],
  ['The train leaves at noon.', 'يغادر القطار ظهرا.', 2],
  ['Please speak more slowly.', 'تحدث ببطء أكثر من فضلك.', 1],
  ['I do not understand this word.', 'لا أفهم هذه الكلمة.', 2],
  ['The market is closed on Friday.', 'السوق مغلق يوم الجمعة.', 2],

  ['Can you help me, please?', 'هل يمكنك مساعدتي من فضلك؟', 1],
  ['The letter is for you.', 'هذه الرسالة لك.', 1],
  ['We eat lunch at one.', 'نتناول الغداء في الواحدة.', 1],
  ['My room is always clean.', 'غرفتي نظيفة دائما.', 1],
  ['The soup tastes very good.', 'طعم الحساء جيد جدا.', 2],
  ['I will call you tomorrow.', 'سأتصل بك غدا.', 1],
  ['Turn left at the corner.', 'انعطف يسارا عند الزاوية.', 2],
  ['The doctor is in the clinic.', 'الطبيب في العيادة.', 1],
  ['I forgot my umbrella at home.', 'نسيت مظلتي في البيت.', 2],
  ['The bus stop is near the park.', 'موقف الحافلة قرب الحديقة.', 2],

  ['She reads stories to her son.', 'تقرأ القصص لابنها.', 2],
  ['The coffee is too hot.', 'القهوة ساخنة جدا.', 1],
  ['We watch TV after dinner.', 'نشاهد التلفاز بعد العشاء.', 1],
  ['His car is very old.', 'سيارته قديمة جدا.', 1],
  ['I go to bed at ten.', 'أذهب إلى السرير في العاشرة.', 1],
  ['The flowers need water.', 'الأزهار تحتاج ماء.', 1],
  ['Please wait a moment.', 'انتظر لحظة من فضلك.', 1],
  ['My friend lives next door.', 'صديقي يسكن في البيت المجاور.', 2],
]);
const l105Fills = [
  ff(TG105, 'window', 'Please open the window.', 'افتح النافذة من فضلك.'),
  ff(TG105, 'water', 'I drink water with every meal.', 'أشرب الماء مع كل وجبة.'),
  ff(TG105, 'late', 'Sorry, I am late again.', 'آسف، لقد تأخرت مرة أخرى.'),
  ff(TG105, 'tomorrow', 'See you tomorrow morning.', 'أراك صباح الغد.'),
  ff(TG105, 'coffee', 'This coffee tastes great.', 'طعم هذه القهوة رائع.'),
  ff(TG105, 'school', 'The boys take the bus to school.', 'يذهب الأولاد إلى المدرسة بالحافلة.'),
  ff(TG105, 'expensive', 'That jacket is too expensive.', 'هذه السترة غالية جدا.'),
  ff(TG105, 'please', 'Repeat that, please.', 'أعد ذلك من فضلك.'),
];
const l105Orders = O(TG105, [
  ['My mother cooks very well.', 'تطبخ أمي جيدا جدا.'],
  ['The cat sleeps most of the day.', 'ينام القط معظم اليوم.'],
  ['We study English every evening.', 'ندرس الإنجليزية كل مساء.'],
  ['Ahmed plays football on Friday.', 'يلعب أحمد كرة القدم يوم الجمعة.'],
  ['The baby is sleeping now.', 'الطفل نائم الآن.'],
  ['I drink tea in the morning.', 'أشرب الشاي في الصباح.'],
  ['Our teacher tells short stories.', 'يحكي معلمنا قصصا قصيرة.'],
  ['The supermarket opens at eight.', 'يفتح السوبرماركت في الثامنة.'],
]);
const l105Mc = M(TG105, [
  ['You hear: "The bus is late today." What is late?', ['the bus', 'the train', 'the taxi'], 0, 'تسمع: الحافلة متأخرة اليوم. فما المتأخر؟ الحافلة.'],
  ['You hear: "Dinner is ready now." What should you do?', ['call a taxi', 'go to sleep', 'come and eat'], 2, 'تسمع: العشاء جاهز الآن. فما المطلوب؟ الحضور لتناول الطعام.'],
  ['Pick the sentence you heard.', ['The shop opens in nine.', 'The shop opens at nine.', 'The shop opens on nine.'], 1, 'الصحيح: The shop opens at nine، فنستخدم at مع الوقت.'],
  ['You hear: "Turn left at the corner." Where do you turn?', ['at the bridge', 'at the corner', 'at the door'], 1, 'تسمع: انعطف يسارا عند الزاوية. فالمكان هو الزاوية.'],
  ['Which sentence means "I need water"?', ['I need some bread.', 'I need a cup of tea.', 'I need a glass of water.'], 2, 'الجملة المقابلة: I need a glass of water، أي أحتاج كوب ماء.'],
  ['You hear: "My keys are on the table." Where are the keys?', ['under the chair', 'on the table', 'in the bag'], 1, 'تسمع: مفاتيحي على الطاولة. فالمكان هو الطاولة.'],
]);

/* ============================================================
   106 Dictation: Numbers & Times (A1)
   ============================================================ */
const TG106 = ['listening-writing', 'dictation-numbers-times'];
const l106Lt = T(TG106, [
  ['I have two brothers and one sister.', 'لي أخوان وأخت واحدة.', 1],
  ["The class starts at nine o'clock.", 'تبدأ الحصة في التاسعة تماما.', 1],
  ['She wakes up at half past six.', 'تستيقظ في السادسة والنصف.', 1],
  ['The train arrives at quarter past four.', 'يصل القطار في الرابعة والربع.', 2],
  ['Dinner is at quarter to eight.', 'العشاء قبل الثامنة بربع ساعة.', 2],
  ['This book costs fifteen pounds.', 'هذا الكتاب بخمسة عشر جنيها.', 2],
  ['Write the number forty on the board.', 'اكتب الرقم أربعين على السبورة.', 2],
  ['The movie is two hours long.', 'مدة الفيلم ساعتان.', 1],

  ['There are thirty students in my class.', 'يوجد ثلاثون طالبا في صفي.', 2],
  ['The store closes at ten at night.', 'يغلق المتجر في العاشرة ليلا.', 1],
  ['I study for one hour every day.', 'أدرس ساعة كل يوم.', 1],
  ['The bus comes every twenty minutes.', 'تأتي الحافلة كل عشرين دقيقة.', 2],
  ['My grandfather is eighty years old.', 'جدي في الثمانين من عمره.', 2],
  ['The meeting is at half past nine.', 'الاجتماع في التاسعة والنصف.', 2],
  ['Twelve months make one year.', 'اثنا عشر شهرا تكوّن سنة واحدة.', 1],
  ['The flight leaves at six in the morning.', 'تقلع الرحلة في السادسة صباحا.', 2],
  ['Breakfast is at seven sharp.', 'الفطور في السابعة تماما.', 2],
  ['I need fifty dollars for the ticket.', 'أحتاج خمسين دولارا للتذكرة.', 2],
  ['The lesson is forty-five minutes long.', 'مدة الدرس خمس وأربعون دقيقة.', 2],
  ['Call me at three this afternoon.', 'اتصل بي في الثالثة بعد الظهر.', 1],

  ['The pharmacy opens at eight thirty.', 'تفتح الصيدلية في الثامنة والنصف.', 2],
  ['We waited for ten minutes only.', 'انتظرنا عشر دقائق فقط.', 2],
  ['The bank opens from nine to three.', 'يفتح المصرف من التاسعة إلى الثالثة.', 2],
  ['My little sister is six years old.', 'أختي الصغيرة عمرها ست سنوات.', 1],
  ['The last bus is at eleven at night.', 'آخر حافلة في الحادية عشرة ليلا.', 2],
  ['One kilo of rice costs five dollars.', 'كيلو الأرز بخمسة دولارات.', 2],
  ['The class ends at quarter past two.', 'تنتهي الحصة في الثانية والربع.', 2],
  ['I sleep for eight hours every night.', 'أنام ثماني ساعات كل ليلة.', 1],
  ['The doctor sees patients at quarter past nine.', 'يفحص الطبيب المرضى في التاسعة والربع.', 2],
  ['There are seven days in a week.', 'في الأسبوع سبعة أيام.', 1],

  ['The taxi will be here in five minutes.', 'ستصل سيارة الأجرة بعد خمس دقائق.', 2],
  ['School begins at eight in the morning.', 'تبدأ المدرسة في الثامنة صباحا.', 1],
  ['I read twenty pages every night.', 'أقرأ عشرين صفحة كل ليلة.', 2],
  ['The party starts at nine tonight.', 'تبدأ الحفلة في التاسعة الليلة.', 1],
  ['My rent is three hundred dollars.', 'إيجاري ثلاثمائة دولار.', 2],
  ['The flight takes about eleven hours.', 'تستغرق الرحلة نحو إحدى عشرة ساعة.', 2],
  ['The lunch break is thirty minutes long.', 'استراحة الغداء ثلاثون دقيقة.', 2],
  ['The museum opens at ten in the morning.', 'يفتح المتحف في العاشرة صباحا.', 2],
]);
const l106Fills = [
  ff(TG106, 'quarter', 'The bus leaves at quarter past five.', 'تغادر الحافلة في الخامسة والربع.'),
  ff(TG106, 'minutes', 'Wait here for ten minutes.', 'انتظر هنا عشر دقائق.'),
  ff(TG106, "o'clock", "The show starts at seven o'clock.", 'يبدأ العرض في السابعة تماما.'),
  ff(TG106, 'hours', 'The trip takes three hours.', 'تستغرق الرحلة ثلاث ساعات.'),
  ff(TG106, 'twenty', 'There are twenty chairs in the hall.', 'في القاعة عشرون كرسيا.'),
  ff(TG106, 'noon', 'We eat at noon every day.', 'نتناول الطعام ظهرا كل يوم.'),
  ff(TG106, 'hundred', 'That vase costs two hundred pounds.', 'تلك المزهرية بمائتي جنيه.'),
  ff(TG106, 'midnight', 'The train arrives at midnight.', 'يصل القطار في منتصف الليل.'),
];
const l106Orders = O(TG106, [
  ['My class starts at eight sharp.', 'تبدأ حصتي في الثامنة تماما.'],
  ['The film lasts two hours and thirty minutes.', 'مدة الفيلم ساعتان وثلاثون دقيقة.'],
  ["We have lunch at one o'clock.", 'نتناول الغداء في الواحدة تماما.'],
  ['The baby sleeps for ten hours.', 'ينام الطفل عشر ساعات.'],
  ['She drinks three cups of tea.', 'تشرب ثلاثة أكواب من الشاي.'],
  ['The train arrives at half past six.', 'يصل القطار في السادسة والنصف.'],
  ['I work nine hours every day.', 'أعمل تسع ساعات كل يوم.'],
  ['The party ends at midnight tonight.', 'تنتهي الحفلة منتصف الليل الليلة.'],
]);
const l106Mc = M(TG106, [
  ['You hear: "The meeting is at half past nine." When is the meeting?', ['8:30', '9:30', '9:15'], 1, 'half past nine تعني التاسعة والنصف أي 9:30.'],
  ['You hear: "quarter to eight." What time is it?', ['8:15', '7:15', '7:45'], 2, 'quarter to eight تعني الثامنة إلا ربعا أي 7:45.'],
  ['Which means 10:00 exactly?', ['at half past ten', "at ten o'clock", 'at quarter past ten'], 1, "o'clock تعني تماما، فالتاسعة تماما هي 10:00 بالضبط."],
  ['You hear: "The film is two hours long." How long is it?', ['120 minutes', '90 minutes', '60 minutes'], 0, 'ساعتان تعنيان 120 دقيقة.'],
  ['You hear the word "forty". Which is right?', ['fourteen', 'fourty', 'forty'], 2, 'الرقم 40 يُكتب forty بلا حرف u.'],
  ['You hear: "The bus comes every twenty minutes." How often?', ['every 12 minutes', 'every 20 minutes', 'every 30 minutes'], 1, 'twenty تعني عشرين، فالحافلة كل 20 دقيقة.'],
]);

/* ============================================================
   107 Dictation: Names, Spelling & Addresses (A2)
   ============================================================ */
const TG107 = ['listening-writing', 'names-spelling-addresses'];
const l107Lt = T(TG107, [
  ['My name is Sara. S-A-R-A.', 'اسمي سارة. س-ا-ر-ا.', 2],
  ['I live at 12 Green Street.', 'أسكن في 12 شارع جرين.', 2],
  ['Spell your last name, please.', 'تهجّ اسم عائلتك من فضلك.', 1],
  ['My surname is Haddad. H-A-D-D-A-D.', 'اسم عائلتي حداد. ح-ا-د-د-ا-د.', 2],
  ['I live on the third floor.', 'أسكن في الطابق الثالث.', 1],
  ['My flat number is forty-two.', 'رقم شقتي اثنان وأربعون.', 2],
  ['The office is at 9 King Road.', 'المكتب في 9 طريق كينغ.', 2],
  ['Her name is Layla. L-A-Y-L-A.', 'اسمها ليلى. ل-ا-ي-ل-ا.', 2],

  ['My postcode is 11511.', 'الرمز البريدي لدي هو 11511.', 1],
  ['I live in Apartment 5B.', 'أسكن في شقة 5B.', 1],
  ['My first name is Mohammed.', 'اسمي الأول محمد.', 1],
  ['We live at 30 Oak Avenue.', 'نسكن في 30 شارع أوك.', 2],
  ['Please write your name in capital letters.', 'اكتب اسمك بحروف كبيرة من فضلك.', 2],
  ['My middle name is Hassan.', 'اسمي الأوسط حسن.', 1],
  ['The street name is very hard to spell.', 'اسم الشارع صعب التهجئة جدا.', 2],
  ['My address changed last month.', 'تغير عنواني الشهر الماضي.', 2],
  ['I spell it M for mother.', 'أتهجئها M كما في كلمة mother.', 2],
  ['My house is number fifteen on this street.', 'بيتي رقم خمسة عشر في هذا الشارع.', 2],
  ['She writes her name in English.', 'تكتب اسمها بالإنجليزية.', 1],
  ['The receptionist asks for my full name.', 'يطلب مني موظف الاستقبال اسمي الكامل.', 2],

  ['My family name has a double L.', 'اسم عائلتي فيه حرف L مزدوج.', 2],
  ['Our new address is 8 Park Lane.', 'عنواننا الجديد 8 شارع بارك.', 2],
  ['He lives near the city center.', 'يسكن قرب وسط المدينة.', 1],
  ['My name is short and easy.', 'اسمي قصير وسهل.', 1],
  ['Please say your name again slowly.', 'قل اسمك مرة أخرى ببطء من فضلك.', 1],
  ['The courier needs my phone number and address.', 'يحتاج موظف التوصيل رقم هاتفي وعنواني.', 2],
  ['I wrote my name on the form.', 'كتبت اسمي في الاستمارة.', 1],
  ['Her email starts with a capital N.', 'بريدها الإلكتروني يبدأ بحرف N كبير.', 2],
  ['My friend spells her name with two Rs.', 'تكتب صديقتي اسمها بحرفي R.', 2],
  ['We moved to Elm Street last year.', 'انتقلنا إلى شارع إلم العام الماضي.', 2],

  ['The letters of my name are all different.', 'حروف اسمي كلها مختلفة.', 2],
  ['My brother has the same initials as my father.', 'لأخي نفس الحروف الأولى لوالدي.', 2],
  ['Please fill in your name here.', 'املأ اسمك هنا من فضلك.', 1],
  ['My username is my name and my birth year.', 'اسم مستخدمي هو اسمي وسنة مولدي.', 2],
  ['The teacher calls the names in order.', 'ينادي المعلم الأسماء بالترتيب.', 1],
  ['I live between the bank and the school.', 'أسكن بين المصرف والمدرسة.', 2],
  ['Her signature is hard to read.', 'توقيعها صعب القراءة.', 2],
]);
const l107Fills = [
  ff(TG107, 'spelling', 'The spelling of this street name is hard.', 'تهجئة اسم هذا الشارع صعبة.'),
  ff(TG107, 'address', 'Please write your address on the box.', 'اكتب عنوانك على الصندوق من فضلك.'),
  ff(TG107, 'surname', 'My surname comes from my grandfather.', 'اسم عائلتي موروث عن جدي.'),
  ff(TG107, 'floor', 'Our office is on the second floor.', 'مكتبنا في الطابق الثاني.'),
  ff(TG107, 'capital', 'Write the first letter as a capital.', 'اكتب الحرف الأول بحرف كبير.'),
  ff(TG107, 'letters', 'My name has nine letters.', 'اسمي من تسعة أحرف.'),
  ff(TG107, 'apartment', 'My apartment is on Maple Road.', 'شقتي في شارع مابل.'),
  ff(TG107, 'spell', 'How do you spell your first name?', 'كيف تتهجى اسمك الأول؟'),
];
const l107Orders = O(TG107, [
  ['My name is Omar Hassan.', 'اسمي عمر حسن.'],
  ['I live on Baker Street.', 'أسكن في شارع بيكر.'],
  ['Her flat is on the fourth floor.', 'شقتها في الطابق الرابع.'],
  ['Please write your name clearly.', 'اكتب اسمك بوضوح من فضلك.'],
  ['The address is twelve Green Street.', 'العنوان اثنا عشر شارع جرين.'],
  ['My email address is very long.', 'عنوان بريدي الإلكتروني طويل جدا.'],
  ['The courier delivers to the back door.', 'يوصّل موظف البريد إلى الباب الخلفي.'],
  ['His full name is Ahmed Khalil Saleh.', 'اسمه الكامل أحمد خليل صالح.'],
]);
const l107Mc = M(TG107, [
  ['You hear: "My name is Sara. S-A-R-A." How do you spell it?', ['S-A-R-R-A', 'S-A-R-A', 'C-A-R-A'], 1, 'سمعت التهجئة حرفا حرفا: S-A-R-A.'],
  ['Which is a house or street number?', ['at 12 Green Street', 'in the morning', 'every Monday'], 0, 'رقم المسكن يأتي مع الشارع كما في: 12 Green Street.'],
  ['You hear a floor number. Pick it.', ['three books', 'the third floor', 'every third day'], 1, 'رقم الطابق يُقال: the third floor أي الطابق الثالث.'],
  ['Which name is spelled with a double letter?', ['Kelly', 'Sara', 'Omar'], 0, 'اسم Kelly فيه حرف L مزدوج.'],
  ['You hear: "My surname is Haddad." A surname is…', ['a first name', 'a nickname', 'a family name'], 2, 'surname تعني اسم العائلة.'],
  ['Which is a complete address?', ['10 very big', 'Pine nice street', '10 Pine Street, Apartment 3'], 2, 'العنوان الكامل يضم الرقم والشارع والشقة.'],
]);

/* ============================================================
   108 Listening: Short Paragraphs I (A2)
   ============================================================ */
const TG108 = ['listening-writing', 'mini-texts-1'];
const l108Lt = T(TG108, [
  ['I wake up at six. I drink tea and read the news.', 'أستيقظ في السادسة. أشرب الشاي وأقرأ الأخبار.', 2],
  ['Sara works at a clinic. She helps the doctor every day.', 'تعمل سارة في عيادة. وهي تساعد الطبيب كل يوم.', 2],
  ['The market is busy on Sunday. We buy fruit for the week.', 'السوق مزدحم يوم الأحد. نشتري فاكهة للأسبوع.', 2],
  ['My brother studies engineering. He has exams next month.', 'يدرس أخي الهندسة. ولديه امتحانات الشهر القادم.', 2],
  ['Our street is quiet at night. Only cats walk there.', 'شارعنا هادئ ليلا. القطط وحدها تمشي فيه.', 2],
  ['I take the bus to work. The trip takes twenty minutes.', 'أركب الحافلة إلى العمل. تستغرق الرحلة عشرين دقيقة.', 2],
  ['Grandmother lives with us. She tells us stories after dinner.', 'تعيش جدتنا معنا. تحكي لنا القصص بعد العشاء.', 2],
  ['The bakery opens early. People buy warm bread at seven.', 'يفتح المخبز باكرا. يشتري الناس الخبز الدافئ في السابعة.', 2],

  ['My room faces the garden. I see birds every morning.', 'غرفتي تطل على الحديقة. أرى الطيور كل صباح.', 2],
  ['We study together on Tuesday. Then we drink juice downstairs.', 'ندرس معا يوم الثلاثاء. ثم نشرب العصير في الطابق الأسفل.', 2],
  ['My father drives a taxi. He knows every street in town.', 'يقود والدي سيارة أجرة. وهو يعرف كل شارع في البلدة.', 2],
  ['The library is free. Students read there after class.', 'المكتبة مجانية. يقرأ الطلاب فيها بعد الحصة.', 2],
  ['I cook rice on Friday. My sister makes the salad.', 'أطبخ الأرز يوم الجمعة. وأختي تعدّ السلطة.', 2],
  ['The park has a small lake. Children feed the ducks there.', 'في الحديقة بحيرة صغيرة. يطعم الأطفال البط هناك.', 2],
  ['Ahmed repairs phones. His shop is near the mosque.', 'يصلح أحمد الهواتف. ومتجره قرب المسجد.', 2],
  ['It rains a lot in April. I always carry my umbrella.', 'تمطر كثيرا في أبريل. أحمل مظلتي دائما.', 2],
  ['Our team plays on Saturday. Fans come from other towns.', 'يلعب فريقنا يوم السبت. ويأتي المشجعون من مدن أخرى.', 2],
  ['I write emails in the morning. My boss reads them at ten.', 'أكتب الرسائل في الصباح. ويقرأها مديري في العاشرة.', 2],
  ['The hospital is very big. The signs help visitors a lot.', 'المستشفى كبير جدا. اللافتات تساعد الزوار كثيرا.', 2],
  ['My cousin studies music. He plays the piano beautifully.', 'يدرس ابن عمي الموسيقى. وهو يعزف البيانو عزفا جميلا.', 2],

  ['We moved to a new flat. The kitchen is my favorite room.', 'انتقلنا إلى شقة جديدة. والمطبخ غرفتي المفضلة.', 2],
  ['The bus is crowded at eight. I wait for the next one.', 'الحافلة مزدحمة في الثامنة. أنتظر التي تليها.', 2],
  ['My neighbour has a dog. It barks at strangers only.', 'لجاري كلب. وهو ينبح على الغرباء فقط.', 2],
  ['The café closes at midnight. Students drink tea there late.', 'يغلق المقهى عند منتصف الليل. يشرب الطلاب الشاي فيه وقت متأخر.', 2],
  ['I clean my desk daily. A clean desk helps me think.', 'أنظف مكتبي يوميا. والمكتب النظيف يساعدني على التفكير.', 2],
  ['Lina teaches English. Her students love her games.', 'تدرّس لينا الإنجليزية. طلابها يحبون ألعابها.', 2],
  ['The train station is old. The clocks there still work well.', 'محطة القطار قديمة. وساعاتها ما تزال تعمل جيدا.', 2],
  ['My mother waters the plants. The balcony looks green now.', 'تسقي أمي النباتات. وتبدو الشرفة خضراء الآن.', 2],
  ['We shop on Thursday night. The streets are full of lights.', 'نتسوق ليلة الخميس. والشوارع مليئة بالأضواء.', 2],
  ['The doctor gave advice. He said rest for two days.', 'أعطى الطبيب نصيحته. وقال ارتح يومين.', 2],

  ['Our office has a small kitchen. We share coffee and fruit.', 'في مكتبنا مطبخ صغير. نتشارك القهوة والفاكهة.', 2],
  ['The school has five hundred students. The yard is always loud.', 'في المدرسة خمسمائة طالب. والفناء صاخب دائما.', 2],
  ['I save money every month. Next year I will buy a bike.', 'أدخر المال كل شهر. وفي السنة القادمة سأشتري دراجة.', 2],
  ['The weather is warm today. We eat lunch in the garden.', 'الجو دافئ اليوم. نتناول الغداء في الحديقة.', 2],
  ['My uncle farms near the river. He sends us fresh dates.', 'يمارس عمي الزراعة قرب النهر. يرسل لنا تمرا طازجا.', 2],
  ['The museum opens at nine. Tickets are free for students.', 'يفتح المتحف في التاسعة. التذاكر مجانية للطلاب.', 2],
  ['I lost my wallet yesterday. A kind boy found it near the gate.', 'أضعت محفظتي أمس. وجدها صبي لطيف قرب البوابة.', 2],
  ['Evening classes start soon. I registered for two courses.', 'تبدأ الدروس المسائية قريبا. وسجلت في دورتين.', 2],
]);
const l108Fills = [
  ff(TG108, 'clinic', 'The clinic opens at nine sharp.', 'تفتح العيادة في التاسعة تماما.'),
  ff(TG108, 'bakery', 'The bakery on our street smells great.', 'رائحة المخبز في شارعنا فائقة.'),
  ff(TG108, 'library', 'I borrow two books from the library.', 'أستعير كتابين من المكتبة.'),
  ff(TG108, 'garden', 'The garden needs a new fence.', 'تحتاج الحديقة سياجا جديدا.'),
  ff(TG108, 'umbrella', 'My umbrella broke in the wind.', 'انكسرت مظلتي في الريح.'),
  ff(TG108, 'station', 'Meet me at the station entrance.', 'انتظرني عند مدخل المحطة.'),
  ff(TG108, 'neighbour', 'My neighbour grows tomatoes in summer.', 'يزرع جاري الطماطم في الصيف.'),
  ff(TG108, 'cousin', 'My cousin speaks three languages.', 'يتحدث ابن عمي ثلاث لغات.'),
];
const l108Orders = O(TG108, [
  ['My sister works at the hospital.', 'تعمل أختي في المستشفى.'],
  ['The children walk to school together.', 'يمشي الأطفال إلى المدرسة معا.'],
  ['We visit grandma every Friday.', 'نزور الجدة كل جمعة.'],
  ['The bus stops near our house.', 'تتوقف الحافلة قرب بيتنا.'],
  ['I read the news on my phone.', 'أقرأ الأخبار على هاتفي.'],
  ['Our team trains on Tuesday evenings.', 'يتدرب فريقنا مساءات الثلاثاء.'],
  ['The cat sleeps under my desk.', 'ينام القط تحت مكتبي.'],
  ['My father fixes old clocks.', 'يصلح والدي الساعات القديمة.'],
]);
const l108Mc = M(TG108, [
  ['You hear: "Sara works at a clinic. She helps the doctor." Where does Sara work?', ['at a bank', 'at a school', 'at a clinic'], 2, 'سمعت أن سارة تعمل في عيادة.'],
  ['You hear: "I take the bus to work. The trip takes twenty minutes." How long is the trip?', ['2 minutes', '20 minutes', '12 minutes'], 1, 'الرحلة تستغرق عشرين دقيقة.'],
  ['You hear: "Ahmed repairs phones." What is his job?', ['phone repair', 'taxi driver', 'teacher'], 0, 'وظيفة أحمد إصلاح الهواتف.'],
  ['You hear: "The park has a small lake." What is in the park?', ['a small lake', 'a big mall', 'a tall tower'], 0, 'في الحديقة بحيرة صغيرة.'],
  ['You hear: "It rains a lot in April." What do I always carry?', ['a fan', 'an umbrella', 'a hat'], 1, 'بسبب المطر أحمل مظلتي دائما.'],
  ['You hear: "I lost my wallet yesterday." Who found it?', ['a kind boy', 'a police officer', 'my brother'], 0, 'وجد المحفظة صبي لطيف قرب البوابة.'],
]);

/* ============================================================
   109 Listening: Short Paragraphs II (A2)
   ============================================================ */
const TG109 = ['listening-writing', 'mini-texts-2'];
const l109Lt = T(TG109, [
  ['The weather turned cold last night. I took my winter jacket out of the box.', 'أصبح الجو باردا الليلة الماضية. أخرجت سترتي الشتوية من الصندوق.', 2],
  ['Nora started a small business. She sells cakes to offices nearby.', 'بدأت نورا مشروعا صغيرا. تبيع الكعك للمكاتب القريبة.', 2],
  ['The new road opened last week. Now the trip home is much shorter.', 'افتُتح الطريق الجديد الأسبوع الماضي. وأصبحت الرحلة إلى البيت أقصر بكثير.', 2],
  ['Our class visited the factory. Machines there work day and night.', 'زار صفي المصنع. والآلات هناك تعمل ليلا ونهارا.', 2],
  ['I joined the city gym. I go swimming twice a week.', 'انضممت إلى نادي المدينة. أذهب للسباحة مرتين أسبوعيا.', 2],
  ['The internet was down all morning. I read a paper book instead.', 'كان الإنترنت معطلا طوال الصباح. فقرأت كتابا ورقيا بدلا منه.', 2],
  ['Youssef moved to a new city. He knows nobody there yet.', 'انتقل يوسف إلى مدينة جديدة. وهو لا يعرف أحدا هناك بعد.', 2],
  ['The restaurant changed its menu. The soup is the best dish now.', 'غيّر المطعم قائمته. والحساء هو أفضل طبق الآن.', 2],

  ['My laptop is very slow. I save my files in the cloud.', 'حاسوبي بطيء جدا. أحفظ ملفاتي في السحابة.', 2],
  ['The street market starts at dawn. Farmers sell vegetables directly.', 'يبدأ سوق الشارع عند الفجر. يبيع المزارعون الخضروات مباشرة.', 2],
  ['Our building got new elevators. The old ones stopped often.', 'حصل عمارتنا على مصاعد جديدة. وكانت القديمة تتوقف كثيرا.', 2],
  ['I take evening classes in French. The teacher is from Lyon.', 'أحضر دروسا مسائية بالفرنسية. والمعلم من مدينة ليون.', 2],
  ['The baby slept all night. Her parents finally rested too.', 'نامت الطفلة طوال الليل. وأخذ والداها قسطا من الراحة أخيرا.', 2],
  ['The office moved downtown. My commute is easier now.', 'انتقل المكتب إلى وسط المدينة. ومشواري إلى العمل أسهل الآن.', 2],
  ['We planted tomatoes in May. The first fruits are red already.', 'زرعنا الطماطم في مايو. وأول ثمارها حمراء بالفعل.', 2],
  ['The pharmacy changed its hours. It now opens at eight sharp.', 'غيّرت الصيدلية مواعيدها. وهي تفتح الآن في الثامنة تماما.', 2],
  ['My sister passed her driving test. She drove home alone happily.', 'نجحت أختي في اختبار القيادة. وقد قادت إلى البيت وحدها بسعادة.', 2],
  ['The hotel lost our booking. They gave us a better room.', 'أضاع الفندق حجزنا. فأعطانا غرفة أفضل.', 2],
  ['I ordered a book online. It arrived two days later.', 'طلبت كتابا عبر الإنترنت. ووصل بعد يومين.', 2],
  ['The kids painted the fence. Now the garden looks brand new.', 'طلى الأطفال السياج. والآن تبدو الحديقة جديدة تماما.', 2],

  ['Khalid teaches math at night. His students are working adults.', 'يدرّس خالد الرياضيات ليلا. وطلابه موظفون بالغون.', 2],
  ['The airport was very crowded. Our flight left an hour late.', 'كان المطار مزدحما جدا. وتأخرت رحلتنا ساعة كاملة.', 2],
  ['We changed our phone provider. The signal is stronger now.', 'غيّرنا شركة الهاتف. والشبكة أقوى الآن.', 2],
  ['The cat disappeared for two days. It came back very hungry.', 'اختفى القط يومين. وعاد جائعا جدا.', 2],
  ['My grandmother learned to text. Her messages make us smile.', 'تعلمت جدتي الكتابة النصية. ورسائلها تجعلنا نبتسم.', 2],
  ['The bakery hired two workers. Lines move faster in the morning.', 'وظّف المخبز عاملين. وتتحرك الطوابير أسرع في الصباح.', 2],
  ['I fixed my bicycle myself. I watched a video twice first.', 'أصلحت دراجتي بنفسي. وقد شاهدت مقطع فيديو مرتين أولا.', 2],
  ['The museum added a new hall. It shows old coins and maps.', 'أضاف المتحف قاعة جديدة. تعرض عملات وخرائط قديمة.', 2],
  ['Our street got new lights. Walking home feels safer now.', 'حصل شارعنا على إنارة جديدة. وأصبحت العودة إلى البيت أكثر أمانا.', 2],
  ['The team won the final match. The whole town celebrated.', 'فاز الفريق بالمباراة النهائية. واحتفلت البلدة كلها.', 2],

  ['I started writing a diary. One page every night before bed.', 'بدأت أكتب مذكرة يومية. صفحة واحدة كل ليلة قبل النوم.', 2],
  ['The library extended its hours. It stays open until nine.', 'مددت المكتبة ساعات عملها. وهي تبقى مفتوحة حتى التاسعة.', 2],
  ['My brother bought a used car. It needs small repairs only.', 'اشترى أخي سيارة مستعملة. وهي تحتاج إصلاحات صغيرة فقط.', 2],
  ['The school started a garden. Students water it every morning.', 'أنشأت المدرسة حديقة. يسقيها الطلاب كل صباح.', 2],
  ['The rain stopped at noon. The streets dried quickly after.', 'توقف المطر ظهرا. وجفت الشوارع سريعا بعده.', 2],
  ['We took the train instead. Traffic on the road was terrible.', 'أخذنا القطار بدلا من ذلك. فالازدحام على الطريق كان مروعا.', 2],
  ['The shop gives student discounts. Bring your card every time.', 'يمنح المتجر خصومات للطلاب. أحضر بطاقتك كل مرة.', 2],
  ['Maya finished her first novel. She will look for a publisher.', 'أنهت مايا روايتها الأولى. وستبحث عن ناشر.', 2],
]);
const l109Fills = [
  ff(TG109, 'gym', 'The gym near my house is new.', 'النادي الرياضي قرب بيتي جديد.'),
  ff(TG109, 'factory', 'The factory employs two hundred people.', 'يوظف المصنع مائتي شخص.'),
  ff(TG109, 'elevator', 'The elevator was out of order.', 'كان المصعد معطلا.'),
  ff(TG109, 'flight', 'Our flight lands at midnight.', 'تهبط رحلتنا في منتصف الليل.'),
  ff(TG109, 'menu', 'The menu has new dishes today.', 'في القائمة أطباق جديدة اليوم.'),
  ff(TG109, 'diary', 'She writes in her diary every night.', 'تكتب في مذكرتها كل ليلة.'),
  ff(TG109, 'commute', 'My commute takes forty minutes now.', 'يستغرق مشواري إلى العمل الآن أربعين دقيقة.'),
  ff(TG109, 'publisher', 'A publisher answered her letter.', 'أجاب ناشر على رسالتها.'),
];
const l109Orders = O(TG109, [
  ['The weather is cold this week.', 'الجو بارد هذا الأسبوع.'],
  ['My aunt sells flowers near the gate.', 'تبيع خالتي الزهور قرب البوابة.'],
  ['My laptop works much better now.', 'يعمل حاسوبي أفضل بكثير الآن.'],
  ['The team practices every single day.', 'يتدرب الفريق كل يوم بلا استثناء.'],
  ['He drives to work on Mondays.', 'يقود إلى العمل أيام الاثنين.'],
  ['The new museum opens in spring.', 'يفتح المتحف الجديد في الربيع.'],
  ['Our neighbors moved in last month.', 'انتقل جيراننا للسكن الشهر الماضي.'],
  ['The bus left five minutes early.', 'غادرت الحافلة قبل خمس دقائق.'],
]);
const l109Mc = M(TG109, [
  ['You hear: "Nora sells cakes to offices." What does Nora sell?', ['books', 'cakes', 'vegetables'], 1, 'تبيع نورا الكعك للمكاتب القريبة.'],
  ['You hear: "The internet was down." What did I read instead?', ['a paper book', 'a magazine app', 'nothing at all'], 0, 'قرأت كتابا ورقيا بدلا من الإنترنت.'],
  ['You hear: "Our flight left an hour late." Why was the trip hard?', ['the plane was small', 'the tickets were lost', 'the airport was crowded'], 2, 'كان المطار مزدحما جدا فتأخرت الرحلة.'],
  ['You hear: "I fixed my bicycle myself." How did I learn?', ['watched a video', 'asked my uncle', 'read a manual'], 0, 'تعلمت من مشاهدة مقطع فيديو مرتين.'],
  ['You hear: "The library stays open until nine." When does it close?', ['at nine', 'at seven', 'at midnight'], 0, 'تبقى المكتبة مفتوحة حتى التاسعة.'],
  ['You hear: "Maya finished her first novel." What will she do?', ['start another job', 'look for a publisher', 'travel abroad'], 1, 'ستبحث مايا عن ناشر لروايتها.'],
]);

/* ============================================================
   110 Punctuation Basics (A2)
   ============================================================ */
const TG110 = ['punctuation', 'punctuation-basics'];
const l110Lt = T(TG110, [
  ['Where is the nearest pharmacy?', 'أين أقرب صيدلية؟', 1],
  ['What a beautiful morning!', 'يا لها من صباح جميل!', 1],
  ['Stop! The light is red.', 'توقف! الإشارة حمراء.', 1],
  ['I bought apples, oranges, and grapes.', 'اشتريت تفاحا وبرتقالا وعنبا.', 2],
  ['Do you speak English or French?', 'هل تتحدث الإنجليزية أو الفرنسية؟', 1],
  ['What is your favorite season?', 'ما فصلك المفضل؟', 1],
  ['Help! I forgot my bag on the bus!', 'النجدة! نسيت حقيبتي في الحافلة!', 2],
  ['My birthday is on the fifth of May.', 'يوم مولدي في الخامس من مايو.', 2],

  ['Are you coming with us?', 'هل تأتي معنا؟', 1],
  ['Be careful with that glass!', 'احترس من ذلك الكوب!', 1],
  ['First, wash the rice.', 'أولا، اغسل الأرز.', 1],
  ['Is this seat taken?', 'هل هذا المقعد محجوز؟', 1],
  ['Congratulations on your new job!', 'تهانينا على عملك الجديد!', 1],
  ['I need paper, pens, and glue.', 'أحتاج ورقا وأقلاما وصمغا.', 2],
  ['Why did you leave early?', 'لماذا غادرت باكرا؟', 1],
  ['Watch out! The floor is wet.', 'انتبه! الأرضية مبللة.', 1],
  ['How much does this cost?', 'بكم هذا؟', 1],
  ['After dinner, we watch TV.', 'بعد العشاء نشاهد التلفاز.', 1],
  ['Could you pass the salt, please?', 'هل تمرر الملح، من فضلك؟', 1],
  ['What time does the film start?', 'متى يبدأ الفيلم؟', 1],

  ['Wow! That is amazing news!', 'رائع! هذا خبر مذهل!', 1],
  ['Do we need tickets for the show?', 'هل نحتاج تذاكر للعرض؟', 1],
  ['I visited Cairo, Alexandria, and Luxor.', 'زرت القاهرة والإسكندرية والأقصر.', 2],
  ['Where did you put the remote?', 'أين وضعت جهاز التحكم؟', 1],
  ['Hurry up! The taxi is here.', 'أسرع! سيارة الأجرة وصلت.', 1],
  ['Can I pay by card?', 'هل أدفع بالبطاقة؟', 1],
  ['No, thank you. I am full.', 'لا، شكرا. أنا شبعان.', 1],
  ['When does the museum close?', 'متى يغلق المتحف؟', 1],
  ['Please sit down and relax.', 'اجلس واسترح من فضلك.', 1],
  ['What a surprise to see you here!', 'يا للمفاجأة أن أراك هنا!', 1],

  ['Do you want tea or juice?', 'هل تريد شايا أم عصيرا؟', 1],
  ['Mind the step!', 'انتبه للدرجة!', 1],
  ['How was your weekend?', 'كيف كانت عطلتك؟', 1],
  ['The bill, please.', 'الحساب، من فضلك.', 1],
  ['Who is your favorite author?', 'من مؤلفك المفضل؟', 2],
  ["Don't touch the wet paint!", 'لا تلمس الطلاء المبلل!', 1],
  ['Which bus goes downtown?', 'أي حافلة تذهب إلى وسط المدينة؟', 1],
  ['Well done! You passed the test.', 'أحسنت! لقد نجحت في الاختبار.', 1],
]);
const l110Fills = [
  ff(TG110, 'question', 'Please raise your hand to ask a question.', 'ارفع يدك لطرح سؤال من فضلك.'),
  ff(TG110, 'comma', 'Use a comma after the greeting.', 'استخدم فاصلة بعد التحية.'),
  ff(TG110, 'exclamation', 'An exclamation mark shows strong feeling.', 'تدل علامة التعجب على شعور قوي.'),
  ff(TG110, 'period', 'End a statement with a period.', 'أنهِ الجملة الخبرية بنقطة.'),
  ff(TG110, 'Wow', 'Wow, this gift is wonderful.', 'رائع، هذه الهدية رائعة.'),
  ff(TG110, 'Stop', 'Stop at the red light, please.', 'توقف عند الإشارة الحمراء من فضلك.'),
  ff(TG110, 'please', 'Close the door, please.', 'أغلق الباب من فضلك.'),
  ff(TG110, 'mark', 'Put a question mark at the end.', 'ضع علامة استفهام في النهاية.'),
];
const l110Orders = O(TG110, [
  ['Does the shop open on Sunday?', 'هل يفتح المتجر يوم الأحد؟'],
  ['What a lovely day it is!', 'يا له من يوم جميل!'],
  ['I bought bread, cheese, and olives.', 'اشتريت خبزا وجبناما وزيتونا.'],
  ['Why are you laughing now?', 'لماذا تضحك الآن؟'],
  ['Please wait here for me.', 'انتظرني هنا من فضلك.'],
  ['How do you say this word?', 'كيف تقول هذه الكلمة؟'],
  ['Hurry up, the bus is leaving.', 'أسرع، فالحافلة تتحرك.'],
  ['Is your brother at home?', 'هل أخوك في البيت؟'],
]);
const l110Mc = M(TG110, [
  ['Which sentence is punctuated correctly?', ['Where is the bus stop', 'where is the bus stop?', 'Where is the bus stop?'], 2, 'السؤال يبدأ بحرف كبير وينتهي بعلامة استفهام.'],
  ['Which mark ends an exclamation?', ['.', '!', '?'], 1, 'علامة التعجب ! تختم الجملة التعجبية.'],
  ['Pick the correctly punctuated list.', ['I need pens paper and glue.', 'I need pens paper, glue.', 'I need pens, paper, and glue.'], 2, 'يفصل التعداد بفواصل: pens, paper, and glue.'],
  ['Which sentence needs a question mark?', ['Do you like coffee?', 'I like coffee.', 'I do not like coffee.'], 0, 'السؤال Do you like coffee? يأخذ علامة استفهام.'],
  ['Choose the correct greeting punctuation.', ['Hello Sara', 'Hello, Sara!', 'hello, Sara!'], 1, 'نضع فاصلة بعد Hello وعلامة تعجب للحماس.'],
  ['Where does the comma go?', ['No thank you,', 'No, thank you.', 'No thank you.'], 1, 'بعد أداة الرد No نضع فاصلة.'],
]);

/* ============================================================
   111 Capitalization Rules (A2)
   ============================================================ */
const TG111 = ['punctuation', 'capitalization'];
const l111Lt = T(TG111, [
  ['My name is Fatima and I am from Jordan.', 'اسمي فاطمة وأنا من الأردن.', 2],
  ['We speak Arabic at home and English at school.', 'نتحدث العربية في البيت والإنجليزية في المدرسة.', 2],
  ['The Nile is the longest river in Africa.', 'نهر النيل أطول نهر في أفريقيا.', 2],
  ['I have English class on Monday and Wednesday.', 'لدي حصة إنجليزية يوم الاثنين والأربعاء.', 2],
  ['Paris is the capital of France.', 'باريس عاصمة فرنسا.', 1],
  ['My teacher, Mr. Saleh, is very kind.', 'معلمي السيد صالح لطيف جدا.', 2],
  ['Eid comes after the month of Ramadan.', 'يأتي العيد بعد شهر رمضان.', 2],
  ['She works for Google in Dubai.', 'تعمل في غوغل بدبي.', 2],

  ['The Pacific Ocean is very large.', 'المحيط الهادي واسع جدا.', 2],
  ['I always start sentences with a capital letter.', 'أبدأ الجمل دائما بحرف كبير.', 1],
  ['The word English must be capitalized.', 'يجب كتابة كلمة English بحرف كبير.', 2],
  ['We visited the pyramids in Egypt.', 'زرنا الأهرامات في مصر.', 1],
  ['Dr. Adel will see you at noon.', 'سيفحصك الدكتور عادل ظهرا.', 2],
  ['My favorite book is Arabic Stories.', 'كتابي المفضل هو Arabic Stories.', 2],
  ['January is the first month of the year.', 'يناير أول شهر في السنة.', 1],
  ['He writes for a website called Arabic Today.', 'يكتب لموقع اسمه Arabic Today.', 2],
  ['We will travel to Turkey in summer.', 'سنسافر إلى تركيا في الصيف.', 1],
  ['The Red Sea is warm in August.', 'البحر الأحمر دافئ في أغسطس.', 2],
  ['Aunt Maryam lives in Alexandria.', 'تسكن العمة مريم في الإسكندرية.', 2],
  ['I take the metro at Union Square.', 'أركب المترو في ساحة يونيون.', 2],

  ['The Amazon rainforest is amazing.', 'غابة الأمازون مذهلة.', 2],
  ['Please address the letter to Mrs. Rania.', 'وجه الرسالة إلى السيدة رانيا من فضلك.', 2],
  ['Mount Sinai is in Egypt.', 'جبل سيناء في مصر.', 2],
  ['My course starts in September.', 'تبدأ دورتي في سبتمبر.', 1],
  ['She studies medicine at Cairo University.', 'تدرس الطب في جامعة القاهرة.', 2],
  ['The Eiffel Tower is in Paris.', 'برج إيفل في باريس.', 1],
  ['Arabic and French are both beautiful languages.', 'اللغتان العربية والفرنسية جميلتان معا.', 2],
  ['My flight to Madrid leaves on Friday.', 'رحلتي إلى مدريد تقلع يوم الجمعة.', 2],
  ['The company Samsung makes phones.', 'شركة سامسونج تصنع الهواتف.', 2],
  ['In Arabic, we write from right to left.', 'نكتب بالعربية من اليمين إلى اليسار.', 1],

  ['Uncle Kamal drives a delivery truck.', 'يقود العم كمال شاحنة توصيل.', 2],
  ['Christmas is in December.', 'يأتي عيد الميلاد في ديسمبر.', 1],
  ['The Museum of Islamic Art is wonderful.', 'متحف الفن الإسلامي رائع.', 2],
  ['Our team is called Desert Stars.', 'يُدعى فريقنا نجوم الصحراء.', 2],
  ['He lives on Tahrir Square.', 'يسكن في ساحة التحرير.', 2],
  ['The language school teaches Spanish and Italian.', 'تعلّم مدرسة اللغات الإسبانية والإيطالية.', 2],
  ['Lake Nasser is very big.', 'بحيرة ناصر كبيرة جدا.', 2],
  ['Her company, Nile Books, opened last month.', 'شركتها Nile Books افتُتحت الشهر الماضي.', 2],
]);
const l111Fills = [
  ff(TG111, 'capital', 'Every sentence starts with a capital letter.', 'كل جملة تبدأ بحرف كبير.'),
  ff(TG111, 'Monday', 'We meet again on Monday.', 'نلتقي مجددا يوم الاثنين.'),
  ff(TG111, 'Egypt', 'The Nile flows through Egypt.', 'يجري نهر النيل في مصر.'),
  ff(TG111, 'Arabic', 'Arabic has rich poetry.', 'للعربية شعر غني.'),
  ff(TG111, 'Mrs', 'Mrs Hassan teaches art on Sunday.', 'تدرّس السيدة حسن الفنون يوم الأحد.'),
  ff(TG111, 'Jordan', 'Petra is in Jordan.', 'تقع البتراء في الأردن.'),
  ff(TG111, 'September', 'The new term begins in September.', 'يبدأ الفصل الدراسي الجديد في سبتمبر.'),
  ff(TG111, 'University', 'Her dream is Cairo University.', 'حلمها جامعة القاهرة.'),
];
const l111Orders = O(TG111, [
  ['We visit Petra in October.', 'نزور البتراء في أكتوبر.'],
  ['My uncle lives in Abu Dhabi.', 'يسكن عمي في أبو ظبي.'],
  ['She reads Arabic books daily.', 'تقرأ الكتب العربية يوميا.'],
  ['The Nile flows through many countries.', 'يجري نهر النيل عبر بلدان كثيرة.'],
  ['Our class starts on Sunday morning.', 'تبدأ حصتنا صباح الأحد.'],
  ['He works for a company called Amazon.', 'يعمل في شركة اسمها أمازون.'],
  ['Mount Everest is the highest peak.', 'جبل إيفرست أعلى قمة.'],
  ['Her birthday is in July.', 'عيد ميلادها في يوليو.'],
]);
const l111Mc = M(TG111, [
  ['Which is capitalized correctly?', ['I live in Cairo.', 'i live in Cairo.', 'I Live in cairo.'], 0, 'أول الجملة واسم المدينة بحرف كبير، والباقي صغير.'],
  ['Which day needs a capital?', ['friday', 'FRiday', 'Friday'], 2, 'أيام الأسبوع تُكتب بحرف أول كبير: Friday.'],
  ['Pick the correct sentence.', ['she speaks English and arabic.', 'She speaks English and Arabic.', 'She speaks english and Arabic.'], 1, 'أول الجملة واسمي اللغتين بحرف كبير.'],
  ['Which title is correct?', ['mr. Ahmed', 'Mr. Ahmed', 'MR. ahmed'], 1, 'اللقب Mr. يُكتب بحرف كبير.'],
  ['Which month is written correctly?', ['september', 'September', 'sEptember'], 1, 'أسماء الشهور بحرف أول كبير: September.'],
  ['Which country name is right?', ['Jordan', 'jordan', 'JORDan'], 0, 'أسماء الدول بحرف أول كبير: Jordan.'],
]);

/* ============================================================
   112 Apostrophes & Contractions (A2)
   ============================================================ */
const TG112 = ['punctuation', 'contractions'];
const l112Lt = T(TG112, [
  ["I don't like cold coffee.", 'لا أحب القهوة الباردة.', 1],
  ["She's my older sister.", 'هي أختي الكبرى.', 1],
  ["We won't be late, I promise.", 'لن نتأخر، أعدك.', 1],
  ["This is Sara's book.", 'هذا كتاب سارة.', 1],
  ["It's almost midnight.", 'لقد أوشكت الساعة على منتصف الليل.', 1],
  ["The boys' room is upstairs.", 'غرفة الأولاد في الطابق العلوي.', 2],
  ["I can't find my glasses.", 'لا أستطيع إيجاد نظارتي.', 1],
  ["He didn't answer my message.", 'لم يرد على رسالتي.', 1],

  ["My brother's car is new.", 'سيارة أخي جديدة.', 1],
  ["You're welcome anytime.", 'أنت مرح بك في أي وقت.', 1],
  ["Let's take a short break.", 'لنأخذ استراحة قصيرة.', 1],
  ["What's the time now?", 'كم الساعة الآن؟', 1],
  ["The dog's name is Lucky.", 'اسم الكلب لاكي.', 1],
  ["They've finished their homework.", 'لقد أنهوا واجبهم.', 1],
  ["I'd like a small tea, please.", 'أريد شايا صغيرا من فضلك.', 1],
  ["She doesn't eat meat.", 'هي لا تأكل اللحم.', 1],
  ["That's a great idea!", 'تلك فكرة رائعة!', 1],
  ["My uncle's farm is far away.", 'مزرعة عمي بعيدة.', 2],
  ["There's a good film tonight.", 'هناك فيلم جيد الليلة.', 1],
  ["We're moving to a new flat.", 'ننتقل إلى شقة جديدة.', 1],

  ["The teacher's desk is near the door.", 'مكتب المعلم قرب الباب.', 2],
  ["He hasn't called me yet.", 'لم يتصل بي بعد.', 1],
  ["Who's at the door?", 'من الذي عند الباب؟', 1],
  ["The kids' toys are everywhere.", 'ألعاب الأطفال في كل مكان.', 2],
  ["It doesn't work anymore.", 'لم يعد يعمل.', 1],
  ["You've got a nice voice.", 'لديك صوت جميل.', 1],
  ["My mother's cooking smells great.", 'طيب رائحة طبخ أمي.', 2],
  ["I'm sorry for the delay.", 'أنا آسف على التأخير.', 1],
  ["The cat's bowl is empty.", 'وعاء القط فارغ.', 1],
  ["Weren't you at the meeting?", 'ألم تكن في الاجتماع؟', 2],

  ["Ali's laptop needs charging.", 'حاسوب علي يحتاج إلى شحن.', 1],
  ["Isn't this your umbrella?", 'أليست مظلتك هذه؟', 1],
  ["The manager's office is closed today.", 'مكتب المدير مغلق اليوم.', 2],
  ["We'd better leave now.", 'من الأفضل أن ننصرف الآن.', 2],
  ["Nobody's home right now.", 'لا أحد في البيت الآن.', 2],
  ["Hasn't the train arrived yet?", 'ألم يصل القطار بعد؟', 2],
  ["My sister's husband is a pilot.", 'زوج أختي طيار.', 2],
  ["I couldn't hear the last question.", 'لم أتمكن من سماع السؤال الأخير.', 2],
]);
const l112Fills = [
  ff(TG112, "don't", "I don't watch TV at night.", 'لا أشاهد التلفاز ليلا.'),
  ff(TG112, "It's", "It's a beautiful day today.", 'إنه يوم جميل اليوم.'),
  ff(TG112, "can't", "She can't come to the party.", 'لا تستطيع الحضور إلى الحفلة.'),
  ff(TG112, "We're", "We're ready for the trip.", 'نحن مستعدون للرحلة.'),
  ff(TG112, "Sara's", "This is Sara's favorite cup.", 'هذا كوب سارة المفضل.'),
  ff(TG112, "isn't", "The shop isn't open yet.", 'لم يفتح المتجر بعد.'),
  ff(TG112, "hasn't", "He hasn't finished his lunch.", 'لم ينهِ غداءه بعد.'),
  ff(TG112, "brother's", "My brother's room is always tidy.", 'غرفة أخي مرتبة دائما.'),
];
const l112Orders = O(TG112, [
  ["I don't understand this lesson.", 'لا أفهم هذا الدرس.'],
  ["She's my best friend here.", 'هي أعز أصدقائي هنا.'],
  ["We won't stay very long.", 'لن نبقى طويلا جدا.'],
  ["That's my father's old chair.", 'ذلك كرسي أبي القديم.'],
  ["You're late again this morning.", 'لقد تأخرت مجددا هذا الصباح.'],
  ["Let's order some fresh juice.", 'لنطلب بعض العصير الطازج.'],
  ["The children's books are downstairs.", 'كتب الأطفال في الطابق الأسفل.'],
  ["He hasn't seen that movie.", 'لم يشاهد ذلك الفيلم.'],
]);
const l112Mc = M(TG112, [
  ['Which is correct?', ["It's raining now.", 'Its raining now.', "It is'nt raining now."], 0, "It's اختصار it is، والصيغة الصحيحة: It's raining now."],
  ["Sara's book means…", ['Sara is a book', 'many books', 'the book of Sara'], 2, "Sara's book تعني كتاب سارة، أي كتاب يخص سارة."],
  ["Which contraction matches 'do not'?", ["do'nt", "don't", "dont'"], 1, 'do not تصبح don\'t بحذف حرف o ووضع الفاصلة مكانه.'],
  ['Which is the plural possessive?', ["the boy's room", "the boys' room", "the boys room"], 1, "لجمع منتهي بـ s نضيف الفاصلة فقط: the boys' room."],
  ['Pick the correct contraction.', ['Were here.', "We'er here.", "We're here."], 2, "We're اختصار we are."],
  ["Which is correct for 'she is'?", ["Shes'", "She's", "She'z"], 1, 'she is تصبح she\'s.'],
]);

/* ============================================================
   113 Sentence Correction I (A2)
   ============================================================ */
const TG113 = ['writing-skills', 'sentence-correction'];
const l113Lt = T(TG113, [
  ['She goes to work by bus.', 'تذهب إلى العمل بالحافلة.', 1],
  ['There are two cats in the garden.', 'هناك قطان في الحديقة.', 1],
  ['He is my youngest brother.', 'هو أخي الأصغر.', 1],
  ['I have a new phone.', 'لدي هاتف جديد.', 1],
  ['The children play in the park.', 'يلعب الأطفال في الحديقة العامة.', 1],
  ['My father is a doctor.', 'والدي طبيب.', 1],
  ['We do not eat in the classroom.', 'لا نأكل في الفصل.', 1],
  ['She always does her homework.', 'وهي تؤدي واجبها دائما.', 1],

  ['The book is on the shelf.', 'الكتاب على الرف.', 1],
  ['I am interested in history.', 'أنا مهتم بالتاريخ.', 2],
  ['He can swim very well.', 'يتقن السباحة جيدا.', 1],
  ['There is a mosque near my house.', 'هناك مسجد قرب بيتي.', 1],
  ['My sister works at a hospital.', 'تعمل أختي في مستشفى.', 1],
  ['The weather is colder today.', 'الجو أبرد اليوم.', 1],
  ['I usually drink tea without sugar.', 'أشرب الشاي عادة بدون سكر.', 1],
  ['They arrived at the airport early.', 'وصلوا إلى المطار باكرا.', 2],
  ['She is good at mathematics.', 'هي بارعة في الرياضيات.', 1],
  ['The bus stops in front of the bank.', 'تتوقف الحافلة أمام المصرف.', 2],
  ['I agree with your opinion.', 'أوافق على رأيك.', 2],
  ['He listens to the radio at night.', 'يستمع إلى الراديو ليلا.', 1],

  ['We are proud of our team.', 'نحن فخورون بفريقنا.', 2],
  ['The keys are in my pocket.', 'المفاتيح في جيبي.', 1],
  ['She made a big mistake.', 'ارتكبت خطأ كبيرا.', 1],
  ['My aunt speaks three languages.', 'تتحدث عمتي ثلاث لغات.', 2],
  ['This problem is easy to solve.', 'هذه المسألة سهلة الحل.', 2],
  ['He plays football with his friends.', 'يلعب كرة القدم مع أصدقائه.', 1],
  ['I write letters with a pen.', 'أكتب الرسائل بالقلم.', 1],
  ['The meeting starts at noon sharp.', 'يبدأ الاجتماع ظهرا تماما.', 2],
  ['My cousins live in another city.', 'يقيم أبناء عمي في مدينة أخرى.', 2],
  ['The soup needs a little salt.', 'يحتاج الحساء قليلا من الملح.', 1],

  ['She travels to work by metro.', 'تسافر إلى العمل بالمترو.', 1],
  ['The garden is full of flowers.', 'الحديقة مليئة بالأزهار.', 1],
  ['I never drink coffee at night.', 'لا أشرب القهوة أبدا ليلا.', 1],
  ['His answer was completely correct.', 'كانت إجابته صحيحة تماما.', 2],
  ['They are waiting outside the clinic.', 'ينتظرون خارج العيادة.', 2],
  ['The film was boring, to be honest.', 'كان الفيلم مملّا، بصراحة.', 2],
  ['You must check your answers.', 'يجب أن تتحقق من إجاباتك.', 1],
  ['Her handwriting is very neat.', 'خطها جميل ومرتب جدا.', 2],
]);
const l113Fills = [
  ff(TG113, 'are', 'There are many shops nearby.', 'هناك متاجر كثيرة قريبة.'),
  ff(TG113, 'goes', 'My mother goes to the market daily.', 'تذهب أمي إلى السوق يوميا.'),
  ff(TG113, 'is', 'The key is under the mat.', 'المفتاح تحت البساط.'),
  ff(TG113, 'by', 'She travels by train.', 'تسافر بالقطار.'),
  ff(TG113, 'interested', 'I am interested in old coins.', 'أنا مهتم بالعملات القديمة.'),
  ff(TG113, 'at', 'He is good at drawing.', 'هو بارع في الرسم.'),
  ff(TG113, 'agree', 'I agree with your plan.', 'أوافق على خطتك.'),
  ff(TG113, 'front', 'The taxi waits in front of the hotel.', 'تنتظر سيارة الأجرة أمام الفندق.'),
];
const l113Orders = O(TG113, [
  ['My sister works in a pharmacy.', 'تعمل أختي في صيدلية.'],
  ['The children are in the garden.', 'الأطفال في الحديقة.'],
  ['He always does his homework early.', 'يؤدي واجبه دائما باكرا.'],
  ['We eat dinner together every night.', 'نتناول العشاء معا كل ليلة.'],
  ['The bus arrives very late today.', 'تصل الحافلة متأخرة جدا اليوم.'],
  ['She speaks English with her teacher.', 'تتحدث الإنجليزية مع معلمتها.'],
  ['I usually walk to the mosque.', 'أمشي إلى المسجد عادة.'],
  ['They clean the house on Friday.', 'ينظفون البيت يوم الجمعة.'],
]);
const l113Mc = M(TG113, [
  ['Which sentence is correct?', ['She go to work early.', 'She going to work early.', 'She goes to work early.'], 2, 'مع الفاعل she نضيف s للفعل: she goes.'],
  ['Pick the correct one.', ['There is two cats here.', 'There are two cats here.', 'There are two cat here.'], 1, 'مع الجمع نستخدم There are و nouns جمع.'],
  ['Which is right?', ['I am interesting in history.', 'I interested on history.', 'I am interested in history.'], 2, 'الصواب: interested in أي مهتم بـ.'],
  ['Choose the correct sentence.', ['She is good on math.', 'She is good at math.', 'She is good for math.'], 1, 'good at تعني بارع في.'],
  ['Which sentence has the right preposition?', ['The bus stops on front the bank.', 'The bus stops in front the bank.', 'The bus stops in front of the bank.'], 2, 'أمام = in front of.'],
  ['Pick the correct verb.', ['He listen to the radio.', 'He listens to the radio.', 'He listening to the radio.'], 1, 'مع he نضيف s: he listens.'],
]);

/* ============================================================
   114 Sentence Correction II (B1)
   ============================================================ */
const TG114 = ['writing-skills', 'sentence-correction-2'];
const l114Lt = T(TG114, [
  ['I have lived here for three years.', 'أسكن هنا منذ ثلاث سنوات.', 2],
  ['She has studied English since 2020.', 'تدرس الإنجليزية منذ عام 2020.', 2],
  ['There are fewer cars on the road today.', 'هناك سيارات أقل على الطريق اليوم.', 2],
  ['How much time do we have left?', 'كم من الوقت بقي لنا؟', 2],
  ['How many people came to the meeting?', 'كم شخصا حضر الاجتماع؟', 2],
  ['This road is more dangerous than that one.', 'هذا الطريق أخطر من ذاك.', 2],
  ['He suggested going out for dinner.', 'اقترح الخروج لتناول العشاء.', 2],
  ['I look forward to your reply.', 'أتطلع إلى ردك.', 2],

  ['She asked me to help her brother.', 'طلبت مني مساعدة أخيها.', 2],
  ['The results were better than expected.', 'كانت النتائج أفضل من المتوقع.', 2],
  ['We discussed the plan in detail.', 'ناقشنا الخطة بالتفصيل.', 2],
  ['He explained the problem very clearly.', 'شرح المسألة بوضوح تام.', 2],
  ['Neither answer is completely right.', 'لا إجابة منهما صحيحة تماما.', 2],
  ['I would rather stay at home tonight.', 'أفضل البقاء في البيت الليلة.', 2],
  ['The train should arrive by six.', 'من المفترض أن يصل القطار قبل السادسة.', 2],
  ['She avoids driving during rush hour.', 'تجنّب القيادة وقت الذروة.', 2],
  ['Each student has a different idea.', 'لكل طالب فكرة مختلفة.', 2],
  ['The medicine must be kept cold.', 'يجب حفظ الدواء في مكان بارد.', 2],
  ['We are used to the hot weather.', 'أصبحنا معتادين على الجو الحار.', 2],
  ['He apologized for being late again.', 'اعتذر عن تأخره مرة أخرى.', 2],

  ['The report needs a few changes.', 'يحتاج التقرير إلى بعض التغييرات.', 2],
  ['I have not seen him since Friday.', 'لم أره منذ الجمعة.', 2],
  ['This is the best restaurant in town.', 'هذا أفضل مطعم في البلدة.', 2],
  ['The meeting lasted two full hours.', 'استمر الاجتماع ساعتين كاملتين.', 2],
  ['She recommended a very good book.', 'أوصت بكتاب جيد جدا.', 2],
  ['The price depends on the season.', 'يتوقف السعر على الموسم.', 2],
  ['The new update works much faster.', 'يعمل التحديث الجديد أسرع بكثير.', 2],
  ['They managed to finish on time.', 'تمكنوا من الانتهاء في الوقت المحدد.', 2],
  ['The company raised its prices again.', 'رفعت الشركة أسعارها مرة أخرى.', 2],
  ['I am looking for a quieter place.', 'أبحث عن مكان أكثر هدوءا.', 2],

  ['The recipe calls for two eggs.', 'تتطلب الوصفة بيضتين.', 2],
  ['He denied taking the money.', 'أنفى أنه أخذ المال.', 2],
  ['The city has grown very fast.', 'كبرت المدينة بسرعة كبيرة.', 2],
  ['We agreed on the final date.', 'اتفقنا على التاريخ النهائي.', 2],
  ['Her English improved a lot this year.', 'تحسنت لغتها الإنجليزية كثيرا هذا العام.', 2],
  ['The flight was delayed by fog.', 'تأخرت الرحلة بسبب الضباب.', 2],
  ['You should double-check the numbers.', 'ينبغي أن تتحقق من الأرقام مرة أخرى.', 2],
  ['The plan sounds good to me.', 'تبدو الخطة جيدة بالنسبة لي.', 2],
]);
const l114Fills = [
  ff(TG114, 'since', 'I have known her since childhood.', 'أعرفها منذ الطفولة.'),
  ff(TG114, 'fewer', 'There are fewer customers in winter.', 'هناك زبائن أقل في الشتاء.'),
  ff(TG114, 'much', 'How much money do you need?', 'كم من المال تحتاج؟'),
  ff(TG114, 'better', 'The new plan works better.', 'تعمل الخطة الجديدة أفضل.'),
  ff(TG114, 'apologized', 'He apologized for the mistake.', 'اعتذر عن الخطأ.'),
  ff(TG114, 'depends', 'The cost depends on the distance.', 'تتوقف التكلفة على المسافة.'),
  ff(TG114, 'quieter', 'We moved to a quieter street.', 'انتقلنا إلى شارع أكثر هدوءا.'),
  ff(TG114, 'improved', 'Her handwriting improved this term.', 'تحسّن خطها هذا الفصل.'),
];
const l114Orders = O(TG114, [
  ['She has worked here since May.', 'تعمل هنا منذ مايو.'],
  ['The weather is warmer than yesterday.', 'الجو أدفأ من أمس.'],
  ['We discussed the plan this morning.', 'ناقشنا الخطة هذا الصباح.'],
  ['He apologized to the whole class.', 'اعتذر للصف كله.'],
  ['The cost depends on the quality.', 'تتوقف التكلفة على الجودة.'],
  ['My brother drives more carefully now.', 'يقود أخي بحذر أكبر الآن.'],
  ['They finished the project on time.', 'أنهوا المشروع في الوقت المحدد.'],
  ['I have not seen her recently.', 'لم أرها مؤخرا.'],
]);
const l114Mc = M(TG114, [
  ['Which tense is correct?', ['I live here since three years.', 'I am living here since three years.', 'I have lived here for three years.'], 2, 'مع المدة نستخدم for: for three years مع المضارع التام.'],
  ['Pick the right word.', ['How many people came?', 'How much people came?', 'How many much people?'], 0, 'مع المعدود نستخدم many: How many people.'],
  ['Which is grammatically correct?', ['She suggested going out.', 'She suggested to go out.', 'She suggested go out.'], 0, 'بعد suggest نستخدم اسم الفعل: suggested going.'],
  ['Choose the correct comparison.', ['This road is dangerouser.', 'This road is more dangerous.', 'This road is most dangerous than that.'], 1, 'الصفة الطويلة تأخذ more مع than في المقارنة.'],
  ['Choose the right option.', ['I look forward your reply.', 'I look forward to your reply.', 'I look forward meet you.'], 1, 'العبارة الثابتة: look forward to.'],
  ['Pick the correct tense.', ['He apologize for being late.', 'He has apologize for being late.', 'He apologized for being late.'], 2, 'الماضي البسيط: apologized.'],
]);

/* ============================================================
   115 Word Order Drill I (A1)
   ============================================================ */
const TG115 = ['word-order', 'word-order-basics'];
const l115Lt = T(TG115, [
  ['I like this song.', 'أحب هذه الأغنية.', 1],
  ['She knows my cousin.', 'هي تعرف ابن عمي.', 1],
  ['We need more chairs.', 'نحتاج كراسيا أكثر.', 1],
  ['The dog wants food.', 'الكلب يريد طعاما.', 1],
  ['He reads a new book.', 'يقرأ كتابا جديدا.', 1],
  ['My mother makes good tea.', 'أمي تصنع شايا لذيذا.', 1],
  ['They speak Arabic here.', 'يتحدثون العربية هنا.', 1],
  ['I drink milk at night.', 'أشرب الحليب ليلا.', 1],

  ['The shop sells fresh bread.', 'يبيع المتجر خبزا طازجا.', 1],
  ['She wears a red scarf.', 'ترتدي وشاحا أحمر.', 1],
  ['We watch the match together.', 'نشاهد المباراة معا.', 1],
  ['My friend has a bicycle.', 'يملك صديقي دراجة.', 1],
  ['The teacher writes on the board.', 'يكتب المعلم على السبورة.', 1],
  ['I send her a message.', 'أرسل لها رسالة.', 1],
  ['He keeps his room tidy.', 'يحافظ على غرفته مرتبة.', 2],
  ['The baby drinks warm milk.', 'يشرب الطفل حليبا دافئا.', 1],
  ['She helps her old neighbour.', 'تساعد جارها المسن.', 2],
  ['We visit our uncle monthly.', 'نزور عمنا شهريا.', 2],
  ['The boys clean the yard.', 'ينظف الأولاد الفناء.', 1],
  ['I take the early bus.', 'أركب الحافلة الباكرة.', 1],

  ['My sister draws beautiful birds.', 'ترسم أختي طيورا جميلة.', 2],
  ['The farmer sells fresh eggs.', 'يبيع المزارع بيضا طازجا.', 1],
  ['He carries a heavy bag.', 'يحمل حقيبة ثقيلة.', 1],
  ['She learns new words daily.', 'تتعلم كلمات جديدة يوميا.', 2],
  ['We cook fish on Friday.', 'نطبخ السمك يوم الجمعة.', 1],
  ['The gardener waters the roses.', 'يسقي البستاني الورود.', 2],
  ['I keep my money safe.', 'أحفظ نقدي في أمان.', 2],
  ['The waiter brings the menu.', 'يجلب النادل القائمة.', 1],
  ['She opens the small window.', 'تفتح النافذة الصغيرة.', 1],
  ['My brother fixes old bikes.', 'يصلح أخي دراجات قديمة.', 2],

  ['The postman brings the letters.', 'يجلب ساعي البريد الرسائل.', 1],
  ['I choose the blue shirt.', 'أختار القميص الأزرق.', 1],
  ['She closes the shop at eight.', 'تغلق المتجر في الثامنة.', 1],
  ['We borrow books every week.', 'نستعير كتبا كل أسبوع.', 1],
  ['The pilot flies small planes.', 'يقود الطيار طائرات صغيرة.', 2],
  ['I write my name first.', 'أكتب اسمي أولا.', 1],
  ['The students answer the questions.', 'يجيب الطلاب عن الأسئلة.', 1],
  ['She finds her keys quickly.', 'تجد مفاتيحها بسرعة.', 2],
]);
const l115Fills = [
  ff(TG115, 'song', 'I like this song very much.', 'أحب هذه الأغنية كثيرا.'),
  ff(TG115, 'sells', 'The shop sells fresh fruit.', 'يبيع المتجر فاكهة طازجة.'),
  ff(TG115, 'reads', 'My father reads the paper daily.', 'يقرأ والدي الجريدة يوميا.'),
  ff(TG115, 'wears', 'She wears a white coat at work.', 'ترتدي معطفا أبيض في العمل.'),
  ff(TG115, 'sends', 'He sends his family money monthly.', 'يرسل لأسلته مالا شهريا.'),
  ff(TG115, 'brings', 'The waiter brings the bill.', 'يجلب النادل الحساب.'),
  ff(TG115, 'waters', 'The gardener waters the plants twice a day.', 'يسقي البستاني النباتات مرتين يوميا.'),
  ff(TG115, 'answer', 'Please write your answer clearly.', 'اكتب إجابتك بوضوح من فضلك.'),
];
const l115Orders = O(TG115, [
  ['I like this music.', 'أحب هذا الموسيقى.'],
  ['She drinks hot tea.', 'تشرب شايا ساخنا.'],
  ['We play tennis here.', 'نلعب التنس هنا.'],
  ['He drives a taxi.', 'يقود سيارة أجرة.'],
  ['My aunt tells funny stories.', 'تحكي خالتي قصصا مضحكة.'],
  ['The boy kicks the ball.', 'يركل الولد الكرة.'],
  ['I need a new bag.', 'أحتاج حقيبة جديدة.'],
  ['She writes short emails.', 'تكتب رسائل إلكترونية قصيرة.'],
]);
const l115Mc = M(TG115, [
  ['Which order is correct?', ['Like I song this.', 'This song like I.', 'I like this song.'], 2, 'الترتيب الصحيح: فاعل ثم فعل ثم مفعول.'],
  ['Where does the adjective go?', ['a scarf red', 'red a scarf', 'a red scarf'], 2, 'تسبق الصفة الاسم: a red scarf.'],
  ['Pick the sentence with the right order.', ['She tea hot drinks.', 'She drinks hot tea.', 'Drinks she hot tea.'], 1, 'الفاعل ثم الفعل ثم المفعول: She drinks hot tea.'],
  ['Which is natural English?', ['He a taxi drives.', 'He drives a taxi.', 'A taxi he drives.'], 1, 'الترتيب الطبيعي: He drives a taxi.'],
  ['Choose the right order.', ['The boy kicks the ball.', 'The ball the boy kicks.', 'Kicks the boy the ball.'], 0, 'فاعل فعل مفعول: The boy kicks the ball.'],
  ['Which sentence is correct?', ['I a new bag need.', 'I need a new bag.', 'Need I a new bag.'], 1, 'الخبرية تبدأ بالفاعل: I need a new bag.'],
]);

/* ============================================================
   116 Word Order Drill II (A2) — longer scrambles
   ============================================================ */
const TG116 = ['word-order', 'word-order-long'];
const l116Lt = T(TG116, [
  ['My mother buys vegetables from the market every week.', 'تشتري أمي الخضروات من السوق كل أسبوع.', 2],
  ['The children play football in the yard after school.', 'يلعب الأطفال كرة القدم في الفناء بعد المدرسة.', 2],
  ['I usually read the news before breakfast.', 'أقرأ الأخبار عادة قبل الفطور.', 2],
  ['She sends her reports to the manager on Sunday.', 'ترسل تقاريرها إلى المدير يوم الأحد.', 2],
  ['We sometimes watch old films on Friday nights.', 'نشاهد أحيانا أفلاما قديمة ليالي الجمعة.', 2],
  ['The new teacher speaks slowly and very clearly.', 'المعلم الجديد يتحدث ببطء ووضوح شديد.', 2],
  ['He keeps his tools in a small red box.', 'يحفظ أدواته في صندوق أحمر صغير.', 2],
  ['My neighbors walk around the park every evening.', 'يتجول جيراني حول الحديقة كل مساء.', 2],

  ['The company sends a monthly newsletter to clients.', 'ترسل الشركة نشرة شهرية إلى العملاء.', 2],
  ['She always checks her emails before the meeting.', 'تتحقق من بريدها دائما قبل الاجتماع.', 2],
  ['The baker starts work before the sun rises.', 'يبدأ الخباز عمله قبل شروق الشمس.', 2],
  ['We invite our relatives for lunch every Eid.', 'ندعو أقاربنا إلى الغداء في كل عيد.', 2],
  ['I write my shopping list on my phone.', 'أكتب قائمة مشترياتي على هاتفي.', 2],
  ['The engineer checks the bridge twice a year.', 'يفحص المهندس الجسر مرتين في السنة.', 2],
  ['My little sister draws animals on every page.', 'ترسم أختي الصغيرة حيوانات على كل صفحة.', 2],
  ['They clean the whole house before the holiday.', 'ينظفون البيت كله قبل العطلة.', 2],
  ['The guide explains the history of the tower.', 'يشرح المرشد تاريخ البرج.', 2],
  ['He drives his children to school in the morning.', 'يقل أبناءه إلى المدرسة في الصباح.', 2],
  ['She practices the piano for an hour daily.', 'تتدرب على البيانو ساعة يوميا.', 2],
  ['We plant flowers along the fence in spring.', 'نزرع الأزهار على طول السياج في الربيع.', 2],

  ['I return my library books at the end of the month.', 'أعيد كتب المكتبة في نهاية الشهر.', 2],
  ['The receptionist answers the phone with a smile.', 'يرد موظف الاستقبال على الهاتف بابتسامة.', 2],
  ['My father washes the car every Saturday morning.', 'يغسل والدي السيارة كل صباح سبت.', 2],
  ['She puts the keys in a bowl near the door.', 'تضع المفاتيح في وعاء قرب الباب.', 2],
  ['The students ask the teacher many good questions.', 'يطرح الطلاب على المعلم أسئلة جيدة كثيرة.', 2],
  ['We take the ferry across the river on Mondays.', 'نأخذ العبّارة عبر النهر أيام الاثنين.', 2],
  ['He saves a small part of his salary monthly.', 'يدخر جزءا صغيرا من راتبه شهريا.', 2],
  ['The librarian keeps the old maps on the top floor.', 'يحفظ أمين المكتبة الخرائط القديمة في الطابق العلوي.', 2],
  ['She waters the balcony plants before going to work.', 'تسقي نباتات الشرفة قبل الذهاب إلى العمل.', 2],
  ['My uncle sells honey at the weekend market.', 'يبيع عمي العسل في سوق نهاية الأسبوع.', 2],

  ['The team celebrates every goal with a small song.', 'يحتفل الفريق بكل هدف بأغنية صغيرة.', 2],
  ['I check the weather before any long drive.', 'أتحقق من الطقس قبل أي مشوار طويل.', 2],
  ['The tailor measures his customers very carefully.', 'يقيس الخياط عملاءه بعناية بالغة.', 2],
  ['We discuss the weekly plan every Monday morning.', 'نناقش الخطة الأسبوعية كل صباح اثنين.', 2],
  ['The police officer directs traffic at the busy crossing.', 'يوجه رجل الشرطة المرور عند التقاطع المزدحم.', 2],
  ['She organizes her desk at the end of each day.', 'ترتب مكتبها في نهاية كل يوم.', 2],
  ['The fishermen leave the harbor before dawn every day.', 'يغادر الصيادون الميناء قبل الفجر كل يوم.', 2],
]);
const l116Fills = [
  ff(TG116, 'monthly', 'The company holds a monthly meeting.', 'تعقد الشركة اجتماعا شهريا.'),
  ff(TG116, 'carefully', 'Please cross the road carefully.', 'اعبر الطريق بحذر من فضلك.'),
  ff(TG116, 'weekly', 'Our team has a weekly session.', 'لدى فريقنا جلسة أسبوعية.'),
  ff(TG116, 'daily', 'She practices the piano daily.', 'تتدرب على البيانو يوميا.'),
  ff(TG116, 'before', 'Check the oil before you drive.', 'تحقق من الزيت قبل أن تقود.'),
  ff(TG116, 'across', 'We walked across the old bridge.', 'عبرنا الجسر القديم.'),
  ff(TG116, 'twice', 'The nurse visits the clinic twice a week.', 'تزور الممرضة العيادة مرتين أسبوعيا.'),
  ff(TG116, 'gradually', 'The pain went away gradually.', 'زال الألم تدريجيا.'),
];
const l116Orders = O(TG116, [
  ['My mother buys vegetables every single week.', 'تشتري أمي الخضروات كل أسبوع.'],
  ['The children play football every afternoon.', 'يلعب الأطفال كرة القدم كل عصر.'],
  ['She sends her reports on Sunday morning.', 'ترسل تقاريرها صباح الأحد.'],
  ['We sometimes watch old films on Friday.', 'نشاهد أحيانا أفلاما قديمة يوم الجمعة.'],
  ['The new teacher speaks slowly and clearly.', 'المعلم الجديد يتحدث ببطء ووضوح.'],
  ['He keeps his tools in the garage.', 'يحفظ أدواته في المرآب.'],
  ['My neighbors walk around the park daily.', 'يتجول جيراني حول الحديقة يوميا.'],
  ['The company sends a newsletter every month.', 'ترسل الشركة نشرة كل شهر.'],
  ['She always checks her emails before meetings.', 'تتحقق من بريدها دائما قبل الاجتماعات.'],
  ['I write my shopping list on paper.', 'أكتب قائمة مشترياتي على الورق.'],
]);
const l116Mc = M(TG116, [
  ['Which word order is right?', ['Usually I before breakfast read.', 'Read I usually before breakfast.', 'I usually read before breakfast.'], 2, 'الظرف usually قبل الفعل: I usually read.'],
  ['Where does "usually" go?', ['I walk usually to work.', 'Walk I usually to work.', 'I usually walk to work.'], 2, 'الظرف يأتي قبل الفعل الرئيسي: I usually walk.'],
  ['Pick the natural order.', ['She her emails checks before the meeting.', 'She checks her emails before the meeting.', 'Before the meeting she her emails checks.'], 1, 'الترتيب الطبيعي: فاعل فعل مفعول ثم الزمان.'],
  ['Which is correct?', ['He drives to school his children.', 'He his children drives to school.', 'He drives his children to school.'], 2, 'المفعول يلي الفعل: drives his children.'],
  ['Choose the correct order.', ['The chef the soup tastes before serving.', 'The chef tastes the soup before serving.', 'Before serving the chef the soup tastes.'], 1, 'فاعل فعل مفعول: The chef tastes the soup.'],
  ['Which order sounds right?', ['We every Monday discuss the plan.', 'Discuss we the plan every Monday.', 'We discuss the plan every Monday.'], 2, 'الزمان يأتي في النهاية: every Monday.'],
]);

/* ============================================================
   117 Dictation: Dates & Appointments (A2)
   ============================================================ */
const TG117 = ['listening-writing', 'dates-appointments'];
const l117Lt = T(TG117, [
  ['My appointment is on Tuesday, March 4.', 'موعد يوم الثلاثاء الرابع من مارس.', 2],
  ['The meeting is at half past ten.', 'الاجتماع في العاشرة والنصف.', 2],
  ['Please confirm the date by email.', 'أكد التاريخ بالبريد الإلكتروني من فضلك.', 2],
  ['The clinic opens on Sunday morning.', 'تفتح العيادة صباح الأحد.', 2],
  ['My exam is on the fifteenth of June.', 'امتحاني في الخامس عشر من يونيو.', 2],
  ['We moved the meeting to Thursday.', 'نقلنا الاجتماع إلى الخميس.', 2],
  ['The dentist can see me at eleven fifteen.', 'يستطيع طبيب الأسنان رؤيتي في الحادية عشرة والربع.', 2],
  ['My birthday is on the first of October.', 'عيد ميلادي في الأول من أكتوبر.', 2],

  ['The deadline is Friday at noon.', 'الموعد النهائي يوم الجمعة ظهرا.', 2],
  ['I booked a table for Saturday evening.', 'حجزت طاولة لسهرة السبت.', 2],
  ['The interview is on Wednesday at two.', 'المقابلة يوم الأربعاء في الثانية.', 2],
  ['Our wedding anniversary is in July.', 'ذكرى زواجنا في يوليو.', 2],
  ['The report is due next Monday.', 'يُستحق التقرير الاثنين القادم.', 2],
  ['School resumes on the tenth of September.', 'تستأنف المدرسة في العاشر من سبتمبر.', 2],
  ['The concert starts at eight on Saturday.', 'يبدأ الحفل في الثامنة يوم السبت.', 2],
  ['Can we reschedule to next week?', 'هل نعيد الجدولة للأسبوع القادم؟', 2],
  ['The train departs on the third at dawn.', 'يقلع القطار في الثالث عند الفجر.', 2],
  ['My visa expires in November.', 'تنتهي تأشيرتي في نوفمبر.', 2],
  ['The payment is due on the first.', 'يستحق الدفع في الأول.', 2],
  ['Let us meet on Thursday instead.', 'لنلتقِ يوم الخميس بدلا من ذلك.', 2],

  ['The doctor sees me every two weeks.', 'يفحصني الطبيب كل أسبوعين.', 2],
  ["The party is on New Year's Eve.", 'الحفلة في ليلة رأس السنة.', 2],
  ['I scheduled the call for nine sharp.', 'حددت الاتصال في التاسعة تماما.', 2],
  ['The museum is closed on Mondays.', 'المتحف مغلق أيام الاثنين.', 2],
  ['The training course starts in August.', 'تبدأ دورة التدريب في أغسطس.', 2],
  ['My shift starts at six in the evening.', 'تبدأ ورديتي في السادسة مساء.', 2],
  ['The rent is due on the fifth.', 'يستحق الإيجار في الخامس.', 2],
  ['We have a family gathering on Friday.', 'لدينا تجمع عائلي يوم الجمعة.', 2],
  ['The flight lands on the twelfth at midnight.', 'تهبط الرحلة في الثاني عشر منتصف الليل.', 2],
  ['Please arrive ten minutes early.', 'احضر قبل عشر دقائق من فضلك.', 2],

  ['The seminar runs from Monday to Wednesday.', 'يقام الندوة من الاثنين إلى الأربعاء.', 2],
  ['My driving test is on the twenty-second.', 'اختبار قيادتي في الثاني والعشرين.', 2],
  ['The library closes early on Fridays.', 'تغلق المكتبة باكرا أيام الجمعة.', 2],
  ['The conference begins on the ninth of May.', 'يبدأ المؤتمر في التاسع من مايو.', 2],
  ['I will double-check the appointment time.', 'سأتحقق من وقت الموعد مرة أخرى.', 2],
  ['The delivery arrives between two and four.', 'يصل التوصيل بين الثانية والرابعة.', 2],
  ['Our monthly meeting is on the last Friday.', 'اجتماعنا الشهري في الجمعة الأخيرة.', 2],
  ['She moved the interview to next Tuesday.', 'نقلت المقابلة إلى الثلاثاء القادم.', 2],
]);
const l117Fills = [
  ff(TG117, 'appointment', 'My appointment is on Monday morning.', 'موعد صباح الاثنين.'),
  ff(TG117, 'deadline', 'The deadline is next Thursday.', 'الموعد النهائي الخميس القادم.'),
  ff(TG117, 'reschedule', 'Can we reschedule the meeting to Friday?', 'هل نعيد جدولة الاجتماع إلى الجمعة؟'),
  ff(TG117, 'interview', 'The interview lasts about an hour.', 'تستغرق المقابلة نحو ساعة.'),
  ff(TG117, 'scheduled', 'The call is scheduled for noon.', 'حُدد الاتصال للظهر.'),
  ff(TG117, 'due', 'The form is due on the first.', 'تُستحق الاستمارة في الأول.'),
  ff(TG117, 'expires', 'My card expires in August.', 'تنتهي صلاحية بطاقتي في أغسطس.'),
  ff(TG117, 'confirm', 'Please confirm your attendance by text.', 'أكد حضورك برسالة نصية من فضلك.'),
];
const l117Orders = O(TG117, [
  ['My appointment starts at ten sharp.', 'يبدأ موعدي في العاشرة تماما.'],
  ['The meeting starts at nine sharp.', 'يبدأ الاجتماع في التاسعة تماما.'],
  ['Please confirm the date by phone.', 'أكد التاريخ بالهاتف من فضلك.'],
  ['We moved the meeting to next week.', 'نقلنا الاجتماع إلى الأسبوع القادم.'],
  ['The report is due on Friday.', 'يُستحق التقرير يوم الجمعة.'],
  ['Can we reschedule for next Friday?', 'هل نعيد الجدولة للجمعة القادمة؟'],
  ['The train leaves on the third.', 'يقلع القطار في الثالث.'],
  ['They moved the interview to Monday.', 'نقلوا المقابلة إلى الاثنين.'],
]);
const l117Mc = M(TG117, [
  ['You hear: "My appointment is on Tuesday." When is it?', ['Thursday', 'Tuesday', 'Saturday'], 1, 'الموعد يوم الثلاثاء.'],
  ['Which is a complete date?', ['March', '4', 'March 4'], 2, 'التاريخ الكامل يضم الشهر واليوم: March 4.'],
  ['You hear: "Let us meet on Thursday instead." What changed?', ['the day', 'the place', 'the topic'], 0, 'غيّرنا يوم اللقاء إلى الخميس.'],
  ['Pick the polite request you heard.', ['Please arrive two hours late.', 'Please arrive ten minutes early.', 'Please bring your lunch tomorrow.'], 1, 'الطلب المهذب: احضر قبل عشر دقائق.'],
  ['You hear: "The payment is due on the first." When is it due?', ['the last day', 'the first of the month', 'every Friday'], 1, 'يستحق الدفع في الأول من الشهر.'],
  ['Which question fits a phone booking?', ['What is your favorite color?', 'Where do you buy shoes?', 'Can we reschedule to next week?'], 2, 'عند الحجز يُسأل عن إعادة الجدولة.'],
]);

/* ============================================================
   118 Short Writing: Notes & Messages (A2)
   ============================================================ */
const TG118 = ['writing-skills', 'notes-messages'];
const l118Lt = T(TG118, [
  ['Back in ten minutes.', 'أعود بعد عشر دقائق.', 1],
  ['Gone to the bank. Back at two.', 'ذهبت إلى المصرف. أعود في الثانية.', 1],
  ['Please call Dad tonight.', 'اتصل بأبي الليلة من فضلك.', 1],
  ['Lunch is in the fridge.', 'الغداء في الثلاجة.', 1],
  ['Meeting moved to three.', 'نُقل الاجتماع إلى الثالثة.', 1],
  ['Your keys are on the shelf.', 'مفاتيحك على الرف.', 1],
  ['Water the plants today, please.', 'اسقِ النباتات اليوم من فضلك.', 1],
  ['I made coffee for you.', 'صنعت لك قهوة.', 1],

  ['Doctor appointment at four.', 'موعد الطبيب في الرابعة.', 1],
  ['Lock the door when you leave.', 'أغلق الباب عند خروجك.', 1],
  ['Buy milk and bread, thanks.', 'اشترِ حليبا وخبزا، شكرا.', 1],
  ['The parcel came this morning.', 'وصل الطرد هذا الصباح.', 1],
  ['Do not forget your umbrella.', 'لا تنس مظلتك.', 1],
  ['Homework due tomorrow morning.', 'الواجب يُستحق صباح الغد.', 1],
  ['On my way. Five minutes.', 'في الطريق. خمس دقائق.', 1],
  ['Please feed the cat twice.', 'أطعم القط مرتين من فضلك.', 1],
  ['The milk is in the blue bag.', 'الحليب في الحقيبة الزرقاء.', 1],
  ['Class cancelled for today only.', 'ألغيت الحصة لليوم فقط.', 1],
  ['Call me when you land.', 'اتصل بي عند هبوطك.', 1],
  ['Pay the electricity bill today.', 'ادفع فاتورة الكهرباء اليوم.', 1],

  ['I left your book on the desk.', 'تركت كتابك على المكتب.', 1],
  ['The plumber comes at ten.', 'يأتي السباك في العاشرة.', 1],
  ['Running late. Start without me.', 'سأتأخر قليلا. ابدأوا من دوني.', 1],
  ['Thanks for the lovely dinner.', 'شكرا على العشاء اللذيذ.', 1],
  ['Your tea is on the table.', 'شايك على الطاولة.', 1],
  ['Take your medicine at eight.', 'خذ دواءك في الثامنة.', 1],
  ['The car needs fuel today.', 'تحتاج السيارة وقودا اليوم.', 1],
  ['See you at the usual place.', 'أراك في المكان المعتاد.', 1],
  ['Please sign the form first.', 'وقع الاستمارة أولا من فضلك.', 1],
  ['The laundry is done and folded.', 'الغسيل جاهز ومطوي.', 1],

  ['My phone battery is dying.', 'بطارية هاتفي تنفد.', 1],
  ['Send me the address, please.', 'أرسل لي العنوان من فضلك.', 1],
  ['The oven is still hot.', 'الفرن لا يزال ساخنا.', 1],
  ['Trash day is tomorrow.', 'يوم القمامة غدا.', 1],
  ['I will be at the library until six.', 'سأكون في المكتبة حتى السادسة.', 1],
  ['Please leave the light on.', 'اترك الضوء مضاء من فضلك.', 1],
  ['The neighbor has our parcel.', 'لدى الجار طردنا.', 2],
  ['We eat at seven tonight.', 'نتناول الطعام في السابعة الليلة.', 1],
]);
const l118Fills = [
  ff(TG118, 'fridge', 'Your lunch is in the fridge.', 'غداؤك في الثلاجة.'),
  ff(TG118, 'parcel', 'The parcel arrived this morning.', 'وصل الطرد هذا الصباح.'),
  ff(TG118, 'umbrella', 'Take an umbrella with you.', 'خذ معك مظلة.'),
  ff(TG118, 'appointment', 'I have a dentist appointment today.', 'لدي موعد مع طبيب الأسنان اليوم.'),
  ff(TG118, 'cancelled', 'The trip was cancelled.', 'ألغيت الرحلة.'),
  ff(TG118, 'medicine', 'Take your medicine after food.', 'خذ دواءك بعد الطعام.'),
  ff(TG118, 'address', 'Text me the address, please.', 'أرسل لي العنوان نصيا من فضلك.'),
  ff(TG118, 'note', 'I left a note on the table.', 'تركت ملاحظة على الطاولة.'),
];
const l118Orders = O(TG118, [
  ['Please call me back tonight.', 'اتصل بي مجددا الليلة من فضلك.'],
  ['Your wallet is on the kitchen table.', 'محفظتك على طاولة المطبخ.'],
  ['I will be back at two.', 'سأعود في الثانية.'],
  ['Buy milk and green apples.', 'اشترِ حليبا وتفاحا أخضر.'],
  ['Lock the door before you sleep.', 'أغلق الباب قبل أن تنام.'],
  ['The plumber comes in the morning.', 'يأتي السباك في الصباح.'],
  ['Leave the report on my desk.', 'اترك التقرير على مكتبي.'],
  ['Call me when you get home.', 'اتصل بي عندما تصل إلى البيت.'],
]);
const l118Mc = M(TG118, [
  ['You read a note: "Back in ten minutes." What does it mean?', ['the shop is closed', 'the writer is sick', 'the writer returns soon'], 2, 'المقصود أن كاتب الملاحظة سيعود قريبا.'],
  ['Which is a clear shopping note?', ['Very nice day today', 'Buy milk and bread', 'The sky is blue'], 1, 'ملاحظة التسوق الواضحة تحدد المطلوب: Buy milk and bread.'],
  ['Which note tells someone about a delay?', ['Lunch is in the fridge.', 'Running late. Start without me.', 'Thanks for dinner.'], 1, 'Running late تعني سأتأخر، فابدأوا من دوني.'],
  ['Pick the best reminder.', ['The moon is bright.', 'I like your coat.', 'Take your medicine at eight.'], 2, 'التذكير الجيد يحدد الفعل والوقت.'],
  ['Which note is about a delivery?', ['The parcel came this morning.', 'My tea is cold.', 'Turn off the radio.'], 0, 'الطرد يعني توصيل بريد.'],
  ['Which message asks for action?', ['The weather is warm.', 'Please call Dad tonight.', 'Today is Monday.'], 1, 'الرسالة تطلب فعل: الاتصال بأبي الليلة.'],
]);

/* ============================================================
   119 Short Writing: Emails & Openers (B1)
   ============================================================ */
const TG119 = ['writing-skills', 'emails'];
const l119Lt = T(TG119, [
  ['Dear Mr. Ali, I am writing about my order.', 'عزيزي السيد علي، أكتب بخصوص طلبي.', 2],
  ['I hope this email finds you well.', 'أرجو أن تصلك رسالتي وأنت بخير.', 2],
  ['Thank you for your quick reply.', 'شكرا على ردك السريع.', 2],
  ['I am writing to ask about the schedule.', 'أكتب للسؤال عن الجدول.', 2],
  ['Please find my report attached.', 'تجد تقريري مرفقا.', 2],
  ['Could you send me the invoice again?', 'هل ترسل لي الفاتورة مرة أخرى؟', 2],
  ['I apologize for the late response.', 'أعتذر عن التأخر في الرد.', 2],
  ['Looking forward to hearing from you.', 'أتطلع إلى الرد منكم.', 2],

  ['Best regards, Lina Karam.', 'مع أطيب التحيات، لينا كرم.', 2],
  ['Just a quick note about tomorrow.', 'ملاحظة سريعة بخصوص الغد.', 2],
  ['Thank you for your time and help.', 'شكرا على وقتك ومساعدتك.', 2],
  ['I would like to confirm our meeting.', 'أود تأكيد اجتماعنا.', 2],
  ['Kindly let me know the final price.', 'أرجو إبلاغي بالسعر النهائي.', 2],
  ['My apologies for the short notice.', 'أعتذر عن التبليغ المتأخر.', 2],
  ['Please let me know if anything changes.', 'أخبرني إن تغير أي شيء.', 2],
  ['I have a question about the invoice.', 'لدي سؤال بخصوص الفاتورة.', 2],
  ['The deadline for the form is Friday.', 'الموعد النهائي للاستمارة الجمعة.', 2],
  ['Could we move the call to Thursday?', 'هل ننقل الاتصال إلى الخميس؟', 2],
  ['Thank you for inviting me to the event.', 'شكرا لدعوتي إلى الحدث.', 2],
  ['I am available any time before noon.', 'أنا متاح في أي وقت قبل الظهر.', 2],

  ['Please confirm the delivery address.', 'أكد عنوان التوصيل من فضلك.', 2],
  ['I have attached the signed contract.', 'أرفقت العقد الموقع.', 2],
  ['Your quick action would help a lot.', 'سرعة تصرفك ستساعد كثيرا.', 2],
  ['Congratulations on your well-deserved promotion.', 'تهانينا على ترقيتك المستحقة.', 2],
  ['I want to update my contact details.', 'أريد تحديث بيانات الاتصال الخاصة بي.', 2],
  ['The team appreciated your feedback.', 'قدّر الفريق ملاحظاتك.', 2],
  ['Please treat this message as urgent.', 'اعتبر هذه الرسالة عاجلة من فضلك.', 2],
  ['We received your payment yesterday.', 'استلمنا دفعتك أمس.', 2],
  ['Could you clarify the second point?', 'هل توضح النقطة الثانية؟', 2],
  ['I am writing on behalf of my manager.', 'أكتب نيابة عن مديري.', 2],

  ['Please ignore my previous email.', 'تجاهل رسالتي السابقة من فضلك.', 2],
  ['The meeting notes are below.', 'ملاحظات الاجتماع أدناه.', 2],
  ['Feel free to contact me any time.', 'لا تتردد في الاتصال بي في أي وقت.', 2],
  ['Our office will be closed next week.', 'سيكون مكتبنا مغلقا الأسبوع القادم.', 2],
  ['I look forward to our call on Monday.', 'أتطلع إلى اتصالنا يوم الاثنين.', 2],
  ['Please reply before the end of the day.', 'أجب قبل نهاية اليوم من فضلك.', 2],
  ['Thank you for your patience during the delay.', 'شكرا على صبرك أثناء التأخير.', 2],
  ['The corrected file is now in the shared folder.', 'الملف المصحح الآن في المجلد المشترك.', 2],
]);
const l119Fills = [
  ff(TG119, 'regards', 'Best regards, Omar Nasr.', 'مع أطيب التحيات، عمر نصر.'),
  ff(TG119, 'attached', 'Please find the file attached below.', 'تجد الملف مرفقا أدناه.'),
  ff(TG119, 'reply', 'Thank you for your fast reply.', 'شكرا على ردك السريع.'),
  ff(TG119, 'apologize', 'I apologize for the confusion.', 'أعتذر عن هذا الالتباس.'),
  ff(TG119, 'invoice', 'Could you resend the invoice, please?', 'هل تعيد إرسال الفاتورة من فضلك؟'),
  ff(TG119, 'confirm', 'Please confirm the meeting time.', 'أكد وقت الاجتماع من فضلك.'),
  ff(TG119, 'urgent', 'Mark this email as urgent.', 'ضع على هذه الرسالة وسم عاجل.'),
  ff(TG119, 'Dear', 'Dear Ms. Nour, thank you for your help.', 'عزيزتي السيدة نور، شكرا على مساعدتك.'),
];
const l119Orders = O(TG119, [
  ['I am writing about my order.', 'أكتب بخصوص طلبي.'],
  ['Thank you for your kind reply.', 'شكرا على ردك اللطيف.'],
  ['Could you send the invoice again?', 'هل ترسل الفاتورة مرة أخرى؟'],
  ['Please find my report attached below.', 'تجد تقريري مرفقا أدناه.'],
  ['I hope this email finds you well.', 'أرجو أن تصلك رسالتي وأنت بخير.'],
  ['Looking forward to hearing from you.', 'أتطلع إلى الرد منكم.'],
  ['I would like to confirm our meeting.', 'أود تأكيد اجتماعنا.'],
  ['Please let me know if anything changes.', 'أخبرني إن تغير أي شيء.'],
]);
const l119Mc = M(TG119, [
  ['Which is a good email opening?', ['Hey you!', 'Yo, what up?', 'I hope this email finds you well.'], 2, 'الافتتاحية الرسمية المهذبة مناسبة للبريد.'],
  ['Which is a formal closing?', ['Later!', 'Best regards,', 'Bye bye bye.'], 1, 'Best regards خاتمة رسمية معتادة.'],
  ['Which sentence asks politely?', ['Send invoice now.', 'Invoice. Today.', 'Could you send the invoice again?'], 2, 'Could you تجعل الطلب مهذبا.'],
  ['You hear: "Please find my report attached." What is in the email?', ['a photo album', 'a report', 'a bill for lunch'], 1, 'الرسالة تتضمن تقريرا مرفقا.'],
  ['Which opener fits a reply?', ['I never read emails.', 'Who are you?', 'Thank you for your quick reply.'], 2, 'شكر الرد السريع يليق ببداية رد.'],
  ['Which sentence apologizes correctly?', ['Sorry me for late.', 'I am sorry because of late answering.', 'I apologize for the late response.'], 2, 'الصيغة الصحيحة: I apologize for the late response.'],
]);

/* ============================================================
   120 Mixed Listening & Writing Review (B1)
   ============================================================ */
const TG120 = ['listening-writing', 'mixed-review'];
const l120Lt = T(TG120, [
  ['The bus to the airport leaves at seven.', 'تقلع حافلة المطار في السابعة.', 2],
  ['Please write your full name in capital letters.', 'اكتب اسمك الكامل بحروف كبيرة من فضلك.', 2],
  ['My appointment is on Thursday at half past two.', 'موعد يوم الخميس في الثانية والنصف.', 2],
  ["Don't forget to bring your ID card.", 'لا تنس إحضار بطاقة هويتك.', 2],
  ['The meeting is on the first of March.', 'الاجتماع في الأول من مارس.', 2],
  ['What a wonderful surprise this is!', 'يا له من مفاجأة رائعة!', 2],
  ['Where did you put the car keys?', 'أين وضعت مفاتيح السيارة؟', 2],
  ['She has worked here since last spring.', 'تعمل هنا منذ الربيع الماضي.', 2],

  ['I look forward to your quick reply.', 'أتطلع إلى ردك السريع.', 2],
  ['There are fewer customers this month.', 'هناك زبائن أقل هذا الشهر.', 2],
  ['My address is 20 Cedar Street, Apartment 6.', 'عنواني 20 شارع سيدر، شقة 6.', 2],
  ['The bakery opens at quarter past six.', 'يفتح المخبز في السادسة والربع.', 2],
  ['How many students joined the course?', 'كم طالبا انضم إلى الدورة؟', 2],
  ['Please confirm your attendance by Friday.', 'أكد حضورك يوم الجمعة من فضلك.', 2],
  ['The train arrives at midnight on Sunday.', 'يصل القطار منتصف الليل يوم الأحد.', 2],
  ['Congratulations! You passed the final exam.', 'تهانينا! لقد نجحت في الامتحان النهائي.', 2],
  ['We are moving to a bigger office downtown.', 'ننتقل إلى مكتب أكبر في وسط المدينة.', 2],
  ['The library stays open until nine tonight.', 'تبقى المكتبة مفتوحة حتى التاسعة الليلة.', 2],
  ['Could you spell your surname for me?', 'هل تهجئ لي اسم عائلتك؟', 2],
  ['The doctor advised rest for two days.', 'نصح الطبيب بالراحة ليومين.', 2],

  ['My phone battery died during the call.', 'نفدت بطارية هاتفي أثناء الاتصال.', 2],
  ['The concert was cancelled due to rain.', 'ألغيت الحفلة بسبب المطر.', 2],
  ['Your parcel is waiting at the post office.', 'طردك ينتظر في مكتب البريد.', 2],
  ['The price includes breakfast and wireless internet.', 'يشمل السعر الفطور والإنترنت اللاسلكي.', 2],
  ['I would rather take the morning train.', 'أفضل ركوب قطار الصباح.', 2],
  ['Please double-check the numbers before sending.', 'تحقق من الأرقام قبل الإرسال من فضلك.', 2],
  ['The gym closes early on public holidays.', 'يغلق النادي باكرا في العطلات الرسمية.', 2],
  ['Her flight lands on the twelfth of June.', 'تهبط رحلتها في الثاني عشر من يونيو.', 2],
  ['We agreed on the final delivery date.', 'اتفقنا على تاريخ التسليم النهائي.', 2],
  ['Stop! You left your bag on the seat!', 'توقف! تركت حقيبتك على المقعد!', 2],

  ['The interview lasted about forty minutes.', 'استغرقت المقابلة نحو أربعين دقيقة.', 2],
  ['Please find the signed contract attached.', 'تجد العقد الموقع مرفقا.', 2],
  ['The pharmacy near the mosque is open late.', 'تفتح الصيدلية قرب المسجد حتى وقت متأخر.', 2],
  ['I apologize for the delay in my answer.', 'أعتذر عن تأخر إجابتي.', 2],
  ['The team won the match last night.', 'فاز الفريق بالمباراة الليلة الماضية.', 2],
  ['Take your medicine at eight every evening.', 'خذ دواءك في الثامنة كل مساء.', 2],
  ['My cousin cycles to work in summer.', 'يركب ابن عمي الدراجة إلى العمل صيفا.', 2],
  ['Kindly reply before the end of the week.', 'أرجو الرد قبل نهاية الأسبوع.', 2],
]);
const l120Fills = [
  ff(TG120, 'appointment', 'Please arrive early for your appointment.', 'احضر باكرا لموعدك من فضلك.'),
  ff(TG120, 'capital', 'Write the title with a capital letter.', 'اكتب العنوان بحرف كبير.'),
  ff(TG120, 'regards', 'Kind regards, Sara Adel.', 'مع أطيب التحيات، سارة عادل.'),
  ff(TG120, 'attached', 'The signed form is attached here.', 'الاستمارة الموقعة مرفقة هنا.'),
  ff(TG120, 'confirm', 'Please confirm the delivery date.', 'أكد تاريخ التوصيل من فضلك.'),
  ff(TG120, 'cancelled', 'The afternoon class was cancelled.', 'ألغيت حصة العصر.'),
  ff(TG120, 'apologize', 'We apologize for the delay.', 'نعتذر عن التأخير.'),
  ff(TG120, 'surname', 'Your surname is missing on the form.', 'اسم عائلتك ناقص في الاستمارة.'),
];
const l120Orders = O(TG120, [
  ['The bus leaves at seven sharp.', 'تقلع الحافلة في السابعة تماما.'],
  ['Please write your full name here.', 'اكتب اسمك الكامل هنا من فضلك.'],
  ['She has studied here since spring.', 'تدرس هنا منذ الربيع.'],
  ['Could you spell your surname please?', 'هل تهجئ اسم عائلتك من فضلك؟'],
  ['We agreed on a new schedule.', 'اتفقنا على جدول جديد.'],
  ['The gym closes early on Friday.', 'يغلق النادي باكرا يوم الجمعة.'],
  ['We look forward to the trip.', 'نتطلع إلى الرحلة.'],
  ['Please confirm your attendance today.', 'أكد حضورك اليوم من فضلك.'],
]);
const l120Mc = M(TG120, [
  ['Which sentence is fully correct?', ['My appointment is on thursday at 2:30', 'my appointment is on Thursday at 2:30.', 'My appointment is on Thursday at 2:30.'], 2, 'حرف كبير لأول الجملة واليوم، ونقطة في النهاية.'],
  ['Which contraction is used correctly?', ['Dont forget your card.', "Do'nt forget your card.", "Don't forget your card."], 2, "Don't اختصار صحيح لـ do not."],
  ['Which email line is polite and correct?', ['Reply me fast now.', 'I look forward to your reply.', 'You must answer today!'], 1, 'العبارة المهذبة: I look forward to your reply.'],
  ['Which time means 6:15?', ['half past six', 'quarter to six', 'quarter past six'], 2, 'quarter past six تعني السادسة والربع.'],
  ['Which address is complete?', ['10 street', 'Cedar nice', '10 Cedar Street, Apartment 4'], 2, 'العنوان الكامل يضم الرقم والشارع والشقة.'],
  ['Which corrects "she go to work"?', ['She gone to work.', 'She goes to work.', 'She go to works.'], 1, 'مع she نستخدم goes.'],
]);

/* ============================================================
   Grammar notes (skill notes: ~2 sentences EN + AR + 3 examples)
   ============================================================ */
const GRAM = {
  l105: { explanation: 'Listen for the whole sentence before you type. English word order is subject + verb + object: The bus is late. Train your ear to catch small words like a, the, is and are, because they change the meaning of short sentences.', explanationAr: 'استمع إلى الجملة كاملة قبل كتابتها. ترتيب الكلمات في الإنجليزية: فاعل ثم فعل ثم مفعول. درّب أذنك على الكلمات الصغيرة مثل a و the و is لأنها تغير معنى الجمل القصيرة.', examples: [{ en: 'The bus is late today.', ar: 'الحافلة متأخرة اليوم.' }, { en: 'Put the milk in the fridge.', ar: 'ضع الحليب في الثلاجة.' }, { en: 'Can you help me, please?', ar: 'هل يمكنك مساعدتي من فضلك؟' }] },
  l106: { explanation: 'Times are heard as words: half past nine is 9:30, quarter past four is 4:15, quarter to eight is 7:45. Numbers up to one hundred come as one or two words: fifteen, twenty, ninety. Write what you hear as words, not digits.', explanationAr: 'تُسمع الأوقات ككلمات: half past nine تعني 9:30، و quarter to eight تعني 7:45. وتأتي الأرقام حتى المئة كلمة أو كلمتين: خمسة عشر، عشرون. اكتب ما تسمعه بالكلمات لا بالأرقام.', examples: [{ en: 'The meeting is at half past nine.', ar: 'الاجتماع في التاسعة والنصف.' }, { en: 'The class ends at quarter past two.', ar: 'تنتهي الحصة في الثانية والربع.' }, { en: 'My grandfather is eighty years old.', ar: 'جدي في الثمانين من عمره.' }] },
  l107: { explanation: 'Dictation of names uses letter-by-letter spelling: S-A-R-A. Addresses follow a fixed order: number, street, then flat or floor. Capitalize names of people and streets, and listen again for double letters.', explanationAr: 'إملاء الأسماء يُبنى على التهجئة حرفا حرفا: S-A-R-A. وتسير العناوين بترتيب ثابت: الرقم ثم الشارع ثم الشقة أو الطابق. اكتب أسماء الأشخاص والشوارع بحرف كبير، وأعد الاستماع لالتقاط الحروف المكررة.', examples: [{ en: 'My name is Sara. S-A-R-A.', ar: 'اسمي سارة. س-ا-ر-ا.' }, { en: 'I live at 12 Green Street.', ar: 'أسكن في 12 شارع جرين.' }, { en: 'My flat number is forty-two.', ar: 'رقم شقتي اثنان وأربعون.' }] },
  l108: { explanation: 'A mini-text is two short linked sentences. Listen for the link: who, where, when. Type both sentences with a space and a period between them, exactly as you hear them.', explanationAr: 'النص القصير يتكون من جملتين قصيرتين مترابطتين. استمع للروابط: من، أين، متى. واكتب الجملتين مع مسافة ونقطة بينهما تماما كما تسمعهما.', examples: [{ en: 'Sara works at a clinic. She helps the doctor.', ar: 'تعمل سارة في عيادة. وهي تساعد الطبيب.' }, { en: 'I take the bus to work.', ar: 'أركب الحافلة إلى العمل.' }, { en: 'The park has a small lake. Children feed the ducks there.', ar: 'في الحديقة بحيرة صغيرة. يطعم الأطفال البط هناك.' }] },
  l109: { explanation: 'These mini-texts add time and cause: last night, now, because of. Keep the tense you hear: past for finished events, present for routines. The second sentence often explains the first.', explanationAr: 'تضيف النصوص القصيرة هنا الزمن والسبب: الليلة الماضية، الآن، بسبب. حافظ على الزمن الذي تسمعه: الماضي للأحداث المنتهية والمضارع للعادات. والجملة الثانية غالبا تشرح الأولى.', examples: [{ en: 'The weather turned cold last night.', ar: 'أصبح الجو باردا الليلة الماضية.' }, { en: 'The internet was down all morning.', ar: 'كان الإنترنت معطلا طوال الصباح.' }, { en: 'I fixed my bicycle myself.', ar: 'أصلحت دراجتي بنفسي.' }] },
  l110: { explanation: 'Every sentence ends with ., ? or !. Questions end with a question mark, strong feelings take an exclamation mark, and list items are separated by commas: apples, oranges, and grapes.', explanationAr: 'كل جملة تنتهي بنقطة أو بعلامة سؤال أو تعجب. تنتهي الأسئلة بعلامة الاستفهام، والمشاعر القوية بعلامة التعجب، وتفصل الفواصل عناصر التعداد: تفاح، برتقال، وعنب.', examples: [{ en: 'Where is the bus stop?', ar: 'أين موقف الحافلة؟' }, { en: 'Watch out! The floor is wet.', ar: 'انتبه! الأرضية مبللة.' }, { en: 'I need pens, paper, and glue.', ar: 'أحتاج أقلاما وورقا وصمغا.' }] },
  l111: { explanation: 'Capitalize the first word of every sentence, names of people, cities, countries, days, months and languages. Titles like Mr. and Dr. take capitals too. Do not capitalize ordinary nouns like school or river.', explanationAr: 'اكتب بحرف كبير أول كلمة في كل جملة، وأسماء الأشخاص والمدن والدول والأيام والشهور واللغات، واللقبان مثل Mr. و Dr. أما الأسماء العادية مثل school أو river فلا تُكتب بحرف كبير.', examples: [{ en: 'My name is Fatima.', ar: 'اسمي فاطمة.' }, { en: 'We have English class on Monday.', ar: 'لدينا حصة إنجليزية يوم الاثنين.' }, { en: 'Paris is the capital of France.', ar: 'باريس عاصمة فرنسا.' }] },
  l112: { explanation: "An apostrophe replaces missing letters in contractions: do not becomes don't, she is becomes she's. For possession, add 's to a person: Sara's book. For plural nouns ending in s, add only the apostrophe: the boys' room.", explanationAr: "تحل الفاصلة العليا محل الحروف المحذوفة في الاختصارات: do not تصبح don't، و she is تصبح she's. وللملكية نضيف 's بعد الاسم: كتاب سارة. وفي جمع الأسماء المنتهية بـ s نكتفي بالفاصلة: the boys' room.", examples: [{ en: "I don't like cold coffee.", ar: 'لا أحب القهوة الباردة.' }, { en: "This is Sara's book.", ar: 'هذا كتاب سارة.' }, { en: "The kids' toys are everywhere.", ar: 'ألعاب الأطفال في كل مكان.' }] },
  l113: { explanation: 'Check four common mistakes: verb agreement (she goes, not she go), there is/are with singular or plural, a before consonants and an before vowels, and the right preposition: good at, interested in, in front of.', explanationAr: 'تحقق من أربعة أخطاء شائعة: مطابقة الفعل (she goes لا she go)، و there is للمفرد و there are للجمع، و a قبل الحرف الساكن و an قبل حرف العلة، وحرف الجر الصحيح: good at و interested in و in front of.', examples: [{ en: 'She goes to work by bus.', ar: 'تذهب إلى العمل بالحافلة.' }, { en: 'There are two cats in the garden.', ar: 'هناك قطان في الحديقة.' }, { en: 'She is good at mathematics.', ar: 'هي بارعة في الرياضيات.' }] },
  l114: { explanation: 'Advanced checks: for plus a period (for three years) but since plus a point (since 2020); many with countable nouns, much with uncountables; comparatives use than: more dangerous than. Keep the same tense across the sentence.', explanationAr: 'فحوص متقدمة: for للمدة الزمنية (for three years) و since لنقطة زمنية (since 2020)، و many مع المعدود و much مع غير المعدود، والمقارنة بـ than: more dangerous than. وحافظ على زمن واحد داخل الجملة.', examples: [{ en: 'I have lived here for three years.', ar: 'أسكن هنا منذ ثلاث سنوات.' }, { en: 'How much time do we have left?', ar: 'كم من الوقت بقي لنا؟' }, { en: 'This road is more dangerous than that one.', ar: 'هذا الطريق أخطر من ذاك.' }] },
  l115: { explanation: 'Basic English order is subject + verb + object: The boy kicks the ball. Adjectives go before the noun: a red scarf. Time and place words usually come at the end: I play tennis here.', explanationAr: 'الترتيب الأساسي في الإنجليزية: فاعل ثم فعل ثم مفعول: The boy kicks the ball. وتسبق الصفة الاسم: a red scarf. وتأتي كلمات الزمان والمكان عادة في نهاية الجملة: I play tennis here.', examples: [{ en: 'I like this song.', ar: 'أحب هذه الأغنية.' }, { en: 'She wears a red scarf.', ar: 'ترتدي وشاحا أحمر.' }, { en: 'The waiter brings the menu.', ar: 'يجلب النادل القائمة.' }] },
  l116: { explanation: 'In longer sentences, adverbs like usually, always and never come before the main verb: I usually read the news. Longer place and time phrases stack at the end: to the manager on Sunday.', explanationAr: 'في الجمل الأطول تأتي الظروف مثل usually و always و never قبل الفعل الرئيسي: I usually read the news. وتتراكم عبارات المكان والزمان الأطول في النهاية: to the manager on Sunday.', examples: [{ en: 'I usually read the news before breakfast.', ar: 'أقرأ الأخبار عادة قبل الفطور.' }, { en: 'She sends her reports to the manager on Sunday.', ar: 'ترسل تقاريرها إلى المدير يوم الأحد.' }, { en: 'He keeps his tools in a small red box.', ar: 'يحفظ أدواته في صندوق أحمر صغير.' }] },
  l117: { explanation: 'Dates follow the pattern day, month + number: Tuesday, March 4. Appointments add a clock time: at half past two. Listen for the signal words on, at, from and due to catch dates, times and changes.', explanationAr: 'تسير التواريخ على نمط اليوم ثم الشهر والرقم: Tuesday, March 4. وتضاف أوقات المواعيد بصيغة محددة: at half past two. وانتبه لكلمات الإشارة on و at و from و due لالتقاط التواريخ والأوقات وتغييراتها.', examples: [{ en: 'My appointment is on Tuesday.', ar: 'موعد يوم الثلاثاء.' }, { en: 'The deadline is Friday at noon.', ar: 'الموعد النهائي يوم الجمعة ظهرا.' }, { en: 'Can we reschedule to next week?', ar: 'هل نعيد الجدولة للأسبوع القادم؟' }] },
  l118: { explanation: 'Notes and messages are short and direct: no full greetings, dropped subjects, and one clear action. Start with the key word (Lunch, Meeting, Keys) and keep one idea per line.', explanationAr: 'الملاحظات والرسائل القصيرة مباشرة: دون تحيات كاملة، مع حذف الفاعل أحيانا، وطلب واحد واضح. ابدأ بالكلمة المفتاحية (الغداء، الاجتماع، المفاتيح) واجعل لكل سطر فكرة واحدة.', examples: [{ en: 'Back in ten minutes.', ar: 'أعود بعد عشر دقائق.' }, { en: 'Meeting moved to three.', ar: 'نُقل الاجتماع إلى الثالثة.' }, { en: 'Please call Dad tonight.', ar: 'اتصل بأبي الليلة من فضلك.' }] },
  l119: { explanation: 'Emails open with Dear plus a name or I hope this email finds you well, state the purpose in the first line, and close with Best regards plus your name. Keep requests polite with could you and please.', explanationAr: 'تفتتح الرسائل الإلكترونية بـ Dear ثم الاسم أو عبارة I hope this email finds you well، ويُذكر الغرض في السطر الأول، وتختم بـ Best regards ثم الاسم. واجعل الطلبات مهذبة بـ could you و please.', examples: [{ en: 'I am writing about my order.', ar: 'أكتب بخصوص طلبي.' }, { en: 'Please find my report attached.', ar: 'تجد تقريري مرفقا.' }, { en: 'Best regards, Lina Karam.', ar: 'مع أطيب التحيات، لينا كرم.' }] },
  l120: { explanation: 'Review mode: listen for the type of line — a time, a name, a date or a request — then write it with the right punctuation, capitalization and word order. Read your answer once before checking.', explanationAr: 'وضع المراجعة: استمع لتحديد نوع السطر، وقت أم اسم أم تاريخ أم طلب، ثم اكتبه بعلامات الترقيم والحروف الكبيرة وترتيب الكلمات الصحيح. واقرأ إجابتك مرة قبل التحقق.', examples: [{ en: 'The bus leaves at seven sharp.', ar: 'تقلع الحافلة في السابعة تماما.' }, { en: 'My appointment is on Thursday at 2:30.', ar: 'موعد يوم الخميس في الثانية والنصف.' }, { en: 'Kindly reply before the end of the week.', ar: 'أرجو الرد قبل نهاية الأسبوع.' }] },
};

/* ============================================================
   Vocabulary (6 items per lesson)
   ============================================================ */
const VOC = {
  l105: [
    { word: 'window', meaningAr: 'نافذة', example: 'Please open the window.' },
    { word: 'heavy', meaningAr: 'ثقيل', example: 'This bag is very heavy.' },
    { word: 'slowly', meaningAr: 'ببطء', example: 'Please speak more slowly.' },
    { word: 'corner', meaningAr: 'زاوية', example: 'Turn left at the corner.' },
    { word: 'fridge', meaningAr: 'ثلاجة', example: 'The milk is in the fridge.' },
    { word: 'umbrella', meaningAr: 'مظلة', example: 'I forgot my umbrella.' },
  ],
  l106: [
    { word: 'half', meaningAr: 'نصف', example: 'It is half past nine.' },
    { word: 'quarter', meaningAr: 'ربع', example: 'It is a quarter past four.' },
    { word: 'sharp', meaningAr: 'تماما (للوقت)', example: 'The class starts at nine sharp.' },
    { word: 'noon', meaningAr: 'الظهر', example: 'We eat at noon.' },
    { word: 'midnight', meaningAr: 'منتصف الليل', example: 'The train arrives at midnight.' },
    { word: 'cost', meaningAr: 'يكلف', example: 'The book costs fifteen pounds.' },
  ],
  l107: [
    { word: 'spell', meaningAr: 'يتهجى', example: 'How do you spell it?' },
    { word: 'surname', meaningAr: 'اسم العائلة', example: 'My surname is Haddad.' },
    { word: 'address', meaningAr: 'عنوان', example: 'Write your address here.' },
    { word: 'floor', meaningAr: 'طابق', example: 'We live on the third floor.' },
    { word: 'initials', meaningAr: 'الحروف الأولى للاسم', example: 'His initials are K. M.' },
    { word: 'form', meaningAr: 'استمارة', example: 'Fill in this form, please.' },
  ],
  l108: [
    { word: 'clinic', meaningAr: 'عيادة', example: 'The clinic opens at nine.' },
    { word: 'bakery', meaningAr: 'مخبز', example: 'The bakery smells great.' },
    { word: 'borrow', meaningAr: 'يستعير', example: 'I borrow books from the library.' },
    { word: 'neighbour', meaningAr: 'جار', example: 'My neighbour has a dog.' },
    { word: 'feed', meaningAr: 'يطعم', example: 'Children feed the ducks.' },
    { word: 'crowded', meaningAr: 'مزدحم', example: 'The bus is crowded at eight.' },
  ],
  l109: [
    { word: 'elevator', meaningAr: 'مصعد', example: 'The elevator was out of order.' },
    { word: 'downtown', meaningAr: 'وسط المدينة', example: 'The office moved downtown.' },
    { word: 'instead', meaningAr: 'بدلا من ذلك', example: 'I read a paper book instead.' },
    { word: 'celebrate', meaningAr: 'يحتفل', example: 'The town celebrated the win.' },
    { word: 'register', meaningAr: 'يسجل', example: 'I registered for two courses.' },
    { word: 'publisher', meaningAr: 'ناشر', example: 'She will look for a publisher.' },
  ],
  l110: [
    { word: 'punctuation', meaningAr: 'علامات الترقيم', example: 'Check your punctuation.' },
    { word: 'question mark', meaningAr: 'علامة استفهام', example: 'End questions with a question mark.' },
    { word: 'exclamation mark', meaningAr: 'علامة تعجب', example: 'An exclamation mark shows feeling.' },
    { word: 'comma', meaningAr: 'فاصلة', example: 'Use a comma in lists.' },
    { word: 'hurry', meaningAr: 'يستعجل', example: 'Hurry up! The taxi is here.' },
    { word: 'bill', meaningAr: 'حساب', example: 'The bill, please.' },
  ],
  l111: [
    { word: 'capital letter', meaningAr: 'حرف كبير', example: 'Start with a capital letter.' },
    { word: 'language', meaningAr: 'لغة', example: 'Arabic is a rich language.' },
    { word: 'country', meaningAr: 'بلد', example: 'Jordan is a beautiful country.' },
    { word: 'month', meaningAr: 'شهر', example: 'September is my favorite month.' },
    { word: 'title', meaningAr: 'لقب', example: 'Mr. Saleh is my teacher.' },
    { word: 'signature', meaningAr: 'توقيع', example: 'Add your signature below.' },
  ],
  l112: [
    { word: 'contraction', meaningAr: 'اختصار بصيغة قصيرة', example: "Don't is a contraction." },
    { word: 'possessive', meaningAr: 'صيغة الملكية', example: "Sara's book shows possession." },
    { word: 'apostrophe', meaningAr: 'فاصلة عليا', example: "An apostrophe replaces letters." },
    { word: 'welcome', meaningAr: 'مرحب بك', example: "You're welcome." },
    { word: 'promise', meaningAr: 'يعد', example: 'I promise to be on time.' },
    { word: 'break', meaningAr: 'استراحة', example: "Let's take a break." },
  ],
  l113: [
    { word: 'mistake', meaningAr: 'خطأ', example: 'Everyone makes a mistake.' },
    { word: 'agree', meaningAr: 'يوافق', example: 'I agree with you.' },
    { word: 'shelf', meaningAr: 'رف', example: 'The book is on the shelf.' },
    { word: 'pocket', meaningAr: 'جيب', example: 'The keys are in my pocket.' },
    { word: 'neat', meaningAr: 'مرتب وجميل', example: 'Her handwriting is neat.' },
    { word: 'solve', meaningAr: 'يحل', example: 'The problem is easy to solve.' },
  ],
  l114: [
    { word: 'suggest', meaningAr: 'يقترح', example: 'He suggested going out.' },
    { word: 'avoid', meaningAr: 'يتجنب', example: 'She avoids rush hour.' },
    { word: 'apologize', meaningAr: 'يعتذر', example: 'He apologized for being late.' },
    { word: 'delay', meaningAr: 'تأخير', example: 'The flight had a delay.' },
    { word: 'manage', meaningAr: 'يتمكن', example: 'They managed to finish on time.' },
    { word: 'explain', meaningAr: 'يشرح', example: 'He explained the problem clearly.' },
  ],
  l115: [
    { word: 'object', meaningAr: 'مفعول به', example: 'The verb needs an object.' },
    { word: 'adjective', meaningAr: 'صفة', example: 'Red is an adjective.' },
    { word: 'kick', meaningAr: 'يركل', example: 'The boy kicks the ball.' },
    { word: 'tidy', meaningAr: 'مرتب', example: 'He keeps his room tidy.' },
    { word: 'gardener', meaningAr: 'بستاني', example: 'The gardener waters the roses.' },
    { word: 'waiter', meaningAr: 'نادل', example: 'The waiter brings the menu.' },
  ],
  l116: [
    { word: 'adverb', meaningAr: 'ظرف', example: 'Usually is an adverb.' },
    { word: 'list', meaningAr: 'قائمة', example: 'I write my shopping list.' },
    { word: 'measure', meaningAr: 'يقيس', example: 'The tailor measures customers.' },
    { word: 'salary', meaningAr: 'راتب', example: 'He saves part of his salary.' },
    { word: 'harbor', meaningAr: 'ميناء', example: 'The fishermen leave the harbor.' },
    { word: 'practice', meaningAr: 'يتدرب', example: 'She practices the piano daily.' },
  ],
  l117: [
    { word: 'appointment', meaningAr: 'موعد', example: 'My appointment is on Tuesday.' },
    { word: 'reschedule', meaningAr: 'يعيد الجدولة', example: 'Can we reschedule to Friday?' },
    { word: 'expire', meaningAr: 'ينتهي أجلها', example: 'My visa expires in November.' },
    { word: 'due', meaningAr: 'مستحق', example: 'The rent is due on the fifth.' },
    { word: 'confirm', meaningAr: 'يؤكد', example: 'Please confirm the date.' },
    { word: 'gathering', meaningAr: 'تجمع', example: 'We have a family gathering on Friday.' },
  ],
  l118: [
    { word: 'note', meaningAr: 'ملاحظة', example: 'I left a note on the table.' },
    { word: 'parcel', meaningAr: 'طرد', example: 'The parcel came this morning.' },
    { word: 'plumber', meaningAr: 'سباك', example: 'The plumber comes at ten.' },
    { word: 'sign', meaningAr: 'يوقع', example: 'Please sign the form.' },
    { word: 'battery', meaningAr: 'بطارية', example: 'My battery is dying.' },
    { word: 'trash', meaningAr: 'قمامة', example: 'Trash day is tomorrow.' },
  ],
  l119: [
    { word: 'reply', meaningAr: 'يرد', example: 'Thank you for your reply.' },
    { word: 'attached', meaningAr: 'مرفق', example: 'The file is attached.' },
    { word: 'invoice', meaningAr: 'فاتورة', example: 'Could you resend the invoice?' },
    { word: 'urgent', meaningAr: 'عاجل', example: 'This message is urgent.' },
    { word: 'on behalf of', meaningAr: 'نيابة عن', example: 'I write on behalf of my manager.' },
    { word: 'feedback', meaningAr: 'ملاحظات وتقييم', example: 'The team liked your feedback.' },
  ],
  l120: [
    { word: 'review', meaningAr: 'مراجعة', example: 'This lesson is a review.' },
    { word: 'spelling', meaningAr: 'تهجئة', example: 'Check your spelling.' },
    { word: 'attendance', meaningAr: 'حضور', example: 'Please confirm your attendance.' },
    { word: 'public holiday', meaningAr: 'عطلة رسمية', example: 'The gym closes on public holidays.' },
    { word: 'request', meaningAr: 'طلب', example: 'It is a polite request.' },
    { word: 'ID card', meaningAr: 'بطاقة هوية', example: 'Bring your ID card.' },
  ],
};

/* ============================================================
   Lesson configs + buildAll
   ============================================================ */
/* shared safety pool: distinct top-ups drawn by whichever lesson
   falls short after global dedup (used sentences are never reused) */
const SAFETY = T(['listening-writing', 'review'], [['Please write your name at the top.','من فضلك اكتب اسمك في الأعلى.',1],['The answer key is on the board.','مفتاح الإجابة على السبورة.',2],['Check your spelling before you submit.','تحقق من الإملاء قبل التسليم.',2],['Read the question twice before answering.','اقرأ السؤال مرتين قبل الإجابة.',2],['The teacher circled my mistake in red.','وضع المعلم دائرة حول خطئي بالأحمر.',2],['My handwriting is getting better.','خطي يتحسن.',1],['Write one sentence about your day.','اكتب جملة واحدة عن يومك.',1],['The essay needs a strong opening.','يحتاج المقال مقدمة قوية.',2],['A comma changes the meaning here.','الفاصلة تغير المعنى هنا.',2],['Every sentence needs a full stop.','كل جملة تحتاج نقطة في نهايتها.',1],['The title goes at the very top.','يوضع العنوان في الأعلى تماما.',1],['Copy the sentence exactly as you hear it.','انسخ الجملة تماما كما تسمعها.',2],['Number one is a question, not a statement.','السؤال الأول استفهام وليس خبرية.',2],["You missed the apostrophe in 'don’t'.",'أفوتك الفاصلة العليا في don’t.',2],['The first letter of a name is capital.','الحرف الأول من الاسم يكون كبيرا.',1],['Days and months take a capital letter.','الأيام والشهور تأخذ حرفا كبيرا.',1],['I typed the paragraph without errors.','كتبت الفقرة دون أخطاء.',2],['Dictation trains your ears and hands.','الإملاء يدرب أذنيك ويدك.',2],['Listen once, then write from memory.','استمع مرة ثم اكتب من الذاكرة.',2],['The audio was fast, so I replayed it.','كان الصوت سريعا، فأعدت تشغيله.',2],['Slow replay helps with hard words.','الإعادة البطيئة تساعد مع الكلمات الصعبة.',2],['My score improved after daily practice.','تحسنت نتيجتي بعد التدرب اليومي.',2],['Practice ten minutes every evening.','تدرب عشر دقائق كل مساء.',1],['Review your mistakes once a week.','راجع أخطاءك مرة كل أسبوع.',2],['Short sessions work better than long ones.','الجلسات القصيرة أفضل من الطويلة.',2],['The dictation had twenty-five words.','كانت خاطفة الإملاء من خمس وعشرين كلمة.',2],['Write the date at the top of the page.','اكتب التاريخ في أعلى الصفحة.',1],['Names of cities start with capitals.','أسماء المدن تبدأ بحرف كبير.',1],['The paragraph has four clear sentences.','في الفقرة أربع جمل واضحة.',2],['Your final draft looks professional.','تبدو مسودتك النهائية احترافية.',2],['The slow announcer repeated the platform twice.','كرر المعلن البطيء الرصيف مرتين.',2],['A red underline marks every spelling slip.','يشير الخط الأحمر إلى كل خطأ إملائي.',2],['Write the numbers in words, not digits.','اكتب الأرقام كلمات لا أرقاما.',2],['The voice note arrived at half past six.','وصلت الرسالة الصوتية في السادسة والنصف.',2],['Capital letters open every proper name.','الحروف الكبيرة تبدأ كل اسم علم.',1],['The comma before and is optional here.','الفاصلة قبل and اختيارية هنا.',2],['Apostrophes shrink two words into one.','تدمج الفاصلة العليا كلمتين في واحدة.',2],['My dictation score doubled in a month.','تضاعفت نتيجة إملائي في شهر.',2],['The paragraph ends with a strong closing line.','تنتهي الفقرة بخاتمة قوية.',2],['Read your sentence back before moving on.','أعد قراءة جملتك قبل المتابعة.',2],['The audio player repeats after a pause.','يعيد المشغل التشغيل بعد توقف قصير.',2],['Write small notes during the phone call.','اكتب ملاحظات صغيرة أثناء المكالمة.',2],['Every email starts with a polite greeting.','تبدأ كل رسالة بتحية مهذبة.',2],['The subject line says everything briefly.','يقول سطر الموضوع كل شيء بإيجاز.',2],['Short sentences are easier to check.','الجمل القصيرة أسهل في التدقيق.',1],['The error was a missing capital B.','كان الخطأ حرف B الكبير الناقص.',2],['Practice numbers until they sound natural.','تدرب على الأرقام حتى تبدو طبيعية.',2],['The recipe lists five simple steps.','تسرد الوصفة خمس خطوات بسيطة.',2],['Two words swapped places by mistake.','تبادلت كلمتان مكانيهما بالخطأ.',2],['Order the words the way people speak.','رتب الكلمات كما يتحدث الناس.',2],['The last word takes the final period.','تأخذ الكلمة الأخيرة النقطة النهائية.',1],['A question ends with a question mark.','ينتهي السؤال بعلامة استفهام.',1],['The message fits in one short line.','تلائم الرسالة سطرا قصيرا واحدا.',1],['Correct the verb, keep the meaning.','صحح الفعل واحفظ المعنى.',2],['The second draft is always better.','المسودة الثانية أفضل دائما.',2],['Names and cities wear capital hats.','تلبس الأسماء والمدن قبعات حروف كبيرة.',1],['The recording says the street name twice.','يقول التسجيل اسم الشارع مرتين.',2],['Type exactly what the voice says.','اكتب بالضبط ما تقوله الصوت.',1],['The checklist caught three small errors.','التقطت قائمة التدقيق ثلاثة أخطاء صغيرة.',2],['Good notes save forgetful minds.','الملاحظات الجيدة تنقذ العقول الناسية.',2],['The signature line comes last.','يأتي سطر التوقيع أخيرا.',1],['A quick review beats a long cram.','المراجعة السريعة أفضل من الحفظ المكثف الطويل.',2],['The bell rings; the lesson summary begins.','يقرع الجرس؛ يبدأ ملخص الدرس.',2],['Spelling bees train careful listeners.','مسابقات الإملاء تدرب المستمعين الدقيقين.',2],['The pen pauses at every punctuation mark.','يتوقف القلم عند كل علامة ترقيم.',2],['Your typed answer matched the audio exactly.','طابقت إجابتك المكتوبة التسجيل تماما.',2],['The calendar reminder says Thursday, not Tuesday.','يقول تذكير التقويم الخميس لا الثلاثاء.',2],['Rewrite the sentence with better word order.','أعد كتابة الجملة بترتيب كلمات أفضل.',2],['The invitation card used formal language.','استخدمت بطاقة الدعوة لغة رسمية.',2],['Daily ten-minute sessions build strong ears.','جلسات العشر دقائق اليومية تبني آذانا قوية.',2],['TheDictation notebook fills with careful lines.','يمتلئ دفتر الإملاء بخطوط متقنة.',2],['Tuesday lesson starts exactly at half past four.','يبدأ درس الثلاثاء تماما في الرابعة والنصف.',2],['The microphone picks up every whispered word.','يلتقط الميكروفون كل كلمة مهموسة.',2],['Slow the recording and hear the ending clearly.','أبطئ التسجيل واسمع النهاية بوضوح.',2],['The corrected copy earned a small star.','حصلت النسخة المصححة على نجمة صغيرة.',2],['Write the appointment in your weekly planner.','اكتب الموعد في مخططك الأسبوعي.',2],['Numbers sound different at fast speed.','تبدو الأرقام مختلفة بالسرعة العالية.',2],['The new paragraph begins after the greeting.','تبدأ الفقرة الجديدة بعد التحية.',2],['Check the spelling of both long words.','تحقق من إملاء الكلمتين الطويلتين.',2],['The postcard message fits three lines.','تلائم رسالة البطاقة ثلاثة أسطر.',2],['Underline the auxiliary in each question.','ضع خطا تحت الفعل المساعد في كل سؤال.',2],['The city name needs a capital N.','يحتاج اسم المدينة حرف N كبيرا.',2],['Dictation mixes listening and writing skills.','يمزج الإملاء مهارتي الاستماع والكتابة.',2],['The busy street appears twice in the story.','يظهر الشارع المزدحم مرتين في القصة.',2],['Rewrite the note with clearer handwriting.','أعد كتابة الملاحظة بخط أوضح.',2],['The opening line greets the reader warmly.','يحيي السطر الافتتاحي القارئ بدفء.',2],['The recording stopped after the third sentence.','توقف التسجيل بعد الجملة الثالثة.',2],['Swap those two words to fix the order.','بدل مكان الكلمتين لتصحيح الترتيب.',2],['A tidy page shows a careful writer.','الصفحة المرتبة تكتب عن كاتب متقن.',2],['The lesson ends with a mixed review.','ينتهي الدرس بمراجعة مشتركة.',2],['Question marks look small but matter.','تبدو علامات الاستفهام صغيرة لكنها مهمة.',2],['The signature reads yours sincerely.','يقرأ التوقيع بأخلص التحيات.',2],['The slow version clarifies the numbers.','وضح الإصدار البطيء الأرقام.',2],['Type the sentence without extra spaces.','اكتب الجملة دون مسافات زائدة.',2],['The writer corrected two small typos.','صحح الكاتب خطأين مطبعيين صغيرين.',2],['The word ends with a silent letter.','تنتهي الكلمة بحرف صامت.',2],['Review yesterday notes before the quiz.','راجع ملاحظات الأمس قبل الاختبار القصير.',2],['The draft had one missing full stop.','كان في المسودة نقطة نهاية ناقصة.',2],['Listen first, write second, check third.','استمع أولًا، اكتب ثانيًا، دقق ثالثًا.',1],['The room number sounds like fourteen.','يبدو رقم الغرفة مثل أربعة عشر.',2],['Capital M marks the start of Monday.','يبدأ حرف M الكبير كلمة الاثنين.',1],['The list uses commas between items.','تستخدم القائمة فواصل بين العناصر.',2],['My typed line matched the recording perfectly.','طابقت سطري المكتوب التسجيل بشكل تام.',2],['The greeting line takes a comma after it.','تأخذ سطر التحية فاصلة بعده.',2],['Writing slowly improves letter shapes.','الكتابة البطيئة تحسن أشكال الحروف.',2],['The audio repeats numbers twice on purpose.','يعيد التسجيل الأرقام مرتين بقصد.',2],['One apostrophe changes the whole meaning.','فاصلة عليا واحدة تغير المعنى كله.',2],['The reviewer circled the weak sentence.','ضع دائرة المراجع حول الجملة الضعيفة.',2],['Practice names of streets and stations.','تدرب على أسماء الشوارع والمحطات.',2],['The final sentence summarized the paragraph.','لخصت الجملة الأخيرة الفقرة.',2],['Short dictation builds long concentration.','الإملاء القصير يبني تركيزا طويلا.',2],['The keyboard waited for corrected words.','انتظرت لوحة المفاتيح الكلمات المصححة.',2],['Replace the weak verb with a stronger one.','استبدل الفعل الضعيف بأقوى منه.',2],['The time on the ticket says half past nine.','يقول الوقت على التذكرة التاسعة والنصف.',2],['Every capital letter starts a new sentence.','يبدأ كل حرف كبير جملة جديدة.',1],['The message board displays short notes.','تعرض لوحة الرسائل ملاحظات قصيرة.',2],['Slow typing gives careful fingers time.','الطباعة البطيئة تمنح الأصابع الحذرة وقتا.',2],['The paragraph plan fits one line.','تلائم خطة الفقرة سطرا واحدا.',2],['Check the apostrophe in the second word.','تحقق من الفاصلة العليا في الكلمة الثانية.',2],['The morning session reviews all seven rules.','تراجع جلسة الصباح القواعد السبع كلها.',2]]);

const CFG = [
  { id: 'lesson-105', key: 'l105', title: 'Listening: Short Everyday Sentences', titleAr: 'الاستماع: جمل يومية قصيرة', level: 'A1', minutes: 12, pools: { lt: [...l105Lt, ...SAFETY], fill: l105Fills, order: l105Orders, mc: l105Mc } },
  { id: 'lesson-106', key: 'l106', title: 'Dictation: Numbers & Times', titleAr: 'إملاء: الأرقام والأوقات', level: 'A1', minutes: 13, pools: { lt: [...l106Lt, ...SAFETY], fill: l106Fills, order: l106Orders, mc: l106Mc } },
  { id: 'lesson-107', key: 'l107', title: 'Dictation: Names, Spelling & Addresses', titleAr: 'إملاء: الأسماء والتهجئة والعناوين', level: 'A2', minutes: 13, pools: { lt: [...l107Lt, ...SAFETY], fill: l107Fills, order: l107Orders, mc: l107Mc } },
  { id: 'lesson-108', key: 'l108', title: 'Listening: Short Paragraphs I', titleAr: 'الاستماع: فقرات قصيرة ١', level: 'A2', minutes: 14, pools: { lt: [...l108Lt, ...SAFETY], fill: l108Fills, order: l108Orders, mc: l108Mc } },
  { id: 'lesson-109', key: 'l109', title: 'Listening: Short Paragraphs II', titleAr: 'الاستماع: فقرات قصيرة ٢', level: 'A2', minutes: 14, pools: { lt: [...l109Lt, ...SAFETY], fill: l109Fills, order: l109Orders, mc: l109Mc } },
  { id: 'lesson-110', key: 'l110', title: 'Punctuation Basics', titleAr: 'أساسيات علامات الترقيم', level: 'A2', minutes: 12, pools: { lt: [...l110Lt, ...SAFETY], fill: l110Fills, order: l110Orders, mc: l110Mc } },
  { id: 'lesson-111', key: 'l111', title: 'Capitalization Rules', titleAr: 'قواعد كتابة الحرف الكبير', level: 'A2', minutes: 12, pools: { lt: [...l111Lt, ...SAFETY], fill: l111Fills, order: l111Orders, mc: l111Mc } },
  { id: 'lesson-112', key: 'l112', title: 'Apostrophes & Contractions', titleAr: 'الفاصلة العليا والاختصارات', level: 'A2', minutes: 13, pools: { lt: [...l112Lt, ...SAFETY], fill: l112Fills, order: l112Orders, mc: l112Mc } },
  { id: 'lesson-113', key: 'l113', title: 'Sentence Correction I', titleAr: 'تصحيح الجمل ١', level: 'A2', minutes: 14, pools: { lt: [...l113Lt, ...SAFETY], fill: l113Fills, order: l113Orders, mc: l113Mc } },
  { id: 'lesson-114', key: 'l114', title: 'Sentence Correction II', titleAr: 'تصحيح الجمل ٢', level: 'B1', minutes: 14, pools: { lt: [...l114Lt, ...SAFETY], fill: l114Fills, order: l114Orders, mc: l114Mc } },
  { id: 'lesson-115', key: 'l115', title: 'Word Order Drill I', titleAr: 'تمرين ترتيب الكلمات ١', level: 'A1', minutes: 12, pools: { lt: [...l115Lt, ...SAFETY], fill: l115Fills, order: l115Orders, mc: l115Mc } },
  { id: 'lesson-116', key: 'l116', title: 'Word Order Drill II', titleAr: 'تمرين ترتيب الكلمات ٢', level: 'A2', minutes: 14, pools: { lt: [...l116Lt, ...SAFETY], fill: l116Fills, order: l116Orders, mc: l116Mc } },
  { id: 'lesson-117', key: 'l117', title: 'Dictation: Dates & Appointments', titleAr: 'إملاء: التواريخ والمواعيد', level: 'A2', minutes: 13, pools: { lt: [...l117Lt, ...SAFETY], fill: l117Fills, order: l117Orders, mc: l117Mc } },
  { id: 'lesson-118', key: 'l118', title: 'Short Writing: Notes & Messages', titleAr: 'كتابة قصيرة: الملاحظات والرسائل', level: 'A2', minutes: 13, pools: { lt: [...l118Lt, ...SAFETY], fill: l118Fills, order: l118Orders, mc: l118Mc } },
  { id: 'lesson-119', key: 'l119', title: 'Short Writing: Emails & Openers', titleAr: 'كتابة قصيرة: الرسائل الإلكترونية والمقدمات', level: 'B1', minutes: 14, pools: { lt: [...l119Lt, ...SAFETY], fill: l119Fills, order: l119Orders, mc: l119Mc } },
  { id: 'lesson-120', key: 'l120', title: 'Mixed Listening & Writing Review', titleAr: 'مراجعة مشتركة للاستماع والكتابة', level: 'B1', minutes: 15, pools: { lt: [...l120Lt, ...SAFETY], fill: l120Fills, order: l120Orders, mc: l120Mc } },
];

export function buildAll() {
  let total = 0;
  for (const c of CFG) {
    total += build({
      id: c.id, section: 'listening-writing', level: c.level, minutes: c.minutes,
      title: c.title, titleAr: c.titleAr,
      objectives: [`Sharpen listening and writing accuracy: ${c.title.toLowerCase()}`, 'Type exactly what you hear, with correct spelling', 'Write short lines with correct punctuation and word order'],
      grammar: GRAM[c.key],
      vocabulary: VOC[c.key],
      pools: c.pools,
    });
  }
  return { section: 'listening-writing', lessons: CFG.length, exercises: total };
}


