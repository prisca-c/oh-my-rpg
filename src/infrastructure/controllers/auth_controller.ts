import User from '#models/user'
import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/create_user_validator'

export default class AuthController {
  async login({ auth, request, response, session }: HttpContext) {
    const { username, password } = request.all()

    session.flash({
      errors: {
        username: 'Invalid username or password',
        password: 'Invalid username or password',
      },
    })

    await auth.use('jwt').attempt(username, password)

    const user = await User.findByOrFail('username', username)

    user.lastSessionId = session.sessionId
    user.lastLoginAt = DateTime.now()
    await user.save()

    response.redirect('/character')
  }

  async logout({ auth, response }: HttpContext) {
    auth.use('jwt')
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

  async auth0Callback({ response }: HttpContext) {
    return response.json({ message: 'auth0Callback' })
  }
}
