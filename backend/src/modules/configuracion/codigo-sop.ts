function parseSequenceToken(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function codigoSopSequenceForYear(codigo: string, prefix: string, year: number): number | null {
  return codigoSopSequence(codigo, prefix, String(year));
}

export function codigoSopSequence(codigo: string, prefix: string, yearText?: string): number | null {
  const normalizedCode = codigo.trim().toUpperCase();
  const normalizedPrefix = prefix.trim().toUpperCase();
  if (!normalizedCode.startsWith(normalizedPrefix)) return null;

  const afterPrefix = normalizedCode.at(normalizedPrefix.length);
  if (afterPrefix && /[A-Z]/.test(afterPrefix)) return null;

  const numbers = Array.from(normalizedCode.matchAll(/\d+/g), (match) => match[0]);

  for (const [index, number] of numbers.entries()) {
    if (yearText ? number !== yearText : !isSupportedYearToken(number)) continue;
    return parseSequenceToken(numbers[index - 1]) ?? parseSequenceToken(numbers[index + 1]);
  }

  return null;
}

function isSupportedYearToken(value: string) {
  const year = Number(value);
  return Number.isInteger(year) && year >= 2021 && year <= 2099;
}
