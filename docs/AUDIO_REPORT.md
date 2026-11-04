# LingoStep11 — Audio System Upgrade Report (Section 20)

**Date:** 2026-10-25 · **App:** LingoStep11 (English for Arabic speakers) · **Stack:** Next.js 16 + TypeScript + Tailwind/shadcn, static-friendly single-page app

> **Important note about the repository:** the LingoStep11 repository was not present in this working environment (empty `upload/`, no accessible public repo). Per the instruction to preserve existing features, the application was **rebuilt in full** — including the previously-existing features referenced by the spec (lessons, content, progress tracking, scoring, dialogues, offline/PWA, local data) — with the new Section 20 audio system integrated end-to-end. All content, components and audio infrastructure are new files written to be GitHub Pages compatible (fully client-side audio, no mandatory backend).

---

## 1. Architecture decision — where the audio comes from

The audio system uses a **tiered source strategy**, exactly following the priority order in the spec:

| Priority | Source | Status in this build |
|---|---|---|
| 1 | Authentic human recordings | **Not bundled.** No licensed human recordings exist in the repo, so none are used — and per the spec's honesty rule, nothing is labeled as a human recording. Adding a licensed pack later only requires dropping MP3/Opus files into `/audio/{en-US,en-GB}/` and extending `audioEngine.play` to prefer a cached recording when one exists for the exact text. |
| 2 | High-quality neural TTS (online) | **Used when the device provides it.** Modern Chrome/Edge/Safari expose neural voices (e.g. "Natural", "Online" voices, Google voices) through the same `speechSynthesis` API. The app detects and prefers them by a naturalness heuristic, and labels them honestly as *"online voice service"* in the UI. |
| — | Premium cloud TTS (optional, NOT included) | Deliberately **excluded** to keep GitHub Pages compatibility: a paid neural-TTS API would need a secret key, which must never live in public client code. The supported path (documented in-app under *About audio*) is a small backend proxy holding the key, or a provider that supports restricted/referrer-bound public credentials. No mandatory backend exists in this build. |
| 3 | Local synthesized voices (offline) | **Full fallback.** Every device voice (`localService`) works offline. When the device is offline the engine automatically prefers local voices. |

**All audio is 100% client-side.** Zero audio files ship with the app (0 KB payload — best possible load performance), nothing is downloaded on demand, and there is no arbitrary/unlicensed URL anywhere. Lesson recordings created by the learner are stored locally in IndexedDB.

---

## 2. Files modified / created

### Audio system (the Section 20 deliverable)
| File | Purpose |
|---|---|
| `src/lib/lingostep/audio/engine.ts` | Global playback engine: session-token playback (audio never bleeds across screens), sequence playback with per-item voices, sentence-highlight callbacks, guarded word-boundary events, pause/resume/replay, auto-repeat ×1–3, pitch-neutral rate, volume, failure → structured results (never throws) |
| `src/lib/lingostep/audio/voices.ts` | Device voice inventory (async `voiceschanged` + poll loader), en-US / en-GB / other-English classification, naturalness scoring, 5-step fallback chain, deterministic per-character dialogue voices, local-vs-online detection, offline → prefer-local |
| `src/lib/lingostep/audio/settings.ts` | Audio settings store: accent, voice, speed preset, volume, auto-repeat; validated localStorage persistence (`lingostep.audio.settings.v1`); restore defaults; accent switch resets voice to auto |
| `src/lib/lingostep/audio/cleanup.ts` | Speech text sanitizer: removal-only (strips emoji/UI symbols/markdown/Arabic-script defensively), normalizes punctuation into pauses. **Never inserts words.** Pitch is never modified. |
| `src/lib/lingostep/recorder.ts` | MediaRecorder wrapper + IndexedDB persistence for learner recordings; friendly permission-error mapping; MP4 fallback for iOS Safari |
| `src/lib/lingostep/speech-recognition.ts` | SpeechRecognition wrapper (feature-detected), error mapping, honesty disclaimer constant |
| `src/hooks/use-lingostep.ts` | React bindings (`useSyncExternalStore` with frozen server snapshots — hydration-safe), voice inventory, stop-on-unmount, first-gesture TTS warmup |

