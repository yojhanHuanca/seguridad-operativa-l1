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
            id_area: number | null;
            ultimo_acceso: Date | null;
            es_responsable: boolean;
            puede_reabrir_casos: boolean;
            puede_rechazar_reportes: boolean;
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