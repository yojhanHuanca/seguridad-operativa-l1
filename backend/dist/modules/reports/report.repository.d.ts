import type { CreateReportDto, UploadedFile } from "./report.types.js";
export declare class ReportRepository {
    static findAll(): Promise<({
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
        areas: {
            nombre_area: string;
        } | null;
        solicitudes_informacion: {
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
            color: string | null;
        };
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
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto: number | null;
        observaciones: string | null;
        updated_at: Date | null;
        area_responsable: number | null;
        codigo_sop: string;
        titulo: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
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
        responsable_plan: number | null;
        estado_plan: number | null;
        dias_abierto_plan: number | null;
        created_by: number | null;
    })[]>;
    /**
     * "Mis reportes" del trabajador: solo los casos que él mismo registró.
     *
     * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
     * comporta exactamente igual que antes (trae todo). Eso es a propósito:
     * `ReportanteShell` (badge), `ReportanteHomePage` (resumen) y
     * `NotificationsPage` (solicitudes de información completas) siguen
     * llamando esto sin paginar porque necesitan el listado entero para sus
     * propios cálculos — solo `MyReportsPage` manda `page`/`limit`.
     */
    static findAllByCreator(id_usuario: number, opts?: {
        filter?: "activos" | "pendientes_info" | "cerrados";
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
                    };
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
            areas: {
                nombre_area: string;
            } | null;
            solicitudes_informacion: {
                mensaje: string;
                id_solicitud: number;
                respuesta: string | null;
                respondida: boolean;
                fecha_solicitud: Date | null;
                fecha_respuesta: Date | null;
            }[];
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
                color: string | null;
            };
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
            fecha_plan: Date | null;
            fecha_reprogramada: Date | null;
            dias_abierto: number | null;
            observaciones: string | null;
            updated_at: Date | null;
            area_responsable: number | null;
            codigo_sop: string;
            titulo: string | null;
            fecha_hallazgo: Date;
            fecha_evento: Date | null;
            estado_hallazgo: number;
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
            responsable_plan: number | null;
            estado_plan: number | null;
            dias_abierto_plan: number | null;
            created_by: number | null;
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
                    };
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
            areas: {
                nombre_area: string;
            } | null;
            solicitudes_informacion: {
                mensaje: string;
                id_solicitud: number;
                respuesta: string | null;
                respondida: boolean;
                fecha_solicitud: Date | null;
                fecha_respuesta: Date | null;
            }[];
            catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
                nombre: string;
                color: string | null;
            };
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
            fecha_plan: Date | null;
            fecha_reprogramada: Date | null;
            dias_abierto: number | null;
            observaciones: string | null;
            updated_at: Date | null;
            area_responsable: number | null;
            codigo_sop: string;
            titulo: string | null;
            fecha_hallazgo: Date;
            fecha_evento: Date | null;
            estado_hallazgo: number;
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
            responsable_plan: number | null;
            estado_plan: number | null;
            dias_abierto_plan: number | null;
            created_by: number | null;
        })[];
        total: number;
    }>;
    static findByCodigo(codigo_sop: string): Promise<({
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
        areas: {
            nombre_area: string;
        } | null;
        solicitudes_informacion: {
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
            color: string | null;
        };
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
        fecha_plan: Date | null;
        fecha_reprogramada: Date | null;
        dias_abierto: number | null;
        observaciones: string | null;
        updated_at: Date | null;
        area_responsable: number | null;
        codigo_sop: string;
        titulo: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        estado_hallazgo: number;
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
        responsable_plan: number | null;
        estado_plan: number | null;
        dias_abierto_plan: number | null;
        created_by: number | null;
    }) | null>;
    static findPublicByCodigo(codigo_sop: string): Promise<{
        anexos_caso: {
            id_anexo: number;
        }[];
        evento_caso: {
            eventos_operativos: {
                catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle: {
                    nombre: string;
                } | null;
                catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle: {
                    nombre: string;
                };
            };
        }[];
        areas: {
            nombre_area: string;
        } | null;
        created_at: Date | null;
        solicitudes_informacion: {
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
        descripcion: string;
        id_caso: number;
        codigo_sop: string;
        titulo: string | null;
        fecha_hallazgo: Date;
        fecha_evento: Date | null;
        catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle: {
            nombre: string;
            color: string | null;
        };
        catalogo_detalle_casos_sop_tipoTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_casos_sop_tipo_sopTocatalogo_detalle: {
            nombre: string;
        };
    } | null>;
    static findCatalogoDetalle(catalogoNombre: string, valorNombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    } | null>;
    static findCatalogoDetalleById(id_detalle: number): Promise<({
        catalogos: {
            nombre: string;
        };
    } & {
        nombre: string;
        estado: boolean | null;
        created_at: Date | null;
        descripcion: string | null;
        codigo: string | null;
        id_catalogo: number;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }) | null>;
    static createFullReport(dto: CreateReportDto, archivos: UploadedFile[], id_usuario_creador?: number): Promise<{
        caso: {
            created_at: Date | null;
            descripcion: string;
            id_caso: number;
            fecha_plan: Date | null;
            fecha_reprogramada: Date | null;
            dias_abierto: number | null;
            observaciones: string | null;
            updated_at: Date | null;
            area_responsable: number | null;
            codigo_sop: string;
            titulo: string | null;
            nombre_reportante: string | null;
            correo_reportante: string | null;
            telefono_reportante: string | null;
            fecha_hallazgo: Date;
            fecha_evento: Date | null;
            estado_hallazgo: number;
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
            responsable_plan: number | null;
            estado_plan: number | null;
            dias_abierto_plan: number | null;
            created_by: number | null;
        };
        evento: {
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
    }>;
}
//# sourceMappingURL=report.repository.d.ts.map