/* ============================================================
   LingoStep — utils.js
   Small DOM / format helpers shared across the app.
   Node-importable: no top-level DOM access.
   ============================================================ */

/** querySelector shorthand */
export function $(sel, root = document) {
  return root.querySelector(sel);
}

/** createElement helper: el('button', {class:'btn', text:'Hi', attrs:{...}}, [children]) */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue; // false must not become attribute="false"
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v; // only used with trusted static strings
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else if (v === true) node.setAttribute(k, '');
      else node.setAttribute(k, v);
    }
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/** Remove diacritics-free lowercase key for comparisons */
export function normKey(s) {
  return String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Fisher–Yates shuffle on a copy */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function pct(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

/** "yesterday", "2 days ago" style relative day labels are kept simple:
 *  returns YYYY-MM-DD in local time for a Date (default now). */
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** days (integer) between two dayKeys */
export function daysBetween(keyA, keyB) {
  const [ay, am, ad] = keyA.split('-').map(Number);
  const [by, bm, bd] = keyB.split('-').map(Number);
  const a = Date.UTC(ay, am - 1, ad);
  const b = Date.UTC(by, bm - 1, bd);
  return Math.round((b - a) / 86400000);
}

export function formatDuration(ms) {
  const totalSec = Math.round(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/** Simple toast (auto-removed). Returns nothing. */
export function toast(msg, ms = 2600) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.toast').forEach((t) => t.remove());
  const box = el('div', { class: 'toast', role: 'status', dir: 'auto', text: msg });
  document.body.appendChild(box);
  setTimeout(() => box.remove(), ms);
}

/** Escape text for safe use inside HTML strings (sparingly — prefer textContent). */
export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Group array items by keyFn result */
export function groupBy(arr, keyFn) {
  const out = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(item);
  }
  return out;
}
