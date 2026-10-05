export interface PaginationOptions {
  page: number;
  limit: number;
}

const MAX_PAGE_SIZE = 100;
const MAX_OFFSET = 1_000_000;

/** Validate optional page/limit pairs without silently falling back to an unbounded query. */
export function parseOptionalPagination(pageValue?: string, limitValue?: string): PaginationOptions | undefined {
  const pageProvided = pageValue !== undefined && pageValue !== "";
  const limitProvided = limitValue !== undefined && limitValue !== "";
  if (!pageProvided && !limitProvided) return undefined;
  if (!pageProvided || !limitProvided) throw new Error("Envía page y limit juntos para paginar.");

  const page = Number(pageValue);
  const limit = Number(limitValue);
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE) {
    throw new Error(`Paginación inválida. page debe ser positivo y limit debe estar entre 1 y ${MAX_PAGE_SIZE}.`);
  }
  const offset = (page - 1) * limit;
  if (!Number.isSafeInteger(offset) || offset > MAX_OFFSET) throw new Error("La página solicitada supera el rango permitido.");
  return { page, limit };
}
