import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type ApiEnvelope } from "@/lib/api";
import type { PlanItem } from "../types";

async function fetchPlans(area?: number): Promise<PlanItem[]> {
  const { data } = await api.get<ApiEnvelope<PlanItem[]>>("/cases/planes", { params: { area } });
  return data.data ?? [];
}

export function usePlans(area?: number) {
  return useQuery({ queryKey: ["planes", area ?? null], queryFn: () => fetchPlans(area) });
}

/** Invalida planes + casos, porque toda acción del Jefe mueve la etapa del caso. */
function usePlanMutation<TInput>(fn: (input: TInput) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planes"] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["case"] });
    },
  });
}

export function useUpdateActivity() {
  return usePlanMutation<{ id_actividad: number; estado: string; comentario?: string; actor?: string }>(
    async ({ id_actividad, ...body }) => {
      const { data } = await api.patch(`/cases/actividades/${id_actividad}`, body);
      return data;
    }
  );
}


export function useAcceptPlanById() {
  return usePlanMutation<{ id_plan: number; actor?: string }>(async ({ id_plan, actor }) => {
    const { data } = await api.post(`/cases/planes/${id_plan}/accept`, { actor });
    return data;
  });
}

export function useCompleteExecutionByPlan() {
  return usePlanMutation<{ id_plan: number; actor?: string; descripcion: string }>(async ({ id_plan, actor, descripcion }) => {
    const { data } = await api.post(`/cases/planes/${id_plan}/complete-execution`, { actor, descripcion });
    return data;
  });
}

export function useAddPlanEvidence() {
  return usePlanMutation<{ id_plan: number; files: File[]; actor?: string }>(async ({ id_plan, files, actor }) => {
    const form = new FormData();
    for (const file of files) form.append("evidencia", file);
    if (actor) form.append("actor", actor);
    const { data } = await api.post(`/cases/planes/${id_plan}/evidence`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  });
}

export function useRequestPlanExtension() {
  return usePlanMutation<{ id_plan: number; nueva_fecha: string; justificacion: string; actor?: string }>(
    async ({ id_plan, ...body }) => {
      const { data } = await api.post(`/cases/planes/${id_plan}/extension`, body);
      return data;
    }
  );
}
export function useAcceptPlanByCase() {
  return usePlanMutation<{ codigo: string; actor?: string }>(async ({ codigo, actor }) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/accept-plan`, { actor });
    return data;
  });
}

export function useCompleteExecutionByCase() {
  return usePlanMutation<{ codigo: string; actor?: string }>(async ({ codigo, actor }) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/complete-execution`, { actor });
    return data;
  });
}

export function useRequestExtension() {
  return usePlanMutation<{ codigo: string; nueva_fecha: string; justificacion: string; actor?: string }>(
    async ({ codigo, ...body }) => {
      const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/extension`, body);
      return data;
    }
  );
}

