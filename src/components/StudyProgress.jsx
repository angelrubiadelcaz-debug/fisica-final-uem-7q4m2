import { Trash2 } from "lucide-react";
import { getStudySummary } from "../utils/studyStorage";

export default function StudyProgress({ cards, progress, onReset }) {
  const summary = getStudySummary(cards, progress);
  const reviewed = summary.dominadas + summary.dudosas + summary.repasar;
  const percent = cards.length ? Math.round((summary.dominadas / cards.length) * 100) : 0;

  return (
    <aside className="study-progress">
      <div className="study-progress-head">
        <div>
          <p className="eyebrow">Progreso</p>
          <h3>{percent}% dominado</h3>
        </div>
        <button type="button" onClick={onReset}>
          <Trash2 size={16} />
          Borrar
        </button>
      </div>
      <div className="mini-progress" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="study-stat-grid">
        <div>
          <strong>{summary.dominadas}</strong>
          <span>Entendidas</span>
        </div>
        <div>
          <strong>{summary.dudosas}</strong>
          <span>Dudosas</span>
        </div>
        <div>
          <strong>{summary.repasar}</strong>
          <span>Repasar</span>
        </div>
        <div>
          <strong>{reviewed}</strong>
          <span>Vistas</span>
        </div>
      </div>
    </aside>
  );
}
