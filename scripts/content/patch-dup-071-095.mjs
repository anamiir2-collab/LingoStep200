/* Patches bank JSONs to remove cross-lesson duplicate sentences.
 * Each replacement is topic-appropriate, A2, with correct MSA Arabic.
 * Entries that carried an `alt` receive a replacement with an `alt`.
 * Run: node scripts/content/patch-dup-071-095.mjs  */
import fs from 'node:fs';

const DIR = 'scripts/content/banks/food-services';
const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');

/* [lessonId, kind, index, newEntry] — newEntry replaces the matched one */
const PATCHES = [
  ['lesson-071', 'fb', 0, { display: 'The ___ of the day is lentil.', blank: 'soup', en: 'The soup of the day is lentil.', ar: 'شوربة اليوم هي العدس.' }],
  ['lesson-071', 'wo', 2, { en: 'Is the soup included with the meal?', ar: 'هل الحساء مشمول مع الوجبة؟' }],
  ['lesson-071', 'fb', 4, { display: 'I will ___ the chicken soup.', blank: 'have', en: 'I will have the chicken soup.', ar: 'سآخذ حساء الدجاج.' }],
  ['lesson-071', 'lt', 36, { en: 'Your table is ready now.', ar: 'طاولتك جاهزة الآن.' }],

  ['lesson-073', 'wo', 0, { en: 'Can we split the bill?', ar: 'هل يمكننا تقسيم الحساب؟' }],

  ['lesson-074', 'lt', 4, { en: 'I need two bottles of cooking oil.', ar: 'أحتاج زجاجتين من زيت الطهي.' }],
  ['lesson-074', 'lt', 9, { en: "She doesn't shop on Fridays.", alt: 'She does not shop on Fridays.', ar: 'لا تتسوق أيام الجمعة.' }],
  ['lesson-074', 'fb', 2, { display: 'The eggs are ___ the top shelf.', blank: 'on', en: 'The eggs are on the top shelf.', ar: 'البيض على الرف العلوي.' }],
  ['lesson-074', 'wo', 2, { en: 'This milk is past its expiry date.', ar: 'هذا الحليب تجاوز تاريخ الصلاحية.' }],

  ['lesson-075', 'lt', 2, { en: 'This shirt comes in three colors.', ar: 'هذا القميص متوفر بثلاثة ألوان.' }],
  ['lesson-075', 'lt', 9, { en: "These jeans don't fit me well.", alt: 'These jeans do not fit me well.', ar: 'هذا الجينز لا يناسبني جيدًا.' }],
  ['lesson-075', 'wo', 1, { en: 'Where are the changing rooms?', ar: 'أين غرف القياس؟' }],
  ['lesson-075', 'fb', 2, { display: 'This dress is ___ small for me.', blank: 'too', en: 'This dress is too small for me.', ar: 'هذا الفستان صغير جدًا عليّ.' }],
  ['lesson-075', 'lt', 21, { en: 'Cash refunds take five working days.', ar: 'يستغرق استرداد النقد خمسة أيام عمل.' }],

  ['lesson-077', 'lt', 37, { en: 'Bring the item in its original box.', ar: 'أحضر القطعة في علبتها الأصلية.' }],
  ['lesson-077', 'lt', 33, { en: 'Please keep the tag on the item.', ar: 'من فضلك أبقِ البطاقة على القطعة.' }],
  ['lesson-077', 'lt', 15, { en: 'You can exchange it for store credit.', ar: 'يمكنك استبداله برصيد في المتجر.' }],

  ['lesson-078', 'lt', 0, { en: 'Is the price open to negotiation?', ar: 'هل السعر قابل للتفاوض؟' }],
  ['lesson-078', 'lt', 1, { en: "He isn't happy with the final price.", alt: 'He is not happy with the final price.', ar: 'هو غير راضٍ عن السعر النهائي.' }],

  ['lesson-079', 'lt', 41, { en: 'Your order confirmation is in your email.', ar: 'تأكيد طلبك في بريدك الإلكتروني.' }],

  ['lesson-080', 'lt', 15, { en: 'Express shipping arrives within two days.', ar: 'الشحن السريع يصل خلال يومين.' }],
  ['lesson-080', 'lt', 35, { en: 'The courier left the box with the neighbor.', ar: 'ترك مندوب التوصيل الصندوق عند الجار.' }],
  ['lesson-080', 'lt', 30, { en: 'Please leave the package at the door.', ar: 'من فضلك اترك الطرد عند الباب.' }],
  ['lesson-080', 'lt', 24, { en: 'The order arrived damaged.', ar: 'وصل الطلب تالفًا.' }],

  ['lesson-081', 'lt', 36, { en: 'Do you have anything for a cough?', ar: 'هل لديكم شيء للكحة؟' }],
  ['lesson-081', 'fb', 2, { display: 'This ___ is for the pain.', blank: 'cream', en: 'This cream is for the pain.', ar: 'هذا الكريم للآلام.' }],
  ['lesson-081', 'lt', 20, { en: 'Do these drops need a prescription?', ar: 'هل تحتاج هذه القطرات إلى وصفة طبية؟' }],
  ['lesson-081', 'lt', 6, { en: 'Can I take these pills together?', ar: 'هل يمكنني تناول هذه الحبوب معًا؟' }],
  ['lesson-081', 'wo', 2, { en: 'Read the label before you start.', ar: 'اقرأ الملصق قبل أن تبدأ.' }],
  ['lesson-081', 'lt', 39, { en: 'The prescription is ready for pickup.', ar: 'الوصفة الطبية جاهزة للاستلام.' }],

  ['lesson-082', 'lt', 0, { en: 'I would like a haircut, please.', ar: 'أريد قص شعري من فضلك.' }],

  ['lesson-083', 'lt', 11, { en: 'Your laundry will be ready on Friday.', alt: 'Your washing will be ready on Friday.', ar: 'سيكون غسيلك جاهزًا يوم الجمعة.' }],

  ['lesson-084', 'fb', 4, { display: 'The washing machine is ___ again.', blank: 'broken', en: 'The washing machine is broken again.', ar: 'الغسالة معطلة مرة أخرى.' }],
  ['lesson-084', 'lt', 40, { en: 'When can you come to fix it?', ar: 'متى يمكنك القدوم لإصلاحه؟' }],

  ['lesson-085', 'lt', 10, { en: 'The product stopped working after a week.', ar: 'توقف المنتج عن العمل بعد أسبوع.' }],
  ['lesson-085', 'lt', 28, { en: 'Our agent will call you back soon.', ar: 'سيتصل بك أحد موظفينا قريبًا.' }],
  ['lesson-085', 'fb', 0, { display: 'The customer ___ was very helpful.', blank: 'service', en: 'The customer service was very helpful.', ar: 'كانت خدمة العملاء مفيدة جدًا.' }],
  ['lesson-085', 'lt', 4, { en: 'Is there anything else I can do?', ar: 'هل هناك شيء آخر يمكنني فعله؟' }],
  ['lesson-085', 'lt', 7, { en: 'Do you have your account number handy?', alt: 'Have you got your account number handy?', ar: 'هل رقم حسابك متوفر لديك؟' }],

  ['lesson-086', 'wo', 0, { en: 'This is the third time I am calling.', ar: 'هذه هي المرة الثالثة التي أتصل فيها.' }],
  ['lesson-086', 'lt', 27, { en: 'I am not happy with this product.', ar: 'لست سعيدًا بهذا المنتج.' }],
  ['lesson-086', 'lt', 32, { en: 'Please check the order number again.', ar: 'من فضلك تحقق من رقم الطلب مرة أخرى.' }],

  ['lesson-087', 'lt', 22, { en: 'Please bring your ID card with you.', ar: 'من فضلك أحضر بطاقة هويتك معك.' }],

  ['lesson-088', 'lt', 39, { en: 'Enter your PIN on the keypad.', ar: 'أدخل الرمز السري على لوحة المفاتيح.' }],
  ['lesson-088', 'lt', 36, { en: 'I transfer money to my savings every month.', ar: 'أحوّل المال إلى حساب التوفير كل شهر.' }],

  ['lesson-089', 'lt', 26, { en: 'Do you sell envelopes here?', ar: 'هل تبيعون أظرفة هنا؟' }],
  ['lesson-089', 'lt', 22, { en: 'Please write the zip code clearly.', ar: 'من فضلك اكتب الرمز البريدي بوضوح.' }],

  ['lesson-090', 'fb', 1, { display: 'My passport ___ next month.', blank: 'expires', en: 'My passport expires next month.', ar: 'ينتهي جواز سفري الشهر القادم.' }],
  ['lesson-090', 'lt', 24, { en: 'The office opens at eight in the morning.', ar: 'يفتح المكتب في الثامنة صباحًا.' }],

  ['lesson-091', 'lt', 25, { en: 'The pool closes at ten at night.', ar: 'يُغلق مسبح الصالة في العاشرة ليلاً.' }],

  ['lesson-092', 'lt', 8, { en: 'Are there any discounts for students?', ar: 'هل هناك خصومات للطلاب؟' }],
  ['lesson-092', 'fb', 3, { display: 'Two tickets ___ the late show, please.', blank: 'for', en: 'Two tickets for the late show, please.', ar: 'تذكرتان للعرض المتأخر من فضلك.' }],

  ['lesson-094', 'lt', 14, { en: 'Is this wrap spicy?', ar: 'هل هذه اللفة حارة؟' }],
  ['lesson-094', 'fb', 4, { display: 'Add extra ___ to my sandwich, please.', blank: 'sauce', en: 'Add extra sauce to my sandwich, please.', ar: 'أضف صلصة إضافية إلى شطيرتي من فضلك.' }],
  ['lesson-094', 'wo', 3, { en: 'Two falafel wraps, please.', ar: 'لفّتا فلافل من فضلك.' }],

  ['lesson-095', 'wo', 3, { en: 'Where is the customer service desk?', ar: 'أين مكتب خدمة العملاء؟' }],
];

