import { formulas } from "../data/formulas.js";
import { questions } from "../data/allQuestions.js";
import { studyCards } from "../data/studyCards.js";
import { LOCAL_TUTOR_STYLE } from "../data/tutorPrompts.js";

function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "que",
  "como",
  "cuando",
  "donde",
  "por",
  "para",
  "con",
  "sin",
  "los",
  "las",
  "una",
  "uno",
  "unos",
  "unas",
  "del",
  "de",
  "el",
  "la",
  "me",
  "mi",
  "no",
  "si",
  "sobre",
  "explica",
  "explicame",
  "entiendo",
  "duda",
  "dudas",
  "hazme",
  "pregunta",
  "preguntame",
]);

function tokens(text) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function scoreText(queryTokens, haystack, priority = 0) {
  const normalized = normalize(haystack);
  const words = normalized.split(" ");
  return queryTokens.reduce((score, token) => {
    if (words.includes(token)) return score + 4;
    const hasRelatedWord = words.some(
      (word) => token.length > 4 && word.length > 3 && (word.startsWith(token) || token.startsWith(word)),
    );
    return score + (hasRelatedWord ? 1 : 0);
  }, priority);
}

function cardHaystack(card) {
  return [
    card.tema,
    card.subtema,
    card.titulo,
    card.explicacionCorta,
    card.formula,
    card.cuandoSeUsa,
    card.errorTipico,
    card.miniEjemplo,
    card.preguntaActiva,
    card.respuestaActiva,
    ...(card.etiquetas || []),
  ].join(" ");
}

