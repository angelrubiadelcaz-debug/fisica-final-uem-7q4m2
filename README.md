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

El proyecto incluye un workflow en:

```text
.github/workflows/deploy.yml
```

Cada push a `main` instala dependencias, compila `dist` y publica con GitHub Pages Actions. La web queda disponible en una URL del tipo:

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
   - `Source`: `GitHub Actions`
5. Guarda los cambios y espera a que GitHub termine de publicar.

Si prefieres publicar manualmente con la rama `gh-pages`, tambien funciona, pero el workflow es la opcion recomendada porque permite inyectar las variables de Supabase.

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
  String.raw`Si aumenta \(f\) y \(v\) se mantiene constante, la longitud de onda:`,
  ["Disminuye", "Aumenta", "No cambia", "Se hace cero"],
  0,
  String.raw`Como \(v = \lambda f\), si \(v\) permanece constante y \(f\) aumenta, \(\lambda\) disminuye.`,
  String.raw`\[v = \lambda f\]`,
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

Si escribes formulas simples como `v = v0 + a t`, `Q = c m Delta T` o `E = \SIGMA/(2 \VARVAREPSILON_0)`, el componente `MathText` intenta normalizarlas automaticamente. Aun asi, para preguntas nuevas es mejor escribir LaTeX directamente con `String.raw`.

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

El progreso se guarda en `localStorage` y, si hay sesion iniciada, tambien en Supabase. Las tarjetas usan estos estados:

- `dominado`,
- `dudoso`,
- `repasar`.

Tambien guarda fecha del ultimo repaso y numero de veces repasada cada tarjeta.

## Sincronizar progreso con Supabase

La web funciona sin cuenta. En ese caso el progreso se queda en el navegador del dispositivo.

Para sincronizar entre PC y movil:

1. Crea un proyecto gratuito en Supabase.
2. Ejecuta el SQL de `supabase/schema.sql` en el SQL Editor de Supabase.
3. Copia la `Project URL` y la `anon public/publishable key`.
4. Crea un archivo `.env.local`:

```bash
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=TU_CLAVE_PUBLICA
```

5. Ejecuta `npm run dev` y entra en `Ajustes`.
6. Crea cuenta o inicia sesion con email y contrasena.

En Supabase, configura tambien `Authentication` -> `URL Configuration`:

```text
Site URL:
https://angelrubiadelcaz-debug.github.io/fisica-final-uem-7q4m2/

Redirect URLs:
https://angelrubiadelcaz-debug.github.io/fisica-final-uem-7q4m2/
http://localhost:5173/
http://127.0.0.1:5173/
```

Para GitHub Pages, crea estos secrets en GitHub:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Ruta: `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.

El workflow de Pages lee esos secrets durante `npm run build`.

Nunca uses la `service_role key` en el frontend.

## Que progreso se guarda

Se guarda solo progreso academico:

- preguntas falladas,
- estadisticas de tests,
- errores por tema y dificultad,
- historial reciente de intentos,
- tarjetas dominadas, dudosas o para repasar,
- fecha y numero de repasos de tarjetas.
- dudas preguntadas al tutor,
- resultados del modo `Preguntame`,
- temas mas consultados en `Mis dudas`.

No se guardan respuestas sensibles ni documentos del temario.

## Ajustes

La pestaña `Ajustes` permite:

- iniciar sesion,
- cerrar sesion,
- sincronizar ahora,
- exportar progreso a JSON,
- importar progreso desde JSON,
- borrar progreso local,
- borrar progreso remoto,
- borrar todo el progreso.

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
- `Preguntame`: preguntas de recuerdo activo generadas desde las tarjetas; escribes una respuesta opcional, revelas la solucion y marcas si lo sabias.

## Tutor IA

La web incluye un boton flotante `Tutor IA`.

Funciona sin API externa usando el material local:

- `src/data/studyCards.js`
- `src/data/formulas.js`
- `src/data/questions.js`
- `src/data/extraQuestions.js`
- `src/data/theoryQuestions.js`

El tutor local busca tarjetas, formulas y preguntas relacionadas con tu duda. Responde corto, orientado a examen tipo test, con formula si procede, error tipico y una pregunta rapida.

Tambien hay soporte opcional para IA real mediante Supabase Edge Function:

```bash
supabase functions deploy ai-tutor
supabase secrets set OPENAI_API_KEY=tu_clave
```

No pongas `OPENAI_API_KEY` en React ni en GitHub. Si la funcion no esta desplegada o falla, la app vuelve automaticamente al tutor local.

Consulta `AI_TUTOR_SETUP.md` para la guia completa.

## Preguntas teoricas

El banco global combina:

- preguntas base de `src/data/questions.js`,
- preguntas extra de `src/data/extraQuestions.js`,
- preguntas teoricas generadas desde tarjetas en `src/data/theoryQuestions.js`.

El archivo `src/data/allQuestions.js` une todo el banco. La interfaz permite filtrar por tipo:

- calculo,
- teoria,
- formula,
- unidades,
- interpretacion,
- tarjetas.

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
- Tutor IA local sin API externa.
- Soporte opcional de IA real con Supabase Edge Function.
- Mis dudas y recomendaciones por temas consultados.
- Modo Preguntame para tarjetas.
- Sincronizacion opcional con Supabase.
- Estadisticas persistentes.
- Reinicio de progreso.

## Archivos importantes

- `src/components/MathText.jsx`: render de texto con LaTeX.
- `src/utils/normalizeLatex.js`: utilidad publica para normalizar formulas.
- `src/utils/mathFormat.js`: mapa y reglas de normalizacion de formulas.
- `src/lib/supabaseClient.js`: cliente publico de Supabase.
- `src/services/progressSync.js`: carga, mezcla y sincroniza progreso local/remoto.
- `src/services/aiTutorService.js`: tutor local/remoto con fallback automatico.
- `src/utils/localTutorEngine.js`: busqueda local en tarjetas, formulas y preguntas.
- `src/utils/tutorStorage.js`: progreso de dudas y preguntas del tutor.
- `src/utils/progressRepository.js`: capa comun para progreso.
- `src/data/theoryQuestions.js`: preguntas teoricas generadas desde tarjetas.
- `src/data/allQuestions.js`: banco global combinado.
- `supabase/schema.sql`: tabla y politicas RLS.
- `supabase/functions/ai-tutor/index.ts`: Edge Function opcional para IA real.
- `.env.example`: variables necesarias.
