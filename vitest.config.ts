import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    env: {
      ...process.env,
      NODE_ENV: "test",
    },
  },
});
