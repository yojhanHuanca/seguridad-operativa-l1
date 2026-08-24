import type { UseFormReturn } from "react-hook-form";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/features/reports/components/Field";
import { cn } from "@/lib/utils";
import type { ReportFormValues } from "@/features/reports/schema";

export function DetailStep({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const { register, formState, watch } = form;
  const errors = formState.errors;
  const descripcion = watch("descripcion") ?? "";
  const nearLimit = descripcion.length >= 470;

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">Cuéntanos brevemente qué ocurrió</h2>
        <p className="text-sm text-ink-quiet">Describe lo observado y el riesgo potencial.</p>
      </div>

      <Field label="Descripción" required error={errors.descripcion?.message}>
        <Textarea
          rows={6}
          maxLength={500}
          placeholder="Describe brevemente lo que observaste y el riesgo que podría generar."
          className="transition-colors"
          {...register("descripcion")}
        />
      </Field>
      <p className={cn("mt-1.5 text-right text-xs transition-colors", nearLimit ? "font-medium text-warning-ink" : "text-ink-quiet")}>
        {descripcion.length}/500 caracteres
      </p>

      <div className="mt-3.5 flex items-start gap-2.5 rounded-lg bg-info-soft p-3.5 text-[12.5px] text-info-ink">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          No es necesario identificar responsables ni conocer las causas. Solo describe lo que observaste y el
          equipo de Seguridad Operativa realizará la evaluación correspondiente.
        </p>
      </div>
    </Card>
  );
}
