import { BarChart3, BookOpen, Brain, ClipboardList, Home, ListChecks } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import FormulaPanel from "./components/FormulaPanel";
import QuestionCard from "./components/QuestionCard";
import ResultsPanel from "./components/ResultsPanel";
import SetupPanel from "./components/SetupPanel";
import StatsPanel from "./components/StatsPanel";
import StudyMode from "./components/StudyMode";
import { questions, topics } from "./data/questions";
import { getFilteredQuestions, gradeQuiz, pickQuestions } from "./utils/quiz";
import { clearProgress, loadProgress, mergeResultIntoProgress, saveProgress } from "./utils/storage";

const DEFAULT_COUNT = 20;

export default function App() {
  const [section, setSection] = useState("test");
  const [studyView, setStudyView] = useState("cards");
  const [selectedTopics, setSelectedTopics] = useState(["all"]);
  const [difficulty, setDifficulty] = useState("all");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [mode, setMode] = useState("examen");
  const [theoryMode, setTheoryMode] = useState("con-teoria");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const pool = useMemo(
    () => getFilteredQuestions(questions, selectedTopics, difficulty, search),
    [selectedTopics, difficulty, search],
  );
  const failedQuestions = useMemo(
    () => questions.filter((question) => progress.failedIds.includes(question.id)),
    [progress.failedIds],
  );
  const maxCount = pool.length;
  const testActive = quizQuestions.length > 0 && !result;

  function syncCount(nextMax) {
    setCount((currentCount) => Math.min(Math.max(1, currentCount), Math.max(1, nextMax)));
  }

  function updateSelectedTopics(nextTopics) {
    const normalized = nextTopics.length === 0 ? ["all"] : nextTopics;
    setSelectedTopics(normalized);
    syncCount(getFilteredQuestions(questions, normalized, difficulty, search).length);
  }

  function toggleTopic(topic) {
    if (topic === "all") {
      updateSelectedTopics(["all"]);
      return;
    }
    const withoutAll = selectedTopics.filter((item) => item !== "all");
    const nextTopics = withoutAll.includes(topic)
      ? withoutAll.filter((item) => item !== topic)
      : [...withoutAll, topic];
    updateSelectedTopics(nextTopics);
  }

  function handleDifficultyChange(value) {
    setDifficulty(value);
    syncCount(getFilteredQuestions(questions, selectedTopics, value, search).length);
  }

  function handleSearchChange(value) {
    setSearch(value);
    syncCount(getFilteredQuestions(questions, selectedTopics, difficulty, value).length);
  }

  function beginQuiz(nextQuestions, nextMode = mode) {
    setQuizQuestions(nextQuestions);
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setMode(nextMode);
    setSection("test");
  }

  function goStudy(nextView = "cards") {
    setStudyView(nextView);
    setSection("study");
    setResult(null);
    setQuizQuestions([]);
  }

  function startQuiz() {
    beginQuiz(pickQuestions(pool, count));
  }

  function startFinalSimulation() {
    const fullPool = getFilteredQuestions(questions, ["all"], "all", "");
    setSelectedTopics(["all"]);
    setDifficulty("all");
    setSearch("");
    setCount(Math.min(count, fullPool.length));
    beginQuiz(pickQuestions(fullPool, Math.min(count, fullPool.length)), "examen");
  }

  function practiceFailed() {
    if (!failedQuestions.length) return;
    beginQuiz(pickQuestions(failedQuestions, failedQuestions.length), "repaso");
  }

  function practiceStudyConcept(card) {
    const related = questions.filter((question) => card.relatedQuestionIds.includes(question.id));
    if (!related.length) return;
    setTheoryMode("con-teoria");
    beginQuiz(pickQuestions(related, Math.min(12, related.length)), "repaso");
  }

  function finishQuiz() {
    const nextResult = gradeQuiz(quizQuestions, answers);
    setResult(nextResult);
    setProgress((currentProgress) => mergeResultIntoProgress(currentProgress, nextResult));
  }

  function retrySameQuiz() {
    beginQuiz(quizQuestions, mode);
  }

  function resetToSetup() {
    setQuizQuestions([]);
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setSection("test");
  }

  function resetProgress() {
    clearProgress();
    setProgress(loadProgress());
  }

  function selectAnswer(optionIndex) {
    const question = quizQuestions[current];
    setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }));
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Fundamentos Fisicos</p>
          <h1>Test Final de Fisica</h1>
        </div>
        <nav className="top-tabs" aria-label="Secciones">
          <button className={section === "test" ? "active" : ""} type="button" onClick={() => setSection("test")}>
            <ClipboardList size={18} />
            Test
          </button>
          <button className={section === "formulas" ? "active" : ""} type="button" onClick={() => setSection("formulas")}>
            <BookOpen size={18} />
            Formulario
          </button>
          <button className={section === "study" ? "active" : ""} type="button" onClick={() => goStudy("cards")}>
            <Brain size={18} />
            Estudiar rapido
          </button>
          <button className={section === "stats" ? "active" : ""} type="button" onClick={() => setSection("stats")}>
            <BarChart3 size={18} />
            Estadisticas
          </button>
          {(testActive || result) && (
            <button type="button" onClick={resetToSetup}>
              <Home size={18} />
              Inicio
            </button>
          )}
        </nav>
      </header>

      {section === "formulas" ? (
        <FormulaPanel />
      ) : section === "study" ? (
        <StudyMode initialView={studyView} onPracticeConcept={practiceStudyConcept} />
      ) : section === "stats" ? (
        <StatsPanel progress={progress} onReset={resetProgress} onPracticeFailed={practiceFailed} failedCount={failedQuestions.length} />
      ) : result ? (
        <ResultsPanel
          result={result}
          onRetry={retrySameQuiz}
          onPracticeFailed={practiceFailed}
          onNewQuiz={resetToSetup}
        />
      ) : testActive ? (
        <>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <QuestionCard
            question={quizQuestions[current]}
            current={current}
            total={quizQuestions.length}
            selected={answers[quizQuestions[current].id]}
            mode={mode}
            theoryMode={theoryMode}
            onSelect={selectAnswer}
            onPrevious={() => setCurrent((value) => Math.max(0, value - 1))}
            onNext={() => setCurrent((value) => Math.min(quizQuestions.length - 1, value + 1))}
            onFinish={finishQuiz}
          />
          <div className="answer-map">
            {quizQuestions.map((question, index) => (
              <button
                className={`${index === current ? "active" : ""} ${answers[question.id] !== undefined ? "answered" : ""}`}
                type="button"
                key={question.id}
                onClick={() => setCurrent(index)}
                aria-label={`Ir a pregunta ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <SetupPanel
            topics={topics}
            selectedTopics={selectedTopics}
            difficulty={difficulty}
            search={search}
            count={Math.min(count, Math.max(1, maxCount))}
            maxCount={maxCount}
            mode={mode}
            theoryMode={theoryMode}
            failedCount={failedQuestions.length}
            onTopicToggle={toggleTopic}
            onDifficultyChange={handleDifficultyChange}
            onSearchChange={handleSearchChange}
            onCountChange={setCount}
            onModeChange={setMode}
            onTheoryModeChange={setTheoryMode}
            onStart={startQuiz}
            onStartFinal={startFinalSimulation}
            onPracticeFailed={practiceFailed}
            onGoStudy={() => goStudy("cards")}
            onGoLastMinute={() => goStudy("last-minute")}
            onGoFormulas={() => setSection("formulas")}
            onGoStats={() => setSection("stats")}
          />
          <section className="coverage-strip">
            <div>
              <ListChecks size={20} />
              <span>{questions.length} preguntas</span>
            </div>
            {topics.map((item) => {
              const amount = questions.filter((question) => question.tema === item).length;
              return (
                <div key={item}>
                  <span>{item.split(":")[0]}</span>
                  <strong>{amount}</strong>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
