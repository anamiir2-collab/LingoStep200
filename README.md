# LingoStep

LingoStep is a complete English learning app for Arabic speakers: structured lessons organized by level, interactive exercises of all kinds, clear Arabic explanations for every word and sentence, listening and pronunciation practice with real everyday phrases, progress tracking, and a modern mobile-first design for phones, tablets and desktop.

**v9.0.0 — real Android app + premium smart learning engine:**

- **Installable Android APK** — a genuine Capacitor Android application (not a browser shortcut): native launcher icon, splash screen, status-bar styling, Android back-button protection, daily practice reminders and reliable native text-to-speech audio.
- **Zero keyboards anywhere** — the old built-in QWERTY pad is completely removed. Every exercise is answered by touch: letter tiles, word chips and option cards. The system keyboard can never appear during a lesson.
- **Smart first-letter hints** — the Hint button reveals only the first letter of the current incomplete word (in turquoise). Repeated presses never reveal the whole word, and never show the Arabic meaning or the answer.
- **Word-by-word locking** — a correctly completed word turns green and is locked for the whole attempt: it cannot be deleted, edited, replaced or moved. Incorrect words never lock.
- **No accidental erasing** — there is no clear-all button at all; backspace only ever touches the current word.
- **Restart needs confirmation** — restarting an exercise shows an explicit dialog; saved lesson progress is never lost.
- **Skipping requires an answer** — a skipped question earns no points and a different question from the same lesson must be answered before continuing.
- **Redesigned interface** — premium blue/turquoise design, floating bottom navigation, reorganized More hub (Learning / My Progress / App Settings / Help & Info), full Arabic RTL and English LTR support.

- 252 lessons across 11 sections (A1 → C1), 14,000+ practice sentences — every exercise, answer and achievement preserved
- Progress, streaks and XP stored locally (IndexedDB) with v2 backup/restore
- Run locally: `npm start` · Tests (17 suites): `npm test` · Content validation: `npm run validate:lessons`
- Build the web bundle: `npm run build` · Android: `npm run android:sync` then `npm run android:debug`

## Install the Android APK

1. Download `LingoStep-v9.0.0-debug.apk` (from the GitHub Actions artifacts of the **Android APK** workflow, or a GitHub Release).
2. On your phone, allow *Install unknown apps* for your browser or file manager.
3. Open the APK and install. LingoStep works offline after the lessons load once.

See `docs/ANDROID-APK.md` for build instructions and `docs/TRANSFORMATION-v9.md` for the complete change report.
