import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bell,
  BellOff,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
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
  UserCheck,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { apiErrorMessage } from "@/lib/api";
import { useArchivoProtegido } from "@/lib/archivos";
import { formatDate, formatDateTime, initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { usePushSubscription } from "@/features/notifications/hooks/usePushSubscription";
import { useMyActivity, useMyProfile, useUpdatePhone, useUploadAvatar, useChangePassword } from "../hooks/useProfile";

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
  const fotoSrc = useArchivoProtegido(fotoUrl);

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={uploading}
      className="group relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white bg-brand-100 text-[25px] font-bold text-brand-800 shadow-sm disabled:cursor-wait"
      title="Cambiar foto de perfil"
    >
      {fotoUrl ? (
        <img src={fotoSrc} alt={nombre} className="h-full w-full object-cover" />
      ) : (
        initials(nombre)
      )}
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

/**
 * Auto-oculta la tarjeta entera si no hay VITE_VAPID_PUBLIC_KEY configurada
 * o el navegador no admite push — mismo criterio que el botón de Google.
 */
function PushNotificationsCard() {
  const { estado, activar, desactivar } = usePushSubscription();
  const [busy, setBusy] = useState(false);

  if (estado === "cargando" || estado === "no-soportado" || estado === "sin-clave") return null;

  const alternar = async () => {
    setBusy(true);
    try {
      if (estado === "activo") {
        await desactivar();
        toast.success("Notificaciones push desactivadas en este dispositivo");
      } else {
        await activar();
        toast.success("Notificaciones push activadas en este dispositivo");
      }
    } catch (e) {
      toast.error(apiErrorMessage(e, "No se pudo cambiar la configuración de notificaciones"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader
        icon={<Bell className="h-4.5 w-4.5" />}
        title="Notificaciones push"
        subtitle="Recibe un aviso con sonido en este dispositivo cuando te llegue algo nuevo."
      />
      {estado === "denegado" ? (
        <p className="rounded-lg border border-warning-soft bg-warning-soft/40 px-3 py-2.5 text-[12.5px] leading-relaxed text-warning-ink">
          Bloqueaste los avisos para este sitio. Actívalos desde la configuración de notificaciones de tu navegador.
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-[12.5px] leading-relaxed text-ink-quiet">
            {estado === "activo"
              ? "Activadas en este dispositivo."
              : "Actívalas para no tener que revisar la bandeja a cada rato."}
          </p>
          <Button size="sm" variant={estado === "activo" ? "outline" : "primary"} onClick={alternar} disabled={busy}>
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : estado === "activo" ? <BellOff className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
            {estado === "activo" ? "Desactivar" : "Activar notificaciones"}
          </Button>
        </div>
      )}
      <p className="mt-3 text-[11.5px] leading-relaxed text-ink-faint">
        En iPhone: agrega este sitio a tu pantalla de inicio (Compartir → Agregar a inicio) para que los avisos funcionen — es una
        restricción de Apple, no de esta plataforma.
      </p>
    </Card>
  );
}

export function ProfileContent() {
  const { data: profile, isLoading } = useMyProfile();
  const { data: actividad = [], isLoading: actividadLoading } = useMyActivity();
  const updatePhone = useUpdatePhone();
  const uploadAvatar = useUploadAvatar();
  const changePassword = useChangePassword();
  const fileRef = useRef<HTMLInputElement>(null);

  const [telefono, setTelefono] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [pwActual, setPwActual] = useState("");
  const [pwNueva, setPwNueva] = useState("");
  const [pwConfirmar, setPwConfirmar] = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  if (isLoading || !profile) {
    return <Card className="py-14 text-center text-[13px] text-ink-quiet">Cargando perfil...</Card>;
  }

  const roleProfile = getRoleProfile(profile.roles?.nombre_rol);
  const estadoActivo = (profile.estado ?? "Activo").toLowerCase() === "activo";
  const cargoPrincipal = profile.cargo || profile.roles?.nombre_rol || "Usuario del sistema";
  const area = profile.areas?.nombre_area ?? "Sin área asignada";
  const ultimoAcceso = profile.ultimo_acceso ? formatDateTime(profile.ultimo_acceso) : "Primera vez que entras";

  const accountSignals = [
    {
      label: "Estado",
      value: profile.estado ?? "Activo",
      ok: estadoActivo,
      icon: UserCheck,
    },
    {
      label: "Contacto",
      value: profile.telefono ? "Registrado" : "Pendiente",
      ok: Boolean(profile.telefono),
      icon: Phone,
    },
    {
      label: "Foto",
      value: profile.foto_url ? "Actualizada" : "Sin foto",
      ok: Boolean(profile.foto_url),
      icon: Camera,
    },
  ];

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
    if (!file) return;
    if (!AVATAR_TIPOS_PERMITIDOS.includes(file.type)) {
      toast.error("La foto debe ser JPG, PNG o WEBP.");
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      toast.error("La foto supera los 5 MB permitidos.");
      return;
    }
    uploadAvatar.mutate(file, {
      onSuccess: () => toast.success("Foto de perfil actualizada"),
      onError: (e) => toast.error(apiErrorMessage(e, "No se pudo subir la foto")),
    });
    if (fileRef.current) fileRef.current.value = "";
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

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => onFotoElegida(e.target.files?.[0])}
      />

      <div className="min-w-0 space-y-4">
        <Card padded={false} className="overflow-hidden">
          <div className="flex flex-col gap-5 border-b border-line bg-surface/55 p-5 sm:flex-row sm:items-center">
            <Avatar nombre={profile.nombre} fotoUrl={profile.foto_url} uploading={uploadAvatar.isPending} onPick={elegirFoto} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-800">
                  <ShieldCheck className="h-3 w-3" /> {profile.roles?.nombre_rol ?? "Sin rol"}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium",
                    estadoActivo ? "bg-brand-50 text-brand-800" : "bg-warning-soft text-warning-ink"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", estadoActivo ? "bg-brand-600" : "bg-warning")} />
                  {profile.estado ?? "Activo"}
                </span>
              </div>
              <h1 className="mt-3 break-words text-[24px] font-bold leading-tight text-ink">{profile.nombre}</h1>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-quiet">
                {cargoPrincipal} <span className="text-ink-faint">/</span> {area}
              </p>
            </div>
          </div>

          <div className="grid gap-px bg-line sm:grid-cols-3">
            {accountSignals.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                        item.ok ? "bg-brand-50 text-brand-700" : "bg-warning-soft text-warning-ink"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink-quiet">{item.label}</p>
                      <p className="truncate text-[13px] font-semibold text-ink">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader
            icon={<IdCard className="h-4.5 w-4.5" />}
            title="Identidad corporativa"
            subtitle="Datos principales asociados a tu usuario."
          />
          <div className="grid gap-3 md:grid-cols-2">
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

        <PushNotificationsCard />

        <Card>
          <CardHeader icon={<Gauge className="h-4.5 w-4.5" />} title="Resumen operativo" subtitle="Indicadores asociados a tu cuenta." />
          {actividadLoading ? (
            <div className="rounded-lg border border-line-soft bg-surface/45 px-4 py-6 text-center text-[13px] text-ink-quiet">
              Calculando actividad...
            </div>
          ) : actividad.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {actividad.map((item) => (
                <MetricTile key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-line-strong bg-surface/40 px-4 py-6 text-center text-[13px] text-ink-quiet">
              Aún no hay actividad registrada para este usuario.
            </div>
          )}
        </Card>

        <Card>
          <CardHeader
            icon={<LockKeyhole className="h-4.5 w-4.5" />}
            title="Seguridad de acceso"
            subtitle="Actualiza tu contraseña cuando sea necesario."
            action={
              <Button type="button" variant="subtle" size="sm" onClick={() => setPwVisible((value) => !value)}>
                {pwVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {pwVisible ? "Ocultar" : "Ver"}
              </Button>
            }
          />
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
        </Card>
      </div>

      <aside className="min-w-0 space-y-4">
        <Card>
          <CardHeader icon={<BriefcaseBusiness className="h-4.5 w-4.5" />} title={roleProfile.panel} subtitle={roleProfile.subtitle} />
          <div className="space-y-2">
            {roleProfile.scopeItems.map((item) => (
              <div key={item} className="flex gap-2 rounded-lg border border-line-soft bg-surface/40 px-3 py-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <p className="text-[12.5px] leading-relaxed text-ink-soft">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {roleProfile.actions.length > 0 && (
          <Card>
            <CardHeader icon={<ArrowUpRight className="h-4.5 w-4.5" />} title="Accesos del panel" subtitle="Rutas principales para este perfil." />
            <div className="grid gap-2">
              {roleProfile.actions.map((action) => (
                <QuickActionLink key={`${action.to}-${action.label}`} action={action} />
              ))}
            </div>
          </Card>
        )}
      </aside>
    </div>
  );
}
