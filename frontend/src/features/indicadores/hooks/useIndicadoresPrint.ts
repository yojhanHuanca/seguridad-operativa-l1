import { useEffect, useState } from "react";

/**
 * Impresión del tablero de indicadores, compartida por los paneles de Seguridad
 * Operativa y de Jefe de Área.
 *
 * Tres detalles que no son obvios y que hay que mantener juntos:
 *
 * - La hoja apaisada se pide desde `<html>` (ver `html[data-print-mode="kpis"]`
 *   en globals.css). Aplicar el `page:` a la sección exportada forzaba un salto
 *   al entrar y otro al salir, y ese segundo salto dejaba una hoja en blanco.
 * - El título del documento es lo que el navegador imprime como encabezado y lo
 *   que propone como nombre de archivo al guardar en PDF.
 * - Los gráficos (recharts) miden su ancho al montarse; imprimir en el mismo
 *   tick a veces los agarra sin medir y salen vacíos, de ahí la espera corta.
 */
export function useIndicadoresPrint(titulo: string) {
  const [printActive, setPrintActive] = useState(false);

  useEffect(() => {
    if (!printActive) return;
    document.documentElement.dataset.printMode = "kpis";
    const tituloPrevio = document.title;
    document.title = `${titulo} - ${new Date().toISOString().slice(0, 10)}`;
    const cleanup = () => setPrintActive(false);
    window.addEventListener("afterprint", cleanup, { once: true });
    return () => {
      window.removeEventListener("afterprint", cleanup);
      delete document.documentElement.dataset.printMode;
      document.title = tituloPrevio;
    };
  }, [printActive, titulo]);

  const printReport = () => {
    setPrintActive(true);
    window.setTimeout(() => window.print(), 120);
  };

  return { printActive, printReport };
}
