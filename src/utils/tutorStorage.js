export const TUTOR_KEY = "fisica-tutor-progress-v1";

export const initialTutorProgress = {
  doubts: [],
  topicCounts: {},
  cardQuiz: {},
  tutorQuestions: [],
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fisica-progress-changed"));
}

function normalizeProgress(progress) {
  return {
    ...initialTutorProgress,
    ...(progress || {}),
    doubts: progress?.doubts || [],
    topicCounts: progress?.topicCounts || {},
    cardQuiz: progress?.cardQuiz || {},
    tutorQuestions: progress?.tutorQuestions || [],
  };
}

export function loadTutorProgress() {
  if (!canUseStorage()) return initialTutorProgress;
  try {
    const stored = window.localStorage.getItem(TUTOR_KEY);
    return stored ? normalizeProgress(JSON.parse(stored)) : initialTutorProgress;
  } catch {
    return initialTutorProgress;
  }
}

export function saveTutorProgress(progress) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TUTOR_KEY, JSON.stringify(normalizeProgress(progress)));
  notifyProgressChanged();
}

export function clearTutorProgress() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TUTOR_KEY);
  notifyProgressChanged();
}

function topicsFromContext(context = {}) {
  const topics = [
    ...(context.cards || []).map((card) => card.tema),
    ...(context.formulas || []).map((formula) => formula.tema),
    ...(context.questions || []).map((question) => question.tema),
  ].filter(Boolean);
  return [...new Set(topics)].slice(0, 5);
}

export function recordTutorDoubt(message, answer = "", context = {}) {
  const progress = loadTutorProgress();
  const topics = topicsFromContext(context);
  const topicCounts = { ...progress.topicCounts };
  topics.forEach((topic) => {
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  });

  const doubts = [
    {
      id: `doubt-${Date.now()}`,
      message,
      answer,
      topics,
      date: new Date().toISOString(),
    },
    ...progress.doubts,
  ].slice(0, 30);

  saveTutorProgress({ ...progress, doubts, topicCounts });
}

export function recordTutorQuestion(questionText, source = "local") {
  const progress = loadTutorProgress();
  saveTutorProgress({
    ...progress,
    tutorQuestions: [
      { id: `tutor-question-${Date.now()}`, questionText, source, date: new Date().toISOString() },
      ...progress.tutorQuestions,
    ].slice(0, 40),
  });
}

export function recordCardQuizAnswer(card, status, writtenAnswer = "") {
  const progress = loadTutorProgress();
  const current = progress.cardQuiz[card.id] || { attempts: 0, dominado: 0, dudoso: 0, repasar: 0, lastStatus: "" };
  const nextState = {
    ...current,
    attempts: current.attempts + 1,
    [status]: (current[status] || 0) + 1,
    lastStatus: status,
    lastAnswer: writtenAnswer,
    lastReviewed: new Date().toISOString(),
    tema: card.tema,
    titulo: card.titulo,
  };
  const topicCounts = { ...progress.topicCounts, [card.tema]: (progress.topicCounts[card.tema] || 0) + 1 };
  saveTutorProgress({
    ...progress,
    topicCounts,
    cardQuiz: { ...progress.cardQuiz, [card.id]: nextState },
  });
}
