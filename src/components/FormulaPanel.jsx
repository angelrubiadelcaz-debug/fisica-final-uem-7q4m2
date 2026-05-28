import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { formulas } from "../data/formulas";

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
            <code>{formula.formula}</code>
            <p>
              <strong>Variables:</strong> {formula.variables}
            </p>
            <p>
              <strong>Uso:</strong> {formula.uso}
            </p>
            <p>
              <strong>Unidad:</strong> {formula.unidad}
            </p>
            <p>
              <strong>Error tipico:</strong> {formula.advertencia}
            </p>
            {formula.ejemplo && (
              <p>
                <strong>Ejemplo:</strong> {formula.ejemplo}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
