import { Container, Typography } from '~/common/components/utils'
import { Inventory } from '~/features/game/inventory/inventory'
import { InventoryDtoType } from '#common/types/inventory_types'

interface MainProps {
  inventory: InventoryDtoType
}

export const Main = (props: MainProps) => {
  const { inventory } = props

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
      <Inventory inventory={inventory} />
    </Container>
  )
}
