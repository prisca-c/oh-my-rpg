import { useEffect } from 'react'
import type World from '~/app/models/world'
import type Character from '~/app/models/character'
import { InventoryDtoType } from '~/app/dto/inventory_dto'
import type EntityProperty from '~/app/models/entity_property'

import { Container } from '@/components/utils'
import { Main } from '@/components/game/main/main'
import { useWorldsStore } from '@/store/use_worlds_store'
import { Leaderboard } from '@/components/game/leaderboard'
import { CharacterInfos } from '@/components/game/character_infos'

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
