import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "dotenv";

export function loadTestEnvironment() {
  let values;
  try {
    values = parse(readFileSync(fileURLToPath(new URL("../../.env.test", import.meta.url))));
  } catch {
    throw new Error("Falta backend/.env.test. Copia .env.test.example y configura la conexión local.");
  }
  const url = new URL(values.DATABASE_URL || "postgresql://localhost/invalid");
  if (!["postgres:", "postgresql:"].includes(url.protocol)
    || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    || url.pathname !== "/seguridad_operativa_test"
    || [...url.searchParams.keys()].some(key => key !== "schema")
    || (url.searchParams.has("schema") && url.searchParams.get("schema") !== "public")) {
    throw new Error("Pruebas bloqueadas: usa PostgreSQL local y la base seguridad_operativa_test, esquema public.");
  }
  if (!values.JWT_SECRET || values.JWT_SECRET.length < 32) {
    throw new Error("Configura JWT_SECRET de pruebas con al menos 32 caracteres.");
  }
  Object.assign(process.env, {
    DATABASE_URL: values.DATABASE_URL,
    JWT_SECRET: values.JWT_SECRET,
    JWT_EXPIRES_IN: "1h",
    NODE_ENV: "test",
    FRONTEND_URL: "http://localhost:5173",
    TRUST_PROXY_HOPS: "0",
    GOOGLE_CLIENT_ID: "",
    RESEND_API_KEY: "",
    SMTP_HOST: "",
    VAPID_PUBLIC_KEY: "",
    VAPID_PRIVATE_KEY: "",
  });
}
