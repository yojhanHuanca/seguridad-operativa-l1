import type { Request, Response } from "express";
import { AreaService } from "./area.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class AreaController {
  static async getAll(_req: Request, res: Response) {
    try {
      const areas = await AreaService.getAllAreas();
      return res.json(ApiResponse.success("Áreas obtenidas correctamente", areas));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener las áreas", error));
    }
  }
}
