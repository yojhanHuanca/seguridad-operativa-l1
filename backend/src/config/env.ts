export const env = {
    PORT: Number(process.env.PORT) || 3000,

    DATABASE_URL: process.env.DATABASE_URL!,

    JWT_SECRET: process.env.JWT_SECRET!,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",

    /** Client ID de Google Cloud Console (tipo "Web application") para "Iniciar sesión con Google". */
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",

    /** API key de https://resend.com/api-keys, para el correo de "Olvidé mi contraseña". */
    RESEND_API_KEY: process.env.RESEND_API_KEY || "",

    /** Remitente del correo de recuperación — debe ser de un dominio verificado en Resend. */
    EMAIL_FROM: process.env.EMAIL_FROM || "Seguridad Operativa <onboarding@resend.dev>",

    /** Origen del frontend, para armar el link de "Olvidé mi contraseña" (ej. https://seguridad-operativa-l1.vercel.app). */
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

    /** Par de claves VAPID para notificaciones push (generar con `web-push generate-vapid-keys`). Vacías: el push queda desactivado, sin romper nada. */
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY || "",
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY || "",
    VAPID_SUBJECT: process.env.VAPID_SUBJECT || "mailto:soporte@lineauno.pe",

};
