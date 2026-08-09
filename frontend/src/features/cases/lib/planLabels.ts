export function shortPlanCode(codigo?: string | null): string {
  const raw = codigo?.trim();
  if (!raw) return "PLA";

  const match = raw.match(/PLA[-\s]*(\d+)/i);
  if (!match) return raw;

  const number = Number(match[1]);
  return Number.isFinite(number) && number > 0 ? `PLA-${String(number).padStart(2, "0")}` : raw;
}

export function compactPlanCodes(value?: string | null): string {
  return (value ?? "").replace(/\bSOP[-\s]*\d+[-\s]*\d{4}[-\s]*PLA[-\s]*(\d+)\b/gi, (_match, number) => {
    const numeric = Number(number);
    return Number.isFinite(numeric) && numeric > 0 ? `PLA-${String(numeric).padStart(2, "0")}` : `PLA-${number}`;
  });
}
