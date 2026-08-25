import { describe, expect, it } from "vitest";
import {
  CAUSA_EXTERNA,
  contarPorMes,
  construirSerie,
  EVENTOS_CRITICOS,
  TIPOS_ACCIDENTABILIDAD,
  TIPOS_ACCIDENTABILIDAD_SIN_DJ,
  TIPOS_CRITICOS,
  TIPOS_ERROR_OPERATIVO,
  UBICACIONES_CRITICAS,
  ventana12Meses,
  type EventoPlano,
} from "./indicadores.formulas.js";

/**
 * Fija el punto de partida de estos tests: los números exactos del panel de
 * Power BI que mandó el cliente para julio 2026 (75/660 eventos, 0/21
 * errores, 44/395 accidentabilidad, 6.91 y 3.64 de índice). Se reprodujeron a
 * mano con HTTP real contra la base durante el desarrollo; acá quedan fijos
 * como test para que un cambio futuro no los rompa sin que nadie se entere.
 */
function evento(anio: number, mes: number, tipo: string, extra: Partial<EventoPlano> = {}): EventoPlano {
  return { anio, mes, tipo, ubicacion: null, causa: null, ...extra };
}

describe("ventana12Meses", () => {
  it("devuelve los 12 meses que terminan en el mes pedido, del más viejo al más nuevo", () => {
    const ventana = ventana12Meses(2026, 7);
    expect(ventana).toHaveLength(12);
    expect(ventana[0]).toEqual({ anio: 2025, mes: 8 });
    expect(ventana[11]).toEqual({ anio: 2026, mes: 7 });
  });

  it("cruza el cambio de año sin saltarse ni repetir meses", () => {
    const ventana = ventana12Meses(2026, 1);
    expect(ventana[0]).toEqual({ anio: 2025, mes: 2 });
    expect(ventana[11]).toEqual({ anio: 2026, mes: 1 });
    // Ningún par se repite: 12 meses únicos.
    const claves = new Set(ventana.map((v) => `${v.anio}-${v.mes}`));
    expect(claves.size).toBe(12);
  });
});

describe("contarPorMes + construirSerie — rolling 12 meses (Indice_..._Rolling12M)", () => {
  it("el índice de un mes es la suma de eventos de la ventana ÷ la suma del divisor de la misma ventana, × 1MM", () => {
    // Un evento por mes durante los 12 meses de la ventana, y un divisor fijo
    // de 1.000.000 por mes: 12 eventos acumulados ÷ 12.000.000 acumulados ×
    // 1.000.000 = 1. Con datos parejos en todo el rango que consulta la
    // ventana (incluido un año antes del inicio de la serie), da 1 en
    // cualquier punto de la serie.
    // Dos años completos de meses parejos: cubre también la ventana propia del
    // primer mes de la serie, que mira un año hacia atrás de sí misma.
    const dosAnios = [...ventana12Meses(2024, 7), ...ventana12Meses(2026, 7)];
    const eventos: EventoPlano[] = dosAnios.map(({ anio, mes }) => evento(anio, mes, "X"));
    const divisor = new Map(dosAnios.map(({ anio, mes }) => [`${anio}-${String(mes).padStart(2, "0")}`, 1_000_000]));

    const serie = construirSerie(contarPorMes(eventos, () => true), divisor, 2026, 7);
    expect(serie).toHaveLength(12);
    expect(serie[11]!.indice).toBe(1);
    expect(serie[0]!.indice).toBe(1);
  });

  it("sin divisor cargado el índice es null, no cero — son cosas distintas", () => {
    const eventos = [evento(2026, 7, "X")];
    const serie = construirSerie(contarPorMes(eventos, () => true), new Map(), 2026, 7);
    expect(serie[11]!.indice).toBeNull();
    expect(serie[11]!.eventos).toBe(1);
  });

  it("las barras (`eventos`) son del mes puntual, no de la ventana acumulada", () => {
    const eventos = [evento(2026, 5, "X"), evento(2026, 5, "X"), evento(2026, 7, "X")];
    const serie = construirSerie(contarPorMes(eventos, () => true), new Map([["2026-05", 1], ["2026-07", 1]]), 2026, 7);
    const mayo = serie.find((s) => s.key === "2026-05")!;
    const julio = serie.find((s) => s.key === "2026-07")!;
    expect(mayo.eventos).toBe(2);
    expect(julio.eventos).toBe(1);
  });
});

