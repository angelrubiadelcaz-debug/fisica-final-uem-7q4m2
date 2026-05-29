import { Bot, Eraser, Sparkles, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { askTutor } from "../../services/aiTutorService";
import { generateCardQuiz } from "../../utils/localTutorEngine";
import {
  recordTutorDoubt,
  recordTutorQuestion,
} from "../../utils/progressRepository";
import AiTutorInput from "./AiTutorInput";
import AiTutorMessage from "./AiTutorMessage";

const starterMessages = [
  "No entiendo el efecto Doppler",
  "¿Cuándo uso Q = mcΔT?",
  "Explícame los batidos",
  "Hazme una pregunta de ondas",
];

export default function AiTutorPanel({ onClose, onPracticeCards, onOpenStudy }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Soy tu tutor local de Física. Puedo explicar conceptos del temario, recordar fórmulas y hacerte preguntas cortas. Si activas IA real, usaré Supabase Edge Function; si falla, vuelvo al modo local.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [remoteMode, setRemoteMode] = useState(false);
  const nextId = useRef(1);

  const lastContext = useMemo(() => {
    const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant" && message.context);
    return lastAssistant?.context || {};
  }, [messages]);

  async function send(messageText) {
    const userMessage = { id: `user-${nextId.current++}`, role: "user", content: messageText };
    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    try {
      const response = await askTutor(messageText, { remote: remoteMode });
      const assistantMessage = {
        id: `assistant-${nextId.current++}`,
        role: "assistant",
        content: response.answer,
        context: response.context,
        fallbackReason: response.fallbackReason,
      };
      setMessages((current) => [...current, assistantMessage]);
      recordTutorDoubt(messageText, response.answer, response.context);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${nextId.current++}`,
          role: "assistant",
          content: error.message || "No he podido responder ahora. Prueba en modo local.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function askCard(card) {
    const quiz = generateCardQuiz(card);
    if (!quiz) return;
    recordTutorQuestion(quiz.question, "card");
    setMessages((current) => [
      ...current,
      {
        id: `assistant-${nextId.current++}`,
        role: "assistant",
        content: [`Pregunta rápida: ${quiz.question}`, "Respuesta esperada: intenta decirla mentalmente antes de mirar la tarjeta."].join("\n\n"),
        context: { cards: [card], formulas: [], questions: [] },
      },
    ]);
  }

  return (
    <aside className="ai-panel" aria-label="Tutor IA">
      <div className="ai-panel-header">
        <div>
          <p className="eyebrow">Tutor IA</p>
          <h2>Dudas de Física</h2>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar tutor">
          <X size={18} />
        </button>
      </div>

      <div className="ai-panel-tools">
        <button type="button" className={remoteMode ? "active" : ""} onClick={() => setRemoteMode((value) => !value)}>
          <Sparkles size={16} />
          {remoteMode ? "IA real si esta disponible" : "Modo local"}
        </button>
        <button type="button" onClick={() => setMessages([])}>
          <Eraser size={16} />
          Limpiar
        </button>
      </div>

      <div className="ai-starters">
        {starterMessages.map((item) => (
          <button type="button" key={item} onClick={() => send(item)} disabled={loading}>
            {item}
          </button>
        ))}
      </div>

      <div className="ai-messages">
        {messages.map((message) => (
          <AiTutorMessage
            key={message.id}
            message={message}
            onPractice={onPracticeCards}
            onOpenStudy={onOpenStudy}
            onAskCard={askCard}
          />
        ))}
        {loading && (
          <div className="ai-message assistant loading">
            <Bot size={17} />
            Pensando...
          </div>
        )}
      </div>

      <AiTutorInput onSubmit={send} disabled={loading} />

      {(lastContext.cards?.length || 0) > 0 && (
        <div className="ai-context-line">
          Contexto usado: {lastContext.cards.length} tarjeta(s), {lastContext.formulas?.length || 0} formula(s).
        </div>
      )}
    </aside>
  );
}
