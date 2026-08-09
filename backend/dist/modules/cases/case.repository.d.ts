import type { CaseListFilters, CreatePlanDto, EvaluateCaseDto, RejectCaseDto, RequestInfoDto, RespondInfoDto, SaveInvestigationDto, TimelineEntry, UploadedFile } from "./case.types.js";
/** Cliente mínimo que necesita pushTimeline — sirve para prisma y para un tx. */
type TimelineClient = {
    timeline_caso: {
        create: (args: {
            data: {
                id_caso: number;
                kind: string;
                actor: string;
                actor_rol: string;
                titulo: string;
                detalle: string | null;
            };
        }) => Promise<unknown>;
    };
};
export declare class CaseRepository {
    /** Registra un evento en la bitácora del expediente. */
    static pushTimeline(client: TimelineClient, id_caso: number, e: TimelineEntry): Promise<void>;
    static addComment(id_caso: number, texto: string): Promise<{
        id_caso: number;
        titulo: string;
        fecha: Date | null;
        id_evento: number;
        kind: string;
        actor: string;
        actor_rol: string;
        detalle: string | null;
    }[]>;
    /** Comentario operativo de SO asociado a un plan específico. */
    static addPlanComment(id_plan: number, texto: string): Promise<{
        id_caso: number;
        titulo: string;
        fecha: Date | null;
        id_evento: number;
        kind: string;
        actor: string;
        actor_rol: string;
        detalle: string | null;
    }[]>;
    static findAll(filtros: CaseListFilters): Promise<({
        anexos_caso: {
            id_anexo: number;
        }[];
        evento_caso: ({
            eventos_operativos: {
                catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: {
                    nombre: string;
                };
                catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: {
                    nombre: string;
                } | null;
            } & {
                estado: number | null;
                descripcion: string | null;
                created_at: Date | null;
                updated_at: Date | null;
                codigo_evento: string | null;
                fecha: Date;
                hora: Date | null;
                anio: number | null;
                mes: number | null;
                semana: number | null;
                dia: string | null;
                numero_carrera: string | null;
                informacion_adicional: string | null;
                camara_monitoreada: string | null;
                demora: import("@prisma/client/runtime/library").Decimal | null;
                id_evento: number;
                rango_horario: number | null;
                tipo_incidente: number;
                ubicacion: number | null;
                tipo_via: number | null;
                direccion_via: number | null;
                lugar_incidente: number | null;
                modelo_mr: number | null;
                numero_mr: number | null;
                personal_involucrado: number | null;
                tipo_causa: number | null;
                posible_causa: number | null;
                usuario_registra: number | null;
            };
        } & {
            id: number;
            id_caso: number;
            id_evento: number;
            fecha_conversion: Date | null;
            usuario: number | null;
        })[];
        planes_accion: ({
            actividades_plan: ({
                seguimientos: ({
                    usuarios: {
                        id_usuario: number;
                        nombre: string;
                        cargo: string | null;
                    } | null;
                } & {
                    fecha: Date | null;
                    usuario: number | null;
                    comentario: string | null;
                    id_actividad: number;
                    porcentaje: import("@prisma/client/runtime/library").Decimal | null;
                    id_seguimiento: number;
                })[];
                usuarios: {
                    id_usuario: number;
                    nombre: string;
                    cargo: string | null;
                } | null;
                catalogo_detalle: {
                    nombre: string;
                } | null;
            } & {
                estado: number | null;
                descripcion: string;
                created_at: Date | null;
                id_plan: number;
                responsable: number | null;
                id_actividad: number;
                fecha_inicio: Date | null;
                fecha_fin: Date | null;
                porcentaje: import("@prisma/client/runtime/library").Decimal | null;
            })[];
            areas: {
                id_area: number;
                nombre_area: string;
            };
            usuarios: {
                id_usuario: number;
                nombre: string;
                cargo: string | null;
            };
            catalogo_detalle: {
                nombre: string;
            };
        } & {
            estado: number;
            id_area: number;
            descripcion: string;
            created_at: Date | null;
            id_caso: number;
            dias_abierto: number | null;
            fecha_plan: Date;
            fecha_reprogramada: Date | null;
            observaciones: string | null;
            updated_at: Date | null;
            id_plan: number;
            codigo_plan: string;
            responsable: number;
            prorroga_motivo: string | null;
            prorroga_fecha: Date | null;
            prorroga_estado: string | null;
            prorroga_fecha_sol: Date | null;
        })[];
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
            color: string | null;
        };
        catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
            orden: number | null;
            id_detalle: number;
        } | null;
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: {
            nombre: string;
        };
    } & {
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    })[]>;
    static findByCodigo(codigo_sop: string): Promise<({
        anexos_caso: {
            id_caso: number;
            id_anexo: number;
            nombre_archivo: string | null;
            ruta_archivo: string | null;
            tipo_archivo: string | null;
            peso: import("@prisma/client/runtime/library").Decimal | null;
            fecha_subida: Date | null;
            usuario_subida: number | null;
        }[];
        evento_caso: ({
            eventos_operativos: {
                catalogo_detalle_eventos_operativos_direccion_viaTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_modelo_mrTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_numero_mrTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_personal_involucradoTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_posible_causaTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_rango_horarioTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: {
                    nombre: string;
                };
                catalogo_detalle_eventos_operativos_tipo_causaTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_tipo_viaTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: {
                    nombre: string;
                } | null;
            } & {
                estado: number | null;
                descripcion: string | null;
                created_at: Date | null;
                updated_at: Date | null;
                codigo_evento: string | null;
                fecha: Date;
                hora: Date | null;
                anio: number | null;
                mes: number | null;
                semana: number | null;
                dia: string | null;
                numero_carrera: string | null;
                informacion_adicional: string | null;
                camara_monitoreada: string | null;
                demora: import("@prisma/client/runtime/library").Decimal | null;
                id_evento: number;
                rango_horario: number | null;
                tipo_incidente: number;
                ubicacion: number | null;
                tipo_via: number | null;
                direccion_via: number | null;
                lugar_incidente: number | null;
                modelo_mr: number | null;
                numero_mr: number | null;
                personal_involucrado: number | null;
                tipo_causa: number | null;
                posible_causa: number | null;
                usuario_registra: number | null;
            };
        } & {
            id: number;
            id_caso: number;
            id_evento: number;
            fecha_conversion: Date | null;
            usuario: number | null;
        })[];
        investigacion_caso: ({
            usuarios: {
                id_usuario: number;
                nombre: string;
                cargo: string | null;
            } | null;
        } & {
            created_at: Date | null;
            id_caso: number;
            observaciones: string | null;
            updated_at: Date | null;
            id_investigacion: number;
            hallazgos: string;
            causa_raiz: string;
            conclusiones: string;
            investigador: number | null;
        }) | null;
        planes_accion: ({
            actividades_plan: ({
                seguimientos: ({
                    usuarios: {
                        id_usuario: number;
                        nombre: string;
                        cargo: string | null;
                    } | null;
                } & {
                    fecha: Date | null;
                    usuario: number | null;
                    comentario: string | null;
                    id_actividad: number;
                    porcentaje: import("@prisma/client/runtime/library").Decimal | null;
                    id_seguimiento: number;
                })[];
                usuarios: {
                    id_usuario: number;
                    nombre: string;
                    cargo: string | null;
                } | null;
                catalogo_detalle: {
                    nombre: string;
                } | null;
            } & {
                estado: number | null;
                descripcion: string;
                created_at: Date | null;
                id_plan: number;
                responsable: number | null;
                id_actividad: number;
                fecha_inicio: Date | null;
                fecha_fin: Date | null;
                porcentaje: import("@prisma/client/runtime/library").Decimal | null;
            })[];
            areas: {
                id_area: number;
                nombre_area: string;
            };
            usuarios: {
                id_usuario: number;
                nombre: string;
                cargo: string | null;
            };
            catalogo_detalle: {
                nombre: string;
            };
        } & {
            estado: number;
            id_area: number;
            descripcion: string;
            created_at: Date | null;
            id_caso: number;
            dias_abierto: number | null;
            fecha_plan: Date;
            fecha_reprogramada: Date | null;
            observaciones: string | null;
            updated_at: Date | null;
            id_plan: number;
            codigo_plan: string;
            responsable: number;
            prorroga_motivo: string | null;
            prorroga_fecha: Date | null;
            prorroga_estado: string | null;
            prorroga_fecha_sol: Date | null;
        })[];
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
            color: string | null;
        };
        catalogo_detalle_casos_sop_estado_planTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: {
            nombre: string;
        };
        usuarios_casos_sop_responsable_hallazgoTousuarios: {
            id_usuario: number;
            nombre: string;
            cargo: string | null;
        } | null;
        usuarios_casos_sop_responsable_planTousuarios: {
            id_usuario: number;
            nombre: string;
            cargo: string | null;
        } | null;
        catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
            orden: number | null;
            id_detalle: number;
        } | null;
        catalogo_detalle_casos_sop_subtipo_sopTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: {
            nombre: string;
        };
        solicitudes_informacion: {
            id_caso: number;
            id_solicitud: number;
            mensaje: string;
            respuesta: string | null;
            respondida: boolean;
            estado_previo: string | null;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
        timeline_caso: {
            id_caso: number;
            titulo: string;
            fecha: Date | null;
            id_evento: number;
            kind: string;
            actor: string;
            actor_rol: string;
            detalle: string | null;
        }[];
    } & {
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }) | null>;
    /**
     * Planes de acción visibles para un Jefe de Área. Si no se pasa área,
     * devuelve todos (útil mientras no hay login que fije el área del usuario).
     */
    static findPlansByArea(id_area?: number): Promise<({
        actividades_plan: ({
            seguimientos: ({
                usuarios: {
                    id_usuario: number;
                    nombre: string;
                    cargo: string | null;
                } | null;
            } & {
                fecha: Date | null;
                usuario: number | null;
                comentario: string | null;
                id_actividad: number;
                porcentaje: import("@prisma/client/runtime/library").Decimal | null;
                id_seguimiento: number;
            })[];
            usuarios: {
                id_usuario: number;
                nombre: string;
                cargo: string | null;
            } | null;
            catalogo_detalle: {
                nombre: string;
            } | null;
        } & {
            estado: number | null;
            descripcion: string;
            created_at: Date | null;
            id_plan: number;
            responsable: number | null;
            id_actividad: number;
            fecha_inicio: Date | null;
            fecha_fin: Date | null;
            porcentaje: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        areas: {
            id_area: number;
            nombre_area: string;
        };
        usuarios: {
            id_usuario: number;
            nombre: string;
            cargo: string | null;
        };
        casos_sop: {
            anexos_caso: {
                id_anexo: number;
                nombre_archivo: string | null;
                ruta_archivo: string | null;
                tipo_archivo: string | null;
                peso: import("@prisma/client/runtime/library").Decimal | null;
                fecha_subida: Date | null;
            }[];
            investigacion_caso: {
                hallazgos: string;
                causa_raiz: string;
                conclusiones: string;
            } | null;
            descripcion: string;
            id_caso: number;
            codigo_sop: string;
            titulo: string | null;
            fecha_hallazgo: Date;
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
            };
            catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: {
                nombre: string;
                codigo: string | null;
            } | null;
            timeline_caso: {
                titulo: string;
                fecha: Date | null;
                id_evento: number;
                kind: string;
                actor: string;
                actor_rol: string;
                detalle: string | null;
            }[];
        };
        catalogo_detalle: {
            nombre: string;
        };
    } & {
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    })[]>;
    static findBasicByCodigo(codigo_sop: string): Promise<{
        id_caso: number;
        codigo_sop: string;
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
        };
    } | null>;
    static findEstado(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static findEstadoPlan(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static ensureEstadoPlan(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static findEstadoActividad(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static approve(id_caso: number): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static addObservation(id_caso: number, texto: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static evaluate(id_caso: number, dto: EvaluateCaseDto): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static reject(id_caso: number, dto: RejectCaseDto): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static requestInfo(id_caso: number, estadoActualNombre: string, dto: RequestInfoDto): Promise<{
        id_caso: number;
        id_solicitud: number;
        mensaje: string;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static respondInfo(id_caso: number, id_solicitud: number, dto: RespondInfoDto): Promise<{
        id_caso: number;
        id_solicitud: number;
        mensaje: string;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static saveInvestigation(id_caso: number, dto: SaveInvestigationDto): Promise<{
        created_at: Date | null;
        id_caso: number;
        observaciones: string | null;
        updated_at: Date | null;
        id_investigacion: number;
        hallazgos: string;
        causa_raiz: string;
        conclusiones: string;
        investigador: number | null;
    }>;
    static createPlan(id_caso: number, codigo_sop: string, dto: CreatePlanDto): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    static createPlans(id_caso: number, codigo_sop: string, dtos: CreatePlanDto[]): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }[]>;
    /**
     * Modifica un plan ya enviado conservando las actividades existentes.
     * Antes se borraban y recreaban en bloque; eso hacía que al presionar
     * "Modificar" se perdiera lo ya cargado, especialmente estados, avances y
     * seguimientos registrados sobre la actividad.
     */
    static updatePlan(id_plan: number, dto: CreatePlanDto): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    /** ETAPA 5 — el Jefe del Área acepta el plan y arranca la Ejecución. */
    static acceptPlan(id_caso: number, actor: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    /** ETAPA 5 — el Jefe del Área acepta un plan específico del reporte. */
    static acceptPlanById(id_plan: number, actor: string): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    /** El área termina un plan específico; SO lo revisa después de forma independiente. */
    static completeExecutionByPlan(id_plan: number, actor: string, descripcionCierre: string): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    } | null>;
    /** SO revisa un plan finalizado: lo cierra o lo devuelve al área sin afectar a otros planes. */
    static reviewFinalPlanById(id_plan: number, decision: "aprobada" | "rechazada", nota: string | null): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo para un plan específico. */
    static requestExtensionByPlan(id_plan: number, dto: {
        nueva_fecha: string;
        justificacion: string;
    }, actor: string): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    /** SO aprueba o rechaza la prórroga de un plan sin tocar los demás. */
    static reviewExtensionByPlan(id_plan: number, decision: "aprobada" | "rechazada", nota: string | null): Promise<{
        estado: number;
        id_area: number;
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        dias_abierto: number | null;
        fecha_plan: Date;
        fecha_reprogramada: Date | null;
        observaciones: string | null;
        updated_at: Date | null;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
        prorroga_motivo: string | null;
        prorroga_fecha: Date | null;
        prorroga_estado: string | null;
        prorroga_fecha_sol: Date | null;
    }>;
    /** ETAPA 5 → 6 — el área termina las actividades y devuelve el caso a SO. */
    static completeExecution(id_caso: number, actor: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    } | null>;
    /** ETAPA 5 — el área actualiza el estado/avance de una actividad del plan. */
    static updateActivity(id_actividad: number, estadoNombre: string, comentario: string | null, actor: string): Promise<{
        planes_accion: {
            catalogo_detalle: {
                nombre: string;
            };
            id_caso: number;
            id_plan: number;
            codigo_plan: string;
        };
    } & {
        estado: number | null;
        descripcion: string;
        created_at: Date | null;
        id_plan: number;
        responsable: number | null;
        id_actividad: number;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        porcentaje: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo. */
    static requestExtension(id_caso: number, dto: {
        nueva_fecha: string;
        justificacion: string;
    }, actor: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    /** ETAPA 5 — SO aprueba o rechaza la prórroga; el caso vuelve a Ejecución. */
    static reviewExtension(id_caso: number, decision: "aprobada" | "rechazada", nota: string | null): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    /** ETAPA 6 — SO no da conforme la verificación y devuelve el caso a Ejecución. */
    static keepPending(id_caso: number, motivo?: string | null): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    /** ETAPA 7 — reabrir un caso cerrado; vuelve a Verificación. */
    static reopenCase(id_caso: number, motivo?: string | null): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    /** Retroceso controlado entre etapas activas, sin borrar datos del expediente. */
    static rollbackStage(id_caso: number, estadoActualNombre: string, destinoNombre: "Evaluación" | "Investigación", motivo: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static closeCase(id_caso: number, nota?: string | null): Promise<{
        descripcion: string;
        created_at: Date | null;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
        tipo: number;
        responsable_hallazgo: number | null;
        tipo_sop: number;
        subtipo_sop: number | null;
        peligro: string | null;
        consecuencia: string | null;
        clasificacion: string | null;
        analisis_riesgo: number | null;
        acr: string | null;
        area_responsable: number | null;
        responsable_plan: number | null;
        estado_plan: number | null;
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto_plan: number | null;
        observaciones: string | null;
        created_by: number | null;
        updated_at: Date | null;
    }>;
    static addEvidence(id_caso: number, archivos: UploadedFile[]): Promise<{
        id_caso: number;
        id_anexo: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: import("@prisma/client/runtime/library").Decimal | null;
        fecha_subida: Date | null;
        usuario_subida: number | null;
    }[]>;
    static addEvidenceByPlan(id_plan: number, archivos: UploadedFile[], actor: string): Promise<{
        id_caso: number;
        id_anexo: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: import("@prisma/client/runtime/library").Decimal | null;
        fecha_subida: Date | null;
        usuario_subida: number | null;
    }[]>;
}
export {};
//# sourceMappingURL=case.repository.d.ts.map