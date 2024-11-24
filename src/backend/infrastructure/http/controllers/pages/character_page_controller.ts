import type { HttpContext } from '@adonisjs/core/http'
import Character from '#infrastructure/models/character'
import { InventoryDTO } from '#application/dto/inventory_dto'

export default class CharacterPageController {
  async handle({ auth, inertia, params, session }: HttpContext) {
    const user = auth.user
    const characterId = params.characterId

    const character = await Character.find(characterId)

    if (user?.id !== character?.userId || !character) {
      session.flash('error', 'Seems like there was an error loading your character.')
      return inertia.location('/characters')
    }

    session.put('characterId', characterId)

    const inventory = await InventoryDTO.fromCharacter(character.id)

    return inertia.render(
      'private/character_page',
      { character, inventory: inertia.always(() => inventory.toJSON()) },
      {
        meta: {
          title: 'Character Profile',
          description: 'Your character profile page',
        },
      }
    )
  }
}
