import { imagePipeline } from "../Pipelines/imagePipeline";
import { listPipeline } from "../Pipelines/listPipeline";
import { stackPipeline } from "../Pipelines/stackPipeline";

export const PipelineConfig = {
  imagePipeline,
  listPipeline,
  stackPipeline,
} as const;

export type PipelineKey = keyof typeof PipelineConfig;