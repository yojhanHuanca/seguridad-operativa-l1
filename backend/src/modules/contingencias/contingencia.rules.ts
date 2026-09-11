const TRANSEUNTE_NORMALIZADO = "transeunte";
const LUGARES_TRANSEUNTE = ["Exteriores", "Explanada", "NA"] as const;

export const MENSAJE_TRANSEUNTE_LUGAR =
  "Para un transeúnte, el lugar exacto del evento debe ser Explanada, Exteriores o NA.";

function normalizar(valor?: string | null) {
  return (valor ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export interface ContextoReglaContingencia {
  categoria_paciente?: string | null;
  lugar_exacto_evento?: string | null;
}

export interface ReglaContingencia {
  codigo: string;
  validar: (ctx: ContextoReglaContingencia) => string | null;
}

export function esCategoriaTranseunte(categoria?: string | null) {
  return normalizar(categoria) === TRANSEUNTE_NORMALIZADO;
}

export function lugarExactoPermitidoParaTranseunte(lugar?: string | null) {
  const lugarNormalizado = normalizar(lugar);
  return LUGARES_TRANSEUNTE.some((permitido) => normalizar(permitido) === lugarNormalizado);
}

export const CONTINGENCIA_REGLAS: ReglaContingencia[] = [
  {
    codigo: "categoria-transeunte-lugar-exacto",
    validar: (ctx) => {
      if (!esCategoriaTranseunte(ctx.categoria_paciente)) return null;
      return lugarExactoPermitidoParaTranseunte(ctx.lugar_exacto_evento) ? null : MENSAJE_TRANSEUNTE_LUGAR;
    },
  },
];

export function validarReglasContingencia(ctx: ContextoReglaContingencia) {
  const errores = CONTINGENCIA_REGLAS.map((regla) => regla.validar(ctx)).filter(Boolean);
  if (errores.length > 0) throw new Error(errores[0] ?? MENSAJE_TRANSEUNTE_LUGAR);
}

export function lugaresPermitidosParaTranseunte() {
  return [...LUGARES_TRANSEUNTE];
}
