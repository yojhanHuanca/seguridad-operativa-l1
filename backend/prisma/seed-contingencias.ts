import "dotenv/config";
import prisma from "../src/lib/prisma.js";
import { ContingenciaRepository } from "../src/modules/contingencias/contingencia.repository.js";

async function main() {
  await prisma.roles.upsert({
    where: { nombre_rol: "Gestión de Planes de Contingencia" },
    update: {},
    create: { nombre_rol: "Gestión de Planes de Contingencia" },
  });

  await ContingenciaRepository.ensureCatalogosIniciales();
  console.log("Módulo de contingencias preparado: rol y catálogos sincronizados.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
