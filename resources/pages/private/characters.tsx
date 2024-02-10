import type Character from '~/app/models/character'

import { Flex, Typography } from '@/components/utils'
import { CharacterCard } from '@/components/character_card'
import { CreateCharacterForm } from '@/components/characters/create_character_form'

type CharactersProps = {
  characters: Character[]
}

export default function Characters({ characters }: CharactersProps) {
  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Characters
      </Typography>
      <CreateCharacterForm />
      <Flex direction={'row'} justify={'center'} align={'center'} className={'gap-6'}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Flex>
    </Flex>
  )
}
