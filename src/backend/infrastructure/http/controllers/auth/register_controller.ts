import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#infrastructure/validators/create_user_validator'
import User from '#infrastructure/models/user'

export default class RegisterController {
  async handle({ request, response }: HttpContext) {
    const { email, password, username } = request.all()

    const data = await createUserValidator({ email, password, username })
    await User.create({
      email: data.email,
      password: data.password,
      username: data.username,
    })

    response.redirect('/login')
  }
}
