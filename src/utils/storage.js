import { courseScopedKey, getActiveCourseId, migrateLegacyKey } from "./courseStorage";

export const LEGACY_STORAGE_KEY = "fisica-test-progress-v2";
export const STORAGE_PREFIX = "testProgress";
export const STORAGE_KEY = courseScopedKey(STORAGE_PREFIX);

export const initialProgress = {
  attempts: 0,
  answered: 0,
  correct: 0,
  wrong: 0,
  failedIds: [],
  wrongByTopic: {},
  wrongByDifficulty: {},
  history: [],
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fisica-progress-changed"));
}

export function loadProgress() {
  if (!canUseStorage()) return initialProgress;
  try {
    const key = courseScopedKey(STORAGE_PREFIX);
    migrateLegacyKey(LEGACY_STORAGE_KEY, key, getActiveCourseId());
    const stored = window.localStorage.getItem(key);
    return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress;
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(courseScopedKey(STORAGE_PREFIX), JSON.stringify(progress));
  notifyProgressChanged();
}

export function clearProgress() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(courseScopedKey(STORAGE_PREFIX));
  notifyProgressChanged();
}

export function mergeResultIntoProgress(currentProgress, result) {
  const failedIds = new Set(currentProgress.failedIds);
  result.details.forEach(({ question, isCorrect }) => {
    if (isCorrect) {
      failedIds.delete(question.id);
    } else {
      failedIds.add(question.id);
    }
  });

  const wrongByTopic = { ...currentProgress.wrongByTopic };
  Object.entries(result.wrongByTopic).forEach(([topic, count]) => {
    wrongByTopic[topic] = (wrongByTopic[topic] || 0) + count;
  });

  const wrongByDifficulty = { ...currentProgress.wrongByDifficulty };
  Object.entries(result.wrongByDifficulty).forEach(([difficulty, count]) => {
    wrongByDifficulty[difficulty] = (wrongByDifficulty[difficulty] || 0) + count;
  });

  return {
    attempts: currentProgress.attempts + 1,
    answered: currentProgress.answered + result.details.length,
    correct: currentProgress.correct + result.correct,
    wrong: currentProgress.wrong + result.wrong,
    failedIds: [...failedIds],
    wrongByTopic,
    wrongByDifficulty,
    history: [
      {
        date: new Date().toISOString(),
        total: result.details.length,
        correct: result.correct,
        wrong: result.wrong,
        percent: result.percent,
      },
      ...currentProgress.history,
    ].slice(0, 12),
  };
}
