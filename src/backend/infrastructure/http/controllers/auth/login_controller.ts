import type { HttpContext } from '@adonisjs/core/http'

import User from '#infrastructure/models/user'
import { DateTime } from 'luxon'

export default class LoginController {
  async handle({ auth, request, response, session }: HttpContext) {
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
}
