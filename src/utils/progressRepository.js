import {
  clearRemoteProgress,
  exportLocalState,
  getLocalState,
  importLocalState,
  loadRemoteState,
  mergeStates,
  pushLocalProgress,
  saveLocalState,
  saveRemoteState,
  syncProgress,
} from "../services/progressSync";
import { clearProgress, loadProgress, mergeResultIntoProgress, saveProgress } from "./storage";
import {
  clearStudyProgress,
  getPendingCards,
  getStudyCardState,
  getStudySummary,
  loadStudyProgress,
  markStudyCard,
  saveStudyProgress,
} from "./studyStorage";
import {
  clearTutorProgress,
  loadTutorProgress,
  recordCardQuizAnswer,
  recordTutorDoubt,
  recordTutorQuestion,
  saveTutorProgress,
} from "./tutorStorage";

export {
  clearProgress,
  clearRemoteProgress,
  clearStudyProgress,
  clearTutorProgress,
  exportLocalState,
  getLocalState,
  getPendingCards,
  getStudyCardState,
  getStudySummary,
  importLocalState,
  loadProgress,
  loadRemoteState,
  loadStudyProgress,
  loadTutorProgress,
  markStudyCard,
  mergeResultIntoProgress,
  mergeStates,
  pushLocalProgress,
  saveLocalState,
  saveProgress,
  saveRemoteState,
  saveStudyProgress,
  saveTutorProgress,
  recordCardQuizAnswer,
  recordTutorDoubt,
  recordTutorQuestion,
  syncProgress,
};

export function resetLocalProgress() {
  clearProgress();
  clearStudyProgress();
  clearTutorProgress();
}
