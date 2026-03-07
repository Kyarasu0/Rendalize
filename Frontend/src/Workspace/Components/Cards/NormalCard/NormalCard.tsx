import styles from "./NormalCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  color?: Record<string, string>;
}

export const NormalCard = ({
    content,
    align = "left",
    bg_color = "white",
    font_color = "black",
    color =  {
        blue: '#61baff',
        red: '#fd7979',
        green: '#79fd8d',
        white: '#eef2f8',
        black: '#333',
        shadow: 'rgba(0,0,0,0.2)',
        grid: 'rgba(255,255,255,0.2)'
    },
}: Props) => {
    const style: React.CSSProperties = {
        backgroundColor: bg_color === "none" ? "transparent" : bg_color,
        color: font_color,
        textAlign: align,
        backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
        boxShadow: bg_color === "none" ? undefined : `0 6px 18px ${color.shadow}`,
        border: bg_color === "none" ? undefined : `1px solid ${color.grid}`
    };

    return (
    <div
        className={`${styles.card} ${styles[align]}`}
        style={style}
    >
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
    );
};