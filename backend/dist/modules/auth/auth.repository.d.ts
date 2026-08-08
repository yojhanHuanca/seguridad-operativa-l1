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
        id_area: number | null;
        id_rol: number | null;
    }) | null>;
    static healthCheck(): Promise<boolean>;
}
//# sourceMappingURL=auth.repository.d.ts.map