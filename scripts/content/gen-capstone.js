/* ============================================================
   Content generator — Capstone: Full Course Review (121–123)
   Three mixed-review capstone lessons with entirely fresh
   sentences drawing on all seven sections.
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

const TG = ['review', 'capstone'];

/* ---------- lesson 121: life & routines capstone ---------- */
const l121Lt = T(TG, [
  ['My grandmother waters her flowers before sunrise.', 'تسقي جدتها زهورها قبل شروق الشمس.', 2],
  ['We feed the neighbor\u2019s cat every weekend.', 'نطعم قطة الجار كل عطلة نهاية أسبوع.', 2],
  ['He repaired the old radio in one afternoon.', 'أصلح الراديو القديم في ظهيرة واحدة.', 2],
  ['They celebrated their tenth wedding anniversary.', 'احتفلوا بذكرى زواجهم العاشرة.', 2],
  ['She graduates from university next June.', 'تتخرج من الجامعة في يونيو القادم.', 2],
  ['My uncle retired after thirty years of teaching.', 'تقاعد عمي بعد ثلاثين عاما من التدريس.', 2],
  ['I locked the door and checked it twice.', 'أقفلت الباب وتحققت منه مرتين.', 2],
  ['The bakery on our street opens before dawn.', 'يفتح مخبز شارعنا قبل الفجر.', 2],
  ['She apologised for arriving late to the meeting.', 'اعتذرت عن وصولها متأخرة إلى الاجتماع.', 2],
  ['We donated our old books to the library.', 'تبرعنا بكتبنا القديمة للمكتبة.', 2],
  ['The children recycle paper at their school.', 'يعيد الأطفال تدوير الورق في مدرستهم.', 2],
  ['He saves a little money every single month.', 'يدخر قليلا من المال كل شهر.', 2],
  ['They split the bill fairly at the restaurant.', 'قسموا الفاتورة بإنصاف في المطعم.', 2],
  ['The gardener planted three lemon trees yesterday.', 'زرع البستاني ثلاثة أشجار ليمون أمس.', 2],
  ['My sister translates short stories from English.', 'تترجم أختي قصصا قصيرة من الإنجليزية.', 2],
  ['The flight attendant demonstrated the safety rules.', 'أوضحت المضيفة قواعد السلامة.', 2],
  ['I parked the car two streets away.', 'أوقفت السيارة على بُعد شارعين.', 2],
  ['The twins celebrated their birthday at the park.', 'احتفلت التوأمان بعيد ميلادهما في الحديقة.', 2],
  ['Our team practices every Tuesday evening.', 'يتدرب فريقنا كل ثلاثاء مساء.', 2],
  ['The librarian recommended a wonderful novel.', 'أوصت أمينة المكتبة برواية رائعة.', 2],
  ['He volunteers at the animal shelter on Fridays.', 'تطوع في مأوى الحيوانات أيام الجمعة.', 2],
  ['The tailor measured the jacket carefully.', 'قاس الخياط السترة بعناية.', 2],
  ['She watered the balcony plants before leaving.', 'سقت نباتات الشرفة قبل المغادرة.', 2],
  ['The students recited the poem from memory.', 'ألقى الطلاب القصيدة من الذاكرة.', 2],
  ['We interviewed three candidates this morning.', 'قابلنا ثلاثة مرشحين هذا الصباح.', 2],
  ['The chef tasted the soup and smiled.', 'تذوق الطاهي الحساء وابتسم.', 2],
  ['My father reads the paper with his morning coffee.', 'يقرأ أبي الصحيفة مع قهوة الصباح.', 2],
  ['The moon looked enormous behind the tower.', 'بدا القمر ضخما خلف البرج.', 2],
  ['She writes three pages in her diary every night.', 'تكتب ثلاث صفحات في مذكّراتها كل ليلة.', 2],
  ['The ferry crosses the harbour twice an hour.', 'تعبر العبارة الميناء مرتين كل ساعة.', 2],
  ['Our neighbors planted a small olive grove.', 'زرع جيراننا بستان زيتون صغيرا.', 2],
  ['He fixed the leaking tap in ten minutes.', 'أصلح الحنفية المتسربة في عشر دقائق.', 2],
  ['The choir practiced a new song all week.', 'تدربت الكورال على أغنية جديدة طوال الأسبوع.', 2],
  ['I photographed the sunset from the rooftop.', 'صورت غروب الشمس من السطح.', 2],
  ['The twins swapped seats without asking.', 'تبادلت التوأمان المقعدين دون إذن.', 2],
  ['She sewed a new button on my coat.', 'خاطت زرا جديدا على معطفي.', 2],
  ['The museum guide explained the ancient map.', 'شرح مرشد المتحف الخريطة القديمة.', 2],
  ['We tasted twelve kinds of dates at the market.', 'تذوقنا اثني عشر نوعا من التمر في السوق.', 2],
  ['The engineer checked the bridge after the storm.', 'فحص المهندس الجسر بعد العاصفة.', 2],
  ['My cousin moved to a flat near the sea.', 'انتقل ابن عمي إلى شقة قرب البحر.', 2],
  ['The baker kneads the dough before sunrise.', 'يعجن الخباز العجين قبل الفجر.', 2],
  ['They organized a small concert for the school.', 'نظموا حفلا صغيرا للمدرسة.', 2],
  ['She never misses her morning walk.', 'لا تفوت نزهتها الصباحية أبدا.', 2],
  ['The old clock chimes at exactly six.', 'يقرع الساعة القديمة في السادسة تماما.', 2],
  ['We picked fresh mint from the garden.', 'قطفنا نعناعا طازجا من الحديقة.', 2],
  ['He translated the whole letter in an hour.', 'ترجم الخطاب كله في ساعة.', 2],
  ['The volunteers cleaned the beach on Saturday.', 'نظف المتطوعون الشاطئ يوم السبت.', 2],
  ['My aunt sews dresses for the whole family.', 'تخيط عمتي فساتين للعائلة كلها.', 2],
  ['The chess club welcomed five new members.', 'رحب نادي الشطرنج بخمسة أعضاء جدد.', 2],
  ['She painted the kitchen a soft green.', 'طلت المطبخ باللون الأخضر الفاتح.', 2],
  ['The train arrives before the shops close.', 'يصل القطار قبل إغلاق المتاجر.', 2],
  ['We recorded the concert on my phone.', 'سجلنا الحفلة على هاتفي.', 2],
  ['The twins fed the ducks at the lake.', 'أطعم التوأمان البط في البحيرة.', 2],
  ['He always double-checks his homework.', 'يدقق واجبه دائما مرتين.', 2],
  ['The guide pointed to the tallest tower.', 'أشار المرشد إلى أطول برج.', 2],
  ['She saved the last piece of cake for me.', 'أبقت لي آخر قطعة كيك.', 2],
  ['The farmers harvested the wheat in June.', 'حصد المزارعون القمح في يونيو.', 2],
  ['We repainted the gate before the festival.', 'أعدنا طلاء البوابة قبل المهرجان.', 2],
  ['The nightingale sings from the fig tree.', 'يغني البلبل من شجرة التين.', 2],
  ['My brother fixed his bike without help.', 'أصلح أخوه دراجته دون مساعدة.', 2],
  ['The whole family gathered for Friday lunch.', 'اجتمعت العائلة كلها لغداء الجمعة.', 2],
]);

