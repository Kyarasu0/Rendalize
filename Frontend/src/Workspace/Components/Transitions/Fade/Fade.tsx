// WorkSpace/Animations/Fade.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import styles from "./Fade.module.css";

interface Props {
  children: ReactNode;
  trigger?: any; // 変更トリガー、indexとか
  duration?: number; // アニメーション時間
}

export const Fade = ({ children, trigger, duration = 300 }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false); // 一度消す
    const timer = setTimeout(() => setVisible(true), 10); // 少し待ってフェードイン
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.fadeIn : styles.fadeOut}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};