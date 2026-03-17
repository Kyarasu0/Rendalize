import styles from "./EggListCard.module.css";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../../public/Data/Colors/ForWhiteBg";

interface Sponsor {
  id: number | string;
  name: string;
  image: string;
  bg_color?: string;
}

interface Props {
  json?: string;
  columns?: number;
  align?: "left" | "center" | "right";
  bg_color?: string;
  font_color?: string;
  color?: Record<string, string>;
  style?: React.CSSProperties;
}

export const EggListCard = ({
  json = "",
  align = "center",
  bg_color = "init",
  font_color = "black",
  color = COLORS,
  style,
}: Props) => {

  const resolveColor = (value: string) => {
    if (value in color) return color[value];
    return value;
  };

  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}Data/JSONs/${json}`);
        const data: Sponsor[] = await res.json();
        setSponsors(data);
      } catch (e) {
        console.warn("Failed to load Sponsors JSON:", e);
      }
    };

    loadSponsors();
  }, [json]);

  const cardStyle: React.CSSProperties = {
    justifyItems: align,
    alignItems: "start",
    textAlign: align,

    backgroundColor: bg_color != "init" ? 
        bg_color === "none"
            ? "transparent"
            : resolveColor(bg_color)
        : color.default_card_bg,

    color: resolveColor(font_color),

    backdropFilter: bg_color === "none" ? undefined : "blur(20px)",

    boxShadow:
        bg_color === "none"
        ? undefined
        : `0 6px 18px ${color.shadow}`,

    ...style,
  };

const gridStyle: React.CSSProperties = {
  gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`,
  justifyContent: "stretch", // ← 横幅いっぱいに広げる
  gap: "24px",
};

  return (
    <div
      className={`${styles.card} ${bg_color === "none" ? styles.none : styles.glass}`}
      style={{ ...cardStyle, ...gridStyle }}
    >
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className={styles.egg}
          style={{
            background: sponsor.bg_color ?? "#fff"
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL + sponsor.image}`}
            alt={sponsor.name}
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://placehold.co/120x120/e2e8f0/94a3b8?text=SP")
            }
          />
        </div>
      ))}
    </div>
  );
};