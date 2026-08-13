import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, UserPlus, Users } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/features/users/hooks/useUsers";
import { UserFormModal } from "@/features/users/components/UserFormModal";
import type { UserListItem } from "@/features/users/types";

export function AdminUsuariosPage() {
  const { data: users, isLoading } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserListItem | null>(null);

  const abrirCrear = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const abrirEditar = (user: UserListItem) => {
    setEditing(user);
    setModalOpen(true);
  };

  return (
    <AdminShell>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-[19px] font-bold tracking-[-0.01em] text-ink">Usuarios y roles</h1>
          <p className="mt-0.5 text-[12px] text-ink-quiet">
            Cuentas de Seguridad Operativa, Jefe de Área y Monitorista, con su rol y área asignada. No hay auto-registro: solo el
            administrador crea cuentas nuevas.
          </p>
        </div>
        <Button size="sm" onClick={abrirCrear}>
          <UserPlus className="h-4 w-4" /> Nuevo usuario
        </Button>
      </div>

      {isLoading ? (
        <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando usuarios…</Card>
      ) : !users || users.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-10 text-center">
          <Users className="h-7 w-7 text-ink-faint" />
          <p className="text-[13px] font-semibold text-ink">Aún no hay usuarios registrados</p>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
          <Card className="mt-4 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-line bg-surface text-[10.5px] uppercase tracking-wide text-ink-quiet">
                    <th className="px-3.5 py-2.5 font-semibold">Código</th>
                    <th className="px-3.5 py-2.5 font-semibold">Nombre</th>
                    <th className="px-3.5 py-2.5 font-semibold">Correo</th>
                    <th className="px-3.5 py-2.5 font-semibold">Rol</th>
                    <th className="px-3.5 py-2.5 font-semibold">Área</th>
                    <th className="px-3.5 py-2.5 font-semibold">Estado</th>
                    <th className="px-3.5 py-2.5 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id_usuario} className="border-b border-line-soft last:border-0 hover:bg-surface">
                      <td className="px-3.5 py-2.5 font-mono text-[11.5px] text-ink-soft">{u.codigo_usuario}</td>
                      <td className="px-3.5 py-2.5 font-medium text-ink">{u.nombre}</td>
                      <td className="px-3.5 py-2.5 text-ink-soft">{u.correo}</td>
                      <td className="px-3.5 py-2.5 text-ink-soft">{u.roles?.nombre_rol ?? "—"}</td>
                      <td className="px-3.5 py-2.5 text-ink-soft">{u.areas?.nombre_area ?? "—"}</td>
                      <td className="px-3.5 py-2.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-[3px] text-[10.5px] font-medium text-brand-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                          {u.estado ?? "Activo"}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => abrirEditar(u)}
                          className="grid h-7 w-7 place-items-center rounded-lg text-ink-quiet transition-colors hover:bg-surface-2 hover:text-ink"
                          aria-label={`Editar ${u.nombre}`}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} user={editing} />
    </AdminShell>
  );
}
