export declare class UserRepository {
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
            cargo: string | null;
            telefono: string | null;
            estado: string | null;
            id_area: number | null;
            id_rol: number | null;
            areas: {
                nombre_area: string;
            } | null;
            roles: {
                nombre_rol: string;
            } | null;
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
    }>;
    static findById(id: number): Promise<({
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        roles: {
            id_rol: number;
            nombre_rol: string;
        } | null;
    } & {
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
        id_area: number | null;
        id_rol: number | null;
    }) | null>;
    static createWithGeneratedCode(data: {
        nombre: string;
        correo: string;
        password_hash: string;
        cargo?: string | null;
        telefono?: string | null;
        id_area: number;
        id_rol: number;
    }): Promise<{
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
        id_area: number | null;
        id_rol: number | null;
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
        id_area: number | null;
        id_rol: number | null;
    } | null>;
    static update(id: number, data: {
        nombre?: string;
        correo?: string;
        cargo?: string | null;
        telefono?: string | null;
        id_area?: number;
        id_rol?: number;
        estado?: string;
        password_hash?: string;
    }): Promise<{
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
        id_area: number | null;
        id_rol: number | null;
    }>;
}
//# sourceMappingURL=users.repository.d.ts.map