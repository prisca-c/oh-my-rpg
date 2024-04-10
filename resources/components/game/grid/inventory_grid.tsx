import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

import type { Size } from '#types/size'
import { Button } from '#components/button'
import type { Position } from '#types/position'
import { Container } from '#components/utils/index'
import type { InventoryDtoType } from '#dto/inventory_dto'
import { CanItemBePlaced } from '#features/inventory/can_item_be_placed'

interface InventoryGridProps {
  inventory: InventoryDtoType
}

export const InventoryGrid = (props: InventoryGridProps) => {
  const { inventory } = props
  const [items, setItems] = React.useState<InventoryDtoType['items']>([])
  const [canBeMoved, setCanBeMoved] = React.useState(false)
  const characterId = usePage().props.character.id
  const [inventoryPage, setInventoryPage] = useState(1)
  const [filteredItems, setFilteredItems] = useState(inventory.items[inventoryPage])

  useEffect(() => {
    setCanBeMoved(true)
    setItems(inventory.items)
  }, [])

  useEffect(() => {
    setFilteredItems(items[inventoryPage])
  }, [items, inventoryPage])

  const updateItem = async (itemId: string, page: number, position: Position): Promise<void> => {
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
      setItems(data.items)
    }
  }

  const updateItemPosition = async (itemId: string, page: number, position: Position) => {
    setCanBeMoved(false)
    await updateItem(itemId, page, position).then(() => setCanBeMoved(true))
  }

  const canItemBePlaced = async (
    itemsOnPage: { id: string; position: Position | null; size: Size }[],
    itemToPlace: { id: string; size: Size; position: Position },
  ) => {
    return await new CanItemBePlaced().handle(itemsOnPage, itemToPlace)
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

    const item = Object.keys(items).reduce((acc, key) => {
      const item = items[key].find((item: { id: string }) => item.id === itemId)
      return item ? item : acc
    }, null)

    const canPlaceItem = await canItemBePlaced(
      filteredItems?.map((item) => ({ id: item.id, position: item.position, size: item.size })) ||
        [],
      { id: itemId, size: item.size, position },
    )

    if (item && canPlaceItem) {
      await updateItemPosition(itemId, inventoryPage, position)
    } else {
      console.log('Item cannot be placed')
    }
  }

  const onDropOverButtonPage = async (e: React.DragEvent<HTMLDivElement>) => {
    if (!canBeMoved) return

    e.preventDefault()
    setInventoryPage(Number(e.currentTarget.textContent))
  }

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      align={'center'}
      justify={'center'}
      className={'bg-gray-800 relative select-none'}
    >
      <Container
        layout={'flex'}
        direction={'col'}
        align={'start'}
        className={'bg-gray-800 relative select-none'}
      >
        <Container layout={'flex'} direction={'row'}>
          {Object.keys(items).map((page) => (
            <div key={page} onDragOver={onDropOverButtonPage}>
              <Button onClick={() => setInventoryPage(Number(page))}>{page}</Button>
            </div>
          ))}
        </Container>
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
                const item = filteredItems?.find(
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
                            width: `calc((${item.size.width} * 2.5rem) - 4px)`,
                            height: `calc((${item.size.height} * 2.5rem) - 4px)`,
                            maxWidth: 'none',
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
    </Container>
  )
}
