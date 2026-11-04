/* ============================================================
   LingoStep — storage.js
   Key/value persistence with three backends chosen automatically:
     1. IndexedDB  (browser, preferred)
     2. localStorage (browser fallback)
     3. in-memory   (tests / non-browser)
   All values are JSON-serializable. All methods return Promises.
   ============================================================ */

const DB_NAME = 'lingostep-db';
const DB_VERSION = 1;
const LS_PREFIX = 'lingostep:kv:';

let backendPromise = null;

/* ---------- IndexedDB backend ---------- */

function openIdb() {
  return new Promise((resolve, reject) => {
    let req;
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (err) {
      reject(err);
      return;
    }
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
    req.onblocked = () => reject(new Error('IndexedDB blocked'));
  });
}

function idbTx(db, mode, fn) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('kv', mode);
    const store = tx.objectStore('kv');
    let result;
    try {
      result = fn(store);
    } catch (err) {
      reject(err);
      return;
    }
    tx.oncomplete = () => resolve(result && typeof result.then === 'function' ? undefined : result);
    tx.onerror = () => reject(tx.error || new Error('IndexedDB tx failed'));
    tx.onabort = () => reject(tx.error || new Error('IndexedDB tx aborted'));
    // support request-based results
    if (result && typeof result.addEventListener === 'function') {
      result.onsuccess = () => resolve(result.result);
      result.onerror = () => reject(result.error);
    }
  });
}

const idbBackend = {
  name: 'indexeddb',
  async get(key) {
    const db = await openIdb();
    return idbTx(db, 'readonly', (store) => store.get(key));
  },
  async set(key, value) {
    const db = await openIdb();
    return idbTx(db, 'readwrite', (store) => store.put(value, key));
  },
  async del(key) {
    const db = await openIdb();
    return idbTx(db, 'readwrite', (store) => store.delete(key));
  },
  async keys() {
    const db = await openIdb();
    return idbTx(db, 'readonly', (store) => store.getAllKeys());
  },
  async clear() {
    const db = await openIdb();
    return idbTx(db, 'readwrite', (store) => store.clear());
  },
};

/* ---------- localStorage backend ---------- */

function lsRead(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw == null ? undefined : JSON.parse(raw);
  } catch { return undefined; }
}

function lsWrite(key, value) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

const lsBackend = {
  name: 'localstorage',
  async get(key) { return lsRead(key); },
  async set(key, value) { lsWrite(key, value); },
  async del(key) {
    try { localStorage.removeItem(LS_PREFIX + key); } catch { /* ignore */ }
  },
  async keys() {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(LS_PREFIX)) out.push(k.slice(LS_PREFIX.length));
      }
    } catch { /* ignore */ }
    return out;
  },
  async clear() {
    try {
      const ks = await this.keys();
      ks.forEach((k) => localStorage.removeItem(LS_PREFIX + k));
    } catch { /* ignore */ }
  },
};

/* ---------- memory backend ---------- */

const memStore = new Map();
const memBackend = {
  name: 'memory',
  async get(key) { return memStore.has(key) ? memStore.get(key) : undefined; },
  async set(key, value) { memStore.set(key, structuredCloneSafe(value)); },
  async del(key) { memStore.delete(key); },
  async keys() { return [...memStore.keys()]; },
  async clear() { memStore.clear(); },
};

function structuredCloneSafe(v) {
  try { return structuredClone(v); } catch { return JSON.parse(JSON.stringify(v)); }
}

/* ---------- backend selection ---------- */

function detectBackend() {
  if (typeof indexedDB !== 'undefined' && indexedDB && typeof indexedDB.open === 'function') {
    return idbBackend;
  }
  if (typeof localStorage !== 'undefined') {
    // verify it actually works (privacy mode can throw)
    try {
      localStorage.setItem('lingostep:test', '1');
      localStorage.removeItem('lingostep:test');
      return lsBackend;
    } catch { /* fall through */ }
  }
  return memBackend;
}

/** Get (and memoize) the active backend. Exposed for tests. */
export async function getBackend() {
  if (!backendPromise) {
    backendPromise = Promise.resolve(detectBackend());
  }
  return backendPromise;
}

/** Test hook: force a backend ('memory' etc.) and reset memoization. */
export function _setBackendForTests(name = 'memory') {
  backendPromise = Promise.resolve(name === 'memory' ? memBackend : detectBackend());
  return backendPromise;
}

/* ---------- public key/value API ---------- */

export async function kvGet(key, fallback = undefined) {
  try {
    const backend = await getBackend();
    const v = await backend.get(key);
    return v === undefined ? fallback : v;
  } catch (err) {
    console.warn('storage.get failed', key, err);
    return fallback;
  }
}

export async function kvSet(key, value) {
  try {
    const backend = await getBackend();
    await backend.set(key, value);
    return true;
  } catch (err) {
    console.warn('storage.set failed', key, err);
    return false;
  }
}

export async function kvDel(key) {
  const backend = await getBackend();
  return backend.del(key);
}

export async function kvKeys() {
  const backend = await getBackend();
  return backend.keys();
}

export async function kvClear() {
  const backend = await getBackend();
  return backend.clear();
}
