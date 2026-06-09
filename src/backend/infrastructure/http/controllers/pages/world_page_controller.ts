import { type HttpContext } from '@adonisjs/core/http'
import World from '#infrastructure/models/world'

export default class WorldPageController {
  async handle({ inertia, params }: HttpContext) {
    const worldId = params.worldId

    const world = await World.firstOrFail(worldId).catch(() => {
      return inertia.location(`/characters`)
    })

    return inertia.render(
      'private/world_page',
      {
        world,
      },
      {
        meta: {
          title: 'World',
          description: 'World description',
        },
      }
    )
  }
}
