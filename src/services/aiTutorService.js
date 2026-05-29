import { supabase } from "../lib/supabaseClient";
import {
  buildLocalTutorAnswer,
  buildTutorContext,
  serializeTutorContext,
} from "../utils/localTutorEngine";

export async function askLocalTutor(message) {
  const context = buildTutorContext(message);
  return buildLocalTutorAnswer(message, context);
}

export async function askRemoteTutor(message, context) {
  if (!supabase) throw new Error("Supabase no esta configurado.");
  const payload = {
    message,
    context: serializeTutorContext(context || buildTutorContext(message)),
  };
  const { data, error } = await supabase.functions.invoke("ai-tutor", { body: payload });
  if (error) throw error;
  if (!data?.answer) throw new Error("La funcion ai-tutor no devolvio respuesta.");
  return { mode: "remote", answer: data.answer, context: context || buildTutorContext(message) };
}

export async function askTutor(message, options = {}) {
  const context = buildTutorContext(message);
  if (options.remote) {
    try {
      return await askRemoteTutor(message, context);
    } catch (error) {
      const local = buildLocalTutorAnswer(message, context);
      return {
        ...local,
        fallbackReason: error.message || "No se pudo usar IA real. Se ha usado el tutor local.",
      };
    }
  }
  return buildLocalTutorAnswer(message, context);
}
