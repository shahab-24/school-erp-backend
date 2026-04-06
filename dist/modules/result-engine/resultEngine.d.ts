import { ResultConfigDTO, AcademicRecordDTO, StudentResult, MarkStructureDTO } from "./resultEngine.types";
export declare function calculateResults(records: AcademicRecordDTO[], cfg: ResultConfigDTO, structure: MarkStructureDTO): StudentResult[];
