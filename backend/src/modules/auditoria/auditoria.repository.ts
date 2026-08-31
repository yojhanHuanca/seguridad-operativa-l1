import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";

/** Los objetos que llegan de Prisma pueden traer `Date`/`Decimal`; esto los deja en JSON puro. */
function aJson(valor: Record<string, unknown>): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(valor)) as Prisma.InputJsonValue;
}

/** Acciones que se registran — mismo vocabulario en todos los módulos. */
export type AccionAuditoria = "crear" | "editar" | "eliminar" | "login" | "login_fallido";

export interface NuevaAuditoria {
  tabla: string;
  id_registro?: number;
  accion: AccionAuditoria;
  descripcion?: string;
  usuario?: number | null;
  ip?: string | null | undefined;
  user_agent?: string | null | undefined;
  /** Estado del registro justo antes/después de la acción — solo en crear/editar. */
  antes?: Record<string, unknown> | null;
  despues?: Record<string, unknown> | null;
}

const SYSTEM_AUDIT_USER = {
  codigo_usuario: "SYS-AUDIT",
  nombre: "Sistema SMS",
  correo: "sistema.auditoria@sms.local",
  cargo: "Auditoría automática",
  estado: "Sistema",
} as const;

async function usuarioAuditoria(usuario?: number | null): Promise<number> {
  if (usuario) return usuario;
  const sistema = await prisma.usuarios.upsert({
    where: { codigo_usuario: SYSTEM_AUDIT_USER.codigo_usuario },
    update: {
      nombre: SYSTEM_AUDIT_USER.nombre,
      correo: SYSTEM_AUDIT_USER.correo,
      cargo: SYSTEM_AUDIT_USER.cargo,
      estado: SYSTEM_AUDIT_USER.estado,
    },
    create: {
      codigo_usuario: SYSTEM_AUDIT_USER.codigo_usuario,
      nombre: SYSTEM_AUDIT_USER.nombre,
      correo: SYSTEM_AUDIT_USER.correo,
      cargo: SYSTEM_AUDIT_USER.cargo,
      estado: SYSTEM_AUDIT_USER.estado,
    },
    select: { id_usuario: true },
  });
  return sistema.id_usuario;
}

export class AuditoriaRepository {
  /**
   * Deja el rastro de una acción. Igual que `NotificationRepository.emitir`:
   * es un efecto secundario de la acción real, no la acción en sí — si
   * escribir el registro falla, se anota en la consola del servidor pero
   * NUNCA se deja que tumbe la acción que se estaba auditando.
   */
  static async registrar(n: NuevaAuditoria): Promise<void> {
    try {
      const usuario = await usuarioAuditoria(n.usuario);
      await prisma.auditoria.create({
        data: {
          tabla_afectada: n.tabla,
          id_registro: n.id_registro ?? null,
          accion: n.accion,
          descripcion: n.descripcion ?? null,
          usuario,
          ip: n.ip ?? null,
          user_agent: n.user_agent ?? null,
          ...(n.antes ? { datos_previos: aJson(n.antes) } : {}),
          ...(n.despues ? { datos_nuevos: aJson(n.despues) } : {}),
        },
      });
    } catch (error) {
      console.error("[auditoria] no se pudo registrar", n.tabla, n.accion, error);
    }
  }

  /** Construye el `where` una sola vez — lo usan el listado paginado y la exportación. */
  private static buildWhere(opts: {
    usuario?: number;
    tabla?: string;
    accion?: AccionAuditoria;
    search?: string;
    desde?: string;
    hasta?: string;
  }): Record<string, unknown> {
    const where: Record<string, unknown> = {};
    if (opts.usuario) where.usuario = opts.usuario;
    if (opts.tabla) where.tabla_afectada = opts.tabla;
    if (opts.accion) where.accion = opts.accion;
    if (opts.search?.trim()) {
      const search = opts.search.trim();
      where.OR = [
        { descripcion: { contains: search, mode: "insensitive" } },
        { tabla_afectada: { contains: search, mode: "insensitive" } },
        { usuarios: { nombre: { contains: search, mode: "insensitive" } } },
        { usuarios: { cargo: { contains: search, mode: "insensitive" } } },
      ];
    }
    if (opts.desde || opts.hasta) {
      where.fecha = {
        ...(opts.desde ? { gte: new Date(`${opts.desde}T00:00:00.000Z`) } : {}),
        ...(opts.hasta ? { lte: new Date(`${opts.hasta}T23:59:59.999Z`) } : {}),
      };
    }
    return where;
  }

  static async findAll(opts: {
    usuario?: number;
    tabla?: string;
    accion?: AccionAuditoria;
    search?: string;
    desde?: string;
    hasta?: string;
    page: number;
    limit: number;
  }) {
    const where = AuditoriaRepository.buildWhere(opts);

    const [data, total] = await Promise.all([
      prisma.auditoria.findMany({
        where,
        include: { usuarios: { select: { nombre: true, cargo: true } } },
        orderBy: { fecha: "desc" },
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
      }),
      prisma.auditoria.count({ where }),
    ]);
    return { data, total };
  }

  /**
   * Igual que `findAll`, sin paginar: para la exportación a CSV. Tope duro de
   * 20 000 filas — un export más grande que eso ya no es "revisar el filtro
   * de hoy", es un caso para pedir un dump directo de la base de datos.
   */
  static async findParaExportar(opts: {
    usuario?: number;
    tabla?: string;
    accion?: AccionAuditoria;
    search?: string;
    desde?: string;
    hasta?: string;
  }) {
    const where = AuditoriaRepository.buildWhere(opts);
    return prisma.auditoria.findMany({
      where,
      include: { usuarios: { select: { nombre: true, cargo: true, codigo_usuario: true } } },
      orderBy: { fecha: "desc" },
      take: 20000,
    });
  }

  /** Nombres de tabla ya usados, para llenar el filtro sin inventar valores que no existen todavía. */
  static async findTablasRegistradas(): Promise<string[]> {
    const filas = await prisma.auditoria.findMany({
      select: { tabla_afectada: true },
      distinct: ["tabla_afectada"],
      orderBy: { tabla_afectada: "asc" },
    });
    return filas.map((f) => f.tabla_afectada);
  }

  /** Conteo por tipo de acción — para la franja de resumen del panel, solo COUNT/groupBy. */
  static async countsByAccion(): Promise<Record<string, number>> {
    const grupos = await prisma.auditoria.groupBy({ by: ["accion"], _count: { accion: true } });
    return Object.fromEntries(grupos.map((g) => [g.accion, g._count.accion]));
  }
}
