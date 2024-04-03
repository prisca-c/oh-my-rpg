import type Character from '#models/character'
import InventoryItem from '#models/inventory_item'

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
        const canPlaceItem = await this.canItemBePlaced(items, item, x, y, page)
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

  async canItemBePlaced(
    items: InventoryItem[],
    item: InventoryItem,
    x: number,
    y: number,
    page: number,
  ): Promise<boolean> {
    const itemsOnPage = items.filter((existingItem) => existingItem.page === page)
    const itemSize = await item.size()
    const itemWidth = x + (itemSize.width - 1)
    const itemHeight = y + (itemSize.height - 1)
    const maxDimension = 10
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
            x > existingItemPosition.x + (existingItemSize.width - 1) ||
            itemHeight < existingItemPosition.y ||
            y > existingItemPosition.y + (existingItemSize.height - 1))
        )

        return isOverlapping || isSamePosition
      }),
    )

    return returnStmt.every((result) => result === false)
  }
}
