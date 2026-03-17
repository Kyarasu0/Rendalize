import styles from "./ProjectsListCard.module.css";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg"

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
  json?: string; // JSON文字列または "json=ファイル名"
  columns?: number;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  color?: Record<string, string>
  style?: React.CSSProperties;
}

export const ProjectsListCard = ({
  json = "",
  columns = 1,
  align = "left",
  bg_color = "white",
  font_color = "black",
  color = COLORS,
  style,
}: Props) => {

  const resolveColor = (value: string) => {
    if (value in color) return color[value];
    return value;
  };

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}/Data/JSONs/${json}`);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (e) {
        console.warn("Failed to load Projects JSON:", e);
      }
    };

    loadProjects();
  }, [json]);

  // card 全体スタイル
  const cardStyle: React.CSSProperties = {
    // align
    alignItems: align,
    textAlign: align,

    // bg_color
    backgroundColor: bg_color ? 
        bg_color === "none"
            ? "transparent"
            : resolveColor(bg_color)
        : color.default_card_bg,


    // font_color
    color: font_color ? resolveColor(font_color) : color.default_font,

    // 装飾
    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",

    boxShadow:
        bg_color === "none"
            ? undefined
            : `0 6px 18px ${color.shadow}`,

    // border:
    //     bg_color === "none"
    //         ? undefined
    //         : `1px solid ${color.grid}`,
    ...style,
  };
  
  const gridStyle: React.CSSProperties = columns
    ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
    : { "--min": `280px` } as React.CSSProperties;

  return (
    <div
      className={`${styles.card} ${styles.grid} ${bg_color === "none" ? styles.none : styles.glass}`}
      style={{...cardStyle, ...gridStyle}}
    >
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
                  ((e.target as HTMLImageElement).src =
                    "https://placehold.co/64x64/e2e8f0/94a3b8?text=APP")
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
  );
};