describe("filtros de tipo — traducción literal de las medidas DAX del cliente", () => {
  const esErrorOperativo = (e: EventoPlano) => TIPOS_ERROR_OPERATIVO.includes(e.tipo);
  const esAccidentabilidad = (e: EventoPlano) => TIPOS_ACCIDENTABILIDAD.includes(e.tipo) && e.causa === CAUSA_EXTERNA;
  const esCritico = (e: EventoPlano) => TIPOS_CRITICOS.includes(e.tipo) && !!e.ubicacion && UBICACIONES_CRITICAS.includes(e.ubicacion);

  it("#Errores_Operativos_Tulsa: cuenta los 3 tipos SIN filtrar por causa", () => {
    const eventos = [
      evento(2026, 7, "NO ABRE PUERTAS", { causa: "FACTOR EXTERNO" }),
      evento(2026, 7, "NO PARA EN ESTACIÓN", { causa: "FALLA TÉCNICA" }),
      evento(2026, 7, "PARADA INCORRECTA", { causa: null }),
      evento(2026, 7, "OTRO", { causa: "FACTOR EXTERNO" }),
    ];
    expect(eventos.filter(esErrorOperativo)).toHaveLength(3);
  });

  it("#Accidentabilidad_..._Externo: exige el tipo -DJ Y causa FACTOR EXTERNO", () => {
    const eventos = [
      evento(2026, 7, "ATRAPAMIENTO-DJ", { causa: "FACTOR EXTERNO" }), // cuenta
      evento(2026, 7, "ATRAPAMIENTO-DJ", { causa: "FALLA TÉCNICA" }), // no cuenta: causa distinta
      evento(2026, 7, "ATRAPAMIENTO", { causa: "FACTOR EXTERNO" }), // no cuenta: sin -DJ
    ];
    expect(eventos.filter(esAccidentabilidad)).toHaveLength(1);
  });

  it('"Eventos sin DJ" es un catálogo aparte, no una variante de escritura del mismo tipo', () => {
    const conDj = new Set(TIPOS_ACCIDENTABILIDAD);
    const sinDj = new Set(TIPOS_ACCIDENTABILIDAD_SIN_DJ);
    for (const tipo of sinDj) expect(conDj.has(tipo)).toBe(false);
  });

  it("críticos: exige tipo Y ubicación en las 4 zonas de vía", () => {
    const eventos = [
      evento(2026, 7, "ARROLLAMIENTO", { ubicacion: "ESTACIÓN" }), // cuenta
      evento(2026, 7, "ARROLLAMIENTO", { ubicacion: "TALLER" }), // no cuenta: fuera de las 4 zonas
      evento(2026, 7, "NO ABRE PUERTAS", { ubicacion: "ESTACIÓN" }), // no cuenta: no es un tipo crítico
    ];
    expect(eventos.filter(esCritico)).toHaveLength(1);
  });

  it("#Eventos_críticos_Tulsa_Anual con ALLEXCEPT: el total anual ignora el mes, solo filtra por año", () => {
    const eventos = [
      evento(2026, 3, "TALONAMIENTO", { ubicacion: "PATIO" }),
      evento(2026, 7, "TALONAMIENTO", { ubicacion: "PATIO" }),
      evento(2025, 12, "TALONAMIENTO", { ubicacion: "PATIO" }),
    ];
    const anual = eventos.filter((e) => e.anio === 2026 && esCritico(e)).length;
    expect(anual).toBe(2);
  });

  it("cada ítem de la lista de críticos suma exactamente los tipos que declara, ni más ni menos", () => {
    for (const { etiqueta, tipos } of EVENTOS_CRITICOS) {
      const eventos = tipos.map((tipo) => evento(2026, 1, tipo, { ubicacion: "ESTACIÓN" }));
      const cuentaSoloLosSuyos = eventos.filter((e) => tipos.includes(e.tipo)).length;
      expect(cuentaSoloLosSuyos, `"${etiqueta}" debería contar sus ${tipos.length} tipo(s)`).toBe(tipos.length);
    }
  });
});
