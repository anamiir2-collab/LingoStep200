# LingoStep v8 — Mobile App Guide

LingoStep 8.0.0 turns the existing web app into a professional, installable,
keyboard-free mobile learning experience — while preserving 100 % of the
original educational content (252 lessons, 14,035 exercises, 16,791 accepted
answers, 45 dialogues, all XP rules).

---

## 1. What changed in v8 (and what did NOT)

### Preserved (byte-identical, verified by tests)
- `lessons/**` — every lesson file (252 active in the manifest)
- `data/lesson-manifest.js`, `dialogues/**`
- `js/grading.js` (answer validation), `js/xp.js` (scoring formulas),
  `js/progress.js`, `js/storage.js` (IndexedDB schema & keys)
- The original sequential lesson-locking rule within each section
- All storage keys (`attempts`, `lessons`, `daily`, `meta`, `xp`, `review`,
  `vocabStats`, `dailyPlan`, `placementResult`, `lingostep:settings`) →
  existing students keep every point, streak and badge after updating.

### New
| Area | Detail |
|---|---|
| Keyboard-free answering | `js/touch-typing.js` — a built-in touch keyboard (no `<input>` element anywhere in lessons, so the Android/iOS system keyboard can never appear) |
| Dictation (listen-and-type) | Same letter-slot surface, now driven by touch keys A–Z + space + ⌫ (+ `'` and `-` only when the sentence needs them). Wrong letters are rejected with a shake/buzz exactly like before; desktop physical keyboards still work |
| Fill-blank | Letter tiles of the missing word (words for multi-word blanks). Tap to place, tap to remove. Same `checkAnswer` validation and accepted answers |
| Placement test fill-blank | Same letter tiles. (Bonus fix: the level-check screen itself had become unreachable in v7 and its UI strings were missing — both restored) |
| Dialogue dictation | Same touch keyboard, including the apostrophe key for "I'm / don't" |
| Bottom navigation | 5 tabs: Home · Sections · Vocabulary · Progress · More (dialogues, revision, achievements and level check stay one tap away from Home quick actions) |
| Achievements | New `#/achievements` screen — 24 badges computed from REAL progress only (lessons, streaks, XP, accuracy, dialogues, vocabulary, review). No stored state, nothing to migrate |
| Home dashboard | Continue-learning CTA, quick actions, achievements strip, stats tiles, daily goal |
| Design | Blue gradient system, rounded cards, ≥ 48 px touch targets, safe-area insets, dark theme parity, RTL/LTR parity (`css/mobile.css`) |
| PWA | New icon set (any + maskable + apple-touch), manifest v8, service worker `v8.0.0-mobile` with updated precache |
| Fixes | Goal ring capped at 100 %, "Seven sections" → "Eleven sections", placement i18n keys added |

### Tests
`npm test` runs **12 suites** (10 original + 2 new):
- `touch-typing-tests` — proves the touch input keeps the ORIGINAL validation policy
- `content-parity-tests` — compares the live curriculum against the frozen
  baseline `scripts/inventory-baseline.json`; any lost lesson/exercise/answer
  fails the build

---

## 2. Run locally

```bash
npm start            # serves on http://localhost:8080
```

## 3. Deploy to GitHub Pages (existing repository)

1. Copy the contents of this project into your repository root
   (`anamiir2-collab/LingoStep11`), keeping the same file layout
   (everything is relative-path safe).
2. Commit and push to `main`:
   ```bash
   git add -A
   git commit -m "LingoStep 8.0.0 — keyboard-free mobile transformation"
   git push origin main
   ```
   Or apply the shipped patch instead of copying files:
   ```bash
   git am lingostep-v8.0.0.patch   # created with git format-patch
   ```
