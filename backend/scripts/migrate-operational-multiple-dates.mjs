import { PrismaClient } from '../dist/generated/prisma/client.js';

const prisma = new PrismaClient();

try {
  await prisma.$transaction(async (tx) => {
    // Serialize concurrent service starts while the idempotent migration runs.
    await tx.$queryRawUnsafe(
      'SELECT 1 FROM (SELECT pg_advisory_xact_lock(2026110601)) AS migration_lock',
    );
    await tx.$executeRawUnsafe(
      'DROP INDEX IF EXISTS public.datos_operativos_fecha_key',
    );
  });

  console.info(
    '[startup] Operaciones con fechas repetidas habilitadas correctamente.',
  );
} catch (error) {
  console.error(
    '[startup] No se pudo aplicar la migración de datos operativos; se cancela el inicio.',
    error,
  );
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
