import { Size } from '#types/size'
import { Position } from '#types/position'
import Character, { type CharacterId } from '#models/character'

export interface InventoryDtoType {
  items: Record<number, InventoryItemDtoType[]>
  inventorySize: number
}

export interface InventoryItemDtoType {
  id: string
  name: string
  description: string
  rarity: string
  page: number | null
  image: string | null
  size: Size
  position: Position | null
}

export class InventoryDTO {
  readonly #items: Record<number, InventoryItemDtoType[]>
  readonly #size: number

  constructor(data: InventoryDtoType) {
    this.#items = data.items
    this.#size = data.inventorySize
  }

  static async fromCharacter(characterId: CharacterId) {
    const character = await Character.findOrFail(characterId)
    await character.load('inventory', (query) => {
      query.preload('item', (query) => {
        query.preload('itemRarity')
      })
    })

    const inventoryItems = character.inventory
    const itemsPerPage: Record<number, InventoryItemDtoType[]> = {}

    for (const inventoryItem of inventoryItems) {
      if (!inventoryItem.page) continue
      if (!itemsPerPage[inventoryItem.page]) {
        itemsPerPage[inventoryItem.page] = []
      }

      const { width, height } = await inventoryItem.size()

      itemsPerPage[inventoryItem.page].push({
        id: inventoryItem.id,
        name: inventoryItem.item.name,
        description: inventoryItem.item.description,
        rarity: inventoryItem.item.itemRarity.name,
        page: inventoryItem.page,
        image: inventoryItem.item.image,
        position: inventoryItem.position,
        size: {
          width,
          height,
        },
      })
    }

    return new InventoryDTO({ items: itemsPerPage, inventorySize: character.inventorySize })
  }

  toJSON() {
    return {
      items: this.#items,
      size: this.#size,
    }
  }
}
