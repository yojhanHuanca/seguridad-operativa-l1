import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  Recepción: "bg-info-soft text-info-ink border-info/20",
  Evaluación: "bg-info-soft text-info-ink border-info/20",
  "Pendiente de Información": "bg-warning-soft text-warning-ink border-warning/25",
  Investigación: "bg-warning-soft text-warning-ink border-warning/25",
  "Plan de Acción": "bg-brand-50 text-brand-800 border-brand-200",
  Ejecución: "bg-brand-50 text-brand-800 border-brand-200",
  "Prórroga Solicitada": "bg-warning-soft text-warning-ink border-warning/25",
  Verificación: "bg-info-soft text-info-ink border-info/20",
  Cerrado: "bg-secondary text-ink-soft border-border",
  Rechazado: "bg-critical-soft text-critical-ink border-critical/25",
  "En Proceso": "bg-warning-soft text-warning-ink border-warning/25",
};

const DOT: Record<string, string> = {
  Recepción: "bg-info",
  Evaluación: "bg-info",
  "Pendiente de Información": "bg-warning",
  Investigación: "bg-warning",
  "Plan de Acción": "bg-brand-600",
  Ejecución: "bg-brand-600",
  "Prórroga Solicitada": "bg-warning",
  Verificación: "bg-info",
  Cerrado: "bg-ink-faint",
  Rechazado: "bg-critical",
  "En Proceso": "bg-warning",
};

export function EstadoPill({ estado }: { estado: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-[3px] text-[10.5px] font-medium leading-none",
        TONE[estado] ?? "bg-secondary text-ink-soft border-border"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[estado] ?? "bg-ink-faint")} />
      {estado}
    </span>
  );
}
