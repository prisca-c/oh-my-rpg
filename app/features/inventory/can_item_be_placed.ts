import { Size } from '#types/size'
import { Position } from '#types/position'

export class CanItemBePlaced {
  async handle(
    itemsOnPage: { position: Position | null; size: Size }[],
    sizeItemToPlace: Size,
    x: number,
    y: number,
  ): Promise<boolean> {
    const itemWidth = x + (sizeItemToPlace.width - 1)
    const itemHeight = y + (sizeItemToPlace.height - 1)
    const maxDimension = 10
    if (itemWidth > 10 || itemHeight > maxDimension) {
      return false
    }
    const returnStmt = await Promise.all(
      itemsOnPage.map(async (existingItem) => {
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
