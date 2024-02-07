import Character from '#models/character'
import { Form } from '#domain/resources/components/form/form'
import { csrfField, route } from 'adonisjsx'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import { getErrorByField } from '#infrastructure/helpers/session'
import { CharacterCard } from '#domain/resources/components/character_card'
import { Flex } from '#domain/resources/components/utils/flex'
import { Typography } from '#domain/resources/components/utils/typography'

type CharactersPageProps = {
  characters: Character[]
}

export const CharactersPage = ({ characters }: CharactersPageProps) => {
  const createCharacter = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget
    // @ts-ignore
    const formData = new FormData(form)
    await fetch(route('character.store'), {
      method: 'POST',
      body: formData,
    })
  }
  return (
    <Flex direction={'col'} justify={'center'} align={'center'} gap={'4'}>
      <Typography type={'h1'} size={'4xl'} className={'font-bold'}>
        Characters
      </Typography>
      <div class={'w-1/2 mx-auto'}>
        <Form method={'POST'} onSubmit={createCharacter} textCenter>
          {csrfField()}
          <InputGroup
            label={'Name'}
            name={'name'}
            type={'text'}
            id={'name'}
            error={getErrorByField('name')}
          />
          <Button type={'submit'}>Create</Button>
        </Form>
      </div>

      <div class={'flex flex-wrap gap-4 justify-center mt-4'}>
        {characters.map((character) => (
          <CharacterCard character={character} />
        ))}
      </div>
    </Flex>
  )
}
