import Latex from "react-latex-next";
import { normalizeMathText } from "../utils/mathFormat";

const delimiters = [
  { left: "$$", right: "$$", display: true },
  { left: "\\[", right: "\\]", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "$", right: "$", display: false },
];

export default function MathText({ children, as: Tag = "span", block = false, className = "" }) {
  const text = normalizeMathText(children, { block });
  const classes = ["math-text", block ? "math-display" : "", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes}>
      <Latex delimiters={delimiters}>{text}</Latex>
    </Tag>
  );
}
