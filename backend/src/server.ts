import "dotenv/config";
import app from "./app.js";
import logger from "./utils/logger.js";
import { ConfiguracionService } from "./modules/configuracion/configuracion.service.js";

const PORT = process.env.PORT || 3000;

// Crea (si no existen) y pone al día las secuencias de Postgres que generan
// codigo_sop/codigo_plan, antes de aceptar tráfico — así ningún request
// concurrente puede llegar antes de que la secuencia exista.
await ConfiguracionService.bootstrapSequences();

app.listen(PORT, () => {
  logger.info(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
