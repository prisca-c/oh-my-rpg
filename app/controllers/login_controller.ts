import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async index({ inertia, request }: HttpContext) {
    return inertia.render(
      'public/login',
      { csrfToken: request.csrfToken },
      {
        meta: {
          title: 'Login',
          description: 'Login to your account',
        },
      }
    )
  }
}
