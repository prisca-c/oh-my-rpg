import logger from '@adonisjs/core/services/logger'

import type Item from '#models/item'
import ItemRarity from '#models/item_rarity'

export class FilterItemByRarity {
  async handle(items: Item[], rarity: string) {
    const list = await Promise.all(
      items.map(async (item) => {
        const itemRarity = await ItemRarity.findOrFail(item.itemRarityId)
        return itemRarity.name === rarity ? item : null
      })
    )

    return list.filter((item) => item !== null)
  }
}
