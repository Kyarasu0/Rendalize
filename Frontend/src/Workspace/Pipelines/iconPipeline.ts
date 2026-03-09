import type { Pipeline, ElementNode } from "../Utils/runPipelines";

/*
==================================================
Icon Pipeline

マークダウン例:
  ?[Rocket bg_color=red width=30%]

- IconName 部分は何でもOK
- props 部分は key=value 形式で渡せる
==================================================
*/
export const iconPipeline: Pipeline = (nodes) => {
  const result: ElementNode[] = [];

  for (const node of nodes) {
    // text 以外はそのまま
    if (node.type !== "text") {
      result.push(node);
      continue;
    }

    const text = node.content as string;
    const regex = /\?\[(\w+)(\s+[^\]]+)?\]/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // 前の通常テキストを保持
      if (match.index > lastIndex) {
        const normalText = text.slice(lastIndex, match.index).trim();
        if (normalText) result.push({ type: "text", content: normalText });
      }

      const iconName = match[1]; // ここに任意のアイコン名が入る
      const propsStr = match[2] || "";

      // props文字列をオブジェクト化
      const props: Record<string, string> = {};
      propsStr.trim().split(/\s+/).forEach((p) => {
        const [key, value] = p.split("=");
        if (key && value) props[key] = value;
      });

      // icon コンポーネントとして ElementNode に変換
      result.push({
        type: "icon",
        props: { iconName, ...props },
        content: "",
      });

      lastIndex = regex.lastIndex;
    }

    // 最後の通常テキスト
    if (lastIndex < text.length) {
      const normalText = text.slice(lastIndex).trim();
      if (normalText) result.push({ type: "text", content: normalText });
    }
  }

  return result;
};