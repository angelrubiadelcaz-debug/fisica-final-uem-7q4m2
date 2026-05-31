import { Eye, EyeOff, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import MathText from "./MathText";

export default function TheoryBox({ question, mode, theoryMode }) {
  const [open, setOpen] = useState(mode === "repaso" || theoryMode === "con-teoria");

  useEffect(() => {
    setOpen(mode === "repaso" || theoryMode === "con-teoria");
  }, [question.id, mode, theoryMode]);

  return (
    <aside className="theory-box">
      <div className="theory-heading">
        <div>
          <p className="eyebrow">Ayuda de estudio</p>
          <h3>Teoria relacionada</h3>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? <EyeOff size={17} /> : <Eye size={17} />}
          {open ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {open ? (
        <div className="theory-content">
          <div className="type-pill">
            <Lightbulb size={16} />
            {question.tipo}
          </div>
          <MathText as="p">{question.teoria}</MathText>
          <dl>
            <div>
              <dt>Tema</dt>
              <dd>{question.tema}</dd>
            </div>
            <div>
              <dt>Subtema</dt>
              <dd>{question.subtema}</dd>
            </div>
            <div>
              <dt>Dificultad</dt>
              <dd>{question.dificultad}</dd>
            </div>
            {question.sourceLabel && (
              <div>
                <dt>Fuente</dt>
                <dd>{question.sourceLabel}</dd>
              </div>
            )}
          </dl>
        </div>
      ) : (
        <p className="theory-closed">La teoria esta oculta. Puedes abrirla sin ver la solucion.</p>
      )}
    </aside>
  );
}
