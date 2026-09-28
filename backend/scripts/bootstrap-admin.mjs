import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import { PrismaClient } from "../dist/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  if (process.env.ADMIN_BOOTSTRAP_ENABLED !== "true") {
    throw new Error("La creación inicial de administradores solo está habilitada en el Compose local.");
  }

  const nombre = process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "Administrador local";
  const correo = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    throw new Error("Define un correo válido en BOOTSTRAP_ADMIN_EMAIL.");
  }
  if (!password || password.length < 12) {
    throw new Error("La contraseña debe tener al menos 12 caracteres.");
  }
  if (await prisma.usuarios.findUnique({ where: { correo } })) {
    throw new Error("Ya existe una cuenta con ese correo. No se modificó ninguna cuenta.");
  }

  const rol = await prisma.roles.upsert({
    where: { nombre_rol: "Admin" },
    update: {},
    create: { nombre_rol: "Admin" },
  });

  const user = await prisma.usuarios.create({
    data: {
      codigo_usuario: `ADM-${randomUUID().slice(0, 12).toUpperCase()}`,
      nombre,
      correo,
      cargo: "Administrador",
      estado: "Activo",
      password_hash: await bcrypt.hash(password, 12),
      id_rol: rol.id_rol,
    },
  });

  console.log(`Administrador local creado: ${user.correo}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : "No se pudo crear el administrador local.");
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
