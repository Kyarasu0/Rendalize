import type { Pipeline } from "../Utils/runPipelines";

export const projectsListPipeline: Pipeline = ({ content }) => {

  // :::ProjectList
  // [json content]
  // :::

  const match = content.match(
    /:::ProjectList\s*\n([\s\S]*?)\n:::/
  );

  if (!match) {
    // プロジェクトリスト記法が無い場合はそのまま markdown として返す
    return [
      {
        type: "markdown",
        content
      }
    ];
  }

  const jsonContent = match[1].trim();

  return [
    {
      type: "projects",
      props: {},
      content: jsonContent
    }
  ];
};