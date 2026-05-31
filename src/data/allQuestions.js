import {
  difficulties,
  questionTypes as baseQuestionTypes,
  questions as baseQuestions,
  topics as baseTopics,
} from "./questions.js";
import { theoryQuestions } from "./theoryQuestions.js";
import { guideFinalQuestions } from "./physics/guiaFinalQuestions.js";
import { seguroExamenQuestions } from "./physics/seguroExamenQuestions.js";

export const questions = [...seguroExamenQuestions, ...guideFinalQuestions, ...baseQuestions, ...theoryQuestions];
export const topics = [
  ...new Set([
    ...baseTopics,
    ...seguroExamenQuestions.map((question) => question.tema),
    ...guideFinalQuestions.map((question) => question.tema),
    ...theoryQuestions.map((question) => question.tema),
  ]),
];
export { difficulties };

export const questionTypes = [
  "seguro examen",
  "guia final",
  ...baseQuestionTypes,
  "tarjetas",
].filter((value, index, list) => list.indexOf(value) === index);

export const questionTotals = {
  seguroExamen: seguroExamenQuestions.length,
  guideFinal: guideFinalQuestions.length,
  base: baseQuestions.length,
  theory: theoryQuestions.length,
  total: seguroExamenQuestions.length + guideFinalQuestions.length + baseQuestions.length + theoryQuestions.length,
};
