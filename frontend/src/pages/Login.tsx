import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiErrorMessage } from "@/lib/api";
import { homeForRole, useAuth } from "@/features/auth/auth";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { GoogleSignInButton } from "@/features/auth/GoogleSignInButton";
import { riseItem, EASE_OUT, SHAKE_X, SHAKE_TRANSITION, SPRING_SNAPPY } from "@/design-system/motion/variants";

export function LoginPage() {
  const { login, loginWithGoogle, user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <AuthLayout
      icon={<ShieldCheck className="h-5 w-5" />}
      title="Acceso al sistema"
      description="Ingresa con las credenciales asignadas por el administrador."
      footer={
        <div className="mt-3 border-t border-line-soft pt-2.5 text-[11.5px] leading-5 text-ink-faint">
          <p>Acceso exclusivo para personal autorizado.</p>
          <p>Las sesiones y actividades pueden ser registradas por seguridad.</p>
        </div>
      }
    >
      <motion.form onSubmit={submit} variants={riseItem} className="mt-4 space-y-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">Correo corporativo</span>
          <span className="relative block">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
              autoComplete="username"
              placeholder="nombre@metrolinea1.pe"
              className="h-11 w-full rounded-lg border border-line-strong bg-white pl-10 pr-3 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">Contraseña</span>
          <span className="relative block">
            <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              className="h-11 w-full rounded-lg border border-line-strong bg-white pl-10 pr-11 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center overflow-hidden rounded-md text-ink-faint hover:bg-surface hover:text-ink"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showPassword ? "hide" : "show"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="grid place-items-center"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </span>
        </label>
        <div className="text-right">
          <Link to="/forgot-password" className="text-[12px] font-semibold text-brand-700 hover:text-brand-800 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <AnimatePresence>
          {error && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto", x: SHAKE_X }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ...SHAKE_TRANSITION, height: { duration: 0.2 } }}
              className="overflow-hidden rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? undefined : { scale: 1.015 }}
          whileTap={loading ? undefined : { scale: 0.98 }}
          animate={loading ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={loading ? { duration: 1.1, repeat: Infinity, ease: EASE_OUT } : SPRING_SNAPPY}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
          {loading ? "Verificando acceso..." : "Iniciar sesión"}
        </motion.button>
      </motion.form>

      <motion.div variants={riseItem}>
        <GoogleSignInButton onCredential={submitWithGoogle} disabled={loading} />
      </motion.div>
    </AuthLayout>
  );
}
