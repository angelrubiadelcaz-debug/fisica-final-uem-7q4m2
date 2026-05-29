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

export {
  clearProgress,
  clearRemoteProgress,
  clearStudyProgress,
  exportLocalState,
  getLocalState,
  getPendingCards,
  getStudyCardState,
  getStudySummary,
  importLocalState,
  loadProgress,
  loadRemoteState,
  loadStudyProgress,
  markStudyCard,
  mergeResultIntoProgress,
  mergeStates,
  pushLocalProgress,
  saveLocalState,
  saveProgress,
  saveRemoteState,
  saveStudyProgress,
  syncProgress,
};

export function resetLocalProgress() {
  clearProgress();
  clearStudyProgress();
}
