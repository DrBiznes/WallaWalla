import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// This async import is necessary because @mdx-js/rollup is ESM-only
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup')
  
  return {
    plugins: [
      // MDX plugin needs to run before React plugin
      { enforce: 'pre', ...mdx.default() },
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
  }
})