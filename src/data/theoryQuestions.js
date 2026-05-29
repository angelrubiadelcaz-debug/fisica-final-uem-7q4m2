import { studyCards } from "./studyCards.js";

const TOPIC_MAP = {
  "Tema 1": "Tema 1: Cinematica, dinamica y electrostatica en el vacio",
  "Tema 2": "Tema 2: Potencial, conductores, capacitores y dielectricos",
  "Tema 3": "Tema 3: Corriente electrica, magnetismo e induccion",
  "Tema 4": "Tema 4: MAS, ondas y ondas electromagneticas",
  "Tema 5": "Tema 5: Magnetismo en la materia, luz y semiconductores",
  "Tema 6": "Tema 6: Termodinamica y transmision de calor",
};

const genericDistractors = [
  "Solo sirve cuando hay movimiento circular uniforme.",
  "Se aplica siempre sin revisar unidades.",
  "Indica que la magnitud permanece constante en cualquier caso.",
  "Depende principalmente de la masa del electron.",
  "Se usa para anular el campo magnetico en el vacio.",
  "No tiene relacion con la interpretacion fisica del problema.",
];

function clean(text = "") {
  return String(text).replace(/\s+/g, " ").trim();
}

function topicFor(card) {
  return TOPIC_MAP[card.temaBanco] || card.temaBanco || card.tema;
}

function difficultyFor(card, offset = 0) {
  if (card.prioridad === "alta") return offset % 2 ? "media" : "dificil";
  if (card.prioridad === "baja") return "facil";
  return "media";
}

function uniqueOptions(correct, distractors) {
  const options = [clean(correct)];
  [...distractors, ...genericDistractors].forEach((item) => {
    const value = clean(item);
    if (value && !options.includes(value) && options.length < 4) options.push(value);
  });
  while (options.length < 4) options.push(genericDistractors[options.length]);
  return options.slice(0, 4);
}

function placeCorrect(correct, distractors, seed) {
  const target = seed % 4;
  const options = uniqueOptions(correct, distractors);
  const [right, ...wrong] = options;
  const arranged = [];
  let wrongIndex = 0;
  for (let index = 0; index < 4; index += 1) {
    arranged[index] = index === target ? right : wrong[wrongIndex++];
  }
  return { opciones: arranged, correcta: target };
}

function nearbyCards(card, amount = 5) {
  return studyCards
    .filter((candidate) => candidate.id !== card.id && (candidate.tema === card.tema || candidate.temaBanco === card.temaBanco))
    .slice(0, amount);
}

function baseTheory(card) {
  return `Relaciona la tarjeta "${card.titulo}" con su uso, magnitudes y error tipico. La teoria de ayuda no debe sustituir el razonamiento del test: identifica primero que se mantiene constante y que magnitud se pregunta.`;
}

function makeConceptQuestion(card, index) {
  const distractors = nearbyCards(card).map((candidate) => candidate.explicacionCorta);
  const { opciones, correcta } = placeCorrect(card.explicacionCorta, distractors, index);
  return {
    id: `theory-card-${String(index).padStart(3, "0")}`,
    tema: topicFor(card),
    subtema: card.subtema,
    dificultad: difficultyFor(card, index),
    tipo: "teoria",
    enunciado: `¿Qué idea resume mejor el concepto "${card.titulo}"?`,
    opciones,
    correcta,
    explicacion: `La idea clave es: ${card.explicacionCorta}`,
    teoria: baseTheory(card),
    formula: card.formula || "",
    sourceCardId: card.id,
  };
}

function makeUseQuestion(card, index) {
  const correct = card.cuandoSeUsa || "Cuando la pregunta menciona las magnitudes principales de esta tarjeta.";
  const distractors = nearbyCards(card).map((candidate) => candidate.cuandoSeUsa);
  const { opciones, correcta } = placeCorrect(correct, distractors, index + 1);
  return {
    id: `theory-use-${String(index).padStart(3, "0")}`,
    tema: topicFor(card),
    subtema: card.subtema,
    dificultad: difficultyFor(card, index + 1),
    tipo: card.formula ? "formula" : "tarjetas",
    enunciado: `¿Cuándo conviene usar la tarjeta "${card.titulo}"?`,
    opciones,
    correcta,
    explicacion: correct,
    teoria: `Piensa en las magnitudes que aparecen en el enunciado y en el tipo de relacion fisica que pide la pregunta. No basta con reconocer una formula: hay que comprobar condiciones y unidades.`,
    formula: card.formula || "",
    sourceCardId: card.id,
  };
}

function makeMistakeQuestion(card, index) {
  const correct = card.errorTipico || "No revisar condiciones y unidades antes de responder.";
  const distractors = nearbyCards(card).map((candidate) => candidate.errorTipico);
  const { opciones, correcta } = placeCorrect(correct, distractors, index + 2);
  return {
    id: `theory-trap-${String(index).padStart(3, "0")}`,
    tema: topicFor(card),
    subtema: card.subtema,
    dificultad: difficultyFor(card, index + 2),
    tipo: "tarjetas",
    enunciado: `En test, ¿qué error típico está asociado a "${card.titulo}"?`,
    opciones,
    correcta,
    explicacion: correct,
    teoria: `En preguntas tipo test suelen aparecer distractores que confunden proporcionalidades, unidades, signos o condiciones de aplicacion.`,
    formula: card.formula || "",
    sourceCardId: card.id,
  };
}

export const theoryQuestions = studyCards.flatMap((card, index) => [
  makeConceptQuestion(card, index * 3 + 1),
  makeUseQuestion(card, index * 3 + 2),
  makeMistakeQuestion(card, index * 3 + 3),
]);

export const theoryQuestionCount = theoryQuestions.length;
