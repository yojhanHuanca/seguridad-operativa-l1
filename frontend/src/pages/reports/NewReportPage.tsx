import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Check, ChevronLeft, ChevronRight, FileSearch, Loader2, LockKeyhole, Send, ShieldCheck, TicketCheck } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { cn } from "@/lib/utils";
import { apiErrorMessage } from "@/lib/api";
import { useAuth } from "@/features/auth/auth";
import { guardarReporteLocal } from "@/features/reports/lib/misReportesLocal";
import { reportFormSchema, REPORT_STEPS, STEP_FIELDS, type ReportFormValues, type ReportStep } from "@/features/reports/schema";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useCreateReport } from "@/features/reports/hooks/useCreateReport";
import { TypeStep } from "./steps/TypeStep";
import { LocationStep } from "./steps/LocationStep";
import { DetailStep } from "./steps/DetailStep";
import { EvidenceStep } from "./steps/EvidenceStep";
import { ReviewStep } from "./steps/ReviewStep";

const STEP_LABELS: Record<ReportStep, string> = {
  tipo: "Tipo",
  ubicacion: "Ubicación",
  descripcion: "Descripción",
  evidencias: "Evidencias",
  envio: "Envío",
};

export function NewReportPage() {
  const navigate = useNavigate();
  const [introVisible, setIntroVisible] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [files, setFiles] = useState<File[]>([]);
  const step = REPORT_STEPS[stepIndex];

  const catalogs = useCatalogs();
  const createReport = useCreateReport();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema) as Resolver<ReportFormValues>,
    defaultValues: {
      tipo_ubicacion: "estacion",
      modalidad: "anonimo",
    },
  });

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields.length === 0 || (await form.trigger(fields));
    if (!valid) return;
    setDirection("forward");
    setStepIndex((i) => Math.min(i + 1, REPORT_STEPS.length - 1));
  };

  const goBack = () => {
    setDirection("back");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const { token } = useAuth();

  const onSubmit = form.handleSubmit((values) => {
    createReport.mutate(
      { values, files },
      {
        onSuccess: (result) => {
          toast.success(`Reporte ${result.codigo_sop} registrado correctamente`);
          // Sin cuenta, "Mis reportes" no existe: el código es la única forma
          // de hacer seguimiento después, por eso va a la consulta pública
          // con el código ya cargado, no a una pantalla que le pediría loguearse.
          if (token && values.modalidad === "identificado") {
            navigate("/reportes/mis-reportes?nuevo=" + encodeURIComponent(result.codigo_sop));
          } else {
            guardarReporteLocal(result.codigo_sop);
            navigate("/reportes/consulta?codigo=" + encodeURIComponent(result.codigo_sop));
          }
        },
        onError: (error) => {
          toast.error(apiErrorMessage(error, "No se pudo registrar el reporte"));
        },
      }
    );
  });

  const loadingCatalogs = catalogs.isLoading;

  if (introVisible) {
    return (
      <ReportanteShell>
        <section className="relative min-h-[calc(100svh-190px)] overflow-hidden rounded-[18px] bg-ink text-white shadow-[var(--shadow-card)]">
          <img
            src="/tren-linea1.png"
            alt="Tren de Línea 1 del Metro de Lima"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/45 to-transparent" />

          <div className="relative flex min-h-[calc(100svh-190px)] flex-col justify-end px-5 py-7 sm:px-8 sm:py-9 lg:max-w-[680px]">
            <div className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Portal de Seguridad Operativa
            </div>

            <div className="max-w-[560px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-100">Reporte ciudadano y operativo</p>
              <h1 className="mt-3 text-[38px] font-bold leading-[1.02] tracking-normal text-white sm:text-[50px]">
                Reporta una condición de seguridad
              </h1>
              <div className="mt-5 h-1 w-24 rounded-full bg-brand-400" />
              <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-white/82">
                Tu reporte ayuda a prevenir incidentes en la operación. Puedes enviarlo de forma anónima o identificada.
              </p>

              <div className="mt-7 grid gap-3 sm:max-w-[460px]">
                <Button type="button" size="lg" onClick={() => setIntroVisible(false)} className="h-12 justify-center text-[15px]">
                  <Send className="h-4 w-4" />
                  Iniciar reporte
                </Button>
                <Link to="/reportes/consulta">
                  <Button type="button" variant="outline" size="lg" className="h-12 w-full justify-center border-white/70 bg-white/5 text-white hover:bg-white/12">
                    <FileSearch className="h-4 w-4" />
                    Consultar reporte
                  </Button>
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:max-w-[560px]">
                {[
                  { icon: LockKeyhole, label: "Anónimo o identificado" },
                  { icon: TicketCheck, label: "Código de seguimiento" },
                  { icon: Camera, label: "Foto, video o PDF" },
                ].map((item) => (
                  <div key={item.label} className="bg-ink/35 px-2.5 py-3 text-center backdrop-blur">
                    <item.icon className="mx-auto h-5 w-5 text-brand-200" />
                    <p className="mt-2 text-[11.5px] font-medium leading-snug text-white/86">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ReportanteShell>
    );
  }

  return (
    <ReportanteShell>
      <div className="pb-24 sm:pb-0">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Registrar incidencia</p>
          <h1 className="mt-1 text-2xl font-bold text-ink">Reporta lo que observaste</h1>
          <p className="mt-1 text-sm text-ink-quiet">
            Toma menos de un minuto. Tú solo reportas, nosotros nos encargamos del resto.
          </p>
        </div>

        <Card className="p-4">
          <ol className="flex items-center gap-1">
            {REPORT_STEPS.map((s, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              return (
                <li key={s} className="flex flex-1 items-center last:flex-none">
                  <div
                    className={cn(
                      "flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium transition-colors duration-300",
                      done && "bg-brand-700 text-white",
                      active && "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
                      !done && !active && "bg-secondary text-ink-quiet"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full text-[11px] transition-all duration-300",
                        done && "bg-white/20",
                        active && "scale-110 bg-brand-700 text-white",
                        !done && !active && "bg-white text-ink-quiet"
                      )}
                    >
                      {done ? <Check className="h-3 w-3 animate-in zoom-in-50" /> : i + 1}
                    </span>
                    <span className="hidden sm:inline">{STEP_LABELS[s]}</span>
                  </div>
                  {i < REPORT_STEPS.length - 1 && (
                    <div className={cn("mx-1 h-0.5 flex-1 rounded-full transition-colors duration-500", done ? "bg-brand-700" : "bg-border")} />
                  )}
                </li>
              );
            })}
          </ol>
        </Card>

        <div className="mt-4">
          {loadingCatalogs ? (
            <Card className="flex items-center justify-center gap-2 p-16 text-sm text-ink-quiet">
              <Loader2 className="h-4 w-4 animate-spin" /> Cargando catálogos desde el servidor…
            </Card>
          ) : catalogs.isError ? (
            <Card className="p-8 text-center text-sm text-destructive">
              No se pudieron cargar los catálogos. Verifique que el backend esté disponible en {import.meta.env.VITE_API_URL}.
            </Card>
          ) : (
            <div
              key={step}
              className={cn(
                "animate-in fade-in duration-300",
                direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
              )}
            >
              {step === "tipo" && <TypeStep form={form} catalogs={catalogs.byName} />}
              {step === "ubicacion" && <LocationStep form={form} catalogs={catalogs.byName} />}
              {step === "descripcion" && <DetailStep form={form} />}
              {step === "evidencias" && <EvidenceStep files={files} setFiles={setFiles} />}
              {step === "envio" && <ReviewStep form={form} catalogs={catalogs.byName} areas={[]} files={files} />}
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-xl sm:static sm:z-auto sm:mt-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <Button type="button" variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
          <ChevronLeft className="h-4 w-4" /> Atrás
        </Button>
        {step !== "envio" ? (
          <Button type="button" onClick={goNext} disabled={loadingCatalogs}>
            Continuar <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" onClick={onSubmit} disabled={createReport.isPending}>
            {createReport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Enviar Reporte
          </Button>
        )}
      </div>
    </ReportanteShell>
  );
}
