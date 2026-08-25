import type { Request, Response } from "express";
import { EventoService } from "./evento.service.js";
import { IndicadoresEventosService } from "./indicadores.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";

export class EventoController {
  static async getIndicadores(req: Request, res: Response) {
    try {
      const data = await IndicadoresEventosService.calcular(req.query as Record<string, string>);
      return res.json(ApiResponse.success("Indicadores obtenidos correctamente", data));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al calcular los indicadores", error));
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const { data, total } = await EventoService.getAllEventos(req.query as Record<string, string>);
      const body = ApiResponse.success("Eventos obtenidos correctamente", data);
      // `total` solo viene cuando la petición mandó page+limit; si no, la
      // respuesta es idéntica a la de siempre (sin este campo de más).
      return res.json(total !== undefined ? { ...body, meta: { total } } : body);
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los eventos", error));
    }
  }

  static async getCounts(_req: Request, res: Response) {
    try {
      const counts = await EventoService.counts();
      return res.json(ApiResponse.success("Conteos obtenidos correctamente", counts));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los conteos", error));
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const evento = await EventoService.getEventoById(Number(req.params.id));
      return res.json(ApiResponse.success("Evento obtenido correctamente", evento));
    } catch (error) {
      return res.status(404).json(ApiResponse.error(error instanceof Error ? error.message : "Evento no encontrado", error));
    }
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const evento = await EventoService.createEvento(req.body, req.user?.id_usuario);
      return res.status(201).json(ApiResponse.success("Evento registrado correctamente", evento));
    } catch (error) {
      return res.status(400).json(
        ApiResponse.error(error instanceof Error ? error.message : "Error al registrar el evento", error)
      );
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const evento = await EventoService.updateEvento(Number(req.params.id), req.body);
      return res.json(ApiResponse.success("Evento actualizado correctamente", evento));
    } catch (error) {
      return res.status(400).json(
        ApiResponse.error(error instanceof Error ? error.message : "Error al actualizar el evento", error)
      );
    }
  }

  static async getAsignados(req: Request, res: Response) {
    try {
      const eventos = await EventoService.getAsignados(
        Number(req.params.id_usuario),
        (req as AuthenticatedRequest).user
      );
      return res.json(ApiResponse.success("Eventos asignados obtenidos correctamente", eventos));
    } catch (error) {
      return res.status(500).json(ApiResponse.error("Error al obtener los eventos asignados", error));
    }
  }

  static async asignar(req: Request, res: Response) {
    try {
      const resultado = await EventoService.asignarEvento(Number(req.params.id), req.body);
      return res.json(ApiResponse.success(`Evento asignado a ${resultado.nombre}`, resultado));
    } catch (error) {
      return res.status(400).json(
        ApiResponse.error(error instanceof Error ? error.message : "Error al asignar el evento", error)
      );
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await EventoService.deleteEvento(Number(req.params.id));
      return res.json(ApiResponse.success("Evento eliminado correctamente", null));
    } catch (error) {
      return res.status(400).json(
        ApiResponse.error(error instanceof Error ? error.message : "Error al eliminar el evento", error)
      );
    }
  }
}
