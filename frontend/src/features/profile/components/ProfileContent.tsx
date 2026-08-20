import { useRef, useState } from "react";
import { Camera, IdCard, KeyRound, Loader2, Mail, Phone, Save, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader } from "@/design-system/primitives/Card";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input } from "@/design-system/primitives/Input";
import { apiErrorMessage } from "@/lib/api";
import { useArchivoProtegido } from "@/lib/archivos";
import { formatDate, formatDateTime, initials } from "@/lib/format";
import { useMyActivity, useMyProfile, useUpdatePhone, useUploadAvatar, useChangePassword } from "../hooks/useProfile";

// Mismos límites que exige el backend (`uploadAvatar` en upload.middleware.ts).
const AVATAR_TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
const AVATAR_MAX_BYTES = 5 * 1024 * 1024;

function Avatar({ nombre, fotoUrl, uploading, onPick }: { nombre: string; fotoUrl: string | null; uploading: boolean; onPick: () => void }) {
  const fotoSrc = useArchivoProtegido(fotoUrl);

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={uploading}
      className="group relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-[22px] font-bold text-brand-800 disabled:cursor-wait"
      title="Cambiar foto de perfil"
    >
      {fotoUrl ? (
        <img src={fotoSrc} alt={nombre} className="h-full w-full object-cover" />
      ) : (
        initials(nombre)
      )}
      <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition-all group-hover:bg-ink/40 group-hover:opacity-100">
        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
      </span>
    </button>
  );
}

function ReadOnlyField({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
      <div className="min-w-0">
        <p className="text-[11px] text-ink-quiet">{label}</p>
        <p className="truncate text-[13.5px] font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

export function ProfileContent() {
  const { data: profile, isLoading } = useMyProfile();
  const { data: actividad } = useMyActivity();
  const updatePhone = useUpdatePhone();
  const uploadAvatar = useUploadAvatar();
  const changePassword = useChangePassword();
  const fileRef = useRef<HTMLInputElement>(null);

  const [telefono, setTelefono] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [pwActual, setPwActual] = useState("");
  const [pwNueva, setPwNueva] = useState("");
  const [pwConfirmar, setPwConfirmar] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  if (isLoading || !profile) {
    return <Card className="py-14 text-center text-[13px] text-ink-quiet">Cargando perfil…</Card>;
  }

  const empezarEdicionTelefono = () => {
    setTelefono(profile.telefono ?? "");
    setEditingPhone(true);
  };

  const guardarTelefono = () => {
    updatePhone.mutate(telefono.trim(), {
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
    <div className="space-y-4">
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => onFotoElegida(e.target.files?.[0])}
      />

      <Card className="flex flex-wrap items-center gap-5">
        <Avatar nombre={profile.nombre} fotoUrl={profile.foto_url} uploading={uploadAvatar.isPending} onPick={elegirFoto} />
        <div className="min-w-0 flex-1">
          <h1 className="text-[19px] font-bold text-ink">{profile.nombre}</h1>
          <p className="mt-0.5 text-[13px] text-ink-quiet">
            {profile.cargo || profile.roles?.nombre_rol} {profile.areas?.nombre_area ? `· ${profile.areas.nombre_area}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-800">
              <ShieldCheck className="h-3 w-3" /> {profile.roles?.nombre_rol ?? "Sin rol"}
            </span>
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium ${
                (profile.estado ?? "Activo").toLowerCase() === "activo" ? "bg-brand-50 text-brand-800" : "bg-surface-2 text-ink-quiet"
              }`}
            >
              {profile.estado ?? "Activo"}
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader icon={<IdCard className="h-4.5 w-4.5" />} title="Datos de la cuenta" subtitle="El correo, área y rol los administra tu Admin." />
        <div className="grid gap-4 sm:grid-cols-2">
          <ReadOnlyField icon={Mail} label="Correo corporativo" value={profile.correo} />
          <ReadOnlyField icon={IdCard} label="Código de empleado" value={profile.codigo_usuario} />
          <ReadOnlyField icon={ShieldCheck} label="Área" value={profile.areas?.nombre_area ?? "Sin asignar"} />
          <ReadOnlyField
            icon={Sparkles}
            label="Último acceso"
            value={profile.ultimo_acceso ? formatDateTime(profile.ultimo_acceso) : "Primera vez que entrás"}
          />
          {profile.fecha_ingreso && <ReadOnlyField icon={IdCard} label="Fecha de ingreso" value={formatDate(profile.fecha_ingreso)} />}

          <div className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-ink-quiet">Teléfono</p>
              {editingPhone ? (
                <div className="mt-1 flex items-center gap-2">
                  <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="9XXXXXXXX" className="h-8 text-[13px]" />
                  <Button size="sm" onClick={guardarTelefono} disabled={updatePhone.isPending}>
                    {updatePhone.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              ) : (
                <button type="button" onClick={empezarEdicionTelefono} className="truncate text-[13.5px] font-medium text-ink hover:text-brand-700">
                  {profile.telefono || "Agregar teléfono"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {actividad && actividad.length > 0 && (
        <Card>
          <CardHeader icon={<Sparkles className="h-4.5 w-4.5" />} title="Tu actividad" />
          <div className="grid gap-3 sm:grid-cols-2">
            {actividad.map((item) => (
              <div key={item.label} className="rounded-xl bg-surface px-4 py-3.5">
                <p className="text-[22px] font-bold text-ink">{item.value}</p>
                <p className="mt-0.5 text-[12px] text-ink-quiet">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <CardHeader icon={<KeyRound className="h-4.5 w-4.5" />} title="Seguridad" subtitle="Cambiá tu contraseña de acceso." />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Contraseña actual">
            <Input type="password" value={pwActual} onChange={(e) => setPwActual(e.target.value)} placeholder="••••••••" />
          </Field>
          <Field label="Nueva contraseña">
            <Input type="password" value={pwNueva} onChange={(e) => setPwNueva(e.target.value)} placeholder="Mínimo 6 caracteres" />
          </Field>
          <Field label="Confirmar nueva contraseña">
            <Input type="password" value={pwConfirmar} onChange={(e) => setPwConfirmar(e.target.value)} placeholder="Repetí la nueva contraseña" />
          </Field>
        </div>
        {pwError && <p className="mt-3 text-[12.5px] text-critical">{pwError}</p>}
        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            onClick={cambiarPassword}
            disabled={changePassword.isPending || !pwActual || !pwNueva || !pwConfirmar}
          >
            {changePassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            Actualizar contraseña
          </Button>
        </div>
      </Card>
    </div>
  );
}
