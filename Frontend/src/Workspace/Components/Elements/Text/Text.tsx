import ReactMarkdown from "react-markdown";
import type { ElementNode } from "../../../Utils/runPipelines";

interface Props extends ElementNode {
  color?: Record<string, string>;
}

export const Text = ({ content, color }: Props) => {
  if (typeof content !== "string") return null;

  return (
    <div style={{ color: color?.black }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};