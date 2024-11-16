import { usePage } from '@inertiajs/react'

import { Button } from '~/components/button'
import { getErrorByField } from '~/helpers/form_helpers'
import { useCreateCharacterForm } from '~/hooks/use_create_character_form'
import { Form } from '~/components/utils/form/form'
import { InputGroup } from '~/components/utils/form/input_group'

export const CreateCharacterForm = () => {
  const { data, validations, onChange, onSubmit } = useCreateCharacterForm()

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
        value={data.name}
        valid={validations.name}
        onChange={onChange}
        autoComplete={'name'}
      />
      <Button type={'submit'}>Create</Button>
    </Form>
  )
}
