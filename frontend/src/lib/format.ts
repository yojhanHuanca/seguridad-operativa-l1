// Helpers de formato portados del prototipo SIGMA L1 (lib/utils.ts).
// Se mantienen idénticos para que las pantallas portadas rindan el mismo texto.

/**
 * Las columnas `@db.Date` (fecha_plan, fecha_hallazgo, prorroga_fecha…) llegan
 * como medianoche UTC exacta y representan solo un día calendario, sin hora
 * real. Formatearlas en hora local (UTC−5 en Lima) muestra el día anterior,
 * así que esas se formatean en UTC. Los timestamps con hora real sí van en
 * hora local, que es lo correcto para ellos.
 *
 * El formulario de plan trabaja con `YYYY-MM-DD` a secas (valor de un
 * `<input type="date">`), que `new Date()` también interpreta como medianoche
 * UTC. Sin contemplarlo aquí, la revisión previa al envío mostraba el día
 * anterior al que el analista había elegido.
 */
function isDateOnly(iso: string | Date): boolean {
  return typeof iso === "string" && (/T00:00:00(\.000)?Z$/.test(iso) || /^\d{4}-\d{2}-\d{2}$/.test(iso));
}

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(isDateOnly(iso) ? { timeZone: "UTC" as const } : {}),
  });
}

export function formatTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  return `${formatDate(d)} · ${formatTime(d)}`;
}

export function formatDateShort(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    ...(isDateOnly(iso) ? { timeZone: "UTC" as const } : {}),
  });
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function relativeTime(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  const diff = Date.now() - d.getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "hace instantes";
  if (min < 60) return `hace ${min} min`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `hace ${hr} h`;
  const day = Math.round(hr / 24);
  if (day < 30) return `hace ${day} d`;
  return formatDate(d);
}

export function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

// El estado del SLA vive en features/cases/lib/sla.ts, junto a la tabla de
// plazos por riesgo, para no tener dos definiciones del mismo criterio.
