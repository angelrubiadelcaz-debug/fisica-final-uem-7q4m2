import {
  difficulties,
  questionTypes as baseQuestionTypes,
  questions as baseQuestions,
  topics as baseTopics,
} from "./questions.js";
import { theoryQuestions } from "./theoryQuestions.js";
import { guideFinalQuestions } from "./physics/guiaFinalQuestions.js";

export const questions = [...guideFinalQuestions, ...baseQuestions, ...theoryQuestions];
export const topics = [
  ...new Set([...baseTopics, ...guideFinalQuestions.map((question) => question.tema), ...theoryQuestions.map((question) => question.tema)]),
];
export { difficulties };

export const questionTypes = [
  "guia final",
  ...baseQuestionTypes,
  "tarjetas",
].filter((value, index, list) => list.indexOf(value) === index);

export const questionTotals = {
  guideFinal: guideFinalQuestions.length,
  base: baseQuestions.length,
  theory: theoryQuestions.length,
  total: guideFinalQuestions.length + baseQuestions.length + theoryQuestions.length,
};
