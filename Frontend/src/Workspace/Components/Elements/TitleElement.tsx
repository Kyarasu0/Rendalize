import type { ElementNode } from "../../Utils/runPipelines";
import ReactMarkdown from "react-markdown";

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * タイトル要素の描画コンポーネント
 * type: "title" の ElementNode を受け取ってタイトル形式で表示する
 */
export const TitleElement = ({ props, content, color }: Props) => {
  // align を正規化
  const safeAlign = (value?: string): "left" | "center" | "right" => {
    if (value === "center" || value === "right") {
      return value;
    }
    return "left";
  };

  const align = safeAlign(props?.align);

  return (
    <div style={{
      textAlign: align,
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};