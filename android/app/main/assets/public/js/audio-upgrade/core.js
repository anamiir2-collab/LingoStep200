/* ============================================================
   LingoStep — audio-upgrade/core.js  (Section 20 audio system)
   Natural-voice engine layer for the existing vanilla app.

   Design rules (honesty first):
   - 100% client-side Web Speech API. No backend, no keys, no
     downloaded audio. Every voice shown to the user comes from
     the actual device; nothing is ever labeled a "human recording".
   - Text sanitizer is REMOVAL-ONLY: it can delete characters that
     must not be read aloud (emoji, UI symbols, Arabic glyphs), it
     never inserts or rewrites words.
   - Pitch is never modified; speed presets keep the original pitch.
   - All playback is cancellable via generation tokens, so navigating
     away or tapping another button can never leak audio.
   - Node-importable: no top-level window/document access.
   ============================================================ */

import { getSettings, saveSettings } from '../settings.js';
import { nativeTts, isNativeTtsAvailable, nativeSpeak, nativeStop } from './native.js';

/* ---------------- audio preferences (own storage key) ---------------- */

const AUDIO_KEY = 'lingostep:audio';

export const SPEED_PRESETS = { slow: 0.65, normal: 1, fast: 1.3 };
export const ACCENTS = ['us', 'uk', 'auto'];

const DEFAULT_AUDIO = {
  accent: 'us',                       // 'us' | 'uk' | 'auto'
  voiceURI: { us: '', uk: '', auto: '' }, // remembered voice per accent
  speed: 'normal',                    // 'slow' | 'normal' | 'fast'
  volume: 1,                          // 0 - 1
  autoRepeat: 1,                      // 1 | 2 | 3
};

let audioCache = null;

function safeGetAudio() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(AUDIO_KEY);
  } catch { return null; }
}

/** Load audio prefs merged over defaults; invalid values fall back safely. */
export function getAudioSettings() {
  if (audioCache) return { ...audioCache, voiceURI: { ...audioCache.voiceURI } };
  let parsed = {};
  const raw = safeGetAudio();
  if (raw) { try { parsed = JSON.parse(raw) || {}; } catch { parsed = {}; } }
  const merged = {
    ...DEFAULT_AUDIO,
    ...(parsed && typeof parsed === 'object' ? parsed : {}),
    voiceURI: { ...DEFAULT_AUDIO.voiceURI, ...((parsed && parsed.voiceURI) || {}) },
  };
  if (!ACCENTS.includes(merged.accent)) merged.accent = 'us';
  if (!SPEED_PRESETS[merged.speed]) merged.speed = 'normal';
  for (const k of ACCENTS) if (typeof merged.voiceURI[k] !== 'string') merged.voiceURI[k] = '';
  merged.volume = Math.min(1, Math.max(0, Number(merged.volume)));
  if (!Number.isFinite(merged.volume)) merged.volume = 1;
  merged.autoRepeat = [1, 2, 3].includes(Number(merged.autoRepeat)) ? Number(merged.autoRepeat) : 1;
  audioCache = merged;
  return { ...audioCache, voiceURI: { ...audioCache.voiceURI } };
}

/** Persist audio prefs. Speed is mirrored into the legacy settings.rate so
 *  every existing call site (lessons, dialogues, vocab) plays at the chosen
 *  speed without touching those files. */
export function saveAudioSettings(patch = {}) {
  const next = getAudioSettings();
  if (patch.accent !== undefined && ACCENTS.includes(patch.accent)) next.accent = patch.accent;
  if (patch.speed !== undefined && SPEED_PRESETS[patch.speed]) next.speed = patch.speed;
  if (patch.volume !== undefined) next.volume = Math.min(1, Math.max(0, Number(patch.volume) || 0));
  if (patch.autoRepeat !== undefined && [1, 2, 3].includes(Number(patch.autoRepeat))) next.autoRepeat = Number(patch.autoRepeat);
  if (patch.voiceURI !== undefined && patch.voiceURI && typeof patch.voiceURI === 'object') {
    for (const k of ACCENTS) {
      if (typeof patch.voiceURI[k] === 'string') next.voiceURI[k] = patch.voiceURI[k];
    }
  }
  audioCache = next;
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(AUDIO_KEY, JSON.stringify(next));
  } catch { /* private mode etc. — settings simply stay for the session */ }
  // mirror speed into legacy settings.rate (0.5-1.3 clamp matches settings.js)
  try { saveSettings({ rate: SPEED_PRESETS[next.speed] }); } catch { /* settings module optional */ }
  return { ...audioCache, voiceURI: { ...audioCache.voiceURI } };
}

