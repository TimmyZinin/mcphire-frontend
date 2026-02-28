import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import fs from "fs";

// Load knowledge routes from generated index
function getKnowledgeRoutes(): string[] {
  try {
    const indexPath = path.resolve(__dirname, "src/data/articles/_index.json");
    const data = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    const routes = ["/knowledge"];
    const categories = new Set<string>();

    for (const article of data) {
      categories.add(article.category);
      routes.push(`/knowledge/${article.category}/${article.slug}`);
    }

    for (const cat of Array.from(categories).sort()) {
      routes.splice(1, 0, `/knowledge/${cat}`);
    }

    return routes;
  } catch {
    return ["/knowledge"];
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGHPages = !!process.env.VITE_BASE_PATH;
  return {
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "production" && !isGHPages &&
      prerender({
        routes: ["/", "/partners", "/jobs", "/tools", "/tools/salary", "/tools/resume-checklist", "/tools/resume-review", "/employers", "/mcp", "/jobs/saved", "/privacy", ...getKnowledgeRoutes()],
        renderer: new PuppeteerRenderer({
          renderAfterDocumentEvent: "render-event",
          headless: true,
          timeout: 120000,
          maxConcurrentRoutes: 5,
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
}});
