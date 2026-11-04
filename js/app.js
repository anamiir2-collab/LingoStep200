/* ============================================================
   LingoStep — app.js
   Application shell + views: dashboard, section list, review hub,
   statistics, settings. Wires router, settings, i18n, SW updates.
   ============================================================ */

import { el, $, pct, formatDuration, toast, normKey } from './utils.js';
import { icon, iconLabel } from './icons.js';
import { t } from './i18n.js';
import { getSettings, saveSettings, applyDocumentSettings } from './settings.js';
import { start as startRouter, onChange, navigate, docTitle } from './router.js';
import { getManifest, getManifestBySection, getManifestEntry } from './lesson-loader.js';
import { renderAudioSettingsPanel } from './audio-upgrade/ui.js';
import { saveAudioSettings, SPEED_PRESETS } from './audio-upgrade/core.js';
import { renderLessonPlayer, renderErrorState } from './lesson-engine.js';
import { getOverview, getToday, getDailyHistory, getAllLessonStates, exportBackup, importBackup, clearAllProgress } from './progress.js';
import { dueCount, dueItems, availableTags, totalCount as reviewTotalCount } from './review.js';
import { isSupported as speechSupported, loadVoices, englishVoices, speak, stopSpeaking } from './speech.js';
import { getTotalXp } from './xp.js';
import { renderVocabularyView } from './vocabulary.js';
import { renderBookDialoguesView } from './book-dialogues.js';
import { renderDialoguePractice } from './dialogues.js';
import { messageForFirstVisit } from './motivation.js';
import { renderAchievementsView, renderAchievementsStrip } from './achievements.js';
import { renderPlacementView } from './placement-view.js';
import { confirmDialog } from './lesson-engine.js';
import { isNativeApp, initStatusBar, initBackButton, initLifecyclePause, hideSplash, setDailyReminder, exitApp } from './native.js';
import { getAttemptSummary } from './progress.js';

const SECTIONS_META = [
  { id: 'foundations', icon: 'basics', en: 'Foundations & Core Communication', ar: 'التأسيس والتواصل الأساسي', descEn: 'Greetings, self-introduction, pronouns, numbers, question words, first sentences, pronunciation inside words', descAr: 'التحيات، التعريف بالنفس، الضمائر، الأرقام، أدوات الاستفهام، أولى الجمل، النطق داخل الكلمات والجمل' },
  { id: 'daily-life', icon: 'sun', en: 'Simple Daily Life', ar: 'الحياة اليومية البسيطة', descEn: 'Routines, time, polite requests, phone calls, descriptions, feelings, directions, cafés and transport', descAr: 'الروتين، الوقت، الطلبات المهذبة، المكالمات، الوصف، المشاعر، الاتجاهات، المقهى والمواصلات' },
  { id: 'home-family', icon: 'home', en: 'Home & Family', ar: 'المنزل والأسرة', descEn: 'Family ties, rooms, cleaning, cooking, groceries, repairs, guests, neighbors, bills and home safety', descAr: 'الأقارب، الغرف، التنظيف، الطبخ، البقالة، الإصلاحات، الضيوف، الجيران، الفواتير والسلامة' },
  { id: 'food-services', icon: 'package', en: 'Food, Shopping & Services', ar: 'الطعام والتسوق والخدمات', descEn: 'Restaurants, allergies, supermarkets, clothes, returns, complaints, pharmacies, banks and the post office', descAr: 'المطاعم، الحساسية، السوبر ماركت، الملابس، الاسترجاع، الشكاوى، الصيدلية، البنك والبريد' },
  { id: 'travel', icon: 'compass', en: 'Mobility & Travel', ar: 'التنقل والسفر', descEn: 'Buses, metro, driving, trains, airports, hotels, customs, currency, tours and travel problems', descAr: 'الحافلات، المترو، القيادة، القطارات، المطار، الفنادق، الجمارك، العملات والجولات' },
  { id: 'health-emergency', icon: 'alert', en: 'Health & Emergencies', ar: 'الصحة والطوارئ', descEn: 'Doctors, symptoms, medicine, hospitals, insurance, emergency calls, first aid, healthy habits and caregiving', descAr: 'الأطباء، الأعراض، الدواء، المستشفى، التأمين، الطوارئ، الإسعافات، العادات الصحية والرعاية' },
  { id: 'social-communication', icon: 'conversation', en: 'Relationships & Social Communication', ar: 'العلاقات والتواصل الاجتماعي', descEn: 'Small talk, invitations, opinions, advice, boundaries, friendship, celebrations and etiquette', descAr: 'الدردشة، الدعوات، الآراء، النصيحة، الحدود الشخصية، الصداقة، المناسبات وآداب التواصل' },
  { id: 'work-money', icon: 'chart', en: 'Work & Money', ar: 'العمل والمال', descEn: 'CVs, interviews, meetings, emails, presentations, salaries, budgeting, banks, contracts and invoices', descAr: 'السيرة الذاتية، المقابلات، الاجتماعات، البريد المهني، الرواتب، الميزانية، البنوك والعقود' },
  { id: 'education-digital', icon: 'monitor', en: 'Education & Digital Skills', ar: 'التعليم والمهارات الرقمية', descEn: 'Schools, courses, exams, online learning, devices, security, video calls, AI tools and study skills', descAr: 'المدارس، الدورات، الامتحانات، التعلم الرقمي، الأجهزة، الأمان، مكالمات الفيديو وأدوات الذكاء' },
  { id: 'complex-rights', icon: 'grammar', en: 'Complex Situations & Rights', ar: 'المواقف المعقدة والحقوق', descEn: 'Formal complaints, refunds, landlord issues, police reports, insurance claims, passports and legal letters', descAr: 'الشكاوى الرسمية، الاسترجاع، المالك والمستأجر، بلاغات الشرطة، التأمين، الجوازات والخطابات' },
  { id: 'specialized', icon: 'trophy', en: 'Specialized English & Leadership', ar: 'التخصصات والقيادة', descEn: 'Business, finance, healthcare, technology, tourism, legal and HR English, leadership and public speaking', descAr: 'إنجليزية الأعمال والمال والصحة والتكنولوجيا والسياحة والقانون، القيادة والتحدث أمام الجمهور' },
];

let appRoot = null;
let currentLang = 'en';

const APP_VERSION = '9.0.0';

/* ---- UI refresh (v7): shared helpers for the redesigned home/courses ---- */
const ACCENTS = ['blue', 'orange', 'purple', 'teal', 'green'];
const accentFor = (i) => ACCENTS[((i % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];

function filterEmptyState(L) {
  return el('div', { class: 'state-box', style: { padding: '1.5rem', textAlign: 'center' } }, [
    el('div', { class: 'big' }, [icon('leaf')]),
    el('p', { class: 'muted', style: { margin: '.4rem 0 0' }, text: t(L, 'uiEmptyFilter') }),
  ]);
}

function sectionDone(list, states) {
  return list.filter((l) => states[l.id]?.completed).length;
}

/* ============================================================
   Boot
   ============================================================ */

async function boot() {
  appRoot = $('#app');
  const settings = getSettings();
  currentLang = settings.lang;
  applyDocumentSettings(settings);

  renderShell();
  onChange((route) => handleRoute(route));
  startRouter();

  // v9 native-app polish (Android): status bar, back button, lifecycle.
  // All no-ops on the web/PWA build.
  initStatusBar();
  initLifecyclePause(() => stopSpeaking());
  initBackButton(async () => {
    // at the app root: never close without explicit confirmation
    const hash = location.hash || '#/';
    if (hash === '#/' || hash === '#' || hash === '') {
      const ok = await confirmDialog({
        title: t(currentLang, 'exitAppTitle'),
        body: t(currentLang, 'exitAppBody'),
        confirmText: t(currentLang, 'confirmExitShort'),
        cancelText: t(currentLang, 'cancelBtn'),
        danger: true,
        lang: currentLang,
      });
      if (ok) await exitApp();
      return true; // always consumed at root
    }
    return false; // inside the app: normal history navigation
  });

  // voices preload (best effort)
  if (speechSupported()) loadVoices();

  // service worker registration (PWA / offline)
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            import('./utils.js').then(({ toast }) => toast(t(currentLang, 'updateReady'), 6000));
          }
        });
      });
    } catch { /* offline features disabled; app still works */ }
  }

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    import('./utils.js').then(({ toast }) => toast(t(currentLang, 'networkOffline'), 4000));
  }

  // native splash down once the shell is interactive
  setTimeout(() => hideSplash(), 120);
}

function renderShell() {
  const L = currentLang;
  const header = el('header', { class: 'app-header' }, [
    el('div', { class: 'header-inner' }, [
      el('a', { class: 'brand', href: '#/' }, [
        el('img', { class: 'brand-badge', src: './icons/icon-192.png', alt: '', width: '38', height: '38', decoding: 'async' }),
        el('span', { class: 'brand-name', text: 'LingoStep' }),
      ]),
      el('nav', { class: 'main-nav', 'aria-label': 'Main' }, [
        navLink('navHome', '#/', 'home'),
        navLink('navSections', '#/sections', 'sections'),
        navLink('navVocabulary', '#/vocabulary', 'vocabulary'),
        navLink('navDialogues', '#/dialogues', 'dialogues'),
        navLink('navProgress', '#/progress', 'progress'),
        navLink('navReview', '#/review', 'review'),
        navLink('navMore', '#/more', 'more'),
      ]),
    ]),
  ]);

  const main = el('main', { class: 'app-main', id: 'view' });
  const footer = el('footer', { class: 'app-footer' }, [
    el('span', { text: t(L, 'footerNote') }),
  ]);

  // Mobile bottom navigation — five one-hand-friendly destinations.
  // Dialogues, revision, achievements and profile stay one tap away
  // from Home quick actions and the More hub.
  const mobileNav = el('nav', { class: 'mobile-bottom-nav', 'aria-label': L === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation' }, [
    mobileNavLink('navHome', '#/', 'home', 'home'),
    mobileNavLink('navSections', '#/sections', 'sections', 'grid'),
    mobileNavLink('navVocabulary', '#/vocabulary', 'vocabulary', 'book'),
    mobileNavLink('navProgress', '#/progress', 'progress', 'chart'),
    mobileNavLink('navMore', '#/more', 'more', 'more'),
  ]);

  appRoot.replaceChildren(header, main, footer, mobileNav);
}

