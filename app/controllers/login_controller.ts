import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async index({ inertia }: HttpContext) {
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
