import type { NextFunction, Request, Response } from "express";
import { ApiResponse, safeErrorMessage } from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

/** Manejador de errores global de Express — red de seguridad para cualquier
 * error que un controlador no haya capturado (o un `next(err)` explícito).
 * La mayoría de rutas ya atrapan sus propios errores; este middleware evita
 * que uno se les escape y termine devolviendo el stack trace de Express por
 * defecto al cliente. */
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const error = err instanceof Error ? err : new Error("Unknown request error");
  const code = err && typeof err === "object" && "code" in err && typeof err.code === "string" ? err.code : undefined;
  // Keep request bodies, headers, SQL text, and raw error messages out of logs.
  logger.error({ errorName: error.name, ...(code ? { errorCode: code } : {}) }, "Unhandled request error");
  // El parser de JSON de Express (body-parser) llega hasta acá cuando el
  // cuerpo de la petición no es JSON válido, con `status: 400` ya puesto —
  // sin este chequeo caía como 500 genérico aunque la culpa era del cliente.
  const status =
    err && typeof err === "object" && "status" in err && typeof (err as { status?: unknown }).status === "number"
      ? (err as { status: number }).status
      : 500;
  // Parser messages can include the submitted body (passwords or personal data).
  // Preserve the client status without reflecting raw input or parser internals.
  const message =
    status === 400 && err instanceof SyntaxError
      ? "El cuerpo de la solicitud no tiene un formato JSON válido"
      : safeErrorMessage(err, "Error interno del servidor");
  res.status(status).json(ApiResponse.error(message));
}
