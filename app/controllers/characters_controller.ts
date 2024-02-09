import type { HttpContext } from '@adonisjs/core/http'

import Character from '#models/character'
import { createCharacterValidator } from '#validators/create_character_validator'

export default class CharactersController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user
    await user?.load('characters')

    // return view.render('character', {
    //   characters: user?.characters,
    // })

    return inertia.render('characters_page', { data: { characters: user?.characters ?? [] } })
  }

  async store({ request, response, auth }: HttpContext) {
    const { name } = request.all()

    await createCharacterValidator({ name })

    const user = auth.user

    await Character.create({
      name,
      userId: user?.id,
    })

    response.redirect('/character')
  }
}
