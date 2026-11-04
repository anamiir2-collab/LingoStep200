/* ============================================================
   Content generator — Section 6: Vocabulary (lessons 089–104)
   Sixteen word-study lessons: high-frequency verbs, phrasal
   verbs, collocations, idioms, synonyms/antonyms in context,
   confused words, word families and everyday expressions.
   All sentences are hand-authored {en, ar} pairs; idioms are
   translated by meaning, not word-by-word.
   ============================================================ */

import { assembleLesson, writeLessonFile, fillFrom } from './lib/builder.js';
import { validateLessonStructure } from '../../js/lesson-schema.js';

function T(tags, rows) { return rows.map((r) => ({ en: r[0], ar: r[1], tags, difficulty: r[2] || 2 })); }
function ff(tags, word, en, ar) { return fillFrom({ en, ar, tags }, word); }
function O(tags, rows) { return rows.map((r) => ({ en: r[0], ar: r[1], tags, difficulty: 2 })); }
function M(tags, rows) { return rows.map((r) => ({ question: r[0], options: r[1], answerIndex: r[2], ar: r[3], tags, difficulty: r[4] || 2 })); }

function build(cfg) {
  const lesson = assembleLesson(cfg);
  const errors = validateLessonStructure(lesson);
  if (errors.length) throw new Error(`[${cfg.id}] schema: ${errors.slice(0, 6).join(' | ')}`);
  writeLessonFile(lesson);
  return lesson.exercises.length;
}

/* ============================================================
   089 High-Frequency Verbs 1 — get, make, go, do, take (A2)
   ============================================================ */
const TG89 = ['vocabulary', 'core-verbs'];
const l89Lt = T(TG89, [
  ['I get a lot of emails every day.', 'أستلم الكثير من الرسائل كل يوم.'],
  ['She gets tired after work.', 'تصبح متعبة بعد العمل.'],
  ['It gets cold here in winter.', 'يصبح الجو باردا هنا في الشتاء.'],
  ['Did you get my message?', 'هل وصلتك رسالتي؟', 1],
  ['He wants to get a new phone.', 'يريد الحصول على هاتف جديد.'],
  ['I get hungry before lunch.', 'أشعر بالجوع قبل الغداء.'],
  ['That shop gets busy in the evening.', 'يصبح ذلك المتجر مزدحما مساء.'],
  ['I make coffee every morning.', 'أعد القهوة كل صباح.'],
  ['She makes dinner for the family.', 'تعد العشاء للعائلة.'],
  ['They make furniture in this factory.', 'يصنعون الأثاث في هذا المصنع.'],
  ['Can you make a cake for the party?', 'هل يمكنك إعداد كعكة للحفلة؟'],
  ['He makes mistakes when he is in a hurry.', 'يرتكب أخطاء عندما يكون مستعجلا.'],
  ['We make plans for the weekend.', 'نضع خططا لعطلة نهاية الأسبوع.'],
  ['She makes me happy.', 'تجعلني سعيدا.', 1],
  ["Let's make a list before we shop.", 'لنعد قائمة قبل أن نتسوق.'],
  ['I go to the gym twice a week.', 'أذهب إلى النادي الرياضي مرتين أسبوعيا.'],
  ['She goes to work by train.', 'تذهب إلى العمل بالقطار.'],
  ['We go shopping on Fridays.', 'نذهب للتسوق أيام الجمعة.', 1],
  ['The children go to school early.', 'يذهب الأطفال إلى المدرسة مبكرا.', 1],
  ["Let's go home; it is late.", 'لنعد إلى البيت؛ لقد تأخر الوقت.'],
  ['He goes for a walk after dinner.', 'يخرج في نزهة على الأقدام بعد العشاء.'],
  ["He goes to bed at ten o'clock.", 'يذهب إلى الفراش في العاشرة.'],
  ['I go to the market on Saturdays.', 'أذهب إلى السوق أيام السبت.'],
  ['I do my homework in the evening.', 'أعمل واجبي في المساء.', 1],
  ['She does the dishes after lunch.', 'تغسل الأطباق بعد الغداء.'],
  ['He does his best in every game.', 'يبذل قصارى جهده في كل مباراة.'],
  ['What do you do on the weekend?', 'ماذا تفعل في عطلة نهاية الأسبوع؟'],
  ['We do the shopping once a week.', 'نقوم بالتسوق مرة كل أسبوع.'],
  ['Can you do me a favor?', 'هل يمكنك أن تفعل لي معروفا؟'],
  ['I have nothing to do today.', 'ليس لدي ما أفعله اليوم.'],
  ['We do business with that company.', 'نتعامل تجاريا مع تلك الشركة.'],
  ['Do your homework before dinner.', 'اعمل واجبك قبل العشاء.', 1],
  ['Take an umbrella; it may rain.', 'خذ مظلة؛ فقد تمطر.'],
  ['I take the medicine after breakfast.', 'أتناول الدواء بعد الفطور.'],
  ['She takes the children to school.', 'تأخذ الأطفال إلى المدرسة.'],
  ['We take a break every hour.', 'نأخذ استراحة كل ساعة.'],
  ['He takes good photos with his camera.', 'يلتقط صورا جميلة بكاميرته.'],
  ['Please take a seat.', 'تفضل بالجلوس.', 1],
  ['Take your time; there is no hurry.', 'خذ وقتك؛ لا داعي للاستعجال.'],
  ['Did you take the keys with you?', 'هل أخذت المفاتيح معك؟'],
]);
const l89Fills = [
  ff(TG89, 'get', 'I need to get some milk from the shop.', 'أحتاج أن أحصل على بعض الحليب من المتجر.'),
  ff(TG89, 'make', 'Can you make tea for our guests?', 'هل يمكنك إعداد شاي لضيوفنا؟'),
  ff(TG89, 'go', 'We go to the park on Friday.', 'نذهب إلى الحديقة يوم الجمعة.'),
  ff(TG89, 'do', 'I always do my homework after school.', 'أعمل واجبي دائما بعد المدرسة.'),
  ff(TG89, 'Take', 'Take your umbrella; it is raining.', 'خذ مظلتك؛ إنها تمطر.'),
  ff(TG89, 'makes', 'She makes beautiful cakes.', 'تعد كعكا جميلة.'),
  ff(TG89, 'goes', 'He goes to work by bus.', 'يذهب إلى العمل بالحافلة.'),
  ff(TG89, 'takes', 'She takes the train every morning.', 'تركب القطار كل صباح.'),
];
const l89Orders = O(TG89, [
  ['I go to work early.', 'أذهب إلى العمل مبكرا.'],
  ['She makes a big breakfast.', 'تعد فطورا كبيرا.'],
  ['Take your coat with you.', 'خذ معطفك معك.'],
  ['We do our best every day.', 'نبذل قصارى جهدنا كل يوم.'],
  ['He gets good marks at school.', 'يحصل على درجات جيدة في المدرسة.'],
  ["Let's go home now.", 'لنعد إلى البيت الآن.'],
]);
const l89Mc = M(TG89, [
  ['We ___ shopping every Friday.', ['go', 'take', 'do'], 0, 'نذهب للتسوق كل جمعة.'],
  ['She ___ coffee every morning.', ['does', 'makes', 'goes'], 1, 'تعد القهوة كل صباح.'],
  ['Please ___ a seat and wait.', ['do', 'take', 'make'], 1, 'تفضل بالجلوس وانتظر.'],
  ['Did you ___ my message?', ['go', 'make', 'get'], 2, 'هل وصلتك رسالتي؟'],
  ['He ___ his homework every evening.', ['makes', 'does', 'takes'], 1, 'يعمل واجبه كل مساء.'],
  ['It ___ dark early in winter.', ['takes', 'goes', 'does'], 1, 'يظلم الجو مبكرا في الشتاء.'],
]);

/* ============================================================
   090 High-Frequency Verbs 2 — come, look, find, give, tell (A2)
   ============================================================ */
const TG90 = ['vocabulary', 'core-verbs'];
const l90Lt = T(TG90, [
  ['Come in, please.', 'تفضل بالدخول.', 1],
  ['Come here and see this.', 'تعال هنا وانظر إلى هذا.', 1],
  ['She comes to visit us every month.', 'تأتي لزيارتنا كل شهر.'],
  ['The bus comes at nine.', 'تأتي الحافلة في التاسعة.', 1],
  ['Winter comes after autumn.', 'يأتي الشتاء بعد الخريف.'],
  ['Come and sit with us.', 'تعال واجلس معنا.'],
  ['Look at the blackboard, please.', 'انظر إلى السبورة من فضلك.', 1],
  ['It looks like rain.', 'يبدو أن المطر قريب.'],
  ['She looks happy today.', 'تبدو سعيدة اليوم.', 1],
  ['Look both ways before you cross the street.', 'انظر في الاتجاهين قبل أن تعبر الشارع.'],
  ['I look for my keys every morning.', 'أبحث عن مفاتيحي كل صباح.'],
  ['The children look excited about the trip.', 'يبدو الأطفال متحمسين للرحلة.'],
  ['He looks after his little sister.', 'يعتني بأخته الصغيرة.'],
  ["I can't find my glasses.", 'لا أستطيع إيجاد نظارتي.'],
  ['She found a good job in the city.', 'وجدت عملا جيدا في المدينة.'],
  ['We found a nice café near the office.', 'وجدنا مقهى جميلا قرب المكتب.'],
  ['Did you find your wallet?', 'هل وجدت محفظتك؟'],
  ['I find this book very interesting.', 'أجد هذا الكتاب ممتعا جدا.'],
  ['Give me a minute, please.', 'امنحني دقيقة من فضلك.', 1],
  ['He gives money to charity every month.', 'يقدم المال للجمعيات الخيرية كل شهر.'],
  ['She gave me a lovely gift.', 'أعطتني هدية جميلة.'],
  ['Can you give me directions to the station?', 'هل يمكنك إرشادي إلى الطريق نحو المحطة؟'],
  ['They give free lessons on Saturdays.', 'يقدمون دروسا مجانية أيام السبت.'],
  ['Give my regards to your family.', 'ابلغ عائلتك أطيب التحيات.'],
  ['Tell me about your trip.', 'حدثني عن رحلتك.'],
  ['He tells funny stories.', 'يحكي قصصا مضحكة.', 1],
  ['She told me the truth.', 'قالت لي الحقيقة.'],
  ['Please tell him to call me.', 'من فضلك أخبره أن يتصل بي.'],
  ['I can never tell what he is thinking.', 'لا أعرف أبدا ما يفكر فيه.'],
  ["Don't tell anyone about the surprise.", 'لا تخبر أحدا عن المفاجأة.'],
  ['I will tell you a secret.', 'سأخبرك بسر.', 1],
  ['Look at this photo of my family.', 'انظر إلى هذه الصورة لعائلتي.'],
  ['The sky looks cloudy this evening.', 'تبدو السماء غائمة هذا المساء.'],
  ['We found the hotel easily.', 'وجدنا الفندق بسهولة.'],
  ['The teacher gave us clear instructions.', 'أعطانا المعلم تعليمات واضحة.'],
  ['Come to my office when you are free.', 'تعال إلى مكتبي عندما تكون متفرغا.'],
  ['He looks tired; let him rest.', 'يبدو متعبا؛ دعه يستريح.'],
  ['I looked everywhere for my phone.', 'بحثت عن هاتفي في كل مكان.'],
  ['Grandmother tells the best stories.', 'تحكي الجدة أفضل القصص.'],
  ['Come back before dark.', 'عُد قبل حلول الظلام.'],
]);
const l90Fills = [
  ff(TG90, 'come', 'Please come to my party on Friday.', 'من فضلك تعال إلى حفلي يوم الجمعة.'),
  ff(TG90, 'Look', 'Look at this beautiful view.', 'انظر إلى هذا المنظر الجميل.'),
  ff(TG90, 'find', 'I hope you find your keys soon.', 'آمل أن تجد مفاتيحك قريبا.'),
  ff(TG90, 'Give', 'Give the book back to Ali.', 'أعد الكتاب إلى علي.'),
  ff(TG90, 'Tell', 'Tell me when you arrive.', 'أخبرني عندما تصل.'),
  ff(TG90, 'looks', 'She looks very elegant tonight.', 'تبدو أنيقة جدا الليلة.'),
  ff(TG90, 'found', 'We found a quiet place to study.', 'وجدنا مكانا هادئا للدراسة.'),
  ff(TG90, 'gave', 'He gave his seat to the old man.', 'أعطى مقعده للرجل العجوز.'),
];
const l90Orders = O(TG90, [
  ['Come to the window.', 'تعال إلى النافذة.'],
  ['Look at the map.', 'انظر إلى الخريطة.'],
  ['Give me the newspaper.', 'أعطني الجريدة.'],
  ['Tell her the good news.', 'أخبرها بالخبر السار.'],
  ['I found my notebook.', 'وجدت دفتري.'],
  ['She looks very happy.', 'تبدو سعيدة جدا.'],
]);
const l90Mc = M(TG90, [
  ['___ at the whiteboard, everyone.', ['Give', 'Look', 'Come'], 1, 'انظروا إلى السبورة جميعا.'],
  ['Please ___ me the salt.', ['tell', 'look', 'give'], 2, 'ناولني الملح من فضلك.'],
  ["I can't ___ my phone anywhere.", ['look', 'find', 'give'], 1, 'لا أستطيع إيجاد هاتفي في أي مكان.'],
  ['She ___ her grandchildren old stories.', ['tells', 'says', 'gives'], 0, 'تحكي لأحفادها قصصا قديمة.'],
  ['___ here quickly, please!', ['Look', 'Give', 'Come'], 2, 'تعال هنا بسرعة من فضلك!'],
  ['He ___ after his younger brother.', ['looks', 'gives', 'finds'], 0, 'يعتني بأخيه الأصغر.'],
]);

/* ============================================================
   091 Phrasal Verbs with GET (B1)
   ============================================================ */
const TG91 = ['vocabulary', 'phrasal-verbs', 'get'];
const l91Lt = T(TG91, [
  ['I get up at six every morning.', 'أستيقظ في السادسة كل صباح.'],
  ['She gets up early to make breakfast.', 'تستيقظ مبكرا لتعد الفطور.'],
  ['We got up late on Sunday.', 'استيقظنا متأخرين يوم الأحد.'],
  ['Get on the bus at the second stop.', 'اركب الحافلة عند الموقف الثاني.'],
  ['He got on his bike and rode away.', 'ركب دراجته وانطلق.'],
  ['Please get off at the next station.', 'انزل من القطار في المحطة التالية من فضلك.'],
  ['We got off the train in Cairo.', 'نزلنا من القطار في القاهرة.'],
  ['I get along well with my neighbors.', 'أتعامل بشكل جيد مع جيراني.'],
  ['Do you get along with your brother?', 'هل تتعامل بشكل جيد مع أخيك؟'],
  ['They get along fine at work.', 'يتعاونون بشكل جيد في العمل.'],
  ['It took him a month to get over the flu.', 'احتاج شهرا كاملا ليتعافى من الإنفلونزا.'],
  ['She got over her cold quickly.', 'تعافت من بردها بسرعة.'],
  ['He got over his fear of public speaking.', 'تغلب على خوفه من الكلام أمام الجمهور.'],
  ['Get in the car; we are late.', 'اركب السيارة؛ نحن متأخرون.'],
  ['She got in a taxi to the airport.', 'ركبت سيارة أجرة إلى المطار.'],
  ['Get out of the water; it is cold.', 'اخرج من الماء؛ إنه بارد.'],
  ['He got out of the taxi in front of the hotel.', 'نزل من سيارة الأجرة أمام الفندق.'],
  ['I got back home at midnight.', 'عدت إلى البيت في منتصف الليل.'],
  ['When did you get back from your trip?', 'متى عدت من رحلتك؟'],
  ['We get together every Friday for lunch.', 'نتقابل كل جمعة لتناول الغداء.'],
  ['The family got together for the holiday.', 'اجتمعت العائلة بمناسبة العطلة.'],
  ['We got lost on the way to the beach.', 'ضللنا الطريق في طريقنا إلى الشاطئ.'],
  ['I got lost in the old city.', 'ضللت طريقي في المدينة القديمة.'],
  ['My grandmother is getting better every day.', 'تتحسن صحة جدتي كل يوم.'],
  ['The weather is getting warmer.', 'أصبح الطقس أدفأ.'],
  ["It is getting dark; let's go home.", 'بدأ الجو يظلم؛ لنعد إلى البيت.'],
  ['I got your email this morning.', 'وصلتني رسالتك هذا الصباح.'],
  ['She got a promotion at work.', 'حصلت على ترقية في العمل.'],
  ['Get dressed quickly; the guests are coming.', 'البس ملابسك بسرعة؛ الضيوف قادمون.'],
  ['I need ten minutes to get ready.', 'أحتاج عشر دقائق لأستعد.'],
  ['They got married last summer.', 'تزوجوا الصيف الماضي.'],
  ['What time do you get to work?', 'في أي ساعة تصل إلى عملك؟'],
  ['The train gets to Alexandria at noon.', 'يصل القطار إلى الإسكندرية ظهرا.'],
  ["I didn't get the joke.", 'لم أفهم النكتة.'],
  ['Prices are getting higher every year.', 'ترتفع الأسعار كل عام.'],
  ['I get nervous before exams.', 'أشعر بالتوتر قبل الامتحانات.'],
  ['He got wet in the rain.', 'ابتل تحت المطر.'],
  ["Let's get a coffee after class.", 'لنشرب قهوة بعد الدرس.'],
  ['She gets angry when people are late.', 'تغضب عندما يتأخر الناس.'],
  ['Did you get the tickets online?', 'هل حصلت على التذاكر عبر الإنترنت؟'],
]);
const l91Fills = [
  ff(TG91, 'get up', 'I get up at dawn during Ramadan.', 'أستيقظ عند الفجر في رمضان.'),
  ff(TG91, 'get on', 'Hurry and get on the bus!', 'أسرع واركب الحافلة!'),
  ff(TG91, 'Get off', 'Get off the bus at the museum.', 'انزل من الحافلة عند المتحف.'),
  ff(TG91, 'get along', 'I get along with all my coworkers.', 'أتماشى مع جميع زملائي في العمل.'),
  ff(TG91, 'get over', 'It is hard to get over a bad cold.', 'من الصعب التعافي من برد شديد.'),
  ff(TG91, 'getting dark', 'It is getting dark outside.', 'يظلم الجو في الخارج.'),
  ff(TG91, 'got lost', 'We got lost in the souk.', 'ضللنا الطريق في السوق.'),
  ff(TG91, 'Get ready', 'Get ready for school now.', 'استعد للمدرسة الآن.'),
];
const l91Orders = O(TG91, [
  ['I get up early every day.', 'أستيقظ مبكرا كل يوم.'],
  ['We got on the wrong bus.', 'ركبنا الحافلة الخاطئة.'],
  ['She got over her illness.', 'تعافت من مرضها.'],
  ["Let's get together on Friday.", 'لنتقابل يوم الجمعة.'],
  ['He got back late last night.', 'عاد متأخرا ليلة أمس.'],
  ['It is getting colder now.', 'أصبح الجو أبرد الآن.'],
]);
const l91Mc = M(TG91, [
  ['I ___ up at seven on weekdays.', ['take', 'get', 'put'], 1, 'أستيقظ في السابعة في أيام العمل.'],
  ['Please ___ off the bus at the square.', ['go', 'come', 'get'], 2, 'انزل من الحافلة عند الساحة من فضلك.'],
  ['She ___ along well with her classmates.', ['gets', 'makes', 'does'], 0, 'تتعامل بشكل جيد مع زملائها.'],
  ['It took him weeks to ___ over the flu.', ['take', 'give', 'get'], 2, 'احتاج أسابيع ليتعافى من الإنفلونزا.'],
  ['We ___ together every weekend.', ['look', 'get', 'tell'], 1, 'نتقابل كل عطلة نهاية أسبوع.'],
  ['___ in the car, please.', ['Look', 'Tell', 'Get'], 2, 'اركب السيارة من فضلك.'],
]);

