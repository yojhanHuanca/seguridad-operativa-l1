import prisma from '../lib/prisma.js';
import { CATALOGOS } from './catalogos-data.js';
import { AREAS } from './areas-data.js';
import { ROLES } from './roles-data.js';
import { ContingenciaRepository } from '../modules/contingencias/contingencia.repository.js';
import { BcryptHelper } from '../utils/bcrypt.js';
import { z } from 'zod';

export class BootstrapService {
  /** Solo datos maestros; no crea cuentas ni registros operativos de demostración. */
  static async seedCatalogs() {
    for (const group of CATALOGOS) {
      const catalog = await prisma.catalogos.upsert({ where: { nombre: group.nombre }, update: {}, create: { codigo: group.codigo, nombre: group.nombre, descripcion: group.descripcion } });
      for (const [index, item] of group.items.entries()) {
        const existing = await prisma.catalogo_detalle.findFirst({ where: item.codigo ? { id_catalogo: catalog.id_catalogo, codigo: item.codigo } : { id_catalogo: catalog.id_catalogo, nombre: item.nombre } });
        if (!existing) await prisma.catalogo_detalle.create({ data: { id_catalogo: catalog.id_catalogo, nombre: item.nombre, codigo: item.codigo ?? null, descripcion: item.descripcion ?? null, clasificacion_mr: item.clasificacion_mr ?? null, orden: index + 1 } });
      }
    }
    for (const nombre_area of AREAS) await prisma.areas.upsert({ where: { nombre_area }, update: {}, create: { nombre_area } });
    for (const nombre_rol of ROLES) await prisma.roles.upsert({ where: { nombre_rol }, update: {}, create: { nombre_rol } });
    await ContingenciaRepository.ensureCatalogosIniciales();
    return { catalogos: CATALOGOS.length, areas: AREAS.length, roles: ROLES.length };
  }

  static async createInitialAdmin(input: { email?: string | undefined; password?: string | undefined; name?: string | undefined }) {
    const email = input.email?.trim().toLowerCase() ?? '';
    const password = input.password ?? '';
    const name = input.name?.trim() || 'Administrador';
    if (!z.email().safeParse(email).success || email.length > 150) throw new Error('Define INITIAL_ADMIN_EMAIL con un correo válido.');
    if (password.length < 16 || Buffer.byteLength(password, 'utf8') > 72) throw new Error('INITIAL_ADMIN_PASSWORD debe tener al menos 16 caracteres y no superar 72 bytes.');
    if (name.length > 150) throw new Error('INITIAL_ADMIN_NAME supera 150 caracteres.');
    const password_hash = await BcryptHelper.hash(password);
    return prisma.$transaction(async tx => {
      if (await tx.usuarios.count({ where: { roles: { nombre_rol: 'Admin' } } })) throw new Error('Ya existe un administrador. Usa la gestión de usuarios; esta inicialización no cambia contraseñas existentes.');
      if (await tx.usuarios.findFirst({ where: { correo: { equals: email, mode: 'insensitive' } } })) throw new Error('El correo indicado ya pertenece a una cuenta. No se modificó.');
      const role = await tx.roles.upsert({ where: { nombre_rol: 'Admin' }, update: {}, create: { nombre_rol: 'Admin' } });
      const area = await tx.areas.upsert({ where: { nombre_area: 'Operaciones' }, update: {}, create: { nombre_area: 'Operaciones' } });
      return tx.usuarios.create({ data: { codigo_usuario: 'ADMIN-INICIAL', nombre: name, correo: email, password_hash, estado: 'Activo', id_rol: role.id_rol, id_area: area.id_area, debe_cambiar_password: true }, select: { id_usuario: true, correo: true } });
    }, { isolationLevel: 'Serializable' });
  }
}
