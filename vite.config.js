import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/vite'
import UnoCSS from '@unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'inertia/ssr.tsx',
      },
    }),
    adonisjs({
      entrypoints: ['inertia/app.tsx', 'src/frontend/app/app.css'],
      reload: ['resources/views/edge/**/*.edge'],
    }),
    react(),
  ],

  resolve: {
    alias: {
      '~/': `${import.meta.dirname}/src/frontend/`,
    },
  },
})
