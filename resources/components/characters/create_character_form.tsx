import { usePage } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Form, InputGroup } from '@/components/utils'
import { getErrorByField } from '@/helpers/form_helpers'
import { useCreateCharacterForm } from '@/hooks/use_create_character_form'

export const CreateCharacterForm = () => {
  const { inputs, validations, onChange, onSubmit } = useCreateCharacterForm({
    name: '',
  })

  const errors = usePage().props.errors
  const userIdError = getErrorByField(errors, 'userId')
  return (
    <Form method={'POST'} onSubmit={onSubmit}>
      {userIdError && <p className={'text-red-500 text-xs'}>{userIdError}</p>}
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
      />
      <Button type={'submit'}>Create</Button>
    </Form>
  )
}
