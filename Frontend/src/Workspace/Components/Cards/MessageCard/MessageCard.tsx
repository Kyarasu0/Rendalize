import styles from "./MessageCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "Left" | "Right";
  bg_color?: string;
  font_color?: string;
}

export const MessageCard = ({ content, align = "Left", bg_color="white", font_color="black" }: Props) => {
  // "\n"でカードとして区切って無効な要素を潰す
  // ["# タイトル", "内容"]
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  const cardStyle = {
    backgroundColor: bg_color,
    color: font_color
  };

  return (
    align == "Left" ? (
      <div className={`${styles.card}`} style={cardStyle}>
        <div className={`${styles.titleSide}`}><ReactMarkdown>{lines[0]}</ReactMarkdown></div>
        <div className={`${styles.contentSide}`}><ReactMarkdown>{lines.slice(1).join('\n')}</ReactMarkdown></div>
      </div>
    ):(
      <div className={`${styles.card}`} style={cardStyle}>
        <div className={`${styles.contentSide}`}><ReactMarkdown>{lines.slice(1).join('\n')}</ReactMarkdown></div>
        <div className={`${styles.titleSide}`}><ReactMarkdown>{lines[0]}</ReactMarkdown></div>
      </div>
    )
  );
};