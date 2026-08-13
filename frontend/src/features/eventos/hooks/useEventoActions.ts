import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { CreateEventoInput, EventoCreado, UpdateEventoInput } from "../types";

function useEventosMutation<TInput, TOutput>(fn: (input: TInput) => Promise<TOutput>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
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
