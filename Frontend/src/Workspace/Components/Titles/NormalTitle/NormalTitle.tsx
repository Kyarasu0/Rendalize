// Components/Cards/TitleCard/TitleCard.tsx
import styles from "./NormalTitle.module.css"

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  font_color?: string;
  font_size?: string;
  bg_color?: string;
}

export const NormalTitle = ({
  content,
  align = "left",
  font_color = "#fff",
  bg_color = "transparent",
}: Props) => {
    const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

    const style: React.CSSProperties = {
        backgroundColor: bg_color === "none" ? "transparent" : bg_color,
        color: font_color,
        textAlign: align,
        justifyContent: justify,
        backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
        boxShadow: bg_color === "none" ? undefined : "0 6px 18px rgba(0,0,0,0.15)",
        border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)",
    };

  return (
    <div className={styles.titleBox} style={style}>
      <h1
        style={{
          margin: 0,
          color: font_color,
          fontSize: "3rem",
        }}
      >
        {content}
      </h1>
    </div>
  );
};