export declare class AuthService {
    /**
     * Última parte compartida por `login` y `loginWithGoogle`: una vez que ya
     * sabemos que el usuario es real, está activo y tiene rol, ambos caminos
     * abren la misma sesión, emiten el mismo JWT y devuelven la misma forma
     * de respuesta — solo cambia cómo se verificó la identidad.
     */
    private static issueSession;
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
    /**
     * "Iniciar sesión con Google" — NO crea cuentas nuevas. Solo confirma la
     * identidad del correo (Google ya lo verificó) y, si ese correo ya existe
     * como usuario dado de alta por un Admin, abre sesión igual que el login
     * normal. Si no existe, se rechaza: las altas siguen siendo solo del Admin.
     */
    static loginWithGoogle(idToken: string, direccion_ip?: string, navegador?: string): Promise<{
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
    /**
     * Siempre responde "listo" al llamador, exista o no ese correo — si
     * dijéramos "ese correo no existe" alguien podría usarlo para enumerar
     * qué correos son cuentas reales del sistema. El correo solo sale si el
     * usuario existe y está activo.
     */
    static forgotPassword(correo: string): Promise<void>;
    static resetPassword(token: string, nuevaPassword: string, direccion_ip?: string, navegador?: string): Promise<void>;
    /** Tokens emitidos antes de llevar `id_sesion` no tienen nada que cerrar del lado del servidor. */
    static logout(id_sesion?: number): Promise<void>;
    static home(): Promise<{
        endpoints: string[];
        database: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map