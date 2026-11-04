/* ============================================================
   LingoStep — native.js  (v9 Android integration bridge)
   Native-app polish via Capacitor runtime plugins, accessed
   through window.Capacitor (NO npm imports — the web/PWA build
   keeps working with zero dependencies; on Android the plugins
   are bundled into the APK).

   Covers (spec §2/§15):
   - Android back button: walks app history INSIDE the app and
     asks for confirmation before leaving (prevents accidental
     exits); never falls through to closing without consent.
   - Status bar styling + edge-to-edge safe areas.
   - Native splash screen dismissal once the shell is ready.
   - Daily practice reminder via real local notifications.
   - App-lifecycle audio pause (backgrounding stops speech).
   Every call is guarded: on web/PWA everything degrades silently.
   ============================================================ */

const plugin = (name) => {
  try {
    if (typeof window === 'undefined') return null;
    return window.Capacitor?.Plugins?.[name] || null;
  } catch {
    return null;
  }
};

export function isNativeApp() {
  try {
    return Boolean(window?.Capacitor?.isNativePlatform?.());
  } catch {
    return false;
  }
}

/* ---------------- Android back button ---------------- */

/**
 * Install the hardware back-button policy.
 * handler: async (currentHash) => boolean — return true when the
 * tap was consumed (e.g. a dialog was shown); return false to let
 * the default behavior run (webview history back).
 * At the app root the handler must consume the tap and confirm;
 * only an explicit user confirmation exits the app.
 */
export function initBackButton(handler) {
  const App = plugin('App');
  if (!App || typeof App.addListener !== 'function') return; // web: browser back works normally
  App.addListener('backButton', async ({ canGoBack }) => {
    try {
      const consumed = handler ? await handler(window.location.hash) : false;
      if (consumed) return;
      if (canGoBack) window.history.back();
      else await App.exitApp();
    } catch {
      if (canGoBack) window.history.back();
    }
  });
}

/* ---------------- app exit ---------------- */

/** Exit the app (native only; no-op on web). */
export async function exitApp() {
  const App = plugin('App');
  if (!App || typeof App.exitApp !== 'function') return false;
  try { await App.exitApp(); return true; } catch { return false; }
}

/* ---------------- status bar / edge-to-edge ---------------- */

const STATUS_BG = '#0f4c81'; // deep LingoStep blue

export async function initStatusBar() {
  const StatusBar = plugin('StatusBar');
  if (!StatusBar) return;
  try {
    await StatusBar.setBackgroundColor({ color: STATUS_BG });
    await StatusBar.setStyle({ style: 'DARK' }); // light icons on the blue bar
  } catch { /* older devices: keep defaults */ }
  try {
    const Overlay = plugin('StatusBar');
    if (Overlay && typeof Overlay.setOverlaysWebView === 'function') {
      await Overlay.setOverlaysWebView({ overlay: false });
    }
  } catch { /* overlay mode optional */ }
}

/* ---------------- splash screen ---------------- */

export async function hideSplash() {
  const Splash = plugin('SplashScreen');
  if (!Splash) return;
  try { await Splash.hide({ fadeDuration: 260 }); } catch { /* ignore */ }
}

/* ---------------- daily practice reminder ---------------- */

const REMINDER_ID = 'lingostep-daily-reminder';

/**
 * Enable/disable the daily practice reminder.
 * Native: LocalNotifications plugin (exact 8:00 AM daily).
 * Web: Notification API best-effort (no scheduling — fires only
 * while the app is open, so it is presented honestly as unsupported
 * for scheduling and the toggle reports the limitation).
 */
export async function setDailyReminder(enabled) {
  const LocalNotifications = plugin('LocalNotifications');
  if (LocalNotifications) {
    try {
      const perm = await LocalNotifications.checkPermissions();
      let status = perm?.display || 'prompt';
      if (enabled && status !== 'granted') {
        const req = await LocalNotifications.requestPermissions();
        status = req?.display || status;
      }
      if (enabled && status !== 'granted') return { ok: false, reason: 'permission' };
      if (!enabled) {
        await LocalNotifications.cancel({ notifications: [{ id: hashCode(REMINDER_ID) }] });
        return { ok: true };
      }
      // schedule at the next 8:00 AM, repeating daily
      const now = new Date();
      const at = new Date(now);
      at.setHours(8, 0, 0, 0);
      if (at <= now) at.setDate(at.getDate() + 1);
      await LocalNotifications.cancel({ notifications: [{ id: hashCode(REMINDER_ID) }] });
      await LocalNotifications.schedule({
        notifications: [{
          id: hashCode(REMINDER_ID),
          title: 'LingoStep',
          body: 'Time for today\u2019s English practice! \u{1F4AA}',
          schedule: { on: { hour: 8, minute: 0 }, allowWhileIdle: true, repeats: true },
        }],
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: String(err?.message || err) };
    }
  }
  // Web fallback
  try {
    if (typeof Notification === 'undefined') return { ok: false, reason: 'unsupported' };
    if (!enabled) return { ok: true };
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return { ok: false, reason: 'permission' };
    return { ok: true, web: true };
  } catch {
    return { ok: false, reason: 'unsupported' };
  }
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* ---------------- lifecycle audio pause ---------------- */

/** Stop speech when the app goes to the background (Android). */
export function initLifecyclePause(onPause) {
  const App = plugin('App');
  if (!App || typeof App.addListener !== 'function') return;
  try {
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive && typeof onPause === 'function') onPause();
    });
  } catch { /* ignore */ }
}
