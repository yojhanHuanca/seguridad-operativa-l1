function parseSequenceToken(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function codeTokens(value: string) {
  return value.trim().toUpperCase().match(/[A-Z0-9]+/g) ?? [];
}

function startsWithTokens(value: string[], prefix: string[]) {
  if (prefix.length === 0 || value.length < prefix.length) return false;
  return prefix.every((token, index) => value[index] === token);
}

export function codigoPlanSequenceForCase(codigoPlan: string, codigoSop: string, prefix: string): number | null {
  const planTokens = codeTokens(codigoPlan);
  const caseTokens = codeTokens(codigoSop);
  if (!startsWithTokens(planTokens, caseTokens)) return null;

  const rest = planTokens.slice(caseTokens.length);
  const normalizedPrefix = prefix.trim().toUpperCase();
  const prefixIndex = rest.lastIndexOf(normalizedPrefix);
  if (prefixIndex < 0 || prefixIndex !== rest.length - 2) return null;

  return parseSequenceToken(rest[prefixIndex + 1]);
}

export function buildCodigoPlan(codigoSop: string, prefix: string, sequence: number) {
  return `${codigoSop}-${prefix}-${String(sequence).padStart(2, "0")}`;
}
