import { useState, useEffect } from 'react'

import type { Position } from '#types/position'
import type { InventoryDtoType } from '#dto/inventory_dto'
import { updateItem } from '#resources/services/inventory_service'
import { useCanBeMovedStore } from '#resources/store/use_can_be_moved_store'

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
    await updateItem(characterId, itemId, page, position).then(
      (updatedItems) => {
        setItems(updatedItems)
        setCanBeMoved(true)
      },
      (error) => {
        console.error(error)
        setCanBeMoved(true)
      },
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
