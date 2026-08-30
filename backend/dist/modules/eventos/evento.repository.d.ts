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
        created_at: Date | null;
        descripcion: string | null;
        id_detalle: number;
        id_catalogo: number;
        codigo: string | null;
        orden: number | null;
        color: string | null;
    }) | null>;
    /**
     * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
     * comporta exactamente igual que antes (trae todo). Eso es a propósito:
     * el Dashboard y Reportes de Monitoreo siguen llamando esto sin paginar
     * porque necesitan el listado entero para sus propios agregados — solo
     * el Historial manda `page`/`limit`, igual que ya hace Casos SOP.
     */
    static findAll(opts?: {
        estado?: string;
        search?: string;
        desde?: string;
        hasta?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ({
            casos_sop: {
                codigo_sop: string;
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
            usuarios_eventos_monitoreo_usuario_registraTousuarios: {
                nombre: string;
            } | null;
            usuarios_eventos_monitoreo_asignado_aTousuarios: {
                id_usuario: number;
                nombre: string;
                cargo: string | null;
            } | null;
        } & {
            estado: string;
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
            asignado_a: number | null;
            id_caso_creado: number | null;
        })[];
        total: number | undefined;
    }>;
    /** Conteos por estado para las pestañas del Historial — solo `COUNT`, nunca trae filas. */
    static counts(): Promise<{
        total: number;
        registrados: number;
        enInvestigacion: number;
        cerrados: number;
    }>;
    static findById(id_evento: number): Promise<({
        casos_sop: {
            codigo_sop: string;
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
        usuarios_eventos_monitoreo_usuario_registraTousuarios: {
            nombre: string;
        } | null;
        usuarios_eventos_monitoreo_asignado_aTousuarios: {
            id_usuario: number;
            nombre: string;
            cargo: string | null;
        } | null;
    } & {
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    }) | null>;
    /** Eventos que le asignaron a esta persona de Seguridad Operativa, para su bandeja. */
    static findByAsignado(id_usuario: number): Promise<({
        casos_sop: {
            codigo_sop: string;
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
        usuarios_eventos_monitoreo_usuario_registraTousuarios: {
            nombre: string;
        } | null;
        usuarios_eventos_monitoreo_asignado_aTousuarios: {
            id_usuario: number;
            nombre: string;
            cargo: string | null;
        } | null;
    } & {
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    })[]>;
    static asignar(id_evento: number, id_usuario: number): Promise<{
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    }>;
    static create(dto: CreateEventoDto, actor?: number): Promise<{
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    }>;
    static update(id_evento: number, dto: UpdateEventoDto): Promise<{
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    }>;
    static remove(id_evento: number): Promise<{
        estado: string;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
    }>;
}
//# sourceMappingURL=evento.repository.d.ts.map