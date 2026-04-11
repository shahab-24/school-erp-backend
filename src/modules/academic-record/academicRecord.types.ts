
// export type RecordStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";

// export interface AcademicRecordInput {
//   studentId: string;
//   session: string;
//   class: number;
//   scope: "terminal" | "annual";
//   terminalKey?: string; // required if scope=terminal

//   // subjectId -> examKey -> obtained
//   marks: Record<string, Record<string, number>>;
// }
// src/modules/academic-record/academicRecord.types.ts
import { Types } from "mongoose";

export type RecordStatus = "DRAFT" | "SUBMITTED" | "PUBLISHED";
export type Scope = "terminal" | "annual";

// ──────────────────────────────────────────────────────────────
// Upsert Draft Payload (সব field required)
// ──────────────────────────────────────────────────────────────
export interface UpsertDraftPayload {
  schoolId: string;         // ✅ required
  studentId: string;        // ✅ required
  session: string;          // ✅ required
  class: number;            // ✅ required
  scope: Scope;
  terminalKey?: string;     // required if scope=terminal
  marks: Record<string, Record<string, number>>;
}

// ──────────────────────────────────────────────────────────────
// Query Filter
// ──────────────────────────────────────────────────────────────
export interface AcademicRecordQueryFilter {
  schoolId?: Types.ObjectId;
  studentId?: string;
  session?: string;
  class?: number;
  scope?: Scope;
  terminalKey?: string;
  status?: RecordStatus;
}

// ──────────────────────────────────────────────────────────────
// Academic Record Input
// ──────────────────────────────────────────────────────────────
export interface AcademicRecordInput {
  studentId: string;
  session: string;
  class: number;
  scope: Scope;
  terminalKey?: string;
  marks: Record<string, Record<string, number>>;
}