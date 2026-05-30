export const STUDY_KEY = "fisica-study-progress-v1";

export const initialStudyProgress = {
  cards: {},
};

const validStatuses = new Set(["sin-marcar", "dominado", "dudoso", "repasar"]);

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fisica-progress-changed"));
}

function normalizeCardState(state = {}) {
  const status = validStatuses.has(state.status) ? state.status : "sin-marcar";
  return {
    ...state,
    status,
    lastReviewed: state.lastReviewed || "",
    timesReviewed: Number(state.timesReviewed) || 0,
  };
}

export function normalizeStudyProgress(progress = initialStudyProgress) {
  const cards = {};
  Object.entries(progress?.cards || {}).forEach(([cardId, state]) => {
    if (!cardId) return;
    cards[cardId] = normalizeCardState(state);
  });
  return { ...initialStudyProgress, ...(progress || {}), cards };
}

function mergeStoredProgress(nextProgress) {
  const stored = loadStudyProgress();
  const next = normalizeStudyProgress(nextProgress);
  return {
    ...stored,
    ...next,
    cards: {
      ...stored.cards,
      ...next.cards,
    },
  };
}

export function loadStudyProgress() {
  if (!canUseStorage()) return initialStudyProgress;
  try {
    const stored = window.localStorage.getItem(STUDY_KEY);
    return stored ? normalizeStudyProgress(JSON.parse(stored)) : initialStudyProgress;
  } catch {
    return initialStudyProgress;
  }
}

export function saveStudyProgress(progress) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STUDY_KEY, JSON.stringify(mergeStoredProgress(progress)));
  notifyProgressChanged();
}

export function clearStudyProgress() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STUDY_KEY);
  notifyProgressChanged();
}

export function markStudyCard(progress, cardId, status) {
  const current = progress.cards[cardId] || {};
  return {
    ...progress,
    cards: {
      ...progress.cards,
      [cardId]: {
        status,
        lastReviewed: new Date().toISOString(),
        timesReviewed: (current.timesReviewed || 0) + 1,
      },
    },
  };
}

export function getStudyCardState(progress, cardId) {
  return normalizeCardState(progress?.cards?.[cardId]);
}

export function getStudySummary(cards, progress) {
  return cards.reduce(
    (summary, card) => {
      const status = getStudyCardState(progress, card.id).status;
      if (status === "dominado") summary.dominadas += 1;
      else if (status === "dudoso") summary.dudosas += 1;
      else if (status === "repasar") summary.repasar += 1;
      else summary.sinMarcar += 1;
      return summary;
    },
    { dominadas: 0, dudosas: 0, repasar: 0, sinMarcar: 0 },
  );
}

export function getPendingCards(cards, progress) {
  return cards.filter((card) => {
    const status = getStudyCardState(progress, card.id).status;
    return status === "repasar" || status === "dudoso" || status === "sin-marcar";
  });
}

export function getDoubtfulCards(cards, progress) {
  return cards.filter((card) => getStudyCardState(progress, card.id).status === "dudoso");
}

export function getReviewCards(cards, progress) {
  return cards.filter((card) => getStudyCardState(progress, card.id).status === "repasar");
}

export function getMasteredCards(cards, progress) {
  return cards.filter((card) => getStudyCardState(progress, card.id).status === "dominado");
}
