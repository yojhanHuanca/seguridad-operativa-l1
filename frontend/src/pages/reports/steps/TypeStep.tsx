import type { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Field } from "@/features/reports/components/Field";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { iconoTipoReporte } from "@/features/reports/lib/tipoIcons";
import { cn } from "@/lib/utils";
import { SPRING_SNAPPY } from "@/design-system/motion/variants";
import type { ReportFormValues } from "@/features/reports/schema";
import type { CatalogGroup } from "@/features/reports/types";

export function TypeStep({
  form,
  catalogs,
}: {
  form: UseFormReturn<ReportFormValues>;
  catalogs: Map<string, CatalogGroup>;
}) {
  const errors = form.formState.errors;
  const tipoValue = form.watch("id_tipo");
  const items = catalogs.get("Tipo de Reporte")?.catalogo_detalle ?? [];
  const hasError = Boolean(errors.id_tipo);

  return (
    <Card className={cn("p-5 shadow-[var(--shadow-card)] transition-shadow", hasError && "ring-2 ring-destructive/20")}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Qué deseas reportar?</h2>
        <p className="text-sm text-ink-quiet">Selecciona el tipo de incidencia que observaste.</p>
      </div>

      <Field label="Tipo de reporte" required error={errors.id_tipo?.message}>
        <div role="radiogroup" aria-invalid={hasError} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = iconoTipoReporte(item.nombre);
            const active = tipoValue === item.id_detalle;
            return (
              <motion.button
                key={item.id_detalle}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => form.setValue("id_tipo", item.id_detalle, { shouldValidate: true })}
                whileHover={{ y: -6, scale: 1.018 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
                className={cn(
                  "relative flex min-h-[142px] flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
                  active
                    ? "border-brand-700 bg-brand-50 ring-2 ring-brand-200 shadow-[0_18px_42px_-28px_rgba(15,107,62,0.65)]"
                    : "border-border bg-card hover:border-brand-300 hover:bg-brand-50/35 hover:shadow-[var(--shadow-card-hover)]"
                )}
              >
                <SelectedCheck show={active} />
                <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors", active ? "bg-brand-700 text-white shadow-[0_10px_24px_-16px_rgba(15,107,62,0.8)]" : "bg-surface-2 text-ink-soft")}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{item.nombre}</p>
                  {item.descripcion && <p className="text-[11.5px] text-ink-quiet">{item.descripcion}</p>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Field>
    </Card>
  );
}
