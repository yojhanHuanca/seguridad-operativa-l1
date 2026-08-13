import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReportanteHomePage } from "@/pages/reports/ReportanteHomePage";
import { NewReportPage } from "@/pages/reports/NewReportPage";
import { MyReportsPage } from "@/pages/reports/MyReportsPage";
import { NotificationsPage } from "@/pages/reports/NotificationsPage";
import { SoDashboardPage } from "@/pages/seguridad/DashboardPage";
import { SoCasosPage } from "@/pages/seguridad/CasosPage";
import { CaseDetailPage } from "@/pages/seguridad/CaseDetailPage";
import { JefeHome } from "@/pages/jefe/JefeHome";
import { PlanDetail } from "@/pages/jefe/PlanDetail";
import { ReportExportPage } from "@/pages/seguridad/ReportExportPage";
import { SoDecisionesPage } from "@/pages/seguridad/DecisionesPage";
import { SoNotificacionesPage } from "@/pages/seguridad/NotificacionesPage";
import {
  SoAlertasPage,
  SoEventosPage,
  SoPerfilPage,
  SoPlanesAccionPage,
  SoReportesPage,
} from "@/pages/seguridad/PlaceholderPages";
import { Dashboard as MonitoreoDashboardPage } from "@/pages/monitoreo/Dashboard";
import { Registro as MonitoreoRegistroPage } from "@/pages/monitoreo/Registro";
import { Historial as MonitoreoHistorialPage } from "@/pages/monitoreo/Historial";
import { Reportes as MonitoreoReportesPage } from "@/pages/monitoreo/Reportes";
import { Detalle as MonitoreoDetallePage } from "@/pages/monitoreo/Detalle";
import { Editar as MonitoreoEditarPage } from "@/pages/monitoreo/Editar";
import { AdminUsuariosPage } from "@/pages/admin/UsuariosPage";
import { AdminAuditoriaPage, AdminCatalogosPage, AdminConfiguracionPage } from "@/pages/admin/PlaceholderPages";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sin login todavía — se redirige directo al portal del trabajador */}
        <Route path="/" element={<Navigate to="/reportes" replace />} />
        <Route path="/reportes" element={<ReportanteHomePage />} />
        <Route path="/reportes/nuevo" element={<NewReportPage />} />
        <Route path="/reportes/mis-reportes" element={<MyReportsPage />} />
        <Route path="/reportes/notificaciones" element={<NotificationsPage />} />

        {/* Portal de Seguridad Operativa (Analista SO) — sin login todavía */}
        <Route path="/seguridad" element={<SoDashboardPage />} />
        <Route path="/seguridad/casos" element={<SoCasosPage />} />
        <Route path="/seguridad/casos/:codigo" element={<CaseDetailPage />} />
        <Route path="/seguridad/decisiones" element={<SoDecisionesPage />} />
        <Route path="/seguridad/alertas" element={<SoAlertasPage />} />
        <Route path="/seguridad/planes-accion" element={<SoPlanesAccionPage />} />
        <Route path="/seguridad/eventos" element={<SoEventosPage />} />
        <Route path="/seguridad/reportes" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/kpis" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/estadisticas" element={<SoReportesPage />} />
        <Route path="/seguridad/reportes/exportar" element={<ReportExportPage />} />
        <Route path="/seguridad/notificaciones" element={<SoNotificacionesPage />} />
        <Route path="/seguridad/perfil" element={<SoPerfilPage />} />

        {/* Portal Jefe de Área — sin login todavía; el área se elige a mano */}
        <Route path="/jefe" element={<JefeHome />} />
        <Route path="/jefe/planes/:codigo" element={<PlanDetail />} />

        {/* Panel de Monitoreo — en construcción, portado desde el prototipo */}
        <Route path="/monitoreo" element={<MonitoreoDashboardPage />} />
        <Route path="/monitoreo/nuevo" element={<MonitoreoRegistroPage />} />
        <Route path="/monitoreo/historial" element={<MonitoreoHistorialPage />} />
        <Route path="/monitoreo/evento/:id" element={<MonitoreoDetallePage />} />
        <Route path="/monitoreo/editar/:id" element={<MonitoreoEditarPage />} />
        <Route path="/monitoreo/reportes" element={<MonitoreoReportesPage />} />

        {/* Panel de Administrador — sin login todavía */}
        <Route path="/admin" element={<AdminUsuariosPage />} />
        <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
        <Route path="/admin/catalogos" element={<AdminCatalogosPage />} />
        <Route path="/admin/auditoria" element={<AdminAuditoriaPage />} />
        <Route path="/admin/configuracion" element={<AdminConfiguracionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
