export declare const env: {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    /** Client ID de Google Cloud Console (tipo "Web application") para "Iniciar sesión con Google". */
    GOOGLE_CLIENT_ID: string;
    /** API key de https://resend.com/api-keys, para el correo de "Olvidé mi contraseña". */
    RESEND_API_KEY: string;
    /** Remitente del correo de recuperación — debe ser de un dominio verificado en Resend. */
    EMAIL_FROM: string;
    /** Origen del frontend, para armar el link de "Olvidé mi contraseña" (ej. https://seguridad-operativa-l1.vercel.app). */
    FRONTEND_URL: string;
};
//# sourceMappingURL=env.d.ts.map