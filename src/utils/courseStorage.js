export const DEFAULT_COURSE_ID = "physics";
export const COURSE_SELECTION_KEY = "selectedCourse:v1";

let activeCourseId = DEFAULT_COURSE_ID;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getActiveCourseId() {
  return activeCourseId || DEFAULT_COURSE_ID;
}

export function setActiveCourseId(courseId = DEFAULT_COURSE_ID) {
  activeCourseId = courseId || DEFAULT_COURSE_ID;
}

export function loadSelectedCourseId() {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem(COURSE_SELECTION_KEY) || "";
}

export function saveSelectedCourseId(courseId) {
  if (!canUseStorage()) return;
  if (!courseId) {
    window.localStorage.removeItem(COURSE_SELECTION_KEY);
    return;
  }
  window.localStorage.setItem(COURSE_SELECTION_KEY, courseId);
}

export function courseScopedKey(prefix, courseId = getActiveCourseId()) {
  return `${prefix}:${courseId || DEFAULT_COURSE_ID}`;
}

export function migrateLegacyKey(legacyKey, nextKey, courseId = getActiveCourseId()) {
  if (!canUseStorage() || courseId !== DEFAULT_COURSE_ID) return;
  const existing = window.localStorage.getItem(nextKey);
  const legacy = window.localStorage.getItem(legacyKey);
  if (!existing && legacy) {
    window.localStorage.setItem(nextKey, legacy);
  }
}
