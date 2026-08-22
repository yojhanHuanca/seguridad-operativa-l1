export declare class AuthRepository {
    static findByEmail(correo: string): Promise<({
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
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
    }) | null>;
    static updateUltimoAcceso(id_usuario: number): Promise<{
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
    static healthCheck(): Promise<boolean>;
    static crearSesion(usuario: number, direccion_ip?: string, navegador?: string): Promise<{
        estado: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        direccion_ip: string | null;
        navegador: string | null;
        dispositivo: string | null;
        id_sesion: number;
        usuario: number;
    }>;
    static cerrarSesion(id_sesion: number): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    static sesionActiva(id_sesion: number): Promise<boolean>;
}
//# sourceMappingURL=auth.repository.d.ts.map