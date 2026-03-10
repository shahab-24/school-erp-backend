export type AggregationType = "sum" | "average" | "weighted";

export interface ExamComponent {
  key: string;
  label: string;
  totalMarks: number;
  required?: boolean;
}

export interface MarkStructureDTO {
  components: ExamComponent[];
}

export interface GradingScale {
  min: number;
  label: string;
  point?: number;
}

export interface GradingSystemDTO {
  type: "percentage" | "gpa";
  scale: GradingScale[];
}

export interface ResultConfigDTO {
  normalization: {
    examKey: string;
    from: number;
    to: number;
  }[];

  aggregation: {
    type: AggregationType;
    examKeys?: string[];
    weights?: Record<string, number>;
  };

  passRules?: {
    passPercentage?: number;
    failIfAnySubjectFail?: boolean;
  };
}

export interface AcademicRecordDTO {
  studentId: string;
  session: string;
  class: number;

  marks: Record<string, Record<string, number>>;
}

export interface SubjectResult {
  normalized: Record<string, number>;
  final: number;
  failed: boolean;
}

export interface StudentResult {
  studentId: string;
  subjects: Record<string, SubjectResult>;
  total: number;
  percentage: number;
  failed: boolean;
}
