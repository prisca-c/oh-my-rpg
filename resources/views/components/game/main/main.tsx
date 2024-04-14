import { InventoryDtoType } from '#dto/inventory_dto'
import { Container, Typography } from '#components/utils/index'
import { Inventory } from '#components/game/inventory/inventory'
import { useWorldsStore } from '#resources/store/use_worlds_store'

interface MainProps {
  inventory: InventoryDtoType
}

export const Main = (props: MainProps) => {
  const { inventory } = props

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
      {/*{worlds.map((world) => (*/}
      {/*  <a key={world.id} className={'cursor-pointer'} onClick={() => getItem(world.id)}>*/}
      {/*    <Card key={world.id}>*/}
      {/*      <Typography type={'p'} size={'sm'} className={'font-bold'}>*/}
      {/*        {world.name}*/}
      {/*      </Typography>*/}
      {/*    </Card>*/}
      {/*  </a>*/}
      {/*))}*/}
      <Inventory inventory={inventory} />
    </Container>
  )
}
