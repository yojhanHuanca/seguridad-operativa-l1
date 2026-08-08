import { useState } from "react";
import { ClipboardList, Plus, Trash2, Send, FileSearch } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Pill } from "@/design-system/primitives/Pill";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useCreatePlan, useUpdatePlan, type PlanActivityInput } from "@/features/cases/hooks/useCaseActions";
import { puedeModificarPlan } from "@/features/cases/lib/workflow";
import { apiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → PlanStage / PlanForm / PlanDisplay.
function InvBlock({ label, value, tone }: { label: string; value: string; tone?: "critical" }) {
  return (
    <div>
      <p className={cn("text-[11px] font-semibold tracking-wide uppercase mb-1.5", tone === "critical" ? "text-critical-ink" : "text-ink-faint")}>
        {label}
      </p>
      <p className="text-[13.5px] text-ink-soft leading-relaxed">{value}</p>
    </div>
  );
}

function blankActividad(): PlanActivityInput {
  return { descripcion: "", responsable: null, fecha_inicio: "", fecha_fin: "" };
}

export function PlanCard({ caso }: { caso: CaseDetail }) {
  const plan = caso.planes_accion[0];
  const [formOpen, setFormOpen] = useState(!plan);
  // null = crear uno nuevo; id = modificar ese plan precargándolo.
  const [editingId, setEditingId] = useState<number | null>(null);

  const inv = caso.investigacion_caso;
  const editing = editingId != null ? caso.planes_accion.find((p) => p.id_plan === editingId) : undefined;

  return (
    <StageSection
      title="Plan de Acción"
      subtitle={
        plan
          ? "Plan enviado al jefe del área. Pendiente de revisión y aprobación."
          : "Seguridad Operativa crea el Plan de Acción y lo envía al jefe del área."
      }
      icon={<ClipboardList className="h-5 w-5" />}
      action={
        plan ? (
          <Pill tone={plan.catalogo_detalle.nombre === "Aceptado" ? "brand" : "warning"} dot>
            {plan.catalogo_detalle.nombre}
          </Pill>
        ) : (
          <Pill tone="info" dot>Por crear</Pill>
        )
      }
    >
      {plan && !formOpen ? (
        <>
          {inv && (
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">Resumen de la investigación</p>
              <div className="space-y-4">
                <InvBlock label="Descripción de evento" value={inv.hallazgos} />
                <InvBlock label="Causa raíz" value={inv.causa_raiz} tone="critical" />
                <InvBlock label="Conclusiones" value={inv.conclusiones} />
              </div>
            </div>
          )}

          <PlanDisplay
            caso={caso}
            onEdit={(id) => {
              setEditingId(id);
              setFormOpen(true);
            }}
          />

          <div className="mt-4 flex items-center justify-end gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingId(null);
                setFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4" /> Agregar otro plan
            </Button>
          </div>
        </>
      ) : (
        <PlanForm
          caso={caso}
          plan={editing}
          onSubmitted={() => {
            setFormOpen(false);
            setEditingId(null);
          }}
          onCancel={
            plan
              ? () => {
                  setFormOpen(false);
                  setEditingId(null);
                }
              : undefined
          }
        />
      )}
    </StageSection>
  );
}

function PlanDisplay({ caso, onEdit }: { caso: CaseDetail; onEdit: (idPlan: number) => void }) {
  return (
    <div className="space-y-4">
      {caso.planes_accion.map((plan) => (
        <div key={plan.id_plan}>
          <div className="flex items-center justify-end -mb-1">
            {/* Modificar reemplaza las actividades del plan. Una vez que el
                área lo aceptó ya hay avance registrado sobre esas actividades,
                así que la edición se cierra para no borrarlo. */}
            {puedeModificarPlan(plan.catalogo_detalle.nombre) ? (
              <Button variant="outline" size="sm" onClick={() => onEdit(plan.id_plan)}>
                <FileSearch className="h-4 w-4" /> Modificar plan
              </Button>
            ) : (
              <span className="text-[11px] text-ink-faint">
                Plan {plan.catalogo_detalle.nombre.toLowerCase()} por el área: ya no se puede modificar
              </span>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-ink-quiet">Código:</span> <span className="font-medium font-mono">{plan.codigo_plan}</span>
            </div>
            <div>
              <span className="text-ink-quiet">Responsable:</span> <span className="font-medium">{plan.usuarios.nombre}</span>
            </div>
            <div>
              <span className="text-ink-quiet">Área responsable:</span> <span className="font-medium">{plan.areas.nombre_area}</span>
            </div>
            <div>
              <span className="text-ink-quiet">Fecha límite:</span>{" "}
              <span className="font-medium">{formatDate(plan.fecha_reprogramada ?? plan.fecha_plan)}</span>
              {plan.fecha_reprogramada && <span className="text-ink-faint text-xs"> (reprogramada)</span>}
            </div>
            <div>
              <span className="text-ink-quiet">Estado del plan:</span>{" "}
              <span className="font-medium">{plan.catalogo_detalle.nombre}</span>
            </div>
            {plan.observaciones && (
              <div>
                <span className="text-ink-quiet">Observaciones:</span>{" "}
                <span className="font-medium">{plan.observaciones}</span>
              </div>
            )}
          </div>

          {plan.descripcion && (
            <p className="mt-3 text-[13px] text-ink-soft leading-relaxed">{plan.descripcion}</p>
          )}

          <div className="pt-3 mt-3 border-t border-line-soft">
            <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">Actividades del plan</p>
            <div className="space-y-2">
              {plan.actividades_plan.map((it, i) => (
                <div key={it.id_actividad} className="rounded-lg bg-surface border border-line p-3 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-brand-700">ACT-{String(i + 1).padStart(2, "0")}</span>
                    <Pill tone={it.catalogo_detalle?.nombre === "Completado" ? "brand" : "neutral"} dot>
                      {it.catalogo_detalle?.nombre ?? "Pendiente"}
                    </Pill>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-ink-quiet">Responsable:</span> {it.usuarios?.nombre ?? "—"}
                    </div>
                    <div>
                      <span className="text-ink-quiet">Área:</span> {plan.areas.nombre_area}
                    </div>
                    <div>
                      <span className="text-ink-quiet">Inicio:</span> {it.fecha_inicio ? formatDate(it.fecha_inicio) : "—"}
                    </div>
                    <div>
                      <span className="text-ink-quiet">Fin:</span> {it.fecha_fin ? formatDate(it.fecha_fin) : "—"}
                    </div>
                  </div>
                  {it.descripcion && (
                    <div className="mt-2 text-xs">
                      <span className="text-ink-quiet">Descripción:</span> {it.descripcion}
                    </div>
                  )}
                </div>
              ))}
              {plan.actividades_plan.length === 0 && (
                <p className="text-[12.5px] text-ink-quiet">Sin actividades registradas.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanForm({
  caso,
  plan,
  onSubmitted,
  onCancel,
}: {
  caso: CaseDetail;
  /** Si viene, el formulario modifica ese plan precargado en vez de crear uno. */
  plan?: CaseDetail["planes_accion"][number];
  onSubmitted: () => void;
  onCancel?: () => void;
}) {
  const { data: areas } = useAreas();
  const { data: usuarios } = useUsers();
  const createPlan = useCreatePlan(caso.codigo_sop);
  const updatePlan = useUpdatePlan(caso.codigo_sop);
  const esEdicion = !!plan;

  const hoy = new Date().toISOString().slice(0, 10);
  const soloFecha = (v?: string | null) => (v ? v.slice(0, 10) : "");

  const [descripcion, setDescripcion] = useState(plan?.descripcion ?? "");
  const [idArea, setIdArea] = useState(
    plan ? String(plan.areas.id_area) : caso.areas ? String(caso.areas.id_area) : ""
  );
  const [responsable, setResponsable] = useState(plan ? String(plan.usuarios.id_usuario) : "");
  const [fechaPlan, setFechaPlan] = useState(
    plan ? soloFecha(plan.fecha_reprogramada ?? plan.fecha_plan) : new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  );
  const [observaciones, setObservaciones] = useState(plan?.observaciones ?? "");
  const [actividades, setActividades] = useState<PlanActivityInput[]>(
    plan && plan.actividades_plan.length > 0
      ? plan.actividades_plan.map((a) => ({
          descripcion: a.descripcion,
          responsable: a.usuarios?.id_usuario ?? null,
          fecha_inicio: soloFecha(a.fecha_inicio),
          fecha_fin: soloFecha(a.fecha_fin),
        }))
      : [blankActividad()]
  );

  // El plan se revisa antes de salir: una vez enviado, el jefe del área lo ve
  // tal cual, así que conviene confirmar responsables y fechas en una vista
  // de solo lectura en vez de mandarlo directo desde el formulario.
  const [reviewOpen, setReviewOpen] = useState(false);

  const actividadesValidas = actividades.filter((a) => a.descripcion.trim().length >= 3);
  const puedeEnviar =
    descripcion.trim().length >= 5 && !!idArea && !!responsable && !!fechaPlan && actividadesValidas.length > 0;

  const updateActividad = (i: number, patch: Partial<PlanActivityInput>) =>
    setActividades((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

  const nombreArea = (areas ?? []).find((a) => String(a.id_area) === idArea)?.nombre_area ?? "—";
  const nombreUsuario = (id?: number | null) =>
    (usuarios ?? []).find((u) => u.id_usuario === id)?.nombre ?? "Sin asignar";
  const nombreResponsable = (usuarios ?? []).find((u) => String(u.id_usuario) === responsable)?.nombre ?? "—";

  const enviar = () => {
    const payload = {
      descripcion: descripcion.trim(),
      id_area: Number(idArea),
      responsable: Number(responsable),
      fecha_plan: fechaPlan,
      observaciones: observaciones.trim() || undefined,
      actividades: actividadesValidas.map((a) => ({
        descripcion: a.descripcion.trim(),
        responsable: a.responsable ?? null,
        fecha_inicio: a.fecha_inicio || undefined,
        fecha_fin: a.fecha_fin || undefined,
      })),
    };
    const opts = {
      onSuccess: () => {
        toast.success(esEdicion ? "Plan de acción actualizado" : "Plan de acción creado y enviado al jefe del área");
        setReviewOpen(false);
        onSubmitted();
      },
      onError: (e: unknown) =>
        toast.error(apiErrorMessage(e, esEdicion ? "No se pudo actualizar el plan" : "No se pudo crear el plan de acción")),
    };
    if (esEdicion && plan) updatePlan.mutate({ ...payload, id_plan: plan.id_plan }, opts);
    else createPlan.mutate(payload, opts);
  };

  return (
    <div className="space-y-5">
      {/* Bloque 1 — datos generales del plan */}
      <section>
        <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-3 pb-2 border-b border-line-soft">
          Datos del plan
        </p>
        <div className="space-y-4">
          <Field label="Descripción del plan" required>
            <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={2} placeholder="¿Qué acción correctiva se va a ejecutar?" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Área responsable" required>
              <Select value={idArea} onChange={(e) => setIdArea(e.target.value)}>
                <option value="">Seleccione…</option>
                {(areas ?? []).map((a) => (
                  <option key={a.id_area} value={String(a.id_area)}>
                    {a.nombre_area}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Responsable del plan" required>
              <Select value={responsable} onChange={(e) => setResponsable(e.target.value)}>
                <option value="">Seleccione…</option>
                {(usuarios ?? []).map((u) => (
                  <option key={u.id_usuario} value={String(u.id_usuario)}>
                    {u.nombre}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Fecha límite" required>
              <Input type="date" min={hoy} value={fechaPlan} onChange={(e) => setFechaPlan(e.target.value)} />
            </Field>
          </div>

          <Field label="Observaciones" hint="Opcional">
            <Textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows={2} />
          </Field>
        </div>
      </section>

      {/* Bloque 2 — actividades, numeradas y con contador */}
      <section>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-line-soft">
          <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint">
            Actividades del plan
            <span className="ml-2 text-ink-quiet normal-case tracking-normal font-medium">
              {actividadesValidas.length} de {actividades.length} completas
            </span>
          </p>
          <Button variant="outline" size="sm" onClick={() => setActividades((prev) => [...prev, blankActividad()])}>
            <Plus className="h-3.5 w-3.5" /> Agregar actividad
          </Button>
        </div>
        <div className="space-y-2.5">
          {actividades.map((act, i) => (
            <div key={i} className="rounded-lg bg-surface border border-line p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11.5px] font-semibold text-brand-700">
                  ACT-{String(i + 1).padStart(2, "0")}
                </span>
                {!act.descripcion.trim() && (
                  <span className="text-[10.5px] text-ink-faint">Falta la descripción</span>
                )}
              </div>
              <div className="flex items-start gap-2">
                <Textarea
                  rows={1}
                  className="min-h-[40px] flex-1"
                  placeholder="¿Qué se debe hacer?"
                  value={act.descripcion}
                  onChange={(e) => updateActividad(i, { descripcion: e.target.value })}
                />
                {actividades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setActividades((prev) => prev.filter((_, idx) => idx !== i))}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-critical"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <Select
                  className="h-9 text-[12.5px]"
                  value={act.responsable ? String(act.responsable) : ""}
                  onChange={(e) => updateActividad(i, { responsable: e.target.value ? Number(e.target.value) : null })}
                >
                  <option value="">Responsable…</option>
                  {(usuarios ?? []).map((u) => (
                    <option key={u.id_usuario} value={String(u.id_usuario)}>
                      {u.nombre}
                    </option>
                  ))}
                </Select>
                <Input
                  type="date"
                  className="h-9 text-[12.5px]"
                  value={act.fecha_inicio ?? ""}
                  onChange={(e) => updateActividad(i, { fecha_inicio: e.target.value })}
                  title="Fecha de inicio"
                />
                <Input
                  type="date"
                  className="h-9 text-[12.5px]"
                  value={act.fecha_fin ?? ""}
                  onChange={(e) => updateActividad(i, { fecha_fin: e.target.value })}
                  title="Fecha límite"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-3 border-t border-line-soft flex items-center justify-end gap-2">
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button disabled={!puedeEnviar} onClick={() => setReviewOpen(true)}>
          <FileSearch className="h-4 w-4" /> Revisar y {esEdicion ? "guardar" : "enviar"}
        </Button>
      </div>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={esEdicion ? "Revisar cambios del plan" : "Revisar plan antes de enviar"}
        subtitle={`${caso.codigo_sop} · ${actividadesValidas.length} actividad(es) para ${nombreArea}`}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReviewOpen(false)}>
              Seguir editando
            </Button>
            <Button disabled={createPlan.isPending || updatePlan.isPending} onClick={enviar}>
              <Send className="h-4 w-4" /> {esEdicion ? "Guardar cambios" : "Confirmar y enviar al jefe del área"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-line bg-surface/50 p-3.5">
            <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2">Datos del plan</p>
            <p className="text-[13px] text-ink leading-relaxed">{descripcion.trim()}</p>
            <div className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-3 text-[12.5px]">
              <div>
                <span className="text-ink-quiet">Área:</span> <span className="font-medium">{nombreArea}</span>
              </div>
              <div>
                <span className="text-ink-quiet">Responsable:</span> <span className="font-medium">{nombreResponsable}</span>
              </div>
              <div>
                <span className="text-ink-quiet">Fecha límite:</span>{" "}
                <span className="font-medium">{fechaPlan ? formatDate(fechaPlan) : "—"}</span>
              </div>
            </div>
            {observaciones.trim() && (
              <p className="mt-3 pt-3 border-t border-line-soft text-[12.5px] text-ink-soft">
                <span className="text-ink-quiet">Observaciones:</span> {observaciones.trim()}
              </p>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2">
              Actividades ({actividadesValidas.length})
            </p>
            <div className="space-y-2">
              {actividadesValidas.map((a, i) => (
                <div key={i} className="rounded-lg border border-line p-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11.5px] font-semibold text-brand-700 shrink-0">
                      ACT-{String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-[12.5px] text-ink leading-snug">{a.descripcion.trim()}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-quiet">
                    <span>{nombreUsuario(a.responsable)}</span>
                    <span>Inicio: {a.fecha_inicio ? formatDate(a.fecha_inicio) : "—"}</span>
                    <span>Fin: {a.fecha_fin ? formatDate(a.fecha_fin) : "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {actividades.length > actividadesValidas.length && (
            <p className="rounded-lg bg-warning-soft border border-warning/30 p-3 text-[12px] text-warning-ink">
              {actividades.length - actividadesValidas.length} actividad(es) sin descripción no se enviarán.
            </p>
          )}

          {!esEdicion && (
            <p className="text-[11.5px] text-ink-quiet">
              Al confirmar, el plan queda en estado <span className="font-medium text-ink">Enviado</span> y el jefe del
              área debe aceptarlo para que arranque la Ejecución.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
