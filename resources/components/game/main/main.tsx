import { useEffect, useState } from 'react'
import { InventoryDtoType } from '~/app/dto/inventory_dto'

import { Button } from '@/components/button'
import { useWorldsStore } from '@/store/use_worlds_store'
import { Container, Typography, Card } from '@/components/utils'
import { InventoryGrid } from '@/components/game/grid/inventory_grid'

interface MainProps {
  inventory: InventoryDtoType
}

export const Main = (props: MainProps) => {
  const { inventory } = props
  const [inventoryPage, setInventoryPage] = useState(1)
  const [filteredItems, setFilteredItems] = useState(inventory.items[inventoryPage])

  useEffect(() => {
    const items = inventory.items[inventoryPage] || []
    setFilteredItems(items)
  }, [inventoryPage])

  const worlds = useWorldsStore((state) => state.worlds)
  const getItem = async (worldId: string) => {
    const res = await fetch(`/world/loot/${worldId}`)
    return res
  }

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'h-full w-full'}
      gap={6}
      rounded
      bg={'lightPrimary'}
    >
      <Typography type={'h1'} size={'xl'} className={'font-bold text-center'}>
        Main
      </Typography>
      {worlds.map((world) => (
        <a key={world.id} className={'cursor-pointer'} onClick={() => getItem(world.id)}>
          <Card key={world.id}>
            <Typography type={'p'} size={'sm'} className={'font-bold'}>
              {world.name}
            </Typography>
          </Card>
        </a>
      ))}
      <InventoryGrid items={filteredItems} />
      <Button onClick={() => setInventoryPage(inventoryPage + 1)}>Next</Button>
    </Container>
  )
}
