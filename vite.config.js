import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
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
      reload: ['resources/views/edge/**/*.edge'],
    }),
    react(),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/resources/`,
    },
  },
})