const l121Fills = [
  ff(TG, 'volunteers', 'She volunteers at the animal shelter.', 'تتطوع في مأوى الحيوانات.'),
  ff(TG, 'harvested', 'The farmers harvested the wheat early.', 'حصد المزارعون القمح مبكرا.'),
  ff(TG, 'translates', 'My sister translates short stories.', 'تترجم أختي قصصا قصيرة.'),
  ff(TG, 'anniversary', 'They celebrated their tenth wedding anniversary.', 'احتفلوا بذكرى زواجهم العاشرة.'),
  ff(TG, 'kneads', 'The baker kneads the dough before sunrise.', 'يعجن الخباز العجين قبل الفجر.'),
  ff(TG, 'recycle', 'The children recycle paper at school.', 'يعيد الأطفال تدوير الورق في المدرسة.'),
  ff(TG, 'graduates', 'She graduates from university next June.', 'تتخرج من الجامعة في يونيو القادم.'),
  ff(TG, 'shelter', 'The animal shelter needs volunteers.', 'يحتاج مأوى الحيوانات متطوعين.'),
];

const l121Orders = O(TG, [
  ['The baker kneads the dough before sunrise.', 'يعجن الخباز العجين قبل الفجر.'],
  ['We donated our old books to the library.', 'تبرعنا بكتبنا القديمة للمكتبة.'],
  ['She never misses her morning walk.', 'لا تفوت نزهتها الصباحية أبدا.'],
  ['The engineer checked the bridge after the storm.', 'فحص المهندس الجسر بعد العاصفة.'],
  ['My brother fixed his bike without help.', 'أصلح أخوه دراجته دون مساعدة.'],
  ['The volunteers cleaned the beach on Saturday.', 'نظف المتطوعون الشاطئ يوم السبت.'],
]);

