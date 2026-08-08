import { z } from "zod";
import { CaseRepository } from "./case.repository.js";
const idPositivo = z.coerce.number().int().positive();
const evaluateSchema = z.object({
    id_riesgo: idPositivo,
    id_area: idPositivo.optional().nullable(),
    id_responsable: idPositivo.optional().nullable(),
    clasificacion: z.string().trim().min(1, "Seleccione una clasificación").max(200),
    peligro: z.string().trim().max(1000).optional().nullable(),
    consecuencia: z.string().trim().max(1000).optional().nullable(),
    observaciones: z.string().trim().max(2000).optional().nullable(),
    requiere_investigacion: z.coerce.boolean(),
});
const rejectSchema = z.object({
    motivo: z.string().trim().max(500).optional().nullable(),
});
const observationSchema = z.object({
    texto: z.string().trim().min(3, "Escriba la observación"),
});
const notaSchema = z.object({
    nota: z.string().trim().max(1000).optional().nullable(),
});
const actorSchema = z.object({
    actor: z.string().trim().max(150).optional().default(""),
});
const activityUpdateSchema = z.object({
    estado: z.enum(["Pendiente", "En progreso", "Completado"]),
    comentario: z.string().trim().max(1000).optional().nullable(),
    actor: z.string().trim().max(150).optional().default(""),
});
const extensionSchema = z.object({
    nueva_fecha: z.string().min(1, "Indique la nueva fecha"),
    justificacion: z.string().trim().min(5, "Explique la justificación").max(1000),
    actor: z.string().trim().max(150).optional().default(""),
});
const extensionReviewSchema = z.object({
    decision: z.enum(["aprobada", "rechazada"]),
    nota: z.string().trim().max(1000).optional().nullable(),
});
const requestInfoSchema = z.object({
    mensaje: z.string().trim().min(5, "El mensaje debe tener al menos 5 caracteres").max(500),
});
const respondInfoSchema = z.object({
    respuesta: z.string().trim().max(1000).optional().nullable(),
});
const investigationSchema = z.object({
    hallazgos: z.string().trim().min(5, "Describa los hallazgos"),
    causa_raiz: z.string().trim().min(5, "Describa la causa raíz"),
    conclusiones: z.string().trim().min(5, "Describa las conclusiones"),
    observaciones: z.string().trim().max(1000).optional().nullable(),
    investigador: idPositivo.optional().nullable(),
});
const activitySchema = z.object({
    descripcion: z.string().trim().min(3, "Describa la actividad"),
    responsable: idPositivo.optional().nullable(),
    fecha_inicio: z.string().optional().nullable(),
    fecha_fin: z.string().optional().nullable(),
});
const planSchema = z.object({
    descripcion: z.string().trim().min(5, "Describa el plan de acción"),
    id_area: idPositivo,
    responsable: idPositivo,
    fecha_plan: z.string().min(1, "La fecha del plan es obligatoria"),
    observaciones: z.string().trim().max(1000).optional().nullable(),
    actividades: z.array(activitySchema).min(1, "Agregue al menos una actividad"),
});
async function getCasoBasico(codigo) {
    const caso = await CaseRepository.findBasicByCodigo(codigo);
    if (!caso)
        throw new Error(`El caso ${codigo} no existe`);
    return caso;
}
export class CaseService {
    static async list(query) {
        const estados = query.estado ? query.estado.split(",").filter(Boolean) : undefined;
        const area = query.area ? Number(query.area) : undefined;
        const sort = query.sort === "prioridad" || query.sort === "sla" ? query.sort : "recientes";
        const filters = { sort };
        const fullFilters = {
            ...filters,
            ...(estados?.length ? { estados } : {}),
            ...(Number.isFinite(area) ? { area } : {}),
            ...(query.search ? { search: query.search } : {}),
        };
        return CaseRepository.findAll(fullFilters);
    }
    static async listPlans(query) {
        const area = query.area ? Number(query.area) : undefined;
        return CaseRepository.findPlansByArea(Number.isFinite(area) ? area : undefined);
    }
    static async getByCodigo(codigo) {
        const caso = await CaseRepository.findByCodigo(codigo);
        if (!caso)
            throw new Error(`El caso ${codigo} no existe`);
        return caso;
    }
    static async approve(codigo) {
        const caso = await getCasoBasico(codigo);
        return CaseRepository.approve(caso.id_caso);
    }
    static async addObservation(codigo, rawBody) {
        const dto = observationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.addObservation(caso.id_caso, dto.texto);
    }
    static async evaluate(codigo, rawBody) {
        const dto = evaluateSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.evaluate(caso.id_caso, dto);
    }
    static async reject(codigo, rawBody) {
        const dto = rejectSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.reject(caso.id_caso, dto);
    }
    static async requestInfo(codigo, rawBody) {
        const dto = requestInfoSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        const estadoActual = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
        return CaseRepository.requestInfo(caso.id_caso, estadoActual, dto);
    }
    static async respondInfo(codigo, idSolicitud, rawBody) {
        const dto = respondInfoSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.respondInfo(caso.id_caso, Number(idSolicitud), dto);
    }
    static async saveInvestigation(codigo, rawBody) {
        const dto = investigationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.saveInvestigation(caso.id_caso, dto);
    }
    static async createPlan(codigo, rawBody) {
        const dto = planSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.createPlan(caso.id_caso, caso.codigo_sop, dto);
    }
    static async updatePlan(idPlan, rawBody) {
        const dto = planSchema.parse(rawBody);
        return CaseRepository.updatePlan(Number(idPlan), dto);
    }
    static async closeCase(codigo, rawBody) {
        const dto = notaSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo);
        return CaseRepository.closeCase(caso.id_caso, dto.nota);
    }
    static async acceptPlan(codigo, rawBody) {
        const dto = actorSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo);
        return CaseRepository.acceptPlan(caso.id_caso, dto.actor || "Jefe de Área");
    }
    static async completeExecution(codigo, rawBody) {
        const dto = actorSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo);
        return CaseRepository.completeExecution(caso.id_caso, dto.actor || "Jefe de Área");
    }
    static async keepPending(codigo, rawBody) {
        const dto = notaSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo);
        return CaseRepository.keepPending(caso.id_caso, dto.nota);
    }
    static async reopenCase(codigo, rawBody) {
        const dto = notaSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo);
        return CaseRepository.reopenCase(caso.id_caso, dto.nota);
    }
    static async updateActivity(idActividad, rawBody) {
        const dto = activityUpdateSchema.parse(rawBody);
        return CaseRepository.updateActivity(Number(idActividad), dto.estado, dto.comentario ?? null, dto.actor || "Jefe de Área");
    }
    static async requestExtension(codigo, rawBody) {
        const dto = extensionSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.requestExtension(caso.id_caso, { nueva_fecha: dto.nueva_fecha, justificacion: dto.justificacion }, dto.actor || "Jefe de Área");
    }
    static async reviewExtension(codigo, rawBody) {
        const dto = extensionReviewSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.reviewExtension(caso.id_caso, dto.decision, dto.nota ?? null);
    }
    static async addComment(codigo, rawBody) {
        const dto = observationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.addComment(caso.id_caso, dto.texto);
    }
    static async addEvidence(codigo, files) {
        const caso = await getCasoBasico(codigo);
        return CaseRepository.addEvidence(caso.id_caso, files);
    }
}
//# sourceMappingURL=case.service.js.map