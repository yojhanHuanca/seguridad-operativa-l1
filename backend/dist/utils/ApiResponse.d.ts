export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T | undefined;
    errors?: unknown | undefined;
    constructor(success: boolean, message: string, data?: T | undefined, errors?: unknown | undefined);
    static success<T>(message: string, data?: T): ApiResponse<T>;
    static error(message: string, errors?: unknown): ApiResponse<undefined>;
}
//# sourceMappingURL=ApiResponse.d.ts.map