import { BarChart3, BookOpen, Brain, ClipboardList, HelpCircle, Home, ListChecks, Repeat2, Settings } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import FormulaPanel from "./components/FormulaPanel";
import AiTutorButton from "./components/ai/AiTutorButton";
import CourseSelector from "./components/CourseSelector";
import DoubtsPanel from "./components/DoubtsPanel";
import QuestionCard from "./components/QuestionCard";
import ResultsPanel from "./components/ResultsPanel";
import SettingsPanel from "./components/SettingsPanel";
import SetupPanel from "./components/SetupPanel";
import StatsPanel from "./components/StatsPanel";
import StudyMode from "./components/StudyMode";
import UserMenu from "./components/UserMenu";
import { courses, getCourseById } from "./data/courses";
import { isSupabaseConfigured, supabase } from "./lib/supabaseClient";
import {
  clearProgress,
  clearRemoteProgress,
  exportLocalState,
  importLocalState,
  loadProgress,
  mergeResultIntoProgress,
  pushLocalProgress,
  resetLocalProgress,
  saveProgress,
  syncProgress,
} from "./utils/progressRepository";
import { getFilteredQuestions, gradeQuiz, pickQuestions } from "./utils/quiz";
import { loadSelectedCourseId, saveSelectedCourseId, setActiveCourseId } from "./utils/courseStorage";

