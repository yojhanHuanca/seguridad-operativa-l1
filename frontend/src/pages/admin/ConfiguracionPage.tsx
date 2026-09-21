import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock3, Hash, History, Info, Loader2, LockKeyhole, RotateCcw, Save, Settings2, ShieldCheck, TramFront, X } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { useConfiguracion, useUpdateConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import { ConfigurationDiff, ConfigurationHistory } from "@/features/configuracion/ConfigurationHistory";
import { cleanPrefix, configChanges, configErrors, normalizeConfig } from "@/features/configuracion/presentation";
import type { ConfiguracionGeneral } from "@/features/configuracion/types";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "general", label: "General", icon: Settings2, group: "sistema" },
  { id: "numeracion", label: "Numeración", icon: Hash, group: "numeracion" },
  { id: "operacion", label: "Operación", icon: TramFront, group: "operacion" },
  { id: "historial", label: "Historial", icon: History, group: "historial" },
] as const;
type Tab = typeof TABS[number]["id"];

function Section({ title, description, children, tag }: { title: string; description: string; children: ReactNode; tag: string }) {
  return <section>
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="max-w-xl"><h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2><p className="mt-1 text-sm leading-relaxed text-ink-soft">{description}</p></div>
      <span className="rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-soft">{tag}</span>
    </div>
    {children}
  </section>;
}

