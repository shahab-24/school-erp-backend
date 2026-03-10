import { ResultConfig } from "../result-config/resultConfig.model";
import { MarkStructure } from "../academic-setup/markStructure.model";
import { GradingSystem } from "../academic-setup/gradingSystem.model";

export async function buildEngineConfig(resultConfigId: string) {
  const cfg = await ResultConfig.findById(resultConfigId).lean();

  const markStructure = await MarkStructure.findById(
    cfg.markStructureId
  ).lean();

  const grading = await GradingSystem.findById(cfg.gradingSystemId).lean();

  return {
    exams: markStructure.components,

    normalization: cfg.normalization,

    aggregation: cfg.aggregation,

    passRules: cfg.passRules,

    grading,
  };
}
