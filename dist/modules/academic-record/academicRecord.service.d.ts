import mongoose from "mongoose";
interface UpsertDraftPayload {
    schoolId: string;
    studentId: string;
    session: string;
    class: number;
    scope: "terminal" | "annual";
    terminalKey?: string;
    marks: Record<string, Record<string, number>>;
}
interface QueryFilter {
    schoolId?: mongoose.Types.ObjectId;
    studentId?: string;
    session?: string;
    class?: number;
    scope?: "terminal" | "annual";
    terminalKey?: string;
    status?: "DRAFT" | "SUBMITTED" | "PUBLISHED";
}
export declare const AcademicRecordService: {
    /**
     * Create or update draft record
     */
    upsertDraft(payload: UpsertDraftPayload): Promise<{
        success: boolean;
        data: mongoose.FlattenMaps<import("./academicRecord.model").IAcademicRecord> & Required<{
            _id: mongoose.Types.ObjectId;
        }> & {
            __v: number;
        };
        message: string;
    }>;
    /**
     * Submit draft
     */
    submit(query: QueryFilter): Promise<{
        success: boolean;
        data: mongoose.FlattenMaps<import("./academicRecord.model").IAcademicRecord> & Required<{
            _id: mongoose.Types.ObjectId;
        }> & {
            __v: number;
        };
        message: string;
    }>;
    /**
     * Unlock submitted record
     */
    unlock(query: QueryFilter): Promise<{
        success: boolean;
        data: mongoose.FlattenMaps<import("./academicRecord.model").IAcademicRecord> & Required<{
            _id: mongoose.Types.ObjectId;
        }> & {
            __v: number;
        };
        message: string;
    }>;
    /**
     * Publish record + generate result
     */
    publish(query: QueryFilter, actor: {
        userId: string;
        role: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            studentId: string;
            session: string;
            class: number;
        };
    }>;
    /**
     * List records
     */
    listByClass(filter: QueryFilter, options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        success: boolean;
        data: (mongoose.FlattenMaps<import("./academicRecord.model").IAcademicRecord> & Required<{
            _id: mongoose.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    /**
     * Get record by id
     */
    getById(id: string, schoolId: mongoose.Types.ObjectId): Promise<{
        success: boolean;
        data: mongoose.FlattenMaps<import("./academicRecord.model").IAcademicRecord> & Required<{
            _id: mongoose.Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
};
export {};
