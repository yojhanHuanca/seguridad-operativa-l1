import { useState } from "react";
import { BriefcaseBusiness, ClipboardList, Plus, Rocket, Search, Send, Trash2, UserRound, FileSearch } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Modal } from "@/design-system/primitives/Modal";
import { Pill, RiskPill } from "@/design-system/primitives/Pill";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { StageSection } from "@/features/cases/components/CaseParts";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useCreatePlans, useStartExecution, useUpdatePlan, type PlanActivityInput } from "@/features/cases/hooks/useCaseActions";
import { encodeActivityDescription, parseActivityDescription } from "@/features/cases/lib/activityMeta";
import { shortPlanCode } from "@/features/cases/lib/planLabels";
import { planTomadoPorArea, puedeModificarPlan } from "@/features/cases/lib/workflow";
import { apiErrorMessage } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StageRollbackButton } from "./StageRollbackButton";
import type { CaseDetail } from "@/features/cases/types";
import type { UserListItem } from "@/features/users/types";
import type { RiskLevel } from "@/features/cases/domain";

// Portado de pages/seguridad/CaseFile.tsx → PlanStage / PlanForm / PlanDisplay.
const TIPOS_ACCION = ["Correctiva", "Preventiva", "Mitigación", "Mejora continua"];

interface PlanFormActivityInput extends PlanActivityInput {
  id_actividad?: number;
  tipo_accion: string;
  id_area: string;
}

function InvBlock({ label, value, tone }: { label: string; value: string; tone?: "critical" }) {
  return (
    <div>
      <p className={cn("text-[11px] font-semibold tracking-wide uppercase mb-1.5", tone === "critical" ? "text-critical-ink" : "text-ink-faint")}>
        {label}
      </p>
      <p className="text-[13.5px] text-ink-soft leading-relaxed break-words">{value}</p>
    </div>
  );
}

function blankActividad(idArea = ""): PlanFormActivityInput {
  return {
    descripcion: "",
    responsable: null,
    fecha_inicio: new Date().toISOString().slice(0, 10),
    fecha_fin: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    tipo_accion: TIPOS_ACCION[0],
    id_area: idArea,
  };
}

