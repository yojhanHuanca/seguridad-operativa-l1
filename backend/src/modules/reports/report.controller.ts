import type { Request, Response } from "express";
import { ZodError } from "zod";
import { ReportService } from "./report.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

export class ReportController {
  static async getAll(req: Request, res: Response) {
    try {
      const { data, total } = await ReportService.listReports(
        (req as AuthenticatedRequest).user,
        req.query as Record<string, string>
      );
      const body = ApiResponse.success("Reportes obtenidos correctamente", data);
      return res.json(total !== undefined ? { ...body, meta: { total } } : body);
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los reportes", error));
    }
  }

  static async getByCodigo(req: Request, res: Response) {
    try {
      const codigo = req.params.codigo;
      if (typeof codigo !== "string" || codigo.trim() === "") {
        throw new Error("Código de reporte inválido");
      }
      const caso = await ReportService.getByCodigo(codigo);
      return res.json(ApiResponse.success("Reporte obtenido correctamente", caso));
    } catch (error) {
      return res
        .status(404)
        .json(ApiResponse.error(error instanceof Error ? error.message : "Reporte no encontrado", error));
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const files = ((req.files as Express.Multer.File[] | undefined) ?? []).map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      }));

      // Reportantes anónimos no traen sesión en el wizard público; si viene
      // un usuario autenticado (SO registrando directo, o un trabajador
      // logueado), se usa para firmar el reporte — ver anonimato real más
      // abajo, en ReportRepository.createFullReport.
      const id_usuario_creador = (req as AuthenticatedRequest).user?.id_usuario;
      const result = await ReportService.createReport(req.body, files, id_usuario_creador);

      return res.status(201).json(
        ApiResponse.success("Reporte registrado correctamente", {
          codigo_sop: result.caso.codigo_sop,
          id_caso: result.caso.id_caso,
          id_evento: result.evento.id_evento,
        })
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json(ApiResponse.error("Datos del reporte inválidos", error.flatten().fieldErrors));
      }
      return res
        .status(400)
        .json(
          ApiResponse.error(
            error instanceof Error ? error.message : "Error al registrar el reporte",
            error
          )
        );
    }
  }
}
