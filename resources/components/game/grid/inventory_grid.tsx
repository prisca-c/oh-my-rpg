import React, { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'

import { Size } from '#types/size'
import { Position } from '#types/position'
import { Container } from '#components/utils/index'
import type { InventoryItemDtoType } from '#dto/inventory_dto'
import { CanItemBePlaced } from '#features/inventory/can_item_be_placed'

interface InventoryGridProps {
  items: InventoryItemDtoType[]
}

export const InventoryGrid = (props: InventoryGridProps) => {
  const { items } = props
  const [canBeMoved, setCanBeMoved] = React.useState(false)
  const characterId = usePage().props.character.id

  useEffect(() => {
    setCanBeMoved(true)
  }, [])

  const updateItem = async (itemId: string, page: number, position: Position): Promise<void> => {
    router.put(`/inventory/${characterId}/item/${itemId}`, { page, position })
  }

  const updateItemPosition = async (itemId: string, page: number, position: Position) => {
    await updateItem(itemId, page, position)
  }

  const canItemBePlaced = async (
    itemsOnPage: { position: Position | null; size: Size }[],
    sizeItemToPlace: Size,
    x: number,
    y: number,
  ) => {
    return await new CanItemBePlaced().handle(itemsOnPage, sizeItemToPlace, x, y)
  }

  const getPosition = (dataPosition: string) => {
    const [x, y] = dataPosition.split(',')
    return { x: Number.parseInt(x.split(':')[1]), y: Number.parseInt(y.split(':')[1]) }
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!canBeMoved) return

    e.dataTransfer.setData('text', e.currentTarget.getAttribute('data-item-id') || '')
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!canBeMoved) return

    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (!canBeMoved) return

    e.preventDefault()
    const position = getPosition(e.currentTarget.dataset.position || '')
    const itemId = e.dataTransfer.getData('text')
    console.log('Item dropped', itemId, position)

    const item = items?.find((item) => item.id === itemId)

    const canPlaceItem = await canItemBePlaced(
      items?.map((item) => ({ position: item.position, size: item.size })) || [],
      item?.size,
      position.x,
      position.y,
    )

    if (item && canPlaceItem) {
      await updateItemPosition(itemId, item.page || 1, position)
    } else {
      console.log('Item cannot be placed')
    }
  }

  return (
    <Container
      layout={'flex'}
      align={'center'}
      justify={'center'}
      className={'bg-gray-800 relative select-none'}
    >
      <Container
        layout={'flex'}
        direction={'col'}
        align={'center'}
        justify={'center'}
        className={' border-2 border-black'}
      >
        {Array.from({ length: 10 }).map((_, colIndex) => (
          <div key={colIndex} className={'grid grid-cols-10'}>
            {Array.from({ length: 10 }).map((_, rowIndex) => {
              const item = items?.find(
                (item) =>
                  item.position && item.position.x === rowIndex && item.position.y === colIndex,
              )

              return (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={'relative bg-amber-200 border-2 border-black h-10 w-10'}
                  data-position={`x:${rowIndex},y:${colIndex}`}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                >
                  {item && (
                    <Container key={item.id} className={'absolute z-10'}>
                      <img
                        src={item.image || 'https://via.placeholder.com/20'}
                        alt={item.name}
                        style={{
                          width: `calc(${item.size.width} * 2.5rem - 4px)`,
                          height: `calc(${item.size.height} * 2.5rem - 4px)`,
                        }}
                        draggable={canBeMoved}
                        onDragStart={onDragStart}
                        data-item-id={item.id}
                      />
                    </Container>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </Container>
    </Container>
  )
}
