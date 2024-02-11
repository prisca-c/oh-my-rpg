import type Character from '~/app/models/character'
import type EntityProperty from '~/app/models/entity_property'

import { Flex, Typography } from '@/components/utils'
import { Leaderboard } from '@/components/game/leaderboard'
import { CharacterInfos } from '@/components/game/character_infos'

type GameProps = {
  character: Character
  leaderboard: Character[]
  properties: EntityProperty
}

export default function Game({ character, leaderboard, properties }: GameProps) {
  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
      <Typography type={'h1'} size={'xl'} className={'font-bold text-center'}>
        Game
      </Typography>
      <Flex direction={'row'} justify={'center'} align={'flex-start'} className={'gap-6'}>
        <CharacterInfos character={character} properties={properties} />
        <Leaderboard leaderboard={leaderboard} />
      </Flex>
    </Flex>
  )
}
