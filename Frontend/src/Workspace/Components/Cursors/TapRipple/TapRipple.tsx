import { useEffect } from "react";

export const TapRipple = () => {
  useEffect(() => {
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    // =========================
    // 要素選択完全無効化
    // =========================
    const preventSelection = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("dragstart", preventSelection);
    document.addEventListener("contextmenu", preventSelection);

    document.body.style.userSelect = "none";

    // =========================
    // カーソル本体
    // =========================
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.width = "10px";
    dot.style.height = "10px";
    dot.style.background = "#3b82f6";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "2147483647";
    dot.style.boxShadow =
      "0 0 8px #3b82f6, 0 0 20px rgba(59,130,246,0.6)";
    dot.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(dot);

    // =========================
    // 外側リング
    // =========================
    const ring = document.createElement("div");
    ring.style.position = "fixed";
    ring.style.width = "28px";
    ring.style.height = "28px";
    ring.style.border = "2px solid rgba(59,130,246,0.6)";
    ring.style.borderRadius = "50%";
    ring.style.pointerEvents = "none";
    ring.style.zIndex = "2147483647";
    ring.style.transition = "transform 0.15s ease-out";
    ring.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(ring);

    // =========================
    // マウス追従
    // =========================
    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    // =========================
    // 波紋
    // =========================
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.border = "2px solid #3b82f6";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "2147483647";
      ripple.style.transform =
        "translate(-50%, -50%) scale(0.3)";
      ripple.style.opacity = "0.9";
      ripple.style.transition = "all 0.8s ease-out";

      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform =
          "translate(-50%, -50%) scale(4)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);

      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("dragstart", preventSelection);
      document.removeEventListener("contextmenu", preventSelection);

      document.body.style.userSelect = "";
      document.body.style.cursor = previousCursor;

      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
};