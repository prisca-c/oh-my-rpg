import { HttpContext } from '@adonisjs/core/http'

export const getErrorByField = (field: string, ctx?: HttpContext) => {
  if (!ctx) {
    ctx = HttpContext.getOrFail()
  }

  if (!ctx.session || !ctx.session.flashMessages) {
    return
  }
  return ctx.session.flashMessages.get('errors')?.[field]?.[0]
}
