/* ============================================================
   Content engine — banks.js
   Shared lexical banks (English + accurate Arabic pairs).
   Slot values: {en, ar, agr?} objects.
   ============================================================ */

/* ---------- subject pronouns / people (carry agreement class) ---------- */
export const PRONOUNS = [
  { en: 'I', ar: 'أنا', agr: 'I' },
  { en: 'You', ar: 'أنت', agr: 'you' },
  { en: 'He', ar: 'هو', agr: 'he' },
  { en: 'She', ar: 'هي', agr: 'she' },
  { en: 'We', ar: 'نحن', agr: 'we' },
  { en: 'They', ar: 'هم', agr: 'they' },
];

export const PEOPLE_SING = [
  { en: 'My brother', ar: 'أخي', agr: 'he' },
  { en: 'My sister', ar: 'أختي', agr: 'she' },
  { en: 'My father', ar: 'أبي', agr: 'he' },
  { en: 'My mother', ar: 'أمي', agr: 'she' },
  { en: 'My friend', ar: 'صديقي', agr: 'he' },
  { en: 'My neighbor', ar: 'جاري', agr: 'he' },
  { en: 'The teacher', ar: 'المعلم', agr: 'he' },
  { en: 'The engineer', ar: 'المهندس', agr: 'he' },
  { en: 'The doctor', ar: 'الطبيب', agr: 'he' },
  { en: 'My cousin', ar: 'ابن عمي', agr: 'he' },
  { en: 'The manager', ar: 'المدير', agr: 'he' },
  { en: 'The student', ar: 'الطالب', agr: 'he' },
  { en: 'My uncle', ar: 'عمي', agr: 'he' },
  { en: 'The driver', ar: 'السائق', agr: 'he' },
  { en: 'The nurse', ar: 'الممرضة', agr: 'she' },
  { en: 'The journalist', ar: 'الصحفية', agr: 'she' },
  { en: 'My aunt', ar: 'عمتي', agr: 'she' },
  { en: 'The customer', ar: 'الزبون', agr: 'he' },
];

export const PEOPLE_PLURAL = [
  { en: 'My parents', ar: 'والداي', agr: 'they' },
  { en: 'My friends', ar: 'أصدقائي', agr: 'they' },
  { en: 'The students', ar: 'الطلاب', agr: 'they' },
  { en: 'The workers', ar: 'العمال', agr: 'they' },
  { en: 'The children', ar: 'الأطفال', agr: 'they' },
  { en: 'My colleagues', ar: 'زملائي', agr: 'they' },
  { en: 'The tourists', ar: 'السياح', agr: 'they' },
  { en: 'The neighbors', ar: 'الجيران', agr: 'they' },
];

export const NAMED_SING = [
  { en: 'Omar', ar: 'عمر', agr: 'he' },
  { en: 'Sara', ar: 'سارة', agr: 'she' },
  { en: 'Ahmed', ar: 'أحمد', agr: 'he' },
  { en: 'Lina', ar: 'لينا', agr: 'she' },
  { en: 'Khalid', ar: 'خالد', agr: 'he' },
  { en: 'Nora', ar: 'نورا', agr: 'she' },
  { en: 'Youssef', ar: 'يوسف', agr: 'he' },
  { en: 'Maya', ar: 'مايا', agr: 'she' },
];

/* ---------- everyday objects & things (direct objects) ---------- */
export const FOODS = [
  { en: 'an apple', ar: 'تفاحة' }, { en: 'rice', ar: 'الأرز' }, { en: 'bread', ar: 'الخبز' },
  { en: 'tea', ar: 'الشاي' }, { en: 'coffee', ar: 'القهوة' }, { en: 'water', ar: 'الماء' },
  { en: 'fish', ar: 'السمك' }, { en: 'chicken', ar: 'الدجاج' }, { en: 'soup', ar: 'الحساء' },
  { en: 'a sandwich', ar: 'شطيرة' }, { en: 'fresh juice', ar: 'عصيرا طازجا' }, { en: 'yogurt', ar: 'الزبادي' },
  { en: 'cheese', ar: 'الجبن' }, { en: 'eggs', ar: 'البيض' }, { en: 'a banana', ar: 'موزة' },
  { en: 'salad', ar: 'السلطة' }, { en: 'honey', ar: 'العسل' }, { en: 'milk', ar: 'الحليب' },
];

