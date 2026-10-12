import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { homeForRole, useAuth } from "@/features/auth/auth";
import { SessionExitButton } from "@/features/auth/SessionExitButton";
import { useChangePassword } from "@/features/profile/hooks/useProfile";
import { apiErrorMessage } from "@/lib/api";
import { newPasswordError } from "@/lib/password";

export function ChangePasswordPage() {
  const { user, token, clearSession } = useAuth();
  const navigate = useNavigate();
  const changePassword = useChangePassword();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user || !token) return <Navigate to="/login" replace />;
  if (!user.debe_cambiar_password) return <Navigate to={homeForRole(user.rol)} replace />;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (changePassword.isPending) return;
    const validation = newPasswordError(password, confirmation);
    if (validation || current === password) {
      setError(validation ?? "Elige una contraseña diferente a la temporal");
      return;
    }
    setError(null);
    changePassword.mutate({ password_actual: current, password_nueva: password, password_confirmacion: confirmation }, {
      onSuccess: () => {
        clearSession("password-changed");
        navigate("/login", { replace: true });
      },
      onError: cause => setError(apiErrorMessage(cause, "No se pudo cambiar la contraseña. Intenta nuevamente.")),
    });
  };

  return (
    <AuthLayout icon={<ShieldCheck className="h-5 w-5" />} title="Protege tu cuenta"
      description="Cambia tu contraseña temporal antes de ingresar al sistema."
      footer={!changePassword.isPending && <div className="mt-4 text-center"><SessionExitButton withLabel /></div>}>
      <p className="mt-4 break-words rounded-lg bg-brand-50 px-3 py-2.5 text-[12px] text-brand-800">{user.nombre}<br />{user.correo}</p>
      <form onSubmit={submit} className="mt-4 space-y-3.5">
        {[
          { label: "Contraseña temporal", value: current, set: setCurrent, autoComplete: "current-password" },
          { label: "Nueva contraseña", value: password, set: setPassword, autoComplete: "new-password" },
          { label: "Confirmar nueva contraseña", value: confirmation, set: setConfirmation, autoComplete: "new-password" },
        ].map(field => <label key={field.label} className="block">
          <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">{field.label}</span>
          <input type={visible ? "text" : "password"} value={field.value} onChange={event => field.set(event.target.value)}
            required disabled={changePassword.isPending} autoComplete={field.autoComplete}
            className="h-11 w-full rounded-lg border border-line-strong bg-white px-3 text-[13.5px] text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 disabled:opacity-60" />
        </label>)}
        <button type="button" aria-pressed={visible} onClick={() => setVisible(value => !value)} className="flex items-center gap-2 text-xs text-brand-700">
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}{visible ? "Ocultar contraseñas" : "Mostrar contraseñas"}
        </button>
        <p className="text-[12px] leading-5 text-ink-quiet">Usa al menos 6 caracteres y una contraseña distinta a la temporal. Al guardarla se cerrarán todas tus sesiones y podrás ingresar con la nueva clave.</p>
        {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">{error}</p>}
        <button type="submit" disabled={changePassword.isPending} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-3 py-2 text-[13px] font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60">
          {changePassword.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {changePassword.isPending ? "Guardando..." : "Guardar contraseña y volver a ingresar"}
        </button>
      </form>
    </AuthLayout>
  );
}
