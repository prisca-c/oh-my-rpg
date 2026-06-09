import { useForm } from '@inertiajs/react'
import type React from 'react'
import { useEffect, useState } from 'react'

import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateUsername,
} from '~/common/helpers/validations'

type FormValidations = {
  email: boolean
  username: boolean
  password: boolean
  password_confirmation: boolean
}

export const useRegisterForm = () => {
  const { post, data, setData } = useForm({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })
  const [validations, setValidations] = useState<FormValidations>({
    email: false,
    username: false,
    password: false,
    password_confirmation: false,
  })

  useEffect(() => {
    setValidations({
      email: validateEmail(data.email),
      username: validateUsername(data.username),
      password: validatePassword(data.password),
      password_confirmation: validatePasswordConfirmation(
        data.password_confirmation,
        data.password
      ),
    })
  }, [data])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    if (name === 'email') {
      setData('email', value)
    }

    if (name === 'username') {
      setData('username', value)
    }

    if (name === 'password') {
      setData('password', value)
    }

    if (name === 'password_confirmation') {
      setData('password_confirmation', value)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/register')
  }

  return { data, validations, onChange, onSubmit }
}
