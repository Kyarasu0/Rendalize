import styles from "./TimelineCard.module.css";
import { useEffect, useState } from "react";

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
}

export const TimelineCard = ({
  json,
  bg_color = "rgba(255,255,255,0.03)",
  font_color = "white",
  rows = 5,
}: Props) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  // JSON 読み込み
  useEffect(() => {
    const loadJson = async () => {
      try {
        const res = await fetch(`/Data/JSONs/${json}`);
        const data: TimelineEvent[] = await res.json();
        setEvents(data);
      } catch (e) {
        console.warn("Timeline JSON load failed:", e);
      }
    };
    loadJson();
  }, [json]);

  return (
    <div className={styles.card} style={{ backgroundColor: bg_color }}>
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