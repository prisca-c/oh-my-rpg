import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render(
      'public/register',
      {
        csrfToken: ctx.request.csrfToken,
      },
      {
        meta: {
          title: 'Register',
          description: 'Register for an account',
        },
      }
    )
  }
}
