import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import { exportarTablaExcel } from "@/lib/excelBranded";
import type { AuditoriaItem } from "../types";

export interface AuditoriaParams {
  usuario?: number;
  tabla?: string;
  accion?: string;
  search?: string;
  desde?: string;
  hasta?: string;
  page: number;
  limit: number;
}

export interface AuditoriaPage {
  items: AuditoriaItem[];
  total: number;
}

async function fetchAuditoria(params: AuditoriaParams): Promise<AuditoriaPage> {
  const { data } = await api.get<ApiEnvelope<AuditoriaItem[]>>("/auditoria", {
    params: {
      usuario: params.usuario,
      tabla: params.tabla || undefined,
      accion: params.accion || undefined,
      search: params.search || undefined,
      desde: params.desde || undefined,
      hasta: params.hasta || undefined,
      page: params.page,
      limit: params.limit,
    },
  });
  return { items: data.data ?? [], total: data.meta?.total ?? data.data?.length ?? 0 };
}

export function useAuditoria(params: AuditoriaParams) {
  return useQuery({
    queryKey: ["auditoria", params],
    queryFn: () => fetchAuditoria(params),
  });
}

export function useAuditoriaActores() {
  return useQuery({
    queryKey: ["auditoria-actores"],
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<{ id_usuario: number; nombre: string; codigo_usuario: string; estado: string | null }[]>>("/auditoria/actores");
      return data.data ?? [];
    },
  });
}

export async function exportarAuditoria(params: Omit<AuditoriaParams, "page" | "limit">) {
  // El servidor aplica los filtros y el límite antes de entregar el archivo.
  const { data } = await api.get<string>("/auditoria/export", { params, responseType: "text" });
  const filas = parseCsv(data);
  const [columnas = [], ...datos] = filas;
  if (columnas.length === 0) throw new Error("La exportación no contiene encabezados.");

  await exportarTablaExcel({
    sheetName: "Auditorías",
    columnas,
    filas: datos.map(fila => Object.fromEntries(columnas.map((columna, index) => [columna, fila[index] ?? ""]))),
    title: "Registro de Auditorías",
    subtitle: "Trazabilidad de acciones registradas en SMS L1",
    totalLabel: `${datos.length} registros exportados`,
    fileName: `auditorias_${new Date().toISOString().slice(0, 10)}.xlsx`,
  });
}

/** Lee CSV con comillas, comas y saltos de línea dentro de los campos. */
function parseCsv(csv: string): string[][] {
  const texto = csv.replace(/^\uFEFF/, "");
  const filas: string[][] = [];
  let fila: string[] = [];
  let campo = "";
  let entreComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if (entreComillas) {
      if (caracter === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (caracter === '"') entreComillas = false;
      else campo += caracter;
      continue;
    }
    if (caracter === '"') entreComillas = true;
    else if (caracter === ",") {
      fila.push(campo);
      campo = "";
    } else if (caracter === "\n") {
      fila.push(campo.replace(/\r$/, ""));
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += caracter;
  }

  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo.replace(/\r$/, ""));
    filas.push(fila);
  }
  return filas;
}

async function fetchTablas(): Promise<string[]> {
  const { data } = await api.get<ApiEnvelope<string[]>>("/auditoria/tablas");
  return data.data ?? [];
}

/** Nombres de tabla que ya tienen algún registro — para llenar el filtro. */
export function useAuditoriaTablas() {
  return useQuery({ queryKey: ["auditoria-tablas"], queryFn: fetchTablas });
}

async function fetchAuditoriaCounts(): Promise<Record<string, number>> {
  const { data } = await api.get<ApiEnvelope<Record<string, number>>>("/auditoria/counts");
  return data.data ?? {};
}

/** Cuántos registros hay por tipo de acción — para la franja de resumen, no la tabla. */
export function useAuditoriaCounts() {
  return useQuery({ queryKey: ["auditoria-counts"], queryFn: fetchAuditoriaCounts });
}
