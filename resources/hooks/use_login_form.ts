import type React from 'react'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

import { validateEmail, validatePassword } from '@/helpers/validations'

type LoginForm = {
  email: string
  password: string
}

type FormValidations = {
  email: boolean
  password: boolean
}

export const useLoginForm = (initialValues: LoginForm) => {
  const [inputs, setInputs] = useState<LoginForm>(initialValues)
  const [validations, setValidations] = useState<FormValidations>({
    email: false,
    password: false,
  })
  useEffect(() => {
    setValidations({
      email: validateEmail(inputs.email),
      password: validatePassword(inputs.password),
    })
  }, [inputs])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.post('/login', new FormData(e.currentTarget))
  }

  return { inputs, validations, onChange, onSubmit }
}
