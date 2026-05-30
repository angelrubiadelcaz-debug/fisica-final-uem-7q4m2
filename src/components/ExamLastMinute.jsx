import { ArrowLeft, BookOpen, Zap } from "lucide-react";
import { useMemo } from "react";
import MathText from "./MathText";

export default function ExamLastMinute({ cards, onBack, onPractice }) {
  const groups = useMemo(() => {
    return cards
      .filter((card) => card.prioridad === "alta")
      .reduce((acc, card) => {
        acc[card.tema] = acc[card.tema] || [];
        acc[card.tema].push(card);
        return acc;
      }, {});
  }, [cards]);

  return (
    <section className="last-minute-shell">
      <div className="last-minute-head">
        <button type="button" onClick={onBack}>
          <ArrowLeft size={18} />
          Volver
        </button>
        <div>
          <p className="eyebrow">10 minutos antes del examen</p>
          <h2>Solo lo que mas cae y mas se confunde</h2>
        </div>
      </div>

      <div className="last-minute-grid">
        {Object.entries(groups).map(([topic, topicCards]) => {
          const relatedIds = [...new Set(topicCards.flatMap((card) => card.relatedQuestionIds || []))];
          return (
            <article className="last-minute-block" key={topic}>
              <div className="last-minute-title">
                <Zap size={19} />
                <h3>{topic}</h3>
              </div>
              <ul>
                {topicCards.slice(0, 6).map((card) => (
                  <li key={card.id}>
                    {card.formula && <MathText as="div" block className="math-card-formula compact">{card.formula}</MathText>}
                    <MathText as="span">{card.miniEjemplo}</MathText>
                    <MathText as="em">{card.errorTipico}</MathText>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => onPractice({ relatedQuestionIds: relatedIds })} disabled={!relatedIds.length}>
                <BookOpen size={18} />
                Hacer preguntas de este tema
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
