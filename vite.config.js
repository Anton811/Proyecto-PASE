import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Tu página principal
        dashboard: resolve(__dirname, "pages/client/dashboard/index.html"), // Tu página de dashboard,
        historial: resolve(__dirname, "pages/client/historial/index.html"),
        configuracion: resolve(__dirname, "pages/client/configuracion/index.html"),
        dashboardAdmin: resolve(__dirname, "pages/admin/dashboard/index.html"),
        reservaAdmin: resolve(__dirname, "pages/admin/reservas/index.html"),
        clientes: resolve(__dirname, "pages/admin/cliente/index.html"),
        configuracionAdmin: resolve(__dirname, "pages/admin/configuracion/index.html"),
        reserva: resolve(__dirname, "pages/client/reserva/index.html"),
        // Si tienes más páginas (reportes, admin), agrégalas aquí abajo
      },
    },
  },
});
