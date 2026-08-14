import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ReportFormValues } from "../schema";
import type { CreateReportResult, ReportOrigin } from "../types";

interface CreateReportInput {
  /**
   * Los mismos campos siempre. `origen` solo le dice al backend quién firma el
   * caso en la bitácora: el trabajador desde el wizard, o el analista desde el
   * panel de Seguridad Operativa. Si se omite, el backend asume "reportante".
   */
  values: ReportFormValues & { origen?: ReportOrigin; id_evento_monitoreo?: number };
  files: File[];
}

async function createReport({ values, files }: CreateReportInput): Promise<CreateReportResult> {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, String(value));
    }
  }
  for (const file of files) form.append("evidencia", file);

  const { data } = await api.post<ApiEnvelope<CreateReportResult>>("/reports", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (!data.data) throw new Error(data.message);
  return data.data;
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      // El caso entra a la bandeja de SO y dispara su aviso: sin esto, el
      // reporte recién creado desde el panel no aparecía en la lista ni en los
      // contadores del menú hasta recargar.
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      // Si el hallazgo vino de "Eventos asignados", esa tarjeta pasa a
      // mostrar "Ver hallazgo" apenas se crea el caso.
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
}
