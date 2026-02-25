import styles from "./Card.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export const Card = ({ content }: Props) => {
  return (
    <div className={styles.card}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};