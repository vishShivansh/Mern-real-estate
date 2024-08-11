import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  // build: {
  //   outDir: "dist", // This should match the Output Directory setting in Vercel
  //   rollupOptions: {
  //     input: {
  //       main: "./index.html",
  //     },
  //   },
  // },
  plugins: [react()],
});
