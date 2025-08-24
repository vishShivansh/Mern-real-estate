import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/


export default defineConfig({
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://mern-real-estate-a5fc.onrender.com", // Your backend URL
        // target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
