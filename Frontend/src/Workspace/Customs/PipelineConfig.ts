// ============================================
//              PipelineConfig
// ============================================
// パイプラインの名前から実際のパイプライン関数を取得するConfig
// Settingファイル内で "pipelines: ["cardPipeline"]" みたいに
// 文字列で指定されたパイプラインを実際の関数に変換するため
// ============================================

import type { Pipeline } from "../Utils/runPipelines";
import { cardPipeline } from "../Pipelines/cardPipeline";
import { imagePipeline } from "../Pipelines/imagePipeline";
import { projectsListPipeline } from "../Pipelines/projectsListPipeline";

// ============================================
// PipelineConfig
// ============================================
// パイプライン名 → パイプライン関数
// ============================================

export const PipelineConfig = {
  cardPipeline,
  imagePipeline,
  projectsListPipeline,
} as const;

// ============================================
// パイプライン名の型
// ============================================
// "cardPipeline" | "imagePipeline" みたいな型になる
// ============================================

export type PipelineKey = keyof typeof PipelineConfig;

// ============================================
// パイプライン名の配列からパイプライン関数を取得
// ============================================

export const getPipelines = (pipelineNames: string[]): Pipeline[] => {
  return pipelineNames
    .map(name => PipelineConfig[name as PipelineKey])
    .filter((pipeline): pipeline is Pipeline => Boolean(pipeline));
};