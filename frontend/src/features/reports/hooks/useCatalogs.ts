import { useQuery } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CatalogGroup } from "../types";

async function fetchCatalogs(): Promise<CatalogGroup[]> {
  const { data } = await api.get<ApiEnvelope<CatalogGroup[]>>("/catalogs");
  return data.data ?? [];
}

/** Todos los catálogos, indexados por nombre de grupo para consumo directo (ej. catalogsByName["Área"]). */
export function useCatalogs() {
  const query = useQuery({ queryKey: ["catalogs"], queryFn: fetchCatalogs });

  const byName = new Map<string, CatalogGroup>();
  for (const group of query.data ?? []) byName.set(group.nombre, group);

  return { ...query, byName };
}
