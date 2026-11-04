/* ============================================================
   LingoStep — feedback-fx.js
   Duolingo-style practice celebration: short Web-Audio fanfares
   for correct/wrong/finish answers + a lightweight DOM confetti
   burst. No external files, no APIs, nothing paid — tones are
   synthesized locally and confetti is plain DOM + CSS.

   Design rules (mirror listening-writing-enhancements.js):
   - One shared AudioContext is reused for every tone.
   - Everything respects the user's `soundEffects` setting.
   - Never throws: effects are optional decoration; the lesson
     flow must keep working when Web Audio/DOM is unavailable.
   ============================================================ */

import { getSettings } from './settings.js';

let sharedCtx = null;

function audioCtx() {
  try {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx || sharedCtx.state === 'closed') sharedCtx = new Ctx();
    if (sharedCtx.state === 'suspended') sharedCtx.resume().catch(() => {});
    return sharedCtx;
  } catch {
    return null;
  }
}

function tone(freq, { dur = 0.1, delay = 0, gain = 0.06, type = 'sine' } = {}) {
  try {
    const ctx = audioCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.014);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
    osc.onended = () => {
      try { osc.disconnect(); g.disconnect(); } catch { /* ignore */ }
    };
  } catch { /* sound is optional; never block the lesson */ }
}

function effectsEnabled() {
  try {
    return getSettings().soundEffects !== false;
  } catch {
    return true;
  }
}

/** Happy ascending major arpeggio — correct answer. */
export function playCorrectFanfare() {
  if (!effectsEnabled()) return;
  tone(523.25, { dur: 0.11, gain: 0.07 });            // C5
  tone(659.25, { dur: 0.11, gain: 0.07, delay: 0.09 }); // E5
  tone(783.99, { dur: 0.13, gain: 0.07, delay: 0.18 }); // G5
  tone(1046.5, { dur: 0.22, gain: 0.075, delay: 0.27 }); // C6
}

/** Gentle low "dun-dun" — wrong answer (never harsh). */
export function playWrongBuzz() {
  if (!effectsEnabled()) return;
  tone(196, { dur: 0.15, gain: 0.055, type: 'triangle' }); // G3
  tone(147, { dur: 0.22, gain: 0.055, type: 'triangle', delay: 0.13 }); // D3
}

/** Small upbeat fanfare — lesson summary screen. */
export function playFinishFanfare() {
  if (!effectsEnabled()) return;
  const seq = [523.25, 659.25, 783.99, 1046.5];
  seq.forEach((f, i) => tone(f, { dur: 0.15, gain: 0.07, delay: i * 0.11 }));
  tone(1318.5, { dur: 0.3, gain: 0.07, delay: 0.46 }); // E6 sparkle
}

/* ---------- confetti ---------- */

const CONFETTI_COLORS = ['#34C759', '#007AFF', '#FF9500', '#FF375F', '#AF52DE', '#5AC8FA', '#FFD60A'];

/**
 * Drop a light burst of confetti particles from the top of the
 * viewport. Pure DOM + CSS animation, auto-cleaned. Safe to call
 * repeatedly; each burst removes its own particles.
 */
export function confettiBurst(count = 30) {
  try {
    if (typeof document === 'undefined') return;
    const n = Math.max(1, Math.min(90, Number(count) || 30));
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'fx-confetti';
      const size = 6 + Math.random() * 8;
      p.style.left = `${3 + Math.random() * 94}vw`;
      p.style.width = `${size.toFixed(1)}px`;
      p.style.height = `${(size * (0.5 + Math.random())).toFixed(1)}px`;
      p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      p.style.setProperty('--dx', `${(Math.random() * 120 - 60).toFixed(0)}px`);
      p.style.setProperty('--rot', `${(Math.random() * 760 - 380).toFixed(0)}deg`);
      p.style.setProperty('--dur', `${(1.7 + Math.random() * 1.5).toFixed(2)}s`);
      p.style.animationDelay = `${(Math.random() * 0.28).toFixed(2)}s`;
      frag.appendChild(p);
      setTimeout(() => p.remove(), 3800);
    }
    document.body.appendChild(frag);
  } catch { /* decoration only */ }
}
