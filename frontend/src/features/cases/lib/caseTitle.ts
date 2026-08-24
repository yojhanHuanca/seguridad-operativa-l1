/** Largo máximo de un título derivado, en caracteres. */
const MAX_TITULO = 90;

/**
 * Recorta un texto largo a algo que sirva como título.
 *
 * Los casos traen `titulo` opcional (el wizard del reportante no lo pide), así
 * que cuando falta hay que derivarlo de la descripción. El problema es que en
 * los casos importados del histórico la descripción es un informe entero de
 * varios párrafos: usarla tal cual dejaba un `<h1>` de veinte líneas que
 * empujaba toda la página hacia abajo.
 *
 * Se corta en el primer punto si cae en un largo razonable — así el título es
 * una oración completa — y si no, en el último espacio antes del límite para
 * no partir una palabra al medio.
 */
export function recortarTitulo(texto: string, maximo = MAX_TITULO): string {
  const limpio = texto.trim().replace(/\s+/g, " ");
  if (limpio.length <= maximo) return limpio;

  const finOracion = limpio.search(/\.\s/);
  if (finOracion > 0 && finOracion <= maximo) return limpio.slice(0, finOracion + 1);

  const corte = limpio.lastIndexOf(" ", maximo);
  return `${limpio.slice(0, corte > 0 ? corte : maximo)}…`;
}

/**
 * Título legible de un caso, en orden de preferencia: el que cargó quien lo
 * reportó, si no uno armado con el tipo y la estación, y como último recurso
 * el arranque de la descripción.
 */
export function tituloCaso(caso: { titulo?: string | null; descripcion: string }, tipoLabel?: string, estacion?: string): string {
  if (caso.titulo?.trim()) return caso.titulo.trim();
  if (tipoLabel && estacion) return `${tipoLabel} en ${estacion}`;
  return recortarTitulo(caso.descripcion);
}
