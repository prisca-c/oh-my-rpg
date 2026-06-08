import { Card, Typography } from '~/common/components/utils'
import { useStore } from '~/store'
import { router } from '@inertiajs/react'

export const WorldList = () => {
  const worlds = useStore((state) => state.worlds)

  const redirectToWorld = (id: string) => {
    router.visit(`/game/world/${id}`)
  }

  return (
    <>
      {worlds.map((world) => (
        <a key={world.id} className={'cursor-pointer'} onClick={() => redirectToWorld(world.id)}>
          <Card key={world.id}>
            <Typography type={'p'} size={'sm'} className={'font-bold'}>
              {world.name}
            </Typography>
          </Card>
        </a>
      ))}
    </>
  )
}
