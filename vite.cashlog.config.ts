import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

/**
 * Build/dev do design system Cashlog.
 * Saída em public/embeds/cashlog/ds — não sobrescreve o protótipo do case.
 * CSS isolado via postcss.cashlog.config.js (não usa o Tailwind do portfólio).
 */
export default defineConfig({
  root: resolve(__dirname, "src/embeds/cashlog"),
  base: "/embeds/cashlog/ds/",
  publicDir: false,
  plugins: [react()],
  css: {
    postcss: resolve(__dirname, "postcss.cashlog.config.js"),
  },
  server: {
    port: 5174,
    strictPort: true,
    fs: {
      allow: [resolve(__dirname)],
    },
  },
  build: {
    outDir: resolve(__dirname, "public/embeds/cashlog/ds"),
    emptyOutDir: true,
  },
});
