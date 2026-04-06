import { GradingSystem } from "../academic-setup/gradingSystem/gradingSystem.model";
import { MarkStructure } from "../academic-setup/markStructure/markStructure.model";
import { ResultConfig } from "../result-config/resultConfig.model";

export async function buildEngineConfig(resultConfigId: string) {
  // 1. get config
  const cfg = await ResultConfig.findById(resultConfigId).lean();

  if (!cfg) {
    throw new Error("ResultConfig not found");
  }

  // 2. get mark structure
  const markStructure = await MarkStructure.findById(
    cfg.markStructureId
  ).lean();

  if (!markStructure) {
    throw new Error("MarkStructure not found");
  }

  // ⚠️ IMPORTANT: gradingSystemId may not exist
  let grading = null;

  if ("gradingSystemId" in cfg && cfg.gradingSystemId) {
    grading = await GradingSystem.findById(cfg.gradingSystemId).lean();
  }

  return {
    exams: markStructure.components,

    normalization: cfg.normalization ?? [],

    aggregation: cfg.aggregation ?? null,

    passRules: cfg.passRules ?? null,

    grading,
  };
}
