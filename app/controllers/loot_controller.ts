import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import type { HttpContext } from '@adonisjs/core/http'

import World from '#models/world'
import Character from '#models/character'
import type GetItems from '#features/items/get_items'
import type { LootItem } from '#features/items/loot_item'
import type { StoreItem } from '#features/items/store_item'

@inject()
export default class LootController {
  constructor(
    private getItems: GetItems,
    private loot: LootItem,
    private storeItem: StoreItem,
  ) {}

  async handle({ request, session, response }: HttpContext) {
    const characterId = session.get('characterId')
    const { id } = request.params()
    logger.debug(session.all())

    if (!characterId) {
      return response.redirect().toPath('/characters')
    }

    const character = await Character.findOrFail(characterId)
    const world = await World.findOrFail(id)
    const items = await this.getItems.handle(world)
    const item = await this.loot.handle(items)

    if (item) {
      await this.storeItem.handle(item, character)
    }

    return item
  }
}
