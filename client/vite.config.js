import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://mern-real-estate-tkho.onrender.com", // Your backend URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