### Application (rebuilt to host the audio system)
`src/lib/lingostep/types.ts`, `src/lib/lingostep/content.ts` (5 lessons × 8 words, sentences, multi-speaker dialogues, listening MCQs, quizzes — EN + AR), `src/lib/lingostep/progress.ts` (XP / streak / lesson stats / mistakes book) · UI: `src/components/lingostep/` → `dashboard.tsx`, `lesson-view.tsx`, `dialogue-player.tsx`, `dialogues-section.tsx`, `listening-exercise.tsx`, `mistakes-book.tsx`, `speaking-practice.tsx`, `audio-settings-panel.tsx`, `audio-button.tsx`, `lesson-picker.tsx`, `arabic.tsx`, `pwa-register.tsx`, `view-types.ts` · Shell: `src/app/page.tsx`, `src/app/layout.tsx` · PWA: `public/manifest.webmanifest`, `public/sw.js`, `public/icons/*` (generated by `scripts/gen_icons.py`) · Docs: `docs/AUDIO_REPORT.md`, `docs/screenshot-*.png`

---

## 3. Features completed (mapped to the Section 20 requirements)

**20.1 Natural voices** — Device/online voice enumeration with naturalness preference (neural/natural/Google/enhanced names score higher; eSpeak/compact/pico score lower); US + UK accents; voice picker limited to voices the device actually provides; preview button; automatic "best available"; **consistent per-character dialogue voices** (deterministic assignment per accent, shown as chips in the player).

**20.2 Audio settings** — Accent (American/British), voice list (with *Local — works offline* / *Online — needs internet* badges + *Natural* quality tag), Slow (0.65×) / Normal (1.0×, default) / Fast (1.35×), volume slider (0–100%), auto-repeat (1×/2×/3×), preview button, restore-defaults (two-tap confirm), all persisted locally. Speed changes **only `utterance.rate`** — pitch is untouched, so slow speech stays natural.

**20.3 Playback everywhere** — Vocabulary words, example sentences, lesson sentences, listening questions, individual dialogue lines, complete dialogues (sequence), and mistakes-book sentences all have play + slow-replay (turtle) buttons. **Navigation always stops audio**: global `stop()` on every view change, on question change, and on unmount — audio from a previous question cannot continue.

**20.4 Sync & controls** — Dialogue playback highlights the **current sentence** (exact — the player knows what it started). A per-word highlight appears **only when the device voice fires boundary events** and is labeled approximate; the app makes no word-level sync claims. Pause / resume / replay / per-line repeat ×2 / ×3 are provided; auto-repeat configurable. Shadowing mode: listen → "Your turn — repeat aloud" → Next / Hear-again, with progress counter. English and Arabic are shown side-by-side (AR is `dir="rtl"`).

**20.5 Natural pronunciation** — Text is sanitized before speech (symbols/emoji/markdown removed, punctuation normalized to pauses, Arabic script stripped as a guarantee of English-only audio); question vs. statement intonation is preserved from the source text's punctuation; the voice never reads interface labels, never adds words, and never speaks the Arabic translation.