const DEFAULT_COUNT = 20;

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    const storedCourseId = loadSelectedCourseId();
    setActiveCourseId(storedCourseId || "physics");
    return storedCourseId;
  });
  const course = getCourseById(selectedCourseId);
  const questions = course?.data.questions || [];
  const topics = course?.data.topics || [];
  const questionTypes = course?.data.questionTypes || [];
  const formulas = course?.data.formulas || course?.data.cheatsheet || [];
  const studyCards = course?.data.studyCards || [];
  const studyTopics = course?.data.studyTopics || [];
  const [section, setSection] = useState("test");
  const [studyView, setStudyView] = useState("cards");
  const [selectedTopics, setSelectedTopics] = useState(["all"]);
  const [difficulty, setDifficulty] = useState("all");
  const [questionType, setQuestionType] = useState("all");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [mode, setMode] = useState("examen");
  const [theoryMode, setTheoryMode] = useState("con-teoria");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());
  const [session, setSession] = useState(null);
  const [syncStatus, setSyncStatus] = useState(isSupabaseConfigured ? "local" : "local");
  const [syncMessage, setSyncMessage] = useState(isSupabaseConfigured ? "Para sincronizar, inicia sesion." : "Supabase no configurado.");
  const [authMessage, setAuthMessage] = useState("");
  const syncTimerRef = useRef(null);
  const suppressNextSyncRef = useRef(false);
  const suppressSaveEffectRef = useRef(false);

  useEffect(() => {
    if (!course) return;
    setActiveCourseId(course.id);
    suppressSaveEffectRef.current = true;
    setProgress(loadProgress());
    setSelectedTopics(["all"]);
    setDifficulty("all");
    setQuestionType("all");
    setSearch("");
    setCount(DEFAULT_COUNT);
    setQuizQuestions([]);
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setSection("test");
    setStudyView("cards");
  }, [course?.id]);

  useEffect(() => {
    if (suppressSaveEffectRef.current) {
      suppressSaveEffectRef.current = false;
      return;
    }
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!supabase) return undefined;
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setSyncStatus("local");
        setSyncMessage("Guardado localmente.");
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    handleSyncNow(session);
  }, [session?.user?.id, course?.id]);

  useEffect(() => {
    function handleLocalChange() {
      if (suppressNextSyncRef.current) return;
      if (!session?.user) {
        setSyncStatus("local");
        setSyncMessage(isSupabaseConfigured ? "Guardado localmente. Inicia sesion para sincronizar." : "Supabase no configurado.");
        return;
      }

      setSyncStatus("pending");
      setSyncMessage("Cambios locales pendientes.");
      window.clearTimeout(syncTimerRef.current);
      syncTimerRef.current = window.setTimeout(() => {
        pushCurrentLocalProgress(session);
      }, 900);
    }

    window.addEventListener("fisica-progress-changed", handleLocalChange);
    return () => {
      window.removeEventListener("fisica-progress-changed", handleLocalChange);
      window.clearTimeout(syncTimerRef.current);
    };
  }, [session?.user?.id, course?.id]);

  const pool = useMemo(
    () => getFilteredQuestions(questions, selectedTopics, difficulty, search, questionType),
    [questions, selectedTopics, difficulty, search, questionType],
  );
  const failedQuestions = useMemo(
    () => questions.filter((question) => (progress.failedIds || []).includes(question.id)),
    [questions, progress.failedIds],
  );
  const seguroExamQuestions = useMemo(
    () => questions.filter((question) => question.tipo === "seguro examen" || question.tags?.includes("seguro-examen")),
    [questions],
  );
  const guideFinalQuestions = useMemo(
    () => questions.filter((question) => question.tipo === "guia final" || question.source === "GUIA_ESTUDIO_EXAMEN.pdf"),
    [questions],
  );
  const maxCount = pool.length;
  const testActive = quizQuestions.length > 0 && !result;

  function reloadLocalProgress() {
    suppressSaveEffectRef.current = true;
    setProgress(loadProgress());
    window.dispatchEvent(new CustomEvent("fisica-progress-reloaded"));
  }

  async function handleSyncNow(nextSession = session) {
    if (!nextSession?.user) {
      setSyncStatus("local");
      setSyncMessage(isSupabaseConfigured ? "Inicia sesion para sincronizar." : "Supabase no configurado.");
      return;
    }

    setSyncStatus("pending");
    setSyncMessage("Mezclando progreso local y remoto...");
    try {
      await syncProgress(nextSession.user.id);
      reloadLocalProgress();
      setSyncStatus("synced");
      setSyncMessage("Progreso sincronizado.");
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(error.message || "No se pudo sincronizar.");
    }
  }

  async function pushCurrentLocalProgress(nextSession = session) {
    if (!nextSession?.user) return;
    try {
      await pushLocalProgress(nextSession.user.id);
      reloadLocalProgress();
      setSyncStatus("synced");
      setSyncMessage("Guardado en Supabase.");
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(error.message || "No se pudo guardar en Supabase.");
    }
  }

  function exportProgressJson() {
    const blob = new Blob([exportLocalState()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `progreso-${course?.id || "curso"}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importProgressJson(jsonText) {
    try {
      importLocalState(jsonText);
      reloadLocalProgress();
      setSyncStatus(session?.user ? "pending" : "local");
      setSyncMessage("Progreso importado.");
      if (session?.user) await pushCurrentLocalProgress(session);
    } catch {
      setSyncStatus("error");
      setSyncMessage("El archivo JSON no parece valido.");
    }
  }

  function suppressSyncDuring(callback) {
    suppressNextSyncRef.current = true;
    callback();
    window.setTimeout(() => {
      suppressNextSyncRef.current = false;
    }, 0);
  }

  function clearLocalOnly() {
    if (!window.confirm("Esto borra el progreso de este dispositivo. El remoto no se toca. Continuar?")) return;
    suppressSyncDuring(resetLocalProgress);
    reloadLocalProgress();
    setSyncStatus("local");
    setSyncMessage("Progreso local borrado.");
  }

  async function clearRemoteOnly() {
    if (!session?.user) return;
    if (!window.confirm("Esto borra el progreso guardado en Supabase. El local no se toca. Continuar?")) return;
    setSyncStatus("pending");
    setSyncMessage("Borrando progreso remoto...");
    try {
      await clearRemoteProgress(session.user.id);
      setSyncStatus("synced");
      setSyncMessage("Progreso remoto borrado.");
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(error.message || "No se pudo borrar el progreso remoto.");
    }
  }

  async function clearAllProgress() {
    if (!window.confirm("Esto borra todo el progreso local y remoto disponible. Continuar?")) return;
    suppressSyncDuring(resetLocalProgress);
    if (session?.user) {
      try {
        await clearRemoteProgress(session.user.id);
      } catch (error) {
        setSyncStatus("error");
        setSyncMessage(error.message || "No se pudo borrar el progreso remoto.");
        return;
      }
    }
    reloadLocalProgress();
    setSyncStatus("local");
    setSyncMessage("Todo el progreso se ha borrado.");
  }

  function syncCount(nextMax) {
    setCount((currentCount) => Math.min(Math.max(1, currentCount), Math.max(1, nextMax)));
  }

  function updateSelectedTopics(nextTopics) {
    const normalized = nextTopics.length === 0 ? ["all"] : nextTopics;
    setSelectedTopics(normalized);
    syncCount(getFilteredQuestions(questions, normalized, difficulty, search, questionType).length);
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
    syncCount(getFilteredQuestions(questions, selectedTopics, value, search, questionType).length);
  }

  function handleQuestionTypeChange(value) {
    setQuestionType(value);
    syncCount(getFilteredQuestions(questions, selectedTopics, difficulty, search, value).length);
  }

  function handleSearchChange(value) {
    setSearch(value);
    syncCount(getFilteredQuestions(questions, selectedTopics, difficulty, value, questionType).length);
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
    setQuestionType("all");
    setSearch("");
    setCount(Math.min(count, fullPool.length));
    beginQuiz(pickQuestions(fullPool, Math.min(count, fullPool.length)), "examen");
  }

  function startSeguroExam() {
    if (!seguroExamQuestions.length) return;
    setSelectedTopics(["all"]);
    setDifficulty("all");
    setQuestionType("seguro examen");
    setSearch("");
    setCount(Math.min(count, seguroExamQuestions.length));
    beginQuiz(pickQuestions(seguroExamQuestions, Math.min(count, seguroExamQuestions.length)), "repaso");
  }

  function startImportantGuide() {
    if (!guideFinalQuestions.length) return;
    setSelectedTopics(["all"]);
    setDifficulty("all");
    setQuestionType("guia final");
    setSearch("");
    setCount(Math.min(count, guideFinalQuestions.length));
    beginQuiz(pickQuestions(guideFinalQuestions, Math.min(count, guideFinalQuestions.length)), "repaso");
  }

  function practiceFailed() {
    if (!failedQuestions.length) return;
    beginQuiz(pickQuestions(failedQuestions, failedQuestions.length), "repaso");
  }

  function practiceStudyConcept(card) {
    const cards = card.cards || [card];
    const relatedIds = new Set(cards.flatMap((item) => item.relatedQuestionIds || []));
    const sourceIds = new Set(cards.map((item) => item.id).filter(Boolean));
    const related = questions.filter((question) => {
      if (relatedIds.has(question.id) || sourceIds.has(question.sourceCardId)) return true;
      return cards.some((item) => {
        const sameTopic = item.temaBanco ? question.tema.startsWith(item.temaBanco) : question.tema.includes(item.tema);
        const sameSubtopic = question.subtema === item.subtema || question.enunciado.toLowerCase().includes(item.titulo.toLowerCase());
        return sameTopic && sameSubtopic;
      });
    });
    if (!related.length) {
      window.alert("No hay suficientes preguntas de este concepto todavia.");
      return;
    }
    setTheoryMode("con-teoria");
    beginQuiz(pickQuestions(related, Math.min(20, related.length)), "repaso");
  }

  function openStudyFromTutor() {
    goStudy("cards");
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

  function chooseCourse(courseId) {
    setActiveCourseId(courseId);
    saveSelectedCourseId(courseId);
    setSelectedCourseId(courseId);
  }

  function goToCourseSelector() {
    saveSelectedCourseId("");
    setSelectedCourseId("");
    setQuizQuestions([]);
    setAnswers({});
    setResult(null);
  }

  if (!course) {
    return <CourseSelector courses={courses} onSelect={chooseCourse} />;
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">{course.eyebrow}</p>
          <h1>{course.title}</h1>
          <button
            className="course-switch"
            type="button"
            onPointerDown={(event) => {
              event.preventDefault();
              goToCourseSelector();
            }}
            onClick={goToCourseSelector}
          >
            <Repeat2 size={16} />
            Cambiar asignatura
          </button>
        </div>
        <div className="header-controls">
          <nav className="top-tabs" aria-label="Secciones">
            <button className={section === "test" ? "active" : ""} type="button" onClick={() => setSection("test")}>
              <ClipboardList size={18} />
              Test
            </button>
            <button className={section === "formulas" ? "active" : ""} type="button" onClick={() => setSection("formulas")}>
              <BookOpen size={18} />
              {course.resourceLabel}
            </button>
            <button className={section === "study" ? "active" : ""} type="button" onClick={() => goStudy("cards")}>
              <Brain size={18} />
              Estudiar rapido
            </button>
            <button className={section === "stats" ? "active" : ""} type="button" onClick={() => setSection("stats")}>
              <BarChart3 size={18} />
              Estadisticas
            </button>
            <button className={section === "doubts" ? "active" : ""} type="button" onClick={() => setSection("doubts")}>
              <HelpCircle size={18} />
              Mis dudas
            </button>
            <button className={section === "settings" ? "active" : ""} type="button" onClick={() => setSection("settings")}>
              <Settings size={18} />
              Ajustes
            </button>
            {(testActive || result) && (
              <button type="button" onClick={resetToSetup}>
                <Home size={18} />
                Inicio
              </button>
            )}
          </nav>
          <UserMenu session={session} syncStatus={syncStatus} syncMessage={syncMessage} onSync={handleSyncNow} />
        </div>
      </header>

      {section === "formulas" ? (
        <FormulaPanel formulas={formulas} course={course} />
      ) : section === "study" ? (
        <StudyMode
          initialView={studyView}
          onPracticeConcept={practiceStudyConcept}
          cards={studyCards}
          topics={studyTopics}
          course={course}
        />
      ) : section === "stats" ? (
        <StatsPanel progress={progress} onReset={resetProgress} onPracticeFailed={practiceFailed} failedCount={failedQuestions.length} />
      ) : section === "doubts" ? (
        <DoubtsPanel
          onGoStudy={() => goStudy("cards")}
          onPracticeCards={(cards) => practiceStudyConcept({ cards })}
          cards={studyCards}
          course={course}
        />
      ) : section === "settings" ? (
        <SettingsPanel
          session={session}
          syncStatus={syncStatus}
          syncMessage={syncMessage}
          authMessage={authMessage}
          onAuthMessage={setAuthMessage}
          onSync={handleSyncNow}
          onExport={exportProgressJson}
          onImport={importProgressJson}
          onClearLocal={clearLocalOnly}
          onClearRemote={clearRemoteOnly}
          onClearAll={clearAllProgress}
        />
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
            questionType={questionType}
            questionTypes={questionTypes}
            search={search}
            count={Math.min(count, Math.max(1, maxCount))}
            maxCount={maxCount}
            mode={mode}
            theoryMode={theoryMode}
            failedCount={failedQuestions.length}
            onTopicToggle={toggleTopic}
            onDifficultyChange={handleDifficultyChange}
            onQuestionTypeChange={handleQuestionTypeChange}
            onSearchChange={handleSearchChange}
            onCountChange={setCount}
            onModeChange={setMode}
            onTheoryModeChange={setTheoryMode}
            onStart={startQuiz}
            onStartFinal={startFinalSimulation}
            onStartSeguro={startSeguroExam}
            onStartImportant={startImportantGuide}
            onPracticeFailed={practiceFailed}
            onGoStudy={() => goStudy("cards")}
            onGoLastMinute={() => goStudy("last-minute")}
            onGoFormulas={() => setSection("formulas")}
            onGoStats={() => setSection("stats")}
            onGoSettings={() => setSection("settings")}
            course={course}
            seguroCount={seguroExamQuestions.length}
            importantCount={guideFinalQuestions.length}
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
      <AiTutorButton onPracticeCards={(cards) => practiceStudyConcept({ cards })} onOpenStudy={openStudyFromTutor} course={course} />
    </main>
  );
}
