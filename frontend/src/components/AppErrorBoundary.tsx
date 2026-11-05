import { Component, type ReactNode } from "react";
import { Button } from "@/design-system/primitives/Button";

/** A failed route/chunk must offer recovery, never leave a blank screen. */
export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main data-testid="app-recovery" className="grid min-h-screen place-items-center bg-surface p-6">
        <section role="alert" className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h1 className="font-display text-xl font-semibold text-ink">No pudimos cargar esta pantalla</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">Puede haber una actualización de la web o un fallo de conexión. Recarga la página para intentarlo de nuevo.</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-quiet">Si estabas guardando información, comprueba si se registró antes de enviarla otra vez. Los cambios sin guardar pueden perderse al recargar.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button onClick={() => window.location.reload()}>Recargar página</Button>
            <a href="/" className="text-sm font-medium text-brand-800 underline underline-offset-4">Volver al inicio</a>
          </div>
          <p className="mt-5 text-xs text-ink-quiet">Si el problema continúa, avisa al administrador indicando la pantalla y la hora del fallo.</p>
        </section>
      </main>
    );
  }
}
