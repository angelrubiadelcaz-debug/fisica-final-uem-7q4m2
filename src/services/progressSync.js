import { supabase } from "../lib/supabaseClient";
import { courseScopedKey, DEFAULT_COURSE_ID, getActiveCourseId } from "../utils/courseStorage";
import { initialProgress, LEGACY_STORAGE_KEY, STORAGE_PREFIX } from "../utils/storage";
import { initialStudyProgress, LEGACY_STUDY_KEY, normalizeStudyProgress, STUDY_PREFIX } from "../utils/studyStorage";
import { initialTutorProgress, LEGACY_TUTOR_KEY, TUTOR_PREFIX } from "../utils/tutorStorage";

const SYNC_META_KEY = "fisica-sync-meta-v1";
const KNOWN_COURSE_IDS = ["physics", "poo"];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readSyncMeta() {
  return readJson(SYNC_META_KEY, { updatedAt: "" });
}

function writeSyncMeta(meta) {
  writeJson(SYNC_META_KEY, { ...readSyncMeta(), ...meta });
}

function readCourseJson(prefix, fallback, courseId, legacyKey = "") {
  const key = courseScopedKey(prefix, courseId);
  if (courseId === DEFAULT_COURSE_ID && legacyKey) {
    const current = canUseStorage() ? window.localStorage.getItem(key) : null;
    const legacy = canUseStorage() ? window.localStorage.getItem(legacyKey) : null;
    if (!current && legacy) {
      try {
        writeJson(key, JSON.parse(legacy));
      } catch {
        // If an old browser value is corrupt, ignore it instead of blocking sync.
      }
    }
  }
  return readJson(key, fallback);
}

function writeCourseJson(prefix, value, courseId) {
  writeJson(courseScopedKey(prefix, courseId), value);
}

function getCourseState(courseId) {
  return {
    testProgress: readCourseJson(STORAGE_PREFIX, initialProgress, courseId, LEGACY_STORAGE_KEY),
    studyProgress: readCourseJson(STUDY_PREFIX, initialStudyProgress, courseId, LEGACY_STUDY_KEY),
    tutorProgress: readCourseJson(TUTOR_PREFIX, initialTutorProgress, courseId, LEGACY_TUTOR_KEY),
  };
}

function normalizeStateCourses(state = {}) {
  const courses = { ...(state.courses || {}) };
  if (state.testProgress || state.studyProgress || state.tutorProgress) {
    courses[DEFAULT_COURSE_ID] = {
      ...(courses[DEFAULT_COURSE_ID] || {}),
      testProgress: state.testProgress,
      studyProgress: state.studyProgress,
      tutorProgress: state.tutorProgress,
    };
  }
  return courses;
}

function mergeNumber(a = 0, b = 0) {
  return Math.max(Number(a) || 0, Number(b) || 0);
}

function mergeCountMap(localMap = {}, remoteMap = {}) {
  const merged = { ...remoteMap };
  Object.entries(localMap).forEach(([key, value]) => {
    merged[key] = mergeNumber(value, merged[key]);
  });
  return merged;
}

function mergeHistory(localHistory = [], remoteHistory = []) {
  const byDate = new Map();
  [...remoteHistory, ...localHistory].forEach((item) => {
    if (!item?.date) return;
    byDate.set(item.date, item);
  });
  return [...byDate.values()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);
}

function mergeTestProgress(local = initialProgress, remote = initialProgress) {
  return {
    ...initialProgress,
    ...remote,
    ...local,
    attempts: mergeNumber(local.attempts, remote.attempts),
    answered: mergeNumber(local.answered, remote.answered),
    correct: mergeNumber(local.correct, remote.correct),
    wrong: mergeNumber(local.wrong, remote.wrong),
    failedIds: [...new Set([...(remote.failedIds || []), ...(local.failedIds || [])])],
    wrongByTopic: mergeCountMap(local.wrongByTopic, remote.wrongByTopic),
    wrongByDifficulty: mergeCountMap(local.wrongByDifficulty, remote.wrongByDifficulty),
    history: mergeHistory(local.history, remote.history),
  };
}

const cardStatusWeight = {
  "sin-marcar": 0,
  dominado: 1,
  dudoso: 2,
  repasar: 3,
};

