import { defineConfig } from "cypress";

export default defineConfig({
  env: {},
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {},
  },
});
