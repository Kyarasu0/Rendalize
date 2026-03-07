import styles from "./Image.module.css"
import type { ElementNode } from "../../../Utils/runPipelines";

interface Props extends ElementNode {
  color?: Record<string, string>
}

export const Image = ({
  props,
  color
}: Props) => {

  const src = props?.src;
  if (!src) return null;

  const style: React.CSSProperties = {
    boxShadow: `0 10px 30px ${color?.shadow}`,
    borderColor: color?.grid ?? "transparent",
  };

  return (
    <div className={styles.wrapper} style={style}>
      <img
        src={src}
        className={styles.image}
        alt=""
      />
    </div>
  );
};