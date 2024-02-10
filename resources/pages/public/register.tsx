import React from 'react'
import { usePage } from '@inertiajs/react'

import { Button } from '@/components/button'
import { useRegisterForm } from '@/hooks/use_register_form'
import { Typography, Form, InputGroup } from '@/components/utils'

type RegisterProps = {
  csrfToken: string
}

export default function Register({ csrfToken }: RegisterProps) {
  const { inputs, validations, onChange, onSubmit } = useRegisterForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const errors = usePage().props.errors

  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Register
      </Typography>
      <Form method={'POST'} onSubmit={onSubmit}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <InputGroup
          label={'Username'}
          name={'username'}
          type={'text'}
          id={'username'}
          errors={errors}
          value={inputs.username}
          valid={validations.username}
          onChange={onChange}
          autoComplete={'username'}
          className={inputs.username ? 'border-2 border-green-500' : ''}
        />
        <InputGroup
          label={'Email'}
          name={'email'}
          type={'email'}
          id={'email'}
          autoComplete={'email'}
          valid={validations.email}
          value={inputs.email}
          onChange={onChange}
          errors={errors}
        />
        <InputGroup
          label={'Password'}
          name={'password'}
          type={'password'}
          id={'password'}
          value={inputs.password}
          errors={errors}
          onChange={onChange}
          valid={validations.password}
          autoComplete={'new-password'}
        />
        <InputGroup
          label={'Confirm Password'}
          name={'password_confirmation'}
          type={'password'}
          id={'password_confirmation'}
          value={inputs.password_confirmation}
          errors={errors}
          onChange={onChange}
          valid={validations.password_confirmation}
          autoComplete={'new-password'}
        />
        <Button type={'submit'}>Register</Button>
      </Form>
    </div>
  )
}
