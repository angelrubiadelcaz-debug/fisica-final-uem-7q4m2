import { BookOpen, ChevronRight, ClipboardList } from "lucide-react";

export default function CourseSelector({ courses, onSelect }) {
  return (
    <main className="app course-selector-shell">
      <section className="course-selector-hero">
        <p className="eyebrow">Plataforma de estudio</p>
        <h1>Elige asignatura</h1>
        <p>Selecciona el temario que quieres estudiar. Cada asignatura mantiene sus tests, tarjetas y progreso por separado.</p>
      </section>

      <section className="course-grid" aria-label="Asignaturas disponibles">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <div>
              <span className="formula-topic">{course.shortName}</span>
              <h2>{course.name}</h2>
              <p>{course.studyDescription}</p>
            </div>
            <div className="course-metrics">
              <span>
                <ClipboardList size={17} />
                {course.data.questions.length} preguntas
              </span>
              <span>
                <BookOpen size={17} />
                {course.data.studyCards.length} tarjetas
              </span>
            </div>
            <button className="primary" type="button" onClick={() => onSelect(course.id)}>
              Estudiar
              <ChevronRight size={18} />
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
