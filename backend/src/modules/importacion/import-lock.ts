import { randomUUID } from "node:crypto";
import prisma from "../../lib/prisma.js";

const STALE_AFTER_MINUTES = 10;
const HEARTBEAT_MS = 60_000;

/** PostgreSQL lease serializes imports across all running API instances. */
export async function withImportLock<T>(module: string, work: () => Promise<T>): Promise<T> {
  const token = randomUUID();
  try {
    await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`DELETE FROM "importacion_locks" WHERE "modulo" = ${module} AND "heartbeat_at" < NOW() - (${STALE_AFTER_MINUTES} * INTERVAL '1 minute')`;
      await tx.importacion_locks.create({ data: { modulo: module, token } });
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      throw new Error("Ya hay una importación de este módulo en curso. Espera a que termine y vuelve a validar.");
    }
    throw error;
  }

  const heartbeat = setInterval(() => {
    void prisma.importacion_locks.updateMany({
      where: { modulo: module, token },
      data: { heartbeat_at: new Date() },
    }).catch(() => undefined);
  }, HEARTBEAT_MS);
  heartbeat.unref();

  try {
    return await work();
  } finally {
    clearInterval(heartbeat);
    await prisma.importacion_locks.deleteMany({ where: { modulo: module, token } });
  }
}
