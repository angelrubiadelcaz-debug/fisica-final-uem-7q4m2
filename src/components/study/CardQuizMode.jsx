import { ArrowLeft, CheckCircle2, Eye, RotateCcw, Search, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { recordCardQuizAnswer } from "../../utils/progressRepository";
import MathText from "../MathText";

function shuffle(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function questionFor(card) {
  return card.preguntaActiva || `Explica en una frase que representa "${card.titulo}".`;
}

function answerFor(card) {
  return card.respuestaActiva || card.explicacionCorta;
}

export default function CardQuizMode({ cards, topics, onBack, onMark }) {
  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const [sessionCards, setSessionCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [results, setResults] = useState([]);

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards.filter((card) => {
      const topicMatch = topic === "all" || card.tema === topic;
      const haystack = [card.tema, card.subtema, card.titulo, card.explicacionCorta, card.errorTipico, card.formula]
        .join(" ")
        .toLowerCase();
      return topicMatch && (!query || haystack.includes(query));
    });
  }, [cards, topic, search]);

  const current = sessionCards[index];

  function start(cardsToUse = filteredCards) {
    setSessionCards(shuffle(cardsToUse).slice(0, Math.min(cardsToUse.length, 20)));
    setIndex(0);
    setRevealed(false);
    setWrittenAnswer("");
    setResults([]);
  }

  function mark(status) {
    onMark(current.id, status);
    recordCardQuizAnswer(current, status, writtenAnswer);
    setResults((previous) => [...previous, { card: current, status }]);
    setIndex((value) => value + 1);
    setRevealed(false);
    setWrittenAnswer("");
  }

  if (sessionCards.length && index >= sessionCards.length) {
    const weakCards = results.filter((item) => item.status !== "dominado").map((item) => item.card);
    const dominated = results.filter((item) => item.status === "dominado").length;
    const doubtful = results.filter((item) => item.status === "dudoso").length;
    const review = results.filter((item) => item.status === "repasar").length;

    return (
      <section className="card-quiz-shell">
        <button type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          Volver
        </button>
        <p className="eyebrow">Preguntame terminado</p>
        <h2>Resultados de recuerdo activo</h2>
        <div className="stat-grid">
          <div className="stat-card good">
            <strong>{dominated}</strong>
            <span>Lo sabia</span>
          </div>
          <div className="stat-card">
            <strong>{doubtful}</strong>
            <span>Dudaba</span>
          </div>
          <div className="stat-card bad">
            <strong>{review}</strong>
            <span>No me lo sabia</span>
          </div>
        </div>
        <div className="actions-row">
          <button className="primary" type="button" onClick={() => start(weakCards)} disabled={!weakCards.length}>
            <RotateCcw size={18} />
            Repetir solo dudosas
          </button>
          <button type="button" onClick={() => start(filteredCards)}>
            Nuevo repaso
          </button>
        </div>
      </section>
    );
  }

  if (current) {
    return (
      <section className="card-quiz-shell">
        <div className="quick-top">
          <button type="button" onClick={onBack}>
            <ArrowLeft size={18} />
            Salir
          </button>
          <span>
            {index + 1} de {sessionCards.length}
          </span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((index + 1) / sessionCards.length) * 100}%` }} />
        </div>
        <article className="card-quiz-card">
          <span className="formula-topic">{current.tema}</span>
          <h2>{current.titulo}</h2>
          <MathText as="p" className="card-quiz-question">{questionFor(current)}</MathText>
          <label className="field">
            <span>Respuesta corta opcional</span>
            <textarea
              value={writtenAnswer}
              onChange={(event) => setWrittenAnswer(event.target.value)}
              rows={3}
              placeholder="Escribe una frase si quieres comprobarte..."
            />
          </label>
          {!revealed ? (
            <button className="primary" type="button" onClick={() => setRevealed(true)}>
              <Eye size={18} />
              Ver respuesta
            </button>
          ) : (
            <div className="card-quiz-answer">
              <strong>Respuesta esperada</strong>
              <MathText as="p">{answerFor(current)}</MathText>
              {current.formula && <MathText as="div" block className="math-card-formula">{current.formula}</MathText>}
              <MathText as="p">{current.errorTipico}</MathText>
              <div className="quick-actions">
                <button className="primary" type="button" onClick={() => mark("dominado")}>
                  <CheckCircle2 size={18} />
                  Lo sabia
                </button>
                <button type="button" onClick={() => mark("dudoso")}>
                  <RotateCcw size={18} />
                  Dudaba
                </button>
                <button type="button" onClick={() => mark("repasar")}>
                  <XCircle size={18} />
                  No me lo sabia
                </button>
              </div>
            </div>
          )}
        </article>
      </section>
    );
  }

  return (
    <section className="card-quiz-shell">
      <div className="study-hero">
        <div>
          <p className="eyebrow">Preguntame</p>
          <h2>Recuerdo activo con tarjetas</h2>
          <p>Elige tema, intenta responder y marca si lo sabias. Se guarda en tu progreso.</p>
        </div>
        <button type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>
      <div className="study-toolbar">
        <label className="field">
          <span>Tema</span>
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">Todos</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field search-field">
          <span>Buscar</span>
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Carnot, Doppler, Gauss..." />
        </label>
      </div>
      <div className="actions-row">
        <button className="primary" type="button" onClick={() => start(filteredCards)} disabled={!filteredCards.length}>
          Empezar con {Math.min(filteredCards.length, 20)} tarjetas
        </button>
      </div>
    </section>
  );
}
