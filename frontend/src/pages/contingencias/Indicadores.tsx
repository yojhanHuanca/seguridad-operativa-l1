import { ContingenciaShell } from "@/components/layout/ContingenciaShell";

export function Indicadores() {
  return (
    <ContingenciaShell>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">Indicadores de Contingencias</h1>
          <p className="mt-1 text-sm text-ink-quiet">
            Consulta los indicadores asociados a la gestión de planes de contingencia.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <p className="text-sm text-ink-soft">
            Este es el panel de Indicadores de Contingencias. Ya no utiliza el panel de Monitorista.
          </p>
        </div>
      </div>
    </ContingenciaShell>
  );
}
