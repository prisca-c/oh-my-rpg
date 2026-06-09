import { useEffect } from 'react'

import type { Position } from '#common/types/position'
import { InventoryService } from '~/services/inventory_service'
import { type InventoryDtoType } from '#common/types/inventory_types'
import { useStore } from '~/store'

export const useInventory = (characterId: string, initialInventory: InventoryDtoType) => {
  const canBeMoved = useStore((state) => state.canMoveItems)
  const items = useStore((state) => state.inventory.items)
  const inventoryPage = useStore((state) => state.currentInventoryPage)
  const currentPageItems = useStore((state) => state.getCurrentPageItems())

  const setCanBeMoved = useStore((state) => state.setCanMoveItems)
  const setItems = useStore((state) => state.setItems)
  const setInventoryPage = useStore((state) => state.setInventoryPage)

  useEffect(() => {
    setItems(initialInventory.items)
    setInventoryPage(1)
    setCanBeMoved(true)
  }, [])

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
    filteredItems: currentPageItems,
    setInventoryPage,
    updateItemPosition,
  }
}
