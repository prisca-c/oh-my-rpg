import type { HttpContext } from '@adonisjs/core/http'

import { assert } from '#common/utils/assert'
import { createCharacterValidator } from '#infrastructure/validators/create_character_validator'
import Character from '#infrastructure/models/character'
import type { UserId } from '#infrastructure/models/user'

export default class CreateCharacterController {
  async handle({ request, response, auth }: HttpContext) {
    const { name } = request.all()
    assert(auth.user)
    const userId = auth.user.id

    const data = await createCharacterValidator({ name, userId })

    await Character.create({
      name: data.name,
      userId: data.userId as UserId,
    })

    response.redirect('/characters')
  }
}
