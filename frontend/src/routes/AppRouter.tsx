import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "@/pages/Landing";
import { LoginPage } from "@/pages/Login";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { ReportanteHomePage } from "@/pages/reports/ReportanteHomePage";
import { NewReportPage } from "@/pages/reports/NewReportPage";
import { MyReportsPage } from "@/pages/reports/MyReportsPage";
import { NotificationsPage } from "@/pages/reports/NotificationsPage";
import { SoDashboardPage } from "@/pages/seguridad/DashboardPage";
import { SoCasosPage } from "@/pages/seguridad/CasosPage";
import { CaseDetailPage } from "@/pages/seguridad/CaseDetailPage";
import { JefeHome } from "@/pages/jefe/JefeHome";
import { PlanDetail } from "@/pages/jefe/PlanDetail";
import { JefeIndicadoresPage } from "@/pages/jefe/IndicadoresPage";
import { ReportExportPage } from "@/pages/seguridad/ReportExportPage";
import { SoKpisPage } from "@/pages/seguridad/reportes/KpisPage";
import { SoEstadisticasPage } from "@/pages/seguridad/reportes/EstadisticasPage";
import { SoNotificacionesPage } from "@/pages/seguridad/NotificacionesPage";
import { EventosAsignadosPage } from "@/pages/seguridad/EventosAsignadosPage";
import { SoAlertasPage } from "@/pages/seguridad/AlertasPage";
import { SoAuditoriaPage } from "@/pages/seguridad/AuditoriaPage";
import { SoEventosPage } from "@/pages/seguridad/EventosOperativosPage";
import { SoPlanesAccionPage } from "@/pages/seguridad/PlaceholderPages";
import { SoPerfilPage } from "@/pages/seguridad/PerfilPage";
import { JefePerfilPage } from "@/pages/jefe/PerfilPage";
import { Dashboard as MonitoreoDashboardPage } from "@/pages/monitoreo/Dashboard";
import { Registro as MonitoreoRegistroPage } from "@/pages/monitoreo/Registro";
import { Historial as MonitoreoHistorialPage } from "@/pages/monitoreo/Historial";
import { Reportes as MonitoreoReportesPage } from "@/pages/monitoreo/Reportes";
import { Detalle as MonitoreoDetallePage } from "@/pages/monitoreo/Detalle";
import { Editar as MonitoreoEditarPage } from "@/pages/monitoreo/Editar";
import { Perfil as MonitoreoPerfilPage } from "@/pages/monitoreo/Perfil";
import { AdminUsuariosPage } from "@/pages/admin/UsuariosPage";
import { AdminAreasPage } from "@/pages/admin/AreasPage";
import { AdminEstacionesPage } from "@/pages/admin/EstacionesPage";
import { AdminMaterialRodantePage } from "@/pages/admin/MaterialRodantePage";
import { AdminConfiguracionPage } from "@/pages/admin/PlaceholderPages";
import { AdminAuditoriaPage } from "@/pages/AuditoriaPage";
import { AdminPerfilPage } from "@/pages/admin/PerfilPage";
import { AdminImportacionPage } from "@/pages/admin/ImportacionPage";
import { ReportantePerfilPage } from "@/pages/reports/PerfilPage";
import { NotFoundPage } from "@/pages/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inicio" element={<Navigate to="/" replace />} />
        <Route path="/reportes" element={<ProtectedRoute roles={["Reportante"]}><ReportanteHomePage /></ProtectedRoute>} />
        {/* Pública, sin sesión: quien reporta llega desde un QR/URL, sin cuenta. */}
        <Route path="/reportes/nuevo" element={<NewReportPage />} />
        <Route path="/reportes/mis-reportes" element={<ProtectedRoute roles={["Reportante"]}><MyReportsPage /></ProtectedRoute>} />
        <Route path="/reportes/notificaciones" element={<ProtectedRoute roles={["Reportante"]}><NotificationsPage /></ProtectedRoute>} />
        <Route path="/reportes/perfil" element={<ProtectedRoute roles={["Reportante"]}><ReportantePerfilPage /></ProtectedRoute>} />

        {/* Portal de Seguridad Operativa (Analista SO) — sin login todavía */}
        <Route path="/seguridad" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoDashboardPage /></ProtectedRoute>} />
        <Route path="/seguridad/casos" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoCasosPage /></ProtectedRoute>} />
        <Route path="/seguridad/casos/:codigo" element={<ProtectedRoute roles={["Seguridad Operativa"]}><CaseDetailPage /></ProtectedRoute>} />
        <Route path="/seguridad/alertas" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoAlertasPage /></ProtectedRoute>} />
        <Route path="/seguridad/auditoria" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoAuditoriaPage /></ProtectedRoute>} />
        <Route path="/seguridad/planes-accion" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoPlanesAccionPage /></ProtectedRoute>} />
        <Route path="/seguridad/eventos" element={<ProtectedRoute roles={["Seguridad Operativa"]} requireResponsable><SoEventosPage /></ProtectedRoute>} />
        <Route path="/seguridad/reportes" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoKpisPage /></ProtectedRoute>} />
        <Route path="/seguridad/reportes/kpis" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoKpisPage /></ProtectedRoute>} />
        <Route path="/seguridad/reportes/estadisticas" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoEstadisticasPage /></ProtectedRoute>} />
        <Route path="/seguridad/reportes/exportar" element={<ProtectedRoute roles={["Seguridad Operativa"]}><ReportExportPage /></ProtectedRoute>} />
        <Route path="/seguridad/notificaciones" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoNotificacionesPage /></ProtectedRoute>} />
        <Route path="/seguridad/eventos-asignados" element={<ProtectedRoute roles={["Seguridad Operativa"]}><EventosAsignadosPage /></ProtectedRoute>} />
        <Route path="/seguridad/perfil" element={<ProtectedRoute roles={["Seguridad Operativa"]}><SoPerfilPage /></ProtectedRoute>} />

        {/* Portal Jefe de Área — sin login todavía; el área se elige a mano */}
        <Route path="/jefe" element={<ProtectedRoute roles={["Jefe de Área"]}><JefeHome /></ProtectedRoute>} />
        <Route path="/jefe/planes/:codigo" element={<ProtectedRoute roles={["Jefe de Área"]}><PlanDetail /></ProtectedRoute>} />
        <Route path="/jefe/indicadores" element={<ProtectedRoute roles={["Jefe de Área"]}><JefeIndicadoresPage /></ProtectedRoute>} />
        <Route path="/jefe/perfil" element={<ProtectedRoute roles={["Jefe de Área"]}><JefePerfilPage /></ProtectedRoute>} />

        {/* Panel de Monitoreo — en construcción, portado desde el prototipo */}
        <Route path="/monitoreo" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoDashboardPage /></ProtectedRoute>} />
        <Route path="/monitoreo/nuevo" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoRegistroPage /></ProtectedRoute>} />
        <Route path="/monitoreo/historial" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoHistorialPage /></ProtectedRoute>} />
        <Route path="/monitoreo/evento/:id" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoDetallePage /></ProtectedRoute>} />
        <Route path="/monitoreo/editar/:id" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoEditarPage /></ProtectedRoute>} />
        <Route path="/monitoreo/reportes" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoReportesPage /></ProtectedRoute>} />
        <Route path="/monitoreo/perfil" element={<ProtectedRoute roles={["Monitorista"]} allowResponsableRole="Seguridad Operativa"><MonitoreoPerfilPage /></ProtectedRoute>} />

        {/* Panel de Administrador — sin login todavía */}
        <Route path="/admin" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
        <Route path="/admin/usuarios" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
        <Route path="/admin/roles" element={<ProtectedRoute roles={["Admin"]}><AdminUsuariosPage /></ProtectedRoute>} />
        <Route path="/admin/catalogos" element={<ProtectedRoute roles={["Admin"]}><AdminAreasPage /></ProtectedRoute>} />
        <Route path="/admin/estaciones" element={<ProtectedRoute roles={["Admin"]}><AdminEstacionesPage /></ProtectedRoute>} />
        <Route path="/admin/material-rodante" element={<ProtectedRoute roles={["Admin"]}><AdminMaterialRodantePage /></ProtectedRoute>} />
        <Route path="/admin/importacion" element={<ProtectedRoute roles={["Admin"]}><AdminImportacionPage /></ProtectedRoute>} />
        <Route path="/admin/auditoria" element={<ProtectedRoute roles={["Admin"]}><AdminAuditoriaPage /></ProtectedRoute>} />
        <Route path="/admin/configuracion" element={<ProtectedRoute roles={["Admin"]}><AdminConfiguracionPage /></ProtectedRoute>} />
        <Route path="/admin/perfil" element={<ProtectedRoute roles={["Admin"]}><AdminPerfilPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
