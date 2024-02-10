import { usePage } from '@inertiajs/react'
import type Character from '~/app/models/character'

import { Button } from '@/components/button'
import { CharacterCard } from '@/components/character_card'
import { Flex, Typography, Form, InputGroup } from '@/components/utils'
import { useCreateCharacterForm } from '@/hooks/use_create_character_form'

type CharactersProps = {
  characters: Character[]
}

export default function Characters({ characters }: CharactersProps) {
  const { inputs, validations, onChange, onSubmit } = useCreateCharacterForm({
    name: '',
  })

  const errors = usePage().props.errors

  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Characters
      </Typography>
      <Form method={'POST'} onSubmit={onSubmit}>
        <InputGroup
          label={'Name'}
          name={'name'}
          type={'text'}
          id={'name'}
          errors={errors}
          value={inputs.name}
          valid={validations.name}
          onChange={onChange}
          autoComplete={'name'}
          className={inputs.name ? 'border-2 border-green-500' : ''}
        />
        <Button type={'submit'}>Create</Button>
      </Form>
      <Flex direction={'row'} justify={'center'} align={'center'} className={'gap-6'}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Flex>
    </Flex>
  )
}
