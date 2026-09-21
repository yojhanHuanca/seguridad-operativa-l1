export declare class UserRepository {
    /** Directorio reducido, sin datos de contacto — ver BASIC_SELECT. */
    static findAllBasic(): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        nombre: string;
        cargo: string;
        estado: string;
        es_responsable: boolean;
        id_area: number;
        id_rol: number;
        areas: {
            nombre_area: string;
        };
        roles: {
            nombre_rol: string;
        };
    }[]>;
    /**
     * `page`/`limit` son opcionales y deben venir juntos — sin ellos se
     * comporta exactamente igual que antes (trae todo). Es el mismo patrón
     * aditivo que ya usan Casos SOP, Reportes y Planes de Acción.
     */
    static findAll(opts?: {
        search?: string;
        rol?: number;
        estado?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            id_usuario: number;
            codigo_usuario: string;
            correo: string;
            nombre: string;
            cargo: string;
            telefono: string;
            estado: string;
            ultimo_acceso: Date;
            es_responsable: boolean;
            puede_reabrir_casos: boolean;
            puede_rechazar_reportes: boolean;
            id_area: number;
            id_rol: number;
            areas: {
                nombre_area: string;
            };
            roles: {
                nombre_rol: string;
            };
        }[];
        total: number | undefined;
    }>;
    /**
     * Conteos para las tarjetas de resumen y la pestaña "Roles y Permisos" —
     * solo `COUNT`/`groupBy`, nunca trae las filas completas.
     */
    static counts(): Promise<{
        total: number;
        activos: number;
        conRol: number;
        sinRol: number;
        porRol: Record<string, number>;
        porPermiso: {
            es_responsable: number;
            puede_reabrir_casos: number;
            puede_rechazar_reportes: number;
        };
    }>;
    static findById(id: number): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string;
        telefono: string;
        estado: string;
        fecha_ingreso: Date;
        ultimo_acceso: Date;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number;
        id_rol: number;
        areas: {
            id_area: number;
            nombre_area: string;
        };
        roles: {
            id_rol: number;
            nombre_rol: string;
        };
    }>;
    static createWithGeneratedCode(data: {
        nombre: string;
        correo: string;
        password_hash: string;
        cargo?: string | null;
        telefono?: string | null;
        id_area?: number | null;
        id_rol: number;
        es_responsable?: boolean;
        puede_reabrir_casos?: boolean;
        puede_rechazar_reportes?: boolean;
    }): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string;
        telefono: string;
        estado: string;
        fecha_ingreso: Date;
        ultimo_acceso: Date;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number;
        id_rol: number;
        areas: {
            id_area: number;
            nombre_area: string;
        };
        roles: {
            id_rol: number;
            nombre_rol: string;
        };
    }>;
    static findByEmail(email: string): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        password_hash: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        foto_url: string | null;
        ultimo_acceso: Date | null;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
    }>;
    static update(id: number, data: {
        nombre?: string;
        correo?: string;
        cargo?: string | null;
        telefono?: string | null;
        id_area?: number | null;
        id_rol?: number;
        estado?: string;
        es_responsable?: boolean;
        puede_reabrir_casos?: boolean;
        puede_rechazar_reportes?: boolean;
        password_hash?: string;
    }): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string;
        telefono: string;
        estado: string;
        fecha_ingreso: Date;
        ultimo_acceso: Date;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number;
        id_rol: number;
        areas: {
            id_area: number;
            nombre_area: string;
        };
        roles: {
            id_rol: number;
            nombre_rol: string;
        };
    }>;
}
//# sourceMappingURL=users.repository.d.ts.map