import { pooConcepts } from "./coreConcepts.js";

export const cheatsheet = pooConcepts.map((concept) => ({
  tema: concept.tema,
  nombre: concept.titulo,
  formula: concept.sintaxis || "",
  kind: concept.sintaxis ? "code" : "text",
  variables: concept.recuerdo,
  uso: concept.cuando,
  unidad: "Concepto / sintaxis Java",
  advertencia: concept.error,
  ejemplo: concept.ejemplo,
}));

export const formulas = cheatsheet;
