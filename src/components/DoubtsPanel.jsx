import { Brain, BookOpen, HelpCircle, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { studyCards } from "../data/studyCards";
import { getStudyCardState } from "../utils/studyStorage";
import { loadStudyProgress, loadTutorProgress } from "../utils/progressRepository";
import MathText from "./MathText";

export default function DoubtsPanel({ onGoStudy, onPracticeCards }) {
  const tutorProgress = loadTutorProgress();
  const studyProgress = loadStudyProgress();

  const weakCards = useMemo(
    () => studyCards.filter((card) => ["repasar", "dudoso"].includes(getStudyCardState(studyProgress, card.id).status)),
    [studyProgress],
  );

  const topTopics = Object.entries(tutorProgress.topicCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const recommendations = topTopics.length
    ? topTopics.slice(0, 3).map(([topic]) => `Repasa ${topic}`)
    : weakCards.slice(0, 3).map((card) => `Vuelve a mirar ${card.titulo}`);

  return (
    <section className="doubts-shell">
      <div className="study-hero">
        <div>
          <p className="eyebrow">Mis dudas</p>
          <h2>Lo que mas conviene repasar</h2>
          <p>Dudas del tutor, tarjetas flojas y recomendaciones rapidas.</p>
        </div>
        <button className="primary" type="button" onClick={onGoStudy}>
          <Brain size={18} />
          Ir a estudiar rapido
        </button>
      </div>

      <div className="stats-grid">
        <article className="weak-topics">
          <h3>Ultimas dudas preguntadas</h3>
          {tutorProgress.doubts?.length ? (
            tutorProgress.doubts.slice(0, 8).map((doubt) => (
              <div className="doubt-item" key={doubt.id}>
                <HelpCircle size={17} />
                <div>
                  <MathText as="strong">{doubt.message}</MathText>
                  <span>{new Date(doubt.date).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Aun no has preguntado nada al tutor.</p>
          )}
        </article>

        <article className="weak-topics">
          <h3>Temas mas consultados</h3>
          {topTopics.length ? (
            topTopics.map(([topic, count]) => (
              <div className="weak-topic" key={topic}>
                <span>{topic}</span>
                <strong>{count}</strong>
              </div>
            ))
          ) : (
            <p>Cuando uses el tutor, aqui apareceran los temas donde mas dudas tengas.</p>
          )}
        </article>
      </div>

      <article className="weak-topics">
        <h3>Tarjetas para reforzar</h3>
        {weakCards.length ? (
          weakCards.slice(0, 10).map((card) => (
            <div className="weak-topic" key={card.id}>
              <span>{card.titulo}</span>
              <button type="button" onClick={() => onPracticeCards([card])}>
                <BookOpen size={16} />
                Test
              </button>
            </div>
          ))
        ) : (
          <p>No tienes tarjetas marcadas como dudosas o para repasar.</p>
        )}
      </article>

      <article className="weak-topics">
        <h3>Recomendaciones</h3>
        {recommendations.length ? (
          recommendations.map((item) => (
            <div className="weak-topic" key={item}>
              <span>{item}</span>
              <RotateCcw size={17} />
            </div>
          ))
        ) : (
          <p>Haz algunas preguntas al tutor o marca tarjetas para generar recomendaciones.</p>
        )}
      </article>
    </section>
  );
}
