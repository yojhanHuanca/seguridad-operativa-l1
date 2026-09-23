import { AuditoriaRepository, type AccionAuditoria, type NuevaAuditoria } from "./auditoria.repository.js";
import { isDeepStrictEqual } from "node:util";

export class AuditoriaInputError extends Error {}

const ACCIONES_VALIDAS: AccionAuditoria[] = ["crear", "editar", "eliminar", "login", "login_fallido"];

type FiltroQuery = { usuario?: string; tabla?: string; accion?: string; search?: string; desde?: string; hasta?: string };

function parseFiltros(query: FiltroQuery) {
  for (const value of Object.values(query)) {
    if (value !== undefined && typeof value !== "string") throw new AuditoriaInputError("Los filtros deben ser valores simples.");
  }
  for (const value of [query.desde, query.hasta]) {
    if (value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) {
      throw new AuditoriaInputError("Fecha inválida. Usa AAAA-MM-DD.");
    }
  }
  if (query.desde && query.hasta && query.desde > query.hasta) throw new AuditoriaInputError("La fecha desde no puede ser posterior a hasta.");
  const usuario = Number(query.usuario);
  if (query.usuario && (!Number.isSafeInteger(usuario) || usuario <= 0)) throw new AuditoriaInputError("Usuario inválido.");
  if (query.accion && !ACCIONES_VALIDAS.includes(query.accion as AccionAuditoria)) throw new AuditoriaInputError("Acción inválida.");
  const accion = ACCIONES_VALIDAS.includes(query.accion as AccionAuditoria) ? (query.accion as AccionAuditoria) : undefined;
  return {
    ...(Number.isInteger(usuario) && usuario > 0 ? { usuario } : {}),
    ...(query.tabla ? { tabla: query.tabla } : {}),
    ...(accion ? { accion } : {}),
    ...(query.search ? { search: query.search } : {}),
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
  for (const key of new Set([...Object.keys(antes), ...Object.keys(despues)])) {
    const valorAntes = antes[key] ?? null;
    const valorDespues = despues[key] ?? null;
    if (!isDeepStrictEqual(valorAntes, valorDespues) || Object.hasOwn(antes, key) !== Object.hasOwn(despues, key)) {
      antesOut[key] = valorAntes;
      despuesOut[key] = valorDespues;
    }
  }
  if (Object.keys(despuesOut).length === 0) return null;
  return { antes: antesOut, despues: despuesOut };
}

function csvEscape(value: unknown): string {
  if (value == null) return "";
  const raw = typeof value === "object" ? JSON.stringify(value) : String(value);
  const texto = /^[\s]*[=+@-]/.test(raw) || /^[\t\r\n]/.test(raw) ? `'${raw}` : raw;
  if (/[",\r\n]/.test(texto)) return `"${texto.replace(/"/g, '""')}"`;
  return texto;
}

export class AuditoriaService {
  static async registrar(n: NuevaAuditoria) {
    return AuditoriaRepository.registrar(n);
  }

  static async list(query: FiltroQuery & { page?: string; limit?: string }) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 30);
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100 || !Number.isSafeInteger((page - 1) * limit)) throw new AuditoriaInputError("Paginación inválida.");

    return AuditoriaRepository.findAll({ ...parseFiltros(query), page, limit });
  }

  static async tablas() {
    return AuditoriaRepository.findTablasRegistradas();
  }

  static async actores() {
    return AuditoriaRepository.findActores();
  }

  static async counts() {
    return AuditoriaRepository.countsByAccion();
  }

  /** CSV con BOM (para que Excel en Windows respete los acentos) de los registros que calzan con el filtro. */
  static async exportarCsv(query: FiltroQuery): Promise<string> {
    const registros = await AuditoriaRepository.findParaExportar(parseFiltros(query));
    if (registros.length > 20000) throw new AuditoriaInputError("El resultado supera 20 000 registros. Reduce el rango de fechas o aplica más filtros para exportar.");

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
