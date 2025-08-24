import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default defineConfig({
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL, // Your backend URL
        // target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
