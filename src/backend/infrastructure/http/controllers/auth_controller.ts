import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { createUserValidator } from '#validators/create_user_validator'

export default class AuthController {
  async login({ auth, request, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return response.redirect('/login')
    }

    user.lastSessionId = session.sessionId
    user.lastLoginAt = DateTime.now()
    await user.save()
    await auth.use('web').login(user)

    response.redirect('/characters')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }

  async register({ request, response }: HttpContext) {
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
