import type Character from '#models/character'
import InventoryItem from '#models/inventory_item'
import { CanItemBePlaced } from '#features/inventory/can_item_be_placed'

interface ReturnPosition {
  page: number
  x: number
  y: number
}

export class InventoryManager {
  async handle(character: Character, item: InventoryItem): Promise<ReturnPosition | null> {
    const inventoryItems = await InventoryItem.query().where('character_id', character.id)

    const nextAvailablePosition = this.#getNextAvailablePositionForItem(
      inventoryItems,
      item,
      character.inventorySize,
    )

    if (nextAvailablePosition) {
      return await nextAvailablePosition
    }

    return null
  }

  async #getNextAvailablePositionForItem(
    items: InventoryItem[],
    item: InventoryItem,
    maxPages: number,
    page = 1,
  ): Promise<ReturnPosition | null> {
    const maxDimension = 10

    for (let y = 0; y < maxDimension; y++) {
      for (let x = 0; x < maxDimension; x++) {
        const itemsOnPage = []

        for (const item of items) {
          if (item.page === page) {
            const size = await item.size()
            const position = item.position
            itemsOnPage.push({ position, size })
          }
        }

        const itemSize = await item.size()
        const canPlaceItem = await new CanItemBePlaced().handle(itemsOnPage, itemSize, x, y)
        if (canPlaceItem) {
          return { page, x, y }
        }
      }
    }

    if (page < maxPages) {
      page += 1
      return this.#getNextAvailablePositionForItem(items, item, maxPages, page)
    }

    return null
  }
}
