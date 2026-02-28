import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        contacto: resolve(__dirname, "contacto.html"),
        galeria: resolve(__dirname, "galeria.html"),
        sol: resolve(__dirname, "sol.html"),
      },
    },
  },
});