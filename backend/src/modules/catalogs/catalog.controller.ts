import type { Request, Response } from "express";
import { CatalogService } from "./catalog.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export class CatalogController {
  static async getAll(_req: Request, res: Response) {
    try {
      const catalogos = await CatalogService.getAllGroups();
      return res.json(ApiResponse.success("Catálogos obtenidos correctamente", catalogos));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los catálogos", error));
    }
  }

  static async getGroupForAdmin(req: Request, res: Response) {
    try {
      const id_catalogo = Number(req.params.id);
      const group = await CatalogService.getGroupForAdmin(id_catalogo);
      return res.json(ApiResponse.success("Catálogo obtenido correctamente", group));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Catálogo no encontrado"));
    }
  }

  static async createItem(req: Request, res: Response) {
    try {
      const id_catalogo = Number(req.params.id);
      const item = await CatalogService.createItem(id_catalogo, req.body?.nombre ?? "");
      return res.status(201).json(ApiResponse.success("Valor creado correctamente", item));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al crear el valor"));
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const id_detalle = Number(req.params.idDetalle);
      const item = await CatalogService.updateItem(id_detalle, req.body?.nombre ?? "");
      return res.json(ApiResponse.success("Valor actualizado correctamente", item));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el valor"));
    }
  }

  static async removeItem(req: Request, res: Response) {
    try {
      const id_detalle = Number(req.params.idDetalle);
      const item = await CatalogService.setItemEstado(id_detalle, false);
      return res.json(ApiResponse.success("Valor desactivado correctamente", item));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al desactivar el valor"));
    }
  }

  static async restoreItem(req: Request, res: Response) {
    try {
      const id_detalle = Number(req.params.idDetalle);
      const item = await CatalogService.setItemEstado(id_detalle, true);
      return res.json(ApiResponse.success("Valor reactivado correctamente", item));
    } catch (error) {
      return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al reactivar el valor"));
    }
  }
}
