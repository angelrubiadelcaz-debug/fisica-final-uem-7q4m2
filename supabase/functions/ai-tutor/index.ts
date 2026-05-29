import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const basePrompt =
  "Eres un tutor de Física para preparar un examen final tipo test de Fundamentos Físicos. Responde de forma breve, clara y práctica. Usa solo el contexto proporcionado del temario, tarjetas, fórmulas y preguntas. No inventes contenido si no aparece en el contexto. Prioriza concepto, fórmula, cuándo se aplica y error típico. Usa LaTeX para fórmulas. Termina con una pregunta corta de comprobación.";

function compactContext(context: unknown) {
  return JSON.stringify(context || {}, null, 2).slice(0, 12000);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY no configurada" }), {
        status: 501,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message, context } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Falta message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const model = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.25,
        max_tokens: 420,
        messages: [
          { role: "system", content: basePrompt },
          {
            role: "user",
            content: [
              "Contexto local del temario:",
              compactContext(context),
              "",
              `Duda del estudiante: ${message}`,
            ].join("\n"),
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return new Response(JSON.stringify({ error: "Error de IA", detail: detail.slice(0, 800) }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "No he podido generar una respuesta.";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Error inesperado" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
