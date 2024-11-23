import { useState, useEffect } from 'react'

import type { Position } from '#common/types/position'
import { InventoryService } from '~/services/inventory_service'
import { useCanBeMovedStore } from '~/store/use_can_be_moved_store'
import { InventoryDtoType } from '#common/types/inventory_types'

export const useInventory = (characterId: string, initialInventory: InventoryDtoType) => {
  const [items, setItems] = useState<InventoryDtoType['items']>([])
  const [inventoryPage, setInventoryPage] = useState(1)
  const [filteredItems, setFilteredItems] = useState(initialInventory.items[inventoryPage])

  const canBeMoved = useCanBeMovedStore((state) => state.canBeMoved)
  const setCanBeMoved = useCanBeMovedStore((state) => state.setCanBeMoved)

  useEffect(() => {
    setCanBeMoved(true)
    setItems(initialInventory.items)
  }, [])

  useEffect(() => {
    setFilteredItems(items[inventoryPage])
  }, [items, inventoryPage])

  const updateItemPosition = async (itemId: string, page: number, position: Position) => {
    setCanBeMoved(false)
    await new InventoryService().updateItem(characterId, itemId, page, position).then(
      (updatedItems) => {
        setItems(updatedItems)
        setCanBeMoved(true)
      },
      (error) => {
        console.error(error)
        setCanBeMoved(true)
      }
    )
  }

  return {
    items,
    canBeMoved,
    inventoryPage,
    filteredItems,
    setInventoryPage,
    updateItemPosition,
  }
}
