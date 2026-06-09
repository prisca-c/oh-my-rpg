import { defineConfig, drivers } from '@adonisjs/core/encryption'

import env from '#core/start/env'

export default defineConfig({
  default: 'legacy',
  list: {
    legacy: drivers.legacy({
      keys: [env.get('APP_KEY')],
    }),
  },
})
