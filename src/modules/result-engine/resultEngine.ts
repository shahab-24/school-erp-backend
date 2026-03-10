import {
  ResultConfigDTO,
  AcademicRecordDTO,
  StudentResult,
  SubjectResult,
  MarkStructureDTO,
} from "./resultEngine.types";

import { validateConfig } from "./resultEngine.validator";
import { ResultEngineError } from "./resultEngine.errors";

function normalize(obtained: number, from: number, to: number) {
  return (obtained * to) / from;
}

function aggregate(
  values: Record<string, number>,
  cfg: ResultConfigDTO
): number {
  const { type, examKeys, weights } = cfg.aggregation;

  if (type === "sum") {
    return Object.values(values).reduce((a, b) => a + b, 0);
  }

  if (type === "average") {
    const keys = examKeys!;

    const picked = keys.map((k) => values[k]).filter((v) => v != null);

    if (!picked.length) return 0;

    return picked.reduce((a, b) => a + b, 0) / picked.length;
  }

  if (type === "weighted") {
    let totalWeight = 0;
    let sum = 0;

    for (const [k, w] of Object.entries(weights!)) {
      if (values[k] != null) {
        totalWeight += w;
        sum += values[k] * w;
      }
    }

    if (!totalWeight) return 0;

    return sum / totalWeight;
  }

  throw new ResultEngineError("Unknown aggregation type");
}

export function calculateResults(
  records: AcademicRecordDTO[],
  cfg: ResultConfigDTO,
  structure: MarkStructureDTO
): StudentResult[] {
  validateConfig(cfg, structure);

  const normMap = new Map(cfg.normalization.map((n) => [n.examKey, n]));

  const maxTotal = structure.components.reduce(
    (s, c) => s + (normMap.get(c.key)?.to ?? 0),
    0
  );

  const results: StudentResult[] = [];

  for (const rec of records) {
    const subjectsOut: Record<string, SubjectResult> = {};

    let studentTotal = 0;
    let anySubjectFail = false;

    for (const [subjectId, exams] of Object.entries(rec.marks)) {
      const normalized: Record<string, number> = {};

      for (const [examKey, obtained] of Object.entries(exams)) {
        const n = normMap.get(examKey);

        if (!n) continue;

        normalized[examKey] = normalize(obtained, n.from, n.to);
      }

      const final = aggregate(normalized, cfg);

      const failed = cfg.passRules?.failIfAnySubjectFail
        ? final < (cfg.passRules?.passPercentage ?? 33)
        : false;

      if (failed) anySubjectFail = true;

      subjectsOut[subjectId] = {
        normalized,
        final,
        failed,
      };

      studentTotal += final;
    }

    const percentage = maxTotal > 0 ? (studentTotal / maxTotal) * 100 : 0;

    const failed = cfg.passRules?.failIfAnySubjectFail ? anySubjectFail : false;

    results.push({
      studentId: rec.studentId,
      subjects: subjectsOut,
      total: studentTotal,
      percentage,
      failed,
    });
  }

  return results;
}
