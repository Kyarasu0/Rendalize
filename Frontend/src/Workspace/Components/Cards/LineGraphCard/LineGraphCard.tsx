import styles from "./LineGraphCard.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string; // Markdown本文
  bg_color?: string;
  font_color?: string;
  stroke_color_start?: string;
  stroke_color_end?: string;
  path_d?: string; // SVG path
  color?: Record<string, string>;
}

export const LineGraphCard = ({
  content,
  bg_color = "rgba(255,255,255,0.05)",
  font_color = "white",
  stroke_color_start = "#10b981",
  stroke_color_end = "#3b82f6",
  path_d = "M0 35 Q 20 30, 30 15 T 60 10 T 100 5",
}: Props) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 6px 18px rgba(0,0,0,0.15)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // ← center固定
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  };

  return (
    <div className={styles.card} style={cardStyle}>
      <div className={styles.graphContainer}>
        <svg viewBox="0 0 100 40" className={styles.graph}>
          <path
            d={path_d}
            fill="none"
            stroke="url(#grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: stroke_color_start, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: stroke_color_end, stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};