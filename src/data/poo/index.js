import {
  difficulties,
  questionTypes as baseQuestionTypes,
  questions as baseQuestions,
  topics as baseTopics,
} from "./questions.js";
import { theoryQuestions } from "./theoryQuestions.js";
import { cheatsheet, formulas } from "./cheatsheet.js";
import { studyCards, studyTopics } from "./studyCards.js";

export const questions = [...baseQuestions, ...theoryQuestions];
export const topics = [...new Set([...baseTopics, ...theoryQuestions.map((question) => question.tema)])];
export const questionTypes = [...new Set([...baseQuestionTypes, ...theoryQuestions.map((question) => question.tipo), "tarjetas"])];
export const questionTotals = {
  base: baseQuestions.length,
  theory: theoryQuestions.length,
  total: questions.length,
};

export {
  cheatsheet,
  difficulties,
  formulas,
  studyCards,
  studyTopics,
};
