export declare class ProfileRepository {
    static findById(id_usuario: number): Promise<{
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
    static findPasswordHash(id_usuario: number): Promise<{
        password_hash: string;
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
    static updatePassword(id_usuario: number, password_hash: string): Promise<{
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
    static countCasosResponsable(id_usuario: number): Promise<number>;
    static countCasosCreados(id_usuario: number): Promise<number>;
    static countPlanesAsignados(id_usuario: number): Promise<number>;
    static countPlanesCerrados(id_usuario: number): Promise<number>;
    static countEventosRegistrados(id_usuario: number): Promise<number>;
    static countUsuariosActivos(): Promise<number>;
    static countAreas(): Promise<number>;
}
//# sourceMappingURL=profile.repository.d.ts.map