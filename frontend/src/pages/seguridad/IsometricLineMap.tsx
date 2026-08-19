// Vista isométrica 2.5D de la Línea 1. Sustituye al esquema plano del
// prototipo: cada estación es un prisma extruido cuya altura es la carga de
// casos abiertos, así la lectura de "dónde se acumula el trabajo" es de un
// vistazo y no hay que comparar diámetros de círculos.
//
// Está hecha con SVG y proyección isométrica a mano, sin three.js: el volumen
// aquí es una ayuda de lectura, no una escena 3D navegable, y no justifica
// meter WebGL (~600KB y coste de GPU) en un tablero operativo.
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/design-system/motion/variants";

export type IsoRisk = "bajo" | "medio" | "alto" | "critico";

export interface IsoStation {
  name: string;
  x: number;
  y: number;
  km: number;
  abiertos: number;
  riesgo: IsoRisk;
}

export interface IsoTaller {
  name: string;
  x: number;
  y: number;
  tipo: string;
}

const RISK_COLOR: Record<IsoRisk, string> = {
  bajo: "#22c55e",
  medio: "#eab308",
  alto: "#f97316",
  critico: "#ef4444",
};

/** Semiancho del prisma y su profundidad isométrica (proporción 2:1). */
const W = 11;
const D = W * 0.5;

/**
 * Altura del prisma según casos abiertos. Crece rápido en los primeros casos
 * (que es donde está la diferencia operativa relevante) y se aplana después,
 * para que una estación con 9 casos no aplaste visualmente al resto.
 */
function alturaPrisma(abiertos: number): number {
  if (abiertos <= 0) return 9;
  return 20 + Math.min(abiertos, 8) * 9;
}

/** Cara superior del prisma: rombo isométrico a la altura h. */
function caraSuperior(x: number, y: number, h: number): string {
  const cy = y - h;
  return `${x},${cy - D} ${x + W},${cy} ${x},${cy + D} ${x - W},${cy}`;
}

/** Cara izquierda (la que recibe menos luz que la superior). */
function caraIzquierda(x: number, y: number, h: number): string {
  return `${x - W},${y - h} ${x},${y - h + D} ${x},${y + D} ${x - W},${y}`;
}

/** Cara derecha, la más oscura de las tres. */
function caraDerecha(x: number, y: number, h: number): string {
  return `${x + W},${y - h} ${x},${y - h + D} ${x},${y + D} ${x + W},${y}`;
}

