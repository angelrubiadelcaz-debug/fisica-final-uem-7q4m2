import { ArrowLeft, ArrowRight, CheckCircle2, Flag, Send } from "lucide-react";
import MathText from "./MathText";
import TheoryBox from "./TheoryBox";

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

export default function QuestionCard({
  question,
  current,
  total,
  selected,
  mode,
  theoryMode,
  onSelect,
  onPrevious,
  onNext,
  onFinish,
}) {
  const answered = selected !== undefined;
  const showFeedback = mode === "repaso" && answered;

  return (
    <section className="question-shell">
      <div className="quiz-topline">
        <span>
          Pregunta {current + 1} de {total}
        </span>
        <span>{question.dificultad}</span>
      </div>

      <div className="question-layout">
        <article className="question-card">
          <div className="topic-line">
            <Flag size={18} />
            <span>{question.tema}</span>
          </div>
          <p className="subtopic">{question.subtema}</p>
          {question.statementCard ? (
            <div className="statement-card">
              <span>{question.statementCard.label || "Enunciado"}</span>
              <MathText as="h2">{question.enunciado}</MathText>
            </div>
          ) : (
            <MathText as="h2">{question.enunciado}</MathText>
          )}

          <div className="options-list">
            {question.opciones.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = question.correcta === index;
              const feedbackClass = showFeedback && isCorrect ? "correct" : showFeedback && isSelected ? "wrong" : "";
              return (
                <button
                  key={option}
                  className={`option-button ${isSelected ? "selected" : ""} ${feedbackClass}`}
                  type="button"
                  onClick={() => onSelect(index)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <MathText>{option}</MathText>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={selected === question.correcta ? "feedback correct-box" : "feedback wrong-box"}>
              <CheckCircle2 size={18} />
              <div>
                <strong>{selected === question.correcta ? "Correcta" : "Revisa esta"}</strong>
                <MathText as="p">{question.explicacion}</MathText>
                {question.formula && <MathText as="div" block className="math-card-formula">{question.formula}</MathText>}
                <SolutionDetails question={question} />
              </div>
            </div>
          )}
        </article>

        <TheoryBox question={question} mode={mode} theoryMode={theoryMode} />
      </div>

      <div className="quiz-nav">
        <button type="button" onClick={onPrevious} disabled={current === 0}>
          <ArrowLeft size={18} />
          Anterior
        </button>
        {current < total - 1 ? (
          <button className="primary" type="button" onClick={onNext}>
            Siguiente
            <ArrowRight size={18} />
          </button>
        ) : (
          <button className="primary" type="button" onClick={onFinish}>
            Corregir
            <Send size={18} />
          </button>
        )}
      </div>
    </section>
  );
}
