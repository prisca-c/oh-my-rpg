import type Character from '~/app/models/character'

import { Button } from '@/components/button'
import { CharacterCard } from '@/components/character_card'
import { Flex, Typography, Form, InputGroup } from '@/components/utils'

type CharactersProps = {
  characters: Character[]
}

export default function Characters({ characters }: CharactersProps) {
  return (
    <Flex direction={'row'} justify={'center'} align={'center'} className={'gap-6'}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Flex>
  )
}
