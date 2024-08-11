import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    proxy: {
      "/": {
        target: "https://mern-real-estate-tkho.onrender.com/",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist", // This should match the Output Directory setting in Vercel
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [react()],
});
