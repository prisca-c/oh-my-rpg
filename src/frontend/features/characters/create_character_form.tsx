import { usePage } from '@inertiajs/react'

import { Button } from '~/common/components/button'
import { getErrorByField } from '~/common/helpers/form_helpers'
import { useCreateCharacterForm } from '~/features/characters/hooks/use_create_character_form'
import { Form } from '~/common/components/utils/form/form'
import { InputGroup } from '~/common/components/utils/form/input_group'

export const CreateCharacterForm = () => {
  const { data, validations, onChange, onSubmit } = useCreateCharacterForm()

  const errors = usePage().props.errors
  const userIdError = getErrorByField(errors, 'userId')
  return (
    <Form method={'POST'} onSubmit={onSubmit}>
      {userIdError && <p className={'text-xs text-red-500'}>{userIdError}</p>}
      <InputGroup
        label={'Name'}
        name={'name'}
        type={'text'}
        id={'name'}
        errors={errors}
        value={data.name}
        valid={validations.name}
        onChange={onChange}
        autoComplete={'name'}
      />
      <Button type={'submit'}>Create</Button>
    </Form>
  )
}
