import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render(
      'public/register',
      {},
      {
        meta: {
          title: 'Register',
          description: 'Register for an account',
        },
      },
    )
  }
}
