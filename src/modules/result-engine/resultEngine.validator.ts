import { ValidationError } from "./resultEngine.errors";
import { ResultConfigDTO, MarkStructureDTO } from "./resultEngine.types";

export function validateConfig(
  cfg: ResultConfigDTO,
  structure: MarkStructureDTO
) {
  const examKeys = new Set(structure.components.map((e) => e.key));

  for (const n of cfg.normalization) {
    if (!examKeys.has(n.examKey)) {
      throw new ValidationError(
        `Normalization examKey not found: ${n.examKey}`
      );
    }

    if (n.from <= 0 || n.to <= 0) {
      throw new ValidationError(`Invalid normalization scale for ${n.examKey}`);
    }
  }

  if (cfg.aggregation.type === "average" && !cfg.aggregation.examKeys?.length) {
    throw new ValidationError("Average aggregation requires examKeys");
  }

  if (cfg.aggregation.type === "weighted") {
    if (!cfg.aggregation.weights) {
      throw new ValidationError("Weighted aggregation requires weights");
    }
  }
}
