import type { HttpContext } from '@adonisjs/core/http'

import { assert } from '#utils/assert'
import Character from '#models/character'
import { createCharacterValidator } from '#validators/create_character_validator'

export default class CharactersController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user
    await user?.load('characters')

    return inertia.render(
      'private/characters',
      { characters: user?.characters ?? [] },
      {
        meta: {
          title: 'Characters',
          description: 'List of your characters',
        },
      }
    )
  }

  async store({ request, response, auth }: HttpContext) {
    const { name } = request.all()
    assert(auth.user)
    const userId = auth.user.id

    const data = await createCharacterValidator({ name, userId })

    await Character.create({
      name: data.name,
      userId: data.userId,
    })

    response.redirect('/character')
  }
}
