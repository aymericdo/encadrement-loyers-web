import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { resolve } from "path";
import { defineConfig } from "vite";

import tailwind from "tailwindcss";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600
  },
});
