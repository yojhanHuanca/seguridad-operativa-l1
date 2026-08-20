export declare class ProfileService {
    static getMe(id_usuario: number): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        foto_url: string | null;
        ultimo_acceso: Date | null;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            nombre_area: string;
        } | null;
        roles: {
            nombre_rol: string;
        } | null;
    }>;
    static updateContact(id_usuario: number, data: {
        telefono?: string | null;
        foto_url?: string | null;
    }): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        foto_url: string | null;
        ultimo_acceso: Date | null;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            nombre_area: string;
        } | null;
        roles: {
            nombre_rol: string;
        } | null;
    }>;
    static changePassword(id_usuario: number, actual: string, nueva: string): Promise<void>;
    static getActividad(id_usuario: number, rol_nombre: string): Promise<{
        label: string;
        value: number;
    }[]>;
}
//# sourceMappingURL=profile.service.d.ts.map