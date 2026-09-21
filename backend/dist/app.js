import express from "express";
import cors, {} from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./lib/prisma.js";
import routes from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { env } from "./config/env.js";
const app = express();
// Allowlist explícito: el frontend real (FRONTEND_URL, prod o el que diga el
// .env) más los puertos de desarrollo local (Vite dev y `vite preview`).
// Antes `cors()` sin argumentos reflejaba cualquier origen — inofensivo hoy
// porque la sesión va por Bearer token (no por cookie), pero no es la
// configuración correcta para una API que va a producción.
const ORIGENES_PERMITIDOS = new Set([env.FRONTEND_URL, "http://localhost:5173", "http://localhost:4173"]);
app.use(cors({
    origin(origin, callback) {
        // Sin cabecera Origin (curl, health checks, servidor-a-servidor): se permite.
        if (!origin || ORIGENES_PERMITIDOS.has(origin))
            return callback(null, true);
        callback(new Error("Origen no permitido por CORS"));
    },
}));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"],
            // La API solo devuelve JSON y archivos — no sirve HTML/CSS/JS propios,
            // así que un CSP mínimo (sin scripts, sin estilos) no le quita nada
            // funcional; solo evita que un navegador renderice contenido inyectado
            // como si viniera de este origen.
            frameAncestors: ["'none'"],
        },
    },
}));
// El body por defecto de express son 100 KB, suficiente para todo el sistema
// menos para la importación histórica: ahí el navegador manda el Excel ya
// convertido a JSON, y un archivo de decenas de miles de filas pesa varios MB.
// Se lo excluye del límite general en vez de subirlo para todas las rutas: el
// resto de la API no tiene motivo para aceptar cuerpos gigantes.
const jsonEstandar = express.json();
app.use((req, res, next) => {
    if (req.path.startsWith("/api/importacion"))
        return next();
    return jsonEstandar(req, res, next);
});
app.use(morgan("dev"));
app.get("/", (_req, res) => {
    res.redirect("/api");
});
// Registrada ANTES de montar el router de /api: ese router aplica
// `verifyToken` a todo lo que no sea /auth, así que si /health se registrara
// después, una petición sin sesión se cortaba ahí con 401 sin llegar nunca a
// este handler — quedaba inservible para monitoreo.
app.get("/api/health", async (_req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.status(200).json({
            status: "OK",
            database: "Connected",
            message: "Sistema de Gestión de Seguridad Operativa",
            version: "1.0.0",
        });
    }
    catch (error) {
        console.error("[GET /api/health]", error);
        res.status(500).json({
            status: "ERROR",
            database: "Disconnected",
        });
    }
});
// Los archivos subidos NO se sirven como estáticos públicos: se entregan por
// /api/archivos, que exige sesión y aplica la visibilidad del expediente.
app.use("/api", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map