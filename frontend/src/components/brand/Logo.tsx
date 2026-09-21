import { cn } from "@/lib/utils";

const ASPECTO = 1536 / 1024;

interface LogoProps {
  size?: number;
  className?: string;
  withWordmark?: boolean;
  wordmark?: string;
  subtitle?: string;
  tone?: "light" | "dark";
  priority?: boolean;
}

export function Logo({
  size = 36,
  className,
  withWordmark = true,
  wordmark = "SMS L1",
  subtitle = "Seguridad Operativa · Metro de Lima",
  tone = "dark",
  priority = false,
}: LogoProps) {
  const width = Math.round(size * ASPECTO);

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img
        src="/logo-linea1.png"
        alt="Línea 1"
        width={width}
        height={size}
        className="shrink-0"
        style={{ width, height: size }}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
      />
      {withWordmark && (
        <div className="min-w-0 leading-tight">
          <p className={cn("truncate font-display text-[15px] font-bold tracking-[-0.01em]", tone === "light" ? "text-white" : "text-ink")}>
            {wordmark}
          </p>
          <p className={cn("truncate text-[10px] font-medium tracking-wide", tone === "light" ? "text-white/70" : "text-ink-quiet")}>
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
