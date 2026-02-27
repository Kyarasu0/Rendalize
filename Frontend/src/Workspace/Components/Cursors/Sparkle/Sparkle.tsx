import { useEffect } from "react";

export const Sparkle = () => {
  const previousCursor = document.body.style.cursor;
  document.body.style.cursor = "none";
  useEffect(() => {
    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div");
      sparkle.style.position = "fixed";
      sparkle.style.width = "6px";
      sparkle.style.height = "6px";
      sparkle.style.background = "white";
      sparkle.style.borderRadius = "50%";
      sparkle.style.pointerEvents = "none";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.opacity = "1";
      sparkle.style.transition = "all 0.5s ease-out";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.style.opacity = "0";
        sparkle.style.transform = "scale(2)";
      }, 10);

      setTimeout(() => {
        document.body.removeChild(sparkle);
      }, 500);
    };

    const move = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => {
        window.removeEventListener("mousemove", move);
        document.body.style.cursor = previousCursor;
    }
  }, []);

  return null;
};