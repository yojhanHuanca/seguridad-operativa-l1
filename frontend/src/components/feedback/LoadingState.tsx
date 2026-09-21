import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
  compact?: boolean;
};

export function LoadingState({ label = "Cargando información", className, compact = false }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 text-center text-ink-quiet",
        compact ? "py-8" : "min-h-[220px] py-12",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-brand/15 bg-brand/5 text-brand">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-brand/10 motion-reduce:animate-none" />
        <LoaderCircle className="relative h-6 w-6 animate-spin motion-reduce:animate-none" />
      </div>
      <div className="space-y-1">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <div className="flex items-center justify-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.3s] motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand [animation-delay:-0.15s] motion-reduce:animate-none" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
