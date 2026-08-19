import "dotenv/config";
import prisma from "../src/lib/prisma.js";
import { BcryptHelper } from "../src/utils/bcrypt.js";

// Script de un solo uso: asigna contraseñas reales (bcrypt) a los usuarios
// de ejemplo ya sembrados y crea un usuario por cada rol que todavía no
// tiene ninguno (Admin, Monitorista, Reportante), para que el login
// recién conectado tenga credenciales utilizables en cada panel.
// Correos/códigos son de convención (no vienen del CSV del cliente),
// igual que los 2 usuarios ya sembrados en prisma/seed/usuarios-data.ts.

interface CuentaSeed {
  codigo_usuario: string;
  nombre: string;
  correo: string;
  cargo: string;
  area: string;
  rol: string;
  passwordEnv: string;
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno obligatoria ${name}`);
  return value;
}

const CUENTAS: CuentaSeed[] = [
  {
    codigo_usuario: "HH001",
    nombre: "Hector Hinostroza",
    correo: "hector.hinostroza@metrolinea1.pe",
    cargo: "Responsable de Seguridad Operativa (RSO)",
    area: "Seguridad Operativa",
    rol: "Seguridad Operativa",
    passwordEnv: "SEED_PASSWORD_SEGURIDAD",
  },
  {
    codigo_usuario: "CO001",
    nombre: "Christian Oliva",
    correo: "christian.oliva@metrolinea1.pe",
    cargo: "Responsable de Plan de Acción",
    area: "Ingeniería",
    rol: "Jefe de Área",
    passwordEnv: "SEED_PASSWORD_JEFE_AREA",
  },
  {
    codigo_usuario: "AD001",
    nombre: "Administrador SIGMA",
    correo: "admin@metrolinea1.pe",
    cargo: "Administrador del sistema",
    area: "Operaciones",
    rol: "Admin",
    passwordEnv: "SEED_PASSWORD_ADMIN",
  },
  {
    codigo_usuario: "MO001",
    nombre: "Monitorista SIGMA",
    correo: "monitorista@metrolinea1.pe",
    cargo: "Monitorista de eventos operativos",
    area: "Operaciones",
    rol: "Monitorista",
    passwordEnv: "SEED_PASSWORD_MONITORISTA",
  },
  {
    codigo_usuario: "RE001",
    nombre: "Reportante SIGMA",
    correo: "reportante@metrolinea1.pe",
    cargo: "Trabajador reportante",
    area: "Operaciones",
    rol: "Reportante",
    passwordEnv: "SEED_PASSWORD_REPORTANTE",
  },
];

async function main() {
  for (const cuenta of CUENTAS) {
    const area = await prisma.areas.findUniqueOrThrow({ where: { nombre_area: cuenta.area } });
    const rol = await prisma.roles.upsert({
      where: { nombre_rol: cuenta.rol },
      update: {},
      create: { nombre_rol: cuenta.rol },
    });
    const password_hash = await BcryptHelper.hash(requiredEnv(cuenta.passwordEnv));

    await prisma.usuarios.upsert({
      where: { correo: cuenta.correo },
      update: {
        codigo_usuario: cuenta.codigo_usuario,
        nombre: cuenta.nombre,
        cargo: cuenta.cargo,
        estado: "Activo",
        id_area: area.id_area,
        id_rol: rol.id_rol,
        password_hash,
      },
      create: {
        codigo_usuario: cuenta.codigo_usuario,
        nombre: cuenta.nombre,
        correo: cuenta.correo,
        cargo: cuenta.cargo,
        estado: "Activo",
        id_area: area.id_area,
        id_rol: rol.id_rol,
        password_hash,
      },
    });

    console.log(`✓ ${cuenta.rol.padEnd(20)} ${cuenta.correo}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