export function IsometricLineMap<S extends IsoStation, T extends IsoTaller>({
  stations,
  talleres,
  linePath,
  mapW,
  mapH,
  hovered,
  selectedName,
  onHover,
  onSelectStation,
  onSelectTaller,
}: {
  stations: S[];
  talleres: T[];
  linePath: string;
  mapW: number;
  mapH: number;
  hovered: string | null;
  selectedName: string | null;
  onHover: (name: string | null) => void;
  onSelectStation: (station: S) => void;
  onSelectTaller: (taller: T) => void;
}) {
  const reduce = useReducedMotion();

  /**
   * Si no se puede animar, los prismas se pintan ya en su estado final.
   *
   * La entrada parte de scaleY 0 y opacidad 0, y esas animaciones dependen de
   * requestAnimationFrame: en una pestaña en segundo plano el navegador lo
   * congela y el mapa se quedaría en blanco hasta que alguien le diera el
   * foco. `initial={false}` hace que framer-motion pinte directamente el
   * estado de `animate`, que es lo correcto cuando nadie está mirando.
   */
  const sinEntrada = reduce || (typeof document !== "undefined" && document.hidden);

  // Algoritmo del pintor: lo que está más al fondo (menor y) se dibuja primero
  // para que los prismas del frente lo tapen. Se conserva el índice original
  // porque es el número de estación que ve el usuario.
  const enOrdenDeProfundidad = useMemo(
    () => stations.map((station, idx) => ({ station, idx })).sort((a, b) => a.station.y - b.station.y),
    [stations]
  );

  // Retícula del suelo en las dos diagonales de la proyección.
  const retícula = useMemo(() => {
    const lineas: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = -mapH; i < mapW + mapH; i += 46) {
      lineas.push({ x1: i, y1: 0, x2: i + mapH * 2, y2: mapH });
      lineas.push({ x1: i, y1: 0, x2: i - mapH * 2, y2: mapH });
    }
    return lineas;
  }, [mapW, mapH]);

  return (
    // El viewBox se extiende hacia arriba para dar aire a los prismas altos.
    <svg viewBox={`0 -70 ${mapW} ${mapH + 70}`} className="w-full h-auto block" style={{ minHeight: 480 }}>
      <defs>
        <linearGradient id="isoSuelo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef4f0" />
          <stop offset="100%" stopColor="#dde8e2" />
        </linearGradient>
        <linearGradient id="isoVia" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#14814a" />
          <stop offset="50%" stopColor="#1f9d52" />
          <stop offset="100%" stopColor="#38a860" />
        </linearGradient>
        <filter id="isoSombra" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0c5431" floodOpacity="0.22" />
        </filter>
      </defs>

      <rect x="0" y="-70" width={mapW} height={mapH + 70} fill="url(#isoSuelo)" />

      <g opacity="0.28" stroke="#a9c4b6" strokeWidth="0.6">
        {retícula.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      {/* Distritos, como manchas de suelo achatadas para leerse en perspectiva. */}
      <ellipse cx="200" cy="350" rx="130" ry="52" fill="#cfded5" opacity="0.45" />
      <ellipse cx="500" cy="150" rx="160" ry="62" fill="#cfded5" opacity="0.45" />
      <ellipse cx="800" cy="200" rx="140" ry="56" fill="#cfded5" opacity="0.45" />
      <ellipse cx="1100" cy="300" rx="110" ry="46" fill="#cfded5" opacity="0.45" />

      <path d="M 0 230 Q 400 260 800 220 T 1220 210" stroke="#a8d4e8" strokeWidth="16" fill="none" opacity="0.42" strokeLinecap="round" />

      {/* La vía como plataforma elevada: primero el canto, luego la superficie. */}
      <g>
        <path d={linePath} stroke="#0a5c34" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.30" transform="translate(0, 7)" />
        <path d={linePath} stroke="#0c6b3c" strokeWidth="10" fill="none" strokeLinecap="round" transform="translate(0, 4)" />
        <path d={linePath} stroke="url(#isoVia)" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d={linePath} stroke="#ffffff" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5" strokeDasharray="4 8" />
      </g>

      {enOrdenDeProfundidad.map(({ station, idx }) => {
        const color = RISK_COLOR[station.riesgo];
        const activa = station.abiertos > 0;
        const h = alturaPrisma(station.abiertos);
        const resaltada = hovered === station.name || selectedName === station.name;
        const cima = station.y - h;

        return (
          <motion.g
            key={station.name}
            className="cursor-pointer"
            onClick={() => onSelectStation(station)}
            onMouseEnter={() => onHover(station.name)}
            onMouseLeave={() => onHover(null)}
            initial={sinEntrada ? false : { opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.7), ease: EASE_OUT }}
            // El prisma crece desde su base, no desde el centro del lienzo.
            style={{ transformOrigin: `${station.x}px ${station.y}px`, transformBox: "view-box" }}
          >
            {/* Sombra proyectada en el suelo. */}
            <ellipse cx={station.x} cy={station.y + D + 2} rx={W + 4} ry={D + 1.5} fill="#0c5431" opacity={activa ? 0.18 : 0.1} />

            {/* Pulso de alerta al pie de las estaciones críticas. */}
            {station.riesgo === "critico" && activa && !reduce && (
              <ellipse cx={station.x} cy={station.y + D} rx={W + 8} ry={D + 4} fill={color} opacity="0.2">
                <animate attributeName="rx" values={`${W + 6};${W + 20};${W + 6}`} dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.26;0.04;0.26" dur="2.4s" repeatCount="indefinite" />
              </ellipse>
            )}

            <g filter={resaltada ? "url(#isoSombra)" : undefined}>
              <polygon points={caraIzquierda(station.x, station.y, h)} fill={color} />
              <polygon points={caraIzquierda(station.x, station.y, h)} fill="#000" opacity="0.1" />
              <polygon points={caraDerecha(station.x, station.y, h)} fill={color} />
              <polygon points={caraDerecha(station.x, station.y, h)} fill="#000" opacity="0.26" />
              <polygon points={caraSuperior(station.x, station.y, h)} fill={color} />
              <polygon points={caraSuperior(station.x, station.y, h)} fill="#fff" opacity={activa ? 0.22 : 0.55} />
              <polygon
                points={caraSuperior(station.x, station.y, h)}
                fill="none"
                stroke="#ffffff"
                strokeWidth={resaltada ? 2 : 1}
                opacity="0.85"
              />
            </g>

            {/* Número de estación sobre la cara superior. */}
            <text x={station.x} y={cima + 3} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={activa ? "#14251d" : "#4a6a5a"} pointerEvents="none">
              {idx + 1}
            </text>

            {/* Contador de casos abiertos, flotando sobre el prisma. */}
            {activa && (
              <g pointerEvents="none">
                <rect x={station.x - 11} y={cima - D - 22} width={22} height={16} rx={5} fill={color} />
                <text x={station.x} y={cima - D - 10.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
                  {station.abiertos}
                </text>
              </g>
            )}

            <text
              x={station.x}
              y={station.y + D + 16}
              textAnchor="middle"
              fontSize="9"
              fontWeight={resaltada ? "700" : "500"}
              fill={selectedName === station.name ? "#0c5431" : "#4a6a5a"}
              pointerEvents="none"
            >
              {station.name.length > 18 ? `${station.name.slice(0, 17)}…` : station.name}
            </text>
            <text x={station.x} y={station.y + D + 26} textAnchor="middle" fontSize="7.5" fill="#7a9a8a" opacity="0.65" pointerEvents="none">
              km {station.km}
            </text>
          </motion.g>
        );
      })}

      {/* Talleres: cubos bajos, para distinguirlos de las estaciones. */}
      {talleres.map((taller) => {
        const resaltado = hovered === taller.name;
        const h = 16;
        return (
          <g
            key={taller.name}
            className="cursor-pointer"
            onClick={() => onSelectTaller(taller)}
            onMouseEnter={() => onHover(taller.name)}
            onMouseLeave={() => onHover(null)}
          >
            <ellipse cx={taller.x} cy={taller.y + D + 2} rx={W + 2} ry={D} fill="#0c5431" opacity="0.16" />
            <polygon points={caraIzquierda(taller.x, taller.y, h)} fill="#0c6b3c" />
            <polygon points={caraDerecha(taller.x, taller.y, h)} fill="#084d2a" />
            <polygon points={caraSuperior(taller.x, taller.y, h)} fill="#14814a" />
            <polygon
              points={caraSuperior(taller.x, taller.y, h)}
              fill="none"
              stroke="#ffffff"
              strokeWidth={resaltado ? 2 : 1}
              opacity="0.8"
            />
            <text x={taller.x} y={taller.y - h + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" pointerEvents="none">
              ⚙
            </text>
            <text x={taller.x} y={taller.y + D + 15} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0c5431" pointerEvents="none">
              {taller.name.replace("Taller ", "T. ")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