function navLink(labelKey, href, routeName) {
  const a = el('a', { class: 'nav-link', href, text: t(currentLang, labelKey), 'data-route': routeName });
  return a;
}

function mobileNavLink(labelKey, href, routeName, iconName) {
  return el('a', {
    class: 'mobile-nav-link',
    href,
    'aria-label': t(currentLang, labelKey),
    'data-route': routeName,
  }, [
    icon(iconName, 'mobile-nav-icon'),
    el('span', { class: 'mobile-nav-label', text: t(currentLang, labelKey) }),
  ]);
}

function updateNavState(routeName) {
  // Desktop header links highlight per exact destination group.
  const desktopMap = { home: 'home', sections: 'sections', section: 'sections', lesson: 'sections', vocabulary: 'vocabulary', dialogues: 'vocabulary', 'dialogue-practice': 'vocabulary', progress: 'progress', stats: 'progress', review: 'progress', achievements: 'progress', settings: 'more', more: 'more', profile: 'more', audio: 'more', help: 'more', faq: 'more', history: 'progress', placement: 'home' };
  document.querySelectorAll('.nav-link').forEach((a) => {
    if (a.dataset.route === desktopMap[routeName]) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Mobile bar destinations; review/achievements live under Progress,
  // dialogues under Vocabulary, everything secondary under More.
  const mobileMap = { home: 'home', review: 'progress', sections: 'sections', section: 'sections', lesson: 'sections', vocabulary: 'vocabulary', dialogues: 'vocabulary', 'dialogue-practice': 'vocabulary', progress: 'progress', stats: 'progress', achievements: 'progress', settings: 'more', more: 'more', profile: 'more', audio: 'more', help: 'more', faq: 'more', history: 'progress', placement: 'home' };
  const target = mobileMap[routeName] || '';
  [...document.querySelectorAll('.mobile-nav-link')].forEach((a) => {
    const active = a.dataset.route === target;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function onChangeRerun() {
  // re-render current route with new language.
  // Must mirror router.parseHash: "#/lesson/lesson-109" → name 'lesson',
  // params ['lesson-109'] (the route name itself is NOT a param).
  const parts = location.hash.replace(/^#\//, '').split('?')[0].split('/').filter(Boolean);
  handleRoute({ name: parts[0] || 'home', params: parts.slice(1).map(decodeURIComponent) });
}

/* ============================================================
   Router → views
   ============================================================ */

async function handleRoute(route) {
  const view = document.getElementById('view');
  if (!view) return;
  // remove any leftover practice overlays (feedback sheet, combo badge)
  document.querySelectorAll('.duo-sheet-wrap, .duo-backdrop, .combo-badge').forEach((n) => n.remove());
  stopSpeaking(); // never let practice audio leak into the next screen
  window.scrollTo(0, 0);
  updateNavState(route.name);

  try {
    if (route.name === 'home') return await viewDashboard(view);
    if (route.name === 'sections') return await viewSections(view);
    if (route.name === 'section') return await viewSection(view, route.params[0]);
    if (route.name === 'lesson') return await viewLesson(view, route.params[0]);
    if (route.name === 'vocabulary') return await viewVocabulary(view);
    if (route.name === 'dialogues') return await renderBookDialoguesView(view, route.params, currentLang);
    if (route.name === 'dialogue-practice') return await renderDialoguePractice(view, route.params, currentLang);
    if (route.name === 'review') return await viewReview(view);
    if (route.name === 'progress' || route.name === 'stats') return await viewProgress(view);
    if (route.name === 'achievements') return await viewAchievements(view);
    if (route.name === 'placement') return await renderPlacementView(view); // v8: restored access (feature existed but was unreachable)
    if (route.name === 'settings') { navigate('more'); return; } // legacy route → More hub
    if (route.name === 'more') return await viewMore(view);
    if (route.name === 'profile') return await viewProfile(view);
    if (route.name === 'audio') return await viewAudioSettings(view);
    if (route.name === 'help') return await viewHelp(view);
    if (route.name === 'faq') return await viewFaq(view);
    if (route.name === 'history') return await viewHistory(view);
    return await viewDashboard(view);
  } catch (err) {
    renderErrorState(view, currentLang, err);
  }
}

function loading(view) {
  view.replaceChildren(el('div', { class: 'state-box' }, [
    el('div', { class: 'spinner', role: 'status' }),
    el('p', { text: t(currentLang, 'loading') }),
  ]));
}

/* ============================================================
   Dashboard
   ============================================================ */

function greetingPair() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return ['greetMorning', 'greetMorningName'];
  if (h >= 12 && h < 17) return ['greetAfternoon', 'greetAfternoonName'];
  if (h >= 17 && h < 21) return ['greetEvening', 'greetEveningName'];
  return ['greetNight', 'greetNightName'];
}

async function viewDashboard(view) {
  loading(view);
  docTitle('navHome');
  const L = currentLang;
  const [overview, today, states, due, totalXp] = await Promise.all([
    getOverview(), getToday(), getAllLessonStates(), dueCount(), getTotalXp(),
  ]);
  const settings = getSettings();

  const goalPct = pct(today.count, settings.dailyGoal);
  const goalLeft = Math.max(0, settings.dailyGoal - today.count);

  // ---- welcome header: greeting + name + avatar (reference home screen) ----
  const name = (settings.userName || '').trim();
  const [greetKey] = greetingPair();

  const homeHead = el('div', { class: 'home-head' }, [
    el('div', { class: 'home-titles' }, [
      el('span', { class: 'home-greet', text: t(L, greetKey) }),
      el('h1', { class: 'home-name' }, [
        el('span', { text: name || t(L, 'uiGuestName') }),
        el('span', { class: 'wave', text: '\u{1F44B}', 'aria-hidden': 'true' }),
      ]),
    ]),
    el('a', {
      class: 'home-avatar', href: '#/profile', 'aria-label': t(L, 'profileTitle'),
    }, name ? [el('span', { text: name.charAt(0).toUpperCase() })] : [icon('user')]),
  ]);

  // ---- search bar + filter button (live results over sections & lessons) ----
  const searchInput = el('input', {
    type: 'search', placeholder: t(L, 'uiSearchPlaceholder'),
    'aria-label': t(L, 'uiSearchHint'), autocomplete: 'off', spellcheck: 'false',
  });
  const searchPop = el('div', { class: 'search-pop' });
  const searchBox = el('div', { class: 'home-search' }, [icon('search'), searchInput]);
  const catRow = el('div', { class: 'cat-row' });
  const filterBtn = el('button', {
    class: 'filter-btn', type: 'button', 'aria-label': t(L, 'uiSearchHint'),
    'aria-expanded': 'true', 'aria-controls': 'home-cat-row',
    onclick: () => {
      const show = catRow.hidden; // hidden -> show
      catRow.hidden = !show;
      filterBtn.setAttribute('aria-expanded', show ? 'true' : 'false');
    },
  }, [icon('sliders')]);
  const searchRow = el('div', { class: 'home-search-row' }, [searchBox, filterBtn, searchPop]);

  const renderSearchPop = () => {
    const q = normKey(searchInput.value);
    if (q.length < 2) { searchPop.replaceChildren(); return; }
    const manifest = getManifest();
    const hits = [];
    for (const meta of SECTIONS_META) {
      const hay = normKey(`${meta.en} ${meta.ar} ${meta.descEn} ${meta.descAr}`);
      if (hay.includes(q)) {
        hits.push(el('a', { class: 'search-hit', href: `#/section/${meta.id}` }, [
          el('span', { class: 'hit-icon' }, [icon(meta.icon)]),
          el('span', { class: 'hit-titles' }, [
            el('span', { class: 'hit-t', text: L === 'ar' ? meta.ar : meta.en }),
            el('span', { class: 'hit-s', text: L === 'ar' ? meta.descAr : meta.descEn }),
          ]),
          el('span', { class: 'chip hit-chip', text: t(L, 'uiSearchHitSection') }),
        ]));
      }
    }
    for (const les of manifest) {
      if (hits.length >= 14) break;
      const hay = normKey(`${les.title} ${les.titleAr} ${les.id}`);
      if (!hay.includes(q)) continue;
      hits.push(el('a', { class: 'search-hit', href: `#/lesson/${les.id}` }, [
        el('span', { class: 'hit-icon' }, [icon('play')]),
        el('span', { class: 'hit-titles' }, [
          el('span', { class: 'hit-t', text: les.title }),
          el('span', { class: 'hit-s', text: `${les.titleAr} · ${les.level}` }),
        ]),
        el('span', { class: 'chip hit-chip', text: t(L, 'lesson') }),
      ]));
    }
    searchPop.replaceChildren(...(hits.length
      ? hits.slice(0, 14)
      : [el('p', { class: 'search-empty', text: t(L, 'uiSearchNoResults') })]));
  };
  searchInput.addEventListener('input', renderSearchPop);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { searchInput.value = ''; renderSearchPop(); searchInput.blur(); }
  });

  // ---- category pills (real progress states) + colorful course cards ----
  let homeFilter = 'all';
  const catDefs = [
    { key: 'all', label: 'uiFilterAll', accent: 'blue', icon: 'grid' },
    { key: 'ongoing', label: 'uiFilterOngoing', accent: 'orange', icon: 'clock' },
    { key: 'new', label: 'uiFilterNew', accent: 'purple', icon: 'sparkle' },
    { key: 'completed', label: 'uiFilterCompleted', accent: 'green', icon: 'check' },
  ];
  catRow.id = 'home-cat-row';

  const manifest = getManifest();
  const buildPathCards = () => SECTIONS_META
    .map((meta, i) => ({ meta, i, list: manifest.filter((l) => l.section === meta.id) }))
    .filter(({ list }) => {
      const done = sectionDone(list, states);
      if (homeFilter === 'ongoing') return done > 0 && done < list.length;
      if (homeFilter === 'new') return done === 0;
      if (homeFilter === 'completed') return list.length > 0 && done === list.length;
      return true;
    })
    .map(({ meta, i, list }) => {
      const done = sectionDone(list, states);
      const donePctv = pct(done, list.length);
      const sentences = list.reduce((s, l) => s + (l.exercises || 0), 0);
      return el('a', {
        class: 'path-card', href: `#/section/${meta.id}`, 'data-accent': accentFor(i),
      }, [
        el('span', { class: 'section-icon' }, [icon(meta.icon)]),
        el('h3', { text: L === 'ar' ? meta.ar : meta.en }),
        el('p', { class: 'path-desc', text: L === 'ar' ? meta.descAr : meta.descEn }),
        el('div', { class: 'path-meta' }, [
          el('span', { class: 'path-chip' }, [icon('books'), el('span', { text: t(L, 'sectionLessons', { n: formatNumber(list.length) }) })]),
          el('span', { class: 'path-chip' }, [icon('pen'), el('span', { text: `${formatNumber(sentences)} ${t(L, 'sentences')}` })]),
        ]),
        el('div', { class: 'progress' }, [el('span', { style: { width: `${donePctv}%` } })]),
        el('div', { class: 'path-foot' }, [
          el('span', { class: 'path-count', text: `${formatNumber(done)}/${formatNumber(list.length)} ${t(L, 'markDone')}` }),
          el('span', { class: 'path-pct', text: `${donePctv}%` }),
        ]),
      ]);
    });

  const pathsGrid = el('div', { class: 'home-paths' });
  const renderPathsGrid = () => {
    const cards = buildPathCards();
    pathsGrid.replaceChildren(...(cards.length ? cards : [filterEmptyState(L)]));
  };
  renderPathsGrid();

  for (const def of catDefs) {
    const pill = el('button', {
      class: 'cat-pill', type: 'button', 'data-accent': def.accent,
      'aria-pressed': homeFilter === def.key ? 'true' : 'false',
    }, [
      el('span', { class: 'cat-dot' }, [icon(def.icon)]),
      el('span', { text: t(L, def.label) }),
    ]);
    pill.addEventListener('click', () => {
      homeFilter = def.key;
      [...catRow.children].forEach((c) => c.setAttribute('aria-pressed', c === pill ? 'true' : 'false'));
      renderPathsGrid();
    });
    catRow.append(pill);
  }

  // ---- hero: today's plan (personalized, never shows a raw placeholder) ----
  const heroStats = el('div', { class: 'hero-stats' }, [
    el('div', { class: 'hero-stat' }, [icon('pen'), el('span', { text: `${formatNumber(today.count)} / ${formatNumber(settings.dailyGoal)} ${t(L, 'goalDoneToday')}` })]),
    el('div', { class: 'hero-stat' }, [icon('clock'), el('span', { text: `${formatDuration(today.timeMs)} ${t(L, 'todayTime')}` })]),
    el('div', { class: 'hero-stat' }, [icon('flame'), el('span', { text: `${formatNumber(overview.streak)} ${t(L, 'streakDays')}` })]),
  ]);

  const hero = el('section', { class: 'hero', 'aria-label': t(L, 'todaysPlan') }, [
    el('span', { class: 'hero-kicker' }, [icon('sparkle'), t(L, 'todaysPlan')]),
    el('h1', { text: t(L, 'todaysPlanSub') }),
    el('div', { class: 'hero-grid' }, [
      el('div', {
        class: 'goal-ring',
        style: { '--pct': String(Math.min(100, goalPct)) },
        role: 'img',
        'aria-label': `${goalPct}%`,
      }, [el('div', { class: 'goal-ring-inner', text: `${Math.min(100, goalPct)}%` })]),
      heroStats,
      el('div', { class: 'hero-actions' }, [
        overview.lastLessonId
          ? el('a', { class: 'btn', href: `#/lesson/${overview.lastLessonId}` }, [iconLabel('play', t(L, 'continueWhere'))])
          : el('a', { class: 'btn', href: `#/section/foundations` }, [iconLabel('play', t(L, 'startNow'))]),
        el('a', { class: 'btn btn-ghost', href: '#/review' }, [iconLabel('review', t(L, 'quickReview'))]),
      ]),
    ]),
  ]);

  // ---- 2 x 2 stat tiles (real data, real icons, pastel per spec) ----
  const statGrid = el('div', { class: 'stat-grid mb' }, [
    statCard(formatNumber(overview.completedLessons), t(L, 'completedLessons'), 'books'),
    statCard(formatNumber(overview.totalAnswers), t(L, 'practicedSentences'), 'pen'),
    statCard(`${overview.accuracy}%`, t(L, 'accuracy'), 'target'),
    statCard(formatNumber(overview.streak), t(L, 'streakDays'), 'flame'),
    statCard(formatNumber(totalXp), t(L, 'xpTotal'), 'sparkle'),
  ]);

  // ---- first-visit encouragement (Arabic messages dataset, {name}-aware) ----
  const firstVisitCard = (overview.totalAnswers === 0 && overview.completedLessons === 0)
    ? el('div', { class: 'card motivation-banner' }, [
        el('div', { class: 'motivation-line', dir: 'rtl', text: messageForFirstVisit(settings.userName) }),
        el('a', { class: 'btn btn-primary mt', href: '#/sections' }, [iconLabel('play', t(L, 'startNow'))]),
      ])
    : null;

  // ---- daily goal card (updates from the same single source of truth) ----
  const goalCard = el('div', { class: 'card' }, [
    el('div', { class: 'goal-card-row' }, [
      el('div', { class: 'grow' }, [
        el('h3', { class: 'card-title', text: t(L, 'dailyGoal') }),
        el('p', { class: 'muted small', style: { margin: '0 0 .6rem' }, text: today.count >= settings.dailyGoal ? t(L, 'goalReached') : t(L, 'toGo', { n: formatNumber(goalLeft) }) }),
        el('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': Math.min(100, goalPct), 'aria-valuemin': 0, 'aria-valuemax': 100 }, [el('span', { style: { width: `${Math.min(100, goalPct)}%` } })]),
      ]),
      el('span', { class: 'ring-sm', style: { '--pct': String(Math.min(100, goalPct)) }, text: `${today.count}/${settings.dailyGoal}` }),
    ]),
  ]);

  // ---- revision quick access ----
  const reviewCard = el('div', { class: 'card' }, [
    el('div', { class: 'row-between' }, [
      el('div', { class: 'grow', style: { minWidth: '200px' } }, [
        el('h3', { class: 'card-title', style: { margin: 0 }, text: t(L, 'quickReview') }),
        el('p', { class: 'muted small', style: { margin: '.15rem 0 .5rem' }, text: t(L, 'reviewCardSub') }),
        el('span', { class: due > 0 ? 'chip chip-due' : 'chip', text: due > 0 ? `${due} ${t(L, 'reviewDue')}` : t(L, 'nothingDue') }),
      ]),
      el('a', { class: 'btn btn-primary', href: '#/review' }, [iconLabel('review', t(L, 'startReview'))]),
    ]),
  ]);

  // ---- quick actions: every feature stays one tap away (v8 five-tab nav) ----
  const quickActions = el('div', { class: 'quick-actions' }, [
    el('a', { class: 'qa-card qa-teal', href: '#/dialogues' }, [
      el('span', { class: 'qa-icon' }, [icon('conversation')]),
      el('span', { class: 'qa-label', text: t(L, 'navDialogues') }),
    ]),
    el('a', { class: 'qa-card qa-purple', href: '#/review' }, [
      el('span', { class: 'qa-icon' }, [icon('review')]),
      el('span', { class: 'qa-label', text: t(L, 'navReview') }),
    ]),
    el('a', { class: 'qa-card qa-orange', href: '#/achievements' }, [
      el('span', { class: 'qa-icon' }, [icon('trophy')]),
      el('span', { class: 'qa-label', text: t(L, 'achTitle') }),
    ]),
    el('a', { class: 'qa-card qa-blue', href: '#/placement' }, [
      el('span', { class: 'qa-icon' }, [icon('compass')]),
      el('span', { class: 'qa-label', text: t(L, 'placeShort') }),
    ]),
  ]);

  // ---- achievements strip (real computed badges; taps → full screen) ----
  const achSection = el('section', { class: 'home-ach-section', 'aria-label': t(L, 'achTitle') }, [
    el('div', { class: 'section-head row-between' }, [
      el('div', {}, [
        el('h2', { text: t(L, 'achStripTitle') }),
        el('p', { text: t(L, 'achStripSub') }),
      ]),
      el('a', { class: 'btn btn-sm', href: '#/achievements' }, [iconLabel('trophy', t(L, 'achSeeAll'))]),
    ]),
    el('div', { class: 'ach-strip-host', id: 'home-ach-strip' }, [el('div', { class: 'spinner', role: 'status' })]),
  ]);

  // ---- learning paths: quick access to every section with real progress ----
  const pathsSection = el('section', { class: 'home-paths-section', 'aria-label': t(L, 'learningPaths') }, [
    el('div', { class: 'section-head row-between' }, [
      el('div', {}, [
        el('h2', { text: t(L, 'learningPaths') }),
        el('p', { text: t(L, 'learningPathsSub') }),
      ]),
      el('a', { class: 'btn btn-sm', href: '#/sections' }, [iconLabel('grid', t(L, 'viewAll'))]),
    ]),
    pathsGrid,
  ]);

  view.replaceChildren(homeHead, searchRow, catRow, pathsSection, hero, quickActions, statGrid, achSection, ...(firstVisitCard ? [firstVisitCard] : []), goalCard, reviewCard);

  // achievements strip loads async (real data) without blocking the dashboard
  renderAchievementsStrip().then((strip) => {
    const host = document.getElementById('home-ach-strip');
    if (host) host.replaceChildren(strip);
  }).catch(() => {
    const host = document.getElementById('home-ach-strip');
    if (host) host.remove();
  });
}

function statCard(value, label, iconName) {
  return el('div', { class: 'stat-card' }, [
    el('div', { class: 'stat-icon' }, [icon(iconName)]),
    el('div', { class: 'stat-value', text: String(value) }),
    el('div', { class: 'stat-label', text: label }),
  ]);
}

function formatNumber(n) {
  return new Intl.NumberFormat(currentLang === 'ar' ? 'ar-EG' : 'en-US').format(n);
}

/* ============================================================
   Sections (all seven learning paths)
   ============================================================ */

async function viewSections(view) {
  loading(view);
  docTitle('navSections');
  const L = currentLang;
  const [manifest, states, overview] = await Promise.all([
    Promise.resolve(getManifest()), getAllLessonStates(), getOverview(),
  ]);

  // ---- toolbar: back navigation + page title + search toggle ----
  const searchArea = el('div', { class: 'page-search', hidden: true });
  const searchToggle = el('button', {
    class: 'btn btn-round', type: 'button', 'aria-label': t(L, 'uiSearchHint'),
    'aria-expanded': 'false',
    onclick: () => {
      const show = searchArea.hidden; // hidden -> show
      searchArea.hidden = !show;
      searchToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
      if (show) pageInput.focus();
    },
  }, [icon('search')]);

  const toolbar = el('div', { class: 'page-toolbar' }, [
    el('a', { class: 'btn btn-round', href: '#/', 'aria-label': t(L, 'uiBack') }, [icon('arrowLeft')]),
    el('div', { class: 'pt-titles' }, [
      el('h2', { text: t(L, 'uiCoursesTitle') }),
      el('p', { class: 'pt-sub', text: t(L, 'uiCoursesSub') }),
    ]),
    searchToggle,
  ]);

  const pageInput = el('input', {
    type: 'search', placeholder: t(L, 'uiSearchPlaceholder'),
    'aria-label': t(L, 'uiSearchHint'), autocomplete: 'off', spellcheck: 'false',
  });
  searchArea.append(el('div', { class: 'home-search' }, [icon('search'), pageInput]));

  // ---- filters: All / Ongoing / Completed (real section states) ----
  let secFilter = 'all';
  const filterRow = el('div', { class: 'course-filters', role: 'group', 'aria-label': t(L, 'uiFilterAll') });
  const secDefs = [
    { key: 'all', label: 'uiFilterAll', accent: 'blue', icon: 'grid' },
    { key: 'ongoing', label: 'uiFilterOngoing', accent: 'orange', icon: 'clock' },
    { key: 'completed', label: 'uiFilterCompleted', accent: 'purple', icon: 'check' },
  ];

  const grid = el('div', { class: 'section-grid' });
  const buildSectionCards = () => SECTIONS_META
    .map((meta, i) => ({ meta, i, list: manifest.filter((l) => l.section === meta.id) }))
    .filter(({ list }) => {
      const done = sectionDone(list, states);
      if (secFilter === 'ongoing') return done > 0 && done < list.length;
      if (secFilter === 'completed') return list.length > 0 && done === list.length;
      return true;
    })
    .filter(({ meta, list }) => {
      const q = normKey(pageInput.value || '');
      if (q.length < 2) return true;
      const hay = normKey(`${meta.en} ${meta.ar} ${meta.descEn} ${meta.descAr}`);
      const inLessons = list.some((l) => normKey(`${l.title} ${l.titleAr}`).includes(q));
      return hay.includes(q) || inLessons;
    })
    .map(({ meta, i, list }) => {
      const sentences = list.reduce((s, l) => s + (l.exercises || 0), 0);
      const done = sectionDone(list, states);
      const donePctv = pct(done, list.length);
      return el('a', {
        class: 'section-card', href: `#/section/${meta.id}`, 'data-accent': accentFor(i),
      }, [
        el('span', { class: 'sc-badge', text: `${donePctv}%` }),
        el('div', { class: 'row' }, [
          el('span', { class: 'section-icon' }, [icon(meta.icon)]),
          el('div', { class: 'grow' }, [
            el('h3', { text: L === 'ar' ? meta.ar : meta.en }),
            el('div', { class: 'sub', text: `${t(L, 'sectionLessons', { n: formatNumber(list.length) })} · ${formatNumber(sentences)} ${t(L, 'sentences')}` }),
          ]),
        ]),
        el('div', { class: 'progress' }, [el('span', { style: { width: `${donePctv}%` } })]),
        el('div', { class: 'row-between small' }, [
          el('span', { text: `${formatNumber(done)}/${formatNumber(list.length)} ${t(L, 'markDone')}` }),
          el('span', { text: `${donePctv}%` }),
        ]),
      ]);
    });

  const renderGrid = () => {
    const cards = buildSectionCards();
    grid.replaceChildren(...(cards.length ? cards : [filterEmptyState(L)]));
  };

  for (const def of secDefs) {
    const chip = el('button', {
      class: 'filter-chip', type: 'button', 'data-accent': def.accent,
      'aria-pressed': secFilter === def.key ? 'true' : 'false',
    }, [
      el('span', { class: 'fc-dot' }, [icon(def.icon)]),
      el('span', { text: t(L, def.label) }),
    ]);
    chip.addEventListener('click', () => {
      secFilter = def.key;
      [...filterRow.children].forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      renderGrid();
    });
    filterRow.append(chip);
  }
  pageInput.addEventListener('input', renderGrid);

  // ---- promotional banner → jumps to the lesson you left / next open course ----
  const firstOpenSection = SECTIONS_META
    .map((meta) => ({ meta, list: manifest.filter((l) => l.section === meta.id) }))
    .find(({ list }) => list.some((l) => !states[l.id]?.completed));
  const bannerHref = overview.lastLessonId
    ? `#/lesson/${overview.lastLessonId}`
    : (firstOpenSection ? `#/section/${firstOpenSection.meta.id}` : '#/');

  const banner = el('section', { class: 'promo-banner', 'aria-label': t(L, 'uiBannerTitle') }, [
    el('h3', { text: t(L, 'uiBannerTitle') }),
    el('p', { text: t(L, 'uiBannerSub') }),
    el('a', { class: 'promo-cta', href: bannerHref, text: t(L, 'uiBannerCta') }),
    el('span', { class: 'promo-art', 'aria-hidden': 'true' }, [icon('compass')]),
  ]);

  renderGrid();
  view.replaceChildren(toolbar, searchArea, filterRow, banner, grid);
}

/* ============================================================
   Section view
   ============================================================ */

async function viewSection(view, sectionId) {
  loading(view);
  const L = currentLang;
  const meta = SECTIONS_META.find((s) => s.id === sectionId);
  if (!meta) { navigate('home'); return; }
  docTitle(L === 'ar' ? meta.ar : meta.en);

  const list = getManifestBySection(sectionId);
  const states = await getAllLessonStates();
  const sectionSentences = list.reduce((s, l) => s + (l.exercises || 0), 0);
  const doneCountAll = list.filter((l) => states[l.id]?.completed).length;

  const items = el('div', { class: 'lesson-list' });
  list.forEach((entry, i) => {
    const st = states[entry.id];
    // Unlock lessons in order: every earlier lesson in this section must be completed.
    const locked = list.slice(0, i).some((previous) => !states[previous.id]?.completed);
    const cls = [st?.completed ? 'done' : (st && Object.keys(st.attempted || {}).length ? 'active' : ''), locked ? 'locked' : ''].filter(Boolean).join(' ');
    const itemTag = locked ? 'div' : 'a';
    const itemAttrs = locked
      ? { class: `lesson-item ${cls}`, 'aria-disabled': 'true', title: L === 'ar' ? 'أكمل الدروس السابقة لفتح هذا الدرس' : 'Complete previous lessons to unlock this lesson' }
      : { class: `lesson-item ${cls}`, href: `#/lesson/${entry.id}` };
    items.append(el(itemTag, itemAttrs, [
      el('span', { class: 'lesson-num' }, locked ? [icon('lock')] : (st?.completed ? [icon('check')] : [el('span', { text: String(i + 1) })])),
      el('div', { class: 'lesson-titles' }, [
        el('div', { class: 't', text: entry.title }),
        el('div', { class: 's', text: locked
          ? (L === 'ar' ? 'أكمل الدروس السابقة لفتح هذا الدرس' : 'Complete previous lessons to unlock')
          : `${entry.titleAr} · ${entry.level} · ${entry.exercises} ${t(L, 'exercises')}` }),
      ]),
      el('span', { class: `chip ${locked ? 'chip-locked' : (st?.completed ? 'chip-done' : 'chip')}`, text: locked
        ? (L === 'ar' ? 'مقفل' : 'Locked')
        : (st?.completed ? t(L, 'markDone') : `${pct(Object.keys(st?.attempted || {}).length, entry.exercises)}%`) }),
    ]));
  });

  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/sections', text: t(L, 'navSections') }), ' › ', el('span', { text: L === 'ar' ? meta.ar : meta.en })]),
    el('div', { class: 'card' }, [
      el('div', { class: 'row' }, [el('span', { class: 'section-icon' }, [icon(meta.icon)])]),
      el('h2', { text: L === 'ar' ? meta.ar : meta.en, style: { margin: '.4rem 0' } }),
      el('p', { class: 'muted', text: L === 'ar' ? meta.descAr : meta.descEn }),
      el('div', { class: 'progress mt' }, [el('span', { style: { width: `${pct(doneCountAll, list.length)}%` } })]),
      el('p', { class: 'small muted', text: `${doneCountAll}/${list.length} ${t(L, 'lessons')} · ${formatNumber(sectionSentences)} ${t(L, 'sentences')}` }),
    ]),
    el('div', { class: 'mt' }),
    items,
  );
}

/* ============================================================
   Lesson view
   ============================================================ */

async function viewLesson(view, lessonId) {
  loading(view);
  const entry = getManifest().find((lesson) => lesson.id === lessonId);
  if (entry) {
    const states = await getAllLessonStates();
    const sectionLessons = getManifestBySection(entry.section);
    const entryIndex = sectionLessons.findIndex((lesson) => lesson.id === lessonId);
    const locked = sectionLessons.slice(0, entryIndex).some((previous) => !states[previous.id]?.completed);
    if (locked) {
      toast(currentLang === 'ar'
        ? 'أكمل الدروس السابقة بالترتيب لفتح هذا الدرس'
        : 'Complete the previous lessons in order to unlock this lesson', 3200);
      navigate('section', [entry.section]);
      return;
    }
  }
  await renderLessonPlayer(view, lessonId, {});
}

async function viewVocabulary(view) {
  docTitle('navVocabulary');
  await renderVocabularyView(view);
}

/* ============================================================
   Review hub
   ============================================================ */

async function viewReview(view) {
  loading(view);
  docTitle('navReview');
  const L = currentLang;
  const [due, total, tags] = await Promise.all([dueItems(), reviewTotalCount(), availableTags()]);
  const states = await getAllLessonStates();

  const startSession = (items) => {
    viewReviewSession(view, items);
  };

  const head = el('div', { class: 'card' }, [
    el('h2', {}, [iconLabel('review', t(L, 'reviewTitle'))]),
    el('p', { class: 'muted', text: t(L, 'reviewIntro') }),
    el('div', { class: 'row mt' }, [
      el('button', {
        class: 'btn btn-primary',
        
        disabled: due.length === 0,
        onclick: () => startSession(due.slice(0, 15).map((d) => ({ exerciseId: d.exerciseId, lessonId: d.lessonId, tags: d.tags }))),
      }, [iconLabel('play', `${t(L, 'startReview')} (${due.length})`)]),
      el('span', { class: 'chip', text: `${total} ${t(L, 'reviewTitle')}` }),
    ]),
  ]);

  if (total === 0) {
    view.replaceChildren(head, el('div', { class: 'state-box' }, [
      el('div', { class: 'big' }, [icon('leaf')]),
      el('h3', { text: t(L, 'reviewEmpty') }),
      el('a', { class: 'btn btn-primary mt', href: '#/', text: t(L, 'startLearning') }),
    ]));
    return;
  }

  // filters: by lesson + by tag (all tracked items, not only due ones)
  const reviewStore = await import('./review.js');
  const allItems = await reviewStore.dueItems(Number.MAX_SAFE_INTEGER);
  const lessonsSeen = new Map();
  for (const it of allItems) {
    if (!lessonsSeen.has(it.lessonId)) lessonsSeen.set(it.lessonId, 0);
    lessonsSeen.set(it.lessonId, lessonsSeen.get(it.lessonId) + 1);
  }

  const filters = el('div', { class: 'review-filters' });
  filters.append(el('span', { class: 'chip', text: `${t(L, 'filterByLesson')}:` }));
  for (const [lessonId, n] of lessonsSeen) {
    const manifestEntry = getManifest().find((m) => m.id === lessonId);
    filters.append(el('button', {
      class: 'filter-chip',
      text: `${manifestEntry ? manifestEntry.title : lessonId} (${n})`,
      onclick: () => startSession(allItems.filter((i) => i.lessonId === lessonId).slice(0, 15).map((d) => ({ exerciseId: d.exerciseId, lessonId: d.lessonId, tags: d.tags }))),
    }));
  }

  const tagRow = el('div', { class: 'review-filters' });
  if (tags.length) {
    tagRow.append(el('span', { class: 'chip', text: `${t(L, 'filterByTopic')}:` }));
    for (const tg of tags.slice(0, 24)) {
      tagRow.append(el('button', {
        class: 'filter-chip',
        text: tg,
        onclick: () => startSession(allItems.filter((i) => (i.tags || []).includes(tg)).slice(0, 15).map((d) => ({ exerciseId: d.exerciseId, lessonId: d.lessonId, tags: d.tags }))),
      }));
    }
  }

  view.replaceChildren(head, filters, tagRow);
}

function viewReviewSession(view, items) {
  // delegate to the lesson engine in review mode
  renderLessonPlayer(view, 'review-session', { reviewMode: { items } });
}

/* ============================================================
   Progress view (aliased from the old #/stats route)
   ============================================================ */

async function viewProgress(view) {
  loading(view);
  docTitle('navProgress');
  const L = currentLang;
  const [overview, history, states] = await Promise.all([
    getOverview(), getDailyHistory(7), getAllLessonStates(),
  ]);
  const manifest = getManifest();
  const totalLessons = manifest.length;
  const overallPct = pct(overview.completedLessons, totalLessons);

  const head = el('div', { class: 'page-head' }, [
    el('h2', { text: t(L, 'progressTitle') }),
    el('p', { text: t(L, 'progressIntro') }),
  ]);

  // ---- overall progress card (real % from completed lessons) ----
  const overallCard = el('div', { class: 'card' }, [
    el('h3', { class: 'card-title', text: t(L, 'overallProgress') }),
    el('div', { class: 'goal-wrap' }, [
      el('div', { class: 'big-ring', style: { '--pct': String(overallPct) }, role: 'img', 'aria-label': `${overallPct}%` }, [
        el('div', { class: 'big-ring-inner' }, [
          el('div', { class: 'big-ring-value', text: `${overallPct}%` }),
          el('div', { class: 'big-ring-label', text: t(L, 'courseComplete') }),
        ]),
      ]),
      el('div', { class: 'grow', style: { minWidth: '180px' } }, [
        el('div', { class: 'summary-rows' }, [
          rowStat(t(L, 'completedLessons'), `${formatNumber(overview.completedLessons)} / ${formatNumber(totalLessons)}`),
          rowStat(t(L, 'practicedSentences'), formatNumber(overview.totalAnswers)),
          rowStat(t(L, 'accuracy'), `${overview.accuracy}%`),
          rowStat(t(L, 'timeTotal'), formatDuration(overview.studyTimeMs)),
          rowStat(t(L, 'bestStreak'), `${formatNumber(overview.bestStreak)}`),
        ]),
      ]),
    ]),
  ]);

  // ---- weekly activity chart (real daily data; honest empty state) ----
  const weekTotal = history.reduce((s, h) => s + h.count, 0);
  const maxCount = Math.max(1, ...history.map((h) => h.count));
  const chartInner = weekTotal === 0
    ? el('p', { class: 'muted small', style: { margin: '.6rem 0 0' }, text: t(L, 'weeklyEmpty') })
    : el('div', { class: 'week-chart' }, history.map((h) => {
        const barH = Math.max(6, Math.round((h.count / maxCount) * 86));
        const dayLabel = new Date(`${h.day}T12:00:00`).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'narrow' });
        return el('div', { class: 'week-col', title: `${h.day}: ${h.count}` }, [
          el('span', { class: 'week-val', text: h.count ? formatNumber(h.count) : '' }),
          el('div', { class: `week-bar${h.count ? '' : ' zero'}`, style: { height: `${barH}px` } }),
          el('span', { class: 'week-day', text: dayLabel }),
        ]);
      }));
  const weekCard = el('div', { class: 'card' }, [
    el('div', { class: 'row-between' }, [
      el('h3', { class: 'card-title', style: { margin: 0 } }, [iconLabel('calendar', t(L, 'weeklyActivity'))]),
      el('span', { class: 'chip', text: `${formatNumber(weekTotal)} ${t(L, 'goalDoneToday')}` }),
    ]),
    chartInner,
  ]);

  // ---- per-section progress cards (only sections that really exist) ----
  const sectionListCard = el('div', { class: 'card' }, [
    el('h3', { class: 'card-title' }, [iconLabel('grid', t(L, 'navSections'))]),
    el('div', { class: 'lesson-list' }, SECTIONS_META.map((meta) => {
      const list = manifest.filter((l) => l.section === meta.id);
      const done = list.filter((l) => states[l.id]?.completed).length;
      const donePct = pct(done, list.length);
      return el('a', { class: 'lesson-item', href: `#/section/${meta.id}` }, [
        el('span', { class: 'section-icon' }, [icon(meta.icon)]),
        el('div', { class: 'lesson-titles' }, [
          el('div', { class: 't', text: L === 'ar' ? meta.ar : meta.en }),
          el('div', { class: 'progress', style: { marginTop: '.35rem' } }, [el('span', { style: { width: `${donePct}%` } })]),
        ]),
        el('span', { class: `chip ${donePct === 100 ? 'chip-done' : ''}`, text: `${done}/${list.length}` }),
      ]);
    })),
  ]);

  // ---- recently practiced ----
  const recent = Object.entries(states)
    .sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0))
    .slice(0, 6);
  const recentCard = recent.length
    ? el('div', { class: 'card' }, [
        el('h3', { class: 'card-title', text: t(L, 'recentLessons') }),
        el('div', { class: 'lesson-list' }, recent.map(([id, st]) => {
          const m = manifest.find((x) => x.id === id);
          if (!m) return null;
          return el('a', { class: 'lesson-item', href: `#/lesson/${id}` }, [
            el('span', { class: 'lesson-num' }, [icon(st.completed ? 'check' : 'clock')]),
            el('div', { class: 'lesson-titles' }, [
              el('div', { class: 't', text: m.title }),
              el('div', { class: 's', text: `${m.titleAr} · ${st.bestAccuracy || 0}%` }),
            ]),
          ]);
        }).filter(Boolean)),
      ])
    : null;

  const grid = el('div', { class: 'progress-grid' }, [overallCard, weekCard]);
  view.replaceChildren(head, grid, sectionListCard, ...(recentCard ? [recentCard] : []));

  function rowStat(k, v) {
    return el('div', { class: 'row-between' }, [el('span', { class: 'muted', text: k }), el('b', { text: v })]);
  }
}

