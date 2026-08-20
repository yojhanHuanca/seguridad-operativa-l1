import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

/** Manejador de errores global de Express — red de seguridad para cualquier
 * error que un controlador no haya capturado (o un `next(err)` explícito).
 * La mayoría de rutas ya atrapan sus propios errores; este middleware evita
 * que uno se les escape y termine devolviendo el stack trace de Express por
 * defecto al cliente. */
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error("[unhandled]", err);
  const message = err instanceof Error ? err.message : "Error interno del servidor";
  res.status(500).json(ApiResponse.error(message));
}