const l121Mc = M(TG, [
  ['"He saved a little money every month" shows…', ['a habit', 'a plan for tomorrow', 'a command'], 0, 'عادة.', 1],
  ['The opposite of "locked the door" is…', ['unlocked the door', 'closed the door', 'fixed the door'], 0, 'عكس قفل هو فتح القفل.', 1],
  ['"She apologised for being late" means she…', ['said sorry', 'arrived early', 'left soon'], 0, 'اعتذرت.', 1],
  ['Which word means "gave money to help"?', ['donated', 'borrowed', 'saved'], 0, 'تبرع.', 2],
  ['"The ferry crosses twice an hour" tells you the…', ['frequency', 'price', 'color'], 0, 'التكرار.', 2],
  ['Complete: "The farmers ___ the wheat in June."', ['harvested', 'planted only', 'watered never'], 0, 'حصد.', 1],
]);

/* ---------- lesson 122: work & travel capstone ---------- */
const l122Lt = T(TG, [
  ['The receptionist handed me the room key.', 'أعطتني موظفة الاستقبال مفتاح الغرفة.', 2],
  ['Our connecting flight leaves from gate C4.', 'تقلع رحلتنا المتصلة من البوابة C4.', 2],
  ['She negotiated a better price for the apartment.', 'تفاوضت على سعر أفضل للشقة.', 2],
  ['The manager approved my leave request.', 'وافق المدير على طلب إجازتي.', 2],
  ['Please confirm your reservation by email.', 'من فضلك أكد حجزك بالبريد الإلكتروني.', 2],
  ['The taxi driver knew a shortcut to the airport.', 'عرف سائق الأجرة طريقا مختصرا إلى المطار.', 2],
  ['My colleague translated the contract quickly.', 'ترجم زميلي العقد بسرعة.', 2],
  ['The hotel upgraded our room for free.', 'رقى الفندق غرفتنا مجانا.', 2],
  ['We checked in online the night before.', 'سجلنا وصولنا إلكترونيا الليلة السابقة.', 2],
  ['The tour guide gathered the group at noon.', 'جمع مرشد السياحة المجموعة ظهرا.', 2],
  ['She filed the reports before the deadline.', 'أرشفت التقارير قبل الموعد النهائي.', 2],
  ['The customs officer asked a few questions.', 'طرح موظف الجمارك بعض الأسئلة.', 2],
  ['Our train was cancelled because of the snow.', 'ألغيت قطارنا بسبب الثلج.', 2],
  ['The client signed the contract this morning.', 'وقع العميل العقد هذا الصباح.', 2],
  ['He booked a window seat for the long flight.', 'حجز مقعدا بجانب النافذة للرحلة الطويلة.', 2],
  ['The airline lost one suitcase in Cairo.', 'أضاعت شركة الطيران حقيبة في القاهرة.', 2],
  ['She introduced herself to the new team.', 'قدمت نفسها للفريق الجديد.', 2],
  ['The meeting agenda reached us on Monday.', 'وصلتنا جدول أعمال الاجتماع يوم الاثنين.', 2],
  ['We hired a car for three days.', 'استأجرنا سيارة لثلاثة أيام.', 2],
  ['The concierge recommended a quiet restaurant.', 'أوصى الكونسيرج بمطعم هادئ.', 2],
  ['My interview lasted forty minutes.', 'استغرقت مقابلتي أربعين دقيقة.', 2],
  ['The passengers queued patiently at gate two.', 'صف الركاب بصبر عند البوابة الثانية.', 2],
  ['She presented the quarterly results confidently.', 'عرضت نتائج الربع بثقة.', 2],
  ['The shuttle bus stops at terminal three.', 'تتوقف حافلة النقل عند الصالة الثالثة.', 2],
  ['He apologized for the billing mistake.', 'اعتذر عن خطأ الفاتورة.', 2],
  ['The travel agent printed our itinerary.', 'طبعت وكيلة السفر برنامج رحلتنا.', 2],
  ['We exchanged our money at the airport bank.', 'صرفنا نقودنا في بنك المطار.', 2],
  ['The security check moved surprisingly fast.', 'سار التفتيش الأمني بسرعة مدهشة.', 2],
  ['She negotiated directly with the landlord.', 'تفاوضت مباشرة مع المالك.', 2],
  ['The pilot announced our early arrival.', 'أعلن الطيار وصولنا المبكر.', 2],
  ['Our office moved to the eleventh floor.', 'انتقل مكتبنا إلى الطابق الحادي عشر.', 2],
  ['The deadline for the report is Thursday.', 'الموعد النهائي للتقرير يوم الخميس.', 2],
  ['He collected the tickets from the machine.', 'جمع التذاكر من الآلة.', 2],
  ['The ferry schedule changes in winter.', 'يتغير جدول العبارة في الشتاء.', 2],
  ['She answered every question calmly.', 'أجابت على كل سؤال بهدوء.', 2],
  ['The company hired two new engineers.', 'وظفت الشركة مهندسين جديدين.', 2],
  ['We boarded the bus to the old city.', 'استقللنا الحافلة إلى المدينة القديمة.', 2],
  ['The receptionist printed my boarding pass.', 'طبعت موظفة الاستقبال بطاقة صعودي.', 2],
  ['Our luggage arrived on the next flight.', 'وصلت أمتعتنا على الرحلة التالية.', 2],
  ['The manager praised the whole team.', 'مدح المدير الفريق كله.', 2],
  ['She double-checked the visa requirements.', 'دقت متطلبات التأشيرة مرتين.', 2],
  ['The taxi meter showed a fair price.', 'أظهر عداد الأجرة سعرا عادلا.', 2],
  ['We visited the client office on Tuesday.', 'زرنا مكتب العميل يوم الثلاثاء.', 2],
  ['The airline offered us meal vouchers.', 'قدمت شركة الطيران قسائم وجبات.', 2],
  ['He emailed the updated schedule to everyone.', 'أرسل الجدول المحدث للجميع.', 2],
  ['The tour included a boat trip.', 'شملت الرحلة رحلة بحرا.', 2],
  ['She kept the receipts for the expense report.', 'احتفظت بالإيصالات لتقرير المصروفات.', 2],
  ['The hotel confirmed our late checkout.', 'أكد الفندق مغادرتنا المتأخرة.', 2],
  ['The queue for security looked long but moved fast.', 'بدا طابور التفتيش طويلا لكنه سار بسرعة.', 2],
  ['My colleague covered my shift yesterday.', 'غطى زميلي ورديتي أمس.', 2],
  ['The bus driver announced the next stop.', 'أعلن سائق الحافلة المحطة التالية.', 2],
  ['We collected our visas on Friday morning.', 'استلمنا تأشيراتنا صباح الجمعة.', 2],
  ['The landlord fixed the heater the same day.', 'أصلح المالك السخان في اليوم نفسه.', 2],
  ['She translated the menu for the tourists.', 'ترجمت القائمة للسياح.', 2],
  ['The gate changed from B12 to B9.', 'تغيرت البوابة من B12 إلى B9.', 2],
  ['Our team finished the project on time.', 'أنهى فريقنا المشروع في الوقت المحدد.', 2],
  ['The airline apologized for the delay twice.', 'اعتذرت شركة الطيران عن التأخير مرتين.', 2],
  ['He negotiated the rent down by ten percent.', 'خفض الإيجار بنسبة عشرة بالمئة.', 2],
  ['The conference hall seats four hundred people.', 'يتسع قاعة المؤتمر لأربعمئة شخص.', 2],
  ['She confirmed the meeting with a short email.', 'أكدت الاجتماع ببريد قصير.', 2],
  ['The border officer wished us a safe journey.', 'تمنى لنا ضابط الحدود رحلة آمنة.', 2],
]);

