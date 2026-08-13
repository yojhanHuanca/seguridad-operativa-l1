import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Save, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { Field, Input, Select } from "@/design-system/primitives/Input";
import { useAreas } from "@/features/reports/hooks/useAreas";
import { useRoles } from "../hooks/useRoles";
import { useCreateUser, useUpdateUser } from "../hooks/useUserActions";
import { apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { UserListItem } from "../types";

const STEPS = ["datos", "acceso"] as const;
type Step = (typeof STEPS)[number];
const STEP_LABELS: Record<Step, string> = { datos: "Datos personales", acceso: "Acceso y rol" };

interface FormState {
  codigo_usuario: string;
  nombre: string;
  correo: string;
  cargo: string;
  telefono: string;
  password: string;
  id_area: string;
  id_rol: string;
  estado: string;
}

const EMPTY_FORM: FormState = {
  codigo_usuario: "",
  nombre: "",
  correo: "",
  cargo: "",
  telefono: "",
  password: "",
  id_area: "",
  id_rol: "",
  estado: "Activo",
};

function fromUser(user: UserListItem): FormState {
  return {
    codigo_usuario: user.codigo_usuario,
    nombre: user.nombre,
    correo: user.correo,
    cargo: user.cargo ?? "",
    telefono: user.telefono ?? "",
    password: "",
    id_area: user.id_area ? String(user.id_area) : "",
    id_rol: user.id_rol ? String(user.id_rol) : "",
    estado: user.estado ?? "Activo",
  };
}

/**
 * Alta y edición de usuarios, en el mismo modal paso a paso que ya usa el
 * resto del panel de SO (ver NuevoReporteModal). `user` presente = editar;
 * ausente = crear una cuenta nueva. No hay auto-registro en el sistema: solo
 * el administrador puede crear cuentas, por eso vive en Administración de
 * Usuarios.
 */
export function UserFormModal({ open, onClose, user }: { open: boolean; onClose: () => void; user?: UserListItem | null }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!user;

  const areas = useAreas();
  const roles = useRoles();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const pending = createUser.isPending || updateUser.isPending;
  const step = STEPS[stepIndex];

  useEffect(() => {
    if (!open) return;
    setStepIndex(0);
    setError(null);
    setForm(user ? fromUser(user) : EMPTY_FORM);
  }, [open, user]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const datosValidos = form.codigo_usuario.trim() && form.nombre.trim() && form.correo.trim();
  const accesoValido = form.id_area && form.id_rol && (isEdit || form.password.trim().length >= 6);

  const goNext = () => {
    if (!datosValidos) {
      setError("Completa código, nombre y correo antes de continuar.");
      return;
    }
    setError(null);
    setStepIndex(1);
  };

  const goBack = () => setStepIndex(0);

  const onSubmit = () => {
    if (!accesoValido) {
      setError(isEdit ? "Selecciona área y rol." : "Selecciona área, rol y define una contraseña de al menos 6 caracteres.");
      return;
    }
    setError(null);

    const base = {
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      cargo: form.cargo.trim() || undefined,
      telefono: form.telefono.trim() || undefined,
      id_area: Number(form.id_area),
      id_rol: Number(form.id_rol),
    };

    if (isEdit) {
      updateUser.mutate(
        { id_usuario: user!.id_usuario, ...base, estado: form.estado, ...(form.password.trim() ? { password: form.password.trim() } : {}) },
        {
          onSuccess: () => {
            toast.success("Usuario actualizado");
            onClose();
          },
          onError: (e) => toast.error(apiErrorMessage(e, "No se pudo actualizar el usuario")),
        }
      );
      return;
    }

    createUser.mutate(
      { codigo_usuario: form.codigo_usuario.trim(), password: form.password.trim(), ...base },
      {
        onSuccess: () => {
          toast.success("Usuario creado");
          onClose();
        },
        onError: (e) => toast.error(apiErrorMessage(e, "No se pudo crear el usuario")),
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? `Editar ${user!.nombre}` : "Nuevo usuario"}
      subtitle={isEdit ? "Actualiza sus datos, área o rol asignado." : "Crea una cuenta para Seguridad Operativa, Jefe de Área o Monitorista."}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={goBack} disabled={stepIndex === 0}>
            <ChevronLeft className="h-4 w-4" /> Atrás
          </Button>
          {step === "datos" ? (
            <Button size="sm" onClick={goNext}>
              Continuar <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={onSubmit} disabled={pending}>
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? <Save className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {isEdit ? "Guardar cambios" : "Crear usuario"}
            </Button>
          )}
        </>
      }
    >
      <ol className="flex items-center gap-1">
        {STEPS.map((s, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <div
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-full px-2 text-[11px] font-medium transition-colors",
                  done && "bg-brand-700 text-white",
                  active && "bg-brand-50 text-brand-800 ring-1 ring-brand-200",
                  !done && !active && "bg-surface-2 text-ink-quiet"
                )}
              >
                <span
                  className={cn(
                    "grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9.5px]",
                    done && "bg-white/20",
                    active && "bg-brand-700 text-white",
                    !done && !active && "bg-white text-ink-quiet"
                  )}
                >
                  {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
                </span>
                <span>{STEP_LABELS[s]}</span>
              </div>
              {i < STEPS.length - 1 && <div className={cn("mx-1 h-0.5 flex-1 rounded-full", done ? "bg-brand-700" : "bg-line")} />}
            </li>
          );
        })}
      </ol>

      <div className="mt-5 space-y-4">
        {step === "datos" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Código de usuario" required>
                <Input value={form.codigo_usuario} onChange={(e) => set("codigo_usuario", e.target.value)} disabled={isEdit} placeholder="USR-001" />
              </Field>
              <Field label="Nombre completo" required>
                <Input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre y apellido" />
              </Field>
            </div>
            <Field label="Correo electrónico" required>
              <Input type="email" value={form.correo} onChange={(e) => set("correo", e.target.value)} placeholder="correo@lineauno.pe" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Cargo" hint="Opcional">
                <Input value={form.cargo} onChange={(e) => set("cargo", e.target.value)} placeholder="Ej. Analista SO" />
              </Field>
              <Field label="Teléfono" hint="Opcional">
                <Input value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="9XXXXXXXX" />
              </Field>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Área" required>
                <Select value={form.id_area} onChange={(e) => set("id_area", e.target.value)} disabled={areas.isLoading}>
                  <option value="">Selecciona un área…</option>
                  {areas.data?.map((a) => (
                    <option key={a.id_area} value={a.id_area}>{a.nombre_area}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Rol" required>
                <Select value={form.id_rol} onChange={(e) => set("id_rol", e.target.value)} disabled={roles.isLoading}>
                  <option value="">Selecciona un rol…</option>
                  {roles.data?.map((r) => (
                    <option key={r.id_rol} value={r.id_rol}>{r.nombre_rol}</option>
                  ))}
                </Select>
              </Field>
            </div>
            {isEdit && (
              <Field label="Estado">
                <Select value={form.estado} onChange={(e) => set("estado", e.target.value)}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Select>
              </Field>
            )}
            <Field
              label={isEdit ? "Restablecer contraseña" : "Contraseña"}
              required={!isEdit}
              hint={isEdit ? "Déjalo en blanco para no cambiarla." : "Mínimo 6 caracteres."}
            >
              <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder={isEdit ? "••••••••" : "Contraseña de acceso"} />
            </Field>
          </>
        )}

        {error && <p className="text-[12.5px] text-critical">{error}</p>}
      </div>
    </Modal>
  );
}