/* backwards-compatible alias for any external references */
const viewStats = viewProgress;

/* ============================================================
   Achievements view (v8) — computed from real progress only
   ============================================================ */

async function viewAchievements(view) {
  loading(view);
  docTitle('achTitle');
  await renderAchievementsView(view);
}

/* ============================================================
   More hub (secondary settings, organized) + Profile
   ============================================================ */

/* ============================================================
   More hub (v9) — four professional categories, every row real:
     1. Learning        — levels, lessons, listening, pronunciation, vocabulary
     2. My Progress     — statistics, completed lessons, achievements,
                          streak, XP, history
     3. App Settings    — audio, speed, notifications, language, theme,
                          offline content, backup
     4. Help & Info     — how to use, FAQ, about, version, contact
   ============================================================ */

/* More-screen navigation row: icon tile + label + description + chevron */
function moreLink(iconName, labelKey, descKey, href) {
  const L = currentLang;
  return el('a', { class: 'more-link-row', href }, [
    el('span', { class: 'more-icon', 'aria-hidden': 'true' }, [icon(iconName)]),
    el('span', { class: 'more-link-texts' }, [
      el('strong', { text: t(L, labelKey) }),
      el('span', { class: 'muted small', text: t(L, descKey) }),
    ]),
    icon('arrowRight'),
  ]);
}

