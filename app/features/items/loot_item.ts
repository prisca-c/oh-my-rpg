import type Item from '#models/item'
import { Numbers } from '#utils/numbers'
import { FilterItemByRarity } from '#features/items/filter_item_by_rarity'
import { ItemRarity as ItemRarityEnum, itemRarityDropChance } from '#enums/item_rarity.enum'

export class LootItem {
  async handle(items: Item[]): Promise<Item | null> {
    const rarity = this.#pickRarity()
    return this.#pickItem(rarity, items)
  }

  #pickRarity(): keyof typeof itemRarityDropChance {
    const chance = Numbers.random(0, 1, 3)
    let cumulativeProbability = 0
    const rarityList = Object.keys(itemRarityDropChance).sort(
      (a, b) =>
        itemRarityDropChance[b as keyof typeof itemRarityDropChance] -
        itemRarityDropChance[a as keyof typeof itemRarityDropChance]
    )

    for (const rarity of rarityList) {
      const rarityChance = itemRarityDropChance[rarity as keyof typeof itemRarityDropChance]
      cumulativeProbability += rarityChance
      if (chance <= cumulativeProbability) {
        return rarity as keyof typeof itemRarityDropChance
      }
    }

    return ItemRarityEnum.COMMON
  }

  async #pickItem(rarity: keyof typeof itemRarityDropChance, items: Item[]): Promise<Item | null> {
    const filteredItems = await new FilterItemByRarity().handle(items, rarity)

    if (filteredItems.length === 0) {
      return null
    }

    return filteredItems[Numbers.random(0, items.length - 1)]
  }
}
