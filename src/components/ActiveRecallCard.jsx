import { Eye, HelpCircle } from "lucide-react";

export default function ActiveRecallCard({ card, revealed, onReveal }) {
  return (
    <article className="active-card">
      <p className="eyebrow">{card.tema}</p>
      <h2>{card.titulo}</h2>
      <div className="active-question">
        <HelpCircle size={22} />
        <p>{card.preguntaActiva}</p>
      </div>
      {revealed ? (
        <div className="active-answer">
          <strong>Respuesta</strong>
          <p>{card.respuestaActiva}</p>
          {card.formula && <code>{card.formula}</code>}
          <p className="mistake-line">{card.errorTipico}</p>
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
