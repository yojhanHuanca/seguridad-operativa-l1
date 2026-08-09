import type { CreateUserDto } from "./users.types.js";
export declare class UsersService {
    static getAllUsers(): Promise<{
        id_usuario: number;
        codigo_usuario: string;
        correo: string;
        nombre: string;
        cargo: string | null;
        telefono: string | null;
        estado: string | null;
        roles: {
            nombre_rol: string;
        } | null;
    }[]>;
    static getUserById(id: number): Promise<({
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
    static createUser(data: CreateUserDto): Promise<{
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
//# sourceMappingURL=users.service.d.ts.map