import type { HttpContext } from '@adonisjs/core/http'

export const getErrorByField = (ctx: HttpContext, field: string) => {
  if (!ctx.session || !ctx.session.flashMessages) {
    return
  }
  return ctx.session.flashMessages.get('errors')?.[field]?.[0]
}
