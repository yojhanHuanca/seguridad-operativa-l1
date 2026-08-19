import { cn } from "@/lib/utils";
import {
  RISK_CATEGORY_LABELS,
  RISK_CATEGORY_SHORT_LABELS,
  RISK_CATEGORY_STYLES,
  isRiskLevel,
  riskCategory,
  type RiskCategory,
  type RiskLevel,
} from "@/features/cases/domain";
import type { CatalogItem } from "@/features/reports/types";

const CRITERIOS: RiskCategory[] = ["inaceptable", "no_deseable", "aceptable_revision", "aceptable_sin_revision"];

const SEVERIDADES = [
  { codigo: "1", label: "Catastrófico" },
  { codigo: "2", label: "Crítico" },
  { codigo: "3", label: "Marginal" },
  { codigo: "4", label: "Despreciable" },
];

const PROBABILIDADES = [
  { codigo: "A", label: "Frecuente" },
  { codigo: "B", label: "Probable" },
  { codigo: "C", label: "Ocasional" },
  { codigo: "D", label: "Remoto" },
  { codigo: "E", label: "Improbable" },
];

function riskMeta(codigo: string) {
  if (!isRiskLevel(codigo)) return null;
  const category = riskCategory(codigo);
  return {
    category,
    shortLabel: RISK_CATEGORY_SHORT_LABELS[category],
    criterio: RISK_CATEGORY_LABELS[category],
    className: RISK_CATEGORY_STYLES[category],
  };
}

export function RiskMatrixPicker({
  items,
  value,
  onChange,
}: {
  items: CatalogItem[];
  value?: number | null;
  onChange: (id: number) => void;
}) {
  const byCode = new Map(items.map((i) => [i.codigo, i]));
  const selected = items.find((i) => i.id_detalle === value);
  const selectedCode = selected?.codigo && isRiskLevel(selected.codigo) ? selected.codigo : null;
  const selectedMeta = selectedCode ? riskMeta(selectedCode) : null;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-[150px_repeat(4,minmax(110px,1fr))] border-b border-line bg-surface/70">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              Probabilidad / Severidad
            </div>
            {SEVERIDADES.map((sev) => (
              <div key={sev.codigo} className="border-l border-line px-3 py-2 text-center">
                <p className="text-[12px] font-semibold text-ink">{sev.label}</p>
                <p className="text-[11px] text-ink-faint">({sev.codigo})</p>
              </div>
            ))}
          </div>

          {PROBABILIDADES.map((prob) => (
            <div key={prob.codigo} className="grid grid-cols-[150px_repeat(4,minmax(110px,1fr))] border-b border-line-soft last:border-b-0">
              <div className="px-3 py-2.5">
                <p className="text-[12px] font-semibold text-ink">{prob.label}</p>
                <p className="text-[11px] text-ink-faint">({prob.codigo})</p>
              </div>
              {SEVERIDADES.map((sev) => {
                const codigo = `${sev.codigo}${prob.codigo}`;
                const meta = riskMeta(codigo);
                const riskCode = codigo as RiskLevel;
                const item = byCode.get(codigo);
                const active = item?.id_detalle === value;
                return (
                  <div key={codigo} className="border-l border-line-soft p-1.5">
                    <button
                      type="button"
                      disabled={!item}
                      onClick={() => item && onChange(item.id_detalle)}
                      title={meta ? `${codigo} · ${meta.shortLabel} · ${meta.criterio}` : codigo}
                      className={cn(
                        "grid h-12 w-full place-items-center rounded-lg border text-[13px] font-bold transition-all duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30",
                        meta?.className ?? "bg-secondary text-ink-soft border-line",
                        active ? "ring-2 ring-ink ring-offset-2" : "opacity-80 hover:opacity-100 hover:shadow-sm"
                      )}
                    >
                      {riskCode}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px]">
        {CRITERIOS.map((cat) => (
          <span key={cat} className={cn("rounded-full border px-2.5 py-1 font-medium", RISK_CATEGORY_STYLES[cat])}>
            {RISK_CATEGORY_SHORT_LABELS[cat]}
          </span>
        ))}
      </div>

      {/* Leyenda de Criterios de Aceptabilidad del cliente: son 4 niveles
          únicamente (Alto/Grave/Medio/Bajo), no 5 — se generan desde la misma
          fuente que colorea la matriz para que nunca queden desincronizados. */}
      <div className="grid gap-2 rounded-lg border border-line bg-surface/50 p-3 text-[11.5px] text-ink-soft sm:grid-cols-2">
        {CRITERIOS.map((cat) => (
          <p key={cat}>
            <span className="font-semibold text-ink">{RISK_CATEGORY_SHORT_LABELS[cat]}:</span> {RISK_CATEGORY_LABELS[cat]}
          </p>
        ))}
      </div>

      {selected && (
        <p className="text-[12px] text-ink-soft">
          Seleccionado:{" "}
          <span className="font-semibold text-ink">
            {selected.codigo}
            {selectedMeta ? ` — ${selectedMeta.shortLabel} · ${selectedMeta.criterio}` : ` — ${selected.nombre}`}
          </span>
        </p>
      )}
    </div>
  );
}
