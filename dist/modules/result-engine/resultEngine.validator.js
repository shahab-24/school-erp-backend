"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
const resultEngine_errors_1 = require("./resultEngine.errors");
function validateConfig(cfg, structure) {
    const examKeys = new Set(structure.components.map((e) => e.key));
    for (const n of cfg.normalization) {
        if (!examKeys.has(n.examKey)) {
            throw new resultEngine_errors_1.ValidationError(`Normalization examKey not found: ${n.examKey}`);
        }
        if (n.from <= 0 || n.to <= 0) {
            throw new resultEngine_errors_1.ValidationError(`Invalid normalization scale for ${n.examKey}`);
        }
    }
    if (cfg.aggregation.type === "average" && !cfg.aggregation.examKeys?.length) {
        throw new resultEngine_errors_1.ValidationError("Average aggregation requires examKeys");
    }
    if (cfg.aggregation.type === "weighted") {
        if (!cfg.aggregation.weights) {
            throw new resultEngine_errors_1.ValidationError("Weighted aggregation requires weights");
        }
    }
}
