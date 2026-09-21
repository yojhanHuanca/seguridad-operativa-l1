export declare class ProfileService {
    static getMe(id_usuario: number): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string;
        telefono: string;
        estado: string;
        fecha_ingreso: Date;
        foto_url: string;
        ultimo_acceso: Date;
        id_area: number;
        id_rol: number;
        areas: {
            nombre_area: string;
        };
        roles: {
            nombre_rol: string;
        };
    }>;
    static updateContact(id_usuario: number, data: {
        telefono?: string | null;
        foto_url?: string | null;
    }): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string;
        telefono: string;
        estado: string;
        fecha_ingreso: Date;
        foto_url: string;
        ultimo_acceso: Date;
        id_area: number;
        id_rol: number;
        areas: {
            nombre_area: string;
        };
        roles: {
            nombre_rol: string;
        };
    }>;
    static changePassword(id_usuario: number, actual: string, nueva: string): Promise<void>;
    static getActividad(id_usuario: number, rol_nombre: string): Promise<{
        label: string;
        value: number;
    }[]>;
}
//# sourceMappingURL=profile.service.d.ts.map