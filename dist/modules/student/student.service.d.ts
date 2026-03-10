import type { CreateStudentDTO, ListStudentsQuery, PromoteDTO, StipendDTO, PaginatedResult } from "./student.types";
import type { IStudent } from "./student.model";
export declare const StudentService: {
    create(payload: CreateStudentDTO): Promise<IStudent>;
    list(query: ListStudentsQuery): Promise<PaginatedResult<IStudent>>;
    getByUid(studentUid: string): Promise<IStudent | null>;
    updateStatus(studentUid: string, status: string): Promise<IStudent>;
    promote(studentUid: string, entry: PromoteDTO): Promise<IStudent>;
    bulkPromote(payload: {
        session: string;
        fromClass: number;
        toClass: number;
        studentUids: string[];
        result: "promoted" | "repeat";
        remarks?: string;
    }): Promise<{
        promoted: number;
        students: ((import("mongoose").Document<unknown, {}, IStudent, {}, {}> & IStudent & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null)[];
    }>;
    updateStipendBeneficiary(studentUid: string, payload: StipendDTO): Promise<IStudent>;
    getStipendBeneficiary(studentUid: string): Promise<any>;
    updateImage(studentUid: string, imageUrl: string, cloudinaryPublicId?: string): Promise<IStudent>;
    getSessions(): Promise<string[]>;
    getClasses(): Promise<number[]>;
    getClassRoster(classNum: number, session: string): Promise<(import("mongoose").FlattenMaps<IStudent> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getStats(session?: string): Promise<{
        total: number;
        byGender: any[];
        byStatus: any[];
        byClass: any[];
    }>;
};
