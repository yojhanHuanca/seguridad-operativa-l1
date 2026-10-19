import 'dotenv/config';
import prisma from '../dist/lib/prisma.js';
import { BootstrapService } from '../dist/bootstrap/bootstrap.service.js';
import { safeErrorMessage } from '../dist/utils/ApiResponse.js';
try {
  console.log(await BootstrapService.seedCatalogs());
  console.log('Datos maestros preparados sin crear usuarios ni registros operativos.');
} catch (error) {
  console.error(safeErrorMessage(error, 'No se pudieron preparar los catálogos. Comprueba conexión y migraciones.'));
  process.exitCode = 1;
} finally { await prisma.$disconnect(); }