/* ============================================================
   092 Phrasal Verbs with TAKE & PUT (B1)
   ============================================================ */
const TG92 = ['vocabulary', 'phrasal-verbs', 'take-put'];
const l92Lt = T(TG92, [
  ['Please take off your shoes at the door.', 'اخلع حذاءك عند الباب من فضلك.'],
  ['He took off his coat and sat down.', 'خلع معطفه وجلس.'],
  ['The plane takes off at noon.', 'تقلع الطائرة ظهرا.'],
  ['Our flight took off on time.', 'أقلعت رحلتنا في موعدها.'],
  ['She took on too much work this month.', 'تحملت عملا كثيرا هذا الشهر.'],
  ['The company took on ten new workers.', 'وظفت الشركة عشرة عمالا جددا.'],
  ['He took up photography last year.', 'شرع في تعلم التصوير العام الماضي.'],
  ['I want to take up swimming.', 'أريد أن أشرع في ممارسة السباحة.'],
  ['I take back what I said about him.', 'أتراجع عما قلته عنه.'],
  ['Take out the trash before you leave.', 'أخرج القمامة قبل أن تنصرف.'],
  ['She took out her phone to check the map.', 'أخرجت هاتفها لتفحص الخريطة.'],
  ['He takes after his father in character.', 'يشبه والده في طباعه.'],
  ['Everyone says she takes after her mother.', 'يقول الجميع إنها تشبه أمها.'],
  ['Take care of your health.', 'اعتنِ بصحتك.', 1],
  ['Who takes care of the garden?', 'من يعتني بالحديقة؟'],
  ['She took part in the school play.', 'شاركت في مسرحية المدرسة.'],
  ['Will you take part in the contest?', 'هل ستشارك في المسابقة؟'],
  ['A new manager will take over next month.', 'سيتولى مدير جديد العمل الشهر المقبل.'],
  ['Put on your jacket; it is cold.', 'البس سترتك؛ الجو بارد.'],
  ['She put on her glasses to read.', 'ارتدت نظارتها لتقرأ.'],
  ['He put on weight during the holiday.', 'زاد وزنه خلال العطلة.'],
  ['Never put off until tomorrow what you can do today.', 'لا تؤجل إلى الغد ما يمكنك فعله اليوم.'],
  ['They put off the meeting until Thursday.', 'أجلو الاجتماع إلى الخميس.'],
  ["I can't put up with this noise.", 'لا أستطيع تحمل هذا الضجيج.'],
  ['She puts up with a lot at work.', 'تحتمل الكثير في العمل.'],
  ['Put down your pens, please.', 'ضعوا أقلامكم من فضلكم.'],
  ['He put down the box and rested.', 'وضع الصندوق واستراح.'],
  ['Put away your toys after playing.', 'احفظ ألعابك بعد اللعب.'],
  ['She put the clothes away in the closet.', 'حفظت الملابس في الخزانة.'],
  ['Put the book back on the shelf.', 'أعد الكتاب إلى مكانه على الرف.'],
  ['Firefighters put out the fire quickly.', 'أطفأ رجال الإطفاء الحريق بسرعة.'],
  ['We put together a small bookshelf.', 'جمعنا خزانة كتب صغيرة.'],
  ['Put the milk back in the fridge.', 'أعد الحليب إلى الثلاجة.'],
  ['I took my umbrella in case it rained.', 'أخذت مظلتي خشية المطر.'],
  ["Don't put your elbows on the table.", 'لا تضع مرفقيك على الطاولة.'],
  ['We put up posters around the school.', 'علقنا ملصقات حول المدرسة.'],
  ['Put up your hand if you know the answer.', 'ارفع يدك إذا كنت تعرف الجواب.'],
  ['The meeting was put off again.', 'أُجل الاجتماع مرة أخرى.'],
  ['Take an aspirin for your headache.', 'تناول أسبرين لصداعك.'],
  ['She takes her laptop to the office every day.', 'تأخذ حاسوبها إلى المكتب كل يوم.'],
]);
const l92Fills = [
  ff(TG92, 'Take off', 'Take off your coat; it is warm inside.', 'اخلع معطفك؛ الجو دافئ في الداخل.'),
  ff(TG92, 'takes after', 'He takes after his grandfather.', 'يشبه جده.'),
  ff(TG92, 'take part', 'Twenty students will take part in the play.', 'سيشارك عشرون طالبا في المسرحية.'),
  ff(TG92, 'Put on', 'Put on your helmet before cycling.', 'البس خوذتك قبل ركوب الدراجة.'),
  ff(TG92, 'put off', 'They put off the trip until May.', 'أجلو الرحلة إلى مايو.'),
  ff(TG92, 'put up with', 'I cannot put up with loud music at night.', 'لا أستطيع تحمل الموسيقى العالية ليلا.'),
  ff(TG92, 'Put away', 'Put away the dishes when they are dry.', 'احفظ الأطباق عندما تجف.'),
  ff(TG92, 'Take care', 'Take care of your little brother today.', 'اعتنِ بأخيك الصغير اليوم.'),
];
const l92Orders = O(TG92, [
  ['The plane takes off soon.', 'تقلع الطائرة قريبا.'],
  ['Take off your wet shoes.', 'اخلع حذاءك المبلل.'],
  ['She puts on her coat.', 'ترتدي معطفها.'],
  ["Don't put off your work.", 'لا تؤجل عملك.'],
  ['Put the book back.', 'أعد الكتاب إلى مكانه.'],
  ['Who takes care of the baby?', 'من يعتني بالرضيع؟'],
]);
const l92Mc = M(TG92, [
  ['The plane will ___ off in ten minutes.', ['put', 'take', 'give'], 1, 'ستقلع الطائرة بعد عشر دقائق.'],
  ['He ___ after his father.', ['takes', 'puts', 'looks'], 0, 'يشبه والده.'],
  ['We must ___ off the picnic; it is raining.', ['take', 'put', 'get'], 1, 'علينا تأجيل النزهة؛ إنها تمطر.'],
  ["I can't ___ up with the noise.", ['take', 'do', 'put'], 2, 'لا أستطيع تحمل الضجيج.'],
  ['___ on your seatbelt, please.', ['Put', 'Take', 'Get'], 0, 'اربط حزام الأمان من فضلك.'],
  ['She ___ out the garbage every evening.', ['takes', 'gets', 'puts'], 2, 'تخرج القمامة كل مساء.'],
]);

/* ============================================================
   093 Phrasal Verbs with LOOK, COME & GO (B1)
   ============================================================ */
const TG93 = ['vocabulary', 'phrasal-verbs', 'look-come-go'];
const l93Lt = T(TG93, [
  ['I am looking for my reading glasses.', 'أبحث عن نظارتي للقراءة.'],
  ['She is looking for a cheaper apartment.', 'تبحث عن شقة أرخص.'],
  ['Who looks after the shop on Fridays?', 'من يدير المتجر أيام الجمعة؟'],
  ['He looks after his old parents.', 'يعتني بوالديه المسنين.'],
  ['I look forward to your reply.', 'أتطلع إلى ردكم.'],
  ['We look forward to the summer holiday.', 'نتطلع إلى عطلة الصيف.'],
  ['Look up the word in the dictionary.', 'ابحث عن الكلمة في القاموس.'],
  ['She looked up the number online.', 'بحثت عن الرقم على الإنترنت.'],
  ['Look out! The floor is wet.', 'احترس! الأرضية مبللة.'],
  ['Look out for cars when you cycle.', 'احترس من السيارات عندما تركب دراجتك.'],
  ['The baby looks like his father.', 'يشبه الرضيع والده.'],
  ['It looks like snow tonight.', 'يبدو أن الثلج سيسقط الليلة.'],
  ['Please come in and take a seat.', 'تفضل بالدخول واجلس.'],
  ['He came in late to the meeting.', 'دخل إلى الاجتماع متأخرا.'],
  ['She comes back from work at five.', 'تعود من العمل في الخامسة.'],
  ['Come back soon; we will miss you.', 'عُد قريبا؛ سنفتقدك.'],
  ['I come from a small town in the south.', 'أتي من بلدة صغيرة في الجنوب.'],
  ['Where do you come from?', 'من أين أنت؟', 1],
  ['Come on, we will be late!', 'هيا، سنتأخر!'],
  ['Come on, you can do it!', 'هيا، تستطيع ذلك!'],
  ['She came up with a great idea.', 'توصلت إلى فكرة رائعة.'],
  ['We came up with a plan together.', 'وضعنا خطة معا.'],
  ['I came across an old friend at the market.', 'صادفت صديقا قديما في السوق.'],
  ['He came across some old letters.', 'عثر على بعض الرسائل القديمة.'],
  ['Come over for dinner tonight.', 'تعال على العشاء الليلة.'],
  ['They came over to help us move.', 'جاؤوا ليساعدونا في الانتقال.'],
  ['The meeting went on for two hours.', 'استمر الاجتماع ساعتين.'],
  ['Go on with your story; I am listening.', 'أكمل قصتك؛ أنا أستمع.'],
  ['We go out for dinner most Fridays.', 'نخرج لتناول العشاء معظم أيام الجمعة.'],
  ['He rarely goes out on weeknights.', 'نادرا ما يخرج في ليالي الأسبوع.'],
  ["Let's go back inside; it is cold.", 'لنعد إلى الداخل؛ الجو بارد.'],
  ['She went back to university last year.', 'عادت إلى الجامعة العام الماضي.'],
  ['The teacher went over the answers.', 'راجع المعلم الإجابات.'],
  ['Let me go over the plan once more.', 'دعني أراجع الخطة مرة أخرى.'],
  ['He went through a difficult time.', 'مر بوقت صعب.'],
  ['I went through my notes before the exam.', 'تصفحت ملاحظاتي قبل الامتحان.'],
  ['This tie goes with your shirt.', 'يليق هذا الكرافت مع قميصك.'],
  ['Do these shoes go with the dress?', 'هل تليق هذه الأحذية بالفستان؟'],
  ['Prices went up again this year.', 'ارتفعت الأسعار مرة أخرى هذا العام.'],
  ['The temperature went down at night.', 'انخفضت درجة الحرارة ليلا.'],
  ['The light went out during the storm.', 'انقطع النور أثناء العاصفة.'],
  ['Time goes by so fast.', 'يمضي الوقت بسرعة كبيرة.'],
]);
const l93Fills = [
  ff(TG93, 'looking for', 'I am looking for the station.', 'أبحث عن المحطة.'),
  ff(TG93, 'look after', 'Can you look after my cat this weekend?', 'هل يمكنك الاعتناء بقطتي في عطلة نهاية الأسبوع؟'),
  ff(TG93, 'look forward', 'We look forward to your visit.', 'نتطلع إلى زيارتكم.'),
  ff(TG93, 'Look up', 'Look up new words after class.', 'ابحث عن الكلمات الجديدة بعد الدرس.'),
  ff(TG93, 'Come back', 'Come back before ten, please.', 'عُد قبل العاشرة من فضلك.'),
  ff(TG93, 'came up with', 'She came up with a clever solution.', 'توصلت إلى حل ذكي.'),
  ff(TG93, 'went through', 'He went through a hard year.', 'مر بعام صعب.'),
  ff(TG93, 'goes with', 'This scarf goes with your coat.', 'يليق هذا الشال مع معطفك.'),
];
const l93Orders = O(TG93, [
  ['I am looking for Ali.', 'أبحث عن علي.'],
  ['Come in and sit down.', 'تفضل بالدخول واجلس.'],
  ['She came back at noon.', 'عادت ظهرا.'],
  ["Let's go out tonight.", 'لنخرج الليلة.'],
  ['Prices went up again.', 'ارتفعت الأسعار مجددا.'],
  ['Go on with your work.', 'واصل عملك.'],
]);
const l93Mc = M(TG93, [
  ['I am ___ for my keys.', ['coming', 'looking', 'going'], 1, 'أبحث عن مفاتيحي.'],
  ['She will ___ after the children tonight.', ['go', 'come', 'look'], 2, 'ستعتني بالأطفال الليلة.'],
  ['He ___ up with a new idea.', ['went', 'came', 'looked'], 1, 'توصل إلى فكرة جديدة.'],
  ['___ on! We are late.', ['Look', 'Go', 'Come'], 2, 'هيا! سنتأخر.'],
  ['The scarf ___ with your dress.', ['looks', 'goes', 'comes'], 1, 'يتناسق الشال مع فستانك.'],
  ['I ___ across my old diary.', ['came', 'went', 'got'], 0, 'عثرت على يومياتي القديمة.'],
]);

/* ============================================================
   094 Collocations with DO & MAKE (A2)
   ============================================================ */
