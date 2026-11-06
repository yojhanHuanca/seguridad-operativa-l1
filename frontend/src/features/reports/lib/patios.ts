import type { CatalogItem } from "../types";
import { esTaller } from "@/lib/stations";

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

/** Separa patios por su categoría explícita y conserva la compatibilidad con nombres históricos. */
export function patiosDelCatalogo(lugares: CatalogItem[]): CatalogItem[] {
  const porNombre = new Map<string, CatalogItem>();
  for (const lugar of lugares) {
    if (!esTaller(lugar.nombre, lugar.codigo)) continue;
    const nombre = lugar.codigo === "PATIO" ? lugar.nombre : nombrePatioCanonico(lugar.nombre) ?? lugar.nombre;
    const actual = porNombre.get(nombre);
    // Si ya existe el registro con el nombre oficial, preferir su ID al alias antiguo.
    if (!actual || normalizar(lugar.nombre) === normalizar(nombre)) {
      porNombre.set(nombre, { ...lugar, nombre });
    }
  }
  return [...porNombre.values()];
}
