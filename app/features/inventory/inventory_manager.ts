import type Character from '#models/character'
import type InventoryItem from '#models/inventory_item'

interface ReturnPosition {
  page: number
  x: number
  y: number
}

export class InventoryManager {
  async handle(
    character: Character,
    inventoryItems: InventoryItem[],
    item: InventoryItem,
  ): Promise<ReturnPosition | null> {
    const nextAvailablePosition = this.#getNextAvailablePositionForItem(
      inventoryItems,
      item,
      character,
    )

    if (nextAvailablePosition) {
      return await nextAvailablePosition
    }

    return null
  }

  async #getNextAvailablePositionForItem(
    items: InventoryItem[],
    item: InventoryItem,
    character: Character,
    page = 1,
  ): Promise<ReturnPosition | null> {
    const maxPages = 0.5 * character.inventorySize
    const maxDimension = Math.ceil(maxPages) === page ? 10 : 20

    for (let y = 0; y < maxDimension; y++) {
      for (let x = 0; x < 10; x++) {
        const canPlaceItem = await this.canItemBePlaced(items, item, character, x, y, page)
        if (canPlaceItem) {
          return { page, x, y }
        }
      }
    }

    if (page < Math.ceil(maxPages)) {
      page += 1
      return this.#getNextAvailablePositionForItem(items, item, character, page)
    }

    return null
  }

  async canItemBePlaced(
    items: InventoryItem[],
    item: InventoryItem,
    character: Character,
    x: number,
    y: number,
    page: number,
  ): Promise<boolean> {
    const itemsOnPage = items.filter((existingItem) => existingItem.page === page)
    const itemSize = await item.size()
    const itemWidth = x + (itemSize.width - 1)
    const itemHeight = y + (itemSize.height - 1)
    const maxPages = 0.5 * character.inventorySize
    const maxDimension = Math.ceil(maxPages) === page ? 10 : 20
    if (itemWidth > 10 || itemHeight > maxDimension) {
      return false
    }
    const returnStmt = await Promise.all(
      itemsOnPage.map(async (existingItem) => {
        const existingItemSize = await existingItem.size()
        const existingItemPosition = existingItem.position

        const isSamePosition =
          existingItemPosition && x === existingItemPosition.x && y === existingItemPosition.y

        const isOverlapping = !(
          existingItemPosition &&
          (itemWidth < existingItemPosition.x ||
            x > existingItemPosition.x + existingItemSize.width ||
            itemHeight < existingItemPosition.y ||
            y > existingItemPosition.y + existingItemSize.height)
        )

        return isOverlapping || isSamePosition
      }),
    )

    return returnStmt.every((result) => result === false)
  }
}
