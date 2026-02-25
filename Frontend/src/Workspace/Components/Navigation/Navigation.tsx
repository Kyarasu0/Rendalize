import styles from "./Navigation.module.css";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Navigation = ({ onNext, onPrev }: Props) => {
  return (
    <div className={styles.navigator}>
      <button onClick={onPrev}>←</button>
      <button onClick={onNext}>→</button>
    </div>
  );
};