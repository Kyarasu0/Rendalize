import styles from "./NormalCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  width?: string;
}

export const NormalCard = ({
  content,
  align = "left",
  bg_color = "white",
  font_color = "black",
  width = "100%",
}: Props) => {
    const style: React.CSSProperties = {
        backgroundColor: bg_color === "none" ? "transparent" : bg_color,
        color: font_color,
        width,
        textAlign: align,
        backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
        boxShadow: bg_color === "none" ? undefined : "0 6px 18px rgba(0,0,0,0.15)",
        border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)"
    };

    return (
    <div
        className={`${styles.card} ${styles[align]} markdown`}
        style={style}
    >
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
    );
};