import { z } from "zod";
const idOpcional = z.coerce.number().int().positive().optional();
const camposEvento = {
    // Se calculan solos a partir de fecha+hora, pero el usuario los puede
    // corregir a mano — si vienen, ganan sobre el cálculo automático.
    anio: z.coerce.number().int().min(2000).max(2100).optional(),
    mes: z.coerce.number().int().min(1).max(12).optional(),
    semana: z.coerce.number().int().min(1).max(53).optional(),
    dia: z.string().trim().max(20).optional(),
    id_rango_horario: idOpcional,
    descripcion: z.string().trim().max(2000).optional(),
    id_ubicacion: idOpcional,
    id_tipo_via: idOpcional,
    id_direccion_via: idOpcional,
    id_lugar_incidente: idOpcional,
    id_modelo_mr: idOpcional,
    id_numero_mr: idOpcional,
    numero_carrera: z.string().trim().max(30).optional(),
    id_personal_involucrado: idOpcional,
    id_tipo_causa: idOpcional,
    id_posible_causa: idOpcional,
    informacion_adicional: z.string().trim().max(2000).optional(),
    camara_monitoreada: z.string().trim().max(50).optional(),
    demora: z.coerce.number().nonnegative().optional(),
};
export const createEventoSchema = z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (AAAA-MM-DD)"),
    hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:MM)"),
    id_tipo_incidente: z.coerce.number().int().positive(),
    ...camposEvento,
});
export const ESTADOS_EVENTO = ["Registrado", "En investigación", "Cerrado"];
export const updateEventoSchema = z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (AAAA-MM-DD)").optional(),
    hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:MM)").optional(),
    id_tipo_incidente: z.coerce.number().int().positive().optional(),
    estado: z.enum(ESTADOS_EVENTO).optional(),
    ...camposEvento,
});
export const asignarEventoSchema = z.object({
    id_usuario: z.coerce.number().int().positive(),
});
//# sourceMappingURL=evento.types.js.map