function mergeCardState(local = {}, remote = {}) {
  const localStatus = local.status || "sin-marcar";
  const remoteStatus = remote.status || "sin-marcar";
  const status =
    cardStatusWeight[localStatus] >= cardStatusWeight[remoteStatus] ? localStatus : remoteStatus;
  const localDate = local.lastReviewed ? new Date(local.lastReviewed).getTime() : 0;
  const remoteDate = remote.lastReviewed ? new Date(remote.lastReviewed).getTime() : 0;

  return {
    status,
    lastReviewed: localDate >= remoteDate ? local.lastReviewed || remote.lastReviewed || "" : remote.lastReviewed || local.lastReviewed || "",
    timesReviewed: mergeNumber(local.timesReviewed, remote.timesReviewed),
  };
}

function mergeStudyProgress(local = initialStudyProgress, remote = initialStudyProgress) {
  const normalizedLocal = normalizeStudyProgress(local);
  const normalizedRemote = normalizeStudyProgress(remote);
  const cards = {};
  const ids = new Set([...Object.keys(normalizedRemote.cards || {}), ...Object.keys(normalizedLocal.cards || {})]);
  ids.forEach((cardId) => {
    cards[cardId] = mergeCardState(normalizedLocal.cards?.[cardId], normalizedRemote.cards?.[cardId]);
  });
  return { ...initialStudyProgress, ...normalizedRemote, ...normalizedLocal, cards };
}

function mergeDoubts(localDoubts = [], remoteDoubts = []) {
  const byKey = new Map();
  [...remoteDoubts, ...localDoubts].forEach((item) => {
    if (!item) return;
    byKey.set(item.id || `${item.date}-${item.message}`, item);
  });
  return [...byKey.values()]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 30);
}

function mergeTutorQuestions(localQuestions = [], remoteQuestions = []) {
  const byKey = new Map();
  [...remoteQuestions, ...localQuestions].forEach((item) => {
    if (!item) return;
    byKey.set(item.id || `${item.date}-${item.questionText}`, item);
  });
  return [...byKey.values()]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 40);
}

function mergeCardQuiz(localCards = {}, remoteCards = {}) {
  const merged = { ...remoteCards };
  Object.entries(localCards).forEach(([cardId, local]) => {
    const remote = merged[cardId] || {};
    const localDate = local.lastReviewed ? new Date(local.lastReviewed).getTime() : 0;
    const remoteDate = remote.lastReviewed ? new Date(remote.lastReviewed).getTime() : 0;
    merged[cardId] = {
      ...remote,
      ...local,
      attempts: mergeNumber(local.attempts, remote.attempts),
      dominado: mergeNumber(local.dominado, remote.dominado),
      dudoso: mergeNumber(local.dudoso, remote.dudoso),
      repasar: mergeNumber(local.repasar, remote.repasar),
      lastStatus: localDate >= remoteDate ? local.lastStatus || remote.lastStatus || "" : remote.lastStatus || local.lastStatus || "",
      lastAnswer: localDate >= remoteDate ? local.lastAnswer || remote.lastAnswer || "" : remote.lastAnswer || local.lastAnswer || "",
      lastReviewed: localDate >= remoteDate ? local.lastReviewed || remote.lastReviewed || "" : remote.lastReviewed || local.lastReviewed || "",
    };
  });
  return merged;
}

function mergeTutorProgress(local = initialTutorProgress, remote = initialTutorProgress) {
  return {
    ...initialTutorProgress,
    ...remote,
    ...local,
    doubts: mergeDoubts(local.doubts, remote.doubts),
    tutorQuestions: mergeTutorQuestions(local.tutorQuestions, remote.tutorQuestions),
    topicCounts: mergeCountMap(local.topicCounts, remote.topicCounts),
    cardQuiz: mergeCardQuiz(local.cardQuiz, remote.cardQuiz),
  };
}

export function getLocalState() {
  const meta = readSyncMeta();
  const courses = {};
  KNOWN_COURSE_IDS.forEach((courseId) => {
    courses[courseId] = getCourseState(courseId);
  });
  const activeCourseId = getActiveCourseId();
  return {
    version: 2,
    activeCourseId,
    courses,
    testProgress: courses[activeCourseId]?.testProgress || initialProgress,
    studyProgress: courses[activeCourseId]?.studyProgress || initialStudyProgress,
    tutorProgress: courses[activeCourseId]?.tutorProgress || initialTutorProgress,
    updatedAt: meta.updatedAt || new Date().toISOString(),
  };
}

