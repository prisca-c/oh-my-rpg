import type Item from '#models/item'
import type Character from '#models/character'

export class StoreItem {
  async handle(item: Item, character: Character) {
    return character.related('inventory').create({
      itemId: item.id,
      quantity: 1,
    })
  }
}