/** Restore factory audio settings. */
export function restoreAudioDefaults() {
  audioCache = null;
  try { if (typeof localStorage !== 'undefined') localStorage.removeItem(AUDIO_KEY); } catch { /* ignore */ }
  try { saveSettings({ rate: SPEED_PRESETS.normal }); } catch { /* ignore */ }
  return getAudioSettings();
}

/* ---------------- sanitizer (removal only) ---------------- */

/* Never-read characters: emoji & pictographs, dingbats, arrows, symbols,
   variation selectors, zero-width, controls, and Arabic script (defensive —
   the app must speak English only, even if a label leaks in).
   The /u flag makes astral ranges (U+1Fxxx) legal inside the class. */
const STRIP_RE = /[\u00A0\u1680\u2000-\u200F\u202A-\u202F\u205F-\u206F\uFEFF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u2190-\u21FF\u2300-\u23FF\u2460-\u24FF\u2500-\u27BF\u2900-\u297F\u2B00-\u2BFF\u{1F000}-\u{1FAFF}\uFE0E\uFE0F\u200B-\u200D\u00AD\u0000-\u001F\u007F-\u009F\[\]{}<>|*#`~_^=+\\\/@§¶†‡•¤¢€£¥©®™°±µ]/gu;

/** Remove everything that must never be read aloud. Never inserts text. */
export function sanitizeSpeechText(text) {
  let s = String(text ?? '');
  s = s.replace(/&[a-zA-Z]+;|&#\d+;/g, ' '); // HTML entities → space
  s = s.replace(STRIP_RE, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/* ---------------- voice inventory ---------------- */

let cachedVoices = [];
let voicesReady = false;
let voiceScanDone = false; // true once the initial scan finished (even with 0 voices)

export function isSupported() {
  // v9: native Android TTS counts as full support — the WebView often
  // has no speechSynthesis voices, so the native engine is preferred.
  if (isNativeTtsAvailable()) return true;
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && typeof window.SpeechSynthesisUtterance === 'function';
}

function synth() {
  return window.speechSynthesis;
}

/** Load voices (Chrome fills them async). Resolves fast, polls as fallback.
 *  Repeat calls never re-poll: a completed scan (with or without voices)
 *  resolves immediately with its cached result. */
export function loadVoices() {
  return new Promise((resolve) => {
    // v9: native engine → present one honest synthetic voice entry so
    // settings UIs have something real to describe.
    if (isNativeTtsAvailable()) {
      if (!cachedVoices.length) {
        cachedVoices = [{
          name: 'Android System Voice',
          lang: 'en-US',
          voiceURI: 'native:android',
          localService: true,
          default: true,
        }];
        voicesReady = true;
        voiceScanDone = true;
      }
      resolve(cachedVoices.slice());
      return;
    }
    if (!isSupported()) { resolve([]); return; }
    if (voicesReady && cachedVoices.length) { resolve(cachedVoices.slice()); return; }
    if (voiceScanDone && cachedVoices.length === 0) { resolve([]); return; }
    const read = () => {
      const v = synth().getVoices() || [];
      if (v.length) { cachedVoices = v; voicesReady = true; }
      return v;
    };
    const first = read();
    if (first.length) { resolve(first); return; }
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const v = read();
      if (v.length || tries > 20) { clearInterval(timer); voiceScanDone = true; resolve(v); }
    }, 250);
    try {
      if (typeof synth().addEventListener === 'function') {
        synth().addEventListener('voiceschanged', () => read(), { once: true });
      }
    } catch { /* ignore */ }
  });
}

function classify(v) {
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  const name = (v.name || '').toLowerCase();
  let accent = 'other';
  if (lang.startsWith('en-us')) accent = 'us';
  else if (lang.startsWith('en-gb')) accent = 'uk';
  else if (/american|us english|united states/.test(name)) accent = 'us';
  else if (/british|uk english|united kingdom/.test(name)) accent = 'uk';
  const natural = /natural|premium|enhanced|neural|google|siri|eloquence|multilingual/.test(name);
  return { accent, natural, local: Boolean(v.localService), lang };
}

/** Detailed English voice list with honest labels. */
export function englishVoicesDetailed() {
  return cachedVoices
    .filter((v) => (v.lang || '').toLowerCase().startsWith('en'))
    .map((v) => {
      const c = classify(v);
      return {
        voice: v,
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        accent: c.accent,
        natural: c.natural,
        local: c.local,
        label: c.natural ? 'natural' : (c.local ? 'local' : 'online'),
      };
    });
}

/** Back-compat: plain English voice array (original API). */
export function englishVoices() {
  return englishVoicesDetailed().map((d) => d.voice);
}

function scoreVoice(d, accent) {
  let s = 0;
  if (accent === 'us' && d.accent === 'us') s += 6;
  if (accent === 'uk' && d.accent === 'uk') s += 6;
  if (accent === 'auto' && d.accent === 'us') s += 2;
  if (d.natural) s += 5;
  if (d.local) s += 2;
  if (d.voice.default) s += 1;
  return s;
}

/** Best voice for an accent, or null. */
export function pickVoiceForAccent(accent) {
  const list = englishVoicesDetailed();
  if (!list.length) return null;
  const preferred = accent === 'uk' ? list.filter((d) => d.accent === 'uk') : list.filter((d) => d.accent === 'us');
  const pool = preferred.length ? preferred : list; // honest fallback: any English voice
  return pool.sort((a, b) => scoreVoice(b, accent) - scoreVoice(a, accent))[0].voice;
}

/** Back-compat default pick (US-leaning, natural first). */
export function pickDefaultVoice() {
  return pickVoiceForAccent('auto');
}

function findByURI(uri) {
  return cachedVoices.find((v) => v.voiceURI === uri) || null;
}

/**
 * Resolve which voice to use, in order:
 * explicit opts.voiceURI → remembered voice for the active accent →
 * best natural voice for the accent → best natural English voice →
 * browser default (null). A remembered voice that vanished from the
 * device is skipped (never blocks playback).
 */
function resolveVoice(explicitURI) {
  const a = getAudioSettings();
  if (explicitURI) {
    const v = findByURI(explicitURI);
    if (v) return v;
  }
  const remembered = a.voiceURI[a.accent];
  if (remembered) {
    const v = findByURI(remembered);
    if (v) return v;
  }
  return pickVoiceForAccent(a.accent);
}

/* ---------------- playback engine ---------------- */

let speakGeneration = 0;
let lastRun = null; // { text, opts } for replay
const stateListeners = new Set();
let playing = false;
let paused = false;

function notify() {
  for (const fn of stateListeners) {
    try { fn({ playing, paused }); } catch { /* listener errors never break audio */ }
  }
}

export function onAudioState(fn) {
  stateListeners.add(fn);
  return () => stateListeners.delete(fn);
}

export function getAudioState() {
  return { playing, paused };
}

export function clampRate(r) {
  const n = Number(r);
  if (!Number.isFinite(n)) return 1;
  return Math.min(1.3, Math.max(0.5, n));
}

function finish() { playing = false; paused = false; notify(); }

function noVoicesOnDevice() {
  return voiceScanDone && cachedVoices.length === 0;
}

/**
 * Speak English text with the upgraded pipeline:
 * sanitized text → accent-aware voice → pitch-neutral rate → volume →
 * optional auto-repeat (plays N times, then fires onend ONCE).
 * opts: { voiceURI, rate, volume, onend, onerror, repeat }
 * Returns false when speech is unsupported or the text is empty after
 * sanitizing (nothing is ever "read" as symbols).
 */
export function speak(rawText, opts = {}) {
  if (!isSupported() || noVoicesOnDevice()) return false;
  const text = sanitizeSpeechText(rawText);
  if (!text) return false;

  const a = getAudioSettings();
  const rate = clampRate(opts.rate ?? SPEED_PRESETS[a.speed]);
  const volume = Math.min(1, Math.max(0, Number(opts.volume ?? a.volume)));

  // v9: NATIVE ANDROID PATH — reliable voices + audio focus. The
  // plugin's speak() promise resolves on completion (or rejects),
  // which maps onto the same onend/onerror callbacks.
  if (isNativeTtsAvailable()) {
    const gen = ++speakGeneration;
    lastRun = { text, opts: { ...opts } };
    playing = true; paused = false; notify();
    nativeSpeak(text, { rate, volume })
      .then(() => {
        if (gen !== speakGeneration) return;
        finish();
        if (typeof opts.onend === 'function') opts.onend();
      })
      .catch(() => {
        if (gen !== speakGeneration) return;
        finish();
        if (typeof opts.onerror === 'function') opts.onerror();
      });
    return true;
  }

  const gen = ++speakGeneration;
  const s = synth();
  try { s.cancel(); } catch { /* ignore */ }

  const voice = resolveVoice(opts.voiceURI || '');
  const repeat = Math.min(3, Math.max(1, Number(opts.repeat ?? a.autoRepeat) || 1));

  lastRun = { text, opts: { ...opts } };

  playing = true; paused = false; notify();

  const endOnce = (fn) => { finish(); if (typeof fn === 'function') fn(); };

  const attempt = (left) => {
    if (gen !== speakGeneration) return; // superseded
    const u = new window.SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; u.lang = voice.lang || 'en-US'; } else { u.lang = 'en-US'; }
    u.rate = rate;
    u.pitch = 1; // never altered
    u.volume = volume;
    let settled = false;
    u.onend = () => {
      if (settled || gen !== speakGeneration) return;
      settled = true;
      if (left > 1) setTimeout(() => attempt(left - 1), 350); // small natural gap
      else endOnce(opts.onend);
    };
    u.onerror = () => {
      if (settled || gen !== speakGeneration) return;
      settled = true;
      endOnce(opts.onerror);
    };
    try { s.speak(u); } catch { settled = true; endOnce(opts.onerror); }
  };

  attempt(repeat);
  return true;
}

export function stopSpeaking() {
  speakGeneration += 1;
  if (isNativeTtsAvailable()) { nativeStop(); }
  if (isSupported()) { try { synth().cancel(); } catch { /* ignore */ } }
  finish();
}

/** Pause current speech. On the native Android engine there is no
 *  pause primitive — playback stops (press Play to restart honestly). */
export function pausePlayback() {
  if (isNativeTtsAvailable()) {
    if (!playing) return false;
    nativeStop();
    finish();
    return true;
  }
  if (!isSupported() || !playing) return false;
  try { synth().pause(); paused = true; notify(); return true; } catch { return false; }
}

/** Resume after pause. */
export function resumePlayback() {
  if (!isSupported() || !paused) return false;
  try { synth().resume(); paused = false; notify(); return true; } catch { return false; }
}

/** Replay the last thing the engine spoke (same text, voice, speed). */
export function replayLast() {
  if (!lastRun) return false;
  return speak(lastRun.text, { ...lastRun.opts, repeat: 1 });
}

/**
 * Sequence playback (e.g. a dialogue line by line, in order).
 * items: array of strings or { text, voiceURI?, rate?, label? }
 * opts: { gapMs=500, repeatEach=autoRepeat, onitem(i), onend, onerror }
 * Returns { stop() }. Navigating away or any speak()/stopSpeaking()
 * cancels the whole sequence (generation token).
 */
export function speakSequence(items, opts = {}) {
  const list = (items || []).map((it) => (typeof it === 'string' ? { text: it } : it)).filter((it) => it && it.text);
  if (!isSupported() || noVoicesOnDevice() || !list.length) return { stop() {}, active: false };
  const gen = ++speakGeneration;
  const gap = Math.min(2000, Math.max(0, Number(opts.gapMs ?? 500)));
  const repeatEach = Math.min(3, Math.max(1, Number(opts.repeatEach ?? getAudioSettings().autoRepeat) || 1));
  let stopped = false;

  const step = (i) => {
    if (stopped || gen !== speakGeneration) return;
    if (i >= list.length) { if (typeof opts.onend === 'function') opts.onend(); return; }
    if (typeof opts.onitem === 'function') opts.onitem(i, list[i]);
    speak(list[i].text, {
      voiceURI: list[i].voiceURI || '',
      rate: list[i].rate,
      repeat: repeatEach,
      onend: () => { if (!stopped && gen === speakGeneration) setTimeout(() => step(i + 1), gap); },
      onerror: () => { if (typeof opts.onerror === 'function') opts.onerror(i); },
    });
  };

  step(0);
  return {
    active: true,
    stop() { stopped = true; stopSpeaking(); },
  };
}

/**
 * Word-by-word playback (turtle mode) — original semantics preserved:
 * each word is its own utterance; onend fires only on natural completion.
 */
export function speakWordByWord(rawText, opts = {}) {
  if (!isSupported() || noVoicesOnDevice() || !rawText) return { stop() {}, active: false };
  const words = sanitizeSpeechText(rawText).split(/\s+/).filter(Boolean);
  if (!words.length) return { stop() {}, active: false };

  const gen = ++speakGeneration;
  const s = synth();
  try { s.cancel(); } catch { /* ignore */ }

  const voice = resolveVoice(opts.voiceURI || '');
  const rate = clampRate(opts.rate ?? 0.6);
  const gap = Math.min(1500, Math.max(0, Number(opts.gapMs ?? 320)));
  const a = getAudioSettings();
  let stopped = false;

  playing = true; paused = false; notify();

  const advance = (i) => {
    if (stopped || gen !== speakGeneration) return;
    if (i >= words.length) { finish(); if (typeof opts.onend === 'function') opts.onend(); return; }
    if (typeof opts.onword === 'function') opts.onword(i, words.length);
    const u = new window.SpeechSynthesisUtterance(words[i]);
    if (voice) { u.voice = voice; u.lang = voice.lang || 'en-US'; } else { u.lang = 'en-US'; }
    u.rate = rate;
    u.pitch = 1;
    u.volume = Math.min(1, Math.max(0, Number(opts.volume ?? a.volume)));
    const next = () => { if (!stopped && gen === speakGeneration) setTimeout(() => advance(i + 1), gap); };
    u.onend = next;
    u.onerror = next;
    try { s.speak(u); } catch { next(); }
  };

  advance(0);
  return {
    active: true,
    stop() { stopped = true; try { s.cancel(); } catch { /* ignore */ } finish(); },
  };
}

/* ---------------- diagnostics ---------------- */

export function diagnostics() {
  const d = englishVoicesDetailed();
  return {
    supported: isSupported(),
    total: cachedVoices.length,
    english: d.length,
    us: d.filter((x) => x.accent === 'us').length,
    uk: d.filter((x) => x.accent === 'uk').length,
    natural: d.filter((x) => x.natural).length,
    local: d.filter((x) => x.local).length,
    list: d,
  };
}

/* ---------------- recording (speaking practice) ---------------- */

/**
 * Start a recording. Returns { stop(): Promise<Blob> } or throws
 * { message } with a friendly, already-translated error key.
 */
export async function startRecording() {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    const err = new Error('recordingUnsupported'); throw err;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    const name = e && e.name;
    if (name === 'NotAllowedError' || name === 'SecurityError') { const err = new Error('recordingDenied'); throw err; }
    if (name === 'NotFoundError' || name === 'OverconstrainedError') { const err = new Error('recordingNoMic'); throw err; }
    const err = new Error('recordingFailed'); throw err;
  }
  const mime = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm'))
    ? 'audio/webm' : '';
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  const chunks = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.start();
  return {
    active: true,
    stop() {
      return new Promise((resolve) => {
        if (rec.state === 'inactive') { resolve(new Blob(chunks, { type: mime || 'audio/webm' })); return; }
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(chunks, { type: mime || 'audio/webm' }));
        };
        try { rec.stop(); } catch { stream.getTracks().forEach((t) => t.stop()); resolve(new Blob(chunks, { type: mime || 'audio/webm' })); }
      });
    },
  };
}

