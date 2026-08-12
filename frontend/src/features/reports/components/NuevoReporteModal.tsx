import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Paperclip,
  Plus,
  Send,
  Train,
} from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { StagePill } from "@/design-system/primitives/Pill";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/features/reports/components/Field";
import { CatalogSelect } from "@/features/reports/components/CatalogSelect";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { EvidencePicker } from "@/features/reports/components/EvidencePicker";
import { iconoTipoReporte } from "@/features/reports/lib/tipoIcons";
import {
  SO_REPORT_STEPS,
  SO_STEP_FIELDS,
  soReportFormSchema,
  type SoReportFormValues,
  type SoReportStep,
} from "@/features/reports/schema";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useCreateReport } from "@/features/reports/hooks/useCreateReport";
import { useCurrentSoUser } from "@/features/users/hooks/useCurrentSoUser";
import { useCase } from "@/features/cases/hooks/useCase";
import { stageFromEstado } from "@/features/cases/domain";
import { formatDate, formatTime } from "@/lib/format";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { CatalogGroup } from "@/features/reports/types";

const STEP_LABELS: Record<SoReportStep, string> = {
  tipo: "Tipo",
  ubicacion: "Ubicación",
  descripcion: "Descripción",
  evidencias: "Evidencias",
  revision: "Revisión",
};

/**
 * Registro de un reporte sin salir del panel de Seguridad Operativa.
 *
 * Mismo recorrido paso a paso que el wizard del trabajador y los mismos campos
 * (features/reports/schema.ts), en una ventana flotante. La diferencia es el
 * último paso: el analista no elige modalidad ni escribe sus datos —su nombre
 * viene de la sesión y firma el caso—, solo revisa y registra. Al registrar, el
 * backend genera el código SOP y la misma ventana pasa a mostrar el reporte ya
 * creado con sus campos.
 */
