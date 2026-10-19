import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../config/env.js", () => ({ env: { JWT_SECRET: "qa-public-report-test-secret" } }));
vi.mock("../../generated/prisma/client.js", async () => ({ Prisma: await import("@prisma/client/runtime/library") }));
vi.mock("./report.service.js", () => ({ ReportService: {
  createReport: vi.fn(), getByCodigo: vi.fn(), responderInfoPublico: vi.fn(),
} }));
vi.mock("../auditoria/auditoria.service.js", () => ({ AuditoriaService: { registrar: vi.fn() } }));
import { ReportController } from "./report.controller.js";
import { ReportService } from "./report.service.js";

const app = express();
app.use(express.json());
app.post("/api/reports", ReportController.create);
app.get("/api/reports/consulta/:codigo", ReportController.getByCodigo);
app.post("/api/reports/consulta/:codigo/responder-info", ReportController.responderInfo);

describe("HTTP público: cookie del navegador, sin sesión ni cuenta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    let sequence = 0;
    vi.mocked(ReportService.createReport).mockImplementation(async () => ({
      caso: { id_caso: ++sequence, codigo_sop: `SOP-${sequence}` }, evento: { id_evento: sequence },
    }) as Awaited<ReturnType<typeof ReportService.createReport>>);
    vi.mocked(ReportService.getByCodigo).mockResolvedValue({ codigo_sop: "SOP-1" } as Awaited<ReturnType<typeof ReportService.getByCodigo>>);
    vi.mocked(ReportService.responderInfoPublico).mockResolvedValue({} as Awaited<ReturnType<typeof ReportService.responderInfoPublico>>);
  });
  it("crear dos reportes conserva la consulta de ambos sin login", async () => {
    const browser = request.agent(app);
    await browser.post("/api/reports").send({}).expect(201);
    await browser.post("/api/reports").send({}).expect(201);
    await browser.get("/api/reports/consulta/SOP-1").expect(200);
    await browser.get("/api/reports/consulta/SOP-2").expect(200);
    await browser.post("/api/reports/consulta/SOP-1/responder-info").send({}).expect(200);
  });
  it("otro navegador no puede consultar ni responder con el código conocido", async () => {
    const owner = request.agent(app);
    const other = request.agent(app);
    await owner.post("/api/reports").send({}).expect(201);
    await other.post("/api/reports").send({}).expect(201);
    await other.get("/api/reports/consulta/SOP-1").expect(403);
    await other.post("/api/reports/consulta/SOP-1/responder-info").send({}).expect(403);
    await request(app).get("/api/reports/consulta/SOP-1").expect(403);
    expect(ReportService.getByCodigo).not.toHaveBeenCalled();
    expect(ReportService.responderInfoPublico).not.toHaveBeenCalled();
  });
});