export function saveLocalState(state) {
  if (!canUseStorage()) return;
  const courses = normalizeStateCourses(state);
  const ids = new Set([...KNOWN_COURSE_IDS, ...Object.keys(courses)]);
  ids.forEach((courseId) => {
    const courseState = courses[courseId];
    if (!courseState) return;
    const currentStudyProgress = readCourseJson(STUDY_PREFIX, initialStudyProgress, courseId, LEGACY_STUDY_KEY);
    const nextStudyProgress = courseState.studyProgress
      ? mergeStudyProgress(courseState.studyProgress, currentStudyProgress)
      : currentStudyProgress;
    writeCourseJson(STORAGE_PREFIX, { ...initialProgress, ...(courseState.testProgress || {}) }, courseId);
    writeCourseJson(STUDY_PREFIX, normalizeStudyProgress(nextStudyProgress), courseId);
    writeCourseJson(TUTOR_PREFIX, { ...initialTutorProgress, ...(courseState.tutorProgress || {}) }, courseId);
  });
  writeSyncMeta({ updatedAt: state?.updatedAt || new Date().toISOString() });
  window.dispatchEvent(new CustomEvent("fisica-progress-reloaded"));
}

export async function loadRemoteState(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from("user_state")
    .select("state, updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ? { ...data.state, updatedAt: data.updated_at } : null;
}

export async function saveRemoteState(userId, state) {
  if (!supabase || !userId) return null;
  const nextState = { ...state, updatedAt: new Date().toISOString() };
  const { data, error } = await supabase
    .from("user_state")
    .upsert(
      {
        user_id: userId,
        state: nextState,
        updated_at: nextState.updatedAt,
      },
      { onConflict: "user_id" },
    )
    .select("state, updated_at")
    .single();

  if (error) throw error;
  return { ...data.state, updatedAt: data.updated_at };
}

export function mergeStates(localState = {}, remoteState = {}) {
  const localUpdated = localState.updatedAt ? new Date(localState.updatedAt).getTime() : 0;
  const remoteUpdated = remoteState.updatedAt ? new Date(remoteState.updatedAt).getTime() : 0;
  const localCourses = normalizeStateCourses(localState);
  const remoteCourses = normalizeStateCourses(remoteState);
  const courseIds = new Set([...KNOWN_COURSE_IDS, ...Object.keys(remoteCourses), ...Object.keys(localCourses)]);
  const courses = {};
  courseIds.forEach((courseId) => {
    const localCourse = localCourses[courseId] || {};
    const remoteCourse = remoteCourses[courseId] || {};
    courses[courseId] = {
      testProgress: mergeTestProgress(localCourse.testProgress, remoteCourse.testProgress),
      studyProgress: mergeStudyProgress(localCourse.studyProgress, remoteCourse.studyProgress),
      tutorProgress: mergeTutorProgress(localCourse.tutorProgress, remoteCourse.tutorProgress),
    };
  });
  const activeCourseId = localState.activeCourseId || remoteState.activeCourseId || getActiveCourseId();
  return {
    version: 2,
    activeCourseId,
    courses,
    testProgress: courses[activeCourseId]?.testProgress || initialProgress,
    studyProgress: courses[activeCourseId]?.studyProgress || initialStudyProgress,
    tutorProgress: courses[activeCourseId]?.tutorProgress || initialTutorProgress,
    updatedAt: new Date(Math.max(localUpdated, remoteUpdated, Date.now())).toISOString(),
  };
}

export async function syncProgress(userId) {
  const localState = getLocalState();
  const remoteState = await loadRemoteState(userId);
  const mergedState = mergeStates(localState, remoteState || {});
  const savedState = await saveRemoteState(userId, mergedState);
  saveLocalState(savedState || mergedState);
  return savedState || mergedState;
}

export async function pushLocalProgress(userId) {
  const localState = { ...getLocalState(), updatedAt: new Date().toISOString() };
  const savedState = await saveRemoteState(userId, localState);
  if (savedState) saveLocalState(savedState);
  return savedState || localState;
}

export async function clearRemoteProgress(userId) {
  if (!supabase || !userId) return;
  const { error } = await supabase.from("user_state").delete().eq("user_id", userId);
  if (error) throw error;
}

export function exportLocalState() {
  return JSON.stringify(getLocalState(), null, 2);
}

export function importLocalState(jsonText) {
  const parsed = JSON.parse(jsonText);
  const state = mergeStates(parsed, {});
  saveLocalState({ ...state, updatedAt: new Date().toISOString() });
  return state;
}
