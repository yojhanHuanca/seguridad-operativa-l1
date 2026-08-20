import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import prisma from "./lib/prisma.js";
import routes from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";


const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json());
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
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "OK",
      database: "Connected",
      message: "Sistema de Gestión de Seguridad Operativa",
      version: "1.0.0",
    });
  } catch (error) {
    console.error("[GET /api/health]", error);
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
    });
  }
});

app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));
app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;