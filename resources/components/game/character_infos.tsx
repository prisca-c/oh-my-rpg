import type Character from '~/app/models/character'
import type EntityProperty from '~/app/models/entity_property'

import { Container, Flex, Typography } from '@/components/utils'

type CharacterInfosProps = {
  character: Character
  properties: EntityProperty
}

export const CharacterInfos = ({ character, properties }: CharacterInfosProps) => {
  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'start'}
      align={'center'}
      className={'gap-6 h-full'}
      bg={'lightGray'}
      rounded
    >
      <Typography type={'h2'} size={'lg'} className={'font-bold text-center'}>
        Character
      </Typography>
      <Flex direction={'col'} justify={'flex-start'} align={'flex-start'} className={'gap-2'}>
        <h2>Name: {character.name}</h2>
        <h2>Level: {character.level}</h2>
        <h2>Experience: {character.experience}</h2>
        <h2>Constitution: {properties.constitution}</h2>
        <h2>Strength: {properties.strength}</h2>
        <h2>Dexterity: {properties.dexterity}</h2>
        <h2>Intelligence: {properties.intelligence}</h2>
        <h2>Wisdom: {properties.wisdom}</h2>
        <h2>Charisma: {properties.charisma}</h2>
        <h2>Gold: {character.currency}</h2>
      </Flex>
    </Container>
  )
}
