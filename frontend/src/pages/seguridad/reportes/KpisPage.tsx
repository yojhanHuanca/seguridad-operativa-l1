import { SeguridadOperativaShell } from "@/components/layout/SeguridadOperativaShell";
import { KpisSection } from "@/features/indicadores/components/KpisSection";

export function SoKpisPage() {
  return (
    <SeguridadOperativaShell>
      <div>
        <h1 className="text-[22px] font-bold text-ink tracking-tight">KPIs</h1>
        <p className="mt-1 text-[13px] text-ink-quiet">Indicadores generales de reportes SOP y planes de acción del sistema.</p>
      </div>

      <div className="mt-5">
        <KpisSection />
      </div>
    </SeguridadOperativaShell>
  );
}
