import * as physicsData from "../physics/index.js";
import * as pooData from "../poo/index.js";

export const courses = [
  {
    id: "physics",
    name: "Fundamentos Fisicos de la Ingenieria",
    shortName: "Fisica",
    eyebrow: "Fundamentos Fisicos",
    title: "Test Final de Fisica",
    resourceLabel: "Formulario",
    resourceDescription: "Formulas, variables, unidades y avisos.",
    searchPlaceholder: "Gauss, Carnot, unidad...",
    studyDescription: "Tarjetas cortas para reconocer conceptos, formulas y trampas de test.",
    setupSummary: [
      "Bloque prioritario con todas las preguntas de GUIA_ESTUDIO_EXAMEN.pdf",
      "Enunciados de una frase o calculo directo",
      "Distractores por unidades, signos y proporcionalidad",
      "Mas teoria e interpretacion que calculo largo",
      "Temas 4-6 y repaso T1-T3 reforzados para el examen final",
    ],
    tutor: {
      title: "Dudas de Fisica",
      welcome:
        "Soy tu tutor local de Fisica. Puedo explicar conceptos del temario, recordar formulas y hacerte preguntas cortas. Si activas IA real, usare Supabase Edge Function; si falla, vuelvo al modo local.",
      starters: [
        "No entiendo el efecto Doppler",
        "¿Cuando uso Q = mcDeltaT?",
        "Explicame los batidos",
        "Hazme una pregunta de ondas",
      ],
    },
    data: physicsData,
  },
  {
    id: "poo",
    name: "Programacion Orientada a Objetos",
    shortName: "POO",
    eyebrow: "Programacion Orientada a Objetos",
    title: "Test Final de POO",
    resourceLabel: "Chuleta POO",
    resourceDescription: "Conceptos, sintaxis, relaciones UML y trampas de test.",
    searchPlaceholder: "UML, interface, static, Swing...",
    studyDescription: "Tarjetas cortas para repasar Java, UML, herencia, interfaces y GUI.",
    setupSummary: [
      "Preguntas tipo test sobre definiciones, sintaxis y relaciones",
      "Foco especial en interfaces, polimorfismo y UML",
      "Trampas de Java: this/super, throw/throws, overload/override",
      "Chuleta con conceptos clave y ejemplos cortos de codigo",
    ],
    tutor: {
      title: "Dudas de POO",
      welcome:
        "Soy tu tutor local de Programacion Orientada a Objetos. Respondo con el temario de Java, UML, herencia, interfaces, GUI, paquetes y JAR. No mezclo contenido de Fisica.",
      starters: [
        "No entiendo las interfaces",
        "Diferencia entre overload y override",
        "¿Cuando uso this y super?",
        "Hazme una pregunta de UML",
      ],
    },
    data: pooData,
  },
];

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) || null;
}
