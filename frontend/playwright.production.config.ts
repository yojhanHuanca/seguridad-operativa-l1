import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

// The same bundle served after deployment, without depending on a dev server.
export default defineConfig({
  ...base,
  testDir: "./e2e",
  workers: 1,
  timeout: 60_000,
  use: { ...base.use, baseURL: "http://127.0.0.1:4177" },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4177 --strictPort",
    url: "http://127.0.0.1:4177",
    reuseExistingServer: false,
  },
});
