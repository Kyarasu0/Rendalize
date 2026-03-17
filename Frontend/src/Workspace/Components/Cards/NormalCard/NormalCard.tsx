import styles from "./NormalCard.module.css";
import type { ElementNode } from "../../../Utils/runPipelines";
import { ElementConfig } from "../../../Customs/ElementConfig";
import ReactMarkdown from "react-markdown";
import { COLORS } from "../../../SampleData/ForWhiteBg"

interface Props {
  elements: ElementNode[];
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  color?: Record<string, string>;
  style?: React.CSSProperties;
}

export const NormalCard = ({
    elements,
    align = "left",
    bg_color = "white",
    font_color = "black",
    color = COLORS,
    style,
}: Props) => {

    const resolveColor = (value: string) => {
        if (value in color) return color[value];
        return value;
    };

    const inputStyleWithDefaults: React.CSSProperties = {
        // align
        alignItems: align,
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
        ...style,
    };

    return (
        <div
            className={styles.card}
            style={inputStyleWithDefaults}
        >
            {elements.map((element, eIdx) => {
                if (element.type === "text") {
                    return (
                        <ReactMarkdown key={eIdx}>
                            {element.content as string}
                        </ReactMarkdown>
                    );
                }

                // ElementConfig からコンポーネントを取得
                const config =
                    ElementConfig[element.type as keyof typeof ElementConfig];
                const Component = config?.component;

                if (!Component) return null;

                return (
                    <Component
                        key={eIdx}
                        {...element}
                        color={color}
                    />
                );
            })}
        </div>
    );
};