import { ConfigProvider } from '@adonisjs/core/types'
import { GuardConfigProvider } from '@adonisjs/auth/types'
import { JwtGuard, JwtGuardOptions } from '#config/jwt_guard/auth_jwt'
import { UserProviderContract } from '@adonisjs/auth/types/core'
import { HttpContext } from '@adonisjs/core/http'

/**
 * Helper function to configure the JwtGuard
 */
export function jwtGuard<UserProvider extends UserProviderContract<unknown>>(
  config: JwtGuardOptions & {
    provider: ConfigProvider<UserProvider>
  }
): GuardConfigProvider<(ctx: HttpContext) => JwtGuard<UserProvider>> {
  return {
    async resolver(_, app) {
      const provider = await config.provider.resolver(app)
      return (ctx) => {
        return new JwtGuard(ctx, provider, config)
      }
    },
  }
}
