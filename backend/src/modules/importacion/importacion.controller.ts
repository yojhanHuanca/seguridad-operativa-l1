import type { Response } from "express";
import { ZodError, z } from "zod";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ImportacionService } from "./importacion.service.js";

const cellSchema = z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()]);
const payloadSchema = z.object({
  filename: z.string().trim().max(255).optional().nullable(),
  // El histórico de la empresa pasa las diez mil filas. El tope existe solo
  // para frenar un archivo absurdo, no para limitar una importación real.
  rows: z.array(z.record(z.string(), cellSchema)).min(1).max(100000),
});

function parsePayload(body: unknown) {
  const parsed = payloadSchema.parse(body);
  return {
    filename: parsed.filename?.trim() || null,
    rows: parsed.rows,
  };
}

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export class ImportacionController {
  static async validar(req: AuthenticatedRequest, res: Response) {
    try {
      const payload = parsePayload(req.body);
      const preview = await ImportacionService.validar(payload);
      return res.json(ApiResponse.success("Archivo validado correctamente", preview));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo validar el archivo", error));
    }
  }

  static async importar(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id_usuario) return res.status(401).json(ApiResponse.error("Token inválido"));
      const payload = parsePayload(req.body);
      const result = await ImportacionService.importar(payload, req.user.id_usuario, req.ip ?? null);
      return res.status(201).json(ApiResponse.success("Importación completada correctamente", result));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo importar el archivo", error));
    }
  }
}