function ResponsableSearch({
  value,
  users,
  onChange,
}: {
  value?: number | null;
  users: UserListItem[];
  onChange: (id: number | null) => void;
}) {
  const [query, setQuery] = useState("");
  const selected = users.find((u) => u.id_usuario === value);
  const q = query.trim().toLowerCase();
  const results = q
    ? users
        .filter((u) => `${u.nombre} ${u.cargo ?? ""} ${u.codigo_usuario}`.toLowerCase().includes(q))
        .slice(0, 6)
    : [];

  return (
    <div className="space-y-2">
      <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-white px-3 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/15">
        <Search className="h-4 w-4 shrink-0 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={selected ? "Buscar otro responsable..." : "Buscar por nombre, cargo o código..."}
          className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-ink-faint"
        />
      </div>

      {selected && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-brand-100 bg-brand-50/70 p-3">
          <div className="flex min-w-0 items-start gap-2.5">
            <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-brand-900">{selected.nombre}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-brand-800/80">
                <BriefcaseBusiness className="h-3.5 w-3.5" /> {selected.cargo || "Cargo no registrado"}
              </p>
            </div>
          </div>
          <button type="button" onClick={() => onChange(null)} className="text-[11.5px] font-medium text-brand-700 hover:text-brand-900">
            Quitar
          </button>
        </div>
      )}

      {q && results.length > 0 && (
        <div className="max-h-56 overflow-auto rounded-lg border border-line bg-white shadow-sm">
          {results.map((u) => (
            <button
              key={u.id_usuario}
              type="button"
              onClick={() => {
                onChange(u.id_usuario);
                setQuery("");
              }}
              className="flex w-full items-start gap-2.5 border-b border-line-soft px-3 py-2.5 text-left last:border-b-0 hover:bg-surface"
            >
              <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-ink">{u.nombre}</span>
                <span className="block truncate text-[11.5px] text-ink-quiet">{u.cargo || "Cargo no registrado"} · {u.codigo_usuario}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {q && results.length === 0 && <p className="text-[12px] text-ink-faint">Sin resultados para “{query}”.</p>}
    </div>
  );
}

export function PlanCard({ caso }: { caso: CaseDetail }) {
  const plan = caso.planes_accion[0];
  const [formOpen, setFormOpen] = useState(!plan);
  // null = crear uno nuevo; id = modificar ese plan precargándolo.
  const [editingId, setEditingId] = useState<number | null>(null);

  const inv = caso.investigacion_caso;
  const riesgo = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const risk = riesgo?.codigo as RiskLevel | undefined;
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
        <div className="flex items-center gap-2">
          {plan ? (
            <Pill tone={plan.catalogo_detalle.nombre === "Aceptado" ? "brand" : "warning"} dot>
              {plan.catalogo_detalle.nombre}
            </Pill>
          ) : (
            <Pill tone="info" dot>Por crear</Pill>
          )}
          <StageRollbackButton
            codigo={caso.codigo_sop}
            destino="Investigación"
            label="Volver a Investigación"
            title="Volver a investigación"
            description="El caso regresará a Investigación para corregir o completar hallazgos, causa raíz y conclusiones. Los planes de acción ya cargados se mantienen guardados."
          />
        </div>
      }
    >
      {plan && !formOpen ? (
        <>
          {inv && (
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">Resumen de la investigación</p>
              <div className="space-y-4">
                {risk && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Riesgo evaluado</p>
                    <RiskPill risk={risk} showCategory />
                  </div>
                )}
                <InvBlock label="Causa raíz" value={inv.causa_raiz} tone="critical" />
                <InvBlock label="Conclusiones" value={inv.conclusiones} />
                {/* Opcional en el formulario, así que solo se muestra si se llenó. */}
                {inv.observaciones && <InvBlock label="Observaciones" value={inv.observaciones} />}
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

          <IniciarEjecucion caso={caso} />

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

/**
 * Adelanta el caso a Ejecución sin esperar a que todas las áreas acepten.
 *
 * Antes el expediente solo avanzaba cuando el último jefe aceptaba, así que un
 * área podía estar ejecutando mientras el caso seguía figurando en "Plan de
 * Acción". Con un plan aceptado ya hay trabajo real en marcha y SO puede
 * reflejarlo. Los planes que faltan no se tocan: siguen esperando a su jefe.
 */
function IniciarEjecucion({ caso }: { caso: CaseDetail }) {
  const iniciar = useStartExecution(caso.codigo_sop);

  const aceptados = caso.planes_accion.filter((p) => planTomadoPorArea(p.catalogo_detalle?.nombre));
  const pendientes = caso.planes_accion.length - aceptados.length;

  // Sin ningún plan aceptado no hay ejecución que iniciar (el backend valida
  // lo mismo); con todos aceptados el caso ya pasó solo a Ejecución.
  if (aceptados.length === 0 || pendientes === 0) return null;

  return (
    <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-brand-800">
            {aceptados.length} de {caso.planes_accion.length} planes ya fueron aceptados
          </p>
          <p className="mt-1 text-[12px] text-ink-soft leading-relaxed">
            Puede iniciar la ejecución ahora sin esperar a las demás áreas. Los {pendientes} plan(es) pendientes siguen
            vigentes y su jefe podrá aceptarlos después, con el caso ya en Ejecución.
          </p>
          <p className="mt-1.5 text-[11.5px] text-ink-quiet">
            Aceptados: {aceptados.map((p) => shortPlanCode(p.codigo_plan)).join(", ")}
          </p>
        </div>
        <Button
          size="sm"
          disabled={iniciar.isPending}
          onClick={() =>
            iniciar.mutate(undefined, {
              onSuccess: () => toast.success(`El caso pasó a Ejecución con ${aceptados.length} plan(es) en marcha`),
              onError: (e) => toast.error(apiErrorMessage(e, "No se pudo iniciar la ejecución")),
            })
          }
        >
          <Rocket className="h-4 w-4" /> Iniciar ejecución
        </Button>
      </div>
    </div>
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
              <span className="text-ink-quiet">Plan:</span> <span className="font-medium font-mono">{shortPlanCode(plan.codigo_plan)}</span>
            </div>
            <div>
              <span className="text-ink-quiet">Responsable:</span>{" "}
              <span className="font-medium">{plan.usuarios.nombre}</span>
              {plan.usuarios.cargo && <span className="text-ink-faint text-xs"> · {plan.usuarios.cargo}</span>}
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
              <div className="min-w-0">
                <span className="text-ink-quiet">Observaciones:</span>{" "}
                <span className="font-medium break-words">{plan.observaciones}</span>
              </div>
            )}
          </div>

          {plan.descripcion && (
            <p className="mt-3 text-[13px] text-ink-soft leading-relaxed break-words">{plan.descripcion}</p>
          )}

          <div className="pt-3 mt-3 border-t border-line-soft">
            <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2.5">Actividades del plan</p>
            <div className="space-y-2">
              {plan.actividades_plan.map((it) => {
                const parsed = parseActivityDescription(it.descripcion);
                return (
                  <div key={it.id_actividad} className="rounded-lg bg-surface border border-line p-3 text-sm">
                    <div className="flex items-center justify-end mb-2">
                      <Pill tone={it.catalogo_detalle?.nombre === "Completado" ? "brand" : "neutral"} dot>
                        {it.catalogo_detalle?.nombre ?? "Pendiente"}
                      </Pill>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-ink-quiet">Responsable:</span> {it.usuarios?.nombre ?? "—"}
                        {it.usuarios?.cargo && <span className="text-ink-faint"> · {it.usuarios.cargo}</span>}
                      </div>
                      <div>
                        <span className="text-ink-quiet">Tipo de acción:</span> {parsed.meta.tipoAccion ?? "—"}
                      </div>
                      <div>
                        <span className="text-ink-quiet">Área responsable:</span> {parsed.meta.areaNombre ?? plan.areas.nombre_area}
                      </div>
                      <div>
                        <span className="text-ink-quiet">Inicio:</span> {it.fecha_inicio ? formatDate(it.fecha_inicio) : "—"}
                      </div>
                      <div>
                        <span className="text-ink-quiet">Fin:</span> {it.fecha_fin ? formatDate(it.fecha_fin) : "—"}
                      </div>
                    </div>
                    {parsed.descripcion && (
                      <div className="mt-2 text-xs break-words">
                        <span className="text-ink-quiet">Descripción:</span> {parsed.descripcion}
                      </div>
                    )}
                  </div>
                );
              })}
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
  const createPlans = useCreatePlans(caso.codigo_sop);
  const updatePlan = useUpdatePlan(caso.codigo_sop);
  const esEdicion = !!plan;

  const hoy = new Date().toISOString().slice(0, 10);
  const soloFecha = (v?: string | null) => (v ? v.slice(0, 10) : "");
  const defaultArea = plan ? String(plan.areas.id_area) : caso.areas ? String(caso.areas.id_area) : "";

  const [actividades, setActividades] = useState<PlanFormActivityInput[]>(
    plan && plan.actividades_plan.length > 0
      ? plan.actividades_plan.map((a) => {
          const parsed = parseActivityDescription(a.descripcion);
          return {
            id_actividad: a.id_actividad,
            descripcion: parsed.descripcion,
            responsable: a.usuarios?.id_usuario ?? null,
            fecha_inicio: soloFecha(a.fecha_inicio) || hoy,
            fecha_fin: soloFecha(a.fecha_fin) || soloFecha(plan.fecha_reprogramada ?? plan.fecha_plan),
            tipo_accion: parsed.meta.tipoAccion ?? TIPOS_ACCION[0],
            id_area: parsed.meta.idArea ? String(parsed.meta.idArea) : defaultArea,
          };
        })
      : [blankActividad(defaultArea)]
  );

  // El plan se revisa antes de salir: una vez enviado, el jefe del área lo ve
  // tal cual, así que conviene confirmar responsables y fechas en una vista
  // de solo lectura en vez de mandarlo directo desde el formulario.
  const [reviewOpen, setReviewOpen] = useState(false);

  const actividadCompleta = (a: PlanFormActivityInput) =>
    a.descripcion.trim().length >= 3 &&
    !!a.tipo_accion &&
    !!a.id_area &&
    !!a.responsable &&
    !!a.fecha_inicio &&
    !!a.fecha_fin;
  const actividadesValidas = actividades.filter(actividadCompleta);
  const puedeEnviar = actividades.length > 0 && actividadesValidas.length === actividades.length;

  /**
   * Código que realmente va a recibir cada plan del formulario.
   *
   * El backend numera continuando desde los planes que el caso ya tiene
   * (`createPlans` hace count + i + 1), así que la vista previa tiene que
   * hacer lo mismo. Numerar por el índice del borrador mostraba PLA-01 en un
   * caso reabierto que ya tenía dos planes cerrados, y el plan terminaba
   * guardándose como PLA-03: la pantalla decía una cosa y la base otra.
   *
   * En edición no hay número que calcular: se muestra el código real del plan.
   */
  const codigoPlanPrevisto = (i: number) =>
    plan
      ? shortPlanCode(plan.codigo_plan)
      : `PLA-${String(caso.planes_accion.length + i + 1).padStart(2, "0")}`;

  const updateActividad = (i: number, patch: Partial<PlanFormActivityInput>) =>
    setActividades((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

  const nombreArea = (idArea?: string) =>
    (areas ?? []).find((a) => String(a.id_area) === idArea)?.nombre_area ??
    (plan && String(plan.areas.id_area) === idArea ? plan.areas.nombre_area : "—");
  const nombreUsuario = (id?: number | null) =>
    (usuarios ?? []).find((u) => u.id_usuario === id)?.nombre ?? "Sin asignar";

  const planPayload = (a: PlanFormActivityInput) => ({
    descripcion: `${a.tipo_accion}: ${a.descripcion.trim()}`,
    id_area: Number(a.id_area),
    responsable: Number(a.responsable),
    fecha_plan: a.fecha_fin || hoy,
    observaciones: plan?.observaciones ?? undefined,
    actividades: [
      {
        id_actividad: esEdicion ? a.id_actividad : undefined,
        descripcion: encodeActivityDescription(a.descripcion.trim(), {
          tipoAccion: a.tipo_accion,
          idArea: Number(a.id_area),
          areaNombre: nombreArea(a.id_area),
        }),
        responsable: a.responsable ?? null,
        fecha_inicio: a.fecha_inicio || undefined,
        fecha_fin: a.fecha_fin || undefined,
      },
    ],
  });

  const enviar = () => {
    if (!puedeEnviar) return;

    const planesPayload = actividadesValidas.map(planPayload);
    const opts = {
      onSuccess: () => {
        toast.success(
          esEdicion
            ? "Plan de acción actualizado"
            : actividadesValidas.length === 1
              ? "Plan de acción creado y enviado al jefe del área"
              : `${actividadesValidas.length} planes de acción creados y enviados`
        );
        setReviewOpen(false);
        onSubmitted();
      },
      onError: (e: unknown) =>
        toast.error(apiErrorMessage(e, esEdicion ? "No se pudo actualizar el plan" : "No se pudo crear el plan de acción")),
    };
    if (esEdicion && plan) updatePlan.mutate({ ...planesPayload[0], id_plan: plan.id_plan }, opts);
    else createPlans.mutate({ planes: planesPayload }, opts);
  };

  return (
    <div className="space-y-5">
      <section>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-line-soft">
          <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint">
            Planes de acción
            <span className="ml-2 text-ink-quiet normal-case tracking-normal font-medium">
              {actividadesValidas.length} de {actividades.length} completas
            </span>
          </p>
        </div>
        <div className="space-y-4">
          {actividades.map((act, i) => (
            <div key={i} className="rounded-xl border border-line bg-white p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-[13px] font-semibold text-ink-faint">
                  {codigoPlanPrevisto(i)}
                </span>
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

              <div className="space-y-4">
                <Field label="Responsable" required>
                  <ResponsableSearch
                    users={usuarios ?? []}
                    value={act.responsable}
                    onChange={(responsable) => updateActividad(i, { responsable })}
                  />
                </Field>

                <Field label="Descripción" required>
                  <Textarea
                    rows={4}
                    placeholder="Detalle de la actividad..."
                    value={act.descripcion}
                    onChange={(e) => updateActividad(i, { descripcion: e.target.value })}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Tipo de acción" required>
                    <Select
                      value={act.tipo_accion}
                      onChange={(e) => updateActividad(i, { tipo_accion: e.target.value })}
                    >
                      {TIPOS_ACCION.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Área responsable" required>
                    <Select
                      value={act.id_area}
                      onChange={(e) => updateActividad(i, { id_area: e.target.value })}
                    >
                      <option value="">Seleccione…</option>
                      {(areas ?? []).map((a) => (
                        <option key={a.id_area} value={String(a.id_area)}>
                          {a.nombre_area}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Fecha inicio de plan de acción" required>
                    <Input
                      type="date"
                      min={hoy}
                      value={act.fecha_inicio ?? ""}
                      onChange={(e) => updateActividad(i, { fecha_inicio: e.target.value })}
                    />
                  </Field>

                  <Field label="Fecha fin de plan de acción" required>
                    <Input
                      type="date"
                      min={act.fecha_inicio || hoy}
                      value={act.fecha_fin ?? ""}
                      onChange={(e) => updateActividad(i, { fecha_fin: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setActividades((prev) => [...prev, blankActividad(defaultArea)])}
        >
          <Plus className="h-4 w-4" /> Agregar plan de acción
        </Button>
      </section>

      <div className="pt-3 border-t border-line-soft flex items-center justify-end gap-2">
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button disabled={!puedeEnviar} onClick={() => setReviewOpen(true)}>
          <Send className="h-4 w-4" /> Revisar y enviar planes
        </Button>
      </div>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={esEdicion ? "Revisar cambios del plan" : "Revisar plan antes de enviar"}
        subtitle={`${caso.codigo_sop} · ${actividadesValidas.length} plan(es) de acción`}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setReviewOpen(false)}>
              Seguir editando
            </Button>
            <Button disabled={createPlans.isPending || updatePlan.isPending} onClick={enviar}>
              <Send className="h-4 w-4" /> {esEdicion ? "Guardar cambios" : "Confirmar y enviar a jefes de área"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-semibold tracking-wide uppercase text-ink-faint mb-2">
              Planes de acción a enviar ({actividadesValidas.length})
            </p>
            <div className="space-y-2">
              {actividadesValidas.map((a, i) => (
                <div key={i} className="rounded-lg border border-line p-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11.5px] font-semibold text-brand-700 shrink-0">
                      {codigoPlanPrevisto(i)}
                    </span>
                    <Pill tone="brand" dot>{a.tipo_accion}</Pill>
                  </div>
                  <p className="mt-2 text-[12.5px] text-ink leading-snug">{a.descripcion.trim()}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-quiet">
                    <span>Responsable: {nombreUsuario(a.responsable)}</span>
                    <span>Área: {nombreArea(a.id_area)}</span>
                    <span>Inicio: {a.fecha_inicio ? formatDate(a.fecha_inicio) : "—"}</span>
                    <span>Fin: {a.fecha_fin ? formatDate(a.fecha_fin) : "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {actividades.length > actividadesValidas.length && (
            <p className="rounded-lg bg-warning-soft border border-warning/30 p-3 text-[12px] text-warning-ink">
              Complete todos los campos obligatorios antes de enviar el plan de acción.
            </p>
          )}

          {!esEdicion && (
            <p className="text-[11.5px] text-ink-quiet">
              Al confirmar, cada plan queda en estado <span className="font-medium text-ink">Enviado</span> y su jefe de
              área debe aceptarlo para que arranque la Ejecución.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
