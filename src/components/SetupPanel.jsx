import { BarChart3, BookOpen, Brain, ClipboardCheck, Clock, Filter, Play, RotateCcw, Search, Settings, Trash2 } from "lucide-react";
import { difficultyLabel } from "../utils/quiz";

export default function SetupPanel({
  topics,
  selectedTopics,
  difficulty,
  search,
  count,
  maxCount,
  mode,
  theoryMode,
  failedCount,
  onTopicToggle,
  onDifficultyChange,
  onSearchChange,
  onCountChange,
  onModeChange,
  onTheoryModeChange,
  onStart,
  onStartFinal,
  onPracticeFailed,
  onGoStudy,
  onGoLastMinute,
  onGoFormulas,
  onGoStats,
  onGoSettings,
}) {
  const countOptions = [10, 20, 30, 40, 60, 100, maxCount]
    .filter((value, index, list) => value > 0 && value <= maxCount && list.indexOf(value) === index);
  const isAll = selectedTopics.includes("all");

  return (
    <section className="setup-shell">
      <div className="quick-start-grid">
        <button className="quick-start-card primary-card" type="button" onClick={onStart} disabled={maxCount === 0}>
          <Play size={22} />
          <strong>Empezar test</strong>
          <span>Preguntas tipo examen con correccion final.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onGoStudy}>
          <Brain size={22} />
          <strong>Estudiar rapido</strong>
          <span>Tarjetas cortas con teoria, formulas y errores tipicos.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onPracticeFailed} disabled={!failedCount}>
          <RotateCcw size={22} />
          <strong>Repasar falladas</strong>
          <span>Solo preguntas que ya has fallado.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onGoLastMinute}>
          <Clock size={22} />
          <strong>10 minutos antes</strong>
          <span>Resumen urgente con lo mas importante.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onGoFormulas}>
          <BookOpen size={22} />
          <strong>Formulario</strong>
          <span>Formulas, variables, unidades y avisos.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onGoStats}>
          <BarChart3 size={22} />
          <strong>Estadisticas</strong>
          <span>Aciertos, fallos y temas que conviene reforzar.</span>
        </button>
        <button className="quick-start-card" type="button" onClick={onGoSettings}>
          <Settings size={22} />
          <strong>Ajustes</strong>
          <span>Login, sincronizacion, exportar o borrar progreso.</span>
        </button>
      </div>

      <div className="setup-grid">
      <div className="setup-panel">
        <div className="panel-heading">
          <BookOpen size={22} />
          <div>
            <p className="eyebrow">Banco completo</p>
            <h2>Configura tu test</h2>
          </div>
        </div>

        <div className="control-grid">
          <label className="field">
            <span>Numero de preguntas</span>
            <select value={count} onChange={(event) => onCountChange(Number(event.target.value))}>
              {countOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="field search-field">
            <span>Buscar preguntas</span>
            <Search size={18} />
            <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Gauss, Carnot, unidad..." />
          </label>
        </div>

        <div className="topic-picker" aria-label="Temas">
          <button className={isAll ? "active" : ""} type="button" onClick={() => onTopicToggle("all")}>
            Examen completo
          </button>
          {topics.map((item) => (
            <button
              key={item}
              className={!isAll && selectedTopics.includes(item) ? "active" : ""}
              type="button"
              onClick={() => onTopicToggle(item)}
            >
              {item.split(":")[0]}
            </button>
          ))}
        </div>

        <div className="segmented" aria-label="Dificultad">
          {["all", "facil", "media", "dificil"].map((value) => (
            <button
              key={value}
              className={difficulty === value ? "active" : ""}
              type="button"
              onClick={() => onDifficultyChange(value)}
            >
              <Filter size={16} />
              {difficultyLabel(value)}
            </button>
          ))}
        </div>

        <div className="segmented" aria-label="Modo">
          <button className={mode === "examen" ? "active" : ""} type="button" onClick={() => onModeChange("examen")}>
            <ClipboardCheck size={16} />
            Examen
          </button>
          <button className={mode === "repaso" ? "active" : ""} type="button" onClick={() => onModeChange("repaso")}>
            <BookOpen size={16} />
            Repaso
          </button>
        </div>

        <div className="segmented" aria-label="Teoria">
          <button className={theoryMode === "con-teoria" ? "active" : ""} type="button" onClick={() => onTheoryModeChange("con-teoria")}>
            <BookOpen size={16} />
            Con teoria
          </button>
          <button className={theoryMode === "sin-teoria" ? "active" : ""} type="button" onClick={() => onTheoryModeChange("sin-teoria")}>
            <Trash2 size={16} />
            Sin teoria
          </button>
        </div>

        <div className="actions-row">
          <button className="primary" type="button" onClick={onStart} disabled={maxCount === 0}>
            <Play size={18} />
            Empezar
          </button>
          <button type="button" onClick={onStartFinal} disabled={maxCount === 0}>
            <ClipboardCheck size={18} />
            Simulacro final
          </button>
          <button type="button" onClick={onPracticeFailed} disabled={!failedCount}>
            <RotateCcw size={18} />
            Falladas {failedCount ? `(${failedCount})` : ""}
          </button>
        </div>
      </div>

      <div className="summary-panel">
        <p className="eyebrow">Estilo detectado</p>
        <h2>Preguntas cortas, con trampa limpia</h2>
        <div className="summary-list">
          <span>Enunciados de una frase o calculo directo</span>
          <span>Distractores por unidades, signos y proporcionalidad</span>
          <span>Mas teoria e interpretacion que calculo largo</span>
          <span>Temas 4-6 reforzados para el examen final</span>
        </div>
      </div>
      </div>
    </section>
  );
}
