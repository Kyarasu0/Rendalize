import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/*
==================================================
List Pipeline

記法

- A
- B
- C

を検出してListコンポーネントに変換
==================================================
*/

export const listPipeline: Pipeline = (nodes) => {

  // Startup Log(Function)
  const logOwner = "listPipeline";
  console.log(`\n${logOwner}-Function is running!\n`);

  // Input Log
  console.log(`[${logOwner}] Input => ${JSON.stringify(nodes, null, 2)}`);


  const result: ElementNode[] = [];

  for (const node of nodes) {

    // text以外はそのまま
    if (node.type !== "text") {
      result.push(node);
      continue;
    }

    const text = node.content as string;

    // テキストを行ごとに分割
    const lines = text.split("\n");

    let currentList: string[] = [];

    for (const line of lines) {
      // リスト行の場合
      if (line.trim().startsWith("- ")) {
        currentList.push(line.replace(/^- /, "").trim());
        continue;
      }

      // リストが終わった場合
      if (currentList.length > 0) {
        result.push({
          type: "list",
          props: { items: currentList },
          content: ""
        });
        currentList = [];
      }

      // 通常テキスト
      if (line.trim()) {
        result.push({
          type: "text",
          content: line
        });
      }
    }

    // 最後がリストで終わる場合
    if (currentList.length > 0) {
      result.push({
        type: "list",
        props: { items: currentList },
        content: ""
      });
    }
  }

  // Output Log
  console.log(`[${logOwner}] Output => ${JSON.stringify(result, null, 2)}`);

  return result;
};