function Note({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs leading-relaxed text-blue-900"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><div>{children}</div></div>;
}

export function AdminConfiguracionPage() {
  const { data, isPending, isError, refetch } = useConfiguracion();
  return <AdminShell>
    {isPending ? <div role="status" className="mx-auto max-w-[1280px] rounded-2xl border border-line bg-white p-8">
      <p className="flex items-center gap-2 text-sm text-ink-soft"><Loader2 className="h-4 w-4 animate-spin" />Cargando configuración…</p>
      <div aria-hidden="true" className="mt-6 space-y-4 motion-safe:animate-pulse"><div className="h-24 rounded-xl bg-surface-2" /><div className="h-12 rounded-xl bg-surface-2" /><div className="h-64 rounded-xl bg-surface" /></div>
    </div> : isError || !data ? <div role="alert" className="mx-auto max-w-[1280px] rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
      <p className="flex items-center gap-2 font-semibold"><AlertCircle className="h-4 w-4" />No se pudo cargar la configuración.</p>
      <p className="mt-2">Vuelve a intentar para consultar los valores guardados.</p>
      <Button variant="outline" className="mt-4" onClick={() => refetch()}>Intentar nuevamente</Button>
    </div> : <ConfigurationEditor saved={data} />}
  </AdminShell>;
}

function ConfigurationEditor({ saved }: { saved: ConfiguracionGeneral }) {
  const update = useUpdateConfiguracion();
  const [tab, setTab] = useState<Tab>("general");
  const [draft, setDraft] = useState<{ base: ConfiguracionGeneral; value: ConfiguracionGeneral } | null>(null);
  const [sequenceUnlocked, setSequenceUnlocked] = useState(false);
  const [review, setReview] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  // Query refreshes must not silently replace an administrator's pending edits.
  const form = draft?.value ?? saved;
  const normalized = normalizeConfig(form);
  const changes = draft ? configChanges(normalizeConfig(draft.base), normalized) : [];
  const dirty = changes.length > 0;
  const conflict = dirty && !!draft && (configChanges(draft.base, saved).length > 0 || draft.base.meta.ultimaActualizacion !== saved.meta.ultimaActualizacion);
  const errors = configErrors(form, saved);
  const invalid = Object.keys(errors).length > 0;
  const previewCode = `${form.numeracion.prefijoExpedientes || "PREFIJO"} ${Number.isFinite(form.numeracion.secuenciaExpedientes) ? String(form.numeracion.secuenciaExpedientes + 1).padStart(2, "0") : "##"}-${new Date().getUTCFullYear()}`;
  const km = form.operacion?.kmPorCarrera;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (review) dialog.current?.showModal();
    else dialog.current?.close();
  }, [review]);

  function edit(transform: (current: ConfiguracionGeneral) => ConfiguracionGeneral) {
    setDraft((current) => ({ base: current?.base ?? structuredClone(saved), value: transform(current?.value ?? structuredClone(saved)) }));
  }
  function discard() { setDraft(null); setSequenceUnlocked(false); setReview(false); }

  async function save() {
    if (!dirty || invalid || conflict || update.isPending) return;
    try {
      // Keep parameters absent from this screen and server-managed counters intact.
      await update.mutateAsync({ ...normalized, plazos: saved.plazos, numeracion: { ...normalized.numeracion, secuenciaPlanes: saved.numeracion.secuenciaPlanes } });
      discard();
      toast.success("Configuración actualizada correctamente");
    } catch (error) {
      toast.error(apiErrorMessage(error, "No se pudo guardar la configuración. Tus cambios siguen disponibles."));
    }
  }

  return <div className="mx-auto max-w-[1280px] space-y-5 pb-4">
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-900 text-white sm:grid"><Settings2 className="h-6 w-6" /></div>
          <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">Administración del sistema</p><h1 className="text-2xl font-semibold tracking-tight text-ink">Centro de configuración</h1><p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">Identidad, numeración y parámetros que acompañan tu operación.</p></div>
        </div>
        <div role="status" className={cn("inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium", dirty ? "border-amber-200 bg-amber-50 text-amber-900" : "border-brand-100 bg-brand-50 text-brand-800")}>
          {dirty ? <span className="h-2 w-2 rounded-full bg-amber-500" /> : <CheckCircle2 className="h-4 w-4" />}{dirty ? `${changes.length} ${changes.length === 1 ? "cambio pendiente" : "cambios pendientes"}` : "Configuración guardada"}
        </div>
      </div>
      <div className="grid divide-y divide-line-soft border-t border-line-soft bg-surface/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="min-w-0 px-5 py-4 sm:px-6"><p className="text-xs text-ink-soft">Sistema actual</p><p className="mt-1 truncate text-sm font-semibold text-ink" title={saved.sistema.nombre}>{saved.sistema.nombre} <span className="font-normal text-ink-soft">· v{saved.sistema.version}</span></p></div>
        <div className="px-5 py-4 sm:px-6"><p className="flex items-center gap-1.5 text-xs text-ink-soft"><Clock3 className="h-3.5 w-3.5" />Última actualización</p><p className="mt-1 text-sm font-medium text-ink">{saved.meta.ultimaActualizacion ? formatDateTime(saved.meta.ultimaActualizacion) : "Sin registro"}</p></div>
        <button type="button" onClick={() => setTab("historial")} className="px-5 py-4 text-left transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-700 sm:px-6"><p className="flex items-center gap-1.5 text-xs text-ink-soft"><ShieldCheck className="h-3.5 w-3.5" />Trazabilidad</p><p className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand-800">Consultar cambios <ArrowRight className="h-3.5 w-3.5" /></p></button>
      </div>
    </div>

    {conflict && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">La configuración cambió mientras editabas. Conservamos tu borrador para que puedas revisarlo. Descarta los cambios para cargar los valores actuales antes de volver a editar.</div>}

    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <div role="tablist" aria-label="Secciones de configuración" className="flex overflow-x-auto border-b border-line bg-surface/40 px-2 sm:px-4">
          {TABS.map((item, index) => {
            const active = tab === item.id;
            const count = changes.filter((change) => change.group === item.group).length;
            return <button key={item.id} type="button" id={`tab-${item.id}`} role="tab" aria-selected={active} aria-controls={`panel-${item.id}`} tabIndex={active ? 0 : -1} onClick={() => setTab(item.id)} onKeyDown={(event) => {
              let next: number;
              if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
              else if (event.key === "ArrowLeft") next = (index + TABS.length - 1) % TABS.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = TABS.length - 1;
              else return;
              event.preventDefault(); setTab(TABS[next].id); document.getElementById(`tab-${TABS[next].id}`)?.focus();
            }} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-3 py-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand-700 sm:px-4", active ? "border-brand-700 text-brand-800" : "border-transparent text-ink-soft hover:bg-white hover:text-ink")}><item.icon className="h-4 w-4" /><span>{item.label}</span>{count > 0 && <span className="rounded-full bg-amber-100 px-1.5 text-[10px] text-amber-900" aria-label={`${count} cambios pendientes`}>{count}</span>}</button>;
          })}
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="p-5 focus-visible:outline-2 focus-visible:outline-brand-700 sm:p-6">
          <fieldset disabled={update.isPending} className="min-w-0">
            {tab === "general" && <Section title="Identidad del sistema" description="Define cómo se identifica la plataforma en los paneles y reportes que utilizan estos datos." tag="Alcance global">
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_160px]">
                <Field label="Nombre del sistema" required error={errors.nombre}><Input value={form.sistema.nombre} maxLength={150} aria-invalid={!!errors.nombre} onChange={(event) => edit((current) => ({ ...current, sistema: { ...current.sistema, nombre: event.target.value } }))} /></Field>
                <Field label="Versión" required error={errors.version}><Input value={form.sistema.version} maxLength={30} aria-invalid={!!errors.version} onChange={(event) => edit((current) => ({ ...current, sistema: { ...current.sistema, version: event.target.value } }))} /></Field>
              </div>
              <div className="my-6 rounded-xl border border-line bg-surface p-5"><p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Vista previa de identidad</p><div className="flex items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-900 text-white"><ShieldCheck className="h-5 w-5" /></div><div className="min-w-0"><p className="break-words text-lg font-semibold tracking-tight text-ink">{form.sistema.nombre || "Nombre del sistema"}</p><p className="mt-0.5 break-words text-xs text-ink-soft">Administración · Versión {form.sistema.version || "—"}</p></div></div></div>
              <Note>El nombre se comparte con los demás paneles. La versión es una etiqueta informativa; cambiarla no instala una actualización.</Note>
            </Section>}

            {tab === "numeracion" && <Section title="Numeración automática" description="Gestiona los prefijos y la continuidad de los códigos de expedientes y planes de acción." tag="Nuevos registros">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Prefijo de expedientes" required error={errors.prefijoExpedientes}><Input value={form.numeracion.prefijoExpedientes} maxLength={12} aria-invalid={!!errors.prefijoExpedientes} onChange={(event) => edit((current) => ({ ...current, numeracion: { ...current.numeracion, prefijoExpedientes: cleanPrefix(event.target.value) } }))} /></Field>
                <Field label="Prefijo de planes" required error={errors.prefijoPlanes}><Input value={form.numeracion.prefijoPlanes} maxLength={12} aria-invalid={!!errors.prefijoPlanes} onChange={(event) => edit((current) => ({ ...current, numeracion: { ...current.numeracion, prefijoPlanes: cleanPrefix(event.target.value) } }))} /></Field>
              </div>
              <div className="my-6 grid gap-3 sm:grid-cols-2">
                <div className="min-w-0 rounded-xl border border-brand-100 bg-brand-50/60 p-4"><p className="text-xs font-medium text-brand-900">Próximo expediente estimado</p><p className="mt-2 break-all font-mono text-base font-semibold text-brand-900">{previewCode}</p><p className="mt-2 text-xs leading-relaxed text-ink-soft">Referencia para el año actual. El número se asigna al crear el registro.</p></div>
                <div className="min-w-0 rounded-xl border border-line bg-surface p-4"><p className="text-xs font-medium text-ink">Ejemplo del primer plan</p><p className="mt-2 break-all font-mono text-sm font-semibold text-ink">{previewCode}-{form.numeracion.prefijoPlanes || "PREFIJO"}-01</p><p className="mt-2 text-xs leading-relaxed text-ink-soft">Cada expediente tiene su propia numeración de planes.</p></div>
              </div>
              <div className="rounded-xl border border-line p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm font-semibold text-ink"><LockKeyhole className="h-4 w-4 text-ink-soft" />Control de secuencia</p><Button type="button" variant="outline" size="sm" onClick={() => setSequenceUnlocked(!sequenceUnlocked)}>{sequenceUnlocked ? "Bloquear edición" : "Habilitar ajuste"}</Button></div>
                <Field label="Secuencia de expedientes" required error={errors.secuenciaExpedientes}><Input type="number" min={saved.numeracion.secuenciaExpedientes} max={999999} step={1} value={Number.isFinite(form.numeracion.secuenciaExpedientes) ? form.numeracion.secuenciaExpedientes : ""} disabled={!sequenceUnlocked} aria-invalid={!!errors.secuenciaExpedientes} onChange={(event) => edit((current) => ({ ...current, numeracion: { ...current.numeracion, secuenciaExpedientes: event.target.value === "" ? NaN : Number(event.target.value) } }))} /></Field>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">Solo se permite adelantar la secuencia. Los números omitidos no se asignarán a los siguientes expedientes.</p>
                <p className="mt-4 border-t border-line-soft pt-3 text-xs text-ink-soft">Planes registrados: <span className="font-semibold text-ink">{saved.numeracion.secuenciaPlanes}</span> · Contador informativo, calculado automáticamente.</p>
              </div>
            </Section>}

            {tab === "operacion" && <Section title="Parámetros operativos" description="Establece el valor de referencia para estimar los kilómetros comerciales a partir de las carreras registradas." tag="Sin recálculo histórico">
              <div className="max-w-sm"><Field label="Kilómetros por carrera" required error={errors.kmPorCarrera}><div className="relative"><Input type="number" min={0.01} max={100} step="0.000001" value={Number.isFinite(km) ? km : ""} aria-invalid={!!errors.kmPorCarrera} className="pr-12" onChange={(event) => edit((current) => ({ ...current, operacion: { kmPorCarrera: event.target.value === "" ? NaN : Number(event.target.value) } }))} /><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-soft">km</span></div></Field></div>
              <div className="my-6 rounded-xl border border-line bg-surface p-5"><p className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Ejemplo de cálculo · 10 carreras</p><p className="mt-3 break-words text-2xl font-semibold tabular-nums tracking-tight text-ink">{Number.isFinite(km) ? (10 * km).toLocaleString("es-PE", { maximumFractionDigits: 6 }) : "—"} <span className="text-sm font-normal text-ink-soft">km comerciales</span></p><p className="mt-2 text-xs text-ink-soft">10 carreras × {Number.isFinite(km) ? km : "—"} km por carrera</p></div>
              <Note>Este valor se usa como referencia en nuevos datos operativos. Los registros históricos conservan sus valores y el resultado calculado sigue siendo editable por el usuario.</Note>
            </Section>}
          </fieldset>
          {tab === "historial" && <Section title="Historial de configuración" description="Consulta quién realizó cada actualización y compara los valores registrados antes y después." tag="Registro de auditoría"><ConfigurationHistory /></Section>}
        </div>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-[98px]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-ink">Resumen de configuración</h2><Settings2 className="h-4 w-4 text-brand-700" /></div><p className="mt-1 text-xs text-ink-soft">{dirty ? "Vista previa de tus cambios" : "Valores actualmente guardados"}</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="text-xs text-ink-soft">Nombre del sistema</dt><dd className="mt-1 break-words font-medium text-ink">{form.sistema.nombre || "—"}</dd></div>
            <div className="border-t border-line-soft pt-4"><dt className="text-xs text-ink-soft">Prefijos de expedientes / planes</dt><dd className="mt-1 break-all font-mono font-semibold text-brand-800">{form.numeracion.prefijoExpedientes || "—"} / {form.numeracion.prefijoPlanes || "—"}</dd></div>
            <div className="border-t border-line-soft pt-4"><dt className="text-xs text-ink-soft">Kilómetros por carrera</dt><dd className="mt-1 font-medium tabular-nums text-ink">{Number.isFinite(km) ? km : "—"} km</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5"><p className="flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck className="h-4 w-4 text-brand-700" />Cambios con trazabilidad</p><p className="mt-2 text-xs leading-relaxed text-ink-soft">Cada actualización se registra en auditoría. Revisa los valores antes de confirmar el guardado.</p><button type="button" onClick={() => setTab("historial")} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-700">Ver historial <ArrowRight className="h-3.5 w-3.5" /></button></div>
      </aside>
    </div>

    <div className={cn("sticky bottom-3 z-20 flex flex-col justify-between gap-3 rounded-xl border bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center", dirty ? "border-amber-200" : "border-line")}>
      <div aria-live="polite"><p className="text-sm font-semibold text-ink">{dirty ? `${changes.length} ${changes.length === 1 ? "cambio sin guardar" : "cambios sin guardar"}` : "Todos los cambios guardados"}</p><p className="mt-0.5 text-xs text-ink-soft">{invalid ? "Revisa los campos marcados antes de guardar." : dirty ? "Los ajustes se aplicarán después de tu confirmación." : "Selecciona una sección para consultar o editar sus parámetros."}</p></div>
      <div className="flex shrink-0 flex-col gap-2 min-[400px]:flex-row"><Button type="button" variant="outline" className="flex-1 sm:flex-none" disabled={(!draft && !sequenceUnlocked) || update.isPending} onClick={discard}><RotateCcw className="h-4 w-4" />Descartar</Button><Button type="button" className="flex-1 sm:flex-none" disabled={!dirty || invalid || conflict || update.isPending} onClick={() => setReview(true)}><Save className="h-4 w-4" />Revisar cambios</Button></div>
    </div>

    <dialog ref={dialog} aria-labelledby="review-title" aria-describedby="review-description" onCancel={(event) => { event.preventDefault(); if (!update.isPending) setReview(false); }} className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border border-line bg-white p-0 text-ink shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4 border-b border-line-soft p-5"><div><h2 id="review-title" className="text-lg font-semibold">Confirmar configuración</h2><p id="review-description" className="mt-1 text-sm text-ink-soft">Revisa los {changes.length} ajustes antes de guardarlos.</p></div><Button variant="ghost" size="icon" aria-label="Cerrar revisión" disabled={update.isPending} onClick={() => setReview(false)}><X className="h-4 w-4" /></Button></div>
      <div className="space-y-4 p-5"><ConfigurationDiff changes={changes} />{changes.some((c) => c.group === "numeracion") && <Note>Los ajustes de numeración afectan los nuevos códigos. Adelantar la secuencia deja un salto en los siguientes números asignados.</Note>}{changes.some((c) => c.group === "operacion") && <Note>El cambio de kilómetros por carrera no recalcula registros históricos.</Note>}{conflict && <p role="alert" className="text-sm text-red-700">La configuración cambió mientras editabas. Cierra esta revisión y carga los valores actuales.</p>}</div>
      <div className="sticky bottom-0 flex flex-col-reverse justify-end gap-2 border-t border-line-soft bg-surface p-4 sm:flex-row"><Button variant="outline" disabled={update.isPending} onClick={() => setReview(false)}>Volver a editar</Button><Button disabled={update.isPending || !dirty || invalid || conflict} onClick={save}>{update.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{update.isPending ? "Guardando…" : "Confirmar y guardar"}</Button></div>
    </dialog>
  </div>;
}
