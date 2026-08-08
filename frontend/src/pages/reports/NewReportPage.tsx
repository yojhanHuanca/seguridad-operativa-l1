import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportanteShell } from "@/components/layout/ReportanteShell";
import { cn } from "@/lib/utils";
import { apiErrorMessage } from "@/lib/api";
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

  const onSubmit = form.handleSubmit((values) => {
    createReport.mutate(
      { values, files },
      {
        onSuccess: (result) => {
          toast.success(`Reporte ${result.codigo_sop} registrado correctamente`);
          navigate("/reportes/mis-reportes?nuevo=" + encodeURIComponent(result.codigo_sop));
        },
        onError: (error) => {
          toast.error(apiErrorMessage(error, "No se pudo registrar el reporte"));
        },
      }
    );
  });

  const loadingCatalogs = catalogs.isLoading;

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
