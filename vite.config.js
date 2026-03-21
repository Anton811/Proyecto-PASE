import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Tu página principal
        dashboard: resolve(__dirname, "pages/client/dashboard/index.html"), // Tu página de dashboard
<<<<<<< HEAD
        panreserv: resolve(__dirname, "pantcondres/index.html"),
=======
        reserva: resolve(__dirname, "pages/client/reserva/index.html"), //pagina para crear una reserva
        reserva_confirmacion: resolve(
          __dirname,
          "pages/client/reserva/confirmacion/index.html",
        ),
>>>>>>> ftorresr
        // Si tienes más páginas (reportes, admin), agrégalas aquí abajo
      },
    },
  },
});
