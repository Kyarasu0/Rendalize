import styles from "./FlipCard.module.css";
import ReactMarkdown from "react-markdown";
import { FlipHorizontal } from "lucide-react";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  width?: string;
}

export const FlipCard = ({
  content,
  align = "center",
  bg_color = "rgba(30,41,59,0.8)",
  font_color = "white",
  width = "100%",
}: Props) => {

  const style: React.CSSProperties = {
    width,
    textAlign: align,
    color: font_color,
  };

  // =============================
  // content から front/back を抽出
  // =============================

  const frontMatch = content.match(/::front::([\s\S]*?)::back::/);
  const backMatch = content.match(/::back::([\s\S]*)$/);

  const frontContent = frontMatch ? frontMatch[1].trim() : "";
  const backContent = backMatch ? backMatch[1].trim() : "";

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.inner}>

        {/* Front */}
        <div
          className={`${styles.face} ${styles.front}`}
          style={{ backgroundColor: bg_color }}
        >
          <FlipHorizontal className={styles.icon} />
          <ReactMarkdown>{frontContent}</ReactMarkdown>
        </div>

        {/* Back */}
        <div className={`${styles.face} ${styles.back}`}>
          <ReactMarkdown>{backContent}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
};