const l122Fills = [
  ff(TG, 'negotiated', 'She negotiated a better price.', 'تفاوضت على سعر أفضل.'),
  ff(TG, 'cancelled', 'Our train was cancelled because of snow.', 'ألغيت قطارنا بسبب الثلج.'),
  ff(TG, 'itinerary', 'The agent printed our itinerary.', 'طبعت الوكيلة برنامج الرحلة.'),
  ff(TG, 'voucher', 'The airline gave us meal vouchers.', 'قدمت الشركة قسائم وجبات.'),
  ff(TG, 'boarding pass', 'The receptionist printed my boarding pass.', 'طبعت موظفة الاستقبال بطاقة الصعود.'),
  ff(TG, 'deadline', 'The deadline for the report is Thursday.', 'الموعد النهائي للتقرير الخميس.'),
  ff(TG, 'confirmed', 'The hotel confirmed our late checkout.', 'أكد الفندق المغادرة المتأخرة.'),
  ff(TG, 'queue', 'The passengers queued patiently.', 'صف الركاب بصبر.'),
];

const l122Orders = O(TG, [
  ['The manager approved my leave request.', 'وافق المدير على طلب إجازتي.'],
  ['We checked in online the night before.', 'سجلنا وصولنا إلكترونيا الليلة السابقة.'],
  ['The pilot announced our early arrival.', 'أعلن الطيار وصولنا المبكر.'],
  ['She kept the receipts for the expense report.', 'احتفظت بالإيصالات لتقرير المصروفات.'],
  ['Our luggage arrived on the next flight.', 'وصلت أمتعتنا على الرحلة التالية.'],
  ['The company hired two new engineers.', 'وظفت الشركة مهندسين جديدين.'],
]);

