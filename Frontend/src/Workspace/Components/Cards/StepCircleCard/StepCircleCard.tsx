import styles from "./StepCircleCard.module.css";
import * as Icons from "lucide-react";
import React from "react";

interface Props {
  content: string;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
}

interface Step {
  num?: string;
  icon?: string;
  text?: string;
}

export const StepCircleCard = ({
  content,
  align = "center",
  bg_color = "rgba(255,255,255,0.1)",
  font_color = "white",
}: Props) => {

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 8px 32px rgba(0,0,0,0.2)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)"
  };

  // content → Step配列へ変換
  const steps: Step[] = content
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(/\s+/);
      const step: Step = {};

      parts.forEach(p => {
        const [key, value] = p.split(":");
        if (key && value) {
          step[key as keyof Step] = value;
        }
      });

      return step;
    });

  return (
    <div className={`${styles.card} ${bg_color === "none" ? styles.none : styles.glass}`} style={style}>
      <div className={styles.container}>
        {steps.map((step, i) => {

          const IconComponent =
            (step.icon && (Icons as any)[step.icon]) || Icons.Circle;

          return (
            <div key={i} className={styles.step}>
              <div className={styles.circle}>
                {React.createElement(IconComponent, { className: styles.icon })}
              </div>

              {step.num && (
                <span className={styles.number}>{step.num}</span>
              )}

              <span className={styles.label}>{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};