/* collect ALL existing sentences from other banks + pre-existing lessons for uniqueness check */
const existing = new Set();
for (const f of fs.readdirSync(DIR)) {
  const b = JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8'));
  const mine = f.replace('.json', '');
  for (const [id, , , ne] of PATCHES) {
    if (id === mine) continue;
  }
  const sents = [...b.lt.map((x) => x.en), ...b.lt.map((x) => x.alt).filter(Boolean), ...b.fb.map((x) => x.en), ...b.wo.map((x) => x.en)];
  for (const s of sents) existing.add(norm(s));
}

/* apply */
const byLesson = new Map();
for (const [id, kind, idx, ne] of PATCHES) {
  if (!byLesson.has(id)) byLesson.set(id, []);
  byLesson.get(id).push({ kind, idx, ne });
}

for (const [id, list] of byLesson) {
  const path = `${DIR}/${id}.json`;
  const bank = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const { kind, idx, ne } of list) {
    const old = bank[kind][idx];
    if (old.alt && !ne.alt) throw new Error(`${id} ${kind}[${idx}]: old had alt, replacement must too`);
    if (existing.has(norm(ne.en))) { console.error(`COLLISION ${id} ${kind}[${idx}]: ${ne.en}`); continue; }
    bank[kind][idx] = ne;
  }
  fs.writeFileSync(path, JSON.stringify(bank, null, 2) + '\n');
  console.log(`patched ${id} (${list.length})`);
}
console.log('DONE (check COLLISION lines above)');
