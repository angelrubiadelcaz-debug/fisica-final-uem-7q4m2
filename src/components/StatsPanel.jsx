import { RotateCcw, Trash2 } from "lucide-react";

function percent(correct, answered) {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

export default function StatsPanel({ progress, onReset, onPracticeFailed, failedCount }) {
  const topicFailures = Object.entries(progress.wrongByTopic).sort((a, b) => b[1] - a[1]);
  const difficultyFailures = Object.entries(progress.wrongByDifficulty).sort((a, b) => b[1] - a[1]);

  return (
    <section className="stats-shell">
      <div className="stat-grid">
        <div className="stat-card">
          <strong>{progress.attempts}</strong>
          <span>Intentos</span>
        </div>
        <div className="stat-card good">
          <strong>{progress.correct}</strong>
          <span>Aciertos</span>
        </div>
        <div className="stat-card bad">
          <strong>{progress.wrong}</strong>
          <span>Fallos</span>
        </div>
        <div className="stat-card">
          <strong>{percent(progress.correct, progress.answered)}%</strong>
          <span>Global</span>
        </div>
      </div>

      <div className="stats-actions">
        <button type="button" onClick={onPracticeFailed} disabled={!failedCount}>
          <RotateCcw size={18} />
          Practicar falladas {failedCount ? `(${failedCount})` : ""}
        </button>
        <button type="button" onClick={onReset}>
          <Trash2 size={18} />
          Reiniciar progreso
        </button>
      </div>

      <div className="stats-grid">
        <article className="weak-topics">
          <h3>Temas con mas errores</h3>
          {topicFailures.length ? (
            topicFailures.map(([topic, count]) => (
              <div className="weak-topic" key={topic}>
                <span>{topic}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p>Aun no hay errores registrados.</p>
          )}
        </article>

        <article className="weak-topics">
          <h3>Dificultad donde mas fallo</h3>
          {difficultyFailures.length ? (
            difficultyFailures.map(([difficulty, count]) => (
              <div className="weak-topic" key={difficulty}>
                <span>{difficulty}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p>Aun no hay errores registrados.</p>
          )}
        </article>
      </div>

      <article className="weak-topics">
        <h3>Ultimos intentos</h3>
        {progress.history.length ? (
          progress.history.map((item) => (
            <div className="weak-topic" key={item.date}>
              <span>
                {new Date(item.date).toLocaleString()} - {item.total} preguntas
              </span>
              <strong>{item.percent}%</strong>
            </div>
          ))
        ) : (
          <p>Haz un test para empezar a guardar estadisticas.</p>
        )}
      </article>
    </section>
  );
}
