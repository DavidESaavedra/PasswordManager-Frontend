import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,  // to change the port from default
    proxy: {
      "/api": {
        // target: "http://localhost:5000/",
        target: "https://passwordmanager-backend.onrender.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // testing external endpoints
      "/posts": {
        target: "http://jsonplaceholder.typicode.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/posts/, "posts"),
      },
    },
  },
});
