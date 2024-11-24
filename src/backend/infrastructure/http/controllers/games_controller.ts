import type { HttpContext } from '@adonisjs/core/http'

import Character from '#infrastructure/models/character'
import { GetWorlds } from '#features/world/get_worlds'

export default class GamesController {
  async index({ params, auth, session, inertia }: HttpContext) {
    const user = auth.user
    const characterId = params.characterId

    const character = await Character.find(characterId)

    if (user?.id !== character?.userId || !character) {
      session.flash('error', 'Seems like there was an error loading your character.')
      return inertia.location('/characters')
    }

    session.put('characterId', characterId)

    await character.load('entityProperties')
    const characterProperties = character.entityProperties
    const characters = Character.query()
      .select('id', 'name', 'level')
      .orderBy('level', 'desc')
      .limit(5)

    if (!character) {
      return inertia.location('/characters')
    }

    const worlds = await new GetWorlds().handle(character)

    return inertia.render(
      'private/game',
      {
        character,
        leaderboard: await characters,
        properties: characterProperties,
        worlds,
      },
      {
        meta: {
          title: 'Game',
          description: 'Game description',
        },
      }
    )
  }
}
