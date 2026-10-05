import { mergeConfig } from "vitest/config";
import integration from "./vitest.integration.config";
import { coverageOptions } from "./vitest.coverage";

// The integration config loads and validates .env.test before any test imports.
// Each test file remains isolated: unit mocks cannot replace the real database
// used by the integration suite. Both suites contribute to one coverage map.
export default mergeConfig(integration, {
  test: {
    include: ["src/**/*.test.ts", "tests/integration/**/*.test.ts"],
    coverage: { ...coverageOptions, reportsDirectory: "./coverage/combined" },
  },
});
