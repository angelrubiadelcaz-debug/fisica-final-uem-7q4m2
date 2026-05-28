import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import ActiveRecallCard from "./ActiveRecallCard";

export default function QuickReview({ cards, onExit, onMark, onRestartWithCards }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState([]);
  const current = cards[index];

  const summary = useMemo(
    () =>
      results.reduce(
        (acc, item) => {
          if (item.status === "dominado") acc.dominados += 1;
          if (item.status === "dudoso") acc.dudosos += 1;
          if (item.status === "repasar") acc.repasar += 1;
          return acc;
        },
        { dominados: 0, dudosos: 0, repasar: 0 },
      ),
    [results],
  );

  function mark(status) {
    onMark(current.id, status);
    setResults((previous) => [...previous, { id: current.id, status }]);
    setRevealed(false);
    setIndex((value) => value + 1);
  }

  if (!cards.length) {
    return (
      <section className="study-empty">
        <h2>No hay tarjetas para repasar.</h2>
        <button type="button" onClick={onExit}>
          <ArrowLeft size={18} />
          Volver
        </button>
      </section>
    );
  }

  if (index >= cards.length) {
    const weakCards = cards.filter((card) => {
      const result = results.find((item) => item.id === card.id);
      return result && result.status !== "dominado";
    });

    return (
      <section className="quick-result">
        <p className="eyebrow">Repaso rapido terminado</p>
        <h2>Buen corte. Ahora solo importa lo que flojea.</h2>
        <div className="stat-grid">
          <div className="stat-card good">
            <CheckCircle2 size={20} />
            <strong>{summary.dominados}</strong>
            <span>Dominados</span>
          </div>
          <div className="stat-card">
            <RotateCcw size={20} />
            <strong>{summary.dudosos}</strong>
            <span>Dudosos</span>
          </div>
          <div className="stat-card bad">
            <XCircle size={20} />
            <strong>{summary.repasar}</strong>
            <span>Repasar</span>
          </div>
        </div>
        <div className="actions-row">
          <button className="primary" type="button" onClick={() => onRestartWithCards(weakCards)} disabled={!weakCards.length}>
            <RotateCcw size={18} />
            Repetir solo falladas
          </button>
          <button type="button" onClick={onExit}>
            Volver a tarjetas
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="quick-review">
      <div className="quick-top">
        <button type="button" onClick={onExit}>
          <ArrowLeft size={18} />
          Salir
        </button>
        <span>
          {index + 1} de {cards.length}
        </span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
      </div>
      <ActiveRecallCard card={current} revealed={revealed} onReveal={() => setRevealed(true)} />
      {revealed && (
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
      )}
    </section>
  );
}
