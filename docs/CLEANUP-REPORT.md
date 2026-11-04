# LingoStep11 — Cleanup & Mobile Optimization Report

**Date:** 2026-10-29 · **Scope:** repository cleanup, feature restoration, mobile-first optimization
**Rule honored:** *Clean the repository, not the application.* Every removal below was
dependency-traced first; nothing referenced by the running app was deleted.

---

## 1. Files retained (purpose)

| Area | Files | Purpose |
|---|---|---|
| App shell | `index.html`, `manifest.json`, `sw.js` | Entry point, PWA manifest, service worker (v6.1.0-audio) |
| Styles | `css/style.css`, `themes.css`, `responsive.css`, `ios-duo.css`, `dialogues.css`, `audio.css` | Base design, theme tokens, narrow-screen rules, iOS design layer, dialogue styles, audio panel styles |
| Core JS (25) | `js/app.js`, `router.js`, `utils.js`, `i18n.js`, `settings.js`, `storage.js`, `lesson-schema.js`, `lesson-loader.js`, `lesson-engine.js`, `grading.js`, `letter-track.js`, `keyboard.js`, `listening-writing-enhancements.js`, `feedback-fx.js`, `progress.js`, `review.js`, `xp.js`, `speech.js`, `dialogues.js`, `book-dialogues.js`, `vocabulary.js`, `word-cards.js`, `motivation.js`, `icons.js`, `icon-config.js` | Every active module, unchanged roles |
| Audio system | `js/audio-upgrade/core.js`, `ui.js`, `boot.js`, `speech.next.js` + `css/audio.css` + `scripts/apply-audio-upgrade.js` | Section 20 engine, settings panel, bootstrap, migration source and idempotent migration tool (**now activated**) |
| Content | `data/lesson-manifest.js` (252 lessons), `data/motivational-messages.js` (57), `lessons/**` (375 files), `dialogues/**` (45 files) | Full curriculum, all practice content, all dialogues |
| Assets | `assets/icons/*` (10), `icons/*` (5) | SVG sprite, colored shortcut PNGs, PWA icons |
| Tools | `scripts/serve.js`, `validate-project.js`, `validate-lessons.js`, `detect-duplicates.js`, `gen_icons.py`, `make-icons.py` | Dev server, CI validation gates, icon generators |
| Tests | `tests/run-all.js` + 14 suites | 10 suites run in CI; 4 suites cover dormant modules |
| Docs | `README.md`, `LICENSE`, `AUDIT.md`, `IMPLEMENTATION_STATUS.md`, `docs/*`, `capacitor.config.json` | Instructions, license, prior-audit records, Android APK guide (capacitor config is referenced by it) |
| Config | `package.json` (rewritten, honest), `.gitignore`, `.github/workflows/deploy.yml` + `validate.yml` | npm scripts only; CI deploy + PR validation |

## 2. Files removed (verified safe)

