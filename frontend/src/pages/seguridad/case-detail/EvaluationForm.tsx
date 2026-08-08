import { useState } from "react";
import { Check, FileSearch, Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { RiskPill } from "@/design-system/primitives/Pill";
import { RiskMatrixPicker } from "@/features/cases/components/RiskMatrixPicker";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useEvaluateCase } from "@/features/cases/hooks/useCaseActions";
import { gravedadDerivada, diasSlaPorRiesgo } from "@/features/cases/lib/sla";
import type { RiskLevel } from "@/features/cases/domain";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { CaseDetail } from "@/features/cases/types";

// Portado de pages/seguridad/CaseFile.tsx → EvaluationForm.
export function EvaluationForm({ caso }: { caso: CaseDetail }) {
  const catalogs = useCatalogs();
  const { data: areas } = useAreas();
  const { data: usuarios } = useUsers();
  const evaluate = useEvaluateCase(caso.codigo_sop);

  const riesgoItems = catalogs.byName.get("Análisis de riesgo")?.catalogo_detalle ?? [];
  const subtipos = catalogs.byName.get("Subtipo SOP")?.catalogo_detalle ?? [];
  const tiposIncidente = catalogs.byName.get("Tipo de incidente operativo")?.catalogo_detalle ?? [];

  const riesgoActual = caso.catalogo_detalle_casos_sop_analisis_riesgoTocatalogo_detalle;
  const [idRiesgo, setIdRiesgo] = useState<number | null>(riesgoActual?.id_detalle ?? null);
  const [classification, setClassification] = useState(caso.clasificacion ?? "");
  const [requiresInvestigation, setRequiresInvestigation] = useState(true);
  const [observations, setObservations] = useState("");
  const [peligro, setPeligro] = useState(caso.peligro ?? "");
  const [consecuencia, setConsecuencia] = useState(caso.consecuencia ?? "");
  const [idArea, setIdArea] = useState<string>(caso.areas ? String(caso.areas.id_area) : "");
  const [idResponsable, setIdResponsable] = useState<string>(
    caso.usuarios_casos_sop_responsable_hallazgoTousuarios
      ? String(caso.usuarios_casos_sop_responsable_hallazgoTousuarios.id_usuario)
      : ""
  );

  const cleanClassification = classification.startsWith("__otro__:")
    ? classification.slice(9).trim()
    : classification.trim();
  const canSave = cleanClassification.length > 0 && idRiesgo != null;

  const riesgoSel = riesgoItems.find((r) => r.id_detalle === idRiesgo);
  const risk = riesgoSel?.codigo as RiskLevel | undefined;
  const gravedad = gravedadDerivada(riesgoSel?.nombre);
  const diasSla = diasSlaPorRiesgo(riesgoSel?.nombre);

  const PRESETS = [
    "Reporte Voluntario",
    "Accidente",
    "No conformidad",
    "Observación",
    ...subtipos.map((s) => `Hallazgo · ${s.nombre}`),
    ...tiposIncidente.map((s) => `Incidente · ${s.nombre}`),
  ];

  const selectValue = classification.startsWith("__otro__:")
    ? "__otro__"
    : classification === "" || PRESETS.includes(classification)
      ? classification
      : "__otro__";

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-info-soft border border-info/20 p-3.5 flex items-start gap-2.5">
        <FileSearch className="h-4 w-4 text-info-ink shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-info-ink">
          <span className="font-semibold">Análisis del caso.</span> Defina el análisis de riesgo (matriz 1A-4E),
          clasificación y si requiere investigación. Al guardar, el caso pasa a Investigación o directamente a Plan de
          Acción, y arranca el plazo de atención.
        </p>
      </div>

      <Field label="Peligro">
        <Textarea value={peligro} onChange={(e) => setPeligro(e.target.value)} placeholder="Identifique el peligro o fuente de riesgo…" rows={2} />
      </Field>

      <Field label="Consecuencia">
        <Textarea value={consecuencia} onChange={(e) => setConsecuencia(e.target.value)} placeholder="Describa la posible consecuencia del peligro…" rows={2} />
      </Field>

      {/* Matriz 4×5 (severidad 1-4 × probabilidad A-E), como en el prototipo:
          se elige la celda directamente en vez de buscarla en una lista. */}
      <Field label="Análisis de riesgo (matriz 1A-4E)" required>
        {riesgoItems.length > 0 ? (
          <RiskMatrixPicker items={riesgoItems} value={idRiesgo} onChange={setIdRiesgo} />
        ) : (
          <p className="text-[12px] text-ink-faint">Cargando matriz de riesgo…</p>
        )}
        {risk && (
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <RiskPill risk={risk} showCategory />
            <span className="text-[11px] text-ink-quiet">Gravedad derivada: {gravedad ?? "—"}</span>
            {diasSla && (
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-quiet">
                <Timer className="h-3 w-3" /> Plazo de atención: {diasSla} días desde esta evaluación
              </span>
            )}
          </div>
        )}
      </Field>

      <Field label="Clasificación del caso" required>
        <Select
          value={selectValue}
          onChange={(e) => {
            if (e.target.value === "__otro__") setClassification("__otro__:");
            else setClassification(e.target.value);
          }}
        >
          <option value="">Seleccionar clasificación…</option>
          <optgroup label="Hallazgo">
            {subtipos.map((s) => (
              <option key={s.id_detalle} value={`Hallazgo · ${s.nombre}`}>
                Hallazgo · {s.nombre}
              </option>
            ))}
          </optgroup>
          <optgroup label="Incidente">
            {tiposIncidente.map((s) => (
              <option key={s.id_detalle} value={`Incidente · ${s.nombre}`}>
                Incidente · {s.nombre}
              </option>
            ))}
          </optgroup>
          <option value="Reporte Voluntario">Reporte Voluntario</option>
          <option value="Accidente">Accidente</option>
          <option value="No conformidad">No conformidad</option>
          <option value="Observación">Observación</option>
          <option value="__otro__">Otro (escribir…) </option>
        </Select>
        {classification.startsWith("__otro__:") && (
          <Input
            className="mt-2"
            value={classification.slice(9)}
            onChange={(e) => setClassification(`__otro__:${e.target.value}`)}
            placeholder="Escriba la clasificación personalizada…"
            autoFocus
          />
        )}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Área responsable">
          <Select value={idArea} onChange={(e) => setIdArea(e.target.value)}>
            <option value="">Sin asignar…</option>
            {(areas ?? []).map((a) => (
              <option key={a.id_area} value={String(a.id_area)}>
                {a.nombre_area}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Responsable del hallazgo" hint="Quien conduce la investigación desde SO">
          <Select value={idResponsable} onChange={(e) => setIdResponsable(e.target.value)}>
            <option value="">Sin asignar…</option>
            {(usuarios ?? []).map((u) => (
              <option key={u.id_usuario} value={String(u.id_usuario)}>
                {u.nombre}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="¿Requiere investigación?">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRequiresInvestigation(true)}
            className={cn(
              "flex-1 h-10 rounded-lg text-[12.5px] font-medium border transition-all",
              requiresInvestigation ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-white text-ink-soft hover:bg-surface/50"
            )}
          >
            Sí, pasa a Investigación
          </button>
          <button
            type="button"
            onClick={() => setRequiresInvestigation(false)}
            className={cn(
              "flex-1 h-10 rounded-lg text-[12.5px] font-medium border transition-all",
              !requiresInvestigation ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-white text-ink-soft hover:bg-surface/50"
            )}
          >
            No, pasa directo a Plan
          </button>
        </div>
      </Field>

      <Field label="Observaciones de la evaluación" hint="Análisis, antecedentes y criterios considerados">
        <Textarea value={observations} onChange={(e) => setObservations(e.target.value)} rows={3} placeholder="Análisis, antecedentes, criterios considerados…" />
      </Field>

      <div className="pt-3 border-t border-line-soft flex items-center justify-end gap-2">
        <Button
          size="sm"
          disabled={!canSave || evaluate.isPending}
          onClick={() =>
            evaluate.mutate(
              {
                id_riesgo: Number(idRiesgo),
                id_area: idArea ? Number(idArea) : null,
                id_responsable: idResponsable ? Number(idResponsable) : null,
                clasificacion: cleanClassification,
                peligro: peligro.trim() || null,
                consecuencia: consecuencia.trim() || null,
                observaciones: observations.trim() || null,
                requiere_investigacion: requiresInvestigation,
              },
              {
                onSuccess: () =>
                  toast.success(
                    requiresInvestigation ? "Caso evaluado, pasó a Investigación" : "Caso evaluado, pasó a Plan de Acción"
                  ),
                onError: (e) => toast.error(apiErrorMessage(e, "No se pudo evaluar el caso")),
              }
            )
          }
        >
          <Check className="h-4 w-4" /> {requiresInvestigation ? "Guardar y pasar a Investigación" : "Guardar y pasar a Plan de Acción"}
        </Button>
      </div>
    </div>
  );
}
