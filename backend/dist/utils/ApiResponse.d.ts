export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T | undefined;
    errors?: unknown | undefined;
    constructor(success: boolean, message: string, data?: T | undefined, errors?: unknown | undefined);
    static success<T>(message: string, data?: T): ApiResponse<T>;
    /**
     * `errors` puede ser un objeto de validación ya sanitizado (p. ej.
     * `zodError.flatten().fieldErrors`) o la excepción cruda recién capturada.
     * Si es una excepción —incluye errores de Prisma, que heredan de Error—
     * se registra en el servidor pero nunca se manda al cliente: mandarla tal
     * cual exponía código/tabla/columna de Prisma y la versión del cliente en
     * el cuerpo de la respuesta HTTP.
     */
    static error(message: string, errors?: unknown): ApiResponse<unknown>;
}
//# sourceMappingURL=ApiResponse.d.ts.map