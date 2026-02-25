import styles from "./Layout.module.css";

interface Props {
  theme?: string;
}

export const Layout = ({ theme }: Props) => {
  return <div className={`${styles.background} ${styles[theme || "dark"]}`} />;
};