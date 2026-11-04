/* v5: extends ONLY gen-listening SAFETY with another 50 fresh rows. */
import { readFileSync, writeFileSync } from 'fs';

const EXTRA = {
  'scripts/content/gen-listening.js': [
    ['TheDictation notebook fills with careful lines.', 'يمتلئ دفتر الإملاء بخطوط متقنة.', 2],
    ['Tuesday lesson starts exactly at half past four.', 'يبدأ درس الثلاثاء تماما في الرابعة والنصف.', 2],
    ['The microphone picks up every whispered word.', 'يلتقط الميكروفون كل كلمة مهموسة.', 2],
    ['Slow the recording and hear the ending clearly.', 'أبطئ التسجيل واسمع النهاية بوضوح.', 2],
    ['The corrected copy earned a small star.', 'حصلت النسخة المصححة على نجمة صغيرة.', 2],
    ['Write the appointment in your weekly planner.', 'اكتب الموعد في مخططك الأسبوعي.', 2],
    ['Numbers sound different at fast speed.', 'تبدو الأرقام مختلفة بالسرعة العالية.', 2],
    ['The new paragraph begins after the greeting.', 'تبدأ الفقرة الجديدة بعد التحية.', 2],
    ['Check the spelling of both long words.', 'تحقق من إملاء الكلمتين الطويلتين.', 2],
    ['The postcard message fits three lines.', 'تلائم رسالة البطاقة ثلاثة أسطر.', 2],
    ['Underline the auxiliary in each question.', 'ضع خطا تحت الفعل المساعد في كل سؤال.', 2],
    ['The city name needs a capital N.', 'يحتاج اسم المدينة حرف N كبيرا.', 2],
    ['Dictation mixes listening and writing skills.', 'يمزج الإملاء مهارتي الاستماع والكتابة.', 2],
    ['The busy street appears twice in the story.', 'يظهر الشارع المزدحم مرتين في القصة.', 2],
    ['Rewrite the note with clearer handwriting.', 'أعد كتابة الملاحظة بخط أوضح.', 2],
    ['The opening line greets the reader warmly.', 'يحيي السطر الافتتاحي القارئ بدفء.', 2],
    ['The recording stopped after the third sentence.', 'توقف التسجيل بعد الجملة الثالثة.', 2],
    ['Swap those two words to fix the order.', 'بدل مكان الكلمتين لتصحيح الترتيب.', 2],
    ['A tidy page shows a careful writer.', 'الصفحة المرتبة تكتب عن كاتب متقن.', 2],
    ['The lesson ends with a mixed review.', 'ينتهي الدرس بمراجعة مشتركة.', 2],
    ['Question marks look small but matter.', 'تبدو علامات الاستفهام صغيرة لكنها مهمة.', 2],
    ['The signature reads yours sincerely.', 'يقرأ التوقيع بأخلص التحيات.', 2],
    ['The slow version clarifies the numbers.', 'وضح الإصدار البطيء الأرقام.', 2],
    ['Type the sentence without extra spaces.', 'اكتب الجملة دون مسافات زائدة.', 2],
    ['The writer corrected two small typos.', 'صحح الكاتب خطأين مطبعيين صغيرين.', 2],
    ['The word ends with a silent letter.', 'تنتهي الكلمة بحرف صامت.', 2],
    ['Review yesterday notes before the quiz.', 'راجع ملاحظات الأمس قبل الاختبار القصير.', 2],
    ['The draft had one missing full stop.', 'كان في المسودة نقطة نهاية ناقصة.', 2],
    ['Listen first, write second, check third.', 'استمع أولًا، اكتب ثانيًا، دقق ثالثًا.', 1],
    ['The room number sounds like fourteen.', 'يبدو رقم الغرفة مثل أربعة عشر.', 2],
    ['Capital M marks the start of Monday.', 'يبدأ حرف M الكبير كلمة الاثنين.', 1],
    ['The list uses commas between items.', 'تستخدم القائمة فواصل بين العناصر.', 2],
    ['My typed line matched the recording perfectly.', 'طابقت سطري المكتوب التسجيل بشكل تام.', 2],
    ['The greeting line takes a comma after it.', 'تأخذ سطر التحية فاصلة بعده.', 2],
    ['Writing slowly improves letter shapes.', 'الكتابة البطيئة تحسن أشكال الحروف.', 2],
    ['The audio repeats numbers twice on purpose.', 'يعيد التسجيل الأرقام مرتين بقصد.', 2],
    ['One apostrophe changes the whole meaning.', 'فاصلة عليا واحدة تغير المعنى كله.', 2],
    ['The reviewer circled the weak sentence.', 'ضع دائرة المراجع حول الجملة الضعيفة.', 2],
    ['Practice names of streets and stations.', 'تدرب على أسماء الشوارع والمحطات.', 2],
    ['The final sentence summarized the paragraph.', 'لخصت الجملة الأخيرة الفقرة.', 2],
    ['Short dictation builds long concentration.', 'الإملاء القصير يبني تركيزا طويلا.', 2],
    ['The keyboard waited for corrected words.', 'انتظرت لوحة المفاتيح الكلمات المصححة.', 2],
    ['Replace the weak verb with a stronger one.', 'استبدل الفعل الضعيف بأقوى منه.', 2],
    ['The time on the ticket says half past nine.', 'يقول الوقت على التذكرة التاسعة والنصف.', 2],
    ['Every capital letter starts a new sentence.', 'يبدأ كل حرف كبير جملة جديدة.', 1],
    ['The message board displays short notes.', 'تعرض لوحة الرسائل ملاحظات قصيرة.', 2],
    ['Slow typing gives careful fingers time.', 'الطباعة البطيئة تمنح الأصابع الحذرة وقتا.', 2],
    ['The paragraph plan fits one line.', 'تلائم خطة الفقرة سطرا واحدا.', 2],
    ['Check the apostrophe in the second word.', 'تحقق من الفاصلة العليا في الكلمة الثانية.', 2],
    ['The morning session reviews all seven rules.', 'تراجع جلسة الصباح القواعد السبع كلها.', 2],
  ],
};

for (const [file, rows] of Object.entries(EXTRA)) {
  let src = readFileSync(file, 'utf8');
  const s = src.indexOf('const SAFETY = T(');
  const e = src.indexOf('\n\nconst CFG', s);
  if (s < 0 || e < 0) throw new Error(`SAFETY block not found in ${file}`);
  const inner = src.slice(s + 'const SAFETY = T('.length, e);
  const tagMatch = inner.match(/^\[[^\]]*\], /);
  if (!tagMatch) throw new Error(`cannot split tag/rows in ${file}`);
  const tagLiteral = tagMatch[0].slice(0, -2);
  const jsonish = inner.slice(tagMatch[0].length).replace(/[\)\;]+\s*$/, '');
  const existing = Function(`"use strict"; return (${jsonish});`)();
  const merged = existing.concat(rows);
  src = src.slice(0, s) + `const SAFETY = T(${tagLiteral}, ${JSON.stringify(merged).replace(/"/g, "'")});` + src.slice(e);
  writeFileSync(file, src);
  console.log(`${file}: SAFETY extended to ${merged.length} rows`);
}
