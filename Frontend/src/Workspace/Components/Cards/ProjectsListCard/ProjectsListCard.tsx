import styles from "./ProjectsListCard.module.css";
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

interface Props {
  content: string; // JSON文字列で projects 配列を渡す
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
}

export const ProjectsListCard = ({
  content,
  align = "left",
  bg_color = "white",
  font_color = "black",
}: Props) => {
  // content を JSON パースして projects 配列に変換
  let projects: Project[] = [];
  const match = content.match(/\[(\s*\{[^]*?\}\s*,?)+\]/m);
  if (match) {
    try {
      projects = JSON.parse(match[0]);
    } catch (e) {
      console.warn("Projects JSON parse failed:", e);
    }
  }

  const style: React.CSSProperties = {
    backgroundColor: bg_color === "none" ? "transparent" : bg_color,
    color: font_color,
    textAlign: align,
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",
    boxShadow: bg_color === "none" ? undefined : "0 8px 32px rgba(0,0,0,0.2)",
    border: bg_color === "none" ? undefined : "1px solid rgba(255,255,255,0.2)",
  };

  return (
    <div className={`${styles.card} ${bg_color === "none" ? styles.none : styles.glass}`} style={style}>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectItem}>
            <div className={`${styles.leftBar} ${project.color}`} />
            <div className={styles.titleRow}>
              <div className={styles.iconWrapper}>
                <img
                  src={project.icon}
                  alt={`${project.name} icon`}
                  className={styles.iconImg}
                  onError={(e) =>
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/64x64/e2e8f0/94a3b8?text=APP"
                  }
                />
              </div>
              <div className={styles.titleText}>
                <h4>{project.name}</h4>
                <span>{project.startDate}</span>
              </div>
            </div>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.footer}>
              <span>
                {project.memberCount} member{project.memberCount > 1 ? "s" : ""}
              </span>
              <span>Role: {project.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};