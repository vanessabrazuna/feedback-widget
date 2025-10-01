import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["html-to-image"] // força Vite a otimizar
  }
})