const TG94 = ['vocabulary', 'collocations', 'do-make'];
const l94Lt = T(TG94, [
  ['I always do my homework after school.', 'أعمل واجبي دائما بعد المدرسة.'],
  ['She does the dishes every evening.', 'تغسل الأطباق كل مساء.'],
  ['He does exercise three times a week.', 'يمارس التمارين ثلاث مرات أسبوعيا.'],
  ['We do business with two local farms.', 'نتعامل تجاريا مع مزرعتين محليتين.'],
  ['Can you do me a small favor?', 'هل يمكنك أن تفعل لي معروفا صغيرا؟'],
  ['She did her best in the interview.', 'بذلت قصارى جهدها في المقابلة.'],
  ['The storm did a lot of damage.', 'ألحقت العاصفة أضرارا بالغة.'],
  ['You should do something useful today.', 'ينبغي أن تفعل شيئا مفيدا اليوم.'],
  ['There is nothing to do in this village.', 'لا يوجد ما يُفعل في هذه القرية.'],
  ['He does the laundry on Sundays.', 'يغسل الملابس أيام الأحد.'],
  ['What can I do for you?', 'ماذا يمكنني أن أفعل لأجلك؟'],
  ['They did a lot of research for the report.', 'أجروا بحثا كبيرا من أجل التقرير.'],
  ['Make a decision before Friday.', 'اتخذ قرارا قبل الجمعة.'],
  ['She made a difficult decision last night.', 'اتخذت قرارا صعبا ليلة أمس.'],
  ['Everyone makes mistakes sometimes.', 'يرتكب الجميع أخطاء أحيانا.', 1],
  ["Please don't make so much noise.", 'من فضلك لا تُحدث كل هذا الضجيج.'],
  ['He makes good money in his new job.', 'يكسب مالا جيدا في عمله الجديد.'],
  ['It is easy to make friends at camp.', 'من السهل تكوين صداقات في المخيم.'],
  ['The team is making great progress.', 'يحقق الفريق تقدما كبيرا.'],
  ['I made an appointment with the dentist.', 'حجزت موعدا عند طبيب الأسنان.'],
  ['Make sure the door is locked.', 'تأكد من أن الباب مقفل.'],
  ['She made a phone call to her boss.', 'أجرت مكالمة إلى مديرها.'],
  ['He makes his bed every morning.', 'يرتب فراشه كل صباح.'],
  ['Close your eyes and make a wish.', 'أغمض عينيك وتمنَ أمنية.'],
  ['We made a plan for the weekend.', 'وضعنا خطة لعطلة نهاية الأسبوع.'],
  ['The children made a mess in the kitchen.', 'أحدث الأطفال فوضى في المطبخ.'],
  ['She made a delicious soup for lunch.', 'أعدت حساء لذيذا للغداء.'],
  ['He made an offer on the old house.', 'قدّم عرضا لشراء المنزل القديم.'],
  ["Don't make fun of his accent.", 'لا تسخر من لكنته.'],
  ['I need to make a list of things to buy.', 'أحتاج أن أعد قائمة بالمشتريات.'],
  ['Do you always do the cooking at home?', 'هل تتولى الطبخ دائما في البيت؟'],
  ['We did the homework together after class.', 'عملنا الواجب معا بعد الدرس.'],
  ['Make yourself at home.', 'اجعل نفسك في بيتك.', 1],
  ['She is making a cake for my birthday.', 'تعد كعكة لعيد ميلادي.'],
  ['This photo makes me smile.', 'تجعلني هذه الصورة أبتسم.'],
  ['They do volunteer work on Saturdays.', 'يقومون بعمل تطوعي أيام السبت.'],
  ['I made a mistake in the calculation.', 'أخطأت في الحساب.'],
  ['Let me make it clear: the bus leaves at eight.', 'دعني أوضح: تنطلق الحافلة في الثامنة.'],
  ['The rule is strict; we cannot make exceptions.', 'القاعدة صارمة؛ لا يمكن الاستثناء.'],
  ['He did five exercises from the workbook.', 'حل خمسة تمارين من كتاب التمارين.'],
]);
const l94Fills = [
  ff(TG94, 'Do', 'Do your best in the exam.', 'ابذل قصارى جهدك في الامتحان.'),
  ff(TG94, 'Make', 'Make sure your phone is charged.', 'تأكد من أن هاتفك مشحون.'),
  ff(TG94, 'makes', 'He makes his bed every day.', 'يرتب فراشه كل يوم.'),
  ff(TG94, 'decision', 'We made a quick decision.', 'اتخذنا قرارا سريعا.'),
  ff(TG94, 'mistake', 'Everyone makes a mistake sometimes.', 'يخطئ كل إنسان أحيانا.'),
  ff(TG94, 'friends', 'She makes friends easily.', 'تكون الصداقات بسهولة.'),
  ff(TG94, 'noise', 'The boys are making a noise upstairs.', 'يحدث الأولاد ضجيجا في الطابق العلوي.'),
  ff(TG94, 'favor', 'He did me a big favor.', 'قام لي بمعروف كبير.'),
];
const l94Orders = O(TG94, [
  ['She does the dishes daily.', 'تغسل الأطباق يوميا.'],
  ['He makes good coffee.', 'يعد قهوة جيدة.'],
  ['We made a mistake.', 'ارتكبنا خطأ.'],
  ['Make sure the door is closed.', 'تأكد من أن الباب مغلق.'],
  ['I did my homework.', 'عملت واجبي.'],
  ['They make money from honey.', 'يكسبون المال من العسل.'],
]);
const l94Mc = M(TG94, [
  ['She ___ the laundry on Friday.', ['makes', 'does', 'goes'], 1, 'تغسل الملابس يوم الجمعة.'],
  ['We must ___ a decision today.', ['make', 'do', 'take'], 0, 'علينا اتخاذ قرار اليوم.'],
  ["Please don't ___ so much noise.", ['do', 'take', 'make'], 2, 'من فضلك لا تُحدث ضجيجا.'],
  ['He ___ his best in every match.', ['makes', 'does', 'takes'], 1, 'يبذل قصارى جهده في كل مباراة.'],
  ['They ___ friends at the new school.', ['made', 'did', 'took'], 0, 'كوّنوا صداقات في المدرسة الجديدة.'],
  ['I will ___ an appointment for Monday.', ['do', 'make', 'give'], 1, 'سأحجز موعدا للاثنين.'],
]);

/* ============================================================
   095 Collocations with HAVE & TAKE (A2)
   ============================================================ */
const TG95 = ['vocabulary', 'collocations', 'have-take'];
const l95Lt = T(TG95, [
  ['We have breakfast at seven.', 'نتناول الفطور في السابعة.', 1],
  ['She has lunch with her colleagues.', 'تتناول الغداء مع زملائها.'],
  ['They had dinner at a seafood restaurant.', 'تناولوا العشاء في مطعم للمأكولات البحرية.'],
  ['I have a shower before work.', 'أستحم قبل العمل.'],
  ['He had a good rest after the trip.', 'استراح جيدا بعد الرحلة.'],
  ['Have fun at the party!', 'استمتع في الحفلة!', 1],
  ['Can I have a look at your newspaper?', 'هل يمكنني إلقاء نظرة على جريدتك؟'],
  ["We don't have time to wait.", 'ليس لدينا وقت للانتظار.'],
  ['She is having a party on Saturday.', 'تقيم حفلا يوم السبت.'],
  ['I have a headache; I need some rest.', 'أشعر بصداع؛ أحتاج قسطا من الراحة.'],
  ['He has a cold, so he stays home.', 'مصاب بالزكام، لذلك يبقى في البيت.'],
  ['They have two cars and a small garden.', 'يملكون سيارتين وحديقة صغيرة.'],
  ['Do you have any questions?', 'هل لديك أي أسئلة؟', 1],
  ["I don't have any money with me.", 'ليس معي أي نقود.'],
  ['We had a great time at the beach.', 'قضينا وقتا رائعا على الشاطئ.'],
  ['Have a seat; the doctor will see you soon.', 'تفضل بالجلوس؛ سيفحصك الطبيب قريبا.'],
  ['She had a quick conversation with the manager.', 'أجرت محادثة سريعة مع المدير.'],
  ['Take a shower after the gym.', 'استحم بعد النادي الرياضي.'],
  ["Let's take a short break.", 'لنأخذ استراحة قصيرة.'],
  ['He takes photos of old buildings.', 'يلتقط صورا للمباني القديمة.'],
  ['We take a walk after dinner.', 'نتماشى بعد العشاء.'],
  ['She took a nap in the afternoon.', 'أخذت قيلولة بعد الظهر.'],
  ['Take this medicine twice a day.', 'تناول هذا الدواء مرتين يوميا.'],
  ['We took a taxi to the airport.', 'استقلنا سيارة أجرة إلى المطار.'],
  ['I take the bus to university.', 'أركب الحافلة إلى الجامعة.'],
  ['She will take the exam in May.', 'ستخوض الامتحان في مايو.'],
  ['Sometimes you have to take a risk.', 'أحيانا عليك أن تخاطر.'],
  ['The festival takes place in July.', 'يقام المهرجان في يوليو.'],
  ['Take a deep breath and relax.', 'خذ نفسا عميقا واسترخ.', 1],
  ["He didn't take my advice.", 'لم يأخذ بنصيحتي.'],
  ['I have a meeting at ten.', 'لدي اجتماع في العاشرة.'],
  ['She has beautiful handwriting.', 'لديها خط جميل.'],
  ['We have plans for the evening.', 'لدينا خطط لهذا المساء.'],
  ['He takes the children to the park on Friday.', 'يأخذ الأطفال إلى الحديقة يوم الجمعة.'],
  ['Did you take your keys?', 'هل أخذت مفاتيحك؟'],
  ['They had an argument about money.', 'اختلفا حول المال.'],
  ['Take a look at this picture.', 'ألقِ نظرة على هذه الصورة.', 1],
  ['I have a lot of work today.', 'لدي الكثير من العمل اليوم.'],
  ['She takes sugar in her coffee.', 'تضع سكرا في قهوتها.'],
  ['We had lunch in the garden.', 'تناولنا الغداء في الحديقة.'],
]);
const l95Fills = [
  ff(TG95, 'Have', 'Have a good trip!', 'أتمنى لك رحلة طيبة!'),
  ff(TG95, 'Take', 'Take a break; you look tired.', 'خذ استراحة؛ تبدو متعبا.'),
  ff(TG95, 'breakfast', 'We have breakfast at home.', 'نتناول الفطور في البيت.'),
  ff(TG95, 'shower', 'I had a shower after the gym.', 'استحميت بعد النادي.'),
  ff(TG95, 'photos', 'He takes photos of the old city.', 'يلتقط صورا للمدينة القديمة.'),
  ff(TG95, 'nap', 'The baby took a nap at noon.', 'أخذ الرضيع قيلولة ظهرا.'),
  ff(TG95, 'medicine', 'Take your medicine with food.', 'تناول دواءك مع الطعام.'),
  ff(TG95, 'seat', 'Please have a seat in the waiting room.', 'تفضل بالجلوس في غرفة الانتظار.'),
];
const l95Orders = O(TG95, [
  ['We have dinner at eight.', 'نتناول العشاء في الثامنة.'],
  ['Take a deep breath.', 'خذ نفسا عميقا.'],
  ['She has a cold.', 'لديها زكام.'],
  ['He took a taxi home.', 'عاد إلى البيت بسيارة أجرة.'],
  ["Let's take a walk.", 'لنتماشى قليلا.'],
  ['I have no time.', 'ليس لدي وقت.'],
]);
const l95Mc = M(TG95, [
  ['We ___ breakfast together.', ['take', 'have', 'make'], 1, 'نتناول الفطور معا.'],
  ['He ___ a shower every morning.', ['makes', 'does', 'has'], 2, 'يستحم كل صباح.'],
  ["Let's ___ a break now.", ['give', 'make', 'take'], 2, 'لنأخذ استراحة الآن.'],
  ['She ___ a photo of the tower.', ['took', 'made', 'had'], 0, 'التقطت صورة للبرج.'],
  ['The meeting will ___ place at noon.', ['have', 'take', 'make'], 1, 'سيجري الاجتماع ظهرا.'],
  ['Do you ___ any brothers?', ['take', 'do', 'have'], 2, 'هل لديك أي إخوة؟'],
]);

/* ============================================================
   096 Idioms about Time (B1)
   ============================================================ */
const TG96 = ['vocabulary', 'idioms', 'time'];
const l96Lt = T(TG96, [
  ['We go to the cinema once in a blue moon.', 'نذهب إلى السينما نادرا جدا.'],
  ['She eats seafood once in a blue moon.', 'نادرا ما تأكل المأكولات البحرية.'],
  ['The ambulance arrived in the nick of time.', 'وصلت سيارة الإسعاف في اللحظة الحاسمة.'],
  ['He caught the train in the nick of time.', 'لحق بالقطار في اللحظة الأخيرة.'],
  ['The hospital operates around the clock.', 'يعمل المستشفى على مدار الساعة.'],
  ['Rescue teams worked around the clock.', 'عملت فرق الإنقاذ على مدار الساعة.'],
  ['Better late than never, as they say.', 'التأخر خير من العدم كما يقولون.'],
  ['He apologized two years later; better late than never.', 'اعتذر بعد عامين؛ التأخر خير من العدم.'],
  ["Let's call it a day and go home.", 'لننهِ عمل اليوم ولنعد إلى البيت.'],
  ["It is getting dark; let's call it a day.", 'بدأ الجو يظلم؛ لننهِ العمل لهذا اليوم.'],
  ['Time flies when you are having fun.', 'يمر الوقت بسرعة عندما نستمتع.'],
  ['Time flies; the holidays are over already.', 'يمضي الوقت بسرعة؛ انتهت العطلة بالفعل.'],
  ['The train always arrives on time.', 'يصل القطار دائما في موعده.'],
  ['Please be on time for the meeting.', 'من فضلك احضر الاجتماع في موعده.'],
  ['I read magazines to kill time at the clinic.', 'أقرأ المجلات لملء الفراغ في العيادة.'],
  ['They played cards to kill time during the delay.', 'لعبوا الورق لملء الفراغ أثناء التأخير.'],
  ['You will learn the app in no time.', 'ستتعلم التطبيق في وقت قصير جدا.'],
  ['With his help, we fixed the car in no time.', 'بمساعدته أصلحنا السيارة بسرعة.'],
  ['Plan your day to save time.', 'نظم يومك لتوفير الوقت.'],
  ["Don't waste time on silly games.", 'لا تضيع الوقت في الألعاب التافهة.'],
  ['For the time being, we will stay in this flat.', 'سنبقى في هذه الشقة في الوقت الحالي.'],
  ['The shop is closed for the time being.', 'المتجر مغلق مؤقتا.'],
  ['She finished the essay at the last minute.', 'أنهت المقال في اللحظة الأخيرة.'],
  ['He booked the tickets at the last minute.', 'حجز التذاكر في اللحظة الأخيرة.'],
  ['Take your time and choose carefully.', 'خذ راحتك واختر بعناية.'],
  ['The team worked against the clock to finish.', 'عمل الفريق بسرعة قصوى لإنهاء العمل قبل الموعد.'],
  ['We were racing against the clock before the deadline.', 'كنا نسابق الوقت قبل الموعد النهائي.'],
  ['In those days, there was no internet.', 'في تلك الأيام لم يكن هناك إنترنت.'],
  ['From time to time, I visit my hometown.', 'من حين لآخر أزور مدينتي.'],
  ['He checks his email from time to time.', 'يتفقد بريده الإلكتروني من حين لآخر.'],
  ['A deal was reached at the eleventh hour.', 'توصلوا إلى اتفاق في اللحظة الأخيرة.'],
  ['We arrived in the middle of the night.', 'وصلنا في منتصف الليل.'],
  ['It is high time you went to bed.', 'آن الأوان أن تذهب إلى الفراش.'],
  ['The bus leaves in five minutes; hurry up.', 'ينطلق الباص بعد خمس دقائق؛ أسرع.'],
  ['Once upon a time, there was a kind king.', 'كان يا ما كان ملكا طيبا.'],
  ['In the long run, exercise pays off.', 'على المدى الطويل يثمر التمرين المنتظم.'],
  ['He will be back in half an hour.', 'سيعود بعد نصف ساعة.'],
  ['The class starts at eight on the dot.', 'يبدأ الدرس في الثامنة تماما.'],
  ['Be patient; a watched pot never boils.', 'تحلَّ بالصبر؛ الانتظار يجعل الوقت يبدو أطول.'],
  ['After a long time, we finally met again.', 'بعد زمن طويل التقينا أخيرا.'],
]);
const l96Fills = [
  ff(TG96, 'once in a blue moon', 'We dine out once in a blue moon.', 'نخرج للعشاء نادرا جدا.'),
  ff(TG96, 'on time', 'The manager expects everyone on time.', 'يتوقع المدير حضور الجميع في الموعد.'),
  ff(TG96, 'kill time', 'I walked around to kill time.', 'تجولت لملء الفراغ.'),
  ff(TG96, 'in no time', 'She finished the quiz in no time.', 'أنهت الاختبار في وقت قصير جدا.'),
  ff(TG96, 'call it a day', 'We decided to call it a day.', 'قررنا إنهاء العمل لهذا اليوم.'),
  ff(TG96, 'Time flies', 'Time flies when we travel.', 'يمضي الوقت بسرعة عندما نسافر.'),
  ff(TG96, 'from time to time', 'He calls his aunt from time to time.', 'يتصل بخالته من حين لآخر.'),
  ff(TG96, 'Take your time', 'Take your time; there is no rush.', 'خذ راحتك؛ لا يوجد استعجال.'),
];
const l96Orders = O(TG96, [
  ['The train arrives on time.', 'يصل القطار في موعده.'],
  ['We go out once in a blue moon.', 'نخرج نادرا جدا.'],
  ["Let's call it a day.", 'لننهِ عمل اليوم.'],
  ["Don't waste your time here.", 'لا تضيع وقتك هنا.'],
  ['Time flies so fast.', 'يمضي الوقت بسرعة.'],
  ['I will be back in no time.', 'سأعود في وقت قصير جدا.'],
]);
const l96Mc = M(TG96, [
  ['He visits us ___ in a blue moon.', ['one', 'once', 'two'], 1, 'يزورنا نادرا جدا.'],
  ['Please be ___ time for class.', ['in', 'at', 'on'], 2, 'من فضلك احضر الصف في موعده.'],
  ["Let's ___ it a day.", ['make', 'call', 'take'], 1, 'لننهِ العمل لهذا اليوم.'],
  ['She finished the race in ___ time.', ['no', 'none', 'not'], 0, 'أنهت السباق في وقت قصير جدا.'],
  ['___ your time; the shop is open late.', ['Spend', 'Take', 'Give'], 1, 'خذ راحتك؛ المتجر يفتح حتى وقت متأخر.'],
  ['We worked ___ the clock to meet the deadline.', ['over', 'above', 'around'], 2, 'عملنا على مدار الساعة للالتزام بالموعد النهائي.'],
]);

/* ============================================================
   097 Idioms about Feelings (B1)
   ============================================================ */
