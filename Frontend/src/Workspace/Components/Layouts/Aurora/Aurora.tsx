import { useEffect, useState } from "react";
import styles from "./Aurora.module.css";

export const Aurora = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className={styles.container}
      style={
        {
          "--mouse-x": `${pos.x}%`,
          "--mouse-y": `${pos.y}%`,
        } as React.CSSProperties
      }
    >
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.grid} />
    </div>
  );
};