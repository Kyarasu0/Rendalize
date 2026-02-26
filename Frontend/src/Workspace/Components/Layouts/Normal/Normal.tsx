import styles from "./Normal.module.css";

interface Props {
  theme?: string;
}

export const Normal = ({ theme }: Props) => {
  return <div className={`${styles.background} ${styles[theme || "dark"]}`} />;
};