/* More-screen control row: icon tile + label + live control */
function moreCtl(iconName, labelKey, control, descKey) {
  const L = currentLang;
  return el('div', { class: 'more-row' }, [
    el('span', { class: 'more-icon', 'aria-hidden': 'true' }, [icon(iconName)]),
    el('span', { class: 'more-link-texts' }, [
      el('strong', { text: t(L, labelKey) }),
      ...(descKey ? [el('span', { class: 'muted small', text: t(L, descKey) })] : []),
    ]),
    control,
  ]);
}

/* Category card with a heading and a list of rows */
function moreCategory(labelKey, iconName, rows, open = false) {
  const L = currentLang;
  return el('details', { class: 'card more-section more-cat', open: open ? true : null }, [
    el('summary', { class: 'more-section-summary' }, [
      el('span', { class: 'more-section-heading' }, [icon(iconName), el('span', { text: t(L, labelKey) })]),
      icon('arrowRight'),
    ]),
    el('div', { class: 'more-section-content more-list' }, rows),
  ]);
}

async function viewMore(view) {
  loading(view);
  docTitle('navMore');
  const L = currentLang;
  const s = getSettings();

  /* ---------- live controls (all real, existing settings) ---------- */

  const langSel = el('select', { class: 'select-pill', 'aria-label': t(L, 'interfaceLanguage') }, [
    el('option', { value: 'en', text: t(L, 'langEn'), selected: s.lang === 'en' ? '' : null }),
    el('option', { value: 'ar', text: t(L, 'langAr'), selected: s.lang === 'ar' ? '' : null }),
  ]);
  langSel.addEventListener('change', () => {
    saveSettings({ lang: langSel.value });
    currentLang = langSel.value;
    applyDocumentSettings();
    renderShell();
    onChangeRerun();
  });

  const themeSel = el('select', { class: 'select-pill', 'aria-label': t(L, 'theme') }, ['light', 'dark', 'system'].map((th) =>
    el('option', { value: th, text: t(L, `theme${th[0].toUpperCase()}${th.slice(1)}`), selected: s.theme === th ? '' : null })));
  themeSel.addEventListener('change', () => { saveSettings({ theme: themeSel.value }); applyDocumentSettings(); });

  const fontScaleSel = el('select', { class: 'select-pill', 'aria-label': t(L, 'fontSize') }, [
    el('option', { value: '0.9', text: t(L, 'fontSmall'), selected: s.fontScale <= 0.9 ? '' : null }),
    el('option', { value: '1', text: t(L, 'fontNormal'), selected: s.fontScale > 0.9 && s.fontScale < 1.05 ? '' : null }),
    el('option', { value: '1.1', text: t(L, 'fontLarge'), selected: s.fontScale >= 1.05 && s.fontScale < 1.15 ? '' : null }),
    el('option', { value: '1.2', text: t(L, 'fontExtraLarge'), selected: s.fontScale >= 1.15 ? '' : null }),
  ]);
  fontScaleSel.addEventListener('change', () => {
    saveSettings({ fontScale: parseFloat(fontScaleSel.value) });
    applyDocumentSettings();
    toast(t(L, 'dataSaved'));
  });

  const speedSel = el('select', { class: 'select-pill', 'aria-label': t(L, 'speedTitle') }, [
    el('option', { value: 'slow', text: t(L, 'spdSlow'), selected: (Number(s.rate) || 1) < 0.8 ? '' : null }),
    el('option', { value: 'normal', text: t(L, 'spdNormal'), selected: ((Number(s.rate) || 1) >= 0.8 && (Number(s.rate) || 1) <= 1.15) ? '' : null }),
    el('option', { value: 'fast', text: t(L, 'spdFast'), selected: (Number(s.rate) || 1) > 1.15 ? '' : null }),
  ]);
  speedSel.addEventListener('change', () => {
    saveAudioSettings({ speed: speedSel.value }); // mirrors into settings.rate (core.js)
    toast(`${t(L, 'speedTitle')}: ${t(L, { slow: 'spdSlow', normal: 'spdNormal', fast: 'spdFast' }[speedSel.value])}`);
  });

  const notifToggle = toggle(s.dailyReminder === true, async (on) => {
    const res = await setDailyReminder(on);
    if (res.ok) {
      saveSettings({ dailyReminder: on });
      toast(t(L, on ? 'notifEnabledToast' : 'notifDisabledToast'));
    } else {
      saveSettings({ dailyReminder: false });
      notifToggle.setAttribute('aria-checked', 'false');
      toast(t(L, 'notifUnsupported'), 3200);
    }
  });

  const goalInput = el('input', { type: 'number', min: '5', max: '200', value: String(s.dailyGoal), style: { maxWidth: '110px' }, 'aria-label': t(L, 'dailyGoalSetting') });
  goalInput.addEventListener('change', () => { saveSettings({ dailyGoal: parseInt(goalInput.value, 10) || 20 }); toast(t(L, 'dataSaved')); });

  const arabicToggle = toggle(s.showArabic, (on) => saveSettings({ showArabic: on }));
  const strictToggle = toggle(s.strictGrading, (on) => saveSettings({ strictGrading: on }));
  const soundFxToggle = toggle(s.soundEffects !== false, (on) => saveSettings({ soundEffects: on }));

  const exportBtn = el('button', { class: 'btn btn-sm', onclick: async () => {
    const backup = await exportBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `lingostep-backup-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast(t(L, 'dataExported'));
  } }, [iconLabel('download', t(L, 'exportProgress'))]);

  const importInput = el('input', { type: 'file', accept: 'application/json,.json', class: 'sr-only' });
  const importBtn = el('button', { class: 'btn btn-sm', onclick: () => importInput.click() }, [iconLabel('upload', t(L, 'importProgress'))]);
  importInput.addEventListener('change', async () => {
    const file = importInput.files && importInput.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const ok = await confirmDialog({
        title: t(L, 'importProgress'),
        body: t(L, 'importWarn'),
        confirmText: t(L, 'openBtn'),
        cancelText: t(L, 'cancelBtn'),
        lang: L,
      });
      if (!ok) { importInput.value = ''; return; }
      await importBackup(data, { replace: true });
      toast(t(L, 'dataImported'));
      setTimeout(() => onChangeRerun(), 600);
    } catch (err) {
      toast(`${t(L, 'dataInvalid')}`);
      console.warn('import failed', err);
    }
    importInput.value = '';
  });

  const clearBtn = el('button', { class: 'btn btn-danger', onclick: async () => {
    const ok1 = await confirmDialog({
      title: t(L, 'clearProgress'),
      body: t(L, 'clearConfirm'),
      confirmText: t(L, 'confirmExitShort'),
      cancelText: t(L, 'cancelBtn'),
      danger: true, lang: L,
    });
    if (!ok1) return;
    const ok2 = await confirmDialog({
      title: t(L, 'clearProgress'),
      body: t(L, 'clearConfirmAgain'),
      confirmText: t(L, 'confirmExitShort'),
      cancelText: t(L, 'cancelBtn'),
      danger: true, lang: L,
    });
    if (!ok2) return;
    await clearAllProgress();
    toast(t(L, 'dataSaved'));
    setTimeout(() => onChangeRerun(), 500);
  } }, [iconLabel('trash', t(L, 'clearProgress'))]);

  // offline preparation (real: primes the service-worker cache)
  const offlineBtn = el('button', { class: 'btn btn-sm', onclick: async () => {
    offlineBtn.disabled = true;
    offlineBtn.replaceChildren(iconLabel('clock', t(L, 'preparingOffline')));
    const manifest = getManifest();
    let ok = 0;
    for (const entry of manifest) {
      try {
        const url = new URL(entry.path, new URL('../', import.meta.url)).href;
        await fetch(url);
        ok += 1;
      } catch { /* offline already or failed */ }
    }
    offlineBtn.replaceChildren(iconLabel('check', `${ok}/${manifest.length}`));
    toast(t(L, 'offlineReady'));
  } }, [iconLabel('package', t(L, 'prepareOffline'))]);

  /* ---------- profile card (real data) ---------- */
  const displayName = (s.userName || '').trim();
  const profileCard = el('a', { class: 'card profile-card', href: '#/profile' }, [
    el('span', { class: 'avatar-lg', 'aria-hidden': 'true' },
      displayName ? [el('span', { text: displayName.charAt(0).toUpperCase() })] : [icon('user')]),
    el('div', { class: 'grow' }, [
      el('strong', { text: displayName || t(L, 'profileTitle') }),
      el('span', { class: 'muted small', text: displayName ? t(L, 'moreGroupProfile') : t(L, 'namePlaceholder') }),
    ]),
    icon('arrowRight'),
  ]);

  /* ---------- category 1: Learning ---------- */
  const learningCat = moreCategory('moreCatLearning', 'basics', [
    moreLink('grid', 'learningLevels', 'learningLevelsDesc', '#/sections'),
    moreLink('books', 'lessonsSections', 'lessonsSectionsDesc', '#/sections'),
    moreLink('headphones', 'listeningPractice', 'listeningPracticeDesc', '#/dialogues'),
    moreLink('audio', 'pronunciationPractice', 'pronunciationPracticeDesc', '#/audio'),
    moreLink('book', 'vocabularyPractice', 'vocabularyPracticeDesc', '#/vocabulary'),
  ], true);

  /* ---------- category 2: My Progress ---------- */
  const progressCat = moreCategory('moreCatProgress', 'chart', [
    moreLink('stats', 'learningStats', 'learningStatsDesc', '#/stats'),
    moreLink('books', 'completedLessons', 'completedLessonsDesc', '#/progress'),
    moreLink('trophy', 'achievementsBadges', 'achievementsBadgesDesc', '#/achievements'),
    moreLink('flame', 'dailyStreakRow', 'dailyStreakDesc', '#/stats'),
    moreLink('sparkle', 'xpPoints', 'xpPointsDesc', '#/profile'),
    moreLink('clock', 'learningHistory', 'learningHistoryDesc', '#/history'),
  ]);

  /* ---------- category 3: Application Settings ---------- */
  const settingsCat = moreCategory('moreCatSettings', 'settings', [
    moreLink('audio', 'audioSettings', 'audioSettingsDesc', '#/audio'),
    moreCtl('gauge', 'playbackSpeedRow', speedSel, 'playbackSpeedDesc'),
    moreCtl('bell', 'notificationSettings', notifToggle, 'notificationSettingsDesc'),
    moreCtl(pngIcon('languagePng'), 'languageSettings', langSel, 'languageSettingsDesc'),
    moreCtl(pngIcon('settingsPng'), 'themeAppearance', themeSel, 'themeAppearanceDesc'),
    moreCtl('theme', 'fontSize', fontScaleSel),
    moreCtl('package', 'offlineContent', offlineBtn, 'offlineContentDesc'),
    moreCtl('review', 'backupSection', el('div', { class: 'row' }, [exportBtn, importBtn, importInput])),
  ]);

  /* ---------- learning preferences (existing, real) ---------- */
  const prefsCat = moreCategory('moreGroupLearning', 'bulb', [
    moreCtl('target', 'dailyGoalSetting', goalInput),
    moreCtl('language', 'showArabic', arabicToggle),
    moreCtl('pen', 'strictGrading', strictToggle),
    moreCtl('volumeX', 'soundEffects', soundFxToggle),
  ]);

  /* ---------- category 4: Help & Information ---------- */
  const helpCat = moreCategory('moreCatHelp', 'info', [
    moreLink('info', 'howToUse', 'howToUseDesc', '#/help'),
    moreLink('helpCircle', 'faqTitle', 'faqDesc', '#/faq'),
    moreLink('user', 'profileTitle', 'moreGroupProfile', '#/profile'),
  ]);

  const aboutCard = el('div', { class: 'card more-about' }, [
    el('p', { class: 'small muted more-note', text: t(L, 'aboutText') }),
    el('div', { class: 'row-between small more-about-meta' }, [
      el('span', { text: t(L, 'appVersionRow') }),
      el('span', { class: 'chip', text: `v${APP_VERSION}` }),
    ]),
    el('p', { class: 'small more-note', text: t(L, 'designedBy') }),
    el('a', {
      class: 'small more-note more-contact',
      href: 'https://wa.me/20' + '1066227553',
      target: '_blank',
      rel: 'noopener noreferrer',
      text: `${t(L, 'contactFeedback')}: 01066227553`,
      'aria-label': `${t(L, 'contactFeedback')} 01066227553`,
    }),
  ]);

  view.replaceChildren(
    el('div', { class: 'page-head' }, [
      el('h2', { text: t(L, 'moreTitle') }),
      el('p', { text: t(L, 'moreIntro') }),
    ]),
    profileCard,
    learningCat,
    progressCat,
    settingsCat,
    prefsCat,
    helpCat,
    aboutCard,
    el('div', { class: 'more-danger-zone' }, [clearBtn]),
  );
}

/* ============================================================
   Audio settings page (v9) — the upgraded speech panel with a
   proper back navigation (linked from More → Audio / Pronunciation)
   ============================================================ */

async function viewAudioSettings(view) {
  loading(view);
  docTitle('audioSettings');
  const L = currentLang;
  const s = getSettings();

  const rateSel = el('select', { 'aria-label': t(L, 'speechRate') }, [
    el('option', { value: '0.65', text: '0.65×', selected: s.rate <= 0.65 ? '' : null }),
    el('option', { value: '0.8', text: '0.8×', selected: s.rate > 0.65 && s.rate <= 0.8 ? '' : null }),
    el('option', { value: '1', text: '1.0×', selected: s.rate > 0.8 && s.rate <= 1.05 ? '' : null }),
    el('option', { value: '1.15', text: '1.15×', selected: s.rate > 1.05 ? '' : null }),
  ]);
  rateSel.addEventListener('change', () => saveSettings({ rate: parseFloat(rateSel.value) }));

  // voice select — populated async
  const voiceSel = el('select', { 'aria-label': t(L, 'voice') });
  voiceSel.append(el('option', { value: '', text: t(L, 'voiceAuto') }));
  if (speechSupported()) {
    await loadVoices();
    for (const v of englishVoices()) {
      voiceSel.append(el('option', { value: v.voiceURI, text: `${v.name} (${v.lang})`, selected: s.voiceURI === v.voiceURI ? '' : null }));
    }
  }
  voiceSel.addEventListener('change', () => saveSettings({ voiceURI: voiceSel.value }));

  const panel = await renderAudioSettingsPanel({
    L, s, t, el, toast, icon, iconLabel, toggle, settingRow, saveSettings, rateSel,
  });

  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/more', text: t(L, 'navMore') }), ' › ', el('span', { text: t(L, 'audioSettings') })]),
    el('div', { class: 'page-head' }, [
      el('h2', { text: t(L, 'audioSettings') }),
      el('p', { text: t(L, 'audioSettingsDesc') }),
    ]),
    el('div', { class: 'more-section-content more-list card' }, [
      settingRow(t(L, 'voice'), null, voiceSel),
      settingRow(t(L, 'speechRate'), null, rateSel),
    ]),
    panel,
  );
}

/* ============================================================
   Help — how to use LingoStep (real guide, bilingual)
   ============================================================ */

function helpSteps(L) {
  if (L === 'ar') {
    return [
      ['ابدأ من الأقسام', 'افتح تبويب «الأقسام» واختر المستوى المناسب (A1 إلى C1). كل قسم يحتوي دروسًا مرتبة، والدرس التالي يُفتح بعد إكمال السابق.'],
      ['داخل الدرس', 'كل درس سلسلة تمارين تفاعلية تعمل باللمس فقط: استمع وابنِ بالحروف، أكمل الفراغ بالبطاقات، رتّب الكلمات، واختر الإجابة الصحيحة. لا توجد لوحة مفاتيح.'],
      ['الكلمات الصحيحة تُقفل', 'عند إكمال كلمة بشكل صحيح تتحول إلى الأخضر وتُقفل في مكانها — لا يمكن حذفها أو تعديلها حتى نهاية المحاولة.'],
      ['التلميح الذكي', 'زر التلميح يكشف الحرف الأول من الكلمة الحالية فقط باللون الأزرق. الضغط المتكرر لا يكشف الكلمة كاملة أبدًا، ولا يظهر المعنى العربي.'],
      ['التخطي يتطلب إجابة', 'عند تخطي سؤال لا تحصل على نقاط، ويظهر سؤال بديل من نفس الدرس يجب الإجابة عنه للمتابعة.'],
      ['الصوت', 'أزرار الاستماع والإيقاف المؤقت وإعادة الاستماع وسرعة التشغيل في كل تمرين استماع. اختر اللهجة والصوت من إعدادات الصوت.'],
      ['تقدمك محفوظ', 'يُحفظ تقدمك تلقائيًا على جهازك: الدروس المكتملة، النقاط، السلسلة اليومية، والمراجعة المتباعدة. يمكنك تصدير نسخة احتياطية من «المزيد».'],
      ['العمل دون اتصال', 'بعد فتح الدروس مرة واحدة (أو تنزيل المحتوى من «المزيد»)، يعمل التطبيق دون إنترنت.'],
    ];
  }
  return [
    ['Start with Sections', 'Open the Sections tab and pick your level (A1 to C1). Each section contains ordered lessons; the next lesson unlocks when you complete the previous one.'],
    ['Inside a lesson', 'Every lesson is a series of touch-only interactive exercises: listen and build with letter tiles, fill the blank, order the words, and choose the answer. There is no keyboard anywhere.'],
    ['Correct words lock', 'When you complete a word correctly it turns green and locks in place — it cannot be deleted or edited for the rest of the attempt.'],
    ['Smart hints', 'The Hint button reveals only the FIRST letter of the current word, in blue. Repeated presses never reveal the whole word and never show the Arabic meaning.'],
    ['Skipping requires an answer', 'Skipping a question earns no points and presents a different question from the same lesson that you must answer before continuing.'],
    ['Audio controls', 'Play, pause, replay and speed controls appear on every listening exercise. Choose accent and voice in Audio Settings.'],
    ['Your progress is saved', 'Progress is saved automatically on your device: completed lessons, XP, daily streak and spaced review. Export a backup any time from More.'],
    ['Works offline', 'After lessons load once (or after downloading content from More), the app works without internet.'],
  ];
}

async function viewHelp(view) {
  loading(view);
  docTitle('howToUse');
  const L = currentLang;
  const steps = helpSteps(L);
  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/more', text: t(L, 'navMore') }), ' › ', el('span', { text: t(L, 'howToUse') })]),
    el('div', { class: 'page-head' }, [
      el('h2', { text: t(L, 'howToUse') }),
      el('p', { text: t(L, 'howToUseDesc') }),
    ]),
    el('div', { class: 'help-steps' }, steps.map(([title, body], i) =>
      el('div', { class: 'card help-step' }, [
        el('span', { class: 'help-step-num', text: String(i + 1) }),
        el('div', {}, [
          el('h3', { text: title }),
          el('p', { class: 'muted', text: body }),
        ]),
      ]))),
    el('div', { class: 'card-actions' }, [
      el('a', { class: 'btn btn-primary', href: '#/sections' }, [iconLabel('books', t(L, 'lessonsSections'))]),
      el('a', { class: 'btn', href: '#/faq' }, [iconLabel('helpCircle', t(L, 'faqTitle'))]),
    ]),
  );
}

/* ============================================================
   FAQ — honest answers to real questions (bilingual)
   ============================================================ */

function faqItems(L) {
  if (L === 'ar') {
    return [
      ['هل أحتاج إلى لوحة المفاتيح؟', 'لا. كل التمارين تعمل باللمس فقط: بطاقات حروف وبطاقات كلمات وخيارات. لوحة مفاتيح النظام لا تظهر أبدًا أثناء التمارين.'],
      ['ماذا يفعل زر التلميح؟', 'يكشف الحرف الأول من الكلمة التي تعمل عليها حاليًا فقط. الضغط المتكرر قد يكشف نصف الكلمة كحد أقصى، ولا يكشف الكلمة كاملة ولا المعنى العربي أبدًا.'],
      ['لماذا لا تُحسب نقاط السؤال المتخطى؟', 'التخطي لا يمنح نقاطًا ولا يعتبر إجابة صحيحة. بدلًا من ذلك يظهر سؤال بديل من نفس الدرس يجب الإجابة عنه لتحصل على النقاط والتقدم.'],
      ['هل يعمل التطبيق دون إنترنت؟', 'نعم. بعد فتح الدروس مرة واحدة أو تنزيل المحتوى من «المزيد ← المحتوى دون اتصال»، تعمل الدروس والحوارات دون شبكة.'],
      ['أين تُحفظ بياناتي؟', 'على جهازك فقط (IndexedDB + التخزين المحلي). لا يوجد خادم. يمكنك تصدير نسخة احتياطية واستيرادها على أي جهاز.'],
      ['الصوت لا يعمل، ماذا أفعل؟', 'افتح «المزيد ← إعدادات الصوت» وجرّب زر الاختبار. على بعض الأجهزة يحتاج صوت النظام إلى تفعيل خدمة النطق من إعدادات أندرويد (الإدارة ← النطق).'],
      ['كيف تُحسب سرعة التشغيل؟', 'سرعات التشغيل: بطيء (0.65×) وعادي (1×) وسريع (1.3×). يمكنك تغييرها من إعدادات الصوت أو من زر السرعة داخل التمرين.'],
      ['هل يمكنني إعادة التمرين؟', 'نعم — زر «إعادة هذا التمرين» يعيد محاولتك الحالية فقط بعد تأكيد صريح، ولا يحذف تقدم الدرس المحفوظ.'],
    ];
  }
  return [
    ['Do I need a keyboard?', 'No. Every exercise is touch-only: letter tiles, word chips and option cards. The system keyboard never appears during exercises.'],
    ['What does the Hint button do?', 'It reveals only the FIRST letter of the word you are working on, in blue. Repeated presses reveal at most half of the word — never the whole word and never the Arabic meaning.'],
    ['Why does a skipped question earn nothing?', 'Skipping gives no points and is never counted as correct. Instead, a different question from the same lesson appears and must be answered to earn the XP and continue.'],
    ['Does the app work offline?', 'Yes. Once lessons have loaded (or after downloading content from More → Offline Content), lessons and dialogues work without a network.'],
    ['Where is my data stored?', 'On your device only (IndexedDB + local storage). There is no server. Export a backup from More and import it on any device.'],
    ['Audio does not play — what can I do?', 'Open More → Audio Settings and use the test button. On some Android devices you must enable the system text-to-speech service (Settings → Accessibility → Text-to-speech).'],
    ['Which playback speeds exist?', 'Slow (0.65×), Normal (1×) and Fast (1.3×). Change them in Audio Settings or with the speed button inside the exercise.'],
    ['Can I restart an exercise?', 'Yes — "Restart exercise" resets only your current attempt after explicit confirmation. Saved lesson progress is never erased.'],
  ];
}

async function viewFaq(view) {
  loading(view);
  docTitle('faqTitle');
  const L = currentLang;
  const items = faqItems(L);
  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/more', text: t(L, 'navMore') }), ' › ', el('span', { text: t(L, 'faqTitle') })]),
    el('div', { class: 'page-head' }, [
      el('h2', { text: t(L, 'faqTitle') }),
      el('p', { text: t(L, 'faqDesc') }),
    ]),
    el('div', { class: 'faq-list' }, items.map(([q, a]) =>
      el('details', { class: 'card faq-item' }, [
        el('summary', { class: 'faq-q' }, [q]),
        el('p', { class: 'faq-a muted', text: a }),
      ]))),
    el('div', { class: 'card-actions' }, [
      el('a', { class: 'btn', href: '#/help' }, [iconLabel('info', t(L, 'howToUse'))]),
    ]),
  );
}

/* ============================================================
   Learning history — real, from actual attempts
   ============================================================ */

async function viewHistory(view) {
  loading(view);
  docTitle('learningHistory');
  const L = currentLang;
  const summary = await getAttemptSummary();
  const byLesson = new Map();
  for (const [exId, info] of Object.entries(summary)) {
    if (!info?.lessonId) continue;
    const cur = byLesson.get(info.lessonId) || { count: 0, correct: 0, lastAt: 0 };
    cur.count += 1;
    if (info.lastStatus === 'correct' || info.lastStatus === 'minor') cur.correct += 1;
    cur.lastAt = Math.max(cur.lastAt, info.lastAt || 0);
    byLesson.set(info.lessonId, cur);
  }
  const rows = [...byLesson.entries()]
    .sort((a, b) => b[1].lastAt - a[1].lastAt)
    .slice(0, 30)
    .map(([lessonId, info]) => {
      const entry = getManifestEntry(lessonId);
      const title = entry ? (L === 'ar' ? entry.titleAr : entry.title) : lessonId;
      const when = info.lastAt ? new Date(info.lastAt).toLocaleDateString(L === 'ar' ? 'ar-EG' : 'en-US') : '';
      return el('a', { class: 'more-link-row history-row', href: `#/lesson/${lessonId}` }, [
        el('span', { class: 'more-icon', 'aria-hidden': 'true' }, [icon('pen')]),
        el('span', { class: 'more-link-texts' }, [
          el('strong', { text: title }),
          el('span', { class: 'muted small', text: `${t(L, 'practicedSentences')}: ${info.count} · ${when}` }),
        ]),
        el('span', { class: 'chip chip-done', text: `${Math.round((info.correct / Math.max(1, info.count)) * 100)}%` }),
      ]);
    });

  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/more', text: t(L, 'navMore') }), ' › ', el('span', { text: t(L, 'learningHistory') })]),
    el('div', { class: 'page-head' }, [
      el('h2', { text: t(L, 'learningHistory') }),
      el('p', { text: t(L, 'learningHistoryDesc') }),
    ]),
    rows.length
      ? el('div', { class: 'card more-list history-list' }, rows)
      : el('div', { class: 'state-box' }, [
        el('div', { class: 'big' }, [icon('pen')]),
        el('p', { class: 'muted', text: t(L, 'uiEmptyFilter') }),
        el('a', { class: 'btn btn-primary mt', href: '#/sections' }, [iconLabel('books', t(L, 'lessonsSections'))]),
      ]),
  );
}

