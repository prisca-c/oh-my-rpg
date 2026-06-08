import type World from '#infrastructure/models/world'

interface Props {
  world: World
}

export default function WorldPage(props: Props) {
  const { world } = props

  return <div>{world.name}</div>
}
