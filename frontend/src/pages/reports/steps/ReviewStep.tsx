import type { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field } from "@/features/reports/components/Field";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { cn } from "@/lib/utils";
import { SPRING_SNAPPY } from "@/design-system/motion/variants";
import type { ReportFormValues } from "@/features/reports/schema";
import type { CatalogGroup } from "@/features/reports/types";

function findLabel(catalogs: Map<string, CatalogGroup>, groupName: string, id?: number): string {
  if (!id) return "—";
  const item = catalogs.get(groupName)?.catalogo_detalle.find((d) => d.id_detalle === id);
  return item?.nombre ?? "—";
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 min-w-0 whitespace-pre-wrap text-sm leading-snug text-ink [overflow-wrap:anywhere]">{value || "—"}</p>
    </div>
  );
}

export function ReviewStep({
  form,
  catalogs,
  files,
}: {
  form: UseFormReturn<ReportFormValues>;
  catalogs: Map<string, CatalogGroup>;
  areas: never[]; // sin uso — el wizard no pide área
  files: File[];
}) {
  const { register, formState, watch } = form;
  const errors = formState.errors;
  const v = watch();
  const isIdentificado = v.modalidad === "identificado";
  const hasReporterError = Boolean(errors.nombre_reportante || errors.correo_reportante || errors.telefono_reportante);

  const lugarLabel =
    v.tipo_ubicacion === "patio_taller"
      ? findLabel(catalogs, "Lugar de Incidente", v.id_lugar)
      : findLabel(catalogs, "Lugar de Incidente", v.id_lugar);

  return (
    <Card className={cn("overflow-hidden p-5 shadow-[var(--shadow-card)] transition-shadow", hasReporterError && "ring-2 ring-destructive/20")}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Cómo deseas enviar tu reporte?</h2>
        <p className="text-sm text-ink-quiet">Elige la modalidad de envío.</p>
      </div>

      <div role="radiogroup" aria-label="Modalidad de envío" className="grid gap-3 sm:grid-cols-2">
        <motion.button
          type="button"
          role="radio"
          aria-checked={v.modalidad === "anonimo"}
          onClick={() => form.setValue("modalidad", "anonimo", { shouldValidate: true })}
          whileHover={{ y: -6, scale: 1.018 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_SNAPPY}
          className={cn(
            "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
            v.modalidad === "anonimo"
              ? "border-brand-700 bg-brand-50 ring-2 ring-brand-200 shadow-[0_18px_42px_-28px_rgba(15,107,62,0.65)]"
              : "border-border bg-card hover:border-brand-300 hover:bg-brand-50/35 hover:shadow-[var(--shadow-card-hover)]"
          )}
        >
          <SelectedCheck show={v.modalidad === "anonimo"} />
          <div className={cn("grid h-11 w-11 place-items-center rounded-xl transition-colors", v.modalidad === "anonimo" ? "bg-brand-700 text-white shadow-[0_10px_24px_-16px_rgba(15,107,62,0.8)]" : "bg-surface-2 text-ink-soft")}>
            <Lock className="h-4 w-4" />
          </div>
          <p className="text-[13.5px] font-semibold text-ink">Reporte Anónimo</p>
          <p className="text-[12px] text-ink-quiet">
            Tus datos personales permanecerán ocultos. El equipo de Seguridad Operativa únicamente visualizará la información del reporte.
          </p>
        </motion.button>

        <motion.button
          type="button"
          role="radio"
          aria-checked={v.modalidad === "identificado"}
          onClick={() => form.setValue("modalidad", "identificado", { shouldValidate: true })}
          whileHover={{ y: -6, scale: 1.018 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_SNAPPY}
          className={cn(
            "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
            v.modalidad === "identificado"
              ? "border-brand-700 bg-brand-50 ring-2 ring-brand-200 shadow-[0_18px_42px_-28px_rgba(15,107,62,0.65)]"
              : "border-border bg-card hover:border-brand-300 hover:bg-brand-50/35 hover:shadow-[var(--shadow-card-hover)]"
          )}
        >
          <SelectedCheck show={v.modalidad === "identificado"} />
          <div className={cn("grid h-11 w-11 place-items-center rounded-xl transition-colors", v.modalidad === "identificado" ? "bg-brand-700 text-white shadow-[0_10px_24px_-16px_rgba(15,107,62,0.8)]" : "bg-surface-2 text-ink-soft")}>
            <User className="h-4 w-4" />
          </div>
          <p className="text-[13.5px] font-semibold text-ink">Reporte Identificado</p>
          <p className="text-[12px] text-ink-quiet">
            Tus datos podrán ser visualizados únicamente por el equipo de Seguridad Operativa en caso sea necesario contactarte para ampliar la información.
          </p>
        </motion.button>
      </div>

      {isIdentificado && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-4 grid gap-4 rounded-xl border border-brand-200 bg-brand-50/35 p-4 sm:grid-cols-2"
        >
          <Field label="Nombre Completo" required error={errors.nombre_reportante?.message} className="sm:col-span-2">
            <Input placeholder="Tu nombre completo" {...register("nombre_reportante")} />
          </Field>
          <Field label="Correo Electrónico" error={errors.correo_reportante?.message} hint="Opcional">
            <Input type="email" placeholder="nombre@correo.com" {...register("correo_reportante")} />
          </Field>
          <Field label="Teléfono" error={errors.telefono_reportante?.message} hint="Opcional">
            <Input type="tel" placeholder="999 999 999" {...register("telefono_reportante")} />
          </Field>
        </motion.div>
      )}

      <div className="mt-4 min-w-0 overflow-hidden rounded-xl border border-line bg-surface/60 p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Resumen del reporte</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryRow label="Tipo de reporte" value={findLabel(catalogs, "Tipo de Reporte", v.id_tipo)} />
          <SummaryRow label={v.tipo_ubicacion === "patio_taller" ? "Patio Taller" : "Estación"} value={lugarLabel} />
          {v.id_lugar_especifico && (
            <SummaryRow label="Lugar" value={findLabel(catalogs, "Lugar Específico", v.id_lugar_especifico)} />
          )}
          <SummaryRow label="Evidencias" value={`${files.length} archivo(s)`} />
          <SummaryRow label="Modalidad" value={isIdentificado ? "Identificado" : "Anónimo"} />
        </div>
        <div className="mt-4">
          <SummaryRow label="Descripción" value={v.descripcion} />
        </div>
      </div>
    </Card>
  );
}
