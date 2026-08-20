import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/design-system/primitives/Modal";
import { Button } from "@/design-system/primitives/Button";
import { Field, Select } from "@/design-system/primitives/Input";
import { useUsersBasicos } from "@/features/users/hooks/useUsersBasicos";
import { useAsignarEvento } from "../hooks/useEventoActions";
import { nombreLugar, nombreTipo } from "../lib/tabla";
import { apiErrorMessage } from "@/lib/api";
import type { EventoListItem } from "../types";

/**
 * Asignar un evento de Monitoreo a alguien de Seguridad Operativa — no crea
 * ningún caso SOP acá, solo notifica a esa persona para que sea ella quien
 * arme el hallazgo desde su propio panel.
 */
export function AsignarEventoModal({ evento, onClose }: { evento: EventoListItem | null; onClose: () => void }) {
  const [idUsuario, setIdUsuario] = useState("");
  const { data: usuarios } = useUsersBasicos();
  const asignar = useAsignarEvento();

  const responsables = (usuarios ?? []).filter((u) => u.roles?.nombre_rol === "Seguridad Operativa");

  const cerrar = () => {
    setIdUsuario("");
    onClose();
  };

  const confirmar = () => {
    if (!evento || !idUsuario) return;
    asignar.mutate(
      { id_evento: evento.id_evento, id_usuario: Number(idUsuario) },
      {
        onSuccess: (resultado) => {
          toast.success(`Evento asignado a ${resultado.nombre}`);
          cerrar();
        },
        onError: (error) => toast.error(apiErrorMessage(error, "No se pudo asignar el evento")),
      }
    );
  };

  return (
    <Modal
      open={!!evento}
      onClose={cerrar}
      title="Asignar a Seguridad Operativa"
      subtitle="La persona elegida recibe una notificación para registrar el hallazgo correspondiente."
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={cerrar}>
            Cancelar
          </Button>
          <Button size="sm" onClick={confirmar} disabled={!idUsuario || asignar.isPending}>
            <ShieldAlert className="h-4 w-4" /> {asignar.isPending ? "Asignando…" : "Asignar"}
          </Button>
        </>
      }
    >
      {evento && (
        <div className="space-y-4">
          <div className="rounded-lg border border-line-soft bg-surface/45 px-3 py-2.5">
            <p className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-faint">Evento</p>
            <p className="mt-0.5 text-[13px] font-medium text-ink">
              {nombreTipo(evento)} · {nombreLugar(evento)}
            </p>
          </div>

          <Field label="Asignar a" required>
            <Select value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)}>
              <option value="">Seleccione una persona…</option>
              {responsables.map((u) => (
                <option key={u.id_usuario} value={u.id_usuario}>
                  {u.cargo ? `${u.nombre} · ${u.cargo}` : u.nombre}
                </option>
              ))}
            </Select>
            {responsables.length === 0 && (
              <p className="mt-1.5 text-[11.5px] text-ink-faint">No hay personal de Seguridad Operativa registrado.</p>
            )}
          </Field>
        </div>
      )}
    </Modal>
  );
}
