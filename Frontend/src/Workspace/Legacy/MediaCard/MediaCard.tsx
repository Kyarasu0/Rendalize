import styles from "./MediaCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  media?: string; // ← これだけ追加
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
}

export const MediaCard = ({
  content,
  media,
  align = "left",
  bg_color = "white",
  font_color = "black",
}: Props) => {
  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 6px 18px rgba(0,0,0,0.15)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)"
  };

  return (
    <div className={`${styles.card} ${styles[align]}`} style={style}>
      {media && (
        <img
          src={media}
          alt=""
          className={styles.image}
        />
      )}
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};