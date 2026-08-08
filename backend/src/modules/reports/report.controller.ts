import type { Request, Response } from "express";
import { ZodError } from "zod";
import { ReportService } from "./report.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class ReportController {
  static async getAll(_req: Request, res: Response) {
    try {
      const reportes = await ReportService.listReports();
      return res.json(ApiResponse.success("Reportes obtenidos correctamente", reportes));
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

      const result = await ReportService.createReport(req.body, files);

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
