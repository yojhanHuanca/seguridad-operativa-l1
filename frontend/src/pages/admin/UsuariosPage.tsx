import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, KeyRound, Pencil, Search, ShieldCheck, UserCog, UserPlus, Users, UserX } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/design-system/primitives/Button";
import { Input, Select } from "@/design-system/primitives/Input";
import { Card } from "@/components/ui/card";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useRoles } from "@/features/users/hooks/useRoles";
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { cn } from "@/lib/utils";
import type { UserListItem } from "@/features/users/types";

function estadoActivo(estado: string | null) {
  return (estado ?? "Activo").toLowerCase() === "activo";
}

function SummaryCard({ label, value, icon: Icon, tone = "green" }: { label: string; value: number; icon: typeof Users; tone?: "green" | "blue" | "gray" }) {
  const tones = {
    green: "bg-brand-50 text-brand-700",
    blue: "bg-blue-50 text-blue-700",
    gray: "bg-surface-2 text-ink-soft",
  };

  return (
    <Card className="flex min-h-[92px] flex-row items-center gap-3 p-4">
      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[24px] font-bold leading-none text-ink">{value}</p>
        <p className="mt-1.5 text-[11.5px] text-ink-quiet">{label}</p>
      </div>
    </Card>
  );
}

export function AdminUsuariosPage() {
  const location = useLocation();
  const rolesView = location.pathname === "/admin/roles";
  const { data: users = [], isLoading } = useUsers();
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserListItem | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredUsers = useMemo(() => {
    const term = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesTerm = !term || [user.codigo_usuario, user.nombre, user.correo, user.areas?.nombre_area]
        .some((value) => value?.toLowerCase().includes(term));
      const matchesRole = roleFilter === "todos" || String(user.id_rol) === roleFilter;
      const matchesStatus = statusFilter === "todos" || (statusFilter === "activo" ? estadoActivo(user.estado) : !estadoActivo(user.estado));
      return matchesTerm && matchesRole && matchesStatus;
    });
  }, [query, roleFilter, statusFilter, users]);

  const abrirCrear = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const abrirEditar = (user: UserListItem) => {
    setEditing(user);
    setModalOpen(true);
  };

  const activeUsers = users.filter((user) => estadoActivo(user.estado)).length;
  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[20px] font-bold text-ink">{rolesView ? "Roles y accesos" : "Gestión de usuarios"}</h1>
          <p className="mt-1 text-[12.5px] text-ink-quiet">
            {rolesView ? "Consulta los perfiles disponibles y las cuentas asignadas a cada uno." : `${users.length} usuarios registrados · ${activeUsers} activos`}
          </p>
        </div>
        {!rolesView && (
          <Button size="sm" onClick={abrirCrear}>
            <UserPlus className="h-4 w-4" /> Nuevo usuario
          </Button>
        )}
      </div>

      {rolesView ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard label="Roles configurados" value={roles.length} icon={ShieldCheck} />
            <SummaryCard label="Usuarios con rol" value={users.filter((user) => user.id_rol).length} icon={UserCog} tone="blue" />
            <SummaryCard label="Usuarios sin rol" value={users.filter((user) => !user.id_rol).length} icon={Users} tone="gray" />
          </div>

          <Card className="mt-4 overflow-hidden p-0">
            <div className="border-b border-line px-4 py-3">
              <p className="text-[13px] font-semibold text-ink">Perfiles del sistema</p>
              <p className="mt-0.5 text-[11.5px] text-ink-quiet">Los roles se asignan al crear o editar un usuario.</p>
            </div>
            {rolesLoading ? (
              <p className="p-8 text-center text-[13px] text-ink-quiet">Cargando roles...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12.5px]">
                  <thead><tr className="border-b border-line bg-surface text-[10.5px] uppercase text-ink-quiet"><th className="px-4 py-2.5 font-semibold">Rol</th><th className="px-4 py-2.5 font-semibold">Usuarios asignados</th><th className="px-4 py-2.5 font-semibold">Estado</th></tr></thead>
                  <tbody>{roles.map((role) => {
                    const assigned = users.filter((user) => user.id_rol === role.id_rol).length;
                    return <tr key={role.id_rol} className="border-b border-line-soft last:border-0"><td className="px-4 py-3 font-medium text-ink">{role.nombre_rol}</td><td className="px-4 py-3 text-ink-soft">{assigned} {assigned === 1 ? "usuario" : "usuarios"}</td><td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-brand-800"><CheckCircle2 className="h-3.5 w-3.5" /> Disponible</span></td></tr>;
                  })}</tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[minmax(260px,1fr)_minmax(190px,1fr)_minmax(170px,1fr)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar usuario" className="pl-9" />
            </div>
            <Select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filtrar por rol">
              <option value="todos">Todos los roles</option>
              {roles.map((role) => <option key={role.id_rol} value={role.id_rol}>{role.nombre_rol}</option>)}
            </Select>
            <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filtrar por estado">
              <option value="todos">Todos los estados</option><option value="activo">Activos</option><option value="inactivo">Inactivos</option>
            </Select>
          </div>

          {isLoading ? (
            <Card className="mt-4 p-8 text-center text-[13px] text-ink-quiet">Cargando usuarios...</Card>
          ) : filteredUsers.length === 0 ? (
            <Card className="mt-4 flex flex-col items-center gap-2 border-dashed p-9 text-center"><Users className="h-7 w-7 text-ink-faint" /><p className="text-[13px] font-semibold text-ink">No se encontraron usuarios</p><p className="text-[11.5px] text-ink-quiet">Prueba con otros filtros o registra una cuenta nueva.</p></Card>
          ) : (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="mt-4 overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-[1060px] w-full text-left text-[12.5px]">
                    <thead><tr className="border-b border-line bg-surface text-[11px] text-ink-quiet"><th className="px-4 py-3 font-semibold">Código</th><th className="px-4 py-3 font-semibold">Nombre</th><th className="px-4 py-3 font-semibold">Teléfono</th><th className="px-4 py-3 font-semibold">Área</th><th className="px-4 py-3 font-semibold">Cargo</th><th className="px-4 py-3 font-semibold">Rol</th><th className="px-4 py-3 font-semibold">Estado</th><th className="px-4 py-3 text-right font-semibold">Acciones</th></tr></thead>
                    <tbody>{filteredUsers.map((user) => {
                      const initials = user.nombre.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
                      return <tr key={user.id_usuario} className="border-b border-line-soft last:border-0 hover:bg-surface"><td className="px-4 py-3 font-mono text-[10.5px] text-ink-soft">{user.codigo_usuario}</td><td className="px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-[10.5px] font-semibold text-brand-800">{initials}</span><div><p className="font-medium text-ink">{user.nombre}</p><p className="mt-0.5 text-[10.5px] text-ink-faint">{user.correo}</p></div></div></td><td className="px-4 py-3 text-ink-soft">{user.telefono || "—"}</td><td className="px-4 py-3 text-ink-soft">{user.areas?.nombre_area ?? "—"}</td><td className="px-4 py-3 text-ink-soft">{user.cargo || "—"}</td><td className="px-4 py-3"><span className={cn("inline-flex rounded-md px-2 py-1 text-[10.5px] font-medium", user.roles?.nombre_rol?.toLowerCase().includes("admin") ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-800")}>{user.roles?.nombre_rol ?? "Sin asignar"}</span></td><td className="px-4 py-3"><span className={cn("inline-flex items-center rounded-md px-2 py-1 text-[10.5px] font-medium", estadoActivo(user.estado) ? "bg-brand-50 text-brand-800" : "bg-surface-2 text-ink-quiet")}>{user.estado ?? "Activo"}</span></td><td className="px-4 py-3"><div className="flex justify-end gap-1"><button type="button" onClick={() => abrirEditar(user)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-quiet hover:bg-surface-2 hover:text-brand-700" aria-label={`Editar ${user.nombre}`} title="Editar usuario"><Pencil className="h-3.5 w-3.5" /></button><button type="button" onClick={() => abrirEditar(user)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-quiet hover:bg-surface-2 hover:text-brand-700" aria-label={`Gestionar acceso de ${user.nombre}`} title="Gestionar acceso"><KeyRound className="h-3.5 w-3.5" /></button><button type="button" onClick={() => abrirEditar(user)} className="grid h-8 w-8 place-items-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700" aria-label={`Cambiar estado de ${user.nombre}`} title="Cambiar estado"><UserX className="h-3.5 w-3.5" /></button></div></td></tr>;
                    })}</tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
        </>
      )}

      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} user={editing} />
    </AdminShell>
  );
}
