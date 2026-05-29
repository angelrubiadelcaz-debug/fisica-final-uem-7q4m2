import MathText from "../MathText";

export default function AiTutorMessage({ message, onPractice, onOpenStudy, onAskCard }) {
  const isUser = message.role === "user";
  const cards = message.context?.cards || [];
  const hasActions = !isUser && cards.length > 0;

  return (
    <div className={`ai-message ${isUser ? "user" : "assistant"}`}>
      <MathText as="div" className="ai-message-text">{message.content}</MathText>
      {message.fallbackReason && <p className="ai-fallback">{message.fallbackReason}</p>}
      {hasActions && (
        <div className="ai-message-actions">
          <button type="button" onClick={() => onAskCard(cards[0])}>
            Hazme una pregunta
          </button>
          <button type="button" onClick={() => onOpenStudy(cards[0])}>
            Estudiar tarjeta
          </button>
          <button type="button" onClick={() => onPractice(cards)}>
            Test relacionado
          </button>
        </div>
      )}
    </div>
  );
}
