import { Schema } from "mongoose";
export declare const ResultConfig: import("mongoose").Model<{
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    session: string;
    version: number;
    isActive: boolean;
    class: number;
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
    aggregation: {
        type: "sum" | "average" | "weighted";
        examKeys: string[];
        weights?: Map<string, number> | null | undefined;
    };
    passRules?: {
        passPercentage: number;
        failIfAnySubjectFail: boolean;
    } | null | undefined;
    grading?: {
        type: "percentage" | "gpa";
        scale: import("mongoose").Types.DocumentArray<{
            min: number;
            label: string;
            point?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            min: number;
            label: string;
            point?: number | null | undefined;
        }> & {
            min: number;
            label: string;
            point?: number | null | undefined;
        }>;
    } | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
