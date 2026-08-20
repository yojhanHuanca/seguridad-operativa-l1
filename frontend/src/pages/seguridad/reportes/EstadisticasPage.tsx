import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { EstadisticasSection } from "@/features/indicadores/components/EstadisticasSection";

export function SoEstadisticasPage() {
  return (
    <SeguridadOperativaShell>
      <div>
        <h1 className="text-[22px] font-bold text-ink tracking-tight">Estadísticas</h1>
        <p className="mt-1 text-[13px] text-ink-quiet">
          Riesgo, distribución por área y vencimientos de los planes de acción abiertos.
        </p>
      </div>

      <div className="mt-5">
        <EstadisticasSection />
      </div>
    </SeguridadOperativaShell>
  );
}
