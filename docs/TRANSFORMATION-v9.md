# LingoStep v9.0.0 — Complete Transformation Report

**Date:** 2026-11-04 · **Base:** v8.0.0 · **Result:** real Android app + smart touch-only learning engine

---

## 1. What was analyzed first

The repository was inspected end-to-end before any change: architecture (vanilla-JS ES-module SPA, hash router, IndexedDB storage, Web Speech API, service-worker PWA), all 252 lesson files and the manifest, the exercise engine (`lesson-engine.js`), the input surfaces (`touch-typing.js`, `letter-track.js`, dead `keyboard.js`), audio (`audio-upgrade/*`), progress/XP/review/backup, the More hub, navigation, CSS layers, tests and the existing Capacitor configuration.

**Critical pre-existing defect found and fixed:** the manifest referenced 25 food-services lessons (`lesson-071` … `lesson-095`, ≈1,390 exercises) whose files were **never committed** — the whole section was dead and 2 test suites failed. The section was restored in full (see §3).

## 2. Android application (Capacitor 8)

- Full `android/` project generated and committed: `appId com.anamiir2collab.lingostep`, app name **LingoStep**, `versionCode 9 / versionName 9.0.0`, minSdk 24, targetSdk 36.
- **Professional launcher icon** (adaptive, all densities + round) and **native splash screen**, generated from purpose-drawn 1024px/2732px source art (`assets/icon-only.png`, `assets/splash.png`).
- Permissions: `INTERNET` plus the notification set required by the daily-reminder feature (`POST_NOTIFICATIONS`, `RECEIVE_BOOT_COMPLETED`, `WAKE_LOCK`, `SCHEDULE_EXACT_ALARM`). No dangerous permissions.
- `js/native.js` bridge (no npm imports — the web/PWA keeps working): **Android back button** asks for confirmation at the app root and never exits accidentally; **status bar** styled to the brand blue; **splash hidden** once the shell is interactive; **speech stops** when the app is backgrounded; **daily reminder** via real local notifications (web fallback reports unsupported honestly).
- Web build step (`scripts/build-www.js`) copies an explicit allow-list into `www/` — `capacitor.config.json` now uses `webDir: "www"`. The build fails on purpose if the QWERTY module ever reappears.
- **Both APKs build locally and were verified**: debug (6.8 MB) and release-unsigned (5.4 MB) — package, permissions and bundled assets checked with `aapt`/`unzip` (375 lesson modules inside the APK, `keyboard.js` absent).
- `.github/workflows/android.yml`: installs → tests (17 suites) → `npm run build` → `cap sync` → `assembleDebug` + `assembleRelease` → verifies outputs → uploads both APKs as artifacts and publishes a GitHub Release on main. `deploy.yml` (GitHub Pages) was also repaired — its `branches:` line was corrupted YAML.

## 3. Content preservation (mandatory)

- The **25 missing food-services lessons were rebuilt** from topic data banks (`scripts/content/banks/food-services/*.json`) assembled by `scripts/content/gen-food-services.mjs` into schema-perfect modules: exactly **1,390 exercises** (1,058 listen-and-type, 153 fill-blank, 102 word-order, 77 multiple-choice), **1,721 accepted answers**, **300 vocabulary entries**.
- `tests/content-parity-tests.js` passes: **252 lessons / 14,035 exercises / 16,791 accepted answers / 3,022 vocabulary — identical to the frozen pre-transformation baseline.**
- Cross-lesson duplicate-sentence collisions (56 sentences shared with pre-existing lessons) were replaced with fresh topic-appropriate content; `tests/lesson-tests.js` passes with zero cross-lesson duplicates.
- No lesson, question, answer, exercise type, achievement or scoring rule was removed or rewritten anywhere else.

## 4. Keyboard removal (complete)

- `js/keyboard.js` (legacy QWERTY), `js/speech.next.js` (dead duplicate) and `js/listening-writing-enhancements.js` (dead input pipeline) are **deleted**; `buildLetterSurface` (the last real `<input>` surface) is removed from `letter-track.js`.
- The v8 built-in **touch QWERTY pad inside `touch-typing.js` is gone**. Dictation now uses the **letter-tile bank**: the letters of the current word plus decoys, shuffled; wrong letters are rejected with the same prefix policy as the original app (tests `touch-typing-tests.js` unchanged and passing).
- No exercise creates a text input, so the Android system keyboard can never appear. Desktop physical-keyboard input is kept as an optional accessibility path (no on-screen keyboard UI anywhere).
- The single ⌫ button only removes the last letter of the **active** word. **There is no clear-all button anywhere.**

## 5. Smart hint system (first letter only)

`js/exercise-state.js` (new, pure, Node-tested) enforces the policy in state, not styling:

- **Reveals only the next hidden letter of the current incomplete word**, styled turquoise in its slot; revealed letters count toward the answer.
- **Cap: at most half of the word** — repeated presses stop with "No more hints for this word". One-letter words are never hinted (that would be the whole word).
- Already-completed (locked) words are never re-revealed; when a word locks, the next hint press automatically targets the next incomplete word.
- The Hint button **never** shows the Arabic meaning, the complete word, or the full sentence. (The Arabic meaning stays available in the normal after-answer feedback, as before.)
- Per type: dictation/fill-blank → first-letter reveal; word-order → "Next word starts with «X»" clue for the current target slot; multiple-choice → step 1 removes ONE wrong option, step 2 shows the answer's first letter — never auto-selecting.
- Existing XP policy preserved: any hint press keeps the `WITH_HINT` tier (verified in-browser: hinted answer awarded +5 instead of +10).