export function NuevoReporteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [codigoCreado, setCodigoCreado] = useState<string | null>(null);

  const catalogs = useCatalogs();
  const createReport = useCreateReport();
  const analista = useCurrentSoUser();
  const step = SO_REPORT_STEPS[stepIndex];

  const form = useForm<SoReportFormValues>({
    resolver: zodResolver(soReportFormSchema) as Resolver<SoReportFormValues>,
    defaultValues: { tipo_ubicacion: "estacion" },
  });

  const valores = form.watch();
  const tipos = catalogs.byName.get("Tipo de Reporte")?.catalogo_detalle ?? [];
  // Las estaciones del catálogo llevan código de estación; los patios taller no.
  const lugares = catalogs.byName.get("Lugar de Incidente")?.catalogo_detalle ?? [];
  const estaciones = lugares.filter((l) => !!l.codigo);
  const patios = lugares.filter((l) => !l.codigo);
  const lugaresEspecificos = catalogs.byName.get("Lugar Específico")?.catalogo_detalle ?? [];
  const descripcion = valores.descripcion ?? "";
  const esPatio = valores.tipo_ubicacion === "patio_taller";

  const goNext = async () => {
    const campos = SO_STEP_FIELDS[step];
    const valido = campos.length === 0 || (await form.trigger(campos));
    if (!valido) return;
    setStepIndex((i) => Math.min(i + 1, SO_REPORT_STEPS.length - 1));
  };

  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const setTipoUbicacion = (v: SoReportFormValues["tipo_ubicacion"]) => {
    form.setValue("tipo_ubicacion", v, { shouldValidate: true });
    form.setValue("id_lugar", undefined as unknown as number, { shouldValidate: false });
    form.setValue("id_lugar_especifico", undefined, { shouldValidate: false });
  };

  const reiniciar = () => {
    form.reset({ tipo_ubicacion: "estacion" });
    setFiles([]);
    setStepIndex(0);
    setCodigoCreado(null);
  };

  // Cerrar deja la ventana lista para el siguiente registro: si se reabre, no
  // aparece el reporte anterior ni los datos a medio llenar.
  const cerrar = () => {
    onClose();
    reiniciar();
  };

  const onSubmit = form.handleSubmit((values) => {
    createReport.mutate(
      {
        // Estos cuatro campos no los llena el analista: los pone su sesión. El
        // origen es lo que hace que la bitácora firme el caso como Seguridad
        // Operativa y no como un reporte de campo.
        values: {
          ...values,
          modalidad: "identificado",
          nombre_reportante: analista.nombre,
          correo_reportante: analista.correo || undefined,
          telefono_reportante: analista.user?.telefono ?? undefined,
          origen: "seguridad_operativa",
        },
        files,
      },
      {
        onSuccess: (result) => {
          toast.success(`Reporte ${result.codigo_sop} registrado correctamente`);
          setCodigoCreado(result.codigo_sop);
        },
        onError: (error) => toast.error(apiErrorMessage(error, "No se pudo registrar el reporte")),
      }
    );
  });

  if (codigoCreado) {
    return (
      <Modal
        open={open}
        onClose={cerrar}
        title="Reporte registrado"
        size="lg"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={reiniciar}>
              <Plus className="h-4 w-4" /> Registrar otro
            </Button>
            <Link to={`/seguridad/casos/${encodeURIComponent(codigoCreado)}`} onClick={cerrar}>
              <Button size="sm">
                <FileText className="h-4 w-4" /> Abrir expediente
              </Button>
            </Link>
          </>
        }
      >
        <ReporteCreado codigo={codigoCreado} />
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={cerrar}
      title="Registrar nuevo reporte"
      subtitle="El caso se crea con su código SOP y entra a la bandeja en Recepción."
      size="lg"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={goBack} disabled={stepIndex === 0}>
            <ChevronLeft className="h-4 w-4" /> Atrás
          </Button>
          {step !== "revision" ? (
            <Button size="sm" onClick={goNext} disabled={catalogs.isLoading}>
              Continuar <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={onSubmit} disabled={createReport.isPending || analista.isLoading}>
              {createReport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Registrar reporte
            </Button>
          )}
        </>
      }
    >
      <ol className="flex items-center gap-1">
        {SO_REPORT_STEPS.map((s, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <div
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-full px-2 text-[11px] font-medium transition-colors",
                  done && "bg-brand-700 text-white",
                  active && "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
                  !done && !active && "bg-surface-2 text-ink-quiet"
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9.5px]",
                    done && "bg-white/20",
                    active && "bg-brand-700 text-white",
                    !done && !active && "bg-white text-ink-quiet"
                  )}
                >
                  {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{STEP_LABELS[s]}</span>
              </div>
              {i < SO_REPORT_STEPS.length - 1 && (
                <div className={cn("mx-1 h-0.5 flex-1 rounded-full", done ? "bg-brand-700" : "bg-line")} />
              )}
            </li>
          );
        })}
      </ol>

      {catalogs.isLoading ? (
        <div className="flex items-center justify-center gap-2 py-14 text-[13px] text-ink-quiet">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando catálogos…
        </div>
      ) : catalogs.isError ? (
        <p className="py-14 text-center text-[13px] text-critical">
          No se pudieron cargar los catálogos. Verifique que el backend esté disponible.
        </p>
      ) : (
        <div className="mt-5">
          {step === "tipo" && (
            <Field label="Tipo de reporte" required error={form.formState.errors.id_tipo?.message}>
              <div className="grid grid-cols-2 gap-2.5">
                {tipos.map((item) => {
                  const Icon = iconoTipoReporte(item.nombre);
                  const active = valores.id_tipo === item.id_detalle;
                  return (
                    <button
                      key={item.id_detalle}
                      type="button"
                      onClick={() => form.setValue("id_tipo", item.id_detalle, { shouldValidate: true })}
                      className={cn(
                        "relative flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "border-brand-600 bg-brand-50 ring-1 ring-brand-200"
                          : "border-line bg-white hover:border-line-strong hover:bg-surface"
                      )}
                    >
                      <SelectedCheck show={active} />
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                          active ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 text-[12.5px] font-semibold text-ink">{item.nombre}</span>
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          {step === "ubicacion" && (
            <>
              <Field label="Tipo de ubicación" required error={form.formState.errors.tipo_ubicacion?.message}>
                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      { value: "estacion", label: "Estación", icon: Train },
                      { value: "patio_taller", label: "Patio Taller", icon: Building2 },
                    ] as const
                  ).map((opt) => {
                    const active = valores.tipo_ubicacion === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTipoUbicacion(opt.value)}
                        className={cn(
                          "relative flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-200 active:scale-[0.98]",
                          active
                            ? "border-brand-600 bg-brand-50 ring-1 ring-brand-200"
                            : "border-line bg-white hover:border-line-strong hover:bg-surface"
                        )}
                      >
                        <SelectedCheck show={active} />
                        <span
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                            active ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft"
                          )}
                        >
                          <opt.icon className="h-4 w-4" />
                        </span>
                        <span className="text-[12.5px] font-semibold text-ink">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field
                label={esPatio ? "Patio Taller" : "Estación"}
                required
                error={form.formState.errors.id_lugar?.message}
                className="mt-4"
              >
                <CatalogSelect
                  control={form.control}
                  name="id_lugar"
                  items={esPatio ? patios : estaciones}
                  placeholder={esPatio ? "Seleccione un patio…" : "Seleccione una estación…"}
                />
              </Field>

              {/* El lugar específico (andén, boletería, coche…) solo aplica a
                  una estación; en patio taller no se pregunta. */}
              {!esPatio && (
                <Field
                  label="Lugar específico"
                  hint="Opcional"
                  error={form.formState.errors.id_lugar_especifico?.message}
                  className="mt-4"
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {lugaresEspecificos.map((item) => {
                      const active = valores.id_lugar_especifico === item.id_detalle;
                      return (
                        <button
                          key={item.id_detalle}
                          type="button"
                          onClick={() =>
                            form.setValue("id_lugar_especifico", active ? undefined : item.id_detalle, {
                              shouldValidate: true,
                            })
                          }
                          className={cn(
                            "flex h-9 items-center rounded-lg border px-3 text-[12px] font-medium transition-all duration-200 active:scale-[0.97]",
                            active
                              ? "border-brand-600 bg-brand-50 text-brand-800"
                              : "border-line bg-white text-ink-soft hover:border-line-strong hover:bg-surface"
                          )}
                        >
                          {item.nombre}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}
            </>
          )}

          {step === "descripcion" && (
            <>
              <Field label="Descripción del evento" required error={form.formState.errors.descripcion?.message}>
                <Textarea
                  rows={5}
                  maxLength={300}
                  placeholder="Describa brevemente lo observado y el riesgo que puede generar."
                  {...form.register("descripcion")}
                />
              </Field>
              <p
                className={cn(
                  "mt-1.5 text-right text-[11.5px]",
                  descripcion.length >= 280 ? "font-medium text-warning-ink" : "text-ink-quiet"
                )}
              >
                {descripcion.length}/300 caracteres
              </p>
            </>
          )}

          {step === "evidencias" && <EvidencePicker files={files} setFiles={setFiles} />}

          {step === "revision" && (
            <>
              <div className="flex items-center gap-3 rounded-xl border border-line bg-surface/60 p-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-[12px] font-bold text-white">
                  {analista.iniciales}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Registrado por</p>
                  <p className="mt-0.5 truncate text-[13px] font-semibold text-ink">{analista.nombre}</p>
                  <p className="truncate text-[11.5px] text-ink-quiet">{analista.cargo}</p>
                </div>
              </div>
              <p className="mt-2 text-[11.5px] leading-snug text-ink-quiet">
                Su nombre queda registrado en el reporte y en la bitácora del caso.
              </p>

              <div className="mt-3 space-y-3 rounded-xl border border-line-soft p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Resumen del reporte
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  <CampoCreado
                    label="Tipo de reporte"
                    value={nombreCatalogo(catalogs.byName, "Tipo de Reporte", valores.id_tipo)}
                  />
                  <CampoCreado
                    label={esPatio ? "Patio Taller" : "Estación"}
                    value={nombreCatalogo(catalogs.byName, "Lugar de Incidente", valores.id_lugar)}
                  />
                  {!esPatio && (
                    <CampoCreado
                      label="Lugar específico"
                      value={nombreCatalogo(catalogs.byName, "Lugar Específico", valores.id_lugar_especifico)}
                    />
                  )}
                  <CampoCreado label="Evidencias" value={files.length > 0 ? `${files.length} archivo(s)` : "—"} />
                </div>
                <div className="pt-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Descripción</p>
                  <p className="mt-0.5 break-words text-[12.5px] leading-snug text-ink">{descripcion || "—"}</p>
                </div>
              </div>

              <p className="mt-3 text-center text-[11px] text-ink-quiet">
                El código SOP se genera automáticamente al registrar.
              </p>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}

function nombreCatalogo(catalogs: Map<string, CatalogGroup>, grupo: string, id?: number): string {
  if (!id) return "—";
  return catalogs.get(grupo)?.catalogo_detalle.find((d) => d.id_detalle === id)?.nombre ?? "—";
}

/**
 * Reporte recién creado: código ya generado y los mismos campos que muestra
 * cualquier expediente. Se leen del servidor —no del formulario— para que lo
 * que se ve sea exactamente lo que quedó guardado.
 */
function ReporteCreado({ codigo }: { codigo: string }) {
  const { data: caso, isLoading } = useCase(codigo);

  if (isLoading || !caso) {
    return (
      <div className="flex items-center justify-center gap-2 py-14 text-[13px] text-ink-quiet">
        <Loader2 className="h-4 w-4 animate-spin" /> Cargando el reporte…
      </div>
    );
  }

  const evento = caso.evento_caso[0]?.eventos_operativos;
  const estado = caso.catalogo_detalle_casos_sop_estado_hallazgoTocatalogo_detalle.nombre;

  return (
    <>
      <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50/60 p-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-700 text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[18px] font-bold text-brand-700">{caso.codigo_sop}</span>
            <StagePill stage={stageFromEstado(estado)} />
          </div>
          <p className="mt-1 text-[12px] text-ink-quiet">
            {estado === "Recepción"
              ? "Ya está en la bandeja de Seguridad Operativa, pendiente de recepción."
              : "Pasó directo a Evaluación."}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] font-semibold leading-snug text-ink">
        {caso.titulo?.trim() || "Reporte registrado"}
      </p>

      <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        <CampoCreado
          label="Tipo de reporte"
          value={evento?.catalogo_detalle_eventos_operativos_tipo_incidenteTocatalogo_detalle?.nombre ?? "—"}
        />
        <CampoCreado
          label="Estación / Patio"
          value={evento?.catalogo_detalle_eventos_operativos_lugar_incidenteTocatalogo_detalle?.nombre ?? "—"}
        />
        {/* Un reporte de patio taller no lleva lugar específico: no se muestra
            la fila vacía. */}
        {evento?.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle && (
          <CampoCreado
            label="Lugar específico"
            value={evento.catalogo_detalle_eventos_operativos_ubicacionTocatalogo_detalle.nombre}
          />
        )}
        <CampoCreado
          label="Fecha y hora"
          value={`${formatDate(evento?.fecha ?? caso.fecha_hallazgo)}${evento?.hora ? ` · ${formatTime(evento.hora)}` : ""}`}
        />
        <CampoCreado label="Registrado por" value={caso.nombre_reportante?.trim() || "Seguridad Operativa"} />
        <CampoCreado label="Estado" value={estado} />
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Descripción</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft break-words">{caso.descripcion}</p>
      </div>

      <div className="mt-4 border-t border-line-soft pt-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
          Evidencias ({caso.anexos_caso.length})
        </p>
        {caso.anexos_caso.length === 0 ? (
          <p className="mt-1 text-[12px] text-ink-quiet">Sin evidencias adjuntas.</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {caso.anexos_caso.map((anexo) => (
              <li key={anexo.id_anexo} className="flex items-center gap-2.5 text-[12px] text-ink">
                <Paperclip className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                <span className="min-w-0 flex-1 truncate">{anexo.nombre_archivo ?? "Archivo adjunto"}</span>
                {anexo.peso && <span className="shrink-0 text-[11px] text-ink-quiet">{anexo.peso} KB</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function CampoCreado({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-ink">{value}</p>
    </div>
  );
}
