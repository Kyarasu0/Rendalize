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

  // 要素の種類
  // ElementConfig に定義されている type のいずれか
  type: string

  // props
  props?: Record<string, any>

  // 中身
  content: any
}


// ==========================================================
// Pipeline関数の型
// ==========================================================

export type Pipeline = (input: PipelineInput) => ElementNode[]


// ==========================================================
// pipeline実行関数
// ==========================================================
// markdown タイプのみがパイプラインで処理対象
// image などはそのまま通す

export const runPipelines = (
  content: string,
  pipelines: Pipeline[]
): ElementNode[] => {

  let result: ElementNode[] = [
    {
      type: "markdown",
      content
    }
  ]

  // pipelineを順番に実行
  for (const pipeline of pipelines) {

    const newResult: ElementNode[] = []

    for (const node of result) {

      // markdown タイプだけpipeline対象
      // 他の type (image など) はそのまま通す
      if (node.type === "markdown") {

        const converted = pipeline({
          content: node.content
        })

        newResult.push(...converted)

      } else {

        // markdown 以外はそのまま
        newResult.push(node)

      }

    }

    result = newResult

  }

  return result

}