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

  static async create(req: Request, res: Response) {
    try {
      const area = await AreaService.createArea(req.body?.nombre_area ?? "");
      return res.status(201).json(ApiResponse.success("Área creada correctamente", area));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al crear el área"));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const area = await AreaService.updateArea(id, req.body?.nombre_area ?? "");
      return res.json(ApiResponse.success("Área actualizada correctamente", area));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el área"));
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AreaService.deleteArea(id);
      return res.json(ApiResponse.success("Área eliminada correctamente"));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al eliminar el área"));
    }
  }
}
