import styles from "./ListCard.module.css";
import { CheckSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
}

export const ListCard = ({
  content,
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
    <div className={styles.card} style={style} >
      <ReactMarkdown
        components={{
          li: ({ children }) => (
            <li className={styles.item}>
              <CheckSquare className={styles.check} />
              <span>{children}</span>
            </li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};