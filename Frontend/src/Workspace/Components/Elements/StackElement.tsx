import type { ElementNode } from "../../Utils/runPipelines";
import ReactMarkdown from "react-markdown";

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * スタック要素の描画コンポーネント
 * type: "stack" の ElementNode を受け取ってスタック形式で表示する
 */
export const StackElement = ({ props, content, color }: Props) => {
  // 改行区切りでミニカード化
  const items = content
    .split(":::")
    .map((l: string) => l.trim())
    .filter(Boolean);

  const bg_color = props?.bg_color ?? "rgba(255,255,255,0.12)";
  const font_color = props?.font_color ?? "white";

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : `0 8px 32px ${color?.shadow ?? 'rgba(0,0,0,0.2)'}`,
    border: bg_color === "none" ? undefined : `1px solid ${color?.grid ?? 'rgba(255,255,255,0.2)'}`
  };

  return (
    <div style={style}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem'
      }}>
        {items.map((text: string, i: number) => (
          <div
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '1rem',
              border: `1px solid ${color?.grid ?? 'rgba(255,255,255,0.2)'}`
            }}
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};