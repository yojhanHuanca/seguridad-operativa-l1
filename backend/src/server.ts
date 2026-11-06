import "dotenv/config";
import app from "./app.js";
import logger from "./utils/logger.js";
import { ConfiguracionService } from "./modules/configuracion/configuracion.service.js";
import { iniciarRecordatoriosPlanes } from "./modules/cases/plan-reminder.scheduler.js";
import { PushService } from "./modules/notifications/push.service.js";

const PORT = process.env.PORT || 3000;

// Crea (si no existe) y pone al día la secuencia de Postgres que genera
// codigo_sop, antes de aceptar tráfico — así ningún request concurrente puede
// llegar antes de que la secuencia exista.
await ConfiguracionService.bootstrapSequences();

app.listen(PORT, () => {
  logger.info(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  if (!PushService.habilitado) logger.warn("Web Push deshabilitado: configura VAPID_PUBLIC_KEY y VAPID_PRIVATE_KEY en el backend");
  iniciarRecordatoriosPlanes();
});
