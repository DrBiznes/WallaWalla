import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [
    // MDX plugin needs to run before React plugin
    { enforce: 'pre', ...mdx() },
    react({
      include: /\.(jsx|js|ts|tsx|mdx|md)$/
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});