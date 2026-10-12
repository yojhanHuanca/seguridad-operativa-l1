export function contingenciaStorageKeys(userId?: number) {
  if (!Number.isSafeInteger(userId) || !userId || userId < 1) return null;
  return { draft: `contingencia-draft:${userId}`, flow: `contingencia-flow:${userId}` };
}
