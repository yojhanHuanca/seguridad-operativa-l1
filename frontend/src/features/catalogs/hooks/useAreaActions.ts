import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useCreateArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nombre_area: string) => {
      const { data } = await api.post("/areas", { nombre_area });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });
}

export function useUpdateArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id_area, nombre_area }: { id_area: number; nombre_area: string }) => {
      const { data } = await api.patch(`/areas/${id_area}`, { nombre_area });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });
}

export function useDeleteArea() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id_area: number) => {
      const { data } = await api.delete(`/areas/${id_area}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });
}
