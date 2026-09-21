import { ZodError, z } from "zod";
import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
import { ImportacionService } from "./importacion.service.js";
import { ImportacionContingenciasService } from "./importacion-contingencias.service.js";
import { ImportacionMonitoreoService } from "./importacion-monitoreo.service.js";

const cellSchema = z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()]);
const payloadSchema = z.object({
  filename: z.string().trim().max(255).optional().nullable(),
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
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo validar el archivo"), error));
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
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo importar el archivo"), error));
    }
  }

  static async validarContingencias(req: AuthenticatedRequest, res: Response) {
    try {
      const payload = parsePayload(req.body);
      const filename = payload.filename ?? "";
      const validacion = await ImportacionContingenciasService.validarContingencias(filename, payload.rows);
      return res.json(ApiResponse.success("Archivo validado correctamente", validacion));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo validar el archivo"), error));
    }
  }
  static async importarContingencias(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id_usuario) return res.status(401).json(ApiResponse.error("Token inválido"));
      const payload = parsePayload(req.body);
      const filename = payload.filename ?? "";
      const resultado = await ImportacionContingenciasService.importarContingencias(filename, payload.rows, req.user.id_usuario);
      return res.status(201).json(ApiResponse.success("Importación completada correctamente", resultado));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo importar el archivo"), error));
    }
  }

  static async validarMonitoreo(req: AuthenticatedRequest, res: Response) {
    try {
      const payload = parsePayload(req.body);
      const validacion = await ImportacionMonitoreoService.validarMonitoreo(payload.filename ?? "", payload.rows);
      return res.json(ApiResponse.success("Archivo validado correctamente", validacion));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo validar el archivo"), error));
    }
  }

  static async importarMonitoreo(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id_usuario) return res.status(401).json(ApiResponse.error("Token inválido"));
      const payload = parsePayload(req.body);
      const filename = payload.filename ?? "";
      const resultado = await ImportacionMonitoreoService.importarMonitoreo(filename, payload.rows, req.user.id_usuario);
      return res.status(201).json(ApiResponse.success("Importación completada correctamente", resultado));
    } catch (error) {
      if (isZodError(error)) {
        return res.status(400).json(ApiResponse.error("Archivo inválido", error.flatten().fieldErrors));
      }
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo importar el archivo"), error));
    }
  }
}
