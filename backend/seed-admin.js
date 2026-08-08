import prisma from './src/lib/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  const passwordHash = await bcrypt.hash('Admin123!', 10);

  const role = await prisma.roles.upsert({
    where: { nombre_rol: 'Admin' },
    update: {},
    create: { nombre_rol: 'Admin' },
  });

  const area = await prisma.areas.upsert({
    where: { nombre_area: 'Operaciones' },
    update: {},
    create: { nombre_area: 'Operaciones' },
  });

  const user = await prisma.usuarios.upsert({
    where: { correo: 'admin@seguridad.com' },
    update: {
      codigo_usuario: 'admin01',
      nombre: 'Administrador',
      password_hash: passwordHash,
      cargo: 'Administrador',
      telefono: '987654321',
      estado: 'Activo',
      id_area: area.id_area,
      id_rol: role.id_rol,
    },
    create: {
      codigo_usuario: 'admin01',
      nombre: 'Administrador',
      correo: 'admin@seguridad.com',
      password_hash: passwordHash,
      cargo: 'Administrador',
      telefono: '987654321',
      estado: 'Activo',
      id_area: area.id_area,
      id_rol: role.id_rol,
    },
  });

  console.log('Rol:', role);
  console.log('Área:', area);
  console.log('Usuario creado:', { correo: user.correo, codigo_usuario: user.codigo_usuario });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
