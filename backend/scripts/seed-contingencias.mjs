import prisma from "../dist/lib/prisma.js";
import { ContingenciaRepository } from "../dist/modules/contingencias/contingencia.repository.js";

try {
  await prisma.roles.upsert({
    where: { nombre_rol: "Gestión de Planes de Contingencia" },
    update: {},
    create: { nombre_rol: "Gestión de Planes de Contingencia" },
  });
  await ContingenciaRepository.ensureCatalogosIniciales();
  console.log("Catálogos y rol de contingencias preparados.");
} finally {
  await prisma.$disconnect();
}
