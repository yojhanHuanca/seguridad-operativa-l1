const active = new Set<string>();

/** Prevent overlapping imports in this server from validating the same snapshot. */
export async function withImportLock<T>(module: string, work: () => Promise<T>): Promise<T> {
  if (active.has(module)) throw new Error('Ya hay una importación de este módulo en curso. Espera a que termine y vuelve a validar.');
  active.add(module);
  try { return await work(); } finally { active.delete(module); }
}
