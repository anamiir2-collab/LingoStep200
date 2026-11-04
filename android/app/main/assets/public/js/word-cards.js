/* ============================================================
   LingoStep — word-cards.js
   Interactive sentence analysis: tap a word → card with its part
   of speech (Arabic + English), meaning and pronunciation.

   HONESTY RULES (spec: never fabricate):
   - POS comes from a curated lexicon (function words fully covered)
     plus safe morphology (adverbs in -ly, plural stems of lexicon
     nouns, numbers). Ambiguous words map to their most common use.
   - Arabic meaning: lexicon entry, or the lesson's own vocabulary
     list when the word appears there. Otherwise → not shown.
   - Phonetic transcription: only for lexicon entries that carry a
     verified IPA string. Anything else → not shown (the card still
     offers the 🔊 speak button, which uses the browser's TTS).
   - When neither lexicon nor lesson vocabulary knows a word, the
     card says "not determined" instead of guessing.
   - Pure logic + a DOM renderer that accepts a speak callback, so
     everything is Node-testable.
   ============================================================ */

export const POS_CATEGORIES = Object.freeze([
  { id: 'noun', en: 'Noun', ar: 'اسم' },
  { id: 'verb', en: 'Verb', ar: 'فعل' },
  { id: 'pronoun', en: 'Pronoun', ar: 'ضمير' },
  { id: 'adjective', en: 'Adjective', ar: 'صفة' },
  { id: 'adverb', en: 'Adverb', ar: 'ظرف' },
  { id: 'preposition', en: 'Preposition', ar: 'حرف جر' },
  { id: 'conjunction', en: 'Conjunction', ar: 'أداة ربط' },
  { id: 'determiner', en: 'Determiner', ar: 'محدد' },
  { id: 'number', en: 'Number', ar: 'عدد' },
  { id: 'auxiliary', en: 'Auxiliary verb', ar: 'فعل مساعد' },
]);

const POS_BY_ID = new Map(POS_CATEGORIES.map((p) => [p.id, p]));

/* ---------- curated lexicon ----------
   [word, posId, IPA-or-null, Arabic meaning]                */

