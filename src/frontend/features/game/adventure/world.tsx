import { Card, Typography } from '~/common/components/utils'
import { useStore } from '~/store'

export const World = () => {
  const worlds = useStore((state) => state.worlds)
  const getItem = async (worldId: string) => {
    await fetch(`/world/loot/${worldId}`)
  }

  return (
    <>
      {worlds.map((world) => (
        <a key={world.id} className={'cursor-pointer'} onClick={() => getItem(world.id)}>
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
