import { useEffect } from "react";

export const Laser = () => {
  useEffect(() => {
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.background = "red";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "9999";
    dot.style.boxShadow = "0 0 8px red";
    document.body.appendChild(dot);

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX - 5}px`;
      dot.style.top = `${e.clientY - 5}px`;
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(dot);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  return null;
};