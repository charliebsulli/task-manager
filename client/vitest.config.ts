import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    passWithNoTests: true,
    globals: true,
    environment: "jsdom",
    env: {
      NEXT_PUBLIC_API_URL: "http://localhost:8080",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
