import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CreateUserInput, UpdateUserInput } from "../types";

function useUsersMutation<TInput>(fn: (input: TInput) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Claves aparte porque react-query invalida por prefijo exacto del
      // arreglo: ["users"] no cubre ["users-paginado", ...] ni
      // ["user-counts"] al ser un string distinto, no un elemento más.
      queryClient.invalidateQueries({ queryKey: ["users-paginado"] });
      queryClient.invalidateQueries({ queryKey: ["user-counts"] });
    },
  });
}

export function useCreateUser() {
  return useUsersMutation<CreateUserInput>(async (input) => {
    const { data } = await api.post("/users", input);
    return data;
  });
}

export function useUpdateUser() {
  return useUsersMutation<UpdateUserInput>(async ({ id_usuario, ...body }) => {
    const { data } = await api.patch(`/users/${id_usuario}`, body);
    return data;
  });
}
