/* ============================================================
   Content engine — conjugations.js
   Verb bank with English forms + Arabic stems so patterns can
   expand into grammatically correct, accurately translated
   sentences.

   English: s (3rd person), ing, past, pp stored explicitly.
   Arabic:  derived from two stems:
     arStem     → present  (prefix أ/ت/ي/ن, plural suffix ون)
     arPastStem → past     (suffix ت/ت/—/ت/نا/وا)
   Future = س + present.  "كان/كنت" + present = past continuous.
   ============================================================ */

// subject agreement classes
export const AGR = {
  I:    { be: 'am',  bePast: 'was',  have: 'have'  },
  you:  { be: 'are', bePast: 'were', have: 'have'  },
  he:   { be: 'is',  bePast: 'was',  have: 'has'   },
  she:  { be: 'is',  bePast: 'was',  have: 'has'   },
  we:   { be: 'are', bePast: 'were', have: 'have'  },
  they: { be: 'are', bePast: 'were', have: 'have'  },
};

const AR_PRESENT_PREFIX = { I: 'أ', you: 'ت', he: 'ي', she: 'ت', we: 'ن', they: 'ي' };
const AR_PAST_SUFFIX = { I: 'ت', you: 'ت', he: '', she: 'ت', we: 'نا', they: 'وا' };
const AR_KANA = { I: 'كنت', you: 'كنت', he: 'كان', she: 'كانت', we: 'كنا', they: 'كانوا' };
const AR_FUT_KANA = { I: 'سأكون', you: 'ستكون', he: 'سيكون', she: 'ستكون', we: 'سنكون', they: 'سيكونون' };

/**
 * Verb entry fields:
 *  en: base, s: 3rd-person form, ing, past, pp
 *  arStem: present stem (after prefix), arPastStem: past stem
 *  arPresOv: {agr: form} overrides (e.g. آكل)
 *  arPastOv: {agr: form} overrides
 */
