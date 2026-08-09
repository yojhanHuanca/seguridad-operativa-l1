import prisma from "../../lib/prisma.js";
const LIST_INCLUDE = {
    catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true, color: true } },
    catalogo_detalle_casos_sop_tipoTocatalogo_detalle: { select: { nombre: true } },
    catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: { select: { nombre: true } },
    catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { select: { id_detalle: true, codigo: true, nombre: true, orden: true } },
    areas: { select: { id_area: true, nombre_area: true } },
    anexos_caso: { select: { id_anexo: true } },
    planes_accion: {
        orderBy: { created_at: "asc" },
        include: {
            areas: { select: { id_area: true, nombre_area: true } },
            usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
            catalogo_detalle: { select: { nombre: true } },
            actividades_plan: {
                orderBy: { id_actividad: "asc" },
                include: {
                    usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
                    catalogo_detalle: { select: { nombre: true } },
                    seguimientos: {
                        orderBy: { fecha: "desc" },
                        include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } },
                    },
                },
            },
        },
    },
    evento_caso: {
        include: {
            eventos_operativos: {
                include: {
                    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { select: { nombre: true } },
                },
            },
        },
    },
};
const DETAIL_INCLUDE = {
    ...LIST_INCLUDE,
    catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: { select: { nombre: true } },
    catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle: { select: { nombre: true } },
    catalogo_detalle_casos_sop_estado_planTocatalogo_detalle: { select: { nombre: true } },
    usuarios_casos_sop_responsable_hallazgoTousuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
    usuarios_casos_sop_responsable_planTousuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
    anexos_caso: true,
    investigacion_caso: { include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } } },
    solicitudes_informacion: { orderBy: { fecha_solicitud: "desc" } },
    timeline_caso: { orderBy: { fecha: "desc" } },
    planes_accion: {
        orderBy: { created_at: "asc" },
        include: {
            areas: { select: { id_area: true, nombre_area: true } },
            usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
            catalogo_detalle: { select: { nombre: true } },
            actividades_plan: {
                orderBy: { id_actividad: "asc" },
                include: {
                    usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
                    catalogo_detalle: { select: { nombre: true } },
                    seguimientos: {
                        orderBy: { fecha: "desc" },
                        include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } },
                    },
                },
            },
        },
    },
    evento_caso: {
        include: {
            eventos_operativos: {
                include: {
                    catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle: { select: { nombre: true } },
                    catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle: { select: { nombre: true } },
                },
            },
        },
    },
};
// TODO(auth): reemplazar por el usuario autenticado cuando exista login real.
const ACTOR_SO = "Seguridad Operativa";
export class CaseRepository {
    /** Registra un evento en la bitácora del expediente. */
    static async pushTimeline(client, id_caso, e) {
        await client.timeline_caso.create({
            data: {
                id_caso,
                kind: e.kind,
                actor: e.actor,
                actor_rol: e.actor_rol,
                titulo: e.titulo,
                detalle: e.detalle ?? null,
            },
        });
    }
    static async addComment(id_caso, texto) {
        await CaseRepository.pushTimeline(prisma, id_caso, {
            kind: "comentario",
            actor: ACTOR_SO,
            actor_rol: "seguridad",
            titulo: "Comentario agregado al expediente",
            detalle: texto,
        });
        return prisma.timeline_caso.findMany({ where: { id_caso }, orderBy: { fecha: "desc" } });
    }
    /** Comentario operativo de SO asociado a un plan específico. */
    static async addPlanComment(id_plan, texto) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: { id_caso: true, codigo_plan: true },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        await CaseRepository.pushTimeline(prisma, plan.id_caso, {
            kind: "comentario",
            actor: ACTOR_SO,
            actor_rol: "seguridad",
            titulo: `Comentario SO — ${plan.codigo_plan}`,
            detalle: texto,
        });
        return prisma.timeline_caso.findMany({ where: { id_caso: plan.id_caso }, orderBy: { fecha: "desc" } });
    }
    static async findAll(filtros) {
        const where = {};
        if (filtros.estados?.length) {
            where.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle = { nombre: { in: filtros.estados } };
        }
        if (filtros.area)
            where.area_responsable = filtros.area;
        if (filtros.search) {
            const q = filtros.search;
            where.OR = [
                { codigo_sop: { contains: q, mode: "insensitive" } },
                { titulo: { contains: q, mode: "insensitive" } },
                { descripcion: { contains: q, mode: "insensitive" } },
            ];
        }
        const orderBy = filtros.sort === "prioridad"
            ? [{ catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { orden: "asc" } }, { created_at: "desc" }]
            : { created_at: "desc" };
        return prisma.casos_sop.findMany({ where, include: LIST_INCLUDE, orderBy });
    }
    static async findByCodigo(codigo_sop) {
        return prisma.casos_sop.findUnique({ where: { codigo_sop }, include: DETAIL_INCLUDE });
    }
    /**
     * Planes de acción visibles para un Jefe de Área. Si no se pasa área,
     * devuelve todos (útil mientras no hay login que fije el área del usuario).
     */
    static async findPlansByArea(id_area) {
        return prisma.planes_accion.findMany({
            ...(id_area ? { where: { id_area } } : {}),
            orderBy: { created_at: "desc" },
            include: {
                areas: { select: { id_area: true, nombre_area: true } },
                usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
                catalogo_detalle: { select: { nombre: true } },
                actividades_plan: {
                    orderBy: { id_actividad: "asc" },
                    include: {
                        usuarios: { select: { id_usuario: true, nombre: true, cargo: true } },
                        catalogo_detalle: { select: { nombre: true } },
                        seguimientos: {
                            orderBy: { fecha: "desc" },
                            include: { usuarios: { select: { id_usuario: true, nombre: true, cargo: true } } },
                        },
                    },
                },
                casos_sop: {
                    select: {
                        id_caso: true,
                        codigo_sop: true,
                        titulo: true,
                        descripcion: true,
                        fecha_hallazgo: true,
                        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
                        catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: { select: { codigo: true, nombre: true } },
                        investigacion_caso: { select: { causa_raiz: true, hallazgos: true, conclusiones: true } },
                        anexos_caso: {
                            orderBy: { fecha_subida: "desc" },
                            select: {
                                id_anexo: true,
                                nombre_archivo: true,
                                ruta_archivo: true,
                                tipo_archivo: true,
                                peso: true,
                                fecha_subida: true,
                            },
                        },
                    },
                },
            },
        });
    }
    static async findBasicByCodigo(codigo_sop) {
        return prisma.casos_sop.findUnique({
            where: { codigo_sop },
            select: {
                id_caso: true,
                codigo_sop: true,
                catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: { select: { nombre: true } },
            },
        });
    }
    static async findEstado(nombre) {
        const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Hallazgo" } } });
        if (!estado)
            throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Hallazgo"`);
        return estado;
    }
    static async findEstadoPlan(nombre) {
        const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Plan de acción" } } });
        if (!estado)
            throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Plan de acción"`);
        return estado;
    }
    static async ensureEstadoPlan(nombre) {
        const catalogo = await prisma.catalogos.findUnique({
            where: { nombre: "Estado Plan de acción" },
            select: { id_catalogo: true },
        });
        if (!catalogo)
            throw new Error('Falta el catálogo "Estado Plan de acción"');
        const existente = await prisma.catalogo_detalle.findFirst({
            where: { id_catalogo: catalogo.id_catalogo, nombre },
        });
        if (existente)
            return existente;
        const orden = await prisma.catalogo_detalle.aggregate({
            where: { id_catalogo: catalogo.id_catalogo },
            _max: { orden: true },
        });
        return prisma.catalogo_detalle.create({
            data: {
                id_catalogo: catalogo.id_catalogo,
                nombre,
                orden: (orden._max.orden ?? 0) + 1,
            },
        });
    }
    static async findEstadoActividad(nombre) {
        const estado = await prisma.catalogo_detalle.findFirst({ where: { nombre, catalogos: { nombre: "Estado Actividad" } } });
        if (!estado)
            throw new Error(`Falta el estado "${nombre}" en el catálogo "Estado Actividad"`);
        return estado;
    }
    static async approve(id_caso) {
        const estado = await CaseRepository.findEstado("Evaluación");
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "aprobado",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Reporte aprobado — pasa a Evaluación",
            });
            return caso;
        });
    }
    static async addObservation(id_caso, texto) {
        const caso = await prisma.casos_sop.findUniqueOrThrow({ where: { id_caso }, select: { observaciones: true } });
        const fecha = new Date().toLocaleString("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
        const nueva = `[${fecha}] ${texto}`;
        const observaciones = caso.observaciones ? `${caso.observaciones}\n${nueva}` : nueva;
        return prisma.$transaction(async (tx) => {
            const actualizado = await tx.casos_sop.update({ where: { id_caso }, data: { observaciones } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "comentario",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Observación de revisión registrada",
                detalle: texto,
            });
            return actualizado;
        });
    }
    static async evaluate(id_caso, dto) {
        const destino = dto.requiere_investigacion ? "Investigación" : "Plan de Acción";
        const estado = await CaseRepository.findEstado(destino);
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({
                where: { id_caso },
                data: {
                    analisis_riesgo: dto.id_riesgo,
                    clasificacion: dto.clasificacion,
                    estado_hallazgo: estado.id_detalle,
                    ...(dto.id_area != null ? { area_responsable: dto.id_area } : {}),
                    ...(dto.id_responsable != null ? { responsable_hallazgo: dto.id_responsable } : {}),
                    ...(dto.peligro != null ? { peligro: dto.peligro } : {}),
                    ...(dto.consecuencia != null ? { consecuencia: dto.consecuencia } : {}),
                    ...(dto.observaciones != null ? { observaciones: dto.observaciones } : {}),
                },
            });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: dto.requiere_investigacion ? "investigacion" : "derivado",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: `Caso evaluado — pasa a ${destino}`,
                detalle: `Clasificación: ${dto.clasificacion}.`,
            });
            return caso;
        });
    }
    static async reject(id_caso, dto) {
        const estado = await CaseRepository.findEstado("Rechazado");
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({
                where: { id_caso },
                data: { estado_hallazgo: estado.id_detalle, ...(dto.motivo != null ? { observaciones: dto.motivo } : {}) },
            });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "rechazado",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Reporte rechazado",
                detalle: dto.motivo ?? null,
            });
            return caso;
        });
    }
    static async requestInfo(id_caso, estadoActualNombre, dto) {
        const estadoPausa = await CaseRepository.findEstado("Pendiente de Información");
        return prisma.$transaction(async (tx) => {
            const solicitud = await tx.solicitudes_informacion.create({
                data: { id_caso, mensaje: dto.mensaje, estado_previo: estadoActualNombre },
            });
            await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoPausa.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "info_solicitada",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Información adicional solicitada al reportante",
                detalle: dto.mensaje,
            });
            return solicitud;
        });
    }
    static async respondInfo(id_caso, id_solicitud, dto) {
        const solicitud = await prisma.solicitudes_informacion.findUnique({ where: { id_solicitud } });
        if (!solicitud || solicitud.id_caso !== id_caso)
            throw new Error("La solicitud de información no existe para este caso");
        const estadoDestino = await CaseRepository.findEstado(solicitud.estado_previo ?? "Evaluación");
        return prisma.$transaction(async (tx) => {
            const actualizada = await tx.solicitudes_informacion.update({
                where: { id_solicitud },
                data: { respondida: true, respuesta: dto.respuesta ?? null, fecha_respuesta: new Date() },
            });
            await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoDestino.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "info_recibida",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: `Información recibida — vuelve a ${estadoDestino.nombre}`,
                detalle: dto.respuesta ?? null,
            });
            return actualizada;
        });
    }
    static async saveInvestigation(id_caso, dto) {
        const estado = await CaseRepository.findEstado("Plan de Acción");
        return prisma.$transaction(async (tx) => {
            const investigacion = await tx.investigacion_caso.upsert({
                where: { id_caso },
                create: {
                    id_caso,
                    hallazgos: dto.hallazgos,
                    causa_raiz: dto.causa_raiz,
                    conclusiones: dto.conclusiones,
                    observaciones: dto.observaciones ?? null,
                    investigador: dto.investigador ?? null,
                },
                update: {
                    hallazgos: dto.hallazgos,
                    causa_raiz: dto.causa_raiz,
                    conclusiones: dto.conclusiones,
                    observaciones: dto.observaciones ?? null,
                    ...(dto.investigador != null ? { investigador: dto.investigador } : {}),
                    updated_at: new Date(),
                },
            });
            await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "investigacion",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Investigación registrada — pasa a Plan de Acción",
                detalle: `Causa raíz: ${dto.causa_raiz}`,
            });
            return investigacion;
        });
    }
    static async createPlan(id_caso, codigo_sop, dto) {
        const MAX_INTENTOS = 3;
        let intento = 0;
        // El caso NO pasa a Ejecución al crear el plan: queda en "Plan de Acción"
        // con el plan en estado "Enviado", esperando que el Jefe del Área lo
        // acepte (acceptPlan). Recién ahí arranca la Ejecución — mismo flujo que
        // el prototipo (submitActionPlan deja stage="plan_accion").
        const [estadoPlanEnviado, estadoCasoPlan, estadoActividadPendiente] = await Promise.all([
            CaseRepository.findEstadoPlan("Enviado"),
            CaseRepository.findEstado("Plan de Acción"),
            CaseRepository.findEstadoActividad("Pendiente"),
        ]);
        while (true) {
            intento++;
            try {
                return await prisma.$transaction(async (tx) => {
                    const totalPlanes = await tx.planes_accion.count({ where: { id_caso } });
                    const codigo_plan = `${codigo_sop}-PLA-${String(totalPlanes + 1).padStart(2, "0")}`;
                    const plan = await tx.planes_accion.create({
                        data: {
                            id_caso,
                            codigo_plan,
                            descripcion: dto.descripcion,
                            id_area: dto.id_area,
                            responsable: dto.responsable,
                            estado: estadoPlanEnviado.id_detalle,
                            fecha_plan: new Date(dto.fecha_plan),
                            observaciones: dto.observaciones ?? null,
                        },
                    });
                    if (dto.actividades.length > 0) {
                        await tx.actividades_plan.createMany({
                            data: dto.actividades.map((a) => ({
                                id_plan: plan.id_plan,
                                descripcion: a.descripcion,
                                responsable: a.responsable ?? null,
                                fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
                                fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
                                estado: estadoActividadPendiente.id_detalle,
                                porcentaje: 0,
                            })),
                        });
                    }
                    await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoCasoPlan.id_detalle } });
                    await CaseRepository.pushTimeline(tx, id_caso, {
                        kind: "plan_propuesto",
                        actor: ACTOR_SO,
                        actor_rol: "seguridad",
                        titulo: "Plan de Acción enviado a Jefe de Área",
                        detalle: `${codigo_plan} · pendiente de aceptación por el área responsable.`,
                    });
                    return plan;
                });
            }
            catch (error) {
                const esColision = error instanceof Error && error.message.includes("codigo_plan");
                if (esColision && intento < MAX_INTENTOS)
                    continue;
                throw error;
            }
        }
    }
    static async createPlans(id_caso, codigo_sop, dtos) {
        if (dtos.length === 0)
            throw new Error("Agregue al menos un plan de acción");
        const [estadoPlanEnviado, estadoCasoPlan, estadoActividadPendiente] = await Promise.all([
            CaseRepository.findEstadoPlan("Enviado"),
            CaseRepository.findEstado("Plan de Acción"),
            CaseRepository.findEstadoActividad("Pendiente"),
        ]);
        return prisma.$transaction(async (tx) => {
            const totalPlanes = await tx.planes_accion.count({ where: { id_caso } });
            const creados = [];
            for (const [i, dto] of dtos.entries()) {
                const numero = totalPlanes + i + 1;
                const codigo_plan = `${codigo_sop}-PLA-${String(numero).padStart(2, "0")}`;
                const plan = await tx.planes_accion.create({
                    data: {
                        id_caso,
                        codigo_plan,
                        descripcion: dto.descripcion,
                        id_area: dto.id_area,
                        responsable: dto.responsable,
                        estado: estadoPlanEnviado.id_detalle,
                        fecha_plan: new Date(dto.fecha_plan),
                        observaciones: dto.observaciones ?? null,
                    },
                });
                if (dto.actividades.length > 0) {
                    await tx.actividades_plan.createMany({
                        data: dto.actividades.map((a) => ({
                            id_plan: plan.id_plan,
                            descripcion: a.descripcion,
                            responsable: a.responsable ?? null,
                            fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
                            fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
                            estado: estadoActividadPendiente.id_detalle,
                            porcentaje: 0,
                        })),
                    });
                }
                await CaseRepository.pushTimeline(tx, id_caso, {
                    kind: "plan_propuesto",
                    actor: ACTOR_SO,
                    actor_rol: "seguridad",
                    titulo: "Plan de Acción enviado a Jefe de Área",
                    detalle: `${codigo_plan} · pendiente de aceptación por el área responsable.`,
                });
                creados.push(plan);
            }
            await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoCasoPlan.id_detalle } });
            return creados;
        });
    }
    /**
     * Modifica un plan ya enviado conservando las actividades existentes.
     * Antes se borraban y recreaban en bloque; eso hacía que al presionar
     * "Modificar" se perdiera lo ya cargado, especialmente estados, avances y
     * seguimientos registrados sobre la actividad.
     */
    static async updatePlan(id_plan, dto) {
        const estadoActPendiente = await CaseRepository.findEstadoActividad("Pendiente");
        return prisma.$transaction(async (tx) => {
            const actividadesActuales = await tx.actividades_plan.findMany({
                where: { id_plan },
                select: {
                    id_actividad: true,
                    porcentaje: true,
                    seguimientos: { select: { id_seguimiento: true }, take: 1 },
                },
            });
            const idsActuales = new Set(actividadesActuales.map((a) => a.id_actividad));
            const idsRecibidos = new Set(dto.actividades
                .map((a) => a.id_actividad)
                .filter((id) => typeof id === "number" && idsActuales.has(id)));
            const plan = await tx.planes_accion.update({
                where: { id_plan },
                data: {
                    descripcion: dto.descripcion,
                    id_area: dto.id_area,
                    responsable: dto.responsable,
                    fecha_plan: new Date(dto.fecha_plan),
                    observaciones: dto.observaciones ?? null,
                    updated_at: new Date(),
                },
            });
            for (const a of dto.actividades) {
                if (a.id_actividad && idsActuales.has(a.id_actividad)) {
                    await tx.actividades_plan.update({
                        where: { id_actividad: a.id_actividad },
                        data: {
                            descripcion: a.descripcion,
                            responsable: a.responsable ?? null,
                            fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
                            fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
                        },
                    });
                }
                else {
                    await tx.actividades_plan.create({
                        data: {
                            id_plan,
                            descripcion: a.descripcion,
                            responsable: a.responsable ?? null,
                            fecha_inicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
                            fecha_fin: a.fecha_fin ? new Date(a.fecha_fin) : null,
                            estado: estadoActPendiente.id_detalle,
                            porcentaje: 0,
                        },
                    });
                }
            }
            const removibles = actividadesActuales
                .filter((a) => !idsRecibidos.has(a.id_actividad))
                .filter((a) => Number(a.porcentaje ?? 0) === 0 && a.seguimientos.length === 0)
                .map((a) => a.id_actividad);
            if (removibles.length > 0) {
                await tx.actividades_plan.deleteMany({ where: { id_actividad: { in: removibles } } });
            }
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "plan_ajustado",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Plan de Acción modificado",
                detalle: `${plan.codigo_plan} · ${dto.actividades.length} actividad(es).`,
            });
            return plan;
        });
    }
    /** ETAPA 5 — el Jefe del Área acepta el plan y arranca la Ejecución. */
    static async acceptPlan(id_caso, actor) {
        const [estadoCaso, estadoPlanEnEjecucion, estadoActEnProgreso] = await Promise.all([
            CaseRepository.findEstado("Ejecución"),
            CaseRepository.findEstadoPlan("En Ejecución"),
            CaseRepository.findEstadoActividad("En progreso"),
        ]);
        return prisma.$transaction(async (tx) => {
            const planes = await tx.planes_accion.findMany({ where: { id_caso }, select: { id_plan: true } });
            const ids = planes.map((p) => p.id_plan);
            await tx.planes_accion.updateMany({ where: { id_caso }, data: { estado: estadoPlanEnEjecucion.id_detalle } });
            if (ids.length > 0) {
                await tx.actividades_plan.updateMany({ where: { id_plan: { in: ids } }, data: { estado: estadoActEnProgreso.id_detalle, porcentaje: 0 } });
            }
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estadoCaso.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "plan_aprobado",
                actor,
                actor_rol: "jefe",
                titulo: "Plan aceptado por el jefe del área",
                detalle: "El área aceptó el plan. Ejecución iniciada.",
            });
            return caso;
        });
    }
    /** ETAPA 5 — el Jefe del Área acepta un plan específico del reporte. */
    static async acceptPlanById(id_plan, actor) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: { id_plan: true, id_caso: true, codigo_plan: true, descripcion: true },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        const [estadoCaso, estadoPlanAceptado, estadoPlanEnEjecucion, estadoPlanFinalizado, estadoPlanCerrado, estadoActEnProgreso] = await Promise.all([
            CaseRepository.findEstado("Ejecución"),
            CaseRepository.findEstadoPlan("Aceptado"),
            CaseRepository.findEstadoPlan("En Ejecución"),
            CaseRepository.ensureEstadoPlan("Finalizado"),
            CaseRepository.findEstadoPlan("Cerrado"),
            CaseRepository.findEstadoActividad("En progreso"),
        ]);
        return prisma.$transaction(async (tx) => {
            const actualizado = await tx.planes_accion.update({
                where: { id_plan },
                data: { estado: estadoPlanEnEjecucion.id_detalle, updated_at: new Date() },
            });
            await tx.actividades_plan.updateMany({
                where: { id_plan },
                data: { estado: estadoActEnProgreso.id_detalle, porcentaje: 0 },
            });
            const estadosListos = [
                estadoPlanAceptado.id_detalle,
                estadoPlanEnEjecucion.id_detalle,
                estadoPlanFinalizado.id_detalle,
                estadoPlanCerrado.id_detalle,
            ];
            const planesPendientes = await tx.planes_accion.count({
                where: { id_caso: plan.id_caso, estado: { notIn: estadosListos } },
            });
            if (planesPendientes === 0) {
                await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estadoCaso.id_detalle } });
            }
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "plan_aprobado",
                actor,
                actor_rol: "jefe",
                titulo: planesPendientes === 0 ? "Todos los planes fueron aceptados" : "Plan aceptado por el jefe del área",
                detalle: planesPendientes === 0
                    ? `${plan.codigo_plan} aceptado. Todos los planes del reporte pueden ejecutarse.`
                    : `${plan.codigo_plan} aceptado. Este plan inicia ejecución; el caso espera la aceptación de los demás planes.`,
            });
            return actualizado;
        });
    }
    /** El área termina un plan específico; SO lo revisa después de forma independiente. */
    static async completeExecutionByPlan(id_plan, actor, descripcionCierre) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: {
                id_plan: true,
                id_caso: true,
                codigo_plan: true,
                catalogo_detalle: { select: { nombre: true } },
            },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        const estadoPlan = plan.catalogo_detalle.nombre.toLowerCase();
        if (estadoPlan.includes("finaliz") || estadoPlan.includes("cerrad")) {
            throw new Error(`El plan ${plan.codigo_plan} ya fue enviado a revisión`);
        }
        const [totalActividades, actividadesPendientes] = await Promise.all([
            prisma.actividades_plan.count({ where: { id_plan } }),
            prisma.actividades_plan.count({
                where: {
                    id_plan,
                    OR: [{ porcentaje: null }, { porcentaje: { lt: 100 } }],
                },
            }),
        ]);
        if (totalActividades === 0) {
            throw new Error(`El plan ${plan.codigo_plan} no tiene actividades para finalizar`);
        }
        if (actividadesPendientes > 0) {
            throw new Error(`Complete todas las actividades antes de enviar ${plan.codigo_plan} a revisión`);
        }
        const [estadoPlanFinalizado, estadoActCompletado] = await Promise.all([
            CaseRepository.ensureEstadoPlan("Finalizado"),
            CaseRepository.findEstadoActividad("Completado"),
        ]);
        return prisma.$transaction(async (tx) => {
            await tx.planes_accion.update({
                where: { id_plan },
                data: { estado: estadoPlanFinalizado.id_detalle, updated_at: new Date() },
            });
            await tx.actividades_plan.updateMany({
                where: { id_plan },
                data: { estado: estadoActCompletado.id_detalle, porcentaje: 100 },
            });
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "seguimiento",
                actor,
                actor_rol: "jefe",
                titulo: `Plan de acción finalizado por el área — ${plan.codigo_plan}`,
                detalle: `Descripción final: ${descripcionCierre}`,
            });
            return tx.planes_accion.findUnique({ where: { id_plan } });
        });
    }
    /** SO revisa un plan finalizado: lo cierra o lo devuelve al área sin afectar a otros planes. */
    static async reviewFinalPlanById(id_plan, decision, nota) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: {
                id_plan: true,
                id_caso: true,
                codigo_plan: true,
                catalogo_detalle: { select: { nombre: true } },
            },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        if (plan.catalogo_detalle.nombre !== "Finalizado") {
            throw new Error(`El plan ${plan.codigo_plan} debe estar Finalizado para revisión final`);
        }
        const [estadoCasoVerificacion, estadoPlanCerrado, estadoPlanEnEjecucion, estadoActEnProgreso] = await Promise.all([
            CaseRepository.findEstado("Verificación"),
            CaseRepository.findEstadoPlan("Cerrado"),
            CaseRepository.findEstadoPlan("En Ejecución"),
            CaseRepository.findEstadoActividad("En progreso"),
        ]);
        return prisma.$transaction(async (tx) => {
            const aprobado = decision === "aprobada";
            const actualizado = await tx.planes_accion.update({
                where: { id_plan },
                data: {
                    estado: aprobado ? estadoPlanCerrado.id_detalle : estadoPlanEnEjecucion.id_detalle,
                    updated_at: new Date(),
                },
            });
            if (!aprobado) {
                await tx.actividades_plan.updateMany({
                    where: { id_plan },
                    data: { estado: estadoActEnProgreso.id_detalle, porcentaje: 50 },
                });
            }
            let todosCerrados = false;
            if (aprobado) {
                const planesAbiertos = await tx.planes_accion.count({
                    where: { id_caso: plan.id_caso, estado: { not: estadoPlanCerrado.id_detalle } },
                });
                todosCerrados = planesAbiertos === 0;
                if (todosCerrados) {
                    await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estadoCasoVerificacion.id_detalle } });
                }
            }
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "seguimiento",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: aprobado
                    ? `Plan de acción cerrado por Seguridad Operativa — ${plan.codigo_plan}`
                    : `Plan de acción devuelto al área — ${plan.codigo_plan}`,
                detalle: nota
                    ? `${plan.codigo_plan}: ${nota}`
                    : aprobado
                        ? todosCerrados
                            ? `${plan.codigo_plan} cerrado. Todos los planes están cerrados y el caso pasa a Verificación.`
                            : `${plan.codigo_plan} cerrado. Otros planes del reporte siguen pendientes.`
                        : `${plan.codigo_plan} requiere correcciones antes del cierre.`,
            });
            return actualizado;
        });
    }
    /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo para un plan específico. */
    static async requestExtensionByPlan(id_plan, dto, actor) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: { id_plan: true, id_caso: true, codigo_plan: true },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        const estado = await CaseRepository.findEstado("Prórroga Solicitada");
        return prisma.$transaction(async (tx) => {
            const actualizado = await tx.planes_accion.update({
                where: { id_plan },
                data: {
                    prorroga_motivo: dto.justificacion,
                    prorroga_fecha: new Date(dto.nueva_fecha),
                    prorroga_estado: "pendiente",
                    prorroga_fecha_sol: new Date(),
                    updated_at: new Date(),
                },
            });
            await tx.casos_sop.update({ where: { id_caso: plan.id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "ampliacion",
                actor,
                actor_rol: "jefe",
                titulo: "Solicitud de ampliación de plazo",
                detalle: `${plan.codigo_plan}. Nueva fecha: ${dto.nueva_fecha}. Justificación: ${dto.justificacion}`,
            });
            return actualizado;
        });
    }
    /** SO aprueba o rechaza la prórroga de un plan sin tocar los demás. */
    static async reviewExtensionByPlan(id_plan, decision, nota) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: { id_plan: true, id_caso: true, codigo_plan: true, prorroga_fecha: true, prorroga_estado: true },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        if (plan.prorroga_estado !== "pendiente") {
            throw new Error(`El plan ${plan.codigo_plan} no tiene una prórroga pendiente`);
        }
        const [estadoEjecucion, estadoProrroga] = await Promise.all([
            CaseRepository.findEstado("Ejecución"),
            CaseRepository.findEstado("Prórroga Solicitada"),
        ]);
        return prisma.$transaction(async (tx) => {
            const actualizado = await tx.planes_accion.update({
                where: { id_plan },
                data: {
                    prorroga_estado: decision,
                    updated_at: new Date(),
                    ...(decision === "aprobada" && plan.prorroga_fecha ? { fecha_reprogramada: plan.prorroga_fecha } : {}),
                },
            });
            const pendientes = await tx.planes_accion.count({
                where: { id_caso: plan.id_caso, prorroga_estado: "pendiente" },
            });
            await tx.casos_sop.update({
                where: { id_caso: plan.id_caso },
                data: { estado_hallazgo: pendientes > 0 ? estadoProrroga.id_detalle : estadoEjecucion.id_detalle },
            });
            await CaseRepository.pushTimeline(tx, plan.id_caso, {
                kind: "ampliacion",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: decision === "aprobada"
                    ? `Ampliación de plazo aprobada — ${plan.codigo_plan}`
                    : `Ampliación de plazo rechazada — ${plan.codigo_plan}`,
                detalle: nota ? `${plan.codigo_plan}: ${nota}` : `${plan.codigo_plan}: solicitud ${decision}.`,
            });
            return actualizado;
        });
    }
    /** ETAPA 5 → 6 — el área termina las actividades y devuelve el caso a SO. */
    static async completeExecution(id_caso, actor) {
        const [estadoPlanFinalizado, estadoActCompletado] = await Promise.all([
            CaseRepository.ensureEstadoPlan("Finalizado"),
            CaseRepository.findEstadoActividad("Completado"),
        ]);
        return prisma.$transaction(async (tx) => {
            const planes = await tx.planes_accion.findMany({ where: { id_caso }, select: { id_plan: true } });
            const ids = planes.map((p) => p.id_plan);
            if (ids.length > 0) {
                await tx.planes_accion.updateMany({
                    where: { id_plan: { in: ids } },
                    data: { estado: estadoPlanFinalizado.id_detalle, updated_at: new Date() },
                });
                await tx.actividades_plan.updateMany({
                    where: { id_plan: { in: ids } },
                    data: { estado: estadoActCompletado.id_detalle, porcentaje: 100 },
                });
            }
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "seguimiento",
                actor,
                actor_rol: "jefe",
                titulo: "Planes finalizados por el área",
                detalle: "Los planes quedaron pendientes de revisión final individual por Seguridad Operativa.",
            });
            return tx.casos_sop.findUnique({ where: { id_caso } });
        });
    }
    /** ETAPA 5 — el área actualiza el estado/avance de una actividad del plan. */
    static async updateActivity(id_actividad, estadoNombre, comentario, actor) {
        const estado = await CaseRepository.findEstadoActividad(estadoNombre);
        const porcentaje = estadoNombre === "Completado" ? 100 : estadoNombre === "En progreso" ? 50 : 0;
        return prisma.$transaction(async (tx) => {
            const actividad = await tx.actividades_plan.update({
                where: { id_actividad },
                data: { estado: estado.id_detalle, porcentaje },
                include: {
                    planes_accion: {
                        select: {
                            id_plan: true,
                            id_caso: true,
                            codigo_plan: true,
                            catalogo_detalle: { select: { nombre: true } },
                        },
                    },
                },
            });
            if (comentario) {
                await tx.seguimientos.create({ data: { id_actividad, comentario, porcentaje } });
            }
            await CaseRepository.pushTimeline(tx, actividad.planes_accion.id_caso, {
                kind: "seguimiento",
                actor,
                actor_rol: "jefe",
                titulo: `Actividad actualizada — ${actividad.planes_accion.codigo_plan}`,
                detalle: `${estadoNombre}: ${comentario ?? actividad.descripcion}`,
            });
            return actividad;
        });
    }
    /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo. */
    static async requestExtension(id_caso, dto, actor) {
        const estado = await CaseRepository.findEstado("Prórroga Solicitada");
        return prisma.$transaction(async (tx) => {
            await tx.planes_accion.updateMany({
                where: { id_caso },
                data: {
                    prorroga_motivo: dto.justificacion,
                    prorroga_fecha: new Date(dto.nueva_fecha),
                    prorroga_estado: "pendiente",
                    prorroga_fecha_sol: new Date(),
                },
            });
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "ampliacion",
                actor,
                actor_rol: "jefe",
                titulo: "Solicitud de ampliación de plazo",
                detalle: `Nueva fecha: ${dto.nueva_fecha}. Justificación: ${dto.justificacion}`,
            });
            return caso;
        });
    }
    /** ETAPA 5 — SO aprueba o rechaza la prórroga; el caso vuelve a Ejecución. */
    static async reviewExtension(id_caso, decision, nota) {
        const estado = await CaseRepository.findEstado("Ejecución");
        return prisma.$transaction(async (tx) => {
            const planes = await tx.planes_accion.findMany({
                where: { id_caso },
                select: { id_plan: true, prorroga_fecha: true },
            });
            for (const p of planes) {
                await tx.planes_accion.update({
                    where: { id_plan: p.id_plan },
                    data: {
                        prorroga_estado: decision,
                        // Solo si se aprueba se corre la fecha del plan.
                        ...(decision === "aprobada" && p.prorroga_fecha ? { fecha_reprogramada: p.prorroga_fecha } : {}),
                    },
                });
            }
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "ampliacion",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: decision === "aprobada" ? "Ampliación de plazo aprobada" : "Ampliación de plazo rechazada",
                detalle: nota,
            });
            return caso;
        });
    }
    /** ETAPA 6 — SO no da conforme la verificación y devuelve el caso a Ejecución. */
    static async keepPending(id_caso, motivo) {
        const estado = await CaseRepository.findEstado("Ejecución");
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "seguimiento",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Caso mantenido pendiente",
                detalle: motivo ?? "Seguridad Operativa devolvió el caso a ejecución para seguimiento.",
            });
            return caso;
        });
    }
    /** ETAPA 7 — reabrir un caso cerrado; vuelve a Verificación. */
    static async reopenCase(id_caso, motivo) {
        const estado = await CaseRepository.findEstado("Verificación");
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "reapertura",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Caso reabierto",
                detalle: motivo ?? "El caso vuelve a verificación.",
            });
            return caso;
        });
    }
    /** Retroceso controlado entre etapas activas, sin borrar datos del expediente. */
    static async rollbackStage(id_caso, estadoActualNombre, destinoNombre, motivo) {
        const permitidos = {
            Investigación: ["Evaluación"],
            "Plan de Acción": ["Investigación"],
        };
        if (!permitidos[estadoActualNombre]?.includes(destinoNombre)) {
            throw new Error(`No se puede retroceder de "${estadoActualNombre}" a "${destinoNombre}"`);
        }
        const estadoDestino = await CaseRepository.findEstado(destinoNombre);
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({
                where: { id_caso },
                data: { estado_hallazgo: estadoDestino.id_detalle },
            });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "retroceso",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: `Retroceso de etapa — vuelve a ${destinoNombre}`,
                detalle: `Desde ${estadoActualNombre}. Motivo: ${motivo}`,
            });
            return caso;
        });
    }
    static async closeCase(id_caso, nota) {
        const estado = await CaseRepository.findEstado("Cerrado");
        return prisma.$transaction(async (tx) => {
            const caso = await tx.casos_sop.update({ where: { id_caso }, data: { estado_hallazgo: estado.id_detalle } });
            await CaseRepository.pushTimeline(tx, id_caso, {
                kind: "cierre",
                actor: ACTOR_SO,
                actor_rol: "seguridad",
                titulo: "Caso cerrado",
                detalle: nota ?? "Cierre del caso. Historial completo generado y archivado.",
            });
            return caso;
        });
    }
    static async addEvidence(id_caso, archivos) {
        if (archivos.length > 0) {
            await prisma.anexos_caso.createMany({
                data: archivos.map((f) => ({
                    id_caso,
                    nombre_archivo: f.originalname,
                    ruta_archivo: `/uploads/casos/${f.filename}`,
                    tipo_archivo: f.mimetype,
                    peso: Math.round((f.size / 1024) * 100) / 100,
                })),
            });
        }
        return prisma.anexos_caso.findMany({ where: { id_caso }, orderBy: { fecha_subida: "desc" } });
    }
    static async addEvidenceByPlan(id_plan, archivos, actor) {
        const plan = await prisma.planes_accion.findUnique({
            where: { id_plan },
            select: { id_caso: true, codigo_plan: true },
        });
        if (!plan)
            throw new Error(`El plan ${id_plan} no existe`);
        return prisma.$transaction(async (tx) => {
            if (archivos.length > 0) {
                await tx.anexos_caso.createMany({
                    data: archivos.map((f) => ({
                        id_caso: plan.id_caso,
                        nombre_archivo: f.originalname,
                        ruta_archivo: `/uploads/casos/${f.filename}`,
                        tipo_archivo: f.mimetype,
                        peso: Math.round((f.size / 1024) * 100) / 100,
                    })),
                });
                await CaseRepository.pushTimeline(tx, plan.id_caso, {
                    kind: "seguimiento",
                    actor,
                    actor_rol: "jefe",
                    titulo: `Evidencia adjuntada — ${plan.codigo_plan}`,
                    detalle: archivos.map((f) => f.originalname).join(", "),
                });
            }
            return tx.anexos_caso.findMany({ where: { id_caso: plan.id_caso }, orderBy: { fecha_subida: "desc" } });
        });
    }
}
//# sourceMappingURL=case.repository.js.map