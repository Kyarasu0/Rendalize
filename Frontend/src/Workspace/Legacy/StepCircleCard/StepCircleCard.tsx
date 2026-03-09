import styles from "./StepCircleCard.module.css";
import * as Icons from "lucide-react";
import React from "react";

interface Step {
  id?: string;
  icon?: string;
  text?: string;
  desc?: string;
  color?: string;
}

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  width?: string;
}

export const StepCircleCard = ({
  content,
  align = "center",
  bg_color = "rgba(255,255,255,0.1)",
  font_color = "white",
  width = "100%",
}: Props) => {
  // JSON抽出
  let steps: Step[] = [];
  const match = content.match(/\[(\s*\{[^]*?\}\s*,?)+\]/m);

  if (match) {
    try {
      steps = JSON.parse(match[0]);
    } catch (e) {
      console.warn("StepCircleCard JSON parse failed:", e);
    }
  }

  const style: React.CSSProperties = {
    width,
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 8px 32px rgba(0,0,0,0.2)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)",
  };

  return (
    <div
      className={`${styles.card} ${
        bg_color === "none" ? styles.none : styles.glass
      }`}
      style={style}
    >
      <div className={styles.container}>
        {steps.map((step, i) => {
          const IconComponent =
            (step.icon && (Icons as any)[step.icon]) || Icons.Circle;

          return (
            <div key={i} className={styles.step}>
              <div
                className={styles.circle}
                style={{ backgroundColor: step.color || "#888" }}
              >
                {React.createElement(IconComponent, {
                  className: styles.icon,
                })}
              </div>

              <div className={styles.textBlock}>
                <span className={styles.label}>{step.text}</span>
                {step.desc && (
                  <span className={styles.desc}>{step.desc}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};