const TG97 = ['vocabulary', 'idioms', 'feelings'];
const l97Lt = T(TG97, [
  ['I am feeling under the weather today.', 'أشعر بتوعك اليوم.'],
  ['She stayed home because she was under the weather.', 'بقيت في البيت لأنها كانت تشعر بتوعك.'],
  ['He was over the moon about his new job.', 'كان في قمة سعادته بعمله الجديد.'],
  ['She was over the moon when she won the prize.', 'غمرتها السعادة عندما فازت بالجائزة.'],
  ['He has been down in the dumps since Monday.', 'منذ الاثنين وهو في حالة من الكآبة.'],
  ['Grey skies put me down in the dumps.', 'تجعلني السماء الرمادية في حالة من الكآبة.'],
  ['They were on cloud nine after the wedding.', 'كانوا في غاية السعادة بعد الزفاف.'],
  ['Winning the trophy put the team on cloud nine.', 'أغمرت الفوز بالكأس الفريق بالسعادة.'],
  ['I feel blue on winter evenings.', 'أشعر بالحزن في أمسيات الشتاء.'],
  ['He felt blue after his friends left.', 'شعر بالحزن بعد رحيل أصدقائه.'],
  ['She got cold feet before the wedding.', 'شعرت بالتردد قبل الزفاف.'],
  ['He got cold feet and cancelled the speech.', 'أصابه التردد فألغى الخطاب.'],
  ['The sad film broke my heart.', 'كسر الفيلم الحزين قلبي.'],
  ['It would break his heart to sell the farm.', 'سيؤلمه جدا أن يبيع المزرعة.'],
  ['Keep your chin up; things will improve.', 'حافظ على معنوياتك؛ ستتحسن الأمور.'],
  ['She kept her chin up during the hard month.', 'تحلَّت بالتفاؤل خلال الشهر العصيب.'],
  ['He loses his temper when traffic is heavy.', 'يفقد أعصابه عندما يكون الازدحام شديدا.'],
  ["Don't lose your temper with the children.", 'لا تفقد أعصابك مع الأطفال.'],
  ['Dad hit the roof when he saw the bill.', 'استشاط الأب غضبا عندما رأى الفاتورة.'],
  ['The coach hit the roof after the defeat.', 'استشاط المدرب غضبا بعد الهزيمة.'],
  ['I have mixed feelings about moving abroad.', 'لدي مشاعر متضاربة حيال الانتقال إلى الخارج.'],
  ['She had mixed feelings about the offer.', 'كانت لديها مشاعر متضاربة حيال العرض.'],
  ['Before the exam, I had butterflies in my stomach.', 'شعرت بالتوتر والقلق قبل الامتحان.'],
  ['He had butterflies in his stomach before the interview.', 'شعر بالتوتر والقلق قبل المقابلة.'],
  ['The horror film scared me to death.', 'أرعبني فيلم الرعب كثيرا.'],
  ['I was scared to death of the dark as a child.', 'كنت أخاف من الظلام بشدة في طفولتي.'],
  ['After the promotion, he felt on top of the world.', 'شعر بسعادة غامرة بعد الترقية.'],
  ['A kind word can lift your spirits.', 'الكلمة الطيبة ترفع المعنويات.'],
  ['Her encouragement lifted my spirits.', 'رفعت تشجيعها معنوياتي.'],
  ["He was green with envy at his neighbor's new car.", 'غاره الحسد على سيارة جاره الجديدة.'],
  ['Try to look on the bright side of things.', 'حاول أن تنظر إلى الجانب الإيجابي من الأمور.'],
  ['Look on the bright side: the delay gave us time.', 'انظر إلى الجانب الإيجابي؛ التأخير منحنا وقتا.'],
  ['The good news made my day.', 'أضاء الخبر السار يومي.'],
  ['Your call really made my day.', 'أضافت مكالمتك البهجة إلى يومي حقا.'],
  ['He blows off steam at the gym.', 'يفرغ غضبه في النادي الرياضي.'],
  ['I go running to blow off steam.', 'أركض لتفريغ ما عندي من توتر.'],
  ['She was on pins and needles waiting for the results.', 'كانت على أحر من الجمر بانتظار النتائج.'],
  ['I am on pins and needles; the results come today.', 'أنا على أحر من الجمر؛ النتائج تظهر اليوم.'],
  ['Cheer up! Tomorrow is another day.', 'ابتهج؛ الغد يوم آخر.', 1],
  ['He cheered up after hearing the joke.', 'تحسنت حالته بعد سماع النكتة.'],
]);
const l97Fills = [
  ff(TG97, 'under the weather', 'He is a bit under the weather today.', 'يشعر بتوعك قليلا اليوم.'),
  ff(TG97, 'over the moon', 'She was over the moon about the news.', 'كانت في قمة السعادة بسبب الخبر.'),
  ff(TG97, 'feel blue', 'Rainy days make me feel blue.', 'أيام المطر تجعلني أشعر بالحزن.'),
  ff(TG97, 'lose your temper', 'Try not to lose your temper in traffic.', 'حاول ألا تفقد أعصابك في الازدحام.'),
  ff(TG97, 'mixed feelings', 'I have mixed feelings about the move.', 'لدي مشاعر متضاربة حيال الانتقال.'),
  ff(TG97, 'made my day', 'Your gift really made my day.', 'أضافت هديتك البهجة إلى يومي حقا.'),
  ff(TG97, 'cold feet', 'He got cold feet before the interview.', 'أصابه التردد قبل المقابلة.'),
  ff(TG97, 'Cheer up', 'Cheer up; the weekend is near.', 'ابتهج؛ عطلة نهاية الأسبوع قريبة.'),
];
const l97Orders = O(TG97, [
  ['I feel blue today.', 'أشعر بالحزن اليوم.'],
  ['She was over the moon.', 'كانت في قمة السعادة.'],
  ["Don't lose your temper.", 'لا تفقد أعصابك.'],
  ['He is under the weather.', 'يشعر بتوعك.'],
  ['Cheer up, my friend!', 'ابتهج يا صديقي!'],
  ['The film broke my heart.', 'كسر الفيلم قلبي.'],
]);
const l97Mc = M(TG97, [
  ['I feel a bit under the ___.', ['rain', 'weather', 'cloud'], 1, 'أشعر بتوعك قليلا.'],
  ['She was ___ the moon with joy.', ['over', 'under', 'above'], 0, 'غمرتها السعادة.'],
  ['He lost his ___ when the car broke down.', ['head', 'mind', 'temper'], 2, 'فقد أعصابه عندما تعطلت السيارة.'],
  ['The team was on cloud ___.', ['nine', 'seven', 'ten'], 0, 'كان الفريق في غاية السعادة.'],
  ['Before the speech, he had butterflies in his ___.', ['hand', 'bag', 'stomach'], 2, 'شعر بالتوتر قبل الخطاب.'],
  ['Try to look on the bright ___.', ['side', 'day', 'end'], 0, 'حاول النظر إلى الجانب الإيجابي.'],
]);

/* ============================================================
   098 Synonyms in Context (B1)
   ============================================================ */
const TG98 = ['vocabulary', 'synonyms'];
const l98Lt = T(TG98, [
  ['The whale is a huge animal.', 'الحوت حيوان ضخم.'],
  ['They live in a large house near the lake.', 'يسكنون في منزل كبير قرب البحيرة.'],
  ['A tiny spider climbed the wall.', 'تسلق عنكبوت صغير جدا الحائط.'],
  ['She gave me a little smile.', 'ابتسمت لي ابتسامة صغيرة.'],
  ['We are glad you could come.', 'يسعدنا أن تكون قد جئت.'],
  ["The cheerful music lifted everyone's mood.", 'رفعت الموسيقى المرحة معنويات الجميع.'],
  ['He felt gloomy after the long winter.', 'شعر بالكآبة بعد الشتاء الطويل.'],
  ['My uncle is a clever carpenter.', 'عمي نجار ماهر.'],
  ['The bright student answered quickly.', 'أجاب الطالب الذكي بسرعة.'],
  ['After the marathon, I was exhausted.', 'كنت منهكا بعد الماراثون.'],
  ['The baby is sleepy after her bath.', 'يشعر الرضيع بالنعاس بعد حمامه.'],
  ['The manager was furious about the delay.', 'استشاط المدير غضبا بسبب التأخير.'],
  ['I was slightly annoyed by the noise.', 'أزعجني الضجيج قليلا.'],
  ['Heavy rain began at noon.', 'بدأ هطول مطر غزير ظهرا.'],
  ['The meeting will begin in five minutes.', 'سيبدأ الاجتماع بعد خمس دقائق.'],
  ['Did you finish your assignment?', 'هل أنهيت مهمتك؟'],
  ['She completed the puzzle in one evening.', 'أكملت الأحجية في أمسية واحدة.'],
  ['Could you assist me with this box?', 'هل يمكنك مساعدتي في حمل هذا الصندوق؟'],
  ['I enjoy long walks by the river.', 'أستمتع بالمشي الطويل بجانب النهر.'],
  ['The train is faster than the bus.', 'القطار أسرع من الحافلة.'],
  ['It is chilly this morning; wear a jacket.', 'الجو بارد قليلا هذا الصباح؛ البس سترة.'],
  ['The lake water was freezing in April.', 'كان ماء البحيرة متجمدا في أبريل.'],
  ['This secondhand bike was inexpensive.', 'كانت هذه الدراجة المستعملة غير مكلفة.'],
  ['Climbing the mountain is a tough challenge.', 'يعد تسلق الجبل تحديا شاقا.'],
  ['Water is essential for life.', 'الماء ضروري للحياة.'],
  ['The museum has a fascinating collection.', 'يضم المتحف مجموعة مدهشة.'],
  ['The stairs are narrow, so be careful.', 'الدرج ضيق لذلك كن حذرا.'],
  ['He gave me a slim chance of winning.', 'منحني فرصة ضئيلة للفوز.'],
  ['Your guess was close, but not accurate.', 'كان تخمينك قريبا لكنه غير دقيق.'],
  ['Her accurate notes saved us time.', 'ملاحظاتها الدقيقة وفّرت علينا الوقت.'],
  ['She is fond of old films.', 'هي مولعة بالأفلام القديمة.'],
  ['Everyone admires his honesty.', 'يُبدي الجميع إعجابهم بصدقه.'],
  ['The castle is ancient, over nine hundred years old.', 'القلعة عريقة؛ عمرها يزيد على تسعمائة عام.'],
  ['We bought a modern flat in the new district.', 'اشترينا شقة حديثة في الحي الجديد.'],
  ['The road was empty at midnight.', 'كان الطريق فارغا في منتصف الليل.'],
  ['The apartment has been vacant for months.', 'ظلت الشقة شاغرة لأشهر.'],
  ['He is famous for his delicious pastries.', 'هو مشهور بمعجناته اللذيذة.'],
  ['The singer is well known in our city.', 'المغني معروف جيدا في مدينتنا.'],
  ['It was a quiet night in the village.', 'كانت ليلة هادئة في القرية.'],
  ['The forest looks peaceful in the morning.', 'تبدو الغابة ساكنة في الصباح.'],
]);
const l98Fills = [
  ff(TG98, 'huge', 'The elephant is a huge animal.', 'الفيل حيوان ضخم.'),
  ff(TG98, 'exhausted', 'We were exhausted after the long hike.', 'كنا منهكين بعد المشي الطويل.'),
  ff(TG98, 'furious', 'She was furious about the broken vase.', 'استشاطت غضبا بسبب المزهرية المكسورة.'),
  ff(TG98, 'essential', 'Sleep is essential for good health.', 'النوم ضروري للصحة الجيدة.'),
  ff(TG98, 'freezing', 'It is freezing outside today.', 'الجو بارد جدا في الخارج اليوم.'),
  ff(TG98, 'vacant', 'The office has been vacant since March.', 'ظل المكتب شاغرا منذ مارس.'),
  ff(TG98, 'ancient', 'They visited an ancient temple.', 'زاروا معبدا عريقا.'),
  ff(TG98, 'begin', 'The show will begin at eight.', 'سيبدأ العرض في الثامنة.'),
];
const l98Orders = O(TG98, [
  ['The whale is huge.', 'الحوت ضخم.'],
  ['I enjoy quiet evenings.', 'أستمتع بالأمسيات الهادئة.'],
  ['She completed the difficult task.', 'أكملت المهمة الصعبة.'],
  ['It is freezing this morning.', 'الجو بارد جدا هذا الصباح.'],
  ['The meeting will begin soon.', 'سيبدأ الاجتماع قريبا.'],
  ['He is famous for his paintings.', 'هو مشهور بلوحاته.'],
]);
const l98Mc = M(TG98, [
  ['The giant tower is ___.', ['tiny', 'huge', 'slim'], 1, 'البرج العملاق ضخم.'],
  ['After the long trip, we were ___.', ['cheerful', 'exhausted', 'famous'], 1, 'كنا منهكين بعد الرحلة الطويلة.'],
  ['The water is ___; do not swim.', ['warm', 'chilly', 'freezing'], 2, 'الماء بارد متجمد؛ لا تسبح.'],
  ['Clean water is ___ for life.', ['essential', 'vacant', 'gloomy'], 0, 'الماء النقي ضروري للحياة.'],
  ['The angry coach was ___ after the loss.', ['glad', 'furious', 'sleepy'], 1, 'كان المدرب مستشيطا غضبا بعد الخسارة.'],
  ['The old castle is ___.', ['ancient', 'modern', 'tiny'], 0, 'القلعة القديمة عريقة.'],
]);

/* ============================================================
   099 Antonyms in Context (A2)
   ============================================================ */
const TG99 = ['vocabulary', 'antonyms'];
const l99Lt = T(TG99, [
  ['The coffee is hot, but the juice is cold.', 'القهوة ساخنة، لكن العصير بارد.', 2],
  ['My street is quiet; the main road is noisy.', 'شارعي هادئ؛ والطريق الرئيسي صاخب.', 2],
  ['This box is heavy and that one is light.', 'هذا الصندوق ثقيل وذلك خفيف.', 2],
  ['The test was easy, but the homework was hard.', 'كان الاختبار سهلا، لكن الواجب صعبا.', 2],
  ['Early birds wake up, night owls sleep late.', 'يستيقظ أبناء الصباح، وينام أصحاب الليل متأخرين.', 2],
  ['The glass is half full, not half empty.', 'الكوب نصف ممتلئ، وليس نصف فارغ.', 2],
  ['Old houses are charming; new ones are practical.', 'البيوت القديمة ساحرة؛ والجديدة عملية.', 2],
  ['The trip was short, but the memories are long.', 'كانت الرحلة قصيرة، لكن الذكريات طويلة.', 2],
  ['Slow and steady wins the race.', 'البطيء الثابت يفوز بالسباق.', 2],
  ['The door is open; the window is closed.', 'الباب مفتوح؛ والنافذة مغلقة.', 2],
  ['Clean streets make a city beautiful.', 'الشوارع النظيفة تجعل المدينة جميلة.', 2],
  ['The rich and the poor share one moon.', 'الغني والفقير يتشاركان قمرا واحدا.', 2],
  ['The tea is sweet; the medicine is bitter.', 'الشاي حلو؛ والدواء مر.', 2],
  ['Strong coffee, weak signal.', 'قهوة قوية، وإشارة ضعيفة.', 2],
  ['The market is crowded in the morning and empty at night.', 'السوق مزدحم صباحا وخال ليلا.', 2],
  ['Wide streets, narrow lanes.', 'شوارع واسعة، وأزقة ضيقة.', 2],
  ['The answer is correct; the guess is wrong.', 'الإجابة صحيحة؛ والتخمين خاطئ.', 2],
  ['Fill the bottle; empty the basket.', 'املأ الزجاجة؛ وأفرغ السلة.', 2],
  ['Cheap tickets sell fast; expensive ones wait.', 'التذاكر الرخيصة تبيع سريعا؛ والغالية تنتظر.', 2],
  ['The soup is warm now, but it was cold before.', 'الحساء دافئ الآن، لكنه كان باردا قبل قليل.', 2],
  ['The question was simple; the explanation was complex.', 'كان السؤال بسيطا؛ والشرح معقدا.', 2],
  ['Happy days pass quickly; sad days pass slowly.', 'الأيام السعيدة تمضي سريعا؛ والحزينة ببطء.', 2],
  ['A loud laugh, a quiet smile.', 'ضحكة عالية، وابتسامة هادئة.', 2],
  ['The elevator goes up and comes down.', 'المصعد يصعد ثم ينزل.', 2],
  ['Fresh bread today, stale bread tomorrow.', 'خبز طازج اليوم، ويابس غدا.', 2],
  ['The bus was full; the train was empty.', 'كانت الحافلة ممتلئة؛ والقطار خاليا.', 2],
  ['Wet roads after rain, dry roads in summer.', 'طرق مبتلة بعد المطر، وجافة في الصيف.', 2],
  ['The bag is light; the luggage is heavy.', 'الحقيبة خفيفة؛ والأمتعة ثقيلة.', 2],
  ['Fast trains and slow boats.', 'قطارات سريعة وقوارب بطيئة.', 2],
  ['The room is bright in the morning and dark at night.', 'الغرفة مشرقة صباحا ومظلمة ليلا.', 2],
  ['Push to open, pull to close.', 'ادفع للفتح، واسحب للإغلاق.', 2],
  ['The baby is asleep; the cat is awake.', 'الطفل نائم؛ والقطة مستيقظة.', 2],
  ['The beginning is easy; the ending is difficult.', 'البداية سهلة؛ والنهاية صعبة.', 2],
  ['Give more, take less.', 'أعطِ أكثر، وخذ أقل.', 2],
  ['The film starts late and finishes early.', 'يبدأ الفيلم متأخرا وينتهي مبكرا.', 2],
  ['The north is cold; the south is warm.', 'الشمال بارد؛ والجنوب دافئ.', 2],
  ['A tall building, a short wall.', 'مبنى شاهق، وجدار قصير.', 2],
  ['Better safe than sorry.', 'السلامة خير من الندامة.', 2],
]);
const l99Fills = [
  ff(TG99, 'empty', 'The hall was empty before the show.', 'كانت القاعة خالية قبل العرض.'),
  ff(TG99, 'noisy', 'The street gets noisy at noon.', 'يصبح الشارع صاخبا ظهرا.'),
  ff(TG99, 'stale', 'Do not eat stale bread.', 'لا تأكل الخبز اليابس.'),
  ff(TG99, 'crowded', 'The bus is crowded at eight.', 'الحافلة مزدحمة في الثامنة.'),
  ff(TG99, 'correct', 'Your answer is correct.', 'إجابتك صحيحة.'),
  ff(TG99, 'dark', 'The room gets dark at night.', 'تصبح الغرفة مظلمة ليلا.'),
  ff(TG99, 'narrow', 'The lane is too narrow for cars.', 'الزقاق ضيق جدا للسيارات.'),
  ff(TG99, 'asleep', 'The baby is asleep now.', 'الطفل نائم الآن.'),
];
const l99Orders = O(TG99, [
  ['The glass is half full.', 'الكوب نصف ممتلئ.'],
  ['Slow and steady wins the race.', 'البطيء الثابت يفوز بالسباق.'],
  ['The door is open.', 'الباب مفتوح.'],
  ['The soup is warm now.', 'الحساء دافئ الآن.'],
  ['Better safe than sorry.', 'السلامة خير من الندامة.'],
  ['Give more, take less.', 'أعطِ أكثر، وخذ أقل.'],
]);
const l99Mc = M(TG99, [
  ['The opposite of "noisy" is…', ['quiet', 'loud', 'busy'], 0, 'عكس صاخب هو هادئ.', 1],
  ['The opposite of "empty" is…', ['full', 'light', 'open'], 0, 'عكس فارغ هو ممتلئ.', 1],
  ['The opposite of "early" is…', ['late', 'slow', 'dark'], 0, 'عكس مبكر هو متأخر.', 1],
  ['The opposite of "heavy" is…', ['light', 'small', 'weak'], 0, 'عكس ثقيل هو خفيف.', 1],
  ['The opposite of "sweet" is…', ['bitter', 'salty', 'sour'], 0, 'عكس حلو هو مر.', 2],
  ['The opposite of "correct" is…', ['wrong', 'false only', 'right'], 0, 'عكس صحيح هو خاطئ.', 1],
]);

