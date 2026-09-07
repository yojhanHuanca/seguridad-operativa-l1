import type { Request, Response } from "express";
import { ApiResponse, safeErrorMessage } from "../../utils/ApiResponse.js";
import { DatosOperativosService } from "./datos-operativos.service.js";

export class DatosOperativosController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await DatosOperativosService.list(req.query);
      return res.json(ApiResponse.success("Datos operativos obtenidos correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudieron obtener los datos operativos"), error));
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = await DatosOperativosService.create(req.body);
      return res.status(201).json(ApiResponse.success("Dato operativo creado correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo crear el dato operativo"), error));
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await DatosOperativosService.update(req.params.id, req.body);
      return res.json(ApiResponse.success("Dato operativo actualizado correctamente", data));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo actualizar el dato operativo"), error));
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await DatosOperativosService.remove(req.params.id);
      return res.json(ApiResponse.success("Dato operativo eliminado correctamente"));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(safeErrorMessage(error, "No se pudo eliminar el dato operativo"), error));
    }
  }
}
