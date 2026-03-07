import type { ElementNode } from "../../Utils/runPipelines";
import * as Icons from "lucide-react";
import React from "react";

interface Step {
  id?: string;
  icon?: string;
  text?: string;
  desc?: string;
  color?: string;
}

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * ステップサークル要素の描画コンポーネント
 * type: "stepcircle" の ElementNode を受け取ってステップサークル形式で表示する
 */
export const StepCircleElement = ({ props, content, color }: Props) => {
  // content を JSON パースして steps 配列に変換
  let steps: Step[] = [];
  try {
    steps = JSON.parse(content);
  } catch (e) {
    console.warn("StepCircle JSON parse failed:", e);
  }

  const bg_color = props?.bg_color ?? "rgba(255,255,255,0.1)";
  const font_color = props?.font_color ?? "white";
  const width = props?.width ?? "100%";

  const style: React.CSSProperties = {
    width,
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : `0 8px 32px ${color?.shadow ?? 'rgba(0,0,0,0.2)'}`,
    border: bg_color === "none" ? undefined : `1px solid ${color?.grid ?? 'rgba(255,255,255,0.2)'}`
  };

  return (
    <div style={style}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '2rem'
      }}>
        {steps.map((step, i) => {
          // アイコンを取得（lucide-reactから）
          const IconComponent = (Icons as any)[step.icon || 'Circle'];

          return (
            <div
              key={step.id || i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '150px'
              }}
            >
              {/* サークル */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: step.color || '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: `0 4px 12px ${step.color || '#3b82f6'}40`
                }}
              >
                {IconComponent && <IconComponent size={32} color="white" />}
              </div>

              {/* テキスト */}
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                color: step.color || '#3b82f6'
              }}>
                {step.text}
              </h3>

              {/* 説明 */}
              {step.desc && (
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  lineHeight: 1.4
                }}>
                  {step.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};