import { usePage } from '@inertiajs/react'

import type { Size } from '#common/types/size'
import { Button } from '~/components/button'
import type { Position } from '#common/types/position'
import { Container } from '~/components/utils'
import { useInventory } from '~/hooks/use_inventory'
import { CanItemBePlaced } from '#domain/inventory/can_item_be_placed'
import { useCanBeMovedStore } from '~/store/use_can_be_moved_store'
import { useInventoryDragAndDrop } from '~/hooks/use_inventory_drag_and_drop'
import { BiShield } from 'react-icons/bi'
import { InventoryDtoType } from '#common/types/inventory_types'

interface InventoryGridProps {
  inventory: InventoryDtoType
}

export const InventoryGrid = (props: InventoryGridProps) => {
  const { inventory } = props
  const { characterId } = usePage().props
  const canBeMoved = useCanBeMovedStore((state) => state.canBeMoved)
  const { items, inventoryPage, filteredItems, setInventoryPage, updateItemPosition } =
    useInventory(characterId as string, inventory)

  const { onDragStart, onDragOver, onDrop, onDragOverButtonPage } = useInventoryDragAndDrop()

  const canItemBePlaced = async (
    itemsOnPage: { id: string; position: Position | null; size: Size }[],
    itemToPlace: { id: string; size: Size; position: Position }
  ) => {
    return await new CanItemBePlaced().handle(itemsOnPage, itemToPlace)
  }

  const handleItemDrop = async (itemId: string, position: Position) => {
    const item = Object.values(items)
      .flat()
      .find((item: { id: string }) => item.id === itemId)

    if (!item) {
      console.log('Item not found')
      return
    }

    const currentItems =
      filteredItems?.map(({ id, position, size }) => ({ id, position, size })) || []

    const canPlaceItem = await canItemBePlaced(currentItems, {
      id: itemId,
      size: item.size,
      position,
    })

    if (!canPlaceItem) {
      console.log('Item cannot be placed')
      return
    }

    await updateItemPosition(itemId, inventoryPage, position)
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
          {items &&
            Object.keys(items).map((page) => (
              <div key={page} onDragOver={(e) => onDragOverButtonPage(e, setInventoryPage)}>
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
                    item.position && item.position.x === rowIndex && item.position.y === colIndex
                )

                return (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className={'relative bg-amber-200 border-2 border-black h-10 w-10'}
                    data-position={`x:${rowIndex},y:${colIndex}`}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, handleItemDrop)}
                  >
                    {item && (
                      <Container key={item.id} className={'absolute z-10'}>
                        {item.image && (
                          <img
                            src={item.image}
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
                        )}
                        {!item.image && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: `calc((${item.size.width} * 2.5rem) - 4px)`,
                              height: `calc((${item.size.height} * 2.5rem) - 4px)`,
                              backgroundColor: 'gray',
                            }}
                            draggable={canBeMoved}
                            onDragStart={onDragStart}
                            data-item-id={item.id}
                          >
                            <BiShield size={24} />
                          </div>
                        )}
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
