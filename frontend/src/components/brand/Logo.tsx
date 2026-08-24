import { cn } from "@/lib/utils";

// El archivo real (public/logo-linea1.png) es de 1536×1024, o sea 3:2 —
// no es cuadrado. Antes este componente forzaba una caja `size × size`, así que
// `object-contain` encogía el logo hasta caber en el lado corto y dejaba el
// resto en blanco: con size=110 el logo se veía a 110×73 y sobraban 37 px
// muertos dentro del propio <img>, más el alto que la cabecera reservaba para
// ellos. Ahora `size` es el ALTO real del logo y el ancho sale del aspecto.
const ASPECTO = 1536 / 1024;

interface LogoProps {
  /** Alto del logo en px. El ancho se deriva del aspecto real de la imagen. */
  size?: number;
  className?: string;
  withWordmark?: boolean;
  wordmark?: string;
  subtitle?: string;
  tone?: "light" | "dark";
}

export function Logo({
  size = 36,
  className,
  withWordmark = true,
  wordmark = "SIGMA L1",
  subtitle = "Seguridad Operativa · Metro de Lima",
  tone = "dark",
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
