import { useState, type FormEvent } from "react";
import { ArrowLeft, Loader2, Mail, MailCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { api, apiErrorMessage } from "@/lib/api";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

export function ForgotPasswordPage() {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);

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

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[#0c0c0c] px-5 py-10">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-6"><Logo size={40} withWordmark={false} /></div>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
          {sent ? <MailCheck className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase text-brand-700">{systemName}</p>

        {sent ? (
          <>
            <h2 className="mt-2 font-display text-[24px] font-bold text-ink">Revisa tu correo</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-quiet">
              Si <strong className="text-ink">{correo.trim()}</strong> está registrado en el sistema, te llegará un correo con un link para elegir una contraseña nueva. Vale por 30 minutos.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-2 font-display text-[24px] font-bold text-ink">¿Olvidaste tu contraseña?</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-quiet">Ingresa tu correo corporativo y te enviamos un link para restablecerla.</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-ink-soft">Correo corporativo</span>
                <span className="relative block">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    type="email"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                    autoComplete="username"
                    placeholder="nombre@metrolinea1.pe"
                    className="h-12 w-full rounded-lg border border-line-strong bg-white pl-10 pr-3 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                  />
                </span>
              </label>
              {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                {loading ? "Enviando..." : "Enviar link de recuperación"}
              </button>
            </form>
          </>
        )}

        <Link to="/login" className="mt-8 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al inicio de sesión
        </Link>
      </div>
    </main>
  );
}
