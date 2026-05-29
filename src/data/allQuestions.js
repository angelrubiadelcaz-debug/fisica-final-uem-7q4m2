import {
  difficulties,
  questionTypes as baseQuestionTypes,
  questions as baseQuestions,
  topics as baseTopics,
} from "./questions.js";
import { theoryQuestions } from "./theoryQuestions.js";

export const questions = [...baseQuestions, ...theoryQuestions];
export const topics = [...new Set([...baseTopics, ...theoryQuestions.map((question) => question.tema)])];
export { difficulties };

export const questionTypes = [
  ...baseQuestionTypes,
  "tarjetas",
].filter((value, index, list) => list.indexOf(value) === index);

export const questionTotals = {
  base: baseQuestions.length,
  theory: theoryQuestions.length,
  total: baseQuestions.length + theoryQuestions.length,
};
