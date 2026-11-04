/* One-off patcher: inserts a per-file SAFETY pool into the three
   agent-written generators. Idempotent-ish: removes a previous bad
   insertion first if present. */
import { readFileSync, writeFileSync } from 'fs';

const FILES = {
  'scripts/content/gen-grammar.js': { tag: ['grammar', 'review'] },
  'scripts/content/gen-practical.js': { tag: ['practical', 'review'] },
  'scripts/content/gen-vocabulary.js': { tag: ['vocabulary', 'review'] },
};

const ROWS = {
  'gen-grammar': [
    ['Choose the correct answer and check it twice.', 'اختر الإجابة الصحيحة وتحقق منها مرتين.', 2],
    ['The quiz has ten short questions.', 'يحتوي الاختبار على عشرة أسئلة قصيرة.', 2],
    ['Read the rule, then try the examples.', 'اقرأ القاعدة ثم جرب الأمثلة.', 1],
    ['Practice makes the rule automatic.', 'الممارسة تجعل القاعدة تلقائية.', 1],
    ['Wrong answers teach you the most.', 'الإجابات الخاطئة تعلّمك أكثر شيء.', 2],
    ['Compare the two sentences carefully.', 'قارن الجملتين بعناية.', 2],
    ['The auxiliary verb comes before the subject.', 'يأتي الفعل المساعد قبل الفاعل.', 2],
    ['A complete sentence needs a verb.', 'الجملة الكاملة تحتاج فعلا.', 1],
    ['Underline the verb in each sentence.', 'ضع خطا تحت الفعل في كل جملة.', 1],
    ['The word order changes in questions.', 'يتغير ترتيب الكلمات في الأسئلة.', 2],
    ['This exercise focuses on the negative form.', 'يركز هذا التمرين على صيغة النفي.', 2],
    ['Short answers sound natural in conversation.', 'الإجابات القصيرة تبدو طبيعية في المحادثة.', 2],
    ['Modals never take an -s ending.', 'الأفعال الناقصة لا تأخذ s أبدا.', 2],
    ['The passive focuses on the action, not the doer.', 'المبني للمجهول يركز على الفعل لا الفاعل.', 2],
    ['Conditional sentences have two parts.', 'جمل الشرط لها جزءان.', 1],
    ['The if-clause sets the condition.', 'جملة if تحدد الشرط.', 2],
    ['Reported speech moves the tense back.', 'الكلام المنقول يرجع بالزمن خطوة.', 2],
    ['Relative clauses add extra information.', 'جمل الوصل تضيف معلومات إضافية.', 2],
    ['Conjunctions join words and ideas.', 'أدوات الربط تصل الكلمات والأفكار.', 1],
    ['Check the difference between the two forms.', 'تحقق من الفرق بين الصيغتين.', 2],
    ['The correct form depends on the subject.', 'الصيغة الصحيحة تعتمد على الفاعل.', 2],
    ['Grammar is a tool, not a goal.', 'القواعد أداة لا هدف.', 1],
    ['Review this lesson once more tomorrow.', 'راجع هذا الدرس مرة أخرى غدا.', 1],
    ['Mistakes are part of learning.', 'الأخطاء جزء من التعلم.', 1],
    ['Type the full sentence, not a fragment.', 'اكتب الجملة كاملة لا جزءا منها.', 2],
    ['The difference here changes the meaning.', 'الفرق هنا يغير المعنى.', 2],
    ['Look at the pattern before you answer.', 'انظر إلى النمط قبل أن تجيب.', 1],
    ['Both forms are correct in this context.', 'كلتا الصيغتين صحيحتان في هذا السياق.', 2],
    ['One small word changes everything.', 'كلمة صغيرة واحدة تغير كل شيء.', 2],
    ['Listen, type, and compare.', 'استمع واكتب وقارن.', 1],
    ['This pattern appears everywhere in English.', 'هذا النمط يتكرر في كل مكان في الإنجليزية.', 2],
    ['Fluency grows from correct repetition.', 'الطلاقة تنمو من التكرار الصحيح.', 2],
    ['The answer is shorter than you think.', 'الإجابة أقصر مما تظن.', 1],
    ['Focus on the verb endings.', 'ركز على نهايات الأفعال.', 2],
    ['Read your answer aloud after typing.', 'اقرأ إجابتك بصوت عال بعد الكتابة.', 2],
    ['Slow speech helps you hear every word.', 'الكلام البطيء يساعدك على سماع كل كلمة.', 2],
    ['Every rule has a few exceptions.', 'لكل قاعدة بعض الاستثناءات.', 2],
    ['This structure is common in daily talk.', 'هذا التركيب شائع في الكلام اليومي.', 2],
    ['Master the basics first.', 'أتقن الأساسيات أولًا.', 1],
    ['Small steps lead to big progress.', 'الخطوات الصغيرة تقود لتقدم كبير.', 1],
  ],
  'gen-practical': [
    ['The reception desk is on your left.', 'مكتب الاستقبال على يسارك.', 1],
    ['Please fill in this form first.', 'من فضلك املأ هذه الاستمارة أولًا.', 1],
    ['Your room will be ready at two.', 'ستكون غرفتك جاهزة في الثانية.', 2],
    ['Here is your receipt.', 'هذا إيصالك.', 1],
    ['The lift is over there.', 'المصعد هناك.', 1],
    ['How many bags are you checking in?', 'كم حقيبة ستسجلها؟', 2],
    ['The next train leaves in five minutes.', 'يغادر القطار القادم بعد خمس دقائق.', 2],
    ['Is this seat taken?', 'هل هذا المقعد محجوز؟', 1],
    ['Follow the signs to platform two.', 'اتبع اللافتات إلى الرصيف الثاني.', 2],
    ['Please keep your ticket until the end.', 'من فضلك احتفظ بتذكرتك حتى النهاية.', 2],
    ['The meeting room is on the third floor.', 'قاعة الاجتماعات في الطابق الثالث.', 2],
    ['Could you send me the file today?', 'هل ترسل لي الملف اليوم؟', 2],
    ['Let me check my schedule.', 'دعني أتحقق من جدولي.', 2],
    ['The line is busy right now.', 'الخط مشغول الآن.', 2],
    ['Please hold the line for a moment.', 'من فضلك انتظر على الخط لحظة.', 2],
    ['How can I help you today?', 'كيف أستطيع مساعدتك اليوم؟', 1],
    ['Your order will arrive shortly.', 'سيصل طلبك قريبا.', 2],
    ['We apologize for the delay.', 'نعتذر عن التأخير.', 2],
    ['Is there anything else I can do?', 'هل من شيء آخر أستطيع فعله؟', 2],
    ['Stay calm and call for help.', 'ابق هادئا واطلب المساعدة.', 1],
    ['The pharmacy closes at ten.', 'تغلق الصيدلية في العاشرة.', 2],
    ['Please take this prescription twice a day.', 'من فضلك خذ هذه الوصفة مرتين يوميا.', 2],
    ['The flight is delayed by one hour.', 'تأخرت الرحلة ساعة واحدة.', 2],
    ['Lost luggage is handled at desk seven.', 'تُعالج الأمتعة المفقودة في المكتب السابع.', 2],
    ['Could you repeat the gate number?', 'هل تعيد رقم البوابة؟', 2],
    ['Your booking reference is on the email.', 'رقم حجزك في البريد الإلكتروني.', 2],
    ['Payment is due at check-out.', 'الدفع مستحق عند المغادرة.', 2],
    ['The taxi rank is outside the terminal.', 'موقف سيارات الأجرة خارج صالة المطار.', 2],
    ['Turn right at the traffic lights.', 'انعطف يمينا عند إشارة المرور.', 1],
    ['The museum is two streets away.', 'المتحف على بُعد شارعين.', 2],
    ['Please fasten your seatbelt.', 'من فضلك اربط حزام الأمان.', 1],
    ['We are about to land.', 'نحن على وشك الهبوط.', 2],
    ['The wi-fi password is at reception.', 'كلمة سر الواي فاي عند الاستقبال.', 2],
    ['Breakfast is served from seven.', 'يقدم الفطور من السابعة.', 2],
    ['Could I have an extra pillow?', 'هل يمكنني الحصول على وسادة إضافية؟', 2],
    ['The air conditioning is not working.', 'المكيف لا يعمل.', 2],
    ['I would like to extend my stay.', 'أود تمديد إقامتي.', 2],
    ['Please speak slowly for the interpreter.', 'من فضلك تحدث ببطء للمترجم.', 2],
    ['The elevator is out of service.', 'المصعد خارج الخدمة.', 2],
    ['Thank you for your patience.', 'شكرا على صبرك.', 1],
  ],
  'gen-vocabulary': [
    ['Learning words in sentences makes them stick.', 'تعلم الكلمات في جمل يثبتها.', 2],
    ['One new word a day is a good pace.', 'كلمة جديدة كل يوم وتيرة جيدة.', 1],
    ['Use the new word three times today.', 'استخدم الكلمة الجديدة ثلاث مرات اليوم.', 1],
    ['A good dictionary is a learner\u2019s friend.', 'القاموس الجيد صديق المتعلم.', 2],
    ['Words change meaning with context.', 'تغير الكلمات معناها حسب السياق.', 2],
    ['Read the example aloud twice.', 'اقرأ المثال بصوت عال مرتين.', 1],
    ['Guess the meaning before you check.', 'خمّن المعنى قبل أن تتحقق.', 2],
    ['Word families grow your vocabulary fast.', 'عائلات الكلمات تنمي مفرداتك بسرعة.', 2],
    ['Note the collocation, not only the word.', 'دوّن المركّب اللفظي لا الكلمة وحدها.', 2],
    ['Idioms add color to your English.', 'التعبيرات الاصطلاحية تضفي جمالا على لغتك.', 2],
    ['Synonyms are close, not identical.', 'المترادفات متقاربة لا متطابقة.', 2],
    ['Choose the word that fits the tone.', 'اختر الكلمة التي تناسب النبرة.', 2],
    ['Spelling and meaning travel together.', 'الإملاء والمعنى يسيران معا.', 1],
    ['Write your own example for each word.', 'اكتب مثالك الخاص لكل كلمة.', 1],
    ['Review old words before new ones.', 'راجع الكلمات القديمة قبل الجديدة.', 2],
    ['A phrase book helps in emergencies.', 'كتاب العبارات ينفع في الطوارئ.', 2],
    ['Common words cover most conversations.', 'الكلمات الشائعة تغطي أغلب المحادثات.', 2],
    ['Verbs carry the heart of a sentence.', 'الأفعال تحمل قلب الجملة.', 2],
    ['Adjectives paint the picture.', 'الصفات ترسم الصورة.', 1],
    ['Adverbs tell you how it happens.', 'الظروف تخبرك كيف يحدث الأمر.', 2],
    ['Prepositions are small but powerful.', 'حروف الجر صغيرة لكنها قوية.', 2],
    ['Practice the pronunciation too.', 'تدرب على النطق أيضا.', 1],
    ['Repeat the word with its Arabic meaning.', 'أعد الكلمة مع معناها العربي.', 1],
    ['Vocabulary grows like a garden.', 'المفردات تنمو كالحديقة.', 1],
    ['Collect words from real life.', 'اجمع الكلمات من الحياة الواقعية.', 2],
    ['Label things in your house in English.', 'ضع أسماء إنجليزية على أشياء بيتك.', 2],
    ['Talk to yourself in English daily.', 'تحدث إلى نفسك بالإنجليزية يوميا.', 2],
    ['The right word saves a whole sentence.', 'الكلمة الصحيحة توفر جملة كاملة.', 2],
    ['Two synonyms, two different flavors.', 'مترادفان، ونكهتان مختلفتان.', 2],
    ['Opposites help you remember pairs.', 'الأضداد تساعدك على تذكر الأزواج.', 2],
    ['Confusable pairs need extra care.', 'الأزواج المتشابهة تحتاج عناية إضافية.', 2],
    ['Context decides the correct choice.', 'السياق يحدد الاختيار الصحيح.', 2],
    ['Every lesson adds ten new tools.', 'كل درس يضيف عشر أدوات جديدة.', 1],
    ['Your word bank is your power.', 'بنك كلماتك هو قوتك.', 1],
    ['Mistakes with words are welcome here.', 'الأخطاء بالكلمات مرحب بها هنا.', 1],
    ['Say the word, type the word, own the word.', 'قل الكلمة، اكتبها، وامتلكها.', 1],
    ['Little words glue sentences together.', 'الكلمات الصغيرة تلصق الجمل.', 2],
    ['A rich vocabulary builds confidence.', 'المفردات الغنية تبني الثقة.', 2],
    ['Learn the word with its partners.', 'تعلم الكلمة مع رفيقاتها.', 2],
    ['Language is a habit, not a test.', 'اللغة عادة لا اختبار.', 1],
  ],
};

