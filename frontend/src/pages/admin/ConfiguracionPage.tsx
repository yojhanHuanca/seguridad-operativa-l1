import { useMemo, useState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Hash, Loader2, RotateCcw, Save, Settings2, TramFront } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { useConfiguracion, useUpdateConfiguracion } from "@/features/configuracion/hooks/useConfiguracion";
import type { ConfiguracionGeneral } from "@/features/configuracion/types";
import { apiErrorMessage } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const DEFAULT_CONFIG: ConfiguracionGeneral = {
  sistema: {
    nombre: "SMS L1",
    version: "1.0.0",
  },
  numeracion: {
    prefijoExpedientes: "SOP",
    secuenciaExpedientes: 0,
    prefijoPlanes: "PLA",
    secuenciaPlanes: 0,
  },
  plazos: {
    diasMaxInvestigacion: 15,
    diasResponderPlanes: 7,
    diasSolicitarProrroga: 3,
  },
  operacion: {
    kmPorCarrera: 33.128331,
  },
  meta: {
    ultimaActualizacion: null,
  },
};

function cleanPrefix(value: string) {
  return value.toUpperCase().replace(/\s+/g, "-").replace(/[^A-Z0-9-]/g, "").slice(0, 12);
}

function caseCodePattern(prefix: string) {
  return `${prefix || "PREFIJO"} ##-AAAA`;
}

function planCodePattern(prefix: string) {
  return `CODIGO-CASO-${prefix || "PREFIJO"}-##`;
}

function cloneConfig(config: ConfiguracionGeneral): ConfiguracionGeneral {
  return {
    sistema: { ...config.sistema },
    numeracion: { ...config.numeracion },
    plazos: { ...config.plazos },
    operacion: {
      ...config.operacion,
      kmPorCarrera: Number.isFinite(config.operacion?.kmPorCarrera) && config.operacion.kmPorCarrera > 0
        ? config.operacion.kmPorCarrera
        : 33.128331,
    },
    meta: { ...config.meta },
  };
}

function sameConfig(a: ConfiguracionGeneral, b: ConfiguracionGeneral) {
  return (
    JSON.stringify({
      sistema: a.sistema,
      numeracion: a.numeracion,
      plazos: a.plazos,
      operacion: a.operacion,
    }) ===
    JSON.stringify({
      sistema: b.sistema,
      numeracion: b.numeracion,
      plazos: b.plazos,
      operacion: b.operacion,
    })
  );
}

function Section({
  icon,
  title,
  description,
  children,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-white", className)}>
      <div className="flex items-start gap-3 border-b border-line-soft px-4 py-4 sm:px-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">{icon}</div>
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-quiet">{description}</p>
        </div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  hint,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="relative">
        <Input
          type="number"
          min={min}
          max={999999}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Math.max(min, Number(event.target.value) || 0))}
          className="pr-14"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-ink-faint">Nro.</span>
      </div>
    </Field>
  );
}

function PatternBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line-soft bg-surface px-3 py-2.5">
      <p className="text-[11px] font-medium text-ink-faint">{label}</p>
      <p className="mt-1 font-mono text-[13px] font-semibold text-brand-700">{value}</p>
    </div>
  );
}

function validateConfig(config: ConfiguracionGeneral): string | null {
  if (config.sistema.nombre.trim().length < 3) return "El nombre del sistema debe tener al menos 3 caracteres.";
  if (!config.sistema.version.trim()) return "La versión es obligatoria.";
  if (config.numeracion.prefijoExpedientes.length < 2) return "El prefijo de expedientes debe tener al menos 2 caracteres.";
  if (config.numeracion.prefijoPlanes.length < 2) return "El prefijo de planes debe tener al menos 2 caracteres.";
  if (!Number.isFinite(config.operacion.kmPorCarrera) || config.operacion.kmPorCarrera <= 0) {
    return "Los kilómetros por carrera deben ser mayores que cero.";
  }
  return null;
}

