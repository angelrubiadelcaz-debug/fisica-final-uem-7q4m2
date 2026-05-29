import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const githubPagesBase = "/fisica-final-uem-7q4m2/";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS ? githubPagesBase : "/"),
});
