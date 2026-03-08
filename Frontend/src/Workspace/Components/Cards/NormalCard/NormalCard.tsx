import styles from "./NormalCard.module.css";
import type { ElementNode } from "../../../Utils/runPipelines";
import { ElementConfig } from "../../../Customs/ElementConfig";
import ReactMarkdown from "react-markdown";

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
    color =  {
        blue: '#61baff',
        red: '#fd7979',
        green: '#79fd8d',
        white: '#eef2f8',
        black: '#333',
        shadow: 'rgba(0,0,0,0.2)',
        grid: 'rgba(255,255,255,0.2)'
    },
    style,
}: Props) => {

    console.log("bg_color announce!: ", bg_color);

    const resolveColor = (value: string) => {
        if (value in color) return color[value];
        return value;
    };

    const inputStyleWithDefaults: React.CSSProperties = {
        backgroundColor:
            bg_color === "none"
                ? "transparent"
                : resolveColor(bg_color),

        color: resolveColor(font_color),

        textAlign: align,

        backdropFilter: bg_color === "none" ? undefined : "blur(20px)",

        boxShadow:
            bg_color === "none"
                ? undefined
                : `0 6px 18px ${color.shadow}`,

        border:
            bg_color === "none"
                ? undefined
                : `1px solid ${color.grid}`,
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