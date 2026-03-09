import { imagePipeline } from "../Pipelines/imagePipeline";
import { listPipeline } from "../Pipelines/listPipeline";
import { stackPipeline } from "../Pipelines/stackPipeline";
import { iconPipeline } from "../Pipelines/iconPipeline";

export const PipelineConfig = {
  imagePipeline,
  listPipeline,
  stackPipeline,
  iconPipeline,
} as const;

export type PipelineKey = keyof typeof PipelineConfig;