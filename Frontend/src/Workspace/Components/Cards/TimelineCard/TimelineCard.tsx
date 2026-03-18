import styles from "./TimelineCard.module.css";
import { useEffect, useState } from "react";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg"

interface TimelineEvent {
  year: string;
  label: string;
  color?: string;
}

interface Props {
  json?: string; // JSON ファイルパス
  bg_color?: string;
  font_color?: string;
  rows?: number; // 縦の行数
  color?: Record<string, string>
  style?: React.CSSProperties;
}

export const TimelineCard = ({
  json = "",
  rows = 5,
  bg_color = "init",
  font_color = "black",
  color = COLORS,
  style,
}: Props) => {

  const resolveColor = (value: string) => {
    if (value in color) return color[value];
    return value;
  };

  const [events, setEvents] = useState<TimelineEvent[]>([]);

  // JSON 読み込み
  useEffect(() => {
    const loadJson = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}Data/JSONs/${json}`);
        const data: TimelineEvent[] = await res.json();
        setEvents(data);
      } catch (e) {
        console.warn("Timeline JSON load failed:", e);
      }
    };
    loadJson();
  }, [json]);

  // card 全体スタイル
    const cardStyle: React.CSSProperties = {
      // bg_color
      backgroundColor: bg_color != "init" ? 
          bg_color === "none"
              ? "transparent"
              : resolveColor(bg_color)
          : color.default_card_bg,
  
  
      // font_color
      color: font_color ? resolveColor(font_color) : color.default_font,
  
      // 装飾
      backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
  
      boxShadow:
          bg_color === "none"
              ? undefined
              : `0 6px 18px ${color.shadow}`,
  
      // border:
      //     bg_color === "none"
      //         ? undefined
      //         : `1px solid ${color.grid}`,
      ...style,
    };

  return (
    <div className={styles.card} style={{...cardStyle}}>
      <div className={styles.timelineLine}
        style={{
          display: "grid",
          gridAutoFlow: "column",       // ← row → column に変更
          gridAutoRows: "auto",         // 1行の高さ自動
          gridTemplateRows: `repeat(${rows}, auto)`, // 行数固定
          gridAutoColumns: "minmax(0, 1fr)",        // 列幅均等
          gap: "32px",
        }}
      >
        {events.map((item, i) => {
          const dotColor = item.color || "#3b82f6";
          return (
            <div key={i} className={styles.eventWrapper}>
              <div
                className={styles.circle}
                style={{ backgroundColor: dotColor }}
              />
              <span className={styles.year} style={{ color: dotColor }}>
                {item.year}
              </span>
              <p className={styles.label} style={{ color: font_color }}>
                {item.label}
              </p>
            </div>
          );
        })}

        {/* 末尾 */}
        <div key={-1} className={styles.eventWrapperEnd}>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#3b82f6" }}
          />
          <span className={styles.year}></span>
          <p className={styles.label} style={{ color: "#3b82f6" }}>
            Coming soon...
          </p>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};