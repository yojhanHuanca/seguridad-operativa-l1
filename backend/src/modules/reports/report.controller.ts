import type { Request, Response } from "express";
import { ZodError } from "zod";
import { ReportService } from "./report.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { AuditoriaService } from "../auditoria/auditoria.service.js";

function textoOrigenReporte(body: unknown): { modalidad: "anonimo" | "identificado"; origen: "reportante" | "seguridad_operativa" } {
  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  return {
    modalidad: data.modalidad === "anonimo" ? "anonimo" : "identificado",
    origen: data.origen === "seguridad_operativa" ? "seguridad_operativa" : "reportante",
  };
}

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
      const caso = await ReportService.getByCodigo(codigo, (req as AuthenticatedRequest).user);
      return res.json(ApiResponse.success("Reporte obtenido correctamente", caso));
    } catch (error) {
      return res
        .status(404)
        .json(ApiResponse.error(error instanceof Error ? error.message : "Reporte no encontrado", error));
    }
  }

  static async responderInfo(req: Request, res: Response) {
    try {
      const codigo = req.params.codigo;
      if (typeof codigo !== "string" || codigo.trim() === "") {
        throw new Error("Código de reporte inválido");
      }
      const files = ((req.files as Express.Multer.File[] | undefined) ?? []).map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        mimetype: f.mimetype,
        size: f.size,
      }));

      const solicitud = await ReportService.responderInfoPublico(codigo, req.body, files);
      return res.json(ApiResponse.success("Respuesta registrada correctamente", solicitud));
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(ApiResponse.error("Datos inválidos", error.flatten().fieldErrors));
      }
      return res
        .status(400)
        .json(ApiResponse.error(error instanceof Error ? error.message : "No se pudo registrar la respuesta", error));
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

      const actor = (req as AuthenticatedRequest).user;
      const result = await ReportService.createReport(req.body, files, actor);
      const { modalidad, origen } = textoOrigenReporte(req.body);
      const fuente =
        origen === "seguridad_operativa"
            ? "panel de Seguridad Operativa"
          : actor?.id_usuario
            ? "panel de Reportante"
            : "portal público";

      await AuditoriaService.registrar({
        tabla: "casos_sop",
        id_registro: result.caso.id_caso,
        accion: "crear",
        ...(actor?.id_usuario ? { usuario: actor.id_usuario } : {}),
        ip: req.ip,
        user_agent: req.headers["user-agent"],
        descripcion: `Reporte ${result.caso.codigo_sop} creado desde ${fuente} (${modalidad === "anonimo" ? "anónimo" : "identificado"}).`,
        despues: {
          codigo_sop: result.caso.codigo_sop,
          origen,
          modalidad,
          evidencias: files.length,
        },
      });

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
