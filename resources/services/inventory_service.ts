import { Api } from '#resources/services/api'
import type { Position } from '#types/position'
import type { InventoryDtoType } from '#dto/inventory_dto'

export const updateItem = async (
  characterId: string,
  itemId: string,
  page: number,
  position: Position,
): Promise<InventoryDtoType['items']> => {
  const res = await new Api().put<InventoryDtoType>(`/inventory/${characterId}/item/${itemId}`, {
    id: itemId,
    page,
    position,
  })
  if (res) {
    return res.items
  }
  throw new Error('Failed to update item')
}

export const dumpItem = async (
  characterId: string,
  itemId: string,
): Promise<InventoryDtoType['items']> => {
  const res = await new Api().delete<InventoryDtoType>(`/inventory/${characterId}/item/${itemId}`)
  if (res) {
    return res.items
  }
  throw new Error('Failed to dump item')
}
