import { pooConcepts } from "./coreConcepts.js";

function rotateToTarget(question, target) {
  const shift = (target - question.correcta + 4) % 4;
  if (shift === 0) return question;
  const opciones = question.opciones.map((_, index) => question.opciones[(index - shift + 4) % 4]);
  return { ...question, opciones, correcta: target };
}

function makeTheoryQuestion(concept, index) {
  return rotateToTarget(
    {
      id: `poo-${concept.id}-002`,
      tema: concept.tema,
      subtema: concept.subtema,
      dificultad: concept.dificultad === "facil" ? "media" : concept.dificultad || "media",
      tipo: "trampa tipica",
      enunciado: `Sobre "${concept.titulo}", ¿que opcion conviene recordar en un examen tipo test?`,
      opciones: [concept.recuerdo, ...concept.trampas].slice(0, 4),
      correcta: 0,
      explicacion: `${concept.recuerdo} ${concept.error}`,
      teoria: `${concept.cuando} Error tipico: ${concept.error}`,
      formula: concept.sintaxis || "",
      sourceCardId: `poo-${concept.id}`,
    },
    (index + 2) % 4,
  );
}

export const theoryQuestions = pooConcepts.map(makeTheoryQuestion);