/* ============================================================
   100 Commonly Confused Words I (A2)
   ============================================================ */
const TG100 = ['vocabulary', 'confused-words-1'];
const l100Lt = T(TG100, [
  ['Their house is near the school.', 'بيتهم قرب المدرسة.', 2],
  ['Put the keys over there.', 'ضع المفاتيح هناك.', 2],
  ["They're my best friends.", 'إنهم أعز أصدقائي.', 2],
  ['Your phone is ringing.', 'هاتفك يرن.', 2],
  ["You're late again!", 'أنت متأخر مرة أخرى!', 2],
  ['The cat licked its paw.', 'لعقت القطة كفها.', 2],
  ["It's raining outside.", 'إنها تمطر في الخارج.', 2],
  ['We ate first, and then we left.', 'أكلنا أولًا، ثم انصرفنا.', 2],
  ['My brother is taller than me.', 'أخي أطول مني.', 2],
  ['Their car is new, but its engine is loud.', 'سيارتهم جديدة، لكن محركها صاخب.', 2],
  ['There are two books on the desk.', 'هناك كتابان على المكتب.', 2],
  ["You're my favorite cousin.", 'أنت ابن عمي المفضل.', 2],
  ['Is that your umbrella over there?', 'هل تلك مظلتك هناك؟', 2],
  ["It's almost nine o'clock.", 'إنها قرب التاسعة.', 2],
  ['The dog wagged its tail.', 'هز الكلب ذيله.', 2],
  ['They are waiting; they\u2019re patient.', 'هم ينتظرون؛ إنهم صبورون.', 2],
  ['Their garden is full of roses.', 'حديقتهم مليئة بالورود.', 2],
  ['Then we walked to the market.', 'ثم مشينا إلى السوق.', 2],
  ['Better late than never.', 'خير التأثير… لا، خيرها بلاها — الأفضل متأخرا من ألا.', 2],
  ['Your keys are on the table.', 'مفاتيحك على الطاولة.', 2],
  ["You're welcome.", 'على الرحب والسعة.', 2],
  ['The hotel has its own parking.', 'للفندق موقف سيارات خاص به.', 2],
  ['There is milk in the fridge.', 'هناك حليب في الثلاجة.', 2],
  ['Their flight leaves at dawn.', 'رحلتهم تقلع الفجر.', 2],
  ["It's a long story.", 'إنها حكاية طويلة.', 2],
  ['I know her; she\u2019s your neighbor.', 'أعرفها؛ إنها جارتك.', 2],
  ['Your handwriting is beautiful.', 'خطك جميل.', 2],
  ['The team played well; its defense was strong.', 'لعب الفريق جيدا؛ وكان دفاعه قويا.', 2],
  ['There were many people at the station.', 'كان هناك كثيرون في المحطة.', 2],
  ['First we eat, then we talk.', 'نأكل أولًا، ثم نتحدث.', 2],
  ['Their story inspired everyone.', 'قصتهم ألهمت الجميع.', 2],
  ["You're doing great.", 'أنت تؤدي بشكل رائع.', 2],
  ['It costs less than you think.', 'كلفته أقل مما تظن.', 2],
  ['Its cover is blue.', 'غلافه أزرق.', 2],
  ['There goes the last bus.', 'ها قد ذهبت الحافلة الأخيرة.', 2],
  ['Your turn comes after mine.', 'دورك يأتي بعد دوري.', 2],
  ["They're arriving tonight.", 'إنهم يصلون الليلة.', 2],
  ['Then and there, I decided.', 'وهناك وحينها، قررت.', 2],
]);
const l100Fills = [
  ff(TG100, 'Their', 'Their kids study here.', 'أطفالهم يدرسون هنا.'),
  ff(TG100, "They're", "They're coming at six.", 'إنهم يأتون في السادسة.'),
  ff(TG100, 'there', 'Sit there, please.', 'اجلس هناك، من فضلك.'),
  ff(TG100, "It's", "It's cold today.", 'الجو بارد اليوم.'),
  ff(TG100, 'its', 'The city is famous for its bridge.', 'المدينة مشهورة بجسرها.'),
  ff(TG100, 'than', 'Health is better than money.', 'الصحة خير من المال.'),
  ff(TG100, 'then', 'Wash it, then dry it.', 'اغسله، ثم انشفه.'),
  ff(TG100, "You're", "You're invited to dinner.", 'أنت مدعو للعشاء.'),
];
const l100Orders = O(TG100, [
  ['Their house is near the school.', 'بيتهم قرب المدرسة.'],
  ['Put the keys over there.', 'ضع المفاتيح هناك.'],
  ["It's raining outside.", 'إنها تمطر في الخارج.'],
  ['We ate first, and then we left.', 'أكلنا أولًا، ثم انصرفنا.'],
  ['Your phone is ringing.', 'هاتفك يرن.'],
  ['Better late than never.', 'الأفضل متأخرا من ألا.'],
]);
const l100Mc = M(TG100, [
  ['___ going to the match tonight.', ["They're", 'Their', 'There'], 0, 'إنهم ذاهبون إلى المباراة الليلة.', 2],
  ['The shop moved ___ cat food to aisle two.', ['its', "it's", 'it\u2019s'], 0, 'نقل المتجر طعام قططه إلى الممر الثاني.', 2],
  ['We will eat first, ___ study.', ['then', 'than', 'that'], 0, 'سنأكل أولًا ثم ندرس.', 1],
  ['My cake is bigger ___ yours.', ['than', 'then', 'that'], 0, 'كيكي أكبر من كعكتك.', 1],
  ['___ house has a red door.', ['Their', "They're", 'There'], 0, 'بيتهم بباب أحمر.', 1],
  ['___ are three parks here.', ['There', 'Their', "They're"], 0, 'هناك ثلاث حدائق هنا.', 1],
]);

/* ============================================================
   101 Commonly Confused Words II (B1)
   ============================================================ */
const TG101 = ['vocabulary', 'confused-words-2'];
const l101Lt = T(TG101, [
  ['Can I borrow your pen?', 'هل يمكنني استعارة قلمك؟', 2],
  ['Sure, I can lend you my pen.', 'بالتأكيد، يمكنني إعارتك قلمي.', 2],
  ['I lent my bike to Hassan last week.', 'أعرت دراجتي لحسن الأسبوع الماضي.', 2],
  ['He borrowed an umbrella and returned it wet.', 'استعار مظلة وأعادها مبتلة.', 2],
  ['She said goodbye quietly.', 'قالت وداعا بهدوء.', 2],
  ['She told me a funny story.', 'أخبرتني قصة مضحكة.', 2],
  ['Please tell me the truth.', 'من فضلك قل لي الحقيقة.', 2],
  ['He said that he was tired.', 'قال إنه كان متعبا.', 2],
  ['We watched a documentary last night.', 'شاهدنا فيلما وثائقيا الليلة الماضية.', 2],
  ['Look at that beautiful sunset!', 'انظر إلى ذلك الغروب الجميل!', 2],
  ['I see two birds on the roof.', 'أرى طائرتين على السطح.', 2],
  ['Watch the road while driving.', 'راقب الطريق أثناء القيادة.', 2],
  ['Look for your keys in your jacket.', 'ابحث عن مفاتيحك في سترتك.', 2],
  ['Bring your laptop to the meeting.', 'أحضر حاسوبك إلى الاجتماع.', 2],
  ['Take this letter to the post office.', 'خذ هذا الخطاب إلى البريد.', 2],
  ['He said nothing about the price.', 'لم يقول شيئا عن السعر.', 2],
  ['They told us the plan was ready.', 'أخبرونا أن الخطة جاهزة.', 2],
  ['May I borrow your charger?', 'هل يمكنني استعارة شاحنتك؟', 2],
  ['Libraries lend books for free.', 'تُعير المكتبات الكتب مجانا.', 2],
  ['I said hello and sat down.', 'قلت مرحبا وجلست.', 2],
  ['Tell your brother to call me.', 'قل لأخيك أن يتصل بي.', 2],
  ['She watched the children carefully.', 'راقبت الأطفال بعناية.', 2],
  ['I looked everywhere for my wallet.', 'بحثت في كل مكان عن محفظتي.', 2],
  ['We saw a great play last month.', 'شاهدنا مسرحية رائعة الشهر الماضي.', 2],
  ['Bring some water when you come.', 'أحضر بعض الماء عندما تأتي.', 2],
  ['Take an umbrella; it might rain.', 'خذ مظلة؛ قد تمطر.', 2],
  ['He borrowed money from the bank.', 'استعار مالا من البنك.', 2],
  ['The teacher lent me her notes.', 'أعرتني المعلمة ملاحظاتها.', 2],
  ['What did you say?', 'ماذا قلت؟', 2],
  ['Never tell lies.', 'لا تكذب أبدا.', 2],
  ['I look at the stars when I cannot sleep.', 'أنظر إلى النجوم حين لا أنام.', 2],
  ['Did you see the news today?', 'هل رأيت الأخبار اليوم؟', 2],
  ['We watch the match every Friday.', 'نشاهد المباراة كل جمعة.', 2],
  ['Bring the report; take the files back.', 'أحضر التقرير؛ وأعِد الملفات.', 2],
  ['She told the police everything.', 'أخبرت الشرطة بكل شيء.', 2],
  ['Sorry, what did he say about lunch?', 'عفوا، ماذا قال عن الغداء؟', 2],
  ['You can borrow my dictionary.', 'يمكنك استعارة قاموسي.', 2],
  ['Lend me a hand, please.', 'امنحني يد عون، من فضلك.', 2],
]);
const l101Fills = [
  ff(TG101, 'borrow', 'May I borrow your notes?', 'هل يمكنني استعارة ملاحظاتك؟'),
  ff(TG101, 'lend', 'Banks lend money carefully.', 'تُقرض البنوك المال بحذر.'),
  ff(TG101, 'told', 'She told us a secret.', 'أخبرتنا بسر.'),
  ff(TG101, 'said', 'He said he would come.', 'قال إنه سيأتي.'),
  ff(TG101, 'Watch', 'Watch the steps!', 'انتبه للدرجات!'),
  ff(TG101, 'Bring', 'Bring your ID tomorrow.', 'أحضر هويتك غدا.'),
  ff(TG101, 'Take', 'Take the medicine after food.', 'خذ الدواء بعد الطعام.'),
  ff(TG101, 'Look', 'Look at the board, please.', 'انظر إلى السبورة، من فضلك.'),
];
const l101Orders = O(TG101, [
  ['Can I borrow your pen?', 'هل يمكنني استعارة قلمك؟'],
  ['She told me a funny story.', 'أخبرتني قصة مضحكة.'],
  ['Look at that beautiful sunset!', 'انظر إلى ذلك الغروب الجميل!'],
  ['Bring your laptop to the meeting.', 'أحضر حاسوبك إلى الاجتماع.'],
  ['Take an umbrella; it might rain.', 'خذ مظلة؛ قد تمطر.'],
  ['Please tell me the truth.', 'من فضلك قل لي الحقيقة.'],
]);
const l101Mc = M(TG101, [
  ['You take a book from a friend. You ___ it.', ['borrow', 'lend', 'buy'], 0, 'تستعيره.', 2],
  ['A bank ___ money to people.', ['lends', 'borrows', 'takes'], 0, 'تُقرض الناس المال.', 2],
  ['She ___ me a joke yesterday.', ['told', 'said', 'spoke'], 0, 'أخبرتني نكتة أمس.', 2],
  ['He ___ that he was busy.', ['said', 'told', 'talked me'], 0, 'قال إنه كان مشغولا.', 1],
  ['___ the road while cycling!', ['Watch', 'Look', 'See'], 0, 'راقب الطريق أثناء الدراجة!', 1],
  ['___ your umbrella; the sun is strong.', ['Take', 'Bring', 'Borrow'], 0, 'خذ مظلتك؛ الشمس قوية.', 2],
]);

/* ============================================================
   102 Word Families: Verbs & Nouns (B1)
   ============================================================ */
const TG102 = ['vocabulary', 'word-families'];
const l102Lt = T(TG102, [
  ['They decided to travel; it was a good decision.', 'قرروا السفر؛ وكان قرارا جيدا.', 2],
  ['I choose my words; the choice matters.', 'أختار كلماتي؛ والاختيار مهم.', 2],
  ['Teachers teach with patience.', 'يعلم المعلمون بصبر.', 2],
  ['The manager will announce the results.', 'سيعلن المدير النتائج.', 2],
  ['Her explanation helped us understand.', 'ساعدنا شرحها على الفهم.', 2],
  ['They invite guests every Eid.', 'يدعون الضيوف كل عيد.', 2],
  ['We received your invitation, thank you.', 'استلمنا دعوتكم، شكرا لكم.', 2],
  ['Scientists study tiny things.', 'يدرس العلماء الأشياء الدقيقة.', 2],
  ['His research took two years.', 'استغرق بحثه عامين.', 2],
  ['Please clean the kitchen after cooking.', 'من فضلك نظف المطبخ بعد الطبخ.', 2],
  ['This cleaner works well on glass.', 'هذا المنظف يعمل جيدا على الزجاج.', 2],
  ['I applied for the job last week.', 'تقدمت للوظيفة الأسبوع الماضي.', 2],
  ['My application is under review.', 'طلبي قيد المراجعة.', 2],
  ['Drivers drive carefully in the rain.', 'يقود السائقون بحذر في المطر.', 2],
  ['She trains every morning; her training is strict.', 'تتدرب كل صباح؛ وتدريبها صارم.', 2],
  ['They build houses; the builder is my uncle.', 'يبنون بيوتا؛ والبناء عمي.', 2],
  ['Farmers grow wheat in the north.', 'يزرع المزارعون القمح في الشمال.', 2],
  ['Bakers bake fresh bread daily.', 'يخبز الخبازون خبزا طازجا يوميا.', 2],
  ['He writes reports; his writing is clear.', 'يكتب تقارير؛ وكتابته واضحة.', 2],
  ['I suggest a short break.', 'أقترح استراحة قصيرة.', 2],
  ['Do you accept my suggestion?', 'هل تقبل اقتراحي؟', 2],
  ['They sell fruit at the corner.', 'يبيعون الفاكهة عند الزاوية.', 2],
  ['The sale starts on Monday.', 'يبدأ التخفيض يوم الاثنين.', 2],
  ['Please inform the team about the change.', 'من فضلك أبلغ الفريق بالتغيير.', 2],
  ['We got the information by email.', 'وصلتنا المعلومات بالبريد الإلكتروني.', 2],
  ['Kids imagine whole worlds.', 'يتخيل الأطفال عوالم كاملة.', 2],
  ['Her imagination is amazing.', 'خيالها مذهل.', 2],
  ['He manages the shop very well.', 'يدير المتجر بشكل جيد جدا.', 2],
  ['Good management keeps teams happy.', 'الإدارة الجيدة تُبقي الفرق سعيدة.', 2],
  ['They moved to a quiet street.', 'انتقلوا إلى شارع هادئ.', 2],
  ['The movement of trains is smooth here.', 'حركة القطارات سلسة هنا.', 2],
  ['I advise you to rest.', 'أنصحك بالراحة.', 2],
  ['Take my advice and sleep early.', 'خذ نصيحتي ونم مبكرا.', 2],
  ['She teaches children; teaching is her passion.', 'تعلم الأطفال؛ والتعليم شغفها.', 2],
  ['We discuss plans every Sunday.', 'نناقش الخطط كل أحد.', 2],
  ['The discussion was very useful.', 'كانت المناقشة مفيدة جدا.', 2],
  ['He failed the test, but it was a good lesson.', 'رسب في الاختبار، لكنه كان درسا مفيدا.', 2],
  ['Practice makes progress.', 'الممارسة تصنع التقدم.', 2],
]);
const l102Fills = [
  ff(TG102, 'decision', 'It was a hard decision.', 'كان قرارا صعبا.'),
  ff(TG102, 'choice', 'You have a good choice here.', 'لديك خيارات جيدة هنا.'),
  ff(TG102, 'invitation', 'Thank you for the invitation.', 'شكرا على الدعوة.'),
  ff(TG102, 'research', 'His research is famous.', 'بحثه مشهور.'),
  ff(TG102, 'advice', 'That is great advice.', 'إنها نصيحة رائعة.'),
  ff(TG102, 'sale', 'The sale ends tomorrow.', 'ينتهي التخفيض غدا.'),
  ff(TG102, 'management', 'The management replied quickly.', 'أجابت الإدارة سريعا.'),
  ff(TG102, 'imagination', 'Use your imagination!', 'استخدم خيالك!'),
];
const l102Orders = O(TG102, [
  ['They decided to travel.', 'قرروا السفر.'],
  ['We received your invitation.', 'استلمنا دعوتكم.'],
  ['Bakers bake fresh bread daily.', 'يخبز الخبازون خبزا طازجا يوميا.'],
  ['Take my advice and sleep early.', 'خذ نصيحتي ونم مبكرا.'],
  ['The discussion was very useful.', 'كانت المناقشة مفيدة جدا.'],
  ['He manages the shop very well.', 'يدير المتجر بشكل جيد جدا.'],
]);
const l102Mc = M(TG102, [
  ['The verb for "decision" is…', ['decide', 'deicide', 'decided'], 0, 'الفعل: يقرر.', 1],
  ['The noun for "invite" is…', ['invitation', 'inviting', 'invitee only'], 0, 'الاسم: دعوة.', 1],
  ['The noun for "advise" is…', ['advice', 'advise', 'advisely'], 0, 'الاسم: نصيحة.', 2],
  ['The verb for "manager" is…', ['manage', 'managing', 'management'], 0, 'الفعل: يدير.', 1],
  ['The noun for "explain" is…', ['explanation', 'explaining', 'explained'], 0, 'الاسم: شرح.', 1],
  ['The noun for "discuss" is…', ['discussion', 'discussing', 'discussed'], 0, 'الاسم: مناقشة.', 1],
]);

