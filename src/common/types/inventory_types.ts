import { Size } from '#common/types/size'
import { Position } from '#common/types/position'

type PaginatedInventoryItems = Record<number, InventoryItemDtoType[]>

export interface InventoryDtoType {
  items: PaginatedInventoryItems
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
