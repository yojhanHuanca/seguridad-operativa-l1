import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { apiErrorMessage } from "@/lib/api";
import { homeForRole, useAuth } from "@/features/auth/auth";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

export function LoginPage() {
  const { login, loginWithGoogle, user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);

  // `ProtectedRoute` guarda la ruta a la que se quería entrar en el estado de
  // la navegación al mandar para acá — por ejemplo, el enlace de un correo de
  // plan asignado que apunta a `/jefe/planes/:codigo`. Sin esto, después de
  // loguearse siempre caía en el panel genérico del rol y perdía el destino
  // real, sin importar de dónde vino. `ProtectedRoute` vuelve a filtrar por
  // rol cuando se navega ahí, así que redirigir ciego acá es seguro: un
  // usuario sin permiso para esa ruta rebota igual, como siempre.
  const from = (location.state as { from?: string } | null)?.from;
  const destino = (rol: string) => from || homeForRole(rol);

  if (user && token) return <Navigate to={destino(user.rol)} replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const authenticatedUser = await login(correo.trim().toLowerCase(), password);
      navigate(destino(authenticatedUser.rol), { replace: true });
    } catch (loginError) {
      setError(apiErrorMessage(loginError, "No se pudo iniciar sesión. Verifica tus credenciales."));
    } finally {
      setLoading(false);
    }
  };

  const submitWithGoogle = async (credential: string) => {
    setError("");
    setLoading(true);
    try {
      const authenticatedUser = await loginWithGoogle(credential);
      navigate(destino(authenticatedUser.rol), { replace: true });
    } catch (loginError) {
      setError(apiErrorMessage(loginError, "No se pudo iniciar sesión con Google."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-[100svh] bg-[#0c0c0c] lg:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.65fr)]">
      <section className="relative hidden min-h-[100svh] overflow-hidden lg:block">
        <img src="/login-metro-lima.png" alt="Tren metropolitano circulando por un viaducto urbano de Lima" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex h-full min-h-[100svh] max-w-[760px] flex-col justify-between p-10 xl:p-14">
          <Logo size={84} withWordmark={false} tone="light" className="[filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.55))]" />
          <div className="pb-5 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.75),0_1px_3px_rgba(0,0,0,0.6)]">
            <div className="mb-5 inline-flex items-center gap-2 border-l-2 border-brand-400 pl-3 text-[11px] font-semibold uppercase text-white/75">
              Plataforma interna autorizada
            </div>
            <h1 className="max-w-[650px] font-display text-[42px] font-bold leading-[1.08] xl:text-[52px]">Seguridad operativa que mantiene Lima en movimiento.</h1>
            <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-white/72">Gestión centralizada de eventos, investigaciones y planes de acción para la operación segura de Línea 1.</p>
            <div className="mt-8 flex gap-7 border-t border-white/20 pt-5 text-[11px] text-white/65">
              <span><strong className="block text-[18px] text-white">26</strong> estaciones</span>
              <span><strong className="block text-[18px] text-white">11</strong> distritos conectados</span>
              <span><strong className="block text-[18px] text-white">24/7</strong> continuidad operativa</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[100svh] items-center justify-center bg-white px-5 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 lg:hidden"><Logo size={48} withWordmark={false} /></div>
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700"><ShieldCheck className="h-5 w-5" /></div>
          <p className="mt-6 text-[11px] font-semibold uppercase text-brand-700">{systemName}</p>
          <h2 className="mt-2 font-display text-[30px] font-bold text-ink">Acceso al sistema</h2>
          <p className="mt-2 text-[13px] leading-6 text-ink-quiet">Ingresa con las credenciales asignadas por el administrador.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-ink-soft">Correo corporativo</span>
              <span className="relative block"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" /><input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} required autoComplete="username" placeholder="nombre@metrolinea1.pe" className="h-12 w-full rounded-lg border border-line-strong bg-white pl-10 pr-3 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15" /></span>
            </label>
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-ink-soft">Contraseña</span>
              <span className="relative block"><LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" /><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete="current-password" placeholder="Ingresa tu contraseña" className="h-12 w-full rounded-lg border border-line-strong bg-white pl-10 pr-11 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-ink-faint hover:bg-surface hover:text-ink" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span>
            </label>
            <div className="text-right">
              <Link to="/forgot-password" className="text-[12px] font-semibold text-brand-700 hover:text-brand-800 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">{error}</div>}
            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}{loading ? "Verificando acceso..." : "Iniciar sesión"}</button>
          </form>

          <GoogleSignInButton onCredential={submitWithGoogle} disabled={loading} />

          <div className="mt-8 border-t border-line-soft pt-5 text-[11.5px] leading-5 text-ink-faint"><p>Acceso exclusivo para personal autorizado.</p><p>Las sesiones y actividades pueden ser registradas por seguridad.</p></div>
        </div>
      </section>
    </main>
  );
}
