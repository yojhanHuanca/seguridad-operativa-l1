export declare class ProfileRepository {
    static findById(id_usuario: number): Promise<{
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
    } | null>;
    static findPasswordHash(id_usuario: number): Promise<{
        password_hash: string | null;
    } | null>;
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