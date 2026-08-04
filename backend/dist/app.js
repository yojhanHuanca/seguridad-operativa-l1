import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./lib/prisma.js";
import routes from "./routes/index.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);
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
        res.status(500).json({
            status: "ERROR",
            database: "Disconnected",
            error,
        });
    }
});
export default app;
//# sourceMappingURL=app.js.map