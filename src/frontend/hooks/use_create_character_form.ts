import type React from 'react'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

type FormValidations = {
  name: boolean
}

export const useCreateCharacterForm = () => {
  const { post, data, setData } = useForm({
    name: '',
  })
  const [validations, setValidations] = useState<FormValidations>({
    name: false,
  })
  useEffect(() => {
    setValidations({
      name: data.name.length > 3,
    })
  }, [data])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name') {
      setData('name', value)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/characters')
  }

  return { data, validations, onChange, onSubmit }
}
