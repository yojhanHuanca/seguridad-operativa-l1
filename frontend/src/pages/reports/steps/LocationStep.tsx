import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Building2, Train } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field } from "@/features/reports/components/Field";
import { CatalogSelect } from "@/features/reports/components/CatalogSelect";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { cn } from "@/lib/utils";
import type { ReportFormValues } from "@/features/reports/schema";
import type { CatalogGroup } from "@/features/reports/types";

export function LocationStep({
  form,
  catalogs,
}: {
  form: UseFormReturn<ReportFormValues>;
  catalogs: Map<string, CatalogGroup>;
}) {
  const errors = form.formState.errors;
  const tipoUbicacion = form.watch("tipo_ubicacion");
  const lugarEspecificoValue = form.watch("id_lugar_especifico");

  const lugares = catalogs.get("Lugar de Incidente")?.catalogo_detalle ?? [];
  const estaciones = useMemo(() => lugares.filter((l) => !!l.codigo), [lugares]);
  const patios = useMemo(() => lugares.filter((l) => !l.codigo), [lugares]);
  const lugaresEspecificos = catalogs.get("Lugar Específico")?.catalogo_detalle ?? [];

  const setTipoUbicacion = (v: ReportFormValues["tipo_ubicacion"]) => {
    form.setValue("tipo_ubicacion", v, { shouldValidate: true });
    form.setValue("id_lugar", undefined as unknown as number, { shouldValidate: false });
    form.setValue("id_lugar_especifico", undefined, { shouldValidate: false });
  };

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Dónde ocurrió?</h2>
        <p className="text-sm text-ink-quiet">Indica el tipo de ubicación y los detalles específicos.</p>
      </div>

      <Field label="Tipo de ubicación" required error={errors.tipo_ubicacion?.message}>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTipoUbicacion("estacion")}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
              tipoUbicacion === "estacion"
                ? "border-brand-600 bg-brand-50 ring-1 ring-brand-200"
                : "border-border bg-card hover:-translate-y-0.5 hover:border-ink-faint hover:shadow-sm"
            )}
          >
            <SelectedCheck show={tipoUbicacion === "estacion"} />
            <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", tipoUbicacion === "estacion" ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft")}>
              <Train className="h-4 w-4" />
            </div>
            <p className="text-[13.5px] font-semibold text-ink">Estación</p>
          </button>
          <button
            type="button"
            onClick={() => setTipoUbicacion("patio_taller")}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
              tipoUbicacion === "patio_taller"
                ? "border-brand-600 bg-brand-50 ring-1 ring-brand-200"
                : "border-border bg-card hover:-translate-y-0.5 hover:border-ink-faint hover:shadow-sm"
            )}
          >
            <SelectedCheck show={tipoUbicacion === "patio_taller"} />
            <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", tipoUbicacion === "patio_taller" ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft")}>
              <Building2 className="h-4 w-4" />
            </div>
            <p className="text-[13.5px] font-semibold text-ink">Patio Taller</p>
          </button>
        </div>
      </Field>

      {tipoUbicacion === "estacion" && (
        <>
          <Field label="Estación" required error={errors.id_lugar?.message} className="mt-4">
            <CatalogSelect control={form.control} name="id_lugar" items={estaciones} placeholder="Selecciona una estación…" />
          </Field>


        </>
      )}

      {tipoUbicacion === "patio_taller" && (
        <Field label="Patio Taller" required error={errors.id_lugar?.message} className="mt-4">
          <CatalogSelect control={form.control} name="id_lugar" items={patios} placeholder="Selecciona un patio…" />
        </Field>
      )}

      {tipoUbicacion && (
        <Field label="Lugar específico" error={errors.id_lugar_especifico?.message} hint="Opcional" className="mt-4">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {lugaresEspecificos.map((item) => {
              const active = lugarEspecificoValue === item.id_detalle;
              return (
                <button
                  key={item.id_detalle}
                  type="button"
                  onClick={() =>
                    form.setValue("id_lugar_especifico", active ? undefined : item.id_detalle, { shouldValidate: true })
                  }
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-lg border px-3.5 text-[12.5px] font-medium transition-all duration-200 active:scale-[0.97]",
                    active
                      ? "border-brand-600 bg-brand-50 text-brand-800"
                      : "border-border bg-card text-ink-soft hover:border-ink-faint hover:bg-secondary/40"
                  )}
                >
                  {item.nombre}
                </button>
              );
            })}
          </div>
        </Field>
      )}
    </Card>
  );
}