for (const [file, { tag }] of Object.entries(FILES)) {
  let src = readFileSync(file, 'utf8');
  const key = Object.keys(ROWS).find((k) => file.includes(k));
  // remove any previous (possibly broken) insertion: SAFETY line(s) up to CFG
  if (src.includes('const SAFETY')) {
    const lines = src.split('\n');
    const startIdx = lines.findIndex((l) => l.startsWith('const SAFETY'));
    const cfgIdx = lines.findIndex((l) => l.trim() === 'const CFG = [');
    if (startIdx >= 0 && cfgIdx > startIdx) {
      lines.splice(startIdx, cfgIdx - startIdx);
      src = lines.join('\n');
    } else {
      throw new Error(`cannot repair SAFETY block in ${file}`);
    }
  }
  const pool = `/* safety pool: distinct top-ups drawn by whichever lesson falls short */\nconst SAFETY = T(${JSON.stringify(tag)}, ${JSON.stringify(ROWS[key])});\n\nconst CFG = [`;
  src = src.replace('const CFG = [', pool);
  src = src.replace(/lt: (l\d+Lt), fill:/g, 'lt: [...$1, ...SAFETY], fill:');
  writeFileSync(file, src);
  console.log(`${file}: SAFETY inserted (${ROWS[key].length} rows)`);
}
