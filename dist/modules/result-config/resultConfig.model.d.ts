import { Schema } from "mongoose";
export declare const ResultConfig: import("mongoose").Model<{
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
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
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
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
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
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
