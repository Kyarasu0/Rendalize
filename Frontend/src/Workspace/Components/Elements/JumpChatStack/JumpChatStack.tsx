import styles from "./JumpChatStack.module.css";
import ReactMarkdown from "react-markdown";
import type { ElementNode } from "../../../Utils/runPipelines";
import { COLORS } from "../../../SampleData/ForWhiteBg"

/*
==================================================
JumpChatStack Element

JumpChatStackPipeline が生成した node を描画する
==================================================
*/

interface Props extends ElementNode {
  color?: Record<string, string>;
}

export const JumpChatStack = ({
  content,
  props,
  color
}: Props) => {

  // color
  const colorSet = color ?? COLORS;

  const style: React.CSSProperties = {
    alignItems: props?.align === "center"
      ? "center"
      : props?.align === "right"
      ? "flex-end"
      : "flex-start",
    textAlign: props?.align ?? "left",
    backgroundColor: colorSet.default_element_bg,
    color: props?.font_color ?? colorSet.default_font,
  };

  const miniCardStyle: React.CSSProperties = {
    border: `1px solid ${colorSet.grid}`,
    backgroundColor: props?.bg_color ?? colorSet.grid,
    "--bubble-color": props?.bg_color ?? colorSet.grid,
    "--bubble-border": colorSet.grid
  } as React.CSSProperties;

  // ::: 区切りでミニカードを作る
  // content が文字列であることを確認して扱う
  const rawText: string = typeof content === "string" ? content : "";
  const items: string[] = rawText
    .split(":::")
    .map((v: string) => v.trim())
    .filter(Boolean);

  return (
    <div
      className={`${styles.card} ${styles.glass}`}
      style={style}
    >
      {items.map((text: string, i: number) => (
        <div key={i} className={styles.miniCard} style={miniCardStyle}>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};