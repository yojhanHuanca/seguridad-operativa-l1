// Same denominator for unit, integration and combined coverage.
export const coverageOptions = {
  provider: "v8" as const,
  reporter: ["text", "html", "lcov", "json-summary"] as Array<"text" | "html" | "lcov" | "json-summary">,
  include: ["src/**/*.ts"],
  exclude: ["src/generated/**", "**/*.test.ts", "**/*.d.ts"],
};
