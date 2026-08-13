import { EventoRepository } from "./evento.repository.js";
import { createEventoSchema, updateEventoSchema } from "./evento.types.js";

/** Cada campo opcional que sí venga tiene que apuntar al catálogo que le corresponde. */
const CATALOGOS_POR_CAMPO: Record<string, string> = {
  id_tipo_incidente: "Tipo de incidente operativo",
  id_ubicacion: "Ubicación",
  id_tipo_via: "Tipo de vía",
  id_direccion_via: "Dirección de vía",
  id_lugar_incidente: "Lugar de Incidente",
  id_modelo_mr: "Modelo MR",
  id_numero_mr: "Nro. MR",
  id_personal_involucrado: "Personal o falla Involucrado",
  id_tipo_causa: "Tipo Causa",
  id_posible_causa: "Posible Causa",
  id_rango_horario: "Rango horario",
};

async function validarCatalogos(dto: Record<string, unknown>) {
  for (const [campo, catalogoEsperado] of Object.entries(CATALOGOS_POR_CAMPO)) {
    const id = dto[campo] as number | undefined;
    if (id == null) continue;
    const detalle = await EventoRepository.findCatalogoDetalleById(id);
    if (!detalle) throw new Error(`El valor de catálogo con id ${id} no existe`);
    if (detalle.catalogos.nombre !== catalogoEsperado) {
      throw new Error(`El valor "${detalle.nombre}" no pertenece al catálogo "${catalogoEsperado}"`);
    }
  }
}

export class EventoService {
  static async getAllEventos() {
    return EventoRepository.findAll();
  }

  static async getEventoById(id: number) {
    const evento = await EventoRepository.findById(id);
    if (!evento) throw new Error("Evento no encontrado");
    return evento;
  }

  static async createEvento(rawBody: unknown, actor?: number) {
    const dto = createEventoSchema.parse(rawBody);
    await validarCatalogos(dto);
    return EventoRepository.create(dto, actor);
  }

  static async updateEvento(id: number, rawBody: unknown) {
    const dto = updateEventoSchema.parse(rawBody);
    await validarCatalogos(dto);
    return EventoRepository.update(id, dto);
  }

  static async deleteEvento(id: number) {
    return EventoRepository.remove(id);
  }
}
