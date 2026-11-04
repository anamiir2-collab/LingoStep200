/* ============================================================
   LingoStep — speech.js   (upgraded by the Section 20 audio system)
   Browser-native TTS via the Web Speech API. No paid API, no keys,
   no network requirement beyond the browser/OS's own voices.

   What this upgrade adds (all behind the SAME original API):
   - US / UK accent selection with a remembered voice per accent
   - Best-available voice resolution with honest fallback chain
   - Playback speed presets (pitch is never modified)
   - Volume control, auto-repeat (1-3), pause / resume / replay
   - Removal-only text sanitizer (emoji, UI symbols and Arabic
     glyphs are never read aloud; words are never invented)
   - Reliable stop on navigation (generation tokens)
   - Sequence playback + detailed voice diagnostics
   - MediaRecorder capture + optional speech recognition helpers

   Honest limitations (also shown in the UI):
   - Voice availability depends on browser + OS.
   - Offline quality depends on locally installed voices.
   - All speech is synthetic; nothing here is a human recording.
   ============================================================ */

// Boots the audio upgrade (injects its stylesheet, exposes window.LingoStepAudio).
import './audio-upgrade/boot.js';

export {
  isSupported,
  loadVoices,
  englishVoices,
  englishVoicesDetailed,
  pickDefaultVoice,
  pickVoiceForAccent,
  speak,
  stopSpeaking,
  pausePlayback,
  resumePlayback,
  replayLast,
  speakSequence,
  speakWordByWord,
  clampRate,
  sanitizeSpeechText,
  diagnostics,
  onAudioState,
  getAudioState,
  getAudioSettings,
  saveAudioSettings,
  restoreAudioDefaults,
  startRecording,
  recognizeOnce,
  recognitionSupported,
} from './audio-upgrade/core.js';
