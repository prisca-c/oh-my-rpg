import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'src/frontend/app/ssr.tsx',
      },
    }),
    adonisjs({
      entrypoints: ['src/frontend/app/app.tsx', 'src/frontend/app/app.css'],
      reload: ['resources/views/edge/**/*.edge'],
    }),
    react(),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/src/frontend/`,
    },
  },
})
