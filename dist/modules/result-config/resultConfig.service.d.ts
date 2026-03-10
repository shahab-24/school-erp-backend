export declare const ResultConfigService: {
    create(payload: any): Promise<import("mongoose").Document<unknown, {}, {
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        schoolId: import("mongoose").Types.ObjectId;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }> & {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }>;
        gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
        aggregation?: {
            examKeys: string[];
            type?: "sum" | "average" | "weighted" | null | undefined;
            weights?: Map<string, number> | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        schoolId: import("mongoose").Types.ObjectId;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }> & {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }>;
        gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
        aggregation?: {
            examKeys: string[];
            type?: "sum" | "average" | "weighted" | null | undefined;
            weights?: Map<string, number> | null | undefined;
        } | null | undefined;
        passRules?: {
            passPercentage?: number | null | undefined;
            failIfAnySubjectFail?: boolean | null | undefined;
        } | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getActive(schoolId: string, session: string, cls: number, examTypeId: string): Promise<(import("mongoose").FlattenMaps<{
        isActive: boolean;
        session: string;
        version: number;
        class: number;
        schoolId: import("mongoose").Types.ObjectId;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }> & {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }>;
        gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
        aggregation?: {
            examKeys: string[];
            type?: "sum" | "average" | "weighted" | null | undefined;
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
        schoolId: import("mongoose").Types.ObjectId;
        examTypeId: import("mongoose").Types.ObjectId;
        markStructureId: import("mongoose").Types.ObjectId;
        normalization: import("mongoose").Types.DocumentArray<{
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }> & {
            examKey?: string | null | undefined;
            from?: number | null | undefined;
            to?: number | null | undefined;
        }>;
        gradingSystemId?: import("mongoose").Types.ObjectId | null | undefined;
        aggregation?: {
            examKeys: string[];
            type?: "sum" | "average" | "weighted" | null | undefined;
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
        createdAt: NativeDate;
        updatedAt: NativeDate;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
