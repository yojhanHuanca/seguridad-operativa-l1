import { type Actor } from "../../utils/actor.js";
export declare class EventoService {
    static getAllEventos(query?: {
        estado?: string;
        search?: string;
        desde?: string;
        hasta?: string;
        page?: string;
        limit?: string;
    }): Promise<{
        data: ({
            casos_sop: {
                codigo_sop: string;
            } | null;
            catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: {
                nombre: string;
            } | null;
            catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: {
                nombre: string;
                codigo: string | null;
            } | null;
            catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: {
                nombre: string;
            };
            catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: {
                nombre: string;
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
            catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: {
                nombre: string;
            } | null;
            catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: {
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
            descripcion: string | null;
            fecha: Date;
            created_at: Date | null;
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
            asignado_a: number | null;
            id_caso_creado: number | null;
            updated_at: Date | null;
        })[];
        total: number | undefined;
    }>;
    static counts(): Promise<{
        total: number;
        registrados: number;
        enInvestigacion: number;
        cerrados: number;
    }>;
    static getEventoById(id: number): Promise<{
        casos_sop: {
            codigo_sop: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: {
            nombre: string;
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
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: {
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
        descripcion: string | null;
        fecha: Date;
        created_at: Date | null;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
        updated_at: Date | null;
    }>;
    static createEvento(rawBody: unknown, actor?: number): Promise<{
        estado: string;
        descripcion: string | null;
        fecha: Date;
        created_at: Date | null;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
        updated_at: Date | null;
    }>;
    static updateEvento(id: number, rawBody: unknown): Promise<{
        estado: string;
        descripcion: string | null;
        fecha: Date;
        created_at: Date | null;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
        updated_at: Date | null;
    }>;
    static deleteEvento(id: number): Promise<{
        estado: string;
        descripcion: string | null;
        fecha: Date;
        created_at: Date | null;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
        updated_at: Date | null;
    }>;
    /** Bandeja de eventos asignados a una persona de Seguridad Operativa. */
    /**
     * Bandeja de eventos asignados. El id de la ruta solo lo respeta el Admin;
     * cualquier otro rol recibe la suya, aunque pida la de otra persona — antes
     * el id venía del cliente sin comprobar nada.
     */
    static getAsignados(id_usuario: number, actor?: Actor): Promise<({
        casos_sop: {
            codigo_sop: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_ubicacionTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_lugar_incidenteTocatalogo_detalle: {
            nombre: string;
            codigo: string | null;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_incidenteTocatalogo_detalle: {
            nombre: string;
        };
        catalogo_detalle_eventos_monitoreo_direccion_viaTocatalogo_detalle: {
            nombre: string;
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
        catalogo_detalle_eventos_monitoreo_tipo_causaTocatalogo_detalle: {
            nombre: string;
        } | null;
        catalogo_detalle_eventos_monitoreo_tipo_viaTocatalogo_detalle: {
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
        descripcion: string | null;
        fecha: Date;
        created_at: Date | null;
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
        asignado_a: number | null;
        id_caso_creado: number | null;
        updated_at: Date | null;
    })[]>;
    /**
     * Asigna el evento a una persona de Seguridad Operativa: le llega una
     * notificación personal para que sea ella quien arme el hallazgo (no se
     * crea ningún caso SOP desde acá — eso lo hace SO desde su propio panel).
     */
    static asignarEvento(id: number, rawBody: unknown): Promise<{
        id_usuario: number;
        nombre: string;
    }>;
}
//# sourceMappingURL=evento.service.d.ts.map