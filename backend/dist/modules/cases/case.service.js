import { z } from "zod";
import prisma from "../../lib/prisma.js";
import { CaseRepository } from "./case.repository.js";
import { areaDelActor, esJefeDeArea, nombreDelActor } from "../../utils/actor.js";
import { assertTransicion } from "./case.workflow.js";
/** El plan existe, pero es de otra área: 403, no 400. */
export class PlanAjenoError extends Error {
}
const idPositivo = z.coerce.number().int().positive();
const evaluateSchema = z.object({
    id_riesgo: idPositivo,
    id_area: idPositivo.optional().nullable(),
    id_responsable: idPositivo.optional().nullable(),
    clasificacion: z.string().trim().min(1, "Seleccione una clasificación").max(200),
    descripcion_evento: z.string().trim().min(5, "Describa el evento"),
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
const updateTipoSchema = z.object({
    id_tipo: idPositivo,
});
const notaSchema = z.object({
    nota: z.string().trim().max(1000).optional().nullable(),
});
const reopenSchema = z.object({
    nota: z.string().trim().max(1000).optional().nullable(),
    destino: z
        .enum(["Recepción", "Evaluación", "Investigación", "Plan de Acción", "Ejecución", "Verificación"])
        .optional()
        .default("Verificación"),
});
const rollbackSchema = z.object({
    destino: z.enum(["Evaluación", "Investigación"]),
    motivo: z.string().trim().min(5, "Explique el motivo del retroceso").max(1000),
});
const actorSchema = z.object({
    actor: z.string().trim().max(150).optional().default(""),
});
/** El comentario del plan lo escriben los dos lados; el rol define quién. */
const planCommentSchema = z.object({
    texto: z.string().trim().min(1, "Escriba el comentario").max(1000),
    rol: z.enum(["seguridad", "jefe"]).optional().default("seguridad"),
    actor: z.string().trim().max(150).optional(),
});
const planUpdateSchema = z.object({
    actor: z.string().trim().max(150).optional().default(""),
    descripcion: z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().trim().min(10, "Describa la actualización").max(2000)),
});
const completePlanSchema = z.object({
    actor: z.string().trim().max(150).optional().default(""),
    descripcion: z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().trim().min(10, "Describa el cierre de ejecución").max(2000)),
    /** Opcional a pedido del cliente: acompaña al cierre, no lo bloquea. */
    comentario: z.string().trim().max(1000).optional().nullable(),
});
const activityUpdateSchema = z.object({
    estado: z.enum(["Pendiente", "En progreso", "Completado"]),
    comentario: z.string().trim().max(1000).optional().nullable(),
    actor: z.string().trim().max(150).optional().default(""),
});
const extensionSchema = z.object({
    nueva_fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use el formato AAAA-MM-DD"),
    justificacion: z.string().trim().min(5, "Explique la justificación").max(1000),
    actor: z.string().trim().max(150).optional().default(""),
});
const extensionReviewSchema = z.object({
    decision: z.enum(["aprobada", "rechazada"]),
    nota: z.string().trim().max(1000).optional().nullable(),
    /**
     * SO puede aprobar la ampliación con un plazo distinto al que pidió el área.
     * Si no viene, se aprueba con la fecha que propuso el Jefe del Área.
     */
    fecha_aprobada: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Use el formato AAAA-MM-DD")
        .optional()
        .nullable(),
});
const planFinalReviewSchema = z
    .object({
    decision: z.enum(["aprobada", "rechazada"]),
    nota: z.string().trim().max(1000).optional().nullable(),
})
    .superRefine((value, ctx) => {
    if (value.decision === "rechazada" && (value.nota?.trim().length ?? 0) < 5) {
        ctx.addIssue({
            code: "custom",
            message: "Indique el motivo de devolución del plan",
            path: ["nota"],
        });
    }
});
const requestInfoSchema = z.object({
    mensaje: z.string().trim().min(5, "El mensaje debe tener al menos 5 caracteres").max(500),
});
const respondInfoSchema = z.object({
    respuesta: z.string().trim().max(1000).optional().nullable(),
});
const investigationSchema = z.object({
    // La descripción del evento ("hallazgos") se escribe en Evaluación
    // (casos_sop.descripcion_evento) y se copia acá al guardar la investigación.
    causa_raiz: z.string().trim().min(5, "Describa la causa raíz"),
    conclusiones: z.string().trim().min(5, "Describa las conclusiones"),
    observaciones: z.string().trim().max(1000).optional().nullable(),
    investigador: idPositivo.optional().nullable(),
});
const activitySchema = z.object({
    id_actividad: idPositivo.optional(),
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
const plansBatchSchema = z.object({
    planes: z.array(planSchema).min(1, "Agregue al menos un plan de acción"),
});
async function validarResponsablesJefeDeArea(planes) {
    const ids = Array.from(new Set(planes.flatMap((plan) => [
        plan.responsable,
        ...plan.actividades.map((actividad) => actividad.responsable).filter((id) => id != null),
    ])));
    const responsablesValidos = await prisma.usuarios.findMany({
        where: {
            id_usuario: { in: ids },
            estado: "Activo",
            roles: { nombre_rol: "Jefe de Área" },
        },
        select: { id_usuario: true },
    });
    if (responsablesValidos.length !== ids.length) {
        throw new Error("El responsable debe ser un usuario activo con rol Jefe de Área");
    }
}
/**
 * Área por la que se filtra un listado. Para un Jefe de Área siempre manda la
 * suya, ignorando lo que venga por query: el filtro dejó de ser una comodidad
 * del cliente y pasó a ser el límite de lo que puede ver. Los demás roles
 * (SO, Admin) sí eligen libremente.
 */
async function areaEfectiva(areaQuery, actor) {
    if (esJefeDeArea(actor))
        return areaDelActor(actor);
    const area = areaQuery ? Number(areaQuery) : undefined;
    return Number.isFinite(area) ? area : undefined;
}
async function getCasoBasico(codigo, accion) {
    const caso = await CaseRepository.findBasicByCodigo(codigo);
    if (!caso)
        throw new Error(`El caso ${codigo} no existe`);
    if (accion) {
        assertTransicion(accion, caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre);
    }
    return caso;
}
/**
 * Contexto de un plan para las acciones que se identifican por `id_plan` en
 * vez de por código de caso. Comprueba de una sola vez las dos cosas que
 * antes no se comprobaban: que la etapa del caso admita la acción y que el
 * plan sea de quien lo está tocando.
 */
async function getPlanBasico(idPlan, accion, actor) {
    const id = Number(idPlan);
    if (!Number.isFinite(id))
        throw new Error("Identificador de plan inválido");
    const plan = await CaseRepository.findPlanContexto(id);
    if (!plan)
        throw new Error(`El plan ${idPlan} no existe`);
    // La propiedad se comprueba antes que la etapa a propósito: a quien no tiene
    // nada que ver con el plan no se le informa en qué etapa va el caso.
    if (actor)
        await assertPlanPropio(plan, actor);
    if (accion) {
        assertTransicion(accion, plan.casos_sop?.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre);
    }
    return plan;
}
/**
 * Un Jefe de Área solo opera los planes de su área. Antes el guard de ruta
 * solo miraba el rol, así que el jefe de cualquier área podía aceptar, ejecutar
 * o cerrar el plan de otra.
 *
 * Seguridad Operativa y Admin pasan sin restricción: son quienes supervisan
 * todos los planes.
 */
async function assertPlanPropio(plan, actor) {
    if (!esJefeDeArea(actor))
        return;
    if (plan.responsable === actor.id_usuario)
        return;
    const areaActor = await areaDelActor(actor);
    if (plan.id_area != null && areaActor != null && plan.id_area === areaActor)
        return;
    throw new PlanAjenoError("Este plan de acción pertenece a otra área");
}
export class CaseService {
    static async list(query, actor) {
        const estados = query.estado ? query.estado.split(",").filter(Boolean) : undefined;
        const area = await areaEfectiva(query.area, actor);
        const sort = query.sort === "prioridad" || query.sort === "sla" ? query.sort : "recientes";
        const filters = { sort };
        // Ambos o ninguno: una página sin tamaño (o viceversa) no significa nada,
        // así que se ignoran los dos y se cae al comportamiento sin paginar.
        const page = Number(query.page);
        const limit = Number(query.limit);
        const paginar = Number.isInteger(page) && page > 0 && Number.isInteger(limit) && limit > 0;
        const fullFilters = {
            ...filters,
            ...(estados?.length ? { estados } : {}),
            ...(area != null ? { area } : {}),
            ...(query.search ? { search: query.search } : {}),
            ...(paginar ? { page, limit } : {}),
        };
        return CaseRepository.findAll(fullFilters);
    }
    static async counts(query, actor) {
        const area = await areaEfectiva(query.area, actor);
        return CaseRepository.counts(area);
    }
    static async listPlans(query, actor) {
        const area = await areaEfectiva(query.area, actor);
        return CaseRepository.findPlansByArea({
            ...(area != null ? { id_area: area } : {}),
            ...(query.codigo ? { codigo_sop: query.codigo } : {}),
        });
    }
    /**
     * Expediente completo. Un Jefe de Área solo abre los casos que le competen:
     * los de su área o aquellos donde tiene un plan asignado — el mismo criterio
     * que `assertPlanPropio` y que su bandeja, para que lo que ve listado sea
     * exactamente lo que puede abrir.
     *
     * A quien no le corresponde se le responde "no existe" en vez de "no tienes
     * permiso": tampoco se le confirma que ese código exista.
     */
    static async getByCodigo(codigo, actor) {
        const caso = await CaseRepository.findByCodigo(codigo);
        if (!caso)
            throw new Error(`El caso ${codigo} no existe`);
        if (!esJefeDeArea(actor))
            return caso;
        const areaActor = await areaDelActor(actor);
        const esDeSuArea = areaActor != null && caso.area_responsable === areaActor;
        const tienePlanPropio = caso.planes_accion.some((plan) => plan.responsable === actor.id_usuario || (areaActor != null && plan.id_area === areaActor));
        if (!esDeSuArea && !tienePlanPropio)
            throw new Error(`El caso ${codigo} no existe`);
        return caso;
    }
    static async approve(codigo) {
        const caso = await getCasoBasico(codigo, "approve");
        return CaseRepository.approve(caso.id_caso);
    }
    static async addObservation(codigo, rawBody) {
        const dto = observationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "addObservation");
        return CaseRepository.addObservation(caso.id_caso, dto.texto);
    }
    static async evaluate(codigo, rawBody) {
        const dto = evaluateSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "evaluate");
        return CaseRepository.evaluate(caso.id_caso, dto);
    }
    /**
     * Corrección del tipo de reporte (Accidente / Incidente / Condición
     * Insegura) que hace Seguridad Operativa en Recepción, para los casos en
     * que el reportante lo marcó mal. Solo cambia ese campo, no reabre ni
     * mueve de etapa el caso.
     */
    static async updateTipo(codigo, rawBody, actor) {
        const dto = updateTipoSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "updateTipo");
        return CaseRepository.updateTipo(caso.id_caso, dto.id_tipo, await nombreDelActor(actor));
    }
    static async reject(codigo, rawBody) {
        const dto = rejectSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "reject");
        return CaseRepository.reject(caso.id_caso, dto);
    }
    static async requestInfo(codigo, rawBody) {
        const dto = requestInfoSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "requestInfo");
        const estadoActual = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
        return CaseRepository.requestInfo(caso.id_caso, estadoActual, dto);
    }
    static async respondInfo(codigo, idSolicitud, rawBody) {
        const dto = respondInfoSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "respondInfo");
        return CaseRepository.respondInfo(caso.id_caso, Number(idSolicitud), dto);
    }
    static async saveInvestigation(codigo, rawBody) {
        const dto = investigationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "saveInvestigation");
        return CaseRepository.saveInvestigation(caso.id_caso, dto);
    }
    static async createPlan(codigo, rawBody) {
        const dto = planSchema.parse(rawBody);
        await validarResponsablesJefeDeArea([dto]);
        const caso = await getCasoBasico(codigo, "createPlan");
        return CaseRepository.createPlan(caso.id_caso, caso.codigo_sop, dto);
    }
    static async createPlans(codigo, rawBody) {
        const dto = plansBatchSchema.parse(rawBody);
        await validarResponsablesJefeDeArea(dto.planes);
        const caso = await getCasoBasico(codigo, "createPlan");
        return CaseRepository.createPlans(caso.id_caso, caso.codigo_sop, dto.planes);
    }
    static async updatePlan(idPlan, rawBody) {
        const dto = planSchema.parse(rawBody);
        await validarResponsablesJefeDeArea([dto]);
        const plan = await getPlanBasico(idPlan, "updatePlan");
        return CaseRepository.updatePlan(plan.id_plan, dto);
    }
    static async closeCase(codigo, rawBody) {
        const dto = notaSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo, "close");
        return CaseRepository.closeCase(caso.id_caso, dto.nota);
    }
    /** SO arranca la Ejecución con los planes ya aceptados, sin esperar al resto. */
    static async startExecution(codigo) {
        const caso = await getCasoBasico(codigo, "startExecution");
        return CaseRepository.startExecution(caso.id_caso);
    }
    static async acceptPlan(codigo, _rawBody, actor) {
        const caso = await getCasoBasico(codigo, "acceptPlan");
        return CaseRepository.acceptPlan(caso.id_caso, await nombreDelActor(actor));
    }
    static async acceptPlanById(idPlan, _rawBody, actor) {
        const plan = await getPlanBasico(idPlan, "acceptPlan", actor);
        return CaseRepository.acceptPlanById(plan.id_plan, await nombreDelActor(actor));
    }
    static async completeExecutionByPlan(idPlan, rawBody, actor) {
        const dto = completePlanSchema.parse(rawBody ?? {});
        const plan = await getPlanBasico(idPlan, "completeExecution", actor);
        return CaseRepository.completeExecutionByPlan(plan.id_plan, await nombreDelActor(actor), dto.descripcion, dto.comentario?.trim() || null);
    }
    static async reviewFinalPlanById(idPlan, rawBody) {
        const dto = planFinalReviewSchema.parse(rawBody ?? {});
        // Sin comprobación de propiedad: la ruta ya la limita a Seguridad Operativa.
        const plan = await getPlanBasico(idPlan, "reviewFinalPlan");
        return CaseRepository.reviewFinalPlanById(plan.id_plan, dto.decision, dto.nota ?? null);
    }
    static async requestExtensionByPlan(idPlan, rawBody, actor) {
        const dto = extensionSchema.parse(rawBody);
        const plan = await getPlanBasico(idPlan, "requestExtension", actor);
        return CaseRepository.requestExtensionByPlan(plan.id_plan, { nueva_fecha: dto.nueva_fecha, justificacion: dto.justificacion }, await nombreDelActor(actor));
    }
    static async reviewExtensionByPlan(idPlan, rawBody) {
        const dto = extensionReviewSchema.parse(rawBody);
        const plan = await getPlanBasico(idPlan, "reviewExtension");
        return CaseRepository.reviewExtensionByPlan(plan.id_plan, dto.decision, dto.nota ?? null, dto.fecha_aprobada ?? null);
    }
    static async completeExecution(codigo, _rawBody, actor) {
        const caso = await getCasoBasico(codigo, "completeExecution");
        return CaseRepository.completeExecution(caso.id_caso, await nombreDelActor(actor));
    }
    static async sendToVerification(codigo) {
        const caso = await getCasoBasico(codigo, "sendToVerification");
        return CaseRepository.sendToVerification(caso.id_caso);
    }
    static async keepPending(codigo, rawBody) {
        const dto = notaSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo, "keepPending");
        return CaseRepository.keepPending(caso.id_caso, dto.nota);
    }
    static async reopenCase(codigo, rawBody) {
        const dto = reopenSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo, "reopen");
        return CaseRepository.reopenCase(caso.id_caso, dto.nota, dto.destino);
    }
    static async rollbackStage(codigo, rawBody) {
        const dto = rollbackSchema.parse(rawBody ?? {});
        const caso = await getCasoBasico(codigo, "rollback");
        const estadoActual = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;
        return CaseRepository.rollbackStage(caso.id_caso, estadoActual, dto.destino, dto.motivo);
    }
    static async updateActivity(idActividad, rawBody, actor) {
        const dto = activityUpdateSchema.parse(rawBody);
        const id = idPositivo.parse(idActividad);
        // La actividad se toca desde el plan, así que hereda su dueño.
        const plan = await CaseRepository.findActividadContexto(id);
        if (!plan)
            throw new Error(`La actividad ${idActividad} no existe`);
        if (actor)
            await assertPlanPropio(plan, actor);
        return CaseRepository.updateActivity(id, dto.estado, dto.comentario ?? null, await nombreDelActor(actor));
    }
    static async requestExtension(codigo, rawBody, actor) {
        const dto = extensionSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "requestExtension");
        return CaseRepository.requestExtension(caso.id_caso, { nueva_fecha: dto.nueva_fecha, justificacion: dto.justificacion }, await nombreDelActor(actor));
    }
    static async reviewExtension(codigo, rawBody) {
        const dto = extensionReviewSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo, "reviewExtension");
        return CaseRepository.reviewExtension(caso.id_caso, dto.decision, dto.nota ?? null);
    }
    static async addComment(codigo, rawBody) {
        const dto = observationSchema.parse(rawBody);
        const caso = await getCasoBasico(codigo);
        return CaseRepository.addComment(caso.id_caso, dto.texto);
    }
    static async addPlanComment(idPlan, rawBody, actor) {
        const dto = planCommentSchema.parse(rawBody);
        const plan = await getPlanBasico(idPlan, undefined, actor);
        // De qué lado viene el comentario lo decide el rol de la sesión, no el body.
        const rol = esJefeDeArea(actor) ? "jefe" : "seguridad";
        return CaseRepository.addPlanComment(plan.id_plan, dto.texto, rol, await nombreDelActor(actor));
    }
    /** El jefe quita una evidencia equivocada, antes de enviar el cierre a SO. */
    static async removePlanEvidence(idPlan, idAnexo, _rawBody, actor) {
        const plan = await getPlanBasico(idPlan, undefined, actor);
        return CaseRepository.removePlanEvidence(plan.id_plan, idPositivo.parse(idAnexo), await nombreDelActor(actor));
    }
    static async addEvidence(codigo, files) {
        const caso = await getCasoBasico(codigo);
        return CaseRepository.addEvidence(caso.id_caso, files);
    }
    /** Actualización adicional del jefe sobre un plan ya cerrado por el área. */
    static async addPlanUpdate(idPlan, rawBody, files, actor) {
        const dto = planUpdateSchema.parse(rawBody ?? {});
        const plan = await getPlanBasico(idPlan, undefined, actor);
        return CaseRepository.addPlanUpdate(plan.id_plan, dto.descripcion, files, await nombreDelActor(actor));
    }
    static async addEvidenceByPlan(idPlan, _rawBody, files, actor) {
        const plan = await getPlanBasico(idPlan, undefined, actor);
        return CaseRepository.addEvidenceByPlan(plan.id_plan, files, await nombreDelActor(actor));
    }
}
//# sourceMappingURL=case.service.js.map