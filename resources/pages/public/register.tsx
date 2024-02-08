import React, { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Form } from '@/components/form/form'
import { Typography } from '@/components/utils/typography'
import { InputGroup } from '@/components/form/input_group'

type RegisterProps = {
  csrfToken: string
}

export default function Register({ csrfToken }: RegisterProps) {
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')

  const [validEmail, setValidEmail] = React.useState(false)
  const [validUsername, setValidUsername] = React.useState(false)
  const [validPassword, setValidPassword] = React.useState(false)
  const [validPasswordConfirmation, setValidPasswordConfirmation] = React.useState(false)

  useEffect(() => {
    if (email) {
      setValidEmail(email.includes('@') && email.includes('.'))
    }
  }, [email])

  useEffect(() => {
    if (username) {
      setValidUsername(username.length > 3)
    }
  }, [username])

  useEffect(() => {
    if (password) {
      setValidPassword(password.length > 7)
    }
  }, [password])

  useEffect(() => {
    if (passwordConfirmation) {
      setValidPasswordConfirmation(passwordConfirmation === password)
    }
  }, [passwordConfirmation, password])

  useEffect(() => {
    if (validEmail && validUsername && validPassword && validPasswordConfirmation) {
      console.log('Form is valid')
    }
  }, [validEmail, validUsername, validPassword, validPasswordConfirmation])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    if (name === 'username') setUsername(value)
    if (name === 'password') setPassword(value)
    if (name === 'password_confirmation') setPasswordConfirmation(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.post('/register', new FormData(e.currentTarget))
  }

  console.log(usePage())
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
          value={username}
          valid={validUsername}
          onChange={onChange}
          autoComplete={'username'}
          className={username ? 'border-2 border-green-500' : ''}
        />
        <InputGroup
          label={'Email'}
          name={'email'}
          type={'email'}
          id={'email'}
          autoComplete={'email'}
          valid={validEmail}
          value={email}
          onChange={onChange}
          errors={errors}
        />
        <InputGroup
          label={'Password'}
          name={'password'}
          type={'password'}
          id={'password'}
          value={password}
          errors={errors}
          onChange={onChange}
          valid={validPassword}
          autoComplete={'new-password'}
        />
        <InputGroup
          label={'Confirm Password'}
          name={'password_confirmation'}
          type={'password'}
          id={'password_confirmation'}
          value={passwordConfirmation}
          errors={errors}
          onChange={onChange}
          valid={validPasswordConfirmation}
          autoComplete={'new-password'}
        />
        <Button type={'submit'}>Register</Button>
      </Form>
    </div>
  )
}
