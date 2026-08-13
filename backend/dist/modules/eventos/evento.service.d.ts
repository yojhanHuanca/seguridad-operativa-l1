export declare class EventoService {
    static getAllEventos(): Promise<({
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
    static getEventoById(id: number): Promise<{
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
    }>;
    static createEvento(rawBody: unknown, actor?: number): Promise<{
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
    static updateEvento(id: number, rawBody: unknown): Promise<{
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
    static deleteEvento(id: number): Promise<{
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
//# sourceMappingURL=evento.service.d.ts.map