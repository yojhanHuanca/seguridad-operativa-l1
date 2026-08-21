import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ReportListItem } from "../types";

async function fetchReportePublico(codigo: string): Promise<ReportListItem> {
  const { data } = await api.get<ApiEnvelope<ReportListItem>>(`/reports/consulta/${encodeURIComponent(codigo)}`);
  if (!data.data) throw new Error("No se encontró ningún reporte con ese código");
  return data.data;
}

/** Consulta pública por código de caso — sin cuenta, sin sesión. */
export function useConsultarReporte(codigo: string | null) {
  return useQuery({
    queryKey: ["reporte-publico", codigo],
    queryFn: () => fetchReportePublico(codigo!),
    enabled: !!codigo,
    retry: false,
  });
}