## 6. Word locking + sentence protection

- Dictation: words **lock green one by one** (locked slots render green and frozen; the space is automatic). Word-order: a chip placed in its correct position **locks instantly**; a wrong chip stays red and removable. Fill-blank: the assembled answer locks green only after `checkAnswer` confirms it — wrong assemblies are marked red and stay editable.
- The state model (`empty / active / incorrect / locked / complete`) lives in `exercise-state.js` and is enforced there: locked words cannot be edited, deleted, replaced or moved; backspace never touches them; incorrect answers never lock. Verified in-browser (locked "Hello" survived the whole attempt; wrong "water" chip was removed and replaced).
- Restart shows a **confirmation dialog** (Cancel/Restart, custom modal — no `window.confirm`); Cancel changes nothing; Restart resets only the current attempt; saved lesson progress is untouched. Exit uses the same dialog.

## 7. Mandatory skip (never unanswered)

- Skip marks the question **skipped in the lesson history** (no points, no success), then **splices a different question from the same lesson** right after it — same difficulty preferred, already-used alternatives and answered questions excluded (`pickAlternativeQuestion`). The learner must answer the alternative with normal validation to progress.
- Repeated skips chain to further alternatives; when none remain, the UI blocks skipping with "No other question is available — this one must be completed" and the question stays answerable.
- Skipped originals are tracked separately in the summary ("Skipped" row added), and alternative answers award normal XP under their own exercise ids.

## 8. Audio & pronunciation

- **Native Android TTS bridge** (`audio-upgrade/native.js`): when the Capacitor TextToSpeech plugin is present it is used first — clear system voices and proper audio focus; the Web Speech API remains the web/PWA engine. Voice scan, settings UI and diagnostics keep working against both engines.
- Exercise audio row now has **Play · Pause/Resume · Slower (word-by-word) · Speed cycle (slow → normal → fast)** plus a replay action; pausing on native stops honestly (the plugin has no pause primitive) and the button restarts.
- Speed presets still mirror into `settings.rate`; the More hub has a playback-speed control and a full Audio Settings page (`#/audio`).

## 9. UI redesign & More hub

- New `css/premium.css` layer: blue→turquoise gradient system, refined cards/buttons, floating bottom navigation with gradient active pill (transform fix for the v8 centering), modal dialogs, letter tiles, locked-word states, hint chips, positional word-order slots, More link rows, help/FAQ pages — RTL-aware throughout (verified visually in Arabic).
- **More hub reorganized into the four required categories** — Learning, My Progress, Application Settings, Help & Information — every row navigates to a real screen or controls a real setting; duplicates removed; About card shows version v9.0.0 and the real contact.
- New real screens: `#/audio` (voice/speed/speaking panel), `#/help` (8-step bilingual guide), `#/faq` (8 honest Q&As), `#/history` (recently practiced lessons from real attempt data).
- Bottom navigation keeps the 5 required tabs: Home, Sections, Vocabulary, Progress, More.

## 10. Progress, storage & data

- **Backup v2** implemented (`progress.js`): exports/imports/restores `xp`, `review`, `vocabStats`, `placementResult`, `dailyPlan` alongside the core keys, with per-exercise XP merge on import and full wipe on clear — the previously-orphaned `backup-tests.js` now passes.
- Orphaned test suites (`hints`, `placement`, `daily-plan`, `backup`) are registered again. New suite `exercise-state-tests.js` covers locking, hint caps, backspace protection, word-order locking/removal and skip alternatives. **17/17 suites pass**; `npm run validate` passes.
- All existing user data structures (IndexedDB keys, attempts, lesson states, streaks) are unchanged — upgrades preserve data; the service worker version bumps to `v9.0.0-android` with the new modules precached and the deleted keyboard modules dropped.

## 11. What was tested

- **Node:** 17/17 suites, content parity against the frozen baseline, project validation.
- **Browser (headless Chromium, mobile viewport, real taps):** home; lesson flow; dictation tile answering (word locked green); auto-check; +5 XP with hint / celebration sheet; hint first-letter + cap; skip → alternative-question insertion ("Sentence 3 of 55", "Alternative question" chip); word-order wrong-chip removal + full green lock; restart & exit dialogs; More hub (4 categories); help/FAQ; language switch to Arabic (full RTL); bottom navigation on all screens; zero console errors.
- **Two real bugs found by browser testing were fixed and covered by regression tests:** word-order wrong chips were not removable (missing `position` in the slots view), and the bottom nav was double-centered (v8 `translateX(-50%)` conflict).
- **Android:** debug + release APKs assemble locally (JDK 21, SDK 36) and were inspected (`aapt badging`, asset list). Runtime behavior on physical devices follows in the CI build; the code paths used on-device (native TTS, back button, notifications) all have guarded fallbacks.

## 12. Honest limitations

- The release APK is **unsigned** (no signing keys exist in the repo, by design). For daily use install the debug APK; for Play Store signing, add your own keystore outside version control.
- On native Android, "Pause" stops playback (the OS TTS engine has no pause primitive); web browsers keep true pause/resume.
- Notification scheduling on the web/PWA is not supported by browsers; the toggle reports this honestly (native Android schedules a real daily 8:00 reminder).
- The 25 restored food-services lessons are new content matching the frozen manifest counts (the original files were never in the repository to restore verbatim).
