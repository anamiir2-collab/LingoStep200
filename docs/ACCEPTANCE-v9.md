# LingoStep v9.0.0 — Acceptance Verification Matrix

**Date:** 2026-11-04 · **Scope:** the 21 final acceptance criteria from the transformation
specification, each mapped to concrete, re-runnable evidence. Nothing below is claimed
"done" without an artifact you can check yourself.

**Overall result: 21 / 21 PASS.**

| # | Criterion | Evidence (re-runnable) | Result |
|---|---|---|---|
| 1 | All original teaching content preserved — no lesson, question, answer, exercise type or scoring rule removed or rewritten | `node tests/content-parity-tests.js` → 252 lessons / 14,035 exercises / 16,791 answers / 3,022 vocab, **identical to the frozen pre-transformation baseline**; `tests/lesson-tests.js` → zero cross-lesson duplicates | ✅ |
| 2 | User progress & storage preserved — IndexedDB/localStorage schemas unchanged, safe upgrade, backup & restore real | `tests/storage-tests.js`, `tests/backup-tests.js` (v2 round-trips xp/review/vocab/placement/plan; v1 still imports); `sw.js` cache bump `v9.0.0-android` only precaches/drops modules | ✅ |
| 3 | Installable **debug APK** verified | `download/LingoStep-v9.0.0-debug.apk` (6.8 MB) — Capacitor shell inspected: `assets/public` with 375 lesson modules, no `keyboard.js`; reproducible via `.github/workflows/android.yml` | ✅ |
| 4 | **Release APK** produced (unsigned **by design** — no keystore in repo) | `download/LingoStep-v9.0.0-release-unsigned.apk` (5.4 MB); signing documented in `docs/TRANSFORMATION-v9.md` §12 | ✅ |
| 5 | CI/CD builds and uploads both APKs automatically | `.github/workflows/android.yml`: validation gate → 17 test suites → `npm run build` → `cap sync` → `assembleDebug` + `assembleRelease` → artifact upload + GitHub Release on main | ✅ |
| 6 | Professional launcher icon, adaptive, all densities | `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` + PNG densities; source art `assets/icon-only.png` | ✅ |
| 7 | Native splash screen, all orientations/densities | `res/drawable-{land,port}-*/splash.png` (12 variants); hidden via `js/native.js` once shell is interactive | ✅ |
| 8 | Status bar / safe-area handled | `js/native.js:initStatusBar()` (brand color, light icons, overlay); `env(safe-area-inset-*)` in CSS layers | ✅ |
| 9 | Android back button can never exit accidentally | `js/native.js:49` `App.addListener('backButton')` — confirmation dialog at app root, history back otherwise | ✅ |
| 10 | Offline support | `sw.js` precaches shell + all lesson modules; More → "Prepare offline" primes the full cache; app fully usable with airplane mode | ✅ |
| 11 | Built-in QWERTY keyboard **completely removed** | `js/keyboard.js`, `js/listening-writing-enhancements.js`, `js/speech.next.js` deleted; `scripts/build-www.js` fails the build if any reappears; zero on-screen keyboard UI | ✅ |
| 12 | Touch-only exercises preserve all original question types & scoring | `js/lesson-engine.js` renders every original type via tiles/cards; `tests/touch-typing-tests.js` — "touch input preserves the original validation policy"; XP ledger untouched (`tests/xp-tests.js`) | ✅ |
| 13 | System keyboard can never appear in an exercise | No `<input>`/textarea is created anywhere in the exercise flow (verified by grep + code inspection — only search/goal/file/profile inputs outside exercises) | ✅ |
| 14 | Hint = **first letter of the current incomplete word only**, capped at ½ the word, never the meaning/full word/sentence | `tests/exercise-state-tests.js` + `tests/hints-tests.js` (no-leak assertions, cap assertions, one-letter words never hinted) | ✅ |
| 15 | Correct words **permanently locked** (green, frozen); incorrect never locks | `js/exercise-state.js` state model `empty/active/incorrect/locked/complete`; `tests/exercise-state-tests.js` covers lock immutability, backspace protection, wrong-chip removal | ✅ |
| 16 | No "clear all" anywhere; Restart/Exit require explicit confirmation; saved progress untouched by restart | No clear-all control in any exercise UI (double-confirmed wipe exists only under Settings → data); custom `confirmDialog` modals for Restart/Exit in `js/lesson-engine.js` — no `window.confirm` | ✅ |
| 17 | Skip **always** substitutes an answerable alternative from the same lesson, blocked when exhausted, earns zero XP | `pickAlternativeQuestion` chaining; `tests/exercise-state-tests.js` — "skip-alternatives verified"; skipped originals tracked separately in summary | ✅ |
| 18 | UI redesign: blue→turquoise, rounded cards, mobile-first, Arabic RTL + English LTR | `css/premium.css` (RTL-aware throughout); `tests/dialogues-tests.js` — 49 i18n keys en/ar parity; RTL verified visually in Chromium | ✅ |
| 19 | Bottom navigation 5 tabs; More hub in 4 categories, every row real | `js/app.js` `.mobile-bottom-nav` → Home/Sections/Vocabulary/Progress/More; More → Learning / My Progress / Application Settings / Help & Information with real screens `#/audio`, `#/help`, `#/faq`, `#/history` | ✅ |
| 20 | Audio: native Android TTS preferred, play/pause/replay/speed, existing recordings kept | `js/audio-upgrade/native.js` (Capacitor TTS first, Web Speech fallback); playback controls in exercise audio row + `#/audio` page; all bundled recordings untouched | ✅ |
| 21 | Test gate green; no credentials committed; no test deleted to force a build | `node tests/run-all.js` → **17/17 suites PASS** (incl. 1 new suite, 4 re-registered orphan suites, 0 deleted); repo contains no keystore/signing material | ✅ |

## How to re-verify locally

```bash
node scripts/validate-project.js   # content & structure gate
node tests/run-all.js              # 17/17 suites
npm run build                      # web bundle → www/ (fails if QWERTY returns)
cd android && ./gradlew assembleDebug assembleRelease
```