const l122Mc = M(TG, [
  ['"The airline lost my suitcase" happens at…', ['baggage claim', 'the library', 'school'], 0, 'في قسم استلام الأمتعة.', 1],
  ['"She filed the reports" means she…', ['organized and stored them', 'threw them away', 'read them aloud'], 0, 'نظمتها وأرشفتها.', 2],
  ['A "boarding pass" allows you to…', ['board the plane', 'enter a school', 'park a car'], 0, 'صعود الطائرة.', 1],
  ['"He negotiated the rent down" means the rent…', ['got lower', 'got higher', 'stayed same'], 0, 'انخفض.', 2],
  ['Who hands you the room key at a hotel?', ['the receptionist', 'the pilot', 'the chef'], 0, 'موظفة الاستقبال.', 1],
  ['Complete: "Our flight was ___ because of fog."', ['delayed', 'delighted', 'delivered'], 0, 'تأخرت بسبب الضباب.', 2],
]);

/* ---------- lesson 123: culture, feelings & society capstone ---------- */
const l123Lt = T(TG, [
  ['The whole neighborhood joined the celebration.', 'انضم الحي كله إلى الاحتفال.', 2],
  ['She felt proud when her son graduated.', 'شعرت بفخر عندما تخرج ابنها.', 2],
  ['The children wore traditional clothes at the festival.', 'لبس الأطفال ملابس تقليدية في المهرجان.', 2],
  ['My grandfather told stories about the old port.', 'حكى جدي قصصا عن الميناء القديم.', 2],
  ['The choir sang at the city celebration.', 'غنت الكورال في احتفالية المدينة.', 2],
  ['He was nervous before his first interview.', 'كان متوترا قبل أول مقابلة له.', 2],
  ['The crowd cheered when the team scored.', 'هتف الجمهور عندما سجل الفريق.', 2],
  ['She keeps her family recipes in a blue notebook.', 'تحفظ وصفات عائلتها في دفتر أزرق.', 2],
  ['The museum exhibit explains local history.', 'يشرح عرض المتحف التاريخ المحلي.', 2],
  ['They exchanged gifts after the dinner.', 'تبادلوا الهدايا بعد العشاء.', 2],
  ['The streets were decorated with colorful lights.', 'زينت الشوارع بأضواء ملونة.', 2],
  ['I felt relieved after the final exam.', 'شعرت بالارتياح بعد الامتحان الأخير.', 2],
  ['The community center offers free classes.', 'يقدم المركز المجتمعي دروسا مجانية.', 2],
  ['He thanked his teachers in his speech.', 'شكر معلميه في خطابه.', 2],
  ['The wedding invitation arrived on Thursday.', 'وصلت دعوة الزفاف يوم الخميس.', 2],
  ['She was delighted with the surprise party.', 'كانت مسرورة بحفلة المفاجأة.', 2],
  ['The library hosts a weekly book club.', 'تستضيف المكتبة نادي كتب أسبوعيا.', 2],
  ['Our team won the final match at home.', 'فاز فريقنا بالمباراة النهائية على أرضه.', 2],
  ['The children painted a mural on the school wall.', 'رسم الأطفال لوحة على جدار المدرسة.', 2],
  ['He donated his time to the neighborhood cleanup.', 'تبرع بوقته لتنظيف الحي.', 2],
  ['The audience applauded for several minutes.', 'صافح الجمهور لعدة دقائق.', 2],
  ['She was touched by their kindness.', 'تأثرت بلطفهم.', 2],
  ['The festival celebrates local crafts and food.', 'يحتفل المهرجان بالحرف والأطعمة المحلية.', 2],
  ['My grandmother taught me the family recipe.', 'علمتني جدتي وصفة العائلة.', 2],
  ['The new park brought the neighbors together.', 'جمع الحديقة الجديدة الجيران.', 2],
  ['He was exhausted but happy after the marathon.', 'كان منهكا لكنه سعيد بعد الماراثون.', 2],
  ['The students organized a charity sale.', 'نظم الطلاب سعرة خيرية.', 2],
  ['She calmed the crying child with a story.', 'هدأت الطفل الباكي بقصة.', 2],
  ['The national team plays in green shirts.', 'يلعب المنتخب الوطني بقصص خضراء.', 2],
  ['They restored the old theatre last year.', 'أعادوا ترميم المسرح القديم العام الماضي.', 2],
  ['The graduation ceremony lasted three hours.', 'استغرقت حفل التخرج ثلاث ساعات.', 2],
  ['I felt grateful for my friends\u2019 support.', 'شعرت بالامتنان لد أصدقائي.', 2],
  ['The market smelled of fresh bread and spices.', 'فاح من السوق رائحة الخبز الطازج والبهارات.', 2],
  ['She keeps every letter her father wrote.', 'تحتفظ بكل خطاب كتبه والدها.', 2],
  ['The anniversary photo made everyone laugh.', 'أضحكت صورة الذكرى الجميع.', 2],
  ['The team celebrated until midnight.', 'احتفل الفريق حتى منتصف الليل.', 2],
  ['He overcame his fear of public speaking.', 'تغلب على خوفه من التحدث أمام الجمهور.', 2],
  ['The volunteers felt proud of their work.', 'شعر المتطوعون بفخر بعملهم.', 2],
  ['The children learned folk songs from their grandmother.', 'تعلم الأطفال أغاني شعبية من جدتهم.', 2],
  ['She was disappointed by the short notice.', 'أحبطها الإشعار المتأخر.', 2],
  ['The ceremony ended with fireworks.', 'انتهى الحفل بألعاب نارية.', 2],
  ['Our street planted a small community garden.', 'زرع شارعنا حديقة مجتمعية صغيرة.', 2],
  ['The exhibition shows paintings by local artists.', 'يعرض المعرض لوحات لفنانين محليين.', 2],
  ['He felt confident before the competition.', 'شعر بالثقة قبل المنافسة.', 2],
  ['The family gathered around the dinner table.', 'اجتمعت العائلة حول مائدة العشاء.', 2],
  ['She describes her hometown with great love.', 'تصف مدينتها بمحبة كبيرة.', 2],
  ['The parade marched down the main street.', 'سار الاستعراض في الشارع الرئيسي.', 2],
  ['The gift was handmade by her aunt.', 'كانت الهدية مصنوعة يدويا من عمتها.', 2],
  ['They celebrate the harvest every autumn.', 'يحتفلون بالحصاد كل خريف.', 2],
  ['The old friends reunited after ten years.', 'التقى الأصدقاء القدماء بعد عشر سنوات.', 2],
  ['She whispered the good news to her sister.', 'همست بالخبر السار لأختها.', 2],
  ['The concert raised money for the school.', 'جمع الحفلة مالا للمدرسة.', 2],
  ['He wrote a thank-you note to his mentor.', 'كتب رسالة شكر لموجه.', 2],
  ['The festival parade starts at sunset.', 'يبدأ استعراض المهرجان عند الغروب.', 2],
  ['Our teacher encourages every question.', 'يشجع معلمنا كل سؤال.', 2],
  ['The children traded stamps and comics.', 'تبادل الأطفال الطوابع والقصص المصورة.', 2],
  ['She was moved by the farewell speech.', 'تأثرت بخطاب الوداع.', 2],
  ['The city renovated the central square.', 'جدّدت المدينة الساحة المركزية.', 2],
  ['Everyone wore their best clothes to the ceremony.', 'لبس الجميع أفضل ملابسهم للحفل.', 2],
  ['The graduation photo hangs in the hallway.', 'تعلق صورة التخرج في الممر.', 2],
  ['He felt honored to lead the team.', 'شعر بالتكريم لقيادة الفريق.', 2],
]);

