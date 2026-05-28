import { BookOpen, Clock, Play, RotateCcw, Search, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { studyCards, studyTopics } from "../data/studyCards";
import {
  clearStudyProgress,
  getPendingCards,
  loadStudyProgress,
  markStudyCard,
  saveStudyProgress,
} from "../utils/studyStorage";
import ExamLastMinute from "./ExamLastMinute";
import QuickReview from "./QuickReview";
import StudyCard from "./StudyCard";
import StudyProgress from "./StudyProgress";

const priorityLabels = {
  all: "Todas",
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export default function StudyMode({ initialView = "cards", onPracticeConcept }) {
  const [topic, setTopic] = useState("all");
  const [priority, setPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState(initialView);
  const [reviewCards, setReviewCards] = useState([]);
  const [progress, setProgress] = useState(() => loadStudyProgress());

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    saveStudyProgress(progress);
  }, [progress]);

  const visibleCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    return studyCards.filter((card) => {
      const topicMatch = topic === "all" || card.tema === topic;
      const priorityMatch = priority === "all" || card.prioridad === priority;
      const haystack = [
        card.tema,
        card.subtema,
        card.titulo,
        card.explicacionCorta,
        card.formula,
        card.errorTipico,
        card.etiquetas.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return topicMatch && priorityMatch && (!query || haystack.includes(query));
    });
  }, [topic, priority, search]);

  function mark(cardId, status) {
    setProgress((current) => markStudyCard(current, cardId, status));
  }

  function startReview(cards) {
    setReviewCards(cards);
    setView("review");
  }

  function resetProgress() {
    clearStudyProgress();
    setProgress(loadStudyProgress());
  }

  if (view === "review") {
    return (
      <QuickReview
        cards={reviewCards}
        onExit={() => setView("cards")}
        onMark={mark}
        onRestartWithCards={startReview}
      />
    );
  }

  if (view === "last-minute") {
    return <ExamLastMinute cards={studyCards} onBack={() => setView("cards")} onPractice={onPracticeConcept} />;
  }

  const pending = getPendingCards(visibleCards, progress);

  return (
    <section className="study-shell">
      <div className="study-hero">
        <div>
          <p className="eyebrow">Modo estudio</p>
          <h2>Estudiar rapido</h2>
          <p>Tarjetas cortas para reconocer conceptos, formulas y trampas de test.</p>
        </div>
        <div className="study-hero-actions">
          <button className="primary" type="button" onClick={() => startReview(visibleCards)} disabled={!visibleCards.length}>
            <Play size={18} />
            Repasar todo
          </button>
          <button type="button" onClick={() => startReview(pending)} disabled={!pending.length}>
            <RotateCcw size={18} />
            Repasar solo lo que no me se
          </button>
          <button type="button" onClick={() => setView("last-minute")}>
            <Clock size={18} />
            10 minutos antes del examen
          </button>
        </div>
      </div>

      <div className="study-layout">
        <div className="study-main">
          <div className="study-toolbar">
            <label className="field">
              <span>Tema</span>
              <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                <option value="all">Todos</option>
                {studyTopics.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Prioridad</span>
              <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                {["all", "alta", "media", "baja"].map((value) => (
                  <option key={value} value={value}>
                    {priorityLabels[value]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field search-field">
              <span>Buscar concepto</span>
              <Search size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Doppler, Carnot, Gauss..." />
            </label>
          </div>

          <div className="study-count-line">
            <BookOpen size={18} />
            <span>{visibleCards.length} tarjetas visibles</span>
            <Zap size={18} />
            <span>{studyCards.filter((card) => card.prioridad === "alta").length} de prioridad alta</span>
          </div>

          <div className="study-card-list">
            {visibleCards.map((card) => (
              <StudyCard
                key={card.id}
                card={card}
                progress={progress}
                onMark={mark}
                onPractice={onPracticeConcept}
              />
            ))}
          </div>
        </div>

        <StudyProgress cards={studyCards} progress={progress} onReset={resetProgress} />
      </div>
    </section>
  );
}
