import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Update the target URL to match the server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})