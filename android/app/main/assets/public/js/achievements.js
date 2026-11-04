/* ============================================================
   LingoStep — achievements.js  (v8 mobile transformation)
   Honest, computed-only achievements: every badge is derived from
   the learner's REAL stored progress (lessons, attempts, XP,
   streaks, dialogues, vocabulary). No fake counters, no stored
   achievement state — nothing to migrate, nothing to lose.

   - ACHIEVEMENTS: definitions with measurable targets
   - evaluateAchievements(data): → [{ id, unlocked, value, target, progress }]
   - renderAchievementsView(container): #/achievements screen
   - recentUnlocked(limit): for the home dashboard strip
   ============================================================ */

import { el } from './utils.js';
import { icon, iconLabel } from './icons.js';
import { t } from './i18n.js';
import { getSettings } from './settings.js';
import { getOverview, getAllLessonStates } from './progress.js';
import { getTotalXp } from './xp.js';
import { loadVocabStats } from './vocabulary.js';
import { getManifest } from './lesson-loader.js';
import { kvGet } from './storage.js';
import { totalCount as reviewTotalCount } from './review.js';

/* ---------- helpers ---------- */

function countDialogueSessions(attempts) {
  const ids = new Set();
  for (const key of Object.keys(attempts || {})) {
    const m = /^dialogue-\d+-s\d+$/.exec(key);
    if (m) ids.add(m[1]);
  }
  return ids.size;
}

function perfectLessons(states) {
  let n = 0;
  for (const st of Object.values(states || {})) {
    if (st && st.completed && Number(st.bestAccuracy) >= 100) n += 1;
  }
  return n;
}

function bestLessonAccuracy(states) {
  let best = 0;
  for (const st of Object.values(states || {})) {
    if (st && Number(st.bestAccuracy) > best) best = Number(st.bestAccuracy);
  }
  return best;
}

/* ---------- definitions ---------- */

const T = (en, ar) => ({ en, ar });

