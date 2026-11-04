/* Extends the SAFETY pools of three generators with distinctive rows. */
import { readFileSync, writeFileSync } from 'fs';

const EXTRA = {
  'scripts/content/gen-grammar.js': [
    ['The answer key hides behind the small cupboard.', 'مفتاح الإجابة مخبأ خلف الخزانة الصغيرة.', 2],
    ['Purple umbrellas rarely argue with winter.', 'المظالب البنفسجية نادرا ما تجادل الشتاء.', 2],
    ['Seven clever owls rehearsed the alphabet quietly.', 'تدربت سبع بومات ذكية على الأبجدية بهدوء.', 2],
    ['A brave carpenter measured the dancing floor twice.', 'قاس نجار شجاع أرضية الرقص مرتين.', 2],
    ['The gentle librarian fixed the noisy printer.', 'أصلحت أمينة المكتبة اللطيفة الطابعة الصاخبة.', 2],
    ['Twelve green kites rested above the old ladder.', 'استقرت اثنتا عشرة طائرة ورقية خضراء فوق السلم القديم.', 2],
    ['My grandmother\u2019s teapot collects strange stamps.', 'يجمع إبريق شاي جدتي طوابع غريبة.', 2],
    ['The sleepy river whispered to the wooden bridge.', 'همس النهر النائم إلى الجسر الخشبي.', 2],
    ['Bright yellow taxis avoid the quiet museum street.', 'تتجنب سيارات الأجرة الصفراء اللامعة شارع المتحف الهادئ.', 2],
    ['The curious pilot painted his kitchen orange.', 'طلى الطيار الفضولي مطبخه باللون البرتقالي.', 2],
    ['A patient photographer adopted three playful kittens.', 'تبنى مصور صبور ثلاثة قطط لاعبة.', 2],
    ['The tall clock tower hums an old melody.', 'يغني برج الساعة الشاهق لحنا قديما.', 2],
    ['Honest replies build stronger bridges than gifts.', 'الردود الصادقة تبني جسورا أقوى من الهدايا.', 2],
    ['The kitchen window remembers every sunrise.', 'تتذكر نافذة المطبخ كل شروق شمس.', 2],
    ['Two sleepy guards shared warm bread at midnight.', 'تشارك حارسان نائمان خبزا دافئا في منتصف الليل.', 2],
    ['The blue notebook hides a paper zoo.', 'يخفي الدفتر الأزرق حديقة حيوان ورقية.', 2],
    ['Autumn leaves practice their slow dance daily.', 'تتدرب أوراق الخريف على رقصتها البطيئة يوميا.', 2],
    ['The tiny key opened more than one door.', 'فتح المفتاح الصغير أكثر من باب واحد.', 2],
    ['Our street\u2019s only lamppost tells wonderful stories.', 'يحكي عمود إنارة شارعنا الوحيد قصصا رائعة.', 2],
    ['The gardener counted every new leaf with pride.', 'عدّ البستاني كل ورقة جديدة بفخر.', 2],
  ],
  'scripts/content/gen-practical.js': [
    ['The ticket machine accepts coins near gate nine.', 'تقبل آلة التذاكر القطع المعدنية قرب البوابة التاسعة.', 2],
    ['Your cabin key opens deck four.', 'مفتاح كابينتك يفتح السطح الرابع.', 2],
    ['The pharmacy on campus closes after prayers.', 'تغلق صيدلية الحرم الجامعي بعد الصلاة.', 2],
    ['Please validate your parking ticket downstairs.', 'من فضلك فعّل تذكرة وقوفك في الطابق الأسفل.', 2],
    ['The consulate opens appointments at nine sharp.', 'يفتح القنصلية المواعيد في التاسعة تماما.', 2],
    ['Our flight now departs from gate B17.', 'تقلع رحلتنا الآن من البوابة B17.', 2],
    ['The hotel shuttle leaves every thirty minutes.', 'تغادر حافلة الفندق كل ثلاثين دقيقة.', 2],
    ['Room service answers twenty-four hours.', 'ترد خدمة الغرف على مدار الساعة.', 2],
    ['Please place laptops in the separate tray.', 'من فضلك ضع الحواسيب في السلة المنفصلة.', 2],
    ['The customs officer stamped both passports.', 'ختم موظف الجمارك كلا جوازي السفر.', 2],
    ['Your seat row is twelve, seat C.', 'صف مقعدك هو الثاني عشر، والمقعد C.', 2],
    ['The boarding announcement echoes twice.', 'يتردد صوت إعلان الصعود مرتين.', 2],
    ['Please claim your baggage at carousel five.', 'من فضلك استلم أمتعتك من السير الناقل الخامس.', 2],
    ['The train to Alexandria leaves from platform three.', 'يغادر قطار الإسكندرية من الرصيف الثالث.', 2],
    ['The receipt printer is out of paper again.', 'نفدت ورقة طابعة الإيصالات مرة أخرى.', 2],
    ['Please rate your visit on the small screen.', 'من فضلك قيم زيارتك على الشاشة الصغيرة.', 2],
    ['The fire exit is behind the kitchen door.', 'مخرج الطوارئ خلف باب المطبخ.', 2],
    ['The elevator inspection is due next week.', 'فحص المصعد مستحق الأسبوع القادم.', 2],
    ['Cash payments go to window two only.', 'الدفعات النقدية للنافذة الثانية فقط.', 2],
    ['The night guard checks every floor twice.', 'يفحص الحارس الليلي كل طابق مرتين.', 2],
  ],
  'scripts/content/gen-vocabulary.js': [
    ['A curious fox borrowed the farmer\u2019s ladder.', 'استعار ثعلب فضولي سلم المزارع.', 2],
    ['The old violin kept one broken string.', 'احتفظ الكمان القديم بوتر مكسور واحد.', 2],
    ['Seven lanterns floated above the sleepy harbor.', 'طفيت سبع فوانيس فوق الميناء النائم.', 2],
    ['The midnight train carries only letters.', 'ينقل قطار منتصف الليل الرسائل فقط.', 2],
    ['A gentle giant guarded the honey jars.', 'حرس عملاق لطيف أواني العسل.', 2],
    ['The paper crane collected morning dew.', 'جمع طائر الكركي الورقي ندى الصباح.', 2],
    ['Her grandfather\u2019s compass always pointed home.', 'كانت بوصلة جدها تشير إلى البيت دائما.', 2],
    ['The brass teapot whistles before storms.', 'تتصافح إبريقة النحاس قبل العواصف.', 2],
    ['Snow painted the village roofs silver.', 'طلت الثلوج أسطح القرية باللون الفضي.', 2],
    ['The lighthouse keeper planted mint by the door.', 'زرع حارس المنارة النعناع قرب الباب.', 2],
    ['A shy moon peeked between two clouds.', 'ألقى قمر خجول نظرة بين سحابتين.', 2],
    ['The camel cart carried painted pots.', 'حملت عربة الجمل فخارا ملونا.', 2],
    ['Grandmother\u2019s recipe box smells of cinnamon.', 'تفوح من صندوق وصفات الجدة رائحة القرفة.', 2],
    ['The wooden horse remembers every parade.', 'يتذكر الحصان الخشبي كل استعراض.', 2],
    ['Rain drums a soft song on the awning.', 'تقرع الأمطار أغنية رقيقة على المظلة.', 2],
    ['The quiet clockmaker repaired time itself.', 'أصلح صانع الساعات الهادئ الزمن ذاته.', 2],
    ['A copper coin rolled under the bench.', 'تدحرجت عملة نحاسية تحت المقعد.', 2],
    ['The mountain path wears a green ribbon.', 'يرتدي درب الجبل شريطا أخضر.', 2],
    ['Two sparrows argued over one breadcrumb.', 'تجادل عصفوران على فتحة خبز واحدة.', 2],
    ['The harbor bell counts the evening waves.', 'يعد جرس الميناء أمواج المساء.', 2],
  ],
};

for (const [file, rows] of Object.entries(EXTRA)) {
  let src = readFileSync(file, 'utf8');
  const s = src.indexOf('const SAFETY = T(');
  const e = src.indexOf('\n\nconst CFG', s);
  if (s < 0 || e < 0) throw new Error(`SAFETY block not found in ${file}`);
  const inner = src.slice(s + 'const SAFETY = T('.length, e);
  const commaIdx = inner.indexOf('], ');
  if (commaIdx < 0) throw new Error(`cannot split tag/rows in ${file}`);
  const tagLiteral = inner.slice(0, commaIdx + 1);
  const jsonish = inner.slice(commaIdx + 2).replace(/\);\s*$/, '');
  const existing = Function(`"use strict"; return (${jsonish});`)();
  const merged = existing.concat(rows);
  src = src.slice(0, s) + `const SAFETY = T(${tagLiteral}, ${JSON.stringify(merged).replace(/"/g, "'")})` + src.slice(e);
  writeFileSync(file, src);
  console.log(`${file}: SAFETY extended to ${merged.length} rows`);
}
