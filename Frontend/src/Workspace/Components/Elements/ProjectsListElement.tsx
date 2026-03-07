import type { ElementNode } from "../../Utils/runPipelines";
import React from "react";

interface Project {
  id: number | string;
  name: string;
  icon: string;
  startDate: string;
  summary: string;
  memberCount: number;
  role: string;
  color: string;
}

interface Props extends ElementNode {
  color?: Record<string, string>;
}

/**
 * プロジェクトリスト要素の描画コンポーネント
 * type: "projects" の ElementNode を受け取ってプロジェクトリスト形式で表示する
 */
export const ProjectsListElement = ({ props, content, color }: Props) => {
  // content を JSON パースして projects 配列に変換
  let projects: Project[] = [];
  try {
    projects = JSON.parse(content);
  } catch (e) {
    console.warn("Projects JSON parse failed:", e);
  }

  const bg_color = props?.bg_color ?? "white";
  const font_color = props?.font_color ?? "black";

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : `0 8px 32px ${color?.shadow ?? 'rgba(0,0,0,0.2)'}`,
    border: bg_color === "none" ? undefined : `1px solid ${color?.grid ?? 'rgba(255,255,255,0.2)'}`
  };

  return (
    <div style={style}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem'
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '1rem',
              border: `1px solid ${project.color}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{project.icon}</span>
              <h3 style={{ margin: 0, color: project.color }}>{project.name}</h3>
            </div>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', opacity: 0.8 }}>
              {project.summary}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span>👥 {project.memberCount} members</span>
              <span>🎯 {project.role}</span>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
              Started: {project.startDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};