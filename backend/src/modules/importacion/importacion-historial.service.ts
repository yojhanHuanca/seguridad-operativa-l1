import prisma from "../../lib/prisma.js";
import { AuditoriaRepository } from "../auditoria/auditoria.repository.js";

export type ModuloImportacion = "casos" | "monitoreo" | "contingencias";

export class ImportacionHistorialService {
  static iniciar(modulo: ModuloImportacion, archivo: string, usuario: number, filas: number, hoja?: string | null) {
    return prisma.importaciones.create({ data: { modulo, archivo: archivo || "Sin nombre", hoja: hoja || null, usuario, filas_total: filas } });
  }

  static completar(id: number, data: { importados: number; duplicados: number; errores: number; resumen?: object }) {
    return prisma.importaciones.update({
      where: { id_importacion: id },
      data: { ...data, resumen: data.resumen ?? undefined, estado: data.errores > 0 ? "completado_con_errores" : "completado", completed_at: new Date() },
    });
  }

  static fallar(id: number, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return prisma.importaciones.update({ where: { id_importacion: id }, data: { estado: "fallido", errores: 1, resumen: { error: message.slice(0, 500) }, completed_at: new Date() } });
  }

  static async listar(page = 1, limit = 20) {
    const safePage = Math.max(1, Math.trunc(page));
    const safeLimit = Math.min(100, Math.max(1, Math.trunc(limit)));
    const [items, total] = await prisma.$transaction([
      prisma.importaciones.findMany({
        select: { id_importacion: true, modulo: true, archivo: true, hoja: true, estado: true, filas_total: true, importados: true, duplicados: true, errores: true, created_at: true, completed_at: true, reverted_at: true, creador: { select: { id_usuario: true, nombre: true } }, reversor: { select: { id_usuario: true, nombre: true } } },
        orderBy: { created_at: "desc" }, skip: (safePage - 1) * safeLimit, take: safeLimit,
      }),
      prisma.importaciones.count(),
    ]);
    return { items, total, page: safePage, limit: safeLimit };
  }

  static async revertir(id: number, usuario: number, motivo: string, ip: string | null) {
    const resultado = await prisma.$transaction(async (tx: typeof prisma) => {
      const carga = await tx.importaciones.findUnique({ where: { id_importacion: id } });
      if (!carga) throw new Error("La importación no existe.");
      if (!carga.estado.startsWith("completado") || carga.reverted_at) throw new Error("Esta importación no se puede revertir.");

      if (carga.modulo === "monitoreo") {
        const usados = await tx.eventos_monitoreo.count({ where: { id_importacion: id, OR: [{ asignado_a: { not: null } }, { id_caso_creado: { not: null } }] } });
        if (usados > 0) throw new Error("No se puede revertir: algunos eventos ya fueron asignados o convertidos en casos.");
      }

      const eliminados = carga.modulo === "casos"
        ? (await tx.casos_sop.deleteMany({ where: { id_importacion: id } })).count
        : carga.modulo === "monitoreo"
          ? (await tx.eventos_monitoreo.deleteMany({ where: { id_importacion: id } })).count
          : (await tx.contingencia_eventos.deleteMany({ where: { id_importacion: id } })).count;

      await tx.importaciones.update({ where: { id_importacion: id }, data: { estado: "revertido", reverted_at: new Date(), reverted_by: usuario, motivo_reversion: motivo } });
      return { eliminados, modulo: carga.modulo, archivo: carga.archivo };
    }, { timeout: 30_000 });

    await AuditoriaRepository.registrar({ tabla: "importacion_historica", accion: "eliminar", usuario, ip, descripcion: `Importación ${id} revertida: ${resultado.eliminados} registro(s) eliminados de ${resultado.modulo}. Archivo: ${resultado.archivo}. Motivo: ${motivo}` });
    return resultado;
  }
}
