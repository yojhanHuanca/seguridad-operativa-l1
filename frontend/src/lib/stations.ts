// Estaciones reales de Línea 1 del Metro de Lima con su posición aproximada
// en el mapa esquemático (coordenadas del prototipo SIGMA L1, no inventadas).
export const STATION_COORDS: { name: string; x: number; y: number; km: number }[] = [
  { name: "Villa El Salvador", x: 60, y: 445, km: 0 },
  { name: "Parque Industrial", x: 88, y: 415, km: 2.2 },
  { name: "Pumacahua", x: 116, y: 385, km: 4.4 },
  { name: "Villa Maria", x: 146, y: 355, km: 6.5 },
  { name: "Maria Auxiliadora", x: 178, y: 325, km: 8.5 },
  { name: "San Juan", x: 212, y: 295, km: 10.5 },
  { name: "Atocongo", x: 248, y: 265, km: 12.5 },
  { name: "Jorge Chavez", x: 286, y: 235, km: 14.5 },
  { name: "Ayacucho", x: 326, y: 205, km: 16.5 },
  { name: "Cabitos", x: 368, y: 178, km: 18.5 },
  { name: "Angamos", x: 412, y: 155, km: 20.5 },
  { name: "San Borja Sur", x: 458, y: 136, km: 22.5 },
  { name: "La Cultura", x: 506, y: 122, km: 24.5 },
  { name: "Arriola", x: 556, y: 112, km: 26.5 },
  { name: "Gamarra", x: 606, y: 106, km: 28.0 },
  { name: "Miguel Grau", x: 656, y: 104, km: 29.5 },
  { name: "El Angel", x: 706, y: 106, km: 30.5 },
  { name: "Presbitero Maestro", x: 756, y: 112, km: 31.5 },
  { name: "Caja de Agua", x: 806, y: 122, km: 32.5 },
  { name: "Piramide del Sol", x: 856, y: 136, km: 33.0 },
  { name: "Los Jardines", x: 906, y: 155, km: 33.5 },
  { name: "Los Postes", x: 956, y: 178, km: 34.0 },
  { name: "San Carlos", x: 1006, y: 205, km: 34.5 },
  { name: "San Martin", x: 1056, y: 235, km: 35.0 },
  { name: "Santa Rosa", x: 1106, y: 265, km: 35.5 },
  { name: "Bayovar", x: 1156, y: 295, km: 34.0 },
];

export const STATIONS: string[] = STATION_COORDS.map((s) => s.name);

export const TALLERES: { name: string; x: number; y: number; km: number; tipo: string; capacidad: string }[] = [
  { name: "Taller Villa El Salvador", x: 30, y: 460, km: 0, tipo: "Mantenimiento pesado", capacidad: "8 unidades" },
  { name: "Taller Bayóvar", x: 1192, y: 320, km: 34, tipo: "Mantenimiento ligero y garaje", capacidad: "12 unidades" },
];

export const MAP_W = 1240;
export const MAP_H = 510;

/** No son estaciones de la línea, aunque vivan en el mismo catálogo "Lugar de Incidente". */
export function esTaller(nombre: string) {
  return nombre.trim().toLowerCase().startsWith("taller");
}

const NO_ES_ESTACION = new Set(["exteriores"]);

/**
 * El catálogo "Lugar de Incidente" (que administra el Admin) es la fuente de
 * verdad de qué estaciones existen — pero no tiene coordenadas para dibujar
 * el mapa. Esta función junta ambas cosas: si la estación ya tiene una
 * posición conocida (las 26 actuales), la usa tal cual; si es nueva, la
 * agrega al final del trazado extrapolando la dirección de las últimas dos
 * estaciones conocidas, para que el mapa "sienta" el alta sin que nadie
 * tenga que dibujar coordenadas a mano.
 */
/** Solo los nombres (sin coordenadas) — para widgets que no dibujan el mapa, como el conteo por estación del dashboard. */
export function stationNamesFromCatalog(catalogItems: { nombre: string }[]): string[] {
  return catalogItems.map((i) => i.nombre.trim()).filter((n) => n && !esTaller(n) && !NO_ES_ESTACION.has(n.toLowerCase()));
}

export function resolveStationCoords(catalogItems: { nombre: string }[]): { name: string; x: number; y: number; km: number }[] {
  const nombresCatalogo = catalogItems.map((i) => i.nombre.trim()).filter((n) => n && !esTaller(n) && !NO_ES_ESTACION.has(n.toLowerCase()));

  const conocidas = new Map(STATION_COORDS.map((s) => [s.name.toLowerCase(), s]));
  const resultado: { name: string; x: number; y: number; km: number }[] = [];

  for (const nombre of nombresCatalogo) {
    const known = conocidas.get(nombre.toLowerCase());
    if (known) {
      resultado.push(known);
      continue;
    }

    const ultimo = resultado[resultado.length - 1] ?? STATION_COORDS[STATION_COORDS.length - 1];
    const penultimo = resultado[resultado.length - 2] ?? STATION_COORDS[STATION_COORDS.length - 2] ?? ultimo;
    const dx = ultimo.x - penultimo.x || 50;
    const dy = ultimo.y - penultimo.y || 30;
    const dkm = ultimo.km - penultimo.km || 2;

    resultado.push({ name: nombre, x: ultimo.x + dx, y: ultimo.y + dy, km: Math.round((ultimo.km + dkm) * 10) / 10 });
  }

  return resultado;
}

/**
 * Mismo criterio que resolveStationCoords, pero para los talleres — con una
 * diferencia importante: un taller nuevo NO se agrega "siguiendo la línea"
 * como una estación más, porque no lo es. Se ubica pegado a la última
 * estación real del trazado (como ya hace "Taller Bayóvar" con Bayovar), con
 * un pequeño desplazamiento hacia abajo para que se lea como lo que es: un
 * taller al costado de la vía, no una parada más.
 */
export function resolveTalleresCoords(
  catalogItems: { nombre: string }[],
  stationCoords: { x: number; y: number; km: number }[]
): { name: string; x: number; y: number; km: number; tipo: string; capacidad: string }[] {
  const nombresTalleres = catalogItems.map((i) => i.nombre.trim()).filter(esTaller);

  const conocidos = new Map(TALLERES.map((t) => [t.name.toLowerCase(), t]));
  const resultado: { name: string; x: number; y: number; km: number; tipo: string; capacidad: string }[] = [];
  const ultimaEstacion = stationCoords[stationCoords.length - 1];
  let nuevosSinUbicacion = 0;

  for (const nombre of nombresTalleres) {
    const known = conocidos.get(nombre.toLowerCase());
    if (known) {
      resultado.push(known);
      continue;
    }

    nuevosSinUbicacion += 1;
    const base = ultimaEstacion ?? TALLERES[TALLERES.length - 1];
    resultado.push({
      name: nombre,
      x: base.x + 36,
      y: base.y + 25 * nuevosSinUbicacion,
      km: base.km,
      tipo: "Sin clasificar",
      capacidad: "—",
    });
  }

  return resultado;
}
