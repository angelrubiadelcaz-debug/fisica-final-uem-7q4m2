import { supabase } from "../lib/supabaseClient";
import { initialProgress, STORAGE_KEY } from "../utils/storage";
import { initialStudyProgress, STUDY_KEY } from "../utils/studyStorage";

const SYNC_META_KEY = "fisica-sync-meta-v1";

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
  const cards = {};
  const ids = new Set([...Object.keys(remote.cards || {}), ...Object.keys(local.cards || {})]);
  ids.forEach((cardId) => {
    cards[cardId] = mergeCardState(local.cards?.[cardId], remote.cards?.[cardId]);
  });
  return { ...initialStudyProgress, ...remote, ...local, cards };
}

export function getLocalState() {
  const meta = readSyncMeta();
  return {
    version: 1,
    testProgress: readJson(STORAGE_KEY, initialProgress),
    studyProgress: readJson(STUDY_KEY, initialStudyProgress),
    updatedAt: meta.updatedAt || new Date().toISOString(),
  };
}

export function saveLocalState(state) {
  if (!canUseStorage()) return;
  writeJson(STORAGE_KEY, { ...initialProgress, ...(state?.testProgress || {}) });
  writeJson(STUDY_KEY, { ...initialStudyProgress, ...(state?.studyProgress || {}) });
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
  return {
    version: 1,
    testProgress: mergeTestProgress(localState.testProgress, remoteState.testProgress),
    studyProgress: mergeStudyProgress(localState.studyProgress, remoteState.studyProgress),
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