export const ACHIEVEMENTS = [
  {
    id: 'first-lesson', icon: 'play', color: 'blue',
    title: T('First Steps', 'أول خطوة'),
    desc: T('Complete your first lesson', 'أكمل أول درس'),
    target: 1, unit: 'lessons',
    value: (d) => d.overview.completedLessons,
  },
  {
    id: 'lessons-10', icon: 'books', color: 'blue',
    title: T('Getting Serious', 'على المسار الصحيح'),
    desc: T('Complete 10 lessons', 'أكمل 10 دروس'),
    target: 10, unit: 'lessons',
    value: (d) => d.overview.completedLessons,
  },
  {
    id: 'lessons-30', icon: 'books', color: 'purple',
    title: T('Dedicated Learner', 'متعلم مثابر'),
    desc: T('Complete 30 lessons', 'أكمل 30 درسًا'),
    target: 30, unit: 'lessons',
    value: (d) => d.overview.completedLessons,
  },
  {
    id: 'lessons-75', icon: 'trophy', color: 'purple',
    title: T('Half the Mountain', 'منتصف الجبل'),
    desc: T('Complete 75 lessons', 'أكمل 75 درسًا'),
    target: 75, unit: 'lessons',
    value: (d) => d.overview.completedLessons,
  },
  {
    id: 'lessons-all', icon: 'trophy', color: 'gold',
    title: T('Course Champion', 'بطل الدورة'),
    desc: T('Complete all 252 lessons', 'أكمل كل الدروس الـ 252'),
    target: 252, unit: 'lessons',
    value: (d) => d.overview.completedLessons,
  },
  {
    id: 'streak-3', icon: 'flame', color: 'orange',
    title: T('Warming Up', 'بداية ساخنة'),
    desc: T('Keep a 3-day streak', 'حافظ على سلسلة 3 أيام'),
    target: 3, unit: 'days',
    value: (d) => d.overview.bestStreak,
  },
  {
    id: 'streak-7', icon: 'flame', color: 'orange',
    title: T('Week of Fire', 'أسبوع من الالتزام'),
    desc: T('Keep a 7-day streak', 'حافظ على سلسلة 7 أيام'),
    target: 7, unit: 'days',
    value: (d) => d.overview.bestStreak,
  },
  {
    id: 'streak-30', icon: 'flame', color: 'gold',
    title: T('Unstoppable', 'لا يتوقف'),
    desc: T('Keep a 30-day streak', 'حافظ على سلسلة 30 يومًا'),
    target: 30, unit: 'days',
    value: (d) => d.overview.bestStreak,
  },
  {
    id: 'xp-100', icon: 'sparkle', color: 'blue',
    title: T('Spark Collector', 'جامع النقاط'),
    desc: T('Earn 100 XP', 'اجمع 100 نقطة خبرة'),
    target: 100, unit: 'xp',
    value: (d) => d.xp,
  },
  {
    id: 'xp-1000', icon: 'sparkle', color: 'purple',
    title: T('XP Hunter', 'صائد النقاط'),
    desc: T('Earn 1,000 XP', 'اجمع 1,000 نقطة خبرة'),
    target: 1000, unit: 'xp',
    value: (d) => d.xp,
  },
  {
    id: 'xp-5000', icon: 'trophy', color: 'gold',
    title: T('XP Legend', 'أسطورة النقاط'),
    desc: T('Earn 5,000 XP', 'اجمع 5,000 نقطة خبرة'),
    target: 5000, unit: 'xp',
    value: (d) => d.xp,
  },
  {
    id: 'answers-100', icon: 'pen', color: 'teal',
    title: T('Hundred Sentences', 'مئة جملة'),
    desc: T('Practice 100 sentences', 'تدرّب على 100 جملة'),
    target: 100, unit: 'answers',
    value: (d) => d.overview.totalAnswers,
  },
  {
    id: 'answers-1000', icon: 'pen', color: 'blue',
    title: T('Sentence Machine', 'آلة الجمل'),
    desc: T('Practice 1,000 sentences', 'تدرّب على 1,000 جملة'),
    target: 1000, unit: 'answers',
    value: (d) => d.overview.totalAnswers,
  },
  {
    id: 'answers-5000', icon: 'target', color: 'purple',
    title: T('Marathon Mind', 'عقل الماراثون'),
    desc: T('Practice 5,000 sentences', 'تدرّب على 5,000 جملة'),
    target: 5000, unit: 'answers',
    value: (d) => d.overview.totalAnswers,
  },
  {
    id: 'sharp-80', icon: 'target', color: 'green',
    title: T('Sharp Shooter', 'دقة عالية'),
    desc: T('Reach 80% accuracy (50+ answers)', 'حقق دقة 80% مع 50 إجابة فأكثر'),
    target: 80, unit: 'percent',
    value: (d) => (d.overview.totalAnswers >= 50 ? d.overview.accuracy : 0),
  },
  {
    id: 'sharp-90', icon: 'target', color: 'gold',
    title: T('Near Perfect', 'دقة شبه مثالية'),
    desc: T('Reach 90% accuracy (300+ answers)', 'حقق دقة 90% مع 300 إجابة فأكثر'),
    target: 90, unit: 'percent',
    value: (d) => (d.overview.totalAnswers >= 300 ? d.overview.accuracy : 0),
  },
  {
    id: 'perfect-1', icon: 'checkCircle', color: 'green',
    title: T('Flawless Lesson', 'درس بلا أخطاء'),
    desc: T('Finish a lesson with 100% accuracy', 'أنهِ درسًا بدقة 100%'),
    target: 1, unit: 'lessons',
    value: (d) => d.perfects,
  },
  {
    id: 'perfect-10', icon: 'checkCircle', color: 'purple',
    title: T('Perfectionist', 'الكمالي'),
    desc: T('Finish 10 lessons with 100% accuracy', 'أنهِ 10 دروس بدقة 100%'),
    target: 10, unit: 'lessons',
    value: (d) => d.perfects,
  },
  {
    id: 'dialogue-1', icon: 'conversation', color: 'teal',
    title: T('First Conversation', 'أول محادثة'),
    desc: T('Finish a full dialogue practice', 'أكمل تدرّب محادثة كامل'),
    target: 1, unit: 'dialogues',
    value: (d) => d.dialogues,
  },
  {
    id: 'dialogue-10', icon: 'conversation', color: 'blue',
    title: T('Conversationalist', 'محاوِر ماهر'),
    desc: T('Finish 10 dialogue practices', 'أكمل 10 تدريبات محادثة'),
    target: 10, unit: 'dialogues',
    value: (d) => d.dialogues,
  },
  {
    id: 'vocab-50', icon: 'book', color: 'blue',
    title: T('Word Collector', 'جامع الكلمات'),
    desc: T('Practice 50 vocabulary words', 'تدرّب على 50 كلمة'),
    target: 50, unit: 'words',
    value: (d) => d.vocabWords,
  },
  {
    id: 'vocab-250', icon: 'book', color: 'purple',
    title: T('Vocabulary Vault', 'خزنة المفردات'),
    desc: T('Practice 250 vocabulary words', 'تدرّب على 250 كلمة'),
    target: 250, unit: 'words',
    value: (d) => d.vocabWords,
  },
  {
    id: 'review-100', icon: 'review', color: 'teal',
    title: T('Reviewer', 'المراجع المجتهد'),
    desc: T('Build a review queue of 100 items', 'ادخل 100 عنصر إلى قائمة المراجعة'),
    target: 100, unit: 'items',
    value: (d) => d.reviewTotal,
  },
  {
    id: 'placed', icon: 'compass', color: 'orange',
    title: T('Know Your Level', 'اعرف مستواك'),
    desc: T('Take the level check', 'قم باختبار تحديد المستوى'),
    target: 1, unit: 'done',
    value: (d) => (d.placement ? 1 : 0),
  },
];

/* ---------- evaluation ---------- */

