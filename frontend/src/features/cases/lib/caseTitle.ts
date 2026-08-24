interface CasoConTitulo {
  titulo?: string | null;
}

/**
 * Título de un caso, o `null` si no tiene.
 *
 * Los reportes creados desde la plataforma siempre traen uno, armado por el
 * backend con el tipo y la ubicación ("Incidente en Bayóvar · Andén norte").
 * Los casos que entran por la importación histórica no traen título, porque la
 * planilla no tiene esa columna: esos quedan sin título y punto.
 *
 * Deliberadamente no se deriva uno de la descripción. Antes se hacía, y como
 * en los casos importados la descripción es un informe de varios párrafos, el
 * encabezado del expediente terminaba siendo un pedazo de informe cortado a
 * mitad de frase. Un caso sin título se identifica por su código, y su texto
 * completo se lee en la descripción.
 */
export function tituloCaso(caso: CasoConTitulo, tipoLabel?: string, estacion?: string): string | null {
  if (caso.titulo?.trim()) return caso.titulo.trim().replace(/\s+/g, " ");
  if (tipoLabel && estacion) return `${tipoLabel} en ${estacion}`;
  return null;
}