const LEX = [
  // pronouns
  ['i', 'pronoun', '/aɪ/', 'أنا'], ['you', 'pronoun', '/juː/', 'أنتَ/أنتِ'],
  ['he', 'pronoun', '/hiː/', 'هو'], ['she', 'pronoun', '/ʃiː/', 'هي'],
  ['it', 'pronoun', '/ɪt/', 'هو/هي (لغير العاقل)'], ['we', 'pronoun', '/wiː/', 'نحن'],
  ['they', 'pronoun', '/ðeɪ/', 'هم'], ['me', 'pronoun', '/miː/', 'أنا (مفعول)'],
  ['him', 'pronoun', '/hɪm/', 'هو (مفعول)'], ['her', 'pronoun', '/hɜːr/', 'هي (مفعول) / لها'],
  ['us', 'pronoun', '/ʌs/', 'نحن (مفعول)'], ['them', 'pronoun', '/ðem/', 'هم (مفعول)'],
  ['mine', 'pronoun', '/maɪn/', 'لي'], ['yours', 'pronoun', '/jɔːrz/', 'لك'],
  ['hers', 'pronoun', '/hɜːrz/', 'لها'], ['ours', 'pronoun', '/ˈaʊərz/', 'لنا'],
  ['theirs', 'pronoun', '/ðeərz/', 'لهم'],
  ['myself', 'pronoun', '/maɪˈself/', 'نفسي'], ['yourself', 'pronoun', '/jɔːrˈself/', 'نفسك'],
  ['himself', 'pronoun', '/hɪmˈself/', 'نفسه'], ['herself', 'pronoun', '/hɜːrˈself/', 'نفسها'],
  ['itself', 'pronoun', '/ɪtˈself/', 'نفسه'], ['ourselves', 'pronoun', '/ˌaʊərˈselvz/', 'أنفسنا'],
  ['themselves', 'pronoun', '/ðəmˈselvz/', 'أنفسهم'],
  ['someone', 'pronoun', '/ˈsʌmwʌn/', 'شخص ما'], ['everyone', 'pronoun', '/ˈevriwʌn/', 'الجميع'],
  ['anyone', 'pronoun', '/ˈeniwʌn/', 'أي شخص'], ['nobody', 'pronoun', '/ˈnoʊbədi/', 'لا أحد'],
  ['something', 'pronoun', '/ˈsʌmθɪŋ/', 'شيء ما'], ['nothing', 'pronoun', '/ˈnʌθɪŋ/', 'لا شيء'],
  ['everything', 'pronoun', '/ˈevriθɪŋ/', 'كل شيء'],

  // auxiliary / modal verbs
  ['be', 'auxiliary', '/biː/', 'يكون'], ['am', 'auxiliary', '/æm/', 'أكون'],
  ['is', 'auxiliary', '/ɪz/', 'يكون (مفرد)'], ['are', 'auxiliary', '/ɑːr/', 'تكون (جمع)'],
  ['was', 'auxiliary', '/wɒz/', 'كان'], ['were', 'auxiliary', '/wɜːr/', 'كانوا'],
  ['been', 'auxiliary', '/biːn/', 'كان (اسم مفعول)'], ['being', 'auxiliary', '/ˈbiːɪŋ/', 'كائنًا'],
  ['do', 'auxiliary', '/duː/', 'يفعل (مساعد)'], ['does', 'auxiliary', '/dʌz/', 'يفعل (مفرد)'],
  ['did', 'auxiliary', '/dɪd/', 'فعل (ماضٍ)'], ['have', 'auxiliary', '/hæv/', 'يملك / مساعد'],
  ['has', 'auxiliary', '/hæz/', 'يملك (مفرد)'], ['had', 'auxiliary', '/hæd/', 'ملك (ماضٍ)'],
  ['will', 'auxiliary', '/wɪl/', 'سوف'], ['would', 'auxiliary', '/wʊd/', 'سوف (شرطي)'],
  ['can', 'auxiliary', '/kæn/', 'يستطيع'], ['could', 'auxiliary', '/kʊd/', 'استطاع / يمكن'],
  ['shall', 'auxiliary', '/ʃæl/', 'سوف (رسمي)'], ['should', 'auxiliary', '/ʃʊd/', 'ينبغي'],
  ['may', 'auxiliary', '/meɪ/', 'قد'], ['might', 'auxiliary', '/maɪt/', 'قد (أقل احتمالًا)'],
  ['must', 'auxiliary', '/mʌst/', 'يجب'],

  // prepositions
  ['in', 'preposition', '/ɪn/', 'في'], ['on', 'preposition', '/ɒn/', 'على'],
  ['at', 'preposition', '/æt/', 'عند'], ['to', 'preposition', '/tuː/', 'إلى'],
  ['from', 'preposition', '/frɒm/', 'من'], ['with', 'preposition', '/wɪð/', 'مع'],
  ['without', 'preposition', '/wɪˈðaʊt/', 'بدون'], ['for', 'preposition', '/fɔːr/', 'لأجل'],
  ['of', 'preposition', '/ɒv/', 'من (ملكية)'], ['by', 'preposition', '/baɪ/', 'بواسطة'],
  ['about', 'preposition', '/əˈbaʊt/', 'حول'], ['under', 'preposition', '/ˈʌndər/', 'تحت'],
  ['over', 'preposition', '/ˈoʊvər/', 'فوق'], ['behind', 'preposition', '/bɪˈhaɪnd/', 'خلف'],
  ['between', 'preposition', '/bɪˈtwiːn/', 'بين'], ['near', 'preposition', '/nɪər/', 'قريب من'],
  ['into', 'preposition', '/ˈɪntuː/', 'إلى داخل'], ['through', 'preposition', '/θruː/', 'عبر'],
  ['during', 'preposition', '/ˈdʊrɪŋ/', 'خلال'], ['before', 'preposition', '/bɪˈfɔːr/', 'قبل'],
  ['after', 'preposition', '/ˈæftər/', 'بعد'], ['above', 'preposition', '/əˈbʌv/', 'أعلى'],
  ['below', 'preposition', '/bɪˈloʊ/', 'أسفل'], ['around', 'preposition', '/əˈraʊnd/', 'حول'],
  ['against', 'preposition', '/əˈɡenst/', 'ضد'], ['among', 'preposition', '/əˈmʌŋ/', 'بين (جمع)'],
  ['along', 'preposition', '/əˈlɒŋ/', 'على طول'], ['across', 'preposition', '/əˈkrɒs/', 'عبر'],
  ['upon', 'preposition', '/əˈpɒn/', 'على'], ['within', 'preposition', '/wɪˈðɪn/', 'داخل'],
  ['beside', 'preposition', '/bɪˈsaɪd/', 'بجانب'], ['since', 'preposition', '/sɪns/', 'منذ'],
  ['until', 'preposition', '/ənˈtɪl/', 'حتى'], ['off', 'preposition', '/ɔːf/', 'بعيدًا عن'],
  ['inside', 'preposition', '/ɪnˈsaɪd/', 'داخل'], ['outside', 'preposition', '/ˌaʊtˈsaɪd/', 'خارج'],

  // conjunctions
  ['and', 'conjunction', '/ænd/', 'و'], ['but', 'conjunction', '/bʌt/', 'لكن'],
  ['or', 'conjunction', '/ɔːr/', 'أو'], ['so', 'conjunction', '/soʊ/', 'لذا'],
  ['because', 'conjunction', '/bɪˈkɒz/', 'لأن'], ['although', 'conjunction', '/ɔːlˈðoʊ/', 'رغم أن'],
  ['though', 'conjunction', '/ðoʊ/', 'رغم أن'], ['if', 'conjunction', '/ɪf/', 'إذا'],
  ['when', 'conjunction', '/wen/', 'عندما'], ['while', 'conjunction', '/waɪl/', 'بينما'],
  ['unless', 'conjunction', '/ənˈles/', 'إلا إذا'], ['whereas', 'conjunction', '/ˌwerˈæz/', 'بينما'],
  ['however', 'conjunction', '/ˌhaʊˈevər/', 'لكن'], ['therefore', 'conjunction', '/ˈðerfɔːr/', 'لذلك'],

  // determiners
  ['the', 'determiner', '/ðə/', 'أداة تعريف'], ['a', 'determiner', '/ə/', 'أداة تنكير'],
  ['an', 'determiner', '/æn/', 'أداة تنكير'], ['my', 'determiner', '/maɪ/', 'خاصتي'],
  ['your', 'determiner', '/jɔːr/', 'خاصتك'], ['his', 'determiner', '/hɪz/', 'خاصته'],
  ['its', 'determiner', '/ɪts/', 'خاصته (لغير العاقل)'], ['our', 'determiner', '/ˈaʊər/', 'خاصتنا'],
  ['their', 'determiner', '/ðeər/', 'خاصتهم'],
  ['this', 'determiner', '/ðɪs/', 'هذا'], ['that', 'determiner', '/ðæt/', 'ذلك'],
  ['these', 'determiner', '/ðiːz/', 'هؤلاء'], ['those', 'determiner', '/ðoʊz/', 'أولئك'],
  ['every', 'determiner', '/ˈevri/', 'كل'], ['each', 'determiner', '/iːtʃ/', 'كلٌّ من'],
  ['some', 'determiner', '/sʌm/', 'بعض'], ['any', 'determiner', '/ˈeni/', 'أي'],
  ['no', 'determiner', '/noʊ/', 'لا (نفي)'], ['many', 'determiner', '/ˈmeni/', 'كثير'],
  ['much', 'determiner', '/mʌtʃ/', 'كثير (غير معدود)'], ['few', 'determiner', '/fjuː/', 'قليل'],
  ['all', 'determiner', '/ɔːl/', 'كل'], ['both', 'determiner', '/boʊθ/', 'كلاهما'],
  ['several', 'determiner', '/ˈsevrəl/', 'عدة'], ['another', 'determiner', '/əˈnʌðər/', 'آخر'],
  ['other', 'determiner', '/ˈʌðər/', 'آخر (غير محدد)'], ['enough', 'determiner', '/ɪˈnʌf/', 'كافٍ'],

  // numbers
  ['one', 'number', '/wʌn/', 'واحد'], ['two', 'number', '/tuː/', 'اثنان'],
  ['three', 'number', '/θriː/', 'ثلاثة'], ['four', 'number', '/fɔːr/', 'أربعة'],
  ['five', 'number', '/faɪv/', 'خمسة'], ['six', 'number', '/sɪks/', 'ستة'],
  ['seven', 'number', '/ˈsevn/', 'سبعة'], ['eight', 'number', '/eɪt/', 'ثمانية'],
  ['nine', 'number', '/naɪn/', 'تسعة'], ['ten', 'number', '/ten/', 'عشرة'],
  ['eleven', 'number', '/ɪˈlevn/', 'أحد عشر'], ['twelve', 'number', '/twelv/', 'اثنا عشر'],
  ['twenty', 'number', '/ˈtwenti/', 'عشرون'], ['fifty', 'number', '/ˈfɪfti/', 'خمسون'],
  ['hundred', 'number', '/ˈhʌndrəd/', 'مئة'], ['thousand', 'number', '/ˈθaʊznd/', 'ألف'],
  ['first', 'number', '/fɜːrst/', 'أول'], ['second', 'number', '/ˈsekənd/', 'ثانٍ'],
  ['third', 'number', '/θɜːrd/', 'ثالث'],

  // common adverbs
  ['not', 'adverb', '/nɒt/', 'ليس'], ['very', 'adverb', '/ˈveri/', 'جدًا'],
  ['really', 'adverb', '/ˈrɪəli/', 'حقًا'], ['always', 'adverb', '/ˈɔːlweɪz/', 'دائمًا'],
  ['never', 'adverb', '/ˈnevər/', 'أبدًا'], ['usually', 'adverb', '/ˈjuːʒuəli/', 'عادةً'],
  ['often', 'adverb', '/ˈɒfn/', 'غالبًا'], ['sometimes', 'adverb', '/ˈsʌmtaɪmz/', 'أحيانًا'],
  ['rarely', 'adverb', '/ˈreəli/', 'نادرًا'], ['now', 'adverb', '/naʊ/', 'الآن'],
  ['then', 'adverb', '/ðen/', 'ثم'], ['here', 'adverb', '/hɪr/', 'هنا'],
  ['there', 'adverb', '/ðeər/', 'هناك'], ['today', 'adverb', '/təˈdeɪ/', 'اليوم'],
  ['tomorrow', 'adverb', '/təˈmɒroʊ/', 'غدًا'], ['yesterday', 'adverb', '/ˈjestərdeɪ/', 'أمس'],
  ['soon', 'adverb', '/suːn/', 'قريبًا'], ['well', 'adverb', '/wel/', 'جيدًا'],
  ['together', 'adverb', '/təˈɡeðər/', 'معًا'], ['again', 'adverb', '/əˈɡen/', 'مرة أخرى'],
  ['almost', 'adverb', '/ˈɔːlmoʊst/', 'تقريبًا'], ['quite', 'adverb', '/kwaɪt/', 'إلى حد بعيد'],
  ['just', 'adverb', '/dʒʌst/', 'فقط / للتو'], ['only', 'adverb', '/ˈoʊnli/', 'فقط'],
  ['also', 'adverb', '/ˈɔːlsoʊ/', 'أيضًا'], ['too', 'adverb', '/tuː/', 'أيضًا'],
  ['still', 'adverb', '/stɪl/', 'لا يزال'], ['already', 'adverb', '/ɔːlˈredi/', 'بالفعل'],
  ['yet', 'adverb', '/jet/', 'بعد (في النفي)'], ['away', 'adverb', '/əˈweɪ/', 'بعيدًا'],
  ['ever', 'adverb', '/ˈevər/', 'على الإطلاق'], ['up', 'adverb', '/ʌp/', 'أعلى'],
  ['down', 'adverb', '/daʊn/', 'أسفل'], ['everywhere', 'adverb', '/ˈevriwer/', 'في كل مكان'],

  // common verbs
  ['eat', 'verb', '/iːt/', 'يأكل'], ['drink', 'verb', '/drɪŋk/', 'يشرب'],
  ['go', 'verb', '/ɡoʊ/', 'يذهب'], ['went', 'verb', '/went/', 'ذهب'],
  ['come', 'verb', '/kʌm/', 'يأتي'], ['came', 'verb', '/keɪm/', 'أتى'],
  ['see', 'verb', '/siː/', 'يرى'], ['saw', 'verb', '/sɔː/', 'رأى'],
  ['read', 'verb', '/riːd/', 'يقرأ'], ['write', 'verb', '/raɪt/', 'يكتب'],
  ['speak', 'verb', '/spiːk/', 'يتحدث'], ['say', 'verb', '/seɪ/', 'يقول'],
  ['tell', 'verb', '/tel/', 'يخبر'], ['ask', 'verb', '/ɑːsk/', 'يسأل'],
  ['work', 'verb', '/wɜːrk/', 'يعمل'], ['play', 'verb', '/pleɪ/', 'يلعب'],
  ['run', 'verb', '/rʌn/', 'يجري'], ['walk', 'verb', '/wɔːk/', 'يمشي'],
  ['sleep', 'verb', '/sliːp/', 'ينام'], ['like', 'verb', '/laɪk/', 'يحب'],
  ['want', 'verb', '/wɒnt/', 'يريد'], ['need', 'verb', '/niːd/', 'يحتاج'],
  ['help', 'verb', '/help/', 'يساعد'], ['give', 'verb', '/ɡɪv/', 'يعطي'],
  ['take', 'verb', '/teɪk/', 'يأخذ'], ['make', 'verb', '/meɪk/', 'يصنع'],
  ['know', 'verb', '/noʊ/', 'يعرف'], ['think', 'verb', '/θɪŋk/', 'يفكر'],
  ['buy', 'verb', '/baɪ/', 'يشتري'], ['sell', 'verb', '/sel/', 'يبيع'],
  ['learn', 'verb', '/lɜːrn/', 'يتعلم'], ['teach', 'verb', '/tiːtʃ/', 'يعلّم'],
  ['study', 'verb', '/ˈstʌdi/', 'يدرس'], ['live', 'verb', '/lɪv/', 'يسكن'],
  ['love', 'verb', '/lʌv/', 'يحب'], ['watch', 'verb', '/wɒtʃ/', 'يشاهد'],
  ['listen', 'verb', '/ˈlɪsn/', 'يستمع'], ['look', 'verb', '/lʊk/', 'ينظر'],
  ['feel', 'verb', '/fiːl/', 'يشعر'], ['call', 'verb', '/kɔːl/', 'يتصل'],
  ['wait', 'verb', '/weɪt/', 'ينتظر'], ['find', 'verb', '/faɪnd/', 'يجد'],
  ['leave', 'verb', '/liːv/', 'يغادر'], ['put', 'verb', '/pʊt/', 'يضع'],
  ['bring', 'verb', '/brɪŋ/', 'يجلب'], ['show', 'verb', '/ʃoʊ/', 'يُظهر'],
  ['try', 'verb', '/traɪ/', 'يحاول'], ['use', 'verb', '/juːz/', 'يستخدم'],
  ['visit', 'verb', '/ˈvɪzɪt/', 'يزور'], ['travel', 'verb', '/ˈtrævl/', 'يسافر'],
  ['drive', 'verb', '/draɪv/', 'يقود'], ['cook', 'verb', '/kʊk/', 'يطبخ'],
  ['understand', 'verb', '/ˌʌndərˈstænd/', 'يفهم'], ['forget', 'verb', '/fərˈɡet/', 'ينسى'],
  ['remember', 'verb', '/rɪˈmembər/', 'يتذكر'], ['answer', 'verb', '/ˈɑːnsər/', 'يجيب'],
  ['meet', 'verb', '/miːt/', 'يقابل'], ['send', 'verb', '/send/', 'يرسل'],
  ['pay', 'verb', '/peɪ/', 'يدفع'], ['begin', 'verb', '/bɪˈɡɪn/', 'يبدأ'],
  ['stop', 'verb', '/stɒp/', 'يتوقف'], ['stay', 'verb', '/steɪ/', 'يبقى'],
  ['hope', 'verb', '/hoʊp/', 'يأمل'], ['plan', 'verb', '/plæn/', 'يخطط'],
  ['agree', 'verb', '/əˈɡriː/', 'يوافق'], ['believe', 'verb', '/bɪˈliːv/', 'يعتقد'],
  ['happen', 'verb', '/ˈhæpən/', 'يحدث'], ['finish', 'verb', '/ˈfɪnɪʃ/', 'ينهي'],
  ['start', 'verb', '/stɑːrt/', 'يبدأ'], ['open', 'verb', '/ˈoʊpən/', 'يفتح'],
  ['close', 'verb', '/kloʊz/', 'يغلق'], ['talk', 'verb', '/tɔːk/', 'يتحدث'],

  // common nouns
  ['day', 'noun', '/deɪ/', 'يوم'], ['time', 'noun', '/taɪm/', 'وقت'],
  ['year', 'noun', '/jɪr/', 'سنة'], ['week', 'noun', '/wiːk/', 'أسبوع'],
  ['month', 'noun', '/mʌnθ/', 'شهر'], ['hour', 'noun', '/ˈaʊər/', 'ساعة'],
  ['minute', 'noun', '/ˈmɪnɪt/', 'دقيقة'], ['family', 'noun', '/ˈfæməli/', 'عائلة'],
  ['friend', 'noun', '/frend/', 'صديق'], ['home', 'noun', '/hoʊm/', 'منزل'],
  ['house', 'noun', '/haʊs/', 'بيت'], ['school', 'noun', '/skuːl/', 'مدرسة'],
  ['book', 'noun', '/bʊk/', 'كتاب'], ['water', 'noun', '/ˈwɔːtər/', 'ماء'],
  ['food', 'noun', '/fuːd/', 'طعام'], ['money', 'noun', '/ˈmʌni/', 'مال'],
  ['city', 'noun', '/ˈsɪti/', 'مدينة'], ['car', 'noun', '/kɑːr/', 'سيارة'],
  ['door', 'noun', '/dɔːr/', 'باب'], ['table', 'noun', '/ˈteɪbl/', 'طاولة'],
  ['bag', 'noun', '/bæɡ/', 'حقيبة'], ['phone', 'noun', '/foʊn/', 'هاتف'],
  ['name', 'noun', '/neɪm/', 'اسم'], ['question', 'noun', '/ˈkwestʃən/', 'سؤال'],
  ['teacher', 'noun', '/ˈtiːtʃər/', 'معلم'], ['student', 'noun', '/ˈstuːdnt/', 'طالب'],
  ['doctor', 'noun', '/ˈdɒktər/', 'طبيب'], ['language', 'noun', '/ˈlæŋɡwɪdʒ/', 'لغة'],
  ['word', 'noun', '/wɜːrd/', 'كلمة'], ['sentence', 'noun', '/ˈsentəns/', 'جملة'],
  ['morning', 'noun', '/ˈmɔːrnɪŋ/', 'صباح'], ['night', 'noun', '/naɪt/', 'ليل'],
  ['evening', 'noun', '/ˈiːvnɪŋ/', 'مساء'], ['breakfast', 'noun', '/ˈbrekfəst/', 'فطور'],
  ['lunch', 'noun', '/lʌntʃ/', 'غداء'], ['dinner', 'noun', '/ˈdɪnər/', 'عشاء'],
  ['street', 'noun', '/striːt/', 'شارع'], ['shop', 'noun', '/ʃɒp/', 'متجر'],
  ['work', 'noun', '/wɜːrk/', 'عمل'], ['apple', 'noun', '/ˈæpl/', 'تفاحة'],
  ['coffee', 'noun', '/ˈkɒfi/', 'قهوة'], ['tea', 'noun', '/tiː/', 'شاي'],
  ['people', 'noun', '/ˈpiːpl/', 'الناس'], ['child', 'noun', '/tʃaɪld/', 'طفل'],
  ['children', 'noun', '/ˈtʃɪldrən/', 'أطفال'], ['man', 'noun', '/mæn/', 'رجل'],
  ['woman', 'noun', '/ˈwʊmən/', 'امرأة'], ['life', 'noun', '/laɪf/', 'حياة'],
  ['place', 'noun', '/pleɪs/', 'مكان'], ['thing', 'noun', '/θɪŋ/', 'شيء'],
  ['way', 'noun', '/weɪ/', 'طريقة/طريق'], ['world', 'noun', '/wɜːrld/', 'عالم'],
  ['room', 'noun', '/ruːm/', 'غرفة'], ['bed', 'noun', '/bed/', 'سرير'],
  ['window', 'noun', '/ˈwɪndoʊ/', 'نافذة'], ['key', 'noun', '/kiː/', 'مفتاح'],

  // common adjectives
  ['good', 'adjective', '/ɡʊd/', 'جيد'], ['bad', 'adjective', '/bæd/', 'سيئ'],
  ['big', 'adjective', '/bɪɡ/', 'كبير'], ['small', 'adjective', '/smɔːl/', 'صغير'],
  ['new', 'adjective', '/njuː/', 'جديد'], ['old', 'adjective', '/oʊld/', 'قديم/كبير في السن'],
  ['long', 'adjective', '/lɒŋ/', 'طويل'], ['short', 'adjective', '/ʃɔːrt/', 'قصير'],
  ['hot', 'adjective', '/hɒt/', 'حار'], ['cold', 'adjective', '/koʊld/', 'بارد'],
  ['happy', 'adjective', '/ˈhæpi/', 'سعيد'], ['sad', 'adjective', '/sæd/', 'حزين'],
  ['tired', 'adjective', '/ˈtaɪərd/', 'متعب'], ['hungry', 'adjective', '/ˈhʌŋɡri/', 'جائع'],
  ['fast', 'adjective', '/fæst/', 'سريع'], ['slow', 'adjective', '/sloʊ/', 'بطيء'],
  ['easy', 'adjective', '/ˈiːzi/', 'سهل'], ['difficult', 'adjective', '/ˈdɪfɪkəlt/', 'صعب'],
  ['cheap', 'adjective', '/tʃiːp/', 'رخيص'], ['expensive', 'adjective', '/ɪkˈspensɪv/', 'غالي'],
  ['beautiful', 'adjective', '/ˈbjuːtɪfl/', 'جميل'], ['clean', 'adjective', '/kliːn/', 'نظيف'],
  ['dirty', 'adjective', '/ˈdɜːrti/', 'وسخ'], ['full', 'adjective', '/fʊl/', 'ممتلئ'],
  ['right', 'adjective', '/raɪt/', 'صحيح'], ['wrong', 'adjective', '/rɒŋ/', 'خطأ'],
  ['same', 'adjective', '/seɪm/', 'نفس'], ['different', 'adjective', '/ˈdɪfrənt/', 'مختلف'],
  ['important', 'adjective', '/ɪmˈpɔːtnt/', 'مهم'], ['ready', 'adjective', '/ˈredi/', 'مستعد'],
  ['busy', 'adjective', '/ˈbɪzi/', 'مشغول'], ['free', 'adjective', '/friː/', 'حر/مجاني'],
  ['strong', 'adjective', '/strɒŋ/', 'قوي'], ['young', 'adjective', '/jʌŋ/', 'شاب'],
  ['late', 'adjective', '/leɪt/', 'متأخر'], ['early', 'adjective', '/ˈɜːrli/', 'مبكر'],
  ['better', 'adjective', '/ˈbetər/', 'أفضل'], ['best', 'adjective', '/best/', 'الأفضل'],
  ['last', 'adjective', '/læst/', 'الأخير'], ['next', 'adjective', '/nekst/', 'التالي'],
  ['tall', 'adjective', '/tɔːl/', 'طويل (الطول)'], ['kind', 'adjective', '/kaɪnd/', 'طيب'],
];

