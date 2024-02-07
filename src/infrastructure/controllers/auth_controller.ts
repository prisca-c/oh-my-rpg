import User from '#models/user'
import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/create_user_validator'

export default class AuthController {
  async login({ auth, request, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    session.flash({
      errors: {
        email: 'Invalid credentials',
        password: 'Invalid credentials',
      },
    })

    const user = await User.verifyCredentials(email, password)

    user.lastSessionId = session.sessionId
    user.lastLoginAt = DateTime.now()
    await user.save()
    auth.use('web').login(user)

    response.redirect('/character')
  }

  async logout({ auth, response }: HttpContext) {
    auth.use('web').logout()
    return response.redirect('/')
  }

  async register({ request, response }: HttpContext) {
    const { email, password, username } = request.all()

    await Promise.all([
      createUserValidator({ email, password, username }),
      User.create({ email, password, username }),
    ])

    response.redirect('/login')
  }
}
