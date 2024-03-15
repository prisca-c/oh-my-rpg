import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'

export default defineConfig({
  plugins: [
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'resources/ssr.tsx',
      },
    }),
    adonisjs({
      entrypoints: ['resources/app.tsx', 'resources/css/app.css'],
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources'),
    },
  },
})
