import 'dotenv/config';
import prisma from '../dist/lib/prisma.js';
import { BootstrapService } from '../dist/bootstrap/bootstrap.service.js';
import { safeErrorMessage } from '../dist/utils/ApiResponse.js';
try {
  const account = await BootstrapService.createInitialAdmin({ email: process.env.INITIAL_ADMIN_EMAIL, password: process.env.INITIAL_ADMIN_PASSWORD, name: process.env.INITIAL_ADMIN_NAME });
  console.log('Administrador inicial creado:', account.correo);
  console.log('Debe cambiar la contraseña en su primer acceso. Retira INITIAL_ADMIN_PASSWORD del entorno.');
} catch (error) {
  console.error(safeErrorMessage(error, 'No se pudo crear el administrador. Revisa las variables de inicialización y las migraciones.'));
  process.exitCode = 1;
} finally { await prisma.$disconnect(); }
