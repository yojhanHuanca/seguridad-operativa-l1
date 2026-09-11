import { describe, expect, it } from "vitest";
import {
  MENSAJE_TRANSEUNTE_LUGAR,
  lugaresPermitidosParaTranseunte,
  validarReglasContingencia,
} from "./contingencia.rules.js";

describe("reglas de contingencia", () => {
  it("permite transeúnte en Exteriores", () => {
    expect(() =>
      validarReglasContingencia({ categoria_paciente: "Transeúnte", lugar_exacto_evento: "Exteriores" })
    ).not.toThrow();
  });

  it("permite transeúnte en Explanada", () => {
    expect(() =>
      validarReglasContingencia({ categoria_paciente: "Transeúnte", lugar_exacto_evento: "Explanada" })
    ).not.toThrow();
  });

  it("rechaza transeúnte en un lugar exacto no permitido", () => {
    expect(() =>
      validarReglasContingencia({ categoria_paciente: "Transeúnte", lugar_exacto_evento: "Anden par" })
    ).toThrow(MENSAJE_TRANSEUNTE_LUGAR);
  });

  it("no aplica la regla cuando la categoría no es transeúnte", () => {
    expect(() =>
      validarReglasContingencia({ categoria_paciente: "Usuario", lugar_exacto_evento: "Anden par" })
    ).not.toThrow();
  });

  it("expone los lugares permitidos para la UI", () => {
    expect(lugaresPermitidosParaTranseunte()).toEqual(["Exteriores", "Explanada", "NA"]);
  });
});

it("permite NA y normaliza tildes, espacios y mayúsculas", () => {
  expect(() => validarReglasContingencia({ categoria_paciente: " TRANSEÚNTE ", lugar_exacto_evento: " na " })).not.toThrow();
});
it("exige lugar exacto para transeúnte", () => {
  expect(() => validarReglasContingencia({ categoria_paciente: "Transeúnte", lugar_exacto_evento: "" })).toThrow(MENSAJE_TRANSEUNTE_LUGAR);
});
