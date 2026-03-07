import type { Pipeline } from "../Utils/runPipelines";

export const imagePipeline: Pipeline = ({ content }) => {

  // :::image width=100%
  // /path/to/image.png
  // :::

  const match = content.match(
    /:::image\s+width=(\S+)\s*\n([\s\S]*?)\n:::/
  );

  if (!match) {
    // 画像記法が無い場合はそのまま markdown として返す
    return [
      {
        type: "markdown",
        content
      }
    ];
  }

  const width = match[1] ?? "100%";
  const src = match[2].trim();

  return [
    {
      type: "image",
      props: {
        width,
        src
      },
      content: ""
    }
  ];
};