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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
          ],
          'vendor-icons': ['lucide-react'],
          'vendor-charts': ['recharts'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  plugins: [
    react(),
    // DISABLED: Prerender causes timeout in build
    // TODO: Implement ISR via vite-plugin-ssr or use SSR framework (Next.js)
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}});
