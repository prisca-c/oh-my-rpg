import type { HttpContext } from '@adonisjs/core/http'

import World from '#models/world'
import { Loot } from '#features/loot/loot'
import GetItems from '#features/items/get_items'

export default class LootController {
  async handle({ request }: HttpContext) {
    const { id } = request.params()
    const getItems = new GetItems()
    const loot = new Loot()
    const world = await World.findOrFail(id)
    const items = await getItems.handle(world)

    const item = loot.handle(items)
    return item
  }
}
