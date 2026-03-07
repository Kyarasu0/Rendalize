import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/*
==================================================
Image Pipeline

記法

![path option=value option=value]

例
![img.png width=100% radius=12 border=2px:red]
==================================================
*/

export const imagePipeline: Pipeline = (nodes) => {

  const result: ElementNode[] = [];

  for (const node of nodes) {

    // text以外はそのまま
    if (node.type !== "text") {
      result.push(node);
      continue;
    }

    const text = node.content as string;

    /*
    ================================
    ![ ... ] を検出
    ================================
    */
    const match = text.match(/!\[(.*?)\]/);

    if (!match) {
      result.push(node);
      continue;
    }

    const inside = match[1];

    /*
    ================================
    空白で分解

    path width=100% radius=10
    ================================
    */
    const parts = inside.split(" ");

    const src = parts[0];

    const props: Record<string, any> = {
      src
    };

    /*
    ================================
    option=value を解析
    ================================
    */
    parts.slice(1).forEach(p => {

      const [key, value] = p.split("=");

      if (!key || !value) return;

      if (key === "width") props.width = value;
      if (key === "radius") props.radius = value;

      if (key === "border") {

        const [size, color] = value.split(":");

        props.borderSize = size;
        props.borderColor = color;

      }

    });

    /*
    ================================
    Image Node
    ================================
    */
    result.push({
      type: "image",
      props,
      content: ""
    });

  }

  return result;

};