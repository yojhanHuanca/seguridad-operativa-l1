import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ReportFormValues } from "../schema";
import type { CreateReportResult } from "../types";

interface CreateReportInput {
  values: ReportFormValues;
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
    },
  });
}
