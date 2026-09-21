/**
 * Decide si el `message` de una excepción es seguro para mandar al cliente.
 * Errores de Prisma/JS (overflow numérico, tipo incorrecto, etc.) exponen
 * rutas, nombres de columna o mensajes técnicos internos, así que siempre
 * caen al `fallback`. Un `Error` de negocio lanzado a propósito en el
 * código de la aplicación (p. ej. `new Error("El caso ... no existe")`) sí
 * es seguro y se muestra tal cual.
 */
export declare function safeErrorMessage(error: unknown, fallback: string): string;
export declare class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: unknown;
    constructor(success: boolean, message: string, data?: T, errors?: unknown);
    static success<T>(message: string, data?: T): ApiResponse<T>;
    /**
     * `errors` puede ser un objeto de validación ya sanitizado (p. ej.
     * `zodError.flatten().fieldErrors`) o la excepción cruda recién capturada.
     * Si es una excepción —incluye errores de Prisma, que heredan de Error—
     * se registra en el servidor pero nunca se manda al cliente: mandarla tal
     * cual exponía código/tabla/columna de Prisma y la versión del cliente en
     * el cuerpo de la respuesta HTTP.
     */
    static error(message: string, errors?: unknown): ApiResponse<any>;
}
//# sourceMappingURL=ApiResponse.d.ts.map