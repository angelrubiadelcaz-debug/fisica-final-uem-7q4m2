export function shuffle(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function getFilteredQuestions(questions, selectedTopics, difficulty, query = "", questionType = "all") {
  const topicList = Array.isArray(selectedTopics) ? selectedTopics : [selectedTopics];
  const allTopics = topicList.includes("all") || topicList.length === 0;
  const normalizedQuery = query.trim().toLowerCase();

  return questions.filter((question) => {
    const topicMatch = allTopics || topicList.includes(question.tema);
    const difficultyMatch = difficulty === "all" || question.dificultad === difficulty;
    const typeMatch = questionType === "all" || question.tipo === questionType;
    const searchMatch =
      !normalizedQuery ||
      [question.enunciado, question.tema, question.subtema, question.explicacion, question.teoria, question.formula, question.tipo]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    return topicMatch && difficultyMatch && typeMatch && searchMatch;
  });
}

export function pickQuestions(pool, amount) {
  return shuffle(pool).slice(0, Math.min(amount, pool.length));
}

export function gradeQuiz(quizQuestions, answers) {
  const details = quizQuestions.map((question) => {
    const selected = answers[question.id];
    const isCorrect = selected === question.correcta;
    return {
      question,
      selected,
      isCorrect,
    };
  });

  const correct = details.filter((item) => item.isCorrect).length;
  const wrong = details.length - correct;
  const percent = details.length ? Math.round((correct / details.length) * 100) : 0;
  const wrongByTopic = details
    .filter((item) => !item.isCorrect)
    .reduce((acc, item) => {
      acc[item.question.tema] = (acc[item.question.tema] || 0) + 1;
      return acc;
    }, {});
  const wrongByDifficulty = details
    .filter((item) => !item.isCorrect)
    .reduce((acc, item) => {
      acc[item.question.dificultad] = (acc[item.question.dificultad] || 0) + 1;
      return acc;
    }, {});

  return { details, correct, wrong, percent, wrongByTopic, wrongByDifficulty };
}

export function shortTopic(topic) {
  return topic.replace(/^Tema\s+/, "T").split(":")[0];
}

export function difficultyLabel(value) {
  return {
    all: "Todas",
    facil: "Facil",
    media: "Media",
    dificil: "Dificil",
  }[value] || value;
}

export function questionTypeLabel(value) {
  return {
    all: "Todos",
    "calculo corto": "Calculo",
    teoria: "Teoria",
    formula: "Formula",
    unidades: "Unidades",
    "interpretacion fisica": "Interpretacion",
    interpretacion: "Interpretacion",
    tarjetas: "Tarjetas",
    "caso conceptual": "Conceptual",
    "trampa tipica": "Trampas",
    sintaxis: "Sintaxis",
    comparacion: "Comparacion",
    "seguro examen": "Seguro examen",
    "guia final": "Guia final",
  }[value] || value;
}
