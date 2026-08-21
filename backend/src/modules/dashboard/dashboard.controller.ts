import type { Request, Response } from "express";
import { DashboardService } from "./dashboard.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class DashboardController {
  static async getIndicadores(_req: Request, res: Response) {
    try {
      const indicadores = await DashboardService.getIndicadores();
      return res.json(ApiResponse.success("Indicadores obtenidos correctamente", indicadores));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los indicadores", error));
    }
  }
}
