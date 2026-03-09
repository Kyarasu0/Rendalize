import styles from "./NoteMarkerTitle.module.css";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg"

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  font_color?: string;
  font_size?: string;
  bg_color?: string;
  color?: Record<string, string>;
}

export const NoteMarkerTitle = ({
    content,
    align = "left",
    bg_color = "transparent",
    font_color = "black",
    font_size,
    color = COLORS,
}: Props) => {

    const resolveColor = (value: string) => {
        if (value in color) return color[value];
        return value;
    };

    const style: React.CSSProperties = {
        // align
        justifyContent: align,
        textAlign: align,

        // bg_color
        backgroundColor: bg_color ? 
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