import { useEffect } from "react";

export const Marker = () => {
  useEffect(() => {
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    // ===== Canvas作成 =====
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "2147483647";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#3b82f6";

    let isDrawing = false;

    // ===== カーソル =====
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.background = "#3b82f6";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "2147483647";
    dot.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(dot);

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      if (isDrawing) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDrawing = true;
        document.body.style.userSelect = "none";
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        isDrawing = false;
        document.body.style.userSelect = "";
      }
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("mousemove", move, true);
    window.addEventListener("mousedown", handleMouseDown, true);
    window.addEventListener("mouseup", handleMouseUp, true);
    window.addEventListener("contextmenu", handleRightClick, true);

    return () => {
      window.removeEventListener("mousemove", move, true);
      window.removeEventListener("mousedown", handleMouseDown, true);
      window.removeEventListener("mouseup", handleMouseUp, true);
      window.removeEventListener("contextmenu", handleRightClick, true);

      document.body.removeChild(canvas);
      document.body.removeChild(dot);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  return null;
};