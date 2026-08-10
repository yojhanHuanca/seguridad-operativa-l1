import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Bloque de carga. Sustituye a los textos "Cargando…" sueltos: al ocupar el
 * mismo alto que el contenido real evita que el tablero salte cuando llegan
 * los datos.
 *
 * `animate-pulse` de Tailwind ya se anula solo con el bloque de
 * prefers-reduced-motion de globals.css.
 */
export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div className={cn("animate-pulse rounded-md bg-surface-3", className)} style={style} />;
}

// Alturas fijas y no aleatorias: si cambiaran en cada render el placeholder
// parpadearía en vez de quedarse quieto mientras carga.
const ALTURAS = [45, 70, 35, 85, 55, 95, 40, 75, 60, 50, 80, 65];

/** Silueta de un gráfico de barras, para el hueco de la tendencia mensual. */
export function SkeletonChart({ height = 240 }: { height?: number }) {
  return (
    <div className="flex items-end gap-2" style={{ height }} role="status" aria-label="Cargando gráfico">
      {ALTURAS.map((alto, i) => (
        <Skeleton key={i} className="flex-1 rounded-b-none" style={{ height: `${alto}%` }} />
      ))}
    </div>
  );
}

/** Silueta de un donut, para el hueco de la distribución por tipo. */
export function SkeletonDonut({ height = 200 }: { height?: number }) {
  return (
    <div className="grid place-items-center" style={{ height }} role="status" aria-label="Cargando gráfico">
      <div
        className="animate-pulse rounded-full border-[18px] border-surface-3"
        style={{ height: height * 0.8, width: height * 0.8 }}
      />
    </div>
  );
}
