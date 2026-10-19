import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../../lib/prisma.js", () => ({ default: {} }));
vi.mock("./report.repository.js", () => ({ ReportRepository: {
  findCatalogoDetalleById: vi.fn(), createFullReport: vi.fn(), findAll: vi.fn(),
  findAllByCreator: vi.fn(), findPublicByCodigo: vi.fn(), findByCodigo: vi.fn(), agregarEvidencias: vi.fn(),
} }));
vi.mock("../cases/case.repository.js", () => ({ CaseRepository: { respondInfo: vi.fn() } }));
import { ReportService } from "./report.service.js";
import { ReportRepository as repo } from "./report.repository.js";
import { CaseRepository } from "../cases/case.repository.js";
import type { Actor } from "../../utils/actor.js";
const actor: Actor = { id_usuario: 42, correo: "test@example.invalid", rol: 1, rol_nombre: "Reportante" };
const body = { id_tipo: 1, id_lugar: 2, descripcion: "Condición insegura en la estación", modalidad: "anonimo" };
beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(repo.findCatalogoDetalleById).mockImplementation(async id => ({ nombre: "Opción", catalogos: { nombre: id === 1 ? "Tipo de Reporte" : id === 2 ? "Lugar de Incidente" : "Lugar Específico" } }) as never);
});
describe("reportes: validación y privacidad", () => {
  it.each([
    { descripcion: "corto" }, { descripcion: "x".repeat(501) }, { id_tipo: -1 },
    { id_lugar: 0 }, { modalidad: "identificado" }, { correo_reportante: "incorrecto" },
    { telefono_reportante: "abcdefg" }, { modalidad: "desconocida" },
  ])("rechaza datos inválidos sin escribir: %j", async invalid => {
    await expect(ReportService.createReport({ ...body, ...invalid }, [], actor)).rejects.toThrow();
    expect(repo.createFullReport).not.toHaveBeenCalled();
  });
  it.each([undefined, actor, { ...actor, rol_nombre: "Monitorista" }])("impide suplantar el panel de Seguridad Operativa", async user => {
    await expect(ReportService.createReport({ ...body, origen: "seguridad_operativa" }, [], user)).rejects.toThrow(/Seguridad Operativa/);
    expect(repo.createFullReport).not.toHaveBeenCalled();
  });
  it("impide vincular monitoreo desde un reporte público", async () => {
    await expect(ReportService.createReport({ ...body, id_evento_monitoreo: 99 }, [], actor)).rejects.toThrow(/monitoreo/);
    expect(repo.createFullReport).not.toHaveBeenCalled();
  });
  it("rechaza un catálogo inexistente", async () => {
    vi.mocked(repo.findCatalogoDetalleById).mockResolvedValue(null);
    await expect(ReportService.createReport(body, [])).rejects.toThrow(/no existe/);
    expect(repo.createFullReport).not.toHaveBeenCalled();
  });
  it("rechaza opciones de otro catálogo", async () => {
    await expect(ReportService.createReport({ ...body, id_lugar: 1 }, [])).rejects.toThrow(/no pertenece/);
    expect(repo.createFullReport).not.toHaveBeenCalled();
  });
  it("conserva la identidad de sesión y normaliza el correo vacío", async () => {
    await ReportService.createReport({ ...body, modalidad: "identificado", nombre_reportante: " Ana ", correo_reportante: "", id_lugar_especifico: 3 }, [], actor);
    expect(repo.createFullReport).toHaveBeenCalledWith(expect.objectContaining({ nombre_reportante: "Ana", correo_reportante: null }), [], 42);
  });
  it("restringe el listado al reportante autenticado", async () => {
    await ReportService.listReports(actor, { filter: "cerrados", search: "SOP" });
    expect(repo.findAllByCreator).toHaveBeenCalledWith(42, { filter: "cerrados", search: "SOP" });
    expect(repo.findAll).not.toHaveBeenCalled();
  });
  it("no permite abrir el reporte de otra persona", async () => {
    vi.mocked(repo.findByCodigo).mockResolvedValue({ created_by: 50 } as never);
    await expect(ReportService.getByCodigo("SOP", actor)).rejects.toThrow(/no existe/);
  });
  it("consulta pública usa la proyección sin datos personales", async () => {
    vi.mocked(repo.findPublicByCodigo).mockResolvedValue({ codigo_sop: "SOP" } as never);
    expect(await ReportService.getByCodigo("SOP")).toEqual({ codigo_sop: "SOP" });
    expect(repo.findByCodigo).not.toHaveBeenCalled();
  });
  it.each([{ solicitudes: [] }, { solicitudes: [{ id_solicitud: 8, respondida: true }] }, { solicitudes: [{ id_solicitud: 9, respondida: false }] }])("rechaza respuestas duplicadas o solicitudes ajenas", async ({ solicitudes }) => {
    vi.mocked(repo.findPublicByCodigo).mockResolvedValue({ id_caso: 7, solicitudes_informacion: solicitudes } as never);
    await expect(ReportService.responderInfoPublico("SOP", { id_solicitud: 8, respuesta: "Información adicional" }, [])).rejects.toThrow(/solicitud/);
    expect(CaseRepository.respondInfo).not.toHaveBeenCalled();
  });
  it("responde únicamente la solicitud pendiente del caso consultado", async () => {
    vi.mocked(repo.findPublicByCodigo).mockResolvedValue({ id_caso: 7, solicitudes_informacion: [{ id_solicitud: 8, respondida: false }] } as never);
    await ReportService.responderInfoPublico("SOP", { id_solicitud: 8, respuesta: " Información adicional " }, []);
    expect(CaseRepository.respondInfo).toHaveBeenCalledWith(7, 8, { respuesta: "Información adicional" });
  });
});
