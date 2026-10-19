import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../src/app.js";

describe("API real: errores seguros y orígenes locales", () => {
  it("un JSON inválido devuelve 400 sin reflejar el contenido recibido", async () => {
    const response = await request(app).post("/api/auth/login").set("Content-Type", "application/json")
      .send('QA-SECRET').expect(400);
    expect(response.body.success).toBe(false);
    expect(JSON.stringify(response.body)).not.toContain("QA-SECRET");
    expect(response.body.message).toMatch(/JSON|solicitud|formato/i);
  });
  it.each(["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173", "http://127.0.0.1:4173"])("admite el origen local de desarrollo %s", async origin => {
    const response = await request(app).options("/api/auth/login").set("Origin", origin).set("Access-Control-Request-Method", "POST").expect(204);
    expect(response.headers["access-control-allow-origin"]).toBe(origin);
  });
  it("no autoriza un origen de un tercero", async () => {
    const response = await request(app).options("/api/auth/login").set("Origin", "https://qa-untrusted.example.invalid")
      .set("Access-Control-Request-Method", "POST");
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
