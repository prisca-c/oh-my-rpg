import type React from 'react'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

type CreateCharacterForm = {
  name: string
}

type FormValidations = {
  name: boolean
}

export const useCreateCharacterForm = (initialValues: CreateCharacterForm) => {
  const [inputs, setInputs] = useState<CreateCharacterForm>(initialValues)
  const [validations, setValidations] = useState<FormValidations>({
    name: false,
  })
  useEffect(() => {
    setValidations({
      name: inputs.name.length > 3,
    })
  }, [inputs])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputs(initialValues)
    router.post('/characters', new FormData(e.currentTarget))
  }

  return { inputs, validations, onChange, onSubmit }
}
