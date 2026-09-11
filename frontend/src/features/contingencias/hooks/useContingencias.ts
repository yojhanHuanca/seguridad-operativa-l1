import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contingenciasApi } from "../api";
import type { ContingenciaFiltros, CreateContingenciaDto } from "../types";

export function useContingencias(filtros: ContingenciaFiltros = {}) {
  return useQuery({
    queryKey: ["contingencias", filtros],
    queryFn: () => contingenciasApi.list(filtros),
  });
}

export function useContingencia(id: string | number) {
  return useQuery({
    queryKey: ["contingencia", id],
    queryFn: () => contingenciasApi.getById(id),
    enabled: !!id,
  });
}

export function useContingenciaCatalogos() {
  return useQuery({
    queryKey: ["contingencia-catalogos"],
    queryFn: () => contingenciasApi.getCatalogos(),
  });
}

export function useCreateContingencia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contingenciasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contingencias"] });
    },
  });
}

export function useUpdateContingencia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string | number; dto: CreateContingenciaDto }) =>
      contingenciasApi.update(id, dto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["contingencias"] });
      queryClient.invalidateQueries({ queryKey: ["contingencia", id] });
    },
  });
}