export const VERBS = {
  eat:     { en: 'eat',     s: 'eats',      ing: 'eating',       past: 'ate',        pp: 'eaten',       arStem: 'أكل',  arPastStem: 'أكل',  arPresOv: { I: 'آكل' } },
  drink:   { en: 'drink',   s: 'drinks',    ing: 'drinking',     past: 'drank',      pp: 'drunk',       arStem: 'شرب',  arPastStem: 'شرب' },
  go:      { en: 'go',      s: 'goes',      ing: 'going',        past: 'went',       pp: 'gone',        arStem: 'ذهب',  arPastStem: 'ذهب' },
  come:    { en: 'come',    s: 'comes',     ing: 'coming',       past: 'came',       pp: 'come',        arStem: 'أتي',  arPastStem: 'جاء',  arPastOv: { they: 'جاءوا' }, arPresOv: { they: 'يأتون', I: 'آتي' } },
  see:     { en: 'see',     s: 'sees',      ing: 'seeing',       past: 'saw',        pp: 'seen',        arStem: 'رى',   arPastStem: 'رأى',  arPastOv: { they: 'رأوا' }, arPresOv: { they: 'يرون' } },
  watch:   { en: 'watch',   s: 'watches',   ing: 'watching',     past: 'watched',    pp: 'watched',     arStem: 'شاهد', arPastStem: 'شاهد' },
  read:    { en: 'read',    s: 'reads',     ing: 'reading',      past: 'read',       pp: 'read',        arStem: 'قرأ',  arPastStem: 'قرأ',  arPastOv: { they: 'قرؤوا' }, arPresOv: { they: 'يقرؤون' } },
  write:   { en: 'write',   s: 'writes',    ing: 'writing',      past: 'wrote',      pp: 'written',     arStem: 'كتب',  arPastStem: 'كتب' },
  cook:    { en: 'cook',    s: 'cooks',     ing: 'cooking',      past: 'cooked',     pp: 'cooked',      arStem: 'طبخ',  arPastStem: 'طبخ' },
  make:    { en: 'make',    s: 'makes',     ing: 'making',       past: 'made',       pp: 'made',        arStem: 'صنع',  arPastStem: 'صنع' },
  buy:     { en: 'buy',     s: 'buys',      ing: 'buying',       past: 'bought',     pp: 'bought',      arStem: 'شتري', arPastStem: 'اشترى', arPastOv: { they: 'اشتروا' }, arPresOv: { they: 'يشترون' } },
  sell:    { en: 'sell',    s: 'sells',     ing: 'selling',      past: 'sold',       pp: 'sold',        arStem: 'بيع',  arPastStem: 'باع',  arPastOv: { they: 'باعوا' }, arPresOv: { they: 'يبيعون' } },
  pay:     { en: 'pay',     s: 'pays',      ing: 'paying',       past: 'paid',       pp: 'paid',        arStem: 'دفع',  arPastStem: 'دفع' },
  open:    { en: 'open',    s: 'opens',     ing: 'opening',      past: 'opened',     pp: 'opened',      arStem: 'فتح',  arPastStem: 'فتح' },
  close:   { en: 'close',   s: 'closes',    ing: 'closing',      past: 'closed',     pp: 'closed',      arStem: 'غلق',  arPastStem: 'أغلق', arPastOv: { they: 'أغلقوا' }, arPresOv: { they: 'يغلقون' } },
  start:   { en: 'start',   s: 'starts',    ing: 'starting',     past: 'started',    pp: 'started',     arStem: 'بدأ',  arPastStem: 'بدأ',  arPastOv: { they: 'بدؤوا' }, arPresOv: { they: 'يبدؤون' } },
  finish:  { en: 'finish',  s: 'finishes',  ing: 'finishing',    past: 'finished',   pp: 'finished',    arStem: 'نهي',  arPastStem: 'أنهى', arPastOv: { they: 'أنهوا' }, arPresOv: { they: 'ينهون' } },
  work:    { en: 'work',    s: 'works',     ing: 'working',      past: 'worked',     pp: 'worked',      arStem: 'عمل',  arPastStem: 'عمل' },
  play:    { en: 'play',    s: 'plays',     ing: 'playing',      past: 'played',     pp: 'played',      arStem: 'لعب',  arPastStem: 'لعب' },
  study:   { en: 'study',   s: 'studies',   ing: 'studying',     past: 'studied',    pp: 'studied',     arStem: 'درس',  arPastStem: 'درس' },
  learn:   { en: 'learn',   s: 'learns',    ing: 'learning',     past: 'learned',    pp: 'learned',     arStem: 'تعلم', arPastStem: 'تعلم' },
  teach:   { en: 'teach',   s: 'teaches',   ing: 'teaching',     past: 'taught',     pp: 'taught',      arStem: 'علم',  arPastStem: 'علّم' },
  sleep:   { en: 'sleep',   s: 'sleeps',    ing: 'sleeping',     past: 'slept',      pp: 'slept',       arStem: 'نام',  arPastStem: 'نام',  arPastOv: { they: 'ناموا' }, arPresOv: { they: 'ينامون' } },
  wake:    { en: 'wake up', s: 'wakes up',  ing: 'waking up',    past: 'woke up',    pp: 'woken up',    arStem: 'ستيقظ', arPastStem: 'استيقظ', arPastOv: { they: 'استيقظوا' }, arPresOv: { they: 'يستيقظون' } },
  walk:    { en: 'walk',    s: 'walks',     ing: 'walking',      past: 'walked',     pp: 'walked',      arStem: 'تمشى', arPastStem: 'مشى',  arPastOv: { they: 'مشوا' }, arPresOv: { they: 'يمشون' } },
  run:     { en: 'run',     s: 'runs',      ing: 'running',      past: 'ran',        pp: 'run',         arStem: 'جري',  arPastStem: 'جرى',  arPastOv: { they: 'جروا' }, arPresOv: { they: 'يجرون' } },
  drive:   { en: 'drive',   s: 'drives',    ing: 'driving',      past: 'drove',      pp: 'driven',      arStem: 'قود',  arPastStem: 'قاد',  arPastOv: { they: 'قادوا' }, arPresOv: { they: 'يقودون' } },
  travel:  { en: 'travel',  s: 'travels',   ing: 'travelling',   past: 'travelled',  pp: 'travelled',   arStem: 'سافر', arPastStem: 'سافر' },
  arrive:  { en: 'arrive',  s: 'arrives',   ing: 'arriving',     past: 'arrived',    pp: 'arrived',     arStem: 'وصل',  arPastStem: 'وصل' },
  leave:   { en: 'leave',   s: 'leaves',    ing: 'leaving',      past: 'left',       pp: 'left',        arStem: 'غادر', arPastStem: 'غادر' },
  wait:    { en: 'wait',    s: 'waits',     ing: 'waiting',      past: 'waited',     pp: 'waited',      arStem: 'نتظر', arPastStem: 'انتظر' },
  meet:    { en: 'meet',    s: 'meets',     ing: 'meeting',      past: 'met',        pp: 'met',         arStem: 'قابل', arPastStem: 'قابل' },
  visit:   { en: 'visit',   s: 'visits',    ing: 'visiting',     past: 'visited',    pp: 'visited',     arStem: 'زور',  arPastStem: 'زار',  arPastOv: { they: 'زاروا' }, arPresOv: { they: 'يزورون' } },
  call:    { en: 'call',    s: 'calls',     ing: 'calling',      past: 'called',     pp: 'called',      arStem: 'تصل',  arPastStem: 'اتصل', arPastOv: { they: 'اتصلوا' }, arPresOv: { they: 'يتصلون' } },
  send:    { en: 'send',    s: 'sends',     ing: 'sending',      past: 'sent',       pp: 'sent',        arStem: 'رسل',  arPastStem: 'أرسل', arPastOv: { they: 'أرسلوا' }, arPresOv: { they: 'يرسلون' } },
  speak:   { en: 'speak',   s: 'speaks',    ing: 'speaking',     past: 'spoke',      pp: 'spoken',      arStem: 'تحدث', arPastStem: 'تحدث' },
  talk:    { en: 'talk',    s: 'talks',     ing: 'talking',      past: 'talked',     pp: 'talked',      arStem: 'تحدث', arPastStem: 'تحدث' },
  ask:     { en: 'ask',     s: 'asks',      ing: 'asking',       past: 'asked',      pp: 'asked',       arStem: 'سأل',  arPastStem: 'سأل' },
  answer:  { en: 'answer',  s: 'answers',   ing: 'answering',    past: 'answered',   pp: 'answered',    arStem: 'جيب',  arPastStem: 'أجاب', arPastOv: { they: 'أجابوا' }, arPresOv: { they: 'يجيبون' } },
  help:    { en: 'help',    s: 'helps',     ing: 'helping',      past: 'helped',     pp: 'helped',      arStem: 'ساعد', arPastStem: 'ساعد' },
  like:    { en: 'like',    s: 'likes',     ing: 'liking',       past: 'liked',      pp: 'liked',       arStem: 'حب',   arPastStem: 'أحبّ', arPastOv: { they: 'أحبوا' }, arPresOv: { they: 'يحبون' } },
  love:    { en: 'love',    s: 'loves',     ing: 'loving',       past: 'loved',      pp: 'loved',       arStem: 'حب',   arPastStem: 'أحبّ', arPastOv: { they: 'أحبوا' }, arPresOv: { they: 'يحبون' } },
  want:    { en: 'want',    s: 'wants',     ing: 'wanting',      past: 'wanted',     pp: 'wanted',      arStem: 'ريد',  arPastStem: 'أراد', arPastOv: { they: 'أرادوا' }, arPresOv: { they: 'يريدون' } },
  need:    { en: 'need',    s: 'needs',     ing: 'needing',      past: 'needed',     pp: 'needed',      arStem: 'حتاج', arPastStem: 'احتاج' },
  try:     { en: 'try',     s: 'tries',     ing: 'trying',       past: 'tried',      pp: 'tried',       arStem: 'حاول', arPastStem: 'حاول' },
  use:     { en: 'use',     s: 'uses',      ing: 'using',        past: 'used',       pp: 'used',        arStem: 'ستعمل', arPastStem: 'استخدم' },
  think:   { en: 'think',   s: 'thinks',    ing: 'thinking',     past: 'thought',    pp: 'thought',     arStem: 'فكر',  arPastStem: 'فكّر' },
  know:    { en: 'know',    s: 'knows',     ing: 'knowing',      past: 'knew',       pp: 'known',       arStem: 'عرف',  arPastStem: 'عرف' },
  remember:{ en: 'remember',s: 'remembers', ing: 'remembering',  past: 'remembered', pp: 'remembered',  arStem: 'تذكر', arPastStem: 'تذكّر' },
  forget:  { en: 'forget',  s: 'forgets',   ing: 'forgetting',   past: 'forgot',     pp: 'forgotten',   arStem: 'نسى',  arPastStem: 'نسي',  arPastOv: { they: 'نسيوا' }, arPresOv: { they: 'ينسون' } },
  find:    { en: 'find',    s: 'finds',     ing: 'finding',      past: 'found',      pp: 'found',       arStem: 'جد',   arPastStem: 'وجد',  arPastOv: { they: 'وجدوا' }, arPresOv: { they: 'يجدون' } },
  lose:    { en: 'lose',    s: 'loses',     ing: 'losing',       past: 'lost',       pp: 'lost',        arStem: 'فقد',  arPastStem: 'فقد' },
  wear:    { en: 'wear',    s: 'wears',     ing: 'wearing',      past: 'wore',       pp: 'worn',        arStem: 'لبس',  arPastStem: 'لبس' },
  clean:   { en: 'clean',   s: 'cleans',    ing: 'cleaning',     past: 'cleaned',    pp: 'cleaned',     arStem: 'نظف',  arPastStem: 'نظّف' },
  wash:    { en: 'wash',    s: 'washes',    ing: 'washing',      past: 'washed',     pp: 'washed',      arStem: 'غسل',  arPastStem: 'غسل' },
  listen:  { en: 'listen',  s: 'listens',   ing: 'listening',    past: 'listened',   pp: 'listened',    arStem: 'ستمع', arPastStem: 'استمع' },
  live:    { en: 'live',    s: 'lives',     ing: 'living',       past: 'lived',      pp: 'lived',       arStem: 'سكن',  arPastStem: 'سكن' },
  sit:     { en: 'sit',     s: 'sits',      ing: 'sitting',      past: 'sat',        pp: 'sat',         arStem: 'جلس',  arPastStem: 'جلس' },
  stand:   { en: 'stand',   s: 'stands',    ing: 'standing',     past: 'stood',      pp: 'stood',       arStem: 'قف',   arPastStem: 'وقف',  arPastOv: { they: 'وقفوا' }, arPresOv: { they: 'يقفون' } },
  give:    { en: 'give',    s: 'gives',     ing: 'giving',       past: 'gave',       pp: 'given',       arStem: 'عطي',  arPastStem: 'أعطى', arPastOv: { they: 'أعطوا' }, arPresOv: { they: 'يعطون' } },
  take:    { en: 'take',    s: 'takes',     ing: 'taking',       past: 'took',       pp: 'taken',       arStem: 'أخذ',  arPastStem: 'أخذ',  arPresOv: { I: 'آخذ' } },
  get:     { en: 'get',     s: 'gets',      ing: 'getting',      past: 'got',        pp: 'got',         arStem: 'حصل',  arPastStem: 'حصل' },
  bring:   { en: 'bring',   s: 'brings',    ing: 'bringing',     past: 'brought',    pp: 'brought',     arStem: 'حضر',  arPastStem: 'أحضر' },
  say:     { en: 'say',     s: 'says',      ing: 'saying',       past: 'said',       pp: 'said',        arStem: 'قول',  arPastStem: 'قال',  arPastOv: { they: 'قالوا' }, arPresOv: { they: 'يقولون' } },
  tell:    { en: 'tell',    s: 'tells',     ing: 'telling',      past: 'told',       pp: 'told',        arStem: 'خبر',  arPastStem: 'أخبر' },
  hear:    { en: 'hear',    s: 'hears',     ing: 'hearing',      past: 'heard',      pp: 'heard',       arStem: 'سمع',  arPastStem: 'سمع' },
  feel:    { en: 'feel',    s: 'feels',     ing: 'feeling',      past: 'felt',       pp: 'felt',        arStem: 'شعر',  arPastStem: 'شعر' },
  keep:    { en: 'keep',    s: 'keeps',     ing: 'keeping',      past: 'kept',       pp: 'kept',        arStem: 'حفظ',  arPastStem: 'حفظ' },
  practice:{ en: 'practice',s: 'practices', ing: 'practicing',   past: 'practiced',  pp: 'practiced',   arStem: 'تمرن', arPastStem: 'تمرّن' },
  check:   { en: 'check',   s: 'checks',    ing: 'checking',     past: 'checked',    pp: 'checked',     arStem: 'فحص',  arPastStem: 'فحص' },
  plan:    { en: 'plan',    s: 'plans',     ing: 'planning',     past: 'planned',    pp: 'planned',     arStem: 'خطط',  arPastStem: 'خطّط' },
  book:    { en: 'book',    s: 'books',     ing: 'booking',      past: 'booked',     pp: 'booked',      arStem: 'حجز',  arPastStem: 'حجز' },
  order:   { en: 'order',   s: 'orders',    ing: 'ordering',     past: 'ordered',    pp: 'ordered',     arStem: 'طلب',  arPastStem: 'طلب' },
  choose:  { en: 'choose',  s: 'chooses',   ing: 'choosing',     past: 'chose',      pp: 'chosen',      arStem: 'ختار', arPastStem: 'اختار', arPastOv: { they: 'اختاروا' }, arPresOv: { they: 'يختارون' } },
  move:    { en: 'move',    s: 'moves',     ing: 'moving',       past: 'moved',      pp: 'moved',       arStem: 'نتقل', arPastStem: 'انتقل' },
  change:  { en: 'change',  s: 'changes',   ing: 'changing',     past: 'changed',    pp: 'changed',     arStem: 'غير',  arPastStem: 'غيّر' },
  rest:    { en: 'rest',    s: 'rests',     ing: 'resting',      past: 'rested',     pp: 'rested',      arStem: 'ستريح', arPastStem: 'استرح' },
  relax:   { en: 'relax',   s: 'relaxes',   ing: 'relaxing',     past: 'relaxed',    pp: 'relaxed',     arStem: 'سترخي', arPastStem: 'استراح', arPastOv: { they: 'استراحوا' }, arPresOv: { they: 'يستريحون' } },
  enjoy:   { en: 'enjoy',   s: 'enjoys',    ing: 'enjoying',     past: 'enjoyed',    pp: 'enjoyed',     arStem: 'ستمتع', arPastStem: 'استمتع' },
  spend:   { en: 'spend',   s: 'spends',    ing: 'spending',     past: 'spent',      pp: 'spent',       arStem: 'قضى',  arPastStem: 'قضى',  arPastOv: { they: 'قضوا' }, arPresOv: { they: 'يقضون' } },
  stay:    { en: 'stay',    s: 'stays',     ing: 'staying',      past: 'stayed',     pp: 'stayed',      arStem: 'قيم',  arPastStem: 'أقام', arPastOv: { they: 'أقاموا' }, arPresOv: { they: 'يقيمون' } },
  fly:     { en: 'fly',     s: 'flies',     ing: 'flying',       past: 'flew',       pp: 'flown',       arStem: 'طير',  arPastStem: 'طار',  arPastOv: { they: 'طاروا' }, arPresOv: { they: 'يطيرون' } },
  rain:    { en: 'rain',    s: 'rains',     ing: 'raining',      past: 'rained',     pp: 'rained',      arStem: 'مطر',  arPastStem: 'أمطر', arPastOv: { they: 'أمطروا' }, arPresOv: { they: 'تمطر', I: 'أمطر' } },
  save:    { en: 'save',    s: 'saves',     ing: 'saving',       past: 'saved',      pp: 'saved',       arStem: 'دخر',  arPastStem: 'ادخر', arPastOv: { they: 'ادخروا' }, arPresOv: { they: 'يدخرون' } },
  snow:    { en: 'snow',    s: 'snows',     ing: 'snowing',      past: 'snowed',     pp: 'snowed',      arStem: 'ثلج',  arPastStem: 'ثلج' },
  attend:  { en: 'attend',  s: 'attends',   ing: 'attending',    past: 'attended',   pp: 'attended',    arStem: 'حضر',  arPastStem: 'حضر' },
  join:    { en: 'join',    s: 'joins',     ing: 'joining',      past: 'joined',     pp: 'joined',      arStem: 'نضم',  arPastStem: 'انضم', arPastOv: { they: 'انضموا' }, arPresOv: { they: 'ينضمون' } },
  carry:   { en: 'carry',   s: 'carries',   ing: 'carrying',     past: 'carried',    pp: 'carried',     arStem: 'حمل',  arPastStem: 'حمل' },
};