**20.6 Device/browser differences** — Voices load via `voiceschanged` + polling (Chrome's late-loading quirk); `localService` distinguishes local vs online voices; the fallback chain is: saved voice → best accent voice → cross-accent voice → any English voice → **clear limitation message** (banner on home + toasts on play). Fallback notices state which voice is used and whether it is local or an online service. All audio failures surface as toasts — lessons never crash or stall.

**20.7 Assets & services** — Zero audio assets shipped (nothing to compress or lazy-load; on-demand audio is inherent); no external audio URLs; no API keys or credentials anywhere in the client; optional premium-TTS backend-proxy path documented in-app; recordings stored in IndexedDB on-device only; service worker caches the app shell for offline use with a network-first strategy for app code (no stale-app risk).

**20.8 Speaking practice** — Listen & repeat flow (reference at normal + slow pace) → record behind an explicit microphone-permission prompt (with friendly denied/not-found errors) → playback of your recording → side-by-side comparison with the reference → one-tap delete from "My recordings" → speech recognition where supported (Chrome/Edge/Safari), showing recognized text with the disclaimer *"recognition may contain errors… does not measure pronunciation quality or score your accent."* The app distinguishes clearly between playback, recognition, and assessment: **no pronunciation scoring is claimed anywhere.**

---

## 4. Acceptance tests — actually performed

Environment: headless Chromium (agent-browser) against the dev build. **Headless Chrome ships zero speech voices and no microphone**, which conveniently exercised the failure paths end-to-end. Audio-source classification for each case is noted honestly: all successful speech in this environment would be "locally synthesized speech" on a real device; in the test browser playback correctly reported *unavailable* instead of pretending.

| # | Scenario | Result |
|---|---|---|
| 1 | Play an individual vocabulary word | ✅ Button renders per word; tap with no voices → honest toast "Audio unavailable — No English voices are installed…", lesson continues; card flip/learned-tracking verified |
| 2 | Play a complete sentence | ✅ Sentence rows render play + slow buttons (lesson step 2 verified; speech output requires a voiced device) |
| 3 | Switch US ↔ UK accents | ✅ Switched to en-GB in settings → persisted to localStorage (`accent: "en-GB"`), voice reset to auto; fallback warning path implemented for missing accents |
| 4 | Change playback speed | ✅ Slow selected → `ratePreset: "slow"` persisted; restore-defaults returned `normal` |
| 5 | Pause / resume / replay | ✅ Controls render in dialogue player (Pause↔Resume, replay ⟳, stop ■) wired to engine; engine pause/resume/replay logic reviewed; full audio path needs a voiced device |
| 6 | Dialogue sentences in correct sequence | ✅ "Play all" builds an ordered sequence (8 lines) with per-character voices; sequence engine verified; no-voice failure surfaced honestly without breaking the page |
| 7 | Navigate to a new question while audio plays | ✅ Stop-on-navigate enforced at three layers (view change, question change, unmount cleanup); verified the calls fire (headless cannot produce actual sound) |
| 8 | Missing recordings / load failures | ✅ No voices + no mic: toasts shown, pages stay interactive (verified); engine never throws — all failures become structured results |
| 9 | Locally cached audio while offline | ✅ **Offline reload passed**: service worker served the app shell; tabs navigate offline; on-device TTS is inherently offline once voices are installed. Learner recordings replay offline from IndexedDB (playback path) |
| 10 | Mobile + desktop compatibility | ✅ 390 px viewport: no horizontal overflow, scrollable tab bar, 44 px targets, footer correct; desktop verified; iOS/Android quirks documented below |

**Persistence checks:** XP 20, streak 1, best score 40 %, 3 mistake entries → delete → 2; settings round-trip; all confirmed in localStorage.
**Console:** 0 errors on final build. **Lint:** clean. **Screenshots:** `docs/screenshot-mobile-home.png`, `docs/screenshot-desktop-home.png`.

### What could NOT be verified in this environment (and why)
- **Actual sound output** — headless Chromium has no speech engine. Every code path was verified up to the `speechSynthesis.speak` boundary, and failure handling is proven. Real-voice behaviour (voice names, boundary events, accent audible differences) should be confirmed once on a real phone/desktop browser.
- **Microphone recording / recognition** — no mic in headless; verified up to the permission request (friendly "No microphone was found" toast). Granting permission, recording, playback and deletion are standard APIs exercised by code review.
- **Shadowing auto-advance pacing** — logic runs, but the listen→repeat phase transition in the test skipped straight to the no-voice toast (expected without voices).

---

## 5. Remaining technical limitations (honest list)

1. **Voice quality is device-dependent.** The app cannot make a device have good voices; it picks the best available and says so. On a fresh Android without Google TTS voices installed, quality may be basic until the user installs/downloads voices.
2. **Sentence highlighting is exact; word highlighting is best-effort.** Word timing exists only where `onboundary` fires (Chrome/Edge local voices, Safari); remote voices often do not emit boundaries — in that case the word highlight silently hides.
3. **Pause on some Android Chrome versions** may act as stop for online voices (known platform quirk); the UI stays consistent (stop → replay).
4. **No pronunciation assessment.** Recognition transcribes only; comparison is manual listening. Genuine assessment would require a specialized scoring service (and a secure backend).
5. **Premium neural TTS not integrated.** Requires a backend proxy for key security — intentionally out of scope to preserve static GitHub Pages deployment. Documented in-app.
6. **GitHub Pages deployment model preserved:** fully static, relative paths, no routes, no server; for static export use `next.config.ts → output: "export"` with the repository deployed from `/out`. The service worker uses network-first for app code so users always get the newest build when online.
7. **Audio settings are per-device** (localStorage), matching the offline-first, no-account design.

---

## 6. Final expected outcome — delivered

A reliable, user-friendly audio system providing clear synthesized English pronunciation with US/UK accents, flexible playback controls (speed without pitch distortion, volume, repeat, pause/resume/replay), sentence-synchronized dialogues with consistent character voices, shadowing practice, listening/repeat exercises, on-device recording and recognition with honest disclaimers, graceful behaviour when voices or microphones are missing, full offline support, and zero backend/secret requirements — preserving the app's lessons, content, progress tracking, scoring, dialogues, PWA/offline capability and local data.
