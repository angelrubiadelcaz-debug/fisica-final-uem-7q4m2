import { pooConcepts } from "./coreConcepts.js";

const difficulties = ["facil", "media", "dificil"];

function rotateToTarget(question, target) {
  const shift = (target - question.correcta + 4) % 4;
  if (shift === 0) return question;
  const opciones = question.opciones.map((_, index) => question.opciones[(index - shift + 4) % 4]);
  return { ...question, opciones, correcta: target };
}

function makeBaseQuestion(concept, index) {
  return rotateToTarget(
    {
      id: `poo-${concept.id}-001`,
      tema: concept.tema,
      subtema: concept.subtema,
      dificultad: concept.dificultad || "media",
      tipo: concept.tipo || "teoria",
      enunciado: `En Programacion Orientada a Objetos, ¿que afirmacion describe mejor "${concept.titulo}"?`,
      opciones: [concept.definicion, ...concept.distractores].slice(0, 4),
      correcta: 0,
      explicacion: concept.definicion,
      teoria: `${concept.recuerdo} ${concept.cuando}`,
      formula: concept.sintaxis || "",
      sourceCardId: `poo-${concept.id}`,
    },
    index % 4,
  );
}

export const questions = pooConcepts.map(makeBaseQuestion);
export const topics = [...new Set(questions.map((question) => question.tema))];
export const questionTypes = [
  "teoria",
  "sintaxis",
  "comparacion",
  "interpretacion",
  "trampa tipica",
  "caso conceptual",
];
export { difficulties };