/* PNG icon helper (existing colored assets under assets/icons) */
function pngIcon(name) {
  return icon(name);
}

/* Compact, accessible accordion groups for the More page. */
function moreSection(label, iconName, content, open = false) {
  return el('details', { class: 'card more-section', open: open ? true : null }, [
    el('summary', { class: 'more-section-summary' }, [
      el('span', { class: 'more-section-heading' }, [icon(iconName), el('span', { text: label })]),
      icon('arrowRight'),
    ]),
    content,
  ]);
}

/* More-screen list row: leading icon tile + label + trailing control */
function moreRow(iconEl, label, control) {
  return el('div', { class: 'more-row' }, [
    el('span', { class: 'more-icon', 'aria-hidden': 'true' }, [iconEl]),
    el('span', { class: 'more-label', text: label }),
    control,
  ]);
}

/* ============================================================
   Profile view
   ============================================================ */

async function viewProfile(view) {
  loading(view);
  docTitle('profileTitle');
  const L = currentLang;
  const s = getSettings();
  const [overview, totalXp] = await Promise.all([getOverview(), getTotalXp()]);

  const nameInput = el('input', {
    type: 'text', maxlength: '24', value: s.userName || '',
    placeholder: t(L, 'namePlaceholder'), 'aria-label': t(L, 'displayName'),
    class: 'profile-name-input', autocomplete: 'name', spellcheck: 'false',
  });

  const preview = el('p', { class: 'profile-greeting-preview muted', dir: 'auto' });
  const avatar = el('span', { class: 'avatar-lg avatar-xl', 'aria-hidden': 'true' });
  const renderPreview = () => {
    const name = nameInput.value.trim();
    preview.textContent = name ? t(L, 'welcomeGreeting', { name }) : t(L, 'welcomeGreetingNoName');
    avatar.replaceChildren(...(name
      ? [el('span', { text: name.charAt(0).toUpperCase() })]
      : [icon('user')]));
  };
  renderPreview();
  nameInput.addEventListener('input', renderPreview);
  nameInput.addEventListener('change', () => {
    saveSettings({ userName: nameInput.value });
    toast(t(L, 'dataSaved'));
    renderShell(); // keep header/state consistent
  });

  view.replaceChildren(
    el('div', { class: 'breadcrumb' }, [el('a', { href: '#/more', text: t(L, 'navMore') }), ' › ', el('span', { text: t(L, 'profileTitle') })]),
    el('div', { class: 'card profile-hero' }, [
      avatar,
      el('h2', { text: t(L, 'profileTitle'), style: { margin: '.7rem 0 .1rem' } }),
      el('p', { class: 'small muted', style: { margin: '0 0 1rem', maxWidth: '46ch' }, text: t(L, 'profileIntro') }),
      nameInput,
      preview,
    ]),
    el('div', { class: 'stat-grid mb' }, [
      statCard(formatNumber(overview.completedLessons), t(L, 'completedLessons'), 'books'),
      statCard(formatNumber(overview.totalAnswers), t(L, 'practicedSentences'), 'pen'),
      statCard(`${overview.accuracy}%`, t(L, 'accuracy'), 'target'),
      statCard(formatNumber(overview.streak), t(L, 'streakDays'), 'flame'),
      statCard(formatNumber(totalXp), t(L, 'xpTotal'), 'sparkle'),
    ]),
  );
}

function settingRow(label, desc, control) {
  return el('div', { class: 'setting-row' }, [
    el('div', {}, [
      el('label', { text: label }),
      desc ? el('div', { class: 'desc', text: desc }) : null,
    ].filter(Boolean)),
    control,
  ]);
}

function toggle(checked, onToggle) {
  const b = el('button', { class: 'toggle', role: 'switch', 'aria-checked': checked ? 'true' : 'false', 'aria-label': 'toggle' });
  b.addEventListener('click', () => {
    const next = b.getAttribute('aria-checked') !== 'true';
    b.setAttribute('aria-checked', next ? 'true' : 'false');
    onToggle(next);
  });
  return b;
}

/* ---------- boot ---------- */
if (typeof document !== 'undefined') {
  const ready = document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
  if (ready && typeof ready.catch === 'function') ready.catch((e) => console.error(e));
}
