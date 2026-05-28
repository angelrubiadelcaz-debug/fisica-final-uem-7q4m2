import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { formulas } from "../data/formulas";
import MathText from "./MathText";

export default function FormulaPanel() {
  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const topics = useMemo(() => [...new Set(formulas.map((formula) => formula.tema))], []);
  const visible = formulas.filter((formula) => {
    const topicMatch = topic === "all" || formula.tema === topic;
    const haystack = `${formula.tema} ${formula.nombre} ${formula.formula} ${formula.uso} ${formula.advertencia}`.toLowerCase();
    return topicMatch && haystack.includes(search.toLowerCase());
  });

  return (
    <section className="formula-shell">
      <div className="formula-toolbar">
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
        <label className="field search-field">
          <span>Buscar</span>
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Coulomb, Carnot..." />
        </label>
      </div>

      <div className="formula-grid">
        {visible.map((formula) => (
          <article className="formula-card" key={`${formula.tema}-${formula.nombre}`}>
            <div>
              <span className="formula-topic">{formula.tema}</span>
              <h3>{formula.nombre}</h3>
            </div>
            <MathText as="div" block className="math-card-formula">{formula.formula}</MathText>
            <MathText as="p">
              {`Variables: ${formula.variables}`}
            </MathText>
            <MathText as="p">
              {`Uso: ${formula.uso}`}
            </MathText>
            <MathText as="p">
              {`Unidad: ${formula.unidad}`}
            </MathText>
            <MathText as="p">
              {`Error tipico: ${formula.advertencia}`}
            </MathText>
            {formula.ejemplo && (
              <MathText as="p">
                {`Ejemplo: ${formula.ejemplo}`}
              </MathText>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
