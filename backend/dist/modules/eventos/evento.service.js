import prisma from "../../lib/prisma.js";
import { EventoRepository } from "./evento.repository.js";
import { ESTADOS_EVENTO, asignarEventoSchema, createEventoSchema, updateEventoSchema } from "./evento.types.js";
import { UserRepository } from "../users/users.repository.js";
import { NotificationRepository } from "../notifications/notification.repository.js";
import { esAdmin } from "../../utils/actor.js";
/** Cada campo opcional que sí venga tiene que apuntar al catálogo que le corresponde. */
const CATALOGOS_POR_CAMPO = {
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
async function validarCatalogos(dto) {
    for (const [campo, catalogoEsperado] of Object.entries(CATALOGOS_POR_CAMPO)) {
        const id = dto[campo];
        if (id == null)
            continue;
        const detalle = await EventoRepository.findCatalogoDetalleById(id);
        if (!detalle)
            throw new Error(`El valor de catálogo con id ${id} no existe`);
        if (detalle.catalogos.nombre !== catalogoEsperado) {
            throw new Error(`El valor "${detalle.nombre}" no pertenece al catálogo "${catalogoEsperado}"`);
        }
    }
}
export class EventoService {
    static async getAllEventos(query) {
        const estado = ESTADOS_EVENTO.includes(query?.estado)
            ? query.estado
            : undefined;
        const page = Number(query?.page);
        const limit = Number(query?.limit);
        const paginar = Number.isInteger(page) && page > 0 && Number.isInteger(limit) && limit > 0;
        return EventoRepository.findAll({
            ...(estado ? { estado } : {}),
            ...(query?.search ? { search: query.search } : {}),
            ...(query?.desde ? { desde: query.desde } : {}),
            ...(query?.hasta ? { hasta: query.hasta } : {}),
            ...(paginar ? { page, limit } : {}),
        });
    }
    static async counts() {
        return EventoRepository.counts();
    }
    static async getEventoById(id) {
        const evento = await EventoRepository.findById(id);
        if (!evento)
            throw new Error("Evento no encontrado");
        return evento;
    }
    static async createEvento(rawBody, actor) {
        const dto = createEventoSchema.parse(rawBody);
        await validarCatalogos(dto);
        return EventoRepository.create(dto, actor);
    }
    static async updateEvento(id, rawBody) {
        const dto = updateEventoSchema.parse(rawBody);
        await validarCatalogos(dto);
        return EventoRepository.update(id, dto);
    }
    static async deleteEvento(id) {
        return EventoRepository.remove(id);
    }
    /** Bandeja de eventos asignados a una persona de Seguridad Operativa. */
    /**
     * Bandeja de eventos asignados. El id de la ruta solo lo respeta el Admin;
     * cualquier otro rol recibe la suya, aunque pida la de otra persona — antes
     * el id venía del cliente sin comprobar nada.
     */
    static async getAsignados(id_usuario, actor) {
        const objetivo = esAdmin(actor) ? id_usuario : actor?.id_usuario ?? id_usuario;
        return EventoRepository.findByAsignado(objetivo);
    }
    /**
     * Asigna el evento a una persona de Seguridad Operativa: le llega una
     * notificación personal para que sea ella quien arme el hallazgo (no se
     * crea ningún caso SOP desde acá — eso lo hace SO desde su propio panel).
     */
    static async asignarEvento(id, rawBody) {
        const dto = asignarEventoSchema.parse(rawBody);
        const evento = await EventoRepository.findById(id);
        if (!evento)
            throw new Error("Evento no encontrado");
        if (evento.asignado_a != null) {
            const yaAsignadoA = evento.usuarios_eventos_monitoreo_asignado_aTousuarios?.nombre ?? "otra persona";
            throw new Error(`Este evento ya fue asignado a ${yaAsignadoA}; solo se puede asignar una vez`);
        }
        const destinatario = await UserRepository.findById(dto.id_usuario);
        if (!destinatario)
            throw new Error(`El usuario con id ${dto.id_usuario} no existe`);
        if (destinatario.roles?.nombre_rol !== "Seguridad Operativa") {
            throw new Error(`"${destinatario.nombre}" no pertenece al rol "Seguridad Operativa"`);
        }
        const tipo = evento.catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle?.nombre ?? "Evento";
        const lugar = evento.catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle?.nombre;
        await NotificationRepository.emitir(prisma, {
            para: { id_usuario: dto.id_usuario },
            tipo: "evento_asignado",
            titulo: "Evento de Monitoreo asignado",
            mensaje: `Se te asignó un evento de Monitoreo: ${tipo}${lugar ? ` · ${lugar}` : ""}. Ábrelo para registrar el hallazgo correspondiente.`,
        });
        await EventoRepository.asignar(id, dto.id_usuario);
        if (evento.estado !== "Cerrado") {
            await EventoRepository.update(id, { estado: "En investigación" });
        }
        return { id_usuario: dto.id_usuario, nombre: destinatario.nombre };
    }
}
//# sourceMappingURL=evento.service.js.map