3. GitHub Pages publishes automatically. Two equivalent options:
   - **Branch mode** (what the repository uses today): `Settings → Pages →
     Deploy from branch: main /root`. In that case you may delete
     `.github/workflows/deploy.yml` — it is only needed for the
     Actions-based deployment mode.
   - **Actions mode**: keep `deploy.yml` and switch `Settings → Pages →
     Source: GitHub Actions`.
4. Existing students: the service worker updates on the first visit after
   deployment (version bump forces cache replacement). Progress is untouched —
   nothing is reset.

## 4. Build the Android APK / AAB with Capacitor

Requirements: Node 18+, Android Studio (or just the Android SDK + Gradle),
Java 17.

```bash
# one-time setup
npm install -D @capacitor/cli @capacitor/core @capacitor/android
npx cap init          # already configured: appId com.anamiir2collab.lingostep
npx cap add android

# every build
npx cap sync android
npx cap open android  # then Build ▸ Generate Signed Bundle / APK
# or on the CLI:
cd android && ./gradlew assembleRelease   # APK
cd android && ./gradlew bundleRelease     # AAB for Google Play
```

Notes:
- `capacitor.config.json` already points `webDir` to the repository root and
  uses the `https` scheme so IndexedDB and the service worker work inside the
  WebView.
- The app is fully offline after the first run; the "Prepare offline" button
  in More ▸ App pre-caches every lesson.
- Icons: `npx @capacitor/assets generate --iconBackgroundColor '#1e88e5'`
  using `icons/icon-512.png` (or copy `icons/` into
  `android/app/src/main/res/` per density).

## 5. Build for iOS with Capacitor

```bash
npm install -D @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios      # Xcode ▸ Product ▸ Archive → App Store Connect
```
`apple-touch-icon.png` (180×180) is included for the home-screen icon;
Xcode's asset catalog can be generated from `icons/icon-512.png`.

## 6. Keyboard-free guarantee — how it works

The system keyboard on Android/iOS only appears when a real text field
(`<input>`, `<textarea>`, `contenteditable`) receives focus. LingoStep v8
contains **no text fields anywhere in the learning flow**:

| Flow | v7 (before) | v8 (now) |
|---|---|---|
| Listen & type | real `<input>` + letter slots (keyboard opened on focus) | letter slots + built-in touch keyboard, value kept in a JS string |
| Fill the blank | real `<input>` | letter/word tiles |
| Word order | tap chips (already touch) | unchanged |
| Multiple choice | tap cards (already touch) | unchanged |
| Level check fill-blank | real `<input>` | letter tiles |
| Dialogue dictation | real `<input>` | built-in touch keyboard |

Search fields, the profile name and settings still use standard inputs —
these are user-initiated, not part of lessons, exactly as the requirements
allow ("no system keyboard during lessons, exercises and quizzes").

## 7. Data protection & migration

- No storage schema changed → no migration needed, nothing reset.
- `settings.onScreenKeyboard` still exists in stored settings for backward
  compatibility (it is simply no longer needed — the touch keyboard is
  always available).
- Backup/restore (More ▸ Backup) still exports/imports the full v2 backup
  (progress + XP + review + vocabulary + level check + daily plan).

## 8. Verification checklist (executed)

- [x] 252 lessons present in manifest ↔ files (`npm run validate`)
- [x] 14,035 exercises / 16,791 accepted answers / 3,022 vocabulary —
      identical to pre-transformation baseline (`tests/content-parity-tests`)
- [x] Full lesson (55 exercises) completed touch-only in the browser with
      XP, confetti, duo-sheet feedback and lesson summary (96 %, +550 XP)
- [x] Placement test completed; result saved; recommended lessons shown
- [x] Dialogue dictation completes with the touch keyboard (apostrophe key
      appears for "I'm")
- [x] Arabic RTL + English LTR layouts, keyboard stays LTR QWERTY
- [x] 360 px small-phone viewport: no horizontal overflow
- [x] Sequential lesson locking preserved
- [x] `npm test` → 12/12 suites pass; `npm run validate:lessons` → PASSED
