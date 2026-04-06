export declare const ResultConfigService: {
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, {
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        exams: import("mongoose").Types.DocumentArray<{
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }> & {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation?: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: Map<string, number> | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
        grading?: {
            scale: import("mongoose").Types.DocumentArray<{
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }> & {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }>;
            type?: "percentage" | "gpa" | null | undefined;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        exams: import("mongoose").Types.DocumentArray<{
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }> & {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation?: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: Map<string, number> | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
        grading?: {
            scale: import("mongoose").Types.DocumentArray<{
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }> & {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }>;
            type?: "percentage" | "gpa" | null | undefined;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActive(session: string, cls: number, examTypeId: string): Promise<(import("mongoose").FlattenMaps<{
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        exams: import("mongoose").Types.DocumentArray<{
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }> & {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation?: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            } | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
        grading?: {
            scale: import("mongoose").Types.DocumentArray<{
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }> & {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }>;
            type?: "percentage" | "gpa" | null | undefined;
        } | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    list(query: any): Promise<(import("mongoose").FlattenMaps<{
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        exams: import("mongoose").Types.DocumentArray<{
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }> & {
            required: boolean;
            key: string;
            label: string;
            totalMarks: number;
        }>;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey: string;
            from: number;
            to: number;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey: string;
            from: number;
            to: number;
        }> & {
            examKey: string;
            from: number;
            to: number;
        }>;
        aggregation?: {
            type: "sum" | "average" | "weighted";
            examKeys: string[];
            weights?: {
                clear: () => void;
                delete: (key: string) => boolean;
                forEach: (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any) => void;
                get: (key: string) => number | undefined;
                has: (key: string) => boolean;
                set: (key: string, value: number) => Map<string, number>;
                readonly size: number;
                entries: () => MapIterator<[string, number]>;
                keys: () => MapIterator<string>;
                values: () => MapIterator<number>;
                [Symbol.iterator]: () => MapIterator<[string, number]>;
                readonly [Symbol.toStringTag]: string;
            } | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
        grading?: {
            scale: import("mongoose").Types.DocumentArray<{
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }> & {
                min?: number | null | undefined;
                label?: string | null | undefined;
                point?: number | null | undefined;
            }>;
            type?: "percentage" | "gpa" | null | undefined;
        } | null | undefined;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
