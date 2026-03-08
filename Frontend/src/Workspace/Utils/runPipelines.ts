// ==========================================================
// Pipelineが受け取るデータ
// ==========================================================

export interface PipelineInput {
  content: string
}


// ==========================================================
// Pipelineが返すデータ
// ==========================================================

export interface ElementNode {
  type: string
  props?: Record<string, any>
  content: string | ElementNode[]
}

export interface PipelinePair {
  pipeline: Pipeline
  render: string
}


// ==========================================================
// Pipeline関数の型
// ==========================================================

export type Pipeline = (nodes: ElementNode[]) => ElementNode[]


// ==========================================================
// pipeline実行関数
// ==========================================================
// markdown タイプのみがパイプラインで処理対象
// image などはそのまま通す

export const runPipelines = (
  content: string,
  pipelinePairs: PipelinePair[]
): ElementNode[] => {

  // Startup Log(Function)
  const logOwner = "runPipelines";
  console.log(`\n${logOwner}-Function is running!\n`);

  // Input Log
  console.log(`[${logOwner}] Input => content: ${content}, pipelinePair: ${JSON.stringify(pipelinePairs, null, 2)}`);

  let nodes: ElementNode[] = [
    { type: "text", content }
  ]

  for (const pair of pipelinePairs) {

    // 1つのパイプラインを実行する
    const result = pair.pipeline(nodes)

    // その1つのパイプラインによって編集された部分に対して描画タイプをくっつける
    nodes = result.map(node => {

      if (node.type !== "text") {
        return {
          ...node,
          type: pair.render
        }
      }

      return node
    })

  }

  // Output Log
  console.log(`[${logOwner}] Output => nodes: ${JSON.stringify(nodes, null, 2)}`);
  return nodes
}