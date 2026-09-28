import { useState } from "react";
import type { DecisionSop, ImportacionPreview } from "./types";
import { FileCheck2, ListChecks, LockKeyhole, UsersRound } from "lucide-react";

export function SopImportActions({ preview, decisions, disabled, needsValidation, onChange }: { preview: ImportacionPreview | null; decisions: DecisionSop[]; disabled: boolean; needsValidation: boolean; onChange: (value: DecisionSop[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [action, setAction] = useState<"asignar" | "cerrar" | null>(null);
  const eligible = preview?.cases.filter(item => item.editable) ?? [];
  const eligibleCodes = new Set(eligible.map(item => item.codigo));
  const codes = selected.filter(code => eligibleCodes.has(code));
  const closingCodes = new Set(decisions.filter(item => item.accion === "cerrar").map(item => item.codigo));
  const assignableCodes = codes.filter(code => !closingCodes.has(code));
  const assignablePlans = eligible
    .filter(item => assignableCodes.includes(item.codigo))
    .reduce((total, item) => total + (item.planesDetalle?.filter(plan => plan.editable).length ?? 0), 0);
  function proposedPlanState(codigo: string, row: number, originalState: string) {
    const decision = decisions.find(item => item.codigo === codigo);
    const planChange = decision?.planes?.find(plan => plan.row === row);
    if (planChange) return planChange.estado;
    if (decision?.accion === "cerrar" && !["cerrado", "rechazado", "finalizado", "completado"].includes(originalState.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""))) return "Cerrado";
    return originalState;
  }
  function proposedCaseState(codigo: string, originalState: string) {
    return decisions.find(item => item.codigo === codigo)?.accion === "cerrar" ? "Cerrado" : originalState;
  }
  function setPlan(codigo: string, row: number, estado: "Enviado" | "En Ejecución" | "Cerrado") {
    const previous = decisions.find(d => d.codigo === codigo && d.accion === "planes");
    onChange([...decisions.filter(d => d.codigo !== codigo), { codigo, accion: "planes", motivo: reason.trim(), planes: [...(previous?.planes ?? []).filter(p => p.row !== row), { row, estado }] }]);
  }
  return <section className="import-sop-section">
    <div className="import-section-heading"><div><h2>Gestión de SOP y planes de acción</h2><p>{preview ? `${eligible.length} SOP disponibles · ${codes.length} seleccionados · ${decisions.length} con decisiones preparadas` : "Acciones disponibles después de validar el archivo"}</p>{preview && decisions.length > 0 && <p role="status" className="mt-1 text-sm font-medium text-amber-700">{needsValidation ? "Cambios visibles · Pendiente de validar" : "Decisiones validadas · Pendiente de importar"}</p>}</div><LockKeyhole className="h-4 w-4 text-ink-faint" /></div>
    {!preview && <><div className="import-action-catalog">{[
      { icon: UsersRound, title: "Asignar a jefes de área", text: "Habilita los planes pendientes en la bandeja del responsable indicado en el archivo." },
      { icon: FileCheck2, title: "Cerrar SOP y sus planes", text: "Registra el cierre histórico de los casos resueltos internamente, con motivo y confirmación." },
      { icon: ListChecks, title: "Cambiar estado por plan", text: "Revisa cada plan por separado y prepara el estado que corresponda." },
    ].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={19} className="text-ink-soft" /><h3>{title}</h3><p>{text}</p><small>Pendiente de validación del archivo</small></div>)}</div><p className="import-empty-note">Los SOP existentes o terminados están protegidos. Los códigos originales se conservan.</p></>}
    <div className={preview ? "p-5" : ""}>
    {preview && <fieldset disabled={disabled} className="mt-4 space-y-4 disabled:opacity-60">
      <label className="block text-sm font-medium">Motivo de los cambios<textarea className="mt-1 block w-full rounded border p-2" maxLength={500} value={reason} onChange={event => setReason(event.target.value)} placeholder="Mínimo 10 caracteres. Se registrará con tu usuario y fecha." /></label>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label><input type="checkbox" checked={eligible.length > 0 && codes.length === eligible.length} onChange={event => setSelected(event.target.checked ? eligible.map(c => c.codigo) : [])} /> Seleccionar pendientes ({codes.length})</label>
        <button className="rounded border px-3 py-2 disabled:opacity-40" disabled={!assignablePlans || reason.trim().length < 10} onClick={() => setAction("asignar")}>Asignar planes a jefes de área</button>
        <button className="rounded border px-3 py-2 disabled:opacity-40" disabled={!codes.length || reason.trim().length < 10} onClick={() => setAction("cerrar")}>Cerrar SOP y sus planes</button>
        {decisions.length > 0 && <button className="underline" onClick={() => onChange([])}>Restablecer decisiones</button>}
      </div>
      <div className="max-h-[520px] space-y-3 overflow-auto">
        {preview.cases.map(item => <details key={item.codigo} className="rounded-lg border p-3">
          <summary className="cursor-pointer text-sm"><input aria-label={`Seleccionar ${item.codigo}`} type="checkbox" disabled={!item.editable} checked={codes.includes(item.codigo)} onClick={event => event.stopPropagation()} onChange={event => setSelected(event.target.checked ? [...codes, item.codigo] : codes.filter(code => code !== item.codigo))} /> <strong>{item.codigo}</strong> · {item.estadoOriginal} → {proposedCaseState(item.codigo, item.estado)} · {item.planes} planes {item.editable ? "" : "· Protegido"}{decisions.find(d => d.codigo === item.codigo) && " · Decisión preparada"}</summary>
          {closingCodes.has(item.codigo) && <p className="mt-3 text-sm font-medium text-amber-700">Cierre preparado: no se puede editar ni asignar este SOP. Para cambiar la decisión, restablece las decisiones y vuelve a prepararla.</p>}
          <div className="mt-3 space-y-2">{item.planesDetalle?.map(plan => { const proposedState = proposedPlanState(item.codigo, plan.row, plan.estado); return <div key={plan.row} className="grid gap-2 rounded bg-slate-50 p-3 text-sm md:grid-cols-3"><div><strong>{plan.codigo}</strong><p>Fila {plan.row}</p></div><div>{plan.area}<p className="text-slate-600">{plan.responsable}</p></div><label>Estado del plan<select aria-label={`Estado ${plan.codigo} fila ${plan.row}`} className="mt-1 block w-full rounded border p-2" value={proposedState} disabled={closingCodes.has(item.codigo) || !item.editable || !plan.editable || reason.trim().length < 10} onChange={event => setPlan(item.codigo, plan.row, event.target.value as "Enviado" | "En Ejecución" | "Cerrado")}><option value={plan.estado}>{plan.estado}</option>{["Enviado", "En Ejecución", "Cerrado"].filter(state => state !== plan.estado).map(state => <option key={state}>{state}</option>)}</select>{proposedState !== plan.estado && <small className="text-amber-700">Propuesto · pendiente de validar</small>}</label></div>; })}</div>
        </details>)}
      </div>
    </fieldset>}
    </div>
    {action && <div role="alertdialog" aria-modal="true" aria-label="Confirmar decisión SOP" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><div className="max-w-lg space-y-4 rounded-xl bg-white p-6"><p>{action === "cerrar" ? `Se preparará el cierre de ${codes.length} SOP y todos sus planes de acción pendientes.` : `Se preparará la asignación de ${assignablePlans} plan${assignablePlans === 1 ? "" : "es"} de acción a los jefes indicados en el archivo.`} La validación verificará los destinos antes de guardar.</p><div className="flex gap-4"><button onClick={() => setAction(null)}>Cancelar</button><button className="rounded bg-blue-700 px-4 py-2 text-white" onClick={() => { const targetCodes = action === "cerrar" ? codes : assignableCodes; onChange([...decisions.filter(d => !targetCodes.includes(d.codigo)), ...targetCodes.map(codigo => ({ codigo, accion: action, motivo: reason.trim() }))]); setAction(null); }}>Preparar y revisar</button></div></div></div>}
  </section>;
}
