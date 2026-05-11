import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/student-task-dashboard/",
  test: {
    environment: "jsdom",
    globals: true,
  },
});