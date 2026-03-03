import styles from "./NoteMarkerTitle.module.css";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  font_color?: string;
  font_size?: string;
  bg_color?: string;
}

export const NoteMarkerTitle = ({
  content,
  align = "left",
  font_color = "#fff",
  font_size,
  bg_color = "transparent",
}: Props) => {
  const justify =
    align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";

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
        <div
            className={styles.noteMarkerBox}
            style={style}
        >
            <h1
            className={styles.noteMarkerText}
            style={{
                color: font_color,
                fontSize: font_size ?? "3rem",
            } as React.CSSProperties}
            >
            {content}
            </h1>
        </div>
    );
};