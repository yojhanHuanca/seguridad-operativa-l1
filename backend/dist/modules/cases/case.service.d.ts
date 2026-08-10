import type { UploadedFile } from "./case.types.js";
export declare class CaseService {
    static list(query: {
        estado?: string;
        area?: string;
        search?: string;
        sort?: string;
    }): Promise<({
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
                fecha: Date;
                updated_at: Date | null;
                codigo_evento: string | null;
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
            usuario: number | null;
            id_caso: number;
            id_evento: number;
            fecha_conversion: Date | null;
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
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static listPlans(query: {
        area?: string;
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
            titulo: string | null;
            id_caso: number;
            codigo_sop: string;
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
    static getByCodigo(codigo: string): Promise<{
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
                fecha: Date;
                updated_at: Date | null;
                codigo_evento: string | null;
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
            usuario: number | null;
            id_caso: number;
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
            mensaje: string;
            id_caso: number;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            estado_previo: string | null;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
        timeline_caso: {
            titulo: string;
            fecha: Date | null;
            id_caso: number;
            id_evento: number;
            kind: string;
            actor: string;
            actor_rol: string;
            detalle: string | null;
        }[];
    } & {
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static approve(codigo: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static addObservation(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static evaluate(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static reject(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static requestInfo(codigo: string, rawBody: unknown): Promise<{
        mensaje: string;
        id_caso: number;
        id_solicitud: number;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static respondInfo(codigo: string, idSolicitud: string, rawBody: unknown): Promise<{
        mensaje: string;
        id_caso: number;
        id_solicitud: number;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static saveInvestigation(codigo: string, rawBody: unknown): Promise<{
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
    static createPlan(codigo: string, rawBody: unknown): Promise<{
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
    static createPlans(codigo: string, rawBody: unknown): Promise<{
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
    static updatePlan(idPlan: string, rawBody: unknown): Promise<{
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
    static closeCase(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static acceptPlan(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static acceptPlanById(idPlan: string, rawBody: unknown): Promise<{
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
    static completeExecutionByPlan(idPlan: string, rawBody: unknown): Promise<{
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
    static reviewFinalPlanById(idPlan: string, rawBody: unknown): Promise<{
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
    static requestExtensionByPlan(idPlan: string, rawBody: unknown): Promise<{
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
    static reviewExtensionByPlan(idPlan: string, rawBody: unknown): Promise<{
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
    static completeExecution(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static sendToVerification(codigo: string): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static keepPending(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static reopenCase(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static rollbackStage(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static updateActivity(idActividad: string, rawBody: unknown): Promise<{
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
    static requestExtension(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static reviewExtension(codigo: string, rawBody: unknown): Promise<{
        descripcion: string;
        created_at: Date | null;
        titulo: string | null;
        tipo: number;
        id_caso: number;
        codigo_sop: string;
        nombre_reportante: string | null;
        correo_reportante: string | null;
        telefono_reportante: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
        dias_abierto: number | null;
        procedencia: number;
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
    static addComment(codigo: string, rawBody: unknown): Promise<{
        titulo: string;
        fecha: Date | null;
        id_caso: number;
        id_evento: number;
        kind: string;
        actor: string;
        actor_rol: string;
        detalle: string | null;
    }[]>;
    static addPlanComment(idPlan: string, rawBody: unknown): Promise<{
        titulo: string;
        fecha: Date | null;
        id_caso: number;
        id_evento: number;
        kind: string;
        actor: string;
        actor_rol: string;
        detalle: string | null;
    }[]>;
    static addEvidence(codigo: string, files: UploadedFile[]): Promise<{
        id_caso: number;
        id_anexo: number;
        nombre_archivo: string | null;
        ruta_archivo: string | null;
        tipo_archivo: string | null;
        peso: import("@prisma/client/runtime/library").Decimal | null;
        fecha_subida: Date | null;
        usuario_subida: number | null;
    }[]>;
    static addEvidenceByPlan(idPlan: string, rawBody: unknown, files: UploadedFile[]): Promise<{
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
//# sourceMappingURL=case.service.d.ts.map