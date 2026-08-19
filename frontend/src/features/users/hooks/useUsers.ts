import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { UserListItem } from "../types";

async function fetchUsers(): Promise<UserListItem[]> {
  const { data } = await api.get<ApiEnvelope<UserListItem[]>>("/users");
  return data.data ?? [];
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
}
