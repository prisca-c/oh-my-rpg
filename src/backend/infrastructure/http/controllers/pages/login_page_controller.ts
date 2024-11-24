import type { HttpContext } from '@adonisjs/core/http'

export default class LoginPageController {
  async handler({ inertia }: HttpContext) {
    return inertia.render(
      'public/login',
      {},
      {
        meta: {
          title: 'Login',
          description: 'Login to your account',
        },
      }
    )
  }
}
