import { useEffect, useState } from "react";
import { Calendar, Clock, Lock, Unlock } from "lucide-react";
import { Card } from "@/design-system/primitives/Card";
import { Field, Input, Select, Textarea } from "@/design-system/primitives/Input";
import { useCatalogs } from "@/features/reports/hooks/useCatalogs";
import type { CatalogItem } from "@/features/reports/types";
import type { EventoFormState } from "../hooks/useEventoFormState";
import { fechaAIso } from "../hooks/useEventoFormState";

/** "AAAA-MM-DD" (lo que da el selector nativo) → "DD/MM/AAAA" (lo que usa el formulario). */
function isoAFecha(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Input de texto (para pegar del Excel) con un ícono al costado que abre el
 * selector nativo del navegador — dos formas de completar el mismo campo.
 */
function PickerField({
  value,
  onChange,
  placeholder,
  icon: Icon,
  pickerType,
  pickerValue,
  onPickerChange,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: typeof Calendar;
  pickerType: "date" | "time";
  pickerValue: string;
  onPickerChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pr-9" />
      <label className="absolute right-1 top-1/2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-ink-faint transition-colors hover:bg-surface hover:text-ink">
        <Icon className="h-4 w-4" />
        <input
          type={pickerType}
          value={pickerValue}
          onChange={(e) => e.target.value && onPickerChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}

function CatalogSelect({
  items,
  value,
  onChange,
  disabled,
  placeholder = "Seleccione…",
}: {
  items: CatalogItem[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
      <option value="">{placeholder}</option>
      {items.map((item) => (
        <option key={item.id_detalle} value={item.id_detalle}>
          {item.codigo ? `${item.codigo} · ${item.nombre}` : item.nombre}
        </option>
      ))}
    </Select>
  );
}

/**
 * Un solo formulario denso, en el orden del Excel, pensado para caber en una
 * pantalla sin scroll.
 *
 * Fecha y Hora son texto libre (no selector nativo) a propósito: así se
 * puede pegar directo lo que el usuario copia del Excel ("12/08/2026",
 * "14:30"). Año/Mes/Sem/Día/Rango horario se rellenan solos apenas fecha y
 * hora son válidas, y quedan bloqueados por defecto — el botón de candado
 * junto a "Rango horario" los desbloquea para corregirlos a mano cuando
 * hace falta.
 */
export function EventoFormFields({
  form,
  set,
  errors,
  rangoLabel,
}: {
  form: EventoFormState;
  set: <K extends keyof EventoFormState>(key: K, value: EventoFormState[K]) => void;
  errors: Record<string, string>;
  rangoLabel: string | null;
}) {
  const catalogs = useCatalogs();

  const tiposIncidente = catalogs.byName.get("Tipo de incidente operativo")?.catalogo_detalle ?? [];
  const ubicaciones = catalogs.byName.get("Ubicación")?.catalogo_detalle ?? [];
  const tiposVia = catalogs.byName.get("Tipo de vía")?.catalogo_detalle ?? [];
  const direccionesVia = catalogs.byName.get("Dirección de vía")?.catalogo_detalle ?? [];
  const lugares = catalogs.byName.get("Lugar de Incidente")?.catalogo_detalle ?? [];
  const modelosMr = catalogs.byName.get("Modelo MR")?.catalogo_detalle ?? [];
  const numerosMr = catalogs.byName.get("Nro. MR")?.catalogo_detalle ?? [];
  const personalInvolucrado = catalogs.byName.get("Personal o falla Involucrado")?.catalogo_detalle ?? [];
  const tiposCausa = catalogs.byName.get("Tipo Causa")?.catalogo_detalle ?? [];
  const posiblesCausas = catalogs.byName.get("Posible Causa")?.catalogo_detalle ?? [];
  const rangosHorario = catalogs.byName.get("Rango horario")?.catalogo_detalle ?? [];

  // Año/Mes/Sem/Día/Rango horario quedan bloqueados por defecto (se llenan
  // solos con Fecha y Hora) — el botoncito los desbloquea para corregirlos
  // a mano cuando de verdad hace falta, así no se editan por accidente.
  const [desbloqueado, setDesbloqueado] = useState(false);

  // Apenas la hora da un rango horario válido, se preselecciona la opción
  // del catálogo que corresponde — el usuario después puede elegir otra
  // desde el mismo select si lo necesita.
  useEffect(() => {
    if (!rangoLabel || rangosHorario.length === 0) return;
    const match = rangosHorario.find((r) => r.nombre === rangoLabel);
    if (match) set("idRangoHorario", String(match.id_detalle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangoLabel, rangosHorario.length]);

  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <Field label="Fecha" required error={errors.fecha} hint={!errors.fecha ? "Pegar del Excel o elegir" : undefined}>
          <PickerField
            value={form.fecha}
            onChange={(v) => set("fecha", v)}
            placeholder="DD/MM/AAAA"
            icon={Calendar}
            pickerType="date"
            pickerValue={fechaAIso(form.fecha) ?? ""}
            onPickerChange={(v) => set("fecha", isoAFecha(v))}
          />
        </Field>
        <Field label="Hora" required error={errors.hora} hint={!errors.hora ? "Pegar del Excel o elegir" : undefined}>
          <PickerField
            value={form.hora}
            onChange={(v) => set("hora", v)}
            placeholder="HH:MM"
            icon={Clock}
            pickerType="time"
            pickerValue={form.hora}
            onPickerChange={(v) => set("hora", v)}
          />
        </Field>
        <Field label="Año" hint="Automático">
          <Input value={form.anio} onChange={(e) => set("anio", e.target.value)} placeholder="—" disabled={!desbloqueado} />
        </Field>
        <Field label="Mes" hint="Automático (1-12)">
          <Input value={form.mes} onChange={(e) => set("mes", e.target.value)} placeholder="—" disabled={!desbloqueado} />
        </Field>
        <Field label="Sem" hint="Automático">
          <Input value={form.semana} onChange={(e) => set("semana", e.target.value)} placeholder="—" disabled={!desbloqueado} />
        </Field>
        <Field label="Día" hint="Automático">
          <Input value={form.dia} onChange={(e) => set("dia", e.target.value)} placeholder="—" disabled={!desbloqueado} />
        </Field>

        <div className="col-span-2">
          <Field label="Rango horario" hint="Automático">
            <div className="flex items-center gap-2">
              <CatalogSelect items={rangosHorario} value={form.idRangoHorario} onChange={(v) => set("idRangoHorario", v)} disabled={catalogs.isLoading || !desbloqueado} />
              <button
                type="button"
                onClick={() => setDesbloqueado((d) => !d)}
                title={desbloqueado ? "Bloquear campos automáticos" : "Desbloquear para corregir a mano"}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong text-ink-soft transition-colors hover:bg-surface"
              >
                {desbloqueado ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </button>
            </div>
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Tipo de incidente" required error={errors.idTipoIncidente}>
            <CatalogSelect items={tiposIncidente} value={form.idTipoIncidente} onChange={(v) => set("idTipoIncidente", v)} disabled={catalogs.isLoading} />
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
          <Field label="Descripción del evento" required error={errors.descripcion}>
            <Textarea value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} rows={1} placeholder="Describa el evento…" />
          </Field>
        </div>

        <Field label="Ubicación" required error={errors.idUbicacion}>
          <CatalogSelect items={ubicaciones} value={form.idUbicacion} onChange={(v) => set("idUbicacion", v)} disabled={catalogs.isLoading} />
        </Field>
        <Field label="Tipo de vía" required error={errors.idTipoVia}>
          <CatalogSelect items={tiposVia} value={form.idTipoVia} onChange={(v) => set("idTipoVia", v)} disabled={catalogs.isLoading} />
        </Field>
        <Field label="Dirección de vía" required error={errors.idDireccionVia}>
          <CatalogSelect items={direccionesVia} value={form.idDireccionVia} onChange={(v) => set("idDireccionVia", v)} disabled={catalogs.isLoading} />
        </Field>
        <Field label="Lugar del incidente" required error={errors.idLugarIncidente} hint={!errors.idLugarIncidente ? "Estación o patio" : undefined}>
          <CatalogSelect items={lugares} value={form.idLugarIncidente} onChange={(v) => set("idLugarIncidente", v)} disabled={catalogs.isLoading} placeholder="Seleccione…" />
        </Field>
        <Field label="Modelo MR" required error={errors.idModeloMr}>
          <CatalogSelect items={modelosMr} value={form.idModeloMr} onChange={(v) => set("idModeloMr", v)} disabled={catalogs.isLoading} />
        </Field>
        <Field label="N.° MR" required error={errors.idNumeroMr}>
          <CatalogSelect items={numerosMr} value={form.idNumeroMr} onChange={(v) => set("idNumeroMr", v)} disabled={catalogs.isLoading} />
        </Field>

        <Field label="N.° de carrera" required error={errors.numeroCarrera}>
          <Input value={form.numeroCarrera} onChange={(e) => set("numeroCarrera", e.target.value)} placeholder="Ej. 1234" />
        </Field>
        <div className="col-span-2">
          <Field label="Personal o falla involucrado" required error={errors.idPersonalInvolucrado}>
            <CatalogSelect items={personalInvolucrado} value={form.idPersonalInvolucrado} onChange={(v) => set("idPersonalInvolucrado", v)} disabled={catalogs.isLoading} />
          </Field>
        </div>
        <Field label="Tipo de causa" required error={errors.idTipoCausa}>
          <CatalogSelect items={tiposCausa} value={form.idTipoCausa} onChange={(v) => set("idTipoCausa", v)} disabled={catalogs.isLoading} />
        </Field>
        <div className="col-span-2">
          <Field label="Posible causa" required error={errors.idPosibleCausa}>
            <CatalogSelect items={posiblesCausas} value={form.idPosibleCausa} onChange={(v) => set("idPosibleCausa", v)} disabled={catalogs.isLoading} />
          </Field>
        </div>

        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
          <Field label="Información adicional" required error={errors.informacionAdicional}>
            <Textarea value={form.informacionAdicional} onChange={(e) => set("informacionAdicional", e.target.value)} rows={1} placeholder="Detalles adicionales…" />
          </Field>
        </div>

        <Field label="Cámara" hint="Ej. CAM-024">
          <Input value={form.camaraMonitoreada} onChange={(e) => set("camaraMonitoreada", e.target.value)} placeholder="—" />
        </Field>
        <Field label="Demora (min)">
          <Input type="number" min="0" step="0.1" value={form.demora} onChange={(e) => set("demora", e.target.value)} placeholder="0" />
        </Field>
      </div>
    </Card>
  );
}
