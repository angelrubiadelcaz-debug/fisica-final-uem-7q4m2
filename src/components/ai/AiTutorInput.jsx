import { Send } from "lucide-react";
import { useState } from "react";

export default function AiTutorInput({ onSubmit, disabled }) {
  const [value, setValue] = useState("");

  function submit(event) {
    event.preventDefault();
    const message = value.trim();
    if (!message || disabled) return;
    setValue("");
    onSubmit(message);
  }

  return (
    <form className="ai-input" onSubmit={submit}>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Pregunta: Doppler, calor, Carnot, batidos..."
        rows={2}
        disabled={disabled}
      />
      <button className="primary" type="submit" disabled={disabled || !value.trim()}>
        <Send size={17} />
      </button>
    </form>
  );
}
