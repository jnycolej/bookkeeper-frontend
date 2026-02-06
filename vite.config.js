import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./src/features/library"), // or ./src/features
    },
  },
  server: {
    port: 3000,
    strictPort: true,

    proxy: {
      "/api": {
        target: "http://backend:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
