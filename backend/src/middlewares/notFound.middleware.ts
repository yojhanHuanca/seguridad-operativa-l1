import type { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json(ApiResponse.error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}
