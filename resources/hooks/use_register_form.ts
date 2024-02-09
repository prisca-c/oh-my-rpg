import type React from 'react'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

type FormFields = {
  email: string
  username: string
  password: string
  password_confirmation: string
}

type FormValidations = {
  email: boolean
  username: boolean
  password: boolean
  password_confirmation: boolean
}

export const useRegisterForm = (initialValues: FormFields) => {
  const [inputs, setInputs] = useState<FormFields>(initialValues)
  const [validations, setValidations] = useState<FormValidations>({
    email: false,
    username: false,
    password: false,
    password_confirmation: false,
  })

  const validateEmail = (email: string) => email.includes('@') && email.includes('.')
  const validateUsername = (username: string) => username.length > 3
  const validatePassword = (password: string) => password.length > 7
  const validatePasswordConfirmation = (passwordConfirmation: string) =>
    passwordConfirmation === inputs.password && inputs.password.length > 7

  useEffect(() => {
    setValidations({
      email: validateEmail(inputs.email),
      username: validateUsername(inputs.username),
      password: validatePassword(inputs.password),
      password_confirmation: validatePasswordConfirmation(inputs.password_confirmation),
    })
  }, [inputs])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.post('/register', new FormData(e.currentTarget))
  }

  return { inputs, validations, onChange, onSubmit }
}