| Removed | Why it was safe |
|---|---|
| `src/` (79 files), `public/` (8), `prisma/`, `bun.lock`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json` | A parallel Next.js/Tailwind/Prisma rebuild scaffold. Never referenced by `index.html`, `sw.js`, or any workflow; GitHub Pages serves the static app; `docs/AUDIO_REPORT.md` records it was authored in a separate environment when the repo was unavailable. No workflow installs dependencies or builds. |
| `lingostep11-updated.zip` (3.9 MB) | Source archive fully extracted; byte-level diff against the repo showed all unique content already integrated (its newer `speech.js`/`app.js`/`sw.js` audio wiring is now applied; its CSS was older than the repo's). |
| `.github/workflows/extract-lingostep-zip.yml` | One-shot ZIP importer that already served its purpose; a re-run would restore the removed artifacts. `deploy.yml`/`validate.yml` untouched. |
| `scripts/content/**` (34), `build-lesson001.js`, `build-work-lessons.js`, `fix-arabic.js`, `fix-repetition.js`, `check-repetition.js`, `repetition-bank.js`, `phrase-pairs.js`, `content-audit.js`, `apply-audio-upgrade`-era reports (`content-audit-report.json`, `content-report.json`), `duplicates-report.json` | One-shot content pipeline: its output (`lessons/`, `data/`) is committed; neither the validator, the tests, nor the app import them (`duplicates-report.json` is regenerated on every `detect-duplicates` run). |
| `CHANGES.txt`, `CHANGES-v1.4.txt` | Stale development logs describing a workflow (`sync-lingostep-zip.yml`) that never existed in the repo. |

**Deliberately kept despite being unreferenced** (conservation over deletion):
`js/hints.js`, `js/placement.js`, `js/placement-view.js`, `js/daily-plan.js` + their 4 test
suites — complete, unit-tested deliverables of a prior audit whose navigation wiring was
lost in a partial ZIP import; dormant at runtime, zero cost. Also kept: **123 lesson files
in 7 folders not listed in the manifest** (`basics/`, `conversations/`, `grammar/`,
`listening-writing/`, `practical-scenarios/`, `tenses/`, `vocabulary/`) — protected
content, unreachable until added to the manifest, preserved for the owner.

## 3. Features restored (not removed — recovered)

- **Section 20 audio system activated** via the repo's own idempotent
  `scripts/apply-audio-upgrade.js`: US/UK accent selection with per-accent remembered
  voice, best-available voice fallback chain, playback speed presets, volume, auto-repeat
  (1–3×), pause/resume/replay/stop, sequence playback, speaking practice (shadowing with
  local recording + optional speech recognition, honestly labeled), voice diagnostics —
  all behind the same `speech.js` public API, so every existing call site gains the
  features with zero changes. `sw.js` bumped to `v6.1.0-audio` and now precaches the
  audio modules + `css/audio.css`.
- **CI deploy gate repaired.** Deployment was silently broken (3/10 suites failed, so
  `deploy.yml` could not publish). Root cause: `grading.js` and `letter-track.js`
  regressed from the documented contract (README: *apostrophes inside contractions stay
  required*). Both now keep word-internal apostrophes required while quote-like ones stay
  optional. Suite results: **10/10**.

## 4. Mobile improvements (verified in Chromium at 320/360/390/430 px)

- Audio segmented controls stay on one line at ≤400 px (graceful wrap below).
- `loadVoices()` no longer double-polls → audio panel opens instantly after first scan.
- Verified: no horizontal overflow on any screen at any tested width; letter-track, word
  order, on-screen keyboard, dialogue bubbles, stats, and the new audio panel all render
  without clipping; honest speech-unavailable toast when a device has no voices; safe-area
  insets respected (already present, retained); `prefers-reduced-motion` honored in all
  five stylesheets; Arabic RTL mirroring verified end-to-end.

## 5. Design

Light theme tokens moved to the pastel learning palette (bg `#F8F7FB`, text `#24232B`,
teal interactive `#2F8277` — 4.6:1 with white text, lavender `#DCC9EE`, pale mint
`#D6EAE5`, pastel yellow `#FFE5A0`, lavender-tinted shadows, lavender→mint hero
gradient). Functional green/orange/red states and the dark theme were deliberately left
untouched. `meta theme-color` and manifest colors follow the palette.

## 6. Tests performed

| Check | Result |
|---|---|
| `node scripts/validate-project.js` (CI gate) | PASSED |
| `node tests/run-all.js` (10 suites) | 10/10 PASSED |
| `node --check` on every app/lesson/dialogue JS file | all OK |
| `manifest.json`, `package.json` JSON validity | OK |
| Browser: home, sections, lesson player (answer → correct feedback, +10 XP), dialogues, vocabulary, review, More + audio panel | rendered, no console errors |
| Progress persistence across reload | verified (daily count survived) |
| Arabic RTL switch | verified |
| Service worker `v6.1.0-audio` registered; shell cache 99 entries incl. audio files | verified |
| Offline reload + lesson playback | verified |
| Horizontal overflow at 320/360/390/430 px | none |

Not testable in this environment (stated honestly): real device audio output (headless
Chromium has no system voices), actual Android installation, speech recognition with a
real microphone. Code paths degrade gracefully and were exercised to their fallbacks.

## 7. Known remaining items

1. 123 manifest-orphan lesson files (kept; owner decision whether to publish them via the
   manifest).
2. Dormant modules (`hints`, `placement`, `daily-plan`) need wiring into `app.js` routing
   to become visible.
3. The ~40 similar-sentence pairs in `detect-duplicates` output remain for human review.
4. `scripts/serve.js` serves `text/javascript` for `.mjs` — fine for the current app.
