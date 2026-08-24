export function shortPlanCode(codigo?: string | null): string {
  const raw = codigo?.trim();
  if (!raw) return "—";

  const match = raw.match(/(?:^|[-\s])([A-Z0-9]{2,12})[-\s]*(\d+)$/i);
  if (!match) return raw;

  const prefix = match[1].toUpperCase();
  const number = Number(match[2]);
  return Number.isFinite(number) && number > 0 ? `${prefix}-${String(number).padStart(2, "0")}` : raw;
}

/**
 * Número correlativo del plan según el código real guardado por backend.
 *
 * Es la única fuente fiable del "Plan N" que ve el usuario: el backend lo
 * asigna al crear el plan y no cambia después, mientras que la posición en
 * una lista sí puede moverse.
 */
export function numeroDePlan(codigo?: string | null): number | null {
  const match = codigo?.trim().match(/(?:^|[-\s])([A-Z0-9]{2,12})[-\s]*(\d+)$/i);
  if (!match) return null;
  const numero = Number(match[2]);
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

export function compactPlanCodes(value?: string | null): string {
  return (value ?? "").replace(/\b[A-Z0-9]{2,12}[-\s]*\d+[-\s]*\d{4}[-\s]*([A-Z0-9]{2,12})[-\s]*(\d+)\b/gi, (_match, prefix, number) => {
    const numeric = Number(number);
    const normalizedPrefix = String(prefix).toUpperCase();
    return Number.isFinite(numeric) && numeric > 0 ? `${normalizedPrefix}-${String(numeric).padStart(2, "0")}` : `${normalizedPrefix}-${number}`;
  });
}
