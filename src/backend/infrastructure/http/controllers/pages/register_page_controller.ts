import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterPageController {
  async handle(ctx: HttpContext) {
    return ctx.inertia.render(
      'public/register_page',
      {},
      {
        meta: {
          title: 'Register',
          description: 'Register for an account',
        },
      }
    )
  }
}
