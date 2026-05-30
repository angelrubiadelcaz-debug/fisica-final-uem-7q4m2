import { pooConcepts } from "./coreConcepts.js";
import { questions } from "./questions.js";
import { theoryQuestions } from "./theoryQuestions.js";

const allPooQuestions = [...questions, ...theoryQuestions];

function relatedQuestionIdsFor(concept) {
  return allPooQuestions
    .filter((question) => question.sourceCardId === `poo-${concept.id}`)
    .map((question) => question.id);
}

function detailsFor(concept) {
  return {
    explanation: [
      concept.definicion,
      concept.recuerdo,
    ],
    physicalMeaning:
      "La idea importante es reconocer que papel cumple dentro de un diseno Java y que palabra o relacion aparece en el enunciado.",
    variables: [
      ...(concept.sintaxis ? [`Sintaxis clave: ${concept.sintaxis}`] : []),
      `Idea de examen: ${concept.recuerdo}`,
    ],
    whenToUse: concept.cuando,
    recognition: `Reconocelo si aparecen terminos como ${concept.etiquetas.slice(0, 4).join(", ")}.`,
    miniExample: concept.ejemplo,
    commonMistake: concept.error,
    examSummary: `${concept.recuerdo} Error tipico: ${concept.error}`,
  };
}

export const studyCards = pooConcepts.map((concept) => ({
  id: `poo-${concept.id}`,
  tema: concept.tema,
  subtema: concept.subtema,
  temaBanco: concept.tema,
  titulo: concept.titulo,
  prioridad: concept.prioridad,
  explicacionCorta: concept.definicion,
  formula: "",
  variables: [
    ...(concept.sintaxis ? [`Sintaxis: ${concept.sintaxis}`] : []),
    `Clave: ${concept.recuerdo}`,
  ],
  cuandoSeUsa: concept.cuando,
  errorTipico: concept.error,
  miniEjemplo: concept.ejemplo,
  preguntaActiva: concept.pregunta,
  respuestaActiva: concept.respuesta,
  etiquetas: concept.etiquetas,
  details: detailsFor(concept),
  relatedQuestionIds: relatedQuestionIdsFor(concept),
}));

export const studyTopics = [...new Set(studyCards.map((card) => card.tema))];
