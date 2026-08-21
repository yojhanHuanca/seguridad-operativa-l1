import { AuditoriaRepository, type AccionAuditoria, type NuevaAuditoria } from "./auditoria.repository.js";

const ACCIONES_VALIDAS: AccionAuditoria[] = ["crear", "editar", "eliminar", "login", "login_fallido"];

type FiltroQuery = { usuario?: string; tabla?: string; accion?: string; desde?: string; hasta?: string };

function parseFiltros(query: FiltroQuery) {
  const usuario = Number(query.usuario);
  const accion = ACCIONES_VALIDAS.includes(query.accion as AccionAuditoria) ? (query.accion as AccionAuditoria) : undefined;
  return {
    ...(Number.isInteger(usuario) && usuario > 0 ? { usuario } : {}),
    ...(query.tabla ? { tabla: query.tabla } : {}),
    ...(accion ? { accion } : {}),
    ...(query.desde ? { desde: query.desde } : {}),
    ...(query.hasta ? { hasta: query.hasta } : {}),
  };
}

/** Compara dos objetos plano-a-plano y deja solo los campos que cambiaron. */
export function diffCampos(
  antes: Record<string, unknown> | null | undefined,
  despues: Record<string, unknown> | null | undefined
): { antes: Record<string, unknown>; despues: Record<string, unknown> } | null {
  if (!antes || !despues) return null;
  const antesOut: Record<string, unknown> = {};
  const despuesOut: Record<string, unknown> = {};
  for (const key of Object.keys(despues)) {
    const valorAntes = antes[key] ?? null;
    const valorDespues = despues[key] ?? null;
    if (JSON.stringify(valorAntes) !== JSON.stringify(valorDespues)) {
      antesOut[key] = valorAntes;
      despuesOut[key] = valorDespues;
    }
  }
  if (Object.keys(despuesOut).length === 0) return null;
  return { antes: antesOut, despues: despuesOut };
}

function csvEscape(value: unknown): string {
  if (value == null) return "";
  const texto = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/[",\n]/.test(texto)) return `"${texto.replace(/"/g, '""')}"`;
  return texto;
}

export class AuditoriaService {
  static async registrar(n: NuevaAuditoria) {
    return AuditoriaRepository.registrar(n);
  }

  static async list(query: FiltroQuery & { page?: string; limit?: string }) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 30, 100);

    return AuditoriaRepository.findAll({ ...parseFiltros(query), page, limit });
  }

  static async tablas() {
    return AuditoriaRepository.findTablasRegistradas();
  }

  /** CSV con BOM (para que Excel en Windows respete los acentos) de los registros que calzan con el filtro. */
  static async exportarCsv(query: FiltroQuery): Promise<string> {
    const registros = await AuditoriaRepository.findParaExportar(parseFiltros(query));

    const encabezado = ["Fecha", "Usuario", "Cargo", "Acción", "Tabla", "ID registro", "Descripción", "IP", "Datos anteriores", "Datos nuevos"];
    const filas = registros.map((r) =>
      [
        r.fecha?.toISOString() ?? "",
        r.usuarios.nombre,
        r.usuarios.cargo ?? "",
        r.accion,
        r.tabla_afectada,
        r.id_registro ?? "",
        r.descripcion ?? "",
        r.ip ?? "",
        r.datos_previos ?? "",
        r.datos_nuevos ?? "",
      ]
        .map(csvEscape)
        .join(",")
    );

    return "﻿" + [encabezado.join(","), ...filas].join("\n");
  }
}
