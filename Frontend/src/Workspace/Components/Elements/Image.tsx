import type { ElementNode } from "../../Utils/runPipelines";

interface Props extends ElementNode {}

/**
 * 画像要素の描画コンポーネント
 * type: "image" の ElementNode を受け取って表示する
 */
export const Image = ({ props }: Props) => {
  return (
    <img
      src={props?.src}
      style={{
        width: props?.width ?? "100%",
        maxWidth: "100%",
        height: "auto"
      }}
      alt="embedded-image"
    />
  );
};
