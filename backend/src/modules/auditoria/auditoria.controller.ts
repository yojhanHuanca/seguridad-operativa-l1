import type { Request, Response } from "express";
import { AuditoriaService } from "./auditoria.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class AuditoriaController {
  static async getAll(req: Request, res: Response) {
    try {
      const { data, total } = await AuditoriaService.list(req.query as Record<string, string>);
      return res.json({ ...ApiResponse.success("Auditoría obtenida correctamente", data), meta: { total } });
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener la auditoría", error));
    }
  }

  static async getTablas(_req: Request, res: Response) {
    try {
      const tablas = await AuditoriaService.tablas();
      return res.json(ApiResponse.success("Tablas obtenidas correctamente", tablas));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener las tablas", error));
    }
  }

  static async exportarCsv(req: Request, res: Response) {
    try {
      const csv = await AuditoriaService.exportarCsv(req.query as Record<string, string>);
      const nombre = `auditoria_${new Date().toISOString().slice(0, 10)}.csv`;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${nombre}"`);
      return res.send(csv);
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al exportar la auditoría", error));
    }
  }
}
