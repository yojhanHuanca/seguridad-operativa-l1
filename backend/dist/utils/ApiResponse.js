export class ApiResponse {
    success;
    message;
    data;
    errors;
    constructor(success, message, data, errors) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
    static success(message, data) {
        return new ApiResponse(true, message, data);
    }
    static error(message, errors) {
        return new ApiResponse(false, message, undefined, errors);
    }
}
//# sourceMappingURL=ApiResponse.js.map