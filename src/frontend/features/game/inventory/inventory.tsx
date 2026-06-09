import { Container } from '~/common/components/utils'
import { InventoryGrid } from '~/features/game/inventory/inventory_grid'
import { InventoryCompartments } from '~/features/game/inventory/inventory_compartments'
import { InventoryDtoType } from '#common/types/inventory_types'

interface InventoryProps {
  inventory: InventoryDtoType
}

export const Inventory = (props: InventoryProps) => {
  const { inventory } = props

  return (
    <>
      <Container
        className={'bg-inventory relative h-[500px] w-[500px] rounded-lg bg-cover bg-center'}
      >
        <InventoryCompartments size={'lg'} position="bottom-20 left-10"></InventoryCompartments>
        <InventoryCompartments size={'lg'} position="bottom-20 right-10"></InventoryCompartments>
        <InventoryCompartments size={'sm'} position="bottom-1 left-[40%]"></InventoryCompartments>
        <InventoryCompartments size={'md'} position="bottom-28 left-[40%]"></InventoryCompartments>
        <InventoryCompartments size={'md'} position="bottom-60 left-[40%]"></InventoryCompartments>
        <InventoryCompartments size={'sm'} position="top-8 right-[40%]"></InventoryCompartments>
        <InventoryCompartments size={'sm'} position="top-28 right-10"></InventoryCompartments>
      </Container>
      <InventoryGrid inventory={inventory} />
    </>
  )
}
