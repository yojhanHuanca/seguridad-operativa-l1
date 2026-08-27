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
        fecha: Date | null;
        id_caso: number;
        titulo: string;
        id_evento: number;
        detalle: string | null;
        kind: string;
        actor: string;
        actor_rol: string;
    }[]>;
    /** Comentario operativo de SO asociado a un plan específico. */
    /**
     * Comentario sobre un plan. Lo usan los dos lados: SO desde el expediente y
     * el Jefe del Área desde su panel, por eso el rol es parámetro y no fijo.
     *
     * Cuando lo escribe el jefe también queda en `seguimientos`, que es la tabla
     * de comentarios de la actividad, además del timeline que ve SO.
     */
    static addPlanComment(id_plan: number, texto: string, rol?: "seguridad" | "jefe", actor?: string): Promise<{
        fecha: Date | null;
        id_caso: number;
        titulo: string;
        id_evento: number;
        detalle: string | null;
        kind: string;
        actor: string;
        actor_rol: string;
    }[]>;
    /**
     * Quita una evidencia del plan antes de que el cierre se envíe a SO.
     *
     * Solo se permite mientras el plan sigue abierto: una vez finalizado, lo
     * enviado queda bloqueado y no se puede eliminar. Se borra el anexo y se
     * limpia su referencia del payload del timeline para que no quede apuntando
     * a un archivo que ya no existe.
     */
    static removePlanEvidence(id_plan: number, id_anexo: number, actor: string): Promise<{
        id_anexo: number;
    }>;
    /**
     * Casos con al menos un plan de acción activo (no cerrado/rechazado/
     * finalizado) cuyo plazo vigente ya pasó. No es un `estado_hallazgo`
     * literal como el resto de filtros — hay que traer los planes y calcular
     * el plazo en JS (misma regla que `planDeadline`/`planVencido` del
     * frontend), así que se resuelve en dos pasos en vez de un solo `where`.
     */
    private static vencidoCaseIds;
    static findAll(filtros: CaseListFilters): Promise<{
        data: ({
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
                        id_detalle: number;
                    };
                    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: {
                        nombre: string;
                    } | null;
                } & {
                    estado: number | null;
                    created_at: Date | null;
                    descripcion: string | null;
                    fecha: Date;
                    updated_at: Date | null;
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
                    codigo_evento: string | null;
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
                usuario: number | null;
                id_caso: number;
                id: number;
                id_evento: number;
                fecha_conversion: Date | null;
            })[];
            planes_accion: ({
                actividades_plan: ({
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
                    fecha_inicio: Date | null;
                    fecha_fin: Date | null;
                    created_at: Date | null;
                    descripcion: string;
                    id_plan: number;
                    responsable: number | null;
                    id_actividad: number;
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
                created_at: Date | null;
                descripcion: string;
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
            catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: {
                nombre: string;
            };
            usuarios_casos_sop_responsable_hallazgoTousuarios: {
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
        } & {
            created_at: Date | null;
            descripcion: string;
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
            descripcion_evento: string | null;
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
        })[];
        total: undefined;
    } | {
        data: ({
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
                        id_detalle: number;
                    };
                    catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle: {
                        nombre: string;
                    } | null;
                } & {
                    estado: number | null;
                    created_at: Date | null;
                    descripcion: string | null;
                    fecha: Date;
                    updated_at: Date | null;
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
                    codigo_evento: string | null;
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
                usuario: number | null;
                id_caso: number;
                id: number;
                id_evento: number;
                fecha_conversion: Date | null;
            })[];
            planes_accion: ({
                actividades_plan: ({
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
                    fecha_inicio: Date | null;
                    fecha_fin: Date | null;
                    created_at: Date | null;
                    descripcion: string;
                    id_plan: number;
                    responsable: number | null;
                    id_actividad: number;
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
                created_at: Date | null;
                descripcion: string;
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
            catalogo_detalle_casos_sop_procedenciaTocatalogo_detalle: {
                nombre: string;
            };
            usuarios_casos_sop_responsable_hallazgoTousuarios: {
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
        } & {
            created_at: Date | null;
            descripcion: string;
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
            descripcion_evento: string | null;
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
        })[];
        total: number;
    }>;
    /**
     * Conteos por pestaña de la bandeja de Casos SOP — solo `COUNT`, nunca trae
     * filas. Los grupos de `estado_hallazgo` por pestaña deben coincidir con
     * `CASE_FILTERS`/`STAGE_BY_ESTADO` del frontend (`features/cases/lib/
     * filters.ts` y `features/cases/domain.ts`): si se agrega o renombra un
     * estado allá, hay que actualizar esto también.
     */
    static counts(area?: number): Promise<Record<string, number>>;
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
                    id_detalle: number;
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
                created_at: Date | null;
                descripcion: string | null;
                fecha: Date;
                updated_at: Date | null;
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
                codigo_evento: string | null;
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
            usuario: number | null;
            id_caso: number;
            id: number;
            id_evento: number;
            fecha_conversion: Date | null;
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
                    usuario: number | null;
                    fecha: Date | null;
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
                fecha_inicio: Date | null;
                fecha_fin: Date | null;
                created_at: Date | null;
                descripcion: string;
                id_plan: number;
                responsable: number | null;
                id_actividad: number;
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
            created_at: Date | null;
            descripcion: string;
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
        timeline_caso: {
            fecha: Date | null;
            id_caso: number;
            titulo: string;
            id_evento: number;
            detalle: string | null;
            kind: string;
            actor: string;
            actor_rol: string;
        }[];
        solicitudes_informacion: {
            id_caso: number;
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            estado_previo: string | null;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
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
    } & {
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
     * `codigo_sop` opcional acota a los planes de un solo caso — la usa
     * `PlanDetail.tsx` en vez de traer toda el área y filtrar en el navegador.
     */
    static findPlansByArea(opts?: {
        id_area?: number;
        codigo_sop?: string;
    }): Promise<({
        actividades_plan: ({
            seguimientos: ({
                usuarios: {
                    id_usuario: number;
                    nombre: string;
                    cargo: string | null;
                } | null;
            } & {
                usuario: number | null;
                fecha: Date | null;
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
            fecha_inicio: Date | null;
            fecha_fin: Date | null;
            created_at: Date | null;
            descripcion: string;
            id_plan: number;
            responsable: number | null;
            id_actividad: number;
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
                observaciones: string | null;
                hallazgos: string;
                causa_raiz: string;
                conclusiones: string;
            } | null;
            timeline_caso: {
                fecha: Date | null;
                titulo: string;
                id_evento: number;
                detalle: string | null;
                kind: string;
                actor: string;
                actor_rol: string;
            }[];
            descripcion: string;
            id_caso: number;
            codigo_sop: string;
            titulo: string | null;
            fecha_hallazgo: Date;
            fecha_evento: Date | null;
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
            };
            catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle: {
                nombre: string;
                codigo: string | null;
            } | null;
            catalogo_detalle_casos_sop_tipoTocatalogo_detalle: {
                nombre: string;
            };
        };
        catalogo_detalle: {
            nombre: string;
        };
    } & {
        estado: number;
        id_area: number;
        created_at: Date | null;
        descripcion: string;
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
    /**
     * Contexto mínimo de un plan para decidir si la acción procede: en qué etapa
     * está su caso y de quién es el plan. Va en una sola consulta porque las dos
     * comprobaciones (etapa y propiedad) se hacen siempre juntas.
     */
    static findPlanContexto(id_plan: number): Promise<{
        id_area: number;
        casos_sop: {
            codigo_sop: string;
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
            };
        };
        id_caso: number;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
    } | null>;
    /** Igual que findPlanContexto, pero entrando por una actividad del plan. */
    static findActividadContexto(id_actividad: number): Promise<{
        id_area: number;
        casos_sop: {
            codigo_sop: string;
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
            };
        };
        id_caso: number;
        id_plan: number;
        codigo_plan: string;
        responsable: number;
    } | null>;
    static findEstado(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static findEstadoPlan(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static ensureEstadoPlan(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static findEstadoActividad(nombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }>;
    static approve(id_caso: number): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    /**
     * Corrige el tipo de reporte (Accidente / Incidente / Condición Insegura /
     * Hallazgo / Acto Inseguro / Otro) que eligió el reportante al crear el
     * caso. Ese valor vive en `eventos_operativos.tipo_incidente` —no en
     * `casos_sop.tipo`, que es un campo interno de SO (No Conformidad /
     * Observación) sin relación con lo que reporta el trabajador—, así que
     * la corrección se aplica ahí, sobre el evento operativo vinculado al caso.
     */
    static updateTipo(id_caso: number, id_tipo: number, actor?: string): Promise<{
        estado: number | null;
        created_at: Date | null;
        descripcion: string | null;
        fecha: Date;
        updated_at: Date | null;
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
        codigo_evento: string | null;
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
    }>;
    static evaluate(id_caso: number, dto: EvaluateCaseDto): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        mensaje: string;
        id_solicitud: number;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static respondInfo(id_caso: number, id_solicitud: number, dto: RespondInfoDto): Promise<{
        id_caso: number;
        mensaje: string;
        id_solicitud: number;
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
    /**
     * Avisa por correo al Jefe de Área de cada plan recién creado, con el
     * detalle completo (no solo un enlace). Se llama después de que la
     * transacción que crea los planes ya confirmó, nunca desde adentro: es una
     * llamada de red a Resend, y sostenerla dentro de una transacción de base
     * de datos mantendría filas bloqueadas mientras tanto sin necesidad.
     *
     * No se espera (`void`, sin await del lado del que llama) y cada plan se
     * envía por separado con `allSettled`: un correo que falla no debe demorar
     * la respuesta al usuario ni impedir que salgan los demás. El plan ya quedó
     * creado y visible en la plataforma pase lo que pase acá — el correo es un
     * aviso adicional, no un requisito, según lo acordado con el cliente.
     */
    private static avisarPlanesAsignados;
    static createPlan(id_caso: number, codigo_sop: string, dto: CreatePlanDto): Promise<{
        estado: number;
        id_area: number;
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    /**
     * ETAPA 4 → 5 — SO adelanta el caso a Ejecución sin esperar a que todas las
     * áreas acepten su plan.
     *
     * `acceptPlanById` solo mueve el caso cuando no queda ningún plan por
     * aceptar, y eso dejaba el expediente en "Plan de Acción" mientras un área
     * ya estaba ejecutando: el estado del caso no reflejaba la realidad. Esta
     * transición la dispara SO a mano cuando decide que con lo aceptado alcanza
     * para arrancar.
     *
     * Los planes que siguen sin aceptar NO se tocan: se quedan en "Enviado" y su
     * jefe los puede aceptar después, ya con el caso en Ejecución.
     */
    static startExecution(id_caso: number): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    static acceptPlanById(id_plan: number, actor: string): Promise<{
        estado: number;
        id_area: number;
        created_at: Date | null;
        descripcion: string;
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
    static completeExecutionByPlan(id_plan: number, actor: string, descripcionCierre: string, comentario?: string | null): Promise<{
        estado: number;
        id_area: number;
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
    /**
     * SO aprueba o rechaza la prórroga de un plan sin tocar los demás.
     *
     * Al aprobar, SO puede correr el plan a `fecha_aprobada` en vez de la fecha
     * que pidió el área: la solicitud del Jefe es una propuesta, no un plazo
     * que se acepte tal cual. Sin `fecha_aprobada` vale la fecha propuesta.
     */
    static reviewExtensionByPlan(id_plan: number, decision: "aprobada" | "rechazada", nota: string | null, fecha_aprobada?: string | null): Promise<{
        estado: number;
        id_area: number;
        created_at: Date | null;
        descripcion: string;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    /** SO confirma que ya no queda ejecución abierta y mueve el expediente a Verificación. */
    static sendToVerification(id_caso: number): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        created_at: Date | null;
        descripcion: string;
        id_plan: number;
        responsable: number | null;
        id_actividad: number;
        porcentaje: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    /** ETAPA 5 — el Jefe del Área solicita ampliación de plazo. */
    static requestExtension(id_caso: number, dto: {
        nueva_fecha: string;
        justificacion: string;
    }, actor: string): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    /** ETAPA 6 — SO deja constancia y conserva el expediente en Verificación. */
    static keepPending(id_caso: number, motivo?: string | null): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    /** ETAPA 7 — reabrir un caso cerrado hacia la etapa que SO necesita corregir. */
    static reopenCase(id_caso: number, motivo?: string | null, destino?: "Recepción" | "Evaluación" | "Investigación" | "Plan de Acción" | "Ejecución" | "Verificación"): Promise<{
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
        created_at: Date | null;
        descripcion: string;
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
        descripcion_evento: string | null;
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
    static addEvidence(id_caso: number, archivos: UploadedFile[], actor?: string): Promise<{
        id_caso: number;
        id_anexo: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: import("@prisma/client/runtime/library").Decimal | null;
        fecha_subida: Date | null;
        usuario_subida: number | null;
    }[]>;
    /**
     * Actualizaciones adicionales de un plan ya finalizado por el área.
     *
     * La actualización "original" es la descripción de cierre que el jefe manda
     * con `completeExecutionByPlan`. Cuando después necesita agregar información
     * no se edita aquella —queda bloqueada— sino que se apila una nueva, con su
     * propia descripción y sus propias evidencias, siempre sobre el MISMO plan.
     *
     * No hay tabla nueva: el texto va a `seguimientos` (que ya es el registro de
     * avance por actividad) y las evidencias a `anexos_caso`, enlazadas con el
     * mismo payload `__PLAN_EVIDENCE__` del timeline que usa `addEvidenceByPlan`,
     * más el `seguimientoId` para saber a qué actualización pertenece cada una.
     */
    static readonly MAX_ACTUALIZACIONES_ADICIONALES = 4;
    /** Cuenta las actualizaciones adicionales ya registradas para un plan. */
    static contarActualizaciones(id_plan: number, id_caso: number): Promise<number>;
    static addPlanUpdate(id_plan: number, descripcion: string, archivos: UploadedFile[], actor: string): Promise<{
        id_seguimiento: number;
        numero: number;
        restantes: number;
        anexos: {
            id_anexo: number;
            nombre_archivo: string | null;
            ruta_archivo: string | null;
        }[];
    }>;
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