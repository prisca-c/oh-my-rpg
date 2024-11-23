import { useEffect } from 'react'

import type World from '#infrastructure/models/world'
import type Character from '#infrastructure/models/character'
import { Main } from '~/features/game/main/main'
import { Container } from '~/common/components/utils'
import type EntityProperty from '#infrastructure/models/entity_property'
import { Leaderboard } from '~/features/game/leaderboard'
import { CharacterInfos } from '~/features/game/character_infos'
import { useWorldsStore } from '~/store/use_worlds_store'
import { InventoryDtoType } from '#common/types/inventory_types'

type GameProps = {
  character: Character
  leaderboard: Character[]
  inventory: InventoryDtoType
  properties: EntityProperty
  worlds: World[]
}

export default function Game(props: GameProps) {
  const { character, leaderboard, properties, worlds, inventory } = props

  useEffect(() => {
    useWorldsStore.setState({ worlds })
  }, [worlds])

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'h-full w-full p-4'}
    >
      <Container
        layout={'flex'}
        direction={'row'}
        justify={'center'}
        align={'center'}
        gap={6}
        className={'h-full w-full'}
      >
        <Container
          layout={'flex'}
          direction={'col'}
          justify={'center'}
          align={'center'}
          gap={6}
          className={'h-full'}
          rounded
        >
          <CharacterInfos character={character} properties={properties} />
          <Leaderboard leaderboard={leaderboard} />
        </Container>
        <Main inventory={inventory} />
      </Container>
    </Container>
  )
}
