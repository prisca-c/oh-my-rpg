import { Inventory } from '~/features/game/inventory/inventory'
import { InventoryDtoType } from '#common/types/inventory_types'
import { Button } from '~/common/components/button'
import { router } from '@inertiajs/react'

interface Props {
  character: {
    id: number
    name: string
    level: number
  }
  inventory: InventoryDtoType
}

export default function Character(props: Props) {
  const { character, inventory } = props
  const goToHome = () => {
    router.visit(`/game/${character.id}`)
  }
  return (
    <div>
      <div className={'flex justify-center'}>
        <Button onClick={goToHome}>Go to Home</Button>
      </div>
      <h2 className={'text-center'}>{character.name}</h2>
      <Inventory inventory={inventory} />
    </div>
  )
}
