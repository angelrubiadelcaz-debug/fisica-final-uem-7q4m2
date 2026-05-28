import { Eye, HelpCircle } from "lucide-react";
import MathText from "./MathText";

export default function ActiveRecallCard({ card, revealed, onReveal }) {
  return (
    <article className="active-card">
      <p className="eyebrow">{card.tema}</p>
      <h2>{card.titulo}</h2>
      <div className="active-question">
        <HelpCircle size={22} />
        <MathText as="p">{card.preguntaActiva}</MathText>
      </div>
      {revealed ? (
        <div className="active-answer">
          <strong>Respuesta</strong>
          <MathText as="p">{card.respuestaActiva}</MathText>
          {card.formula && <MathText as="div" block className="math-card-formula">{card.formula}</MathText>}
          <MathText as="p" className="mistake-line">{card.errorTipico}</MathText>
        </div>
      ) : (
        <button className="primary big-action" type="button" onClick={onReveal}>
          <Eye size={20} />
          Ver respuesta
        </button>
      )}
    </article>
  );
}
