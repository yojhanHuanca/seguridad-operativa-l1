import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  Camera,
  ClipboardList,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Gauge,
  History,
  IdCard,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { apiErrorMessage } from "@/lib/api";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { AccountSessions } from "./AccountSessions";
import { RecentActivity } from "./RecentActivity";
import { AvatarOptions } from "./AvatarOptions";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { formatDate, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PushNotificationsCard } from "@/features/notifications/components/PushNotificationsCard";
import { useMyActivity, useMyProfile, useUpdatePhone, useUploadAvatar, useRemoveAvatar, useChangePassword } from "../hooks/useProfile";

// Mismos límites que exige el backend (`uploadAvatar` en upload.middleware.ts).
const AVATAR_TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
const TELEFONO_VALIDO = /^[0-9+\s()-]{6,20}$/;

interface QuickAction {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface RoleProfileConfig {
  panel: string;
  subtitle: string;
  scopeItems: string[];
  actions: QuickAction[];
}

const ROLE_PROFILES: Record<string, RoleProfileConfig> = {
  admin: {
    panel: "Centro de Administración",
    subtitle: "Control administrativo y trazabilidad del sistema.",
    scopeItems: ["Usuarios, roles y permisos especiales", "Catálogos maestros y configuración", "Auditoría e importación histórica"],
    actions: [
      { label: "Usuarios", to: "/admin/usuarios", icon: UsersRound },
      { label: "Roles y permisos", to: "/admin/roles", icon: ShieldCheck },
      { label: "Auditoría", to: "/admin/auditoria", icon: History },
      { label: "Configuración", to: "/admin/configuracion", icon: Settings2 },
    ],
  },
  "seguridad operativa": {
    panel: "Seguridad Operativa",
    subtitle: "Gestión de casos, planes e indicadores operativos.",
    scopeItems: ["Evaluación y seguimiento de casos SOP", "Aprobación y cierre de planes de acción", "Reportes y eventos operativos"],
    actions: [
      { label: "Casos SOP", to: "/seguridad/casos", icon: ClipboardList },
      { label: "Indicadores", to: "/seguridad/reportes/kpis", icon: Gauge },
      { label: "Exportación", to: "/seguridad/reportes/exportar", icon: FileText },
    ],
  },
  "jefe de area": {
    panel: "Jefatura de Área",
    subtitle: "Atención y cierre de planes asignados.",
    scopeItems: ["Revisión de planes asociados a tu área", "Aceptación, rechazo y ejecución de acciones", "Seguimiento de indicadores del área"],
    actions: [
      { label: "Planes asignados", to: "/jefe", icon: ClipboardList },
      { label: "Indicadores", to: "/jefe/indicadores", icon: Gauge },
    ],
  },
  monitorista: {
    panel: "Monitoreo",
    subtitle: "Registro y consulta de eventos operativos.",
    scopeItems: ["Registro de eventos desde el panel de monitoreo", "Historial y edición de eventos", "Reportes operativos de monitoreo"],
    actions: [
      { label: "Dashboard", to: "/monitoreo", icon: Gauge },
      { label: "Nuevo evento", to: "/monitoreo/nuevo", icon: ClipboardList },
      { label: "Historial", to: "/monitoreo/historial", icon: History },
      { label: "Reportes", to: "/monitoreo/reportes", icon: FileText },
    ],
  },
  "gestion de planes de contingencia": {
    panel: "Contingencias", subtitle: "Registro y seguimiento de contingencias.", scopeItems: [],
    actions: [{ label: "Registrar contingencia", to: "/contingencias/registro", icon: ClipboardList }, { label: "Historial", to: "/contingencias/historial", icon: History }, { label: "Indicadores", to: "/contingencias/indicadores", icon: Gauge }],
  },
  reportante: {
    panel: "Reportante",
    subtitle: "Registro y seguimiento de reportes enviados.",
    scopeItems: ["Consulta de tus reportes registrados", "Recepción de notificaciones del estado", "Registro de nuevos reportes desde el formulario público"],
    actions: [
      { label: "Mis reportes", to: "/reportes/mis-reportes", icon: ClipboardList },
      { label: "Nuevo reporte", to: "/reportes/nuevo", icon: FileText },
      { label: "Notificaciones", to: "/reportes/notificaciones", icon: Sparkles },
    ],
  },
};

const DEFAULT_ROLE_PROFILE: RoleProfileConfig = {
  panel: "Perfil del sistema",
  subtitle: "Datos personales y seguridad de acceso.",
  scopeItems: ["Acceso según el rol asignado", "Datos administrados por el administrador", "Actividad vinculada a tu usuario"],
  actions: [],
};

function normalizarRol(rol?: string | null) {
  return (rol ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getRoleProfile(rol?: string | null) {
  return ROLE_PROFILES[normalizarRol(rol)] ?? DEFAULT_ROLE_PROFILE;
}

function Avatar({
  nombre,
  fotoUrl,
  uploading,
  onPick,
}: {
  nombre: string;
  fotoUrl: string | null;
  uploading: boolean;
  onPick: () => void;
}) {


  return (
    <button
      type="button"
      onClick={onPick}
      disabled={uploading}
      className="group relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white bg-brand-100 text-[25px] font-bold text-brand-800 shadow-sm disabled:cursor-wait"
      title="Cambiar foto de perfil"
      aria-label="Cambiar foto de perfil"
    >
      <UserAvatar nombre={nombre} fotoUrl={fotoUrl} className="h-full w-full text-[28px]" />
      <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all group-hover:bg-ink/45 group-hover:opacity-100">
        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
      </span>
    </button>
  );
}

function ReadOnlyField({
  icon: Icon,
  label,
  value,
  mono,
  onCopy,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 rounded-lg border border-line-soft bg-surface/35 px-3 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-ink-quiet">{label}</p>
        <p className={cn("mt-0.5 break-words text-[13.5px] font-medium text-ink", mono && "font-mono tabular-nums")}>{value}</p>
      </div>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-faint transition-colors hover:bg-white hover:text-brand-700"
          aria-label={`Copiar ${label}`}
          title={`Copiar ${label}`}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-line-soft bg-white px-4 py-3">
      <p className="text-[24px] font-bold tabular-nums text-ink">{value}</p>
      <p className="mt-0.5 text-[12px] leading-snug text-ink-quiet">{label}</p>
    </div>
  );
}

function QuickActionLink({ action }: { action: QuickAction }) {
  const Icon = action.icon;
  return (
    <Link
      to={action.to}
      className="group flex min-h-12 items-center gap-3 rounded-lg border border-line-soft bg-white px-3 py-2.5 transition-colors hover:border-brand-200 hover:bg-brand-50/45"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-ink-soft transition-colors group-hover:bg-white group-hover:text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{action.label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors group-hover:text-brand-700" />
    </Link>
  );
}

export function ProfileContent() {
  const { data: profile, isLoading, isError, refetch } = useMyProfile();
  const { data: actividad = [], isLoading: actividadLoading, isError: actividadError, refetch: refetchActividad } = useMyActivity();
  const updatePhone = useUpdatePhone();
  const uploadAvatar = useUploadAvatar();
  const removeAvatar = useRemoveAvatar();
  const [photoOptions, setPhotoOptions] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const changePassword = useChangePassword();
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"informacion" | "seguridad" | "actividad" | "notificaciones">("informacion");

  const [telefono, setTelefono] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [pwActual, setPwActual] = useState("");
  const [pwNueva, setPwNueva] = useState("");
  const [pwConfirmar, setPwConfirmar] = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  if (isError) return <Card><p role="alert">No se pudo cargar tu perfil.</p><Button onClick={() => void refetch()} variant="outline">Reintentar</Button></Card>;
  if (isLoading || !profile) {
    return <Card className="py-14 text-center text-[13px] text-ink-quiet">Cargando perfil...</Card>;
  }

  const roleProfile = getRoleProfile(profile.roles?.nombre_rol);
  const estadoActivo = (profile.estado ?? "Activo").toLowerCase() === "activo";
  const cargoPrincipal = profile.cargo || profile.roles?.nombre_rol || "Usuario del sistema";
  const area = profile.areas?.nombre_area ?? "Sin área asignada";
  const ultimoAcceso = profile.ultimo_acceso ? formatDateTime(profile.ultimo_acceso) : "Primera vez que entras";


  const empezarEdicionTelefono = () => {
    setTelefono(profile.telefono ?? "");
    setEditingPhone(true);
  };

  const cancelarTelefono = () => {
    setTelefono(profile.telefono ?? "");
    setEditingPhone(false);
  };

  const guardarTelefono = () => {
    const telefonoLimpio = telefono.trim();
    if (telefonoLimpio && !TELEFONO_VALIDO.test(telefonoLimpio)) {
      toast.error("Ingresa un teléfono válido.");
      return;
    }

    updatePhone.mutate(telefonoLimpio, {
      onSuccess: () => {
        toast.success("Teléfono actualizado");
        setEditingPhone(false);
      },
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo actualizar el teléfono")),
    });
  };

  const elegirFoto = () => fileRef.current?.click();

  const onFotoElegida = (file?: File) => {
    if (fileRef.current) fileRef.current.value = "";
    if (!file) return;
    if (uploadAvatar.isPending || removeAvatar.isPending) return;
    setUploadError(null);
    const showPhotoError = (message: string) => {
      setUploadError(message);
      if (!photoOptions) toast.error(message);
    };
    if (!AVATAR_TIPOS_PERMITIDOS.includes(file.type)) {
      showPhotoError("La foto debe ser JPG, PNG o WEBP.");
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      showPhotoError("La foto supera los 5 MB permitidos.");
      return;
    }
    if (file.size === 0) {
      showPhotoError("La foto está vacía. Elige otra imagen.");
      return;
    }
    uploadAvatar.mutate(file, {
      onSuccess: () => { toast.success("Foto de perfil actualizada"); setPhotoOptions(false); },
      onError: (e) => showPhotoError(apiErrorMessage(e, "No se pudo subir la foto")),
    });
  };

  const copiarValor = async (valor: string, etiqueta: string) => {
    if (!navigator.clipboard?.writeText) {
      toast.error("No se pudo copiar desde este navegador");
      return;
    }

    try {
      await navigator.clipboard.writeText(valor);
      toast.success(`${etiqueta} copiado`);
    } catch {
      toast.error("No se pudo copiar el dato");
    }
  };

  const cambiarPassword = () => {
    setPwError(null);
    if (pwNueva.trim().length < 6) {
      setPwError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (pwNueva !== pwConfirmar) {
      setPwError("La confirmación no coincide con la nueva contraseña");
      return;
    }
    changePassword.mutate(
      { password_actual: pwActual, password_nueva: pwNueva },
      {
        onSuccess: () => {
          toast.success("Contraseña actualizada");
          setPwActual("");
          setPwNueva("");
          setPwConfirmar("");
        },
        onError: (e) => setPwError(apiErrorMessage(e, "No se pudo cambiar la contraseña")),
      }
    );
  };

  const passwordCard = (
        <Card>
          <CardHeader
            icon={<LockKeyhole className="h-4.5 w-4.5" />}
            title="Seguridad de acceso"
            subtitle="Actualiza tu contraseña cuando sea necesario."
            action={
              tab === "informacion" ? <Button type="button" variant="outline" size="sm" onClick={() => setTab("seguridad")}>Cambiar</Button> : <Button type="button" variant="subtle" size="sm" onClick={() => setPwVisible((value) => !value)}>
                {pwVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {pwVisible ? "Ocultar" : "Ver"}
              </Button>
            }
          />
          {tab === "informacion" ? <p className="text-sm text-ink-soft">Contraseña protegida · Último acceso: {ultimoAcceso}</p> : <>
          <div className="grid gap-4 lg:grid-cols-3">
            <Field label="Contraseña actual">
              <Input type={pwVisible ? "text" : "password"} value={pwActual} onChange={(e) => setPwActual(e.target.value)} placeholder="Actual" />
            </Field>
            <Field label="Nueva contraseña">
              <Input
                type={pwVisible ? "text" : "password"}
                value={pwNueva}
                onChange={(e) => setPwNueva(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </Field>
            <Field label="Confirmar contraseña">
              <Input
                type={pwVisible ? "text" : "password"}
                value={pwConfirmar}
                onChange={(e) => setPwConfirmar(e.target.value)}
                placeholder="Repite la nueva contraseña"
              />
            </Field>
          </div>
          {pwError && <p className="mt-3 rounded-lg bg-critical-soft px-3 py-2 text-[12.5px] text-critical-ink">{pwError}</p>}
          <div className="mt-4 flex justify-end">
            <Button size="sm" onClick={cambiarPassword} disabled={changePassword.isPending || !pwActual || !pwNueva || !pwConfirmar}>
              {changePassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Actualizar contraseña
            </Button>
          </div>
          </>}
        </Card>
  );

  return (
    <div className="space-y-5">
      <AvatarOptions open={photoOptions} nombre={profile.nombre} photo={profile.foto_url} error={uploadError} pending={uploadAvatar.isPending || removeAvatar.isPending} onClose={() => setPhotoOptions(false)} onPick={elegirFoto} onRemove={() => { setRemoveError(null); setConfirmRemove(true); }} />
      <ConfirmDialog open={confirmRemove} title="¿Eliminar tu foto de perfil?" description="Tu cuenta se mostrará sin foto, con tus iniciales, en el perfil y las interacciones del sistema. Puedes subir otra cuando quieras." confirmLabel="Sí, eliminar foto" pending={removeAvatar.isPending} error={removeError} onCancel={() => setConfirmRemove(false)} onConfirm={() => {
        if (removeAvatar.isPending) return;
        setRemoveError(null);
        removeAvatar.mutate(undefined, {
          onSuccess: () => { setConfirmRemove(false); setPhotoOptions(false); toast.success("Foto de perfil eliminada"); },
          onError: error => setRemoveError(apiErrorMessage(error, "No se pudo eliminar la foto")),
        });
      }} />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e => onFotoElegida(e.target.files?.[0])} />
      <section className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50 p-5 sm:p-7">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-32 h-96 w-96 rotate-45 rounded-[72px] border border-brand-200/50 shadow-[0_0_0_36px_rgba(168,216,180,0.08),0_0_0_72px_rgba(168,216,180,0.06)]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar nombre={profile.nombre} fotoUrl={profile.foto_url} uploading={uploadAvatar.isPending || removeAvatar.isPending} onPick={() => { setUploadError(null); setPhotoOptions(true); }} />
          <div className="min-w-0 flex-1">
            <h1 className="break-words font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{profile.nombre}</h1>
            <p className="mt-2 text-sm text-ink-soft">{cargoPrincipal}</p>
            <p className="mt-1 text-sm text-ink-quiet">Área: {area}</p>
            <span className={cn("mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", estadoActivo ? "bg-brand-100 text-brand-800" : "bg-warning-soft text-warning-ink")}><span className={cn("h-2 w-2 rounded-full", estadoActivo ? "bg-brand-700" : "bg-warning")} />{estadoActivo ? "Cuenta activa" : profile.estado ?? "Sin estado"}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setTab("informacion"); empezarEdicionTelefono(); }}>Editar contacto</Button>
        </div>
        <p className="relative mt-3 text-xs text-ink-quiet">Pulsa tu foto para cambiarla o eliminarla · JPG, PNG o WEBP, hasta 5 MB.</p>
      </section>
      <nav aria-label="Secciones del perfil" className="flex gap-1 overflow-x-auto border-b border-line">
        {([{ id: "informacion", label: "Información personal" }, { id: "seguridad", label: "Seguridad" }, { id: "actividad", label: "Actividad" }, { id: "notificaciones", label: "Notificaciones" }] as const).map(item => <button key={item.id} type="button" aria-pressed={tab === item.id} onClick={() => setTab(item.id)} className={cn("shrink-0 border-b-2 px-3 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand-700", tab === item.id ? "border-brand-700 font-semibold text-brand-800" : "border-transparent text-ink-soft hover:text-brand-700")}>{item.label}</button>)}
      </nav>
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
        <div className="min-w-0 space-y-5">
          {tab === "informacion" && <>
        <Card>
          <CardHeader
            icon={<IdCard className="h-4.5 w-4.5" />}
            title="Información personal"
            subtitle="Tu identidad y datos de contacto."
          />
          <div className="grid gap-3 md:grid-cols-2">
            <ReadOnlyField icon={IdCard} label="Nombre completo" value={profile.nombre} />
            <ReadOnlyField icon={IdCard} label="Cargo" value={profile.cargo || "Sin cargo asignado"} />
            <ReadOnlyField icon={ShieldCheck} label="Rol" value={profile.roles?.nombre_rol || "Sin rol asignado"} />
            <ReadOnlyField icon={Mail} label="Correo corporativo" value={profile.correo} onCopy={() => copiarValor(profile.correo, "Correo")} />
            <ReadOnlyField
              icon={IdCard}
              label="Código de empleado"
              value={profile.codigo_usuario || "Sin código"}
              mono
              onCopy={() => copiarValor(profile.codigo_usuario, "Código")}
            />
            <ReadOnlyField icon={MapPin} label="Área" value={area} />
            <ReadOnlyField icon={Sparkles} label="Último acceso" value={ultimoAcceso} />
            {profile.fecha_ingreso && <ReadOnlyField icon={CalendarDays} label="Fecha de ingreso" value={formatDate(profile.fecha_ingreso)} />}

            <div className="flex min-w-0 items-start gap-2.5 rounded-lg border border-line-soft bg-surface/35 px-3 py-3 md:col-span-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-ink-quiet">Teléfono</p>
                {editingPhone ? (
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="9XXXXXXXX"
                      inputMode="tel"
                      autoComplete="tel"
                      className="h-9 text-[13px]"
                    />
                    <div className="flex shrink-0 items-center gap-2">
                      <Button size="sm" onClick={guardarTelefono} disabled={updatePhone.isPending}>
                        {updatePhone.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                        Guardar
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={cancelarTelefono} disabled={updatePhone.isPending}>
                        <X className="h-3.5 w-3.5" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={empezarEdicionTelefono}
                    className="mt-0.5 break-words text-left text-[13.5px] font-medium text-ink hover:text-brand-700"
                  >
                    {profile.telefono || "Agregar teléfono"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>


            <p className="px-1 text-xs leading-relaxed text-ink-quiet">Nombre, cargo, correo, área y rol son administrados por el sistema. Puedes actualizar tu teléfono y foto.</p>
          {passwordCard}

          </>}
          {tab === "seguridad" && <>
            {passwordCard}
            <AccountSessions />
          </>}
          {tab === "actividad" && <RecentActivity />}
          {tab === "notificaciones" && <><Card><CardHeader icon={<Bell className="h-5 w-5" />} title="Notificaciones" subtitle="Avisos de la operación y de tu cuenta." /><p className="text-sm leading-relaxed text-ink-soft">Las notificaciones del sistema dependen de tu rol y las acciones asignadas. Los avisos push se configuran por dispositivo cuando están disponibles.</p></Card><PushNotificationsCard /></>}
        </div>
        <aside className="min-w-0 space-y-5">
        <Card>
          <CardHeader icon={<Gauge className="h-4.5 w-4.5" />} title="Mi trabajo" subtitle="Indicadores asociados a tu cuenta." />
          {actividadLoading ? (
            <div className="rounded-lg border border-line-soft bg-surface/45 px-4 py-6 text-center text-[13px] text-ink-quiet">
              Calculando actividad...
            </div>
          ) : actividadError ? (<div className="space-y-3 text-sm text-ink-quiet"><p>No se pudieron cargar los indicadores.</p><Button size="sm" variant="outline" onClick={() => void refetchActividad()}>Reintentar</Button></div>) : actividad.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {actividad.map((item) => (
                <MetricTile key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-line-strong bg-surface/40 px-4 py-6 text-center text-[13px] text-ink-quiet">
              No hay indicadores disponibles para este rol.
            </div>
          )}
        </Card>


          {tab !== "actividad" && <RecentActivity />}
          {roleProfile.actions.length > 0 && <Card><CardHeader icon={<ArrowUpRight className="h-5 w-5" />} title="Accesos de tu perfil" subtitle={roleProfile.subtitle} /><div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{roleProfile.actions.map(action => <QuickActionLink key={action.to} action={action} />)}</div></Card>}
        </aside>
      </div>
    </div>
  );
}
