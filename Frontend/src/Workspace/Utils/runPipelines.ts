// ==========================================================
//        Pipelineの型
// ==========================================================

// pipelineが受け取るデータ
export interface PipelineInput {
    content: string;
}

// pipelineが返すデータ
export interface PipelineOutput {
    type: string;
    props?: Record<string, any>;
    content?: string;
}

// "関数型"を定義する
export type Pipeline = (input: PipelineInput) => PipelineOutput | null;

// ===========================
//         runPipeline
// ===========================
export const runPipelines = (
    content: any,
    pipelines: Pipeline[]
) => {

    let result = content;

    for (const pipeline of pipelines) {
        result = pipeline(result);
    }

    return result;

};