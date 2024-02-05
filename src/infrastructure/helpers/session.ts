import type { HttpContext } from '@adonisjs/core/http'

export const getErrorByField = (ctx: HttpContext, field: string) => {
  return ctx.session.flashMessages.get('errors')?.[field]?.[0]
}