/* ---------- conjugation functions ---------- */

/** English present simple form for an agreement class. */
export function enPresent(verbKey, agr) {
  const v = VERBS[verbKey];
  if (!v) throw new Error(`unknown verb: ${verbKey}`);
  return (agr === 'he' || agr === 'she') ? v.s : v.en;
}

export function enPast(verbKey) {
  return VERBS[verbKey].past;
}
export function enPP(verbKey) {
  return VERBS[verbKey].pp;
}
export function enIng(verbKey) {
  return VERBS[verbKey].ing;
}

/** Arabic present form (no pronoun included). */
export function arPresent(verbKey, agr) {
  const v = VERBS[verbKey];
  const ov = v.arPresOv && v.arPresOv[agr];
  if (ov) return ov;
  const stem = v.arStem;
  if (agr === 'they') {
    return stem.endsWith('ى') || stem.endsWith('ا') ? AR_PRESENT_PREFIX.they + stem.slice(0, -1) + 'ون' : AR_PRESENT_PREFIX.they + stem + 'ون';
  }
  return AR_PRESENT_PREFIX[agr] + stem;
}

/** Arabic past form (no pronoun included). */
export function arPast(verbKey, agr) {
  const v = VERBS[verbKey];
  const ov = v.arPastOv && v.arPastOv[agr];
  if (ov) return ov;
  if (agr === 'they') {
    const stem = v.arPastStem;
    return stem.endsWith('ى') ? stem.slice(0, -1) + 'وا' : stem + 'وا';
  }
  // verbs ending in ى (أنهى، مشى) recover ي before a suffix: أنهى + ت → أنهيت
  const stem = v.arPastStem.endsWith('ى') ? v.arPastStem.slice(0, -1) + 'ي' : v.arPastStem;
  return stem + AR_PAST_SUFFIX[agr];
}

/** Arabic future (س + present). */
export function arFuture(verbKey, agr) {
  return 'س' + arPresent(verbKey, agr);
}

export { AR_KANA, AR_FUT_KANA };
