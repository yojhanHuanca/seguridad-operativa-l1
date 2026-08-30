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
    /**
     * Servidor SMTP para desarrollo. "ethereal" es un valor especial: usa una
     * bandeja de prueba de https://ethereal.email creada al vuelo (sin
     * registro), útil para probar el envío a cualquier destinatario sin
     * depender de un dominio verificado en Resend. Vacío en producción: ahí
     * sigue mandando Resend como siempre.
     */
    SMTP_HOST: string;
    SMTP_PORT: number;
    /** Origen del frontend, para armar el link de "Olvidé mi contraseña" (ej. https://seguridad-operativa-l1.vercel.app). */
    FRONTEND_URL: string;
    /** Par de claves VAPID para notificaciones push (generar con `web-push generate-vapid-keys`). Vacías: el push queda desactivado, sin romper nada. */
    VAPID_PUBLIC_KEY: string;
    VAPID_PRIVATE_KEY: string;
    VAPID_SUBJECT: string;
};
//# sourceMappingURL=env.d.ts.map