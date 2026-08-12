import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-crossorigin',
      transformIndexHtml(html) {
        return html.replace(/crossorigin/g, '');
      }
    }
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    modulePreload: false, // Resolve iOS Safari loading freezes / modulepreload bugs
  }
})
