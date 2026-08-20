import { EstacionService } from "./estacion.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class EstacionController {
    static async getAll(_req, res) {
        try {
            const estaciones = await EstacionService.getAllEstaciones();
            return res.json(ApiResponse.success("Estaciones obtenidas correctamente", estaciones));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener las estaciones", error));
        }
    }
    static async create(req, res) {
        try {
            const estacion = await EstacionService.createEstacion(req.body?.nombre_estacion ?? "");
            return res.status(201).json(ApiResponse.success("Estación creada correctamente", estacion));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al crear la estación"));
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            const estacion = await EstacionService.updateEstacion(id, req.body?.nombre_estacion ?? "");
            return res.json(ApiResponse.success("Estación actualizada correctamente", estacion));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar la estación"));
        }
    }
    static async remove(req, res) {
        try {
            const id = Number(req.params.id);
            await EstacionService.deleteEstacion(id);
            return res.json(ApiResponse.success("Estación eliminada correctamente"));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al eliminar la estación"));
        }
    }
}
//# sourceMappingURL=estacion.controller.js.map