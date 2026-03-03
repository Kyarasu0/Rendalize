import styles from "./StackCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
}

export const StackCard = ({
  content,
  align = "left",
  bg_color = "rgba(255,255,255,0.12)",
  font_color = "white",
}: Props) => {

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 8px 32px rgba(0,0,0,0.2)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)"
  };

  // 改行区切りでミニカード化
  const items = content
    .split(":::")
    .map(l => l.trim())
    .filter(Boolean);

  return (
    <div className={`${styles.card} ${bg_color === "none" ? styles.none : styles.glass}`} style={style}>
      <div className={styles.stack}>
        {items.map((text, i) => (
          <div key={i} className={styles.miniCard}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};