/* ============================================================
   103 Word Families: Adjectives & Adverbs (B1)
   ============================================================ */
const TG103 = ['vocabulary', 'word-families-2'];
const l103Lt = T(TG103, [
  ['She is a quick learner; she learns quickly.', 'هي متعلمة سريعة؛ تتعلم بسرعة.', 2],
  ['He is a careful driver; he drives carefully.', 'هو سائق حذر؛ يقود بحذر.', 2],
  ['It was a quiet night; we slept quietly.', 'كانت ليلة هادئة؛ نمنا بهدوء.', 2],
  ['The team played badly and lost.', 'لعب الفريق بشكل سيء وخسر.', 2],
  ['This is a bad signal; it works badly.', 'إشارة سيئة؛ تعمل بشكل سيء.', 2],
  ['She gave a clear answer and spoke clearly.', 'أعطت إجابة واضحة وتحدثت بوضوح.', 2],
  ['Be happy and smile happily.', 'كن سعيدا وابتسم بفرح.', 2],
  ['He is a hard worker; he works hard.', 'هو عامل مجتهد؛ يعمل بجد.', 2],
  ['It is an easy test; you will pass easily.', 'اختبار سهل؛ ستنجح بسهولة.', 2],
  ['The soup smells good and tastes good.', 'الحساء يفوح برائحة طيبة ويذوق طيبا.', 2],
  ['She sings well for a beginner.', 'تغني جيدا لمبتدئة.', 2],
  ['Slow down; the road is dangerous.', 'تمهّل؛ الطريق خطير.', 2],
  ['He answered angrily.', 'أجاب بغضب.', 2],
  ['The children were noisy and played noisily.', 'كان الأطفال صاخبين ولعبوا بصخب.', 2],
  ['She is a graceful dancer; she moves gracefully.', 'هي راقصة رشيقة؛ تتحرك برشاقة.', 2],
  ['A sudden stop can be dangerous.', 'التوقف المفاجئ قد يكون خطيرا.', 2],
  ['It suddenly started to rain.', 'بدأ المطر فجأة.', 2],
  ['He is usually polite and speaks politely.', 'هو عادة مهذب ويتحدث بأدب.', 2],
  ['The train was surprisingly empty.', 'كان القطار خاليا بشكل مدهش.', 2],
  ['She is a wonderful cook; she cooks wonderfully.', 'هي طباخة مذهلة؛ تطبخ بشكل مذهل.', 2],
  ['He felt nervous and spoke nervously.', 'شعر بالتوتر وتحدث بقلق.', 2],
  ['The exam was surprisingly easy.', 'كان الاختبار سهلا بشكل مفاجئ.', 2],
  ['She is extremely talented.', 'هي موهوبة للغاية.', 2],
  ['He walked slowly up the stairs.', 'صعد الدرج ببطء.', 2],
  ['The children were extremely excited.', 'كان الأطفال متحمسين للغاية.', 2],
  ['A gentle wind blew gently.', 'هبّت ريح لطيفة بلطف.', 2],
  ['She made a serious mistake.', 'ارتكبت خطأ جسيما.', 2],
  ['Please listen seriously to this advice.', 'من فضلك استمع بجدية لهذه النصيحة.', 2],
  ['The bus was full; it was completely packed.', 'كانت الحافلة ممتلئة؛ كانت مكتظة تماما.', 2],
  ['He is a calm person; he speaks calmly.', 'هو شخص هادئ؛ يتحدث بهدوء.', 2],
  ['She answered politely and left.', 'أجابت بأدب وانصرفت.', 2],
  ['It was a perfect day, perfectly planned.', 'كان يوما مثاليا، مخططا بشكل مثالي.', 2],
  ['They waited patiently in the queue.', 'انتظروا بصبر في الطابور.', 2],
  ['The baby slept peacefully.', 'نام الطفل بسلام.', 2],
  ['His handwriting is terrible; he writes terribly.', 'خطه فظيع؛ يكتب بشكل فظيع.', 2],
  ['The floor is clean; she cleaned it thoroughly.', 'الأرضية نظيفة؛ نظفتها جيدا.', 2],
  ['She is kind and treats everyone kindly.', 'هي طيبة وتعامل الجميع بلطف.', 2],
  ['Be careful; cross the road carefully.', 'كن حذرا؛ اعبر الطريق بحذر.', 2],
]);
const l103Fills = [
  ff(TG103, 'quickly', 'She finished the race quickly.', 'أنهت السباق بسرعة.'),
  ff(TG103, 'carefully', 'Open the box carefully.', 'افتح الصندوق بحذر.'),
  ff(TG103, 'quietly', 'Close the door quietly.', 'أغلق الباب بهدوء.'),
  ff(TG103, 'clearly', 'He explained the rule clearly.', 'شرح القاعدة بوضوح.'),
  ff(TG103, 'well', 'She sings very well.', 'تغني جيدا جدا.'),
  ff(TG103, 'happily', 'The kids played happily.', 'لعب الأطفال بفرح.'),
  ff(TG103, 'suddenly', 'It suddenly got cold.', 'برد الجو فجأة.'),
  ff(TG103, 'patiently', 'Wait patiently, please.', 'انتظر بصبر، من فضلك.'),
];
const l103Orders = O(TG103, [
  ['She is a quick learner.', 'هي متعلمة سريعة.'],
  ['He drives carefully.', 'هو يقود بحذر.'],
  ['She sings well.', 'هي تغني جيدا.'],
  ['He walked slowly up the stairs.', 'صعد الدرج ببطء.'],
  ['The kids played happily.', 'لعب الأطفال بفرح.'],
  ['She answered politely and left.', 'أجابت بأدب وانصرفت.'],
]);
const l103Mc = M(TG103, [
  ['Choose the adverb of "careful".', ['carefully', 'careful', 'care'], 0, 'الظرف: بحذر.', 1],
  ['Choose the adverb of "good".', ['well', 'goodly', 'good'], 0, 'ظرف جيد: well.', 2],
  ['She is a ___ driver; she drives ___.', ['careful / carefully', 'carefully / careful', 'care / careful'], 0, 'سائقة حذرة تقود بحذر.', 2],
  ['Choose the adverb of "sudden".', ['suddenly', 'suddendly', 'sudden'], 0, 'الظرف: فجأة.', 1],
  ['He speaks very ___.', ['quietly', 'quiet', 'quieter'], 0, 'يتحدث بهدوء جدا.', 1],
  ['The adverb of "happy" is…', ['happily', 'happyly', 'happiness'], 0, 'ظرف سعيد: بفرح.', 1],
]);

/* ============================================================
   104 Everyday Expressions (A2)
   ============================================================ */
const TG104 = ['vocabulary', 'expressions'];
const l104Lt = T(TG104, [
  ["What's up?", 'ما الأخبار؟', 1],
  ['Not much. How about you?', 'لا شيء كثير. وأنت؟', 1],
  ['Never mind.', 'لا بأس / انسَ الأمر.', 1],
  ["It's up to you.", 'الأمر يعود إليك.', 2],
  ['I have no idea.', 'ليست لدي أي فكرة.', 1],
  ['That makes sense.', 'هذا منطقي.', 2],
  ['Good for you!', 'أحسنت / مرحًا بك!', 1],
  ['No way! Really?', 'مستحيل! حقا؟', 1],
  ['Are you serious?', 'هل أنت جاد؟', 1],
  ['I am just kidding.', 'أنا أمزح فقط.', 1],
  ['Take your time.', 'خذ وقتك.', 1],
  ['It is not a big deal.', 'ليس أمرا مهما.', 1],
  ['Same here.', 'وأنا كذلك.', 1],
  ['I could not help it.', 'لم أستطع منع نفسي.', 2],
  ['It happens to everyone.', 'يحدث للجميع.', 1],
  ['Better luck next time.', 'حظا أوفر المرة القادمة.', 2],
  ['You never know.', 'لا أحد يدري.', 1],
  ['Let me think about it.', 'دعني أفكر في الأمر.', 1],
  ['I will let you know.', 'سأخبرك.', 1],
  ['As soon as possible, please.', 'في أقرب وقت ممكن، من فضلك.', 2],
  ['Sorry to bother you.', 'عذرا على الإزعاج.', 2],
  ['No problem at all.', 'لا مشكلة إطلاقا.', 1],
  ['I owe you one.', 'أنا لك معروفا.', 2],
  ['You deserve it.', 'أنت تستحق ذلك.', 1],
  ['What a surprise!', 'يا للمفاجأة!', 1],
  ['I am on my way.', 'أنا في الطريق.', 1],
  ['Keep in touch.', 'ابقَ على تواصل.', 1],
  ['Sounds like a plan.', 'تبدو خطة جيدة.', 2],
  ['It is worth a try.', 'يستحق المحاولة.', 2],
  ['I could not agree more.', 'أوافقك تماما.', 2],
  ['Let me get this straight.', 'دعني أفهم الأمر جيدا.', 2],
  ['That works for me.', 'هذا يناسبني.', 2],
  ['It is a long story.', 'إنها حكاية طويلة.', 2],
  ['Long time no see!', 'لم أرك منذ زمن!', 1],
  ['I am starving!', 'أنا جائع جدا!', 1],
  ['Make yourself at home.', 'اجعل نفسك في بيتك.', 2],
  ['Here you go.', 'تفضل.', 1],
  ['After you.', 'من بعدك (تفضل أولًا).', 1],
]);
const l104Fills = [
  ff(TG104, 'up to you', "It's up to you.", 'الأمر يعود إليك.'),
  ff(TG104, 'sense', 'That makes sense.', 'هذا منطقي.'),
  ff(TG104, 'deal', 'It is not a big deal.', 'ليس أمرا مهما.'),
  ff(TG104, 'worth', 'It is worth a try.', 'يستحق المحاولة.'),
  ff(TG104, 'bother', 'Sorry to bother you.', 'عذرا على الإزعاج.'),
  ff(TG104, 'touch', 'Keep in touch.', 'ابقَ على تواصل.'),
  ff(TG104, 'kidding', 'I am just kidding.', 'أنا أمزح فقط.'),
  ff(TG104, 'starving', 'I am starving!', 'أنا جائع جدا!'),
];
const l104Orders = O(TG104, [
  ['Take your time.', 'خذ وقتك.'],
  ['I have no idea.', 'ليست لدي أي فكرة.'],
  ['It is not a big deal.', 'ليس أمرا مهما.'],
  ['I am on my way.', 'أنا في الطريق.'],
  ['Make yourself at home.', 'اجعل نفسك في بيتك.'],
  ['That works for me.', 'هذا يناسبني.'],
]);
const l104Mc = M(TG104, [
  ['"Never mind" means…', ['forget it, it is fine', 'never think', 'be careful'], 0, 'انسَ الأمر، لا بأس.', 1],
  ['"It is up to you" means…', ['you decide', 'I decide', 'it is above you'], 0, 'القرار لك.', 1],
  ['"Same here" means…', ['me too', 'same place', 'again'], 0, 'وأنا كذلك.', 1],
  ['"I owe you one" means…', ['I will return the favor', 'I owe money', 'you owe me'], 0, 'سأرد لك المعروف.', 2],
  ['"Better luck next time" comforts someone who…', ['failed at something', 'won a prize', 'arrived early'], 0, 'أخفق في شيء.', 2],
  ['"Here you go" is said when…', ['giving something', 'leaving', 'arriving'], 0, 'تقدم شيئا لشخص.', 1],
]);

/* ---------- GRAM: word-study notes ---------- */
/* top-up pools for late lessons (cross-section dedup headroom) */
const X99 = T(TG99, [
  ['The garden is green in spring and brown in autumn.', 'الحديقة خضراء في الربيع وبنية في الخريف.', 2],
  ['Loud thunder, soft rain.', 'رعد عالٍ، ومطر خفيف.', 2],
  ['The soup is thick; the juice is thin.', 'الحساء كثيف؛ والعصير خفيف.', 2],
  ['The street is wide here and narrow there.', 'الشارع واسع هنا وضيق هناك.', 2],
  ['The room feels hot; the balcony is cool.', 'الغرفة حارة؛ والبلكونة باردة.', 2],
  ['A rich library, a poor village.', 'مكتبة غنية، وقرية فقيرة.', 2],
]);
const X100 = T(TG100, [
  ['Their team won the final.', 'فاز فريقهم بالمباراة النهائية.', 2],
  ['There is a nice park behind your building.', 'هناك حديقة جميلة خلف عمارتك.', 2],
  ["You're the winner of this round.", 'أنت فائز هذه الجولة.', 2],
  ['It\'s a shame; the museum lost its oldest clock.', 'يا للخسارة؛ فقد المتحف أقدم ساعاته.', 2],
  ['First check the price, then decide.', 'تحقق من السعر أولًا، ثم قرر.', 2],
  ['Their plan is clearer than ours.', 'خطتهم أوضح من خطتنا.', 2],
]);
const X101 = T(TG101, [
  ['He borrowed two books and returned one.', 'استعار كتابين وأعاد واحدا.', 2],
  ['She told us where the station was.', 'أخبرتنا أين كانت المحطة.', 2],
  ['I said sorry twice.', 'قلت آسف مرتين.', 2],
  ['We watched the planes take off.', 'شاهدنا الطائرات تقلع.', 2],
  ['Bring the chairs here and take the boxes there.', 'أحضر الكراسي هنا وخذ الصناديق هناك.', 2],
  ['Look at the map, not at your phone.', 'انظر إلى الخريطة لا إلى هاتفك.', 2],
]);
const X102 = T(TG102, [
  ['They elected a new captain last night.', 'اختاروا قائدا جديدا الليلة الماضية.', 2],
  ['The election results arrive tomorrow.', 'تصل نتائج الانتخابات غدا.', 2],
  ['She trains dogs; her training school is small.', 'تدرب الكلاب؛ ومدرستها للتدريب صغيرة.', 2],
  ['He repairs phones; the repair took one hour.', 'يصلح الهواتف؛ واستغرق الإصلاح ساعة.', 2],
  ['They publish a magazine every month.', 'ينشرون مجلة كل شهر.', 2],
  ['The publication was a big success.', 'كانت النشر نجاحا كبيرا.', 2],
]);
const X103 = T(TG103, [
  ['She smiled proudly at her daughter.', 'ابتسمت بفخر لابنتها.', 2],
  ['He is a proud father today.', 'هو أب فخور اليوم.', 2],
  ['The train arrived exactly on time.', 'وصل القطار في وقته تماما.', 2],
  ['She was extremely tired after the shift.', 'كانت متعبة للغاية بعد الوردية.', 2],
  ['He held the glass gently.', 'أمسك الكوب برفق.', 2],
  ['Gentle music played in the background.', 'عزفت موسيقى هادئة في الخلفية.', 2],
]);
const X104 = T(TG104, [
  ['I am afraid I have to go now.', 'أخشى أن عليّ الذهاب الآن.', 2],
  ['It is up to you, really.', 'الأمر يعود إليك حقا.', 2],
  ['That is exactly what I meant.', 'هذا بالضبط ما قصدته.', 2],
  ['Take it easy this weekend.', 'خفف عن نفسك عطلة نهاية الأسبوع.', 2],
  ['Do not worry about it.', 'لا تقلق بشأن ذلك.', 1],
  ['It is none of my business.', 'ليس من شأني.', 2],
  ['Could you repeat the last part?', 'هل تعيد الجزء الأخير؟', 2],
  ['You can say that again.', 'أوافقك تماما (تقولها مرة أخرى).', 2],
]);