const LEX_MAP = new Map(LEX.map(([w, pos, ipa, ar]) => [w, { pos, ipa, ar }]));

/* ---------- morphology helpers ---------- */

function stripPunct(w) {
  return String(w ?? '').toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '');
}

function singularCandidates(w) {
  const out = [w];
  if (w.endsWith('ies') && w.length > 4) out.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es') && w.length > 3) out.push(w.slice(0, -2));
  if (w.endsWith('s') && w.length > 2 && !w.endsWith('ss')) out.push(w.slice(0, -1));
  return out;
}

const NUMBER_RE = /^\d+([.,]\d+)?$/;

/* ---------- analysis ---------- */

/**
 * Analyze a sentence into word tokens.
 * vocab: optional [{ word, meaningAr }] — usually lesson.vocabulary.
 * Returns [{ raw, text, posId, posEn, posAr, meaningAr, phonetic, source }]
 * source: 'lexicon' | 'lesson' | 'morphology' | 'unknown'
 */
export function analyzeSentence(sentence, vocab = []) {
  const rawTokens = String(sentence ?? '').split(/\s+/).filter(Boolean);
  const lessonVocab = new Map();
  for (const v of Array.isArray(vocab) ? vocab : []) {
    if (v && typeof v.word === 'string' && v.meaningAr) {
      lessonVocab.set(v.word.toLowerCase(), v.meaningAr);
    }
  }

  return rawTokens.map((raw) => {
    const text = stripPunct(raw);
    const token = { raw, text, posId: null, posEn: null, posAr: null, meaningAr: null, phonetic: null, source: 'unknown' };
    if (!text) return token;

    const finish = (posId, meaningAr, phonetic, source) => {
      const pos = POS_BY_ID.get(posId);
      token.posId = posId;
      token.posEn = pos ? pos.en : null;
      token.posAr = pos ? pos.ar : null;
      token.meaningAr = meaningAr || null;
      token.phonetic = phonetic || null;
      token.source = source;
    };

    // 1) direct lexicon hit (covers function words & common content words)
    if (LEX_MAP.has(text)) {
      const e = LEX_MAP.get(text);
      finish(e.pos, e.ar, e.ipa, 'lexicon');
      return token;
    }

    // 2) plural / inflected stem in lexicon
    for (const base of singularCandidates(text)) {
      if (LEX_MAP.has(base)) {
        const e = LEX_MAP.get(base);
        finish(e.pos, e.ar, null, 'morphology'); // stem IPA dropped: inflected form may sound different
        return token;
      }
    }

    // 3) numbers written as digits
    if (NUMBER_RE.test(text)) { finish('number', null, null, 'lexicon'); return token; }

    // 4) safe morphology: adverbs ending in -ly
    if (text.endsWith('ly') && text.length >= 5) { finish('adverb', null, null, 'morphology'); return token; }

    // 5) lesson vocabulary provides the meaning (POS stays unknown)
    if (lessonVocab.has(text)) {
      token.meaningAr = lessonVocab.get(text);
      token.source = 'lesson';
      return token;
    }
    for (const base of singularCandidates(text)) {
      if (lessonVocab.has(base)) {
        token.meaningAr = lessonVocab.get(base);
        token.source = 'lesson';
        return token;
      }
    }

    return token; // honestly undetermined
  });
}

