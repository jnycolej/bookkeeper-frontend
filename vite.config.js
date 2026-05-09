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
        target: "http://backend:5050",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    preview: {
      host: "0.0.0.0",
      port: process.env.PORT || 3000,
      allowedHosts: ["bookkeeperapp-frontend-21bdde81eaa9.herokuapp.com"],
    },
  },
});
