import { useState, type FormEvent } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck, XCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { api, apiErrorMessage } from "@/lib/api";
import { nombreSistema, useConfiguracionPublica } from "@/features/configuracion/hooks/useConfiguracion";

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
  const { data: identidad } = useConfiguracionPublica();
  const systemName = nombreSistema(identidad);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setDone(true);
      window.setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "No se pudo restablecer la contraseña."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[#0c0c0c] px-5 py-10">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-6"><Logo size={40} withWordmark={false} /></div>

        {!token ? (
          <>
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600"><XCircle className="h-5 w-5" /></div>
            <h2 className="mt-6 font-display text-[24px] font-bold text-ink">Link inválido</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-quiet">Este link no trae la información necesaria. Pide uno nuevo desde "¿Olvidaste tu contraseña?".</p>
            <Link to="/forgot-password" className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-brand-700 text-[13.5px] font-semibold text-white shadow-sm transition hover:bg-brand-800">
              Pedir un link nuevo
            </Link>
          </>
        ) : done ? (
          <>
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700"><CheckCircle2 className="h-5 w-5" /></div>
            <h2 className="mt-6 font-display text-[24px] font-bold text-ink">Contraseña actualizada</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-quiet">Ya puedes iniciar sesión con tu contraseña nueva. Te llevamos al login...</p>
          </>
        ) : (
          <>
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700"><ShieldCheck className="h-5 w-5" /></div>
            <p className="mt-6 text-[11px] font-semibold uppercase text-brand-700">{systemName}</p>
            <h2 className="mt-2 font-display text-[24px] font-bold text-ink">Elige tu nueva contraseña</h2>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-ink-soft">Contraseña nueva</span>
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
                    className="h-12 w-full rounded-lg border border-line-strong bg-white pl-10 pr-11 text-[13.5px] text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-ink-faint hover:bg-surface hover:text-ink" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-ink-soft">Confirmar contraseña</span>
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
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
                {loading ? "Guardando..." : "Guardar contraseña nueva"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
