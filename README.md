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

## Desplegar en GitHub Pages

El proyecto ya incluye:

- `vite.config.js` preparado para usar una base correcta en GitHub Pages.
- `.github/workflows/deploy.yml` para publicar automaticamente la carpeta `dist`.

El workflow calcula la base con el nombre real del repositorio:

```text
VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

Por eso funcionara en una URL del tipo:

```text
https://<usuario>.github.io/<NOMBRE_REPO>/
```

## Configurar GitHub Pages

En GitHub:

1. Sube el proyecto a un repositorio.
2. Entra en `Settings`.
3. Entra en `Pages`.
4. En `Build and deployment`, selecciona:
   - `Source`: `GitHub Actions`
5. Haz push a `main` o `master`.
6. Espera a que termine el workflow `Deploy to GitHub Pages`.

## Si cambia el nombre del repositorio

No tienes que tocar nada si despliegas con el workflow incluido. Si quieres compilar manualmente para un repositorio concreto:

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