const l123Fills = [
  ff(TG, 'celebration', 'The whole neighborhood joined the celebration.', 'انضم الحي كله إلى الاحتفال.'),
  ff(TG, 'relieved', 'I felt relieved after the final exam.', 'شعرت بالارتياح بعد الامتحان الأخير.'),
  ff(TG, 'mural', 'The children painted a mural on the wall.', 'رسم الأطفال لوحة على الجدار.'),
  ff(TG, 'grateful', 'I felt grateful for their support.', 'شعرت بالامتنان لدعمهم.'),
  ff(TG, 'ceremony', 'The graduation ceremony lasted three hours.', 'استغرقت حفل التخرج ثلاث ساعات.'),
  ff(TG, 'exhibition', 'The exhibition shows local paintings.', 'يعرض المعرض لوحات محلية.'),
  ff(TG, 'overcame', 'He overcame his fear of public speaking.', 'تغلب على خوفه من الجمهور.'),
  ff(TG, 'renovated', 'The city renovated the central square.', 'جدّدت المدينة الساحة المركزية.'),
];

const l123Orders = O(TG, [
  ['The streets were decorated with colorful lights.', 'زينت الشوارع بأضواء ملونة.'],
  ['She felt proud when her son graduated.', 'شعرت بفخر عندما تخرج ابنها.'],
  ['The community center offers free classes.', 'يقدم المركز المجتمعي دروسا مجانية.'],
  ['He overcame his fear of public speaking.', 'تغلب على خوفه من التحدث أمام الجمهور.'],
  ['The old friends reunited after ten years.', 'التقى الأصدقاء القدماء بعد عشر سنوات.'],
  ['Our teacher encourages every question.', 'يشجع معلمنا كل سؤال.'],
]);

