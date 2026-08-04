export declare class UsersService {
    static getAllUsers(): Promise<({
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
        nombre: string;
        cargo: string | null;
        correo: string;
        password_hash: string | null;
        telefono: string | null;
        estado: string | null;
        fecha_ingreso: Date | null;
        id_area: number | null;
        id_rol: number | null;
    })[]>;
}
//# sourceMappingURL=users.service.d.ts.map