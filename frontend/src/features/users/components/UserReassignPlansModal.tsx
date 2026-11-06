import { useState } from "react";
import { useClearDraft, useDraftState } from "@/features/drafts/useDraftState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { Field, Select, Textarea } from "@/design-system/primitives/Input";
import { api, apiErrorMessage, type ApiEnvelope } from "@/lib/api";
import type { UserBasic } from "../types";

interface PendingPlan {
  id_plan: number; codigo_plan: string; id_area: number;
  areas: { nombre_area: string };
  actividades_plan: { id_actividad: number }[];
}

export function UserReassignPlansModal({ user, onClose }: { user: { id_usuario: number; nombre: string }; onClose: () => void }) {
  const scope = `user-handover:${user.id_usuario}:`;
  const clearDraft = useClearDraft(scope);
  const [targets, setTargets] = useDraftState<Record<number, string>>(scope + "targets", {});
  const [selected, setSelected] = useDraftState<Record<number, boolean>>(scope + "selected", {});
  const [bulkTarget, setBulkTarget] = useState("");
  const [reason, setReason] = useDraftState(scope + "reason", "");
  const [error, setError] = useState<string | null>(null);
  const client = useQueryClient();
  const pending = useQuery({
    queryKey: ["user-pending-plans", user.id_usuario], staleTime: 0, refetchOnMount: "always",
    queryFn: async () => {
      const response = await api.get<ApiEnvelope<PendingPlan[]>>(`/users/${user.id_usuario}/pending-plans`);
      if (!Array.isArray(response.data.data)) throw new Error("No se pudieron revisar los planes pendientes.");
      return response.data.data;
    },
  });
  const directory = useQuery({
    queryKey: ["user-handover-targets"], staleTime: 0,
    queryFn: async () => {
      const response = await api.get<ApiEnvelope<UserBasic[]>>("/users/basicos");
      if (!Array.isArray(response.data.data)) throw new Error("No se pudieron cargar los jefes disponibles.");
      return response.data.data;
    },
  });
  const plans = pending.data ?? [];
  const selectedPlans = plans.filter(plan => selected[plan.id_plan]);
  const candidates = () => (directory.data ?? []).filter(person =>
    person.id_usuario !== user.id_usuario && person.roles?.nombre_rol === "Jefe de Área" &&
    person.estado === "Activo");
  const mutation = useMutation({
    retry: false,
    mutationFn: async () => {
      const response = await api.post<ApiEnvelope<{ planes: number; actividades: number; pendientesRestantes: number; correosEnviados: number; correosFallidos: number }>>(`/users/${user.id_usuario}/reassign-plans`, {
        planes: selectedPlans.map(plan => plan.id_plan),
        asignaciones: selectedPlans.map(plan => ({ id_plan: plan.id_plan, id_usuario: Number(targets[plan.id_plan]) })),
        motivo: reason.trim(),
      }, { timeout: 180_000 });
      if (!response.data.data) throw new Error("Consulta los planes para confirmar el resultado antes de volver a intentar.");
      return response.data.data;
    },
    onSuccess: result => {
      clearDraft();
      for (const key of ["user-pending-plans", "planes", "planes-caso", "planes-paginado", "case", "cases", "auditoria", "notifications", "notificaciones"]) void client.invalidateQueries({ queryKey: [key] });
      toast.success(`${result.planes} plan(es) reasignado(s). ${result.pendientesRestantes ? `Quedan ${result.pendientesRestantes} con el jefe actual.` : "Ya puedes guardar el cambio del usuario."}`);
      if (result.correosFallidos) toast.warning(`${result.correosFallidos} correo(s) no pudieron enviarse. La reasignación sí quedó guardada.`);
      onClose();
    },
    onError: cause => {
      setError(apiErrorMessage(cause, "No se pudo confirmar la reasignación. Actualiza la revisión antes de intentarlo de nuevo."));
      void pending.refetch(); void directory.refetch();
    },
  });
  const loading = pending.isPending || directory.isPending || pending.isFetching || directory.isFetching;
  const loadError = pending.isError || directory.isError;
  const valid = !loading && !loadError && selectedPlans.length > 0 && reason.trim().length >= 10 && reason.trim().length <= 1000 &&
    selectedPlans.every(plan => candidates().some(person => String(person.id_usuario) === targets[plan.id_plan]));
  const allSelected = plans.length > 0 && selectedPlans.length === plans.length;
  return <Modal open title="Reasignar planes pendientes" subtitle={user.nombre} size="lg"
    onClose={() => { if (!mutation.isPending) onClose(); }}
    footer={<><Button variant="ghost" onClick={onClose} disabled={mutation.isPending}>Cancelar</Button><Button disabled={!valid || mutation.isPending} onClick={() => { setError(null); mutation.mutate(); }}>{mutation.isPending ? "Reasignando…" : "Confirmar reasignación"}</Button></>}>
    <p className="text-sm leading-relaxed text-ink-soft">Selecciona uno o varios planes pendientes. Puedes asignar cada uno a un Jefe de Área activo de cualquier área, o seleccionar todos y aplicar un mismo reemplazo. Los planes no seleccionados seguirán con el jefe actual.</p>
    {loading && <p role="status" className="mt-4 text-sm text-ink-quiet">Revisando planes y reemplazos…</p>}
    {loadError && <div role="alert" className="mt-4 text-sm text-critical"><p>No se pudo completar la revisión. No se realizó ninguna reasignación.</p><Button variant="outline" className="mt-2" onClick={() => { void pending.refetch(); void directory.refetch(); }}>Actualizar revisión</Button></div>}
    {!loading && !loadError && !plans.length && <p className="mt-4 rounded-lg bg-surface p-4 text-sm">Este usuario no tiene responsabilidades pendientes. Puedes cerrar esta ventana y guardar sus cambios.</p>}
    <fieldset disabled={mutation.isPending} className="mt-5 space-y-4">
      {!!plans.length && <div className="rounded-xl border border-line bg-surface p-4 space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={allSelected} onChange={event => setSelected(Object.fromEntries(plans.map(plan => [plan.id_plan, event.target.checked])))} />Seleccionar todos los planes ({plans.length})</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select aria-label="Jefe para los planes seleccionados" value={bulkTarget} onChange={event => setBulkTarget(event.target.value)}><option value="">Jefe para los planes seleccionados</option>{candidates().map(person => <option key={person.id_usuario} value={person.id_usuario}>{person.nombre} · {person.areas?.nombre_area ?? "Sin área asignada"}</option>)}</Select>
          <Button variant="outline" disabled={!selectedPlans.length || !bulkTarget} onClick={() => setTargets(previous => ({ ...previous, ...Object.fromEntries(selectedPlans.map(plan => [plan.id_plan, bulkTarget])) }))}>Aplicar a seleccionados</Button>
        </div>
      </div>}
      {plans.map(plan => <div key={plan.id_plan} className="rounded-xl border border-line p-4">
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={Boolean(selected[plan.id_plan])} onChange={event => { setSelected(previous => ({ ...previous, [plan.id_plan]: event.target.checked })); setError(null); }} />{plan.codigo_plan}</label>
        <p className="mt-1 text-xs text-ink-quiet">Área del plan: {plan.areas.nombre_area} · {plan.actividades_plan.length} actividad(es) pendiente(s)</p>
        {selected[plan.id_plan] && <Field className="mt-3" label={`Reemplazo para ${plan.codigo_plan}`} required><Select aria-label={`Reemplazo para ${plan.codigo_plan}`} value={targets[plan.id_plan] ?? ""} onChange={event => { setTargets(previous => ({ ...previous, [plan.id_plan]: event.target.value })); setError(null); }}><option value="">Selecciona al jefe de reemplazo</option>{candidates().map(person => <option key={person.id_usuario} value={person.id_usuario}>{person.nombre} · {person.areas?.nombre_area ?? "Sin área asignada"}</option>)}</Select></Field>}
      </div>)}
      {!!plans.length && !loading && !candidates().length && <p className="text-xs text-critical">No hay otro Jefe de Área activo disponible. Registra o habilita el reemplazo antes de continuar.</p>}
      {!!plans.length && <Field label="Motivo de la reasignación" required hint="Entre 10 y 1000 caracteres. Quedará en Auditoría y en el caso."><Textarea aria-label="Motivo de la reasignación" value={reason} onChange={event => setReason(event.target.value)} maxLength={1000} rows={3} /></Field>}
    </fieldset>
    {error && <p role="alert" className="mt-4 text-sm text-critical">{error}</p>}
    <p className="mt-5 text-xs leading-relaxed text-ink-quiet">Reasignar solo algunos planes no permite desactivar ni cambiar el rol o área del jefe mientras conserve responsabilidades pendientes. Cada reemplazo recibirá una notificación y un correo por plan.</p>
  </Modal>;
}
