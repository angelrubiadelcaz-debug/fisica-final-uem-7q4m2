import { BarChart3, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import MathText from "./MathText";

function SolutionDetails({ question }) {
  const steps = question.solucion || question.solucionPasoAPaso || [];
  const normalizedSteps = Array.isArray(steps) ? steps : [steps];

  if (!normalizedSteps.length && !question.trampaTipica && !question.importancia) return null;

  return (
    <div className="question-solution-stack">
      {question.importancia && <span className="importance-pill">{question.importancia}</span>}
      {normalizedSteps.length > 0 && (
        <section className="solution-box">
          <strong>Solucion paso a paso</strong>
          {normalizedSteps.map((step) => (
            <MathText as="p" key={step}>{step}</MathText>
          ))}
        </section>
      )}
      {question.trampaTipica && (
        <section className="mistake-box solution-mistake">
          <strong>Trampa tipica</strong>
          <MathText as="p">{question.trampaTipica}</MathText>
        </section>
      )}
    </div>
  );
}

export default function ResultsPanel({ result, onRetry, onPracticeFailed, onNewQuiz }) {
  const topicFailures = Object.entries(result.wrongByTopic).sort((a, b) => b[1] - a[1]);
  const difficultyFailures = Object.entries(result.wrongByDifficulty).sort((a, b) => b[1] - a[1]);
  const failedCount = result.details.filter((item) => !item.isCorrect).length;

  return (
    <section className="results-shell">
      <div className="result-hero">
        <div>
          <p className="eyebrow">Resultado</p>
          <h2>{result.percent}%</h2>
          <p>
            {result.correct} aciertos y {result.wrong} fallos
          </p>
        </div>
        <div className="score-ring" style={{ "--score": `${result.percent * 3.6}deg` }}>
          <span>{result.percent}</span>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card good">
          <CheckCircle2 size={20} />
          <strong>{result.correct}</strong>
          <span>Aciertos</span>
        </div>
        <div className="stat-card bad">
          <XCircle size={20} />
          <strong>{result.wrong}</strong>
          <span>Fallos</span>
        </div>
        <div className="stat-card">
          <BarChart3 size={20} />
          <strong>{result.details.length}</strong>
          <span>Total</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="weak-topics">
          <h3>Temas donde mas fallo</h3>
          {topicFailures.length === 0 ? (
            <p>Sin fallos en este intento.</p>
          ) : (
            topicFailures.slice(0, 4).map(([topic, count]) => (
              <div className="weak-topic" key={topic}>
                <span>{topic}</span>
                <strong>{count}</strong>
              </div>
            ))
          )}
        </div>
        <div className="weak-topics">
          <h3>Dificultad donde mas fallo</h3>
          {difficultyFailures.length === 0 ? (
            <p>Sin fallos en este intento.</p>
          ) : (
            difficultyFailures.map(([difficulty, count]) => (
              <div className="weak-topic" key={difficulty}>
                <span>{difficulty}</span>
                <strong>{count}</strong>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="actions-row">
        <button className="primary" type="button" onClick={onRetry}>
          <RotateCcw size={18} />
          Repetir test
        </button>
        <button type="button" onClick={onPracticeFailed} disabled={failedCount === 0}>
          <XCircle size={18} />
          Practicar falladas
        </button>
        <button type="button" onClick={onNewQuiz}>
          Nuevo test
        </button>
      </div>

      <div className="review-list">
        {result.details.map(({ question, selected, isCorrect }, index) => (
          <article className="review-card" key={question.id}>
            <div className="review-heading">
              <span>Pregunta {index + 1}</span>
              <strong className={isCorrect ? "ok-text" : "ko-text"}>{isCorrect ? "Correcta" : "Incorrecta"}</strong>
            </div>
            <MathText as="h3">{question.enunciado}</MathText>
            <div className="review-options">
              {question.opciones.map((option, optionIndex) => {
                const isAnswer = optionIndex === question.correcta;
                const isSelected = optionIndex === selected;
                return (
                  <div
                    className={`review-option ${isAnswer ? "correct" : ""} ${isSelected && !isAnswer ? "wrong" : ""}`}
                    key={option}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    <MathText as="p">{option}</MathText>
                  </div>
                );
              })}
            </div>
            <MathText as="p" className="explanation">{question.explicacion}</MathText>
            {question.formula && <MathText as="div" block className="math-card-formula">{question.formula}</MathText>}
            <SolutionDetails question={question} />
          </article>
        ))}
      </div>
    </section>
  );
}
