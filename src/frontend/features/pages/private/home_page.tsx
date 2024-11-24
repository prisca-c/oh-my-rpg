import { useEffect } from 'react'

import type World from '#infrastructure/models/world'
import type Character from '#infrastructure/models/character'
import { Main } from '~/features/game/main/main'
import { Container } from '~/common/components/utils'
import type EntityProperty from '#infrastructure/models/entity_property'
import { Leaderboard } from '~/features/game/leaderboard'
import { CharacterInfos } from '~/features/game/character_infos'
import { useStore } from '~/store'

type GameProps = {
  character: Character
  leaderboard: Character[]
  properties: EntityProperty
  worlds: World[]
}

export default function HomePage(props: GameProps) {
  const { character, leaderboard, properties, worlds } = props

  useEffect(() => {
    useStore.setState({ worlds })
  }, [worlds])

  return (
    <Container
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'h-full w-full p-4'}
    >
      <Container
        direction={'row'}
        justify={'center'}
        align={'center'}
        gap={6}
        className={'h-full w-full'}
      >
        <Container
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
        <Main />
      </Container>
    </Container>
  )
}
