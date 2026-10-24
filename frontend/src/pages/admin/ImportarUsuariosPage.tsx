import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Download, FileSpreadsheet, Info, Loader2, Upload, Users } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Select } from "@/design-system/primitives/Input";
import { api, apiErrorMessage, type ApiEnvelope } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useRoles } from "@/features/users/hooks/useRoles";
import { downloadTemporaryAccess, MAX_USER_IMPORT_ROWS, parseUserImportFile, YELLOW_FIELDS } from "@/features/users/import/excel";
import { unitKey, type UserImportFile, type UserImportPayload, type UserImportPreview, type UserImportResult } from "@/features/users/import/types";

const STEPS = ["Archivo", "Asignar roles", "Áreas de jefes", "Confirmar"];
const PAGE_SIZE = 25;

export function AdminImportarUsuariosPage() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<UserImportFile | null>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [areaMap, setAreaMap] = useState<Record<string, string>>({});
  const [roleMap, setRoleMap] = useState<Record<number, number>>({});
  const [bulkRole, setBulkRole] = useState("");
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<UserImportPreview | null>(null);
  const [result, setResult] = useState<UserImportResult | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const areas = useAreas();
  const roles = useRoles();
  const queryClient = useQueryClient();
  const sheet = file?.sheets[sheetIndex];
  const rows = sheet?.rows ?? [];
  const allowedRoles = roles.data?.filter(role => role.nombre_rol !== "Reportante") ?? [];
  const headRoleId = roles.data?.find(role => role.nombre_rol === "Jefe de Área")?.id_rol;
  const units = useMemo(() => {
    const grouped = new Map<string, { key: string; label: string; count: number }>();
    sheet?.rows.filter(row => headRoleId != null && roleMap[row.row] === headRoleId).forEach(row => {
      const key = unitKey(row.unidad_organizativa);
      const current = grouped.get(key);
      if (current) current.count++;
      else grouped.set(key, { key, label: row.unidad_organizativa, count: 1 });
    });
    return [...grouped.values()];
  }, [sheet, roleMap, headRoleId]);
  const assignedArea = (key: string) => Object.hasOwn(areaMap, key) ? areaMap[key] : "";
  const pendingAreas = units.filter(unit => !unit.key || !assignedArea(unit.key)).reduce((total, unit) => total + unit.count, 0);
  const pendingRoles = rows.filter(row => !roleMap[row.row]).length;
  const pageRows = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const catalogError = roles.isError || (units.length > 0 && areas.isError);
  const catalogPending = roles.isPending || (units.length > 0 && areas.isPending);

  function invalidatePreview() { setPreview(null); setError(null); }

  async function selectFile(source?: File) {
    if (!source || busy) return;
    setBusy(true);
    setError(null);
    setFile(null);
    setPreview(null);
    setResult(null);
    setAreaMap({});
    setRoleMap({});
    setBulkRole("");
    setSheetIndex(0);
    setPage(0);
    setDownloaded(false);
    setStep(0);
    try { setFile(await parseUserImportFile(source)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "No se pudo leer el archivo."); }
    finally { setBusy(false); if (fileInput.current) fileInput.current.value = ""; }
  }

  function payload(): UserImportPayload {
    return {
      filename: file!.filename,
      hoja: sheet!.name,
      rows: rows.map(row => ({ ...row, id_rol: roleMap[row.row] ?? null })),
      areas: units.filter(unit => assignedArea(unit.key)).map(unit => ({ unidad_organizativa: unit.label, id_area: Number(assignedArea(unit.key)) })),
    };
  }

  async function validate() {
    if (busy || !file || !sheet || pendingAreas || pendingRoles) return;
    setBusy(true);
    setError(null);
    try {
      const response = await api.post<ApiEnvelope<UserImportPreview>>("/importacion/usuarios/validar", payload());
      if (!response.data.data) throw new Error("La API no devolvió la validación.");
      setPreview(response.data.data);
      if (response.data.data.canImport) { setStep(3); setPage(0); }
    } catch (cause) { setError(apiErrorMessage(cause, "No se pudo validar. Intenta nuevamente.")); }
    finally { setBusy(false); }
  }

  async function confirm() {
    if (busy || !preview?.canImport || result) return;
    setBusy(true);
    setError(null);
    try {
      const response = await api.post<ApiEnvelope<UserImportResult>>("/importacion/usuarios/importar", payload());
      if (!response.data.data) throw new Error("La API no devolvió el resultado.");
      setResult(response.data.data);
      setFile(null);
      setPreview(null);
      setRoleMap({});
      setAreaMap({});
    } catch (cause) {
      if (isAxiosError<ApiEnvelope<UserImportPreview>>(cause) && cause.response?.data?.data?.issues) {
        setPreview(cause.response.data.data);
        setStep(1);
      } else { setPreview(null); setStep(1); }
      setError(apiErrorMessage(cause, "No se pudo confirmar el resultado de la carga. Consulta Gestión de Usuarios antes de volver a validar."));
    } finally {
      for (const key of ["users", "users-paginado", "user-counts", "auditoria"]) void queryClient.invalidateQueries({ queryKey: [key] });
      setBusy(false);
    }
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Importación de usuarios</h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-quiet">Revisa el Excel, selecciona los roles y asigna áreas únicamente a los Jefes de Área.</p>
          </div>
          {!busy && <Link to="/admin/usuarios" className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-white px-3 py-2 text-sm text-ink"><ArrowLeft className="h-4 w-4" /> Volver a usuarios</Link>}
        </div>

        {result ? (
          <section className="rounded-2xl border border-line bg-white p-6 sm:p-8" aria-labelledby="import-success">
            <CheckCircle2 className="mb-4 h-10 w-10 text-brand-700" />
            <h2 id="import-success" className="text-xl font-semibold text-ink">{result.created} usuarios creados</h2>
            <p className="mt-2 text-sm text-ink-soft">Cada cuenta conserva el rol revisado. Solo los Jefes de Área tienen área asignada; los permisos especiales quedan desactivados.</p>
            <div className="mt-6 rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold text-ink">Accesos temporales</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">Se generó una contraseña distinta para cada persona. Deben cambiarla en su primer ingreso. Descarga los accesos antes de salir: están disponibles únicamente en esta pantalla y no se enviaron correos.</p>
              <Button className="mt-4" onClick={() => { downloadTemporaryAccess(result); setDownloaded(true); }}><Download className="h-4 w-4" /> Descargar accesos temporales</Button>
              {downloaded && <p role="status" className="mt-3 text-sm text-brand-800">Descarga preparada. Entrega cada acceso únicamente a su titular.</p>}
            </div>
            <p className="mt-5 break-all text-xs text-ink-quiet">La creación de cada cuenta quedó registrada en Auditoría. Lote: {result.batchId}.</p>
          </section>
        ) : (
          <>
            <ol aria-label="Pasos de importación" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STEPS.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={cn("flex items-center gap-2 border-b-2 pb-3 text-xs font-medium sm:text-sm", index <= step ? "border-brand-700 text-brand-800" : "border-line text-ink-quiet")}><span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", index <= step ? "bg-brand-700 text-white" : "bg-surface-2 text-ink-soft")}>{index < step ? <Check className="h-4 w-4" /> : index + 1}</span>{label}</li>)}
            </ol>

            {error && <div role="alert" className="rounded-xl border border-critical/25 bg-critical/5 p-4 text-sm text-critical">{error}</div>}

            {step === 0 ? (
              <section className="rounded-2xl border border-line bg-white p-5 sm:p-7">
                <div className="flex items-start gap-3"><FileSpreadsheet className="mt-0.5 h-6 w-6 shrink-0 text-brand-700" /><div><h2 className="text-lg font-semibold text-ink">Selecciona el padrón de usuarios</h2><p className="mt-1 text-sm text-ink-quiet">Excel .xlsx, hasta 5 MB y {MAX_USER_IMPORT_ROWS} usuarios por archivo.</p></div></div>
                <div className="mt-5 rounded-xl border border-dashed border-line-strong bg-surface px-4 py-8 text-center">
                  <input ref={fileInput} type="file" accept=".xlsx" aria-label="Archivo Excel de usuarios" className="sr-only" disabled={busy} onChange={event => void selectFile(event.target.files?.[0])} />
                  <Button variant="outline" disabled={busy} onClick={() => fileInput.current?.click()}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}{file ? "Cambiar archivo" : "Seleccionar Excel"}</Button>
                  {file && <p className="mt-3 break-all text-sm font-medium text-ink">{file.filename}</p>}
                </div>
                <div className="mt-6"><h3 className="text-sm font-semibold text-ink">Solo se importan las seis columnas amarillas</h3><div className="mt-3 flex flex-wrap gap-2">{YELLOW_FIELDS.map(field => <span key={field.key} className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs text-amber-950">{field.label}</span>)}</div><p className="mt-3 text-xs leading-relaxed text-ink-quiet">El resto de las columnas se descarta en tu navegador. El archivo original no se envía al servidor. La selección y la validación todavía no crean cuentas.</p></div>
                {file && <div className="mt-6"><label htmlFor="user-import-sheet" className="mb-2 block text-sm font-medium text-ink">Hoja de usuarios</label><Select id="user-import-sheet" value={sheetIndex} onChange={event => { setSheetIndex(Number(event.target.value)); setAreaMap({}); setRoleMap({}); setPreview(null); setPage(0); }} disabled={busy}>{file.sheets.map((item, index) => <option key={item.name} value={index}>{item.name} — {item.rows.length} usuarios</option>)}</Select></div>}
              </section>
            ) : (
              <>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-soft"><FileSpreadsheet className="h-5 w-5 shrink-0 text-brand-700" /><span className="min-w-0 break-all">{file?.filename}</span><span className="ml-auto shrink-0 text-xs">{rows.length} usuarios</span></div>
                {catalogError ? <div role="alert" className="rounded-xl border border-critical/25 bg-white p-4 text-sm"><p>No se pudieron cargar las áreas o los roles.</p><Button variant="outline" className="mt-3" onClick={() => { void areas.refetch(); void roles.refetch(); }}>Reintentar</Button></div> : (
                  <section className="min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-6">
                    {step === 2 ? (
                      <>
                        <h2 className="text-lg font-semibold text-ink">Áreas de los Jefes de Área</h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink-quiet">Relaciona las unidades de los Jefes de Área con su área correspondiente. Seguridad Operativa, Monitorista, Contingencias y los demás roles no reciben un área, aunque compartan unidad con un jefe.</p>
{units.length > 0 ? <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[570px] text-left text-sm"><thead className="border-b border-line bg-surface text-xs text-ink-quiet"><tr><th className="p-3 font-medium">Unidad organizativa del Excel</th><th className="p-3 font-medium">Jefes de Área</th><th className="p-3 font-medium">Área de la plataforma</th></tr></thead><tbody>{units.map(unit => <tr key={unit.key} className="border-b border-line-soft"><td className="max-w-xs break-words p-3">{unit.label || "Sin unidad: corrige el Excel"}</td><td className="p-3">{unit.count}</td><td className="min-w-56 p-3"><Select aria-label={`Área para ${unit.label || "unidad vacía"}`} value={assignedArea(unit.key)} disabled={busy || catalogPending || !unit.key} onChange={event => { setAreaMap(previous => ({ ...previous, [unit.key]: event.target.value })); invalidatePreview(); }}><option value="">Seleccionar área…</option>{areas.data?.map(area => <option key={area.id_area} value={area.id_area}>{area.nombre_area}</option>)}</Select></td></tr>)}</tbody></table></div> : <p className="mt-5 rounded-xl bg-surface p-4 text-sm text-ink-soft">No hay Jefes de Área en este lote. Los demás roles se crearán sin área.</p>}
                        <p className={cn("mt-4 text-sm", pendingAreas ? "text-amber-800" : "text-brand-800")}>{pendingAreas ? `${pendingAreas} Jefes de Área pendientes de área. Asigna sus unidades para continuar.` : units.length ? "Todos los Jefes de Área tienen un área seleccionada." : "No se requiere asignación de áreas."}</p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-semibold text-ink">{step === 1 ? "Revisa los datos y asigna los roles" : "Confirma la creación de usuarios"}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink-quiet">{step === 1 ? "El puesto y la unidad del Excel son datos laborales. Selecciona el rol de acceso; solo Jefe de Área requiere área en el siguiente paso." : "Se crearán cuentas nuevas con los datos y permisos que aparecen aquí. Las cuentas existentes se conservan."}</p>
                        {step === 1 && <div className="mt-5 flex flex-wrap items-end gap-3 rounded-xl bg-surface p-4"><div className="min-w-0 flex-1 sm:max-w-xs"><label htmlFor="user-import-bulk-role" className="mb-2 block text-xs font-medium text-ink-soft">Aplicar el mismo rol a todos</label><Select id="user-import-bulk-role" disabled={busy || catalogPending} value={bulkRole} onChange={event => setBulkRole(event.target.value)}><option value="">Seleccionar rol…</option>{allowedRoles.map(role => <option key={role.id_rol} value={role.id_rol}>{role.nombre_rol}</option>)}</Select></div><Button variant="outline" disabled={busy || !bulkRole} onClick={() => { setRoleMap(Object.fromEntries(rows.map(row => [row.row, Number(bulkRole)]))); invalidatePreview(); }}>Aplicar a {rows.length} usuarios</Button><p className="w-full text-xs text-ink-quiet">Después puedes ajustar el rol de cada fila. Los permisos especiales no se activan con la importación.</p></div>}
                        {step === 3 && <div className="mt-5 flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-sm text-brand-900"><CheckCircle2 className="h-5 w-5 shrink-0" /><p>{preview?.resumen.listos} usuarios validados. Cada uno recibirá una contraseña temporal distinta y deberá cambiarla al ingresar.</p></div>}
                        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-xs"><thead className="border-b border-line bg-surface text-ink-quiet"><tr>{["Fila", "Apellidos y nombres", "Puesto", "Unidad / área", "Correo laboral", "Celular", "Jefe inmediato", "Rol de acceso"].map(label => <th key={label} className="p-3 font-medium">{label}</th>)}</tr></thead><tbody>{pageRows.map(row => {
                          const issue = preview?.issues.some(item => item.row === row.row);
                          return <tr key={row.row} className={cn("border-b border-line-soft align-top", issue && "bg-amber-50/60")}><td className="p-3">{row.row}</td><td className="max-w-48 break-words p-3 font-medium">{row.nombre || "Sin nombre"}</td><td className="max-w-44 break-words p-3">{row.cargo || "—"}</td><td className="max-w-48 break-words p-3"><span className="block">{row.unidad_organizativa || "—"}</span><span className="mt-1 block font-medium text-brand-800">{!roleMap[row.row] ? "Selecciona el rol" : roleMap[row.row] !== headRoleId ? "No aplica área" : areas.data?.find(area => String(area.id_area) === assignedArea(unitKey(row.unidad_organizativa)))?.nombre_area ?? "Área pendiente"}</span></td><td className="max-w-48 break-all p-3">{row.correo || "Sin correo"}</td><td className="p-3">{row.telefono || "—"}</td><td className="max-w-44 break-words p-3">{row.jefe_inmediato || "—"}</td><td className="min-w-52 p-3">{step === 1 ? <Select aria-label={`Rol de fila ${row.row}`} value={roleMap[row.row] ?? ""} disabled={busy || catalogPending} onChange={event => { const roleId = Number(event.target.value); setRoleMap(previous => ({ ...previous, [row.row]: roleId })); invalidatePreview(); }}><option value="">Seleccionar rol…</option>{allowedRoles.map(role => <option key={role.id_rol} value={role.id_rol}>{role.nombre_rol}</option>)}</Select> : allowedRoles.find(role => role.id_rol === roleMap[row.row])?.nombre_rol}</td></tr>;
                        })}</tbody></table></div>
                        {rows.length > PAGE_SIZE && <div className="mt-4 flex items-center justify-between gap-3"><span className="text-xs text-ink-quiet">Filas {page * PAGE_SIZE + 1} a {Math.min((page + 1) * PAGE_SIZE, rows.length)} de {rows.length}</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled={busy || page === 0} onClick={() => setPage(value => value - 1)}>Anteriores</Button><Button variant="outline" size="sm" disabled={busy || (page + 1) * PAGE_SIZE >= rows.length} onClick={() => setPage(value => value + 1)}>Siguientes</Button></div></div>}
                        {step === 1 && <p className={cn("mt-4 text-sm", pendingRoles ? "text-amber-800" : "text-brand-800")}>{pendingRoles ? `${pendingRoles} usuarios pendientes de rol.` : "Todos los usuarios tienen un rol seleccionado."}</p>}
                        {!!preview?.issues.length && <div role="alert" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4"><h3 className="text-sm font-semibold text-amber-950">Corrige los errores antes de importar</h3><ul className="mt-2 space-y-1 text-xs text-amber-950">{preview.issues.slice(0, 30).map((issue, index) => <li key={`${issue.row}-${issue.field}-${index}`}>Fila {issue.row}: {issue.message}</li>)}</ul>{preview.issues.length > 30 && <p className="mt-2 text-xs">Se muestran 30 de {preview.issues.length} errores.</p>}<p className="mt-3 text-xs">Para corregir datos personales, actualiza el Excel y vuelve al paso Archivo.</p></div>}
                      </>
                    )}
                  </section>
                )}
              </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <p className="flex max-w-xl items-start gap-2 text-xs leading-relaxed text-ink-quiet"><Info className="h-4 w-4 shrink-0" />{step === 3 ? "Al confirmar se guardarán todas las cuentas del lote junto con su registro de auditoría." : "La carga se realiza únicamente al confirmar en el último paso."}</p>
              <div className="ml-auto flex gap-2">
                {step > 0 && <Button variant="outline" disabled={busy} onClick={() => { setStep(value => value - 1); setPage(0); setError(null); }}>Volver</Button>}
                {step < 2 && <Button disabled={busy || !rows.length || (step === 1 && (!!pendingRoles || catalogError || catalogPending))} onClick={() => { setStep(value => value + 1); setError(null); }}>Continuar <ArrowRight className="h-4 w-4" /></Button>}
                {step === 2 && <Button disabled={busy || !!pendingRoles || !!pendingAreas || catalogError || catalogPending} onClick={() => void validate()}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Validar y continuar</Button>}
                {step === 3 && <Button disabled={busy || !preview?.canImport} onClick={() => void confirm()}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}{busy ? "Creando usuarios…" : `Crear ${rows.length} usuarios`}</Button>}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
