import { useState } from "react";
import styles from "./Navigation.module.css";
import { CursorConfig } from "../../Customs/CursorConfig";
import {
  ChevronLeft,
  ChevronRight,
  MousePointer2,
  Sun,
  Moon
} from "lucide-react";

interface Props {
  onNext: () => void;
  onPrev: () => void;
  onCursorChange: (cursor: string | null) => void;
  cursorOptions: string[];
}

export const Navigation = ({
  onNext,
  onPrev,
  onCursorChange,
  cursorOptions,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(true); // true:白文字, false:黒文字

  const handleSelect = (type: string) => {
    onCursorChange(type === "none" ? null : type);
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      {/* Prev / Next */}
      <div className={styles.navButtons}>
        <button
          onClick={onPrev}
          className={`${styles.iconButton} ${isDark ? styles.dark : styles.light}`}
        >
          <ChevronLeft size={18} color="currentColor" />
        </button>
        <button
          onClick={onNext}
          className={`${styles.iconButton} ${isDark ? styles.dark : styles.light}`}
        >
          <ChevronRight size={18} color="currentColor" />
        </button>
        {/* 太陽・月ボタンで色切替 */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`${styles.iconButton} ${isDark ? styles.dark : styles.light}`}
        >
          {isDark ? <Sun size={18} color="currentColor"/> : <Moon size={18} color="currentColor"/>}
        </button>
      </div>

      <div className={styles.divider} />

      {/* Cursor Area */}
      <div
        className={styles.cursorArea}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <button className={`${styles.iconButton} ${isDark ? styles.dark : styles.light}`}>
          <MousePointer2 size={18} color="currentColor" />
        </button>

        <div
          className={`${styles.expandArea} ${isExpanded ? styles.expanded : ""}`}
        >
          {cursorOptions.map((key) => {
            const config =
              CursorConfig[key as keyof typeof CursorConfig];
            if (!config) return null;

            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`${styles.optionButton} ${isDark ? styles.dark : styles.light}`}
              >
                {config.label}
              </button>
            );
          })}

          <button
            onClick={() => handleSelect("none")}
            className={`${styles.optionButton} ${isDark ? styles.dark : styles.light}`}
          >
            None
          </button>
        </div>
      </div>
    </div>
  );
};