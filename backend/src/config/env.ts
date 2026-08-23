export const env = {
    PORT: Number(process.env.PORT) || 3000,

    DATABASE_URL: process.env.DATABASE_URL!,

    JWT_SECRET: process.env.JWT_SECRET!,

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",

    /** Client ID de Google Cloud Console (tipo "Web application") para "Iniciar sesión con Google". */
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",

};
