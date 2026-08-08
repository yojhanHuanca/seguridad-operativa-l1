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
