import type { CreateEventoDto, UpdateEventoDto } from "./evento.types.js";
export declare const ESTADOS_EVENTO: readonly ["Registrado", "En investigación", "Cerrado"];
export declare class EventoRepository {
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
    /** Cuenta los eventos ya registrados este año, para el correlativo del código. */
    static contarDelAnio(year: number): Promise<number>;
    static findAll(): Promise<({
        usuarios: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
        } | null;
        catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: {
            nombre: string;
        } | null;
    } & {
        estado: string;
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
    })[]>;
    static findById(id_evento: number): Promise<({
        usuarios: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
        } | null;
        catalogo_detalle_eventos_monitoreo_modelo_mrTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_numero_mrTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_personal_involucradoTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_posible_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_rango_horarioTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: {
            nombre: string;
        } | null;
    } & {
        estado: string;
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
    }) | null>;
    static create(dto: CreateEventoDto, actor?: number): Promise<{
        estado: string;
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
    }>;
    static update(id_evento: number, dto: UpdateEventoDto): Promise<{
        estado: string;
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
    }>;
    static remove(id_evento: number): Promise<{
        estado: string;
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
    }>;
}
//# sourceMappingURL=evento.repository.d.ts.map