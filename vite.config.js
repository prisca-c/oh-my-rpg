import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['./src/domains/resources/app.tsx'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['./src/domains/resources/**/*.tsx'],
    }),
  ],
})
