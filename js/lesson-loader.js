/* ============================================================
   LingoStep — lesson-loader.js
   Loads one lesson at a time via dynamic ES module import.

   GitHub-Pages-safe: all URLs are resolved relative to this
   module's own location (js/), so the app works under
   https://USER.github.io/REPO/ as well as at domain root.

   - imports only the requested lesson file
   - validates structure before rendering
   - caches loaded modules
   - never loads all lessons at startup
   Node-importable for tests (import only; no top-level DOM).
   ============================================================ */

import { lessonManifest } from '../data/lesson-manifest.js';
import { validateLessonStructure } from './lesson-schema.js';

const moduleCache = new Map();

/** Resolve a repo-root-relative path to an absolute URL (browser) or file URL (Node). */
export function resolveAssetUrl(repoRelativePath) {
  // this file lives at <repoRoot>/js/lesson-loader.js
  const base = new URL('../', import.meta.url);
  return new URL(repoRelativePath, base).href;
}

export function getManifest() {
  return lessonManifest;
}

export function getManifestEntry(lessonId) {
  return lessonManifest.find((l) => l.id === lessonId) || null;
}

export function getManifestBySection(sectionId) {
  return lessonManifest.filter((l) => l.section === sectionId);
}

export function getSectionStats(sectionId, lessonStates = {}) {
  const list = getManifestBySection(sectionId);
  const done = list.filter((l) => lessonStates[l.id]?.completed).length;
  return { total: list.length, done };
}

/**
 * Load and validate a single lesson module by id.
 * Throws Error with a friendly message on failure.
 */
export async function loadLesson(lessonId) {
  if (!lessonId || typeof lessonId !== 'string') {
    throw new Error('No lesson id given.');
  }
  if (moduleCache.has(lessonId)) {
    return moduleCache.get(lessonId);
  }

  const entry = getManifestEntry(lessonId);
  if (!entry) {
    throw new Error(`Lesson "${lessonId}" is not registered in the manifest.`);
  }
  if (entry.available === false) {
    throw new Error(`Lesson "${lessonId}" is not available yet.`);
  }

  const url = resolveAssetUrl(entry.path);
  let mod;
  try {
    mod = await import(/* @vite-ignore */ url);
  } catch (err) {
    throw new Error(`Could not load the lesson file (${entry.path}). ${err && err.message ? err.message : ''}`);
  }

  const lesson = mod && mod.default ? mod.default : mod;
  const errors = validateLessonStructure(lesson, lessonId);
  if (errors.length) {
    throw new Error(`Lesson "${lessonId}" has invalid content: ${errors.slice(0, 4).join(' | ')}`);
  }

  moduleCache.set(lessonId, lesson);
  return lesson;
}

/** Next lesson id in the same section (for "Next lesson" button). */
export function nextLessonInSection(lessonId) {
  const entry = getManifestEntry(lessonId);
  if (!entry) return null;
  const list = getManifestBySection(entry.section);
  const idx = list.findIndex((l) => l.id === lessonId);
  return idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null;
}
