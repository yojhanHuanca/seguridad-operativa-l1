// Portado del prototipo SIGMA L1 (pages/seguridad/IncidentMap.tsx), conectado
// a datos reales (useCases) en vez del store de localStorage. El detalle de
// SOP por caso (peligro, consecuencia, subtipo…) no viene en el listado —
// solo se pide al abrir el expediente — así que el panel de estación omite
// esa sección en vez de inventarla.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertOctagon,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock,
  FileText,
  MapPin,
  Radio,
  Shield,
  Train,
  TrendingUp,
  X,
} from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { Pill, RiskPill, StagePill } from "@/design-system/primitives/Pill";
import { useCases } from "@/features/cases/hooks/useCases";
import { toCaseRow, type CaseRow } from "@/features/cases/adapter";
import { riskCategory, type RiskLevel as DomainRiskLevel } from "@/features/cases/domain";
import { MAP_W, MAP_H, resolveStationCoords, resolveTalleresCoords } from "@/lib/stations";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { IsometricLineMap } from "./IsometricLineMap";
import { cn } from "@/lib/utils";
import { formatDateTime, relativeTime } from "@/lib/format";

type VisualRisk = "bajo" | "medio" | "alto" | "critico";

interface StationData {
  name: string;
  x: number;
  y: number;
  km: number;
  total: number;
  abiertos: number;
  cerrados: number;
  criticidad: number;
  riesgo: VisualRisk;
  ultimaIncidencia: string | null;
  area: string | null;
  ultimoTipo: string;
  cumplimiento: number;
  recentCases: CaseRow[];
}

interface TallerData {
  name: string;
  x: number;
  y: number;
  km: number;
  tipo: string;
  capacidad: string;
}

