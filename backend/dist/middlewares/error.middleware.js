import { ApiResponse } from "../utils/ApiResponse.js";
/** Manejador de errores global de Express — red de seguridad para cualquier
 * error que un controlador no haya capturado (o un `next(err)` explícito).
 * La mayoría de rutas ya atrapan sus propios errores; este middleware evita
 * que uno se les escape y termine devolviendo el stack trace de Express por
 * defecto al cliente. */
export function errorMiddleware(err, _req, res, _next) {
    console.error("[unhandled]", err);
    // El parser de JSON de Express (body-parser) llega hasta acá cuando el
    // cuerpo de la petición no es JSON válido, con `status: 400` ya puesto —
    // sin este chequeo caía como 500 genérico aunque la culpa era del cliente.
    const status = err && typeof err === "object" && "status" in err && typeof err.status === "number"
        ? err.status
        : 500;
    const message = err instanceof Error ? err.message : "Error interno del servidor";
    res.status(status).json(ApiResponse.error(message));
}
//# sourceMappingURL=error.middleware.js.map