const GRAM = {
  l89: {
    explanation: 'The verbs get, make, go, do and take are among the most common words in English. Each one has several meanings, so learn them inside whole sentences rather than alone.',
    explanationAr: 'الأفعال get وmake وgo وdo وtake من أكثر الكلمات شيوعا في الإنجليزية، ولكل منها معانٍ متعددة، فتعلّمها داخل جمل كاملة لا منفردة.',
    examples: [
      { en: 'I get tired after long meetings.', ar: 'أشعر بالتعب بعد الاجتماعات الطويلة.' },
      { en: 'She makes a salad for lunch.', ar: 'تعد سلطة للغداء.' },
      { en: 'Take your jacket; it is cold.', ar: 'خذ سترتك؛ الجو بارد.' },
    ],
  },
  l90: {
    explanation: 'Come, look, find, give and tell are everyday verbs with many common uses. Notice the small differences: you look at things, look for lost things, and look after people.',
    explanationAr: 'أفعال come وlook وfind وgive وtell أفعال يومية متعددة الاستخدامات، ولاحظ الفروق الدقيقة: look at للمشاهدة، وlook for للبحث عن شيء، وlook after للرعاية.',
    examples: [
      { en: 'Come and help me in the kitchen.', ar: 'تعال وساعدني في المطبخ.' },
      { en: 'She is looking for a new flat.', ar: 'تبحث عن شقة جديدة.' },
      { en: 'Give the pen back to Sara.', ar: 'أعد القلم إلى سارة.' },
    ],
  },
  l91: {
    explanation: 'Phrasal verbs join a verb with a particle and create a new meaning. Get up means rise from bed, get on and get off are for buses and trains, get along is for relationships, and get over is for recovering.',
    explanationAr: 'الأفعال المركبة تجمع فعلا مع حرف جر فتعطي معنى جديدا؛ فـget up تعني يستيقظ، وget on وget off للركوب والنزول، وget along للتعامل، وget over للتعافي.',
    examples: [
      { en: 'She gets up before sunrise.', ar: 'تستيقظ قبل شروق الشمس.' },
      { en: 'Get off the train at the third stop.', ar: 'انزل من القطار عند الموقف الثالث.' },
      { en: 'Did you get over your illness?', ar: 'هل تعافت من مرضك؟' },
    ],
  },
  l92: {
    explanation: 'Take and put build many phrasal verbs. Take off can mean remove clothes or a plane leaving the ground; put on is the opposite for clothes; put off means postpone; put up with means tolerate.',
    explanationAr: 'يتركب من take وput كثير من الأفعال المركبة؛ فـtake off تعني يخلع الملابس أو تقلع الطائرة، وput على عكسها في اللبس، وput off تعني يؤجل، وput up with تعني يتقبل ويحتمل.',
    examples: [
      { en: 'Take off your hat indoors, please.', ar: 'اخلع قبعتك داخل البيت من فضلك.' },
      { en: 'He put off the dentist until Monday.', ar: 'أجل زيارة طبيب الأسنان إلى الاثنين.' },
      { en: 'Can you put up with loud neighbors?', ar: 'هل يمكنك تحمل الجار الصاخب؟' },
    ],
  },
  l93: {
    explanation: 'Look, come and go combine with small particles to make useful phrasal verbs. Look for means search, come up with means think of an idea, and go through means experience or examine.',
    explanationAr: 'تتصل look وcome وgo بحروف صغيرة لتكوّن أفعالا مركبة مفيدة؛ فـlook for تعني يبحث عن، وcome up with تعني يبتكر فكرة، وgo through تعني يمر بتجربة أو يتفحص.',
    examples: [
      { en: 'He is looking for his boarding pass.', ar: 'يبحث عن بطاقة صعوده للطائرة.' },
      { en: 'We came up with a cheaper plan.', ar: 'توصلنا إلى خطة أرخص.' },
      { en: 'The family went through hard times.', ar: 'مرت العائلة بأوقات عصيبة.' },
    ],
  },
  l94: {
    explanation: 'English uses do for tasks, jobs and general activities, but make for creating or producing something new. Do homework, make a decision and make a mistake are fixed pairs worth memorizing.',
    explanationAr: 'تستخدم الإنجليزية do للمهام والأنشطة العامة، وmake لصنع شيء جديد أو إحداثه، وتعد أزواج مثل do homework وmake a decision وmake a mistake تعبيرات ثابتة يستحق حفظها.',
    examples: [
      { en: 'I did the dishes and made dinner.', ar: 'غسلت الأطباق وأعددت العشاء.' },
      { en: 'She made a mistake, but did her best.', ar: 'أخطأت لكنها بذلت قصارى جهدها.' },
      { en: 'Make a wish before you blow the candle.', ar: 'تمنَ أمنية قبل أن تنفخ الشمعة.' },
    ],
  },
  l95: {
    explanation: 'Have and take appear in many everyday collocations. We have meals, showers and parties, but we take showers too; take also pairs with a break, a photo, a walk and an exam.',
    explanationAr: 'يدخل have وtake في عدد كبير من المركبات اليومية؛ فنقول have breakfast وhave a shower وhave a party، ونقول كذلك take a shower وtake a break وtake a photo وtake an exam.',
    examples: [
      { en: 'We have dinner together on Fridays.', ar: 'نتناول العشاء معا أيام الجمعة.' },
      { en: 'Take a photo of the old gate.', ar: 'التقط صورة للبوابة القديمة.' },
      { en: 'He had a headache after the long drive.', ar: 'أصيب بصداع بعد القيادة الطويلة.' },
    ],
  },
  l96: {
    explanation: 'Time idioms paint pictures: once in a blue moon means very rarely, around the clock means all day and night, and in no time means very quickly. Learn them as whole phrases.',
    explanationAr: 'تقوم تعبيرات الزمن على صور مجازية؛ فـonce in a blue moon تعني نادرا جدا، وaround the clock تعني على مدار الساعة، وin no time تعني بسرعة كبيرة، وتعلمها كعبارات كاملة.',
    examples: [
      { en: 'We meet once in a blue moon.', ar: 'نتقابل نادرا جدا.' },
      { en: 'The bakery works around the clock.', ar: 'يعمل المخبز على مدار الساعة.' },
      { en: 'The waiter came in no time.', ar: 'جاء النادل بسرعة.' },
    ],
  },
  l97: {
    explanation: 'Feeling idioms use vivid images: under the weather means slightly ill, over the moon means extremely happy, and to lose your temper means to become suddenly angry.',
    explanationAr: 'تستخدم تعبيرات المشاعر صورا حية؛ فـunder the weather تعني يشعر بتوعك، وover the moon تعني في قمة السعادة، وlose your temper تعني يفقد أعصابه ويغضب فجأة.',
    examples: [
      { en: 'She felt blue all week.', ar: 'شعرت بالحزن طوال الأسبوع.' },
      { en: 'He was over the moon about the birth of his son.', ar: 'غمرته السعادة بمولد ابنه.' },
      { en: 'Try to keep your chin up.', ar: 'حافظ على تفاؤلك.' },
    ],
  },
  l98: {
    explanation: 'Synonyms are words with similar meanings, but context decides the best choice. Huge suggests enormous size, exhausted is stronger than tired, and freezing is colder than chilly.',
    explanationAr: 'المترادفات كلمات متقاربة المعنى، لكن السياق هو الذي يحدد الأنسب؛ فـhuge تدل على الضخامة الفاحشة، وexhausted أقوى من tired، وfreezing أشد برودة من chilly.',
    examples: [
      { en: 'The bag was heavy but not huge.', ar: 'كانت الحقيبة ثقيلة لكنها ليست ضخمة.' },
      { en: 'He was exhausted after the night shift.', ar: 'كان منهكا بعد وردية الليل.' },
      { en: 'The answer was close but not accurate.', ar: 'كان الجواب قريبا لكنه غير دقيق.' },
    ],
  },
  /* GRAM-END */
  l99: { explanation: 'Antonyms are words with opposite meanings: hot/cold, full/empty, early/late. They often appear together in contrast sentences with but. Learning pairs doubles your vocabulary.', explanationAr: 'الأضداد كلمات بمعانٍ متعاكسة: حار/بارد، ممتلئ/فارغ، مبكر/متأخر. وتأتي غالبا معا في جمل تضاد مع but. تعلم الأزواج يضاعف مفرداتك.', examples: [{ en: 'The tea is hot, the juice is cold.', ar: 'الشاي ساخن والعصير بارد.' }, { en: 'The hall was empty.', ar: 'كانت القاعة خالية.' }, { en: 'Better safe than sorry.', ar: 'السلامة خير من الندامة.' }] },
  l100: { explanation: 'their = belongs to them; there = that place; they\u2019re = they are. your = belongs to you; you\u2019re = you are. its = belongs to it; it\u2019s = it is. then = next; than = used in comparisons. Memorize one sentence per pair.', explanationAr: 'their تعني “الخاص بهم”، وthere تعني “هناك”، وthey\u2019re اختصار “هم”. وyour للملكية، وyou\u2019re اختصار “أنت”. وits للملكية، وit\u2019s اختصار “إنه”. ثم then للترتيب، وthan للمقارنة. احفظ جملة لكل زوج.', examples: [{ en: 'They\u2019re waiting over there.', ar: 'هم ينتظرون هناك.' }, { en: 'It\u2019s cold; the city is famous for its bridge.', ar: 'الجو بارد؛ والمدينة مشهورة بجسرها.' }, { en: 'Better late than never.', ar: 'الأفضل متأخرا من ألا.' }] },
  l101: { explanation: 'borrow = take for a time; lend = give for a time. say + words; tell + a person. watch = follow something moving; look (at) = direct your eyes; see = notice with your eyes. bring = carry here; take = carry there.', explanationAr: 'borrow تستعير لفترة، وlend تُعير لفترة. وsay + كلام، وtell + شخص. وwatch لمتابعة شيء متحرك، وlook (at) لتوجيه النظر، وsee للإدراك بالنظر. وbring تحضر إلى هنا، وtake تحمل إلى هناك.', examples: [{ en: 'Can I borrow your pen?', ar: 'هل يمكنني استعارة قلمك؟' }, { en: 'She told me a funny story.', ar: 'أخبرتني قصة مضحكة.' }, { en: 'Bring your laptop to the meeting.', ar: 'أحضر حاسوبك إلى الاجتماع.' }] },
  l102: { explanation: 'Word families grow one idea into several words: decide → decision, invite → invitation, advise → advice. Notice endings: -ion, -ment, -ance. Learn the verb and its noun together.', explanationAr: 'عائلات الكلمات تنمّي فكرة واحدة إلى عدة كلمات: decide ← decision، invite ← invitation، advise ← advice. ولاحظ اللواحق: -ion و-ment و-ance. وتعلم الفعل واسمه معا.', examples: [{ en: 'It was a hard decision.', ar: 'كان قرارا صعبا.' }, { en: 'Take my advice and sleep early.', ar: 'خذ نصيحتي ونم مبكرا.' }, { en: 'The sale ends tomorrow.', ar: 'ينتهي التخفيض غدا.' }] },
  l103: { explanation: 'Adjectives describe nouns (a careful driver); adverbs describe verbs (drives carefully). Most adverbs add -ly, but good becomes well and hard/fast/late stay the same. Watch the spelling: happy → happily.', explanationAr: 'الصفات تصف الأسماء (سائق حذر) والظروف تصف الأفعال (يقود بحذر). أكثر الظروف تاخذ -ly، لكن good تصبح well وتبقى hard وfast وlate كما هي. وانتبه للإملاء: happy ← happily.', examples: [{ en: 'She is a quick learner; she learns quickly.', ar: 'هي متعلمة سريعة؛ تتعلم بسرعة.' }, { en: 'She sings very well.', ar: 'تغني جيدا جدا.' }, { en: 'It suddenly got cold.', ar: 'برد الجو فجأة.' }] },
  l104: { explanation: 'Everyday expressions are fixed phrases with special meanings: What\u2019s up? (hello), Never mind (forget it), It\u2019s up to you (you decide). Learn them whole — translating word by word hides the meaning.', explanationAr: 'التعبيرات اليومية عبارات ثابتة ذات معانٍ خاصة: What\u2019s up? تحية، وNever mind انسَ الأمر، وIt\u2019s up to you القرار لك. تعلمها كوحدة كاملة، فالترجمة حرفيا تخفي المعنى.', examples: [{ en: 'Take your time.', ar: 'خذ وقتك.' }, { en: 'It is not a big deal.', ar: 'ليس أمرا مهما.' }, { en: 'Make yourself at home.', ar: 'اجعل نفسك في بيتك.' }] },
};

/* ---------- VOC: 6 items per lesson ---------- */
const VOC = {
  l89: [
    { word: 'get', meaningAr: 'يحصل على؛ يصبح', example: 'Did you get my email?' },
    { word: 'make', meaningAr: 'يصنع؛ يُعد', example: 'She makes soup on cold days.' },
    { word: 'go', meaningAr: 'يذهب', example: 'We go home at five.' },
    { word: 'do', meaningAr: 'يفعل؛ يقوم بـ', example: 'He does the shopping on Saturday.' },
    { word: 'take', meaningAr: 'يأخذ؛ يلتقط', example: 'Take a photo of the tower.' },
    { word: 'favor', meaningAr: 'معروف؛ خدمة', example: 'Can you do me a favor?' },
  ],
  l90: [
    { word: 'come', meaningAr: 'يأتي؛ يعود', example: 'Come to the party tonight.' },
    { word: 'look', meaningAr: 'ينظر؛ يبدو', example: 'You look great today.' },
    { word: 'find', meaningAr: 'يجد', example: 'I hope you find your wallet.' },
    { word: 'give', meaningAr: 'يعطي؛ يقدم', example: 'Give the book to Ali.' },
    { word: 'tell', meaningAr: 'يخبر؛ يحكي', example: 'Tell me about your new job.' },
    { word: 'directions', meaningAr: 'إرشادات؛ الاتجاهات', example: 'Can you give me directions to the station?' },
  ],
  l91: [
    { word: 'get up', meaningAr: 'يستيقظ', example: 'I get up at six.' },
    { word: 'get on', meaningAr: 'يركب (وسيلة نقل)', example: 'Get on the bus here.' },
    { word: 'get off', meaningAr: 'ينزل من (وسيلة نقل)', example: 'Get off at the last stop.' },
    { word: 'get along with', meaningAr: 'يتعامل بشكل جيد مع', example: 'I get along with my cousins.' },
    { word: 'get over', meaningAr: 'يتعافى؛ يتجاوز', example: 'She got over the flu.' },
    { word: 'get together', meaningAr: 'يتقابل', example: 'We get together on Fridays.' },
  ],
  l92: [
    { word: 'take off', meaningAr: 'يخلع؛ تقلع (الطائرة)', example: 'Take off your wet coat.' },
    { word: 'take care of', meaningAr: 'يعتني بـ', example: 'Who takes care of the plants?' },
    { word: 'take part in', meaningAr: 'يشارك في', example: 'He took part in the race.' },
    { word: 'put on', meaningAr: 'يرتدي؛ يلبس', example: 'Put on your gloves.' },
    { word: 'put off', meaningAr: 'يؤجل', example: 'They put off the meeting.' },
    { word: 'put up with', meaningAr: 'يتحمل؛ يتقبل', example: 'I cannot put up with the noise.' },
  ],
  l93: [
    { word: 'look for', meaningAr: 'يبحث عن', example: 'She is looking for her keys.' },
    { word: 'look after', meaningAr: 'يعتني بـ', example: 'Who looks after the baby?' },
    { word: 'look forward to', meaningAr: 'يتطلع إلى', example: 'I look forward to the trip.' },
    { word: 'come up with', meaningAr: 'يبتكر؛ يبتدع', example: 'He came up with a plan.' },
    { word: 'go through', meaningAr: 'يمر بـ؛ يتفحص', example: 'She went through a hard time.' },
    { word: 'go with', meaningAr: 'يليق مع؛ يتناسق مع', example: 'This belt goes with your shoes.' },
  ],
  l94: [
    { word: 'do homework', meaningAr: 'يعمل الواجب', example: 'I do homework after dinner.' },
    { word: 'do the dishes', meaningAr: 'يغسل الأطباق', example: 'He does the dishes on Fridays.' },
    { word: 'make a decision', meaningAr: 'يتخذ قرارا', example: 'Make a decision today.' },
    { word: 'make a mistake', meaningAr: 'يرتكب خطأ', example: 'Everyone makes mistakes.' },
    { word: 'make friends', meaningAr: 'يكوّن صداقات', example: 'She makes friends quickly.' },
    { word: 'make sure', meaningAr: 'يتأكد', example: 'Make sure the window is closed.' },
  ],
  l95: [
    { word: 'have breakfast', meaningAr: 'يتناول الفطور', example: 'We have breakfast at seven.' },
    { word: 'have a shower', meaningAr: 'يستحم', example: 'I have a shower before work.' },
    { word: 'have fun', meaningAr: 'يستمتع', example: 'Have fun at the picnic!' },
    { word: 'take a break', meaningAr: 'يأخذ استراحة', example: 'Let us take a break.' },
    { word: 'take a photo', meaningAr: 'يلتقط صورة', example: 'Take a photo of the tower.' },
    { word: 'take place', meaningAr: 'يقام؛ يجري', example: 'The fair takes place in May.' },
  ],
  l96: [
    { word: 'once in a blue moon', meaningAr: 'نادرا جدا', example: 'We dine out once in a blue moon.' },
    { word: 'around the clock', meaningAr: 'على مدار الساعة', example: 'Nurses work around the clock.' },
    { word: 'on time', meaningAr: 'في الموعد', example: 'The bus arrived on time.' },
    { word: 'kill time', meaningAr: 'يملأ الفراغ', example: 'I read to kill time.' },
    { word: 'in no time', meaningAr: 'في وقت قصير جدا', example: 'He fixed it in no time.' },
    { word: 'call it a day', meaningAr: 'ينهي العمل لهذا اليوم', example: 'Let us call it a day.' },
  ],
  l97: [
    { word: 'under the weather', meaningAr: 'يشعر بتوعك', example: 'He is under the weather today.' },
    { word: 'over the moon', meaningAr: 'في قمة السعادة', example: 'She was over the moon about the prize.' },
    { word: 'feel blue', meaningAr: 'يشعر بالحزن', example: 'I feel blue on rainy days.' },
    { word: 'lose your temper', meaningAr: 'يفقد أعصابه', example: 'Do not lose your temper.' },
    { word: 'mixed feelings', meaningAr: 'مشاعر متضاربة', example: 'I have mixed feelings about it.' },
    { word: 'cheer up', meaningAr: 'يبتهج؛ يتحسن مزاجه', example: 'Cheer up! It is Friday.' },
  ],
  l98: [
    { word: 'huge', meaningAr: 'ضخم جدا', example: 'The whale is huge.' },
    { word: 'exhausted', meaningAr: 'منهك', example: 'We were exhausted after the hike.' },
    { word: 'furious', meaningAr: 'مستشيط غضبا', example: 'The coach was furious.' },
    { word: 'essential', meaningAr: 'ضروري', example: 'Water is essential for life.' },
    { word: 'vacant', meaningAr: 'شاغر؛ خال', example: 'The flat is vacant now.' },
    { word: 'ancient', meaningAr: 'عريق؛ قديم جدا', example: 'They explored an ancient city.' },
  ],
  /* VOC-END */
  l99: [
    { word: 'empty', meaningAr: 'فارغ', example: 'The hall was empty.' },
    { word: 'noisy', meaningAr: 'صاخب', example: 'The street is noisy at noon.' },
    { word: 'stale', meaningAr: 'يابس (خبز)', example: 'Do not eat stale bread.' },
    { word: 'crowded', meaningAr: 'مزدحم', example: 'The bus is crowded.' },
    { word: 'narrow', meaningAr: 'ضيق', example: 'The lane is narrow.' },
    { word: 'asleep', meaningAr: 'نائم', example: 'The baby is asleep.' },
  ],
  l100: [
    { word: 'their', meaningAr: 'خاص بهم', example: 'Their house is near.' },
    { word: 'there', meaningAr: 'هناك', example: 'Put it over there.' },
    { word: "they're", meaningAr: 'هم (اختصار)', example: "They're late." },
    { word: "it's", meaningAr: 'إنه/إنها (اختصار)', example: "It's raining." },
    { word: 'its', meaningAr: 'خاص به', example: 'The dog wagged its tail.' },
    { word: 'than', meaningAr: 'من (للمقارنة)', example: 'Bigger than mine.' },
  ],
  l101: [
    { word: 'borrow', meaningAr: 'يستعير', example: 'Can I borrow your pen?' },
    { word: 'lend', meaningAr: 'يُعير', example: 'I can lend it to you.' },
    { word: 'tell', meaningAr: 'يخبر (شخصا)', example: 'Tell me the truth.' },
    { word: 'watch', meaningAr: 'يراقب / يشاهد', example: 'Watch the road.' },
    { word: 'bring', meaningAr: 'يحضر (إلى هنا)', example: 'Bring some water.' },
    { word: 'take', meaningAr: 'يأخذ (إلى هناك)', example: 'Take this letter.' },
  ],
  l102: [
    { word: 'decision', meaningAr: 'قرار', example: 'It was a hard decision.' },
    { word: 'invitation', meaningAr: 'دعوة', example: 'Thanks for the invitation.' },
    { word: 'advice', meaningAr: 'نصيحة', example: 'That is great advice.' },
    { word: 'research', meaningAr: 'بحث', example: 'His research is famous.' },
    { word: 'management', meaningAr: 'إدارة', example: 'The management replied quickly.' },
    { word: 'imagination', meaningAr: 'خيال', example: 'Use your imagination.' },
  ],
  l103: [
    { word: 'quickly', meaningAr: 'بسرعة', example: 'She finished quickly.' },
    { word: 'carefully', meaningAr: 'بحذر', example: 'Open the box carefully.' },
    { word: 'quietly', meaningAr: 'بهدوء', example: 'Close the door quietly.' },
    { word: 'well', meaningAr: 'جيدا', example: 'She sings well.' },
    { word: 'suddenly', meaningAr: 'فجأة', example: 'It suddenly got cold.' },
    { word: 'patiently', meaningAr: 'بصبر', example: 'Wait patiently.' },
  ],
  l104: [
    { word: 'Never mind', meaningAr: 'لا بأس / انسَ الأمر', example: 'Never mind, next time.' },
    { word: "up to you", meaningAr: 'القرار لك', example: "It's up to you." },
    { word: 'a big deal', meaningAr: 'أمر مهم', example: 'It is not a big deal.' },
    { word: 'worth a try', meaningAr: 'يستحق المحاولة', example: 'It is worth a try.' },
    { word: 'keep in touch', meaningAr: 'يبقى على تواصل', example: 'Keep in touch!' },
    { word: 'starving', meaningAr: 'جائع جدا', example: 'I am starving!' },
  ],
};

