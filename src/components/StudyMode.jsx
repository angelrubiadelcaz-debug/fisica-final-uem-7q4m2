import { BookOpen, Clock, HelpCircle, Play, RotateCcw, Search, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  clearStudyProgress,
  getStudyCardState,
  loadStudyProgress,
  markStudyCard,
  saveStudyProgress,
} from "../utils/progressRepository";
import ExamLastMinute from "./ExamLastMinute";
import QuickReview from "./QuickReview";
import CardQuizMode from "./study/CardQuizMode";
import StudyCard from "./StudyCard";
import StudyProgress from "./StudyProgress";

const priorityLabels = {
  all: "Todas",
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

const statusFilters = [
  { value: "all", label: "Todas" },
  { value: "dominado", label: "Me las se" },
  { value: "dudoso", label: "Dudosas" },
  { value: "repasar", label: "No me las se" },
  { value: "needs-review", label: "Dudosas + no sabidas" },
  { value: "sin-marcar", label: "Sin marcar" },
];

export default function StudyMode({ initialView = "cards", onPracticeConcept, cards = [], topics = [], course }) {
  const [topic, setTopic] = useState("all");
  const [priority, setPriority] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState(initialView);
  const [reviewCards, setReviewCards] = useState([]);
  const [progress, setProgress] = useState(() => loadStudyProgress());
  const courseId = course?.id || "physics";

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    saveStudyProgress(progress);
  }, [progress]);

  useEffect(() => {
    setTopic("all");
    setPriority("all");
    setStatusFilter("all");
    setSearch("");
    setReviewCards([]);
    setProgress(loadStudyProgress());
  }, [courseId]);

  useEffect(() => {
    function reloadProgress() {
      setProgress(loadStudyProgress());
    }

    window.addEventListener("fisica-progress-reloaded", reloadProgress);
    return () => window.removeEventListener("fisica-progress-reloaded", reloadProgress);
  }, []);

  const baseVisibleCards = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards.filter((card) => {
      const topicMatch = topic === "all" || card.tema === topic;
      const priorityMatch = priority === "all" || card.prioridad === priority;
      const haystack = [
        card.tema,
        card.subtema,
        card.titulo,
        card.explicacionCorta,
        card.formula,
        card.errorTipico,
        (card.etiquetas || []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return topicMatch && priorityMatch && (!query || haystack.includes(query));
    });
  }, [cards, topic, priority, search]);

  const visibleCards = useMemo(
    () =>
      baseVisibleCards.filter((card) => {
        const status = getStudyCardState(progress, card.id).status;
        if (statusFilter === "all") return true;
        if (statusFilter === "needs-review") return status === "dudoso" || status === "repasar";
        return status === statusFilter;
      }),
    [baseVisibleCards, progress, statusFilter],
  );

  const needsReviewCards = useMemo(
    () =>
      baseVisibleCards.filter((card) => {
        const status = getStudyCardState(progress, card.id).status;
        return status === "dudoso" || status === "repasar";
      }),
    [baseVisibleCards, progress],
  );

  const statusCounts = useMemo(
    () =>
      baseVisibleCards.reduce(
        (counts, card) => {
          const status = getStudyCardState(progress, card.id).status;
          counts[status] = (counts[status] || 0) + 1;
          if (status === "dudoso" || status === "repasar") counts["needs-review"] += 1;
          return counts;
        },
        { all: baseVisibleCards.length, dominado: 0, dudoso: 0, repasar: 0, "needs-review": 0, "sin-marcar": 0 },
      ),
    [baseVisibleCards, progress],
  );

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
    return <ExamLastMinute cards={cards} onBack={() => setView("cards")} onPractice={onPracticeConcept} />;
  }

  if (view === "ask") {
    return (
      <CardQuizMode
        cards={cards}
        topics={topics}
        onBack={() => setView("cards")}
        onMark={mark}
      />
    );
  }

  return (
    <section className="study-shell">
      <div className="study-hero">
        <div>
          <p className="eyebrow">Modo estudio</p>
          <h2>Estudiar rapido</h2>
          <p>{course?.studyDescription || "Tarjetas cortas para reconocer conceptos, formulas y trampas de test."}</p>
        </div>
        <div className="study-hero-actions">
          <button className="primary" type="button" onClick={() => startReview(visibleCards)} disabled={!visibleCards.length}>
            <Play size={18} />
            Repasar todo
          </button>
          <button type="button" onClick={() => startReview(needsReviewCards)} disabled={!needsReviewCards.length}>
            <RotateCcw size={18} />
            Repasar dudosas/no sabidas
          </button>
          <button type="button" onClick={() => setView("ask")}>
            <HelpCircle size={18} />
            Preguntame
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
                {topics.map((item) => (
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
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={course?.searchPlaceholder || "Doppler, Carnot, Gauss..."} />
            </label>
          </div>

          <div className="study-filter-row" aria-label="Filtro de tarjetas por estado">
            {statusFilters.map((item) => (
              <button
                key={item.value}
                className={statusFilter === item.value ? "active" : ""}
                type="button"
                onClick={() => setStatusFilter(item.value)}
              >
                {item.label}
                <span>{statusCounts[item.value] || 0}</span>
              </button>
            ))}
          </div>

          <div className="study-count-line">
            <BookOpen size={18} />
            <span>{visibleCards.length} tarjetas visibles</span>
            <RotateCcw size={18} />
            <span>{needsReviewCards.length} dudosas/no sabidas</span>
            <Zap size={18} />
            <span>{cards.filter((card) => card.prioridad === "alta").length} de prioridad alta</span>
          </div>

          <div className="actions-row">
            <button type="button" onClick={() => onPracticeConcept({ cards: visibleCards })} disabled={!visibleCards.length}>
              <BookOpen size={18} />
              Hacer test de este tema
            </button>
            <button type="button" onClick={() => startReview(needsReviewCards)} disabled={!needsReviewCards.length}>
              <RotateCcw size={18} />
              Repasar dudosas/no sabidas
            </button>
            <button type="button" onClick={() => onPracticeConcept({ cards: needsReviewCards })} disabled={!needsReviewCards.length}>
              <RotateCcw size={18} />
              Hacer test de lo que no me se
            </button>
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

        <StudyProgress cards={cards} progress={progress} onReset={resetProgress} />
      </div>
    </section>
  );
}