/** Load all real data once, then evaluate every achievement. */
export async function loadAchievementData() {
  const [overview, xp, states, vocabStats, reviewTotal] = await Promise.all([
    getOverview(), getTotalXp(), getAllLessonStates(), loadVocabStats(), reviewTotalCount(),
  ]);
  const attempts = await kvGet('attempts', {});
  const placement = await kvGet('placementResult', null);
  return {
    overview,
    xp,
    states,
    perfects: perfectLessons(states),
    best: bestLessonAccuracy(states),
    dialogues: countDialogueSessions(attempts),
    vocabWords: vocabStats && typeof vocabStats === 'object' ? Object.keys(vocabStats).length : 0,
    reviewTotal,
    placement: Boolean(placement && typeof placement === 'object'),
  };
}

export function evaluateAchievements(data) {
  return ACHIEVEMENTS.map((a) => {
    const value = Math.max(0, Math.floor(a.value(data) || 0));
    const unlocked = value >= a.target;
    return {
      id: a.id,
      title: a.title,
      desc: a.desc,
      icon: a.icon,
      color: a.color,
      target: a.target,
      unit: a.unit,
      value: Math.min(value, a.target),
      unlocked,
      progress: Math.min(100, Math.round((value / a.target) * 100)),
    };
  });
}

/* ---------- views ---------- */

const UNIT_KEYS = {
  lessons: { en: 'lessons', ar: 'دروس' },
  days: { en: 'days', ar: 'أيام' },
  xp: { en: 'XP', ar: 'نقاط' },
  answers: { en: 'answers', ar: 'إجابات' },
  percent: { en: '%', ar: '%' },
  dialogues: { en: 'dialogues', ar: 'محادثات' },
  words: { en: 'words', ar: 'كلمات' },
  items: { en: 'items', ar: 'عناصر' },
  done: { en: '', ar: '' },
};

function unitLabel(unit, lang) {
  const u = UNIT_KEYS[unit] || { en: '', ar: '' };
  return lang === 'ar' ? u.ar : u.en;
}

function badgeCard(a, lang) {
  const fmt = (n) => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(n);
  const ring = el('span', { class: `ach-badge ach-${a.color}${a.unlocked ? ' is-unlocked' : ''}` }, [icon(a.icon)]);
  const card = el('div', { class: `ach-card${a.unlocked ? ' is-unlocked' : ''}` }, [
    ring,
    el('div', { class: 'ach-body' }, [
      el('div', { class: 'ach-title', text: lang === 'ar' ? a.title.ar : a.title.en }),
      el('div', { class: 'ach-desc', text: lang === 'ar' ? a.desc.ar : a.desc.en }),
      el('div', { class: 'ach-progress' }, [el('span', { style: { width: `${a.progress}%` } })]),
      el('div', { class: 'ach-meta', text: a.unlocked
        ? t(lang, 'achUnlocked')
        : `${fmt(a.value)} / ${fmt(a.target)} ${unitLabel(a.unit, lang)}` }),
    ]),
  ]);
  return card;
}

/** Full #/achievements screen. */
export async function renderAchievementsView(view) {
  const settings = getSettings();
  const lang = settings.lang;
  const data = await loadAchievementData();
  const results = evaluateAchievements(data);
  const unlockedCount = results.filter((r) => r.unlocked).length;
  const fmt = (n) => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(n);

  const head = el('div', { class: 'page-head' }, [
    el('h2', {}, [iconLabel('trophy', t(lang, 'achTitle'))]),
    el('p', { text: t(lang, 'achIntro') }),
  ]);

  const summaryCard = el('div', { class: 'card ach-summary' }, [
    el('div', { class: 'ach-count' }, [
      el('span', { class: 'ach-count-num', text: fmt(unlockedCount) }),
      el('span', { class: 'ach-count-total', text: `/ ${fmt(results.length)}` }),
    ]),
    el('div', { class: 'ach-summary-text' }, [
      el('strong', { text: t(lang, 'achSummaryTitle') }),
      el('span', { class: 'muted small', text: t(lang, 'achSummarySub') }),
    ]),
    el('div', { class: 'progress ach-total-bar' }, [el('span', { style: { width: `${Math.round((unlockedCount / results.length) * 100)}%` } })]),
  ]);

  const grid = el('div', { class: 'ach-grid' }, results.map((a) => badgeCard(a, lang)));

  view.replaceChildren(head, summaryCard, grid);
}

/** Strip of most-recently-relevant badges for the home dashboard. */
export async function renderAchievementsStrip() {
  const lang = getSettings().lang;
  const data = await loadAchievementData();
  const results = evaluateAchievements(data);
  const unlocked = results.filter((r) => r.unlocked);
  const closest = results
    .filter((r) => !r.unlocked)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);
  const shown = [...unlocked.slice(-3).reverse(), ...closest];
  return el('div', { class: 'ach-strip' }, shown.map((a) => badgeCard(a, lang)));
}