/**
 * One-shot speech recognition. Resolves { transcript } or { error } where
 * error is a stable key: 'recognitionUnsupported' | 'recognitionDenied' |
 * 'noSpeech' | 'recognitionNetwork' | 'recognitionFailed'.
 * Recognition is OPTIONAL and always labeled "may be wrong" in the UI.
 */
export function recognizeOnce(opts = {}) {
  return new Promise((resolve) => {
    const SR = (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) { resolve({ error: 'recognitionUnsupported' }); return; }
    let rec;
    try {
      rec = new SR();
      rec.lang = opts.lang || 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
    } catch { resolve({ error: 'recognitionUnsupported' }); return; }
    let settled = false;
    const finish = (r) => { if (!settled) { settled = true; resolve(r); } try { rec.abort(); } catch { /* ignore */ } };
    rec.onresult = (e) => {
      const res = e.results && e.results[0];
      const transcript = res && res[0] && res[0].transcript;
      if (transcript) finish({ transcript: String(transcript).trim() });
      else finish({ error: 'recognitionFailed' });
    };
    rec.onerror = (e) => {
      const map = {
        'not-allowed': 'recognitionDenied', 'service-not-allowed': 'recognitionDenied',
        'no-speech': 'noSpeech', 'network': 'recognitionNetwork', 'audio-capture': 'recordingNoMic',
      };
      finish({ error: map[e && e.error] || 'recognitionFailed' });
    };
    rec.onend = () => finish({ error: 'noSpeech' });
    try { rec.start(); } catch { finish({ error: 'recognitionFailed' }); }
  });
}

/** Optional: speech recognition availability (original API kept). */
export function recognitionSupported() {
  return typeof window !== 'undefined'
    && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}
