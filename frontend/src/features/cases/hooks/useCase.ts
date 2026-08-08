import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CaseDetail } from "../types";

async function fetchCase(codigo: string): Promise<CaseDetail> {
  const { data } = await api.get<ApiEnvelope<CaseDetail>>(`/cases/${encodeURIComponent(codigo)}`);
  if (!data.data) throw new Error(data.message);
  return data.data;
}

export function useCase(codigo: string) {
  return useQuery({
    queryKey: ["case", codigo],
    queryFn: () => fetchCase(codigo),
    enabled: !!codigo,
  });
}
