import styles from "./TitleCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
}

export const TitleCard = ({
  content,
  align = "left",
}: Props) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};