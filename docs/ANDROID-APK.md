# Building the LingoStep Android APK (Capacitor 8)

LingoStep ships with a complete `android/` project. The GitHub Actions
workflow **Android APK** (`.github/workflows/android.yml`) builds both APKs on
every push to `main` and uploads them as downloadable artifacts (and publishes
a Release on main). You can also build locally:

## Prerequisites

- Node.js ≥ 18
- JDK 21 (Temurin recommended)
- Android SDK: platform 36 + build-tools 36 (or Android Studio)

## Local build

```bash
npm install                 # installs Capacitor 8 + plugins
npm run build               # web bundle → www/ (explicit allow-list, fails if keyboard.js reappears)
npx cap sync android        # copy www/ + plugin manifests into android/
cd android
./gradlew assembleDebug     # → app/build/outputs/apk/debug/app-debug.apk  (installable)
./gradlew assembleRelease   # → app-release-unsigned.apk (needs your keystore to publish)
```

On Linux without Android Studio:

```bash
export ANDROID_HOME=~/android-sdk          # cmdline-tools + platforms;android-36 + build-tools;36.0.0
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
```

## Regenerate launcher icons / splash

Source art lives in `assets/icon-only.png` (1024×1024) and `assets/splash.png`
(2732×2732). After editing them:

```bash
npx capacitor-assets generate --android \
  --iconBackgroundColor '#0f4c81' --splashBackgroundColor '#0f4c81' \
  --iconBackgroundColorDark '#0f4c81' --splashBackgroundColorDark '#0f4c81'
```

## Signing the release APK (optional)

```bash
keytool -genkey -v -keystore lingostep.keystore -alias lingostep -keyalg RSA -keysize 2048 -validity 10000
cd android && ./gradlew assembleRelease
# sign + align with apksigner/zipalign as usual — never commit the keystore.
```

## What is inside

- `appId` `com.anamiir2collab.lingostep`, `versionName 9.0.0`, minSdk 24, targetSdk 36
- Permissions: `INTERNET` + notification permissions for the daily reminder
- Native plugins: App (back button/lifecycle), StatusBar, LocalNotifications, community TextToSpeech (reliable audio in the WebView)
- The web assets under `android/app/src/main/assets/public/` come from `www/` — never edit them directly; run `npm run build && npx cap sync android` instead.
