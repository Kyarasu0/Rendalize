import { useEffect } from "react";

export const Glow = () => {
  useEffect(() => {
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.width = "80px";
    glow.style.height = "80px";
    glow.style.borderRadius = "50%";
    glow.style.background = "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "9998";
    document.body.appendChild(glow);

    const move = (e: MouseEvent) => {
      glow.style.left = `${e.clientX - 40}px`;
      glow.style.top = `${e.clientY - 40}px`;
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(glow);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  return null;
};