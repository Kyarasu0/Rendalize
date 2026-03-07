import type { ElementNode } from "../../Utils/runPipelines";
import ReactMarkdown from "react-markdown";

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * 通常要素の描画コンポーネント
 * type: "normal" の ElementNode を受け取って通常のテキスト形式で表示する
 */
export const NormalElement = ({ props, content, color }: Props) => {
  // align を正規化
  const safeAlign = (value?: string): "left" | "center" | "right" => {
    if (value === "center" || value === "right") {
      return value;
    }
    return "left";
  };

  const align = safeAlign(props?.align);
  const bg_color = props?.bg_color ?? "white";
  const font_color = props?.font_color ?? "black";

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : `0 6px 18px ${color?.shadow ?? 'rgba(0,0,0,0.2)'}`,
    border: bg_color === "none" ? undefined : `1px solid ${color?.grid ?? 'rgba(255,255,255,0.2)'}`
  };

  return (
    <div style={style}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};