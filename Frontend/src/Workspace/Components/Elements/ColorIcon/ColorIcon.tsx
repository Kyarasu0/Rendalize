import * as Icons from "lucide-react";
import type { ElementNode } from "../../../Utils/runPipelines";
import styles from "./ColorIcon.module.css";
import React from "react";
import { COLORS } from "../../../SampleData/ForWhiteBg"
import ReactMarkdown from "react-markdown"

interface Props extends ElementNode {}

export const ColorIcon = ({ props }: Props) => {
  // color
  const color = props?.color ?? COLORS;

  const iconName = props?.iconName;
  const bgColor = props?.bg_color ?? color.blue;
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
          color: "white",
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