/* safety pool: distinct top-ups drawn by whichever lesson falls short */
const SAFETY = T(["vocabulary","review"], [['Learning words in sentences makes them stick.','تعلم الكلمات في جمل يثبتها.',2],['One new word a day is a good pace.','كلمة جديدة كل يوم وتيرة جيدة.',1],['Use the new word three times today.','استخدم الكلمة الجديدة ثلاث مرات اليوم.',1],['A good dictionary is a learner’s friend.','القاموس الجيد صديق المتعلم.',2],['Words change meaning with context.','تغير الكلمات معناها حسب السياق.',2],['Read the example aloud twice.','اقرأ المثال بصوت عال مرتين.',1],['Guess the meaning before you check.','خمّن المعنى قبل أن تتحقق.',2],['Word families grow your vocabulary fast.','عائلات الكلمات تنمي مفرداتك بسرعة.',2],['Note the collocation, not only the word.','دوّن المركّب اللفظي لا الكلمة وحدها.',2],['Idioms add color to your English.','التعبيرات الاصطلاحية تضفي جمالا على لغتك.',2],['Synonyms are close, not identical.','المترادفات متقاربة لا متطابقة.',2],['Choose the word that fits the tone.','اختر الكلمة التي تناسب النبرة.',2],['Spelling and meaning travel together.','الإملاء والمعنى يسيران معا.',1],['Write your own example for each word.','اكتب مثالك الخاص لكل كلمة.',1],['Review old words before new ones.','راجع الكلمات القديمة قبل الجديدة.',2],['A phrase book helps in emergencies.','كتاب العبارات ينفع في الطوارئ.',2],['Common words cover most conversations.','الكلمات الشائعة تغطي أغلب المحادثات.',2],['Verbs carry the heart of a sentence.','الأفعال تحمل قلب الجملة.',2],['Adjectives paint the picture.','الصفات ترسم الصورة.',1],['Adverbs tell you how it happens.','الظروف تخبرك كيف يحدث الأمر.',2],['Prepositions are small but powerful.','حروف الجر صغيرة لكنها قوية.',2],['Practice the pronunciation too.','تدرب على النطق أيضا.',1],['Repeat the word with its Arabic meaning.','أعد الكلمة مع معناها العربي.',1],['Vocabulary grows like a garden.','المفردات تنمو كالحديقة.',1],['Collect words from real life.','اجمع الكلمات من الحياة الواقعية.',2],['Label things in your house in English.','ضع أسماء إنجليزية على أشياء بيتك.',2],['Talk to yourself in English daily.','تحدث إلى نفسك بالإنجليزية يوميا.',2],['The right word saves a whole sentence.','الكلمة الصحيحة توفر جملة كاملة.',2],['Two synonyms, two different flavors.','مترادفان، ونكهتان مختلفتان.',2],['Opposites help you remember pairs.','الأضداد تساعدك على تذكر الأزواج.',2],['Confusable pairs need extra care.','الأزواج المتشابهة تحتاج عناية إضافية.',2],['Context decides the correct choice.','السياق يحدد الاختيار الصحيح.',2],['Every lesson adds ten new tools.','كل درس يضيف عشر أدوات جديدة.',1],['Your word bank is your power.','بنك كلماتك هو قوتك.',1],['Mistakes with words are welcome here.','الأخطاء بالكلمات مرحب بها هنا.',1],['Say the word, type the word, own the word.','قل الكلمة، اكتبها، وامتلكها.',1],['Little words glue sentences together.','الكلمات الصغيرة تلصق الجمل.',2],['A rich vocabulary builds confidence.','المفردات الغنية تبني الثقة.',2],['Learn the word with its partners.','تعلم الكلمة مع رفيقاتها.',2],['Language is a habit, not a test.','اللغة عادة لا اختبار.',1],['A curious fox borrowed the farmer’s ladder.','استعار ثعلب فضولي سلم المزارع.',2],['The old violin kept one broken string.','احتفظ الكمان القديم بوتر مكسور واحد.',2],['Seven lanterns floated above the sleepy harbor.','طفيت سبع فوانيس فوق الميناء النائم.',2],['The midnight train carries only letters.','ينقل قطار منتصف الليل الرسائل فقط.',2],['A gentle giant guarded the honey jars.','حرس عملاق لطيف أواني العسل.',2],['The paper crane collected morning dew.','جمع طائر الكركي الورقي ندى الصباح.',2],['Her grandfather’s compass always pointed home.','كانت بوصلة جدها تشير إلى البيت دائما.',2],['The brass teapot whistles before storms.','تتصافح إبريقة النحاس قبل العواصف.',2],['Snow painted the village roofs silver.','طلت الثلوج أسطح القرية باللون الفضي.',2],['The lighthouse keeper planted mint by the door.','زرع حارس المنارة النعناع قرب الباب.',2],['A shy moon peeked between two clouds.','ألقى قمر خجول نظرة بين سحابتين.',2],['The camel cart carried painted pots.','حملت عربة الجمل فخارا ملونا.',2],['Grandmother’s recipe box smells of cinnamon.','تفوح من صندوق وصفات الجدة رائحة القرفة.',2],['The wooden horse remembers every parade.','يتذكر الحصان الخشبي كل استعراض.',2],['Rain drums a soft song on the awning.','تقرع الأمطار أغنية رقيقة على المظلة.',2],['The quiet clockmaker repaired time itself.','أصلح صانع الساعات الهادئ الزمن ذاته.',2],['A copper coin rolled under the bench.','تدحرجت عملة نحاسية تحت المقعد.',2],['The mountain path wears a green ribbon.','يرتدي درب الجبل شريطا أخضر.',2],['Two sparrows argued over one breadcrumb.','تجادل عصفوران على فتحة خبز واحدة.',2],['The harbor bell counts the evening waves.','يعد جرس الميناء أمواج المساء.',2],['A brass key sleeps under the third tile.','ينام مفتاح نحاسي تحت البلاطة الثالثة.',2],['The museum cat inspects every new frame.','يفحص قط المتحف كل إطار جديد.',2],['A paper boat sailed across the puddle.','أبحر قارب ورقي عبر بركة الماء.',2],['The bazaar sells star-shaped sweets on Fridays.','يبيع السوق حلوى على شكل نجوم أيام الجمعة.',2],['Her sketchbook smells of rain and pencils.','تفوح من دفتر رسمها رائحة المطر والأقلام.',2],['Two turtles attended the garden meeting.','حضرت سلحفاوتان اجتماع الحديقة.',2],['The bakery numbered its bread baskets.','رقمت المخبز سلال خبزها.',2],['A tiny ladder leans against the bookshelf.','يتكئ سلم صغير على رف الكتب.',2],['The ferry whistle greets the fishing boats.','يحيي صفير العبارة قوارب الصيد.',2],['Grandfather’s radio hums from another decade.','يهمس راديو الجد من عقد آخر.',2],['The sandcastle wore a shell crown.','ارتدت قلعة الرمل تاجا من الأصداف.',2],['A kite sighs when the wind rests.','يتنهد الطائرة الورقية حين تستريح الريح.',2],['The pomegranate tree keeps our secrets.','تحفظ شجرة الرمان أسرارنا.',2],['Blue chalk draws better on warm afternoons.','يرسم الطباشير الأزرق بشكل أفضل بعد الظهر الدافئ.',2],['The doorbell sings two different notes.','يغني جرس الباب نغمتين مختلفتين.',2],['Our balcony garden votes for spring.','تصوت حديقة شرفتنا للربيع.',2],['The tailor measured midnight by candlelight.','قاس الخياط منتصف الليل على ضوء الشمعة.',2],['A postcard arrived without an address.','وصلت بطاقة بريدية دون عنوان.',2],['The chess club meets behind the library.','يجتمع نادي الشطرنج خلف المكتبة.',2],['Orange paint waits for the garden wall.','ينتظر الطلاء البرتقالي جدار الحديقة.',2]]);

const CFG = [
  { id: 'lesson-089', key: 'l89', title: 'High-Frequency Verbs 1', titleAr: 'الأفعال عالية التكرار 1', level: 'A2', minutes: 13, pools: { lt: [...l89Lt, ...SAFETY], fill: l89Fills, order: l89Orders, mc: l89Mc } },
  { id: 'lesson-090', key: 'l90', title: 'High-Frequency Verbs 2', titleAr: 'الأفعال عالية التكرار 2', level: 'A2', minutes: 13, pools: { lt: [...l90Lt, ...SAFETY], fill: l90Fills, order: l90Orders, mc: l90Mc } },
  { id: 'lesson-091', key: 'l91', title: 'Phrasal Verbs with GET', titleAr: 'الأفعال المركبة مع GET', level: 'B1', minutes: 14, pools: { lt: [...l91Lt, ...SAFETY], fill: l91Fills, order: l91Orders, mc: l91Mc } },
  { id: 'lesson-092', key: 'l92', title: 'Phrasal Verbs with TAKE & PUT', titleAr: 'الأفعال المركبة مع TAKE وPUT', level: 'B1', minutes: 14, pools: { lt: [...l92Lt, ...SAFETY], fill: l92Fills, order: l92Orders, mc: l92Mc } },
  { id: 'lesson-093', key: 'l93', title: 'Phrasal Verbs with LOOK, COME & GO', titleAr: 'الأفعال المركبة مع LOOK وCOME وGO', level: 'B1', minutes: 14, pools: { lt: [...l93Lt, ...SAFETY], fill: l93Fills, order: l93Orders, mc: l93Mc } },
  { id: 'lesson-094', key: 'l94', title: 'Collocations with DO & MAKE', titleAr: 'المركبات الشائعة مع DO وMAKE', level: 'A2', minutes: 13, pools: { lt: [...l94Lt, ...SAFETY], fill: l94Fills, order: l94Orders, mc: l94Mc } },
  { id: 'lesson-095', key: 'l95', title: 'Collocations with HAVE & TAKE', titleAr: 'المركبات الشائعة مع HAVE وTAKE', level: 'A2', minutes: 13, pools: { lt: [...l95Lt, ...SAFETY], fill: l95Fills, order: l95Orders, mc: l95Mc } },
  { id: 'lesson-096', key: 'l96', title: 'Idioms about Time', titleAr: 'تعبيرات اصطلاحية عن الزمن', level: 'B1', minutes: 14, pools: { lt: [...l96Lt, ...SAFETY], fill: l96Fills, order: l96Orders, mc: l96Mc } },
  { id: 'lesson-097', key: 'l97', title: 'Idioms about Feelings', titleAr: 'تعبيرات اصطلاحية عن المشاعر', level: 'B1', minutes: 14, pools: { lt: [...l97Lt, ...SAFETY], fill: l97Fills, order: l97Orders, mc: l97Mc } },
  { id: 'lesson-098', key: 'l98', title: 'Synonyms in Context', titleAr: 'المترادفات في السياق', level: 'B1', minutes: 14, pools: { lt: [...l98Lt, ...SAFETY], fill: l98Fills, order: l98Orders, mc: l98Mc } },
  { id: 'lesson-099', key: 'l99', title: 'Antonyms in Context', titleAr: 'الأضداد في السياق', level: 'A2', minutes: 13, pools: { lt: [...l99Lt, ...X99, ...SAFETY], fill: l99Fills, order: l99Orders, mc: l99Mc } },
  { id: 'lesson-100', key: 'l100', title: 'Commonly Confused Words I', titleAr: 'الكلمات المتشابهة 1', level: 'A2', minutes: 13, pools: { lt: [...l100Lt, ...X100, ...SAFETY], fill: l100Fills, order: l100Orders, mc: l100Mc } },
  { id: 'lesson-101', key: 'l101', title: 'Commonly Confused Words II', titleAr: 'الكلمات المتشابهة 2', level: 'B1', minutes: 14, pools: { lt: [...l101Lt, ...X101, ...SAFETY], fill: l101Fills, order: l101Orders, mc: l101Mc } },
  { id: 'lesson-102', key: 'l102', title: 'Word Families: Verbs & Nouns', titleAr: 'عائلات الكلمات: أفعال وأسماء', level: 'B1', minutes: 14, pools: { lt: [...l102Lt, ...X102, ...SAFETY], fill: l102Fills, order: l102Orders, mc: l102Mc } },
  { id: 'lesson-103', key: 'l103', title: 'Word Families: Adjectives & Adverbs', titleAr: 'عائلات الكلمات: صفات وظروف', level: 'B1', minutes: 14, pools: { lt: [...l103Lt, ...X103, ...SAFETY], fill: l103Fills, order: l103Orders, mc: l103Mc } },
  { id: 'lesson-104', key: 'l104', title: 'Everyday Expressions', titleAr: 'تعبيرات يومية', level: 'A2', minutes: 13, pools: { lt: [...l104Lt, ...X104, ...SAFETY], fill: l104Fills, order: l104Orders, mc: l104Mc } },
  /* CFG-END */
];

export function buildAll() {
  let total = 0;
  for (const c of CFG) {
    total += build({
      id: c.id, section: 'vocabulary', level: c.level, minutes: c.minutes,
      title: c.title, titleAr: c.titleAr,
      objectives: [
        `Use the target words of "${c.title}" in natural sentences`,
        'Listen and type sentences that show each word in context',
        'Choose the right word in fills, word order and multiple choice',
      ],
      grammar: GRAM[c.key],
      vocabulary: VOC[c.key],
      pools: c.pools,
    });
  }
  return { section: 'vocabulary', lessons: CFG.length, exercises: total };
}
