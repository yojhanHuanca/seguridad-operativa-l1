import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { Area } from "../types";

async function fetchAreas(): Promise<Area[]> {
  const { data } = await api.get<ApiEnvelope<Area[]>>("/areas");
  return data.data ?? [];
}

export function useAreas() {
  return useQuery({ queryKey: ["areas"], queryFn: fetchAreas });
}
