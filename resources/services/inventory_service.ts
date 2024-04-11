import { Api } from '#resources/services/api'
import type { Position } from '#types/position'
import type { InventoryDtoType } from '#dto/inventory_dto'

export class InventoryService {
  private api: Api

  constructor() {
    this.api = new Api()
  }

  async updateItem(
    characterId: string,
    itemId: string,
    page: number,
    position: Position,
  ): Promise<InventoryDtoType['items']> {
    const res = await this.api.put<InventoryDtoType>(`/inventory/${characterId}/item/${itemId}`, {
      id: itemId,
      page,
      position,
    })
    if (res) {
      return res.items
    }
    throw new Error('Failed to update item')
  }

  async dumpItem(characterId: string, itemId: string): Promise<InventoryDtoType['items']> {
    const res = await this.api.delete<InventoryDtoType>(`/inventory/${characterId}/item/${itemId}`)
    if (res) {
      return res.items
    }
    throw new Error('Failed to dump item')
  }
}