export const THINGS = [
  { en: 'a book', ar: 'كتابا' }, { en: 'the newspaper', ar: 'الصحيفة' }, { en: 'an email', ar: 'بريدا إلكترونيا' },
  { en: 'a message', ar: 'رسالة' }, { en: 'a letter', ar: 'خطابا' }, { en: 'his keys', ar: 'مفاتيحه' },
  { en: 'her bag', ar: 'حقيبتها' }, { en: 'a new phone', ar: 'هاتفا جديدا' }, { en: 'a gift', ar: 'هدية' },
  { en: 'the door', ar: 'الباب' }, { en: 'the window', ar: 'النافذة' }, { en: 'the lights', ar: 'الأضواء' },
  { en: 'a photo', ar: 'صورة' }, { en: 'a video', ar: 'فيديو' }, { en: 'a song', ar: 'أغنية' },
  { en: 'the report', ar: 'التقرير' }, { en: 'a story', ar: 'قصة' }, { en: 'a poem', ar: 'قصيدة' },
  { en: 'the shopping', ar: 'المشتريات' }, { en: 'a ticket', ar: 'تذكرة' }, { en: 'a map', ar: 'خريطة' },
  { en: 'his homework', ar: 'واجبه المنزلي' }, { en: 'the bill', ar: 'الفاتورة' }, { en: 'a taxi', ar: 'سيارة أجرة' },
];

export const PLACES = [
  { en: 'the market', ar: 'السوق' }, { en: 'the mosque', ar: 'الجامع' }, { en: 'the park', ar: 'الحديقة' },
  { en: 'school', ar: 'المدرسة' }, { en: 'the office', ar: 'المكتب' }, { en: 'the library', ar: 'المكتبة' },
  { en: 'the hospital', ar: 'المستشفى' }, { en: 'the beach', ar: 'الشاطئ' }, { en: 'the gym', ar: 'النادي الرياضي' },
  { en: 'the supermarket', ar: 'المتجر' }, { en: 'the bank', ar: 'البنك' }, { en: 'the airport', ar: 'المطار' },
  { en: 'the station', ar: 'المحطة' }, { en: 'the museum', ar: 'المتحف' }, { en: 'the café', ar: 'المقهى' },
  { en: 'the restaurant', ar: 'المطعم' }, { en: 'home', ar: 'المنزل' }, { en: 'the city center', ar: 'وسط المدينة' },
];

export const SPORTS_ACTIVITIES = [
  { en: 'football', ar: 'كرة القدم' }, { en: 'basketball', ar: 'كرة السلة' }, { en: 'tennis', ar: 'التنس' },
  { en: 'swimming', ar: 'السباحة' }, { en: 'chess', ar: 'الشطرنج' }, { en: 'video games', ar: 'ألعاب الفيديو' },
  { en: 'the guitar', ar: 'الجيتار' }, { en: 'the piano', ar: 'البيانو' },
];

export const LANGUAGES_SUBJECTS = [
  { en: 'English', ar: 'الإنجليزية' }, { en: 'Arabic', ar: 'العربية' }, { en: 'math', ar: 'الرياضيات' },
  { en: 'science', ar: 'العلوم' }, { en: 'history', ar: 'التاريخ' }, { en: 'geography', ar: 'الجغرافيا' },
];

