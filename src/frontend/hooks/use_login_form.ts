import type React from 'react'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

import { validateEmail, validatePassword } from '~/helpers/validations'

type FormValidations = {
  email: boolean
  password: boolean
}

export const useLoginForm = () => {
  const [validations, setValidations] = useState<FormValidations>({
    email: false,
    password: false,
  })
  const { post, data, setData } = useForm({
    email: '',
    password: '',
  })

  useEffect(() => {
    setValidations({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
    })
  }, [data])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    if (name === 'email') {
      setData('email', value)
    }

    if (name === 'password') {
      setData('password', value)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return { data, validations, onChange, onSubmit }
}