const RISK_CONFIG: Record<VisualRisk, { color: string; label: string; bg: string; text: string; ring: string }> = {
  bajo: { color: "#22c55e", label: "Bajo", bg: "bg-green-50", text: "text-green-700", ring: "ring-green-200" },
  medio: { color: "#eab308", label: "Medio", bg: "bg-yellow-50", text: "text-yellow-700", ring: "ring-yellow-200" },
  alto: { color: "#f97316", label: "Alto", bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
  critico: { color: "#ef4444", label: "Crítico", bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

const VISUAL_RISK_ORDER: Record<VisualRisk, number> = { bajo: 0, medio: 1, alto: 2, critico: 3 };

const EVENT_LABELS_ES: Record<CaseRow["type"], string> = {
  accidente: "Accidente",
  incidente: "Incidente",
  condicion_insegura: "Condición Insegura",
  hallazgo: "Hallazgo",
  acto_inseguro: "Acto Inseguro",
  otro: "Otro",
};

export function IncidentMap() {
  const { data: rawCases } = useCases();
  const cases = useMemo(() => (rawCases ?? []).map(toCaseRow), [rawCases]);
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [selectedTaller, setSelectedTaller] = useState<TallerData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const selected = selectedStation || selectedTaller;

  const { byName: catalogsByName } = useCatalogs();
  const lugares = catalogsByName.get("Lugar de Incidente")?.catalogo_detalle ?? [];
  const stationCoords = useMemo(() => resolveStationCoords(lugares), [lugares]);
  const talleres = useMemo(() => resolveTalleresCoords(lugares, stationCoords), [lugares, stationCoords]);

  const stations = useMemo(() => stationCoords.map((coord) => buildStationData(coord, cases)), [stationCoords, cases]);

  const highlightedStation = useMemo(() => {
    return (
      [...stations].sort((a, b) => {
        if (b.abiertos !== a.abiertos) return b.abiertos - a.abiertos;
        if (b.criticidad !== a.criticidad) return b.criticidad - a.criticidad;
        return b.total - a.total;
      })[0] ?? null
    );
  }, [stations]);

  useEffect(() => {
    if (!stations.length) return;
    setSelectedStation((current) => {
      if (current) {
        const fresh = stations.find((station) => station.name === current.name);
        if (fresh) return fresh;
      }
      return null;
    });
  }, [stations]);

  const linePath = useMemo(() => {
    const pts = stationCoords;
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const dx = curr.x - prev.x;
      const cp1x = prev.x + dx * 0.5;
      const cp1y = prev.y;
      const cp2x = prev.x + dx * 0.5;
      const cp2y = curr.y;
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${curr.x} ${curr.y}`;
    }
    return d;
  }, [stationCoords]);

  const kpis = useMemo(() => {
    const activas = stations.filter((station) => station.abiertos > 0).length;
    const incidenciasAbiertas = stations.reduce((sum, station) => sum + station.abiertos, 0);
    const totalCerrados = stations.reduce((sum, station) => sum + station.cerrados, 0);
    return { monitoreadas: stations.length, activas, incidenciasAbiertas, totalCerrados, topStation: highlightedStation };
  }, [stations, highlightedStation]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        <MapKpi icon={<Train className="h-4.5 w-4.5" />} label="Estaciones monitoreadas" value={kpis.monitoreadas} tone="brand" sub="Cobertura Línea 1" />
        <MapKpi icon={<Activity className="h-4.5 w-4.5" />} label="Estaciones con casos activos" value={kpis.activas} tone="info" sub="Seguimiento operativo" />
        <MapKpi icon={<AlertOctagon className="h-4.5 w-4.5" />} label="Casos abiertos" value={kpis.incidenciasAbiertas} tone="critical" sub="Pendientes de gestión" />
        <MapKpi icon={<CheckCircle2 className="h-4.5 w-4.5" />} label="Casos cerrados" value={kpis.totalCerrados} tone="brand" sub="Histórico consolidado" />
        <MapKpi
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          label="Estación prioritaria"
          value={kpis.topStation && kpis.topStation.abiertos > 0 ? kpis.topStation.name : "Sin datos"}
          tone={kpis.topStation?.riesgo === "critico" ? "critical" : "warning"}
          sub={kpis.topStation && kpis.topStation.abiertos > 0 ? `${kpis.topStation.abiertos} casos activos` : "Sin incidencias"}
          isText
        />
      </div>

      <Card padded={false} className="border-line-strong">
        <div className="relative">
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-brand-100 bg-gradient-to-r from-brand-50 to-white">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-100 border border-brand-200 grid place-items-center shrink-0">
                <Radio className="h-5 w-5 text-brand-700" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-ink tracking-tight">Tablero Operativo por Estación</p>
                {/* Derivado del catálogo de estaciones: si la lista cambia, el
                    subtítulo la sigue en vez de quedarse en una cifra fija. */}
                <p className="text-[12px] text-ink-quiet mt-0.5">
                  Vista isométrica · {stationCoords.length} estaciones · {talleres.length} talleres · altura = casos abiertos
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-2.5 py-1">
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                <span className="text-[10.5px] font-semibold text-brand-800">ACTUALIZADO</span>
              </div>
              <p className="text-[10.5px] text-ink-quiet mt-1">Sin filtros manuales</p>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#e8f0eb] via-[#e4ece7] to-[#dbe8e0]">
            <IsometricLineMap
              stations={stations}
              talleres={talleres}
              linePath={linePath}
              mapW={MAP_W}
              mapH={MAP_H}
              hovered={hovered}
              selectedName={selected?.name ?? null}
              onHover={setHovered}
              onSelectStation={(station) => {
                setSelectedStation(station);
                setSelectedTaller(null);
              }}
              onSelectTaller={(taller) => {
                setSelectedTaller(taller);
                setSelectedStation(null);
              }}
            />

            {selected && (
              <MapPopup
                x={selected.x}
                y={selected.y}
                mapW={MAP_W}
                mapH={MAP_H}
                onClose={() => {
                  setSelectedStation(null);
                  setSelectedTaller(null);
                }}
              >
                {selectedStation ? (
                  <StationPanel station={selectedStation} onClose={() => setSelectedStation(null)} />
                ) : selectedTaller ? (
                  <TallerPanel taller={selectedTaller} onClose={() => setSelectedTaller(null)} />
                ) : null}
              </MapPopup>
            )}

            <div className="flex items-center gap-4 px-4 py-3 bg-white border-t border-line">
              <span className="text-[10px] font-semibold text-ink-faint uppercase tracking-wider">Lectura por estación</span>
              {(Object.keys(RISK_CONFIG) as VisualRisk[]).map((riskKey) => (
                <div key={riskKey} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: RISK_CONFIG[riskKey].color }} />
                  <span className="text-[11px] text-ink-soft">{RISK_CONFIG[riskKey].label}</span>
                </div>
              ))}
              <div className="h-4 w-px bg-line mx-2" />
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded bg-brand-700 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">⚙</span>
                </div>
                <span className="text-[11px] text-ink-soft">Talleres</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-700" />
                <span className="text-[11px] text-ink-quiet">Seleccione una estación para revisar su detalle</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MapPopup({ x, y, mapW, mapH, children }: { x: number; y: number; mapW: number; mapH: number; onClose: () => void; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !popupRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const POPUP_W = popupRect.width;
    const POPUP_H = popupRect.height;
    const MARGIN = 12;

    let left = (x / mapW) * containerRect.width + MARGIN;
    let top = (y / mapH) * containerRect.height - POPUP_H / 2;

    if (left + POPUP_W > containerRect.width - MARGIN) {
      left = (x / mapW) * containerRect.width - POPUP_W - MARGIN;
    }
    if (left < MARGIN) {
      left = Math.max(MARGIN, (containerRect.width - POPUP_W) / 2);
    }
    if (top + POPUP_H > containerRect.height - MARGIN) {
      top = (y / mapH) * containerRect.height - POPUP_H - MARGIN;
    }
    if (top < MARGIN) {
      top = MARGIN;
    }
    if (top + POPUP_H > containerRect.height - MARGIN) {
      top = containerRect.height - POPUP_H - MARGIN;
    }

    setPos({ left, top });
    setReady(true);
  }, [x, y, mapW, mapH]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-30 pointer-events-none">
      <div
        ref={popupRef}
        className="absolute w-[320px] pointer-events-auto"
        style={{ left: pos.left, top: pos.top, opacity: ready ? 1 : 0, transition: "opacity 0.15s ease-out" }}
      >
        {children}
      </div>
    </div>
  );
}

function TallerPanel({ taller, onClose }: { taller: TallerData; onClose: () => void }) {
  return (
    <Card padded={false} className="overflow-hidden border-line-strong shadow-[0_8px_30px_rgba(12,84,49,0.18)]">
      <div className="px-5 py-4 border-b border-line-soft relative bg-brand-50">
        <button onClick={onClose} className="absolute top-3 right-3 h-7 w-7 rounded-lg grid place-items-center text-ink-quiet hover:bg-white/70 transition-colors">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-xl bg-brand-100 border border-brand-200 grid place-items-center shrink-0 ring-2 ring-brand-200">
            <span className="text-2xl">⚙</span>
          </div>
          <div className="min-w-0 pr-8">
            <p className="text-[17px] font-bold text-ink tracking-tight">{taller.name}</p>
            <p className="text-[12px] text-ink-quiet mt-0.5">Taller de mantenimiento · Línea 1</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Pill tone="brand">Taller operativo</Pill>
              <Pill tone="neutral">km {taller.km}</Pill>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-2 gap-2.5">
          <StatBox label="Tipo" value={taller.tipo} icon={<Building2 className="h-3.5 w-3.5" />} tone="neutral" isText />
          <StatBox label="Capacidad" value={taller.capacidad} icon={<Shield className="h-3.5 w-3.5" />} tone="brand" isText />
        </div>
        <div className="rounded-xl bg-surface border border-line p-4 text-center">
          <p className="text-[12.5px] font-medium text-ink">Taller de mantenimiento</p>
          <p className="text-[11.5px] text-ink-quiet mt-1">Este taller no gestiona expedientes de seguridad operativa.</p>
        </div>
      </div>
    </Card>
  );
}

function StationPanel({ station, onClose }: { station: StationData; onClose: () => void }) {
  const risk = RISK_CONFIG[station.riesgo];
  const latestCase = station.recentCases[0];

  return (
    <Card padded={false} className="overflow-hidden border-line-strong shadow-[0_8px_30px_rgba(12,84,49,0.18)] max-h-[420px] overflow-y-auto">
      <div className={cn("px-5 py-4 border-b border-line-soft relative", risk.bg)}>
        <button onClick={onClose} className="absolute top-3 right-3 h-7 w-7 rounded-lg grid place-items-center text-ink-quiet hover:bg-white/70 transition-colors">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className={cn("h-12 w-12 rounded-xl grid place-items-center shrink-0 ring-2", risk.bg, risk.text, risk.ring)}>
            <Train className="h-6 w-6" />
          </div>
          <div className="min-w-0 pr-8">
            <p className="text-[17px] font-bold text-ink tracking-tight">{station.name}</p>
            <p className="text-[12px] text-ink-quiet mt-0.5">Detalle operativo de estación · Línea 1</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Pill tone={station.riesgo === "critico" ? "critical" : station.riesgo === "alto" ? "warning" : station.riesgo === "medio" ? "info" : "brand"}>
                Riesgo {risk.label}
              </Pill>
              <Pill tone="neutral">{station.area ?? "Sin área dominante"}</Pill>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-4 gap-2.5">
          <StatBox label="Total" value={station.total} icon={<FileText className="h-3.5 w-3.5" />} />
          <StatBox label="Abiertos" value={station.abiertos} icon={<AlertOctagon className="h-3.5 w-3.5" />} tone="critical" />
          <StatBox label="Cerrados" value={station.cerrados} icon={<CheckCircle2 className="h-3.5 w-3.5" />} tone="brand" />
          <StatBox label="Cumpl." value={station.cumplimiento} suffix="%" icon={<Shield className="h-3.5 w-3.5" />} tone="neutral" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider">Nivel de atención</p>
            <span className={cn("text-[11px] font-bold", risk.text)}>{risk.label}</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${station.riesgo === "critico" ? 96 : station.riesgo === "alto" ? 72 : station.riesgo === "medio" ? 48 : 18}%`,
                background: risk.color,
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-line-soft p-4">
          <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider mb-3">Lectura de estación</p>
          <div className="space-y-2.5">
            <InfoRow icon={<CircleDot className="h-3.5 w-3.5" />} label="Último tipo registrado" value={station.ultimoTipo} />
            <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Última actualización" value={station.ultimaIncidencia ? formatDateTime(station.ultimaIncidencia) : "Sin registros"} />
            <InfoRow icon={<Building2 className="h-3.5 w-3.5" />} label="Área con mayor incidencia" value={station.area ?? "Sin asignación"} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider">Casos recientes</p>
            <Link to={`/seguridad/casos?q=${encodeURIComponent(station.name)}`} className="text-[11.5px] font-medium text-brand-700 hover:text-brand-800">
              Ver todos
            </Link>
          </div>
          {station.recentCases.length === 0 ? (
            <div className="rounded-xl bg-surface border border-line p-4 text-center">
              <p className="text-[12.5px] font-medium text-ink">Sin incidencias registradas</p>
              <p className="text-[11.5px] text-ink-quiet mt-1">Esta estación no tiene expedientes en el histórico actual.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {station.recentCases.map((item) => (
                <Link key={item.id} to={`/seguridad/casos/${item.id}`} className="block rounded-xl border border-line p-3.5 hover:border-brand-300 hover:bg-brand-50/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[12px] font-mono font-semibold text-brand-700">{item.id}</p>
                      <p className="text-[13px] font-semibold text-ink mt-1 truncate">{item.title}</p>
                      <p className="text-[11px] text-ink-quiet mt-1">{relativeTime(item.createdAt)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {item.risk && <RiskPill risk={item.risk} />}
                      <StagePill stage={item.stage} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to={`/seguridad/casos?q=${encodeURIComponent(station.name)}`}
            className="h-10 rounded-xl bg-brand-700 text-white text-[12.5px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-800 transition-colors"
          >
            Ver expedientes
            <ChevronRight className="h-4 w-4" />
          </Link>
          {latestCase ? (
            <Link
              to={`/seguridad/casos/${latestCase.id}`}
              className="h-10 rounded-xl border border-line text-[12.5px] font-semibold inline-flex items-center justify-center gap-2 text-ink hover:border-brand-300 hover:text-brand-800 transition-colors"
            >
              Último expediente
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <div className="h-10 rounded-xl border border-line bg-surface text-[12px] text-ink-faint inline-flex items-center justify-center">Sin expediente</div>
          )}
        </div>
      </div>
    </Card>
  );
}

function buildStationData(coord: { name: string; x: number; y: number; km: number }, cases: CaseRow[]): StationData {
  const stationCases = cases.filter((item) => item.station === coord.name);
  const openCases = stationCases.filter((item) => STAGE_STATUS_OPEN(item.stage));
  const closedCases = stationCases.filter((item) => item.stage === "cierre");

  const latestCase = [...stationCases].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
  const dominantArea = getDominantArea(openCases.length ? openCases : stationCases);
  const topRiskCase = [...(openCases.length ? openCases : stationCases)].sort((a, b) => {
    const riskDiff = visualRiskScore(fromDomainRisk(b.risk)) - visualRiskScore(fromDomainRisk(a.risk));
    if (riskDiff !== 0) return riskDiff;
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  })[0];

  const visualRisk = topRiskCase ? fromDomainRisk(topRiskCase.risk) : "bajo";
  const recentCases = [...stationCases].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 3);

  return {
    ...coord,
    total: stationCases.length,
    abiertos: openCases.length,
    cerrados: closedCases.length,
    criticidad: openCases.filter((item) => fromDomainRisk(item.risk) === "critico").length,
    riesgo: visualRisk,
    ultimaIncidencia: latestCase?.createdAt ?? null,
    area: dominantArea,
    ultimoTipo: latestCase ? EVENT_LABELS_ES[latestCase.type] : "Sin incidencias registradas",
    cumplimiento: stationCases.length ? Math.round((closedCases.length / stationCases.length) * 100) : 100,
    recentCases,
  };
}

function STAGE_STATUS_OPEN(stage: CaseRow["stage"]): boolean {
  return stage !== "cierre" && stage !== "rechazado";
}

function fromDomainRisk(risk: DomainRiskLevel | null): VisualRisk {
  if (!risk) return "bajo";
  const category = riskCategory(risk);
  if (category === "inaceptable") return "critico";
  if (category === "no_deseable") return "alto";
  if (category === "aceptable_revision") return "medio";
  return "bajo";
}

function visualRiskScore(risk: VisualRisk): number {
  return VISUAL_RISK_ORDER[risk];
}

function getDominantArea(cases: CaseRow[]): string | null {
  if (!cases.length) return null;
  const counts = new Map<string, number>();
  cases.forEach((item) => {
    if (item.area) counts.set(item.area, (counts.get(item.area) ?? 0) + 1);
  });
  if (!counts.size) return null;
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

function MapKpi({
  icon,
  label,
  value,
  tone,
  sub,
  isText,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone: "info" | "critical" | "brand" | "warning";
  sub: string;
  isText?: boolean;
}) {
  const tones = {
    info: "bg-info-soft text-info-ink",
    critical: "bg-critical-soft text-critical-ink",
    brand: "bg-brand-50 text-brand-700",
    warning: "bg-warning-soft text-warning-ink",
  };

  return (
    <Card className="p-4 flex items-center gap-3.5">
      <div className={cn("h-11 w-11 rounded-xl grid place-items-center shrink-0", tones[tone])}>{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-semibold text-ink-quiet uppercase tracking-wider">{label}</p>
        <p className={cn("font-bold text-ink leading-tight truncate", isText ? "text-[14px]" : "text-[22px] tabular-nums")}>{value}</p>
        <p className="text-[10.5px] text-ink-faint mt-0.5">{sub}</p>
      </div>
    </Card>
  );
}

function StatBox({
  label,
  value,
  icon,
  tone = "neutral",
  suffix = "",
  isText = false,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  tone?: "critical" | "brand" | "neutral";
  suffix?: string;
  isText?: boolean;
}) {
  const tones = { critical: "text-critical", brand: "text-brand-700", neutral: "text-ink" };
  return (
    <div className="rounded-xl border border-line-soft p-3 text-center bg-white">
      <div className={cn("flex items-center justify-center gap-1 text-ink-faint mb-1", tones[tone])}>{icon}</div>
      <p className={cn(isText ? "text-[13px] font-semibold" : "text-[20px] font-bold tabular-nums", "leading-none", tones[tone])}>
        {value}
        {suffix}
      </p>
      <p className="text-[10.5px] text-ink-quiet mt-1">{label}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="text-ink-faint shrink-0">{icon}</span>
      <span className="text-ink-quiet">{label}:</span>
      <span className="text-ink font-medium truncate">{value}</span>
    </div>
  );
}
