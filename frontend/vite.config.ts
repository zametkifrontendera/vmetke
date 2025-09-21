import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase"
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://vmetke.ru/api',
        changeOrigin: true
      }
    }
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})