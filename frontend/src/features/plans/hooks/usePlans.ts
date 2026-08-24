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

/**
 * Planes de un caso puntual — antes `PlanDetail.tsx` pedía TODOS los planes
 * del área y los filtraba en el navegador buscando el código del caso, un
 * rodeo que además traía de más. Esta pide solo lo que hace falta.
 */
async function fetchPlansByCase(codigo: string): Promise<PlanItem[]> {
  const { data } = await api.get<ApiEnvelope<PlanItem[]>>("/cases/planes", { params: { codigo } });
  return data.data ?? [];
}

export function usePlansByCase(codigo: string) {
  return useQuery({
    queryKey: ["planes-caso", codigo],
    queryFn: () => fetchPlansByCase(codigo),
    enabled: !!codigo,
  });
}

/** Invalida planes + casos, porque toda acción del Jefe mueve la etapa del caso. */
function usePlanMutation<TInput>(fn: (input: TInput) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planes"] });
      queryClient.invalidateQueries({ queryKey: ["planes-caso"] });
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
  return usePlanMutation<{ id_plan: number; actor?: string; descripcion: string; comentario?: string }>(
    async ({ id_plan, actor, descripcion, comentario }) => {
      const { data } = await api.post(`/cases/planes/${id_plan}/complete-execution`, { actor, descripcion, comentario });
      return data;
    }
  );
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

/**
 * Actualización adicional sobre un plan ya cerrado por el área: descripción
 * nueva y evidencias nuevas, sin tocar lo ya registrado.
 */
export function useAddPlanUpdate() {
  return usePlanMutation<{ id_plan: number; descripcion: string; files: File[]; actor?: string }>(
    async ({ id_plan, descripcion, files, actor }) => {
      const form = new FormData();
      form.append("descripcion", descripcion);
      for (const file of files) form.append("evidencia", file);
      if (actor) form.append("actor", actor);
      const { data } = await api.post(`/cases/planes/${id_plan}/actualizacion`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    }
  );
}

/** El jefe quita una evidencia equivocada antes de enviar el cierre a SO. */
export function useRemovePlanEvidence() {
  return usePlanMutation<{ id_plan: number; id_anexo: number; actor?: string }>(async ({ id_plan, id_anexo, actor }) => {
    const { data } = await api.delete(`/cases/planes/${id_plan}/evidence/${id_anexo}`, { data: { actor } });
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

