import { usePage } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Form, InputGroup } from '@/components/utils'
import { useCreateCharacterForm } from '@/hooks/use_create_character_form'

export const CreateCharacterForm = () => {
  const { inputs, validations, onChange, onSubmit } = useCreateCharacterForm({
    name: '',
  })

  const errors = usePage().props.errors
  return (
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
  )
}
