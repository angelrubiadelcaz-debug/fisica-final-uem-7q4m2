import { BookOpen, CheckCircle2, Eye, EyeOff, HelpCircle, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import { getStudyCardState } from "../utils/studyStorage";

const statusLabel = {
  dominado: "Entendido",
  dudoso: "Dudoso",
  repasar: "Repasar",
  "sin-marcar": "Sin marcar",
};

export default function StudyCard({ card, progress, onMark, onPractice }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const state = getStudyCardState(progress, card.id);

  return (
    <article className={`study-card priority-${card.prioridad}`}>
      <div className="study-card-top">
        <div>
          <span className="formula-topic">{card.tema}</span>
          <h3>{card.titulo}</h3>
        </div>
        <span className={`study-status status-${state.status}`}>{statusLabel[state.status]}</span>
      </div>

      <p className="study-short">{card.explicacionCorta}</p>

      {card.formula && (
        <div className="formula-highlight">
          <span>Formula</span>
          <code>{card.formula}</code>
        </div>
      )}

      <button className="soft-toggle" type="button" onClick={() => setShowDetails((value) => !value)}>
        {showDetails ? <EyeOff size={17} /> : <Eye size={17} />}
        {showDetails ? "Ocultar detalles" : "Ver detalles"}
      </button>

      {showDetails && (
        <div className="study-detail-grid">
          {card.variables.length > 0 && (
            <div>
              <strong>Variables</strong>
              <ul>
                {card.variables.map((variable) => (
                  <li key={variable}>{variable}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <strong>Cuando se usa</strong>
            <p>{card.cuandoSeUsa}</p>
          </div>
          <div className="mistake-box">
            <strong>Error tipico</strong>
            <p>{card.errorTipico}</p>
          </div>
          <div>
            <strong>Mini ejemplo</strong>
            <p>{card.miniEjemplo}</p>
          </div>
        </div>
      )}

      <div className="active-recall-box">
        <div>
          <HelpCircle size={18} />
          <strong>Pregunta rapida</strong>
        </div>
        <p>{card.preguntaActiva}</p>
        {showAnswer ? (
          <p className="recall-answer">{card.respuestaActiva}</p>
        ) : (
          <p className="recall-hidden">Intenta responder antes de abrir.</p>
        )}
        <button type="button" onClick={() => setShowAnswer((value) => !value)}>
          {showAnswer ? <EyeOff size={17} /> : <Eye size={17} />}
          {showAnswer ? "Ocultar respuesta" : "Ver respuesta"}
        </button>
      </div>

      <div className="study-actions">
        <button className="primary" type="button" onClick={() => onMark(card.id, "dominado")}>
          <CheckCircle2 size={18} />
          Entendido
        </button>
        <button type="button" onClick={() => onMark(card.id, "dudoso")}>
          <RotateCcw size={18} />
          Repasar luego
        </button>
        <button type="button" onClick={() => onMark(card.id, "repasar")}>
          <XCircle size={18} />
          No me lo se
        </button>
        <button type="button" onClick={() => onPractice(card)} disabled={!card.relatedQuestionIds.length}>
          <BookOpen size={18} />
          Hacer preguntas de este concepto
        </button>
      </div>
    </article>
  );
}
