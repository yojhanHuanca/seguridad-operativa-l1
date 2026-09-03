import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail, MailCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { api, apiErrorMessage } from "@/lib/api";
import { riseItem, EASE_OUT, SHAKE_X, SHAKE_TRANSITION, SPRING_SNAPPY } from "@/design-system/motion/variants";

export function ForgotPasswordPage() {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { correo: correo.trim().toLowerCase() });
      setSent(true);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "No se pudo procesar la solicitud. Intenta de nuevo."));
    } finally {
      setLoading(false);
    }
  };

  const volver = (
    <motion.div variants={riseItem}>
      <Link to="/login" className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-soft hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio de sesión
      </Link>
    </motion.div>
  );

  if (sent) {
    return (
      <AuthLayout
        icon={<MailCheck className="h-5 w-5" />}
        title="Revisa tu correo"
        description={
          <>
            Si <strong className="text-ink">{correo.trim()}</strong> está registrado en el sistema, te llegará un correo con un link
            para elegir una contraseña nueva. Vale por 30 minutos.
          </>
        }
        footer={volver}
      />
    );
  }

  return (
    <AuthLayout
      icon={<ShieldCheck className="h-5 w-5" />}
      title="¿Olvidaste tu contraseña?"
      description="Ingresa tu correo corporativo y te enviamos un link para restablecerla."
      footer={volver}
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
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {loading ? "Enviando..." : "Enviar link de recuperación"}
        </motion.button>
      </motion.form>
    </AuthLayout>
  );
}
