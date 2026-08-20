import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CreateEventoInput, EventoCreado, UpdateEventoInput } from "../types";

function useEventosMutation<TInput, TOutput>(fn: (input: TInput) => Promise<TOutput>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      // Claves aparte porque react-query invalida por prefijo exacto del
      // arreglo: ["eventos"] no cubre ["eventos-paginado", ...] ni
      // ["evento-counts"] al ser un string distinto, no un elemento más.
      queryClient.invalidateQueries({ queryKey: ["eventos-paginado"] });
      queryClient.invalidateQueries({ queryKey: ["evento-counts"] });
    },
  });
}

export function useCreateEvento() {
  return useEventosMutation<CreateEventoInput, EventoCreado | undefined>(async (input) => {
    const { data } = await api.post<ApiEnvelope<EventoCreado>>("/eventos", input);
    return data.data;
  });
}

export function useUpdateEvento() {
  return useEventosMutation<UpdateEventoInput, unknown>(async ({ id_evento, ...body }) => {
    const { data } = await api.patch(`/eventos/${id_evento}`, body);
    return data;
  });
}

export function useDeleteEvento() {
  return useEventosMutation<number, unknown>(async (id_evento) => {
    const { data } = await api.delete(`/eventos/${id_evento}`);
    return data;
  });
}

export function useAsignarEvento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id_evento, id_usuario }: { id_evento: number; id_usuario: number }) => {
      const { data } = await api.patch<ApiEnvelope<{ id_usuario: number; nombre: string }>>(
        `/eventos/${id_evento}/asignar`,
        { id_usuario }
      );
      if (!data.data) throw new Error(data.message);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
      queryClient.invalidateQueries({ queryKey: ["eventos-paginado"] });
      queryClient.invalidateQueries({ queryKey: ["evento-counts"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
