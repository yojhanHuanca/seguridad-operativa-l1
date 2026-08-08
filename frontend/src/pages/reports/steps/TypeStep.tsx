import type { UseFormReturn } from "react-hook-form";
import { AlertTriangle, Flag, HelpCircle, Lightbulb, ShieldAlert, Wrench, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field } from "@/features/reports/components/Field";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { cn } from "@/lib/utils";
import type { ReportFormValues } from "@/features/reports/schema";
import type { CatalogGroup } from "@/features/reports/types";

const ICONS: Record<string, LucideIcon> = {
  Accidente: AlertTriangle,
  Incidente: Flag,
  "Condición Insegura": Wrench,
  Hallazgo: Lightbulb,
  "Acto Inseguro": ShieldAlert,
  Otro: HelpCircle,
};

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

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Qué deseas reportar?</h2>
        <p className="text-sm text-ink-quiet">Selecciona el tipo de incidencia que observaste.</p>
      </div>

      <Field label="Tipo de reporte" required error={errors.id_tipo?.message}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = ICONS[item.nombre] ?? HelpCircle;
            const active = tipoValue === item.id_detalle;
            return (
              <button
                key={item.id_detalle}
                type="button"
                onClick={() => form.setValue("id_tipo", item.id_detalle, { shouldValidate: true })}
                className={cn(
                  "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
                  active
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-200"
                    : "border-border bg-card hover:-translate-y-0.5 hover:border-ink-faint hover:bg-secondary/40 hover:shadow-sm"
                )}
              >
                <SelectedCheck show={active} />
                <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", active ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft")}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{item.nombre}</p>
                  {item.descripcion && <p className="text-[11.5px] text-ink-quiet">{item.descripcion}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </Field>
    </Card>
  );
}
