import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck, X, XCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { api, apiErrorMessage } from "@/lib/api";
import { cn } from "@/lib/utils";
import { riseItem, EASE_OUT, SHAKE_X, SHAKE_TRANSITION, SPRING_SNAPPY } from "@/design-system/motion/variants";

/** Mismo texto que manda `AuthService.resetPassword` para un token vencido, ya usado o inexistente. */
const LINK_VENCIDO = "Este link ya no es válido. Pide uno nuevo.";

function RequisitoPassword({ cumple, children }: { cumple: boolean; children: ReactNode }) {
  return (
    <li className={cn("flex items-center gap-1.5 transition-colors", cumple ? "text-brand-700" : "text-ink-faint")}>
      {/* Un pequeño "pop" con resorte cuando el requisito pasa de tache a check, para que se note el cambio de estado sin depender solo del color. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={cumple ? "ok" : "no"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={SPRING_SNAPPY}
          className="grid place-items-center"
        >
          {cumple ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
        </motion.span>
      </AnimatePresence>
      {children}
    </li>
  );
}

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  // El backend responde el mismo mensaje para un token vencido, ya usado o
  // que nunca existió — se trata como su propio estado (igual que "sin
  // token") en vez de un banner de error suelto dentro del formulario, para
  // que la persona entienda de inmediato que no es un typo en la contraseña.
  const [vencido, setVencido] = useState(false);

  const tieneLargo = password.length >= 6;
  const coincide = confirmar.length > 0 && password === confirmar;
  const puedeEnviar = tieneLargo && coincide;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!puedeEnviar) return;
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setDone(true);
      window.setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (requestError) {
      const message = apiErrorMessage(requestError, "No se pudo restablecer la contraseña.");
      if (message === LINK_VENCIDO) setVencido(true);
      else setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!token || vencido) {
    return (
      <AuthLayout
        icon={<XCircle className="h-5 w-5" />}
        tone="danger"
        title={token ? "El link venció" : "Link inválido"}
        description={
          token
            ? "Este link de recuperación ya se usó, venció o fue reemplazado por uno más nuevo. Pide otro para continuar."
            : "Este link no trae la información necesaria. Pide uno nuevo desde \"¿Olvidaste tu contraseña?\"."
        }
      >
        <motion.div variants={riseItem}>
          <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} transition={SPRING_SNAPPY}>
            <Link
              to="/forgot-password"
              className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
            >
              Pedir un link nuevo
            </Link>
          </motion.div>
        </motion.div>
      </AuthLayout>
    );
  }

  if (done) {
    return (
      <AuthLayout
        icon={<CheckCircle2 className="h-5 w-5" />}
        title="Contraseña actualizada"
        description="Ya puedes iniciar sesión con tu contraseña nueva. Te llevamos al login..."
      />
    );
  }

  return (
    <AuthLayout icon={<ShieldCheck className="h-5 w-5" />} title="Elige tu nueva contraseña">
      <motion.form onSubmit={submit} variants={riseItem} className="mt-4 space-y-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">Contraseña nueva</span>
          <span className="relative block">
            <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Al menos 6 caracteres"
              className="h-11 w-full rounded-lg border border-line-strong bg-white pl-10 pr-11 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
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
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold text-ink-soft">Confirmar contraseña</span>
          <span className="relative block">
            <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmar}
              onChange={(event) => setConfirmar(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Repite la contraseña"
              className={cn(
                "h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-[13.5px] text-ink outline-none transition focus:ring-2",
                confirmar.length > 0 && !coincide
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
                  : "border-line-strong focus:border-brand-600 focus:ring-brand-600/15"
              )}
            />
          </span>
        </label>

        {/* Estado en vivo: se ve al escribir, no recién después de enviar. */}
        <ul className="-mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
          <RequisitoPassword cumple={tieneLargo}>Al menos 6 caracteres</RequisitoPassword>
          <RequisitoPassword cumple={coincide}>Las contraseñas coinciden</RequisitoPassword>
        </ul>

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
          disabled={loading || !puedeEnviar}
          whileHover={loading || !puedeEnviar ? undefined : { scale: 1.015 }}
          whileTap={loading || !puedeEnviar ? undefined : { scale: 0.98 }}
          animate={loading ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={loading ? { duration: 1.1, repeat: Infinity, ease: EASE_OUT } : SPRING_SNAPPY}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
          {loading ? "Guardando..." : "Guardar contraseña nueva"}
        </motion.button>
      </motion.form>
    </AuthLayout>
  );
}
