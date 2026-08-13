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
                descripcion: string | null;
                created_at: Date | null;
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
                updated_at: Date | null;
            };
        } & {
            id: number;
            id_evento: number;
            usuario: number | null;
            id_caso: number;
            fecha_conversion: Date | null;
        })[];
        areas: {
            nombre_area: string;
        } | null;
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
        solicitudes_informacion: {
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
    } & {
        descripcion: string;
        created_at: Date | null;
        updated_at: Date | null;
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
    })[]>;
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
                descripcion: string | null;
                created_at: Date | null;
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
                updated_at: Date | null;
            };
        } & {
            id: number;
            id_evento: number;
            usuario: number | null;
            id_caso: number;
            fecha_conversion: Date | null;
        })[];
        areas: {
            nombre_area: string;
        } | null;
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
        solicitudes_informacion: {
            mensaje: string;
            id_solicitud: number;
            respuesta: string | null;
            respondida: boolean;
            fecha_solicitud: Date | null;
            fecha_respuesta: Date | null;
        }[];
    } & {
        descripcion: string;
        created_at: Date | null;
        updated_at: Date | null;
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
    }) | null>;
    static findCatalogoDetalle(catalogoNombre: string, valorNombre: string): Promise<{
        nombre: string;
        estado: boolean | null;
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
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
        id_catalogo: number;
        codigo: string | null;
        descripcion: string | null;
        created_at: Date | null;
        orden: number | null;
        id_detalle: number;
        color: string | null;
    }) | null>;
    static createFullReport(dto: CreateReportDto, archivos: UploadedFile[]): Promise<{
        caso: {
            descripcion: string;
            created_at: Date | null;
            updated_at: Date | null;
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
        };
        evento: {
            estado: number | null;
            descripcion: string | null;
            created_at: Date | null;
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
            updated_at: Date | null;
        };
    }>;
}
//# sourceMappingURL=report.repository.d.ts.map