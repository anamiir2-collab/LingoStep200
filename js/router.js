/* ============================================================
   LingoStep — router.js
   Hash-based router (works on GitHub Pages sub-paths).
   Routes:
     #/                 dashboard
     #/section/:sec     lesson list of a section
     #/lesson/:id       lesson player
     #/review           revision hub
     #/stats            statistics (alias of progress)
     #/settings         legacy → redirected to #/more
     #/more             More hub (profile, preferences, app)
     #/profile          profile page
   Pure helpers (parseHash/buildHash) are Node-testable.
   ============================================================ */

import { getLang } from './settings.js';
import { t } from './i18n.js';

export const ROUTES = ['home', 'section', 'lesson', 'review', 'stats', 'settings', 'more', 'profile'];

/** Parse "lesson/lesson-013?x=1" → {name:'lesson', params:['lesson-013'], query:{}} */
export function parseHash(hash) {
  let h = String(hash ?? '').replace(/^#\/?/, '');
  h = h.split('?')[0];
  const parts = h.split('/').filter(Boolean);
  const name = parts[0] || 'home';
  return { name, params: parts.slice(1), query: {} };
}

export function buildHash(name, params = []) {
  const p = [name, ...params].map(encodeURIComponent).join('/');
  return `#/${p}`;
}

let listeners = [];
let started = false;

export function onChange(cb) {
  listeners.push(cb);
}

export function navigate(name, params = []) {
  const hash = buildHash(name, params);
  if (location.hash === hash) {
    emit();
  } else {
    location.hash = hash; // triggers hashchange → emit
  }
}

function emit() {
  const parsed = parseHash(location.hash);
  for (const cb of listeners) {
    try { cb(parsed); } catch (err) { console.error('router listener failed', err); }
  }
}

export function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.addEventListener('hashchange', emit);
  if (!location.hash) history.replaceState(null, '', '#/');
  emit();
}

export function stop() {
  if (typeof window !== 'undefined') window.removeEventListener('hashchange', emit);
  listeners = [];
  started = false;
}

/** Page title helper */
export function docTitle(key) {
  if (typeof document === 'undefined') return;
  document.title = `${t(getLang(), 'appName')} — ${t(getLang(), key)}`;
}