const l123Mc = M(TG, [
  ['"She felt relieved" means she felt…', ['less worried', 'more tired', 'angry'], 0, 'أقل قلقا.', 1],
  ['"The crowd cheered" means the crowd…', ['shouted with joy', 'sat silently', 'left early'], 0, 'هتف بفرح.', 1],
  ['A "mural" is a painting on a…', ['wall', 'plate', 'book'], 0, 'جدار.', 2],
  ['"He overcame his fear" means the fear…', ['disappeared', 'grew bigger', 'stayed forever'], 0, 'زال.', 2],
  ['"Handmade" means made…', ['by hand', 'by machine', 'by phone'], 0, 'يدويا.', 1],
  ['Complete: "The ceremony ended with ___."', ['fireworks', 'homework', 'housework'], 0, 'ألعاب نارية.', 1],
]);

const GRAM = {
  l121: {
    explanation: 'This capstone reviews daily-life language: routines, repairs, celebrations and community. Notice the mix of tenses — present for habits, past for finished events, future for plans — and how time words signal each choice.',
    explanationAr: 'يستعرض هذا الدرس الختامي لغة الحياة اليومية: الروتين والإصلاحات والاحتفالات والمجتمع. لاحظ مزيج الأزمنة — المضارع للعادات والماضي للأحداث المنتهية والمستقبل للخطط — وكيف تلمح كلمات الزمن إلى كل اختيار.',
    examples: [
      { en: 'She never misses her morning walk.', ar: 'لا تفوت نزهتها الصباحية أبدا.' },
      { en: 'He repaired the old radio yesterday.', ar: 'أصلح الراديو القديم أمس.' },
      { en: 'She graduates next June.', ar: 'تتخرج في يونيو القادم.' },
    ],
  },
  l122: {
    explanation: 'This capstone reviews travel and workplace language: bookings, deadlines, negotiations and polite service exchanges. Formal vocabulary (confirm, approve, reserve) appears alongside practical travel verbs (board, collect, claim).',
    explanationAr: 'يستعرض هذا الدرس الختامي لغة السفر والعمل: الحجوزات والمواعيد النهائية والتفاوض وتبادلات الخدمة المهذبة. وتظهر المفردات الرسمية (confirm وapprove وreserve) إلى جانب أفعال السفر العملية (board وcollect وclaim).',
    examples: [
      { en: 'Please confirm your reservation by email.', ar: 'من فضلك أكد حجزك بالبريد.' },
      { en: 'The manager approved my leave request.', ar: 'وافق المدير على طلب إجازتي.' },
      { en: 'We boarded the bus to the old city.', ar: 'استقللنا الحافلة إلى المدينة القديمة.' },
    ],
  },
  l123: {
    explanation: 'This capstone reviews feelings and community language: celebrations, emotions and civic life. Emotion adjectives (proud, relieved, grateful, disappointed) pair with the verb feel, while past participles (decorated, handmade, renovated) describe places and things.',
    explanationAr: 'يستعرض هذا الدرس الختامي لغة المشاعر والمجتمع: الاحتفالات والعواطف والحياة المدنية. وتقترن صفات المشاعر (فخر، ارتياح، امتنان، خيبة) بفعل feel، بينما تصف تصريفات الماضي (مزين، مصنوع يدويا، مجدد) الأماكن والأشياء.',
    examples: [
      { en: 'She felt proud when her son graduated.', ar: 'شعرت بفخر عندما تخرج ابنها.' },
      { en: 'The streets were decorated with lights.', ar: 'زينت الشوارع بالأضواء.' },
      { en: 'I felt grateful for their support.', ar: 'شعرت بالامتنان لدعمهم.' },
    ],
  },
};

const VOC = {
  l121: [
    { word: 'volunteer', meaningAr: 'متطوع / يتطوع', example: 'He volunteers on Fridays.' },
    { word: 'anniversary', meaningAr: 'ذكرى سنوية', example: 'Their tenth wedding anniversary.' },
    { word: 'harvest', meaningAr: 'حصاد / يحصد', example: 'Farmers harvested the wheat.' },
    { word: 'knead', meaningAr: 'يعجن', example: 'The baker kneads the dough.' },
    { word: 'shelter', meaningAr: 'مأوى', example: 'The animal shelter needs help.' },
    { word: 'grove', meaningAr: 'بستان صغير', example: 'A small olive grove.' },
  ],
  l122: [
    { word: 'negotiate', meaningAr: 'يفاوض', example: 'She negotiated a better price.' },
    { word: 'boarding pass', meaningAr: 'بطاقة الصعود', example: 'Print your boarding pass.' },
    { word: 'itinerary', meaningAr: 'برنامج الرحلة', example: 'The agent printed our itinerary.' },
    { word: 'deadline', meaningAr: 'موعد نهائي', example: 'The deadline is Thursday.' },
    { word: 'confirm', meaningAr: 'يؤكد', example: 'Please confirm by email.' },
    { word: 'voucher', meaningAr: 'قسيمة', example: 'We received meal vouchers.' },
  ],
  l123: [
    { word: 'relieved', meaningAr: 'مرتاح البال', example: 'I felt relieved after the exam.' },
    { word: 'grateful', meaningAr: 'ممتن', example: 'I felt grateful for the support.' },
    { word: 'mural', meaningAr: 'لوحة جدارية', example: 'The children painted a mural.' },
    { word: 'ceremony', meaningAr: 'حفل رسمي', example: 'The ceremony lasted three hours.' },
    { word: 'renovate', meaningAr: 'يجدد / يرمم', example: 'They renovated the square.' },
    { word: 'overcome', meaningAr: 'يتغلب على', example: 'He overcame his fear.' },
  ],
};

