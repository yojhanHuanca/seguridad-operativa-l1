import { EventoService } from "./evento.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export class EventoController {
    static async getAll(_req, res) {
        try {
            const eventos = await EventoService.getAllEventos();
            return res.json(ApiResponse.success("Eventos obtenidos correctamente", eventos));
        }
        catch (error) {
            return res.status(500).json(ApiResponse.error("Error al obtener los eventos", error));
        }
    }
    static async getById(req, res) {
        try {
            const evento = await EventoService.getEventoById(Number(req.params.id));
            return res.json(ApiResponse.success("Evento obtenido correctamente", evento));
        }
        catch (error) {
            return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Evento no encontrado", error));
        }
    }
    static async create(req, res) {
        try {
            // TODO(auth): tomar el actor de la sesión cuando exista login real.
            const evento = await EventoService.createEvento(req.body);
            return res.status(201).json(ApiResponse.success("Evento registrado correctamente", evento));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al registrar el evento", error));
        }
    }
    static async update(req, res) {
        try {
            const evento = await EventoService.updateEvento(Number(req.params.id), req.body);
            return res.json(ApiResponse.success("Evento actualizado correctamente", evento));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el evento", error));
        }
    }
    static async remove(req, res) {
        try {
            await EventoService.deleteEvento(Number(req.params.id));
            return res.json(ApiResponse.success("Evento eliminado correctamente", null));
        }
        catch (error) {
            return res.status(400).json(ApiResponse.error(error instanceof Error ? error.message : "Error al eliminar el evento", error));
        }
    }
}
//# sourceMappingURL=evento.controller.js.map