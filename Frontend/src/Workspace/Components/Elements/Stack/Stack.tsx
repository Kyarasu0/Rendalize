import styles from "./Stack.module.css";
import ReactMarkdown from "react-markdown";
import type { ElementNode } from "../../../Utils/runPipelines";

/*
==================================================
Stack Element

stackPipeline が生成した node を描画する
==================================================
*/

interface Props extends ElementNode {
  color?: Record<string, string>
}

export const Stack = ({
  content,
  props
}: Props) => {

  // propsからスタイル設定を取得
  const align = props?.align ?? "left";
  const bg_color = props?.bg_color ?? "rgba(255,255,255,0.12)";
  const font_color = props?.font_color ?? "white";

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 8px 32px rgba(0,0,0,0.2)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)"
  };

  // ::: 区切りでミニカードを作る
  // content が文字列であることを確認して扱う
  const rawText: string = typeof content === "string" ? content : "";
  const items: string[] = rawText
    .split(":::")
    .map((v: string) => v.trim())
    .filter(Boolean);

  return (
    <div
      className={`${styles.card} ${bg_color === "none" ? styles.none : styles.glass}`}
      style={style}
    >
      <div className={styles.stack}>
        {items.map((text: string, i: number) => (
          <div key={i} className={styles.miniCard}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};