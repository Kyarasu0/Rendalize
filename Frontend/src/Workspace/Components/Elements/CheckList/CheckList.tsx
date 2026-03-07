import styles from "./CheckList.module.css";
import { CheckSquare } from "lucide-react";
import type { ElementNode } from "../../../Utils/runPipelines";

interface Props extends ElementNode {
  align?: "left" | "center" | "right";
  font_color?: string;
  accent_color?: string;
  bg_color?: string;
  color?: Record<string, string>;
}

export const CheckList = ({
  props,
  align = "left",
  font_color = "black",
  accent_color = "#3b82f6",
  bg_color = "transparent",
}: Props) => {

  const items: string[] = props?.items || [];

  const containerStyle: React.CSSProperties = {
    color: font_color,
    textAlign: align,
    background: bg_color,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <CheckSquare
            className={styles.icon}
            style={{ color: accent_color }}
          />
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
};