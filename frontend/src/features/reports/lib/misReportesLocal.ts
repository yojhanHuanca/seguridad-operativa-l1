/**
 * Sin cuenta no hay dónde guardar "mis reportes" en el servidor — se guarda
 * el código en este dispositivo (localStorage) para que ConsultarReportePage
 * pueda listarlos sin que la persona tenga que copiar/recordar cada código.
 * Es best-effort: si cambia de navegador o borra datos, se pierde la lista,
 * pero el reporte en sí sigue existiendo con su código de siempre.
 */

const KEY = "sigma-l1-mis-reportes";
const MAX_GUARDADOS = 20;

export interface ReporteLocal {
  codigo: string;
  fecha: string;
}

export function guardarReporteLocal(codigo: string): void {
  try {
    const actuales = leerReportesLocales();
    const sinDuplicado = actuales.filter((r) => r.codigo !== codigo);
    const actualizado = [{ codigo, fecha: new Date().toISOString() }, ...sinDuplicado].slice(0, MAX_GUARDADOS);
    localStorage.setItem(KEY, JSON.stringify(actualizado));
  } catch {
    // localStorage puede fallar (modo privado, cuota llena) — no es crítico, se sigue sin la lista.
  }
}

export function leerReportesLocales(): ReporteLocal[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
