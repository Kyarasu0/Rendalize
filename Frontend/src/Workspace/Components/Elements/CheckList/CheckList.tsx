import styles from "./CheckList.module.css";
import { CheckSquare } from "lucide-react";
import type { ElementNode } from "../../../Utils/runPipelines";
import { COLORS } from "../../../SampleData/ForWhiteBg"

interface Props extends ElementNode {
  color?: Record<string, string>;
}

export const CheckList = ({ props, color }: Props) => {
  // color
  const colorSet = color ?? COLORS;

  const items: string[] = props?.items || [];

  const containerStyle: React.CSSProperties = {
    // align
    justifyContent: props?.align ?? "left",
    textAlign: props?.align ?? "left",
    // bg_color
    background: props?.bg_color ?? colorSet.default_element_bg,
    // font_color
    color: props?.font_color ?? colorSet.default_font,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <CheckSquare
            className={styles.icon}
            style={{ color: colorSet.blue }}
          />
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
};