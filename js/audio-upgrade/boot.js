/* ============================================================
   LingoStep — audio-upgrade/boot.js
   Bootstrap for the Section 20 audio upgrade.
   - Injects css/audio.css (no index.html edit needed)
   - Exposes window.LingoStepAudio (handy for support/testing)
   - Warms up the voice list early
   Node-safe: everything runs only in the browser.
   ============================================================ */

import * as core from './core.js';

if (typeof document !== 'undefined') {
  // inject the upgrade stylesheet once
  try {
    if (!document.querySelector('link[data-lingostep-audio]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = new URL('../../css/audio.css', import.meta.url).href;
      link.setAttribute('data-lingostep-audio', '1');
      document.head.appendChild(link);
    }
  } catch { /* styling degrades gracefully */ }

  // expose a small support surface (read-only debugging/testing)
  try {
    window.LingoStepAudio = {
      version: 1,
      diagnostics: core.diagnostics,
      getSettings: core.getAudioSettings,
      sanitize: core.sanitizeSpeechText,
      pause: core.pausePlayback,
      resume: core.resumePlayback,
      replay: core.replayLast,
      stop: core.stopSpeaking,
      onState: core.onAudioState,
      __debugSpeak: core.speak,
    };
  } catch { /* ignore */ }

  // warm the voice inventory so the first tap on a speaker button is instant
  try { core.loadVoices(); } catch { /* never fatal */ }
}

export default core;
