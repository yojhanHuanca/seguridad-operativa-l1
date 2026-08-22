import type { Actor } from "../../utils/actor.js";
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
            ultimo_acceso: Date | null;
            es_responsable: boolean;
            puede_reabrir_casos: boolean;
            puede_rechazar_reportes: boolean;
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
        porPermiso: {
            es_responsable: number;
            puede_reabrir_casos: number;
            puede_rechazar_reportes: number;
        };
    }>;
    /**
     * Directorio reducido para los selectores de responsable. Lo puede pedir
     * cualquier rol autenticado, por eso no incluye correo ni teléfono.
     */
    static getBasicUsers(): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        nombre: string;
        cargo: string | null;
        estado: string | null;
        es_responsable: boolean;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            nombre_area: string;
        } | null;
        roles: {
            nombre_rol: string;
        } | null;
    }[]>;
    static getUserById(rawId: unknown): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        ultimo_acceso: Date | null;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        roles: {
            id_rol: number;
            nombre_rol: string;
        } | null;
    } | null>;
    static createUser(rawBody: unknown, actor?: Actor, ip?: string | null): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        ultimo_acceso: Date | null;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        roles: {
            id_rol: number;
            nombre_rol: string;
        } | null;
    }>;
    static updateUser(rawId: unknown, rawBody: unknown, actor?: Actor, ip?: string | null): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        ultimo_acceso: Date | null;
        es_responsable: boolean;
        puede_reabrir_casos: boolean;
        puede_rechazar_reportes: boolean;
        id_area: number | null;
        id_rol: number | null;
        areas: {
            id_area: number;
            nombre_area: string;
        } | null;
        roles: {
            id_rol: number;
            nombre_rol: string;
        } | null;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map