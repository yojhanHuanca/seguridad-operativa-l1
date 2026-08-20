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
    /**
     * `errors` puede ser un objeto de validación ya sanitizado (p. ej.
     * `zodError.flatten().fieldErrors`) o la excepción cruda recién capturada.
     * Si es una excepción —incluye errores de Prisma, que heredan de Error—
     * se registra en el servidor pero nunca se manda al cliente: mandarla tal
     * cual exponía código/tabla/columna de Prisma y la versión del cliente en
     * el cuerpo de la respuesta HTTP.
     */
    static error(message, errors) {
        if (errors instanceof Error) {
            console.error(`[${message}]`, errors);
            return new ApiResponse(false, message);
        }
        return new ApiResponse(false, message, undefined, errors);
    }
}
//# sourceMappingURL=ApiResponse.js.map