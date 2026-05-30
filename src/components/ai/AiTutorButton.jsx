import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import AiTutorPanel from "./AiTutorPanel";

export default function AiTutorButton({ onPracticeCards, onOpenStudy, course }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ai-tutor-root">
      {open && (
        <AiTutorPanel
          onClose={() => setOpen(false)}
          onPracticeCards={onPracticeCards}
          onOpenStudy={onOpenStudy}
          course={course}
        />
      )}
      <button className="ai-floating-button" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {open ? "Cerrar" : "Tutor IA"}
      </button>
    </div>
  );
}
