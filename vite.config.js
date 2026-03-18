import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Tu página principal
        dashboard: resolve(__dirname, "pages/client/dashboard/index.html"), // Tu página de dashboard
        panreserv: resolve(__dirname, "pantcondres/index.html"),
        // Si tienes más páginas (reportes, admin), agrégalas aquí abajo
      },
    },
  },
});
