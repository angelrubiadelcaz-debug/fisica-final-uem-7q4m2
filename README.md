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

## Anadir formulas

Edita:

```text
src/data/formulas.js
```

Cada formula incluye tema, nombre, formula, variables, uso, unidad, ejemplo y advertencia/error tipico.

## Funciones incluidas

- Simulacro de examen final.
- Practica por uno o varios temas.
- Filtro por dificultad.
- Buscador de preguntas.
- Buscador de formulas.
- Modo examen.
- Modo repaso.
- Teoria relacionada por pregunta.
- Boton para mostrar/ocultar teoria.
- Practica de falladas con `localStorage`.
- Estadisticas persistentes.
- Reinicio de progreso.
