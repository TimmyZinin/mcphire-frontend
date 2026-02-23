import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "production" &&
      prerender({
        routes: ["/", "/partners"],
        renderer: new PuppeteerRenderer({
          renderAfterDocumentEvent: "render-event",
          headless: true,
        }),
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html.trim();
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
