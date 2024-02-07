import Character from '#models/character'
import { HttpContext } from '@adonisjs/core/http'
import { createCharacterValidator } from '#validators/create_character_validator'
import { CharactersPage } from '#domain/resources/pages/characters_page'

export default class CharactersController {
  async index({ auth, jsx }: HttpContext) {
    const user = auth.user
    await user?.load('characters')

    // return view.render('character', {
    //   characters: user?.characters,
    // })

    return jsx(CharactersPage, { data: { characters: user?.characters ?? [] } })
  }

  async store({ request, response, auth }: HttpContext) {
    const { name } = request.all()

    await createCharacterValidator({ name })

    const user = auth.user

    await Character.create({
      name: name,
      userId: user?.id,
    })

    response.redirect('/character')
  }
}
