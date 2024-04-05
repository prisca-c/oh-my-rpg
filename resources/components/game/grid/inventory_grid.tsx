import React from 'react'
import { InventoryItemDtoType } from '~/app/dto/inventory_dto'

import { Container } from '@/components/utils'

interface InventoryGridProps {
  items: InventoryItemDtoType[]
}

export const InventoryGrid = (props: InventoryGridProps) => {
  const { items } = props

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
                >
                  {item && (
                    <Container key={item.id} className={'absolute z-10 outline outline-black'}>
                      <img
                        src={item.image || 'https://via.placeholder.com/20'}
                        alt={item.name}
                        style={{
                          width: `calc(${item.size.width} * 2.5rem - 4px)`,
                          height: `calc(${item.size.height} * 2.5rem - 4px)`,
                        }}
                        draggable={false}
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
