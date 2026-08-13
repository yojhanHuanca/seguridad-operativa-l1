export declare class UserRepository {
    static findAll(): Promise<{
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
    }[]>;
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
        id_area: number | null;
        id_rol: number | null;
    }) | null>;
    static create(data: {
        codigo_usuario: string;
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
        id_area: number | null;
        id_rol: number | null;
    } | null>;
    static findByCodigo(codigo: string): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        password_hash: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
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
        id_area: number | null;
        id_rol: number | null;
    }>;
}
//# sourceMappingURL=users.repository.d.ts.map