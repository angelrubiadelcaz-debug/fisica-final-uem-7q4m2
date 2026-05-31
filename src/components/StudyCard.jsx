import { BookOpen, CheckCircle2, Eye, EyeOff, HelpCircle, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import { getStudyCardState } from "../utils/studyStorage";
import MathText from "./MathText";

const statusLabel = {
  dominado: "Entendido",
  dudoso: "Dudoso",
  repasar: "Repasar",
  "sin-marcar": "Sin marcar",
};

function DetailContent({ value, list = false }) {
  if (!value || (Array.isArray(value) && !value.length)) return null;
  const items = Array.isArray(value) ? value : [value];

  if (list) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item}>
            <MathText>{item}</MathText>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="detail-paragraph-stack">
      {items.map((item) => (
        <MathText as="p" key={item}>{item}</MathText>
      ))}
    </div>
  );
}

function DetailBlock({ title, value, list = false, className = "" }) {
  if (!value || (Array.isArray(value) && !value.length)) return null;
  return (
    <section className={className}>
      <strong>{title}</strong>
      <DetailContent value={value} list={list} />
    </section>
  );
}

export default function StudyCard({ card, progress, onMark, onPractice }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const state = getStudyCardState(progress, card.id);
  const details = card.details || {};

  return (
    <article className={`study-card priority-${card.prioridad}`}>
      <div className="study-card-top">
        <div>
          <span className="formula-topic">{card.tema}</span>
          <h3>{card.titulo}</h3>
          {card.importancia && <span className="importance-pill compact">{card.importancia}</span>}
        </div>
        <span className={`study-status status-${state.status}`}>{statusLabel[state.status]}</span>
      </div>

      <div className="study-idea">
        <span>Idea clave</span>
        <MathText as="p" className="study-short">{card.explicacionCorta}</MathText>
      </div>

      {card.formula && (
        <div className="formula-highlight">
          <span>Formula</span>
          <MathText as="div" block className="math-card-formula">{card.formula}</MathText>
        </div>
      )}

      <button className="soft-toggle" type="button" onClick={() => setShowDetails((value) => !value)}>
        {showDetails ? <EyeOff size={17} /> : <Eye size={17} />}
        {showDetails ? "Ocultar detalles" : "Ver explicacion completa"}
      </button>

      {showDetails && (
        <div className="study-detail-panel">
          <DetailBlock title="Explicacion del concepto" value={details.explanation} />
          <DetailBlock title="Significado fisico de la formula" value={details.physicalMeaning} />
          <DetailBlock title="Variables" value={details.variables || card.variables} list />
          <DetailBlock title="Cuando se usa" value={details.whenToUse || card.cuandoSeUsa} list={Array.isArray(details.whenToUse)} />
          <DetailBlock title="Como reconocerlo en un enunciado" value={details.recognition} />
          <DetailBlock title="Mini ejemplo" value={details.miniExample || card.miniEjemplo} />
          <DetailBlock title="Error tipico" value={details.commonMistake || card.errorTipico} className="mistake-box" />
          <DetailBlock title="Resumen final para examen" value={details.examSummary} className="exam-summary-box" />
        </div>
      )}

      <div className="active-recall-box">
        <div>
          <HelpCircle size={18} />
          <strong>Pregunta rapida</strong>
        </div>
        <MathText as="p">{card.preguntaActiva}</MathText>
        {showAnswer ? (
          <MathText as="p" className="recall-answer">{card.respuestaActiva}</MathText>
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
        <button type="button" onClick={() => onPractice(card)} disabled={!(card.relatedQuestionIds || []).length}>
          <BookOpen size={18} />
          Hacer preguntas de este concepto
        </button>
      </div>
    </article>
  );
}
