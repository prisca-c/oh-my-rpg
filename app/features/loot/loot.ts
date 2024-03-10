import type Item from '#models/item'
import { Numbers } from '#utils/numbers'
import ItemRarity from '#models/item_rarity'
import { ItemRarity as ItemRarityEnum, itemRarityDropChance } from '#enums/item_rarity.enum'

export class Loot {
  async handle(items: Item[]): Promise<Item> {
    const rarity = this.#pickRarity()
    return this.#pickItem(rarity, items)
  }

  #pickRarity(): keyof typeof itemRarityDropChance {
    const chance = Numbers.random(0, 1, 3)
    let cumulativeProbability = 0

    for (const rarity in itemRarityDropChance) {
      cumulativeProbability += itemRarityDropChance[rarity as keyof typeof itemRarityDropChance]
      if (chance <= cumulativeProbability) {
        return rarity as keyof typeof itemRarityDropChance
      }
    }

    return ItemRarityEnum.COMMON
  }

  #pickItem(rarity: keyof typeof itemRarityDropChance, items: Item[]): Item {
    const filteredItems = items.filter(async (item) => {
      const itemRarity = await ItemRarity.findOrFail(item.itemRarityId)
      return itemRarity.name === rarity
    })

    const item = filteredItems[Numbers.random(0, items.length - 1)]

    return item
  }
}
