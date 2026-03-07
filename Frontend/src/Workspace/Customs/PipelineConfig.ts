// ============================================
//              PipelineConfig
// ============================================
// パイプラインの名前から実際のパイプライン関数を取得するConfig
// Settingファイル内で "pipelines: ["cardPipeline"]" みたいに
// 文字列で指定されたパイプラインを実際の関数に変換するため
// ============================================

import { imagePipeline } from "../Pipelines/imagePipeline";
import { listPipeline } from "../Pipelines/listPipeline";

// ============================================
// PipelineConfig
// ============================================
// パイプライン名 → パイプライン関数
// ============================================

export const PipelineConfig = {
  imagePipeline,
  listPipeline,
} as const;

// ============================================
// パイプライン名の型
// ============================================
// "cardPipeline" | "imagePipeline" みたいな型になる
// ============================================

export type PipelineKey = keyof typeof PipelineConfig;