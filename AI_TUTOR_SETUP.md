# Tutor IA de la web de Fisica

La web tiene un tutor flotante llamado `Tutor IA`.

## Que funciona sin API externa

El modo local funciona siempre. No necesita claves ni servicios externos.

Usa estos datos del proyecto:

- `src/data/studyCards.js`
- `src/data/formulas.js`
- `src/data/questions.js`
- `src/data/extraQuestions.js`
- `src/data/theoryQuestions.js`

Cuando haces una pregunta, busca conceptos relacionados y responde con:

- explicacion corta,
- formula si aplica,
- cuando se usa,
- error tipico,
- pregunta rapida de comprobacion.

## IA real opcional

La IA real usa esta arquitectura:

```text
React -> Supabase Edge Function -> API de IA -> React
```

Nunca pongas claves privadas en React.

La funcion esta en:

```text
supabase/functions/ai-tutor/index.ts
```

## Configurar OPENAI_API_KEY

Desde la terminal, con Supabase CLI instalado e iniciado:

```bash
supabase login
supabase link --project-ref oykmbnugwctozlkfahld
supabase secrets set OPENAI_API_KEY=tu_clave
```

Opcionalmente puedes fijar modelo:

```bash
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

No subas esas claves a GitHub.

## Desplegar la Edge Function

```bash
supabase functions deploy ai-tutor
```

Si no se despliega o falta `OPENAI_API_KEY`, la app usa automaticamente el tutor local.

## Probar el tutor

1. Abre la web.
2. Pulsa `Tutor IA`.
3. Pregunta, por ejemplo:

```text
No entiendo los batidos
```

4. En modo local deberia responder usando tarjetas y formulas.
5. Activa `IA real si esta disponible` para probar la Edge Function.

## Modo Preguntame

En `Estudiar rapido`, pulsa `Preguntame`.

Funcionamiento:

1. Elige tema o todos.
2. Intenta responder la pregunta de la tarjeta.
3. Pulsa `Ver respuesta`.
4. Marca:
   - `Lo sabia`
   - `Dudaba`
   - `No me lo sabia`

Esto actualiza el progreso de tarjetas y tambien el registro del tutor.

## Mis dudas

La pestaña `Mis dudas` muestra:

- ultimas preguntas hechas al tutor,
- temas mas consultados,
- tarjetas dudosas o para repasar,
- recomendaciones rapidas.

## Anadir mas preguntas teoricas

El archivo principal es:

```text
src/data/theoryQuestions.js
```

Ahora genera preguntas desde `studyCards.js`. Si quieres preguntas manuales, respeta la estructura:

```js
{
  id: "theory-ondas-001",
  tema: "Tema 4: MAS, ondas y ondas electromagneticas",
  subtema: "Ondas",
  dificultad: "media",
  tipo: "teoria",
  enunciado: "...",
  opciones: ["...", "...", "...", "..."],
  correcta: 1,
  explicacion: "...",
  teoria: "...",
  formula: "..."
}
```

## Progreso y sincronizacion

El progreso del tutor se guarda en:

```text
src/utils/tutorStorage.js
```

Y se sincroniza con Supabase mediante:

```text
src/services/progressSync.js
```

Si hay login, se guarda en `public.user_state` dentro de Supabase. Sin login, se guarda en `localStorage`.

## Seguridad

- No uses `service_role key` en frontend.
- No pongas `OPENAI_API_KEY` en React.
- No subas `.env.local`.
- La clave de IA solo debe vivir como secret de Supabase.
