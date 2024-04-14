import { Container } from '#components/utils/index'
import { InventoryDtoType } from '#dto/inventory_dto'
import { InventoryGrid } from '#components/game/inventory/inventory_grid'
import { InventoryCompartments } from '#components/game/inventory/inventory_compartments'

interface InventoryProps {
  inventory: InventoryDtoType
}

export const Inventory = (props: InventoryProps) => {
  const { inventory } = props

  return (
    <>
      <Container
        className={'relative w-[500px] h-[500px] rounded-lg bg-inventory bg-center bg-cover'}
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
