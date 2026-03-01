import styles from "./TimelineCard.module.css";
import ReactMarkdown from "react-markdown";

interface TimelineEvent {
  year: string;
  label: string;
}

interface Props {
  content: string;
  bg_color?: string;
  font_color?: string;
}

export const TimelineCard = ({
  content,
  bg_color = "rgba(255,255,255,0.03)",
  font_color = "white",
}: Props) => {
  let events: TimelineEvent[] = [];

  // Markdown内の配列っぽい文字列を検知
  const match = content.match(/\[(\s*\{[^]*?\}\s*,?)+\]/m);
  if (match) {
    try {
      events = JSON.parse(match[0]);
    } catch (e) {
      console.warn("Timeline JSON parse failed:", e);
    }
  }

  return (
    <div className={styles.card} style={{ backgroundColor: bg_color }}>
      <div className={styles.timelineLine}>
        {events.map((item, i) => (
          <div key={i} className={styles.eventWrapper}>
            <div className={styles.circle}></div>
            <span className={styles.year} style={{ color: "#3b82f6" }}>{item.year}</span>
            <p className={styles.label} style={{ color: font_color }}>{item.label}</p>
          </div>
        ))}

        {/* 末尾用の青丸＋ラベル */}
        <div key={-1} className={styles.eventWrapper}>
          <span className={styles.year} style={{ color: "#3b82f6" }}></span>
          <p className={styles.label} style={{ color: "#3b82f6" }}>Coming soon...</p>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};