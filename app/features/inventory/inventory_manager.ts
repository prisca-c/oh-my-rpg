import type Character from '#models/character'
import type { Position } from '#types/position'
import type InventoryItem from '#models/inventory_item'

export class InventoryManager {
  handle(
    character: Character,
    inventoryItems: InventoryItem[],
    item: InventoryItem,
  ): Position | null {
    const nextAvailablePosition = this.#getNextAvailablePositionForItem(
      inventoryItems,
      item,
      character,
    )

    if (nextAvailablePosition) {
      return nextAvailablePosition
    }

    return null
  }

  #getNextAvailablePositionForItem(
    items: InventoryItem[],
    item: InventoryItem,
    character: Character,
    page = 0,
  ): Position | null {
    const maxPages = Math.ceil(0.5 * character.inventorySize)

    for (let y = 0; y < character.inventorySize * 10; y += 10) {
      for (let x = 0; x < character.inventorySize * 10; x += 10) {
        if (this.#canItemBePlaced(items, item, character, x, y)) {
          return { x, y }
        }
      }
    }

    if (page < maxPages) {
      page += 1
      return this.#getNextAvailablePositionForItem(items, item, character, page)
    }

    return null
  }

  #canItemBePlaced(
    items: InventoryItem[],
    item: InventoryItem,
    character: Character,
    x: number,
    y: number,
  ): boolean {
    const itemsOnPage = items.filter((existingItem) => existingItem.page === item.page)

    if (
      x + item.size.width > character.inventorySize * 10 ||
      y + item.size.height > character.inventorySize * 10
    ) {
      return false
    }

    return !itemsOnPage.some(
      (existingItem) =>
        existingItem.position &&
        existingItem.position.x < x + item.size.width &&
        existingItem.position.x + existingItem.size.width > x &&
        existingItem.position.y < y + item.size.height &&
        existingItem.position.y + existingItem.size.height > y,
    )
  }
}
