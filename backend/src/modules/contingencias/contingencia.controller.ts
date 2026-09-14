import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
import { ContingenciaService } from "./contingencia.service.js";

function contingenciaErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.name === "ZodError") {
    const issue = (error as { issues?: Array<{ message?: string }> }).issues?.[0];
    return issue?.message ?? fallback;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
    const column = typeof error.meta?.column === "string" ? error.meta.column : "desconocida";
    return `Falta sincronizar la columna ${column} en la base de datos de Railway.`;
  }
  return safeErrorMessage(error, fallback);
}

export class ContingenciaController {
  static async catalogos(_req: Request, res: Response) {
    try {
      const data = await ContingenciaService.catalogos();
      return res.json(ApiResponse.success("Catálogos de contingencia obtenidos correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(contingenciaErrorMessage(error, "No se pudieron obtener los catálogos"), error));
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await ContingenciaService.list(req.query as Record<string, unknown>);
      return res.json({ ...ApiResponse.success("Eventos de contingencia obtenidos correctamente", data.items), meta: { total: data.total } });
    } catch (error) {
      return res.status(400).json(ApiResponse.error(contingenciaErrorMessage(error, "No se pudieron obtener los eventos"), error));
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await ContingenciaService.getById(req.params.id);
      return res.json(ApiResponse.success("Evento de contingencia obtenido correctamente", data));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(contingenciaErrorMessage(error, "Evento no encontrado"), error));
    }
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await ContingenciaService.create(req.body, req.user);
      return res.status(201).json(ApiResponse.success("Evento de contingencia registrado correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(contingenciaErrorMessage(error, "No se pudo registrar el evento"), error));
    }
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await ContingenciaService.update(req.params.id, req.body, req.user);
      return res.json(ApiResponse.success("Evento de contingencia actualizado correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(contingenciaErrorMessage(error, "No se pudo actualizar el evento"), error));
    }
  }

  static async remove(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await ContingenciaService.remove(req.params.id, req.user);
      return res.json(ApiResponse.success("Evento de contingencia eliminado correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(contingenciaErrorMessage(error, "No se pudo eliminar el evento"), error));
    }
  }
}
