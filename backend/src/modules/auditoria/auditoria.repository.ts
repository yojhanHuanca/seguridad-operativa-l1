import prisma from "../../lib/prisma.js";

/** Acciones que se registran — mismo vocabulario en todos los módulos. */
export type AccionAuditoria = "crear" | "editar" | "eliminar" | "login" | "login_fallido";

export interface NuevaAuditoria {
  tabla: string;
  id_registro?: number;
  accion: AccionAuditoria;
  descripcion?: string;
  usuario: number;
  ip?: string | null | undefined;
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
      await prisma.auditoria.create({
        data: {
          tabla_afectada: n.tabla,
          id_registro: n.id_registro ?? null,
          accion: n.accion,
          descripcion: n.descripcion ?? null,
          usuario: n.usuario,
          ip: n.ip ?? null,
        },
      });
    } catch (error) {
      console.error("[auditoria] no se pudo registrar", n.tabla, n.accion, error);
    }
  }

  static async findAll(opts: {
    usuario?: number;
    tabla?: string;
    desde?: string;
    hasta?: string;
    page: number;
    limit: number;
  }) {
    const where: Record<string, unknown> = {};
    if (opts.usuario) where.usuario = opts.usuario;
    if (opts.tabla) where.tabla_afectada = opts.tabla;
    if (opts.desde || opts.hasta) {
      where.fecha = {
        ...(opts.desde ? { gte: new Date(`${opts.desde}T00:00:00.000Z`) } : {}),
        ...(opts.hasta ? { lte: new Date(`${opts.hasta}T23:59:59.999Z`) } : {}),
      };
    }

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

  /** Nombres de tabla ya usados, para llenar el filtro sin inventar valores que no existen todavía. */
  static async findTablasRegistradas(): Promise<string[]> {
    const filas = await prisma.auditoria.findMany({
      select: { tabla_afectada: true },
      distinct: ["tabla_afectada"],
      orderBy: { tabla_afectada: "asc" },
    });
    return filas.map((f) => f.tabla_afectada);
  }
}
