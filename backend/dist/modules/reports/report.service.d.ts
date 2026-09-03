import { z } from "zod";
import type { UploadedFile } from "./report.types.js";
import { type Actor } from "../../utils/actor.js";
export declare const createReportSchema: z.ZodObject<{
    id_tipo: z.ZodCoercedNumber<unknown>;
    id_lugar: z.ZodCoercedNumber<unknown>;
    id_lugar_especifico: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    descripcion: z.ZodString;
    modalidad: z.ZodEnum<{
        anonimo: "anonimo";
        identificado: "identificado";
    }>;
    nombre_reportante: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    correo_reportante: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    telefono_reportante: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    origen: z.ZodDefault<z.ZodEnum<{
        reportante: "reportante";
        seguridad_operativa: "seguridad_operativa";
    }>>;
    id_evento_monitoreo: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare class ReportService {
    static createReport(rawBody: unknown, files: UploadedFile[], actor?: Actor): Promise<{
        caso: {
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
        };
        evento: {
            estado: number | null;
            created_at: Date | null;
            descripcion: string | null;
            fecha: Date;
            updated_at: Date | null;
            id_evento: number;
            codigo_evento: string | null;
            hora: Date | null;
            anio: number | null;
            mes: number | null;
            semana: number | null;
            dia: string | null;
            rango_horario: number | null;
            tipo_incidente: number;
            ubicacion: number | null;
            tipo_via: number | null;
            direccion_via: number | null;
            lugar_incidente: number | null;
            modelo_mr: number | null;
            numero_mr: number | null;
            numero_carrera: string | null;
            personal_involucrado: number | null;
            tipo_causa: number | null;
            posible_causa: number | null;
            informacion_adicional: string | null;
            camara_monitoreada: string | null;
            demora: import("@prisma/client/runtime/library").Decimal | null;
            usuario_registra: number | null;
        };
    }>;
    /**
     * El Reportante solo ve lo que él registró; Seguridad Operativa, Jefe de
     * Área y Admin ven todos los casos porque los tienen que gestionar.
     */
    static listReports(actor?: Actor, query?: {
        filter?: string;
        search?: string;
        page?: string;
        limit?: string;
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
                    id_evento: number;
                    codigo_evento: string | null;
                    hora: Date | null;
                    anio: number | null;
                    mes: number | null;
                    semana: number | null;
                    dia: string | null;
                    rango_horario: number | null;
                    tipo_incidente: number;
                    ubicacion: number | null;
                    tipo_via: number | null;
                    direccion_via: number | null;
                    lugar_incidente: number | null;
                    modelo_mr: number | null;
                    numero_mr: number | null;
                    numero_carrera: string | null;
                    personal_involucrado: number | null;
                    tipo_causa: number | null;
                    posible_causa: number | null;
                    informacion_adicional: string | null;
                    camara_monitoreada: string | null;
                    demora: import("@prisma/client/runtime/library").Decimal | null;
                    usuario_registra: number | null;
                };
            } & {
                usuario: number | null;
                id_caso: number;
                id_evento: number;
                id: number;
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
            codigo_sop: string;
            titulo: string | null;
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
        total: number | undefined;
    }>;
    /**
     * El reportante responde una solicitud de información sin cuenta ni sesión:
     * el código SOP es la misma llave que ya usa para consultar su caso (como
     * un número de seguimiento). Funciona igual para anónimos e identificados,
     * hayan dejado correo o no — el correo es solo el aviso extra, no un
     * requisito para poder responder.
     */
    static responderInfoPublico(codigo_sop: string, rawBody: unknown, files: UploadedFile[]): Promise<{
        id_caso: number;
        mensaje: string;
        id_solicitud: number;
        respuesta: string | null;
        respondida: boolean;
        estado_previo: string | null;
        fecha_solicitud: Date | null;
        fecha_respuesta: Date | null;
    }>;
    static getByCodigo(codigo_sop: string, actor?: Actor): Promise<{
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
    }>;
}
//# sourceMappingURL=report.service.d.ts.map