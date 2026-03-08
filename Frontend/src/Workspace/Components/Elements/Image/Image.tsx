import styles from "./Image.module.css"
import type { ElementNode } from "../../../Utils/runPipelines";

interface Props extends ElementNode {
  color?: Record<string, string>
}

export const Image = ({
  props,
  color
}: Props) => {
  console.log("IMAGE", props?.src);

  const src = props?.src;
  if (!src) return null;

  const style: React.CSSProperties = {
    borderColor: color?.grid ?? "transparent",
    width: props?.width ?? "100%",
  };

  return (
    <>
      <img
        src={src}
        className={styles.image}
        style={style}
        alt="Not found image..."
        onError={() => {
          console.error("Image load failed:", src);
        }}
      />
    </>
  );
};