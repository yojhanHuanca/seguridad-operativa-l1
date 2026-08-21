import "dotenv/config";
import { writeFileSync } from "node:fs";
import prisma from "../src/lib/prisma.js";

const CODIGOS = ["SOP 01-2024", "SOP 02-2024", "SOP 15-2024", "SOP 16-2024", "SOP 15-2026"];

async function main() {
  const casos = await prisma.casos_sop.findMany({
    where: { codigo_sop: { in: CODIGOS } },
    include: { planes_accion: true, evento_caso: true, timeline_caso: true },
  });

  if (casos.length === 0) {
    console.log("No se encontró ninguno de esos códigos en la base local.");
    return;
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = `../../backups/casos-sop-eliminados-${stamp}.json`;
  writeFileSync(
    new URL(backupPath, import.meta.url),
    JSON.stringify({ deletedAt: new Date().toISOString(), casos }, null, 2),
  );

  const result = await prisma.casos_sop.deleteMany({ where: { codigo_sop: { in: CODIGOS } } });
  console.log(`Eliminados ${result.count} casos (con sus eventos/planes/timeline en cascada).`);
  console.log("Códigos:", casos.map((c) => c.codigo_sop).join(", "));
  console.log("Respaldo guardado en:", backupPath);
}

main()
  .catch((error) => {
    console.error("ERROR:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
