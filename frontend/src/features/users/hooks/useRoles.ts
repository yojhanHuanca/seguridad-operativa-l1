import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { Role } from "../types";

async function fetchRoles(): Promise<Role[]> {
  const { data } = await api.get<ApiEnvelope<Role[]>>("/roles");
  return data.data ?? [];
}

export function useRoles() {
  return useQuery({ queryKey: ["roles"], queryFn: fetchRoles });
}
