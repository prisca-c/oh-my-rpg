import { useState } from 'react'

import type Character from '#infrastructure/models/character'
import { CharacterCard } from '~/common/components/character_card'
import { Flex } from '~/common/components/utils/flex'
import { CreateCharacterForm } from '~/features/characters/create_character_form'
import { Button } from '~/common/components/button'
import { Typography } from '~/common/components/utils/typography'

type CharactersProps = {
  characters: Character[]
}

export default function CharacterListPage({ characters }: CharactersProps) {
  const [createCharacter, setCreateCharacter] = useState(false)

  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Characters
      </Typography>
      <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
        {createCharacter ? (
          <>
            <CreateCharacterForm />
            <Button onClick={() => setCreateCharacter(false)}>Cancel</Button>
          </>
        ) : (
          <Button onClick={() => setCreateCharacter(true)}>Create Character</Button>
        )}
      </Flex>
      <Flex direction={'row'} justify={'center'} align={'center'} className={'gap-6'}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Flex>
    </Flex>
  )
}
