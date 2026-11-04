/* v4: extends ONLY gen-listening SAFETY with fresh rows. */
import { readFileSync, writeFileSync } from 'fs';

const EXTRA = {
  'scripts/content/gen-listening.js': [
    ['The slow announcer repeated the platform twice.', 'كرر المعلن البطيء الرصيف مرتين.', 2],
    ['A red underline marks every spelling slip.', 'يشير الخط الأحمر إلى كل خطأ إملائي.', 2],
    ['Write the numbers in words, not digits.', 'اكتب الأرقام كلمات لا أرقاما.', 2],
    ['The voice note arrived at half past six.', 'وصلت الرسالة الصوتية في السادسة والنصف.', 2],
    ['Capital letters open every proper name.', 'الحروف الكبيرة تبدأ كل اسم علم.', 1],
    ['The comma before and is optional here.', 'الفاصلة قبل and اختيارية هنا.', 2],
    ['Apostrophes shrink two words into one.', 'تدمج الفاصلة العليا كلمتين في واحدة.', 2],
    ['My dictation score doubled in a month.', 'تضاعفت نتيجة إملائي في شهر.', 2],
    ['The paragraph ends with a strong closing line.', 'تنتهي الفقرة بخاتمة قوية.', 2],
    ['Read your sentence back before moving on.', 'أعد قراءة جملتك قبل المتابعة.', 2],
    ['The audio player repeats after a pause.', 'يعيد المشغل التشغيل بعد توقف قصير.', 2],
    ['Write small notes during the phone call.', 'اكتب ملاحظات صغيرة أثناء المكالمة.', 2],
    ['Every email starts with a polite greeting.', 'تبدأ كل رسالة بتحية مهذبة.', 2],
    ['The subject line says everything briefly.', 'يقول سطر الموضوع كل شيء بإيجاز.', 2],
    ['Short sentences are easier to check.', 'الجمل القصيرة أسهل في التدقيق.', 1],
    ['The error was a missing capital B.', 'كان الخطأ حرف B الكبير الناقص.', 2],
    ['Practice numbers until they sound natural.', 'تدرب على الأرقام حتى تبدو طبيعية.', 2],
    ['The recipe lists five simple steps.', 'تسرد الوصفة خمس خطوات بسيطة.', 2],
    ['Two words swapped places by mistake.', 'تبادلت كلمتان مكانيهما بالخطأ.', 2],
    ['Order the words the way people speak.', 'رتب الكلمات كما يتحدث الناس.', 2],
    ['The last word takes the final period.', 'تأخذ الكلمة الأخيرة النقطة النهائية.', 1],
    ['A question ends with a question mark.', 'ينتهي السؤال بعلامة استفهام.', 1],
    ['The message fits in one short line.', 'تلائم الرسالة سطرا قصيرا واحدا.', 1],
    ['Correct the verb, keep the meaning.', 'صحح الفعل واحفظ المعنى.', 2],
    ['The second draft is always better.', 'المسودة الثانية أفضل دائما.', 2],
    ['Names and cities wear capital hats.', 'تلبس الأسماء والمدن قبعات حروف كبيرة.', 1],
    ['The recording says the street name twice.', 'يقول التسجيل اسم الشارع مرتين.', 2],
    ['Type exactly what the voice says.', 'اكتب بالضبط ما تقوله الصوت.', 1],
    ['The checklist caught three small errors.', 'التقطت قائمة التدقيق ثلاثة أخطاء صغيرة.', 2],
    ['Good notes save forgetful minds.', 'الملاحظات الجيدة تنقذ العقول الناسية.', 2],
    ['The signature line comes last.', 'يأتي سطر التوقيع أخيرا.', 1],
    ['A quick review beats a long cram.', 'المراجعة السريعة أفضل من الحفظ المكثف الطويل.', 2],
    ['The bell rings; the lesson summary begins.', 'يقرع الجرس؛ يبدأ ملخص الدرس.', 2],
    ['Spelling bees train careful listeners.', 'مسابقات الإملاء تدرب المستمعين الدقيقين.', 2],
    ['The pen pauses at every punctuation mark.', 'يتوقف القلم عند كل علامة ترقيم.', 2],
    ['Your typed answer matched the audio exactly.', 'طابقت إجابتك المكتوبة التسجيل تماما.', 2],
    ['The calendar reminder says Thursday, not Tuesday.', 'يقول تذكير التقويم الخميس لا الثلاثاء.', 2],
    ['Rewrite the sentence with better word order.', 'أعد كتابة الجملة بترتيب كلمات أفضل.', 2],
    ['The invitation card used formal language.', 'استخدمت بطاقة الدعوة لغة رسمية.', 2],
    ['Daily ten-minute sessions build strong ears.', 'جلسات العشر دقائق اليومية تبني آذانا قوية.', 2],
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