/* ---------- time expressions ---------- */
export const TIME_HABIT = [
  { en: 'every day', ar: 'كل يوم' }, { en: 'every morning', ar: 'كل صباح' }, { en: 'every evening', ar: 'كل مساء' },
  { en: 'every week', ar: 'كل أسبوع' }, { en: 'on Fridays', ar: 'أيام الجمعة' }, { en: 'on weekends', ar: 'في عطلات نهاية الأسبوع' },
  { en: 'in the morning', ar: 'في الصباح' }, { en: 'in the evening', ar: 'في المساء' }, { en: 'at night', ar: 'ليلا' },
];

export const TIME_CONTINUOUS = [
  { en: 'now', ar: 'الآن' }, { en: 'right now', ar: 'في هذه اللحظة' }, { en: 'at the moment', ar: 'حاليا' },
  { en: 'today', ar: 'اليوم' }, { en: 'still', ar: 'لا يزال' },
];

export const TIME_DURATION = [
  { en: 'for two hours', ar: 'لمدة ساعتين' }, { en: 'for three hours', ar: 'لمدة ثلاث ساعات' },
  { en: 'for an hour', ar: 'لمدة ساعة' }, { en: 'since morning', ar: 'منذ الصباح' },
  { en: 'for thirty minutes', ar: 'لمدة ثلاثين دقيقة' }, { en: 'since 2019', ar: 'منذ عام 2019' },
  { en: 'for five years', ar: 'لمدة خمس سنوات' }, { en: 'since Monday', ar: 'منذ الاثنين' },
  { en: 'for two weeks', ar: 'لمدة أسبوعين' }, { en: 'for a long time', ar: 'لمدة طويلة' },
];

export const TIME_POINT = [
  { en: 'at seven o\u2019clock', ar: 'في الساعة السابعة' }, { en: 'at nine', ar: 'في التاسعة' },
  { en: 'before lunch', ar: 'قبل الغداء' }, { en: 'after dinner', ar: 'بعد العشاء' },
  { en: 'early', ar: 'مبكرا' }, { en: 'late', ar: 'متأخرا' }, { en: 'at noon', ar: 'ظهرا' },
  { en: 'yesterday', ar: 'أمس' }, { en: 'last night', ar: 'الليلة الماضية' },
  { en: 'last week', ar: 'الأسبوع الماضي' }, { en: 'two days ago', ar: 'قبل يومين' },
  { en: 'last month', ar: 'الشهر الماضي' }, { en: 'last year', ar: 'العام الماضي' },
];

export const TIME_FUTURE = [
  { en: 'tomorrow', ar: 'غدا' }, { en: 'tomorrow morning', ar: 'غدا صباحا' }, { en: 'tonight', ar: 'الليلة' },
  { en: 'next week', ar: 'الأسبوع القادم' }, { en: 'next month', ar: 'الشهر القادم' },
  { en: 'next year', ar: 'العام القادم' }, { en: 'this weekend', ar: 'عطلة نهاية هذا الأسبوع' },
  { en: 'soon', ar: 'قريبا' }, { en: 'later', ar: 'لاحقا' },
];

export const CLOCK_TIMES = [
  { en: 'at eight', ar: 'في الثامنة' }, { en: 'at ten o\u2019clock', ar: 'في الساعة العاشرة' },
  { en: 'at six in the morning', ar: 'في السادسة صباحا' }, { en: 'at nine tonight', ar: 'في التاسعة الليلة' },
  { en: 'by five', ar: 'بحلول الخامسة' }, { en: 'by noon', ar: 'بحلول الظهر' },
  { en: 'by Friday', ar: 'بحلول الجمعة' }, { en: 'by next week', ar: 'بحلول الأسبوع القادم' },
];

