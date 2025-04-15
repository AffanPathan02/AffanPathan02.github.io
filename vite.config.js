import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:
    process.env.NODE_ENV === "production" &&
    process.env.DEPLOY_TARGET === "gh-pages"
      ? "/AffanPathan02.github.io/"
      : "/",
});
