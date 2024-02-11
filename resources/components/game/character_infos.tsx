import type Character from '~/app/models/character'
import type EntityProperty from '~/app/models/entity_property'

import { Flex, Typography } from '@/components/utils'

type CharacterInfosProps = {
  character: Character
  properties: EntityProperty
}

export const CharacterInfos = ({ character, properties }: CharacterInfosProps) => {
  return (
    <Flex direction={'col'} justify={'center'} className={'gap-2 bg-gray-200 p-4 rounded-md'}>
      <Typography type={'h2'} size={'lg'} className={'font-bold text-center'}>
        Character
      </Typography>
      <h2>Name: {character.name}</h2>
      <h2>Level: {character.level}</h2>
      <h2>Experience: {character.experience}</h2>
      <h2>Constitution: {properties.constitution}</h2>
      <h2>Strength: {properties.strength}</h2>
      <h2>Dexterity: {properties.dexterity}</h2>
      <h2>Intelligence: {properties.intelligence}</h2>
      <h2>Wisdom: {properties.wisdom}</h2>
      <h2>Charisma: {properties.charisma}</h2>
      <h2>Leaderboard</h2>
    </Flex>
  )
}
