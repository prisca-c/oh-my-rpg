import { defineConfig, providers } from '@adonisjs/auth'
import { Authenticators, InferAuthenticators, InferAuthEvents } from '@adonisjs/auth/types'
import env from '#start/env'
import { jwtGuard } from '#config/jwt_guard/jwt_helper'

const userProvider = providers.lucid({
  model: () => import('#models/user'),
  uids: ['username'],
  connection: 'postgres',
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: jwtGuard({
      provider: userProvider,
      secret: env.get('JWT_SECRET'),
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
