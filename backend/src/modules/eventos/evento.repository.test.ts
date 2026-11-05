import { beforeEach, describe, expect, it, vi } from "vitest";

const updateMock = vi.fn();
vi.mock("../../lib/prisma.js", () => ({
  default: {
    eventos_monitoreo: { update: updateMock },
    catalogo_detalle: { findFirst: vi.fn() },
  },
}));
vi.mock("../configuracion/configuracion.service.js", () => ({
  ConfiguracionService: { nextCodigoEvento: vi.fn() },
}));

const { EventoRepository } = await import("./evento.repository.js");

describe("EventoRepository.update", () => {
  beforeEach(() => updateMock.mockReset().mockResolvedValue({ id_evento: 5811 }));

  it("preserva los datos del evento al cambiar solamente su estado", async () => {
    await EventoRepository.update(5811, { estado: "En investigación" });

    expect(updateMock).toHaveBeenCalledWith({
      where: { id_evento: 5811 },
      data: { estado: "En investigación" },
    });
  });

  it("actualiza campos parciales sin borrar los que fueron omitidos", async () => {
    await EventoRepository.update(5811, { descripcion: "Descripción corregida" });

    expect(updateMock).toHaveBeenCalledWith({
      where: { id_evento: 5811 },
      data: { descripcion: "Descripción corregida" },
    });
  });
});
