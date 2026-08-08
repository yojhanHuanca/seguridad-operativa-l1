import { cn } from "@/lib/utils";
import type { CatalogItem } from "@/features/reports/types";

const CATEGORY_TONE: Record<string, string> = {
  Inaceptable: "bg-critical text-white",
  "No deseable": "bg-warning text-white",
  "No Deseable": "bg-warning text-white",
  "Aceptable con revisión por la gerencia": "bg-info text-white",
  "Aceptable sin revisión por la gerencia": "bg-brand-600 text-white",
};

const FILAS = ["1", "2", "3", "4"];
const COLUMNAS = ["A", "B", "C", "D", "E"];

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

  return (
    <div>
      <div className="grid grid-cols-5 gap-1.5">
        {FILAS.flatMap((fila) =>
          COLUMNAS.map((col) => {
            const codigo = `${fila}${col}`;
            const item = byCode.get(codigo);
            if (!item) return <div key={codigo} />;
            const active = item.id_detalle === value;
            return (
              <button
                key={codigo}
                type="button"
                onClick={() => onChange(item.id_detalle)}
                title={item.nombre}
                className={cn(
                  "grid h-9 place-items-center rounded-md text-[11.5px] font-semibold transition-all duration-150 active:scale-95",
                  CATEGORY_TONE[item.nombre] ?? "bg-secondary text-ink-soft",
                  active ? "ring-2 ring-ink ring-offset-1" : "opacity-55 hover:opacity-100"
                )}
              >
                {codigo}
              </button>
            );
          })
        )}
      </div>
      {selected && (
        <p className="mt-2.5 text-[12px] text-ink-soft">
          Seleccionado: <span className="font-semibold text-ink">{selected.codigo} — {selected.nombre}</span>
        </p>
      )}
    </div>
  );
}
