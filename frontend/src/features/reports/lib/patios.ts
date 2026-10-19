import type { CatalogItem } from "../types";

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

/** Acepta los nombres históricos del catálogo y devuelve las etiquetas solicitadas por Operaciones. */
export function nombrePatioCanonico(nombre: string): string | null {
  const valor = normalizar(nombre);
  if (valor === "taller villa el salvador" || valor === "patio taller villa el salvador") {
    return "Patio taller Villa El Salvador";
  }
  if (
    valor === "patio de maniobras bayovar" ||
    valor === "maniobras bayovar" ||
    valor === "taller bayovar" ||
    valor === "patio taller bayovar"
  ) {
    return "Patio de maniobras Bayovar";
  }
  return null;
}

/** Devuelve exactamente dos patios, sin duplicar filas si conviven nombres antiguos y nuevos. */
export function patiosDelCatalogo(lugares: CatalogItem[]): CatalogItem[] {
  const porNombre = new Map<string, CatalogItem>();
  for (const lugar of lugares) {
    const nombre = nombrePatioCanonico(lugar.nombre);
    if (!nombre) continue;
    const actual = porNombre.get(nombre);
    // Si ya existe el registro con el nombre oficial, preferir su ID al alias antiguo.
    if (!actual || normalizar(lugar.nombre) === normalizar(nombre)) {
      porNombre.set(nombre, { ...lugar, nombre });
    }
  }
  return ["Patio taller Villa El Salvador", "Patio de maniobras Bayovar"]
    .map((nombre) => porNombre.get(nombre))
    .filter((lugar): lugar is CatalogItem => Boolean(lugar));
}
