import React from 'react'
import { usePage, router } from '@inertiajs/react'

import { Button } from '#components/button'
import { Form, InputGroup } from '#components/utils/index'
import { useRegisterForm } from '#resources/hooks/use_register_form'

export const RegisterForm = () => {
  const { inputs, validations, onChange, onSubmit } = useRegisterForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const errors = usePage().props.errors

  const goToLogin = () => {
    router.visit('/login')
  }

  return (
    <Form method={'POST'} onSubmit={onSubmit}>
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
      <Button type={'button'} onClick={goToLogin}>
        Go back to login
      </Button>
    </Form>
  )
}
