import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Building2, Train } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field } from "@/features/reports/components/Field";
import { CatalogSelect } from "@/features/reports/components/CatalogSelect";
import { SelectedCheck } from "@/features/reports/components/SelectedCheck";
import { cn } from "@/lib/utils";
import { SPRING_SNAPPY } from "@/design-system/motion/variants";
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
  const hasLocationError = Boolean(errors.tipo_ubicacion || errors.id_lugar);

  const lugares = useMemo(() => catalogs.get("Lugar de Incidente")?.catalogo_detalle ?? [], [catalogs]);
  const estaciones = useMemo(() => lugares.filter((l) => !!l.codigo), [lugares]);
  const patios = useMemo(() => lugares.filter((l) => !l.codigo), [lugares]);
  const lugaresEspecificos = catalogs.get("Lugar Específico")?.catalogo_detalle ?? [];

  const setTipoUbicacion = (v: ReportFormValues["tipo_ubicacion"]) => {
    form.setValue("tipo_ubicacion", v, { shouldValidate: true });
    form.setValue("id_lugar", undefined as unknown as number, { shouldValidate: false });
    form.setValue("id_lugar_especifico", undefined, { shouldValidate: false });
  };

  return (
    <Card className={cn("p-5 shadow-[var(--shadow-card)] transition-shadow", hasLocationError && "ring-2 ring-destructive/20")}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-ink">¿Dónde ocurrió?</h2>
        <p className="text-sm text-ink-quiet">Indica el tipo de ubicación y los detalles específicos.</p>
      </div>

      <Field label="Tipo de ubicación" required error={errors.tipo_ubicacion?.message}>
        <div role="radiogroup" aria-invalid={Boolean(errors.tipo_ubicacion)} className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            role="radio"
            aria-checked={tipoUbicacion === "estacion"}
            onClick={() => setTipoUbicacion("estacion")}
            whileHover={{ y: -6, scale: 1.018 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_SNAPPY}
            className={cn(
              "relative flex min-h-[118px] flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
              tipoUbicacion === "estacion"
                ? "border-brand-700 bg-brand-50 ring-2 ring-brand-200 shadow-[0_18px_42px_-28px_rgba(15,107,62,0.65)]"
                : "border-border bg-card hover:border-brand-300 hover:bg-brand-50/35 hover:shadow-[var(--shadow-card-hover)]"
            )}
          >
            <SelectedCheck show={tipoUbicacion === "estacion"} />
            <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors", tipoUbicacion === "estacion" ? "bg-brand-700 text-white shadow-[0_10px_24px_-16px_rgba(15,107,62,0.8)]" : "bg-surface-2 text-ink-soft")}>
              <Train className="h-4 w-4" />
            </div>
            <p className="text-[13.5px] font-semibold text-ink">Estación</p>
          </motion.button>
          <motion.button
            type="button"
            role="radio"
            aria-checked={tipoUbicacion === "patio_taller"}
            onClick={() => setTipoUbicacion("patio_taller")}
            whileHover={{ y: -6, scale: 1.018 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_SNAPPY}
            className={cn(
              "relative flex min-h-[118px] flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
              tipoUbicacion === "patio_taller"
                ? "border-brand-700 bg-brand-50 ring-2 ring-brand-200 shadow-[0_18px_42px_-28px_rgba(15,107,62,0.65)]"
                : "border-border bg-card hover:border-brand-300 hover:bg-brand-50/35 hover:shadow-[var(--shadow-card-hover)]"
            )}
          >
            <SelectedCheck show={tipoUbicacion === "patio_taller"} />
            <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors", tipoUbicacion === "patio_taller" ? "bg-brand-700 text-white shadow-[0_10px_24px_-16px_rgba(15,107,62,0.8)]" : "bg-surface-2 text-ink-soft")}>
              <Building2 className="h-4 w-4" />
            </div>
            <p className="text-[13.5px] font-semibold text-ink">Patio Taller</p>
          </motion.button>
        </div>
      </Field>

      {/* El lugar específico (andén, boletería, coche…) solo aplica a una
          estación; en patio taller no se pregunta. */}
      {tipoUbicacion === "estacion" && (
        <>
          <Field label="Estación" required error={errors.id_lugar?.message} className="mt-4">
            <CatalogSelect control={form.control} name="id_lugar" items={estaciones} placeholder="Selecciona una estación…" />
          </Field>

          <Field label="Lugar específico" error={errors.id_lugar_especifico?.message} hint="Opcional" className="mt-4">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {lugaresEspecificos.map((item) => {
                const active = lugarEspecificoValue === item.id_detalle;
                return (
                  <motion.button
                    key={item.id_detalle}
                    type="button"
                    onClick={() =>
                      form.setValue("id_lugar_especifico", active ? undefined : item.id_detalle, { shouldValidate: true })
                    }
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING_SNAPPY}
                    className={cn(
                      "flex h-11 items-center gap-2 rounded-lg border px-3.5 text-[12.5px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-600/20",
                      active
                        ? "border-brand-600 bg-brand-50 text-brand-800 shadow-[0_10px_26px_-22px_rgba(15,107,62,0.55)]"
                        : "border-border bg-card text-ink-soft hover:border-brand-300 hover:bg-brand-50/35"
                    )}
                  >
                    {item.nombre}
                  </motion.button>
                );
              })}
            </div>
          </Field>
        </>
      )}

      {tipoUbicacion === "patio_taller" && (
        <Field label="Patio Taller" required error={errors.id_lugar?.message} className="mt-4">
          <CatalogSelect control={form.control} name="id_lugar" items={patios} placeholder="Selecciona un patio…" />
        </Field>
      )}
    </Card>
  );
}
