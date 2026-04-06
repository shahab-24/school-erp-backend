export declare function publishAndGenerateResult(query: any, actor: {
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
