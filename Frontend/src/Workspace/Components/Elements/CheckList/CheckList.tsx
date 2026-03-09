import styles from "./CheckList.module.css";
import { CheckSquare } from "lucide-react";
import type { ElementNode } from "../../../Utils/runPipelines";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg"

interface Props extends ElementNode {}

export const CheckList = ({ props }: Props) => {
  // color
  const color = props?.color ?? COLORS;

  const items: string[] = props?.items || [];

  const containerStyle: React.CSSProperties = {
    // align
    justifyContent: props?.align ?? "left",
    textAlign: props?.align ?? "left",
    // bg_color
    background: props?.bg_color ?? color.default_element_bg,
    // font_color
    color: props?.font_color ?? color.default_font,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <CheckSquare
            className={styles.icon}
            style={{ color: color.blue }}
          />
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
};