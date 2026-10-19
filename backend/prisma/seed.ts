import 'dotenv/config';
import prisma from '../src/lib/prisma.js';
import { BootstrapService } from '../src/bootstrap/bootstrap.service.js';
import { safeErrorMessage } from '../src/utils/ApiResponse.js';

try {
  console.log(await BootstrapService.seedCatalogs());
  console.log('Datos maestros preparados. No se crearon usuarios ni registros operativos.');
} catch (error) {
  console.error(safeErrorMessage(error, 'No se pudieron preparar los datos maestros. Revisa conexión y migraciones.'));
  process.exitCode = 1;
} finally { await prisma.$disconnect(); }
