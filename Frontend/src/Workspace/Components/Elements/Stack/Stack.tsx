import styles from "./Stack.module.css";
import ReactMarkdown from "react-markdown";
import type { ElementNode } from "../../../Utils/runPipelines";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg"

/*
==================================================
Stack Element

stackPipeline が生成した node を描画する
==================================================
*/

interface Props extends ElementNode {}

export const Stack = ({
  content,
  props
}: Props) => {

  // color
  const color = props?.color ?? COLORS;

  const style: React.CSSProperties = {
    alignItems: props?.align === "center"
      ? "center"
      : props?.align === "right"
      ? "flex-end"
      : "flex-start",
    textAlign: props?.align ?? "left",
    backgroundColor: props?.bg_color ?? color.default_element_bg,
    color: props?.font_color ?? color.default_font,
  };

  const miniCardStyle: React.CSSProperties = {
    border: `1px solid ${color.grid}`,
    backgroundColor: props?.bg_color ?? color.default_element_bg
  }

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
      <div className={styles.stack}>
        {items.map((text: string, i: number) => (
          <div key={i} className={styles.miniCard} style={miniCardStyle}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};