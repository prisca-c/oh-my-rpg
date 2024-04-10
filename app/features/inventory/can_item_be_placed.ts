import { Size } from '#types/size'
import { Position } from '#types/position'

export class CanItemBePlaced {
  async handle(
    itemsOnPage: { id: string; position: Position | null; size: Size }[],
    itemToPlace: { id: string; size: Size; position: Position },
  ): Promise<boolean> {
    const sizeItemToPlace = itemToPlace.size
    const x = itemToPlace.position.x
    const y = itemToPlace.position.y

    const itemWidth = x + (sizeItemToPlace.width - 1)
    const itemHeight = y + (sizeItemToPlace.height - 1)
    const maxDimension = 9
    if (itemWidth > 9 || itemHeight > maxDimension) {
      return false
    }
    const returnStmt = await Promise.all(
      itemsOnPage.map(async (existingItem) => {
        if (existingItem.id === itemToPlace.id) {
          return false
        }
        const existingItemSize = existingItem.size
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
