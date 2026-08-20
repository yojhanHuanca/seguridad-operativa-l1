export declare class AuthService {
    static login(correo: string, password: string, direccion_ip?: string, navegador?: string): Promise<{
        token: string;
        usuario: {
            id_usuario: number;
            codigo_usuario: string;
            nombre: string;
            correo: string;
            estado: string | null;
            rol: string | undefined;
            area: string | undefined;
        };
    }>;
    /** Tokens emitidos antes de llevar `id_sesion` no tienen nada que cerrar del lado del servidor. */
    static logout(id_sesion?: number): Promise<void>;
    static home(): Promise<{
        endpoints: string[];
        database: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map