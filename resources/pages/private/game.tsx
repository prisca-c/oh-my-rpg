import type Character from '~/app/models/character'
import type EntityProperty from '~/app/models/entity_property'

import { Container } from '@/components/utils'
import { Main } from '@/components/game/main/main'
import { Leaderboard } from '@/components/game/leaderboard'
import { CharacterInfos } from '@/components/game/character_infos'

type GameProps = {
  character: Character
  leaderboard: Character[]
  properties: EntityProperty
}

export default function Game({ character, leaderboard, properties }: GameProps) {
  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'p-2 gap-6 h-full w-full'}
    >
      <Container
        layout={'flex'}
        direction={'row'}
        justify={'center'}
        align={'center'}
        className={'gap-6 h-full w-full'}
      >
        <CharacterInfos character={character} properties={properties} />
        <Main />
        <Leaderboard leaderboard={leaderboard} />
      </Container>
    </Container>
  )
}