/* ---------- adjectives (for adjective lessons) ---------- */
export const ADJECTIVES = [
  { en: 'tall', ar: 'طويل' }, { en: 'short', ar: 'قصير' }, { en: 'big', ar: 'كبير' },
  { en: 'small', ar: 'صغير' }, { en: 'fast', ar: 'سريع' }, { en: 'slow', ar: 'بطيء' },
  { en: 'clean', ar: 'نظيف' }, { en: 'dirty', ar: 'قذر' }, { en: 'easy', ar: 'سهل' },
  { en: 'difficult', ar: 'صعب' }, { en: 'expensive', ar: 'غالٍ' }, { en: 'cheap', ar: 'رخيص' },
  { en: 'hot', ar: 'حار' }, { en: 'cold', ar: 'بارد' }, { en: 'happy', ar: 'سعيد' },
  { en: 'sad', ar: 'حزين' }, { en: 'tired', ar: 'متعب' }, { en: 'strong', ar: 'قوي' },
  { en: 'quiet', ar: 'هادئ' }, { en: 'noisy', ar: 'صاخب' }, { en: 'beautiful', ar: 'جميل' },
  { en: 'busy', ar: 'مشغول' }, { en: 'new', ar: 'جديد' }, { en: 'old', ar: 'قديم' },
  { en: 'long', ar: 'طويل' }, { en: 'heavy', ar: 'ثقيل' }, { en: 'light', ar: 'خفيف' },
  { en: 'delicious', ar: 'لذيذ' }, { en: 'interesting', ar: 'ممتع' }, { en: 'boring', ar: 'ممل' },
];

/* ---------- noun phrases for adjective sentences ---------- */
export const NOUN_PHRASES = [
  { en: 'The weather', ar: 'الجو' }, { en: 'This book', ar: 'هذا الكتاب' }, { en: 'That car', ar: 'تلك السيارة' },
  { en: 'The test', ar: 'الاختبار' }, { en: 'This soup', ar: 'هذا الحساء' }, { en: 'The city', ar: 'المدينة' },
  { en: 'The hotel', ar: 'الفندق' }, { en: 'This bag', ar: 'هذه الحقيبة' }, { en: 'The lesson', ar: 'الدرس' },
  { en: 'The movie', ar: 'الفيلم' }, { en: 'My room', ar: 'غرفتي' }, { en: 'The tea', ar: 'الشاي' },
  { en: 'The bus', ar: 'الحافلة' }, { en: 'This phone', ar: 'هذا الهاتف' }, { en: 'The street', ar: 'الشارع' },
];

export const NOUN_PHRASES_PLURAL = [
  { en: 'These shoes', ar: 'هذه الأحذية' }, { en: 'Those houses', ar: 'تلك البيوت' },
  { en: 'The questions', ar: 'الأسئلة' }, { en: 'These boxes', ar: 'هذه الصناديق' },
  { en: 'The shops', ar: 'المتاجر' }, { en: 'These apples', ar: 'هذه التفاحات' },
];

/* ---------- preposition phrases / locations ---------- */
export const LOCATIONS = [
  { en: 'in the kitchen', ar: 'في المطبخ' }, { en: 'in the garden', ar: 'في الحديقة' },
  { en: 'on the table', ar: 'على الطاولة' }, { en: 'under the tree', ar: 'تحت الشجرة' },
  { en: 'near the window', ar: 'بالقرب من النافذة' }, { en: 'in the office', ar: 'في المكتب' },
  { en: 'at the bus stop', ar: 'في موقف الحافلة' }, { en: 'on the second floor', ar: 'في الطابق الثاني' },
  { en: 'next to the bank', ar: 'بجانب البنك' }, { en: 'in front of the school', ar: 'أمام المدرسة' },
  { en: 'behind the hotel', ar: 'خلف الفندق' }, { en: 'between the two shops', ar: 'بين المتجرين' },
];

export const CONNECTORS = [
  { en: 'and', ar: 'و' }, { en: 'but', ar: 'لكن' }, { en: 'because', ar: 'لأن' },
  { en: 'so', ar: 'لذلك' }, { en: 'or', ar: 'أو' }, { en: 'although', ar: 'على الرغم من أن' },
];
