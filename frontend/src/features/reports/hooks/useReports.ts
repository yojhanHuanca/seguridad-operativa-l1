import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { ReportListItem } from "../types";

async function fetchReports(): Promise<ReportListItem[]> {
  const { data } = await api.get<ApiEnvelope<ReportListItem[]>>("/reports");
  return data.data ?? [];
}

export function useReports(options?: { enabled?: boolean }) {
  return useQuery({ queryKey: ["reports"], queryFn: fetchReports, enabled: options?.enabled ?? true });
}
