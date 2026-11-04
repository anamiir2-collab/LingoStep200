/* v3: extends ONLY gen-vocabulary SAFETY with fresh rows. */
import { readFileSync, writeFileSync } from 'fs';

const EXTRA = {
  'scripts/content/gen-vocabulary.js': [
    ['A brass key sleeps under the third tile.', 'ينام مفتاح نحاسي تحت البلاطة الثالثة.', 2],
    ['The museum cat inspects every new frame.', 'يفحص قط المتحف كل إطار جديد.', 2],
    ['A paper boat sailed across the puddle.', 'أبحر قارب ورقي عبر بركة الماء.', 2],
    ['The bazaar sells star-shaped sweets on Fridays.', 'يبيع السوق حلوى على شكل نجوم أيام الجمعة.', 2],
    ['Her sketchbook smells of rain and pencils.', 'تفوح من دفتر رسمها رائحة المطر والأقلام.', 2],
    ['Two turtles attended the garden meeting.', 'حضرت سلحفاوتان اجتماع الحديقة.', 2],
    ['The bakery numbered its bread baskets.', 'رقمت المخبز سلال خبزها.', 2],
    ['A tiny ladder leans against the bookshelf.', 'يتكئ سلم صغير على رف الكتب.', 2],
    ['The ferry whistle greets the fishing boats.', 'يحيي صفير العبارة قوارب الصيد.', 2],
    ['Grandfather\u2019s radio hums from another decade.', 'يهمس راديو الجد من عقد آخر.', 2],
    ['The sandcastle wore a shell crown.', 'ارتدت قلعة الرمل تاجا من الأصداف.', 2],
    ['A kite sighs when the wind rests.', 'يتنهد الطائرة الورقية حين تستريح الريح.', 2],
    ['The pomegranate tree keeps our secrets.', 'تحفظ شجرة الرمان أسرارنا.', 2],
    ['Blue chalk draws better on warm afternoons.', 'يرسم الطباشير الأزرق بشكل أفضل بعد الظهر الدافئ.', 2],
    ['The doorbell sings two different notes.', 'يغني جرس الباب نغمتين مختلفتين.', 2],
    ['Our balcony garden votes for spring.', 'تصوت حديقة شرفتنا للربيع.', 2],
    ['The tailor measured midnight by candlelight.', 'قاس الخياط منتصف الليل على ضوء الشمعة.', 2],
    ['A postcard arrived without an address.', 'وصلت بطاقة بريدية دون عنوان.', 2],
    ['The chess club meets behind the library.', 'يجتمع نادي الشطرنج خلف المكتبة.', 2],
    ['Orange paint waits for the garden wall.', 'ينتظر الطلاء البرتقالي جدار الحديقة.', 2],
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
  const jsonish = inner.slice(commaIdx + 2).replace(/\)+\s*$/, '');
  const existing = Function(`"use strict"; return (${jsonish});`)();
  const merged = existing.concat(rows);
  src = src.slice(0, s) + `const SAFETY = T(${tagLiteral}, ${JSON.stringify(merged).replace(/"/g, "'")});` + src.slice(e);
  writeFileSync(file, src);
  console.log(`${file}: SAFETY extended to ${merged.length} rows`);
}