/* ---------- DOM rendering ---------- */

/**
 * Render every sentence token as its own complete word card.
 * Each card shows English, IPA when known, part of speech, Arabic meaning,
 * and an optional pronunciation button.
 */
export function renderWordCards(tokens, opts = {}) {
  const labels = opts.labels || {};
  const root = document.createElement('div');
  root.className = 'word-cards';
  const grid = document.createElement('div');
  grid.className = 'wc-card-grid';

  for (const token of tokens) {
    const card = document.createElement('article');
    card.className = 'wc-word-card';
    const head = document.createElement('div');
    head.className = 'wc-word-card-head';

    const word = document.createElement('strong');
    word.className = 'wc-word';
    word.dir = 'ltr';
    word.textContent = token.raw || token.text;
    head.append(word);

    if (typeof opts.speak === 'function') {
      const say = document.createElement('button');
      say.type = 'button';
      say.className = 'wc-speak';
      say.setAttribute('aria-label', labels.listen || 'Listen');
      say.title = labels.listen || 'Listen';
      say.textContent = '🔊';
      say.addEventListener('click', () => opts.speak(token.text || token.raw));
      head.append(say);
    }
    card.append(head);

    // Arabic meaning directly below the word
    const meaning = document.createElement('div');
    meaning.className = 'wc-meaning';
    meaning.dir = 'rtl';
    meaning.textContent = token.meaningAr || labels.noAnalysis || 'لا توجد ترجمة متاحة';
    card.append(meaning);

    // verified IPA only — never invented (see HONESTY RULES above)
    const phonetic = document.createElement('div');
    phonetic.className = 'wc-phonetic';
    phonetic.dir = 'ltr';
    phonetic.textContent = token.phonetic || '—';
    card.append(phonetic);

    // part of speech as a small chip; honestly "not determined" when unknown
    const pos = document.createElement('div');
    pos.className = 'wc-pos';
    pos.textContent = token.posAr
      ? `${token.posAr} · ${token.posEn}`
      : `${labels.partOfSpeech || 'Part of speech'}: ${labels.unknown || 'not determined'}`;
    card.append(pos);
    grid.append(card);
  }

  root.append(grid);
  return root;
}