export function AdminConfiguracionPage() {
  const { data, isLoading, isError, refetch } = useConfiguracion();
  const updateConfiguracion = useUpdateConfiguracion();
  const sourceKey = data ? `${data.meta.ultimaActualizacion ?? "sin-fecha"}:${JSON.stringify(data.numeracion)}` : "default";
  const [draft, setDraft] = useState<{ sourceKey: string; value: ConfiguracionGeneral }>(() => ({
    sourceKey: "default",
    value: cloneConfig(DEFAULT_CONFIG),
  }));

  const form = draft.sourceKey === sourceKey ? draft.value : cloneConfig(data ?? DEFAULT_CONFIG);

  const dirty = useMemo(() => (data ? !sameConfig(form, data) : false), [data, form]);
  const expedienteFormato = caseCodePattern(form.numeracion.prefijoExpedientes);
  const planFormato = planCodePattern(form.numeracion.prefijoPlanes);

  const setSistema = (key: keyof ConfiguracionGeneral["sistema"], value: string) => {
    setDraft((current) => {
      const base = current.sourceKey === sourceKey ? current.value : cloneConfig(data ?? DEFAULT_CONFIG);
      return { sourceKey, value: { ...base, sistema: { ...base.sistema, [key]: value } } };
    });
  };

  const setNumeracion = (key: keyof ConfiguracionGeneral["numeracion"], value: string | number) => {
    setDraft((current) => {
      const base = current.sourceKey === sourceKey ? current.value : cloneConfig(data ?? DEFAULT_CONFIG);
      return { sourceKey, value: { ...base, numeracion: { ...base.numeracion, [key]: value } } };
    });
  };

  const setOperacion = (key: keyof ConfiguracionGeneral["operacion"], value: number) => {
    setDraft((current) => {
      const base = current.sourceKey === sourceKey ? current.value : cloneConfig(data ?? DEFAULT_CONFIG);
      return { sourceKey, value: { ...base, operacion: { ...base.operacion, [key]: value } } };
    });
  };

  const handleReset = () => {
    if (data) setDraft({ sourceKey, value: cloneConfig(data) });
  };

  const handleSubmit = async () => {
    const error = validateConfig(form);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      await updateConfiguracion.mutateAsync({
        ...form,
        sistema: {
          nombre: form.sistema.nombre.trim(),
          version: form.sistema.version.trim(),
        },
        numeracion: {
          ...form.numeracion,
          prefijoExpedientes: cleanPrefix(form.numeracion.prefijoExpedientes),
          prefijoPlanes: cleanPrefix(form.numeracion.prefijoPlanes),
        },
      });
      toast.success("Configuración actualizada correctamente");
    } catch (error) {
      toast.error(apiErrorMessage(error, "No se pudo guardar la configuración"));
    }
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[13px] leading-relaxed text-ink-quiet">
            Parámetros globales que controlan identidad, numeración automática y plazos operativos del sistema.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11.5px] font-medium text-brand-800">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Cambios auditables
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink-soft">
              <Hash className="h-3.5 w-3.5" />
              Numeración centralizada
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={handleReset} disabled={!dirty || updateConfiguracion.isPending}>
            <RotateCcw className="h-4 w-4" />
            Restablecer
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!dirty || updateConfiguracion.isPending || isLoading}>
            {updateConfiguracion.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Guardar cambios
          </Button>
        </div>
      </div>

      {isError && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold">No se pudo cargar la configuración.</p>
            <button type="button" onClick={() => refetch()} className="mt-1 font-medium underline">
              Intentar nuevamente
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="mt-6 grid min-h-[360px] place-items-center rounded-xl border border-line bg-white text-[13px] text-ink-quiet">
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-brand-700" />
            Cargando configuración...
          </span>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <Section
              icon={<Settings2 className="h-4.5 w-4.5" />}
              title="General"
              description="Identidad base que se muestra en el sistema y en futuras salidas administrativas."
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                <Field label="Nombre del sistema" required>
                  <Input value={form.sistema.nombre} onChange={(event) => setSistema("nombre", event.target.value)} maxLength={150} />
                </Field>
                <Field label="Versión" required>
                  <Input value={form.sistema.version} onChange={(event) => setSistema("version", event.target.value)} maxLength={30} />
                </Field>
              </div>
            </Section>

            <Section
              icon={<Hash className="h-4.5 w-4.5" />}
              title="Numeración automática"
              description="Controla los códigos que se asignan al crear nuevos expedientes y planes de acción."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Prefijo de expedientes" required hint="Usa la sigla real definida por la empresa.">
                  <Input
                    value={form.numeracion.prefijoExpedientes}
                    onChange={(event) => setNumeracion("prefijoExpedientes", cleanPrefix(event.target.value))}
                    maxLength={12}
                  />
                </Field>
                <NumberField
                  label="Secuencia actual (expedientes)"
                  value={form.numeracion.secuenciaExpedientes}
                  onChange={(value) => setNumeracion("secuenciaExpedientes", value)}
                  hint="El backend usará el siguiente número al crear un expediente real."
                />
                <Field label="Prefijo de planes" required hint="Usa la sigla real definida por la empresa.">
                  <Input
                    value={form.numeracion.prefijoPlanes}
                    onChange={(event) => setNumeracion("prefijoPlanes", cleanPrefix(event.target.value))}
                    maxLength={12}
                  />
                </Field>
                <NumberField
                  label="Secuencia actual (planes)"
                  value={form.numeracion.secuenciaPlanes}
                  onChange={(value) => setNumeracion("secuenciaPlanes", value)}
                  hint="El backend usará el siguiente número al guardar un plan real."
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <PatternBox label="Formato de expediente" value={expedienteFormato} />
                <PatternBox label="Formato de plan" value={planFormato} />
              </div>
            </Section>

            <Section
              icon={<TramFront className="h-4.5 w-4.5" />}
              title="Parámetros operativos"
              description="Valores usados para estimar kilómetros comerciales en Datos Operativos. Los cambios aplican a nuevos registros y no recalculan el histórico."
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-end">
                <Field label="Kilómetros por carrera" hint="Valor de referencia de una carrera completa." required>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0.01"
                      max="100"
                      step="0.000001"
                      value={form.operacion.kmPorCarrera}
                      onChange={(event) => setOperacion("kmPorCarrera", Number(event.target.value) || 0)}
                      className="pr-12"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-ink-faint">km</span>
                  </div>
                </Field>
                <div className="rounded-lg border border-brand-100 bg-brand-50/50 px-3 py-3 text-[12px] text-brand-900">
                  <p className="font-semibold">¿Cómo se utiliza?</p>
                  <p className="mt-1 leading-relaxed">
                    Al ingresar las carreras, el sistema calculará automáticamente: carreras × {form.operacion.kmPorCarrera || 0} km.
                    El resultado seguirá siendo editable por el usuario.
                  </p>
                </div>
              </div>
            </Section>
          </div>

          <aside className="rounded-xl border border-line bg-white p-4">
            <p className="text-[13px] font-semibold text-ink">Resumen operativo</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-surface px-3 py-3">
                <p className="text-[11px] font-medium uppercase text-ink-faint">Sistema</p>
                <p className="mt-1 text-[13px] font-semibold text-ink">{form.sistema.nombre}</p>
                <p className="mt-0.5 text-[12px] text-ink-quiet">Versión {form.sistema.version}</p>
              </div>
              <div className="rounded-lg bg-surface px-3 py-3">
                <p className="text-[11px] font-medium uppercase text-ink-faint">Operación</p>
                <p className="mt-1 text-[12.5px] text-ink-soft">Km por carrera: <span className="font-mono font-semibold text-brand-700">{form.operacion.kmPorCarrera}</span> km</p>
                <p className="mt-1 text-[12px] text-ink-quiet">Usado en nuevos datos operativos.</p>
              </div>
              <div className="rounded-lg bg-surface px-3 py-3">
                <p className="text-[11px] font-medium uppercase text-ink-faint">Numeración</p>
                <p className="mt-1 text-[12.5px] text-ink-soft">
                  Expedientes: <span className="font-mono font-semibold text-brand-700">{form.numeracion.prefijoExpedientes}</span> · secuencia{" "}
                  <span className="font-mono font-semibold text-ink">{form.numeracion.secuenciaExpedientes}</span>
                </p>
                <p className="mt-1 text-[12.5px] text-ink-soft">
                  Planes: <span className="font-mono font-semibold text-brand-700">{form.numeracion.prefijoPlanes}</span> · secuencia{" "}
                  <span className="font-mono font-semibold text-ink">{form.numeracion.secuenciaPlanes}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-line-soft px-3 py-3 text-[12px] text-ink-quiet">
              Última actualización:{" "}
              <span className="font-medium text-ink">{data?.meta.ultimaActualizacion ? formatDateTime(data.meta.ultimaActualizacion) : "Sin registro"}</span>
            </div>
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
