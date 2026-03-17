import * as Icons from "lucide-react";
import type { ElementNode } from "../../../Utils/runPipelines";
import styles from "./ColorIcon.module.css";
import React from "react";
import { COLORS } from "../../../SampleData/ForWhiteBg"
import ReactMarkdown from "react-markdown"

interface Props extends ElementNode {
  color?: Record<string, string>;
}

export const ColorIcon = ({ props, color }: Props) => {
  // color
  const colorSet = color ?? COLORS;

  const iconName = props?.iconName;
  const bgColor = props?.bg_color ?? colorSet.blue;
  const fontColor = props?.font_color ?? "white";
  const width = props?.width ?? "72px";

  // Lucide アイコンを動的取得。なければ Circle をデフォルト
  const IconComponent = (Icons as any)[iconName] || Icons.Circle;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: bgColor, width, height: width }}
      >
        {React.createElement(IconComponent, {
          size: 28,
          color: fontColor,
          className: styles.icon,
        })}
      </div>
      {props?.content && (
        <div className={styles.text}>
          <ReactMarkdown>{props?.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};