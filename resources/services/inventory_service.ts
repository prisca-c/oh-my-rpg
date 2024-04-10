import type { Position } from '#types/position'
import type { InventoryDtoType } from '#dto/inventory_dto'

export const updateItem = async (
  characterId: string,
  itemId: string,
  page: number,
  position: Position,
): Promise<InventoryDtoType['items']> => {
  const xsrf = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  const res = await fetch(`/inventory/${characterId}/item/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrf ? xsrf[1] : '',
    },
    body: JSON.stringify({ id: itemId, page, position }),
  })
  if (res.ok) {
    const data = await res.json()
    return data.items
  }
  throw new Error('Failed to update item')
}
