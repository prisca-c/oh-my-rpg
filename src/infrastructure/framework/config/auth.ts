import { defineConfig, providers } from '@adonisjs/auth'
import { Authenticators, InferAuthenticators, InferAuthEvents } from '@adonisjs/auth/types'
import env from '#start/env'
import { jwtGuard } from '#config/jwt_guard/jwt_helper'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

const userProvider = providers.lucid({
  model: () => import('#models/user'),
  uids: ['username'],
  connection: 'postgres',
})

const authConfig = defineConfig({
  default: 'web',
  guards: {
    jwt: jwtGuard({
      provider: userProvider,
      secret: env.get('JWT_SECRET'),
    }),
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
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
