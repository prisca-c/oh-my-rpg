import { router } from '@inertiajs/react'

import { Button } from '~/common/components/button'
import { Form, InputGroup } from '~/common/components/utils'
import { useLoginForm } from '~/features/auth/hooks/use_login_form'

export const LoginForm = () => {
  const { data, validations, onChange, onSubmit } = useLoginForm()

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
        value={data.email}
        onChange={onChange}
      />
      <InputGroup
        label={'Password'}
        name={'password'}
        type={'password'}
        id={'password'}
        value={data.password}
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
