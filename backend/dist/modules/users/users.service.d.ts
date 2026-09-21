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
    static getUserById(rawId: unknown): Promise<{
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
    static createUser(rawBody: unknown, actor?: Actor, ip?: string | null): Promise<{
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
    static updateUser(rawId: unknown, rawBody: unknown, actor?: Actor, ip?: string | null): Promise<{
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
//# sourceMappingURL=users.service.d.ts.map