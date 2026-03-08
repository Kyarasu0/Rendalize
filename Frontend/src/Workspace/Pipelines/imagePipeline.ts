import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/*
==================================================
Image Pipeline

記法

![/image/path.png width=100% height=200px alt=test]

画像パス + 任意の引数(key=value) を検出して
Imageコンポーネント用のnodeに変換する

例

![/public/Data/Images/Kyarasu.png width=100%]

↓

{
  type: "image",
  props: {
    src: "/public/Data/Images/Kyarasu.png",
    width: "100%"
  }
}
==================================================
*/

export const imagePipeline: Pipeline = (nodes) => {

  // Startup Log(Function)
  const logOwner = "imagePipeline";
  console.log(`\n${logOwner}-Function is running!\n`);

  // Input Log
  console.log(`[${logOwner}] Input => ${JSON.stringify(nodes, null, 2)}`);

  // 最終結果を格納する配列
  const result: ElementNode[] = [];

  // nodeを1つずつ処理
  for (const node of nodes) {

    // text以外はそのまま流す
    if (node.type !== "text") {
      result.push(node);
      continue;
    }

    // text内容を取得
    const text = node.content as string;

    // 行ごとに分割
    const lines = text.split("\n");

    // 行ごとに処理
    for (const line of lines) {

      const trimmed = line.trim();

      // ======================================
      // 画像記法か判定
      // ![ ... ]
      // ======================================
      if (trimmed.startsWith("![") && trimmed.endsWith("]")) {

        // ![ と ] を除去
        const inner = trimmed.slice(2, -1);

        // スペース区切りで分割
        const parts = inner.split(/\s+/);

        // 最初の要素は画像パス
        const src = parts[0];

        // propsを格納するオブジェクト
        const props: Record<string, any> = {
          src
        };

        // ======================================
        // key=value 形式の引数を解析
        // ======================================
        for (const part of parts.slice(1)) {

          const [key, value] = part.split("=");

          // key=value の形ならpropsに追加
          if (key && value) {
            props[key] = value;
          }

        }

        // Image node を追加
        result.push({
          type: "image",
          props,
          content: ""
        });

        continue;
      }

      // ======================================
      // 通常テキスト
      // ======================================
      if (trimmed) {
        result.push({
          type: "text",
          content: line
        });
      }

    }

  }

  // Output Log
  console.log(`[${logOwner}] Output => ${JSON.stringify(result, null, 2)}`);

  return result;
};