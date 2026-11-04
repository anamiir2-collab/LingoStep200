/* ============================================================
   LingoStep — settings.js
   User preferences persisted in localStorage (small, sync-safe).
   Applies language direction + theme. Node-importable.
   ============================================================ */

const SETTINGS_KEY = 'lingostep:settings';

export const DEFAULT_SETTINGS = {
  lang: 'en',            // 'en' | 'ar'
  theme: 'system',       // 'light' | 'dark' | 'system'
  fontScale: 1,           // interface text size: 0.9 - 1.2
  voiceURI: '',          // preferred speechSynthesis voice
  rate: 1,               // speech rate 0.6 - 1.2
  dailyGoal: 20,         // exercises per day
  showArabic: true,      // show Arabic translation during practice
  strictGrading: true,   // contractions/punctuation count as differences
  onScreenKeyboard: true, // show the built-in Latin keyboard under typing inputs
  soundEffects: true,    // short tones for correct/wrong letters while typing
  slowWordByWord: true,  // slow (turtle) audio reads the sentence word by word
  dailyReminder: false,  // daily practice notification (v9, native + web)
  userName: '',          // optional display name used in the greeting
};

let cache = null;

function safeGet() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(SETTINGS_KEY);
  } catch { return null; }
}

function safeSet(json) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(SETTINGS_KEY, json);
    return true;
  } catch { return false; }
}

/** Load settings, merged over defaults. Invalid JSON falls back to defaults. */
export function getSettings() {
  if (cache) return { ...cache };
  const raw = safeGet();
  let parsed = {};
  if (raw) {
    try { parsed = JSON.parse(raw); } catch { parsed = {}; }
  }
  cache = { ...DEFAULT_SETTINGS, ...(parsed && typeof parsed === 'object' ? parsed : {}) };
  return { ...cache };
}

export function saveSettings(patch = {}) {
  const next = { ...getSettings(), ...patch };
  // sanitize
  next.lang = next.lang === 'ar' ? 'ar' : 'en';
  next.theme = ['light', 'dark', 'system'].includes(next.theme) ? next.theme : 'system';
  next.fontScale = Math.min(1.2, Math.max(0.9, Number(next.fontScale) || 1));
  next.rate = Math.min(1.3, Math.max(0.5, Number(next.rate) || 1));
  next.dailyGoal = Math.min(200, Math.max(5, parseInt(next.dailyGoal, 10) || 20));
  next.userName = String(next.userName ?? '').trim().slice(0, 24);
  next.onScreenKeyboard = next.onScreenKeyboard !== false; // boolean, default true
  next.soundEffects = next.soundEffects !== false; // boolean, default true
  next.slowWordByWord = next.slowWordByWord !== false; // boolean, default true
  next.dailyReminder = next.dailyReminder === true; // boolean, default false
  next.showArabic = next.showArabic !== false;
  next.strictGrading = next.strictGrading !== false;
  cache = next;
  safeSet(JSON.stringify(next));
  return { ...next };
}

/** Apply theme + direction to <html>. Browser only. */
export function applyDocumentSettings(settings = getSettings()) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.lang = settings.lang;
  html.dir = settings.lang === 'ar' ? 'rtl' : 'ltr';
  html.setAttribute('data-theme', settings.theme);
  html.style.fontSize = `${16 * Math.min(1.2, Math.max(0.9, Number(settings.fontScale) || 1))}px`;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', settings.theme === 'dark' ? '#0e1620' : '#F7FAFC');
}

export function getLang() {
  return getSettings().lang;
}
