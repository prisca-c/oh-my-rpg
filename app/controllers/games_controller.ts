import type { HttpContext } from '@adonisjs/core/http'

import Character from '#models/character'

export default class GamesController {
  async index({ params, auth, session, inertia }: HttpContext) {
    const user = auth.user
    const id = params.id

    const character = await Character.find(id)

    if (user?.id !== character?.userId || !character) {
      session.flash('error', 'Seems like there was an error loading your character.')
      return inertia.location('/characters')
    }

    await character.load('entityProperties')
    const characterProperties = character.entityProperties
    const characters = Character.query()
      .select('id', 'name', 'level')
      .orderBy('level', 'desc')
      .limit(5)

    if (!character) {
      return inertia.location('/characters')
    }

    return inertia.render(
      'private/game',
      {
        character,
        leaderboard: await characters,
        properties: characterProperties,
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
