# Test Final de Fisica

Web React + Vite para estudiar Fundamentos Fisicos/Fisica con tests tipo examen, formulario, teoria relacionada, practica de falladas y estadisticas.

## Instalacion

```bash
npm install
```

## Ejecucion local

```bash
npm run dev
```

Abre la URL que indique Vite, normalmente:

```text
http://localhost:5173/
```

## Compilar

```bash
npm run build
```

La carpeta generada es `dist/`.

## Publicacion en GitHub Pages

Este repositorio esta publicado con la rama `gh-pages`, que contiene la carpeta `dist` ya compilada. La web queda disponible en una URL del tipo:

```text
https://<usuario>.github.io/<NOMBRE_REPO>/
```

Para este proyecto:

```text
https://angelrubiadelcaz-debug.github.io/fisica-final-uem-7q4m2/
```

`vite.config.js` esta preparado para usar una base correcta en GitHub Pages. Para compilar manualmente para este repositorio:

```bash
VITE_BASE_PATH=/fisica-final-uem-7q4m2/ npm run build
```

## Configurar GitHub Pages

En GitHub:

1. Sube el proyecto a un repositorio.
2. Entra en `Settings`.
3. Entra en `Pages`.
4. En `Build and deployment`, selecciona:
   - `Source`: `Deploy from a branch`
   - `Branch`: `gh-pages`
   - `Folder`: `/ (root)`
5. Guarda los cambios y espera a que GitHub termine de publicar.

## Si cambia el nombre del repositorio

Compila usando el nombre nuevo del repositorio:

```bash
VITE_BASE_PATH=/NOMBRE_REPO/ npm run build
```

En local, `npm run dev` usa `/` como base para que no haya rutas raras.

## Anadir preguntas

Las preguntas base estan en:

```text
src/data/questions.js
src/data/extraQuestions.js
```

Para anadir nuevas preguntas, lo mas comodo es usar `src/data/extraQuestions.js`:

```js
s(
  "T4",
  "Ondas",
  "media",
  "Si aumenta la frecuencia y la velocidad se mantiene constante, la longitud de onda:",
  ["Disminuye", "Aumenta", "No cambia", "Se hace cero"],
  0,
  "Como v = lambda f, si v permanece constante y f aumenta, lambda disminuye.",
  "v = lambda f",
  "interpretacion fisica",
)
```

La respuesta correcta usa indice desde cero: A=0, B=1, C=2, D=3. El sistema equilibra automaticamente la letra correcta al exportar el banco.

Cada pregunta exportada incluye:

- `id`
- `tema`
- `subtema`
- `dificultad`
- `enunciado`
- `opciones`
- `correcta`
- `explicacion`
- `teoria`
- `formula`
- `tipo`

## Escribir formulas con LaTeX

La web usa KaTeX y `react-latex-next` para renderizar matematicas.

Puedes escribir formulas en linea:

```js
String.raw`\(v = \lambda f\)`
```

Y formulas en bloque:

```js
String.raw`\[Q = mc\Delta T\]`
```

Ejemplo de pregunta con formula:

```js
enunciado: String.raw`Una onda cumple \(v = \lambda f\). Si aumenta \(f\) y \(v\) permanece constante, ¿que ocurre con \(\lambda\)?`
```

Si escribes formulas simples como `v = v0 + a t` o `Q = c m Delta T`, el componente `MathText` intenta normalizarlas automaticamente. Aun asi, para preguntas nuevas es mejor escribir LaTeX directamente con `String.raw`.

## Anadir formulas

Edita:

```text
src/data/formulas.js
```

Cada formula incluye tema, nombre, formula, variables, uso, unidad, ejemplo y advertencia/error tipico.

## Modo estudio

La pestaña `Estudiar rapido` sirve para repasar teoria en tarjetas pequenas:

- concepto,
- explicacion corta,
- formula,
- variables,
- cuando se usa,
- error tipico,
- mini ejemplo,
- pregunta rapida de recuerdo activo.

El progreso se guarda en `localStorage` con estados:

- `dominado`,
- `dudoso`,
- `repasar`.

Tambien guarda fecha del ultimo repaso y numero de veces repasada cada tarjeta.

## Anadir tarjetas de estudio

Edita:

```text
src/data/studyCards.js
```

Cada tarjeta tiene campos como:

```js
{
  id: "ondas-v-lambda-f",
  tema: "Ondas",
  subtema: "Magnitudes de una onda",
  prioridad: "alta",
  titulo: "Velocidad, frecuencia y longitud de onda",
  explicacionCorta: "En una onda periodica, velocidad, frecuencia y longitud de onda estan ligadas.",
  formula: "v = lambda f",
  variables: ["v: velocidad, en m/s", "lambda: longitud de onda, en m", "f: frecuencia, en Hz"],
  cuandoSeUsa: "Cuando relacionan frecuencia, longitud de onda o velocidad.",
  errorTipico: "Pensar que f y lambda aumentan juntas si v no cambia.",
  miniEjemplo: "Si v es constante y f aumenta, lambda disminuye.",
  preguntaActiva: "Si v permanece constante y f aumenta, que ocurre con lambda?",
  respuestaActiva: "Disminuye.",
  etiquetas: ["ondas", "frecuencia", "longitud de onda"]
}
```

El archivo calcula `relatedQuestionIds` a partir del banco de preguntas, el tema, el subtema y las etiquetas. El boton `Hacer preguntas de este concepto` inicia un test con esas preguntas relacionadas.

## Repaso rapido y 10 minutos antes

En `Estudiar rapido` puedes usar:

- `Repasar todo`: tarjetas una a una con respuesta oculta.
- `Repasar solo lo que no me se`: usa las tarjetas dudosas, marcadas para repasar o sin marcar.
- `10 minutos antes del examen`: muestra solo tarjetas de prioridad alta agrupadas por tema, con formula, mini idea y error tipico.

## Funciones incluidas

- Simulacro de examen final.
- Practica por uno o varios temas.
- Filtro por dificultad.
- Buscador de preguntas.
- Buscador de formulas.
- Modo estudiar rapido con tarjetas de teoria corta.
- Repaso rapido con respuesta oculta.
- Modo 10 minutos antes del examen.
- Modo examen.
- Modo repaso.
- Teoria relacionada por pregunta.
- Boton para mostrar/ocultar teoria.
- Practica de falladas con `localStorage`.
- Estadisticas persistentes.
- Reinicio de progreso.