const CAP_SAFETY = T(TG, [["The clockmaker adjusted the tiny gears by hand.","ضبط صانع الساعات التروس الدقيقة يدويا.",2],["Our mailman knows every dog on the street.","يعرف ساعي البريد كل كلب في الشارع.",2],["The firewood stack grew taller every week.","زارعت كومة الحطب كل أسبوع.",2],["She stitched a small flag onto her backpack.","خيطت علما صغيرا على حقيبة ظهرها.",2],["The ferry captain waved at the fishing boats.","لوح قائد العبارة لقوارب الصيد.",2],["He reorganized the toolshed in one morning.","أعاد تنظيم س大理 الأدوات في صبيحة واحدة.",2],["The school choir practiced in the tall hall.","تدربت كورال المدرسة في القاعة الشاهقة.",2],["A stray kitten adopted our quiet street.","تبنت شارعنا الهادئ قطة صغيرة ضالة.",2],["The potters shaped forty bowls that day.","شكل الفخارون أربعين زبدية ذلك اليوم.",2],["Our team planted twenty trees near the river.","زرع فريقنا عشرين شجرة قرب النهر.",2],["The night market glowed with paper lamps.","توهج السوق الليلي بالفوانيس الورقية.",2],["She memorized the whole poem in two days.","حفظت القصيدة كاملة في يومين.",2],["The old ferry still crosses every morning.","ما زالت العبارة القديمة تعبر كل صباح.",2],["He fixed the garden gate before winter.","أصلح باب الحديقة قبل الشتاء.",2],["The seminar covered twelve useful topics.","غطت الندوة اثني عشر موضوعا مفيدا.",2],["Their rooftop garden won a city prize.","فازت حديقة سطحهم بجائزة المدينة.",2],["The kind nurse stayed after her shift.","بقيت الممرضة الطيبة بعد ورديتها.",2],["We traced the old city walls on foot.","تتبعنا أسوار المدينة القديمة سيرا.",2],["The baker saved warm rolls for us.","أبقى لنا الخباز أرغفة دافئة.",2],["Our debate club meets every second Thursday.","يجتمع نادي المناظرات كل خميس متناوب.",2]]);

const CFG = [
  {
    id: 'lesson-121', section: 'listening-writing', level: 'B1', minutes: 18, count: 75,
    title: 'Full Course Review I: Daily Life', titleAr: 'مراجعة شاملة ١: الحياة اليومية',
    objectives: ['Consolidate vocabulary from all seven sections', 'Mix tenses naturally in review sentences', 'Listen and type longer, richer sentences'],
    grammar: GRAM.l121, vocabulary: VOC.l121,
    pools: { lt: [...l121Lt, ...CAP_SAFETY], fill: l121Fills, order: l121Orders, mc: l121Mc },
  },
  {
    id: 'lesson-122', section: 'listening-writing', level: 'B1', minutes: 18, count: 75,
    title: 'Full Course Review II: Work & Travel', titleAr: 'مراجعة شاملة ٢: العمل والسفر',
    objectives: ['Review workplace and travel language', 'Practice formal service expressions', 'Strengthen dictation accuracy'],
    grammar: GRAM.l122, vocabulary: VOC.l122,
    pools: { lt: [...l122Lt, ...CAP_SAFETY], fill: l122Fills, order: l122Orders, mc: l122Mc },
  },
  {
    id: 'lesson-123', section: 'listening-writing', level: 'B2', minutes: 20, count: 75,
    title: 'Full Course Review III: Community & Feelings', titleAr: 'مراجعة شاملة ٣: المجتمع والمشاعر',
    objectives: ['Master emotion and community vocabulary', 'Recognize past participles in context', 'Finish the course with confidence'],
    grammar: GRAM.l123, vocabulary: VOC.l123,
    pools: { lt: [...l123Lt, ...CAP_SAFETY], fill: l123Fills, order: l123Orders, mc: l123Mc },
  },
];

export function buildAll() {
  let total = 0;
  for (const c of CFG) total += build(c);
  return { section: 'capstone', lessons: CFG.length, exercises: total };
}
