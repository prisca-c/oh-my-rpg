import React from 'react'
import { router } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Form } from '@/components/form/form'
import { useLoginForm } from '@/hooks/use_login_form'
import { Typography } from '@/components/utils/typography'
import { InputGroup } from '@/components/form/input_group'

type LoginProps = {
  csrfToken: string
}

export default function Login({ csrfToken }: LoginProps) {
  const { inputs, validations, onChange, onSubmit } = useLoginForm({
    email: '',
    password: '',
  })

  const goToRegister = () => {
    router.visit('/register')
  }

  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Login
      </Typography>
      <Form method={'POST'} onSubmit={onSubmit}>
        <input type="hidden" name="_csrf" value={csrfToken} />
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
        />
        <Button type={'submit'}>Login</Button>
        <Button type={'button'} onClick={goToRegister}>
          Register
        </Button>
      </Form>
    </div>
  )
}
