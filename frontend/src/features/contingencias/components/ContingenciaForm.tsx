import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  Ambulance,
  Ban,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileText,
  HeartPulse,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";
import { Button } from "@/design-system/primitives/Button";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useContingenciaCatalogos } from "../hooks/useContingencias";
import { CONTINGENCIA_FIELDS, formValues, type ContingenciaField, type ContingenciaFormValues } from "../fields";
import { CONTINGENCIA_RULES, allowedOption } from "../rules";
import type { ContingenciaCatalogo, CreateContingenciaDto } from "../types";

interface Props {
  initialData?: Partial<CreateContingenciaDto>;
  onSubmit: (data: CreateContingenciaDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

type FlowId = "spaa" | "ambulancia_spaa" | "ambulancia_terceros" | "sin_traslado";
type FieldName = keyof CreateContingenciaDto;
const FLOW_STORAGE_KEY = "contingencia-flow";

const BASIC_FIELDS: FieldName[] = [
  "fecha",
  "hora_reporte",
  "tipo_evento",
  "lugar_evento",
  "categoria_paciente",
  "lugar_exacto_evento",
  "quien_reporta",
  "medio_comunicacion_primer_reporte",
  "estado_usuario_reportado",
  "acepta_atencion",
  "atencion_inicial",
  "atencion_final",
  "nivel_inicial",
  "nivel_final",
];

const FIRST_AID_FIELDS: FieldName[] = [
  "estacion_partida_spaa",
  "medio_transporte_spaa",
  "trasladado_por",
];

const AMBULANCE_FIELDS: FieldName[] = [
  "estacion_partida_ambulancia",
  "estacion_llegada_ambulancia",
];

const PERSON_FIELDS: FieldName[] = [
  "nombre_persona",
  "dni",
  "sexo",
  "edad",
  "tarjeta_cliente",
  "extranjero",
];

const TRAVEL_FIELDS: FieldName[] = [
  "tipo_declaracion_jurada",
  "nro_declaracion_jurada",
  "breve_descripcion_hecho",
  "extranjero",
  "estacion_origen_usuario",
  "estacion_destino_usuario",
  "acompanante",
  "numero_dni_acompanante",
  "reserva_camaras",
  "observacion",
];

const DIAGNOSIS_FIELDS: FieldName[] = [
  "reporte_pco",
  "reporte_cliente",
  "diagnostico_presuntivo",
  "sintomas_presentados",
  "zona_lesion",
  "nombre_personal_salud",
];

const ATTENTION_DETAILS_FIELDS: FieldName[] = [
  ...PERSON_FIELDS,
  ...DIAGNOSIS_FIELDS,
  ...TRAVEL_FIELDS,
];

const MANAGER_FIELDS: FieldName[] = [
  "registro",
  "revision",
];

const TIME_FIELDS: FieldName[] = [
  "hora_reporte",
  "hora_llamado_pco_sppa",
  "hora_llegada_spaa",
  "hora_inicio_spaa",
  "hora_termino_atencion_inicio_traslado",
  "hora_llamado_ambulancia",
  "hora_llegada_estacion",
  "hora_salida_centro_salud",
  "hora_llegada_centro_medico",
  "hora_retiro_centro_medico",
  "hora_retorno_puesto",
  "hora_llamado_ambulancia_tercero",
  "hora_llegada_ambulancia_terceros",
  "hora_inicio_traslado_ambulancia_terceros",
];

const TIMELINE_BY_FLOW: Record<FlowId, FieldName[]> = {
  spaa: ["hora_reporte", "hora_llamado_pco_sppa", "hora_llegada_spaa", "hora_inicio_spaa", "hora_termino_atencion_inicio_traslado"],
  ambulancia_spaa: [
    "hora_reporte",
    "hora_llamado_pco_sppa",
    "hora_llegada_spaa",
    "hora_inicio_spaa",
    "hora_termino_atencion_inicio_traslado",
    "hora_llamado_ambulancia",
    "hora_llegada_estacion",
    "hora_salida_centro_salud",
    "hora_llegada_centro_medico",
    "hora_retorno_puesto",
  ],
  ambulancia_terceros: [
    "hora_reporte",
    "hora_llamado_ambulancia_tercero",
    "hora_llegada_ambulancia_terceros",
    "hora_inicio_traslado_ambulancia_terceros",
  ],
  sin_traslado: ["hora_reporte"],
};

const FLOW_OPTIONS: { id: FlowId; label: string; icon: ReactNode }[] = [
  { id: "spaa", label: "SPAA", icon: <HeartPulse className="h-4 w-4" /> },
  { id: "ambulancia_spaa", label: "Ambulancia SPAA", icon: <Ambulance className="h-4 w-4" /> },
  { id: "ambulancia_terceros", label: "Ambulancia terceros", icon: <Ambulance className="h-4 w-4" /> },
  { id: "sin_traslado", label: "Sin traslado", icon: <Ban className="h-4 w-4" /> },
];

type FieldGroup = { title: string; description: string; fields: FieldName[] };
type AccordionSection = { id: string; title: string; subtitle: string; icon: ReactNode; fields: FieldName[]; groups?: FieldGroup[] };

const ACCORDIONS_BASE: AccordionSection[] = [
  {
    id: "firstAid",
    title: "Soporte de primeros auxilios",
    subtitle: "SPAA, medio de transporte y trasladado por",
    icon: <ClipboardList className="h-5 w-5" />,
    fields: FIRST_AID_FIELDS,
  },
  {
    id: "ambulance",
    title: "Traslado ambulancia",
    subtitle: "Estaciones de partida y llegada de la ambulancia",
    icon: <Ambulance className="h-5 w-5" />,
    fields: AMBULANCE_FIELDS,
  },
  {
    id: "attentionData",
    title: "Datos de la atención",
    subtitle: "Persona, diagnóstico, declaración y observaciones",
    icon: <UserRound className="h-5 w-5" />,
    fields: ATTENTION_DETAILS_FIELDS,
    groups: [
      {
        title: "Persona y categoría",
        description: "Datos principales de la persona atendida. La categoría se selecciona arriba para activar reglas.",
        fields: PERSON_FIELDS,
      },
      {
        title: "Diagnóstico y atención",
        description: "Reporte, diagnóstico, síntomas y personal de salud.",
        fields: DIAGNOSIS_FIELDS,
      },
      {
        title: "Declaración, recorrido y cierre",
        description: "Mantiene el orden del Excel desde declaración jurada hasta observación.",
        fields: TRAVEL_FIELDS,
      },
    ],
  },
  {
    id: "manager",
    title: "Gestor de atención",
    subtitle: "Registro y revisión final",
    icon: <FileText className="h-5 w-5" />,
    fields: MANAGER_FIELDS,
  },
];

const FIELD_BY_NAME = new Map(CONTINGENCIA_FIELDS.map((field) => [field.name, field]));

function field(name: FieldName) {
  const found = FIELD_BY_NAME.get(name);
  if (!found) throw new Error(`Campo de contingencia no registrado: ${String(name)}`);
  return found;
}

function nowHHmm() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function addMinutes(value: string, minutes: number) {
  const [hours, mins] = value.split(":").map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(mins)) return nowHHmm();
  const date = new Date();
  date.setHours(hours, mins + minutes, 0, 0);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

function catalogValue(catalogos: ContingenciaCatalogo[] | undefined, codigo: string, candidates: string[]) {
  const items = catalogos?.find((catalogo) => catalogo.codigo === codigo)?.items ?? [];
  return items.find((item) => candidates.some((candidate) => normalize(item.valor) === normalize(candidate)))?.valor;
}

function fieldCompletion(values: ContingenciaFormValues, fields: FieldName[]) {
  return fields.filter((name) => values[name]?.trim()).length;
}

function timelineLabel(label: string) {
  const cleaned = label.replace(/^Hora de /i, "").replace(/^HORA DE /i, "").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function ContingenciaForm({ initialData, onSubmit, onCancel, isSubmitting = false }: Props) {
  const [values, setValues] = useState(() => formValues(initialData));
  const [errors, setErrors] = useState<Partial<ContingenciaFormValues>>({});
  const [notice, setNotice] = useState("");
  const [flow, setFlow] = useState<FlowId>(() => {
    const saved = window.localStorage.getItem(FLOW_STORAGE_KEY);
    return FLOW_OPTIONS.some((option) => option.id === saved) ? saved as FlowId : "spaa";
  });
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    firstAid: true,
    ambulance: true,
    attentionData: false,
    manager: false,
  });
  const { data: catalogos, isPending, error, refetch } = useContingenciaCatalogos();

  const activeRules = CONTINGENCIA_RULES.filter((rule) => rule.applies(values));
  const timelineFields = TIMELINE_BY_FLOW[flow];
  const accordions = useMemo(() => ACCORDIONS_BASE, []);
  const progressFields = useMemo(() => [...BASIC_FIELDS, ...timelineFields, ...FIRST_AID_FIELDS, ...AMBULANCE_FIELDS], [timelineFields]);
  const completed = fieldCompletion(values, progressFields);
  const percent = Math.round((completed / progressFields.length) * 100);

  useEffect(() => {
    window.localStorage.setItem(FLOW_STORAGE_KEY, flow);
  }, [flow]);

  function applyRules(next: ContingenciaFormValues, nextErrors: Partial<ContingenciaFormValues>) {
    let message = "";
    for (const rule of CONTINGENCIA_RULES) {
      if (rule.applies(next) && next[rule.target] && !rule.allows(next[rule.target])) {
        next[rule.target] = "";
        message = rule.message;
        nextErrors[rule.target] = message;
      }
    }
    setNotice(message);
  }

  function update(name: FieldName, value: string) {
    const next = { ...values, [name]: value };
    const nextErrors = { ...errors, [name]: undefined };
    applyRules(next, nextErrors);
    setValues(next);
    setErrors(nextErrors);
  }

  function updateMany(updates: Partial<Record<FieldName, string>>) {
    const next = { ...values, ...updates };
    const nextErrors = { ...errors };
    for (const name of Object.keys(updates) as FieldName[]) nextErrors[name] = undefined;
    applyRules(next, nextErrors);
    setValues(next);
    setErrors(nextErrors);
  }

  function chooseFlow(nextFlow: FlowId) {
    setFlow(nextFlow);
    const noTraslado = catalogValue(catalogos, "trasladado_por", ["NO REQUIERE TRASLADO", "NO REQUIERE TRASLADO "]);
    const ambulanciaSpaa = catalogValue(catalogos, "trasladado_por", ["AMBULANCIA SPAA"]);
    const terceros = catalogValue(catalogos, "trasladado_por", ["BOMBEROS", "SAMU", "PNP"]);
    const sameStation = catalogValue(catalogos, "estacion_de_partida_del_spaa", ["MISMA ESTACION", "MISMA ESTACIÓN"]);
    const updates: Partial<Record<FieldName, string>> = {};

    if (nextFlow === "sin_traslado" || nextFlow === "spaa") {
      if (noTraslado) updates.trasladado_por = noTraslado;
      for (const name of [
        "estacion_partida_ambulancia",
        "estacion_llegada_ambulancia",
        "hora_llamado_ambulancia",
        "hora_llegada_estacion",
        "hora_salida_centro_salud",
        "hora_llegada_centro_medico",
        "hora_retiro_centro_medico",
        "hora_retorno_puesto",
        "hora_llamado_ambulancia_tercero",
        "hora_llegada_ambulancia_terceros",
        "hora_inicio_traslado_ambulancia_terceros",
      ] as FieldName[]) updates[name] = "";
    }
    if (nextFlow === "ambulancia_spaa" && ambulanciaSpaa) updates.trasladado_por = ambulanciaSpaa;
    if (nextFlow === "ambulancia_terceros" && terceros) updates.trasladado_por = terceros;
    if ((nextFlow === "spaa" || nextFlow === "ambulancia_spaa") && sameStation && !values.estacion_partida_spaa) updates.estacion_partida_spaa = sameStation;
    updateMany(updates);
  }

  function validate(fields: ContingenciaField[]) {
    const found: Partial<ContingenciaFormValues> = {};
    for (const item of fields) {
      const value = values[item.name];
      if (item.required && !value.trim()) found[item.name] = item.label + " es obligatorio";
      if (!value) continue;
      if (item.type === "date" && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) found[item.name] = "Ingresa una fecha válida";
      if (item.type === "time" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) found[item.name] = "Ingresa una hora válida";
      if (item.type === "number" && (!/^\d+$/.test(value) || Number(value) > 2147483647)) found[item.name] = "Ingresa un número entero válido";
      if (item.max && value.length > item.max) found[item.name] = "Máximo " + item.max + " caracteres";
      if (item.catalog && !catalogos?.find((catalogo) => catalogo.codigo === item.catalog)?.items.some((catalogItem) => catalogItem.valor === value)) found[item.name] = "Selecciona una opción disponible";
    }
    for (const rule of CONTINGENCIA_RULES) {
      if (fields.some((item) => item.name === rule.target || item.name === rule.source) && rule.applies(values) && !rule.allows(values[rule.target])) found[rule.target] = rule.message;
    }
    return found;
  }

  function submitValues() {
    if (isSubmitting) return;
    const found = validate(CONTINGENCIA_FIELDS);
    setErrors(found);
    const invalid = CONTINGENCIA_FIELDS.find((item) => found[item.name]);
    if (invalid) {
      document.getElementById("cont-" + invalid.name)?.focus();
      return;
    }
    const { edad, estado, ...rest } = values;
    onSubmit({ ...rest, ...(edad !== "" ? { edad: Number(edad) } : {}), estado: estado as CreateContingenciaDto["estado"] });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    submitValues();
  }

  function quickTime(name: FieldName, action: "now" | "plus5" | "na") {
    if (action === "na") {
      update(name, "");
      return;
    }
    if (action === "now") {
      update(name, nowHHmm());
      return;
    }
    const index = timelineFields.indexOf(name);
    const previous = [...timelineFields.slice(0, index)].reverse().find((candidate) => values[candidate]);
    update(name, addMinutes(values[name] || (previous ? values[previous] : values.hora_reporte) || nowHHmm(), 5));
  }

  function renderField(item: ContingenciaField, compact = false) {
    const value = values[item.name];
    const inputProps = {
      id: "cont-" + item.name,
      name: item.name,
      value,
      required: item.required,
      "aria-invalid": Boolean(errors[item.name]),
      "aria-describedby": errors[item.name] ? "error-" + item.name : undefined,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(item.name, event.target.value),
    };
    const items = catalogos?.find((catalogo) => catalogo.codigo === item.catalog)?.items ?? [];
    return (
      <div key={item.name} className={cn(item.type === "textarea" ? "min-w-0 sm:col-span-2 xl:col-span-3" : "min-w-0")}>
        <Field label={item.label} required={item.required}>
          {item.catalog ? (
            <Select {...inputProps}>
              <option value="">Seleccionar...</option>
              {items.filter((catalogItem) => allowedOption(item.name, catalogItem.valor, values)).map((catalogItem) => (
                <option key={catalogItem.id_item + catalogItem.valor} value={catalogItem.valor}>{catalogItem.valor.trim()}</option>
              ))}
            </Select>
          ) : item.type === "textarea" ? (
            <Textarea {...inputProps} maxLength={item.max} className={compact ? "min-h-[76px]" : undefined} />
          ) : (
            <Input {...inputProps} type={item.type ?? "text"} maxLength={item.max} min={item.type === "number" ? 0 : undefined} step={item.type === "number" ? 1 : undefined} />
          )}
        </Field>
        {activeRules.filter((rule) => rule.target === item.name).map((rule) => <p key={rule.code} className="mt-2 text-xs text-brand-800">{rule.message}</p>)}
        {errors[item.name] && <p id={"error-" + item.name} role="alert" className="mt-1 text-xs text-critical">{errors[item.name]}</p>}
      </div>
    );
  }

  if (isPending) return <p role="status" className="py-12 text-center text-ink-quiet">Cargando catálogos...</p>;
  if (error || !catalogos?.length) return <div role="alert" className="space-y-3 py-8"><p>{apiErrorMessage(error, "No se pudieron cargar los catálogos del módulo.")}</p><Button variant="outline" onClick={() => refetch()}>Reintentar</Button></div>;

  return (
    <form noValidate onSubmit={submit} className="mx-auto max-w-7xl space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink-quiet">Contingencias</p>
          <h1 className="text-2xl font-semibold text-ink">{initialData ? "Editar contingencia" : "Registrar contingencia"}</h1>
          <p className="mt-1 text-sm text-ink-quiet">Formulario ordenado según la hoja Base de datos del Excel.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
          <Button type="button" onClick={submitValues} disabled={isSubmitting}><Save className="h-4 w-4" />{isSubmitting ? "Guardando..." : "Finalizar registro"}</Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-4 sm:p-5">
          <CardHeader
            title="Datos básicos"
            subtitle="Información inicial del evento y atención"
            icon={<MapPin className="h-4 w-4" />}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {BASIC_FIELDS.map((name) => renderField(field(name), true))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <CardHeader title="Resumen" subtitle="Estado del registro" icon={<ClipboardList className="h-4 w-4" />} />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-ink">Borrador</span>
              <span className="text-2xl font-semibold text-ink">{completed}/{progressFields.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-brand-700 transition-all" style={{ width: `${percent}%` }} />
            </div>
            {activeRules.length ? (
              <div className="rounded-lg border border-critical/20 bg-critical/10 p-3 text-sm text-critical">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide">Regla activa</p>
                {activeRules.map((rule) => <p key={rule.code}>{rule.message}</p>)}
              </div>
            ) : (
              <div className="rounded-lg border border-line bg-surface-2 p-3 text-sm text-ink-soft">Selecciona la categoría para aplicar reglas condicionales.</div>
            )}
            {Object.keys(errors).length > 0 && <p role="alert" className="rounded-lg bg-critical/10 p-3 text-sm text-critical">Revisa los campos senalados antes de guardar.</p>}
            {notice && <p role="alert" className="rounded-lg bg-warning/10 p-3 text-sm text-ink">{notice}</p>}
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-5">
        <CardHeader title="Flujo de atención" subtitle="Selecciona el recorrido real del caso" icon={<HeartPulse className="h-4 w-4" />} />
        <div className="grid overflow-hidden rounded-lg border border-line sm:grid-cols-2 xl:grid-cols-4">
          {FLOW_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseFlow(option.id)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 border-line px-3 text-sm font-medium transition-colors sm:border-r",
                flow === option.id ? "bg-brand-700 text-white" : "bg-white text-ink-soft hover:bg-surface-2 hover:text-ink"
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <CardHeader title="Línea de tiempo del evento" subtitle="Registra las horas por hitos" icon={<Clock3 className="h-4 w-4" />} />
        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[760px] gap-3" style={{ gridTemplateColumns: `repeat(${timelineFields.length}, minmax(150px, 1fr))` }}>
            {timelineFields.map((name, index) => {
              const item = field(name);
              return (
                <div key={name} className="relative rounded-lg border border-line bg-white p-3">
                  {index < timelineFields.length - 1 && <span className="absolute left-[calc(50%+42px)] top-5 hidden h-px w-[calc(100%-48px)] bg-line-strong xl:block" />}
                  <div className="relative mb-3 flex items-center gap-2">
                    <span className={cn("grid h-5 w-5 place-items-center rounded-full border", values[name] ? "border-brand-700 bg-brand-700 text-white" : "border-line-strong bg-white text-ink-faint")}>
                      {values[name] ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                    </span>
                    <span className="text-xs font-semibold text-ink">{timelineLabel(item.label)}</span>
                  </div>
                  <Input id={"cont-" + name} name={name} type="time" value={values[name]} onChange={(event) => update(name, event.target.value)} aria-invalid={Boolean(errors[name])} />
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <Button type="button" size="sm" variant="secondary" onClick={() => quickTime(name, "now")}>Ahora</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => quickTime(name, "plus5")}>+5</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => quickTime(name, "na")}>N/A</Button>
                  </div>
                  {errors[name] && <p role="alert" className="mt-1 text-xs text-critical">{errors[name]}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {accordions.map((section) => {
          const sectionFields = section.fields.filter((name) => !TIME_FIELDS.includes(name));
          const sectionCompleted = fieldCompletion(values, sectionFields);
          const open = openSections[section.id];
          return (
            <Card key={section.id} className="p-0">
              <button
                type="button"
                onClick={() => setOpenSections((current) => ({ ...current, [section.id]: !current[section.id] }))}
                className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
              >
                <span className="flex min-w-0 items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">{section.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{section.title}</span>
                    <span className="block text-xs text-ink-quiet">{section.subtitle}</span>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3 text-xs font-medium text-ink-quiet">
                  {sectionCompleted}/{sectionFields.length}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                </span>
              </button>
              {open && (
                <div className="space-y-5 border-t border-line p-4 sm:p-5">
                  {(section.groups ?? [{ title: "", description: "", fields: sectionFields }]).map((group, groupIndex) => {
                    const groupFields = group.fields.filter((name) => !TIME_FIELDS.includes(name));
                    return (
                      <div key={group.title || section.id} className={cn(groupIndex > 0 && "border-t border-line-soft pt-5")}>
                        {group.title && (
                          <div className="mb-3">
                            <h4 className="text-sm font-semibold text-ink">{group.title}</h4>
                            <p className="text-xs text-ink-quiet">{group.description}</p>
                          </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {groupFields.map((name) => renderField(field(name)))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
        <span className="text-xs text-ink-quiet">{completed}/{progressFields.length} campos del flujo actual completos.</span>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
          <Button type="button" onClick={submitValues} disabled={isSubmitting}><Save className="h-4 w-4" />{isSubmitting ? "Guardando..." : "Finalizar registro"}</Button>
        </div>
      </div>
    </form>
  );
}
