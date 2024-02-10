import React from 'react'
import { router } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Form, InputGroup } from '@/components/utils'
import { useLoginForm } from '@/hooks/use_login_form'

export const LoginForm = () => {
  const { inputs, validations, onChange, onSubmit } = useLoginForm({
    email: '',
    password: '',
  })

  const goToRegister = () => {
    router.visit('/register')
  }

  return (
    <Form method={'POST'} onSubmit={onSubmit}>
      <InputGroup
        label={'Email'}
        name={'email'}
        type={'email'}
        id={'email'}
        autoComplete={'email'}
        valid={validations.email}
        value={inputs.email}
        onChange={onChange}
      />
      <InputGroup
        label={'Password'}
        name={'password'}
        type={'password'}
        id={'password'}
        value={inputs.password}
        onChange={onChange}
        autoComplete={'current-password'}
      />
      <Button type={'submit'}>Login</Button>
      <Button type={'button'} onClick={goToRegister}>
        Register
      </Button>
    </Form>
  )
}
