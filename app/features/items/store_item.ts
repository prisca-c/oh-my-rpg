import type Item from '#infrastructure/models/item'
import type Character from '#infrastructure/models/character'

export class StoreItem {
  async handle(item: Item, character: Character) {
    return character.related('inventory').create({
      itemId: item.id,
      quantity: 1,
    })
  }
}
