export declare class UsersService {
    static getAllUsers(query?: {
        search?: string;
        rol?: string;
        estado?: string;
        page?: string;
        limit?: string;
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
    static getCounts(): Promise<{
        total: number;
        activos: number;
        conRol: number;
        sinRol: number;
        porRol: Record<string, number>;
    }>;
    static getUserById(rawId: unknown): Promise<({
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
    static createUser(rawBody: unknown): Promise<{
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
    static updateUser(rawId: unknown, rawBody: unknown): Promise<{
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
//# sourceMappingURL=users.service.d.ts.map