export function findRelevantStudyCards(query, limit = LOCAL_TUTOR_STYLE.maxCards) {
  const queryTokens = tokens(query);
  if (!queryTokens.length) return [];
  return studyCards
    .map((card) => ({
      card,
      score: scoreText(queryTokens, cardHaystack(card), card.prioridad === "alta" ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.card.titulo.localeCompare(b.card.titulo))
    .slice(0, limit)
    .map((item) => item.card);
}

export function findRelevantFormulas(query, limit = LOCAL_TUTOR_STYLE.maxFormulas) {
  const queryTokens = tokens(query);
  if (!queryTokens.length) return [];
  return formulas
    .map((formula) => ({
      formula,
      score: scoreText(
        queryTokens,
        [formula.tema, formula.nombre, formula.formula, formula.variables, formula.uso, formula.unidad, formula.advertencia].join(" "),
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.formula);
}

export function findRelevantQuestions(query, limit = LOCAL_TUTOR_STYLE.maxQuestions) {
  const queryTokens = tokens(query);
  if (!queryTokens.length) return [];
  return questions
    .map((question) => ({
      question,
      score: scoreText(
        queryTokens,
        [question.tema, question.subtema, question.enunciado, question.teoria, question.explicacion, question.formula, question.tipo].join(" "),
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.question);
}

export function buildTutorContext(message) {
  const cards = findRelevantStudyCards(message);
  const formulasFound = findRelevantFormulas(message);
  const relatedQuestions = findRelevantQuestions(message);
  return { cards, formulas: formulasFound, questions: relatedQuestions };
}

function formulaHaystack(formula) {
  return [formula.tema, formula.nombre, formula.formula, formula.variables, formula.uso, formula.unidad, formula.advertencia].join(" ");
}

function cardFormulaMatches(formula, card) {
  if (!formula || !card) return false;
  const formulaText = normalize(formula.formula);
  const cardFormula = normalize(card.formula);
  if (cardFormula && formulaText && (formulaText.includes(cardFormula) || cardFormula.includes(formulaText))) return true;

  const formulaWords = normalize(formulaHaystack(formula)).split(" ");
  const cardWords = tokens([card.tema, card.subtema, card.titulo, ...(card.etiquetas || [])].join(" "));
  const strongMatches = cardWords.filter((word) => formulaWords.includes(word));
  return strongMatches.length >= 2 || normalize(formula.nombre) === normalize(card.titulo);
}

export function generateCardQuiz(card) {
  if (!card) return null;
  return {
    cardId: card.id,
    question: card.preguntaActiva || `Explica en una frase para que sirve "${card.titulo}".`,
    answer: card.respuestaActiva || card.explicacionCorta,
    formula: card.formula || "",
  };
}

export function generateTheoryQuizFromCards(cards = []) {
  return cards.map(generateCardQuiz).filter(Boolean);
}

function isQuestionRequest(message) {
  const normalized = normalize(message);
  return normalized.includes("hazme una pregunta") || normalized.includes("preguntame") || normalized.includes("ponme una pregunta");
}

function buildCardAnswer(card, formula) {
  const formulaText = card.formula || formula?.formula || "";
  const parts = [
    `Concepto: ${card.titulo}.`,
    card.explicacionCorta,
  ];
  if (formulaText) parts.push(`Formula clave: ${formulaText}`);
  parts.push(`Cuando se usa: ${card.cuandoSeUsa}`);
  parts.push(`Error tipico: ${card.errorTipico}`);
  parts.push(`Pregunta rapida: ${card.preguntaActiva || `¿Cuando aplicarias ${card.titulo}?`}`);
  return parts.join("\n\n");
}

function buildFormulaAnswer(formula) {
  return [
    `Formula: ${formula.nombre}.`,
    formula.formula,
    `Variables: ${formula.variables}`,
    `Cuando se usa: ${formula.uso}`,
    `Error tipico: ${formula.advertencia}`,
    "Pregunta rapida: ¿Que magnitud permanece constante en el caso que te plantean?",
  ].join("\n\n");
}

export function buildLocalTutorAnswer(query, context = buildTutorContext(query)) {
  const [card] = context.cards || [];
  const formula = card ? (context.formulas || []).find((item) => cardFormulaMatches(item, card)) : (context.formulas || [])[0];
  const quiz = isQuestionRequest(query) ? generateCardQuiz(card) : null;

  if (quiz) {
    return {
      mode: "local",
      answer: [`Pregunta de recuerdo activo: ${quiz.question}`, "Piensa la respuesta antes de abrir tarjetas o hacer test."].join("\n\n"),
      context,
      quiz,
    };
  }

  if (card) {
    return { mode: "local", answer: buildCardAnswer(card, formula), context };
  }

  if (formula) {
    return { mode: "local", answer: buildFormulaAnswer(formula), context };
  }

  const [question] = context.questions || [];
  if (question) {
    return {
      mode: "local",
      answer: [
        `Esto aparece en preguntas sobre ${question.subtema}.`,
        question.teoria,
        question.formula ? `Formula relacionada: ${question.formula}` : "",
        `Error tipico: confundir el concepto con una opcion parecida del test.`,
        `Pregunta rapida: ${question.enunciado}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
      context,
    };
  }

  return { mode: "local", answer: LOCAL_TUTOR_STYLE.emptyAnswer, context };
}

export function serializeTutorContext(context = {}) {
  return {
    cards: (context.cards || []).map((card) => ({
      id: card.id,
      tema: card.tema,
      subtema: card.subtema,
      titulo: card.titulo,
      explicacionCorta: card.explicacionCorta,
      formula: card.formula,
      cuandoSeUsa: card.cuandoSeUsa,
      errorTipico: card.errorTipico,
      miniEjemplo: card.miniEjemplo,
      preguntaActiva: card.preguntaActiva,
      respuestaActiva: card.respuestaActiva,
    })),
    formulas: (context.formulas || []).map((formula) => ({
      tema: formula.tema,
      nombre: formula.nombre,
      formula: formula.formula,
      variables: formula.variables,
      uso: formula.uso,
      unidad: formula.unidad,
      advertencia: formula.advertencia,
    })),
    questions: (context.questions || []).map((question) => ({
      tema: question.tema,
      subtema: question.subtema,
      enunciado: question.enunciado,
      explicacion: question.explicacion,
      teoria: question.teoria,
      formula: question.formula,
      tipo: question.tipo,
    })),
  };
}
