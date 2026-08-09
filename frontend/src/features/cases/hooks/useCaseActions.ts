import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

function useCaseMutation<TInput>(codigo: string, fn: (input: TInput) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", codigo] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["planes"] });
    },
  });
}

export interface EvaluateInput {
  id_riesgo: number;
  id_area?: number | null;
  id_responsable?: number | null;
  clasificacion: string;
  peligro?: string | null;
  consecuencia?: string | null;
  observaciones?: string | null;
  requiere_investigacion: boolean;
}

export interface ObservationInput {
  texto: string;
}

export interface RejectInput {
  motivo?: string;
}

export interface RequestInfoInput {
  mensaje: string;
}

export interface RespondInfoInput {
  id_solicitud: number;
  respuesta?: string;
}

export interface RollbackStageInput {
  destino: "Evaluación" | "Investigación";
  motivo: string;
}

export interface InvestigationInput {
  hallazgos: string;
  causa_raiz: string;
  conclusiones: string;
  observaciones?: string;
  investigador?: number | null;
}

export interface PlanActivityInput {
  id_actividad?: number;
  descripcion: string;
  responsable?: number | null;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export interface PlanInput {
  descripcion: string;
  id_area: number;
  responsable: number;
  fecha_plan: string;
  observaciones?: string;
  actividades: PlanActivityInput[];
}

export function useApproveCase(codigo: string) {
  return useCaseMutation<void>(codigo, async () => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/approve`);
    return data;
  });
}

export function useAddObservation(codigo: string) {
  return useCaseMutation<ObservationInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/observation`, input);
    return data;
  });
}

export function useEvaluateCase(codigo: string) {
  return useCaseMutation<EvaluateInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/evaluate`, input);
    return data;
  });
}

export function useRejectCase(codigo: string) {
  return useCaseMutation<RejectInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/reject`, input);
    return data;
  });
}

export function useRequestInfo(codigo: string) {
  return useCaseMutation<RequestInfoInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/request-info`, input);
    return data;
  });
}

export function useRespondInfo(codigo: string) {
  return useCaseMutation<RespondInfoInput>(codigo, async ({ id_solicitud, respuesta }) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/request-info/${id_solicitud}/respond`, { respuesta });
    return data;
  });
}

export function useSaveInvestigation(codigo: string) {
  return useCaseMutation<InvestigationInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/investigation`, input);
    return data;
  });
}

export function useCreatePlan(codigo: string) {
  return useCaseMutation<PlanInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/plans`, input);
    return data;
  });
}

export function useCreatePlans(codigo: string) {
  return useCaseMutation<{ planes: PlanInput[] }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/plans/batch`, input);
    return data;
  });
}

export function useUpdatePlan(codigo: string) {
  return useCaseMutation<PlanInput & { id_plan: number }>(codigo, async ({ id_plan, ...body }) => {
    const { data } = await api.patch(`/cases/planes/${id_plan}`, body);
    return data;
  });
}

export function useCloseCase(codigo: string) {
  return useCaseMutation<{ nota?: string } | void>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/close`, input ?? {});
    return data;
  });
}

/** SO resuelve la ampliación de plazo pedida por el Jefe del Área. */
export function useReviewExtension(codigo: string) {
  return useCaseMutation<{ decision: "aprobada" | "rechazada"; nota?: string }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/extension/review`, input);
    return data;
  });
}

/**
 * SO resuelve la ampliación de un plan específico sin afectar los demás.
 * `fecha_aprobada` (AAAA-MM-DD) permite otorgar un plazo distinto al pedido;
 * omitirla aprueba con la fecha que propuso el área.
 */
export function useReviewPlanExtension(codigo: string) {
  return useCaseMutation<{
    id_plan: number;
    decision: "aprobada" | "rechazada";
    nota?: string;
    fecha_aprobada?: string;
  }>(
    codigo,
    async ({ id_plan, ...input }) => {
      const { data } = await api.post(`/cases/planes/${id_plan}/extension/review`, input);
      return data;
    }
  );
}

/** SO revisa el cierre de un plan finalizado sin cerrar los demás planes del caso. */
export function useReviewFinalPlan(codigo: string) {
  return useCaseMutation<{ id_plan: number; decision: "aprobada" | "rechazada"; nota?: string }>(
    codigo,
    async ({ id_plan, ...input }) => {
      const { data } = await api.post(`/cases/planes/${id_plan}/review-final`, input);
      return data;
    }
  );
}

export function useAddComment(codigo: string) {
  return useCaseMutation<ObservationInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/comment`, input);
    return data;
  });
}

/** Comentario de SO asociado a un plan de acción puntual. */
export function useAddPlanComment(codigo: string) {
  return useCaseMutation<{ id_plan: number; texto: string }>(codigo, async ({ id_plan, texto }) => {
    const { data } = await api.post(`/cases/planes/${id_plan}/comment`, { texto });
    return data;
  });
}

/** Acciones del Jefe del Área (portal propio pendiente; se exponen ya para el ciclo). */
export function useAcceptPlan(codigo: string) {
  return useCaseMutation<{ actor?: string }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/accept-plan`, input ?? {});
    return data;
  });
}

export function useCompleteExecution(codigo: string) {
  return useCaseMutation<{ actor?: string }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/complete-execution`, input ?? {});
    return data;
  });
}

export function useKeepPending(codigo: string) {
  return useCaseMutation<{ nota?: string }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/keep-pending`, input ?? {});
    return data;
  });
}

export function useReopenCase(codigo: string) {
  return useCaseMutation<{ nota?: string }>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/reopen`, input ?? {});
    return data;
  });
}

export function useRollbackCase(codigo: string) {
  return useCaseMutation<RollbackStageInput>(codigo, async (input) => {
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/rollback`, input);
    return data;
  });
}

export function useAddCaseEvidence(codigo: string) {
  return useCaseMutation<File[]>(codigo, async (files) => {
    const form = new FormData();
    for (const f of files) form.append("evidencia", f);
    const { data } = await api.post(`/cases/${encodeURIComponent(codigo)}/evidence`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  });
}

