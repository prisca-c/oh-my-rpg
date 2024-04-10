import type React from 'react'
import { useCallback } from 'react'

import type { Position } from '#types/position'
import { useCanBeMovedStore } from '#resources/store/use_can_be_moved_store'

export const useInventoryDragAndDrop = () => {
  const canBeMoved = useCanBeMovedStore((state) => state.canBeMoved)
  const setCanBeMoved = useCanBeMovedStore((state) => state.setCanBeMoved)
  const getPosition = (dataPosition: string) => {
    const [x, y] = dataPosition.split(',')
    return { x: Number.parseInt(x.split(':')[1]), y: Number.parseInt(y.split(':')[1]) }
  }

  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!canBeMoved) return

      e.dataTransfer.setData('text', e.currentTarget.getAttribute('data-item-id') || '')
    },
    [canBeMoved],
  )

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!canBeMoved) return

      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },
    [canBeMoved],
  )

  const onDrop = useCallback(
    async (
      e: React.DragEvent<HTMLDivElement>,
      onItemDrop: (itemId: string, position: Position) => Promise<void>,
    ) => {
      if (!canBeMoved) return

      e.preventDefault()
      const position = getPosition(e.currentTarget.dataset.position || '')
      const itemId = e.dataTransfer.getData('text')

      await onItemDrop(itemId, position)
    },
    [canBeMoved],
  )

  const onDragOverButtonPage = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      setInventoryPage: React.Dispatch<React.SetStateAction<number>>,
    ) => {
      if (!canBeMoved) return

      e.preventDefault()
      setInventoryPage(Number(e.currentTarget.textContent))
    },
    [canBeMoved],
  )

  return { canBeMoved, setCanBeMoved, onDragStart, onDragOver, onDrop, onDragOverButtonPage }
}
