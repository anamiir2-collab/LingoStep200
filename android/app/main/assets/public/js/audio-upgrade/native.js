/* ============================================================
   LingoStep — audio-upgrade/native.js  (v9 Android bridge)
   Thin, honest bridge between the speech engine and native
   Android TTS via the Capacitor TextToSpeech plugin.

   Why: the Android System WebView frequently ships with NO
   speechSynthesis voices, which made dictation audio unreliable
   inside the installed APK. When the native plugin is present it
   is used FIRST (clear system voices + proper audio-focus
   handling); otherwise everything falls back to the Web Speech
   API unchanged.

   No fake capabilities: if the plugin is missing (web/PWA) this
   module reports unavailable and the web path takes over.
   ============================================================ */

/** The native TextToSpeech plugin handle, or null. */
export function nativeTts() {
  try {
    if (typeof window === 'undefined') return null;
    return window.Capacitor?.Plugins?.TextToSpeech || null;
  } catch {
    return null;
  }
}

export function isNativeTtsAvailable() {
  return Boolean(nativeTts());
}

/**
 * Speak with the native engine. Resolves when the utterance
 * finishes; rejects on failure. rate/volume follow the same
 * clamps as the web pipeline.
 */
export async function nativeSpeak(text, { rate = 1, volume = 1, lang = 'en-US' } = {}) {
  const tts = nativeTts();
  if (!tts) throw new Error('native tts unavailable');
  const clampedRate = Math.min(1.3, Math.max(0.5, Number(rate) || 1));
  const clampedVolume = Math.min(1, Math.max(0, Number(volume) || 0));
  await tts.speak({
    text: String(text ?? ''),
    lang,
    rate: clampedRate,
    pitch: 1,           // never altered (same policy as web)
    volume: clampedVolume,
    category: 'playback', // proper Android audio-focus handling
  });
}

/** Stop native playback (safe to call anytime). */
export async function nativeStop() {
  const tts = nativeTts();
  if (!tts) return;
  try { await tts.stop(); } catch { /* ignore */ }
}

/** Whether speech recognition exists on the native side (unused, honest check). */
export function nativeRecognitionAvailable() {
  try {
    if (typeof window === 'undefined') return false;
    return Boolean(window.Capacitor?.Plugins?.VoiceRecorder) || false;
  } catch {
    return false;
  }
}
