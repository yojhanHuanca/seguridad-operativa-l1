export declare class AuthService {
    static login(correo: string, password: string): Promise<{
        token: string;
        usuario: {
            id_usuario: number;
            codigo_usuario: string;
            nombre: string;
            correo: string;
            estado: string;
            rol: string | undefined;
            area: string | undefined;
        };
    }>;
    static home(): Promise<{
        endpoints: string[];
        database: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map