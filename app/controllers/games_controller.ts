import type { HttpContext } from '@adonisjs/core/http'

import World from '#models/world'
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

    const characterLevel = character.level

    const world = await World.query()
      .whereRaw("requirements->>'level' <= ?", [characterLevel])
      .where('worlds.is_active', true)
      .orderByRaw("worlds.requirements->>'level'" + ' DESC')
      .preload('itemLists', (itemListsQuery) => {
        itemListsQuery.preload('items')
      })

    return inertia.render(
      'private/game',
      {
        character,
        leaderboard: await characters,
        properties: characterProperties,
        world,
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
