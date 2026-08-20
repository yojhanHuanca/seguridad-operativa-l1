export interface SimpleCatalogItem {
  id: number;
  nombre: string;
  /** true si el registro tiene datos asociados y no se puede eliminar. */
  blocked?: boolean;
  blockedReason?: string;
  /** false = desactivado (solo aplica a ítems de catalogo_detalle). */
  activo?: boolean;
}
