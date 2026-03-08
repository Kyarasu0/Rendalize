import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/*
==================================================
Stack Pipeline

記法

::stack align=center bg_color=none font_color=white

A
:::
B
:::
C

::

を検出して stack エレメントに変換する
==================================================
*/

export const stackPipeline: Pipeline = (nodes) => {

  const result: ElementNode[] = [];

  let inStack = false;
  let stackLines: string[] = [];
  let props: Record<string, any> = {};

  for (const node of nodes) {

    if (node.type !== "text") {
      result.push(node);
      continue;
    }

    const line = node.content as string;
    const trimmed = line.trim();

    // =============================
    // stack開始
    // =============================
    if (trimmed.startsWith("::Stack")) {

      inStack = true;
      stackLines = [];
      props = {};

      const args = trimmed.replace("::Stack", "").trim().split(/\s+/);

      for (const arg of args) {
        const [key, value] = arg.split("=");
        if (key && value) props[key] = value;
      }

      continue;
    }

    // =============================
    // stack終了
    // =============================
    if (trimmed === "::" && inStack) {

      result.push({
        type: "stack",
        props,
        content: stackLines.join("\n")
      });

      inStack = false;
      stackLines = [];
      continue;
    }

    // =============================
    // stack内部
    // =============================
    if (inStack) {
      stackLines.push(line);
      continue;
    }

    // =============================
    // 通常テキスト
    // =============================
    result.push(node);

  }

  return result;
};