import { useMemo, useState } from "react";
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
  const [targets, setTargets] = useState<Record<number, string>>({});
  const [reason, setReason] = useState("");
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
  const groups = useMemo(() => {
    const map = new Map<number, { id: number; name: string; plans: PendingPlan[] }>();
    for (const plan of pending.data ?? []) {
      const group = map.get(plan.id_area) ?? { id: plan.id_area, name: plan.areas.nombre_area, plans: [] };
      group.plans.push(plan); map.set(group.id, group);
    }
    return [...map.values()];
  }, [pending.data]);
  const candidates = (area: number) => (directory.data ?? []).filter(person =>
    person.id_usuario !== user.id_usuario && person.roles?.nombre_rol === "Jefe de Área" &&
    person.estado === "Activo" && person.id_area === area);
  const mutation = useMutation({
    retry: false,
    mutationFn: async () => {
      const response = await api.post<ApiEnvelope<{ planes: number; actividades: number }>>(`/users/${user.id_usuario}/reassign-plans`, {
        planes: pending.data!.map(plan => plan.id_plan),
        asignaciones: groups.map(group => ({ id_area: group.id, id_usuario: Number(targets[group.id]) })),
        motivo: reason.trim(),
      }, { timeout: 180_000 });
      if (!response.data.data) throw new Error("Consulta los planes para confirmar el resultado antes de volver a intentar.");
      return response.data.data;
    },
    onSuccess: result => {
      for (const key of ["user-pending-plans", "planes", "planes-caso", "planes-paginado", "case", "cases", "auditoria", "notifications", "notificaciones"]) void client.invalidateQueries({ queryKey: [key] });
      toast.success(`${result.planes} planes revisados y responsabilidades reasignadas. Ya puedes guardar el cambio del usuario.`);
      onClose();
    },
    onError: cause => {
      setError(apiErrorMessage(cause, "No se pudo confirmar la reasignación. Actualiza la revisión antes de intentarlo de nuevo."));
      void pending.refetch(); void directory.refetch();
    },
  });
  const loading = pending.isPending || directory.isPending || pending.isFetching || directory.isFetching;
  const loadError = pending.isError || directory.isError;
  const valid = !loading && !loadError && groups.length > 0 && reason.trim().length >= 10 &&
    groups.every(group => candidates(group.id).some(person => String(person.id_usuario) === targets[group.id]));
  return <Modal open title="Reasignar planes pendientes" subtitle={user.nombre} size="lg"
    onClose={() => { if (!mutation.isPending) onClose(); }}
    footer={<><Button variant="ghost" onClick={onClose} disabled={mutation.isPending}>Cancelar</Button><Button disabled={!valid || mutation.isPending} onClick={() => { setError(null); mutation.mutate(); }}>{mutation.isPending ? "Reasignando…" : "Confirmar reasignación"}</Button></>}>
    <p className="text-sm leading-relaxed text-ink-soft">Elige un reemplazo activo de cada área. Se conservarán los estados, avances, fechas, evidencias y actividades terminadas; solo se transferirán las responsabilidades pendientes.</p>
    {loading && <p role="status" className="mt-4 text-sm text-ink-quiet">Revisando planes y reemplazos…</p>}
    {loadError && <div role="alert" className="mt-4 text-sm text-critical"><p>No se pudo completar la revisión. No se realizó ninguna reasignación.</p><Button variant="outline" className="mt-2" onClick={() => { void pending.refetch(); void directory.refetch(); }}>Actualizar revisión</Button></div>}
    {!loading && !loadError && !groups.length && <p className="mt-4 rounded-lg bg-surface p-4 text-sm">Este usuario no tiene responsabilidades pendientes. Puedes cerrar esta ventana y guardar sus cambios.</p>}
    <fieldset disabled={mutation.isPending} className="mt-5 space-y-4">
      {groups.map(group => <div key={group.id} className="rounded-xl border border-line p-4">
        <p className="text-sm font-semibold">{group.name} · {group.plans.length} planes</p>
        <p className="mt-1 break-words text-xs text-ink-quiet">{group.plans.slice(0, 8).map(plan => plan.codigo_plan).join(", ")}{group.plans.length > 8 ? ` y ${group.plans.length - 8} más` : ""}</p>
        <Field className="mt-3" label={`Reemplazo para ${group.name}`} required><Select aria-label={`Reemplazo para ${group.name}`} value={targets[group.id] ?? ""} onChange={event => { const value = event.target.value; setTargets(previous => ({ ...previous, [group.id]: value })); setError(null); }}><option value="">Selecciona al jefe de reemplazo</option>{candidates(group.id).map(person => <option key={person.id_usuario} value={person.id_usuario}>{person.nombre}</option>)}</Select></Field>
        {!loading && !candidates(group.id).length && <p className="mt-2 text-xs text-critical">No hay otro Jefe de Área activo en esta área. Registra o habilita el reemplazo antes de continuar.</p>}
      </div>)}
      {!!groups.length && <Field label="Motivo de la reasignación" required hint="Entre 10 y 1000 caracteres. Quedará en Auditoría y en el caso."><Textarea aria-label="Motivo de la reasignación" value={reason} onChange={event => setReason(event.target.value)} maxLength={1000} rows={3} /></Field>}
    </fieldset>
    {error && <p role="alert" className="mt-4 text-sm text-critical">{error}</p>}
    <p className="mt-5 text-xs leading-relaxed text-ink-quiet">Esta operación no desactiva la cuenta ni cambia su rol. Cuando termine, guarda esos cambios en el formulario del usuario.</p>
  </Modal>;
}
